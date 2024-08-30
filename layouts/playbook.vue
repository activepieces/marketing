<script setup>
import { useRoute } from "vue-router";
import { whichPage } from "~/middleware/playbookRequest";
import { onMounted } from "vue";
import { initCollapses } from "flowbite";
const config = useRuntimeConfig();

const route = useRoute();
const whichPageObj = whichPage(route);

onMounted(() => {
  initCollapses();
});

const { data: playbooks, error: playbookError } = await useFetch(
  `${config.public.strapiUrl}/api/playbooks?filters[slug][$eq]=${whichPageObj.playbookName}`
);
const playbook = playbooks.value.data[0];

const { data: chapters, error: chapterError } = await useFetch(
  `${config.public.strapiUrl}/api/playbook-chapters?filters[playbook][id][$eq]=${playbook.id}&sort[0]=order:asc&populate[chapterArticles][populate][0]=parentArticle`
);

let playbookName = ref(playbook.attributes.title);
provide("playbookName", playbookName);

function nestArticles(articles) {
  const articleMap = new Map(
    articles.map((article) => [article.id, { ...article, items: [] }])
  );
  const nestedArticles = [];

  articles.forEach((article) => {
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

const navItems = chapters.value.data.map((chapter) => {
  const { title, chapterArticles } = chapter.attributes;

  const articles = chapterArticles.data
    .map((article) => ({
      id: article.id,
      title: article.attributes.title,
      url: article.attributes.slug,
      order: article.attributes.order,
      parentArticle: article.attributes.parentArticle,
    }))
    .sort((a, b) => a.order - b.order);

  const items = nestArticles(articles);

  return {
    title,
    items,
  };
});

function expandMatchingItems(items, playbookBase, routePath, parent = null) {
  let pathFound = false;
  items.forEach((item) => {
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

let isExpanded = ref(false);
const mobileMenu = ref();
const toggleMobileMenu = () => {
  mobileMenu.value.click(); // close menu on route click
};
</script>

<template>
  <div class="bg-gradient-to-r from-[#6232cf24] to-[#5d8af324]">
    <Header :hide-github-badge="true" />

    <section class="pt-6 relative max-[1100px]:pt-0">
      <div
        class="hidden sticky top-[62px] z-[99] px-6 py-2 bg-primary-300 shadow-md w-full max-[1100px]:block max-[1023px]:top-[60px] max-[1023px]:px-4"
      >
        <div
          class="flex flex-row justify-between items-center"
          ref="mobileMenu"
          data-collapse-toggle="playbook-mobile-menu"
          aria-controls="playbook-mobile-menu"
          :aria-expanded="isExpanded"
          @click="isExpanded = !isExpanded"
        >
          <p class="text-sm text-gray-900">
            <span class="font-bold"> {{ playbook.attributes.title }}</span
            >: Table of Content
          </p>
          <button
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-0"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!isExpanded"
              xmlns="http://www.w3.org/2000/svg"
              fill="#374151"
              height="20"
              width="20"
              viewBox="0 -960 960 960"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="#374151"
              height="20"
              width="20"
              viewBox="0 -960 960 960"
            >
              <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          </button>
        </div>
        <div class="hidden" id="playbook-mobile-menu">
          <div class="sidebar text-sm pt-4">
            <p class="uppercase text-gray-800 font-bold">Chapters</p>
            <TreeView
              v-for="(item, chapterIndex) in navItems"
              :key="item.title"
              :title="`${chapterIndex + 1}. ${item.title}`"
              :initialExpanded="false"
              class="my-1"
            >
              <template v-slot:title
                ><span class="font-bold"
                  >{{ chapterIndex + 1 }}. {{ item.title }}</span
                ></template
              >
              <TreeView
                v-for="subItem in item.items"
                :key="subItem.title"
                :title="subItem.title"
                :to="`${subItem.url}`"
                :initialExpanded="!!subItem.initialExpanded"
                @click="toggleMobileMenu"
              >
                <TreeView
                  v-for="subSubItem in subItem.items"
                  :key="subSubItem.title"
                  :title="subSubItem.title"
                  :to="`${subSubItem.url}`"
                  :initialExpanded="!!subSubItem.initialExpanded"
                  @click="toggleMobileMenu"
                ></TreeView>
              </TreeView>
            </TreeView>
          </div>
        </div>
      </div>
      <div
        class="flex flex-row mx-auto gap-12 px-10 2xl:px-4 mt-8 max-w-screen-2xl max-[555px]:mt-14 max-[555px]:px-0"
      >
        <aside
          class="flex flex-col w-1/5 sticky self-start overflow-y-auto top-[90px] max-h-[calc(100vh-90px)] max-[1100px]:hidden"
        >
          <div class="pb-10">
            <!--<NuxtLink :to="whichPageObj.playbookBase"
              ><h2
                class="mb-4 text-4xl lg:text-3xl tracking-tight font-extrabold text-gray-700 dark:text-white hover:text-black"
              >
                {{ playbook.attributes.title }}
              </h2></NuxtLink
            >-->
            <div class="sidebar mt-10 text-sm">
              <p class="uppercase text-gray-500 font-semibold">Chapters</p>
              <TreeView
                v-for="(item, chapterIndex) in navItems"
                :key="item.title"
                :title="`${chapterIndex + 1}. ${item.title}`"
                :initialExpanded="true"
                class="my-1"
              >
                <template v-slot:title
                  ><span class="font-bold"
                    >{{ chapterIndex + 1 }}. {{ item.title }}</span
                  ></template
                >
                <TreeView
                  v-for="subItem in item.items"
                  :key="subItem.title"
                  :title="subItem.title"
                  :to="`${subItem.url}`"
                  :initialExpanded="!!subItem.initialExpanded"
                >
                  <TreeView
                    v-for="subSubItem in subItem.items"
                    :key="subSubItem.title"
                    :title="subSubItem.title"
                    :to="`${subSubItem.url}`"
                    :initialExpanded="!!subSubItem.initialExpanded"
                  ></TreeView>
                </TreeView>
              </TreeView>
            </div>
          </div>
        </aside>
        <div class="flex-1">
          <div
            class="flex flex-row justify-center items-center mb-10 gap-x-4 max-[555px]:mb-8 max-[555px]:px-4"
          >
            <div class="text-gray-900 w-full max-[555px]:text-center">
              <h1
                class="text-[80px] tracking-tight font-medium max-[555px]:text-6xl"
              >
                {{ playbook.attributes.title }}
              </h1>

              <h2
                class="text-3xl tracking-tight font-normal max-w-[500px] max-[555px]:mx-auto max-[555px]:text-2xl max-[555px]:mt-4"
              >
                The new setup that will turn your organization into an AI
                powerhouse
              </h2>

              <p
                class="mt-6 text-xs tracking-[0.6px] uppercase font-soehneMono text-gray-500"
              >
                <strong>By:</strong> Ashraf Samhouri | with Ginikachukwu Nwibe &
                Mabel Obadoni
              </p>
            </div>
            <!-- make image dynamic per playbook -->
            <img
              src="/story/departments.webp"
              class="w-full object-contain max-h-[230px] flex-1 me-20 max-[800px]:hidden"
              alt="playbook"
              width="150"
              height="150"
            />
          </div>
          <div class="bg-white p-8 rounded-t-lg max-[555px]:p-4">
            <slot />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
