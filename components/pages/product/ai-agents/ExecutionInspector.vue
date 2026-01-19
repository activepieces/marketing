<template>
  <div 
    class="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden select-none border border-gray-200 bg-white"
  >
    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-xl">{{ currentFlow.icon }}</span>
        <div>
          <h3 class="font-semibold text-gray-800">{{ currentFlow.name }}</h3>
          <p class="text-xs text-gray-400">{{ runStatus }}</p>
        </div>
      </div>
      <div 
        class="px-2.5 py-1 rounded-full text-xs font-medium"
        :class="statusBadgeClass"
      >
        {{ statusText }}
      </div>
    </div>

    <!-- Flow Steps -->
    <div class="p-5">
      <div class="space-y-1">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative"
        >
          <!-- Connector line -->
          <div 
            v-if="index < steps.length - 1"
            class="absolute left-5 top-12 w-0.5 h-6 transition-colors duration-500"
            :class="getConnectorClass(index)"
          ></div>

          <!-- Step -->
          <div 
            class="flex items-center gap-4 p-3 rounded-xl transition-all duration-300"
            :class="getStepBgClass(step)"
          >
            <!-- Icon -->
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
              :class="getIconBgClass(step)"
            >
              <!-- Running spinner -->
              <svg v-if="step.status === 'running'" class="w-5 h-5 text-orange-500 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <!-- Success check -->
              <svg v-else-if="step.status === 'success'" class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
              <!-- Failed X -->
              <svg v-else-if="step.status === 'failed'" class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <!-- Retrying -->
              <svg v-else-if="step.status === 'retrying'" class="w-5 h-5 text-amber-500 animate-spin" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M4 12a8 8 0 018-8m8 8a8 8 0 01-8 8"/>
              </svg>
              <!-- Pending -->
              <img v-else :src="step.logo" class="w-5 h-5 rounded opacity-40" :alt="step.name" />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <img :src="step.logo" class="w-4 h-4 rounded" :alt="step.name" />
                <span class="font-medium text-gray-800 text-sm">{{ step.name }}</span>
              </div>
              <p 
                class="text-xs mt-0.5 transition-colors duration-300"
                :class="step.status === 'failed' ? 'text-red-500' : 'text-gray-400'"
              >
                {{ getStepMessage(step) }}
              </p>
            </div>

            <!-- Duration -->
            <span 
              v-if="step.duration" 
              class="text-[11px] text-gray-300 font-mono"
            >
              {{ step.duration }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Retry button (shows on failure) -->
    <Transition name="retry">
      <div v-if="showRetry" class="px-5 pb-5">
        <button 
          @click="doRetry"
          class="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Retry
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const flows = [
  {
    name: 'Lead Qualifier',
    icon: '📧',
    steps: [
      { name: 'New Email', logo: 'https://cdn.activepieces.com/pieces/gmail.png', message: 'Received from lead@acme.co' },
      { name: 'AI Analysis', logo: 'https://cdn.activepieces.com/pieces/openai.png', message: 'Score: 85 — High intent' },
      { name: 'Update CRM', logo: 'https://cdn.activepieces.com/pieces/hubspot.png', message: 'Contact updated' },
      { name: 'Notify Sales', logo: 'https://cdn.activepieces.com/pieces/slack.png', message: 'Posted to #leads' },
    ]
  },
  {
    name: 'Invoice Processor',
    icon: '💰',
    steps: [
      { name: 'Payment Received', logo: 'https://cdn.activepieces.com/pieces/stripe.png', message: '$2,500 from Acme Corp' },
      { name: 'Generate Invoice', logo: 'https://cdn.activepieces.com/pieces/google-docs.png', message: 'INV-2024-0892' },
      { name: 'Update Records', logo: 'https://cdn.activepieces.com/pieces/airtable.png', message: 'Row added' },
      { name: 'Send Email', logo: 'https://cdn.activepieces.com/pieces/gmail.png', message: 'Receipt sent' },
    ]
  },
  {
    name: 'Support Router',
    icon: '🎫',
    steps: [
      { name: 'New Ticket', logo: 'https://cdn.activepieces.com/pieces/zendesk.png', message: 'Priority: High' },
      { name: 'Categorize', logo: 'https://cdn.activepieces.com/pieces/openai.png', message: 'Type: Technical' },
      { name: 'Assign Team', logo: 'https://cdn.activepieces.com/pieces/zendesk.png', message: 'Routed to Engineering' },
      { name: 'Alert Team', logo: 'https://cdn.activepieces.com/pieces/slack.png', message: 'Posted to #support' },
    ]
  }
]

const currentFlowIndex = ref(0)
const currentFlow = computed(() => flows[currentFlowIndex.value])
const steps = ref([])
const showRetry = ref(false)
const isRetrying = ref(false)
const runCount = ref(0)

let animationTimeout = null

const runStatus = computed(() => {
  if (isRetrying.value) return 'Retrying...'
  const running = steps.value.find(s => s.status === 'running')
  if (running) return `Step ${steps.value.indexOf(running) + 1} of ${steps.value.length}`
  const failed = steps.value.find(s => s.status === 'failed')
  if (failed) return 'Failed at step ' + (steps.value.indexOf(failed) + 1)
  const allDone = steps.value.every(s => s.status === 'success')
  if (allDone) return 'Completed'
  return 'Starting...'
})

const statusBadgeClass = computed(() => {
  if (isRetrying.value) return 'bg-amber-100 text-amber-600'
  const failed = steps.value.find(s => s.status === 'failed')
  if (failed) return 'bg-red-100 text-red-600'
  const running = steps.value.find(s => s.status === 'running')
  if (running) return 'bg-orange-100 text-orange-600'
  const allDone = steps.value.every(s => s.status === 'success')
  if (allDone) return 'bg-emerald-100 text-emerald-600'
  return 'bg-gray-100 text-gray-500'
})

const statusText = computed(() => {
  if (isRetrying.value) return 'Retrying'
  const failed = steps.value.find(s => s.status === 'failed')
  if (failed) return 'Failed'
  const running = steps.value.find(s => s.status === 'running')
  if (running) return 'Running'
  const allDone = steps.value.every(s => s.status === 'success')
  if (allDone) return 'Success'
  return 'Pending'
})

const getStepMessage = (step) => {
  if (step.status === 'running') return 'Processing...'
  if (step.status === 'failed') return 'Connection timeout'
  if (step.status === 'retrying') return 'Retrying...'
  if (step.status === 'success') return step.message
  return 'Waiting'
}

const getStepBgClass = (step) => {
  if (step.status === 'running') return 'bg-orange-50'
  if (step.status === 'failed') return 'bg-red-50'
  if (step.status === 'retrying') return 'bg-amber-50'
  return ''
}

const getIconBgClass = (step) => {
  if (step.status === 'running') return 'bg-orange-100'
  if (step.status === 'success') return 'bg-emerald-100'
  if (step.status === 'failed') return 'bg-red-100'
  if (step.status === 'retrying') return 'bg-amber-100'
  return 'bg-gray-100'
}

const getConnectorClass = (index) => {
  const step = steps.value[index]
  if (step.status === 'success') return 'bg-emerald-300'
  if (step.status === 'failed') return 'bg-red-300'
  return 'bg-gray-200'
}

const initSteps = () => {
  steps.value = currentFlow.value.steps.map(s => ({
    ...s,
    status: 'pending',
    duration: null
  }))
}

const runFlow = (shouldFail = false, failAtStep = 2) => {
  initSteps()
  showRetry.value = false
  
  let currentStep = 0
  
  const executeStep = () => {
    if (currentStep >= steps.value.length) {
      // Flow complete - wait then start next flow
      animationTimeout = setTimeout(() => {
        nextFlow()
      }, 2500)
      return
    }
    
    // Start step
    steps.value[currentStep].status = 'running'
    
    // Complete step after delay
    animationTimeout = setTimeout(() => {
      if (shouldFail && currentStep === failAtStep) {
        // Fail this step
        steps.value[currentStep].status = 'failed'
        steps.value[currentStep].duration = '2.1s'
        showRetry.value = true
        
        // Auto-retry after a moment
        animationTimeout = setTimeout(() => {
          doRetry()
        }, 2000)
      } else {
        // Success
        steps.value[currentStep].status = 'success'
        steps.value[currentStep].duration = `${(Math.random() * 0.8 + 0.2).toFixed(1)}s`
        currentStep++
        executeStep()
      }
    }, 800 + Math.random() * 400)
  }
  
  executeStep()
}

const doRetry = () => {
  showRetry.value = false
  isRetrying.value = true
  
  // Find failed step
  const failedIndex = steps.value.findIndex(s => s.status === 'failed')
  if (failedIndex === -1) return
  
  // Mark as retrying
  steps.value[failedIndex].status = 'retrying'
  
  // After delay, continue from failed step
  animationTimeout = setTimeout(() => {
    isRetrying.value = false
    steps.value[failedIndex].status = 'running'
    
    let currentStep = failedIndex
    
    const continueExecution = () => {
      animationTimeout = setTimeout(() => {
        steps.value[currentStep].status = 'success'
        steps.value[currentStep].duration = `${(Math.random() * 0.8 + 0.2).toFixed(1)}s`
        currentStep++
        
        if (currentStep < steps.value.length) {
          steps.value[currentStep].status = 'running'
          continueExecution()
        } else {
          // Complete - wait then next flow
          animationTimeout = setTimeout(() => {
            nextFlow()
          }, 2500)
        }
      }, 800 + Math.random() * 400)
    }
    
    continueExecution()
  }, 600)
}

const nextFlow = () => {
  currentFlowIndex.value = (currentFlowIndex.value + 1) % flows.length
  runCount.value++
  
  // Every 3rd run, show a failure
  const shouldFail = runCount.value % 3 === 2
  
  animationTimeout = setTimeout(() => {
    runFlow(shouldFail, Math.floor(Math.random() * 2) + 1)
  }, 500)
}

onMounted(() => {
  initSteps()
  setTimeout(() => {
    runFlow(false)
  }, 800)
})

onUnmounted(() => {
  if (animationTimeout) clearTimeout(animationTimeout)
})
</script>

<style scoped>
.retry-enter-active {
  animation: slide-up 0.3s ease-out;
}

.retry-leave-active {
  animation: slide-down 0.2s ease-in;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  to {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
