<template>
  <div class="w-full">
    <!-- Flow container -->
    <div 
      class="relative w-full overflow-hidden rounded-2xl bg-[#fafafa] border border-gray-200 select-none"
      :style="{ height: '480px' }"
      :class="cursorClass"
      ref="containerRef"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
      @wheel.prevent="handleWheel"
    >
      <!-- Dot pattern background -->
      <div 
        class="absolute inset-0 opacity-40 pointer-events-none"
        :style="{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }"
      ></div>
      
      <!-- Canvas container - NO transition for instant drag response -->
      <div 
        class="absolute will-change-transform"
        :style="{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: 'none'
        }"
      >
        <FlowCanvas 
          ref="flowCanvasRef"
          :key="props.flowId"
          :flow-definition="currentFlow"
          :hovered-node-id="hoveredNodeId"
          :card-data-map="CARD_DATA_MAP"
          :viewport="viewport"
          @canvas-size="handleCanvasSize"
          @node-hover="handleNodeHover"
          @node-leave="handleNodeLeave"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * FLOW BUILDER - Drag to Pan Navigation
 * ======================================
 * 
 * Navigation: Click and drag to pan around the flow
 * Cursor: grab when hovering canvas, grabbing while dragging
 * Special nodes expand inline on hover to show info card
 */

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { flows } from './flowDefinitions'
import FlowCanvas from './flow/FlowCanvas.vue'

const props = defineProps({
  flowId: {
    type: String,
    default: 'ai-lead-pipeline'
  }
})

// ============================================
// CARD DATA FOR SPECIAL NODES
// ============================================

const CARD_DATA_MAP = {
  loop: {
    icon: 'loop',
    title: 'Loop',
    subtitle: 'Iterate over lists',
    description: 'Repeat actions for each item in a list. Process multiple records, contacts, or any collection of data in sequence.',
    glowClass: 'glow-pink',
    accentColor: 'text-pink-400',
    iconBg: 'bg-pink-500/20',
    gradientClass: 'from-pink-500 to-rose-500'
  },
  condition: {
    icon: 'condition',
    title: 'Branch',
    subtitle: 'Conditional routing',
    description: 'Split the flow based on conditions. Use rules, comparisons, or let an AI agent decide the next step.',
    glowClass: 'glow-amber',
    accentColor: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
    gradientClass: 'from-amber-500 to-orange-500'
  },
  code: {
    icon: 'code',
    title: 'Code',
    subtitle: 'JavaScript / TypeScript',
    description: 'Write custom logic when you need full control. Transform data, calculate values, or handle unique edge cases.',
    glowClass: 'glow-amber',
    accentColor: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
    gradientClass: 'from-amber-500 to-yellow-500'
  },
  http: {
    icon: 'http',
    title: 'HTTP Request',
    subtitle: 'Connect to any API',
    description: 'Call any REST endpoint directly. When there\'s no native integration, HTTP requests give you universal access.',
    glowClass: 'glow-cyan',
    accentColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/20',
    gradientClass: 'from-cyan-500 to-teal-500'
  },
  'date-helper': {
    icon: 'date-helper',
    title: 'Date Helper',
    subtitle: 'One of 20+ utilities',
    description: 'Format dates, calculate differences, add time. Part of a library of utilities for text, math, and data processing.',
    glowClass: 'glow-blue',
    accentColor: 'text-blue-400',
    iconBg: 'bg-blue-500/20',
    gradientClass: 'from-blue-500 to-indigo-500'
  },
  agent: {
    icon: 'agent',
    title: 'AI Agent',
    subtitle: 'Autonomous assistant',
    description: 'Give instructions in plain English. The agent reasons, uses tools, browses the web, and completes multi-step tasks on its own.',
    glowClass: 'glow-violet',
    accentColor: 'text-violet-400',
    iconBg: 'bg-violet-500/20',
    gradientClass: 'from-violet-500 to-purple-500'
  }
}

// ============================================
// HOVER STATE (with debouncing to prevent flicker)
// ============================================

const hoveredNodeId = ref(null)
const pendingNodeId = ref(null)
let hoverTimeout = null

const handleNodeHover = (data) => {
  if (isDragging.value) return // Don't show cards while dragging
  
  // Clear any pending close
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }
  
  // Store pending target immediately
  pendingNodeId.value = data.node.id
  
  // If we're already showing a different card, switch immediately
  // Otherwise add small delay to prevent accidental triggers
  if (hoveredNodeId.value && hoveredNodeId.value !== data.node.id) {
    // Switching between cards - immediate
    hoveredNodeId.value = data.node.id
  } else if (!hoveredNodeId.value) {
    // Opening new card - tiny delay
    hoverTimeout = setTimeout(() => {
      if (pendingNodeId.value === data.node.id) {
        hoveredNodeId.value = data.node.id
      }
    }, 50)
  }
}

const handleNodeLeave = () => {
  // Clear pending
  pendingNodeId.value = null
  
  // Delay closing to allow switching between cards
  if (hoverTimeout) clearTimeout(hoverTimeout)
  hoverTimeout = setTimeout(() => {
    // Only close if we don't have a new pending target
    if (!pendingNodeId.value) {
      hoveredNodeId.value = null
    }
  }, 100)
}

