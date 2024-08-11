<script setup>
const resources = [
  {
    title: "Article Title Article Title Article Title Article Title",
    desc: "This is an article that ipsem loren ipsem loren ipsem loren ipsem loren ipsem loren This is an article that ipsem loren ipsem loren ipsem loren ipsem loren ipsem loren",
    link: "/blog/",
  },
  {
    title: "Article Title Article Title Article Title Article Title",
    desc: "This is an article that ipsem loren ipsem loren ipsem loren ipsem loren ipsem loren This is an article that ipsem loren ipsem loren ipsem loren ipsem loren ipsem loren",
    link: "/blog/",
  },
  {
    title: "Article Title Article Title Article Title Article Title",
    desc: "This is an article that ipsem loren ipsem loren ipsem loren ipsem loren ipsem loren This is an article that ipsem loren ipsem loren ipsem loren ipsem loren ipsem loren",
    link: "/blog/",
  },
];
</script>

<template>
  <section class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
    <h2
      class="mb-10 font-bold leading-none tracking-tight text-gray-900 text-4xl"
    >
      Resources
    </h2>
    <div
      class="flex flex-row justify-center gap-x-[32px] gap-y-10 max-[1000px]:flex-wrap"
    >
      <article
        v-for="(item, index) in resources"
        :key="index"
        class="p-6 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex-1 bg-gradient-to-b from-primary-100 to-white max-[1000px]:w-[350px] max-[1000px]:flex-none"
      >
        <h2
          class="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900"
        >
          <NuxtLink :to="item.link">{{ item.title }}</NuxtLink>
        </h2>
        <p class="mb-5 font-light text-gray-500 dark:text-gray-400 text-left">
          {{ item.desc }}
        </p>
        <div class="flex justify-between items-center">
          <span class="flex-1"></span>
          <NuxtLink
            :to="item.link"
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
    </div>
  </section>
</template>

<style scoped></style>
