<script setup>
import { ref, computed, nextTick, onMounted, watch } from 'vue'

const props = defineProps({
  productMode: {
    type: String,
    required: true,
    validator: (value) => ['automate', 'embed'].includes(value)
  }
});

const emit = defineEmits(['productModeChanged']);

// Template refs for measuring tab positions
const tabRefs = ref([])
const containerRef = ref(null)

// Reactive state for tab measurements
const tabMeasurements = ref({
  automate: { left: 0, width: 0 },
  embed: { left: 0, width: 0 }
})

const handleModeChange = (mode) => {
  emit('productModeChanged', mode);
};

const tabs = [
  {
    id: 'automate',
    label: 'Automate',
    emoji: '💎'
  },
  {
    id: 'embed',
    label: 'Embed',
    emoji: '🪝'
  }
];

// Measure tab positions and widths
const measureTabs = async () => {
  await nextTick()
  
  if (!containerRef.value || tabRefs.value.length === 0) return
  
  const containerRect = containerRef.value.getBoundingClientRect()
  
  tabRefs.value.forEach((tabRef, index) => {
    if (tabRef) {
      const tabRect = tabRef.getBoundingClientRect()
      const tabId = tabs[index].id
      
      tabMeasurements.value[tabId] = {
        left: tabRect.left - containerRect.left,
        width: tabRect.width
      }
    }
  })
}

// Computed styles for the underline
const underlineStyles = computed(() => {
  const currentTab = tabMeasurements.value[props.productMode]
  
  if (!currentTab || currentTab.width === 0) {
    return {
      width: '0px',
      left: '0px',
      opacity: 0
    }
  }
  
  return {
    width: `${currentTab.width}px`,
    left: `${currentTab.left}px`,
    opacity: 1
  }
})

// Watch for mode changes and remeasure
watch(() => props.productMode, () => {
  nextTick(() => measureTabs())
})

// Measure on mount and window resize
onMounted(() => {
  measureTabs()
  window.addEventListener('resize', measureTabs)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('resize', measureTabs)
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div ref="containerRef" class="flex space-x-4 sm:space-x-8 relative overflow-x-auto max-w-full">
      <!-- Dynamic morphing underline -->
      <div 
        class="absolute bottom-0 h-0.5 bg-black dark:bg-white rounded-full transition-all duration-100"
        :style="{
          ...underlineStyles,
          transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }"
      />
      
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :ref="el => tabRefs[index] = el"
        @click="handleModeChange(tab.id)"
        :class="[
          'relative px-4 py-3 tracking-[0.01em] cursor-pointer transition-all duration-300 focus-visible:outline-none flex gap-3 items-center group',
          props.productMode === tab.id
            ? 'text-black dark:text-white font-medium tracking-normal'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
        ]"
        style="WebkitTapHighlightColor: transparent"
      >
        <!-- Emoji with spring animation -->
        <div
          :class="[
            'text-2xl transition-all duration-300',
            props.productMode === tab.id
              ? 'scale-110 transform'
              : 'group-hover:scale-105'
          ]"
          :style="{
            transition: props.productMode === tab.id 
              ? 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
              : 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }"
        >
          {{ tab.emoji }}
        </div>
        
        <!-- Label -->
        <span class="text-lg font-medium">
          {{ tab.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0) scale(0.95);
}

/* Enhanced emoji animation */
.text-2xl {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Spring-like bounce effect on click */
@keyframes spring-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1.05); }
}

button:active .text-2xl {
  animation: spring-bounce 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Smooth underline morphing with dynamic positioning */
.absolute {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style> 