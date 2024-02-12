<script setup>
import { onMounted, ref } from 'vue'

const githubButtonsScriptLoaded = ref('false')

onMounted(() => {
  const githubButtonsScript = document.createElement("script");
  githubButtonsScript.setAttribute(
    "src",
    "https://buttons.github.io/buttons.js"
  );

  githubButtonsScript.onload = () => githubButtonsScriptLoaded.value = true;
  document.head.appendChild(githubButtonsScript);
})
</script>

<template>
  <header class="sticky top-0 z-10">
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <NuxtLink to="/" class="flex items-center">
                <img src="/activepieces-logo-hz-og.svg" class="mr-3 h-4 md:h-6" alt="Activepieces Home" />
            </NuxtLink>
            <div class="flex items-center lg:order-2">
                <a href="https://cloud.activepieces.com/sign-in" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Login</a>
                <a href="https://cloud.activepieces.com/sign-up" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Start free</a>
                <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                  <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li class="group">
                    <button id="product-nav-button" data-dropdown-toggle="product-nav-menu" class="flex justify-between items-center py-3 pr-4 pl-3 w-full font-medium text-gray-500 border-b border-gray-100 lg:w-auto group-hover:text-black lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700 transition duration-400">
                      Product
                      <svg class="ml-1 w-5 h-5 lg:w-4 lg:h-4 lg:group-hover:-rotate-180 transition duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div id="product-nav-menu" class="hidden max-lg:!static !inset-x-auto !inset-y-auto !transform-none lg:!block lg:!opacity-0 lg:!h-0 lg:absolute z-10 bg-white rounded divide-y divide-gray-100 lg:shadow-lg dark:bg-gray-700 transition-opacity duration-[400ms] lg:group-hover:!h-auto lg:hover:!h-auto lg:hover:!opacity-100 lg:group-hover:!opacity-100 overflow-hidden">
                      <ul class="py-4 px-2 text-lg font-medium text-gray-500 dark:text-gray-400 overflow-hidden" aria-labelledby="dropdown-button2">
                        <li>
                          <NuxtLink to="/pieces" class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:text-primary-600 hover:bg-primary-50">
                              <img class="w-8 h-8" src="/icons/cube.png">
                              <div>
                                <div class="text-base text-gray-900 group-hover/link:text-primary">Pieces</div>
                                <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">Explore our catalog of utilities and connectors</p>
                              </div>
                          </NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="https://activepieces.com/roadmap" class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:text-primary-600 hover:bg-primary-50">
                              <img class="w-8 h-8" src="/icons/sign.png">
                              <div>
                                <div class="text-base text-gray-900 group-hover/link:text-primary">Roadmap</div>
                                <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">See what's coming next on Activepieces</p>
                              </div>
                          </NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="/pieces" class="group/link flex gap-4 items-center py-2.5 px-4 w-full hover:text-primary-600 rounded-lg hover:bg-primary-50">
                              <img class="w-8 h-8" src="/icons/like.png">
                              <div>
                                <div class="text-base text-gray-900 group-hover/link:text-primary">Feature Requests</div>
                                <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">Request a feature or upvote an existing request</p>
                              </div>
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="group">
                    <button id="resources-nav-button" data-dropdown-toggle="resources-nav-menu" class="flex justify-between items-center py-3 pr-4 pl-3 w-full font-medium text-gray-500 border-b border-gray-100 lg:w-auto group-hover:text-black lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700 transition duration-400">
                      Resources
                      <svg class="ml-1 w-5 h-5 lg:w-4 lg:h-4 lg:group-hover:-rotate-180 transition duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div id="resources-nav-menu" class="hidden max-lg:!static !inset-x-auto !inset-y-auto !transform-none lg:!block lg:!opacity-0 lg:!h-0 lg:absolute z-10 bg-white rounded divide-y divide-gray-100 lg:shadow-lg dark:bg-gray-700 transition-opacity duration-[400ms] lg:group-hover:!h-auto lg:hover:!h-auto lg:hover:!opacity-100 lg:group-hover:!opacity-100 overflow-hidden">
                      <ul class="py-4 px-2 text-lg font-medium text-gray-500 dark:text-gray-400 overflow-hidden" aria-labelledby="dropdown-button2">
                        <li>
                            <NuxtLink to="https://community.activepieces.com/c/tutorials/10" class="group/link flex gap-4 items-center py-2.5 px-4 w-full hover:text-primary-600 rounded-lg hover:bg-primary-50">
                                <img class="w-8 h-8" src="/icons/video.png">
                                <div>
                                  <div class="text-base text-gray-900 group-hover/link:text-primary">Tutorials</div>
                                  <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">Learn the best ways to automate your work</p>
                                </div>
                            </NuxtLink>
                          </li>
                          <li>
                            <NuxtLink to="https://community.activepieces.com/" class="group/link flex gap-4 items-center py-2.5 px-4 w-full hover:text-primary-600 rounded-lg hover:bg-primary-50">
                                <img class="w-8 h-8" src="/icons/diversity.png">
                                <div>
                                  <div class="text-base text-gray-900 group-hover/link:text-primary">Community</div>
                                  <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">Get answers to your questions by the community</p>
                                </div>
                            </NuxtLink>
                          </li>
                          <li>
                            <NuxtLink to="https://www.activepieces.com/docs" class="group/link flex gap-4 items-center py-2.5 px-4 w-full hover:text-primary-600 rounded-lg hover:bg-primary-50">
                                <img class="w-8 h-8" src="/icons/document.png">
                                <div>
                                  <div class="text-base text-gray-900 group-hover/link:text-primary">Docs</div>
                                  <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">Learn deploying Activepieces or building pieces</p>
                                </div>
                            </NuxtLink>
                          </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                      <NuxtLink to="/pricing" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 text-gray-500 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700">Pricing</NuxtLink>
                  </li>
                  <li class="min-w-[122px] min-h-[34px] py-3 px-3 lg:p-0">
                    <a class="github-button invisible" :class="{ 'visible': githubButtonsScriptLoaded }" href="https://github.com/activepieces/activepieces" data-color-scheme="no-preference: light; light: light; dark: light;" data-size="large" data-show-count="true" aria-label="Star activepieces/activepieces on GitHub">Star</a>
                  </li>
                </ul>
            </div>
        </div>
    </nav>
  </header>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
