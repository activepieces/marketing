<script setup>
defineProps({
  title: {
    type: String,
    default: 'The requirements were demanding:'
  },
  requirements: {
    type: Array,
    required: true
    // Array of { title: string, description: string }
  }
});
</script>

<template>
  <div class="bg-gray-50 rounded-2xl p-8">
    <div class="text-base font-semibold text-gray-900 mb-5">{{ title }}</div>
    <ul class="space-y-4 text-base text-gray-600">
      <li 
        v-for="(req, index) in requirements" 
        :key="index"
        class="flex items-start gap-4"
      >
        <span class="text-gray-400 font-medium">{{ String(index + 1).padStart(2, '0') }}</span>
        <span><strong>{{ req.title }}</strong> — {{ req.description }}</span>
      </li>
    </ul>
  </div>
</template>

