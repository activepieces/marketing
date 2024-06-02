<script setup>
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

const slug = route.params.slug;
const page = parseInt(route.params.page) || 1;
const perPage = 10;

// Redirect to no page if the page is 1 (server and client side)
if (process.server) {
  if (route.params.page && page == 1) {
    navigateTo(`/blog/category/${slug}`)
  }
} else {
  if (route.params.page && page == 1) {
    router.push(`/blog/category/${slug}`)
  }
}

import { formatTimeAgo } from '@vueuse/core'

const { data: categoryResponse } = await useFetch(`${config.public.strapiUrl}/api/categories?filters[slug][$eq]=${slug}`);
let category = categoryResponse.value.data[0];

const postsUrl = `${config.public.strapiUrl}/api/posts?filters[categories][id][$eq]=${category.id}&sort[0]=createdAt:desc&pagination[start]=${(page - 1) * perPage}&pagination[limit]=${perPage}&populate=author,author.photo,categories`;
const { data: postsResponse } = await useFetch(postsUrl);

const pagination = postsResponse.value.meta.pagination;
const start = pagination.start;
const limit = pagination.limit;
const totalPosts = pagination.total;

const currentPage = Math.floor(start / limit) + 1;
const totalPages = Math.ceil(totalPosts / limit);
</script>

<template>
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <p class="mb-1 text-2xl"><NuxtLink class="text-gray-700 hover:text-primary" to="/blog">Blog Home</NuxtLink> <span class="text-gray-400">/</span></p>
            <h2 class="mb-4 text-3xl lg:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{ category.attributes.name }}</h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">List of all blogs under {{ category.attributes.name }}</p>
        </div>
      <div class="mx-auto max-w-screen-sm divide-y divide-gray-200 dark:divide-gray-700">
          <article v-for="post in postsResponse.data" class="py-6 text-center">
              <div class="flex gap-2 justify-center w-full">
                <span v-for="category in post.attributes.categories.data" :href="`/category/${category.attributes.slug}`" class="bg-primary-100 dark:hover:bg-primary-300 text-primary-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">{{ category.attributes.name }}</span>
              </div>
              <h2 class="my-4 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-white">
                <NuxtLink :to="`/blog/${post.attributes.slug}`">{{post.attributes.title}}</NuxtLink>
              </h2>
              <div class="flex justify-center items-center space-x-4 text-gray-500 sm:space-x-6">
                  <div class="flex items-center space-x-3">
                    <img class="w-7 h-7 rounded-full" :src="`${config.public.strapiUrl}${post.attributes.author.data?.attributes.photo.data.attributes.formats.thumbnail.url}`" :alt="post.attributes.author.data?.attributes.name">
                    <span class="font-medium dark:text-white">
                        {{ post.attributes.author.data?.attributes.name }}
                    </span>
                  </div>
                  <span>{{ formatTimeAgo(new Date(post.attributes.createdAt)) }}</span>
              </div>
          </article>               
      </div>

    <div class="flex flex-col items-center mt-16">
        <span class="text-base text-gray-700 dark:text-gray-400">
            Showing <span class="font-semibold text-gray-900 dark:text-white">{{ start + 1 }}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{ Math.min(totalPosts, start + limit) }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ totalPosts }}</span> Blogs
        </span>
        <div class="flex mt-4">
            <NuxtLink :to="`/blog/category/${category.attributes.slug}/${page - 1}`" v-if="currentPage > 1" class="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                </svg>
                Previous
            </NuxtLink>
            <NuxtLink :to="`/blog/category/${category.attributes.slug}/${page + 1}`" v-if="currentPage < totalPages" class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
                <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </NuxtLink>
        </div>
    </div>
  </div>
</section>
</template>