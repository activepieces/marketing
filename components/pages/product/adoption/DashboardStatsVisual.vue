<template>
  <div
    ref="cardRef"
    class="border-2 border-[rgba(49,43,96,0.1)] p-20 rounded-[32px] max-w-[1000px] mx-auto"
  >
    <!-- Title block -->
    <div class="max-w-[560px] mx-auto text-center">
      <h2 class="font-sentient font-bold text-5xl text-[#312b60] leading-[1.2]">
        Full visibility.<br />Expert backup.
      </h2>
      <p class="text-xl text-[#312b60]/80 mt-3">
        Finally, leadership can see AI adoption happening in real-time. No more
        guessing if your investment is paying off.
      </p>
    </div>

    <!-- Stats row -->
    <div class="bg-[rgba(49,43,96,0.05)] p-6 rounded-3xl flex gap-2 mt-10">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="flex-1 bg-white border border-[rgba(49,43,96,0.1)] p-4 rounded-2xl flex flex-col gap-4"
      >
        <!-- Label pill -->
        <div
          class="flex items-center justify-center gap-1 rounded-full px-2 py-1.5 w-full text-primary-dark"
          :style="{ backgroundColor: stat.color }"
        >
          <component :is="stat.icon" weight="fill" size="16" />
          <span class="uppercase text-xs font-medium whitespace-nowrap">
            {{ stat.label }}
          </span>
        </div>

        <!-- Number -->
        <div
          class="text-[40px] font-bold text-primary-dark text-center leading-none"
        >
          {{ displayValues[index] }}{{ stat.suffix || "" }}
        </div>

        <!-- Skeleton lines -->
        <div class="flex flex-col gap-1.5">
          <div
            class="h-3.5 bg-primary-dark rounded opacity-20"
            :style="skeletonStyle(0)"
          ></div>
          <div
            class="h-2 bg-primary-dark rounded opacity-10"
            :style="skeletonStyle(1)"
          ></div>
          <div
            class="h-2 bg-primary-dark rounded opacity-10"
            :style="skeletonStyle(2)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  PhUsers,
  PhLightning,
  PhTimer,
  PhArrowCircleUpRight,
} from "@phosphor-icons/vue";

const stats = [
  { label: "Active Users", value: 847, color: "#cdffe8", icon: PhUsers },
  {
    label: "Automations",
    value: 2817,
    color: "#ebffcd",
    icon: PhLightning,
  },
  {
    label: "Hours Saved",
    value: 13244,
    color: "#fff3cd",
    icon: PhTimer,
  },
  {
    label: "Adoption Rate",
    value: 94,
    color: "#ffcdcd",
    icon: PhArrowCircleUpRight,
    suffix: "%",
  },
];

const cardRef = ref(null);
const displayValues = ref(stats.map(() => "0"));
const hasAnimated = ref(false);
const skeletonProgress = ref(0); // 0 = collapsed, 1 = full
const prefersReducedMotion = ref(false);
let animFrameId = null;
let observer = null;

const skeletonStyle = (lineIndex) => {
  if (prefersReducedMotion.value) {
    const widths = ["100%", "101px", "68px"];
    return { width: widths[lineIndex] };
  }

  const widths = ["100%", "101px", "68px"];
  const progress = skeletonProgress.value;
  if (lineIndex === 0) {
    return {
      width: `${progress * 100}%`,
      transition: "width 800ms ease-out",
    };
  }
  const px = parseInt(widths[lineIndex]);
  return {
    width: `${progress * px}px`,
    transition: "width 800ms ease-out",
  };
};

const formatValue = (value) => {
  return value.toLocaleString();
};

const startCountUp = () => {
  if (hasAnimated.value) return;
  hasAnimated.value = true;

  const duration = 2000;
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Cubic ease-out
    const eased = 1 - Math.pow(1 - progress, 3);

    displayValues.value = stats.map((stat) => {
      const current = Math.round(eased * stat.value);
      return formatValue(current);
    });

    if (progress < 1) {
      animFrameId = requestAnimationFrame(animate);
    } else {
      displayValues.value = stats.map((stat) => formatValue(stat.value));
    }
  };

  animFrameId = requestAnimationFrame(animate);

  // Trigger skeleton expansion after 1.8s
  setTimeout(() => {
    skeletonProgress.value = 1;
  }, 1800);
};

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion.value) {
    displayValues.value = stats.map((stat) => formatValue(stat.value));
    skeletonProgress.value = 1;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCountUp();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 },
  );

  if (cardRef.value) {
    observer.observe(cardRef.value);
  }
});

onBeforeUnmount(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  if (observer) observer.disconnect();
});
</script>
