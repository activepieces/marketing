<script setup>
import { onMounted, ref, defineProps } from "vue";
import { useStorage, useScroll } from "@vueuse/core";
import { useRoute } from "vue-router";
import { initCollapses, initDropdowns } from "flowbite";

const route = useRoute();

const props = defineProps({
  hideGithubBadge: {
    type: Boolean,
    default: false,
  },
});

const { y } = useScroll(window);
const isScrolled = computed(() => y.value > 50);

const showGitHubBadge = ref(!props.hideGithubBadge);
const githubButtonsScriptLoaded = ref("false");
const gitHubBadgeHidden = useStorage("github-badge-hidden");

let menuExpanded = ref(false);

onMounted(() => {
  if (
    !props.hideGithubBadge &&
    (typeof gitHubBadgeHidden.value == "undefined" ||
      gitHubBadgeHidden.value != "true")
  )
    showGitHubBadge.value = true;

  const githubButtonsScript = document.createElement("script");
  githubButtonsScript.setAttribute(
    "src",
    "https://buttons.github.io/buttons.js"
  );

  githubButtonsScript.onload = () => (githubButtonsScriptLoaded.value = true);
  document.head.appendChild(githubButtonsScript);

  initCollapses();
  initDropdowns();
  menuExpanded.value = false; // reset collapse menu
});

const mobileMenu = ref();
watch(useRoute(), () => {
  if (menuExpanded.value) mobileMenu.value.click(); // close menu if opened
});
</script>

