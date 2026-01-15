<template>
  <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
    <!-- Creative background composition -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Main blob - layered for depth -->
      <svg 
        class="absolute top-1/2 left-1/2 w-[380px] h-[340px]"
        style="transform: translate(-50%, -55%);"
        viewBox="0 0 200 200"
      >
        <!-- Outer glow blob -->
        <path 
          d="M45,-60C55.5,-50.5,59.5,-33,62,-16.5C64.5,0,65.5,15.5,59,28C52.5,40.5,38.5,50,23,57C7.5,64,-9.5,68.5,-26,66C-42.5,63.5,-58.5,54,-67,39.5C-75.5,25,-76.5,5.5,-72,-12C-67.5,-29.5,-57.5,-45,-44,-55.5C-30.5,-66,-15.25,-71.5,1.5,-73.5C18.25,-75.5,34.5,-69.5,45,-60Z"
          transform="translate(100 100) scale(1.1)"
          fill="rgba(236, 72, 153, 0.06)"
        />
        <!-- Inner blob -->
        <path 
          d="M45,-60C55.5,-50.5,59.5,-33,62,-16.5C64.5,0,65.5,15.5,59,28C52.5,40.5,38.5,50,23,57C7.5,64,-9.5,68.5,-26,66C-42.5,63.5,-58.5,54,-67,39.5C-75.5,25,-76.5,5.5,-72,-12C-67.5,-29.5,-57.5,-45,-44,-55.5C-30.5,-66,-15.25,-71.5,1.5,-73.5C18.25,-75.5,34.5,-69.5,45,-60Z"
          transform="translate(100 100)"
          fill="rgba(236, 72, 153, 0.1)"
        />
      </svg>
      
      <!-- Abstract team member circles - varied sizes, positioned around avatars -->
      <div class="absolute top-[20%] left-[18%] w-7 h-7 rounded-full" style="background: #6366f1; opacity: 0.7;"></div>
      <div class="absolute top-[18%] right-[16%] w-2 h-2 rounded-full" style="background: #f97316; opacity: 0.7;"></div>
      <div class="absolute top-[62%] left-[16%] w-3 h-3 rounded-full" style="background: #10b981; opacity: 0.65;"></div>
      <div class="absolute top-[64%] right-[14%] w-8 h-8 rounded-full" style="background: #8b5cf6; opacity: 0.65;"></div>
      <div class="absolute top-[24%] left-[42%] w-1.5 h-1.5 rounded-full" style="background: #f43f5e; opacity: 0.7;"></div>
      <div class="absolute top-[22%] right-[40%] w-5 h-5 rounded-full" style="background: #14b8a6; opacity: 0.6;"></div>
      <div class="absolute top-[60%] left-[44%] w-2.5 h-2.5 rounded-full" style="background: #eab308; opacity: 0.65;"></div>
      <div class="absolute top-[66%] right-[42%] w-4 h-4 rounded-full" style="background: #3b82f6; opacity: 0.6;"></div>
      <div class="absolute top-[40%] left-[12%] w-6 h-6 rounded-full" style="background: #ec4899; opacity: 0.55;"></div>
      
      <!-- Curved connection lines -->
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <!-- Flowing curve from center outward -->
        <path 
          d="M200 180 Q 280 150 320 100" 
          stroke="rgba(236, 72, 153, 0.15)" 
          stroke-width="1.5" 
          fill="none"
          stroke-linecap="round"
        />
        <path 
          d="M200 180 Q 120 140 70 120" 
          stroke="rgba(236, 72, 153, 0.12)" 
          stroke-width="1.5" 
          fill="none"
          stroke-linecap="round"
        />
        <path 
          d="M200 220 Q 130 260 90 300" 
          stroke="rgba(236, 72, 153, 0.1)" 
          stroke-width="1.5" 
          fill="none"
          stroke-linecap="round"
        />
        <path 
          d="M200 220 Q 270 270 310 320" 
          stroke="rgba(236, 72, 153, 0.12)" 
          stroke-width="1.5" 
          fill="none"
          stroke-linecap="round"
        />
      </svg>
      
      <!-- Small rings for extra visual interest -->
      <div class="absolute top-[30%] left-[18%] w-6 h-6 rounded-full border" style="border-color: rgba(236, 72, 153, 0.15);"></div>
      <div class="absolute top-[65%] right-[12%] w-5 h-5 rounded-full border" style="border-color: rgba(236, 72, 153, 0.12);"></div>
    </div>

    <!-- Plus icon in center with bubble circles radiating out -->
    <div class="relative z-10">
      <!-- Plus icon -->
      <div class="w-16 h-16 rounded-lg flex items-center justify-center relative z-10" style="background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); transform: rotate(-2deg);">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path>
        </svg>
      </div>

      <!-- Bubble circles radiating out from plus icon -->
      <div class="absolute inset-0 flex items-center justify-center">
        <!-- Bubble 1 - top left (smaller) -->
        <div 
          class="avatar-bubble absolute -top-8 -left-12 w-10 h-10 cursor-pointer" 
          :class="{ 
            'avatar-hovered': hoveredAvatar === 1,
            'avatar-pulse': isPulsing(1)
          }"
          @mouseenter="setHovered(1)"
          @mouseleave="clearHovered"
        >
          <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png" alt="User" class="w-full h-full object-cover" />
        </div>
        
        <!-- Bubble 2 - top right (larger) - VIDEO -->
        <div 
          class="avatar-bubble absolute -top-6 -right-10 w-14 h-14 cursor-pointer" 
          :class="{ 
            'avatar-hovered': hoveredAvatar === 2,
            'avatar-pulse': isPulsing(2)
          }"
          @mouseenter="onAvatar2Enter"
          @mouseleave="onAvatar2Leave"
        >
          <video 
            ref="avatarVideo"
            src="/avatar-6.mp4" 
            class="w-full h-full object-cover"
            muted
            loop
            playsinline
          />
        </div>
        
        <!-- Bubble 3 - bottom left (medium) -->
        <div 
          class="avatar-bubble absolute top-16 -left-8 w-12 h-12 cursor-pointer" 
          :class="{ 
            'avatar-hovered': hoveredAvatar === 3,
            'avatar-pulse': isPulsing(3)
          }"
          @mouseenter="setHovered(3)"
          @mouseleave="clearHovered"
        >
          <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_7.png" alt="User" class="w-full h-full object-cover" />
        </div>
        
        <!-- Bubble 4 - bottom right (smaller) -->
        <div 
          class="avatar-bubble absolute top-20 -right-6 w-11 h-11 cursor-pointer" 
          :class="{ 
            'avatar-hovered': hoveredAvatar === 4,
            'avatar-pulse': isPulsing(4)
          }"
          @mouseenter="setHovered(4)"
          @mouseleave="clearHovered"
        >
          <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_8.png" alt="User" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Tilted UI elements for projects -->
    <div class="absolute bottom-8 left-0 right-0 flex justify-around">
      <!-- Personal Project -->
      <div class="bg-white border-2 rounded-lg px-4 py-3 shadow-lg" style="border-color: rgba(236, 72, 153, 0.3); transform: rotate(-3deg);">
        <div class="text-sm font-semibold" style="color: #ec4899;">Personal Project</div>
      </div>
      
      <!-- Team Projects -->
      <div class="bg-white border-2 rounded-lg px-4 py-3 shadow-lg" style="border-color: rgba(236, 72, 153, 0.3); transform: rotate(2deg);">
        <div class="text-sm font-semibold" style="color: #ec4899;">Team Projects</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const avatarVideo = ref(null)
