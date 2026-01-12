<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useScroll, useThrottleFn } from '@vueuse/core';
import { useProductSubmenu } from '~/composables/useProductSubmenu';

const props = defineProps({
  sections: {
    type: Array,
    required: true,
    validator: (sections) => {
      return sections.every(section => section.id && section.name);
    }
  }
});

const route = useRoute();
const router = useRouter();
const { sectionSubmenuVisible, chipExpanding } = useProductSubmenu();
const activeSection = ref('');
const showSubmenu = ref(false);
const firstSectionTop = ref(0);
const isUserScrolling = ref(false);
const scrollTimeout = ref(null);
const chipExpanded = ref(false);

// Product pages mapping
const productPages = [
  { name: 'Adoption & Training', path: '/product/ai-adoption' },
  { name: 'AI Agents', path: '/product/ai-agent-builder' },
  { name: 'Control & Governance', path: '/product/governance-and-management' },
  { name: 'Deployment & Cost', path: '/product/deployment-options' },
];

const currentProductPage = computed(() => {
  return productPages.find(page => route.path === page.path);
});

const { y: scrollY } = useScroll(window);

let updateFirstSectionTopFn = null;

// Calculate which section is currently active based on scroll position
// This is passive - only reads scroll position, doesn't modify anything
const calculateActiveSection = () => {
  if (props.sections.length === 0) return null;

  const headerOffset = 62 + 57 + 10; // Header (62px) + submenu (57px) + small padding (10px)
  const viewportTop = window.scrollY + headerOffset;
  
  // Find the section that's currently at or just past the viewport top
  let currentSection = props.sections[0].id;
  
  for (let i = props.sections.length - 1; i >= 0; i--) {
    const section = props.sections[i];
    const element = document.getElementById(section.id);
    
    if (element) {
      const rect = element.getBoundingClientRect();
      const elementTop = window.scrollY + rect.top;
      
      // Section is active if its top is at or above the viewport top
      if (elementTop <= viewportTop) {
        currentSection = section.id;
        break;
      }
    }
  }
  
  return currentSection;
};

// Throttled function to update active section (passive - only visual update)
const updateActiveSection = useThrottleFn(() => {
  // Only update visual state during normal scrolling, don't touch hash
  if (!isUserScrolling.value) {
    const newActiveSection = calculateActiveSection();
    if (newActiveSection && newActiveSection !== activeSection.value) {
      activeSection.value = newActiveSection;
      // Don't update hash during normal scroll - only update visual state
    }
  }
}, 150);

onMounted(() => {
  // Wait for DOM to be fully rendered
  nextTick(() => {
    // Get first section's top position
    updateFirstSectionTopFn = () => {
      if (props.sections.length > 0) {
        const firstSectionId = props.sections[0].id;
        const firstSectionEl = document.getElementById(firstSectionId);
        if (firstSectionEl) {
          const rect = firstSectionEl.getBoundingClientRect();
          firstSectionTop.value = window.scrollY + rect.top;
        }
      }
    };
    
    // Try immediately, then retry after a short delay to ensure DOM is ready
    updateFirstSectionTopFn();
    setTimeout(updateFirstSectionTopFn, 100);

    // Check initial hash on page load
    if (route.hash) {
      const hash = route.hash.substring(1);
      if (props.sections.some(s => s.id === hash)) {
        activeSection.value = hash;
        // Scroll to section only on initial page load with hash
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 62 + 57 + 10; // Header (62px) + submenu (57px) + small padding (10px)
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top + window.pageYOffset;
            const offsetPosition = elementTop - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (props.sections.length > 0) {
      activeSection.value = props.sections[0].id;
    }

    // Watch scroll position to show/hide submenu and update active section
    // This is completely passive - just reads scroll position
    watch(scrollY, (y) => {
      if (firstSectionTop.value > 0) {
        const shouldShow = y > firstSectionTop.value - 150;
        const wasVisible = showSubmenu.value;
        showSubmenu.value = shouldShow;
        sectionSubmenuVisible.value = shouldShow;
        
        // Trigger expansion animation when submenu first appears
        if (shouldShow && !wasVisible) {
          chipExpanded.value = false;
          setTimeout(() => {
            chipExpanded.value = true;
          }, 150);
        } else if (!shouldShow) {
          chipExpanded.value = false;
        } else if (shouldShow && wasVisible && !chipExpanded.value) {
          // If submenu is already visible but chipExpanded wasn't set, set it now
          chipExpanded.value = true;
        }
      }
      
      // Update active section based on scroll (passive visual update only)
      updateActiveSection();
    }, { immediate: true });
    
    // Also update first section top on window resize
    if (updateFirstSectionTopFn) {
      window.addEventListener('resize', updateFirstSectionTopFn);
    }
  });
});

onUnmounted(() => {
  if (updateFirstSectionTopFn) {
    window.removeEventListener('resize', updateFirstSectionTopFn);
  }
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
});

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Mark that we're programmatically scrolling
    isUserScrolling.value = true;
    activeSection.value = sectionId;
    
    // Update hash without triggering scroll (Vue Router might interfere)
    window.history.pushState(null, '', `#${sectionId}`);
    
    // Calculate accurate offset: header (62px) + submenu (57px) + small padding (10px)
    const headerOffset = 62 + 57 + 10;
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top + window.pageYOffset;
    const offsetPosition = elementTop - headerOffset;
    
    // Smooth scroll to section
    window.scrollTo({ 
      top: offsetPosition, 
      behavior: 'smooth' 
    });
    
    // Reset flag after scroll completes
    if (scrollTimeout.value) {
      clearTimeout(scrollTimeout.value);
    }
    scrollTimeout.value = setTimeout(() => {
      isUserScrolling.value = false;
    }, 1000);
  }
};

