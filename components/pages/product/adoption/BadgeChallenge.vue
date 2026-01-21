<template>
  <div class="relative w-full h-full rounded-lg overflow-hidden bg-black/10">
    <!-- Subtle grid pattern -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="
        background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><rect fill=%22white%22 width=%221%22 height=%221%22/></svg>');
        background-size: 20px 20px;
      "
    ></div>

    <!-- ALL BADGES COLLECTED VIEW -->
    <Transition name="fade-scale">
      <div
        v-if="allCollected"
        class="absolute inset-0 z-50 overflow-hidden rounded-2xl"
      >
        <!-- Dark base with golden accent -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]"
        ></div>

        <!-- Golden light beam from top -->
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-full bg-gradient-to-b from-amber-400/20 via-amber-400/5 to-transparent blur-2xl"
        ></div>

        <!-- Main content -->
        <div class="relative h-full flex flex-col items-center justify-center">
          <!-- Big score reveal -->
          <div class="text-center mb-6">
            <div
              class="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 score-reveal"
            >
              10/10
            </div>
            <div
              class="text-amber-400/60 text-sm font-medium tracking-widest uppercase mt-2"
            >
              Perfect
            </div>
          </div>

          <!-- Fun message -->
          <p class="text-white/60 text-lg mb-6 italic flex items-center gap-2">
            That satisfying feeling? Your team wants it too
            <PhHeart class="w-5 h-5 text-violet-400" weight="fill" />
          </p>

          <!-- Badges arc -->
          <div class="relative h-20 w-full max-w-xs mb-8">
            <component
              v-for="(badge, index) in badges"
              :key="badge.id"
              :is="badge.icon"
              class="absolute w-7 h-7 badge-arc"
              :class="badge.color"
              weight="fill"
              :style="{
                left: 10 + index * 9 + '%',
                top: Math.abs(index - 4.5) * 8 + 'px',
                animationDelay: 0.5 + index * 0.06 + 's',
              }"
            />
          </div>

          <button
            @click="goToIntro"
            class="px-8 py-3 border border-amber-400/30 text-amber-400 font-medium rounded-full text-sm hover:bg-amber-400/10 transition-all"
          >
            Play Again
          </button>
        </div>

        <!-- Floating golden particles -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <PhSparkle
            v-for="i in 15"
            :key="'p-' + i"
            class="absolute particle-rise text-amber-400"
            weight="fill"
            :style="{
              left: 10 + i * 5.33 + '%',
              bottom: '-10px',
              width: '12px',
              height: '12px',
              animationDelay: i * 0.2 + 's',
              animationDuration: 3 + (i % 3) + 's',
            }"
          />
        </div>
      </div>
    </Transition>

    <!-- START SCREEN -->
    <div
      v-if="!gameStarted"
      class="absolute inset-0 z-40 overflow-hidden bg-black/20 flex flex-col"
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

      <!-- Content -->
      <div
        class="relative flex-1 flex flex-col items-center justify-center px-8"
      >
        <!-- Background glow -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"
        ></div>

        <!-- Central badge showcase -->
        <div class="relative mb-8">
          <!-- Glowing ring -->
          <div
            class="absolute inset-0 w-32 h-32 -m-4 rounded-full bg-gradient-to-br from-violet-500/30 to-amber-500/30 blur-2xl"
          ></div>

          <!-- Main badge circle -->
          <div
            class="relative w-24 h-24 rounded-full bg-white/5 flex items-center justify-center"
          >
            <PhTrophy class="w-12 h-12 text-amber-400" weight="fill" />
          </div>

          <!-- Orbiting mini badges -->
          <div
            class="absolute -top-6 -right-2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center intro-orbit-1"
          >
            <PhStar class="w-4 h-4 text-yellow-400" weight="fill" />
          </div>
          <div
            class="absolute -bottom-1 -left-8 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center intro-orbit-2"
          >
            <PhBrain class="w-4 h-4 text-pink-400" weight="fill" />
          </div>
          <div
            class="absolute top-1/2 -right-10 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center intro-orbit-3"
          >
            <PhBarbell class="w-4 h-4 text-blue-400" weight="fill" />
          </div>
        </div>

        <!-- Text -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-white/90 mb-2">
            Badge Collection
          </h1>
          <p class="text-white/50 text-sm">Unlock all 10 achievements</p>
        </div>

        <!-- Start button -->
        <button
          @click="gameStarted = true"
          class="group relative px-10 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/10 transition-all shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 overflow-hidden intro-btn-float"
        >
          <span class="relative z-10">Start Collecting</span>
          <!-- Shine effect -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent intro-btn-shine"
          ></div>
        </button>
      </div>
    </div>

    <!-- MAIN GAME VIEW -->
    <div
      v-if="gameStarted && !allCollected"
      class="relative h-full flex flex-col p-5"
    >
      <!-- Compact Question Area - Lighter background -->
      <div class="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
        <!-- Difficulty Tabs -->
        <div class="flex items-center gap-1 mb-3 pb-3 border-b border-white/5">
          <button
            v-for="(mode, index) in difficultyModes"
            :key="mode.label"
            @click="tryChangeDifficulty(index)"
            class="flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-lg transition-all"
            :class="
              difficulty === index
                ? mode.activeClass
                : 'text-white/60 hover:text-white/80 hover:bg-white/5'
            "
          >
            {{ mode.label }}
          </button>
        </div>

        <!-- DRAMATIC WARNING MODAL - Difficulty Change -->
        <Transition name="dramatic">
          <div
            v-if="showWarning"
            class="absolute inset-0 z-[60] flex items-center justify-center rounded-2xl overflow-hidden"
          >
            <!-- Pulsing red background -->
            <div
              class="absolute inset-0 bg-red-900/90 animate-pulse-fast"
            ></div>

            <!-- Warning stripes -->
            <div
              class="absolute inset-0 opacity-10"
              style="
                background: repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  black 10px,
                  black 20px
                );
              "
            ></div>

            <!-- Content -->
            <div class="relative text-center p-6 warning-shake">
              <div
                class="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center"
              >
                <PhWarning class="w-8 h-8 text-amber-400" weight="fill" />
              </div>
              <h3 class="text-white font-black text-2xl mb-2">
                Reset progress?
              </h3>
              <p class="text-red-200 text-sm mb-6">
                All badges will be lost forever
              </p>

              <div class="flex gap-3 justify-center">
                <button
                  @click="cancelDifficultyChange"
                  class="px-5 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  @click="confirmDifficultyChange"
                  class="px-5 py-2.5 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-400 transition-all animate-pulse flex items-center gap-2"
                >
                  Reset <PhSkull class="w-4 h-4" weight="fill" />
                </button>
              </div>
            </div>
          </div>
        </Transition>

        <!-- DRAMATIC WARNING MODAL - Reset/Exit -->
        <Transition name="dramatic">
          <div
            v-if="showResetWarning"
            class="absolute inset-0 z-[60] flex items-center justify-center rounded-2xl overflow-hidden"
          >
            <!-- Pulsing red background -->
            <div
              class="absolute inset-0 bg-red-900/90 animate-pulse-fast"
            ></div>

            <!-- Warning stripes -->
            <div
              class="absolute inset-0 opacity-10"
              style="
                background: repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  black 10px,
                  black 20px
                );
              "
            ></div>

            <!-- Content -->
            <div class="relative text-center p-6 warning-shake">
              <div
                class="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center"
              >
                <PhDoor class="w-8 h-8 text-violet-400" weight="fill" />
              </div>
              <h3 class="text-white font-black text-2xl mb-2">Leave game?</h3>
              <p class="text-red-200 text-sm mb-6">Your badges will be gone!</p>

              <div class="flex gap-3 justify-center">
                <button
                  @click="cancelReset"
                  class="px-5 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-all"
                >
                  Stay
                </button>
                <button
                  @click="confirmReset"
                  class="px-5 py-2.5 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-400 transition-all animate-pulse flex items-center gap-2"
                >
                  Leave <PhSkull class="w-4 h-4" weight="fill" />
                </button>
              </div>
            </div>
          </div>
        </Transition>

        <div class="flex items-center justify-between gap-4">
          <!-- Question -->
          <div
            class="font-bold text-white tracking-tight font-mono"
            :class="questionSize"
          >
            <span v-html="currentQuestion"></span> =
            <span class="text-violet-400">?</span>
          </div>

          <!-- Answer buttons -->
          <div class="flex gap-2 flex-shrink-0">
            <button
              v-for="option in answerOptions"
              :key="option"
              @click="pickAnswer(option)"
              :disabled="isProcessing"
              class="w-11 h-11 text-lg font-bold rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
              :class="[
                selectedAnswer === option
                  ? option === correctAnswer
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-red-500/20 border-red-500 text-red-400 shake'
                  : 'bg-white/5 border-white/10 text-white hover:border-violet-500/50 hover:bg-violet-500/10',
              ]"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>

      <!-- Game-style feedback overlay -->
      <Transition name="flash">
        <div
          v-if="showFeedback"
          class="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
        >
          <div
            class="text-5xl font-black uppercase tracking-wider feedback-text"
            :class="feedbackColor"
          >
            {{ feedback }}
          </div>
        </div>
      </Transition>

      <!-- Badges Section - Now the main focus -->
      <div
        class="flex-1 flex flex-col bg-black/20 -mx-5 -mb-5 px-5 pb-5 pt-4 rounded-t-3xl"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span
              class="text-xs text-violet-300/70 uppercase tracking-wider font-medium flex items-center gap-1.5"
            >
              <PhTrophy class="w-3.5 h-3.5 text-amber-400" weight="fill" />
              Your Badges
            </span>
            <button
              @click="tryReset"
              class="w-5 h-5 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:rotate-180 duration-300"
              title="Reset"
            >
              <svg
                class="w-3 h-3 text-violet-300/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
          <div class="relative group cursor-pointer" @click="cheatUnlockAll">
            <div
              class="text-xs text-violet-300/70 font-mono group-hover:text-violet-300 transition-colors"
            >
              {{ unlockedCount }}/{{ badges.length }}
            </div>
            <!-- Secret cheat tooltip -->
            <div
              class="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-[10px] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none flex items-center gap-1"
            >
              <PhMagicWand class="w-3 h-3" weight="fill" /> Cheat?
            </div>
          </div>
        </div>

        <div class="flex-1 grid grid-cols-5 grid-rows-2 gap-3">
          <div
            v-for="badge in badges"
            :key="badge.id"
            class="relative group"
            @mouseenter="hoveredBadge = badge.id"
            @mouseleave="hoveredBadge = null"
          >
            <div
              class="w-full h-full rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer border gap-1"
              :class="[
                badge.unlocked
                  ? 'bg-white/10 border-white/20 hover:scale-105 hover:bg-white/15'
                  : 'bg-white/[0.02] border-white/5 opacity-40',
              ]"
            >
              <component
                v-if="badge.unlocked"
                :is="badge.icon"
                class="w-7 h-7"
                :class="badge.color"
                weight="fill"
              />
              <PhQuestion v-else class="w-7 h-7 text-white/30" weight="fill" />
              <span
                class="text-[9px] text-gray-400 font-medium truncate max-w-full px-1"
              >
                {{ badge.unlocked ? badge.name : "???" }}
              </span>
            </div>

            <!-- Tooltip -->
            <Transition name="tooltip">
              <div
                v-if="hoveredBadge === badge.id"
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-xl"
              >
                <div class="font-semibold text-white/90">
                  {{ badge.unlocked ? badge.name : "???" }}
                </div>
                <div class="text-white/50 text-[10px]">
                  {{ badge.unlocked ? badge.description : badge.hint }}
                </div>
                <div
                  class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/10"
                ></div>
              </div>
            </Transition>

            <!-- Unlock animation -->
            <div
              v-if="badge.justUnlocked"
              class="absolute inset-0 rounded-2xl animate-ping-once ring-2 ring-violet-500"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Badge Unlock Celebration - EPIC! -->
    <Transition name="celebration">
      <div
        v-if="showCelebration"
        class="absolute inset-0 z-50 flex items-center justify-center rounded-2xl overflow-hidden"
      >
        <!-- Backdrop with blur -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <!-- Radial glow -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="w-40 h-40 bg-violet-500/30 rounded-full blur-3xl animate-pulse"
          ></div>
        </div>

        <!-- Confetti particles using Phosphor icons -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <component
            v-for="particle in confettiParticles"
            :key="particle.id"
            :is="particle.icon"
            class="absolute confetti-particle"
            :class="particle.color"
            weight="fill"
            :style="{
              left: particle.left,
              animationDelay: particle.delay,
              '--drift': particle.drift,
              width: particle.size,
              height: particle.size,
            }"
          />
        </div>

        <!-- Main content -->
        <div class="relative text-center celebration-pop">
          <!-- Big icon with glow -->
          <div class="relative inline-block mb-4">
            <component
              v-if="celebrationBadge?.icon"
              :is="celebrationBadge.icon"
              class="w-16 h-16 animate-bounce-badge"
              :class="celebrationBadge.color"
              weight="fill"
            />
            <component
              v-if="celebrationBadge?.icon"
              :is="celebrationBadge.icon"
              class="absolute inset-0 w-16 h-16 blur-lg opacity-50"
              :class="celebrationBadge.color"
              weight="fill"
            />
          </div>

          <!-- Text -->
          <div class="space-y-1">
            <div
              class="text-violet-300 text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-1.5"
            >
              <PhTrophy class="w-4 h-4 text-amber-400" weight="fill" />
              Badge Unlocked!
            </div>
            <div class="text-white font-bold text-2xl">
              {{ celebrationBadge?.name }}
            </div>
            <div class="text-gray-400 text-sm">
              {{ celebrationBadge?.description }}
            </div>
          </div>

          <!-- Sparkle ring -->
          <div
            class="absolute -inset-8 border-2 border-violet-500/30 rounded-full animate-ping-slow"
          ></div>
        </div>
      </Transition>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, markRaw } from "vue";
