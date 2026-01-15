<template>
  <div class="w-full">
    <!-- Flow container -->
    <div 
      class="relative w-full overflow-hidden rounded-2xl border border-gray-200/80 select-none"
      :style="{ height: '480px' }"
      :class="cursorClass"
      ref="containerRef"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
      @wheel="handleWheel"
    >
      <!-- Artistic background - layered abstract composition -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <!-- Base with subtle warmth -->
        <div 
          class="absolute inset-0"
          :style="{
            background: 'linear-gradient(160deg, #fefefe 0%, #faf9fe 30%, #fdf2f8 70%, #fefefe 100%)'
          }"
        ></div>
        
        <!-- Artistic SVG composition -->
        <svg 
          class="absolute inset-0 w-full h-full" 
          viewBox="0 0 800 480" 
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <!-- Large atmospheric shapes -->
          <ellipse cx="-20" cy="100" rx="200" ry="180" fill="url(#grad-violet-soft)" opacity="0.2"/>
          <ellipse cx="820" cy="380" rx="180" ry="160" fill="url(#grad-rose-soft)" opacity="0.18"/>
          
          <!-- Floating rings - abstract, not connected -->
          <circle cx="120" cy="380" r="60" stroke="url(#ring-grad-1)" stroke-width="1" opacity="0.2"/>
          <circle cx="680" cy="100" r="45" stroke="url(#ring-grad-2)" stroke-width="1" opacity="0.18"/>
          <circle cx="650" cy="350" r="35" stroke="url(#ring-grad-1)" stroke-width="0.75" opacity="0.15"/>
          
          <!-- Soft geometric accents -->
          <rect x="60" y="50" width="80" height="80" rx="20" fill="url(#grad-violet-soft)" opacity="0.1" transform="rotate(15 100 90)"/>
          <rect x="680" y="180" width="60" height="60" rx="16" fill="url(#grad-rose-soft)" opacity="0.12" transform="rotate(-20 710 210)"/>
          
          <!-- Delicate scattered orbs -->
          <circle cx="200" cy="120" r="8" fill="#c4b5fd" opacity="0.25"/>
          <circle cx="600" cy="80" r="6" fill="#f9a8d4" opacity="0.22"/>
          <circle cx="150" cy="320" r="5" fill="#a78bfa" opacity="0.2"/>
          <circle cx="700" cy="280" r="7" fill="#f472b6" opacity="0.18"/>
          <circle cx="400" cy="420" r="4" fill="#c4b5fd" opacity="0.2"/>
          <circle cx="500" cy="60" r="5" fill="#f9a8d4" opacity="0.18"/>
          
          <!-- Abstract brush strokes - organic shapes -->
          <path d="M-10 200 Q60 180, 80 220 Q100 260, 60 280 Q20 300, -10 260 Z" fill="url(#grad-violet-soft)" opacity="0.12"/>
          <path d="M780 150 Q820 180, 810 220 Q800 260, 760 240 Q720 220, 750 180 Q780 140, 780 150 Z" fill="url(#grad-rose-soft)" opacity="0.1"/>
          
          <!-- Gradients -->
          <defs>
            <radialGradient id="grad-violet-soft" cx="40%" cy="40%">
              <stop offset="0%" stop-color="#ddd6fe"/>
              <stop offset="50%" stop-color="#c4b5fd"/>
              <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="grad-rose-soft" cx="40%" cy="40%">
              <stop offset="0%" stop-color="#fce7f3"/>
              <stop offset="50%" stop-color="#f9a8d4"/>
              <stop offset="100%" stop-color="#f472b6" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="ring-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#c4b5fd"/>
              <stop offset="100%" stop-color="#a78bfa"/>
            </linearGradient>
            <linearGradient id="ring-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f9a8d4"/>
              <stop offset="100%" stop-color="#f472b6"/>
            </linearGradient>
          </defs>
        </svg>
        
        <!-- Soft inner glow -->
        <div 
          class="absolute inset-0"
          :style="{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(250,249,254,0.5) 100%)'
          }"
        ></div>
      </div>
      
      <!-- Canvas container -->
      <!-- Hidden until positioned to prevent initial flicker -->
      <div 
        class="absolute will-change-transform"
        :style="{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          opacity: canvasReady ? 1 : 0
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
  // Block drag on special nodes and expanded ID cards - allow drag on regular nodes
  if (e.target.closest('.special-card') || e.target.closest('.expanded-card')) return
  
  // Cancel any bounce animation when starting to drag
  isAnimatingBack.value = false
  
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

// Wheel/touchpad scrolling with scroll chaining to page
// Detects gesture boundaries: block entire gesture at edge, only NEW gesture propagates
let lastScrollTime = 0
let wasAtEdge = false
const GESTURE_GAP = 150 // ms gap to consider a new gesture (user lifted finger)