const scrollToTop = () => {
  isUserScrolling.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
  scrollTimeout.value = setTimeout(() => {
    isUserScrolling.value = false;
  }, 800);
};

const getIcon = (iconName) => {
  const icons = {
    network: () => h('svg', {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
      })
    ]),
    users: () => h('svg', {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
      })
    ]),
    star: () => h('svg', {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      })
    ]),
    analytics: () => h('svg', {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      })
    ]),
    // AI Agents page icons
    plug: () => h('svg', {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      // Grid of dots - app grid style
      h('circle', { cx: '5', cy: '5', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '12', cy: '5', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '19', cy: '5', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '5', cy: '12', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '12', cy: '12', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '19', cy: '12', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '5', cy: '19', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '12', cy: '19', r: '1.5', fill: 'currentColor' }),
      h('circle', { cx: '19', cy: '19', r: '1.5', fill: 'currentColor' })
    ]),
    cube: () => h('svg', {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      // Sparkles/magic icon
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z'
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z'
      })
    ]),
    table: () => h('svg', {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M3 10h18M3 14h18M10 3v18M14 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z'
      })
    ]),
    hand: () => h('svg', {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11'
      })
    ]),
    // Keep old icons as fallback
    settings: () => h('svg', {
      class: 'w-4 h-4',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      })
    ])
  };
  return icons[iconName] || icons.settings;
};
</script>

<template>
  <div v-if="showSubmenu" class="w-full sticky top-[62px] z-30 relative" style="height: 57px;">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="absolute inset-0 w-full bg-gray-100 border-b border-gray-200/60 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]"
      >
      <div class="max-w-[1230px] mx-auto px-4 h-full flex items-center">
        <nav class="flex items-center justify-center gap-4 overflow-x-auto scrollbar-hide w-full relative">
          <div class="flex items-center gap-8">
            <!-- Current Product Page as Title (expanded from chip) -->
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 scale-75 translate-x-8"
              enter-to-class="opacity-100 scale-100 translate-x-0"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 scale-100 translate-x-0"
              leave-to-class="opacity-0 scale-75 -translate-x-8"
            >
              <div
                v-if="currentProductPage && chipExpanded"
                class="flex items-center gap-3 flex-shrink-0"
              >
                <h3 class="text-base font-semibold text-gray-900">
                  {{ currentProductPage.name }}
                </h3>
                <div class="h-4 w-px bg-gray-300"></div>
              </div>
            </Transition>
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 -translate-x-4"
              enter-to-class="opacity-100 translate-x-0"
            >
              <div v-if="chipExpanded" class="flex items-center gap-8">
                <a
                  v-for="section in sections"
                  :key="section.id"
                  :href="`#${section.id}`"
                  @click.prevent="scrollToSection(section.id)"
                  class="relative py-4 flex items-center gap-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200"
                  :class="[
                    activeSection === section.id
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  ]"
                >
                  <component :is="getIcon(section.icon)" class="w-4 h-4" />
                  <span>{{ section.name }}</span>
                  <!-- Active indicator -->
                  <span
                    v-if="activeSection === section.id"
                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full"
                  ></span>
                </a>
              </div>
            </Transition>
          </div>
          <!-- "All products" link on the right -->
          <Transition
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <a
              v-if="chipExpanded"
              @click.prevent="scrollToTop"
              class="absolute right-4 flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Scroll to top
            </a>
          </Transition>
        </nav>
      </div>
    </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

</style>

<style>
/* Global smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>