import {
  PhHandWaving,
  PhCursorClick,
  PhBrain,
  PhPizza,
  PhSmileyXEyes,
  PhMagnifyingGlass,
  PhCompass,
  PhBarbell,
  PhStar,
  PhTrophy,
  PhWarning,
  PhDoor,
  PhSkull,
  PhConfetti,
  PhSparkle,
  PhFire,
  PhHeart,
  PhQuestion,
  PhMagicWand,
  PhLockKey,
} from "@phosphor-icons/vue";

const selectedAnswer = ref(null);
const feedback = ref("");
const feedbackColor = ref("");
const showFeedback = ref(false);
const hoveredBadge = ref(null);
const showCelebration = ref(false);
const celebrationBadge = ref(null);
const attempts = ref(0);
const isProcessing = ref(false);
const allCollected = ref(false);
const gameStarted = ref(false);
const difficulty = ref(0);
const showWarning = ref(false);
const showResetWarning = ref(false);
const pendingDifficulty = ref(null);

// 3 difficulty modes
const difficultyModes = [
  { label: "Easy", activeClass: "bg-emerald-500/20 text-emerald-400" },
  { label: "Medium", activeClass: "bg-amber-500/20 text-amber-400" },
  { label: "Hard", activeClass: "bg-red-500/20 text-red-400" },
];

