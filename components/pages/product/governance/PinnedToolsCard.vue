<template>
  <div class="w-full max-w-[240px] bg-primary-dark/5 rounded-xl p-3">
    <div class="flex items-center gap-1.5 mb-3 px-1">
      <svg
        class="w-3.5 h-3.5 text-primary-dark/50"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M16 4a1 1 0 01.707.293l3 3a1 1 0 01-.464 1.664l-1.397.349-.793.793 1.5 6a1 1 0 01-.276.96l-1.414 1.413a1 1 0 01-1.414 0L12 15.02l-3.449 3.449a1 1 0 01-1.414-1.414l3.449-3.449-3.449-3.449a1 1 0 010-1.414l1.414-1.414a1 1 0 01.96-.276l6 1.5.793-.793.349-1.397A1 1 0 0116.96 4H16z"
        />
      </svg>
      <span
        class="text-[11px] font-semibold text-primary-dark/60 uppercase tracking-wide"
        >Pinned</span
      >
    </div>
    <div class="space-y-1.5">
      <div
        v-for="(tool, i) in pinnedTools"
        :key="tool.name"
        class="flex items-center gap-3 bg-white rounded-lg px-3 py-2"
      >
        <span class="text-[10px] text-primary-dark/50 font-medium w-3">{{
          i + 1
        }}</span>
        <img :src="tool.logo" class="w-6 h-6 rounded" :alt="tool.name" />
        <span class="text-[13px] font-medium text-primary-dark">{{
          tool.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const pinnedTools = [
  {
    name: "Salesforce",
    logo: "https://cdn.activepieces.com/pieces/salesforce.png",
  },
  { name: "SAP", logo: "https://cdn.activepieces.com/pieces/sap-ariba.png" },
  {
    name: "NetSuite",
    logo: "https://cdn.activepieces.com/pieces/netsuite.png",
  },
];
</script>
