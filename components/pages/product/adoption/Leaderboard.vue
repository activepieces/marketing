<template>
  <div class="relative w-full h-full">
    <!-- Main container with Safari browser chrome -->
    <div
      class="relative rounded-lg overflow-hidden h-full flex flex-col bg-black/20"
    >
      <!-- Safari Browser Top Bar -->
      <div class="bg-white/10 px-3 py-2 flex-shrink-0">
        <!-- Traffic lights -->
        <div class="flex items-center gap-1.5 mb-2">
          <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <!-- Address bar -->
        <div class="bg-black/10 rounded-md py-1.5 px-2 flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-white/10 flex-shrink-0"></div>
          <div class="h-2.5 flex-1 bg-white/10 rounded"></div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-hidden relative">
        <!-- Disabled state: Big toggle + placeholder -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500"
          :class="
            isEnabled ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'
          "
        >
          <!-- Animated background glow -->
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-glow"
            ></div>
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-600/15 to-violet-600/15 rounded-full blur-2xl animate-pulse-glow-delayed"
            ></div>
          </div>

          <!-- Floating particles with Phosphor icons -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <PhSparkle
              class="particle particle-1 text-violet-400"
              weight="fill"
            />
            <PhStar class="particle particle-2 text-purple-400" weight="fill" />
            <PhSparkle
              class="particle particle-3 text-pink-400"
              weight="fill"
            />
            <PhStar class="particle particle-4 text-violet-300" weight="fill" />
            <PhSparkle
              class="particle particle-5 text-purple-300"
              weight="fill"
            />
          </div>

          <!-- Placeholder leaderboard (blurred/faded) -->
          <div
            class="absolute inset-4 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden"
          >
            <div class="p-4 space-y-3 opacity-40">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white/10"></div>
                <div class="h-3 bg-white/10 rounded w-24"></div>
                <div class="ml-auto h-3 bg-white/10 rounded w-12"></div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white/10"></div>
                <div class="h-3 bg-white/10 rounded w-20"></div>
                <div class="ml-auto h-3 bg-white/10 rounded w-10"></div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white/10"></div>
                <div class="h-3 bg-white/10 rounded w-28"></div>
                <div class="ml-auto h-3 bg-white/10 rounded w-14"></div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white/10"></div>
                <div class="h-3 bg-white/10 rounded w-16"></div>
                <div class="ml-auto h-3 bg-white/10 rounded w-10"></div>
              </div>
            </div>
          </div>

          <!-- Big toggle prompt -->
          <div class="relative z-10 text-center">
            <div class="mb-3 animate-bounce-subtle trophy-glow">
              <PhTrophy
                class="w-14 h-14 text-amber-400 mx-auto"
                weight="fill"
              />
            </div>
            <p class="text-white/80 font-semibold text-lg mb-6">
              Enable Leaderboard
            </p>
            <button
              @click="isEnabled = true"
              class="group relative w-24 h-12 rounded-full bg-gradient-to-r from-violet-500/30 to-purple-500/30 border border-white/20 transition-all duration-300 hover:from-violet-500/50 hover:to-purple-500/50 shadow-lg hover:shadow-xl hover:scale-105 toggle-pulse"
            >
              <div
                class="absolute top-1.5 left-1.5 w-9 h-9 rounded-full bg-white/90 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/50 flex items-center justify-center knob-eager"
              >
                <PhLightning
                  class="w-5 h-5 text-violet-500 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12"
                  weight="fill"
                />
              </div>
            </button>
          </div>
        </div>

        <!-- Enabled state: Active leaderboard -->
        <div
          class="absolute inset-0 flex flex-col transition-all duration-500"
          :class="
            isEnabled
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none scale-105'
          "
        >
          <!-- Header with small toggle -->
          <div class="flex items-center justify-between px-5 py-4">
            <div class="flex items-center gap-2">
              <PhTrophy class="w-5 h-5 text-amber-400" weight="fill" />
              <span class="font-semibold text-white/80">Leaderboard</span>
              <span
                class="relative px-2 py-0.5 text-[10px] font-semibold rounded-full overflow-hidden bg-white/10"
              >
                <span
                  :key="progressKey"
                  class="absolute top-0 left-0 bottom-0 rounded-l-full bg-violet-500/50 week-progress"
                  :class="weekComplete ? 'w-full rounded-r-full' : ''"
                ></span>
                <span class="relative z-10 text-white/60">This Week</span>
              </span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="restartLeaderboard"
                class="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:rotate-180"
                title="Restart"
              >
                <PhArrowCounterClockwise
                  class="w-3.5 h-3.5 text-white/60"
                  weight="bold"
                />
              </button>
              <button
                @click="isEnabled = false"
                class="relative w-11 h-6 rounded-full bg-violet-500/50 border border-white/20 transition-all duration-300 hover:bg-violet-500/70"
              >
                <div
                  class="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white/90 shadow-sm transition-all duration-300"
                ></div>
              </button>
            </div>
          </div>

          <!-- Leaderboard list -->
          <div class="flex-1 px-5 pb-4 overflow-hidden relative">
            <!-- Bottom fade gradient -->
            <div
              v-if="!weekComplete"
              class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none z-30"
            ></div>
            <!-- Celebration overlay (during race) -->
            <Transition name="celebration">
              <div
                v-if="celebration && !weekComplete"
                class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
              >
                <component
                  :is="getCelebrationIcon(celebration)"
                  class="w-16 h-16 animate-bounce-celebration"
                  :class="getCelebrationColor(celebration)"
                  weight="fill"
                />
                <div class="absolute inset-0 flex items-center justify-center">
                  <PhConfetti
                    class="confetti confetti-1 text-pink-400"
                    weight="fill"
                  />
                  <PhSparkle
                    class="confetti confetti-2 text-violet-400"
                    weight="fill"
                  />
                  <PhConfetti
                    class="confetti confetti-3 text-amber-400"
                    weight="fill"
                  />
                  <PhStar
                    class="confetti confetti-4 text-purple-400"
                    weight="fill"
                  />
                  <PhConfetti
                    class="confetti confetti-5 text-pink-400"
                    weight="fill"
                  />
                </div>
              </div>
            </Transition>

            <div v-if="!weekComplete" class="space-y-2">
              <TransitionGroup name="list">
                <div
                  v-for="(person, index) in leaderboardData"
                  :key="person.name"
                  class="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-500 hover:bg-white/10"
                >
                  <!-- Rank -->
                  <div class="w-7 h-7 flex items-center justify-center">
                    <PhMedal
                      v-if="index === 0"
                      class="w-6 h-6 text-amber-400"
                      weight="fill"
                    />
                    <PhMedal
                      v-else-if="index === 1"
                      class="w-6 h-6 text-gray-300"
                      weight="fill"
                    />
                    <PhMedal
                      v-else-if="index === 2"
                      class="w-6 h-6 text-amber-600"
                      weight="fill"
                    />
                    <span v-else class="text-xs font-medium text-white/40">{{
                      index + 1
                    }}</span>
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
                    <p class="font-medium text-white/80 text-sm truncate">
                      {{ person.name }}
                    </p>
                    <p class="text-xs text-white/40">{{ person.dept }}</p>
                  </div>

                  <!-- Stats -->
                  <div class="text-right">
                    <p
                      class="font-bold text-white/80 text-sm tabular-nums"
                      :class="
                        updatedNumbers[person.name + '-hours']
                          ? 'number-flip'
                          : ''
                      "
                    >
                      {{ formatHours(person.hours) }}
                    </p>
                    <p class="text-[10px] text-white/40">saved</p>
                  </div>

                  <!-- Flows -->
                  <div class="text-right min-w-[40px]">
                    <p
                      class="font-bold text-white/80 text-sm tabular-nums"
                      :class="
                        updatedNumbers[person.name + '-flows']
                          ? 'number-flip'
                          : ''
                      "
                    >
                      {{ person.flows }}
                    </p>
                    <p class="text-[10px] text-white/40">flows</p>
                  </div>
                </div>
              </TransitionGroup>
            </div>

            <!-- WEEK COMPLETE: Clean Results Screen -->
            <Transition name="results">
              <div
                v-if="weekComplete"
                class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-violet-900/30 to-purple-900/20 rounded-xl overflow-hidden"
              >
                <!-- Floating names background -->
                <div
                  class="absolute inset-0 pointer-events-none overflow-hidden"
                >
                  <div
                    v-for="floatName in floatingNames"
                    :key="floatName.id"
                    class="absolute font-bold text-violet-400/60 whitespace-nowrap"
                    :class="
                      floatName.visible
                        ? 'floating-name-pop'
                        : 'opacity-0 scale-0'
                    "
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
                    <p
                      class="font-medium text-white/80 text-sm max-w-[70px] truncate"
                    >
                      {{
                        customWinnerName ||
                        leaderboardData[1]?.name?.split(" ")[0]
                      }}
                    </p>
                    <p class="text-xs text-white/40 mb-2">
                      {{ formatHours(leaderboardData[1]?.hours) }}
                    </p>
                    <div
                      class="w-16 h-16 bg-white/10 border border-white/20 rounded-t-lg flex items-center justify-center"
                    >
                      <PhMedal class="w-8 h-8 text-gray-300" weight="fill" />
                    </div>
                  </div>

                  <!-- 1st place - clickable with wink -->
                  <div
                    class="text-center podium-item podium-1 relative group cursor-pointer"
                    @click="!showNameInput && (showNameInput = true)"
                  >
                    <PhCrown
                      class="w-7 h-7 text-amber-400 mx-auto mb-1"
                      weight="fill"
                    />
                    <div class="relative w-[72px] h-[72px] mx-auto mb-2">
                      <!-- Avatar -->
                      <div
                        class="w-full h-full rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg ring-2 ring-violet-400 transition-all duration-200 group-hover:opacity-20"
                        :style="{ backgroundColor: leaderboardData[0]?.color }"
                      >
                        {{
                          customWinnerInitials || leaderboardData[0]?.initials
                        }}
                      </div>
                      <!-- Wink overlay on hover -->
                      <div
                        class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <PhSmiley
                          class="w-8 h-8 text-amber-400"
                          weight="fill"
                        />
                        <span
                          class="text-[8px] font-bold text-white/60 tracking-wider"
                          >CLICK</span
                        >
                      </div>
                    </div>
                    <p class="font-bold text-white max-w-[80px] truncate">
                      {{
                        customWinnerName ||
                        leaderboardData[0]?.name?.split(" ")[0]
                      }}
                    </p>
                    <p class="text-xs text-white/40 mb-2">
                      {{ formatHours(leaderboardData[0]?.hours) }}
                    </p>
                    <div
                      class="w-16 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-t-lg flex items-center justify-center"
                    >
                      <PhTrophy
                        class="w-10 h-10 text-amber-300"
                        weight="fill"
                      />
                    </div>
                  </div>

                  <!-- 3rd place -->
                  <div class="text-center podium-item podium-3">
                    <div
                      class="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-semibold shadow-md"
                      :style="{ backgroundColor: leaderboardData[2]?.color }"
                    >
                      {{ customWinnerInitials || leaderboardData[2]?.initials }}
                    </div>
                    <p
                      class="font-medium text-white/80 text-sm max-w-[70px] truncate"
                    >
                      {{
                        customWinnerName ||
                        leaderboardData[2]?.name?.split(" ")[0]
                      }}
                    </p>
                    <p class="text-xs text-white/40 mb-2">
                      {{ formatHours(leaderboardData[2]?.hours) }}
                    </p>
                    <div
                      class="w-16 h-12 bg-white/10 border border-white/20 rounded-t-lg flex items-center justify-center"
                    >
                      <PhMedal class="w-7 h-7 text-amber-600" weight="fill" />
                    </div>
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
            class="absolute inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
            @click.self="
              showNameInput = false;
              nameInput = '';
            "
          >
            <div
              class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-5 w-[220px]"
            >
              <input
                ref="nameInputRef"
                v-model="nameInput"
                @keyup.enter="setCustomName"
                type="text"
                placeholder="Enter your name..."
                class="w-full px-4 py-3 text-sm bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 mb-3 text-center text-white placeholder-white/40"
              />
              <button
                @click="setCustomName"
                class="w-full px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                I deserve #1
                <PhCrown class="w-4 h-4 text-amber-300" weight="fill" />
              </button>
            </div>
          </div>
        </Transition>
      </div>
      <!-- End Content Area -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import {
  PhTrophy,
  PhMedal,
  PhCrown,
  PhStar,
  PhSparkle,
  PhLightning,
  PhConfetti,
  PhSmiley,
  PhArrowCounterClockwise,
} from "@phosphor-icons/vue";

