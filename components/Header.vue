<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useStorage, useScroll } from "@vueuse/core";
import { useRoute } from "vue-router";
import { initCollapses } from "flowbite";
import GithubStarBadge from "~/components/GithubStarBadge.vue";
import { usePiecesCount } from "~/composables/usePiecesCount";
import { useProductSubmenu } from "~/composables/useProductSubmenu";

const route = useRoute();
const isLoaded = ref(false);
// Announcement bar slides up on scroll down, reappears on scroll up
const showAnnouncementBar = ref(true);
let lastScrollY = 0;
let ticking = false;

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
const isScrolled = computed(
  () => process.client && isLoaded.value && y.value > 50
);
const isPricingPage = computed(() => route.path === "/pricing");

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

// Get product submenu sections
const { sections: productSubmenuSections } = useProductSubmenu();

// Platform menu hover state and hero images
const hoveredPlatformItem = ref(null);

const defaultHeroImage = '/images/ai-adoption-stack/ai-adoption-stack-hero.png';

const platformPages = [
  { 
    id: 'ai-adoption',
    name: 'AI Adoption Stack', 
    path: '/product/ai-adoption',
    heroImage: '/images/ai-adoption-stack/ai-adoption-stack-hero.png',
    filterStyle: null
  },
  { 
    id: 'ai-agents',
    name: 'AI Agents', 
    path: '/product/ai-agent-builder',
    heroImage: null,
    filterStyle: 'hue-rotate(280deg) saturate(1.3)',
    overlayGradient: 'linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(139,92,246,0.3) 100%)'
  },
  { 
    id: 'governance',
    name: 'Control & Governance', 
    path: '/product/governance-and-management',
    heroImage: null,
    filterStyle: 'hue-rotate(100deg) saturate(1.2)',
    overlayGradient: 'linear-gradient(135deg, rgba(34,197,94,0.3) 0%, rgba(20,184,166,0.3) 100%)'
  },
  { 
    id: 'deployment',
    name: 'Deployment & Cost', 
    path: '/product/deployment-options',
    heroImage: null,
    filterStyle: 'hue-rotate(180deg) saturate(1.2)',
    overlayGradient: 'linear-gradient(135deg, rgba(6,182,212,0.3) 0%, rgba(59,130,246,0.3) 100%)'
  },
];

const currentPlatformPage = computed(() => {
  if (!hoveredPlatformItem.value) return null;
  return platformPages.find(p => p.id === hoveredPlatformItem.value);
});

// Mobile menu state
let menuExpanded = ref(false);
const openSections = ref({
  product: false,
  resources: false,
  partners: false,
  learn: false,
  community: false,
  support: false,
});

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section];
};

