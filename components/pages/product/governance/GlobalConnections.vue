<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[400px] rounded-2xl overflow-hidden"
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-gray-900">Global Connections</h3>
            <p class="text-xs text-gray-500">Available to all projects</p>
          </div>
        </div>
      </div>

      <!-- Connection List -->
      <div class="flex-1 space-y-2 overflow-y-auto">
        <!-- Google Workspace -->
        <div 
          class="group bg-white rounded-xl p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          @mouseenter="hoveredConnection = 'google'"
          @mouseleave="hoveredConnection = null"
        >
          <div class="flex items-center gap-3">
            <img src="https://cdn.activepieces.com/pieces/google.png" class="w-8 h-8 rounded-lg" alt="Google" />
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-900 text-sm">Google Workspace</h4>
              <p class="text-xs text-gray-500 truncate">admin@company.com</p>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">23</div>
              </div>
              <span class="text-[10px] text-gray-400">projects</span>
            </div>
          </div>
          
          <!-- Apps available -->
          <Transition name="slide">
            <div v-if="hoveredConnection === 'google'" class="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
              <span class="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">Gmail</span>
              <span class="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">Drive</span>
              <span class="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">Sheets</span>
              <span class="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">Calendar</span>
              <span class="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">+4 more</span>
            </div>
          </Transition>
        </div>

        <!-- Microsoft 365 -->
        <div 
          class="group bg-white rounded-xl p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          @mouseenter="hoveredConnection = 'microsoft'"
          @mouseleave="hoveredConnection = null"
        >
          <div class="flex items-center gap-3">
            <img src="https://cdn.activepieces.com/pieces/microsoft-365.png" class="w-8 h-8 rounded-lg" alt="Microsoft" />
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-900 text-sm">Microsoft 365</h4>
              <p class="text-xs text-gray-500 truncate">service@company.onmicrosoft.com</p>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">18</div>
              </div>
              <span class="text-[10px] text-gray-400">projects</span>
            </div>
          </div>
          
          <Transition name="slide">
            <div v-if="hoveredConnection === 'microsoft'" class="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
              <span class="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">Outlook</span>
              <span class="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">Teams</span>
              <span class="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">SharePoint</span>
              <span class="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">OneDrive</span>
            </div>
          </Transition>
        </div>

        <!-- Slack -->
        <div 
          class="group bg-white rounded-xl p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          @mouseenter="hoveredConnection = 'slack'"
          @mouseleave="hoveredConnection = null"
        >
          <div class="flex items-center gap-3">
            <img src="https://cdn.activepieces.com/pieces/slack.png" class="w-8 h-8 rounded-lg" alt="Slack" />
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-900 text-sm">Slack</h4>
              <p class="text-xs text-gray-500 truncate">Company Workspace Bot</p>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <div class="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">31</div>
              </div>
              <span class="text-[10px] text-gray-400">projects</span>
            </div>
          </div>
        </div>

        <!-- HubSpot -->
        <div class="group bg-white rounded-xl p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
          <div class="flex items-center gap-3">
            <img src="https://cdn.activepieces.com/pieces/hubspot.png" class="w-8 h-8 rounded-lg" alt="HubSpot" />
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-900 text-sm">HubSpot</h4>
              <p class="text-xs text-gray-500 truncate">Marketing Account</p>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <div class="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">12</div>
              </div>
              <span class="text-[10px] text-gray-400">projects</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Flow arrows animation -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          v-for="i in 3" 
          :key="i"
          class="absolute w-2 h-2 rounded-full bg-blue-400/60"
          :style="{
            left: `${20 + i * 25}%`,
            animation: `flow-down 3s ease-in-out ${i * 0.4}s infinite`
          }"
        ></div>
      </div>

      <!-- Footer -->
      <div class="mt-4 pt-3 border-t border-blue-200/50 flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <span>IT-managed credentials</span>
        </div>
        <button class="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
          + Add Connection
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hoveredConnection = ref(null)
</script>

<style scoped>
.slide-enter-active {
  animation: slide-in 0.2s ease-out;
}
.slide-leave-active {
  animation: slide-out 0.15s ease-in;
}

@keyframes slide-in {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-out {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-8px); }
}

@keyframes flow-down {
  0% { top: 10%; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { top: 90%; opacity: 0; }
}
</style>

