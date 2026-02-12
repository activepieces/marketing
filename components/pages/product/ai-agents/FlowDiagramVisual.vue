<script setup>
import {
  PhGraph,
  PhWebhooksLogo,
  PhRobot,
  PhQuestion,
  PhUsers,
  PhArrowsClockwise,
} from "@phosphor-icons/vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const CARDS = [
  { icon: PhGraph, bg: "#fff3cd", label: "New Lead", bold: true },
  { icon: PhWebhooksLogo, bg: "#ebffcd", label: "Enrich via API", bold: false },
  { icon: PhRobot, bg: "#d3ffcd", label: "Research with AI", bold: false },
  { icon: PhQuestion, bg: "#cdffe8", label: "Qualified?", bold: false },
];

const BRANCH_CARDS = [
  { icon: PhUsers, bg: "#cdfffd", label: "Add to CRM" },
  { icon: PhArrowsClockwise, bg: "#cdfffd", label: "Nurture Steps" },
];

const currentStep = ref(-1);
const branchPhase = ref(0);
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
  branchPhase.value = 0;

  let elapsed = 800;

  // Step 0: Card 1
  schedule(() => {
    currentStep.value = 0;
  }, elapsed);

  // Steps 1-3: Connector + Card
  for (let i = 1; i <= 3; i++) {
    elapsed += 800;
    schedule(() => {
      currentStep.value = i;
    }, elapsed);
  }

  // Branch sub-phases
  elapsed += 250;
  schedule(() => {
    branchPhase.value = 1;
  }, elapsed);

  elapsed += 250;
  schedule(() => {
    branchPhase.value = 2;
  }, elapsed);

  elapsed += 250;
  schedule(() => {
    branchPhase.value = 3;
  }, elapsed);

  // Hold for 4s then reset and restart quickly
  elapsed += 4000;
  schedule(() => {
    currentStep.value = -1;
    branchPhase.value = 0;

    schedule(() => {
      runAnimation();
    }, 150);
  }, elapsed);
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    prefersReducedMotion.value = true;
    currentStep.value = 3;
    branchPhase.value = 3;
    return;
  }
  runAnimation();
});

onBeforeUnmount(() => {
  clearTimers();
});
</script>

<template>
  <div class="bg-primary-dark/5 rounded-[24px] p-6 overflow-hidden h-[383px]">
    <div class="flex flex-col items-center">
      <!-- Linear cards 1-4 -->
      <template v-for="(card, i) in CARDS" :key="i">
        <!-- Connector before card (except first) -->
        <div
          v-if="i > 0"
          class="connector"
          :class="currentStep >= i ? 'is-drawn' : 'is-hidden'"
        >
          <div class="w-0.5 h-5 bg-primary-dark/20"></div>
        </div>

        <!-- Card -->
        <div
          class="flow-card"
          :class="currentStep >= i ? 'is-visible' : 'is-hidden'"
        >
          <div
            class="bg-white border border-primary-dark/20 rounded-[6px] py-1.5 pl-1.5 pr-3 gap-1.5 inline-flex items-center"
          >
            <div
              class="p-2 rounded border border-primary-dark/20 flex-shrink-0"
              :style="{ backgroundColor: card.bg }"
            >
              <component
                :is="card.icon"
                :size="18"
                class="text-primary-dark"
              />
            </div>
            <span
              class="text-sm text-primary-dark"
              :class="card.bold ? 'font-bold' : 'font-medium'"
            >
              {{ card.label }}
            </span>
          </div>
        </div>
      </template>

      <!-- Branch connector area -->
      <div class="relative w-full max-w-[280px] h-[32px]">
        <!-- Center vertical down from Qualified? -->
        <div
          class="branch-v absolute left-1/2 -translate-x-px top-0 w-0.5 h-3 bg-primary-dark/20"
          :class="branchPhase >= 1 ? 'is-drawn' : 'is-hidden'"
        ></div>
        <!-- Left branch elbow -->
        <div
          class="branch-elbow absolute top-3 left-[20%] w-[30%] h-5 border-t-2 border-l-2 border-primary-dark/20 rounded-tl-md"
          :class="branchPhase >= 2 ? 'is-drawn' : 'is-hidden'"
        ></div>
        <!-- Right branch elbow -->
        <div
          class="branch-elbow absolute top-3 left-[50%] w-[30%] h-5 border-t-2 border-r-2 border-primary-dark/20 rounded-tr-md"
          :class="branchPhase >= 2 ? 'is-drawn' : 'is-hidden'"
        ></div>
      </div>

      <!-- Branch cards -->
      <div class="flex gap-4">
        <div
          v-for="(card, i) in BRANCH_CARDS"
          :key="'branch-' + i"
          class="flow-card"
          :class="branchPhase >= 3 ? 'is-visible' : 'is-hidden'"
        >
          <div
            class="bg-white border border-primary-dark/20 rounded-[6px] py-1.5 pl-1.5 pr-3 gap-1.5 inline-flex items-center"
          >
            <div
              class="p-2 rounded border border-primary-dark/20 flex-shrink-0"
              :style="{ backgroundColor: card.bg }"
            >
              <component
                :is="card.icon"
                :size="18"
                class="text-primary-dark"
              />
            </div>
            <span class="text-sm font-medium text-primary-dark">
              {{ card.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow-card {
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}

.flow-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.flow-card.is-hidden {
  opacity: 0;
  transform: translateY(-12px);
}

.connector {
  transition: opacity 300ms ease-out, transform 300ms ease-out;
  transform-origin: top;
}

.connector.is-drawn {
  opacity: 1;
  transform: scaleY(1);
}

.connector.is-hidden {
  opacity: 0;
  transform: scaleY(0);
}

.branch-v {
  transition: opacity 300ms ease-out, transform 300ms ease-out;
  transform-origin: top;
}

.branch-v.is-drawn {
  opacity: 1;
  transform: scaleY(1);
}

.branch-v.is-hidden {
  opacity: 0;
  transform: scaleY(0);
}

.branch-elbow {
  transition: opacity 300ms ease-out;
}

.branch-elbow.is-drawn {
  opacity: 1;
}

.branch-elbow.is-hidden {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .flow-card,
  .connector,
  .branch-v,
  .branch-elbow {
    transition: none !important;
  }
}
</style>
