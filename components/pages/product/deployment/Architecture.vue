<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[420px] rounded-2xl overflow-hidden"
    style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)"
  >
    <!-- Soft background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-200/40 to-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-fuchsia-200/30 to-purple-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
    </div>

    <div class="relative h-full flex flex-col items-center justify-center p-6">
      <!-- Architecture diagram -->
      <div class="relative w-full max-w-sm">
        <!-- Connection lines (behind) -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 0;">
          <!-- PostgreSQL to App -->
          <path 
            d="M85 100 Q 160 100 160 165" 
            stroke="rgba(167, 139, 250, 0.4)" 
            stroke-width="2" 
            fill="none"
            stroke-dasharray="4 4"
            class="animate-dash"
          />
          <!-- Redis to App -->
          <path 
            d="M235 100 Q 160 100 160 165" 
            stroke="rgba(167, 139, 250, 0.4)" 
            stroke-width="2" 
            fill="none"
            stroke-dasharray="4 4"
            class="animate-dash"
          />
          <!-- App to Workers -->
          <path 
            d="M160 230 L 85 290" 
            stroke="rgba(167, 139, 250, 0.4)" 
            stroke-width="2" 
            fill="none"
            stroke-dasharray="4 4"
            class="animate-dash"
          />
          <path 
            d="M160 230 L 160 280" 
            stroke="rgba(167, 139, 250, 0.4)" 
            stroke-width="2" 
            fill="none"
            stroke-dasharray="4 4"
            class="animate-dash"
          />
          <path 
            d="M160 230 L 235 290" 
            stroke="rgba(167, 139, 250, 0.4)" 
            stroke-width="2" 
            fill="none"
            stroke-dasharray="4 4"
            class="animate-dash"
          />
        </svg>

        <!-- Top row: PostgreSQL & Redis -->
        <div class="flex justify-center gap-12 mb-6">
          <!-- PostgreSQL -->
          <div 
            class="group relative"
            @mouseenter="activeComponent = 'postgres'"
            @mouseleave="activeComponent = null"
          >
            <div 
              class="w-20 h-20 rounded-2xl bg-white shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center transition-all cursor-pointer"
              :class="{ 'scale-110 border-blue-400 shadow-xl shadow-blue-200': activeComponent === 'postgres' }"
            >
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-1">
                <span class="text-white text-lg">🐘</span>
              </div>
              <p class="text-[10px] font-bold text-gray-700">PostgreSQL</p>
            </div>
            <Transition name="tooltip">
              <div v-if="activeComponent === 'postgres'" class="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap z-10">
                Your data store
              </div>
            </Transition>
          </div>

          <!-- Redis -->
          <div 
            class="group relative"
            @mouseenter="activeComponent = 'redis'"
            @mouseleave="activeComponent = null"
          >
            <div 
              class="w-20 h-20 rounded-2xl bg-white shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center transition-all cursor-pointer"
              :class="{ 'scale-110 border-red-400 shadow-xl shadow-red-200': activeComponent === 'redis' }"
            >
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-1">
                <span class="text-white text-lg">⚡</span>
              </div>
              <p class="text-[10px] font-bold text-gray-700">Redis</p>
            </div>
            <Transition name="tooltip">
              <div v-if="activeComponent === 'redis'" class="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap z-10">
                Queue & cache
              </div>
            </Transition>
          </div>
        </div>

        <!-- Middle: App -->
        <div class="flex justify-center mb-6">
          <div 
            class="group relative"
            @mouseenter="activeComponent = 'app'"
            @mouseleave="activeComponent = null"
          >
            <div 
              class="w-24 h-24 rounded-2xl bg-white shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center transition-all cursor-pointer"
              :class="{ 'scale-110 border-violet-400 shadow-xl shadow-violet-200': activeComponent === 'app' }"
            >
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-1">
                <span class="text-white text-xl">🚀</span>
              </div>
              <p class="text-xs font-bold text-gray-700">App Server</p>
            </div>
            <Transition name="tooltip">
              <div v-if="activeComponent === 'app'" class="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap z-10">
                API & UI
              </div>
            </Transition>
          </div>
        </div>

        <!-- Bottom row: Workers -->
        <div class="flex justify-center gap-4">
          <div 
            v-for="i in 3" 
            :key="i"
            class="group relative"
            @mouseenter="activeComponent = `worker-${i}`"
            @mouseleave="activeComponent = null"
          >
            <div 
              class="w-16 h-16 rounded-xl bg-white shadow-md border-2 border-gray-200 flex flex-col items-center justify-center transition-all cursor-pointer"
              :class="{ 'scale-110 border-emerald-400 shadow-lg shadow-emerald-200': activeComponent === `worker-${i}` }"
            >
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-0.5">
                <span class="text-white text-sm">⚙️</span>
              </div>
              <p class="text-[9px] font-bold text-gray-700">Worker {{ i }}</p>
            </div>
          </div>
        </div>

        <!-- Scale indicator -->
        <div class="flex justify-center mt-4">
          <div class="flex items-center gap-2 px-3 py-1.5 bg-white/70 rounded-full border border-violet-200">
            <svg class="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span class="text-xs font-medium text-violet-700">Scale workers as needed</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeComponent = ref(null)
</script>

<style scoped>
.animate-dash {
  animation: dash 20s linear infinite;
}

@keyframes dash {
  to { stroke-dashoffset: -100; }
}

.tooltip-enter-active {
  animation: tooltip-in 0.2s ease-out;
}
.tooltip-leave-active {
  animation: tooltip-out 0.15s ease-in;
}

@keyframes tooltip-in {
  from { opacity: 0; transform: translate(-50%, 4px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes tooltip-out {
  from { opacity: 1; transform: translate(-50%, 0); }
  to { opacity: 0; transform: translate(-50%, 4px); }
}
</style>

