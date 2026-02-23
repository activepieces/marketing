<template>
  <!-- Browser/Screen Frame -->
  <div class="relative w-full max-w-lg mx-auto">
    <!-- Browser Chrome -->
    <div class="bg-[#1a1a1a] rounded-t-xl px-4 py-3 flex items-center gap-3">
      <!-- Window Controls -->
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
        <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
        <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
      </div>
      <!-- Address Bar -->
      <div class="flex-1 bg-[#2a2a2a] rounded-md px-3 py-1.5 flex items-center gap-2">
        <svg class="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span class="text-xs text-gray-400 truncate">app.activepieces.com/todos</span>
      </div>
    </div>

    <!-- Screen Content -->
    <div 
      class="relative w-full h-[460px] rounded-b-xl overflow-hidden flex flex-col bg-gray-50 border-x border-b border-gray-200"
    >
      <!-- Header -->
      <div class="flex-shrink-0 px-5 py-4 bg-white border-b border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-gray-900">Agent Tasks</h3>
            <p class="text-xs text-gray-400 mt-0.5">{{ cards.length }} waiting for you</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="text-lg font-semibold text-gray-900">{{ completedCount }}</p>
              <p class="text-[10px] text-gray-400">completed</p>
            </div>
            <button 
              @click="handleReset"
              class="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
            >
              reset
            </button>
          </div>
        </div>
      </div>

      <!-- Cards Area -->
      <div class="flex-1 relative overflow-hidden">
        <!-- Empty state -->
        <Transition name="fade">
          <div v-if="cards.length === 0" class="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div class="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <span class="text-2xl">✓</span>
            </div>
            <h4 class="font-medium text-gray-900 mb-1">All done!</h4>
            <p class="text-sm text-gray-500 text-center">Your agents are running. They'll ping you when they need input.</p>
            <button 
              @click="handleReset"
              class="mt-6 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Run demo again
            </button>
          </div>
        </Transition>

        <!-- Card Stack -->
        <div class="absolute inset-4 flex items-center justify-center">
          <TransitionGroup name="card">
            <div
              v-for="(card, index) in visibleCards"
              :key="card.id"
              class="absolute w-full max-w-sm"
              :style="getStackStyle(index)"
            >
              <div 
                class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
                :class="{ 'shadow-lg scale-[1.02]': index === 0 }"
                :style="getSwipeStyle(card.id)"
              >
                <!-- Card Header -->
                <div class="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span class="text-sm">{{ card.icon }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">{{ card.agent }}</p>
                    <p class="text-xs text-gray-400">{{ card.source }}</p>
                  </div>
                  <span class="text-xs text-gray-400">{{ card.time }}</span>
                </div>

                <!-- Card Content - Conversational Style -->
                <div class="px-4 py-4">
                  <p class="text-sm text-gray-700 leading-relaxed mb-4">{{ card.message }}</p>

                  <!-- Action Buttons - Consistent Labels -->
                  <div class="flex gap-2">
                    <button 
                      @click="handleAction(card, 'reject')"
                      :disabled="index !== 0"
                      class="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg transition-colors"
                    >
                      Reject
                    </button>
                    <button 
                      @click="handleAction(card, 'approve')"
                      :disabled="index !== 0"
                      class="flex-1 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 rounded-lg transition-colors"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const cards = ref([])
const completedCount = ref(0)
const swipingCards = ref({})
const swipeDirections = ref({})

let timeoutIds = []

// Conversational messages - agent speaks naturally without structured data
const cardTemplates = [
  {
    id: 'sales-1',
    icon: '💼',
    agent: 'Sales Agent',
    source: 'via HubSpot',
    time: 'just now',
    message: 'Hey! TechCorp just asked for 35% off on their enterprise deal. It\'s a Fortune 500 company worth $127K/year with high growth potential. Should I approve this discount?'
  },
  {
    id: 'support-1',
    icon: '🎧',
    agent: 'Support Agent',
    source: 'via Zendesk',
    time: '2m ago',
    message: 'Got a tricky one. A customer wants a refund for $899 but they\'re outside our 30-day window. Thing is, they\'ve been with us 3 years and spent over $12K. I\'m leaning towards making an exception—what do you think?'
  },
  {
    id: 'email-1',
    icon: '✉️',
    agent: 'Email Agent',
    source: 'via Gmail',
    time: '5m ago',
    message: 'I drafted an apology email to GlobalBank\'s VP about last week\'s outage. Included a 20% service credit as a goodwill gesture. Ready to send it?'
  },
  {
    id: 'ops-1',
    icon: '⚙️',
    agent: 'Ops Agent',
    source: 'via Slack',
    time: '8m ago',
    message: 'CloudFirst ($45K ARR) has 3 unresolved tickets and I\'m picking up negative sentiment. Looks like a churn risk. Should I loop in the exec team now?'
  },
  {
    id: 'data-1',
    icon: '📊',
    agent: 'Data Agent',
    source: 'via Airtable',
    time: '12m ago',
    message: 'Found what looks like duplicate records for john@acme.com—87% confidence they\'re the same person. Both are active with the same company domain. Want me to merge them?'
  }
]

const visibleCards = computed(() => cards.value.slice(0, 3))

const getStackStyle = (index) => {
  const offset = index * 8
  const scale = 1 - (index * 0.03)
  return {
    transform: `translateY(${offset}px) scale(${scale})`,
    zIndex: 10 - index,
    opacity: index > 1 ? 0.7 : 1
  }
}

const getSwipeStyle = (cardId) => {
  if (!swipingCards.value[cardId]) return {}
  const direction = swipeDirections.value[cardId]
  const x = direction === 'right' ? 400 : direction === 'left' ? -400 : 0
  const rotate = direction === 'right' ? 10 : direction === 'left' ? -10 : 0
  return {
    transform: `translateX(${x}px) rotate(${rotate}deg)`,
    opacity: 0,
    transition: 'all 0.35s ease-out'
  }
}

const handleAction = (card, action) => {
  const direction = action === 'reject' ? 'left' : 'right'
  
  swipeDirections.value[card.id] = direction
  swipingCards.value[card.id] = true
  
  const tid = setTimeout(() => {
    const index = cards.value.findIndex(c => c.id === card.id)
    if (index > -1) {
      cards.value.splice(index, 1)
    }
    completedCount.value++
    delete swipingCards.value[card.id]
    delete swipeDirections.value[card.id]
  }, 350)
  timeoutIds.push(tid)
}

const initDemo = () => {
  // Shuffle and add cards with stagger
  const shuffled = [...cardTemplates].sort(() => Math.random() - 0.5)
  
  shuffled.forEach((template, i) => {
    const tid = setTimeout(() => {
      cards.value.push({ ...template })
    }, i * 150)
    timeoutIds.push(tid)
  })
}

const handleReset = () => {
  // Clear all pending timeouts
  timeoutIds.forEach(id => clearTimeout(id))
  timeoutIds = []
  
  // Reset all state synchronously
  cards.value = []
  completedCount.value = 0
  swipingCards.value = {}
  swipeDirections.value = {}
  
  // Use nextTick to ensure DOM updates, then reinitialize
  setTimeout(() => {
    initDemo()
  }, 50)
}

onMounted(() => {
  initDemo()
})

onUnmounted(() => {
  timeoutIds.forEach(id => clearTimeout(id))
})
</script>

<style scoped>
/* Card animations */
.card-enter-active {
  animation: card-in 0.35s ease-out;
}

.card-leave-active {
  position: absolute;
}

.card-move {
  transition: all 0.35s ease;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
