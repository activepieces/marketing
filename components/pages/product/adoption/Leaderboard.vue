<template>
  <div 
    class="relative w-full max-w-lg mx-auto h-[420px] rounded-3xl overflow-hidden transition-all duration-500"
    :class="isEnabled ? 'bg-gradient-to-br from-slate-50 via-white to-violet-50/50' : 'bg-gray-50'"
  >
    <!-- Disabled state: Big toggle + placeholder -->
    <div 
      class="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500"
      :class="isEnabled ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'"
    >
      <!-- Animated background glow -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-2xl animate-pulse-glow-delayed"></div>
      </div>

      <!-- Floating particles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="particle particle-1">✨</div>
        <div class="particle particle-2">⭐</div>
        <div class="particle particle-3">✨</div>
        <div class="particle particle-4">🌟</div>
        <div class="particle particle-5">✨</div>
      </div>

      <!-- Placeholder leaderboard (blurred/faded) -->
      <div class="absolute inset-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 overflow-hidden">
        <div class="p-4 space-y-3 opacity-30">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gray-300"></div>
            <div class="h-3 bg-gray-300 rounded w-24"></div>
            <div class="ml-auto h-3 bg-gray-300 rounded w-12"></div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gray-300"></div>
            <div class="h-3 bg-gray-300 rounded w-20"></div>
            <div class="ml-auto h-3 bg-gray-300 rounded w-10"></div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gray-300"></div>
            <div class="h-3 bg-gray-300 rounded w-28"></div>
            <div class="ml-auto h-3 bg-gray-300 rounded w-14"></div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gray-300"></div>
            <div class="h-3 bg-gray-300 rounded w-16"></div>
            <div class="ml-auto h-3 bg-gray-300 rounded w-10"></div>
          </div>
        </div>
      </div>

      <!-- Big toggle prompt -->
      <div class="relative z-10 text-center">
        <div class="text-5xl mb-3 animate-bounce-subtle trophy-glow">🏆</div>
        <p class="text-gray-700 font-semibold text-lg mb-6">Enable Leaderboard</p>
        <button
          @click="isEnabled = true"
          class="group relative w-24 h-12 rounded-full bg-gradient-to-r from-violet-200 to-purple-200 transition-all duration-300 hover:from-violet-300 hover:to-purple-300 shadow-lg hover:shadow-xl hover:scale-105 toggle-pulse"
        >
          <div 
            class="absolute top-1.5 left-1.5 w-9 h-9 rounded-full bg-white shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-300/50 flex items-center justify-center knob-eager"
          >
            <span class="text-lg transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">⚡</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Enabled state: Active leaderboard -->
    <div 
      class="absolute inset-0 flex flex-col transition-all duration-500"
      :class="isEnabled ? 'opacity-100' : 'opacity-0 pointer-events-none scale-105'"
    >
      <!-- Header with small toggle -->
      <div class="flex items-center justify-between px-5 py-4">
        <div class="flex items-center gap-2">
          <span class="text-xl">🏆</span>
          <span class="font-semibold text-gray-800">Leaderboard</span>
          <span 
            class="relative px-2 py-0.5 text-[10px] font-semibold rounded-full overflow-hidden bg-gray-100"
          >
            <span 
              :key="progressKey"
              class="absolute top-0 left-0 bottom-0 rounded-l-full bg-violet-200 week-progress"
              :class="weekComplete ? 'w-full rounded-r-full' : ''"
            ></span>
            <span class="relative z-10 text-gray-700">This Week</span>
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="restartLeaderboard"
            class="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:rotate-180"
            title="Restart"
          >
            <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            @click="isEnabled = false"
            class="relative w-11 h-6 rounded-full bg-violet-400 transition-all duration-300 hover:bg-violet-500"
          >
            <div 
              class="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300"
            ></div>
          </button>
        </div>
      </div>

      <!-- Leaderboard list -->
      <div class="flex-1 px-5 pb-4 overflow-hidden relative">
        <!-- Bottom fade gradient (fades leaderboard rows, avatars show above) -->
        <div v-if="!weekComplete" class="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-30"></div>
        <!-- Celebration overlay (during race) -->
        <Transition name="celebration">
          <div v-if="celebration && !weekComplete" class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div class="text-6xl animate-bounce-celebration">{{ celebration }}</div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="confetti confetti-1">🎊</div>
              <div class="confetti confetti-2">✨</div>
              <div class="confetti confetti-3">🎉</div>
              <div class="confetti confetti-4">⭐</div>
              <div class="confetti confetti-5">🎊</div>
            </div>
          </div>
        </Transition>

        <div v-if="!weekComplete" class="space-y-2">
          <TransitionGroup name="list">
            <div 
              v-for="(person, index) in leaderboardData" 
              :key="person.name"
              class="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-500 hover:bg-white/60"
            >
              <!-- Rank -->
              <div class="w-7 h-7 flex items-center justify-center text-lg">
                <span v-if="index === 0">🥇</span>
                <span v-else-if="index === 1">🥈</span>
                <span v-else-if="index === 2">🥉</span>
                <span v-else class="text-xs font-medium text-gray-400">{{ index + 1 }}</span>
              </div>

              <!-- Avatar -->
              <div 
                class="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                :style="{ backgroundColor: person.color }"
              >
                {{ person.initials }}
              </div>

              <!-- Name & Department -->
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-800 text-sm truncate">{{ person.name }}</p>
                <p class="text-xs text-gray-400">{{ person.dept }}</p>
              </div>

              <!-- Stats -->
              <div class="text-right">
                <p 
                  class="font-bold text-gray-800 text-sm tabular-nums"
                  :class="updatedNumbers[person.name + '-hours'] ? 'number-flip' : ''"
                >
                  {{ formatHours(person.hours) }}
                </p>
                <p class="text-[10px] text-gray-400">saved</p>
              </div>

              <!-- Flows -->
              <div class="text-right min-w-[40px]">
                <p 
                  class="font-bold text-gray-800 text-sm tabular-nums"
                  :class="updatedNumbers[person.name + '-flows'] ? 'number-flip' : ''"
                >
                  {{ person.flows }}
                </p>
                <p class="text-[10px] text-gray-400">flows</p>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- WEEK COMPLETE: Clean Results Screen -->
        <Transition name="results">
          <div v-if="weekComplete" class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-violet-50 to-purple-50/50 rounded-xl overflow-hidden">
            <!-- Floating names background -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                v-for="floatName in floatingNames"
                :key="floatName.id"
                class="absolute font-bold text-violet-400 whitespace-nowrap"
                :class="floatName.visible ? 'floating-name-pop' : 'opacity-0 scale-0'"
                :style="{
                  left: floatName.x + '%',
                  top: floatName.y + '%',
                  fontSize: floatName.size + 'px',
                  '--rotation': floatName.rotation + 'deg',
                  '--final-opacity': floatName.opacity,
                }"
              >
                {{ floatName.text }}
              </div>
            </div>
            <!-- Podium: Top 3 -->
            <div class="flex items-end justify-center gap-3">
              <!-- 2nd place -->
              <div class="text-center podium-item podium-2">
                <div 
                  class="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-semibold shadow-md"
                  :style="{ backgroundColor: leaderboardData[1]?.color }"
                >
                  {{ customWinnerInitials || leaderboardData[1]?.initials }}
                </div>
                <p class="font-medium text-gray-800 text-sm max-w-[70px] truncate">{{ customWinnerName || leaderboardData[1]?.name?.split(' ')[0] }}</p>
                <p class="text-xs text-gray-400 mb-2">{{ formatHours(leaderboardData[1]?.hours) }}</p>
                <div class="w-16 h-16 bg-gray-200 rounded-t-lg flex items-center justify-center text-2xl">🥈</div>
              </div>

              <!-- 1st place - clickable with wink -->
              <div 
                class="text-center podium-item podium-1 relative group cursor-pointer"
                @click="!showNameInput && (showNameInput = true)"
              >
                <div class="text-2xl mb-1">👑</div>
                <div class="relative w-[72px] h-[72px] mx-auto mb-2">
                  <!-- Avatar -->
                  <div 
                    class="w-full h-full rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg ring-2 ring-violet-400 transition-all duration-200 group-hover:opacity-20"
                    :style="{ backgroundColor: leaderboardData[0]?.color }"
                  >
                    {{ customWinnerInitials || leaderboardData[0]?.initials }}
                  </div>
                  <!-- Wink overlay on hover -->
                  <div 
                    class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <span class="text-3xl">😉</span>
                    <span class="text-[8px] font-bold text-gray-600 tracking-wider">CLICK</span>
                  </div>
                </div>
                <p class="font-bold text-gray-800 max-w-[80px] truncate">{{ customWinnerName || leaderboardData[0]?.name?.split(' ')[0] }}</p>
                <p class="text-xs text-gray-400 mb-2">{{ formatHours(leaderboardData[0]?.hours) }}</p>
                <div class="w-16 h-24 bg-violet-400 rounded-t-lg flex items-center justify-center text-3xl">🏆</div>
              </div>

              <!-- 3rd place -->
              <div class="text-center podium-item podium-3">
                <div 
                  class="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-semibold shadow-md"
                  :style="{ backgroundColor: leaderboardData[2]?.color }"
                >
                  {{ customWinnerInitials || leaderboardData[2]?.initials }}
                </div>
                <p class="font-medium text-gray-800 text-sm max-w-[70px] truncate">{{ customWinnerName || leaderboardData[2]?.name?.split(' ')[0] }}</p>
                <p class="text-xs text-gray-400 mb-2">{{ formatHours(leaderboardData[2]?.hours) }}</p>
                <div class="w-16 h-12 bg-violet-300 rounded-t-lg flex items-center justify-center text-2xl">🥉</div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Centered name input modal -->
    <Transition name="modal">
      <div 
        v-if="showNameInput"
        class="absolute inset-0 flex items-center justify-center z-50"
        @click.self="showNameInput = false; nameInput = ''"
      >
        <div class="bg-white rounded-2xl shadow-2xl p-5 w-[220px]">
          <input 
            ref="nameInputRef"
            v-model="nameInput"
            @keyup.enter="setCustomName"
            type="text"
            placeholder="Enter your name..."
            class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 mb-3 text-center"
          />
          <button 
            @click="setCustomName"
            class="w-full px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            I deserve #1 👑
          </button>
        </div>
      </div>
    </Transition>

    <!-- Working people illustration at bottom -->
    <div 
      class="absolute bottom-0 left-0 right-0 h-28 pointer-events-none overflow-hidden transition-opacity duration-500 z-40"
      :class="isEnabled && !weekComplete ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Main avatars - 3 highlighted workers (closer together) -->
      <div 
        class="absolute w-14 h-14 rounded-full border-2 border-white shadow-lg overflow-hidden"
        style="left: 25%; bottom: 8%; transform: rotate(-4deg);"
      >
        <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png" alt="Worker 1" class="w-full h-full object-cover" />
      </div>
      
      <div 
        class="absolute w-16 h-16 rounded-full border-2 border-white shadow-lg overflow-hidden"
        style="left: 50%; bottom: 10%; transform: translateX(-50%) rotate(2deg);"
      >
        <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_2.png" alt="Worker 2" class="w-full h-full object-cover" />
      </div>
      
      <div 
        class="absolute w-14 h-14 rounded-full border-2 border-white shadow-lg overflow-hidden"
        style="right: 25%; bottom: 6%; transform: rotate(5deg);"
      >
        <img src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png" alt="Worker 3" class="w-full h-full object-cover" />
      </div>

      <!-- Background decorative circles (around avatars) -->
      <div class="absolute w-4 h-4 rounded-full bg-violet-200/60" style="left: 18%; bottom: 25%;"></div>
      <div class="absolute w-5 h-5 rounded-full bg-purple-200/50" style="left: 38%; bottom: 35%;"></div>
      <div class="absolute w-3 h-3 rounded-full bg-pink-200/60" style="left: 58%; bottom: 30%;"></div>
      <div class="absolute w-4 h-4 rounded-full bg-indigo-200/50" style="left: 75%; bottom: 22%;"></div>
      <div class="absolute w-3 h-3 rounded-full bg-fuchsia-200/60" style="left: 32%; bottom: 18%;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const isEnabled = ref(false)
