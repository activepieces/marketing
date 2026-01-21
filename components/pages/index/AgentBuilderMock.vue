<template>
  <div class="w-full">
    <!-- Flow container -->
    <div
      class="relative w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-br from-slate-50 via-white to-violet-50/30"
      :style="{ height: '520px' }"
    >
      <!-- Soft background blobs -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-violet-200/30 to-purple-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div class="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-pink-200/20 to-rose-100/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <!-- Flow content -->
      <div class="relative h-full flex flex-col items-center pt-8 px-6">
        
        <!-- Trigger Node -->
        <div 
          class="trigger-node relative z-10"
          :class="{ 'animate-pulse-glow': !selectedTrigger }"
        >
          <div 
            class="relative flex items-center gap-3 px-4 py-3 rounded-xl bg-white border-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            :class="selectedTrigger ? 'border-violet-300 shadow-violet-100' : 'border-gray-200 hover:border-violet-300'"
            @click="toggleTriggerPicker"
          >
            <!-- Trigger Icon -->
            <div 
              class="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
              :style="{ backgroundColor: currentTrigger.color + '15' }"
            >
              <img :src="currentTrigger.logo" class="w-6 h-6" :alt="currentTrigger.app" />
            </div>
            
            <!-- Trigger Info -->
            <div class="flex-1">
              <div class="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">When</div>
              <div class="text-sm font-medium text-gray-800">{{ currentTrigger.label }}</div>
            </div>
            
            <!-- Chevron -->
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform" :class="showTriggerPicker ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
            
            <!-- Trigger Picker Dropdown -->
            <Transition name="dropdown">
              <div 
                v-if="showTriggerPicker" 
                class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden"
                @click.stop
              >
                <div class="max-h-[200px] overflow-y-auto p-2">
                  <button
                    v-for="trigger in allTriggers"
                    :key="trigger.label"
                    @click.stop="selectTrigger(trigger)"
                    class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-violet-50 transition-colors text-left"
                    :class="currentTrigger.label === trigger.label ? 'bg-violet-50' : ''"
                  >
                    <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" :style="{ backgroundColor: trigger.color + '15' }">
                      <img :src="trigger.logo" class="w-4 h-4" :alt="trigger.app" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <span class="text-sm text-gray-700 block truncate">{{ trigger.label }}</span>
                      <span class="text-[10px] text-gray-400">{{ trigger.app }}</span>
                    </div>
                  </button>
                </div>
                <div class="px-3 py-2 border-t border-gray-100 bg-gray-50 text-center">
                  <span class="text-[10px] text-gray-400">+ 500 more triggers from 280+ apps</span>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Connection Line -->
        <div class="relative h-8 flex items-center justify-center z-0">
          <div class="w-0.5 h-full bg-gray-300"></div>
          <!-- Arrow -->
          <svg class="absolute bottom-0 translate-y-1/2 w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 12 12">
            <path d="M6 9L1 4h10L6 9z"/>
          </svg>
        </div>

        <!-- AI Agent Node (Expanded) -->
        <div class="agent-node relative z-10 w-full max-w-md">
          <div class="bg-white rounded-2xl border-2 border-violet-300 shadow-lg shadow-violet-100/50 overflow-hidden">
            
            <!-- Agent Header -->
            <div class="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-purple-50">
              <div class="flex items-center gap-3">
                <!-- Agent Avatar -->
                <button 
                  @click.stop="shuffleEmoji"
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center transition-all relative overflow-hidden flex-shrink-0 hover:scale-105"
                  :class="isShuffling ? 'scale-110 shadow-lg shadow-violet-200' : ''"
                  title="Click to shuffle!"
                >
                  <span class="text-2xl" :class="isShuffling ? 'animate-lottery-spin' : ''">{{ agentEmoji }}</span>
                </button>
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] text-violet-600 uppercase tracking-wider font-semibold bg-violet-100 px-2 py-0.5 rounded-full">AI Agent</span>
                  </div>
                  <input 
                    v-model="agentName"
                    class="font-bold text-gray-900 text-lg bg-transparent border-none outline-none w-full hover:text-violet-700 focus:text-violet-700 transition-colors mt-1"
                    @focus="$event.target.select()"
                  />
                </div>
              </div>
            </div>

            <!-- Agent Body -->
            <div class="p-5 space-y-4">
              
              <!-- Instructions -->
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructions</label>
                  <span v-if="isTyping" class="text-xs text-violet-500 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></span>
                    writing...
                  </span>
                </div>
                <div class="rounded-xl bg-gray-50 border border-gray-200 shadow-inner">
                  <textarea
                    ref="textareaRef"
                    v-model="editablePrompt"
                    :readonly="isTyping"
                    class="w-full h-[80px] p-3 bg-transparent text-gray-700 text-sm leading-relaxed resize-none border-none outline-none"
                    :class="isTyping ? 'cursor-default' : 'cursor-text'"
                    placeholder="Describe what the agent should do..."
                    @input="onUserType"
                  ></textarea>
                </div>
              </div>

              <!-- Tools / Skills -->
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</label>
                  <span class="text-xs text-gray-300">•</span>
                  <span class="text-xs text-gray-400">{{ activeCapabilities.length }} connected</span>
                </div>
                
                <div class="flex items-center gap-2">
                  <!-- Add button -->
                  <button 
                    @click.stop="toggleCapabilityPicker"
                    class="flex items-center justify-center w-9 h-9 rounded-lg border-2 border-dashed border-gray-300 hover:border-violet-400 hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-all flex-shrink-0"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                  
                  <!-- Tools list -->
                  <div class="flex-1 flex flex-wrap gap-2">
                    <div
                      v-for="cap in activeCapabilities"
                      :key="cap.key"
                      class="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 transition-all hover:border-violet-300 hover:bg-violet-50"
                    >
                      <div class="w-5 h-5 rounded flex items-center justify-center" :class="cap.logo ? 'bg-white' : cap.bg">
                        <img v-if="cap.logo" :src="cap.logo" class="w-3.5 h-3.5" :alt="cap.name" />
                        <span v-else class="text-xs">{{ cap.icon }}</span>
                      </div>
                      <span class="text-xs text-gray-600 font-medium">{{ cap.name }}</span>
                      <button 
                        @click.stop="removeCapabilityByKey(cap.key)"
                        class="w-3.5 h-3.5 rounded-full bg-gray-200 hover:bg-red-400 text-gray-500 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-[9px] font-bold ml-0.5"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
          <!-- Capability Picker Modal -->
          <Transition name="overlay">
            <div 
              v-if="showCapabilityPicker" 
              class="absolute inset-0 bg-white z-50 flex flex-col rounded-2xl border-2 border-violet-300 shadow-xl overflow-hidden"
              @click.stop
            >
              <!-- Header -->
              <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-violet-50">
                <p class="font-bold text-gray-900">Add Tools</p>
                <button 
                  @click.stop="showCapabilityPicker = false"
                  class="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors shadow-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              <!-- Content -->
              <div class="flex-1 overflow-y-auto p-3">
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="cap in allCapabilitiesUnified"
                    :key="cap.key"
                    @click.stop="toggleCapability(cap)"
                    class="flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all text-left"
                    :class="activeCapabilitiesKeys.includes(cap.key) 
                      ? 'border-violet-400 bg-violet-50' 
                      : 'border-gray-100 hover:border-violet-200 hover:bg-violet-50/30'"
                  >
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="cap.logo ? 'bg-gray-50' : cap.bg">
                      <img v-if="cap.logo" :src="cap.logo" class="w-5 h-5" :alt="cap.name" />
                      <span v-else class="text-base">{{ cap.icon }}</span>
                    </div>
                    <span class="text-sm text-gray-800 font-medium flex-1 truncate">{{ cap.name }}</span>
                    <svg v-if="activeCapabilitiesKeys.includes(cap.key)" class="w-4 h-4 text-violet-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Footer -->
              <div class="px-4 py-3 border-t border-gray-100 flex justify-end bg-white">
                <button 
                  @click.stop="showCapabilityPicker = false"
                  class="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Bottom decoration -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-400">
          <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          <span>Ready to run</span>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const textareaRef = ref(null)

