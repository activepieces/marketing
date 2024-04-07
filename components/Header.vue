<script setup>
import { onMounted } from 'vue';
import { useStorage } from '@vueuse/core';

const showGitHubBadge = ref(false)
const githubButtonsScriptLoaded = ref('false')
const gitHubBadgeHidden = useStorage('github-badge-hidden')

onMounted(() => {
  if (typeof gitHubBadgeHidden.value == 'undefined' || gitHubBadgeHidden.value != 'true') showGitHubBadge.value = true;

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
                    <div id="product-nav-menu" class="hidden max-lg:!static !inset-x-auto !inset-y-auto !transform-none lg:!block lg:!opacity-0 lg:!h-0 lg:absolute z-10 bg-white rounded divide-y divide-gray-100 lg:shadow-2xl dark:bg-gray-700 transition-opacity duration-[400ms] lg:group-hover:!h-auto lg:hover:!h-auto lg:hover:!opacity-100 lg:group-hover:!opacity-100 overflow-hidden">
                      <ul class="py-4 px-2 text-lg font-medium text-gray-500 dark:text-gray-400 overflow-hidden" aria-labelledby="dropdown-button2">
                        <li>
                          <NuxtLink to="/pieces" class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-blue-50 transition-colors duration-200">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-blue-700" viewBox="0 0 640 512"><path class="fa-secondary" opacity=".7" fill="currentColor" d="M591.4 248.8L391.2 48.6c-6.7-6.7-6.2-17.8 1.8-22.9C418.1 9.4 447.9 0 480 0c88.4 0 160 71.6 160 160c0 32.1-9.4 61.9-25.7 87c-5.2 7.9-16.2 8.5-22.9 1.8zm-22.6 22.6c6.7 6.7 6.2 17.8-1.8 22.9c-25 16.3-54.9 25.7-87 25.7c-88.4 0-160-71.6-160-160c0-32.1 9.4-61.9 25.7-87c5.2-7.9 16.2-8.5 22.9-1.8L568.8 271.4z"/><path class="fa-primary" opacity=".4" fill="currentColor" d="M316.5 385.5c2-9.3-5.5-17.5-15-17.5H18.5c-9.5 0-16.9 8.2-15 17.5C18.9 457.8 83.1 512 160 512s141.1-54.2 156.5-126.5zm0-66.9C301.1 246.2 236.9 192 160 192S18.9 246.2 3.5 318.5c-2 9.3 5.5 17.5 15 17.5H301.5c9.5 0 16.9-8.2 15-17.5z"/></svg>
                              <div>
                                <div class="text-base text-black">Pieces</div>
                                <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">Explore our catalog of utilities and connectors</p>
                              </div>
                          </NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="https://www.activepieces.com/roadmap" class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-violet-50 transition-colors duration-200">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-violet-700" viewBox="0 0 576 512"><path class="fa-secondary" opacity=".7" fill="currentColor" d="M192.1 416L384 480V96L192 32l.1 384z"/><path class="fa-primary" opacity=".4" fill="currentColor" d="M0 114.5V464c0 11.3 11.5 19 22 14.8L192 416l-.1-384L10.1 99.6C4 102 0 107.9 0 114.5zM554 33.2L384 96V480l181.9-67.6c6.1-2.4 10.1-8.3 10.1-14.9V48c0-11.3-11.4-19.1-22-14.9z"/></svg>
                              <div>
                                <div class="text-base text-black">Roadmap</div>
                                <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">See what's coming next on Activepieces</p>
                              </div>
                          </NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="https://www.activepieces.com/request-a-feature" class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-emerald-50 transition-colors duration-200">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-emerald-700" viewBox="0 0 384 512"><path class="fa-secondary" opacity="0.4" fill="currentColor" d="M321.2 297.8c-19.8 27.1-39.7 54.4-49.2 86.2H112c-9.6-31.9-29.5-59.1-49.2-86.2c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4zM112 176c0-44.2 35.8-80 80-80c8.8 0 16-7.2 16-16s-7.2-16-16-16C130.1 64 80 114.1 80 176c0 8.8 7.2 16 16 16s16-7.2 16-16z"/><path class="fa-primary" opacity=".7" fill="currentColor" d="M192 512c44.2 0 80-35.8 80-80V384H112v48c0 44.2 35.8 80 80 80z"/></svg>
                              <div>
                                <div class="text-base text-black">Feature Requests</div>
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
                    <div id="resources-nav-menu" class="hidden max-lg:!static !inset-x-auto !inset-y-auto !transform-none lg:!block lg:!opacity-0 lg:!h-0 lg:absolute z-10 bg-white rounded divide-y divide-gray-100 lg:shadow-2xl dark:bg-gray-700 transition-opacity duration-[400ms] lg:group-hover:!h-auto lg:hover:!h-auto lg:hover:!opacity-100 lg:group-hover:!opacity-100 overflow-hidden">
                      <ul class="py-4 px-2 text-lg font-medium text-gray-500 dark:text-gray-400 overflow-hidden" aria-labelledby="dropdown-button2">
                        <li>
                            <NuxtLink to="https://community.activepieces.com/c/tutorials/10" class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-green-50 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-green-700" viewBox="0 0 576 512"><path class="fa-secondary" opacity="0.4" fill="currentColor" d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/><path class="fa-primary" opacity=".8" fill="currentColor" d="M576 128c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.9 1.6L384 196.2V315.8l142.2 94.8c9.8 6.5 22.4 7.2 32.9 1.6s16.9-16.4 16.9-28.2V128z"/></svg>
                                <div>
                                  <div class="text-base text-black">Tutorials</div>
                                  <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">Learn the best ways to automate your work</p>
                                </div>
                            </NuxtLink>
                          </li>
                          <li>
                            <NuxtLink to="https://community.activepieces.com/" class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-pink-50 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-pink-700" viewBox="0 0 640 512"><path class="fa-secondary" opacity=".8" fill="currentColor" d="M256 352v32c0 35.3 28.7 64 64 64H437.3l81.1 60.8c4.8 3.6 11.3 4.2 16.8 1.5s8.8-8.2 8.8-14.3V448h32c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H448V256c0 53-43 96-96 96H256z"/><path class="fa-primary" opacity=".4" fill="currentColor" d="M0 64C0 28.7 28.7 0 64 0H352c35.3 0 64 28.7 64 64V256c0 35.3-28.7 64-64 64H202.7l-81.1 60.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V320H64c-35.3 0-64-28.7-64-64V64z"/></svg>
                                <div>
                                  <div class="text-base text-black">Community</div>
                                  <p class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black">Get answers to your questions by the community</p>
                                </div>
                            </NuxtLink>
                          </li>
                          <li>
                            <NuxtLink to="https://www.activepieces.com/docs" class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-indigo-700" viewBox="0 0 384 512"><path class="fa-secondary" opacity="0.4" fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64z"/><path class="fa-primary" opacity=".7" fill="currentColor" d="M224 0L384 160H256c-17.7 0-32-14.3-32-32V0z"/></svg>
                                <div>
                                  <div class="text-base text-black">Docs</div>
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

  <div v-if="showGitHubBadge" class="opacity-100 transition-all fixed w-full justify-center bottom-16 z-[1] flex">
    <div class="bg-[#06FFB4] shadow-2xl border border-solid border-black border-opacity-50 h-[70px] w-[350px] lg:w-[400px] rounded-xl text-h6-sm lg:text-h6-lg !font-bold flex justify-center gap-8 items-center">
      Star us on GitHub
      <div class="overflow-hidden min-w-[97.57px] max-h-[28px]">
        <a class="github-button" href="https://github.com/activepieces/activepieces" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star activepieces/activepieces on GitHub"></a>
      </div>
      <svg @click="showGitHubBadge = false, gitHubBadgeHidden = 'true'" class="cursor-pointer" width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.8749 0.635938C16.3874 0.148438 15.5999 0.148438 15.1124 0.635938L8.9999 6.73594L2.8874 0.623437C2.3999 0.135938 1.6124 0.135938 1.1249 0.623437C0.637402 1.11094 0.637402 1.89844 1.1249 2.38594L7.2374 8.49844L1.1249 14.6109C0.637402 15.0984 0.637402 15.8859 1.1249 16.3734C1.6124 16.8609 2.3999 16.8609 2.8874 16.3734L8.9999 10.2609L15.1124 16.3734C15.5999 16.8609 16.3874 16.8609 16.8749 16.3734C17.3624 15.8859 17.3624 15.0984 16.8749 14.6109L10.7624 8.49844L16.8749 2.38594C17.3499 1.91094 17.3499 1.11094 16.8749 0.635938Z" fill="#111111"></path></svg>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
