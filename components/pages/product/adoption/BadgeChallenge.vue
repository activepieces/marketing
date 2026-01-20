<template>
  <div
    class="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117]"
  >
    <!-- Subtle grid pattern -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><rect fill=%22white%22 width=%221%22 height=%221%22/></svg>'); background-size: 40px 40px;"></div>
    
    <!-- Ambient glow -->
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px]"></div>
    <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>

    <!-- Employee Cards scattered -->
    <div class="relative h-full p-4">
      
      <!-- Other employees' cards -->
      <div 
        v-for="emp in otherEmployees" 
        :key="emp.id"
        class="absolute transition-all duration-500"
        :style="emp.style"
      >
        <div 
          class="w-44 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-3 hover:bg-white/[0.08] transition-all hover:scale-105 cursor-default"
        >
          <!-- Header -->
          <div class="flex items-center gap-2 mb-3">
            <div 
              class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
              :class="emp.avatarBg"
            >
              {{ emp.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-white text-sm font-medium truncate">{{ emp.name }}</div>
              <div class="text-gray-500 text-[10px]">{{ emp.dept }}</div>
            </div>
          </div>
          
          <!-- Badges -->
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="badge in emp.badges" 
              :key="badge"
              class="text-base"
              :title="getBadgeName(badge)"
            >
              {{ badge }}
            </span>
            <span v-if="emp.moreBadges" class="text-[10px] text-gray-500 self-center">+{{ emp.moreBadges }}</span>
          </div>
        </div>
      </div>

      <!-- MY CARD - Interactive -->
      <div 
        class="absolute transition-all duration-300"
        :style="myCardStyle"
      >
        <div 
          class="w-52 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm border-2 border-violet-500/40 rounded-2xl p-4 shadow-xl shadow-violet-500/10 cursor-pointer hover:border-violet-400/60 transition-all"
          :class="{ 'scale-105': showActions }"
          @click="toggleActions"
        >
          <!-- Header -->
          <div class="flex items-center gap-3 mb-3">
            <div class="relative">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold text-white">
                ME
              </div>
              <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[9px] font-bold text-black border-2 border-[#161b22]">
                {{ level }}
          </div>
        </div>
            <div class="flex-1">
              <div class="text-white font-semibold">You</div>
              <div class="text-violet-300/70 text-[10px]">{{ myBadges.length }} badges earned</div>
            </div>
            <div class="text-lg" :class="showActions ? 'rotate-180' : ''" style="transition: transform 0.2s;">
              ▾
      </div>
          </div>
          
          <!-- My Badges -->
          <div class="flex flex-wrap gap-1.5 mb-3">
            <span 
              v-for="badge in myBadges" 
              :key="badge.id"
              class="text-lg transition-transform"
              :class="{ 'animate-bounce-once': badge.justEarned }"
              :title="badge.name"
            >
              {{ badge.emoji }}
            </span>
            <span 
              v-for="i in (8 - myBadges.length)" 
              :key="'empty-'+i"
              class="w-6 h-6 rounded-full bg-white/5 border border-dashed border-white/10"
            ></span>
          </div>

          <!-- Click hint -->
          <div class="text-center text-[10px] text-violet-300/50" v-if="!showActions">
            Click to earn badges
        </div>
      </div>

        <!-- Actions Panel -->
        <Transition name="actions">
          <div 
            v-if="showActions"
            class="absolute top-full left-0 right-0 mt-2 bg-[#1a1f2e] border border-white/10 rounded-xl p-2 shadow-2xl z-10"
          >
            <div class="text-[10px] text-gray-500 uppercase tracking-wider px-2 mb-2">Take an action</div>
            <button 
              v-for="action in availableActions" 
              :key="action.id"
              @click.stop="performAction(action)"
              :disabled="isPerforming"
              class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all hover:bg-white/5 disabled:opacity-50"
              :class="{ 'opacity-50': action.used }"
            >
              <span class="text-lg">{{ action.icon }}</span>
              <span class="text-sm text-white">{{ action.label }}</span>
              <span class="ml-auto text-[10px] text-gray-500">{{ action.successRate }}% success</span>
            </button>
          </div>
        </Transition>
      </div>

      <!-- Action Result Toast -->
      <Transition name="toast">
        <div 
          v-if="showToast"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div 
            class="px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[200px]"
            :class="toastSuccess ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-red-500/20 border border-red-500/40'"
          >
            <span class="text-2xl">{{ toastSuccess ? toastBadge?.emoji || '✅' : '❌' }}</span>
            <div>
              <div class="text-white text-sm font-medium">{{ toastMessage }}</div>
              <div v-if="toastSuccess && toastBadge" class="text-emerald-400 text-xs">+{{ toastBadge.name }} badge!</div>
            </div>
          </div>
              </div>
            </Transition>

      <!-- Badge Unlock Celebration -->
    <Transition name="celebration">
      <div 
        v-if="showCelebration"
          class="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
        >
          <!-- Confetti -->
          <span 
            v-for="i in 20" 
            :key="'c-'+i"
            class="absolute confetti"
            :style="{
              left: (20 + Math.random() * 60) + '%',
              animationDelay: Math.random() * 0.3 + 's',
              '--drift': (Math.random() - 0.5) * 80 + 'px'
            }"
          >
            {{ ['✨', '🎉', '⭐', '💫'][Math.floor(Math.random() * 4)] }}
          </span>
          
          <!-- Badge popup -->
          <div class="bg-black/80 backdrop-blur-sm rounded-2xl p-6 text-center celebration-pop">
            <div class="text-5xl mb-2">{{ celebrationBadge?.emoji }}</div>
            <div class="text-violet-300 text-xs uppercase tracking-wider mb-1">Badge Unlocked!</div>
            <div class="text-white font-bold text-lg">{{ celebrationBadge?.name }}</div>
          </div>
        </div>
      </Transition>
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showActions = ref(false)
const isPerforming = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastSuccess = ref(false)
const toastBadge = ref(null)
const showCelebration = ref(false)
const celebrationBadge = ref(null)
const level = ref(3)

// Other employees with their badges
const otherEmployees = ref([
  { 
    id: 1, 
    name: 'Alex Chen', 
    initials: 'AC', 
    dept: 'Engineering',
    avatarBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    badges: ['🚀', '⚡', '🧠', '🔌', '⏰'],
    moreBadges: 3,
    style: { top: '8%', left: '5%', transform: 'rotate(-2deg)' }
  },
  { 
    id: 2, 
    name: 'Maria Santos', 
    initials: 'MS', 
    dept: 'Sales',
    avatarBg: 'bg-gradient-to-br from-pink-500 to-rose-500',
    badges: ['🚀', '🤝', '📤'],
    moreBadges: 0,
    style: { top: '4%', right: '8%', transform: 'rotate(1deg)' }
  },
  { 
    id: 3, 
    name: 'James Wilson', 
    initials: 'JW', 
    dept: 'Marketing',
    avatarBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
    badges: ['🚀', '⚡', '🤝', '🧠'],
    moreBadges: 1,
    style: { bottom: '15%', left: '3%', transform: 'rotate(1.5deg)' }
  },
  { 
    id: 4, 
    name: 'Sarah Kim', 
    initials: 'SK', 
    dept: 'Operations',
    avatarBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    badges: ['🚀', '⏰', '📊'],
    moreBadges: 0,
    style: { bottom: '8%', right: '5%', transform: 'rotate(-1deg)' }
  },
])

const myCardStyle = computed(() => ({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: showActions.value ? 30 : 20
}))

// Badge definitions
const badgeDefinitions = {
  'first-flow': { emoji: '🚀', name: 'First Flow' },
  'helper': { emoji: '🤝', name: 'Team Helper' },
  'ai-user': { emoji: '🧠', name: 'AI Explorer' },
  'publisher': { emoji: '📤', name: 'Publisher' },
  'runner': { emoji: '⚡', name: 'Flow Runner' },
  'time-saver': { emoji: '⏰', name: 'Time Saver' },
  'data-pro': { emoji: '📊', name: 'Data Pro' },
  'integrator': { emoji: '🔌', name: 'Integrator' },
}

const myBadges = ref([
  { id: 'first-flow', ...badgeDefinitions['first-flow'], justEarned: false },
])

const earnedBadgeIds = computed(() => myBadges.value.map(b => b.id))

const actions = [
  { id: 'publish', icon: '📤', label: 'Publish a flow', successRate: 90, badge: 'publisher' },
  { id: 'help', icon: '🤝', label: 'Help a teammate', successRate: 85, badge: 'helper' },
  { id: 'run', icon: '⚡', label: 'Run automation', successRate: 95, badge: 'runner' },
  { id: 'ai', icon: '🧠', label: 'Use AI agent', successRate: 80, badge: 'ai-user' },
  { id: 'connect', icon: '🔌', label: 'Connect an app', successRate: 88, badge: 'integrator' },
  { id: 'analyze', icon: '📊', label: 'Analyze data', successRate: 75, badge: 'data-pro' },
]

const availableActions = computed(() => {
  // Show 4 random actions, mark ones that would give already-earned badges
  return actions
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map(a => ({
      ...a,
      used: earnedBadgeIds.value.includes(a.badge)
    }))
})

function getBadgeName(emoji) {
  const badge = Object.values(badgeDefinitions).find(b => b.emoji === emoji)
  return badge?.name || 'Badge'
}

function toggleActions() {
  showActions.value = !showActions.value
}

function performAction(action) {
  if (isPerforming.value) return
  
  isPerforming.value = true
  showActions.value = false
  
  // Random success based on rate
  const success = Math.random() * 100 < action.successRate
  
  setTimeout(() => {
    toastSuccess.value = success
    
    if (success) {
      const badgeDef = badgeDefinitions[action.badge]
      const alreadyHas = earnedBadgeIds.value.includes(action.badge)
      
      if (!alreadyHas && badgeDef) {
        // Earn new badge!
        toastMessage.value = `${action.label} succeeded!`
        toastBadge.value = badgeDef
        
        // Add badge
        const newBadge = { id: action.badge, ...badgeDef, justEarned: true }
        myBadges.value.push(newBadge)
        
        // Level up every 2 badges
        if (myBadges.value.length % 2 === 0) {
          level.value++
        }
        
        // Show celebration
    setTimeout(() => {
          celebrationBadge.value = badgeDef
      showCelebration.value = true
          setTimeout(() => {
            showCelebration.value = false
            newBadge.justEarned = false
          }, 1500)
        }, 800)
      } else {
        toastMessage.value = `${action.label} succeeded!`
        toastBadge.value = null
      }
    } else {
      toastMessage.value = `${action.label} failed. Try again!`
      toastBadge.value = null
    }
    
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
      isPerforming.value = false
    }, 2000)
  }, 600)
}
</script>

<style scoped>
/* Actions panel */
.actions-enter-active, .actions-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.actions-enter-from, .actions-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

/* Toast */
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

/* Celebration */
.celebration-enter-active, .celebration-leave-active {
  transition: all 0.3s ease;
}
.celebration-enter-from, .celebration-leave-to {
  opacity: 0;
}

.celebration-pop {
  animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Confetti */
.confetti {
  position: absolute;
  top: 30%;
  font-size: 20px;
  animation: confetti-fall 1.5s ease-out forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(200px) translateX(var(--drift)) rotate(360deg);
    opacity: 0;
  }
}

/* Badge bounce */
.animate-bounce-once {
  animation: bounce-once 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounce-once {
  0% { transform: scale(0); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
</style>
