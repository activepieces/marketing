<script setup>
import { onMounted, ref, defineProps, onBeforeUnmount } from "vue";
import { useStorage, useScroll } from "@vueuse/core";
import { useRoute } from "vue-router";
import { initCollapses } from "flowbite";
import GithubStarBadge from "~/components/GithubStarBadge.vue";
import { usePiecesCount } from "~/composables/usePiecesCount";

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
  transparent: {
    type: Boolean,
    default: false,
  },
});

const { y } = process.client ? useScroll(window) : { y: ref(0) };
const isScrolled = computed(() => process.client && isLoaded.value && y.value > 50);
const isPricingPage = computed(() => route.path === '/pricing');

// Show white/transparent styling only when transparent prop is true AND not scrolled
// On initial load, if transparent is true, start transparent (don't wait for isLoaded)
const showTransparent = computed(() => {
  if (!props.transparent) return false;
  // If not loaded yet, assume transparent (will update after mount)
  if (!isLoaded.value) return true;
  // After loaded, check scroll position
  return !isScrolled.value;
});

const showGitHubBadge = ref(!props.hideGithubBadge);
const githubButtonsScriptLoaded = ref("false");
const gitHubBadgeHidden = useStorage("github-badge-hidden");

// Get pieces count dynamically
const { piecesCount, pending: piecesCountPending } = usePiecesCount();

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
  <div class="m-0 p-0">
    <header
      class="z-50 w-full transition-all duration-300 m-0 group/header overflow-visible"
      :class="{ 
        'sticky top-0': !isPricingPage, 
        'fixed top-0': isPricingPage,
        'bg-white max-[905px]:bg-white': !showTransparent || isScrolled,
        'bg-transparent max-[905px]:bg-transparent': showTransparent && !isScrolled
      }"
    >
        <nav class="border-gray-200 px-4 h-[62px] lg:px-6 dark:bg-gray-800 transition-all duration-300 overflow-visible"
          :class="{ 
            'group-hover/header:bg-white': showTransparent,
            'bg-white max-[905px]:bg-white': !showTransparent || isScrolled,
            'bg-transparent max-[905px]:bg-transparent': showTransparent && !isScrolled
          }">
          <div
            class="flex flex-wrap space-x-10 h-full items-stretch justify-between w-full overflow-visible
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
                  class="mr-3 w-fit h-6 max-[555px]:h-8 max-[5555px]:object-cover max-[555px]:object-left transition-all duration-300"
                  :class="{
                    'brightness-0 invert group-hover/header:brightness-100 group-hover/header:invert-0': showTransparent
                  }"
                  alt="Activepieces Home"
                />
              </NuxtLink>
            </div>
            <div class="flex items-center flex-grow-0 min-[906px]:order-2 gap-4">
              <!-- Partners Section -->
              <div class="flex items-center gap-3 max-[905px]:hidden">
                <NuxtLink
                  to="/reseller"
                  class="px-3 py-2 transition-colors duration-200 font-normal hover:!text-[#8142e3]"
                  :class="{'text-white group-hover/header:text-gray-900': showTransparent, 'text-gray-900': !showTransparent}"
                  >Become a Reseller</NuxtLink
                >
                <NuxtLink
                  to="/content-creators"
                  class="px-3 py-2 transition-colors duration-200 font-normal hover:!text-[#8142e3]"
                  :class="{'text-white group-hover/header:text-gray-900': showTransparent, 'text-gray-900': !showTransparent}"
                  >Content Creators</NuxtLink
                >
              </div>
              
              <!-- Vertical Separator -->
              <div class="h-6 w-px bg-gray-300 max-[905px]:hidden"
                :class="{'bg-white/30 group-hover/header:bg-gray-300': showTransparent}"></div>
              
              <a
                href="https://cloud.activepieces.com"
                class="px-3 py-2 max-[555px]:hidden transition-colors duration-200 font-normal hover:!text-[#8142e3]"
                :class="{'text-white group-hover/header:text-gray-900': showTransparent, 'text-gray-900': !showTransparent}"
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
              class="flex flex-grow hidden text-base justify-between items-center w-full overflow-visible
                min-[906px]:flex min-[906px]:w-auto min-[906px]:order-1 max-[905px]:bg-white max-[905px]:w-full max-[905px]:max-h-dvh max-[905px]:flex-col max-[905px]:justify-start max-[905px]:items-stretch max-[905px]:overflow-scroll max-[905px]:!-mx-4 max-[905px]:px-4 max-[905px]:h-[calc(100vh_-_62px)]"
              id="mobile-menu-2"
            >
              <ul class="flex flex-col min-[906px]:flex-row min-[906px]:items-center min-[906px]:space-x-8 max-[905px]:w-full overflow-visible">
                <!-- Mission -->
                <li>
                  <NuxtLink to="/story" class="py-2 transition-colors duration-200 font-normal hover:!text-[#8142e3]"
                    :class="{ 
                      'text-white group-hover/header:text-gray-900': showTransparent,
                      'text-gray-900': !showTransparent
                    }">Mission</NuxtLink>
                </li>

                <!-- Product Mega Menu -->
                <li class="relative group/menu">
                  <!-- Hover Bridge -->
                  <div class="absolute left-0 top-0 w-full h-[calc(100%+10px)] opacity-0 pointer-events-auto z-10"></div>
                  
                  <!-- Menu Button -->
                  <button class="flex items-center gap-1 py-2 transition-colors duration-200"
                    :class="{ 
                      'text-white group-hover/header:text-gray-900': showTransparent,
                      'text-gray-900': !showTransparent
                    }">
                    <span class="font-normal button-text" :class="{ 
                      'text-white group-hover/header:text-gray-900': showTransparent,
                      'text-gray-900': !showTransparent
                    }">Platform</span>
                    <svg class="w-4 h-4 transition-transform duration-200 ease-in-out transform origin-center group-hover/menu:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Mega Menu Content -->
                  <div class="absolute left-0 top-full z-[60] w-[500px] rounded-xl shadow-xl bg-white p-4 grid grid-cols-[3fr_2fr] gap-0 block transition-all duration-300 delay-200 transform translate-y-2 opacity-0 group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:delay-0 border border-gray-100 pointer-events-none group-hover/menu:pointer-events-auto overflow-hidden">
                    <!-- Left Column: Product Pages -->
                    <div class="flex min-w-0 flex flex-col gap-0 pr-4 group/list">
                      <!-- AI Adoption Stack -->
                      <NuxtLink to="/product/ai-adoption" class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100">
                        <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                        <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">AI Adoption Stack</span>
                        <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                      </NuxtLink>
                      <!-- AI Agents -->
                      <NuxtLink to="/product/ai-agent-builder" class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100">
                        <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                        <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">AI Agents</span>
                        <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                      </NuxtLink>
                      <!-- Control & Governance -->
                      <NuxtLink to="/product/governance-and-management" class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100">
                        <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                        <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Control & Governance</span>
                        <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                      </NuxtLink>
                      <!-- Deployment & Cost -->
                      <NuxtLink to="/product/deployment-options" class="flex items-center gap-2.5 px-2 py-3 transition group/feature">
                        <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                        <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Deployment & Cost</span>
                        <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                      </NuxtLink>
                    </div>
                    <!-- Right Column: Apps -->
                    <div class="flex min-w-0 flex flex-col gap-0 bg-gray-50 -mr-4 -mt-4 -mb-4 p-3">
                      <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2"><span v-if="!piecesCountPending">{{ piecesCount }}+</span> Integrations</div>
                      <div class="flex flex-col gap-0">
                        <a href="/pieces/gmail" class="group/app flex items-center gap-2.5 h-9 px-2">
                          <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/gmail.png" class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md" alt="Gmail" /></span>
                          <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">Gmail</span>
                        </a>
                        <a href="/pieces/openai" class="group/app flex items-center gap-2.5 h-9 px-2">
                          <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/openai.png" class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md" alt="OpenAI" /></span>
                          <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">OpenAI</span>
                        </a>
                        <a href="/pieces/slack" class="group/app flex items-center gap-2.5 h-9 px-2">
                          <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/slack.png" class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md" alt="Slack" /></span>
                          <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">Slack</span>
                        </a>
                        <a href="/pieces/notion" class="group/app flex items-center gap-2.5 h-9 px-2">
                          <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/notion.png" class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md" alt="Notion" /></span>
                          <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">Notion</span>
                        </a>
                        <a href="/pieces/hubspot" class="group/app flex items-center gap-2.5 h-9 px-2">
                          <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/hubspot.png" class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md" alt="HubSpot" /></span>
                          <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">HubSpot</span>
                        </a>
                        <a href="/pieces" class="group/app flex items-center gap-1 h-9 px-2 mt-1 pt-1 border-t border-gray-200">
                          <span class="text-sm text-gray-500 transition-colors duration-200 group-hover/app:text-gray-900">View all</span>
                          <svg class="w-3.5 h-3.5 text-gray-400 transition-all duration-200 group-hover/app:text-gray-900 group-hover/app:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>

                <!-- Resources Mega Menu -->
                <li class="relative group/menu">
                  <!-- Hover Bridge -->
                  <div class="absolute left-0 top-0 w-full h-[calc(100%+10px)] opacity-0 pointer-events-auto z-10"></div>
                  
                  <!-- Menu Button -->
                  <button class="flex items-center gap-1 py-2 transition-colors duration-200"
                    :class="{ 
                      'text-white group-hover/header:text-gray-900': showTransparent,
                      'text-gray-900': !showTransparent
                    }">
                    <span class="font-normal button-text" :class="{ 
                      'text-white group-hover/header:text-gray-900': showTransparent,
                      'text-gray-900': !showTransparent
                    }">Resources</span>
                    <svg class="w-4 h-4 transition-transform duration-200 ease-in-out transform origin-center group-hover/menu:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Mega Menu Content -->
                  <div class="absolute left-0 top-full z-[60] w-[260px] rounded-xl shadow-xl bg-white p-3 flex flex-col gap-0 block transition-all duration-300 delay-200 transform translate-y-2 opacity-0 group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:delay-0 border border-gray-100 pointer-events-none group-hover/menu:pointer-events-auto group/list">
                      <a href="https://www.activepieces.com/docs" class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100">
                        <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                        <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Docs</span>
                        <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                      </a>
                      <a href="https://community.activepieces.com" class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100">
                        <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                        <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Support Forum</span>
                        <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                      <a href="https://discord.com/invite/2jUXBKDdP8" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 px-2 py-3 transition group/feature">
                        <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                        <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Discord</span>
                        <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                  </div>
                </li>

                <!-- Simple Menu Items -->
                <li>
                  <a href="/pricing" class="py-2 transition-colors duration-200 font-normal hover:!text-[#8142e3]"
                    :class="{ 
                      'text-white group-hover/header:text-gray-900': showTransparent,
                      'text-gray-900': !showTransparent
                    }">Pricing</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

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
              Platform
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
              <div class="py-3 space-y-0 group/list">
                <!-- Product Pages -->
                <NuxtLink to="/product/ai-adoption" class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100">
                  <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                  <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">AI Adoption Stack</span>
                  <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </NuxtLink>

                <NuxtLink to="/product/ai-agent-builder" class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100">
                  <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                  <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">AI Agents</span>
                  <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </NuxtLink>

                <NuxtLink to="/product/governance-and-management" class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100">
                  <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                  <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Control & Governance</span>
                  <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </NuxtLink>

                <NuxtLink to="/product/deployment-options" class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature">
                  <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                  <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Deployment & Cost</span>
                  <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </NuxtLink>

                <!-- By Integration -->
                <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 mt-3 px-2.5"><span v-if="!piecesCountPending">{{ piecesCount }}+</span> Integrations</div>
                <div class="flex flex-col gap-0">
                  <a href="/pieces/gmail" class="group/app flex items-center gap-2.5 h-10 px-2.5">
                    <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/gmail.png" class="w-5 h-5" alt="Gmail" /></span>
                    <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">Gmail</span>
                  </a>
                  <a href="/pieces/openai" class="group/app flex items-center gap-2.5 h-10 px-2.5">
                    <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/openai.png" class="w-5 h-5" alt="OpenAI" /></span>
                    <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">OpenAI</span>
                  </a>
                  <a href="/pieces/slack" class="group/app flex items-center gap-2.5 h-10 px-2.5">
                    <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/slack.png" class="w-5 h-5" alt="Slack" /></span>
                    <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">Slack</span>
                  </a>
                  <a href="/pieces/notion" class="group/app flex items-center gap-2.5 h-10 px-2.5">
                    <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/notion.png" class="w-5 h-5" alt="Notion" /></span>
                    <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">Notion</span>
                  </a>
                  <a href="/pieces/hubspot" class="group/app flex items-center gap-2.5 h-10 px-2.5">
                    <span class="w-5 h-5 flex items-center justify-center flex-shrink-0"><img src="https://cdn.activepieces.com/pieces/hubspot.png" class="w-5 h-5" alt="HubSpot" /></span>
                    <span class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900">HubSpot</span>
                  </a>
                  <a href="/pieces" class="group/app flex items-center gap-1 h-10 px-2.5 mt-1 pt-1 border-t border-gray-200">
                    <span class="text-sm text-gray-500 transition-colors duration-200 group-hover/app:text-gray-900">View all</span>
                    <svg class="w-3.5 h-3.5 text-gray-400 transition-all duration-200 group-hover/app:text-gray-900 group-hover/app:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
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
              <div class="py-3 space-y-0 group/list">
                <a href="https://www.activepieces.com/docs" class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100">
                  <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                  <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Docs</span>
                  <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="https://community.activepieces.com" class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100">
                  <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                  <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Support Forum</span>
                  <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="https://discord.com/invite/2jUXBKDdP8" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature">
                  <div class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"></div>
                  <span class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight">Discord</span>
                  <svg class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </li>

          <!-- Partners Links in Mobile -->
          <li class="border-t border-gray-200 pt-4 mt-4">
            <div class="px-2 space-y-2">
              <NuxtLink to="/reseller" class="block py-2 text-base font-medium text-gray-700 hover:text-[#8142e3]">
                Become a Reseller
              </NuxtLink>
              <NuxtLink to="/content-creators" class="block py-2 text-base font-medium text-gray-700 hover:text-[#8142e3]">
                Content Creators
              </NuxtLink>
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

