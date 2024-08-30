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

const { data: postsResponse } = await useFetch(`${config.public.strapiUrl}/api/posts?filters[categories][id][$eq]=${category.id}&sort[0]=createdAt:desc&pagination[start]=${(page - 1) * perPage}&pagination[limit]=${perPage}&populate=featuredImage,author,author.photo,categories`);

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
        <p class="mb-1 text-2xl">
          <NuxtLink class="text-gray-700 hover:text-primary" to="/blog">Blog Home</NuxtLink> <span
            class="text-gray-400">/</span>
        </p>
        <h2 class="mb-4 text-3xl lg:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{
          category.attributes.name }}</h2>
        <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">List of all blogs under {{
          category.attributes.name }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Blog 1 -->
        <div v-for="post in postsResponse.data" class="bg-white rounded-lg shadow-md overflow-hidden group">
          <NuxtLink :to="`/blog/${post.attributes.slug}`">
            <div class="overflow-hidden">
              <img v-if="post.attributes?.featuredImage?.data?.attributes?.url" :src="`${config.public.strapiUrl}${post.attributes.featuredImage.data.attributes.url}`" alt="Landscape"
                class="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110">
            </div>
            <div class="p-6">
              <p class="text-gray-400 text-sm mb-2">{{ formatTimeAgo(new Date(post.attributes.createdAt)) }}</p>
              <h3 class="text-xl font-semibold text-gray-800 mb-2cursor-pointer">
                {{ post.attributes.title }}
              </h3>
              <p class="text-gray-600">Landscape photography is one of the most popular genres among photographers.</p>
            </div>
          </NuxtLink>
        </div>

      </div>

      <div class="flex flex-col items-center mt-16">
        <span class="text-base text-gray-700 dark:text-gray-400">
          Showing <span class="font-semibold text-gray-900 dark:text-white">{{ start + 1 }}</span> to <span
            class="font-semibold text-gray-900 dark:text-white">{{ Math.min(totalPosts, start + limit) }}</span> of
          <span class="font-semibold text-gray-900 dark:text-white">{{ totalPosts }}</span> Blogs
        </span>
        <div class="flex mt-4">
          <NuxtLink :to="`/blog/category/${category.attributes.slug}/${page - 1}`" v-if="currentPage > 1"
            class="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4" />
            </svg>
            Previous
          </NuxtLink>
          <NuxtLink :to="`/blog/category/${category.attributes.slug}/${page + 1}`" v-if="currentPage < totalPages"
            class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>