const isEnabled = ref(false);
const celebration = ref(null);
const updatedNumbers = ref({});
const weekComplete = ref(false);
const progressKey = ref(0);

// Custom winner name feature
const showNameInput = ref(false);
const nameInputRef = ref(null);
const nameInput = ref("");
const customWinnerName = ref("");
const customWinnerInitials = ref("");
const floatingNames = ref([]);

const setCustomName = () => {
  if (nameInput.value.trim()) {
    const name = nameInput.value.trim();
    customWinnerName.value = name;

    // Generate initials from name
    const parts = name.split(" ");
    let initials;
    if (parts.length >= 2) {
      initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else {
      initials = name.substring(0, 2).toUpperCase();
    }
    customWinnerInitials.value = initials;

    // Change ALL players' names to the custom name
    leaderboardData.value.forEach((person) => {
      person.name = name;
      person.initials = initials;
    });

    // Generate floating names for background
    generateFloatingNames(name);
  }
  showNameInput.value = false;
  nameInput.value = "";
  triggerCelebration("🎉");
};

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
  ];

  const names = [];

  // Create a grid-based layout with jitter for better distribution
  const cols = 5;
  const rows = 5;
  const cellWidth = 80 / cols; // Leave margins
  const cellHeight = 80 / rows;

  let index = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Base position from grid + random jitter within cell
      const baseX = 10 + col * cellWidth;
      const baseY = 10 + row * cellHeight;
      const jitterX = (Math.random() - 0.5) * cellWidth * 0.6;
      const jitterY = (Math.random() - 0.5) * cellHeight * 0.6;

      names.push({
        id: index,
        text: cheers[index % cheers.length],
        x: baseX + jitterX,
        y: baseY + jitterY,
        size: Math.random() * 12 + 10, // 10-22px
        rotation: Math.random() * 30 - 15, // Less extreme rotation
        opacity: Math.random() * 0.2 + 0.12,
        visible: false,
      });
      index++;
    }
  }

  // Shuffle the array for random pop-in order
  names.sort(() => Math.random() - 0.5);

  floatingNames.value = names;

  // Stagger the visibility of each name
  names.forEach((item, idx) => {
    setTimeout(() => {
      const found = floatingNames.value.find((n) => n.id === item.id);
      if (found) found.visible = true;
    }, idx * 50);
  });
};