/* Ensure button text and icon hover works correctly */
button:hover .button-text,
button:hover svg {
  color: #8142e3 !important;
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

/* Ensure header and containers allow overflow for dropdowns */
header,
header nav,
header nav > div,
header ul,
li[class*="group/menu"] {
  overflow: visible !important;
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

/* Grey out other items when one is hovered */
.group\/list:has(.group\/feature:hover) .group\/feature:not(:hover) {
  opacity: 0.7;
}

.group\/list .group\/feature {
  transition: opacity 0.2s ease;
}

/* Grey out text in non-hovered items */
.group\/list:has(.group\/feature:hover) .group\/feature:not(:hover) span {
  color: rgb(107 114 128) !important; /* text-gray-500 */
}

/* Grey out arrows in non-hovered items, but don't interfere with hovered item's arrow animation */
.group\/list:has(.group\/feature:hover) .group\/feature:not(:hover) svg {
  color: rgb(107 114 128) !important; /* text-gray-500 */
}

/* Grey out shapes in non-hovered items */
.group\/list:has(.group\/feature:hover) .group\/feature:not(:hover) div[class*="rounded-sm"] {
  background-color: rgb(107 114 128) !important; /* bg-gray-500 */
}

/* Ensure hovered item's arrow animation works properly */
.group\/list .group\/feature:hover svg {
  color: rgb(17 24 39) !important; /* text-gray-900 - keep it black */
}

/* Ensure hovered item's shape stays black */
.group\/list .group\/feature:hover div[class*="rounded-sm"] {
  background-color: rgb(17 24 39) !important; /* bg-gray-900 - keep it black */
}
</style>