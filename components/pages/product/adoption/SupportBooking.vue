<template>
  <div class="relative w-full h-full">
    <!-- Main container -->
    <div
      class="relative rounded-3xl overflow-hidden shadow-2xl h-full"
      style="transform: rotate(-1deg);"
      :class="screenBg"
    >
      <!-- Initial Widget State -->
      <div v-if="currentScreen === 'widget'" class="p-6 h-full flex flex-col">
        <!-- Mock app header -->
        <div class="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <span class="text-white text-sm">✨</span>
          </div>
          <div class="flex-1">
            <div class="h-2.5 w-28 bg-white/20 rounded-full"></div>
            <div class="h-2 w-20 bg-white/10 rounded-full mt-1.5"></div>
          </div>
          <div class="flex gap-1.5">
            <div class="w-2 h-2 rounded-full bg-white/20"></div>
            <div class="w-2 h-2 rounded-full bg-white/20"></div>
            <div class="w-2 h-2 rounded-full bg-white/20"></div>
          </div>
        </div>

        <!-- Content area -->
        <div class="relative flex-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div class="p-5 space-y-3">
            <div class="h-2.5 w-3/4 bg-white/15 rounded-full"></div>
            <div class="h-2.5 w-1/2 bg-white/10 rounded-full"></div>
            <div class="h-2.5 w-2/3 bg-white/15 rounded-full"></div>
            <div class="h-10 w-full bg-white/5 rounded-xl mt-4"></div>
          </div>

          <!-- Floating AI support button - centered at bottom -->
          <button
            @click="currentScreen = 'calendar'"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-5 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group"
          >
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span class="text-white text-sm">🤖</span>
            </div>
            <span class="font-semibold text-sm">Talk to AI Expert</span>
          </button>
        </div>
      </div>

      <!-- Calendar State - 3 Day View -->
      <div v-else-if="currentScreen === 'calendar'" class="p-5 h-full bg-white flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between mb-3">
          <button @click="currentScreen = 'widget'" class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="text-center">
            <h3 class="font-semibold text-gray-800 text-sm">January 2025</h3>
            <p class="text-[10px] text-gray-400">Pick a slot</p>
          </div>
          <div class="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <span class="text-sm">📅</span>
          </div>
        </div>

        <!-- 3-Day Grid Calendar -->
        <div class="grid grid-cols-3 gap-2 flex-1">
          <!-- Day Headers -->
          <div v-for="day in calendarDays" :key="day.name" class="text-center pb-2 border-b border-gray-100">
            <p class="text-[10px] font-medium text-gray-400 uppercase">{{ day.name }}</p>
            <p class="text-base font-bold" :class="day.isToday ? 'text-violet-600' : 'text-gray-800'">{{ day.date }}</p>
          </div>

          <!-- Time Slots Grid -->
          <template v-for="day in calendarDays" :key="'slots-' + day.name">
            <div class="space-y-1.5 pt-2">
              <div 
                v-for="slot in day.slots" 
                :key="slot.id"
                @click="!slot.booked && bookSlot(slot)"
                class="rounded-lg p-2 text-center transition-all duration-150"
                :class="slot.booked 
                  ? 'bg-gray-50 cursor-not-allowed' 
                  : 'bg-violet-50 hover:bg-violet-100 hover:scale-[1.02] cursor-pointer'"
              >
                <p 
                  class="font-medium text-xs text-gray-700"
                  :class="slot.booked ? 'line-through opacity-50' : ''"
                >
                  {{ slot.time }}
                </p>
                <div v-if="slot.booked" class="mt-0.5 text-xs text-gray-700 font-medium">
                  {{ slot.bookedLabel }}
                </div>
                <div v-else class="mt-0.5 text-[10px] text-violet-600 font-medium">
                  ✓ Free
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Confirmation Badge - Quick pass-through -->
      <Transition name="pass-through">
        <div v-if="currentScreen === 'confirmation'" class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div class="bg-white rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xl text-white shadow-lg">
              ✓
            </div>
            <div>
              <p class="font-semibold text-gray-900">Confirmed!</p>
              <p class="text-gray-500 text-sm">{{ bookedSlot?.dayName }} {{ bookedSlot?.dayDate }} · {{ bookedSlot?.time }}</p>
            </div>
          </div>
        </div>
      </Transition>


      <!-- Modern Video Call State -->
      <Transition name="cinematic-bg">
        <div v-if="currentScreen === 'connected'" class="absolute inset-0 bg-gray-900 flex flex-col z-20 rounded-3xl overflow-hidden">
        <!-- Call header -->
        <div class="flex items-center justify-between px-5 py-4">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span class="text-white/80 text-sm font-medium">Live Session</span>
          </div>
          <div class="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-mono">
            12:34
          </div>
        </div>

        <!-- Video area - equal size grid -->
        <div class="flex-1 px-4 pb-4">
          <div class="h-full grid grid-cols-2 gap-2">
            <!-- Expert video -->
            <div class="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              <video 
                ref="expertVideoRef"
                src="/crying-avatar.mp4"
                class="w-full h-full object-cover"
                style="transform: scaleX(-1);"
                muted
                loop
                playsinline
              />
              <!-- Expert name tag -->
              <div class="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                <div class="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-[8px]">
                  🤖
                </div>
                <span class="text-white text-[10px] font-medium">AI Expert</span>
                <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              </div>
            </div>

            <!-- Your video -->
            <div class="relative bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl overflow-hidden">
              <video 
                ref="youVideoRef"
                src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png"
                poster="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png"
                class="w-full h-full object-cover"
                style="transform: scaleX(-1);"
                muted
                loop
                playsinline
              />
              <!-- Your name tag -->
              <div class="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                <span class="text-white text-[10px] font-medium">You</span>
                <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="px-4 py-3 flex items-center justify-center">
          <div class="flex items-center gap-1.5">
            <button 
              @click="toggleCamera"
              class="w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
              :class="isCameraOn 
                ? 'bg-emerald-400 shadow-md' 
                : 'bg-white shadow-md hover:shadow-lg'"
            >
              📹
            </button>
            <button 
              @click="sprayHearts"
              class="w-11 h-11 rounded-xl bg-white shadow-md hover:shadow-lg flex items-center justify-center text-xl transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
            >
              💕
            </button>
            <button 
              @click="startFight"
              class="w-11 h-11 rounded-xl bg-white shadow-md hover:shadow-lg flex items-center justify-center text-xl transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
              :class="isFighting ? 'bg-orange-100' : ''"
            >
              🤬
            </button>
            <button 
              @click="endCall"
              class="w-11 h-11 rounded-xl bg-red-500 shadow-md hover:shadow-lg hover:bg-red-600 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
              :class="isEndingCall ? 'opacity-50 cursor-not-allowed' : ''"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Hearts overlay -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden z-30">
          <div 
            v-for="heart in hearts" 
            :key="heart.id"
            class="absolute heart-float"
            :style="{
              left: heart.x + '%',
              top: heart.y + '%',
              fontSize: heart.size + 'px',
              animationDelay: heart.delay + 'ms',
              animationDuration: heart.duration + 's'
            }"
          >
            {{ heart.emoji }}
          </div>
        </div>

        <!-- Call ending overlay -->
        <Transition name="fade">
          <div 
            v-if="isEndingCall" 
            class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 flex items-center justify-center z-10"
          >
            <div class="text-center call-ending-content bg-black/50 backdrop-blur-sm px-8 py-6 rounded-2xl">
              <div class="text-5xl mb-4 animate-wave">👋</div>
              <p class="text-white font-medium text-lg">Call Ending...</p>
              <p class="text-white/70 text-sm mt-1">Thanks for chatting!</p>
            </div>
          </div>
        </Transition>
        </div>
      </Transition>

    </div>

    <!-- Glow effect -->
    <div class="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20 rounded-[2rem] blur-2xl -z-10 opacity-60"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentScreen = ref('widget')