// Questions per difficulty - all single digit, one operation!
const questionsByDifficulty = {
  0: [
    // Easy - tiny addition
    { q: "1 + 1", answer: 2, options: [2, 3, 0, "🍕"] },
    { q: "2 + 1", answer: 3, options: [3, 2, 4, "🍕"] },
    { q: "1 + 2", answer: 3, options: [3, 1, 5, "🍕"] },
  ],
  1: [
    // Medium - subtraction
    { q: "3 - 1", answer: 2, options: [2, 3, 4, "🍕"] },
    { q: "4 - 1", answer: 3, options: [3, 4, 5, "🍕"] },
    { q: "5 - 2", answer: 3, options: [3, 2, 7, "🍕"] },
  ],
  2: [
    // Hard - multiplication (still tiny!)
    { q: "1 × 2", answer: 2, options: [2, 3, 1, "🍕"] },
    { q: "1 × 3", answer: 3, options: [3, 1, 4, "🍕"] },
    { q: "3 × 1", answer: 3, options: [3, 4, 0, "🍕"] },
  ],
};

const questionIndex = ref(0);

const currentQuestionData = computed(() => {
  const pool =
    questionsByDifficulty[difficulty.value] || questionsByDifficulty[0];
  return pool[questionIndex.value % pool.length];
});

