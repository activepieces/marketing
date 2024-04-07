<script setup>
const config = useRuntimeConfig();
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { whichPage } from '~/middleware/playbookRequest';

const route = useRoute();
const whichPageObj = whichPage(route);

const { data: playbooks, error: playbookError } = await useFetch(`${config.public.strapiUrl}/api/playbooks?filters[slug][$eq]=${whichPageObj.playbookName}`);
const playbook = playbooks.value.data[0];

const { data: chapters, error: chapterError } = await useFetch(`${config.public.strapiUrl}/api/playbook-chapters?filters[playbook][id][$eq]=${playbook.id}&sort[0]=order:asc&populate[chapterArticles][populate][0]=parentArticle`);

function nestArticles(articles) {
  const articleMap = new Map(articles.map(article => [article.id, { ...article, items: [] }]));
  const nestedArticles = [];

  articles.forEach(article => {
    if (article.parentArticle?.data) {
      const parentArticle = articleMap.get(article.parentArticle.data.id);
      if (parentArticle) {
        parentArticle.items.push(articleMap.get(article.id));
      }
    } else {
      nestedArticles.push(articleMap.get(article.id));
    }
  });

  return nestedArticles;
}

const navItems = chapters.value.data.map(chapter => {
  const { title, chapterArticles } = chapter.attributes;

  const articles = chapterArticles.data.map(article => ({
    id: article.id,
    title: article.attributes.title,
    url: article.attributes.slug,
    order: article.attributes.order,
    parentArticle: article.attributes.parentArticle,
  }));

  const items = nestArticles(articles);

  return {
    title,
    items,
  };
});

function expandMatchingItems(items, playbookBase, routePath, parent = null) {
  let pathFound = false;
  items.forEach(item => {
    if (item.url) {
      item.url = `${playbookBase}/${item.url}`;
    }

    if (item.items) {
      if (expandMatchingItems(item.items, playbookBase, routePath, item)) {
        pathFound = true;
      }
    }

    if (item.url === routePath) {
      item.initialExpanded = true;
      pathFound = true;
    }

    if (pathFound && parent) {
      parent.initialExpanded = true;
    }
  });

  return pathFound;
}

expandMatchingItems(navItems, whichPageObj.playbookBase, route.path);

const headerHeight = ref(0);

onMounted(() => {
    const header = document.querySelector('header');
    if (header) {
        headerHeight.value = header.offsetHeight;
    }
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <Header />

    <section class="bg-white dark:bg-gray-900 mt-10">
        <div class="flex flex-col lg:flex-row mx-auto gap-12 px-10 2xl:px-0 mt-10 max-w-screen-2xl">
            <aside class="lg:flex lg:flex-col lg:w-1/5 sticky self-start overflow-y-auto" :style="{ maxHeight: `calc(100vh - ${headerHeight}px - 2.5rem)`, top: `calc(${headerHeight}px + 2.5rem)` }">
                <div class="pb-10">
                    <h2 class="mb-4 text-4xl lg:text-3xl tracking-tight font-extrabold text-gray-500 dark:text-white">{{ playbook.attributes.title }}</h2>
                    <div class="mt-10 text-sm">
                        <p class="uppercase text-gray-500 font-semibold">Chapters</p>
                        <TreeView v-for="(item, chapterIndex) in navItems" :key="item.title" :title="`${chapterIndex + 1}. ${item.title}`" initialExpanded="true" class="my-1">
                            <template v-slot:title><span class="font-bold">{{chapterIndex + 1}}. {{ item.title }}</span></template>
                            <TreeView v-for="subItem in item.items" :key="subItem.title" :title="subItem.title" :to="`${subItem.url}`" :initialExpanded="!!subItem.initialExpanded">
                                <TreeView v-for="subSubItem in subItem.items" :key="subSubItem.title" :title="subSubItem.title" :to="`${subSubItem.url}`" :initialExpanded="!!subSubItem.initialExpanded"></TreeView>
                            </TreeView>
                        </TreeView>
                    </div>
                </div>
            </aside>
            <div class="flex-1 flex flex-col lg:mt-0 dark:divide-gray-700">
              <slot />
            </div>  
        </div>
    </section>
    
    <Footer />
  </div>
</template>