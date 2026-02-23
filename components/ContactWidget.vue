<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isDismissed = ref(false);
const isMounted = ref(false);
const hasScrolledDown = ref(false);

// Pages where widget should NOT show
const excludedPaths = [
  "/pricing",
  "/sales",
  "/customers/alan",
  "/customers/funding-societies",
  "/customers",
];

const shouldShow = computed(() => {
  if (!isMounted.value) return false;
  if (isDismissed.value) return false;
  if (!hasScrolledDown.value) return false;
  const currentPath = route.path;
  return !excludedPaths.some(
    (path) => currentPath === path || currentPath.startsWith(path + "/"),
  );
});

const dismiss = () => {
  isDismissed.value = true;
};

// Scroll handler
let scrollHandler = null;

onMounted(() => {
  // Small delay to ensure page is fully rendered
  setTimeout(() => {
    isMounted.value = true;
  }, 500);

  // Show widget when user scrolls past 100px (when header hides)
  scrollHandler = () => {
    hasScrolledDown.value = window.scrollY > 100;
  };

  window.addEventListener("scroll", scrollHandler, { passive: true });
  // Check initial scroll position
  scrollHandler();
});

onBeforeUnmount(() => {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
  }
});
</script>

<template>
  <Transition name="widget">
    <div v-if="shouldShow" class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <!-- Main Widget -->
      <div class="relative group">
        <!-- Dismiss button -->
        <button
          @click="dismiss"
          class="absolute -top-2 -right-2 w-6 h-6 bg-primary-dark/80 hover:bg-primary-dark rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
          aria-label="Dismiss"
        >
          <svg
            class="w-3 h-3 text-white"
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

        <!-- Widget Card -->
        <a
          href="/sales"
          class="block overflow-hidden rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <!-- Animated gradient border -->
          <div
            class="p-0.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full animate-gradient-border"
          >
            <div
              class="bg-white rounded-full px-4 py-2 flex items-center gap-2"
            >
              <!-- Activepieces logo -->
              <div class="flex-shrink-0">
                <img
                  src="/ap-logo-black-sq-cropped.svg"
                  alt="Activepieces"
                  class="w-6 h-6 opacity-80 group-hover:opacity-100"
                />
              </div>

              <!-- Text content -->
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-primary-dark"
                  >See it in action</span
                >
                <span class="text-xs text-primary-dark/60"
                  >Book a 30-min demo</span
                >
              </div>

              <!-- Arrow icon -->
              <div
                class="text-primary-dark/30 ml-2 transform transition-transform duration-300 group-hover:text-primary-dark/50"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Animated gradient border */
.animate-gradient-border {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Widget entrance/exit animations */
.widget-enter-active {
  animation: widget-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.widget-leave-active {
  animation: widget-out 0.3s cubic-bezier(0.55, 0, 1, 0.45);
}

@keyframes widget-in {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes widget-out {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
}
</style>
