<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { PhCheckCircle, PhConfetti } from "@phosphor-icons/vue";

const STEPS = [
  { bg: "#fff3cd", label: "Pick a template" },
  { bg: "#ebffcd", label: "Customize it" },
  { bg: "#d3ffcd", label: "Test your flow" },
  { bg: "#cdffe8", label: "Go live" },
];

const currentStep = ref(-1);
const prefersReducedMotion = ref(false);

let timers = [];

function clearTimers() {
  timers.forEach((t) => clearTimeout(t));
  timers = [];
}

function schedule(fn, delay) {
  const id = setTimeout(fn, delay);
  timers.push(id);
  return id;
}

function runAnimation() {
  clearTimers();
  currentStep.value = -1;

  let elapsed = 800;

  for (let i = 0; i < STEPS.length; i++) {
    schedule(() => {
      currentStep.value = i;
    }, elapsed);
    elapsed += 800;
  }

  // Show "Completed!" step
  schedule(() => {
    currentStep.value = 4;
  }, elapsed);

  // Hold for 3s then reset and loop
  elapsed += 3000;
  schedule(() => {
    currentStep.value = -1;

    schedule(() => {
      runAnimation();
    }, 150);
  }, elapsed);
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    prefersReducedMotion.value = true;
    currentStep.value = 4;
    return;
  }
  runAnimation();
});

onBeforeUnmount(() => {
  clearTimers();
});
</script>

<template>
  <div class="bg-white/5 rounded-[24px] p-10">
    <div
      class="bg-white rounded-2xl p-6 flex items-center justify-center min-h-[280px]"
    >
      <div class="relative flex flex-col items-center gap-4">
        <!-- Vertical line behind pills -->
        <div
          class="absolute top-4 bottom-4 left-1/2 -translate-x-px w-0.5 bg-primary-dark/20"
        ></div>

        <!-- Step pills -->
        <div
          v-for="(step, i) in STEPS"
          :key="i"
          class="step-pill relative z-10"
          :class="currentStep >= i ? 'is-visible' : 'is-hidden'"
        >
          <div
            class="rounded-full pl-2 pr-3 py-2 border border-primary-dark/20 flex items-center gap-1.5"
            :style="{ backgroundColor: step.bg }"
          >
            <PhCheckCircle :size="16" class="opacity-80 text-primary-dark" />
            <span
              class="text-xs font-bold uppercase tracking-wide text-primary-dark/80"
            >
              {{ step.label }}
            </span>
          </div>
        </div>

        <!-- Completed pill -->
        <div
          class="step-pill relative z-10"
          :class="currentStep >= 4 ? 'is-visible' : 'is-hidden'"
        >
          <div
            class="rounded-full pl-2 pr-3 py-2 bg-[#312b60] flex items-center gap-1.5"
          >
            <PhConfetti :size="16" class="text-white" />
            <span class="text-xs font-bold uppercase tracking-wide text-white">
              Completed!
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-pill {
  transition:
    opacity 400ms ease-out,
    transform 400ms ease-out;
}

.step-pill.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.step-pill.is-hidden {
  opacity: 0;
  transform: translateY(-12px);
}

@media (prefers-reduced-motion: reduce) {
  .step-pill {
    transition: none !important;
  }
}
</style>
