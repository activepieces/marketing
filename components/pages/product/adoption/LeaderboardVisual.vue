<template>
  <div class="bg-[rgba(49,43,96,0.05)] p-[40px] rounded-[24px] w-[400px]">
    <div
      class="bg-white border border-[rgba(49,43,96,0.1)] rounded-[16px] pt-6 px-6 overflow-hidden"
      style="height: 224px"
    >
      <div class="flex items-end justify-center gap-4">
        <!-- Position 2 (Silver) -->
        <div class="flex flex-col items-center w-16">
          <span
            class="rounded-full px-1.5 py-0.5 text-base font-medium bg-[#ebffcd] text-primary-dark mb-2"
            :style="badgeStyle(0)"
          >
            2
          </span>
          <div :style="columnStyle(0)">
            <img
              src="/avatars/vibrent_2.png"
              alt=""
              class="relative z-10 shrink-0 w-16 h-16 rounded-full shadow-[0px_4px_0px_0px_white]"
            />
            <div
              class="w-full -mt-8"
              :style="{ backgroundColor: '#ebffcd', height: '98px' }"
            ></div>
          </div>
        </div>

        <!-- Position 1 (Gold) -->
        <div class="flex flex-col items-center w-16">
          <span
            class="rounded-full px-1.5 py-0.5 text-base font-medium bg-[#d3ffcd] text-primary-dark mb-2"
            :style="badgeStyle(1)"
          >
            1
          </span>
          <div :style="columnStyle(1)">
            <img
              src="/avatars/vibrent_1.png"
              alt=""
              class="relative z-10 shrink-0 w-16 h-16 rounded-full shadow-[0px_4px_0px_0px_white]"
            />
            <div
              class="w-full -mt-8"
              :style="{ backgroundColor: '#d3ffcd', height: '132px' }"
            ></div>
          </div>
        </div>

        <!-- Position 3 (Bronze) -->
        <div class="flex flex-col items-center w-16">
          <span
            class="rounded-full px-1.5 py-0.5 text-base font-medium bg-[#cdffe8] text-primary-dark mb-2"
            :style="badgeStyle(2)"
          >
            3
          </span>
          <div :style="columnStyle(2)">
            <img
              src="/avatars/vibrent_3.png"
              alt=""
              class="relative z-10 shrink-0 w-16 h-16 rounded-full shadow-[0px_4px_0px_0px_white]"
            />
            <div
              class="w-full -mt-8"
              :style="{ backgroundColor: '#cdffe8', height: '80px' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Phases: 'hidden' → 'rising' → 'badges-entering' → 'visible' → 'resetting' → 'hidden'
const phase = ref("hidden");
let timeoutId = null;
const prefersReducedMotion = ref(false);

const columnStyle = (index) => {
  if (prefersReducedMotion.value) {
    return { transform: "translateY(0)" };
  }

  const p = phase.value;

  if (p === "hidden") {
    return {
      transform: "translateY(250px)",
      transition: "none",
    };
  }

  if (p === "rising") {
    return {
      transform: "translateY(0)",
      transition: `transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 150}ms`,
    };
  }

  if (p === "badges-entering" || p === "visible") {
    return {
      transform: "translateY(0)",
      transition: "none",
    };
  }

  if (p === "resetting") {
    return {
      transform: "translateY(250px)",
      transition: "transform 300ms ease-in",
    };
  }

  return {};
};

const badgeStyle = (index) => {
  if (prefersReducedMotion.value) {
    return { opacity: 1, transform: "translateY(0)" };
  }

  const p = phase.value;

  if (p === "hidden" || p === "rising") {
    return {
      opacity: 0,
      transform: "translateY(15px)",
      transition: "none",
    };
  }

  if (p === "badges-entering") {
    return {
      opacity: 1,
      transform: "translateY(0)",
      transition: `opacity 400ms ease ${index * 100}ms, transform 400ms ease ${index * 100}ms`,
    };
  }

  if (p === "visible") {
    return {
      opacity: 1,
      transform: "translateY(0)",
      transition: "none",
    };
  }

  if (p === "resetting") {
    return {
      opacity: 0,
      transition: "opacity 200ms ease",
    };
  }

  return {};
};

const scheduleNext = (nextPhase, delay) => {
  timeoutId = setTimeout(() => {
    phase.value = nextPhase;
    advancePhase();
  }, delay);
};

const advancePhase = () => {
  const p = phase.value;

  if (p === "hidden") {
    requestAnimationFrame(() => {
      phase.value = "rising";
      // Wait for all columns: last stagger (2*150) + duration (700) + buffer (50)
      scheduleNext("badges-entering", 2 * 150 + 700 + 50);
    });
    return;
  }

  if (p === "badges-entering") {
    // Wait for all badges: last stagger (2*100) + duration (400) + buffer (50)
    scheduleNext("visible", 2 * 100 + 400 + 50);
    return;
  }

  if (p === "visible") {
    scheduleNext("resetting", 1500);
    return;
  }

  if (p === "resetting") {
    scheduleNext("hidden", 350);
    return;
  }
};

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion.value) {
    phase.value = "visible";
    return;
  }

  phase.value = "hidden";
  advancePhase();
});

onBeforeUnmount(() => {
  if (timeoutId) clearTimeout(timeoutId);
});
</script>
