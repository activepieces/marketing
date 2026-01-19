<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[420px] rounded-2xl overflow-hidden"
    style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)"
  >
    <!-- Soft background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-indigo-200/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div class="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tr from-sky-200/30 to-blue-100/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/3"></div>
    </div>

    <div class="relative h-full flex flex-col p-5">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-gray-900">Worker Pool</h3>
            <p class="text-xs text-gray-500">Scale your execution capacity</p>
          </div>
        </div>
        <span class="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
          {{ workers.length }} active
        </span>
      </div>

      <!-- Worker visualization -->
      <div class="flex-1 bg-white rounded-xl border border-gray-200 p-4 overflow-hidden">
        <!-- Grid of workers -->
        <div class="grid grid-cols-4 gap-2 mb-4">
          <div 
            v-for="(worker, index) in workers" 
            :key="worker.id"
            class="relative aspect-square rounded-lg flex items-center justify-center transition-all cursor-pointer"
            :class="getWorkerClass(worker)"
            @click="toggleWorker(index)"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" :class="worker.dedicated ? 'text-white' : 'text-gray-400'">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/>
            </svg>
            
            <!-- Activity indicator -->
            <div 
              v-if="worker.active"
              class="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse"
              :class="worker.dedicated ? 'bg-white' : 'bg-emerald-500'"
            ></div>
            
            <!-- Type badge -->
            <span 
              v-if="worker.dedicated"
              class="absolute bottom-0.5 text-[8px] font-bold text-white/90"
            >
              PRO
            </span>
          </div>
          
          <!-- Add worker button -->
          <button 
            @click="addWorker"
            class="aspect-square rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center transition-colors"
          >
            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>

        <!-- Legend -->
        <div class="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div class="flex items-center gap-1.5">
            <div class="w-3 h-3 rounded bg-gray-200"></div>
            <span>Shared</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-3 h-3 rounded bg-gradient-to-br from-blue-500 to-indigo-600"></div>
            <span>Dedicated</span>
          </div>
          <span class="text-gray-400">|</span>
          <span class="text-gray-400">Click to toggle</span>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="bg-gray-50 rounded-lg p-3 text-center">
            <p class="text-2xl font-bold text-gray-900">{{ dedicatedCount }}</p>
            <p class="text-[10px] text-gray-500 uppercase tracking-wider">Dedicated</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3 text-center">
            <p class="text-2xl font-bold text-emerald-600">∞</p>
            <p class="text-[10px] text-gray-500 uppercase tracking-wider">Executions</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3 text-center">
            <p class="text-2xl font-bold text-gray-900">${{ monthlyCost }}</p>
            <p class="text-[10px] text-gray-500 uppercase tracking-wider">/month</p>
          </div>
        </div>
      </div>

      <!-- Footer note -->
      <div class="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
        <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Pay per instance, not per execution</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const workers = ref([
  { id: 1, dedicated: false, active: true },
  { id: 2, dedicated: false, active: true },
  { id: 3, dedicated: true, active: true },
  { id: 4, dedicated: true, active: true },
  { id: 5, dedicated: false, active: false },
  { id: 6, dedicated: true, active: true },
  { id: 7, dedicated: false, active: true },
])

const dedicatedCount = computed(() => workers.value.filter(w => w.dedicated).length)
const monthlyCost = computed(() => dedicatedCount.value * 149)

const getWorkerClass = (worker) => {
  if (worker.dedicated) {
    return 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-200 animate-worker-pop'
  }
  return 'bg-gray-100 border border-gray-200 animate-worker-pop'
}

const toggleWorker = (index) => {
  workers.value[index].dedicated = !workers.value[index].dedicated
}

const addWorker = () => {
  workers.value.push({
    id: workers.value.length + 1,
    dedicated: true,
    active: true
  })
}
</script>

<style scoped>
.animate-worker-pop {
  animation: worker-pop 0.3s ease-out both;
}

@keyframes worker-pop {
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
</style>

