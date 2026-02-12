<script setup>
import {
  PhEnvelopeSimple,
  PhGraph,
  PhWebhooksLogo,
  PhRobot,
  PhQuestion,
  PhCheckCircle,
} from "@phosphor-icons/vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const STEPS = [
  {
    icon: PhGraph,
    bg: "#fff3cd",
    label: "New Lead",
    bold: true,
    runtime: "0.2 s",
  },
  {
    icon: PhWebhooksLogo,
    bg: "#ebffcd",
    label: "Enrich via API",
    bold: false,
    runtime: "0.1 s",
  },
  {
    icon: PhRobot,
    bg: "#d3ffcd",
    label: "Research with AI",
    bold: false,
    runtime: "0.4 s",
  },
  {
    icon: PhQuestion,
    bg: "#cdffe8",
    label: "Qualified?",
    bold: false,
    runtime: "0.2 s",
  },
];

const RANDOM_RUNTIMES = [
  "0.1 s",
  "0.2 s",
  "0.3 s",
  "0.4 s",
  "0.5 s",
  "0.6 s",
];

const stepVisible = ref([false, false, false, false]);
const checkVisible = ref([false, false, false, false]);
const runtimeText = ref(["", "", "", ""]);
const reduceMotion = ref(false);

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

function rollRuntime(index, finalValue) {
  const duration = 800;
  const interval = 60;
  const steps = Math.floor(duration / interval);
  let count = 0;

  function tick() {
    if (count < steps) {
      runtimeText.value[index] =
        RANDOM_RUNTIMES[Math.floor(Math.random() * RANDOM_RUNTIMES.length)];
      count++;
      schedule(tick, interval);
    } else {
      runtimeText.value[index] = finalValue;
    }
  }

  tick();
}

function animateStep(index) {
  if (index >= STEPS.length) {
    // All done — pause then restart
    schedule(() => {
      resetState();
      schedule(() => runAnimation(), 500);
    }, 2000);
    return;
  }

  // 1. Slide in the card
  stepVisible.value[index] = true;

  // 2. Start runtime roll after slide-in begins
  schedule(() => {
    rollRuntime(index, STEPS[index].runtime);
  }, 100);

  // 3. Show check icon after slide-in + roll + gap
  schedule(() => {
    checkVisible.value[index] = true;

    // 4. Next step after check animation
    schedule(() => {
      animateStep(index + 1);
    }, 300);
  }, 350 + 800 + 150);
}

function resetState() {
  stepVisible.value = [false, false, false, false];
  checkVisible.value = [false, false, false, false];
  runtimeText.value = ["", "", "", ""];
}

function runAnimation() {
  clearTimers();
  resetState();
  schedule(() => animateStep(0), 600);
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reduceMotion.value = true;
    stepVisible.value = [true, true, true, true];
    checkVisible.value = [true, true, true, true];
    runtimeText.value = STEPS.map((s) => s.runtime);
    return;
  }
  runAnimation();
});

onBeforeUnmount(() => {
  clearTimers();
});
</script>

<template>
  <div class="bg-primary-dark/5 rounded-[24px] p-10">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <PhEnvelopeSimple :size="20" class="text-primary-dark flex-shrink-0" />
        <span
          class="text-[14px] font-bold uppercase tracking-wider text-primary-dark"
          >Lead Qualifier</span
        >
      </div>
      <span
        class="text-[11px] font-medium uppercase text-primary-dark/60 tracking-wider"
        >Run Time</span
      >
    </div>

    <!-- Steps container -->
    <div class="relative">
      <div class="flex flex-col items-stretch">
        <template v-for="(step, i) in STEPS" :key="i">
          <!-- Connector line between steps -->
          <div
            v-if="i > 0"
            class="connector"
            :class="stepVisible[i] ? 'is-drawn' : 'is-hidden'"
          >
            <div class="connector-line"></div>
          </div>

          <!-- Step card -->
          <div
            class="step-card"
            :class="[
              stepVisible[i] ? 'visible' : '',
              i === 0 ? 'border-primary-dark/20' : 'border-primary-dark/10',
            ]"
          >
            <div
              class="p-2 rounded border border-primary-dark/20 flex-shrink-0"
              :style="{ backgroundColor: step.bg }"
            >
              <component
                :is="step.icon"
                :size="18"
                class="text-primary-dark"
              />
            </div>
            <span
              class="text-sm text-primary-dark flex-1"
              :class="step.bold ? 'font-bold' : 'font-medium'"
            >
              {{ step.label }}
            </span>
            <span
              class="text-[14px] text-black font-normal min-w-[36px] text-right"
            >
              {{ runtimeText[i] }}
            </span>
            <div
              class="check-icon"
              :class="checkVisible[i] ? 'visible' : ''"
            >
              <PhCheckCircle
                :size="18"
                weight="fill"
                class="text-primary-dark"
              />
            </div>
          </div>
        </template>
      </div>

      <!-- Bottom fade -->
      <div class="bottom-fade"></div>
    </div>
  </div>
</template>

<style scoped>
.connector {
  height: 12px;
  transition: opacity 0.3s ease, transform 0.3s ease;
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

/* 6px card padding + 18px (half of 36px icon box) = 24px center, minus 1px for half line width */
.connector-line {
  width: 2px;
  height: 100%;
  margin-left: 23px;
  background-color: rgba(49, 43, 96, 0.2);
}

.step-card {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border-radius: 6px;
  background: white;
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transform: translateY(-12px);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.step-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.check-icon {
  opacity: 0;
  transform: scale(0.75);
  transition: opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  flex-shrink: 0;
}

.check-icon.visible {
  opacity: 1;
  transform: scale(1);
}

.bottom-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, transparent, #f7f6f9);
  pointer-events: none;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .step-card,
  .check-icon,
  .connector {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
