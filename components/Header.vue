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
    class="max-[1200px]:bg-white"
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
        <div class="flex items-center min-[1201px]:order-2">
          <a
            href="https://cloud.activepieces.com/sign-in"
            class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 max-[555px]:hidden"
            >Login</a
          >
          <div class="flex flex-row gap-x-2">
            <router-link
              to="/sales"
              :class="
                route.path === '/open-source'
                  ? 'order-1 text-gray-700 bg-white border border-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
                  : 'order-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
              "
              >Request demo</router-link
            >
            <a
              href="https://cloud.activepieces.com/sign-up"
              :class="
                route.path === '/open-source'
                  ? 'order-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
                  : 'order-1 text-gray-700 bg-white border border-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
              "
              >Start free</a
            >
          </div>
          <button
            ref="mobileMenu"
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-2 text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 max-[1200px]:flex"
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
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="hidden justify-between items-center w-full min-[1201px]:flex min-[1201px]:w-auto min-[1201px]:order-1"
          id="mobile-menu-2"
        >
          <ul
            class="flex flex-col mt-4 font-medium min-[1201px]:items-center min-[1201px]:flex-row min-[1201px]:space-x-8 min-[1201px]:mt-0"
          >
            <li class="group">
              <button
                id="product-nav-button"
                data-dropdown-toggle="product-nav-menu"
                class="flex justify-between items-center py-3 pr-4 pl-3 w-full font-medium text-gray-500 border-b border-gray-100 min-[1201px]:w-auto group-hover:text-black min-[1201px]:border-0 min-[1201px]:hover:text-primary-600 min-[1201px]:p-0 dark:text-gray-400 min-[1201px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1201px]:dark:hover:bg-transparent dark:border-gray-700 transition duration-400"
              >
                Product
                <svg
                  class="ml-1 w-5 h-5 min-[1201px]:w-4 min-[1201px]:h-4 min-[1201px]:group-hover:-rotate-180 transition duration-300"
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
                class="hidden max-min-[1201px]:!static !inset-x-auto !inset-y-auto !transform-none min-[1201px]:!block min-[1201px]:!opacity-0 min-[1201px]:!h-0 min-[1201px]:absolute z-10 bg-white rounded divide-y divide-gray-100 min-[1201px]:shadow-2xl dark:bg-gray-700 transition-opacity duration-[400ms] min-[1201px]:group-hover:!h-auto min-[1201px]:hover:!h-auto min-[1201px]:hover:!opacity-100 min-[1201px]:group-hover:!opacity-100 overflow-hidden"
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
                        class="w-7 h-7 text-blue-700"
                        viewBox="0 0 640 512"
                      >
                        <path
                          class="fa-secondary"
                          opacity=".7"
                          fill="currentColor"
                          d="M591.4 248.8L391.2 48.6c-6.7-6.7-6.2-17.8 1.8-22.9C418.1 9.4 447.9 0 480 0c88.4 0 160 71.6 160 160c0 32.1-9.4 61.9-25.7 87c-5.2 7.9-16.2 8.5-22.9 1.8zm-22.6 22.6c6.7 6.7 6.2 17.8-1.8 22.9c-25 16.3-54.9 25.7-87 25.7c-88.4 0-160-71.6-160-160c0-32.1 9.4-61.9 25.7-87c5.2-7.9 16.2-8.5 22.9-1.8L568.8 271.4z"
                        />
                        <path
                          class="fa-primary"
                          opacity=".4"
                          fill="currentColor"
                          d="M316.5 385.5c2-9.3-5.5-17.5-15-17.5H18.5c-9.5 0-16.9 8.2-15 17.5C18.9 457.8 83.1 512 160 512s141.1-54.2 156.5-126.5zm0-66.9C301.1 246.2 236.9 192 160 192S18.9 246.2 3.5 318.5c-2 9.3 5.5 17.5 15 17.5H301.5c9.5 0 16.9-8.2 15-17.5z"
                        />
                      </svg>
                      <div>
                        <div class="text-base text-black">Pieces</div>
                        <p
                          class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black"
                        >
                          Explore our catalog of utilities and connectors
                        </p>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="https://www.activepieces.com/roadmap"
                      class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-violet-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-7 h-7 text-violet-700"
                        viewBox="0 0 576 512"
                      >
                        <path
                          class="fa-secondary"
                          opacity=".7"
                          fill="currentColor"
                          d="M192.1 416L384 480V96L192 32l.1 384z"
                        />
                        <path
                          class="fa-primary"
                          opacity=".4"
                          fill="currentColor"
                          d="M0 114.5V464c0 11.3 11.5 19 22 14.8L192 416l-.1-384L10.1 99.6C4 102 0 107.9 0 114.5zM554 33.2L384 96V480l181.9-67.6c6.1-2.4 10.1-8.3 10.1-14.9V48c0-11.3-11.4-19.1-22-14.9z"
                        />
                      </svg>
                      <div>
                        <div class="text-base text-black">Roadmap</div>
                        <p
                          class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black"
                        >
                          See what's coming next on Activepieces
                        </p>
                      </div>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="https://www.activepieces.com/request-a-feature"
                      class="group/link flex gap-4 items-center py-2.5 px-4 w-full rounded-lg hover:bg-emerald-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-7 h-7 text-emerald-700"
                        viewBox="0 0 384 512"
                      >
                        <path
                          class="fa-secondary"
                          opacity="0.4"
                          fill="currentColor"
                          d="M321.2 297.8c-19.8 27.1-39.7 54.4-49.2 86.2H112c-9.6-31.9-29.5-59.1-49.2-86.2c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4zM112 176c0-44.2 35.8-80 80-80c8.8 0 16-7.2 16-16s-7.2-16-16-16C130.1 64 80 114.1 80 176c0 8.8 7.2 16 16 16s16-7.2 16-16z"
                        />
                        <path
                          class="fa-primary"
                          opacity=".7"
                          fill="currentColor"
                          d="M192 512c44.2 0 80-35.8 80-80V384H112v48c0 44.2 35.8 80 80 80z"
                        />
                      </svg>
                      <div>
                        <div class="text-base text-black">Feature Requests</div>
                        <p
                          class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black"
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
                class="flex justify-between items-center py-3 pr-4 pl-3 w-full font-medium text-gray-500 border-b border-gray-100 min-[1201px]:w-auto group-hover:text-black min-[1201px]:border-0 min-[1201px]:hover:text-primary-600 min-[1201px]:p-0 dark:text-gray-400 min-[1201px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1201px]:dark:hover:bg-transparent dark:border-gray-700 transition duration-400"
              >
                Resources
                <svg
                  class="ml-1 w-5 h-5 min-[1201px]:w-4 min-[1201px]:h-4 min-[1201px]:group-hover:-rotate-180 transition duration-300"
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
                class="hidden max-min-[1201px]:!static !inset-x-auto !inset-y-auto !transform-none min-[1201px]:!block min-[1201px]:!opacity-0 min-[1201px]:!h-0 min-[1201px]:absolute z-10 bg-white rounded divide-y divide-gray-100 min-[1201px]:shadow-2xl dark:bg-gray-700 transition-opacity duration-[400ms] min-[1201px]:group-hover:!h-auto min-[1201px]:hover:!h-auto min-[1201px]:hover:!opacity-100 min-[1201px]:group-hover:!opacity-100 overflow-hidden"
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
                        class="w-7 h-7 text-green-700"
                        viewBox="0 0 576 512"
                      >
                        <path
                          class="fa-secondary"
                          opacity="0.4"
                          fill="currentColor"
                          d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
                        />
                        <path
                          class="fa-primary"
                          opacity=".8"
                          fill="currentColor"
                          d="M576 128c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.9 1.6L384 196.2V315.8l142.2 94.8c9.8 6.5 22.4 7.2 32.9 1.6s16.9-16.4 16.9-28.2V128z"
                        />
                      </svg>
                      <div>
                        <div class="text-base text-black">Tutorials</div>
                        <p
                          class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black"
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
                        class="w-7 h-7 text-pink-700"
                        viewBox="0 0 640 512"
                      >
                        <path
                          class="fa-secondary"
                          opacity=".8"
                          fill="currentColor"
                          d="M256 352v32c0 35.3 28.7 64 64 64H437.3l81.1 60.8c4.8 3.6 11.3 4.2 16.8 1.5s8.8-8.2 8.8-14.3V448h32c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H448V256c0 53-43 96-96 96H256z"
                        />
                        <path
                          class="fa-primary"
                          opacity=".4"
                          fill="currentColor"
                          d="M0 64C0 28.7 28.7 0 64 0H352c35.3 0 64 28.7 64 64V256c0 35.3-28.7 64-64 64H202.7l-81.1 60.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V320H64c-35.3 0-64-28.7-64-64V64z"
                        />
                      </svg>
                      <div>
                        <div class="text-base text-black">Community</div>
                        <p
                          class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black"
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
                        class="w-7 h-7 text-indigo-700"
                        viewBox="0 0 384 512"
                      >
                        <path
                          class="fa-secondary"
                          opacity="0.4"
                          fill="currentColor"
                          d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64z"
                        />
                        <path
                          class="fa-primary"
                          opacity=".7"
                          fill="currentColor"
                          d="M224 0L384 160H256c-17.7 0-32-14.3-32-32V0z"
                        />
                      </svg>
                      <div>
                        <div class="text-base text-black">Docs</div>
                        <p
                          class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black"
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
                        class="w-7 h-7 text-blue-700"
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 22C1 21.4477 1.44772 21 2 21H22C22.5523 21 23 21.4477 23 22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22Z"
                          fill="currentColor"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M18.3056 1.87868C17.1341 0.707107 15.2346 0.707107 14.063 1.87868L3.38904 12.5526C2.9856 12.9561 2.70557 13.4662 2.5818 14.0232L2.04903 16.4206C1.73147 17.8496 3.00627 19.1244 4.43526 18.8069L6.83272 18.2741C7.38969 18.1503 7.89981 17.8703 8.30325 17.4669L18.9772 6.79289C20.1488 5.62132 20.1488 3.72183 18.9772 2.55025L18.3056 1.87868ZM15.4772 3.29289C15.8677 2.90237 16.5009 2.90237 16.8914 3.29289L17.563 3.96447C17.9535 4.35499 17.9535 4.98816 17.563 5.37868L15.6414 7.30026L13.5556 5.21448L15.4772 3.29289ZM12.1414 6.62869L4.80325 13.9669C4.66877 14.1013 4.57543 14.2714 4.53417 14.457L4.0014 16.8545L6.39886 16.3217C6.58452 16.2805 6.75456 16.1871 6.88904 16.0526L14.2272 8.71448L12.1414 6.62869Z"
                          fill="currentColor"
                          opacity=".7"
                        />
                      </svg>
                      <div>
                        <div class="text-base text-black">Blog</div>
                        <p
                          class="text-sm text-gray-500 font-light max-w-80 group-hover/link:text-black"
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
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 text-gray-500 hover:bg-gray-50 min-[1201px]:hover:bg-transparent min-[1201px]:border-0 min-[1201px]:hover:text-primary-600 min-[1201px]:p-0 dark:text-gray-400 min-[1201px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1201px]:dark:hover:bg-transparent dark:border-gray-700"
                :class="{ 'text-primary-600': route.path.includes('/pricing') }"
                >Pricing</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/ai-transformation"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 text-gray-500 hover:bg-gray-50 min-[1201px]:hover:bg-transparent min-[1201px]:border-0 min-[1201px]:hover:text-primary-600 min-[1201px]:p-0 dark:text-gray-400 min-[1201px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1201px]:dark:hover:bg-transparent dark:border-gray-700"
                :class="{ 'text-primary-600': route.path.includes('/ai-transformation/chatgpt') }"
                >AI Transformation</NuxtLink
              >
            </li>
            <li>
              <a
                href="https://github.com/activepieces/activepieces"
                target="_blank"
                class="p-[2px] relative inline-flex items-center text-sm font-medium text-white bg-gradient-to-r from-[#6232cf] to-[#5d8af3] rounded-full shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:rotate-3 max-[1200px]:mt-3"
              >
                <span
                  class="flex gap-x-2 w-full bg-gray-900 bg-white text-gray-800 rounded-full px-4 py-2"
                >
                  <svg
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="#1f2937"
                  >
                    <path
                      d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                    ></path>
                  </svg>
                  Open Source
                </span>
              </a>
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
