<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[420px] rounded-2xl overflow-hidden"
    style="background: linear-gradient(135deg, #ecfeff 0%, #cffafe 50%, #a5f3fc 100%)"
  >
    <!-- Soft background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-200/40 to-teal-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-sky-200/30 to-cyan-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
    </div>

    <div class="relative h-full flex flex-col items-center justify-center p-6">
      <!-- Shield with checkmark animation -->
      <div class="relative mb-8">
        <div 
          class="w-28 h-32 flex items-center justify-center"
          :class="{ 'animate-shield-pop': mounted }"
        >
          <svg viewBox="0 0 24 28" class="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#06b6d4"/>
                <stop offset="100%" stop-color="#0891b2"/>
              </linearGradient>
            </defs>
            <path 
              d="M12 1L2 5v7c0 5.55 4.16 10.74 10 12 5.84-1.26 10-6.45 10-12V5L12 1z" 
              fill="url(#shield-gradient)"
            />
            <!-- Checkmark -->
            <path 
              d="M9 13l2 2 4-5" 
              stroke="white" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              fill="none"
              class="animate-draw-check"
            />
          </svg>
        </div>
        
        <!-- Orbiting badges -->
        <div 
          v-for="(badge, index) in badges" 
          :key="badge.name"
          class="absolute w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center animate-orbit"
          :style="{ 
            animationDelay: `${index * -2}s`,
            '--orbit-radius': '80px',
            '--start-angle': `${index * 120}deg`
          }"
        >
          <span class="text-xl">{{ badge.icon }}</span>
        </div>
      </div>

      <!-- Compliance badges -->
      <div class="flex items-center gap-4 mb-6">
        <div 
          class="group bg-white rounded-xl px-5 py-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-default"
          @mouseenter="activeBadge = 'soc2'"
          @mouseleave="activeBadge = null"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <span class="text-white font-bold text-sm">II</span>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">SOC 2 Type II</p>
              <p class="text-xs text-gray-500">Certified</p>
            </div>
          </div>
          <Transition name="slide-up">
            <div v-if="activeBadge === 'soc2'" class="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
              Annual audit • 5+ controls • Enterprise-ready
            </div>
          </Transition>
        </div>

        <div 
          class="group bg-white rounded-xl px-5 py-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-default"
          @mouseenter="activeBadge = 'gdpr'"
          @mouseleave="activeBadge = null"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span class="text-white font-bold text-sm">EU</span>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">GDPR</p>
              <p class="text-xs text-gray-500">Compliant</p>
            </div>
          </div>
          <Transition name="slide-up">
            <div v-if="activeBadge === 'gdpr'" class="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
              Data protection • Privacy-first • EU hosting
            </div>
          </Transition>
        </div>
      </div>

      <!-- Uptime stats -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 border border-cyan-200/50">
        <div class="flex items-center gap-8">
          <div class="text-center">
            <p class="text-3xl font-black text-gray-900">99.9<span class="text-lg">%</span></p>
            <p class="text-xs text-gray-500 uppercase tracking-wider">Uptime SLA</p>
          </div>
          <div class="w-px h-10 bg-gray-200"></div>
          <div class="text-center">
            <p class="text-3xl font-black text-emerald-600">{{ uptimeDays }}</p>
            <p class="text-xs text-gray-500 uppercase tracking-wider">Days clean</p>
          </div>
          <div class="w-px h-10 bg-gray-200"></div>
          <div class="text-center">
            <p class="text-3xl font-black text-gray-900">24/7</p>
            <p class="text-xs text-gray-500 uppercase tracking-wider">Monitoring</p>
          </div>
        </div>
      </div>

      <!-- Pulse ring effect -->
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div class="w-64 h-64 border border-cyan-300/30 rounded-full animate-pulse-ring"></div>
        <div class="absolute w-80 h-80 border border-cyan-200/20 rounded-full animate-pulse-ring" style="animation-delay: 0.5s"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mounted = ref(false)
const activeBadge = ref(null)
const uptimeDays = ref(127)

const badges = [
  { name: 'SOC2', icon: '🛡️' },
  { name: 'GDPR', icon: '🇪🇺' },
  { name: 'SSL', icon: '🔒' },
]

onMounted(() => {
  setTimeout(() => mounted.value = true, 100)
})
</script>

<style scoped>
.animate-shield-pop {
  animation: shield-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes shield-pop {
  0% { transform: scale(0) rotate(-10deg); }
  60% { transform: scale(1.1) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.animate-draw-check {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  animation: draw-check 0.5s ease-out 0.4s forwards;
}

@keyframes draw-check {
  to { stroke-dashoffset: 0; }
}

.animate-orbit {
  animation: orbit 8s linear infinite;
}

@keyframes orbit {
  from {
    transform: rotate(var(--start-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--start-angle)));
  }
  to {
    transform: rotate(calc(var(--start-angle) + 360deg)) translateX(var(--orbit-radius)) rotate(calc(-1 * (var(--start-angle) + 360deg)));
  }
}

.animate-pulse-ring {
  animation: pulse-ring 3s ease-out infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1); opacity: 0.2; }
  100% { transform: scale(1.2); opacity: 0; }
}

.slide-up-enter-active {
  animation: slide-up-in 0.2s ease-out;
}
.slide-up-leave-active {
  animation: slide-up-out 0.15s ease-in;
}

@keyframes slide-up-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up-out {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(8px); }
}
</style>

