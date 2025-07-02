<script setup>
import { onMounted, ref, defineProps, onBeforeUnmount } from "vue";
import { useStorage, useScroll } from "@vueuse/core";
import { useRoute } from "vue-router";
import { initCollapses } from "flowbite";
import GithubStarBadge from "~/components/GithubStarBadge.vue";

const route = useRoute();
const isLoaded = ref(false);
// Announcement bar slides up on scroll down, reappears on scroll up
const showAnnouncementBar = ref(true);
let lastScrollY = 0
let ticking = false

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

// Mobile menu state
let menuExpanded = ref(false);
const openSections = ref({
  product: false,
  resources: false,
  learn: false,
  community: false,
  support: false
});

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section];
};

const closeAllSections = () => {
  Object.keys(openSections.value).forEach(key => {
    openSections.value[key] = false;
  });
};

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY
      if (currentY > lastScrollY && currentY > 20) {
        showAnnouncementBar.value = false
      } else {
        showAnnouncementBar.value = true
      }
      lastScrollY = currentY
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  isLoaded.value = true;
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
  menuExpanded.value = false;

  // Minimal scroll handler for announcement bar
  let lastScrollY = 0;
  let ticking = false;
  const bar = document.getElementById('announcement-bar');
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > lastScrollY && window.scrollY > 20) {
          bar && bar.classList.add('hide');
        } else {
          bar && bar.classList.remove('hide');
        }
        lastScrollY = window.scrollY;
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll);
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(showAnnouncementBar, (val) => {
  window.dispatchEvent(new CustomEvent('ap-announcement-bar', { detail: val }))
})
watch(useRoute(), () => {
  if (menuExpanded.value) {
    menuExpanded.value = false;
    closeAllSections();
  }
});
</script>

