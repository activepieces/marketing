<template>
  <div class="mx-auto max-w-screen-xl">
    <div class="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 sm:p-12 border border-gray-100 dark:border-gray-700 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-12 lg:space-x-24">
        <div class="max-w-screen-md mb-8 md:mb-0 text-center md:text-left">
          <h2 class="mb-4 text-2xl sm:text-3xl md:text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
            Get Activepieces now!
          </h2>
          <p class="text-gray-600 dark:text-gray-300 md:text-lg">
            Join 100,000+ users from Google, Roblox, Sequoia and more building secure, open source AI automations. Start automating your work in minutes.
          </p>
        </div>
        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center md:justify-end shrink-0">
          <NuxtLink to="/sales"
             class="whitespace-nowrap text-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Talk to Sales
          </NuxtLink>
          <a href="https://cloud.activepieces.com/sign-up"
             class="whitespace-nowrap text-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            Start free
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.colored-text {
  -webkit-text-fill-color: transparent;
  background: linear-gradient(to right, #6232cf 51%, #5b94f8 100%) text;
}
</style>

<script setup>
</script> 