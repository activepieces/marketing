<template>
  <div 
    class="relative w-full overflow-hidden rounded-2xl bg-[#fafafa] border border-gray-200"
    :style="{ height: '480px', cursor: isScrolling ? 'none' : 'default' }"
    ref="containerRef"
    @mousemove="handleMouseMove"
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
    
    <!-- Canvas container -->
    <div 
      class="absolute pointer-events-none"
      :style="{
        transform: `translate(${offsetX}px, ${offsetY}px)`
      }"
    >
      <FlowCanvas 
        ref="flowCanvasRef"
        :flow-definition="currentFlow" 
        @canvas-size="handleCanvasSize"
      />
    </div>

    <!-- Walking Cursor - replaces mouse cursor when scrolling -->
    <div 
      v-if="isScrolling"
      class="absolute pointer-events-none z-50"
      :style="{
        left: `${walkerX}px`,
        top: `${walkerY}px`,
        transform: `translate(-50%, -50%) rotate(${walkerRotation}deg)`
      }"
    >
      <!-- Yellow Stick Figure -->
      <svg 
        class="walker-svg"
        width="16" 
        height="20" 
        viewBox="0 0 16 20"
      >
        <g class="walker-body">
          <!-- Head -->
          <circle cx="8" cy="3" r="2.5" fill="#f59e0b" />
          <!-- Body -->
          <line x1="8" y1="5.5" x2="8" y2="11" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round" />
          <!-- Arms -->
          <g class="arms">
            <line class="left-arm" x1="8" y1="7" x2="4" y2="10" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" />
            <line class="right-arm" x1="8" y1="7" x2="12" y2="10" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" />
          </g>
          <!-- Legs -->
          <g class="legs">
            <line class="left-leg" x1="8" y1="11" x2="5" y2="18" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round" />
            <line class="right-leg" x1="8" y1="11" x2="11" y2="18" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round" />
          </g>
        </g>
      </svg>
    </div>

    <!-- Edge suns - yellow glowing orbs with arrows -->
    <div 
      v-if="hasContentToLeft"
      class="absolute top-1/2 pointer-events-none z-10 edge-sun edge-sun-left"
    >
      <span class="sun-arrow sun-arrow-left">‹</span>
    </div>
    <div 
      v-if="hasContentToRight"
      class="absolute top-1/2 pointer-events-none z-10 edge-sun edge-sun-right"
    >
      <span class="sun-arrow sun-arrow-right">›</span>
    </div>
    <div 
      v-if="hasContentAbove"
      class="absolute left-1/2 pointer-events-none z-10 edge-sun edge-sun-top"
    >
      <span class="sun-arrow sun-arrow-up">‹</span>
    </div>
    <div 
      v-if="hasContentBelow"
      class="absolute left-1/2 pointer-events-none z-10 edge-sun edge-sun-bottom"
    >
      <span class="sun-arrow sun-arrow-down">›</span>
    </div>
  </div>
</template>