const handleWheel = (e) => {
  const now = Date.now()
  const timeSinceLastScroll = now - lastScrollTime
  lastScrollTime = now

  const deltaX = e.deltaX
  const deltaY = e.deltaY

  // Determine primary scroll axis
  const primaryIsY = Math.abs(deltaY) >= Math.abs(deltaX)

  const canScrollLeft = deltaX < 0 && offsetX.value < maxOffsetX.value
  const canScrollRight = deltaX > 0 && offsetX.value > minOffsetX.value
  const canScrollUp = deltaY < 0 && offsetY.value < maxOffsetY.value
  const canScrollDown = deltaY > 0 && offsetY.value > minOffsetY.value

  const canScrollX = canScrollLeft || canScrollRight
  const canScrollY = canScrollUp || canScrollDown
  const canScrollInPrimaryDirection = primaryIsY ? canScrollY : canScrollX

  // Can scroll inside the box - do it
  if (canScrollInPrimaryDirection) {
    e.preventDefault()
    wasAtEdge = false

    const nextX = offsetX.value - deltaX
    const nextY = offsetY.value - deltaY
    offsetX.value = Math.max(minOffsetX.value, Math.min(maxOffsetX.value, nextX))
    offsetY.value = Math.max(minOffsetY.value, Math.min(maxOffsetY.value, nextY))
    return
  }

  // At edge: if this is a NEW gesture (gap since last scroll), propagate to page
  if (wasAtEdge && timeSinceLastScroll > GESTURE_GAP) {
    wasAtEdge = false
    return // let page scroll
  }

  // Same gesture continuing at edge - block it
  e.preventDefault()
  wasAtEdge = true
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

const maxOffsetX = computed(() => {
  const contentWidth = contentMaxX.value - contentMinX.value
  if (containerW.value > contentWidth) {
    // Container is wider - allow centering by expanding max bound
    // The centered position is: containerW/2 - firstNodeCenterX
    // We need to allow at least that much
    return Math.max(-contentMinX.value, containerW.value / 2 - firstNodeCenterX.value + 50)
  }
  return -contentMinX.value
})
const maxOffsetY = computed(() => {
  const contentHeight = contentMaxY.value - contentMinY.value
  if (containerH.value > contentHeight) {
    // Container is taller - allow more vertical room
    return Math.max(-contentMinY.value, PADDING + 50)
  }
  return -contentMinY.value
})

const minOffsetX = computed(() => {
  const contentWidth = contentMaxX.value - contentMinX.value
  if (containerW.value > contentWidth) {
    // Container is wider - allow centering by expanding min bound
    return Math.min(containerW.value - contentMaxX.value, containerW.value / 2 - firstNodeCenterX.value - 50)
  }
  const min = containerW.value - contentMaxX.value
  return Math.min(min, maxOffsetX.value)
})
const minOffsetY = computed(() => {
  const contentHeight = contentMaxY.value - contentMinY.value
  if (containerH.value > contentHeight) {
    // Container is taller - allow centering vertically too
    return Math.min(containerH.value - contentMaxY.value, PADDING - 50)
  }
  const min = containerH.value - contentMaxY.value
  return Math.min(min, maxOffsetY.value)
})

// ============================================
// EVENT HANDLERS
// ============================================

const firstNodeCenterX = ref(0)

const handleCanvasSize = (size) => {
  // Ensure we have actual container dimensions before centering
  updateContainerSize()
  
  canvasW.value = size.width
  canvasH.value = size.height
  contentMinX.value = size.contentMinX || 0
  contentMaxX.value = size.contentMaxX || size.width
  contentMinY.value = size.contentMinY || 0
  contentMaxY.value = size.contentMaxY || size.height
  firstNodeCenterX.value = size.firstNodeCenterX || 0
  canvasReady.value = true
  centerOnFirstNode()
}

const centerOnFirstNode = () => {
  // Center the first node (trigger) horizontally in the container
  // offsetX positions the canvas, so we need: containerCenter = firstNodeCenterX + offsetX
  // Therefore: offsetX = containerCenter - firstNodeCenterX
  const containerCenterX = containerW.value / 2
  let idealX = containerCenterX - firstNodeCenterX.value
  let idealY = PADDING
  
  // Clamp to bounds so first interaction doesn't cause a snap/flicker
  idealX = Math.max(minOffsetX.value, Math.min(maxOffsetX.value, idealX))
  idealY = Math.max(minOffsetY.value, Math.min(maxOffsetY.value, idealY))
  
  offsetX.value = idealX
  offsetY.value = idealY
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