const closeAllSections = () => {
  Object.keys(openSections.value).forEach((key) => {
    openSections.value[key] = false;
  });
};

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 20) {
        showAnnouncementBar.value = false;
      } else {
        showAnnouncementBar.value = true;
      }
      lastScrollY = currentY;
      ticking = false;
    });
    ticking = true;
  }
};

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
  const bar = document.getElementById("announcement-bar");
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > lastScrollY && window.scrollY > 20) {
          bar && bar.classList.add("hide");
        } else {
          bar && bar.classList.remove("hide");
        }
        lastScrollY = window.scrollY;
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(showAnnouncementBar, (val) => {
  window.dispatchEvent(new CustomEvent("ap-announcement-bar", { detail: val }));
});
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
      }"
    >
      <nav
        class="max-w-7xl mx-auto rounded-full pl-6 pr-2 py-2 dark:bg-gray-800 transition-all duration-300 overflow-visible max-[1280px]:mx-2 max-[1280px]:mt-2 shadow-sm"
        :class="{
          'group-hover/header:bg-white': showTransparent,
          'bg-white max-[905px]:bg-white': !showTransparent || isScrolled,
          'bg-transparent max-[905px]:bg-transparent':
            showTransparent && !isScrolled,
        }"
      >
        <div
          class="flex flex-wrap space-x-10 h-full items-stretch justify-between w-full overflow-visible max-[905px]:space-x-0"
        >
          <div
            class="flex flex-row flex-shrink-0 flex-grow-0 items-center max-[555px]:overflow-hidden max-[555px]:w-[30px]"
          >
            <NuxtLink to="/" class="flex items-center">
              <img
                src="/images/activepieces-logo-h.svg"
                width="200"
                height="100"
                class="mr-3 w-fit h-6 max-[555px]:h-8 max-[5555px]:object-cover max-[555px]:object-left transition-all duration-300"
                :class="{
                  'brightness-0 invert group-hover/header:brightness-100 group-hover/header:invert-0':
                    showTransparent,
                }"
                alt="Activepieces Home"
              />
            </NuxtLink>
          </div>
          <div class="flex items-center flex-grow-0 min-[906px]:order-2 gap-4">
            <a
              href="https://cloud.activepieces.com"
              class="flex items-center px-4 py-1.5 rounded-full max-[555px]:hidden transition-colors duration-200 font-normal hover:!text-[#8142e3]"
              :class="{
                'text-white group-hover/header:text-gray-900': showTransparent,
                'text-gray-900': !showTransparent,
              }"
              >Login</a
            >
            <div class="flex flex-row gap-1">
              <router-link
                to="/sales"
                class="px-4 py-1.5 rounded-full border border-slate-300"
                >Talk to sales</router-link
              >
              <a
                href="https://cloud.activepieces.com/sign-up"
                class="group relative inline-flex items-center justify-center rounded-full px-4 py-1.5 text-base font-medium text-white transition-all duration-200 ring-0 ring-primary-dark hover:ring-2 bg-primary-dark"
              >
                Start free
              </a>
            </div>
            <button
              ref="mobileMenu"
              data-collapse-toggle="mobile-menu-2"
              type="button"
              class="inline-flex items-center p-2 ms-2 text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 max-[905px]:flex"
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
            class="flex flex-grow hidden text-base justify-between items-center w-full overflow-visible min-[906px]:flex min-[906px]:w-auto min-[906px]:order-1 max-[905px]:bg-white max-[905px]:w-full max-[905px]:max-h-dvh max-[905px]:flex-col max-[905px]:justify-start max-[905px]:items-stretch max-[905px]:overflow-scroll max-[905px]:!-mx-4 max-[905px]:px-4 max-[905px]:h-[calc(100vh_-_62px)]"
            id="mobile-menu-2"
          >
            <ul
              class="flex flex-col min-[906px]:flex-row min-[906px]:items-center min-[906px]:gap-1 max-[905px]:w-full overflow-visible"
            >
              <!-- Product Mega Menu -->
              <li class="relative group/menu">
                <!-- Hover Bridge -->
                <div
                  class="absolute left-0 top-0 w-full h-[calc(100%+10px)] opacity-0 pointer-events-auto z-10"
                ></div>

                <!-- Menu Button -->
                <button
                  class="flex items-center gap-1 px-4 py-1.5 rounded-full transition-colors duration-200"
                  :class="{
                    'text-white group-hover/header:text-gray-900':
                      showTransparent,
                    'text-gray-900': !showTransparent,
                  }"
                >
                  <span
                    class="button-text"
                    :class="{
                      'text-white group-hover/header:text-gray-900':
                        showTransparent,
                      'text-gray-900': !showTransparent,
                    }"
                    >Platform</span
                  >
                  <svg
                    class="w-4 h-4 transition-transform duration-200 ease-in-out transform origin-center group-hover/menu:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <!-- Mega Menu Content -->
                <div
                  class="absolute left-0 top-full z-[60] rounded-xl shadow-xl ring-1 ring-gray-100 bg-white flex transition-all duration-300 ease-out transform translate-y-2 opacity-0 group-hover/menu:opacity-100 group-hover/menu:translate-y-0 pointer-events-none group-hover/menu:pointer-events-auto overflow-hidden"
                  @mouseleave="hoveredPlatformItem = null"
                >
                  <!-- Left Column: Product Pages -->
                  <div class="flex flex-col gap-0 p-4 group/list flex-shrink-0">
                    <div 
                      class="flex flex-col gap-0"
                      @mouseleave="hoveredPlatformItem = null"
                    >
                      <!-- AI Adoption Stack -->
                      <NuxtLink
                        to="/product/ai-adoption"
                        class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100 whitespace-nowrap"
                        @mouseenter="hoveredPlatformItem = 'ai-adoption'"
                      >
                        <div
                          class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                        ></div>
                        <span
                          class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                          >AI Adoption Stack</span
                        >
                        <svg
                          class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </NuxtLink>
                      <!-- AI Agents -->
                      <NuxtLink
                        to="/product/ai-agent-builder"
                        class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100 whitespace-nowrap"
                        @mouseenter="hoveredPlatformItem = 'ai-agents'"
                      >
                        <div
                          class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                        ></div>
                        <span
                          class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                          >AI Agents</span
                        >
                        <svg
                          class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </NuxtLink>
                      <!-- Control & Governance -->
                      <NuxtLink
                        to="/product/governance-and-management"
                        class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100 whitespace-nowrap"
                        @mouseenter="hoveredPlatformItem = 'governance'"
                      >
                        <div
                          class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                        ></div>
                        <span
                          class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                          >Control & Governance</span
                        >
                        <svg
                          class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </NuxtLink>
                      <!-- Deployment & Cost -->
                      <NuxtLink
                        to="/product/deployment-options"
                        class="flex items-center gap-2.5 px-2 py-3 transition group/feature whitespace-nowrap"
                        @mouseenter="hoveredPlatformItem = 'deployment'"
                      >
                        <div
                          class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                        ></div>
                        <span
                          class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                          >Deployment & Cost</span
                        >
                        <svg
                          class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          stroke-width="2.5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </NuxtLink>
                    </div>
                  </div>
                  <!-- Right Column: Hero Image/Placeholder or Apps -->
                  <div
                    class="flex flex-col overflow-hidden relative transition-all duration-300 ease-out"
                    :class="[
                      currentPlatformPage ? 'w-[400px] bg-gray-900' : 'w-[200px]'
                    ]"
                  >
                    <!-- Hero Image/Placeholder Preview Container -->
                    <div 
                      class="absolute inset-0 overflow-hidden transition-opacity duration-300"
                      :class="currentPlatformPage ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
                    >
                      <!-- Vertical sliding container for all pages -->
                      <div 
                        class="absolute inset-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        :style="{ transform: `translateY(${hoveredPlatformItem ? -platformPages.findIndex(p => p.id === hoveredPlatformItem) * 265 : -30}px)` }"
                      >
                        <!-- Each page preview -->
                        <div 
                          v-for="(page, index) in platformPages" 
                          :key="page.id"
                          class="w-full flex-shrink-0 relative h-[265px] overflow-hidden"
                        >
                          <!-- Hero Image (original or with filter) -->
                          <img 
                            :src="page.heroImage || defaultHeroImage" 
                            :alt="page.name"
                            class="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] object-cover scale-150"
                            :style="page.filterStyle ? { filter: page.filterStyle } : {}"
                          />
                          <!-- Color overlay for filtered images -->
                          <div 
                            v-if="page.overlayGradient"
                            class="absolute inset-0 pointer-events-none"
                            :style="{ background: page.overlayGradient }"
                          ></div>
                        </div>
                        <!-- First item repeated at end for circular peek effect -->
                        <div class="w-full flex-shrink-0 relative h-[265px] overflow-hidden">
                          <img 
                            :src="platformPages[0].heroImage || defaultHeroImage" 
                            :alt="platformPages[0].name"
                            class="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] object-cover scale-150"
                            :style="platformPages[0].filterStyle ? { filter: platformPages[0].filterStyle } : {}"
                          />
                          <div 
                            v-if="platformPages[0].overlayGradient"
                            class="absolute inset-0 pointer-events-none"
                            :style="{ background: platformPages[0].overlayGradient }"
                          ></div>
                        </div>
                      </div>
                      <!-- Subtle gradient overlay at bottom to hint at next item -->
                      <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                    </div>
                    <!-- Default: Integrations List -->
                    <div 
                      class="flex flex-col gap-0 p-4 pr-6 bg-gray-50 h-full transition-opacity duration-300 rounded-r-xl"
                      :class="currentPlatformPage ? 'opacity-0 pointer-events-none' : 'opacity-100'"
                    >
                      <div
                        class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2 whitespace-nowrap"
                      >
                        <span v-if="!piecesCountPending">{{ piecesCount }}+</span>
                        Integrations
                      </div>
                      <div class="flex flex-col gap-0">
                        <a
                          href="/pieces/gmail"
                          class="group/app flex items-center gap-2.5 h-9 px-2"
                        >
                          <span
                            class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                            ><img
                              src="https://cdn.activepieces.com/pieces/gmail.png"
                              class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md"
                              alt="Gmail"
                          /></span>
                          <span
                            class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                            >Gmail</span
                          >
                        </a>
                        <a
                          href="/pieces/openai"
                          class="group/app flex items-center gap-2.5 h-9 px-2"
                        >
                          <span
                            class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                            ><img
                              src="https://cdn.activepieces.com/pieces/openai.png"
                              class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md"
                              alt="OpenAI"
                          /></span>
                          <span
                            class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                            >OpenAI</span
                          >
                        </a>
                        <a
                          href="/pieces/slack"
                          class="group/app flex items-center gap-2.5 h-9 px-2"
                        >
                          <span
                            class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                            ><img
                              src="https://cdn.activepieces.com/pieces/slack.png"
                              class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md"
                              alt="Slack"
                          /></span>
                          <span
                            class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                            >Slack</span
                          >
                        </a>
                        <a
                          href="/pieces/notion"
                          class="group/app flex items-center gap-2.5 h-9 px-2"
                        >
                          <span
                            class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                            ><img
                              src="https://cdn.activepieces.com/pieces/notion.png"
                              class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md"
                              alt="Notion"
                          /></span>
                          <span
                            class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                            >Notion</span
                          >
                        </a>
                        <a
                          href="/pieces/hubspot"
                          class="group/app flex items-center gap-2.5 h-9 px-2"
                        >
                          <span
                            class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                            ><img
                              src="https://cdn.activepieces.com/pieces/hubspot.png"
                              class="w-5 h-5 transition duration-200 group-hover/app:drop-shadow-md"
                              alt="HubSpot"
                          /></span>
                          <span
                            class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                            >HubSpot</span
                          >
                        </a>
                        <a
                          href="/pieces"
                          class="group/app flex items-center gap-1 h-9 px-2 mt-1 pt-1 border-t border-gray-200"
                        >
                          <span
                            class="text-sm text-gray-500 transition-colors duration-200 group-hover/app:text-gray-900"
                            >View all</span
                          >
                          <svg
                            class="w-3.5 h-3.5 text-gray-400 transition-all duration-200 group-hover/app:text-gray-900 group-hover/app:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <!-- Resources Mega Menu -->
              <li class="relative group/menu">
                <!-- Hover Bridge -->
                <div
                  class="absolute left-0 top-0 w-full h-[calc(100%+10px)] opacity-0 pointer-events-auto z-10"
                ></div>

                <!-- Menu Button -->
                <button
                  class="flex items-center gap-1 rounded-full px-4 py-1.5 transition-colors duration-200"
                  :class="{
                    'text-white group-hover/header:text-gray-900':
                      showTransparent,
                    'text-gray-900': !showTransparent,
                  }"
                >
                  <span
                    class="font-normal button-text"
                    :class="{
                      'text-white group-hover/header:text-gray-900':
                        showTransparent,
                      'text-gray-900': !showTransparent,
                    }"
                    >Resources</span
                  >
                  <svg
                    class="w-4 h-4 transition-transform duration-200 ease-in-out transform origin-center group-hover/menu:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <!-- Mega Menu Content -->
                <div
                  class="absolute left-0 top-full z-[60] w-[520px] rounded-xl shadow-xl bg-white p-4 grid grid-cols-[1fr_1fr] gap-4 block transition-all duration-75 transform translate-y-2 opacity-0 group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:duration-200 border border-gray-100 pointer-events-none group-hover/menu:pointer-events-auto"
                >
                  <!-- Left Column: Links -->
                  <div class="flex flex-col gap-0 group/list">
                    <a
                      href="https://www.activepieces.com/docs"
                      class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100"
                    >
                      <div
                        class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                      ></div>
                      <span
                        class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                        >Docs</span
                      >
                      <svg
                        class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://community.activepieces.com"
                      class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100"
                    >
                      <div
                        class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                      ></div>
                      <span
                        class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                        >Support Forum</span
                      >
                      <svg
                        class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@activepiecesco"
                      target="_blank"
                      class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100"
                    >
                      <div
                        class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                      ></div>
                      <span
                        class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                        >YouTube</span
                      >
                      <svg
                        class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://discord.com/invite/2jUXBKDdP8"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2.5 px-2 py-3 transition group/feature"
                    >
                      <div
                        class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                      ></div>
                      <span
                        class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                        >Discord</span
                      >
                      <svg
                        class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </a>
                  </div>
                  
                  <!-- Right Column: Case Studies -->
                  <div class="flex flex-col gap-1.5 bg-gray-50 -m-4 ml-0 p-3 rounded-r-xl min-w-[220px]">
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 px-2">Customer Stories</div>
                    
                    <!-- Alan Case Study -->
                    <NuxtLink
                      to="/customers/alan"
                      class="group/card flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                    >
                      <div class="min-w-0 flex-1">
                        <div class="text-[10px] text-gray-400 uppercase tracking-wide">Health Insurance</div>
                        <div class="text-sm font-semibold text-gray-900">Alan</div>
                        <div class="text-xs text-gray-500">300+ AI workflows</div>
                      </div>
                      <div class="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <img 
                          src="/case-studies/alan-jeremie.png" 
                          alt="Jérémie Preault" 
                          class="absolute top-0 -right-2 w-32 h-auto object-contain -scale-x-100"
                        />
                      </div>
                    </NuxtLink>
                    
                    <!-- Funding Societies Case Study -->
                    <NuxtLink
                      to="/customers/funding-societies"
                      class="group/card flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                    >
                      <div class="min-w-0 flex-1">
                        <div class="text-[10px] text-gray-400 uppercase tracking-wide">Fintech</div>
                        <div class="text-sm font-semibold text-gray-900">Funding Societies</div>
                        <div class="text-xs text-gray-500">90% time saved</div>
                      </div>
                      <div class="relative w-14 h-16 flex-shrink-0 overflow-visible">
                        <img 
                          src="/case-studies/funding-societies-shawn.png" 
                          alt="Shawn Lim" 
                          class="absolute bottom-0 right-0 w-[70px] h-auto object-contain"
                        />
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </li>

              <!-- Partners Mega Menu -->
              <li class="relative group/menu">
                <!-- Hover Bridge -->
                <div
                  class="absolute left-0 top-0 w-full h-[calc(100%+10px)] opacity-0 pointer-events-auto z-10"
                ></div>

                <!-- Menu Button -->
                <button
                  class="flex items-center gap-1 rounded-full px-4 py-1.5 transition-colors duration-200"
                  :class="{
                    'text-white group-hover/header:text-gray-900':
                      showTransparent,
                    'text-gray-900': !showTransparent,
                  }"
                >
                  <span
                    class="font-normal button-text"
                    :class="{
                      'text-white group-hover/header:text-gray-900':
                        showTransparent,
                      'text-gray-900': !showTransparent,
                    }"
                    >Partners & Creators</span
                  >
                  <svg
                    class="w-4 h-4 transition-transform duration-200 ease-in-out transform origin-center group-hover/menu:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <!-- Mega Menu Content -->
                <div
                  class="absolute left-0 top-full z-[60] w-[260px] rounded-xl shadow-xl bg-white p-3 flex flex-col gap-0 block transition-all duration-75 transform translate-y-2 opacity-0 group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:duration-200 border border-gray-100 pointer-events-none group-hover/menu:pointer-events-auto group/list"
                >
                  <NuxtLink
                    to="/content-creators"
                    class="flex items-center gap-2.5 px-2 py-3 transition group/feature border-b border-gray-100"
                  >
                    <div
                      class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                    ></div>
                    <span
                      class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                      >Content Creators</span
                    >
                    <svg
                      class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </NuxtLink>
                  <NuxtLink
                    to="/reseller"
                    class="flex items-center gap-2.5 px-2 py-3 transition group/feature"
                  >
                    <div
                      class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                    ></div>
                    <span
                      class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                      >Become a Reseller</span
                    >
                    <svg
                      class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </NuxtLink>
                </div>
              </li>

              <!-- Simple Menu Items -->
              <li>
                <a
                  href="/pricing"
                  class="flex items-center px-4 py-1.5 rounded-full transition-colors duration-200 hover:!text-[#8142e3]"
                  :class="{
                    'text-white group-hover/header:text-gray-900':
                      showTransparent,
                    'text-gray-900': !showTransparent,
                  }"
                  >Pricing</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Product Section Submenu - rendered as part of header -->
      <ProductSectionSubmenu v-if="productSubmenuSections.length > 0" />
    </header>

    <!-- Mobile Menu Overlay -->
    <div
      class="fixed inset-0 bg-white z-50 hidden max-[905px]:block transition-all duration-300"
      :class="{
        'opacity-0 invisible': !menuExpanded,
        'opacity-100 visible': menuExpanded,
      }"
      id="mobile-menu-2"
    >
      <!-- Close button -->
      <button
        @click="menuExpanded = false"
        class="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
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
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="overflow-hidden transition-all duration-200"
              :class="{
                'max-h-0': !openSections.product,
                'max-h-[1000px]': openSections.product,
              }"
            >
              <div class="py-3 space-y-0 group/list">
                <!-- Product Pages -->
                <NuxtLink
                  to="/product/ai-adoption"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >AI Adoption Stack</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </NuxtLink>

                <NuxtLink
                  to="/product/ai-agent-builder"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >AI Agents</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </NuxtLink>

                <NuxtLink
                  to="/product/governance-and-management"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >Control & Governance</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </NuxtLink>

                <NuxtLink
                  to="/product/deployment-options"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >Deployment & Cost</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </NuxtLink>

                <!-- By Integration -->
                <div
                  class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 mt-3 px-2.5"
                >
                  <span v-if="!piecesCountPending">{{ piecesCount }}+</span>
                  Integrations
                </div>
                <div class="flex flex-col gap-0">
                  <a
                    href="/pieces/gmail"
                    class="group/app flex items-center gap-2.5 h-10 px-2.5"
                  >
                    <span
                      class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                      ><img
                        src="https://cdn.activepieces.com/pieces/gmail.png"
                        class="w-5 h-5"
                        alt="Gmail"
                    /></span>
                    <span
                      class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                      >Gmail</span
                    >
                  </a>
                  <a
                    href="/pieces/openai"
                    class="group/app flex items-center gap-2.5 h-10 px-2.5"
                  >
                    <span
                      class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                      ><img
                        src="https://cdn.activepieces.com/pieces/openai.png"
                        class="w-5 h-5"
                        alt="OpenAI"
                    /></span>
                    <span
                      class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                      >OpenAI</span
                    >
                  </a>
                  <a
                    href="/pieces/slack"
                    class="group/app flex items-center gap-2.5 h-10 px-2.5"
                  >
                    <span
                      class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                      ><img
                        src="https://cdn.activepieces.com/pieces/slack.png"
                        class="w-5 h-5"
                        alt="Slack"
                    /></span>
                    <span
                      class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                      >Slack</span
                    >
                  </a>
                  <a
                    href="/pieces/notion"
                    class="group/app flex items-center gap-2.5 h-10 px-2.5"
                  >
                    <span
                      class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                      ><img
                        src="https://cdn.activepieces.com/pieces/notion.png"
                        class="w-5 h-5"
                        alt="Notion"
                    /></span>
                    <span
                      class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                      >Notion</span
                    >
                  </a>
                  <a
                    href="/pieces/hubspot"
                    class="group/app flex items-center gap-2.5 h-10 px-2.5"
                  >
                    <span
                      class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                      ><img
                        src="https://cdn.activepieces.com/pieces/hubspot.png"
                        class="w-5 h-5"
                        alt="HubSpot"
                    /></span>
                    <span
                      class="text-sm text-gray-600 transition-colors duration-200 group-hover/app:text-gray-900"
                      >HubSpot</span
                    >
                  </a>
                  <a
                    href="/pieces"
                    class="group/app flex items-center gap-1 h-10 px-2.5 mt-1 pt-1 border-t border-gray-200"
                  >
                    <span
                      class="text-sm text-gray-500 transition-colors duration-200 group-hover/app:text-gray-900"
                      >View all</span
                    >
                    <svg
                      class="w-3.5 h-3.5 text-gray-400 transition-all duration-200 group-hover/app:text-gray-900 group-hover/app:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5l7 7-7 7"
                      />
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
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="overflow-hidden transition-all duration-200"
              :class="{
                'max-h-0': !openSections.resources,
                'max-h-[1000px]': openSections.resources,
              }"
            >
              <div class="py-3 space-y-0 group/list">
                <a
                  href="https://www.activepieces.com/docs"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >Docs</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
                <a
                  href="https://community.activepieces.com"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >Support Forum</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@activepiecesco"
                  target="_blank"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >YouTube</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
                <a
                  href="https://discord.com/invite/2jUXBKDdP8"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >Discord</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </li>

          <!-- Partners Menu -->
          <li>
            <button
              class="flex items-center justify-between w-full py-3 text-lg font-medium"
              @click="toggleSection('partners')"
            >
              Partners & Creators
              <svg
                class="w-5 h-5 transform transition-transform duration-200"
                :class="{ 'rotate-180': openSections.partners }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="overflow-hidden transition-all duration-200"
              :class="{
                'max-h-0': !openSections.partners,
                'max-h-[1000px]': openSections.partners,
              }"
            >
              <div class="py-3 space-y-0 group/list">
                <NuxtLink
                  to="/content-creators"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature border-b border-gray-100"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >Content Creators</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </NuxtLink>
                <NuxtLink
                  to="/reseller"
                  class="flex items-center gap-2.5 px-2.5 py-3 transition group/feature"
                >
                  <div
                    class="w-2 h-2 rounded-sm bg-gray-600 group-hover/feature:bg-gray-900 group-hover/feature:rotate-45 transition-all duration-300 flex-shrink-0"
                  ></div>
                  <span
                    class="text-base font-semibold text-gray-900 transition-colors duration-300 leading-tight"
                    >Become a Reseller</span
                  >
                  <svg
                    class="w-4 h-4 text-gray-900 opacity-0 -translate-x-3 group-hover/feature:opacity-100 group-hover/feature:translate-x-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </li>

          <!-- Simple Menu Items -->
          <li>
            <a
              href="/pricing"
              class="block py-3 text-lg font-medium text-gray-700"
              >Pricing</a
            >
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
  background: linear-gradient(
    45deg,
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
  background-color: #6cad96;
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
    background-color: #6cad96;
  }
  28% {
    transform: translateY(-7px);
    background-color: #9ecab9;
  }
  44% {
    transform: translateY(0px);
    background-color: #b5d9cb;
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
.group\/list:has(.group\/feature:hover)
  .group\/feature:not(:hover)
  div[class*="rounded-sm"] {
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