const currentQuestion = computed(() => currentQuestionData.value.q);
const correctAnswer = computed(() => currentQuestionData.value.answer);
const answerOptions = computed(() => currentQuestionData.value.options);

// Cycle question when difficulty changes
watch(difficulty, () => {
  questionIndex.value = Math.floor(Math.random() * 3);
});

function tryChangeDifficulty(newDifficulty) {
  if (newDifficulty === difficulty.value) return;

  // Check if there's actual progress (more than just welcome badge or any attempts)
  const hasProgress = unlockedCount.value > 1 || attempts.value > 0;

  if (hasProgress) {
    pendingDifficulty.value = newDifficulty;
    showWarning.value = true;
  } else {
    // No progress, just switch directly
    difficulty.value = newDifficulty;
  }
}

function cancelDifficultyChange() {
  showWarning.value = false;
  pendingDifficulty.value = null;
}

function confirmDifficultyChange() {
  difficulty.value = pendingDifficulty.value;
  showWarning.value = false;
  pendingDifficulty.value = null;
  resetGame();
}

function tryReset() {
  // Check if there's actual progress
  const hasProgress = unlockedCount.value > 1 || attempts.value > 0;
  if (hasProgress) {
    showResetWarning.value = true;
  } else {
    goToIntro();
  }
}

