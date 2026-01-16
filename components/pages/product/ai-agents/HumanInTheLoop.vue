<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[480px] rounded-2xl overflow-hidden flex flex-col bg-gray-50"
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
            @click="resetDemo"
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
            @click="resetDemo"
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

              <!-- Card Content -->
              <div class="px-4 py-4">
                <p class="text-sm text-gray-700 leading-relaxed mb-4">{{ card.message }}</p>

                <!-- Context/Details -->
                <div v-if="card.context" class="bg-gray-50 rounded-lg px-3 py-2.5 mb-4">
                  <p class="text-xs text-gray-600">{{ card.context }}</p>
                </div>

                <!-- Input Field -->
                <div class="mb-3">
                  <input 
                    v-model="inputValues[card.id]"
                    type="text"
                    :placeholder="card.inputPlaceholder || 'Add a note (optional)...'"
                    class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-all"
                    :disabled="index !== 0"
                    @keyup.enter="handleAction(card, 'input')"
                  />
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-2">
                  <button 
                    @click="handleAction(card, 'reject')"
                    :disabled="index !== 0"
                    class="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg transition-colors"
                  >
                    {{ card.rejectLabel || 'Reject' }}
                  </button>
                  <button 
                    v-if="inputValues[card.id]"
                    @click="handleAction(card, 'input')"
                    :disabled="index !== 0"
                    class="flex-1 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg transition-colors"
                  >
                    Send
                  </button>
                  <button 
                    v-else
                    @click="handleAction(card, 'approve')"
                    :disabled="index !== 0"
                    class="flex-1 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 rounded-lg transition-colors"
                  >
                    {{ card.approveLabel || 'Approve' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const cards = ref([])
const completedCount = ref(0)
const inputValues = ref({})
const swipingCards = ref({})
const swipeDirections = ref({})

let timeoutIds = []

const cardTemplates = [
  {
    id: 'sales-1',
    icon: '💼',
    agent: 'Sales Agent',
    source: 'via HubSpot',
    time: 'just now',
    message: 'TechCorp wants custom enterprise pricing at 35% off. Should I proceed with this discount level?',
    context: 'Deal value: $127,500/yr • Fortune 500 company • High growth potential',
    inputPlaceholder: 'Add terms or conditions...',
    approveLabel: 'Approve',
    rejectLabel: 'Decline'
  },
  {
    id: 'support-1',
    icon: '🎧',
    agent: 'Support Agent',
    source: 'via Zendesk',
    time: '2m ago',
    message: 'Customer is asking for a refund outside our 30-day policy. They\'ve been with us 3 years.',
    context: 'Refund amount: $899 • Customer LTV: $12,000 • Zero previous returns',
    inputPlaceholder: 'Add a note for the customer...',
    approveLabel: 'Approve',
    rejectLabel: 'Deny'
  },
  {
    id: 'email-1',
    icon: '✉️',
    agent: 'Email Agent',
    source: 'via Gmail',
    time: '5m ago',
    message: 'I\'ve drafted an apology to GlobalBank\'s VP about last week\'s outage. Ready to send?',
    context: 'Includes 20% service credit • High-profile contact • Sensitive situation',
    inputPlaceholder: 'Edit the message...',
    approveLabel: 'Send',
    rejectLabel: 'Hold'
  },
  {
    id: 'ops-1',
    icon: '⚙️',
    agent: 'Ops Agent',
    source: 'via Slack',
    time: '8m ago',
    message: 'CloudFirst ($45K ARR) is showing churn signals. Should I escalate to the exec team?',
    context: '3 unresolved tickets • Negative sentiment detected • At-risk account',
    inputPlaceholder: 'Add context for the exec...',
    approveLabel: 'Escalate',
    rejectLabel: 'I\'ll handle'
  },
  {
    id: 'data-1',
    icon: '📊',
    agent: 'Data Agent',
    source: 'via Airtable',
    time: '12m ago',
    message: 'Found potential duplicate records for john@acme.com. Should I merge them?',
    context: '87% confidence match • Both records active • Same company domain',
    inputPlaceholder: 'Add merge notes...',
    approveLabel: 'Merge',
    rejectLabel: 'Keep separate'
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
  // Determine swipe direction
  let direction = 'right'
  if (action === 'reject') direction = 'left'
  if (action === 'input') direction = 'up'
  
  swipeDirections.value[card.id] = direction === 'up' ? 'right' : direction
  swipingCards.value[card.id] = true
  
  const tid = setTimeout(() => {
    const index = cards.value.findIndex(c => c.id === card.id)
    if (index > -1) {
      cards.value.splice(index, 1)
    }
    completedCount.value++
    delete swipingCards.value[card.id]
    delete swipeDirections.value[card.id]
    delete inputValues.value[card.id]
  }, 350)
  timeoutIds.push(tid)
}

const resetDemo = () => {
  timeoutIds.forEach(id => clearTimeout(id))
  timeoutIds = []
  completedCount.value = 0
  inputValues.value = {}
  swipingCards.value = {}
  swipeDirections.value = {}
  
  // Shuffle and add cards with stagger
  const shuffled = [...cardTemplates].sort(() => Math.random() - 0.5)
  cards.value = []
  
  shuffled.forEach((template, i) => {
    const tid = setTimeout(() => {
      cards.value.push({ ...template })
    }, i * 150)
    timeoutIds.push(tid)
  })
}

onMounted(() => {
  resetDemo()
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
