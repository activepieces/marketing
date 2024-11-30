<script setup>
const pageTitle = 'Open source friends';
const metaDesc = 'Find a collection of awesome open source projects that you can use as part of your organizations\'s stack';
const metaKeywords = 'open source projects, open source companies, open source friends, coss companies, coss projects, oss projects, oss companies';

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})

const { data } = await useFetch('/api/oss-friends');
const friends = data.value?.data || [];
</script>

<template>
  <div>
    <main class="py-10 px-4 mx-auto max-w-screen-xl sm:px-8 lg:px-10">
      <div class="px-4  text-center sm:px-6 lg:px-8 ">
        <h2 class="mb-4 py-10 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Our Open Source Friends
        </h2>
      </div>
      <div class="m-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="friend in friends" class="flex flex-col overflow-hidden rounded bg-slate-100 p-6 shadow-3xl dark:bg-slate-800">
          <a :href="friend.href" target="_blank" class="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100 hover:underline">
            <img 
              :src="`https://img.logo.dev/${friend.href.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}?token=pk_Bq4a0G7zQUK8tPabM47Uzg&retina=true`" 
              alt="Logo of {{ friend.name }}" 
              class="mb-2 w-16 h-16"
            >
            <h2>{{ friend.name }}</h2>
          </a>
          <p class="mt-4 text-base text-slate-700 dark:text-slate-300">{{ friend.description }}</p>
          <div class="mt-auto pt-6">
            <a target="_blank" :href="friend.href">
              <span target="_blank" :href="friend.href" class="inline-flex items-center appearance-none px-6 py-3 text-sm font-medium rounded-md relative text-slate-600 hover:text-slate-500 bg-slate-200 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:bg-slate-300 focus:ring-neutral-500">Learn more</span>
            </a>
          </div>
        </div>
      </div>

      <div class="text-center my-10">
        <a target="_blank" href="https://logo.dev" alt="Logo API">Logos provided by Logo.dev</a>
      </div>
    </main>
  </div>
</template>