<template>
  <header
    class="max-[1250px]:bg-white"
    :class="`sticky top-0 z-10 transition-colors duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`"
  >
    <nav class="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
      >
        <div
          class="flex flex-row items-center max-[555px]:overflow-hidden max-[555px]:w-[30px]"
        >
          <NuxtLink to="/" class="flex items-center">
            <img
              src="/activepieces-logo-hz-og.svg"
              width="200"
              height="100"
              class="mr-3 w-fit h-6 max-[555px]:h-8 max-[555px]:object-cover max-[555px]:object-left"
              alt="Activepieces Home"
            />
          </NuxtLink>
        </div>
        <div class="flex items-center min-[1251px]:order-2">
          <a
            href="https://cloud.activepieces.com/sign-in"
            class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 max-[555px]:hidden"
            >Login</a
          >
          <div class="flex flex-row gap-x-2">
            <router-link
              to="/sales"
              :class="
                  'order-1 text-gray-700 bg-white border border-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
              "
              >Talk to sales</router-link
            >
            <a
              href="https://cloud.activepieces.com/sign-up"
              :class="
                  'order-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
              "
              >Start free</a
            >
          </div>
          <button
            ref="mobileMenu"
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-2 text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 max-[1250px]:flex"
            aria-controls="mobile-menu-2"
            :aria-expanded="menuExpanded"
            @click="menuExpanded = !menuExpanded"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="hidden text-sm justify-between items-center w-full min-[1251px]:flex min-[1251px]:w-auto min-[1251px]:order-1"
          id="mobile-menu-2"
        >
          <ul
            class="flex flex-col mt-4 font-medium min-[1251px]:items-center min-[1251px]:flex-row min-[1251px]:space-x-6 min-[1251px]:mt-0"
          >
            <li class="group">
              <button
                id="product-nav-button"
                data-dropdown-toggle="product-nav-menu"
                class="flex justify-between items-center py-3 pr-4 pl-3 w-full font-medium text-gray-900 border-b border-gray-100 min-[1251px]:w-auto group-hover:text-black min-[1251px]:border-0 min-[1251px]:hover:text-primary-600 min-[1251px]:p-0 dark:text-gray-400 min-[1251px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1251px]:dark:hover:bg-transparent dark:border-gray-700 transition duration-400"
              >
                Product
                <svg
                  class="ml-1 w-5 h-5 min-[1251px]:w-4 min-[1251px]:h-4 min-[1251px]:group-hover:-rotate-180 transition duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                id="product-nav-menu"
                class="hidden max-min-[1251px]:!static !inset-x-auto !inset-y-auto !transform-none min-[1251px]:!block min-[1251px]:!opacity-0 min-[1251px]:!h-0 min-[1251px]:absolute z-10 bg-white rounded divide-y divide-gray-100 min-[1251px]:shadow-2xl dark:bg-gray-700 transition-opacity duration-[400ms] min-[1251px]:group-hover:!h-auto min-[1251px]:hover:!h-auto min-[1251px]:hover:!opacity-100 min-[1251px]:group-hover:!opacity-100 overflow-hidden"
              >
                <ul
                  class="py-4 px-2 text-lg font-medium text-gray-500 dark:text-gray-400 overflow-hidden"
                  aria-labelledby="dropdown-button2"
                >
                  <li>
                    <NuxtLink
                      to="/pieces"
                      class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-unplug text-blue-700"
                      >
                        <path d="m19 5 3-3" />
                        <path d="m2 22 3-3" />
                        <path
                          d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4l2.6 2.6a2.4 2.4 0 0 0 3.4 0Z"
                        />
                        <path d="M7.5 13.5 10 11" />
                        <path d="M10.5 16.5 13 14" />
                        <path
                          d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"
                        />
                      </svg>
                      <div>
                        <div class="text-sm text-black">Pieces</div>
                        <p
                          class="text-xs text-gray-500 font-light max-w-80 group-hover/link:text-black"
                        >
                          Explore our catalog of utilities and connectors
                        </p>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="https://www.activepieces.com/request-a-feature"
                      class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-amber-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-lightbulb text-amber-700"
                      >
                        <path
                          d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
                        />
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                      </svg>
                      <div>
                        <div class="text-sm text-black">Feature Requests</div>
                        <p
                          class="text-xs text-gray-500 font-light max-w-80 group-hover/link:text-black"
                        >
                          Request a feature or upvote an existing request
                        </p>
                      </div>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
            <li class="group">
              <button
                id="resources-nav-button"
                data-dropdown-toggle="resources-nav-menu"
                class="flex justify-between items-center py-3 pr-4 pl-3 w-full font-medium text-gray-900 border-b border-gray-100 min-[1251px]:w-auto group-hover:text-black min-[1251px]:border-0 min-[1251px]:hover:text-primary-600 min-[1251px]:p-0 dark:text-gray-400 min-[1251px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1251px]:dark:hover:bg-transparent dark:border-gray-700 transition duration-400"
              >
                Resources
                <svg
                  class="ml-1 w-5 h-5 min-[1251px]:w-4 min-[1251px]:h-4 min-[1251px]:group-hover:-rotate-180 transition duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                id="resources-nav-menu"
                class="hidden max-min-[1251px]:!static !inset-x-auto !inset-y-auto !transform-none min-[1251px]:!block min-[1251px]:!opacity-0 min-[1251px]:!h-0 min-[1251px]:absolute z-10 bg-white rounded divide-y divide-gray-100 min-[1251px]:shadow-2xl dark:bg-gray-700 transition-opacity duration-[400ms] min-[1251px]:group-hover:!h-auto min-[1251px]:hover:!h-auto min-[1251px]:hover:!opacity-100 min-[1251px]:group-hover:!opacity-100 overflow-hidden"
              >
                <ul
                  class="py-4 px-2 text-lg font-medium text-gray-500 dark:text-gray-400 overflow-hidden"
                  aria-labelledby="dropdown-button2"
                >
                  <li>
                    <NuxtLink
                      to="https://community.activepieces.com/c/tutorials/10"
                      class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-green-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-video text-green-700"
                      >
                        <path
                          d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"
                        />
                        <rect x="2" y="6" width="16" height="14" rx="2" />
                      </svg>

                      <div>
                        <div class="text-sm text-black">Tutorials</div>
                        <p
                          class="text-xs text-gray-500 font-light max-w-80 group-hover/link:text-black"
                        >
                          Learn the best ways to automate your work
                        </p>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="https://community.activepieces.com/"
                      class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-pink-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-messages-square text-pink-700"
                      >
                        <path
                          d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"
                        />
                        <path
                          d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"
                        />
                      </svg>
                      <div>
                        <div class="text-sm text-black">Community</div>
                        <p
                          class="text-xs text-gray-500 font-light max-w-80 group-hover/link:text-black"
                        >
                          Get answers to your questions by the community
                        </p>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="https://www.activepieces.com/docs"
                      class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-indigo-700 lucide lucide-book-text"
                      >
                        <path
                          d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
                        />
                        <path d="M8 11h8" />
                        <path d="M8 7h6" />
                      </svg>
                      <div>
                        <div class="text-sm text-black">Docs</div>
                        <p
                          class="text-xs text-gray-500 font-light max-w-80 group-hover/link:text-black"
                        >
                          Learn deploying Activepieces or building pieces
                        </p>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/blog"
                      class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-notebook-pen text-blue-700"
                      >
                        <path
                          d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"
                        />
                        <path d="M2 6h4" />
                        <path d="M2 10h4" />
                        <path d="M2 14h4" />
                        <path d="M2 18h4" />
                        <path
                          d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
                        />
                      </svg>
                      <div>
                        <div class="text-sm text-black">Blog</div>
                        <p
                          class="text-xs text-gray-500 font-light max-w-80 group-hover/link:text-black"
                        >
                          Discover the latest trends in AI automation
                        </p>
                      </div>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NuxtLink
                to="/pricing"
                class="block py-2 pr-4 pl-3 text-gray-900 border-b border-gray-100 text-gray-500 hover:bg-gray-50 min-[1251px]:hover:bg-transparent min-[1251px]:border-0 min-[1251px]:hover:text-primary-600 min-[1251px]:p-0 dark:text-gray-400 min-[1251px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1251px]:dark:hover:bg-transparent dark:border-gray-700"
                :class="{ 'text-primary-600': route.path.includes('/pricing') }"
                >Pricing</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/ai-transformation/preface"
                class="block py-2 pr-4 pl-3 text-gray-900 border-b border-gray-100 text-gray-500 hover:bg-gray-50 min-[1251px]:hover:bg-transparent min-[1251px]:border-0 min-[1251px]:hover:text-primary-600 min-[1251px]:p-0 dark:text-gray-400 min-[1251px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1251px]:dark:hover:bg-transparent dark:border-gray-700"
                :class="{
                  'text-primary-600': route.path.includes('/ai-transformation'),
                }"
                >AI Book</NuxtLink
              >
            </li>
            <li>
              <a href="https://github.com/activepieces/activepieces"
                target="_blank"
                class="flex gap-1 py-2 pr-4 pl-3 text-gray-900 border-b border-gray-100 text-gray-500 hover:bg-gray-50 min-[1251px]:hover:bg-transparent min-[1251px]:border-0 min-[1251px]:hover:text-primary-600 min-[1251px]:p-0 dark:text-gray-400 min-[1251px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1251px]:dark:hover:bg-transparent dark:border-gray-700"
                :class="{
                  'text-primary-600': route.path.includes('/ai-transformation'),
                }">            <svg
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path
                      d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                    ></path>
                  </svg>
                  GitHub</a>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <div
    v-if="showGitHubBadge"
    class="opacity-100 transition-all fixed w-full justify-center bottom-16 z-[1] flex"
  >
    <div
      class="bg-[#06FFB4] shadow-2xl border border-solid border-black border-opacity-50 h-[70px] w-[350px] lg:w-[400px] rounded-xl text-h6-sm lg:text-h6-lg !font-bold flex justify-center gap-8 items-center"
    >
      Star us on GitHub
      <div class="overflow-hidden min-w-[97.57px] max-h-[28px]">
        <a
          class="github-button"
          href="https://github.com/activepieces/activepieces"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star activepieces/activepieces on GitHub"
        ></a>
      </div>
      <svg
        @click="(showGitHubBadge = false), (gitHubBadgeHidden = 'true')"
        class="cursor-pointer"
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.8749 0.635938C16.3874 0.148438 15.5999 0.148438 15.1124 0.635938L8.9999 6.73594L2.8874 0.623437C2.3999 0.135938 1.6124 0.135938 1.1249 0.623437C0.637402 1.11094 0.637402 1.89844 1.1249 2.38594L7.2374 8.49844L1.1249 14.6109C0.637402 15.0984 0.637402 15.8859 1.1249 16.3734C1.6124 16.8609 2.3999 16.8609 2.8874 16.3734L8.9999 10.2609L15.1124 16.3734C15.5999 16.8609 16.3874 16.8609 16.8749 16.3734C17.3624 15.8859 17.3624 15.0984 16.8749 14.6109L10.7624 8.49844L16.8749 2.38594C17.3499 1.91094 17.3499 1.11094 16.8749 0.635938Z"
          fill="#111111"
        ></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
