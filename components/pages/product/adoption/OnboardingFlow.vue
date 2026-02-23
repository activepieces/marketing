<template>
  <div class="bg-[rgba(49,43,96,0.05)] p-10 rounded-3xl">
    <div class="bg-white rounded-2xl p-6 flex flex-col gap-6 items-center">
      <!-- Avatar grid -->
      <div class="flex flex-wrap gap-1 w-full justify-center">
        <img
          v-for="(avatar, index) in avatars"
          :key="index"
          :src="avatar"
          alt=""
          class="w-16 h-16 rounded-full object-cover"
          :style="avatarStyle(index)"
        />
      </div>

      <!-- Invite button -->
      <button
        class="bg-[#312b60] w-full h-[38px] rounded-md text-white text-sm font-medium transition-transform duration-300"
        :style="buttonStyle"
      >
        Invite
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const avatars = Array.from(
  { length: 8 },
  (_, i) => `/avatars/vibrent_${i + 1}.png`,
);

// Phases: 'hidden' → 'entering' → 'visible' → 'pressing' → 'exiting' → 'hidden'
const phase = ref("hidden");
let timeoutId = null;
const prefersReducedMotion = ref(false);

const avatarStyle = (index) => {
  if (prefersReducedMotion.value) {
    return { opacity: 1, transform: "translateY(0)" };
  }

  const p = phase.value;

  // hidden: invisible, shifted down, no transition (instant reset)
  if (p === "hidden") {
    return {
      opacity: 0,
      transform: "translateY(10px)",
      transition: "none",
    };
  }

  // entering: animate to visible with staggered delays
  if (p === "entering") {
    return {
      opacity: 1,
      transform: "translateY(0)",
      transition: `opacity 400ms ease ${index * 150}ms, transform 400ms ease ${index * 150}ms`,
    };
  }

  // visible / pressing: fully visible, no transition
  if (p === "visible" || p === "pressing") {
    return {
      opacity: 1,
      transform: "translateY(0)",
      transition: "none",
    };
  }

  // exiting: fade out + slide up simultaneously
  if (p === "exiting") {
    return {
      opacity: 0,
      transform: "translateY(-10px)",
      transition: "opacity 500ms ease, transform 500ms ease",
    };
  }

  return {};
};

const buttonStyle = computed(() => {
  if (prefersReducedMotion.value) return {};
  if (phase.value === "pressing") {
    return { transform: "scale(0.97)" };
  }
  return { transform: "scale(1)" };
});

const scheduleNext = (nextPhase, delay) => {
  timeoutId = setTimeout(() => {
    phase.value = nextPhase;
    advancePhase();
  }, delay);
};

const advancePhase = () => {
  const p = phase.value;

  if (p === "hidden") {
    // Wait one frame for hidden styles to apply, then trigger entering
    requestAnimationFrame(() => {
      phase.value = "entering";
      // Wait for all staggered fade-ins to complete: last avatar delay + duration
      scheduleNext("visible", 7 * 150 + 400 + 100);
    });
    return;
  }

  if (p === "visible") {
    scheduleNext("pressing", 1000);
    return;
  }

  if (p === "pressing") {
    scheduleNext("exiting", 300);
    return;
  }

  if (p === "exiting") {
    scheduleNext("hidden", 500);
    return;
  }

  // After entering completes, we're in 'visible' and advancePhase is called
  if (p === "entering") {
    // This shouldn't be called directly, handled by scheduleNext
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
