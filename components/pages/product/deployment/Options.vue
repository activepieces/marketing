<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[420px] rounded-2xl overflow-hidden"
    style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)"
  >
    <!-- Soft background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-200/40 to-green-200/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div class="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tr from-teal-200/30 to-emerald-100/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/3"></div>
    </div>

    <div class="relative h-full flex flex-col p-5">
      <!-- Header -->
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-200">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <div>
          <h3 class="font-bold text-gray-900">Deploy Anywhere</h3>
          <p class="text-xs text-gray-500">Pick your platform</p>
        </div>
      </div>

      <!-- Deployment options -->
      <div class="flex-1 space-y-3">
        <!-- Kubernetes / Helm -->
        <div 
          class="group bg-white rounded-xl p-4 border-2 transition-all cursor-pointer"
          :class="selectedOption === 'helm' ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-gray-200 hover:border-emerald-300'"
          @click="selectOption('helm')"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">☸️</span>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-900">Kubernetes (Helm)</h4>
              <p class="text-xs text-gray-500">Production-ready, scalable</p>
            </div>
            <div 
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              :class="selectedOption === 'helm' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'"
            >
              <svg v-if="selectedOption === 'helm'" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          
          <Transition name="expand">
            <div v-if="selectedOption === 'helm'" class="mt-4 p-3 bg-gray-50 rounded-lg">
              <code class="text-xs text-gray-600 font-mono">helm install activepieces activepieces/activepieces</code>
            </div>
          </Transition>
        </div>

        <!-- Docker Compose -->
        <div 
          class="group bg-white rounded-xl p-4 border-2 transition-all cursor-pointer"
          :class="selectedOption === 'docker' ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-gray-200 hover:border-emerald-300'"
          @click="selectOption('docker')"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <span class="text-2xl">🐳</span>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-900">Docker Compose</h4>
              <p class="text-xs text-gray-500">Quick local setup</p>
            </div>
            <div 
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              :class="selectedOption === 'docker' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'"
            >
              <svg v-if="selectedOption === 'docker'" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          
          <Transition name="expand">
            <div v-if="selectedOption === 'docker'" class="mt-4 p-3 bg-gray-50 rounded-lg">
              <code class="text-xs text-gray-600 font-mono">docker compose up -d</code>
            </div>
          </Transition>
        </div>

        <!-- Cloud providers -->
        <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Cloud Guides</p>
          <div class="flex items-center gap-3">
            <div 
              v-for="cloud in clouds" 
              :key="cloud.name"
              class="group flex-1 p-2 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all cursor-pointer text-center"
            >
              <span class="text-xl">{{ cloud.icon }}</span>
              <p class="text-[10px] text-gray-600 font-medium mt-1">{{ cloud.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <span>Full docs at activepieces.com/docs</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedOption = ref('helm')

const clouds = [
  { name: 'AWS', icon: '☁️' },
  { name: 'GCP', icon: '🌐' },
  { name: 'Azure', icon: '📘' },
  { name: 'DigitalOcean', icon: '🌊' },
]

const selectOption = (option) => {
  selectedOption.value = option
}
</script>

<style scoped>
.expand-enter-active {
  animation: expand-in 0.25s ease-out;
}
.expand-leave-active {
  animation: expand-out 0.2s ease-in;
}

@keyframes expand-in {
  from { opacity: 0; max-height: 0; margin-top: 0; }
  to { opacity: 1; max-height: 60px; }
}

@keyframes expand-out {
  from { opacity: 1; max-height: 60px; }
  to { opacity: 0; max-height: 0; margin-top: 0; }
}
</style>