// ============================================
// DRAG TO PAN
// ============================================

const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const dragStartOffsetX = ref(0)
const dragStartOffsetY = ref(0)
const isOverCanvas = ref(false)

// Cursor changes: grab when hovering, grabbing when dragging
const cursorClass = computed(() => {
  if (isDragging.value) return 'cursor-grabbing'
  if (isOverCanvas.value) return 'cursor-grab'
  return 'cursor-default'
})

const handleMouseDown = (e) => {
  // Only start drag if clicking on the canvas background, not on nodes
  if (e.target.closest('.flow-node')) return
  
  isDragging.value = true
  dragStartX.value = e.clientX
  dragStartY.value = e.clientY
  dragStartOffsetX.value = offsetX.value
  dragStartOffsetY.value = offsetY.value
  
  // Close any open card when starting to drag
  hoveredNodeId.value = null
}

const handleMouseMove = (e) => {
  isOverCanvas.value = true
  
  if (!isDragging.value) return
  
  const deltaX = e.clientX - dragStartX.value
  const deltaY = e.clientY - dragStartY.value
  
  offsetX.value = dragStartOffsetX.value + deltaX
  offsetY.value = dragStartOffsetY.value + deltaY
  
  // Clamp to bounds
  offsetX.value = Math.max(minOffsetX.value, Math.min(maxOffsetX.value, offsetX.value))
  offsetY.value = Math.max(minOffsetY.value, Math.min(maxOffsetY.value, offsetY.value))
}

const handleMouseUp = () => {
  isDragging.value = false
}

const handleMouseLeave = () => {
  isDragging.value = false
  isOverCanvas.value = false
  hoveredNodeId.value = null
}

// Wheel/touchpad scrolling
const handleWheel = (e) => {
  offsetX.value -= e.deltaX
  offsetY.value -= e.deltaY
  
  offsetX.value = Math.max(minOffsetX.value, Math.min(maxOffsetX.value, offsetX.value))
  offsetY.value = Math.max(minOffsetY.value, Math.min(maxOffsetY.value, offsetY.value))
}

// Reset when flow changes
watch(() => props.flowId, () => {
  canvasReady.value = false
  offsetX.value = 0
  offsetY.value = 0
  hoveredNodeId.value = null
})

const currentFlow = computed(() => flows[props.flowId] || flows['ai-lead-pipeline'])

const containerRef = ref(null)
const flowCanvasRef = ref(null)

// ============================================
// DIMENSIONS & BOUNDS
// ============================================

const containerW = ref(600)
const containerH = ref(480)
const canvasW = ref(100)
const canvasH = ref(100)
const canvasReady = ref(false)

// Viewport info for smart card positioning
const viewport = computed(() => ({
  offsetX: offsetX.value,
  offsetY: offsetY.value,
  width: containerW.value,
  height: containerH.value
}))

const contentMinX = ref(0)
const contentMaxX = ref(100)
const contentMinY = ref(0)
const contentMaxY = ref(100)

const offsetX = ref(0)
const offsetY = ref(0)

const PADDING = 30

const maxOffsetX = computed(() => -contentMinX.value)
const maxOffsetY = computed(() => -contentMinY.value)

const minOffsetX = computed(() => {
  const min = containerW.value - contentMaxX.value
  return Math.min(min, maxOffsetX.value)
})
const minOffsetY = computed(() => {
  const min = containerH.value - contentMaxY.value
  return Math.min(min, maxOffsetY.value)
})

// ============================================
// EVENT HANDLERS
// ============================================

const handleCanvasSize = (size) => {
  canvasW.value = size.width
  canvasH.value = size.height
  contentMinX.value = size.contentMinX || 0
  contentMaxX.value = size.contentMaxX || size.width
  contentMinY.value = size.contentMinY || 0
  contentMaxY.value = size.contentMaxY || size.height
  canvasReady.value = true
  centerCanvas()
}

const centerCanvas = () => {
  const idealX = (containerW.value - canvasW.value) / 2
  offsetX.value = Math.max(minOffsetX.value, Math.min(maxOffsetX.value, idealX))
  offsetY.value = Math.max(minOffsetY.value, Math.min(maxOffsetY.value, PADDING))
}

const updateContainerSize = () => {
  if (containerRef.value) {
    containerW.value = containerRef.value.offsetWidth
    containerH.value = containerRef.value.offsetHeight
  }
}

// ============================================
// LIFECYCLE
// ============================================

// Global mouseup to handle drag ending outside container
const handleGlobalMouseUp = () => {
  isDragging.value = false
}

onMounted(() => {
  updateContainerSize()
  window.addEventListener('resize', updateContainerSize)
  window.addEventListener('mouseup', handleGlobalMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerSize)
  window.removeEventListener('mouseup', handleGlobalMouseUp)
  if (hoverTimeout) clearTimeout(hoverTimeout)
})
</script>

<style scoped>
.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}

/* Ensure smooth GPU-accelerated transforms */
.will-change-transform {
  will-change: transform;
  backface-visibility: hidden;
}
</style>
