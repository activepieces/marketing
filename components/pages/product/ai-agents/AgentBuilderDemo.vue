<template>
  <div class="relative w-full max-w-2xl mx-auto">
    <!-- Initial State: Choose Use Case -->
    <div v-if="!selectedUseCase" class="text-center">
      <!-- Floating title -->
      <div class="mb-8">
        <p class="text-slate-500 text-sm mb-2 animate-pulse">Pick one to launch your agent</p>
        <div class="text-3xl animate-bounce-slow">👇</div>
      </div>
      
      <!-- Use case chips -->
      <div class="flex flex-wrap justify-center gap-4">
        <button
          v-for="(useCase, index) in useCases"
          :key="useCase.id"
          @click="selectUseCase(useCase)"
          class="group relative px-6 py-4 bg-white rounded-2xl border-2 border-slate-200 hover:border-violet-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left max-w-[200px]"
        >
          <div class="text-2xl mb-2">{{ useCase.icon }}</div>
          <h3 class="font-bold text-slate-800 text-sm mb-1">{{ useCase.name }}</h3>
          <p class="text-slate-500 text-xs leading-relaxed">{{ useCase.brief }}</p>
          
          <!-- Hover glow -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </button>
      </div>
    </div>

    <!-- Builder State: Configure Agent -->
    <Transition name="builder">
      <div v-if="selectedUseCase && !launched" class="space-y-6">
        <!-- Back button -->
        <button 
          @click="resetSelection"
          class="text-slate-400 hover:text-slate-600 text-sm flex items-center gap-1 transition-colors"
        >
          ← pick different
        </button>
        
        <!-- Agent Card -->
        <div class="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-violet-50 to-pink-50 px-6 py-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <span class="text-3xl">{{ selectedUseCase.icon }}</span>
              <div>
                <h3 class="font-bold text-slate-800 text-lg">{{ selectedUseCase.name }}</h3>
                <p class="text-slate-500 text-xs">Your new AI agent</p>
              </div>
            </div>
          </div>
          
          <!-- Trigger Section -->
          <div class="px-6 py-5 border-b border-slate-100">
            <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
              ⚡ Trigger
            </label>
            <div class="relative">
              <select 
                v-model="selectedTrigger"
                class="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-medium appearance-none cursor-pointer hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                <option v-for="trigger in selectedUseCase.triggers" :key="trigger" :value="trigger">
                  {{ trigger }}
                </option>
              </select>
              <div class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</div>
            </div>
          </div>
          
          <!-- Prompt Section -->
          <div class="px-6 py-5 border-b border-slate-100">
            <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
              🧠 Instructions
            </label>
            <div class="relative">
              <div 
                class="w-full px-4 py-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 min-h-[100px] text-sm leading-relaxed"
              >
                <span>{{ displayedPrompt }}</span>
                <span v-if="isTyping" class="inline-block w-0.5 h-4 bg-violet-500 animate-pulse ml-0.5"></span>
              </div>
              <!-- Whoosh effect overlay -->
              <div 
                v-if="isTyping" 
                class="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-violet-400/5 via-pink-400/10 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
          
          <!-- Capabilities Section -->
          <div class="px-6 py-5">
            <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
              🛠️ Capabilities
            </label>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tool in activeTools"
                :key="tool"
                class="group inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full text-sm font-medium text-violet-700 cursor-pointer hover:from-violet-200 hover:to-pink-200 transition-colors"
                @click="removeTool(tool)"
              >
                {{ getToolIcon(tool) }} {{ tool }}
                <span class="text-violet-400 group-hover:text-red-500 transition-colors">×</span>
              </span>
            </div>
            
            <!-- Add more tools -->
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tool in availableTools"
                :key="tool"
                @click="addTool(tool)"
                class="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-medium text-slate-600 transition-colors"
              >
                <span class="text-slate-400">+</span> {{ tool }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Launch Button -->
        <div class="text-center pt-4">
          <button
            @click="launchAgent"
            class="group relative px-12 py-4 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transform hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <span class="relative z-10 flex items-center gap-2">
              🚀 Launch Agent
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Launched State: Success! -->
    <Transition name="launch">
      <div v-if="launched" class="text-center py-12">
        <!-- Confetti particles -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div v-for="i in 20" :key="'confetti-'+i" 
            class="absolute w-2 h-2 rounded-full animate-confetti"
            :class="['bg-violet-400', 'bg-pink-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400'][i % 5]"
            :style="{ 
              left: (Math.random() * 100) + '%', 
              animationDelay: (Math.random() * 0.5) + 's',
              animationDuration: (1 + Math.random()) + 's'
            }"
          ></div>
        </div>
        
        <!-- Success content -->
        <div class="relative z-10">
          <div class="text-7xl mb-4 animate-bounce-slow">🎉</div>
          <h3 class="text-slate-800 font-black text-2xl mb-2">Agent Launched!</h3>
          <p class="text-slate-500 mb-6">{{ selectedUseCase?.name }} is now working in the background</p>
          
          <!-- Status indicator -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-8">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Running
          </div>
          
          <div>
            <button 
              @click="resetAll"
              class="text-violet-600 hover:text-violet-700 font-medium text-sm"
            >
              ← Build another agent
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const useCases = [
  {
    id: 'inbox-qualifier',
    name: 'Inbox Deal Qualifier',
    icon: '📧',
    brief: 'Auto-qualify inbound emails and update your CRM',
    triggers: ['New email in Gmail', 'New email in Outlook', 'Email with specific label'],
    prompt: 'Figure out if this email is a potential sales opportunity. Extract the company name, their intent, urgency level, and recommend the best next action for our sales team.',
    tools: ['Gmail', 'HubSpot', 'Web Search'],
    extraTools: ['Salesforce', 'Slack', 'Notion']
  },
  {
    id: 'meeting-followup',
    name: 'Meeting Follow-Up Agent',
    icon: '📅',
    brief: 'Zero-effort meeting follow-ups that actually get done',
    triggers: ['Meeting ends (Calendar)', 'Zoom meeting ends', 'Google Meet ends'],
    prompt: 'Summarize the key decisions made, action items, who owns each task, and deadlines discussed. Send follow-up messages to attendees and create tasks in our project tool.',
    tools: ['Google Calendar', 'Slack', 'Notion'],
    extraTools: ['Zoom', 'Asana', 'Email', 'Trello']
  },
  {
    id: 'lead-researcher',
    name: 'Smart Lead Researcher',
    icon: '🔍',
    brief: 'Instant context on every new lead',
    triggers: ['New lead in CRM', 'New contact added', 'Lead assigned to me'],
    prompt: 'Research this company and contact thoroughly. Find recent news, funding rounds, tech stack hints, and draft a personalized outreach angle that will resonate with them.',
    tools: ['HubSpot', 'Web Search', 'LinkedIn'],
    extraTools: ['Salesforce', 'Email', 'Generate Image']
  }
]