<script setup>
/**
 * FLOW BUILDER SCROLLING SYSTEM
 * =============================
 * 
 * KEY LEARNINGS:
 * 
 * 1. OFFSET COORDINATE SYSTEM
 *    - offsetX/Y control canvas position via CSS transform: translate()
 *    - POSITIVE offset = canvas moves RIGHT/DOWN = reveals LEFT/TOP content
 *    - NEGATIVE offset = canvas moves LEFT/UP = reveals RIGHT/BOTTOM content
 *    - This is counterintuitive but matches how translate() works
 * 
 * 2. BOUNDS MUST BE SYMMETRIC
 *    - useFlowLayout provides contentMinX/Y and contentMaxX/Y
 *    - These ALREADY include CANVAS_PADDING (60px) on all sides
 *    - DO NOT add extra padding here - it causes asymmetric scroll limits
 *    - Bug example: adding PADDING to maxOffsetX but not minOffsetX
 *      caused 30px more scroll on left than right
 * 
 * 3. CONTENT BOUNDS VS CONTAINER
 *    - contentMinX can be NEGATIVE (e.g., left branches at X=-75)
 *    - maxOffsetX = -contentMinX (negate to get positive scroll limit)
 *    - minOffsetX = containerW - contentMaxX (what's left after content)
 * 
 * 4. EDGE-ZONE SCROLLING
 *    - EDGE_ZONE (100px) defines how close to edge triggers scrolling
 *    - Speed increases quadratically as mouse approaches screen edge
 *    - This feels natural - faster near edge, stops in center
 * 
 * 5. 8-DIRECTION CORNER SCROLLING
 *    - Use separate IF blocks (not else-if) for X and Y directions
 *    - This allows diagonal scrolling when mouse is in corner
 *    - Check hasContentToX flags to prevent scrolling past bounds
 * 
 * 6. ANIMATION LOOP
 *    - Use requestAnimationFrame for smooth 60fps scrolling
 *    - Apply speed to offset each frame, then clamp to bounds
 *    - Walker/cursor animation is purely cosmetic, follows mouse
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { flows } from './flowDefinitions'
import FlowCanvas from './flow/FlowCanvas.vue'

const props = defineProps({
  flowId: {
    type: String,
    default: 'lead-routing'
  }
})

const currentFlow = computed(() => flows[props.flowId] || flows['lead-enrichment'])

const containerRef = ref(null)
const flowCanvasRef = ref(null)

// ============================================
// DIMENSIONS
// ============================================

const containerW = ref(600)
const containerH = ref(480)

const canvasW = ref(100)
const canvasH = ref(100)
const canvasReady = ref(false)

// Content bounds from useFlowLayout (ALREADY include CANVAS_PADDING)
const contentMinX = ref(0)
const contentMaxX = ref(100)
const contentMinY = ref(0)
const contentMaxY = ref(100)

// ============================================
// POSITION STATE
// ============================================

// Canvas offset via transform: translate(offsetX, offsetY)
const offsetX = ref(0)
const offsetY = ref(0)

// ============================================
// BOUNDS - MUST BE SYMMETRIC
// ============================================

const PADDING = 30 // Only used for initial centering, NOT for bounds

// Max offset = how far RIGHT/DOWN canvas can go = reveals LEFT/TOP content
// contentMinX/Y already has padding, so just negate it
const maxOffsetX = computed(() => -contentMinX.value)
const maxOffsetY = computed(() => -contentMinY.value)

// Min offset = how far LEFT/UP canvas can go = reveals RIGHT/BOTTOM content
const minOffsetX = computed(() => {
  const min = containerW.value - contentMaxX.value
  return Math.min(min, maxOffsetX.value) // For small flows that fit in container
})
const minOffsetY = computed(() => {
  const min = containerH.value - contentMaxY.value
  return Math.min(min, maxOffsetY.value)
})

// ============================================
// CONTENT AVAILABILITY FLAGS
// ============================================

// Used to show edge indicators and enable/disable scrolling directions
// The -2/+2 prevents jitter at exact boundaries
const hasContentToLeft = computed(() => offsetX.value < maxOffsetX.value - 2)
const hasContentToRight = computed(() => offsetX.value > minOffsetX.value + 2)
const hasContentAbove = computed(() => offsetY.value < maxOffsetY.value - 2)
const hasContentBelow = computed(() => offsetY.value > minOffsetY.value + 2)

// ============================================
// MOUSE STATE
// ============================================

const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

// Walker position (follows cursor)
const walkerX = ref(0)
const walkerY = ref(0)

// ============================================
// SCROLLING CONFIG
// ============================================

const EDGE_ZONE = 100 // Pixels from edge where scrolling activates
const MAX_SPEED = 15  // Max pixels per frame

// ============================================
// SCROLL DIRECTION DETECTION
// ============================================

const scrollDirection = computed(() => {
  if (!isHovering.value || !canvasReady.value) return 'none'
  
  const inLeftZone = mouseX.value < EDGE_ZONE
  const inRightZone = mouseX.value > containerW.value - EDGE_ZONE
  const inTopZone = mouseY.value < EDGE_ZONE
  const inBottomZone = mouseY.value > containerH.value - EDGE_ZONE
  
  // Check if scrolling is actually happening (has content AND in zone)
  const scrollingLeft = inLeftZone && hasContentToLeft.value
  const scrollingRight = inRightZone && hasContentToRight.value
  const scrollingUp = inTopZone && hasContentAbove.value
  const scrollingDown = inBottomZone && hasContentBelow.value
  
  // Determine direction
  if (scrollingUp && scrollingRight) return 'up-right'
  if (scrollingUp && scrollingLeft) return 'up-left'
  if (scrollingDown && scrollingRight) return 'down-right'
  if (scrollingDown && scrollingLeft) return 'down-left'
  if (scrollingUp) return 'up'
  if (scrollingDown) return 'down'
  if (scrollingLeft) return 'left'
  if (scrollingRight) return 'right'
  
  return 'none'
})

const isScrolling = computed(() => scrollDirection.value !== 'none')

// Walker rotation based on direction:
// - Left/Right: stands upright (0°)
// - Up: lays horizontal, head to left (-90°)
// - Down: lays horizontal, head to right (90°)
// - Corners: tilted toward movement direction
const walkerRotation = computed(() => {
  switch (scrollDirection.value) {
    case 'left': return 0
    case 'right': return 0
    case 'up': return -90        // Horizontal, head to left
    case 'down': return 90       // Horizontal, head to right
    case 'up-left': return 45    // Tilted right
    case 'up-right': return -45  // Tilted left
    case 'down-left': return -45 // Tilted left
    case 'down-right': return 45 // Tilted right
    default: return 0
  }
})

// ============================================
// ANIMATION LOOP
// ============================================
// 
// SCROLLING ALGORITHM:
// 1. Check if mouse is within EDGE_ZONE (100px) of any edge
// 2. Calculate "depth" (0-1) based on how close to screen edge
// 3. Speed = MAX_SPEED * depth² (quadratic feels natural)
// 4. Use SEPARATE if blocks for X and Y to enable diagonal/corner scrolling
// 5. Apply speed to offset, then clamp to bounds
//
// CRITICAL: Check hasContentToX BEFORE applying speed
// This prevents scrolling past content bounds

let animationId = null

const animate = () => {
  if (isHovering.value && canvasReady.value) {
    walkerX.value = mouseX.value + 30
    walkerY.value = mouseY.value - 15
    
    const inLeftZone = mouseX.value < EDGE_ZONE
    const inRightZone = mouseX.value > containerW.value - EDGE_ZONE
    const inTopZone = mouseY.value < EDGE_ZONE
    const inBottomZone = mouseY.value > containerH.value - EDGE_ZONE
    
    // IMPORTANT: Separate if blocks (not else-if) for corner scrolling
    let speedX = 0
    let speedY = 0
    
    // LEFT: increase offsetX (canvas moves right, reveals left content)
    if (inLeftZone && hasContentToLeft.value) {
      const depth = 1 - (mouseX.value / EDGE_ZONE)
      speedX = MAX_SPEED * depth * depth
    }
    // RIGHT: decrease offsetX (canvas moves left, reveals right content)
    if (inRightZone && hasContentToRight.value) {
      const depth = 1 - ((containerW.value - mouseX.value) / EDGE_ZONE)
      speedX = -MAX_SPEED * depth * depth
    }
    
    // TOP: increase offsetY (canvas moves down, reveals top content)
    if (inTopZone && hasContentAbove.value) {
      const depth = 1 - (mouseY.value / EDGE_ZONE)
      speedY = MAX_SPEED * depth * depth
    }
    // BOTTOM: decrease offsetY (canvas moves up, reveals bottom content)
    if (inBottomZone && hasContentBelow.value) {
      const depth = 1 - ((containerH.value - mouseY.value) / EDGE_ZONE)
      speedY = -MAX_SPEED * depth * depth
    }
    
    offsetX.value += speedX
    offsetY.value += speedY
    
    // ALWAYS clamp to prevent overscroll
    offsetX.value = Math.max(minOffsetX.value, Math.min(maxOffsetX.value, offsetX.value))
    offsetY.value = Math.max(minOffsetY.value, Math.min(maxOffsetY.value, offsetY.value))
  }
  
  animationId = requestAnimationFrame(animate)
}

// ============================================
// EVENT HANDLERS
// ============================================

const handleCanvasSize = (size) => {
  canvasW.value = size.width
  canvasH.value = size.height
  // Store content bounds for accurate scroll limits (all four edges)
  contentMinX.value = size.contentMinX || 0
  contentMaxX.value = size.contentMaxX || size.width
  contentMinY.value = size.contentMinY || 0
  contentMaxY.value = size.contentMaxY || size.height
  canvasReady.value = true
  
  // Center the canvas initially
  centerCanvas()
}

const centerCanvas = () => {
  // Center horizontally
  const idealX = (containerW.value - canvasW.value) / 2
  offsetX.value = Math.max(minOffsetX.value, Math.min(maxOffsetX.value, idealX))
  
  // Start near top vertically (with padding)
  offsetY.value = Math.max(minOffsetY.value, Math.min(maxOffsetY.value, PADDING))
}

const handleMouseMove = (e) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
  isHovering.value = true
}

const handleMouseLeave = () => {
  isHovering.value = false
}

// Handle touchpad/mouse wheel scrolling
const handleWheel = (e) => {
  // Apply wheel delta to offset (inverted for natural scrolling)
  offsetX.value -= e.deltaX
  offsetY.value -= e.deltaY
  
  // Clamp to bounds
  offsetX.value = Math.max(minOffsetX.value, Math.min(maxOffsetX.value, offsetX.value))
  offsetY.value = Math.max(minOffsetY.value, Math.min(maxOffsetY.value, offsetY.value))
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

onMounted(() => {
  updateContainerSize()
  window.addEventListener('resize', updateContainerSize)
  
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerSize)
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
/* Walker SVG Styles - smaller figure with walking animation */
.walker-svg {
  overflow: visible;
}