const celebration = ref(null)
const updatedNumbers = ref({})
const weekComplete = ref(false)
const progressKey = ref(0)

// Custom winner name feature
const showNameInput = ref(false)
const nameInputRef = ref(null)
const nameInput = ref('')
const customWinnerName = ref('')
const customWinnerInitials = ref('')
const floatingNames = ref([])

const setCustomName = () => {
  if (nameInput.value.trim()) {
    const name = nameInput.value.trim()
    customWinnerName.value = name
    
    // Generate initials from name
    const parts = name.split(' ')
    let initials
    if (parts.length >= 2) {
      initials = (parts[0][0] + parts[1][0]).toUpperCase()
    } else {
      initials = name.substring(0, 2).toUpperCase()
    }
    customWinnerInitials.value = initials
    
    // Change ALL players' names to the custom name
    leaderboardData.value.forEach((person) => {
      person.name = name
      person.initials = initials
    })
    
    // Generate floating names for background
    generateFloatingNames(name)
  }
  showNameInput.value = false
  nameInput.value = ''
  triggerCelebration('🎉')
}

const generateFloatingNames = (name) => {
  const cheers = [
    `${name} is king 👑`,
    `${name} rules!`,
    `Go ${name}! 🚀`,
    `${name} #1`,
    `${name} 🔥`,
    `MVP: ${name}`,
    `${name} wins!`,
    `Legend ${name}`,
    `${name} 💪`,
    `${name} forever`,
    `All hail ${name}`,
    `${name} supremacy`,
    `${name} ⭐`,
    `Bow to ${name}`,
    `${name} the GOAT 🐐`,
    `${name}!!!`,
    `Team ${name}`,
    `${name} rocks`,
    `${name} FTW`,
    `Chef ${name} 👨‍🍳`,
    `${name} mode 😎`,
    `${name} vibes ✨`,
    `${name} energy`,
    `King ${name}`,
    `Queen ${name} 👸`,
  ]
  
  const names = []
  
  // Create a grid-based layout with jitter for better distribution
  const cols = 5
  const rows = 5
  const cellWidth = 80 / cols  // Leave margins
  const cellHeight = 80 / rows
  
  let index = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Base position from grid + random jitter within cell
      const baseX = 10 + col * cellWidth
      const baseY = 10 + row * cellHeight
      const jitterX = (Math.random() - 0.5) * cellWidth * 0.6
      const jitterY = (Math.random() - 0.5) * cellHeight * 0.6
      
      names.push({
        id: index,
        text: cheers[index % cheers.length],
        x: baseX + jitterX,
        y: baseY + jitterY,
        size: Math.random() * 12 + 10, // 10-22px
        rotation: Math.random() * 30 - 15, // Less extreme rotation
        opacity: Math.random() * 0.2 + 0.12,
        visible: false,
      })
      index++
    }
  }
  
  // Shuffle the array for random pop-in order
  names.sort(() => Math.random() - 0.5)
  
  floatingNames.value = names
  
  // Stagger the visibility of each name
  names.forEach((item, idx) => {
    setTimeout(() => {
      const found = floatingNames.value.find(n => n.id === item.id)
      if (found) found.visible = true
    }, idx * 50)
  })
}

