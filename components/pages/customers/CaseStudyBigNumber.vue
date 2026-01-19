<script setup>
defineProps({
  label: {
    type: String,
    default: 'The Transformation'
  },
  number: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subStats: {
    type: Array,
    default: () => []
    // Array of { value: string, label: string }
  }
});
</script>

<template>
  <div class="text-center py-24 mb-24 border-y border-gray-100">
    <div class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">{{ label }}</div>
    <div class="text-[10rem] md:text-[12rem] font-bold text-gray-900 tracking-tighter leading-none">{{ number }}</div>
    <div class="text-lg text-gray-500 mt-4">{{ description }}</div>
    <div v-if="subStats.length" class="flex justify-center gap-12 mt-10 text-base">
      <div v-for="stat in subStats" :key="stat.label">
        <span class="font-bold text-gray-900 text-lg">{{ stat.value }}</span> 
        <span class="text-gray-500">{{ stat.label }}</span>
      </div>
    </div>
  </div>
</template>