// Avatar - fun emoji lottery
const agentEmoji = ref('🤖')
const isShuffling = ref(false)
const allEmojis = ['🤖', '😀', '😎', '🤓', '🧠', '⚡', '🚀', '💫', '🎯', '🔥', '💡', '🎨', '🦊', '🦁', '🐱', '🐶', '🦄', '👻', '🤠', '🥷', '🧙', '🦸', '🧑‍💻', '👽', '🤩', '😈', '🌟', '💎', '🎪', '🎭']

let shuffleInterval = null

const shuffleEmoji = () => {
  if (isShuffling.value) return
  isShuffling.value = true
  let count = 0
  const totalSpins = 12 + Math.floor(Math.random() * 8)
  let speed = 50
  
  const spin = () => {
    agentEmoji.value = allEmojis[Math.floor(Math.random() * allEmojis.length)]
    count++
    if (count > totalSpins - 4) speed += 50
    if (count < totalSpins) {
      shuffleInterval = setTimeout(spin, speed)
    } else {
      isShuffling.value = false
    }
  }
  spin()
}

// App definitions with real logos from CDN
const apps = {
  'gmail': { name: 'Gmail', logo: 'https://cdn.activepieces.com/pieces/gmail.png', color: '#EA4335' },
  'slack': { name: 'Slack', logo: 'https://cdn.activepieces.com/pieces/slack.png', color: '#4A154B' },
  'notion': { name: 'Notion', logo: 'https://cdn.activepieces.com/pieces/notion.png', color: '#000000' },
  'hubspot': { name: 'HubSpot', logo: 'https://cdn.activepieces.com/pieces/hubspot.png', color: '#FF7A59' },
  'google-calendar': { name: 'Calendar', logo: 'https://cdn.activepieces.com/pieces/google-calendar.png', color: '#4285F4' },
  'google-sheets': { name: 'Sheets', logo: 'https://cdn.activepieces.com/pieces/google-sheets.png', color: '#0F9D58' },
  'openai': { name: 'OpenAI', logo: 'https://cdn.activepieces.com/pieces/openai.png', color: '#10A37F' },
  'airtable': { name: 'Airtable', logo: 'https://cdn.activepieces.com/pieces/airtable.png', color: '#18BFFF' },
  'discord': { name: 'Discord', logo: 'https://cdn.activepieces.com/pieces/discord.png', color: '#5865F2' },
  'github': { name: 'GitHub', logo: 'https://cdn.activepieces.com/pieces/github.png', color: '#181717' },
  'stripe': { name: 'Stripe', logo: 'https://cdn.activepieces.com/pieces/stripe.png', color: '#635BFF' },
  'typeform': { name: 'Typeform', logo: 'https://cdn.activepieces.com/pieces/typeform.png', color: '#262627' },
  'zendesk': { name: 'Zendesk', logo: 'https://cdn.activepieces.com/pieces/zendesk.png', color: '#03363D' },
  'schedule': { name: 'Schedule', logo: 'https://cdn.activepieces.com/pieces/schedule.png', color: '#6366F1' },
  'linear': { name: 'Linear', logo: 'https://cdn.activepieces.com/pieces/linear.png', color: '#5E6AD2' },
  'intercom': { name: 'Intercom', logo: 'https://cdn.activepieces.com/pieces/intercom.png', color: '#1F8DED' },
}

