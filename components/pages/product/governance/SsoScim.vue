<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[400px] rounded-2xl overflow-hidden"
    style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)"
  >
    <!-- Soft background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/40 to-violet-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-fuchsia-200/30 to-purple-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
    </div>

    <div class="relative h-full flex flex-col p-5">
      <!-- Header -->
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-200">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-gray-900">Single Sign-On</h3>
            <p class="text-xs text-gray-500">SAML 2.0 configured</p>
          </div>
        </div>
        <span class="flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded-full">
          <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          Active
        </span>
      </div>

      <!-- SSO Provider -->
      <div class="bg-white rounded-xl p-4 border border-gray-200 mb-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span class="text-white font-bold">O</span>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900">Okta</h4>
            <p class="text-xs text-gray-500">Identity Provider</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500">Last sync</p>
            <p class="text-sm font-medium text-gray-700">2 min ago</p>
          </div>
        </div>
      </div>

      <!-- SCIM Status -->
      <div class="bg-white rounded-xl p-4 border border-gray-200 mb-4">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-semibold text-gray-900 text-sm">SCIM Provisioning</h4>
          <span class="px-2 py-0.5 text-[10px] font-medium bg-purple-100 text-purple-700 rounded-full">Enabled</span>
        </div>
        
        <!-- Sync animation -->
        <div class="flex items-center gap-3 text-xs text-gray-600">
          <div class="flex-1 space-y-2">
            <div class="flex items-center justify-between">
              <span>Users synced</span>
              <span class="font-semibold text-gray-900">247</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Groups synced</span>
              <span class="font-semibold text-gray-900">12</span>
            </div>
          </div>
          <div class="w-px h-10 bg-gray-200"></div>
          <div class="w-12 h-12 relative">
            <svg class="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#e9d5ff" stroke-width="3"/>
              <circle 
                cx="18" cy="18" r="16" fill="none" 
                stroke="url(#sync-gradient)" 
                stroke-width="3"
                stroke-dasharray="100"
                stroke-dashoffset="0"
                stroke-linecap="round"
                class="animate-sync-circle"
              />
              <defs>
                <linearGradient id="sync-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#a855f7"/>
                  <stop offset="100%" stop-color="#7c3aed"/>
                </linearGradient>
              </defs>
            </svg>
            <span class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-purple-600">100%</span>
          </div>
        </div>
      </div>

      <!-- User Flow Animation -->
      <div class="flex-1 bg-white/50 rounded-xl border border-purple-200/50 p-4 overflow-hidden">
        <p class="text-xs font-medium text-gray-500 mb-3">Auto-provisioned users</p>
        
        <div class="space-y-2">
          <div 
            v-for="(user, index) in recentUsers" 
            :key="user.id"
            class="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100"
            :style="{ animationDelay: `${index * 0.1}s` }"
            :class="{ 'animate-slide-in': true }"
          >
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
              :style="{ background: user.color }"
            >
              {{ user.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
              <p class="text-[10px] text-gray-500">{{ user.group }}</p>
            </div>
            <svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentUsers = ref([
  { id: 1, name: 'Sarah Chen', initials: 'SC', group: 'Engineering', color: 'linear-gradient(135deg, #ec4899, #d946ef)' },
  { id: 2, name: 'Mike Johnson', initials: 'MJ', group: 'Marketing', color: 'linear-gradient(135deg, #3b82f6, #6366f1)' },
  { id: 3, name: 'Emma Wilson', initials: 'EW', group: 'Sales', color: 'linear-gradient(135deg, #f97316, #eab308)' },
])
</script>

<style scoped>
.animate-sync-circle {
  animation: sync-rotate 3s linear infinite;
}

@keyframes sync-rotate {
  0% { stroke-dashoffset: 100; }
  50% { stroke-dashoffset: 25; }
  100% { stroke-dashoffset: 100; }
}

.animate-slide-in {
  animation: slide-in-right 0.4s ease-out both;
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