const bookedSlot = ref(null)
const expertVideoRef = ref(null)
const youVideoRef = ref(null)
const isEndingCall = ref(false)
const isFighting = ref(false)
const isCameraOn = ref(false)
const hearts = ref([])
let cameraStream = null

const screenBg = computed(() => {
  switch (currentScreen.value) {
    case 'widget':
    case 'confirmation':
      return 'bg-gradient-to-br from-gray-900 via-gray-900 to-violet-950'
    case 'calendar':
      return 'bg-white'
    case 'connected':
      return 'bg-gray-900'
    default:
      return 'bg-gray-900'
  }
})

const calendarDays = ref([
  {
    name: 'Mon',
    date: '13',
    isToday: true,
    slots: [
      { id: 'm1', time: '9:00', booked: false },
      { id: 'm2', time: '11:00', booked: true, bookedLabel: '👀 Stalking ex' },
      { id: 'm3', time: '2:00', booked: false },
      { id: 'm4', time: '4:00', booked: true, bookedLabel: '🚿 Shower crying' },
    ]
  },
  {
    name: 'Tue',
    date: '14',
    isToday: false,
    slots: [
      { id: 't1', time: '9:00', booked: true, bookedLabel: '🔍 WebMD spiral' },
      { id: 't2', time: '11:00', booked: false },
      { id: 't3', time: '2:00', booked: false },
      { id: 't4', time: '4:00', booked: true, bookedLabel: '🗣️ Mirror pep talk' },
    ]
  },
  {
    name: 'Wed',
    date: '15',
    isToday: false,
    slots: [
      { id: 'w1', time: '9:00', booked: false },
      { id: 'w2', time: '11:00', booked: false },
      { id: 'w3', time: '2:00', booked: true, bookedLabel: '📱 Ignoring mom' },
      { id: 'w4', time: '4:00', booked: false },
    ]
  },
])

