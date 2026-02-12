<template>
  <div class="bg-[rgba(49,43,96,0.05)] p-[40px] rounded-[24px] w-[400px]">
    <div
      class="bg-white border border-[rgba(49,43,96,0.1)] rounded-[16px] pt-6 px-6 overflow-hidden"
    >
      <div class="flex items-end justify-center gap-4">
        <!-- Position 2 (Silver) -->
        <div class="flex flex-col items-center w-16">
          <span
            class="rounded-full px-1.5 py-0.5 text-base font-medium bg-[#ebffcd] text-[#312b60] mb-2"
            :style="badgeStyle(0)"
          >
            2
          </span>
          <img
            src="/avatars/vibrent_2.png"
            alt=""
            class="w-12 h-12 rounded-full shadow-[0px_4px_0px_0px_white]"
            :style="avatarStyle(0)"
          />
          <div
            class="w-full rounded-t-lg mt-2 -mb-1"
            :style="{ backgroundColor: '#ebffcd', height: '98px' }"
          ></div>
        </div>

        <!-- Position 1 (Gold) -->
        <div class="flex flex-col items-center w-16">
          <span
            class="rounded-full px-1.5 py-0.5 text-base font-medium bg-[#d3ffcd] text-[#312b60] mb-2"
            :style="badgeStyle(1)"
          >
            1
          </span>
          <img
            src="/avatars/vibrent_1.png"
            alt=""
            class="w-12 h-12 rounded-full shadow-[0px_4px_0px_0px_white]"
            :style="avatarStyle(1)"
          />
          <div
            class="w-full rounded-t-lg mt-2 -mb-1"
            :style="{ backgroundColor: '#d3ffcd', height: '132px' }"
          ></div>
        </div>

        <!-- Position 3 (Bronze) -->
        <div class="flex flex-col items-center w-16">
          <span
            class="rounded-full px-1.5 py-0.5 text-base font-medium bg-[#cdffe8] text-[#312b60] mb-2"
            :style="badgeStyle(2)"
          >
            3
          </span>
          <img
            src="/avatars/vibrent_3.png"
            alt=""
            class="w-12 h-12 rounded-full shadow-[0px_4px_0px_0px_white]"
            :style="avatarStyle(2)"
          />
          <div
            class="w-full rounded-t-lg mt-2 -mb-1"
            :style="{ backgroundColor: '#cdffe8', height: '80px' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Phases: 'hidden' → 'avatars-entering' → 'badges-entering' → 'visible' → 'exiting' → 'hidden'
const phase = ref("hidden");
let timeoutId = null;
const prefersReducedMotion = ref(false);

const avatarStyle = (index) => {
  if (prefersReducedMotion.value) {
    return { opacity: 1, transform: "translateY(0)" };
  }

  const p = phase.value;

  if (p === "hidden") {
    return {
      opacity: 0,
      transform: "translateY(30px)",
      transition: "none",
    };
  }

  if (p === "avatars-entering" || p === "badges-entering" || p === "visible") {
    return {
      opacity: 1,
      transform: "translateY(0)",
      transition:
        p === "avatars-entering"
          ? `opacity 500ms ease ${index * 150}ms, transform 500ms ease ${index * 150}ms`
          : "none",
    };
  }

  if (p === "exiting") {
    return {
      opacity: 0,
      transform: "translateY(20px)",
      transition: "opacity 200ms ease, transform 200ms ease",
    };
  }

  return {};
};

const badgeStyle = (index) => {
  if (prefersReducedMotion.value) {
    return { opacity: 1, transform: "translateY(0)" };
  }

  const p = phase.value;

  if (p === "hidden" || p === "avatars-entering") {
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

  if (p === "exiting") {
    return {
      opacity: 0,
      transform: "translateY(20px)",
      transition: "opacity 200ms ease, transform 200ms ease",
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
      phase.value = "avatars-entering";
      // Wait for all avatars: last stagger (2*150) + duration (500) + buffer
      scheduleNext("badges-entering", 2 * 150 + 500 + 50);
    });
    return;
  }

  if (p === "badges-entering") {
    // Wait for all badges: last stagger (2*100) + duration (400) + buffer
    scheduleNext("visible", 2 * 100 + 400 + 50);
    return;
  }

  if (p === "visible") {
    scheduleNext("exiting", 1500);
    return;
  }

  if (p === "exiting") {
    scheduleNext("hidden", 200);
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
