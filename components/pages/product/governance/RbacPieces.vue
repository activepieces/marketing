<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[400px] rounded-2xl overflow-hidden"
    style="background: linear-gradient(135deg, #ecfeff 0%, #cffafe 50%, #a5f3fc 100%)"
  >
    <!-- Soft background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-200/40 to-teal-200/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div class="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tr from-sky-200/30 to-cyan-100/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/3"></div>
    </div>

    <div class="relative h-full flex flex-col p-5">
      <!-- Tabs -->
      <div class="flex gap-2 mb-4">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-all"
          :class="activeTab === tab.id 
            ? 'bg-white text-gray-900 shadow-md' 
            : 'text-gray-600 hover:bg-white/50'"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Roles Tab -->
      <div v-if="activeTab === 'roles'" class="flex-1 flex flex-col">
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 flex flex-col">
          <!-- Header -->
          <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h4 class="font-semibold text-gray-900 text-sm">Team Roles</h4>
            <button class="text-xs font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              New Role
            </button>
          </div>

          <!-- Roles List -->
          <div class="flex-1 overflow-y-auto divide-y divide-gray-100">
            <div 
              v-for="role in roles" 
              :key="role.id"
              class="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer group"
              @click="selectedRole = selectedRole === role.id ? null : role.id"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div 
                    class="w-8 h-8 rounded-lg flex items-center justify-center"
                    :style="{ background: role.color }"
                  >
                    <span class="text-white text-sm">{{ role.icon }}</span>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-900 text-sm">{{ role.name }}</h5>
                    <p class="text-xs text-gray-500">{{ role.users }} users</p>
                  </div>
                </div>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform"
                  :class="{ 'rotate-180': selectedRole === role.id }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              
              <!-- Expanded permissions -->
              <Transition name="expand">
                <div v-if="selectedRole === role.id" class="mt-3 pt-3 border-t border-gray-100">
                  <div class="flex flex-wrap gap-1.5">
                    <span 
                      v-for="perm in role.permissions" 
                      :key="perm"
                      class="px-2 py-0.5 text-[10px] font-medium bg-cyan-100 text-cyan-700 rounded-full"
                    >
                      {{ perm }}
                    </span>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Pieces Tab -->
      <div v-if="activeTab === 'pieces'" class="flex-1 flex flex-col">
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 flex flex-col">
          <!-- Header -->
          <div class="px-4 py-3 border-b border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-semibold text-gray-900 text-sm">Pieces Visibility</h4>
              <span class="text-xs text-gray-500">{{ enabledPieces }} of {{ pieces.length }} enabled</span>
            </div>
            <input 
              type="text" 
              v-model="pieceSearch"
              placeholder="Search pieces..."
              class="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <!-- Pieces List -->
          <div class="flex-1 overflow-y-auto divide-y divide-gray-100">
            <div 
              v-for="piece in filteredPieces" 
              :key="piece.id"
              class="px-4 py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <img :src="piece.logo" class="w-7 h-7 rounded-lg" :alt="piece.name" />
                <div>
                  <h5 class="font-medium text-gray-900 text-sm">{{ piece.name }}</h5>
                  <div class="flex items-center gap-1">
                    <span v-if="piece.pinned" class="text-[10px] text-amber-600 font-medium">📌 Pinned</span>
                    <span v-if="piece.private" class="text-[10px] text-purple-600 font-medium">🔒 Private</span>
                  </div>
                </div>
              </div>
              <button 
                @click.stop="piece.enabled = !piece.enabled"
                class="relative w-10 h-5 rounded-full transition-colors"
                :class="piece.enabled ? 'bg-cyan-500' : 'bg-gray-300'"
              >
                <span 
                  class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                  :class="piece.enabled ? 'translate-x-5' : 'translate-x-0.5'"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { id: 'roles', name: 'Roles' },
  { id: 'pieces', name: 'Pieces' }
]

const activeTab = ref('roles')
const selectedRole = ref(null)
const pieceSearch = ref('')

const roles = ref([
  { 
    id: 1, 
    name: 'Admin', 
    icon: '👑', 
    color: 'linear-gradient(135deg, #f97316, #ea580c)', 
    users: 3,
    permissions: ['Full Access', 'Manage Users', 'Manage Billing', 'Edit Settings']
  },
  { 
    id: 2, 
    name: 'Builder', 
    icon: '🔨', 
    color: 'linear-gradient(135deg, #3b82f6, #2563eb)', 
    users: 28,
    permissions: ['Create Flows', 'Edit Own Flows', 'Use Connections', 'View Analytics']
  },
  { 
    id: 3, 
    name: 'Viewer', 
    icon: '👀', 
    color: 'linear-gradient(135deg, #6b7280, #4b5563)', 
    users: 156,
    permissions: ['View Flows', 'Run Flows', 'View Own Analytics']
  },
])

const pieces = ref([
  { id: 1, name: 'Slack', logo: 'https://cdn.activepieces.com/pieces/slack.png', enabled: true, pinned: false, private: false },
  { id: 2, name: 'Internal API', logo: 'https://cdn.activepieces.com/pieces/http.png', enabled: true, pinned: true, private: true },
  { id: 3, name: 'Google Sheets', logo: 'https://cdn.activepieces.com/pieces/google-sheets.png', enabled: true, pinned: false, private: false },
  { id: 4, name: 'HubSpot', logo: 'https://cdn.activepieces.com/pieces/hubspot.png', enabled: true, pinned: false, private: false },
  { id: 5, name: 'Discord', logo: 'https://cdn.activepieces.com/pieces/discord.png', enabled: false, pinned: false, private: false },
  { id: 6, name: 'Notion', logo: 'https://cdn.activepieces.com/pieces/notion.png', enabled: true, pinned: false, private: false },
])

const enabledPieces = computed(() => pieces.value.filter(p => p.enabled).length)

const filteredPieces = computed(() => {
  if (!pieceSearch.value) return pieces.value
  return pieces.value.filter(p => 
    p.name.toLowerCase().includes(pieceSearch.value.toLowerCase())
  )
})
</script>

<style scoped>
.expand-enter-active {
  animation: expand-in 0.25s ease-out;
}
.expand-leave-active {
  animation: expand-out 0.2s ease-in;
}

@keyframes expand-in {
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 80px; }
}

@keyframes expand-out {
  from { opacity: 1; max-height: 80px; }
  to { opacity: 0; max-height: 0; }
}
</style>

