<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  stats: {
    type: Array,
    required: true
    // Array of { value: string, label: string }
  }
});
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed top-[64px] left-0 right-0 z-30 bg-white border-b border-gray-100">
      <div class="max-w-3xl mx-auto px-6 py-4">
        <!-- Small title line -->
        <div class="text-xs text-gray-400 mb-3">{{ companyName }} + Activepieces · {{ industry }}</div>
        
        <!-- Numbers row -->
        <div class="flex justify-between">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
            <div class="text-xs text-gray-500">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