// Initial state for reset
const getInitialData = () => [
  {
    name: "Sarah Chen",
    initials: "SC",
    dept: "Marketing",
    hours: 3,
    flows: 2,
    color: "#f472b6",
    momentum: 1,
  },
  {
    name: "Alex Kumar",
    initials: "AK",
    dept: "Engineering",
    hours: 2,
    flows: 1,
    color: "#60a5fa",
    momentum: 1,
  },
  {
    name: "Emma Wilson",
    initials: "EW",
    dept: "Sales",
    hours: 2,
    flows: 1,
    color: "#34d399",
    momentum: 1,
  },
  {
    name: "James Park",
    initials: "JP",
    dept: "Operations",
    hours: 1,
    flows: 1,
    color: "#a78bfa",
    momentum: 1,
  },
  {
    name: "Maya Roberts",
    initials: "MR",
    dept: "HR",
    hours: 1,
    flows: 0,
    color: "#fbbf24",
    momentum: 1,
  },
];

// Leaderboard data with momentum
const leaderboardData = ref(getInitialData());

const resetLeaderboard = () => {
  leaderboardData.value = getInitialData();
  updatedNumbers.value = {};
  celebration.value = null;
  weekComplete.value = false;
  progressKey.value++;
  customWinnerName.value = "";
  customWinnerInitials.value = "";
  showNameInput.value = false;
  nameInput.value = "";
  floatingNames.value = [];
};

