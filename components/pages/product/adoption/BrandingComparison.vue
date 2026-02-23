<template>
  <div class="bg-[rgba(49,43,96,0.05)] p-10 rounded-3xl">
    <div class="bg-white border border-[rgba(49,43,96,0.1)] rounded-2xl p-2">
      <div
        class="border-2 p-4 rounded-[10px] flex flex-col gap-6 transition-all duration-500"
        :style="{ borderColor: activeBorderColor }"
      >
        <!-- Pill badge -->
        <div
          class="inline-flex items-center gap-1.5 rounded-full px-3 py-2 border border-[rgba(49,43,96,0.2)] self-start transition-all duration-500"
          :style="{ backgroundColor: activeColor }"
        >
          <span class="text-sm text-[#312b60]">&#9829;</span>
          <span
            class="text-[14px] uppercase text-[#312b60]/80 font-medium tracking-wide"
            >YOUR LOGO</span
          >
        </div>

        <!-- Placeholder lines -->
        <div class="flex flex-col gap-2">
          <div class="h-3 rounded bg-[#312b60]/10" style="width: 185px"></div>
          <div class="h-3 rounded bg-[#312b60]/10" style="width: 138px"></div>
          <div class="h-3 rounded bg-[#312b60]/10" style="width: 218px"></div>
        </div>

        <!-- Color picker -->
        <div class="flex flex-col gap-2">
          <span
            class="text-[12px] uppercase text-[#312b60]/60 font-medium tracking-wide"
            >PICK A COLOR</span
          >
          <div class="flex gap-1">
            <button
              v-for="(color, index) in colors"
              :key="index"
              @click="selectColor(index)"
              class="w-8 h-8 rounded-full border border-primary-dark/10 transition-shadow duration-300 hover:scale-105"
              :class="
                selectedIndex === index
                  ? 'shadow-[0_0_0_1px_white,0_0_0_3px_rgba(49,43,96,0.4)]'
                  : ''
              "
              :style="{ backgroundColor: color.bg }"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const colors = [
  { bg: "#cdffe8", border: "rgba(150, 209, 181, 0.3)" },
  { bg: "#ebffcd", border: "rgba(183, 209, 150, 0.3)" },
  { bg: "#ffeacd", border: "rgba(209, 183, 150, 0.3)" },
  { bg: "#ffcdcd", border: "rgba(209, 150, 150, 0.3)" },
];

const selectedIndex = ref(0);
let autoCycleInterval = null;
let autoCycleActive = true;

const activeColor = computed(() => colors[selectedIndex.value].bg);
const activeBorderColor = computed(() => colors[selectedIndex.value].border);

const selectColor = (index) => {
  selectedIndex.value = index;
  stopAutoCycle();
};

const stopAutoCycle = () => {
  autoCycleActive = false;
  if (autoCycleInterval) {
    clearInterval(autoCycleInterval);
    autoCycleInterval = null;
  }
};

const startAutoCycle = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  autoCycleActive = true;
  autoCycleInterval = setInterval(() => {
    if (!autoCycleActive) return;
    selectedIndex.value = (selectedIndex.value + 1) % colors.length;
  }, 2500);
};

onMounted(() => {
  startAutoCycle();
});

onBeforeUnmount(() => {
  stopAutoCycle();
});
</script>