<template>
  <div>
    <ClientOnly>
      <header
        class="sticky top-0 z-50 w-full max-[905px]:bg-white transition-all duration-300"
      >
        <nav class="border-gray-200 px-4 h-[62px] lg:px-6 dark:bg-gray-800
          max-[905px]:bg-white" :class="{ 'bg-white': isScrolled }">
          <div
            class="flex flex-wrap space-x-10 h-full items-stretch justify-between mx-auto max-w-screen-xl
              max-[905px]:space-x-0"
          >
            <div
              class="flex flex-row h-[62px] flex-shrink-0 flex-grow-0 items-center max-[555px]:overflow-hidden max-[555px]:w-[30px]"
            >
              <NuxtLink to="/" class="flex items-center">
                <img
                  src="/activepieces-logo-hz-og.svg"
                  width="200"
                  height="100"
                  class="mr-3 w-fit h-6 max-[555px]:h-8 max-[5555px]:object-cover max-[555px]:object-left"
                  alt="Activepieces Home"
                />
              </NuxtLink>
            </div>
            <div class="flex items-center flex-grow-0 min-[906px]:order-2">
              <a
                href="https://cloud.activepieces.com/sign-in"
                class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-4 py-2 lg:px-4 lg:py-2 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 max-[555px]:hidden"
                >Login</a
              >
              <div class="flex flex-row gap-x-2">
                <router-link
                  to="/sales"
                  class="inline-flex h-10 items-center justify-center px-4 py-2 text-base font-medium text-gray-700 text-center rounded-lg bg-white border-2 border-gray-900 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 sm:mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 transition-all duration-300 hover:scale-105"
                  >Talk to sales</router-link
                >
                <a
                  href="https://cloud.activepieces.com/sign-up"
                  class="group relative inline-flex h-10 items-center justify-center rounded-lg px-4 py-2 text-base font-medium text-white transition-all duration-300 hover:scale-105"
                >
                  <span class="absolute inset-0 rounded-lg bg-black"></span>
                  <span class="absolute -bottom-1 left-1/2 h-1/5 w-3/5 -translate-x-1/2 animate-rainbow rounded-full bg-gradient-to-r from-[#ff3ea5] via-[#1e9bf0] to-[#6420aa] blur-md"></span>
                  <span class="relative">Start free</span>
                </a>
              </div>
              <button
                ref="mobileMenu"
                data-collapse-toggle="mobile-menu-2"
                type="button"
                class="inline-flex items-center p-2 ms-2 text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
                  max-[905px]:flex"
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
                min-[906px]:flex min-[906px]:w-auto min-[906px]:order-1 max-[905px]:bg-white max-[905px]:w-full max-[905px]:max-h-dvh max-[905px]:flex-col max-[905px]:justify-start max-[905px]:items-stretch max-[905px]:overflow-scroll max-[905px]:!-mx-4 max-[905px]:px-4 max-[905px]:h-[calc(100vh_-_62px)]"
              id="mobile-menu-2"
            >
              <ul class="flex flex-col min-[906px]:flex-row min-[906px]:items-center min-[906px]:space-x-8 max-[905px]:w-full">
                <!-- Product Mega Menu -->
                <li class="relative group">
                  <!-- Hover Bridge -->
                  <div class="absolute left-0 top-0 w-full h-[calc(100%+10px)] opacity-0"></div>
                  
                  <!-- Menu Button -->
                  <button class="flex items-center gap-1 py-2 text-gray-700 group-hover:text-[#8142e3] transition-colors duration-200">
                    <span class="font-semibold">Product</span>
                    <svg class="w-4 h-4 transition-transform duration-200 ease-in-out transform origin-center group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Mega Menu Content -->
                  <div class="absolute left-0 top-full z-50 w-[700px] rounded-2xl shadow-2xl bg-white p-6 grid grid-cols-[3fr_2fr] gap-6 block transition-all duration-300 delay-200 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-0 border border-gray-100 pointer-events-none group-hover:pointer-events-auto">
                    <!-- Left Column: Features -->
                    <div class="flex min-w-0 flex flex-col gap-0">
                      <!-- Feature Row 1 -->
                      <a href="/pieces" class="flex items-center gap-4 h-20 rounded-xl hover:bg-gray-100 transition px-4 py-4 group/feature">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-200">
                          <svg class="w-6 h-6" fill="#A259FF" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        </div>
                        <div class="flex-1">
                          <div class="flex items-center gap-2">
                            <span class="font-semibold text-base text-gray-900">Integrations</span>
                            <span class="bg-purple-100 text-purple-700 text-xs font-semibold rounded-full px-2 py-0.5 h-6 flex items-center">301</span>
                          </div>
                          <div class="text-sm text-gray-500 group-hover/feature:text-gray-900 transition-colors duration-200">Build AI agents across your apps</div>
                        </div>
                      </a>
                      <!-- Feature Row 2 -->
                      <a href="/docs/install/overview" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 h-20 rounded-xl hover:bg-gray-100 transition px-4 py-4 group/feature">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-200">
                          <svg class="w-6 h-6" fill="#EC4899" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <div class="flex-1">
                          <div class="flex items-center gap-2">
                            <span class="font-semibold text-base text-gray-900">Get Started</span>
                            <span class="bg-gray-50 text-gray-500 text-xs font-medium rounded-full px-2 py-0.5 h-6 flex items-center border border-gray-200">DOCS</span>
                          </div>
                          <div class="text-sm text-gray-500 group-hover/feature:text-gray-900 transition-colors duration-200">Start on our cloud or self-host with Docker</div>
                        </div>
                      </a>
                      <!-- Feature Row 3 -->
                      <a href="https://www.activepieces.com/docs/embedding/overview" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 h-20 rounded-xl hover:bg-gray-100 transition px-4 py-4 group/feature">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200">
                          <svg class="w-6 h-6" fill="#34C759" viewBox="0 0 24 24">
                            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                          </svg>
                        </div>
                        <div class="flex-1">
                          <div class="flex items-center gap-2">
                            <span class="font-semibold text-base text-gray-900">Activepieces Embed</span>
                            <span class="bg-gray-50 text-gray-500 text-xs font-medium rounded-full px-2 py-0.5 h-6 flex items-center border border-gray-200">DOCS</span>
                          </div>
                          <div class="text-sm text-gray-500 group-hover/feature:text-gray-900 transition-colors duration-200">Our impressive builder in your app</div>
                        </div>
                      </a>
                      <!-- Feature Row 4 -->
                      <a href="https://www.activepieces.com/docs/security/practices" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 h-20 rounded-xl hover:bg-gray-100 transition px-4 py-4 group/feature">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200">
                          <svg class="w-6 h-6" fill="#6366F1" viewBox="0 0 24 24">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                          </svg>
                        </div>
                        <div class="flex-1">
                          <div class="flex items-center gap-2">
                            <span class="font-semibold text-base text-gray-900">Security</span>
                            <span class="bg-gray-50 text-gray-500 text-xs font-medium rounded-full px-2 py-0.5 h-6 flex items-center border border-gray-200">DOCS</span>
                          </div>
                          <div class="text-sm text-gray-500 group-hover/feature:text-gray-900 transition-colors duration-200">We're SOC 2 Type II compliant</div>
                        </div>
                      </a>
                    </div>
                    <!-- Right Column: Apps -->
                    <div class="flex min-w-0 flex flex-col gap-0">
                      <!-- Promotional Box -->
                      <a href="/mcp" class="block mb-4">
                        <div class="p-4 rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-500 w-fit hover:from-slate-900 hover:via-slate-800 hover:to-slate-900 hover:border-slate-700 transition-all duration-300 relative overflow-hidden">
                          <!-- Animated background elements -->
                          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,116,139,0.1),transparent_50%)] animate-pulse"></div>
                          <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(100,116,139,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-gradient"></div>
                          
                          <!-- Neural network lines -->
                          <div class="absolute inset-0 opacity-20">
                            <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <path d="M0,50 Q25,25 50,50 T100,50" stroke="slate" fill="none" stroke-width="0.5" stroke-dasharray="2,2"/>
                              <path d="M0,30 Q25,55 50,30 T100,30" stroke="slate" fill="none" stroke-width="0.5" stroke-dasharray="2,2"/>
                              <path d="M0,70 Q25,45 50,70 T100,70" stroke="slate" fill="none" stroke-width="0.5" stroke-dasharray="2,2"/>
                            </svg>
                          </div>

                          <!-- Content -->
                          <div class="relative">
                            <div class="flex items-center gap-2">
                              <span class="font-bold text-white text-lg tracking-tight">MCP for Agents</span>
                              <span class="bg-gradient-to-r from-slate-400/30 via-slate-300/30 to-slate-200/30 text-white text-xs font-semibold rounded-full px-2 py-0.5 h-6 flex items-center backdrop-blur-sm border border-slate-400/30">NEW</span>
                            </div>
                            <div class="text-xs text-white/80 mt-1 font-light">Give your AI superpowers and let it do the work for you</div>
                          </div>
                        </div>
                      </a>
                      <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mt-4 mb-2">By Integration</div>
                      <div class="flex flex-col">
                        <a href="/pieces/gmail" class="flex items-center gap-2 h-10 rounded-xl hover:bg-gray-100 transition -ml-4 px-4">
                          <span class="w-6 h-6 flex items-center justify-center"><img src="https://cdn.activepieces.com/pieces/gmail.png" class="w-5 h-5" alt="Gmail" /></span>
                          <span class="text-sm text-gray-800">Gmail</span>
                        </a>
                        <a href="/pieces/openai" class="flex items-center gap-2 h-10 rounded-xl hover:bg-gray-100 transition -ml-4 px-4">
                          <span class="w-6 h-6 flex items-center justify-center"><img src="https://cdn.activepieces.com/pieces/openai.png" class="w-5 h-5" alt="OpenAI" /></span>
                          <span class="text-sm text-gray-800">OpenAI</span>
                        </a>
                        <a href="/pieces/slack" class="flex items-center gap-2 h-10 rounded-xl hover:bg-gray-100 transition -ml-4 px-4">
                          <span class="w-6 h-6 flex items-center justify-center"><img src="https://cdn.activepieces.com/pieces/slack.png" class="w-5 h-5" alt="Slack" /></span>
                          <span class="text-sm text-gray-800">Slack</span>
                        </a>
                        <a href="/pieces" class="flex items-center h-10 -ml-4 px-4 group/all-integrations">
                          <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-900 group-hover/all-integrations:text-blue-600 transition-colors duration-300">All integrations</span>
                            <svg class="w-4 h-4 text-gray-900 group-hover/all-integrations:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>

                <!-- Resources Mega Menu -->
                <li class="relative group">
                  <!-- Hover Bridge -->
                  <div class="absolute left-0 top-0 w-full h-[calc(100%+10px)] opacity-0"></div>
                  
                  <!-- Menu Button -->
                  <button class="flex items-center gap-1 py-2 text-gray-700 group-hover:text-[#8142e3] transition-colors duration-200">
                    <span class="font-semibold">Resources</span>
                    <svg class="w-4 h-4 transition-transform duration-200 ease-in-out transform origin-center group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Mega Menu Content -->
                  <div class="absolute left-0 top-full z-50 w-[800px] rounded-2xl shadow-2xl bg-white p-6 grid grid-cols-3 gap-6 block transition-all duration-300 delay-200 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-0 border border-gray-100 pointer-events-none group-hover:pointer-events-auto">
                    <!-- Using Activepieces Section -->
                    <div class="flex flex-col gap-2">
                      <h3 class="text-sm font-semibold text-gray-500 mb-2">Use Activepieces</h3>
                      <a href="https://www.activepieces.com/docs/flows/building-flows" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
                          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Concepts</div>
                          <div class="text-sm text-gray-500">Learn how Activepieces works</div>
                        </div>
                      </a>
                      <a href="https://www.youtube.com/playlist?list=PLczrB0CK7kLKRlt_VSM2p5VaVSO1FSPG-" target="_blank" rel="noopener noreferrer" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
                          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Activepieces 101</div>
                          <div class="text-sm text-gray-500">Get up and running in minutes</div>
                        </div>
                        <svg class="w-4 h-4 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </a>
                      <a href="https://www.youtube.com/playlist?list=PLczrB0CK7kLJzlRmHL7c8sMYo6L3CbyjI" target="_blank" rel="noopener noreferrer" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
                          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">AI Use Cases</div>
                          <div class="text-sm text-gray-500">See AI automation in action</div>
                        </div>
                        <svg class="w-4 h-4 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </a>
                      <a href="https://community.activepieces.com/c/tutorials/10" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
                          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Community Tutorials</div>
                          <div class="text-sm text-gray-500">Learn from other users</div>
                        </div>
                      </a>
                    </div>

                    <!-- IT Section -->
                    <div class="flex flex-col gap-2">
                      <h3 class="text-sm font-semibold text-gray-500 mb-2">Technical</h3>
                      <a href="https://www.activepieces.com/docs/install/overview" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Deployment</div>
                          <div class="text-sm text-gray-500">Set up on your servers</div>
                        </div>
                      </a>
                      <a href="https://www.activepieces.com/docs" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Docs</div>
                          <div class="text-sm text-gray-500">Everything you need to know</div>
                        </div>
                      </a>
                      <a href="/docs/pieces/overview" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Develop Pieces</div>
                          <div class="text-sm text-gray-500">Build your own integrations</div>
                        </div>
                      </a>
                      <a href="/docs/embedding/overview" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Embed In Your App</div>
                          <div class="text-sm text-gray-500">Add to your product</div>
                        </div>
                      </a>
                      <a href="/docs/security/practices" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Security</div>
                          <div class="text-sm text-gray-500">Keep your data safe</div>
                        </div>
                      </a>
                    </div>

                    <!-- Support Section -->
                    <div class="flex flex-col gap-2">
                      <h3 class="text-sm font-semibold text-gray-500 mb-2">Support</h3>
                      <a href="https://community.activepieces.com" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 group-hover/item:bg-green-100 transition-colors">
                          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Forum</div>
                          <div class="text-sm text-gray-500">Chat with other users</div>
                        </div>
                      </a>
                      <a href="https://discord.com/invite/2jUXBKDdP8" target="_blank" rel="noopener noreferrer" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 group-hover/item:bg-green-100 transition-colors">
                          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Discord</div>
                          <div class="text-sm text-gray-500">Join our live community</div>
                        </div>
                      </a>
                      <a href="/blog" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 group-hover/item:bg-green-100 transition-colors">
                          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-base font-semibold text-gray-900">Blog</div>
                          <div class="text-sm text-gray-500">Latest news and updates</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>

                <!-- Simple Menu Items -->
                <li>
                  <a href="/pricing" class="py-2 text-gray-700 hover:text-[#8142e3] transition-colors duration-200 font-semibold">Pricing</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </ClientOnly>

    <!-- Mobile Menu Overlay -->
    <div
      class="fixed inset-0 bg-white z-50 hidden max-[905px]:block transition-all duration-300"
      :class="{ 'opacity-0 invisible': !menuExpanded, 'opacity-100 visible': menuExpanded }"
      id="mobile-menu-2"
    >
      <!-- Close button -->
      <button
        @click="menuExpanded = false"
        class="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Menu content -->
      <div class="h-full pt-16 px-4 overflow-y-auto">
        <ul class="space-y-4">
          <!-- Product Menu -->
          <li>
            <button 
              class="flex items-center justify-between w-full py-3 text-lg font-medium"
              @click="toggleSection('product')"
            >
              Product
              <svg 
                class="w-5 h-5 transform transition-transform duration-200"
                :class="{ 'rotate-180': openSections.product }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              class="overflow-hidden transition-all duration-200"
              :class="{ 'max-h-0': !openSections.product, 'max-h-[1000px]': openSections.product }"
            >
              <div class="py-4 space-y-4">
                <!-- Product Features -->
                <a href="/pieces" class="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50">
                  <div class="p-2 bg-purple-50 rounded-lg">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="font-medium text-gray-900">Integrations</h3>
                      <span class="bg-purple-100 text-purple-700 text-xs font-semibold rounded-full px-2 py-0.5 h-6 flex items-center">301</span>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">Build AI agents across your apps</p>
                  </div>
                </a>

                <a href="/docs/install/overview" class="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50">
                  <div class="p-2 bg-pink-50 rounded-lg">
                    <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">Get Started</h3>
                    <p class="text-sm text-gray-500 mt-1">Start on our cloud or self-host with Docker</p>
                  </div>
                </a>

                <a href="https://www.activepieces.com/docs/embedding/overview" class="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50">
                  <div class="p-2 bg-green-50 rounded-lg">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">Activepieces Embed</h3>
                    <p class="text-sm text-gray-500 mt-1">Our impressive builder in your app</p>
                  </div>
                </a>

                <a href="https://www.activepieces.com/docs/security/practices" class="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50">
                  <div class="p-2 bg-indigo-50 rounded-lg">
                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">Security</h3>
                    <p class="text-sm text-gray-500 mt-1">We're SOC 2 Type II compliant</p>
                  </div>
                </a>

                <!-- MCP Promo -->
                <a href="/mcp" class="block mb-4">
                  <div class="p-4 rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-500 w-fit hover:from-slate-900 hover:via-slate-800 hover:to-slate-900 hover:border-slate-700 transition-all duration-300 relative overflow-hidden">
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,116,139,0.1),transparent_50%)] animate-pulse"></div>
                    <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(100,116,139,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-gradient"></div>
                    <div class="relative">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-white text-lg tracking-tight">MCP for Agents</span>
                        <span class="bg-gradient-to-r from-slate-400/30 via-slate-300/30 to-slate-200/30 text-white text-xs font-semibold rounded-full px-2 py-0.5 h-6 flex items-center backdrop-blur-sm border border-slate-400/30">NEW</span>
                      </div>
                      <div class="text-xs text-white/80 mt-1 font-light">Give your AI superpowers and let it do the work for you</div>
                    </div>
                  </div>
                </a>

                <!-- By Integration -->
                <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mt-4 mb-2">By Integration</div>
                <div class="flex flex-col">
                  <a href="/pieces/gmail" class="flex items-center gap-2 h-10 rounded-xl hover:bg-gray-100 transition -ml-4 px-4">
                    <span class="w-6 h-6 flex items-center justify-center"><img src="https://cdn.activepieces.com/pieces/gmail.png" class="w-5 h-5" alt="Gmail" /></span>
                    <span class="text-sm text-gray-800">Gmail</span>
                  </a>
                  <a href="/pieces/openai" class="flex items-center gap-2 h-10 rounded-xl hover:bg-gray-100 transition -ml-4 px-4">
                    <span class="w-6 h-6 flex items-center justify-center"><img src="https://cdn.activepieces.com/pieces/openai.png" class="w-5 h-5" alt="OpenAI" /></span>
                    <span class="text-sm text-gray-800">OpenAI</span>
                  </a>
                  <a href="/pieces/slack" class="flex items-center gap-2 h-10 rounded-xl hover:bg-gray-100 transition -ml-4 px-4">
                    <span class="w-6 h-6 flex items-center justify-center"><img src="https://cdn.activepieces.com/pieces/slack.png" class="w-5 h-5" alt="Slack" /></span>
                    <span class="text-sm text-gray-800">Slack</span>
                  </a>
                  <a href="/pieces" class="flex items-center h-10 -ml-4 px-4 group/all-integrations">
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-gray-900 group-hover/all-integrations:text-blue-600 transition-colors duration-300">All integrations</span>
                      <svg class="w-4 h-4 text-gray-900 group-hover/all-integrations:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </li>

          <!-- Resources Menu -->
          <li>
            <button 
              class="flex items-center justify-between w-full py-3 text-lg font-medium"
              @click="toggleSection('resources')"
            >
              Resources
              <svg 
                class="w-5 h-5 transform transition-transform duration-200"
                :class="{ 'rotate-180': openSections.resources }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              class="overflow-hidden transition-all duration-200"
              :class="{ 'max-h-0': !openSections.resources, 'max-h-[1000px]': openSections.resources }"
            >
              <div class="py-4 space-y-4">
                <!-- Use Activepieces Section -->
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-2 px-4">Use Activepieces</h3>
                  <div class="space-y-2">
                    <a href="https://www.activepieces.com/docs/flows/building-flows" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
                        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Concepts</div>
                        <div class="text-sm text-gray-500">Learn how Activepieces works</div>
                      </div>
                    </a>
                    <a href="https://www.youtube.com/playlist?list=PLczrB0CK7kLKRlt_VSM2p5VaVSO1FSPG-" target="_blank" rel="noopener noreferrer" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
                        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Activepieces 101</div>
                        <div class="text-sm text-gray-500">Get up and running in minutes</div>
                      </div>
                      <svg class="w-4 h-4 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/playlist?list=PLczrB0CK7kLJzlRmHL7c8sMYo6L3CbyjI" target="_blank" rel="noopener noreferrer" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
                        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">AI Use Cases</div>
                        <div class="text-sm text-gray-500">See AI automation in action</div>
                      </div>
                      <svg class="w-4 h-4 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </a>
                    <a href="https://community.activepieces.com/c/tutorials/10" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
                        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Community Tutorials</div>
                        <div class="text-sm text-gray-500">Learn from other users</div>
                      </div>
                    </a>
                  </div>
                </div>

                <!-- Technical Section -->
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-2 px-4">Technical</h3>
                  <div class="space-y-2">
                    <a href="https://www.activepieces.com/docs/install/overview" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                        <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Deployment</div>
                        <div class="text-sm text-gray-500">Set up on your servers</div>
                      </div>
                    </a>
                    <a href="https://www.activepieces.com/docs" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                        <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Docs</div>
                        <div class="text-sm text-gray-500">Everything you need to know</div>
                      </div>
                    </a>
                    <a href="/docs/pieces/overview" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                        <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Develop Pieces</div>
                        <div class="text-sm text-gray-500">Build your own integrations</div>
                      </div>
                    </a>
                    <a href="/docs/embedding/overview" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                        <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Embed In Your App</div>
                        <div class="text-sm text-gray-500">Add to your product</div>
                      </div>
                    </a>
                    <a href="/docs/security/practices" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                        <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Security</div>
                        <div class="text-sm text-gray-500">Keep your data safe</div>
                      </div>
                    </a>
                  </div>
                </div>

                <!-- Support Section -->
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-2 px-4">Support</h3>
                  <div class="space-y-2">
                    <a href="https://community.activepieces.com" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 group-hover/item:bg-green-100 transition-colors">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Forum</div>
                        <div class="text-sm text-gray-500">Chat with other users</div>
                      </div>
                    </a>
                    <a href="https://discord.com/invite/2jUXBKDdP8" target="_blank" rel="noopener noreferrer" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 group-hover/item:bg-green-100 transition-colors">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Discord</div>
                        <div class="text-sm text-gray-500">Join our live community</div>
                      </div>
                    </a>
                    <a href="/blog" class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 group/item">
                      <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 group-hover/item:bg-green-100 transition-colors">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-base font-semibold text-gray-900">Blog</div>
                        <div class="text-sm text-gray-500">Latest news and updates</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <!-- Simple Menu Items -->
          <li>
            <a href="/pricing" class="block py-3 text-lg font-medium text-gray-700">Pricing</a>
          </li>
        </ul>
      </div>
    </div>

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
            d="M16.8749 0.635938C16.3874 0.148438 15.5999 0.148438 15.1124 0.635938L8.9999 6.73594L2.8874 0.623437C2.3999 0.135938 1.6124 0.135938 1.1249 0.623437C0.637402 1.11094 0.637402 1.89844 1.1249 2.38594L7.2374 8.49844L1.1249 14.6109C0.637402 15.0984 0.637402 15.8859 1.1249 16.3734C1.6124 16.8609 2.3999 16.8609 2.8874 16.3734C17.3624 15.8859 17.3624 15.0984 16.8749 14.6109L10.7624 8.49844L16.8749 2.38594C17.3499 1.91094 17.3499 1.11094 16.8749 0.635938Z"
            fill="#111111"
          ></path>
        </svg>
      </div>
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
  background-color: #6CAD96;
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
    background-color: #6CAD96;
  }
  28% {
    transform: translateY(-7px);
    background-color: #9ECAB9;
  }
  44% {
    transform: translateY(0px);
    background-color: #B5D9CB;
  }
}

