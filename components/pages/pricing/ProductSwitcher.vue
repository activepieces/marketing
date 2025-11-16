<script setup>
import { ref } from 'vue'

const props = defineProps({
  productMode: {
    type: String,
    required: true,
    validator: (value) => ['automate', 'embed'].includes(value)
  }
});

const emit = defineEmits(['productModeChanged']);

const containerRef = ref(null)

const handleModeChange = (mode) => {
  emit('productModeChanged', mode);
};

const tabs = [
  {
    id: 'automate',
    label: 'Automate'
  },
  {
    id: 'embed',
    label: 'Embed'
  }
];
</script>

<template>
  <div class="flex items-center justify-center">
    <div ref="containerRef" class="inline-flex items-center justify-center gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="handleModeChange(tab.id)"
        :class="[
          'inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-4 text-lg font-medium outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-400/70',
          props.productMode === tab.id
            ? 'bg-indigo-500 text-white shadow-sm'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
        ]"
        :style="{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Component styles */
</style>
