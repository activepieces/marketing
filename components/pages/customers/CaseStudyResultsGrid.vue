<script setup>
defineProps({
  results: {
    type: Array,
    required: true
    // Array of { value: string, label: string, gradientFrom: string, gradientTo: string (optional), borderColor: string, textColor: string }
  },
  bulletPoints: {
    type: Array,
    default: () => []
    // Array of strings
  },
  bulletPointsTitle: {
    type: String,
    default: 'But the real impact goes beyond efficiency metrics:'
  },
  // Tailwind color for checkmark icons
  checkmarkColor: {
    type: String,
    default: 'text-indigo-500'
  }
});
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-8">
      <div 
        v-for="result in results" 
        :key="result.label"
        class="p-8 rounded-2xl border bg-gradient-to-br to-white"
        :class="[result.gradientFrom, result.borderColor]"
      >
        <div class="text-5xl font-bold mb-2" :class="result.textColor">{{ result.value }}</div>
        <div class="text-gray-600">{{ result.label }}</div>
      </div>
    </div>

    <div v-if="bulletPoints.length" class="mt-12 p-8 bg-gray-50 rounded-2xl">
      <div class="text-base font-semibold text-gray-900 mb-5">{{ bulletPointsTitle }}</div>
      <ul class="space-y-4 text-base text-gray-600">
        <li 
          v-for="(point, index) in bulletPoints" 
          :key="index"
          class="flex items-start gap-3"
        >
          <svg class="w-5 h-5 mt-0.5 flex-shrink-0" :class="checkmarkColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span>{{ point }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