/* Mega Menu Enhancements */
.group {
  position: relative;
}

.group:hover .group-hover\:block {
  display: block;
  animation: menuSlideIn 0.3s ease-out;
}

.group-hover\:block {
  display: none;
  transition-delay: 200ms;
}

.group-hover\:opacity-100 {
  opacity: 0;
  transition: opacity 0.3s ease;
  transition-delay: 200ms;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
  transition-delay: 0s;
}

.group-hover\:translate-y-0 {
  transform: translateY(10px);
  transition: transform 0.3s ease;
  transition-delay: 200ms;
}

.group:hover .group-hover\:translate-y-0 {
  transform: translateY(0);
  transition-delay: 0s;
}

/* Hover Bridge Styles */
.group:hover .group-hover\:pointer-events-auto {
  pointer-events: auto;
}

.group .group-hover\:pointer-events-none {
  pointer-events: none;
}

/* Remove desktop hover effects on mobile */
@media (max-width: 905px) {
  .group-hover\:block,
  .group-hover\:opacity-100,
  .group-hover\:translate-y-0,
  .group-hover\:text-blue-600,
  .group-hover\:bg-blue-100 {
    all: unset;
  }
}

/* Add these new animations to your existing styles */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  animation: gradient 15s ease infinite;
}

/* Add glassmorphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Hide announcement bar when .hide is applied */
#announcement-bar {
  transition: transform 0.3s;
}
#announcement-bar.hide {
  transform: translateY(-100%);
}
</style>