<template>
  <div class="bg-[rgba(49,43,96,0.05)] p-[40px] rounded-[24px] w-[400px]">
    <div
      class="bg-white border border-[rgba(49,43,96,0.1)] rounded-[16px] p-6 flex flex-col gap-3"
    >
      <div
        v-for="(badge, index) in badges"
        :key="index"
        class="rounded-full pl-3 pr-5 py-2 flex items-center gap-2"
        :style="{
          backgroundColor: badge.color,
          width: badge.width + 'px',
          ...pillStyle(index),
        }"
      >
        <PhConfetti class="w-4 h-4 text-primary-dark shrink-0" weight="fill" />
        <div class="bg-primary-dark/10 h-2.5 rounded-sm flex-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { PhConfetti } from "@phosphor-icons/vue";

const badges = [
  { color: "#ffcdcd", width: 154 },
  { color: "#fff3cd", width: 165 },
  { color: "#ebffcd", width: 106 },
  { color: "#cdffe8", width: 165 },
];

// Phases: 'hidden' → 'entering' → 'visible' → 'exiting' → 'hidden'
const phase = ref("hidden");
let timeoutId = null;
const prefersReducedMotion = ref(false);

const pillStyle = (index) => {
  if (prefersReducedMotion.value) {
    return { opacity: 1, transform: "translateX(0)" };
  }

  const p = phase.value;

  if (p === "hidden") {
    return {
      opacity: 0,
      transform: "translateX(-20px)",
      transition: "none",
    };
  }

  if (p === "entering") {
    return {
      opacity: 1,
      transform: "translateX(0)",
      transition: `opacity 300ms ease ${index * 200}ms, transform 300ms ease ${index * 200}ms`,
    };
  }

  if (p === "visible") {
    return {
      opacity: 1,
      transform: "translateX(0)",
      transition: "none",
    };
  }

  if (p === "exiting") {
    return {
      opacity: 0,
      transform: "translateX(0)",
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
      phase.value = "entering";
      // Wait for all pills: last stagger (3*200) + duration (300) + buffer
      scheduleNext("visible", 3 * 200 + 300 + 50);
    });
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
