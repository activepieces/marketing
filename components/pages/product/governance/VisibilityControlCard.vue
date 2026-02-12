<template>
  <div class="w-full max-w-[240px] bg-primary-dark/5 rounded-xl overflow-hidden">
    <div
      v-for="piece in visibilityPieces"
      :key="piece.name"
      class="flex items-center justify-between px-3 py-2.5 border-b border-white/50 last:border-0"
    >
      <div class="flex items-center gap-2.5">
        <img :src="piece.logo" class="w-6 h-6 rounded" :alt="piece.name" />
        <span class="text-[13px] font-medium text-primary-dark">{{
          piece.name
        }}</span>
      </div>
      <div
        class="w-9 h-[18px] rounded-full transition-colors duration-300"
        :class="piece.on ? 'bg-primary-dark' : 'bg-primary-dark/30'"
      >
        <div
          class="w-3.5 h-3.5 mt-[2px] ml-[2px] bg-white rounded-full shadow transition-transform duration-300 ease-out"
          :class="piece.on ? 'translate-x-[18px]' : 'translate-x-0'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visibilityPieces = ref([
  {
    name: "Salesforce",
    logo: "https://cdn.activepieces.com/pieces/salesforce.png",
    on: true,
  },
  {
    name: "ServiceNow",
    logo: "https://cdn.activepieces.com/pieces/service-now.png",
    on: true,
  },
  {
    name: "Zendesk",
    logo: "https://cdn.activepieces.com/pieces/zendesk.png",
    on: false,
  },
  {
    name: "Jira",
    logo: "https://cdn.activepieces.com/pieces/jira.png",
    on: true,
  },
]);

let toggleInterval = null;

onMounted(() => {
  toggleInterval = setInterval(() => {
    const randomIndex = Math.floor(
      Math.random() * visibilityPieces.value.length
    );
    visibilityPieces.value[randomIndex].on =
      !visibilityPieces.value[randomIndex].on;
  }, 1200);
});

onUnmounted(() => {
  if (toggleInterval) clearInterval(toggleInterval);
});
</script>