const bookSlot = (slot) => {
  // Find which day this slot belongs to
  const day = calendarDays.value.find(d => d.slots.some(s => s.id === slot.id))
  bookedSlot.value = { ...slot, dayName: day?.name, dayDate: day?.date }
  currentScreen.value = 'confirmation'
  
  setTimeout(() => {
    currentScreen.value = 'connected'
  }, 800) // Quick pass-through confirmation
}

const sprayHearts = () => {
  const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '🩷', '💜']
  const newHearts = []
  
  for (let i = 0; i < 20; i++) {
    newHearts.push({
      id: Date.now() + i,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      x: Math.random() * 100,
      y: 50 + Math.random() * 50,
      size: Math.random() * 30 + 28,
      delay: i * 40,
      duration: Math.random() * 1 + 2
    })
  }
  
  hearts.value = [...hearts.value, ...newHearts]
  
  // Clean up after animation
  setTimeout(() => {
    hearts.value = hearts.value.filter(h => !newHearts.find(nh => nh.id === h.id))
  }, 4000)
}

const toggleCamera = async () => {
  if (isCameraOn.value) {
    // Turn off camera
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      cameraStream = null
    }
    if (youVideoRef.value) {
      youVideoRef.value.srcObject = null
      youVideoRef.value.src = ''
      youVideoRef.value.poster = 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png'
    }
    isCameraOn.value = false
  } else {
    // Turn on camera
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      if (youVideoRef.value) {
        youVideoRef.value.srcObject = cameraStream
        youVideoRef.value.poster = ''
        youVideoRef.value.play()
      }
      isCameraOn.value = true
    } catch (err) {
      console.error('Camera access denied:', err)
    }
  }
}

const startFight = () => {
  if (isFighting.value || isEndingCall.value) return
  isFighting.value = true
  
  // Switch to fighting videos and play
  if (expertVideoRef.value) {
    expertVideoRef.value.src = '/support-fighting.mp4'
    expertVideoRef.value.loop = false
    expertVideoRef.value.currentTime = 0
    expertVideoRef.value.play()
    
    // Reset when video ends
    expertVideoRef.value.onended = () => {
      resetToNormal()
    }
  }
  // Only play fight video on user side if camera is not on
  if (youVideoRef.value && !isCameraOn.value) {
    youVideoRef.value.src = '/you-fighting.mp4'
    youVideoRef.value.loop = false
    youVideoRef.value.currentTime = 0
    youVideoRef.value.play()
  }
}

