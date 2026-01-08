<template>
  <div 
    class="relative w-full max-w-sm mx-auto h-[280px] overflow-visible"
    style="transform: rotate(-1.5deg) perspective(1000px); transform-style: preserve-3d;"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="h-full w-full bg-white rounded-tl-2xl overflow-hidden shadow-2xl" style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(219, 39, 119, 0.05) 100%); border: 1px solid rgba(0,0,0,0.1); border-right: none; border-bottom: none;">
      <!-- Safari Browser Top Bar -->
      <div class="bg-gray-100 border-b border-gray-300 pl-3 pr-0 py-2 relative">
        <!-- Traffic lights -->
        <div class="flex items-center gap-1.5 mb-2">
          <div class="w-3 h-3 rounded-full bg-red-400"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div class="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        
        <!-- Address bar - naturally cut off by browser edge -->
        <div class="bg-white border border-gray-300 rounded-lg px-3 py-1.5 flex items-center gap-2 relative overflow-hidden" style="margin-right: -12px; padding-right: 15px;">
          <div class="w-4 h-4 rounded flex-shrink-0" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);"></div>
          <div class="h-3 rounded flex-shrink-0" style="background: linear-gradient(90deg, #ec4899 0%, #db2777 100%); opacity: 0.3; width: 500px;"></div>
        </div>
      </div>
      
      <!-- Content area -->
      <div class="p-4 relative h-[calc(100%-72px)] flex items-center justify-center">
        <!-- Normal content -->
        <div v-if="!isHovered" class="w-full transition-opacity duration-300">
          <!-- Header -->
          <div class="flex items-center gap-2 mb-4">
            <div class="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);">
              <div class="w-3 h-3 rounded-full bg-white opacity-80"></div>
            </div>
            <div class="text-sm font-semibold" style="color: #ec4899;">Our awesome AI platform</div>
          </div>

          <!-- Main content area -->
          <div class="space-y-4">
            <!-- Simple card -->
            <div class="bg-white border-2 border-dashed rounded-lg p-3" style="border-color: rgba(236, 72, 153, 0.3);">
              <div class="h-2 rounded mb-2" style="background: linear-gradient(90deg, rgba(236, 72, 153, 0.4) 0%, rgba(219, 39, 119, 0.4) 100%);"></div>
              <div class="h-1.5 rounded w-2/3" style="background: rgba(236, 72, 153, 0.2);"></div>
            </div>

            <!-- Simple list item -->
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded flex-shrink-0" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);"></div>
              <div class="flex-1">
                <div class="h-2 rounded mb-1" style="background: linear-gradient(90deg, rgba(236, 72, 153, 0.4) 0%, rgba(219, 39, 119, 0.4) 100%);"></div>
                <div class="h-1.5 rounded w-3/4" style="background: rgba(236, 72, 153, 0.2);"></div>
              </div>
            </div>

            <!-- Simple button -->
            <div class="h-8 rounded-lg flex items-center justify-center" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);">
              <div class="h-2 w-16 bg-white opacity-80 rounded"></div>
            </div>
          </div>
        </div>

        <!-- Hover state - Big centered heart -->
        <div v-else class="flex items-center justify-center transition-opacity duration-300">
          <svg class="w-24 h-24 heart-pulse" viewBox="0 0 24 24" fill="url(#heartGradient)">
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ec4899" />
                <stop offset="100%" style="stop-color:#db2777" />
              </linearGradient>
            </defs>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <!-- Cut off indicators -->
        <div class="absolute right-0 top-0 bottom-0 w-6 pointer-events-none" style="background: linear-gradient(to left, rgba(236, 72, 153, 0.05) 0%, transparent 100%);"></div>
        <div class="absolute left-0 right-0 bottom-0 h-6 pointer-events-none" style="background: linear-gradient(to top, rgba(236, 72, 153, 0.05) 0%, transparent 100%);"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isHovered = ref(false)
</script>

<style scoped>
.heart-pulse {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}
</style>
