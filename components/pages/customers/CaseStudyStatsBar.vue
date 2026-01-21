<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
    // Array of { value: string, label: string }
  }
});
</script>

<template>
  <section class="border-b border-gray-100">
    <div class="max-w-3xl mx-auto px-6">
      <div class="flex justify-between py-12">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-4xl md:text-5xl font-bold text-gray-900">{{ stat.value }}</div>
          <div class="text-sm text-gray-500 mt-2">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