// Initial state for reset
const getInitialData = () => [
  { name: 'Sarah Chen', initials: 'SC', dept: 'Marketing', hours: 3, flows: 2, color: '#f472b6', momentum: 1 },
  { name: 'Alex Kumar', initials: 'AK', dept: 'Engineering', hours: 2, flows: 1, color: '#60a5fa', momentum: 1 },
  { name: 'Emma Wilson', initials: 'EW', dept: 'Sales', hours: 2, flows: 1, color: '#34d399', momentum: 1 },
  { name: 'James Park', initials: 'JP', dept: 'Operations', hours: 1, flows: 1, color: '#a78bfa', momentum: 1 },
  { name: 'Maya Roberts', initials: 'MR', dept: 'HR', hours: 1, flows: 0, color: '#fbbf24', momentum: 1 },
]

// Leaderboard data with momentum
const leaderboardData = ref(getInitialData())

const resetLeaderboard = () => {
  leaderboardData.value = getInitialData()
  updatedNumbers.value = {}
  celebration.value = null
  weekComplete.value = false
  progressKey.value++
  customWinnerName.value = ''
  customWinnerInitials.value = ''
  showNameInput.value = false
  nameInput.value = ''
  floatingNames.value = []
}

const restartLeaderboard = () => {
  stopLiveUpdates()
  resetLeaderboard()
  startLiveUpdates()
}

