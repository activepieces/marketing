<script setup>
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

import { ref, computed } from 'vue'
import { useActiveScroll } from 'vue-use-active-scroll'
import { formatTimeAgo } from '@vueuse/core'

const newPostsUrl = `${config.public.strapiUrl}/api/posts?sort[0]=createdAt:desc&pagination[limit]=2&populate=author,author.photo,categories`;
const { data: newPostsResponse } = await useFetch(newPostsUrl);

const { data: categoriesResponse } = await useFetch(`${config.public.strapiUrl}/api/categories`);
let categories = categoriesResponse.value.data;

categories = await Promise.all(categories.map(async (category) => {
    const postsUrl = `${config.public.strapiUrl}/api/posts?filters[categories][id][$eq]=${category.id}&sort[0]=createdAt:desc&pagination[limit]=3&populate=author,author.photo,categories`;
    const { data: postsResponse } = await useFetch(postsUrl);
    
    return {
        ...category,
        attributes: {
            ...category.attributes,
            posts: postsResponse.value,
        },
    };
}));

categories = categories.filter((category) => {
    return category.attributes.posts.data.length > 0
})

const links = computed(() =>
   categories.map(({ attributes: { slug, name } }) => ({ href: slug, label: name }))
)

const targets = ref([])

const { setActive, activeId } = useActiveScroll(targets)
</script>

<template>
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <p class="mb-1 text-2xl text-gray-700">Activepieces Blog</p>
            <h2 class="mb-4 text-3xl lg:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">Work In Motion</h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Your daily dose of automation strategies, ideas and practical guides.</p>
      </div> 
      <div class="grid gap-8 lg:grid-cols-2">
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
    <div class="grid grid-cols-4 py-8 px-4 mx-auto max-w-screen-xl gap-16 py-16 px-6 ">
        <div class="col-span-4 lg:col-span-1 lg:sticky top-20 self-start">
            <div class="mt-10">
              <p class="uppercase text-gray-500 font-semibold">Categories</p>

                <RouterLink
                        v-for="link in links"
                        @click="setActive(link.href)"
                        :key="link.href"
                        :to="{ hash: `#${link.href}` }"
                        :ariaCurrentValue="link.href === activeId ? 'true': 'false'"
                        class="block my-5 text-lg font-semibold flex gap-2 items-center leading-none hover:underline"
                        :class="{ 'lg:text-primary lg:!no-underline': link.href === activeId }"
                    >
                        <span class="hidden lg:block" :class="{ 'invisible': link.href !== activeId }">👉</span><span>{{ link.label }}</span>
                </RouterLink>
            </div>
        </div> 
        <div class="col-span-4 lg:col-span-3 flex flex-col mt-10 dark:divide-gray-700">
            <div v-for="category in categories" :id="category.attributes.slug" :ref="el => targets.push(el)"
                class="py-20 first:pt-0 last:pb-0">
                <NuxtLink :to="`/blog/category/${category.attributes.slug}`" class="group inline-flex gap-3 text-4xl font-light mb-10 items-center"><span class="group-hover:text-primary">{{ category.attributes.name }}</span><span class="uppercase bg-gray-100 text-gray-900 text-sm font-semibold py-1 px-3 rounded-full tracking-wider group-hover:bg-gray-200">View all</span></NuxtLink>
                <div class="flex flex-col space-y-20 scroll-mt-40 bg-gray-50 py-8 px-6">
                    <article v-for="post in category.attributes.posts.data">
                        <div class="flex justify-between items-center mb-5 text-gray-500">
                            <div class="flex gap-2">
                                <span v-for="category in post.attributes.categories.data" :href="`/category/${category.attributes.slug}`" class="bg-primary-100 dark:hover:bg-primary-300 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">{{ category.attributes.name }}</span>
                            </div>
                            <span class="text-sm">{{ formatTimeAgo(new Date(post.attributes.createdAt)) }}</span>
                        </div>
                        <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <NuxtLink :to="`/blog/${post.attributes.slug}`">{{ post.attributes.title }}</NuxtLink>
                        </h2>
                        <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{ post.attributes.content.substring(0, 300) }}..</p>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center space-x-4">
                                <template v-if="post.attributes.author.data">
                                    <img class="w-7 h-7 rounded-full" :src="`${config.public.strapiUrl}${post.attributes.author.data?.attributes.photo.data.attributes.formats.thumbnail.url}`" :alt="post.attributes.author.data?.attributes.name">
                                    <span class="font-medium dark:text-white">
                                        {{ post.attributes.author.data?.attributes.name }}
                                    </span>
                                </template>
                            </div>
                            <NuxtLink :to="`/blog/${post.attributes.slug}`" class="inline-flex items-center font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Read more
                                <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </NuxtLink>
                        </div>
                    </article>
                </div>
            </div>             
        </div>  
    </div>
    </section>
</template>