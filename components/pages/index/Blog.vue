<script setup>
import { formatTimeAgo } from "@vueuse/core";
const config = useRuntimeConfig();

const newPostsUrl = `${config.public.strapiUrl}/api/posts?sort[0]=createdAt:desc&pagination[limit]=5&populate=author,author.photo,categories`;
const { data: newPostsResponse } = await useFetch(newPostsUrl);

const settings = {
  itemsToShow: 2.5,
  snapAlign: "center",
};
const breakpoints = {
  // 700: {
  //   itemsToShow: 3.5,
  //   snapAlign: "center",
  // },
  // 1024: {
  //   itemsToShow: 5,
  //   snapAlign: "start",
  // },
};
</script>

<template>
  <section
    v-if="newPostsResponse.data && newPostsResponse.data.length > 0"
    class="bg-primary-100 mb-10 overflow-hidden"
  >
    <div class="max-w-screen-xl px-4 pt-8 mx-auto lg:pt-20">
      <h2
        class="mb-4 font-bold leading-none tracking-tight text-gray-900 text-4xl"
      >
        Blog
      </h2>
      <p class="mb-10 font-light text-gray-700 text-xl">
        Discover the latest trends in AI automation
      </p>
    </div>
    <div class="overflow-visible">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide :key="0" class="pusher-slide"></Slide>
        <Slide v-for="(item, index) in newPostsResponse.data" :key="index + 1">
          <!-- :class="{ 'ml-[270px]': index == 0 }" -->
          <article
            draggable="false"
            class="p-6 bg-white max-w-[750px] my-3 mr-6 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="flex justify-between items-center mb-5 text-gray-500">
              <span
                class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800"
              >
                <svg
                  class="mr-1 w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                New
              </span>
              <span class="text-sm">{{
                formatTimeAgo(new Date(item.attributes.createdAt))
              }}</span>
            </div>
            <h2
              class="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ item.attributes.title }}
            </h2>
            <p
              class="mb-5 font-light text-gray-500 dark:text-gray-400 text-left"
            >
              {{
                item.attributes.content
                  .replace(
                    /(\*\*|__|\*|_|~~|`|#|>|-|\+|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\))/g,
                    ""
                  )
                  .substring(0, 300)
              }}..
            </p>
            <div class="flex justify-between items-center">
              <span class="flex-1"></span>
              <NuxtLink
                :to="`/blog/${item.attributes.slug}`"
                class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
              >
                Read more
                <svg
                  class="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </NuxtLink>
            </div>
          </article>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
    <div class="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-20">
      <div class="flex justify-center mt-10">
        <NuxtLink
          href="/blog"
          class="inline-flex items-center justify-center px-20 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >View all</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.pusher-slide {
  width: 270px !important;
}
</style>