const hoveredAvatar = ref(null)
const pulsingAvatar = ref(1)
let pulseInterval = null

const setHovered = (id) => {
  hoveredAvatar.value = id
}

const clearHovered = () => {
  hoveredAvatar.value = null
}

const isPulsing = (id) => {
  return pulsingAvatar.value === id && hoveredAvatar.value === null
}

const onAvatar2Enter = () => {
  hoveredAvatar.value = 2
  if (avatarVideo.value) {
    avatarVideo.value.play()
  }
}

const onAvatar2Leave = () => {
  hoveredAvatar.value = null
  if (avatarVideo.value) {
    avatarVideo.value.pause()
    avatarVideo.value.currentTime = 0
  }
}

onMounted(() => {
  pulseInterval = setInterval(() => {
    pulsingAvatar.value = pulsingAvatar.value >= 4 ? 1 : pulsingAvatar.value + 1
  }, 800)
})

onBeforeUnmount(() => {
  if (pulseInterval) {
    clearInterval(pulseInterval)
  }
})
</script>

<style scoped>
.avatar-bubble {
  border-radius: 50%;
  border: 2px solid rgba(236, 72, 153, 0.4);
  background: rgba(236, 72, 153, 0.1);
  overflow: hidden;
  transform: scale(1);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              border-radius 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              border-color 0.4s ease,
              border-width 0.4s ease,
              box-shadow 0.4s ease;
  will-change: transform, border-radius;
}

.avatar-bubble.avatar-hovered {
  transform: scale(3);
  border-radius: 20px;
  border-color: rgba(236, 72, 153, 1);
  border-width: 1px;
  z-index: 50;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.avatar-bubble.avatar-pulse:not(.avatar-hovered) {
  animation: pulse 0.6s ease-in-out;
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