// All available triggers
const allTriggers = [
  { label: 'New email arrives', app: 'Gmail', logo: apps.gmail.logo, color: apps.gmail.color },
  { label: 'Message received', app: 'Slack', logo: apps.slack.logo, color: apps.slack.color },
  { label: 'Meeting ends', app: 'Calendar', logo: apps['google-calendar'].logo, color: apps['google-calendar'].color },
  { label: 'Form submitted', app: 'Typeform', logo: apps.typeform.logo, color: apps.typeform.color },
  { label: 'New contact added', app: 'HubSpot', logo: apps.hubspot.logo, color: apps.hubspot.color },
  { label: 'Ticket created', app: 'Zendesk', logo: apps.zendesk.logo, color: apps.zendesk.color },
  { label: 'Row added', app: 'Sheets', logo: apps['google-sheets'].logo, color: apps['google-sheets'].color },
]

// AI Capabilities
const aiCapabilities = [
  { key: 'web-search', name: 'Web Search', icon: '🔍', bg: 'bg-blue-100' },
  { key: 'image-gen', name: 'Image Gen', icon: '🎨', bg: 'bg-pink-100' },
  { key: 'contact-enrich', name: 'Enrich', icon: '👤', bg: 'bg-green-100' },
]

// App capabilities
const allCapabilitiesList = ['gmail', 'slack', 'notion', 'hubspot', 'google-sheets', 'airtable', 'discord', 'github', 'stripe', 'linear']