const restartLeaderboard = () => {
  stopLiveUpdates();
  resetLeaderboard();
  startLiveUpdates();
};

// Real-time updates with momentum system
let mainLoop = null;
let weekTimeout = null;

const triggerCelebration = (emoji) => {
  celebration.value = emoji;
  setTimeout(() => {
    celebration.value = null;
  }, 1500);
};

const updatePerson = (person, field, amount = 1) => {
  if (!isEnabled.value) return;

  const oldFirst = leaderboardData.value[0].name;
  const oldRanks = leaderboardData.value.map((p) => p.name);

  // Increment the stat
  person[field] += amount;

  // Trigger flip animation for this specific field
  updatedNumbers.value = {
    ...updatedNumbers.value,
    [person.name + "-" + field]: true,
  };

  setTimeout(() => {
    const newUpdates = { ...updatedNumbers.value };
    delete newUpdates[person.name + "-" + field];
    updatedNumbers.value = newUpdates;
  }, 400);

  // Re-sort the data
  leaderboardData.value.sort((a, b) => b.hours - a.hours);
  const newFirst = leaderboardData.value[0].name;

  // Celebrate if leader changed!
  if (oldFirst !== newFirst) {
    triggerCelebration("👑");
  }
};

const shuffleMomentum = () => {
  // Randomly boost/reduce momentum to create drama
  leaderboardData.value.forEach((person) => {
    const roll = Math.random();
    if (roll > 0.85) {
      // Hot streak! Boost momentum
      person.momentum = Math.min(person.momentum + 0.5, 3);
    } else if (roll < 0.15) {
      // Cool down
      person.momentum = Math.max(person.momentum - 0.3, 0.5);
    }
  });

  // Every so often, give an underdog a big boost
  if (Math.random() > 0.7) {
    const sortedByHours = [...leaderboardData.value].sort(
      (a, b) => a.hours - b.hours
    );
    const underdog = sortedByHours[Math.floor(Math.random() * 2)]; // Pick from bottom 2
    underdog.momentum = 2.5;
  }
};

