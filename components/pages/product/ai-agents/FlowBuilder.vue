<template>
  <div 
    class="relative w-full overflow-hidden rounded-2xl bg-[#fafafa] border border-gray-200"
    style="height: 480px;"
    ref="containerRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Dot pattern background -->
    <div 
      class="absolute inset-0 opacity-40"
      :style="{
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)`
      }"
    ></div>
    
    <!-- Flow name badge (top) -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-20">
      <div class="px-4 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
        <span class="text-sm font-medium text-gray-700">Test Flow</span>
        <span class="text-[10px] text-gray-400 border border-gray-200 rounded px-1">⌘ + D</span>
      </div>
    </div>

    <!-- Canvas container with transform -->
    <div 
      class="absolute inset-0"
      :style="{
        transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
        transition: isHovering ? 'transform 0.15s ease-out' : 'transform 0.4s ease-out'
      }"
    >
      <!-- SVG for connection lines -->
      <svg class="absolute inset-0 w-full h-full" style="width: 1200px; height: 1400px; overflow: visible;">
        <defs>
          <!-- Arrow marker -->
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
          </marker>
        </defs>
        
        <!-- Main vertical connection lines -->
        <!-- Trigger to Configuration -->
        <path d="M 340 130 L 340 155 L 340 180" stroke="#d1d5db" stroke-width="2" fill="none" stroke-dasharray="4 2" marker-end="url(#arrowhead)" />
        
        <!-- Configuration to Loop -->
        <path d="M 340 250 L 340 280 L 340 320" stroke="#d1d5db" stroke-width="2" fill="none" stroke-dasharray="4 2" marker-end="url(#arrowhead)" />
        
        <!-- Loop container entry line -->
        <path d="M 340 400 C 340 430 340 450 390 460 L 420 460" stroke="#d1d5db" stroke-width="2" fill="none" />
        
        <!-- Inside loop connections -->
        <path d="M 540 490 L 540 530 L 540 560" stroke="#d1d5db" stroke-width="2" fill="none" stroke-dasharray="4 2" marker-end="url(#arrowhead)" />
        <path d="M 540 620 L 540 660 L 540 690" stroke="#d1d5db" stroke-width="2" fill="none" stroke-dasharray="4 2" marker-end="url(#arrowhead)" />
        <path d="M 540 750 L 540 790 L 540 820" stroke="#d1d5db" stroke-width="2" fill="none" stroke-dasharray="4 2" marker-end="url(#arrowhead)" />
        <path d="M 540 880 L 540 920 L 540 950" stroke="#d1d5db" stroke-width="2" fill="none" stroke-dasharray="4 2" marker-end="url(#arrowhead)" />
        
        <!-- Loop container box -->
        <rect 
          x="400" y="440" 
          width="300" height="600" 
          rx="12" ry="12" 
          fill="none" 
          stroke="#e5e7eb" 
          stroke-width="2"
          stroke-dasharray="8 4"
        />
      </svg>

      <!-- Flow Nodes -->
      <div class="absolute" style="width: 1200px; height: 1400px;">
        
        <!-- 1. Trigger Node -->
        <div class="absolute" style="left: 200px; top: 60px;">
          <div class="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded mb-1 inline-block border border-green-200">
            ⚡ Trigger
          </div>
          <div 
            class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-3 w-[280px] hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
            @mouseenter="hoveredNode = 'trigger'"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                <svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 text-sm">1. Every Month</div>
                <div class="text-xs text-gray-500">Schedule</div>
              </div>
              <svg class="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Add button after trigger -->
        <div class="absolute flex items-center justify-center" style="left: 330px; top: 150px;">
          <button class="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-violet-400 hover:text-violet-500 transition-all hover:scale-110">
            <span class="text-sm font-bold">+</span>
          </button>
        </div>

        <!-- 2. Configuration Node -->
        <div class="absolute" style="left: 200px; top: 180px;">
          <div 
            class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-3 w-[280px] hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
            @mouseenter="hoveredNode = 'config'"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <svg class="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 text-sm">2. Configuration</div>
                <div class="text-xs text-gray-500">Data Mapper</div>
              </div>
              <svg class="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Add button after config -->
        <div class="absolute flex items-center justify-center" style="left: 330px; top: 270px;">
          <button class="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-violet-400 hover:text-violet-500 transition-all hover:scale-110">
            <span class="text-sm font-bold">+</span>
          </button>
        </div>

        <!-- 3. Loop Node -->
        <div class="absolute" style="left: 200px; top: 320px;">
          <div 
            class="bg-white rounded-xl border-2 border-pink-100 shadow-sm p-3 w-[280px] hover:shadow-md hover:border-pink-200 transition-all cursor-pointer group"
            @mouseenter="hoveredNode = 'loop'"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                <svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 text-sm">3. Loop on Items</div>
                <div class="text-xs text-gray-500">Loop on Items</div>
              </div>
              <svg class="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Inside Loop - Add button -->
        <div class="absolute flex items-center justify-center" style="left: 530px; top: 468px;">
          <button class="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-violet-400 hover:text-violet-500 transition-all hover:scale-110">
            <span class="text-sm font-bold">+</span>
          </button>
        </div>

        <!-- 4. Get Current Date (inside loop) -->
        <div class="absolute" style="left: 420px; top: 500px;">
          <div 
            class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-3 w-[240px] hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
            @mouseenter="hoveredNode = 'date'"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 text-xs">4. Get Current D...</div>
                <div class="text-[10px] text-gray-500">Date Helper</div>
              </div>
              <svg class="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Add button -->
        <div class="absolute flex items-center justify-center" style="left: 530px; top: 590px;">
          <button class="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-violet-400 hover:text-violet-500 transition-all hover:scale-110">
            <span class="text-sm font-bold">+</span>
          </button>
        </div>

        <!-- 5. Extract Date (inside loop) -->
        <div class="absolute" style="left: 420px; top: 630px;">
          <div 
            class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-3 w-[240px] hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
            @mouseenter="hoveredNode = 'extract'"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 text-xs">5. Extract Date ...</div>
                <div class="text-[10px] text-gray-500">Date Helper</div>
              </div>
              <svg class="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Add button -->
        <div class="absolute flex items-center justify-center" style="left: 530px; top: 720px;">
          <button class="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-violet-400 hover:text-violet-500 transition-all hover:scale-110">
            <span class="text-sm font-bold">+</span>
          </button>
        </div>

        <!-- 6. Find Rows - Google Sheets (inside loop) -->
        <div class="absolute" style="left: 420px; top: 760px;">
          <div 
            class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-3 w-[240px] hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
            @mouseenter="hoveredNode = 'sheets'"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                <img src="https://cdn.activepieces.com/pieces/google-sheets.png" class="w-5 h-5" alt="Google Sheets" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 text-xs">6. Find Rows</div>
                <div class="text-[10px] text-gray-500">Google Sheets</div>
              </div>
              <svg class="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Add button -->
        <div class="absolute flex items-center justify-center" style="left: 530px; top: 850px;">
          <button class="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-violet-400 hover:text-violet-500 transition-all hover:scale-110">
            <span class="text-sm font-bold">+</span>
          </button>
        </div>

        <!-- 7. Filter Departments - Code (inside loop) -->
        <div class="absolute" style="left: 420px; top: 890px;">
          <div 
            class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-3 w-[240px] hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
            @mouseenter="hoveredNode = 'code'"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 text-xs">7. Filter Departm...</div>
                <div class="text-[10px] text-gray-500">Code</div>
              </div>
              <svg class="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- 8. Send Email - Gmail (inside loop) -->
        <div class="absolute" style="left: 420px; top: 990px;">
          <div 
            class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-3 w-[240px] hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
            @mouseenter="hoveredNode = 'gmail'"
            @mouseleave="hoveredNode = null"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                <img src="https://cdn.activepieces.com/pieces/gmail.png" class="w-5 h-5" alt="Gmail" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 text-xs">8. Send Email</div>
                <div class="text-[10px] text-gray-500">Gmail</div>
              </div>
              <svg class="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Toolbar -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
      <div class="bg-white rounded-xl border border-gray-200 shadow-lg flex items-center gap-1 p-1.5">
        <button class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
        </button>
        <div class="w-px h-5 bg-gray-200 mx-1"></div>
        <button class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        <button class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 11a1 1 0 100 2h8a1 1 0 100-2H8z" />
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z" clip-rule="evenodd" />
          </svg>
        </button>
        <div class="w-px h-5 bg-gray-200 mx-1"></div>
        <button class="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-100 text-violet-600 hover:bg-violet-200 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </button>
        <button class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Scroll hint -->
    <div 
      class="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300"
      :class="showHint ? 'opacity-100' : 'opacity-0'"
    >
      <div class="px-3 py-1.5 bg-gray-900/80 text-white text-xs rounded-full backdrop-blur-sm">
        Move mouse to explore the flow ↕
      </div>
    </div>

    <!-- Edge gradient overlays for scroll indication -->
    <div class="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#fafafa] to-transparent pointer-events-none z-10"></div>
    <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fafafa] to-transparent pointer-events-none z-10"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref(null)
const canvasOffset = ref({ x: 0, y: 0 })
const hoveredNode = ref(null)
const isHovering = ref(false)
const showHint = ref(true)

// Canvas bounds (how far we can pan)
const canvasBounds = {
  minX: -200,
  maxX: 100,
  minY: -600,
  maxY: 50
}

const handleMouseMove = (event) => {
  if (!containerRef.value) return
  
  isHovering.value = true
  showHint.value = false
  
  const rect = containerRef.value.getBoundingClientRect()
  
  // Calculate mouse position as percentage of container
  const mouseX = (event.clientX - rect.left) / rect.width
  const mouseY = (event.clientY - rect.top) / rect.height
  
  // Map to canvas offset - center is neutral, edges scroll
  // More aggressive scrolling based on how far from center
  const targetX = canvasBounds.maxX - (mouseX * (canvasBounds.maxX - canvasBounds.minX))
  const targetY = canvasBounds.maxY - (mouseY * (canvasBounds.maxY - canvasBounds.minY))
  
  // Apply with some easing
  canvasOffset.value = {
    x: Math.max(canvasBounds.minX, Math.min(canvasBounds.maxX, targetX)),
    y: Math.max(canvasBounds.minY, Math.min(canvasBounds.maxY, targetY))
  }
}

const handleMouseLeave = () => {
  isHovering.value = false
  // Smoothly return to initial position
  canvasOffset.value = { x: 0, y: 0 }
}

// Show hint initially, hide after first interaction
let hintTimeout = null
onMounted(() => {
  hintTimeout = setTimeout(() => {
    showHint.value = false
  }, 4000)
})

onUnmounted(() => {
  if (hintTimeout) clearTimeout(hintTimeout)
})
</script>

<style scoped>
/* Smooth transitions for nodes */
.group:hover {
  z-index: 10;
}
</style>