// Real-time updates with momentum system
let mainLoop = null
let weekTimeout = null

const triggerCelebration = (emoji) => {
  celebration.value = emoji
  setTimeout(() => {
    celebration.value = null
  }, 1500)
}

const updatePerson = (person, field, amount = 1) => {
  if (!isEnabled.value) return
  
  const oldFirst = leaderboardData.value[0].name
  const oldRanks = leaderboardData.value.map(p => p.name)
  
  // Increment the stat
  person[field] += amount
  
  // Trigger flip animation for this specific field
  updatedNumbers.value = { 
    ...updatedNumbers.value, 
    [person.name + '-' + field]: true 
  }
  
  setTimeout(() => {
    const newUpdates = { ...updatedNumbers.value }
    delete newUpdates[person.name + '-' + field]
    updatedNumbers.value = newUpdates
  }, 400)
  
  // Re-sort the data
  leaderboardData.value.sort((a, b) => b.hours - a.hours)
  const newFirst = leaderboardData.value[0].name
  
  // Celebrate if leader changed!
  if (oldFirst !== newFirst) {
    triggerCelebration('👑')
  }
}

const shuffleMomentum = () => {
  // Randomly boost/reduce momentum to create drama
  leaderboardData.value.forEach(person => {
    const roll = Math.random()
    if (roll > 0.85) {
      // Hot streak! Boost momentum
      person.momentum = Math.min(person.momentum + 0.5, 3)
    } else if (roll < 0.15) {
      // Cool down
      person.momentum = Math.max(person.momentum - 0.3, 0.5)
    }
  })
  
  // Every so often, give an underdog a big boost
  if (Math.random() > 0.7) {
    const sortedByHours = [...leaderboardData.value].sort((a, b) => a.hours - b.hours)
    const underdog = sortedByHours[Math.floor(Math.random() * 2)] // Pick from bottom 2
    underdog.momentum = 2.5
  }
}

