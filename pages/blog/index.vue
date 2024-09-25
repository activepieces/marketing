<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { formatTimeAgo } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig();

const pageTitle = 'Learn to automate your work';
const metaDesc = 'Read tutorials, guides, thoughts and more about building automated flows to run in the background to save yourself the manual work.';
const metaKeywords = 'automation blog, business automation tutorials, no-code business automation';

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})

const newPostsUrl = `${config.public.strapiUrl}/api/posts?sort=createdAt:desc&pagination[limit]=2&populate[author][populate]=photo&populate=categories`;
const { data: newPostsResponse } = await useFetch(newPostsUrl, {
    headers: {
      'Strapi-Response-Format': 'v4'
    }
  });

const { data: categoriesResponse } = await useFetch(`${config.public.strapiUrl}/api/categories`, {
    headers: {
      'Strapi-Response-Format': 'v4'
    }
  });
const categories = categoriesResponse.value.data;

const initialCategory = route.query.category || route.hash.replace('#', '')
const selectedCategory = ref(initialCategory);

const page = ref(1);
const perPage = 10;

const isLoading = ref(true)

const posts = ref(null);

onMounted(async () => {
  if (!initialCategory && categories.length > 0) {
    selectedCategory.value = categories[0].attributes.slug;
    router.push({ hash: `#${selectedCategory.value}` });
  }
  await fetchPosts()
})

const fetchPosts = async () => {
  const category = categories.find(cat => cat.attributes.slug === selectedCategory.value);
  if (!category) return;

  const postsUrl = `${config.public.strapiUrl}/api/posts?filters[categories][id][$eq]=${category.id}&sort=createdAt:desc&pagination[page]=${page.value}&pagination[pageSize]=${perPage}&populate[featuredImage]=*&populate[author][populate]=photo&populate=categories`;
  const { data: postsResponse } = await useFetch(postsUrl, {
    headers: {
      'Strapi-Response-Format': 'v4'
    }
  });
  posts.value = postsResponse.value;
  isLoading.value = false
};

const changeCategory = async (slug) => {
  isLoading.value = true
  selectedCategory.value = slug
  page.value = 1
  await fetchPosts()
  router.push({ hash: `#${slug}` });
};

const defaultImage = 'https://content.activepieces.com/uploads/placeholder_blog_de8c9fa735.png'

watch(selectedCategory, async (newCategory) => {
  await fetchPosts();
});
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-6 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center mb-8">
        <p class="mb-1 text-2xl text-gray-700">Activepieces Blog</p>
        <h2 class="mb-4 text-3xl lg:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">Work In Motion</h2>
        <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Your daily dose of automation strategies, ideas and practical guides.</p>
      </div> 
      <div class="grid gap-6 lg:grid-cols-2">
        <article v-for="post in newPostsResponse.data" class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-between items-center mb-5 text-gray-500">
            <span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
              <svg class="mr-1 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
              New
            </span>
            <span class="text-sm">{{ formatTimeAgo(new Date(post.attributes.createdAt)) }}</span>
          </div>
          <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis"><NuxtLink :to="`/blog/${post.attributes.slug}`">{{post.attributes.title}}</NuxtLink></h2>
          <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{ post.attributes.content.replace(/(\*\*|__|\*|_|~~|`|#|>|-|\+|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\))/g, '').substring(0, 300) }}..</p>
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <img class="w-7 h-7 rounded-full" :src="`${config.public.strapiUrl}${post.attributes.author.data?.attributes.photo.data.attributes.formats.thumbnail.url}`" :alt="post.attributes.author.data?.attributes.name">
              <span class="font-medium dark:text-white">
                {{ post.attributes.author.data?.attributes.name }}
              </span>
            </div>
            <NuxtLink :to="`/blog/${post.attributes.slug}`" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
              Read more
              <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </NuxtLink>
          </div>
        </article>                 
      </div>  
    </div>
  </section>

  <section class="bg-white dark:bg-gray-900">
    <div class="grid grid-cols-4 py-2 px-4 mx-auto max-w-screen-xl gap-8 lg:px-6">
      <div class="col-span-4 lg:col-span-1 lg:sticky top-20 self-start">
        <div class="mt-4">
          <p class="uppercase text-gray-500 font-semibold">Categories</p>
          <button
            v-for="category in categories"
            @click="changeCategory(category.attributes.slug)"
            :key="category.attributes.slug"
            class="block my-5 text-lg font-semibold flex gap-2 items-center leading-none hover:text-primary"
            :class="{ 'text-primary': category.attributes.slug === selectedCategory }"
          >
            <span class="hidden lg:block" :class="{ 'invisible': category.attributes.slug !== selectedCategory }">👉</span>
            <span>{{ category.attributes.name }}</span>
          </button>
        </div>
      </div> 
      <div class="col-span-4 lg:col-span-3 flex flex-col mt-4 dark:divide-gray-700">
        <div v-if="posts">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-light">{{ categories.find(cat => cat.attributes.slug === selectedCategory)?.attributes.name }}</h2>
            <NuxtLink :to="`/blog/category/${selectedCategory}`" class="text-lg font-light text-primary hover:underline">
              View all
            </NuxtLink>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <template v-if="isLoading">
              <div v-for="i in 4" :key="i" class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div class="h-48 bg-gray-300"></div>
                <div class="p-6">
                  <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div class="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div class="flex justify-between items-center mt-4">
                    <div class="flex items-center space-x-2">
                      <div class="w-5 h-5 rounded-full bg-gray-300"></div>
                      <div class="h-4 bg-gray-300 rounded w-20"></div>
                    </div>
                    <div class="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="post in posts.data" class="bg-white rounded-lg shadow-md overflow-hidden group">
                <NuxtLink :to="`/blog/${post.attributes.slug}`">
                  <div class="flex flex-col h-full">
                    <div class="h-48">
                      <img
                        :src="post.attributes?.featuredImage?.data?.attributes?.url ? `${config.public.strapiUrl}${post.attributes.featuredImage.data.attributes.url}` : defaultImage"
                        alt="Landscape"
                        class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110">
                    </div>
                    <div class="p-6 flex flex-col h-full justify-between flex-grow">
                      <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2 cursor-pointer">
                          {{ post.attributes.title }}
                        </h3>
                        <p class="text-gray-600 mt-auto">{{
                          post.attributes.content.replace(/(\*\*|__|\*|_|~~|`|#|>|-|\+|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\))/g,
                            '').substring(0, 80) }}..</p>
                      </div>
                      <div class="flex flex-col justify-end flex-grow mt-4">
                        <div class="flex justify-between items-center">
                          <div class="flex items-center space-x-2">
                            <img class="w-5 h-5 rounded-full"
                              :src="`${config.public.strapiUrl}${post.attributes.author.data?.attributes.photo.data.attributes.formats.thumbnail.url}`"
                              :alt="post.attributes.author.data?.attributes.name">
                            <span class="text-sm font-medium dark:text-white">
                              {{ post.attributes.author.data?.attributes.name }}
                            </span>
                          </div>
                          <p class="text-gray-400 text-sm ml-auto">{{ formatTimeAgo(new Date(post.attributes.createdAt)) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </template>
          </div>
        </div>             
      </div>  
    </div>
  </section>
</template>