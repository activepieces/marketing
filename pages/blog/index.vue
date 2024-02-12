<script setup>
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

const { data: categoriesResponse } = await useFetch(`http://localhost:1338/api/categories?populate[posts][sort]=createdAt:desc&populate[posts][limit]=3&populate[posts][populate]=author,author.photo`);
let categories = categoriesResponse.value.data;

categories = categories.filter((category) => category.attributes.posts.data.length > 0 )

const links = computed(() =>
   categories.map(({ attributes: { slug, name } }) => ({ href: slug, label: name }))
)

const targets = ref([])

const { setActive, activeId } = useActiveScroll(targets)
</script>

<template>
<section class="bg-white dark:bg-gray-900">
    <div class="grid grid-cols-3 py-8 px-4 mx-auto max-w-screen-xl gap-16 py-16 px-6 ">
        <div class="col-span-3 lg:col-span-1 lg:sticky top-20 self-start">
            <h2 class="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">Your Automation Buddy</h2>
            <p class="font-light text-gray-500 dark:text-gray-400 sm:text-xl">We blog everything automation. Best practices, useful products, tutorials and our thoughts.</p>
            <div class="mt-10">
              <p class="uppercase text-gray-500 font-semibold">Categories</p>

                <RouterLink
                        v-for="link in links"
                        @click="setActive(link.href)"
                        :key="link.href"
                        :to="{ hash: `#${link.href}` }"
                        :ariaCurrentValue="link.href === activeId ? 'true': 'false'"
                        class="block my-6 text-2xl font-normal flex gap-2 items-center leading-none hover:underline"
                        :class="{ 'lg:text-primary lg:!no-underline': link.href === activeId }"
                    >
                        <span class="hidden lg:block" :class="{ 'invisible': link.href !== activeId }">👉</span><span>{{ link.label }}</span>
                </RouterLink>
            </div>
        </div> 
        <div class="col-span-3 lg:col-span-2 flex flex-col mt-10 dark:divide-gray-700">
            <div v-for="category in categories" :id="category.attributes.slug" :ref="el => targets.push(el)"
                class="py-20 first:pt-0 last:pb-0">
                <NuxtLink :to="`/blog/category/${category.attributes.slug}`" class="group inline-flex gap-3 text-4xl font-light mb-10 items-center"><span>{{ category.attributes.name }}</span><span class="hidden group-hover:inline-block uppercase bg-gray-100 text-gray-900 text-sm font-semibold py-1 px-3 rounded-full tracking-wider">Browse</span></NuxtLink>
                <div class="flex flex-col space-y-20 scroll-mt-40 bg-gray-50 py-8 px-6">
                    <article v-for="post in category.attributes.posts.data">
                        <div class="flex justify-between items-center mb-5 text-gray-500">
                            <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                Tutorial
                            </span>
                            <span class="text-sm">{{ formatTimeAgo(new Date(post.attributes.createdAt)) }}</span>
                        </div>
                        <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <NuxtLink :to="`/blog/${post.attributes.slug}`">{{ post.attributes.title }}</NuxtLink>
                        </h2>
                        <p class="mb-5 font-light text-gray-500 dark:text-gray-400">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.</p>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center space-x-4">
                                <template v-if="post.attributes.author.data">
                                    <img class="w-7 h-7 rounded-full" :src="`http://localhost:1338${post.attributes.author.data?.attributes.photo.data.attributes.formats.thumbnail.url}`" alt="Michael Gouch portrait">
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