.walker-body {
  transform-origin: 8px 10px;
}

/* Gentle sway animation for the whole figure */
.walker-svg .walker-body {
  animation: gentle-sway 0.8s ease-in-out infinite;
}

@keyframes gentle-sway {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.5px); }
}

/* Smooth leg movement - adjusted for smaller figure */
.walker-svg .left-leg {
  transform-origin: 8px 11px;
  animation: left-leg-walk 0.5s ease-in-out infinite;
}

.walker-svg .right-leg {
  transform-origin: 8px 11px;
  animation: right-leg-walk 0.5s ease-in-out infinite;
}

@keyframes left-leg-walk {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
}

@keyframes right-leg-walk {
  0%, 100% { transform: rotate(10deg); }
  50% { transform: rotate(-10deg); }
}

/* Subtle arm swing - adjusted for smaller figure */
.walker-svg .left-arm {
  transform-origin: 8px 7px;
  animation: left-arm-swing 0.5s ease-in-out infinite;
}

.walker-svg .right-arm {
  transform-origin: 8px 7px;
  animation: right-arm-swing 0.5s ease-in-out infinite;
}

@keyframes left-arm-swing {
  0%, 100% { transform: rotate(8deg); }
  50% { transform: rotate(-8deg); }
}

@keyframes right-arm-swing {
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(8deg); }
}

