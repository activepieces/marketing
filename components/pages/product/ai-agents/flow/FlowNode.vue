<template>
  <div 
    class="flow-node absolute cursor-pointer transition-all duration-200 hover:shadow-md group"
    :class="nodeClasses"
    :style="nodeStyle"
  >
    <!-- Trigger badge -->
    <div 
      v-if="node.type === 'trigger'" 
      class="absolute -top-5 left-0 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200"
    >
      ⚡ Trigger
    </div>
    
    <div class="flex items-center gap-2.5">
      <!-- Icon -->
      <div 
        class="flex-shrink-0 rounded-lg flex items-center justify-center"
        :class="iconContainerClasses"
        :style="{ width: iconSize + 'px', height: iconSize + 'px' }"
      >
        <!-- CDN Image icons -->
        <img 
          v-if="iconUrl && !iconUrl.startsWith('builtin:')" 
          :src="iconUrl" 
          :alt="node.app"
          class="object-contain"
          :style="{ width: (iconSize * 0.6) + 'px', height: (iconSize * 0.6) + 'px' }"
        />
        
        <!-- Built-in SVG icons -->
        <svg 
          v-else-if="iconUrl === 'builtin:schedule'" 
          class="text-pink-500"
          :style="{ width: (iconSize * 0.6) + 'px', height: (iconSize * 0.6) + 'px' }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <svg 
          v-else-if="iconUrl === 'builtin:loop'" 
          class="text-pink-500"
          :style="{ width: (iconSize * 0.6) + 'px', height: (iconSize * 0.6) + 'px' }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        
        <svg 
          v-else-if="iconUrl === 'builtin:code'" 
          class="text-amber-600"
          :style="{ width: (iconSize * 0.6) + 'px', height: (iconSize * 0.6) + 'px' }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        
        <svg 
          v-else-if="iconUrl === 'builtin:data-mapper'" 
          class="text-violet-500"
          :style="{ width: (iconSize * 0.6) + 'px', height: (iconSize * 0.6) + 'px' }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
        
        <svg 
          v-else-if="iconUrl === 'builtin:condition'" 
          class="text-amber-500"
          :style="{ width: (iconSize * 0.6) + 'px', height: (iconSize * 0.6) + 'px' }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <!-- Fallback icon -->
        <svg 
          v-else 
          class="text-gray-400"
          :style="{ width: (iconSize * 0.6) + 'px', height: (iconSize * 0.6) + 'px' }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      
      <!-- Label and subtitle -->
      <div class="flex-1 min-w-0">
        <div class="font-medium text-gray-900 truncate leading-tight text-sm">
          {{ node.step }}. {{ displayLabel }}
        </div>
        <div class="text-gray-500 truncate leading-tight text-xs">
          {{ node.app }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { iconMap, nodeColors } from '../flowDefinitions'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  position: {
    type: Object,
    required: true
  },
  isChild: {
    type: Boolean,
    default: false
  }
})

// Get icon URL from mapping
const iconUrl = computed(() => {
  return iconMap[props.node.icon] || null
})

// Uniform icon size for all nodes
const iconSize = computed(() => 32)

// Compute position style
const nodeStyle = computed(() => ({
  left: `${props.position.x}px`,
  top: `${props.position.y}px`,
  width: `${props.position.width}px`
}))

// Get colors based on node type
const colors = computed(() => nodeColors[props.node.type] || nodeColors.action)

// Compute node classes - uniform styling for all nodes
const nodeClasses = computed(() => {
  const base = 'bg-white rounded-xl border shadow-sm px-3 py-2.5'
  
  if (props.node.type === 'trigger') {
    return `${base} border-gray-200 hover:border-gray-300`
  } else if (props.node.type === 'loop') {
    return `${base} border-pink-200 hover:border-pink-300`
  } else if (props.node.type === 'condition') {
    return `${base} border-amber-200 hover:border-amber-300`
  } else {
    return `${base} border-gray-200 hover:border-gray-300`
  }
})

// Compute icon container classes
const iconContainerClasses = computed(() => {
  if (props.node.type === 'trigger') {
    return 'bg-pink-50'
  } else if (props.node.type === 'loop') {
    return 'bg-pink-50'
  } else if (props.node.type === 'condition') {
    return 'bg-amber-50'
  } else if (props.node.icon === 'code') {
    return 'bg-amber-50'
  } else if (props.node.icon === 'data-mapper') {
    return 'bg-violet-50'
  } else if (props.node.icon?.includes('google')) {
    return 'bg-green-50'
  } else if (props.node.icon === 'apollo') {
    return 'bg-amber-50'
  } else if (props.node.icon === 'segment') {
    return 'bg-emerald-50'
  } else if (props.node.icon === 'openai') {
    return 'bg-gray-100'
  } else {
    return 'bg-gray-50'
  }
})

// Truncate label if too long - uniform max length for all nodes
const displayLabel = computed(() => {
  const maxLength = 16
  if (props.node.label.length > maxLength) {
    return props.node.label.substring(0, maxLength) + '...'
  }
  return props.node.label
})
</script>

<style scoped>
.flow-node {
  z-index: 1;
}

.flow-node:hover {
  z-index: 10;
}
</style>
