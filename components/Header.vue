<script setup>
import { onMounted, ref, defineProps } from "vue";
import { useStorage, useScroll } from "@vueuse/core";
import { useRoute } from "vue-router";
import { initCollapses } from "flowbite";

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
  menuExpanded.value = false; // reset collapse menu
});

const mobileMenu = ref();
watch(useRoute(), () => {
  if (menuExpanded.value) mobileMenu.value.click(); // close menu if opened
});
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full max-[1250px]:bg-white"
    :class="`transition-colors duration-300`"
  >
    <nav class="border-gray-200 px-4 h-[62px] lg:px-6 dark:bg-gray-800
      max-[1250px]:bg-white" :class="{ 'bg-white': isScrolled, 'max-[1250px]:h-dvh max-[1250px]:overflow-visible': menuExpanded }">
      <div
        class="flex flex-wrap space-x-10 h-full items-stretch justify-between mx-auto max-w-screen-xl
          max-[1250px]:space-x-0"
      >
        <div
          class="flex flex-row h-[62px] flex-shrink-0 flex-grow-0 items-center max-[555px]:overflow-hidden max-[555px]:w-[30px]"
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
        <div class="flex items-center flex-grow-0 min-[1251px]:order-2">
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
            class="inline-flex items-center p-2 ms-2 text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
              max-[1250px]:flex"
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
          class="flex flex-grow hidden text-base justify-between items-center w-full
            min-[1251px]:flex min-[1251px]:w-auto min-[1251px]:order-1 max-[1250px]:bg-white max-[1250px]:w-full max-[1250px]:max-h-dvh max-[1250px]:flex-col max-[1250px]:justify-start max-[1250px]:items-stretch max-[1250px]:overflow-scroll max-[1250px]:!-mx-4 max-[1250px]:px-4 max-[1250px]:h-[calc(100vh_-_62px)]"
          id="mobile-menu-2"
        >
          <ul
            class="flex flex-col h-full mt-4 items-stretch font-medium min-[1251px]:flex-row min-[1251px]:space-x-6 min-[1251px]:mt-0"
          >
            <li class="group/main flex items-center max-[1250px]:flex-col">
              <input type="checkbox" name="nav-menu" id="nav-button-platform" class="hidden peer">
              <label for="nav-button-platform"
                id="platform-nav-button"
                class="flex relative z-20 justify-between items-center py-3 ps-3 pe-4 w-full font-medium text-black border-b border-gray-100 min-[1251px]:w-auto group-hover:text-black min-[1251px]:border-0 min-[1251px]:group-hover/main:text-primary-600 min-[1251px]:p-0 dark:text-gray-400 min-[1251px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1251px]:dark:hover:bg-transparent dark:border-gray-700 transition duration-400 max-[1250px]:peer-checked:[&>svg]:rotate-180
                  max-[1250px]:ps-0"
              >
                Platform
                <svg
                  class="ml-1 w-5 h-5 min-[1251px]:w-4 min-[1251px]:h-4 min-[1251px]:group-hover/main:-rotate-180 transition duration-300"
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
              </label>

              <div class="pointer-events-none -z-[1] fixed top-0 left-0 w-full h-[62px] bg-white opacity-0 group-hover/main:opacity-100 group-hover/main:transition-none transition-opacity duration-500
                max-[1250px]:!hidden"></div>
              <div class="hidden pointer-events-none -z-10 fixed top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-0 transition-opacity group-hover/main:block group-hover/main:opacity-30
                max-[1250px]:!hidden"></div>
              <nav class="absolute -z-10 text-base transform transition-transform duration-200 [transform:translateY(calc(-101%-62px))] group-hover/main:[transform:translateY(0%)] w-full top-0 left-0 pt-[62px] bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600
                max-[1250px]:static max-[1250px]:z-auto max-[1250px]:transform-none max-[1250px]:transition-none max-[1250px]:transition-none max-[1250px]:pt-0 max-[1250px]:px-4 max-[1250px]:hidden max-[1250px]:peer-checked:block">
                  <div class="grid border-t py-10 gap-x-4 mx-auto max-w-screen-xl text-gray-900 dark:text-white
                    grid-cols-4 max-[1250px]:grid-cols-1 max-[1250px]:py-2 max-[1250px]:border-none max-[1250px]:space-y-6">
                      <ul class="flex flex-col gap-2">
                          <li class="uppercase mb-2 text-lg text-[#d21be4]
                            max-[1250px]:text-base max-[1250px]:mb-0">
                              Automate Work
                          </li>
                          <li class="group">
                              <div>
                                <div class="menu-item-hover relative text-gray-400 flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1 mr-2 w-4 h-4 text-[#d21be4]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">No-Code Automation</div>
                                      <span class="font-light dark:text-gray-400">Enjoy a magical automation building experience</span>
                                  </div>

                                  <span class="hidden group-hover:block absolute w-auto left-1/2 bottom-5 transform -translate-x-1/2 text-sm text-center bg-black text-white rounded-lg p-1.5">
                                    We're cooking this page
                                    <span class="typing inline">  
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                          </li>
                          <li class="group">
                            <div>
                                <div class="menu-item-hover relative text-gray-400 flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#d21be4]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Human Input</div>
                                      <span class="font-light dark:text-gray-400">Request approvals or trigger automations by form entry</span>
                                  </div>

                                  <span class="hidden group-hover:block absolute w-auto left-1/2 bottom-5 transform -translate-x-1/2 text-sm text-center bg-black text-white rounded-lg p-1.5">
                                    We're cooking this page
                                    <span class="typing inline">  
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                          </li>
                          <li>
                            <NuxtLink to="/pieces">
                                <div class="menu-item-hover flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#d21be4]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Pieces</div>
                                      <span class="font-light text-gray-700 dark:text-gray-400">Connect to hundreds of apps you use everyday</span>
                                  </div>
                                </div>
                            </NuxtLink>
                          </li>
                      </ul>
                      <ul class="flex flex-col gap-2">
                          <li class="uppercase mb-2 text-lg text-[#6807F9]
                            max-[1250px]:text-base max-[1250px]:mb-0">
                              Unlock AI
                          </li>
                          <li class="group">
                            <div>
                                <div class="menu-item-hover relative text-gray-400 flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#6807F9]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">AI Pieces</div>
                                      <span class="font-light dark:text-gray-400">Create AI agents with our extremely simplified AI pieces</span>
                                  </div>

                                  <span class="hidden group-hover:block absolute w-auto left-1/2 bottom-5 transform -translate-x-1/2 text-sm text-center bg-black text-white rounded-lg p-1.5">
                                    We're cooking this page
                                    <span class="typing inline">  
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                          </li>
                          <li class="group">
                            <div>
                                <div class="menu-item-hover relative text-gray-400 flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#6807F9]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Chat Interface</div>
                                      <span class="font-light dark:text-gray-400">Build chat experiences with advanced logic</span>
                                  </div>

                                  <span class="hidden group-hover:block absolute w-auto left-1/2 bottom-5 transform -translate-x-1/2 text-sm text-center bg-black text-white rounded-lg p-1.5">
                                    We're cooking this page
                                    <span class="typing inline">  
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                          </li>
                          <li class="group">
                            <div>
                                <div class="menu-item-hover relative text-gray-400 flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#6807F9]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Code Assistant</div>
                                      <span class="font-light dark:text-gray-400">Supercharge your automations with AI-assisted code</span>
                                  </div>

                                  <span class="hidden group-hover:block absolute w-auto left-1/2 bottom-5 transform -translate-x-1/2 text-sm text-center bg-black text-white rounded-lg p-1.5">
                                    We're cooking this page
                                    <span class="typing inline">  
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                          </li>
                      </ul>
                      <ul class="flex-col gap-2 flex">
                          <li class="uppercase mb-2 text-lg text-[#006dff]
                            max-[1250px]:text-base max-[1250px]:mb-0">
                              Empower Team
                          </li>
                          <li class="group">
                            <div>
                                <div class="menu-item-hover relative text-gray-400 flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#006dff]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Decentralized Innovation</div>
                                      <span class="font-light dark:text-gray-400">Bring your team and unlock new levels of innovation</span>
                                  </div>

                                  <span class="hidden group-hover:block absolute w-auto left-1/2 bottom-5 transform -translate-x-1/2 text-sm text-center bg-black text-white rounded-lg p-1.5">
                                    We're cooking this page
                                    <span class="typing inline">  
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                          </li>
                          <li class="group">
                            <div>
                                <div class="menu-item-hover relative text-gray-400 flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#006dff]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Governance</div>
                                      <span class="font-light dark:text-gray-400">Implement all security practices and stay compliant</span>
                                  </div>

                                  <span class="hidden group-hover:block absolute w-auto left-1/2 bottom-5 transform -translate-x-1/2 text-sm text-center bg-black text-white rounded-lg p-1.5">
                                    We're cooking this page
                                    <span class="typing inline">  
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                          </li>
                          <li>
                            <a target="_blank" href="https://www.activepieces.com/docs/operations/git-sync">
                                <div class="menu-item-hover flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#006dff]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Collaboration</div>
                                      <span class="font-light text-gray-700 dark:text-gray-400">Set up the needed workflow to build & deploy automations</span>
                                  </div>
                                </div>
                            </a>
                          </li>
                          <li class="group">
                            <div>
                                <div class="menu-item-hover relative text-gray-400 flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#006dff]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Engagement</div>
                                      <span class="font-light dark:text-gray-400">Find and grow your internal heroes with leaderboards</span>
                                  </div>

                                  <span class="hidden group-hover:block absolute w-auto left-1/2 bottom-5 transform -translate-x-1/2 text-sm text-center bg-black text-white rounded-lg p-1.5">
                                    We're cooking this page
                                    <span class="typing inline">  
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                          </li>
                      </ul>
                      <ul class="flex-col gap-2 flex">
                          <li class="uppercase mb-2 text-lg text-[#00b248]
                            max-[1250px]:text-base max-[1250px]:mb-0">
                              Extend Code
                          </li>
                          <li>
                            <a target="_blank" href="https://github.com/activepieces/activepieces">
                                <div class="menu-item-hover flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#00b248]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Open Source</div>
                                      <span class="font-light text-gray-700 dark:text-gray-400">Activepieces is MIT licensed with ~10k stars on GitHub</span>
                                  </div>
                                </div>
                            </a>
                          </li>
                          <li>
                            <a target="_blank" href="https://www.activepieces.com/docs/developers/building-pieces/overview">
                              <div class="menu-item-hover flex p-2 -mx-2 rounded-lg transition-all duration-700 relative overflow-hidden">
                                <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#00b248]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                <div>
                                  <div class="font-semibold">Pieces Framework</div>
                                  <span class="font-light text-gray-700 dark:text-gray-400">
                                    Devs love our TypeScript framework to build pieces
                                  </span>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a target="_blank" href="https://www.activepieces.com/docs/embedding/overview">
                                <div class="menu-item-hover flex p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  <svg class="shrink-0 mt-1  mr-2 w-4 h-4 text-[#00b248]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                  <div>
                                      <div class="font-semibold">Embed in SaaS</div>
                                      <span class="font-light text-gray-700 dark:text-gray-400">Offer workflows in your SaaS with a few lines of code</span>
                                  </div>
                                </div>
                            </a>
                          </li>
                      </ul>
                  </div>
              </nav>
            </li>
            <li class="group/main flex items-center max-[1250px]:flex-col">
              <input type="checkbox" name="nav-menu" id="nav-button-resources" class="hidden peer">
              <label for="nav-button-resources"
                id="resources-nav-button"
                class="flex relative z-20 justify-between items-center py-3 ps-3 pe-4 w-full font-medium text-black border-b border-gray-100 min-[1251px]:w-auto group-hover:text-black min-[1251px]:border-0 min-[1251px]:group-hover/main:text-primary-600 min-[1251px]:p-0 dark:text-gray-400 min-[1251px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 min-[1251px]:dark:hover:bg-transparent dark:border-gray-700 transition duration-400 max-[1250px]:peer-checked:[&>svg]:rotate-180
                  max-[1250px]:ps-0"
              >
                Resources
                <svg
                  class="ml-1 w-5 h-5 min-[1251px]:w-4 min-[1251px]:h-4 min-[1251px]:group-hover/main:-rotate-180 transition duration-300"
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
              </label>

              <div class="pointer-events-none -z-[1] fixed top-0 left-0 w-full h-[62px] bg-white opacity-0 group-hover/main:opacity-100 group-hover/main:transition-none transition-opacity duration-500
                max-[1250px]:!hidden"></div>
              <div class="hidden pointer-events-none -z-10 fixed top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-0 transition-opacity group-hover/main:block group-hover/main:opacity-30
                max-[1250px]:!hidden"></div>
              <nav class="absolute -z-10 text-base transform transition-transform duration-200 [transform:translateY(calc(-101%-62px))] group-hover/main:[transform:translateY(0%)] w-full top-0 left-0 pt-[62px] bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600
                max-[1250px]:static max-[1250px]:z-auto max-[1250px]:transform-none max-[1250px]:transition-none max-[1250px]:transition-none max-[1250px]:pt-0 max-[1250px]:px-4 max-[1250px]:hidden max-[1250px]:peer-checked:block">
                  <div class="grid border-t py-10 gap-x-4 mx-auto max-w-screen-xl text-gray-900 dark:text-white
                    grid-cols-4 max-[1250px]:grid-cols-1 max-[1250px]:py-2 max-[1250px]:border-none max-[1250px]:space-y-6">
                      <div class="px-4">
                          <NuxtLink to="/ai-transformation" class="block rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:-rotate-2 hover:shadow-2xl hover:shadow-gray-300
                            max-[1250px]:max-w-[200px] max-[1250px]:!shadow-none max-[1250px]:!transform-none">
                            <img src="/harmony.png">
                          </NuxtLink>
                      </div>

                      <ul class="flex flex-col gap-3 px-2">
                          <li class="mb-2 text-2xl text-gray-400 px-4 pb-4 border-b border-gray-300">
                              Learn
                          </li>
                          <li>
                              <NuxtLink to="/docs" class="text-lg font-semibold relative text-black flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Docs
                              </NuxtLink>
                          </li>
                          <li>
                              <div class="group text-lg font-semibold relative text-gray-500 flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Activpieces 101 <span class="italic ms-1.5 py-1 px-2 rounded-lg bg-gray-100 text-sm group-hover:bg-black group-hover:text-white">soon</span>
                              </div>
                          </li>
                          <li>
                              <div class="group text-lg font-semibold relative text-gray-500 flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  AI Automation 101 <span class="italic ms-1.5 py-1 px-2 rounded-lg bg-gray-100 text-sm group-hover:bg-black group-hover:text-white">soon</span>
                              </div>
                          </li>
                          <li>
                              <div class="group text-lg font-semibold relative text-gray-500 flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Internet 101 <span class="italic ms-1.5 py-1 px-2 rounded-lg bg-gray-100 text-sm group-hover:bg-black group-hover:text-white">soon</span>
                              </div>
                          </li>
                          <li>
                              <NuxtLink to="/ai-transformation" class="text-lg font-semibold relative text-black flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  AI Adoption
                              </NuxtLink>
                          </li>
                          <li>
                              <a href="https://community.activepieces.com/c/tutorials/10" class="text-lg font-semibold relative text-black flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Community Tutorials
                              </a>
                          </li>
                      </ul>
                      <ul class="flex flex-col gap-3 px-2">
                          <li class="mb-2 text-2xl text-gray-400 px-4 pb-4 border-b border-gray-300">
                              Customers
                          </li>
                          <li>
                              <a target="_blank" href="https://www.g2.com/products/activepieces/reviews" class="text-lg font-semibold relative text-black flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Reviews
                              </a>
                          </li>
                          <li>
                              <div class="group text-lg font-semibold relative text-gray-500 flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Story 1 <span class="italic ms-1.5 py-1 px-2 rounded-lg bg-gray-100 text-sm group-hover:bg-black group-hover:text-white">soon</span>
                              </div>
                          </li>
                          <li>
                              <div class="group text-lg font-semibold relative text-gray-500 flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Story 2 <span class="italic ms-1.5 py-1 px-2 rounded-lg bg-gray-100 text-sm group-hover:bg-black group-hover:text-white">soon</span>
                              </div>
                          </li>
                          <li>
                              <div class="group text-lg font-semibold relative text-gray-500 flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Story 3 <span class="italic ms-1.5 py-1 px-2 rounded-lg bg-gray-100 text-sm group-hover:bg-black group-hover:text-white">soon</span>
                              </div>
                          </li>
                      </ul>
                      <ul class="flex flex-col gap-3 px-2">
                          <li class="mb-2 text-2xl text-gray-400 px-4 pb-4 border-b border-gray-300">
                              Community
                          </li>
                          <li>
                              <div class="group text-lg font-semibold relative text-gray-500 flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Partners <span class="italic ms-1.5 py-1 px-2 rounded-lg bg-gray-100 text-sm group-hover:bg-black group-hover:text-white">soon</span>
                              </div>
                          </li>
                          <li>
                              <a href="https://community.activepieces.com" class="text-lg font-semibold relative text-black flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Community Forum
                              </a>
                          </li>
                          <li>
                              <a target="_blank" href="https://discord.com/invite/2jUXBKDdP8" class="text-lg font-semibold relative text-black flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Discord
                              </a>
                          </li>
                          <li>
                              <NuxtLink href="/blog" class="text-lg font-semibold relative text-black flex p-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                  Blog
                              </NuxtLink>
                          </li>
                      </ul>
                  </div>
              </nav>
            </li>
            <li class="flex items-center">
              <NuxtLink
                to="/pricing"
                class="flex relative z-20 justify-between items-center py-3 ps-3 pe-4 w-full font-medium text-black border-b border-gray-100 min-[1251px]:w-auto hover:text-primary-600 min-[1251px]:border-0 min-[1251px]:group-hover/main:text-primary-600 min-[1251px]:p-0 dark:text-gray-400 min-[1251px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500
                  max-[1250px]:ps-0"
                :class="{ 'text-primary-600': route.path.includes('/pricing') }"
                >Pricing</NuxtLink
              >
            </li>
            <li class="flex items-center">
              <a href="https://github.com/activepieces/activepieces"
                target="_blank"
                class="flex relative z-20 gap-1.5 items-center py-3 ps-3 pe-4 w-full font-medium text-black border-b border-gray-100 min-[1251px]:w-auto hover:text-primary-600 min-[1251px]:border-0 min-[1251px]:group-hover/main:text-primary-600 min-[1251px]:p-0 dark:text-gray-400 min-[1251px]:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500
                  max-[1250px]:ps-0"
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

.menu-item-hover {
  animation: menu-item-hover-colors 10s ease infinite;
  background-size: 300% 300%;
}

/* When the user hovers, the background gradient becomes visible */
.menu-item-hover:hover {
  background: linear-gradient(45deg,
    rgba(229, 225, 255, 0.5),
    rgba(225, 239, 255, 0.5),
    rgba(255, 225, 255, 0.5),
    rgba(225, 255, 239, 0.5),
    rgba(255, 255, 225, 0.5),
    rgba(255, 225, 240, 0.5),
    rgba(255, 240, 225, 0.5),
    rgba(240, 225, 255, 0.5)
  );
  background-size: 300% 300%;
}

@keyframes menu-item-hover-colors {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.typing {
  align-items: center;
  height: 17px;
}
.typing .dot {
  animation: mercuryTypingAnimation 1.8s infinite ease-in-out;
  background-color: #6CAD96 ;
  border-radius: 50%;
  height: 4px;
  margin-right: 2px;
  vertical-align: middle;
  width: 4px;
  display: inline-block;
}
.typing .dot:nth-child(1) {
  animation-delay: 200ms;
}
.typing .dot:nth-child(2) {
  animation-delay: 300ms;
}
.typing .dot:nth-child(3) {
  animation-delay: 400ms;
}
.typing .dot:last-child {
  margin-right: 0;
}

@keyframes mercuryTypingAnimation {
  0% {
    transform: translateY(0px);
    background-color:#6CAD96;
  }
  28% {
    transform: translateY(-7px);
    background-color:#9ECAB9;
  }
  44% {
    transform: translateY(0px);
    background-color: #B5D9CB;
  }
}
</style>