/* Edge suns - yellow glowing orbs peeking from beyond the screen edge */
.edge-sun {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(251, 191, 36, 0.35) 0%,
    rgba(251, 191, 36, 0.15) 30%,
    rgba(251, 191, 36, 0.05) 60%,
    transparent 75%
  );
  animation: sun-breathe 3s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Arrow inside the sun - positioned absolutely in visible area */
.sun-arrow {
  position: absolute;
  font-size: 20px;
  font-weight: 300;
  color: #d97706;
  opacity: 0.8;
  animation: arrow-pulse 2s ease-in-out infinite;
}

/* Position arrows toward their direction (deeper into visible sun area) */
.sun-arrow-left {
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
}

.sun-arrow-right {
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
}

.sun-arrow-up {
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
}

.sun-arrow-down {
  top: 12px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
}

@keyframes arrow-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Position each sun so most of it is off-screen */
.edge-sun-left {
  left: -120px;
  transform: translateY(-50%);
}

.edge-sun-right {
  right: -120px;
  transform: translateY(-50%);
}

.edge-sun-top {
  top: -120px;
  transform: translateX(-50%);
}

.edge-sun-bottom {
  bottom: -120px;
  transform: translateX(-50%);
}

@keyframes sun-breathe {
  0%, 100% { 
    opacity: 0.6;
    transform: translateY(-50%) scale(0.95);
  }
  50% { 
    opacity: 1;
    transform: translateY(-50%) scale(1.02);
  }
}

.edge-sun-top,
.edge-sun-bottom {
  animation-name: sun-breathe-horizontal;
}

@keyframes sun-breathe-horizontal {
  0%, 100% { 
    opacity: 0.6;
    transform: translateX(-50%) scale(0.95);
  }
  50% { 
    opacity: 1;
    transform: translateX(-50%) scale(1.02);
  }
}
</style>