const gameLoop = () => {
  if (!isEnabled.value) return
  
  // Update 1-3 random people based on their momentum
  const numUpdates = Math.floor(Math.random() * 3) + 1
  
  for (let i = 0; i < numUpdates; i++) {
    // Weight selection by momentum
    const totalMomentum = leaderboardData.value.reduce((sum, p) => sum + p.momentum, 0)
    let pick = Math.random() * totalMomentum
    let selected = null
    
    for (const person of leaderboardData.value) {
      pick -= person.momentum
      if (pick <= 0) {
        selected = person
        break
      }
    }
    
    if (selected) {
      // Hours increase based on momentum
      const hoursGain = Math.random() < selected.momentum / 3 ? 2 : 1
      updatePerson(selected, 'hours', hoursGain)
      
      // Sometimes also add flows
      if (Math.random() > 0.7) {
        setTimeout(() => updatePerson(selected, 'flows', 1), 200)
      }
    }
  }
}

const finishWeek = () => {
  stopLiveUpdates()
  weekComplete.value = true
  triggerCelebration('🏆')
}

const startLiveUpdates = () => {
  if (mainLoop) clearInterval(mainLoop)
  if (weekTimeout) clearTimeout(weekTimeout)
  
  weekComplete.value = false
  
  // Main game loop - tick every 800ms for fast-paced action
  mainLoop = setInterval(() => {
    gameLoop()
    
    // Shuffle momentum periodically
    if (Math.random() > 0.6) {
      shuffleMomentum()
    }
  }, 800)
  
  // Finish the week after 17 seconds
  weekTimeout = setTimeout(() => {
    finishWeek()
  }, 17000)
}

const stopLiveUpdates = () => {
  if (mainLoop) {
    clearInterval(mainLoop)
    mainLoop = null
  }
  if (weekTimeout) {
    clearTimeout(weekTimeout)
    weekTimeout = null
  }
}

onMounted(() => {
  startLiveUpdates()
})

onUnmounted(() => {
  stopLiveUpdates()
})

watch(isEnabled, (val) => {
  if (val) {
    resetLeaderboard()
    startLiveUpdates()
    setTimeout(() => triggerCelebration('🎉'), 300)
  } else {
    stopLiveUpdates()
    resetLeaderboard()
  }
})

// Auto-focus input when modal opens
watch(showNameInput, async (val) => {
  if (val) {
    await nextTick()
    nameInputRef.value?.focus()
  }
})

const formatHours = (h) => h + 'h'
</script>

<style scoped>
/* Pulsing glow background */
.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

.animate-pulse-glow-delayed {
  animation: pulse-glow 3s ease-in-out infinite 1.5s;
}

@keyframes pulse-glow {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
}

/* Trophy glow */
.trophy-glow {
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
  animation: trophy-pulse 2s ease-in-out infinite;
}

@keyframes trophy-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.4));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8));
    transform: scale(1.05);
  }
}

/* Subtle bounce */
.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Toggle pulse */
.toggle-pulse {
  animation: toggle-pulse 2s ease-in-out infinite;
}

@keyframes toggle-pulse {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  }
  50% {
    box-shadow: 0 4px 25px rgba(139, 92, 246, 0.6);
  }
}

