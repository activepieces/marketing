<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  problem: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  impact: {
    type: String,
    required: true
  },
  // Tailwind border color class
  borderColor: {
    type: String,
    default: 'border-blue-300'
  }
});
</script>

<template>
  <div class="border-l-4 pl-8" :class="borderColor">
    <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ title }}</h3>
    <div class="space-y-4 text-base text-gray-600">
      <p><strong class="text-gray-900">The problem:</strong> {{ problem }}</p>
      <p><strong class="text-gray-900">The solution:</strong> {{ solution }}</p>
      <p><strong class="text-gray-900">The impact:</strong> {{ impact }}</p>
    </div>
  </div>
</template>