const allTools = ['Gmail', 'Outlook', 'HubSpot', 'Salesforce', 'Slack', 'Notion', 'Web Search', 'LinkedIn', 'Google Calendar', 'Zoom', 'Asana', 'Trello', 'Email', 'Generate Image', 'Jira']

const selectedUseCase = ref(null)
const selectedTrigger = ref('')
const activeTools = ref([])
const displayedPrompt = ref('')
const isTyping = ref(false)
const launched = ref(false)

const availableTools = computed(() => {
  return allTools.filter(t => !activeTools.value.includes(t))
})

const getToolIcon = (tool) => {
  const icons = {
    'Gmail': '📧',
    'Outlook': '📬',
    'HubSpot': '🧡',
    'Salesforce': '☁️',
    'Slack': '💬',
    'Notion': '📝',
    'Web Search': '🔍',
    'LinkedIn': '💼',
    'Google Calendar': '📅',
    'Zoom': '📹',
    'Asana': '✅',
    'Trello': '📋',
    'Email': '✉️',
    'Generate Image': '🎨',
    'Jira': '🎫'
  }
  return icons[tool] || '🔧'
}

const selectUseCase = (useCase) => {
  selectedUseCase.value = useCase
  selectedTrigger.value = useCase.triggers[0]
  activeTools.value = [...useCase.tools]
  
  // Start typewriter effect
  typePrompt(useCase.prompt)
}

const typePrompt = (text) => {
  displayedPrompt.value = ''
  isTyping.value = true
  let index = 0
  
  const interval = setInterval(() => {
    if (index < text.length) {
      displayedPrompt.value += text[index]
      index++
    } else {
      clearInterval(interval)
      isTyping.value = false
    }
  }, 20)
}

const addTool = (tool) => {
  activeTools.value.push(tool)
}

const removeTool = (tool) => {
  activeTools.value = activeTools.value.filter(t => t !== tool)
}

const launchAgent = () => {
  launched.value = true
}

const resetSelection = () => {
  selectedUseCase.value = null
  displayedPrompt.value = ''
  isTyping.value = false
}

const resetAll = () => {
  launched.value = false
  selectedUseCase.value = null
  displayedPrompt.value = ''
  isTyping.value = false
}
</script>

<style scoped>
.builder-enter-active {
  animation: slideUp 0.4s ease-out;
}

.builder-leave-active {
  animation: slideDown 0.3s ease-in;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.launch-enter-active {
  animation: launchIn 0.5s ease-out;
}

@keyframes launchIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

@keyframes confetti {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(400px) rotate(720deg);
    opacity: 0;
  }
}

.animate-confetti {
  animation: confetti 2s ease-out forwards;
}

.animate-bounce-slow {
  animation: bounceSlow 2s ease-in-out infinite;
}

@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>