function cancelReset() {
  showResetWarning.value = false;
}

function confirmReset() {
  showResetWarning.value = false;
  goToIntro();
}

function goToIntro() {
  gameStarted.value = false;
  resetGame();
}

const questionSize = computed(() => {
  const len = currentQuestion.value.length;
  if (len > 10) return "text-xl";
  if (len > 7) return "text-2xl";
  return "text-3xl";
});

// Super easy badges - unlock with almost every action!
const badges = ref([
  {
    id: "welcome",
    icon: markRaw(PhHandWaving),
    color: "text-amber-400",
    name: "Hello Friend!",
    description: "Welcome to the party!",
    hint: "Already yours!",
    unlocked: true,
    justUnlocked: false,
  },
  {
    id: "clicked",
    icon: markRaw(PhCursorClick),
    color: "text-violet-400",
    name: "First Click",
    description: "You clicked something!",
    hint: "Click any answer",
    unlocked: false,
    justUnlocked: false,
  },
  {
    id: "genius",
    icon: markRaw(PhBrain),
    color: "text-pink-400",
    name: "Math Genius",
    description: "1+1=2. Nobel Prize!",
    hint: "Get one right",
    unlocked: false,
    justUnlocked: false,
  },
  {
    id: "pizza",
    icon: markRaw(PhPizza),
    color: "text-orange-400",
    name: "Pizza Lover",
    description: "Pizza > Math",
    hint: "Pick the tasty one",
    unlocked: false,
    justUnlocked: false,
  },
  {
    id: "rebel",
    icon: markRaw(PhSmileyXEyes),
    color: "text-red-400",
    name: "Rebel",
    description: "Rules are boring",
    hint: "Wrong answer",
    unlocked: false,
    justUnlocked: false,
  },
  {
    id: "curious",
    icon: markRaw(PhMagnifyingGlass),
    color: "text-cyan-400",
    name: "Curious",
    description: "Testing options",
    hint: "Try 2 options",
    unlocked: false,
    justUnlocked: false,
  },
  {
    id: "explorer",
    icon: markRaw(PhCompass),
    color: "text-emerald-400",
    name: "Explorer",
    description: "Tried everything",
    hint: "Try all 4",
    unlocked: false,
    justUnlocked: false,
  },
  {
    id: "persistent",
    icon: markRaw(PhBarbell),
    color: "text-blue-400",
    name: "Persistent",
    description: "Never stops!",
    hint: "3 attempts",
    unlocked: false,
    justUnlocked: false,
  },
  {
    id: "dedicated",
    icon: markRaw(PhStar),
    color: "text-yellow-400",
    name: "Dedicated",
    description: "Badge hunter!",
    hint: "5 clicks",
    unlocked: false,
    justUnlocked: false,
  },
  {
    id: "champion",
    icon: markRaw(PhTrophy),
    color: "text-amber-400",
    name: "Champion",
    description: "Got them all!",
    hint: "Collect all",
    unlocked: false,
    justUnlocked: false,
  },
]);

const clickedOptions = ref(new Set());
const pendingBadges = ref([]);

const unlockedCount = computed(
  () => badges.value.filter((b) => b.unlocked).length
);

// Confetti particle icons for celebration
const confettiIcons = [
  { icon: markRaw(PhConfetti), color: "text-pink-400" },
  { icon: markRaw(PhSparkle), color: "text-yellow-400" },
  { icon: markRaw(PhStar), color: "text-amber-400" },
  { icon: markRaw(PhFire), color: "text-orange-400" },
  { icon: markRaw(PhHeart), color: "text-pink-500" },
  { icon: markRaw(PhSparkle), color: "text-violet-400" },
  { icon: markRaw(PhStar), color: "text-cyan-400" },
  { icon: markRaw(PhConfetti), color: "text-emerald-400" },
];