/* Eager knob - wants to move right */
.knob-eager {
  animation: knob-nudge 3s ease-in-out infinite;
}

@keyframes knob-nudge {
  0%, 100% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(12px);
  }
  60% {
    transform: translateX(8px);
  }
  70% {
    transform: translateX(10px);
  }
  80% {
    transform: translateX(0);
  }
}

/* Floating particles */
.particle {
  position: absolute;
  font-size: 14px;
  opacity: 0;
  animation: float-particle 4s ease-in-out infinite;
}

.particle-1 {
  left: 20%;
  animation-delay: 0s;
}

.particle-2 {
  left: 70%;
  animation-delay: 0.8s;
}

.particle-3 {
  left: 35%;
  animation-delay: 1.6s;
}

.particle-4 {
  left: 80%;
  animation-delay: 2.4s;
}

.particle-5 {
  left: 50%;
  animation-delay: 3.2s;
}

@keyframes float-particle {
  0% {
    bottom: 20%;
    opacity: 0;
    transform: scale(0.5);
  }
  20% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 1;
  }
  100% {
    bottom: 85%;
    opacity: 0;
    transform: scale(0.5) rotate(20deg);
  }
}

/* List transitions */
.list-move {
  transition: transform 0.5s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Celebration animations */
.celebration-enter-active {
  animation: pop-in 0.3s ease-out;
}

.celebration-leave-active {
  animation: pop-out 0.3s ease-in;
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pop-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

.animate-bounce-celebration {
  animation: bounce-celebration 0.6s ease-out;
}

@keyframes bounce-celebration {
  0% {
    transform: scale(0) rotate(-10deg);
  }
  50% {
    transform: scale(1.3) rotate(5deg);
  }
  70% {
    transform: scale(0.9) rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* Confetti */
.confetti {
  position: absolute;
  font-size: 24px;
  animation: confetti-burst 1s ease-out forwards;
}

.confetti-1 {
  animation-delay: 0s;
  --x: -60px;
  --y: -80px;
}

.confetti-2 {
  animation-delay: 0.1s;
  --x: 70px;
  --y: -60px;
}

.confetti-3 {
  animation-delay: 0.05s;
  --x: -40px;
  --y: -100px;
}

.confetti-4 {
  animation-delay: 0.15s;
  --x: 50px;
  --y: -90px;
}

.confetti-5 {
  animation-delay: 0.08s;
  --x: 0px;
  --y: -110px;
}

@keyframes confetti-burst {
  0% {
    transform: translate(0, 0) scale(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--x), var(--y)) scale(1) rotate(360deg);
    opacity: 0;
  }
}

/* Number flip animation */
.number-flip {
  animation: number-swap 0.4s ease-out;
}

@keyframes number-swap {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  30% {
    transform: translateY(-8px) scale(1.1);
    opacity: 0.5;
  }
  60% {
    transform: translateY(4px) scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Results screen transitions */
.results-enter-active {
  animation: results-in 0.5s ease-out;
}

.results-leave-active {
  animation: results-out 0.3s ease-in;
}

@keyframes results-in {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes results-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Podium animations */
.podium-item {
  animation: podium-rise 0.5s ease-out both;
}

.podium-1 { animation-delay: 0.2s; }
.podium-2 { animation-delay: 0.1s; }
.podium-3 { animation-delay: 0.3s; }

@keyframes podium-rise {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Week progress fill animation */
.week-progress {
  animation: week-fill 17s linear forwards;
}

@keyframes week-fill {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

/* Modal transition */
.modal-enter-active {
  animation: modal-in 0.2s ease-out;
}

.modal-leave-active {
  animation: modal-out 0.15s ease-in;
}

@keyframes modal-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes modal-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.modal-enter-active > div {
  animation: modal-scale-in 0.2s ease-out;
}

.modal-leave-active > div {
  animation: modal-scale-out 0.15s ease-in;
}

@keyframes modal-scale-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes modal-scale-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0;
  }
}

/* Floating names animation */
.floating-name-pop {
  animation: float-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes float-pop-in {
  0% {
    opacity: 0;
    transform: rotate(var(--rotation, 0deg)) scale(0);
  }
  60% {
    opacity: var(--final-opacity, 0.3);
    transform: rotate(var(--rotation, 0deg)) scale(1.3);
  }
  100% {
    opacity: var(--final-opacity, 0.3);
    transform: rotate(var(--rotation, 0deg)) scale(1);
  }
}
</style>

