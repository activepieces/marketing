<template>
  <div class="w-full bg-[#faf8f5] rounded-3xl p-8 md:p-12">
    <!-- Title -->
    <h3
      class="text-3xl font-medium text-left text-gray-900 mb-12 font-sentient max-w-xl text-balance"
    >
      Step-by-step guidance
    </h3>

    <!-- Timeline container -->
    <div class="relative py-16">
      <!-- Horizontal line -->
      <div class="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-300" />

      <!-- Steps -->
      <div class="relative flex justify-between items-center">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative flex flex-col items-center"
          @mouseenter="hoveredStep = index"
          @mouseleave="hoveredStep = null"
        >
          <!-- Step label pill -->
          <div class="absolute -top-8 left-1/2 -translate-x-1/2">
            <div
              class="px-3 py-1 bg-gray-800 text-white text-xs font-bold rounded-full whitespace-nowrap"
            >
              STEP {{ step.step }}
            </div>
          </div>

          <!-- Dot on timeline -->
          <div
            class="w-3 h-3 rounded-full bg-gray-800 cursor-pointer transition-transform duration-200"
            :class="{ 'scale-150': hoveredStep === index }"
          />

          <!-- Hover card (appears below) -->
          <Transition name="card-fade">
            <div
              v-if="hoveredStep === index"
              class="absolute top-8 left-1/2 -translate-x-1/2 w-48 z-10"
            >
              <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
                <div
                  class="px-2 py-0.5 text-xs font-bold border rounded-sm inline-block mb-2"
                  :style="{ borderColor: step.color }"
                >
                  Step {{ step.step }}
                </div>
                <p class="font-semibold text-gray-700 text-sm mb-2">
                  {{ step.title }}
                </p>
                <div class="space-y-1">
                  <div class="h-1 rounded-full bg-gray-200 w-full" />
                  <div class="h-1 rounded-full bg-gray-200 w-3/4" />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const hoveredStep = ref(null);

const steps = [
  { step: 1, title: "Connect your apps", color: "#f472b6" },
  { step: 2, title: "Pick a template", color: "#a855f7" },
  { step: 3, title: "Customize your flow", color: "#6366f1" },
  { step: 4, title: "Turn it on", color: "#10b981" },
];
</script>

<style scoped>
.card-fade-enter-active {
  transition: all 0.25s cubic-bezier(0.2, 0, 0.4, 1);
}

.card-fade-leave-active {
  transition: all 0.15s ease-out;
}

.card-fade-enter-from,
.card-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}

.card-fade-enter-to,
.card-fade-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