const confettiParticles = computed(() => {
  const particles = [];
  for (let i = 0; i < 30; i++) {
    const iconData = confettiIcons[i % confettiIcons.length];
    particles.push({
      id: "confetti-" + i,
      icon: iconData.icon,
      color: iconData.color,
      left: 10 + i * 2.7 + "%",
      delay: i * 0.017 + "s",
      drift: ((i % 10) - 5) * 20 + "px",
      size: 16 + (i % 4) * 4 + "px",
    });
  }
  return particles;
});

let celebrationTimeout = null;

function unlockBadge(id) {
  const badge = badges.value.find((b) => b.id === id);
  if (!badge || badge.unlocked) return false;

  badge.unlocked = true;
  badge.justUnlocked = true;
  celebrationBadge.value = badge;
  showCelebration.value = true;

  // Clear any existing timeout
  if (celebrationTimeout) clearTimeout(celebrationTimeout);

  celebrationTimeout = setTimeout(() => {
    showCelebration.value = false;
    badge.justUnlocked = false;

    // Process next badge in queue
    setTimeout(() => {
      if (pendingBadges.value.length > 0) {
        processNextBadge();
      } else {
        // Check for champion badge after all queued badges are done
        const nonChampionBadges = badges.value.filter(
          (b) => b.id !== "champion"
        );
        if (nonChampionBadges.every((b) => b.unlocked)) {
          setTimeout(() => {
            queueBadge("champion");
            processNextBadge();
            setTimeout(() => {
              allCollected.value = true;
            }, 1500);
          }, 200);
        }
      }
    }, 200);
  }, 1200);

  return true;
}

function queueBadge(id) {
  const badge = badges.value.find((b) => b.id === id);
  if (badge && !badge.unlocked && !pendingBadges.value.includes(id)) {
    pendingBadges.value.push(id);
  }
}

function processNextBadge() {
  if (pendingBadges.value.length > 0 && !showCelebration.value) {
    const nextBadgeId = pendingBadges.value.shift();
    unlockBadge(nextBadgeId);
  }
}

function pickAnswer(option) {
  if (isProcessing.value) return;

  isProcessing.value = true;
  selectedAnswer.value = option;
  attempts.value++;
  clickedOptions.value.add(option);

  const isCorrect = option === correctAnswer.value;

  // STEP 1: Show feedback overlay
  if (isCorrect) {
    feedback.value = "Correct!";
    feedbackColor.value = "text-emerald-400";
  } else if (option === "🍕") {
    feedback.value = "Yummy!";
    feedbackColor.value = "text-amber-400";
  } else {
    feedback.value = "Nope!";
    feedbackColor.value = "text-red-400";
  }

  showFeedback.value = true;
  setTimeout(() => {
    showFeedback.value = false;
  }, 400);

  // STEP 2: After showing feedback, unlock badges
  setTimeout(() => {
    // Queue ALL earned badges first
    queueBadge("clicked");

    if (isCorrect) queueBadge("genius");
    if (option === "🍕") queueBadge("pizza");
    if (!isCorrect && option !== "🍕") queueBadge("rebel");

    if (clickedOptions.value.size >= 2) queueBadge("curious");
    if (clickedOptions.value.size >= 4) queueBadge("explorer");
    if (attempts.value >= 3) queueBadge("persistent");
    if (attempts.value >= 5) queueBadge("dedicated");

    // Start processing the queue
    if (!showCelebration.value) {
      processNextBadge();
    }
  }, 600);

  // STEP 3: Reset for next attempt
  setTimeout(() => {
    selectedAnswer.value = null;
    feedback.value = "";
    isProcessing.value = false;
  }, 2000);
}

function cheatUnlockAll() {
  // Get only the badges that aren't unlocked yet
  const lockedBadges = badges.value.filter((b) => !b.unlocked);

  // If all already unlocked, just show end screen
  if (lockedBadges.length === 0) {
    allCollected.value = true;
    return;
  }

  // Clear any pending state
  showCelebration.value = false;
  celebrationBadge.value = null;
  pendingBadges.value = [];

  // Roll through only the locked badges with full celebrations
  const celebrationDuration = 1400;

  lockedBadges.forEach((badge, index) => {
    setTimeout(() => {
      badge.unlocked = true;
      badge.justUnlocked = true;
      celebrationBadge.value = badge;
      showCelebration.value = true;

      setTimeout(() => {
        showCelebration.value = false;
        badge.justUnlocked = false;

        // After last badge, show end screen
        if (index === lockedBadges.length - 1) {
          setTimeout(() => {
            allCollected.value = true;
          }, 400);
        }
      }, celebrationDuration - 200);
    }, index * celebrationDuration);
  });
}

