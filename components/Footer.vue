<script setup>
</script>

<template>
<footer class="bg-white dark:bg-gray-800">
  <div class="p-4 mx-auto max-w-screen-xl sm:p-8 lg:p-10">
    <div class="pb-10">
        <p class="text-5xl font-bold leading-tight text-center dark:text-white">Put your work on autopilot</p>
        <div class="flex justify-center items-center my-6">
            <a href="https://cloud.activepieces.com/sign-up" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-normal rounded-lg text-3xl px-24 lg:px-36 py-12 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Start free</a>
        </div>
    </div>

      <div class="grid grid-cols-2 gap-8 mt-8 sm:mt-16 sm:grid-cols-3 lg:grid-cols-4 sm:space-y-0">
          <div>
              <h3 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Product</h3>
              <ul class="text-gray-500 dark:text-gray-400">
                  <li class="mb-4">
                      <NuxtLink href="/pricing" class=" hover:underline">Pricing</NuxtLink>
                  </li>
                  <li class="mb-4">
                      <NuxtLink href="/pieces" class="hover:underline">Pieces</NuxtLink>
                  </li>
                  <li class="mb-4">
                      <a href="https://www.activepieces.com/roadmap" class="hover:underline">Pieces Roadmap</a>
                  </li>
                  <li class="mb-4">
                      <a href="https://community.activepieces.com/c/feature-requests/9" class="hover:underline">Request a Feature</a>
                  </li>
              </ul>
          </div>
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Open Source</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                  <li class="mb-4">
                      <a href="https://github.com/activepieces/activepieces" class="hover:underline">GitHub</a>
                  </li>
                  <li class="mb-4">
                      <a href="https://www.activepieces.com/docs/developers/overview" class="hover:underline">Contribute</a>
                  </li>
                  <li class="mb-4">
                      <a href="https://www.activepieces.com/docs/about/i18n" class="hover:underline">Help us translate</a>
                  </li>
                  <li class="mb-4">
                      <a href="https://github.com/activepieces/activepieces/blob/main/LICENSE" class="hover:underline">MIT License</a>
                  </li>
              </ul>
          </div>
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                    <li class="mb-4">
                      <a href="https://www.activepieces.com/docs" class="hover:underline">Docs</a>
                  </li>
                  <li class="mb-4">
                      <a href="https://community.activepieces.com/c/tutorials/10" class="hover:underline">Tutorials</a>
                  </li>
                  <li class="mb-4">
                      <NuxtLink href="/blog" class="hover:underline">Blog</NuxtLink>
                  </li>
              </ul>
          </div>
          <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Get Help</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                  <li class="mb-4">
                      <a href="https://community.activepieces.com" class="hover:underline">Community</a>
                  </li>
                  <li class="mb-4">
                      <a href="https://discord.com/invite/2jUXBKDdP8" class="hover:underline">Discord</a>
                  </li>
                  <li class="mb-4">
                      <a href="https://status.activepieces.com" class="hover:underline">Cloud Status</a>
                  </li>
              </ul>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8">
      <div class="flex flex-col justify-between items-center text-center lg:flex-row">
          <span class="flex gap-2 items-center">
            Backed by
            <img class="h-6" src="/logos/ycombinator.svg">
          </span>
          <span class="block mb-6 text-base text-gray-500 dark:text-gray-400 lg:mb-0">
            © {{ new Date().getFullYear() }} Activepieces. All rights reserved
          </span>
          <div class="text-gray-500 flex gap-2 text-base">
            <NuxtLink to="/privacy" class="hover:underline">Privacy</NuxtLink>
            <span>-</span>
            <NuxtLink to="/terms" class="hover:underline">Terms</NuxtLink>
            <span>-</span>
            <NuxtLink to="/google-api-disclosure" class="hover:underline">Google API Disclosure</NuxtLink>
          </div>
      </div>
  </div>
</footer>
</template>

<style scoped>
</style>