const resetToNormal = () => {
  isFighting.value = false
  
  if (expertVideoRef.value) {
    expertVideoRef.value.src = '/crying-avatar.mp4'
    expertVideoRef.value.loop = true
    expertVideoRef.value.currentTime = 0
    expertVideoRef.value.onended = null
  }
  // Only reset user video if camera is not on
  if (youVideoRef.value && !isCameraOn.value) {
    youVideoRef.value.src = ''
    youVideoRef.value.poster = 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png'
    youVideoRef.value.loop = true
    youVideoRef.value.currentTime = 0
  }
}

const endCall = () => {
  if (isEndingCall.value) return
  isEndingCall.value = true
  
  // Turn off camera immediately and restore avatar
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop())
    cameraStream = null
  }
  if (youVideoRef.value) {
    youVideoRef.value.srcObject = null
    youVideoRef.value.src = ''
    youVideoRef.value.poster = 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png'
  }
  isCameraOn.value = false
  isFighting.value = false
  
  // Switch to crying video immediately and play
  if (expertVideoRef.value) {
    expertVideoRef.value.src = '/crying-avatar.mp4'
    expertVideoRef.value.loop = true
    expertVideoRef.value.onended = null
    expertVideoRef.value.currentTime = 0
    expertVideoRef.value.play()
  }
  
  // After 4 seconds, switch to widget
  setTimeout(() => {
    currentScreen.value = 'widget'
    bookedSlot.value = null
    isEndingCall.value = false
    isFighting.value = false
    hearts.value = []
    
    // Reset video after screen has transitioned
    setTimeout(() => {
      if (expertVideoRef.value) {
        expertVideoRef.value.pause()
        expertVideoRef.value.currentTime = 0
      }
      if (youVideoRef.value) {
        youVideoRef.value.src = ''
        youVideoRef.value.poster = 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png'
      }
    }, 500)
  }, 4000)
}

const resetWidget = () => {
  currentScreen.value = 'widget'
  bookedSlot.value = null
}
</script>

<style scoped>
.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}

@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0); }
  60% { transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}


/* Wave animation for goodbye */
.animate-wave {
  animation: wave 1s ease-in-out infinite;
  display: inline-block;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-20deg); }
}

/* Fade up animation */
.animate-fade-up {
  animation: fade-up 0.5s ease-out;
}

@keyframes fade-up {
  0% { 
    opacity: 0; 
    transform: translateY(20px) scale(0.95); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

/* Call ending content animation */
.call-ending-content {
  animation: fade-in-up 0.4s ease-out;
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-scale-enter-active {
  transition: all 0.4s ease-out;
}

.fade-scale-leave-active {
  transition: all 0.3s ease-in;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(1.05);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Pass-through - smooth slide in and out */
.pass-through-enter-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.pass-through-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 1, 0.45);
}

.pass-through-enter-from {
  opacity: 0;
  transform: translateY(60px) scale(0.9);
}

.pass-through-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.9);
}

/* Cinematic background fade */
.cinematic-bg-enter-active {
  transition: opacity 0.4s ease-out;
}

.cinematic-bg-leave-active {
  transition: opacity 0.3s ease-in;
}

.cinematic-bg-enter-from,
.cinematic-bg-leave-to {
  opacity: 0;
}

/* Heart float animation */
.heart-float {
  animation: heart-rise 2.5s ease-out forwards;
  opacity: 0;
}

@keyframes heart-rise {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.3) rotate(-10deg);
  }
  15% {
    opacity: 1;
    transform: translateY(-30px) scale(1) rotate(5deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-250px) scale(1.3) rotate(15deg);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
}
</style>
