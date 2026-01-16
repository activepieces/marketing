<template>
  <div 
    class="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
    style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)"
  >
    <!-- Glow effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tr from-indigo-500/20 to-blue-500/10 rounded-full blur-3xl translate-y-1/2"></div>
    </div>

    <div class="relative p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-white text-lg">Audit Log</h3>
            <p class="text-sm text-indigo-200/70">{{ filteredLogs.length }} events • Last 7 days</p>
          </div>
        </div>
        
        <!-- Filters -->
        <div class="flex items-center gap-3">
          <div class="relative">
            <select 
              v-model="selectedUser"
              class="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              <option value="" class="text-gray-900">All Users</option>
              <option v-for="user in users" :key="user" :value="user" class="text-gray-900">{{ user }}</option>
            </select>
            <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          
          <div class="relative">
            <select 
              v-model="selectedAction"
              class="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              <option value="" class="text-gray-900">All Actions</option>
              <option v-for="action in actionTypes" :key="action" :value="action" class="text-gray-900">{{ action }}</option>
            </select>
            <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          
          <button class="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      <!-- Log Table -->
      <div class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        <!-- Table Header -->
        <div class="grid grid-cols-12 gap-4 px-4 py-3 border-b border-white/10 text-xs font-medium text-indigo-200/70 uppercase tracking-wider">
          <div class="col-span-2">Time</div>
          <div class="col-span-2">User</div>
          <div class="col-span-2">Action</div>
          <div class="col-span-4">Resource</div>
          <div class="col-span-2">Details</div>
        </div>

        <!-- Log Entries -->
        <div class="divide-y divide-white/5 max-h-[320px] overflow-y-auto">
          <div 
            v-for="(log, index) in filteredLogs" 
            :key="log.id"
            class="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer group"
            :style="{ animationDelay: `${index * 50}ms` }"
            :class="{ 'animate-fade-in': true }"
          >
            <div class="col-span-2 text-sm text-indigo-100/80 font-mono">
              {{ log.time }}
            </div>
            
            <div class="col-span-2 flex items-center gap-2">
              <div 
                class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                :style="{ background: log.userColor }"
              >
                {{ log.userInitials }}
              </div>
              <span class="text-sm text-white truncate">{{ log.user }}</span>
            </div>
            
            <div class="col-span-2">
              <span 
                class="inline-flex px-2 py-0.5 text-xs font-medium rounded-full"
                :class="getActionClass(log.action)"
              >
                {{ log.action }}
              </span>
            </div>
            
            <div class="col-span-4 text-sm text-indigo-100/80 truncate">
              {{ log.resource }}
            </div>
            
            <div class="col-span-2 flex items-center">
              <button class="text-xs text-indigo-300 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                View details →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Live indicator -->
      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center gap-2 text-sm text-indigo-200/60">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live updates
        </div>
        <p class="text-xs text-indigo-200/40">
          Logs retained for 90 days • GDPR compliant
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedUser = ref('')
const selectedAction = ref('')

const users = ['Sarah Chen', 'Mike Johnson', 'Emma Wilson', 'John Smith', 'Alex Brown']
const actionTypes = ['Created', 'Updated', 'Deleted', 'Executed', 'Connected', 'Login']

const logs = ref([
  { id: 1, time: '14:32:15', user: 'Sarah Chen', userInitials: 'SC', userColor: 'linear-gradient(135deg, #ec4899, #d946ef)', action: 'Created', resource: 'Flow: Lead Qualification Agent' },
  { id: 2, time: '14:28:42', user: 'Mike Johnson', userInitials: 'MJ', userColor: 'linear-gradient(135deg, #3b82f6, #6366f1)', action: 'Executed', resource: 'Flow: Daily Slack Report (47 runs)' },
  { id: 3, time: '14:15:08', user: 'Emma Wilson', userInitials: 'EW', userColor: 'linear-gradient(135deg, #f97316, #eab308)', action: 'Updated', resource: 'Connection: HubSpot Marketing' },
  { id: 4, time: '13:58:33', user: 'John Smith', userInitials: 'JS', userColor: 'linear-gradient(135deg, #22c55e, #10b981)', action: 'Connected', resource: 'New SSO Login via Okta' },
  { id: 5, time: '13:45:21', user: 'Alex Brown', userInitials: 'AB', userColor: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', action: 'Deleted', resource: 'Flow: Old Email Workflow (archived)' },
  { id: 6, time: '13:22:17', user: 'Sarah Chen', userInitials: 'SC', userColor: 'linear-gradient(135deg, #ec4899, #d946ef)', action: 'Login', resource: 'SSO via Okta (Chrome, macOS)' },
  { id: 7, time: '12:58:45', user: 'Emma Wilson', userInitials: 'EW', userColor: 'linear-gradient(135deg, #f97316, #eab308)', action: 'Created', resource: 'Table: Q1 Campaign Leads' },
  { id: 8, time: '12:34:19', user: 'Mike Johnson', userInitials: 'MJ', userColor: 'linear-gradient(135deg, #3b82f6, #6366f1)', action: 'Updated', resource: 'Settings: AI Provider (Azure OpenAI)' },
])

const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    if (selectedUser.value && log.user !== selectedUser.value) return false
    if (selectedAction.value && log.action !== selectedAction.value) return false
    return true
  })
})

const getActionClass = (action) => {
  const classes = {
    'Created': 'bg-emerald-500/20 text-emerald-300',
    'Updated': 'bg-blue-500/20 text-blue-300',
    'Deleted': 'bg-red-500/20 text-red-300',
    'Executed': 'bg-violet-500/20 text-violet-300',
    'Connected': 'bg-cyan-500/20 text-cyan-300',
    'Login': 'bg-amber-500/20 text-amber-300',
  }
  return classes[action] || 'bg-gray-500/20 text-gray-300'
}
</script>

<style scoped>
.animate-fade-in {
  animation: fade-in 0.3s ease-out both;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>