function resetGame() {
  allCollected.value = false;
  attempts.value = 0;
  clickedOptions.value.clear();
  pendingBadges.value = [];
  badges.value.forEach((b) => {
    b.unlocked = b.id === "welcome";
    b.justUnlocked = false;
  });
}
</script>

<style scoped>
/* Actions panel */
.actions-enter-active, .actions-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  75% {
    transform: translateX(6px);
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

/* Fade scale for all collected view */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

/* Tooltip transition */
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.15s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
}

/* Celebration overlay */
.celebration-enter-active,
.celebration-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.celebration-enter-from,
.celebration-leave-to {
  opacity: 0;
}

.celebration-pop {
  animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Badge bounce */
.animate-bounce-badge {
  animation: bounce-badge 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounce-badge {
  0% {
    transform: scale(0) rotate(-10deg);
  }
  50% {
    transform: scale(1.2) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* Slow ping for sparkle ring */
.animate-ping-slow {
  animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Confetti falling */
.confetti-particle {
  animation: confetti-fall 2s ease-out forwards;
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
    transform: translateY(450px) rotate(720deg) translateX(var(--drift))
      scale(0.5);
    opacity: 0;
  }
}

/* Badge bounce */
.animate-bounce-once {
  animation: bounce-once 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes ping-once {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

/* Slow bounce for trophy */
.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Animated gradient background */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Floating emojis */
.animate-float {
  animation: float-around 10s ease-in-out infinite;
}

@keyframes float-around {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -20px) rotate(5deg);
  }
  50% {
    transform: translate(-10px, -10px) rotate(-5deg);
  }
  75% {
    transform: translate(5px, -25px) rotate(3deg);
  }
}

/* Sparkle particles */
.animate-sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Badge pop in */
.badge-pop {
  animation: badge-pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
}

@keyframes badge-pop-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Score reveal animation */
.score-reveal {
  animation: score-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes score-in {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

/* Badges arc animation */
.badge-arc {
  animation: badge-float-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

@keyframes badge-float-in {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Orbiting badges */
.intro-orbit-1 {
  animation: orbit-float 3s ease-in-out infinite;
}
.intro-orbit-2 {
  animation: orbit-float 3s ease-in-out infinite 0.5s;
}
.intro-orbit-3 {
  animation: orbit-float 3s ease-in-out infinite 1s;
}

@keyframes orbit-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* Floating button animation */
.intro-btn-float {
  animation: btn-float 3s ease-in-out infinite;
}

.intro-btn-glow {
  animation: btn-glow-pulse 2s ease-in-out infinite;
}

@keyframes btn-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes btn-glow-pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.intro-btn-shine {
  animation: btn-shine 2.5s ease-in-out infinite;
}

@keyframes btn-shine {
  0% {
    transform: translateX(-100%);
  }
  50%,
  100% {
    transform: translateX(100%);
  }
}

/* Golden particles rising */
.particle-rise {
  animation: rise-up 4s ease-out infinite;
}

@keyframes rise-up {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-400px) scale(0.5);
  }
}

/* Flash feedback overlay */
.flash-enter-active,
.flash-leave-active {
  transition: all 0.15s ease-out;
}
.flash-enter-from {
  opacity: 0;
  transform: scale(1.5);
}
.flash-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.feedback-text {
  text-shadow: 0 0 40px currentColor, 0 0 80px currentColor;
  animation: feedback-pulse 0.4s ease-out;
}

@keyframes feedback-pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Dramatic warning modal */
.dramatic-enter-active,
.dramatic-leave-active {
  transition: all 0.2s ease-out;
}
.dramatic-enter-from,
.dramatic-leave-to {
  opacity: 0;
}

.warning-shake {
  animation: shake-warning 0.5s ease-in-out infinite;
}

@keyframes shake-warning {
  0%,
  100% {
    transform: translateX(0) rotate(0);
  }
  25% {
    transform: translateX(-2px) rotate(-0.5deg);
  }
  75% {
    transform: translateX(2px) rotate(0.5deg);
  }
}

.animate-pulse-fast {
  animation: pulse-fast 0.3s ease-in-out infinite;
}

@keyframes pulse-fast {
  0%,
  100% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