const selectedTrigger = ref(true)
const agentName = ref('Lead Qualifier Agent')
const editablePrompt = ref('Analyze incoming emails to identify potential sales opportunities. Extract company name, size, and intent. Score the lead and recommend next action.')
const isTyping = ref(false)
const showTriggerPicker = ref(false)
const showCapabilityPicker = ref(false)
const currentTrigger = ref(allTriggers[0])
const activeCapabilitiesKeys = ref(['web-search', 'hubspot', 'slack'])

// Convert capability keys to objects
const activeCapabilities = computed(() => 
  activeCapabilitiesKeys.value.map(key => {
    const aiCap = aiCapabilities.find(c => c.key === key)
    if (aiCap) {
      return { name: aiCap.name, logo: null, icon: aiCap.icon, bg: aiCap.bg, key }
    }
    return { name: apps[key]?.name || key, logo: apps[key]?.logo, key }
  })
)

// All app capabilities
const allAppCapabilities = computed(() => 
  allCapabilitiesList.map(key => ({ name: apps[key]?.name || key, logo: apps[key]?.logo, key }))
)

// Unified list
const allCapabilitiesUnified = computed(() => [
  ...aiCapabilities,
  ...allAppCapabilities.value
])

const onUserType = () => {
  // Could add typing indicator logic here
}

// Close dropdowns on outside click
const handleGlobalClick = () => {
  showTriggerPicker.value = false
}

onMounted(() => {
  document.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick)
  if (shuffleInterval) clearTimeout(shuffleInterval)
})

const toggleTriggerPicker = () => {
  const wasOpen = showTriggerPicker.value
  setTimeout(() => {
    showTriggerPicker.value = !wasOpen
    showCapabilityPicker.value = false
  }, 0)
}

const toggleCapabilityPicker = () => {
  const wasOpen = showCapabilityPicker.value
  setTimeout(() => {
    showCapabilityPicker.value = !wasOpen
    showTriggerPicker.value = false
  }, 0)
}

const selectTrigger = (trigger) => {
  currentTrigger.value = trigger
  showTriggerPicker.value = false
}

const toggleCapability = (cap) => {
  if (activeCapabilitiesKeys.value.includes(cap.key)) {
    activeCapabilitiesKeys.value = activeCapabilitiesKeys.value.filter(k => k !== cap.key)
  } else {
    activeCapabilitiesKeys.value.push(cap.key)
  }
}

const removeCapabilityByKey = (key) => {
  activeCapabilitiesKeys.value = activeCapabilitiesKeys.value.filter(k => k !== key)
}
</script>

<style scoped>
/* Gentle pulse glow for trigger */
.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.2);
  }
  50% { 
    box-shadow: 0 0 0 8px rgba(139, 92, 246, 0);
  }
}

/* Lottery spin animation */
.animate-lottery-spin {
  animation: lottery-spin 0.1s ease-in-out infinite;
}

@keyframes lottery-spin {
  0%, 100% { transform: scale(1) rotate(-3deg); }
  50% { transform: scale(1.1) rotate(3deg); }
}

/* Dropdown transition */
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}
.dropdown-leave-active {
  transition: all 0.15s ease-in;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Overlay transition */
.overlay-enter-active {
  transition: all 0.2s ease-out;
}
.overlay-leave-active {
  transition: all 0.15s ease-in;
}
.overlay-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.overlay-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