const gameLoop = () => {
  if (!isEnabled.value) return;

  // Update 1-3 random people based on their momentum
  const numUpdates = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < numUpdates; i++) {
    // Weight selection by momentum
    const totalMomentum = leaderboardData.value.reduce(
      (sum, p) => sum + p.momentum,
      0
    );
    let pick = Math.random() * totalMomentum;
    let selected = null;

    for (const person of leaderboardData.value) {
      pick -= person.momentum;
      if (pick <= 0) {
        selected = person;
        break;
      }
    }

    if (selected) {
      // Hours increase based on momentum
      const hoursGain = Math.random() < selected.momentum / 3 ? 2 : 1;
      updatePerson(selected, "hours", hoursGain);

      // Sometimes also add flows
      if (Math.random() > 0.7) {
        setTimeout(() => updatePerson(selected, "flows", 1), 200);
      }
    }
  }
};

const finishWeek = () => {
  stopLiveUpdates();
  weekComplete.value = true;
  triggerCelebration("🏆");
};

const startLiveUpdates = () => {
  if (mainLoop) clearInterval(mainLoop);
  if (weekTimeout) clearTimeout(weekTimeout);

  weekComplete.value = false;

  // Main game loop - tick every 800ms for fast-paced action
  mainLoop = setInterval(() => {
    gameLoop();

    // Shuffle momentum periodically
    if (Math.random() > 0.6) {
      shuffleMomentum();
    }
  }, 800);

  // Finish the week after 17 seconds
  weekTimeout = setTimeout(() => {
    finishWeek();
  }, 17000);
};

const stopLiveUpdates = () => {
  if (mainLoop) {
    clearInterval(mainLoop);
    mainLoop = null;
  }
  if (weekTimeout) {
    clearTimeout(weekTimeout);
    weekTimeout = null;
  }
};

onMounted(() => {
  startLiveUpdates();
});

onUnmounted(() => {
  stopLiveUpdates();
});

watch(isEnabled, (val) => {
  if (val) {
    resetLeaderboard();
    startLiveUpdates();
    setTimeout(() => triggerCelebration("🎉"), 300);
  } else {
    stopLiveUpdates();
    resetLeaderboard();
  }
});

// Auto-focus input when modal opens
watch(showNameInput, async (val) => {
  if (val) {
    await nextTick();
    nameInputRef.value?.focus();
  }
});

const formatHours = (h) => h + "h";

// Helper functions for celebration icons
const getCelebrationIcon = (emoji) => {
  const iconMap = {
    "🎉": PhConfetti,
    "👑": PhCrown,
    "🏆": PhTrophy,
  };
  return iconMap[emoji] || PhConfetti;
};

const getCelebrationColor = (emoji) => {
  const colorMap = {
    "🎉": "text-pink-400",
    "👑": "text-amber-400",
    "🏆": "text-amber-400",
  };
  return colorMap[emoji] || "text-violet-400";
};
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
  0%,
  100% {
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
  filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.5));
  animation: trophy-pulse 2s ease-in-out infinite;
}

@keyframes trophy-pulse {
  0%,
  100% {
    filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.4));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(251, 191, 36, 0.8));
    transform: scale(1.05);
  }
}

/* Subtle bounce */
.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

@keyframes bounce-subtle {
  0%,
  100% {
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
  0%,
  100% {
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
  }
  50% {
    box-shadow: 0 4px 25px rgba(139, 92, 246, 0.4);
  }
}

/* Eager knob - wants to move right */
.knob-eager {
  animation: knob-nudge 3s ease-in-out infinite;
}

@keyframes knob-nudge {
  0%,
  100% {
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
  width: 16px;
  height: 16px;
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
  width: 28px;
  height: 28px;
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

.podium-1 {
  animation-delay: 0.2s;
}
.podium-2 {
  animation-delay: 0.1s;
}
.podium-3 {
  animation-delay: 0.3s;
}

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
