<template>
  <div>
    <div
      ref="gameContainer"
      class="relative w-full max-w-xl mx-auto h-[480px] rounded-2xl overflow-hidden select-none outline-none focus:outline-none"
      :style="{
        background:
          'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
      }"
      tabindex="0"
      @mousemove="handleMouseMove"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @click="handleClick"
    >
      <!-- Starfield background -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          v-for="star in stars"
          :key="star.id"
          class="absolute rounded-full bg-purple-300"
          :style="{
            left: star.x + '%',
            top: star.y + '%',
            width: star.size + 'px',
            height: star.size + 'px',
            opacity: star.opacity,
          }"
        ></div>
      </div>

      <!-- Floating targets -->
      <div
        v-for="target in activeTargets"
        :key="target.id"
        class="absolute flex items-center gap-2 px-3 py-2 rounded-xl transition-transform"
        :class="getTargetClasses(target)"
        :style="getTargetStyle(target)"
      >
        <div class="relative">
          <img
            v-if="target.logoUrl && !target.isMalware"
            :src="target.logoUrl"
            class="rounded"
            :class="[
              target.caught ? 'grayscale opacity-50' : '',
              target.isTiny
                ? 'w-4 h-4'
                : target.isGiant
                ? 'w-10 h-10'
                : 'w-6 h-6',
            ]"
            :alt="target.displayName"
          />
          <span v-if="target.isMalware" class="text-lg">{{
            target.caught ? "💀" : "🐛"
          }}</span>
        </div>
        <span
          class="font-medium whitespace-nowrap"
          :class="[
            getTargetTextClass(target),
            target.isTiny
              ? 'text-xs'
              : target.isGiant
              ? 'text-base'
              : 'text-sm',
          ]"
        >
          {{ target.isMalware ? "BUG!" : target.displayName }}
        </span>
        <!-- Health indicator for armored/giant -->
        <span
          v-if="target.maxHealth > 1 && !target.caught"
          class="text-xs font-bold px-1.5 py-0.5 rounded"
          :class="[
            target.isGiant
              ? target.health > 2
                ? 'bg-orange-500 text-white'
                : 'bg-red-500 text-white animate-pulse'
              : target.health === target.maxHealth
              ? 'bg-blue-500 text-white'
              : 'bg-orange-500 text-white animate-pulse',
          ]"
        >
          {{ target.health }}×
        </span>
        <!-- Type indicators -->
        <span v-if="target.isFast && !target.caught" class="text-xs">⚡</span>
        <span v-if="target.isZigzag && !target.caught" class="text-xs">〰️</span>
        <span v-if="target.isGiant && !target.caught" class="text-sm">👑</span>
      </div>

      <!-- Angry founder popups -->
      <TransitionGroup name="founder">
        <div
          v-for="founder in angryFounders"
          :key="founder.id"
          class="absolute pointer-events-none z-50 flex flex-col items-center"
          :style="{
            left: founder.x + 'px',
            top: founder.y + 'px',
            transform: 'translate(-50%, -50%)',
          }"
        >
          <!-- Photo + angry emoji -->
          <div class="relative">
            <div
              class="w-12 h-12 rounded-full overflow-hidden shadow-lg bg-gray-100"
            >
              <img
                :src="founder.avatar"
                class="w-full h-full object-cover"
                alt="Founder"
              />
            </div>
            <span class="absolute -top-2 -right-2 text-2xl drop-shadow-md"
              >😡</span
            >
          </div>

          <!-- Name below -->
          <span
            class="mt-1 text-xs font-bold text-gray-800 bg-white/90 px-2 py-0.5 rounded-full shadow"
            >{{ founder.name?.split(" ")[0] }}</span
          >
        </div>
      </TransitionGroup>

      <!-- Devil popup for bugs -->
      <TransitionGroup name="devil">
        <div
          v-for="devil in devilPopups"
          :key="devil.id"
          class="absolute pointer-events-none"
          :style="{
            left: devil.x + 'px',
            top: devil.y + 'px',
            transform: 'translate(-50%, -50%)',
          }"
        >
          <div class="text-5xl animate-devil">😈</div>
        </div>
      </TransitionGroup>

      <!-- Bullets -->
      <div
        v-for="bullet in bullets"
        :key="bullet.id"
        class="absolute w-3 h-5 rounded-full"
        :style="{
          left: bullet.x + 'px',
          top: bullet.y + 'px',
          background: 'linear-gradient(180deg, #fbbf24, #f59e0b)',
          boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
        }"
      ></div>

      <!-- Hit effects -->
      <div
        v-for="effect in hitEffects"
        :key="effect.id"
        class="absolute pointer-events-none text-2xl animate-ping"
        :style="{
          left: effect.x + 'px',
          top: effect.y + 'px',
          transform: 'translate(-50%, -50%)',
        }"
      >
        {{ effect.emoji }}
      </div>

      <!-- Player ship -->
      <div
        class="absolute bottom-6"
        :style="{
          left: playerX + 'px',
          transform: 'translateX(-50%)',
          transition: 'left 0.05s linear',
        }"
      >
        <div class="relative">
          <div class="w-12 h-8 relative">
            <div
              class="absolute inset-0 clip-ship"
              :style="{
                background: 'linear-gradient(180deg, #a78bfa, #7c3aed)',
              }"
            ></div>
            <div
              class="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-3 rounded-t-full bg-purple-300/80"
            ></div>
          </div>
          <div
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 rounded-b-full opacity-80"
            :style="{
              background: 'radial-gradient(ellipse, #fbbf24, transparent)',
            }"
          ></div>
        </div>
      </div>

      <!-- Score -->
      <div class="absolute top-4 right-4 text-right">
        <div class="text-3xl font-bold text-purple-600 tabular-nums">
          {{ score }}
        </div>
        <div
          class="text-[10px] text-purple-400 font-medium uppercase tracking-wider"
        >
          caught
        </div>
      </div>

      <!-- Lives -->
      <div class="absolute top-4 left-4">
        <div class="flex gap-1">
          <div
            v-for="i in maxLives"
            :key="i"
            class="w-5 h-5 transition-all duration-300 relative"
            :class="
              i <= lives
                ? 'opacity-100 scale-100'
                : 'opacity-20 scale-90 grayscale'
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              class="text-red-500 drop-shadow-sm"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <!-- Crack overlay for lost hearts -->
            <svg
              v-if="i > lives"
              viewBox="0 0 24 24"
              class="absolute inset-0 w-full h-full text-gray-600"
            >
              <path
                d="M12 4 L14 10 L10 12 L13 18"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Remaining pieces -->
      <div class="absolute top-14 left-4 group cursor-help">
        <div class="flex items-center gap-1.5 text-purple-400">
          <span class="text-lg font-bold tabular-nums">{{
            remainingPieces
          }}</span>
          <span class="text-xs uppercase tracking-wider">left</span>
        </div>
        <div
          class="absolute left-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30"
        >
          <div
            class="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
          >
            Sorry, we have too many pieces 😫
          </div>
        </div>
      </div>

      <!-- Challenge badges -->
      <div class="absolute top-24 right-4 flex gap-2">
        <div
          v-if="armoredActive"
          class="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-xs"
        >
          🛡️
        </div>
        <div
          v-if="speedActive"
          class="w-6 h-6 rounded bg-amber-100 flex items-center justify-center text-xs"
        >
          ⚡
        </div>
        <div
          v-if="bugsActive"
          class="w-6 h-6 rounded bg-red-100 flex items-center justify-center text-xs"
        >
          🐛
        </div>
      </div>

      <!-- Ammo indicator -->
      <div class="absolute bottom-4 right-4 flex gap-1">
        <div
          v-for="i in maxAmmo"
          :key="i"
          class="w-1.5 h-4 rounded-full transition-all duration-150"
          :class="i <= ammo ? 'bg-amber-400' : 'bg-gray-300'"
        ></div>
      </div>

      <!-- Start prompt with subtle overlay -->
      <div
        v-if="!gameStarted"
        class="absolute inset-0 flex items-center justify-center z-10 bg-white/70"
      >
        <!-- Floating mini apps in background -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            class="absolute top-8 left-8 text-2xl opacity-20 animate-float-random"
          >
            📱
          </div>
          <div
            class="absolute top-12 right-12 text-xl opacity-15 animate-float-random"
            style="animation-delay: 0.5s"
          >
            💬
          </div>
          <div
            class="absolute bottom-16 left-16 text-2xl opacity-20 animate-float-random"
            style="animation-delay: 1s"
          >
            📊
          </div>
          <div
            class="absolute bottom-10 right-10 text-xl opacity-15 animate-float-random"
            style="animation-delay: 1.5s"
          >
            📧
          </div>
          <div
            class="absolute top-1/3 left-6 text-lg opacity-10 animate-float-random"
            style="animation-delay: 0.8s"
          >
            🗂️
          </div>
          <div
            class="absolute top-1/4 right-8 text-lg opacity-10 animate-float-random"
            style="animation-delay: 1.2s"
          >
            📅
          </div>
        </div>

        <div class="text-center relative z-10">
          <div class="text-5xl mb-3 animate-bounce-slow">👾</div>
          <h2 class="text-slate-800 font-black text-2xl mb-5">
            Integration Invasion
          </h2>
          <button
            @click.stop="startGame"
            class="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            Defend
          </button>
          <p class="text-slate-400 text-xs mt-4">🖱️ move · space shoot</p>
        </div>
      </div>

      <!-- Challenge announcement overlay -->
      <Transition name="challenge">
        <div
          v-if="showChallengeOverlay"
          class="absolute inset-0 flex items-center justify-center z-30"
          :style="{ background: challengeBg }"
        >
          <div class="text-center max-w-sm px-6">
            <!-- Preview chip with placeholder + animated badge -->
            <div class="mb-8 flex justify-center">
              <div
                class="inline-flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl bg-white/95"
              >
                <!-- Placeholder icon -->
                <div
                  class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0"
                >
                  <span v-if="challengeType === 'bugs'" class="text-2xl"
                    >🐛</span
                  >
                  <div v-else class="w-6 h-6 rounded bg-gray-300"></div>
                </div>

                <!-- Placeholder text lines -->
                <div
                  v-if="challengeType !== 'bugs'"
                  class="flex flex-col gap-1.5"
                >
                  <div class="w-14 h-2.5 bg-gray-300 rounded"></div>
                  <div class="w-8 h-2 bg-gray-200 rounded"></div>
                </div>
                <span v-else class="text-base font-bold text-red-500"
                  >AVOID!</span
                >

                <!-- ANIMATED BADGE - the key difference -->
                <div
                  v-if="challengeType === 'armored'"
                  class="animate-badge-drop ml-2"
                >
                  <span
                    class="text-2xl font-black px-4 py-2 rounded-xl bg-blue-500 text-white shadow-xl animate-pulse-glow"
                    >2×</span
                  >
                </div>
                <div
                  v-if="challengeType === 'speed'"
                  class="animate-badge-zoom ml-2"
                >
                  <span class="text-5xl drop-shadow-xl animate-flash">⚡</span>
                </div>
                <div
                  v-if="challengeType === 'bugs'"
                  class="animate-badge-shake ml-2"
                >
                  <span class="text-4xl animate-wiggle-continuous">💀</span>
                </div>
                <div
                  v-if="challengeType === 'ghost'"
                  class="animate-badge-fade ml-2"
                >
                  <span class="text-5xl opacity-40 animate-pulse">👻</span>
                </div>
                <div
                  v-if="challengeType === 'tiny'"
                  class="animate-badge-zoom ml-2"
                >
                  <span class="text-2xl drop-shadow-xl">🔬</span>
                </div>
                <div
                  v-if="challengeType === 'zigzag'"
                  class="animate-badge-shake ml-2"
                >
                  <span class="text-5xl animate-zigzag">〰️</span>
                </div>
                <div
                  v-if="challengeType === 'giant'"
                  class="animate-badge-drop ml-2"
                >
                  <span
                    class="text-2xl font-black px-4 py-2 rounded-xl bg-orange-500 text-white shadow-xl animate-pulse-glow"
                    >5×</span
                  >
                  <span class="text-4xl ml-2">👑</span>
                </div>
                <div
                  v-if="challengeType === 'swarm'"
                  class="animate-badge-zoom ml-2 flex gap-1"
                >
                  <span
                    class="text-3xl animate-bounce"
                    style="animation-delay: 0s"
                    >📦</span
                  >
                  <span
                    class="text-3xl animate-bounce"
                    style="animation-delay: 0.1s"
                    >📦</span
                  >
                  <span
                    class="text-3xl animate-bounce"
                    style="animation-delay: 0.2s"
                    >📦</span
                  >
                </div>
              </div>
            </div>

            <!-- Game title -->
            <div class="mb-6">
              <h2
                class="text-white font-black text-4xl uppercase tracking-tight drop-shadow-lg"
              >
                {{ challengeTitle }}
              </h2>
              <p class="text-white/90 text-lg mt-2">{{ challengeDesc }}</p>
            </div>

            <!-- Arcade button -->
            <button
              @click="dismissChallenge"
              class="relative px-12 py-4 font-black text-xl uppercase tracking-widest rounded-xl transform hover:scale-105 active:scale-95 transition-all border-b-4"
              :class="challengeButtonClass"
            >
              LET'S GO!
            </button>

            <p class="text-white/40 text-xs mt-5 uppercase tracking-widest">
              [ SPACE ]
            </p>
          </div>
        </div>
      </Transition>

      <!-- Heart broken effect - CENTER SCREEN -->
      <Transition name="heart-break">
        <div
          v-if="heartBroken"
          class="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
        >
          <div class="text-7xl animate-heart-break drop-shadow-2xl">💔</div>
        </div>
      </Transition>

      <!-- Game over -->
      <Transition name="gameover">
        <div
          v-if="gameOver"
          class="absolute inset-0 flex items-center justify-center z-20 overflow-hidden"
          :style="getGameOverBg"
        >
          <!-- Floating emojis background -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              v-for="i in 12"
              :key="i"
              class="absolute text-3xl opacity-20 animate-float-random"
              :style="{
                left: i * 8 + '%',
                top: 10 + (i % 5) * 18 + '%',
                animationDelay: i * 0.2 + 's',
              }"
            >
              {{ getGameOverEmoji(i) }}
            </div>
          </div>

          <div class="text-center relative z-10">
            <!-- Big dramatic emoji based on score -->
            <div class="text-8xl mb-2 animate-bounce-slow">
              {{ getMainGameOverEmoji }}
            </div>

            <!-- Title based on score -->
            <p
              class="text-white/80 text-lg font-bold uppercase tracking-widest mb-4"
            >
              {{ getGameOverTitle }}
            </p>

            <!-- Score with flair -->
            <div class="mb-4">
              <p
                class="text-white font-black text-7xl tabular-nums drop-shadow-lg"
              >
                {{ score }}
              </p>
              <p class="text-white/60 text-sm uppercase tracking-widest mt-1">
                integrations hunted
              </p>
            </div>

            <!-- Unlocked challenges showcase -->
            <div
              v-if="unlockedChallengesCount > 0"
              class="mb-6 flex justify-center gap-2 flex-wrap"
            >
              <span v-if="armoredActive" class="text-2xl" title="Armored"
                >🛡️</span
              >
              <span v-if="speedActive" class="text-2xl" title="Speedy">⚡</span>
              <span v-if="bugsActive" class="text-2xl" title="Bugs">🐛</span>
              <span v-if="ghostActive" class="text-2xl" title="Ghosts">👻</span>
              <span v-if="tinyActive" class="text-2xl" title="Tiny">🔬</span>
              <span v-if="zigzagActive" class="text-2xl" title="Zigzag"
                >〰️</span
              >
              <span v-if="giantActive" class="text-2xl" title="Giant">👑</span>
              <span v-if="swarmActive" class="text-2xl" title="Swarm">🌊</span>
            </div>

            <!-- Retry button -->
            <button
              @click.stop="startGame"
              class="px-12 py-4 font-black text-xl rounded-xl shadow-2xl transform hover:scale-110 active:scale-95 transition-all uppercase tracking-wider border-b-4"
              :class="getGameOverButtonClass"
            >
              {{ getGameOverButtonText }}
            </button>
          </div>
        </div>
      </Transition>

      <!-- Total count watermark -->
      <div
        class="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none"
      >
        <div
          class="text-[70px] font-bold text-purple-200/30 leading-none tabular-nums"
        >
          {{ totalCount }}+
        </div>
      </div>
    </div>

    <!-- Review button (dev only) -->
    <button
      @click="openReview"
      class="mt-4 mx-auto block text-xs text-gray-400 hover:text-gray-600 underline"
    >
      Review founder photos
    </button>

    <!-- Review Modal -->
    <FounderPhotoReview ref="reviewModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import FounderPhotoReview from "./FounderPhotoReview.vue";

const gameContainer = ref(null);
const reviewModal = ref(null);

const openReview = () => {
  reviewModal.value?.open();
};
const pieces = ref([]);
const piecesWithFounders = ref([]);
const piecesWithoutFounders = ref([]);
const foundersData = ref({});
const totalCount = ref(0);

// Game state
const gameStarted = ref(false);
const gameOver = ref(false);
const gameOverReason = ref("");
const gamePaused = ref(false);
const score = ref(0);
const lives = ref(5);
const maxLives = 5;
const heartBroken = ref(false);
const ammo = ref(6);
const maxAmmo = 6;

// Challenge states
const armoredActive = ref(false);
const speedActive = ref(false);
const bugsActive = ref(false);
const ghostActive = ref(false);
const tinyActive = ref(false);
const zigzagActive = ref(false);
const giantActive = ref(false);
const swarmActive = ref(false);

// Challenge overlay
const showChallengeOverlay = ref(false);
const challengeType = ref("");
const challengeTitle = ref("");
const challengeDesc = ref("");
const challengeBg = ref("");
const challengePreviewClass = ref("");
const challengePreviewTextClass = ref("");
const challengeButtonClass = ref("");
const challengeButtonGlow = ref("");

// Game over computed properties
const unlockedChallengesCount = computed(() => {
  let count = 0;
  if (armoredActive.value) count++;
  if (speedActive.value) count++;
  if (bugsActive.value) count++;
  if (ghostActive.value) count++;
  if (tinyActive.value) count++;
  if (zigzagActive.value) count++;
  if (giantActive.value) count++;
  if (swarmActive.value) count++;
  return count;
});

const getGameOverBg = computed(() => {
  if (score.value >= 125)
    return "background: radial-gradient(circle at center, rgba(168, 85, 247, 0.95), rgba(88, 28, 135, 0.98))";
  if (score.value >= 80)
    return "background: radial-gradient(circle at center, rgba(234, 88, 12, 0.95), rgba(124, 45, 18, 0.98))";
  if (score.value >= 45)
    return "background: radial-gradient(circle at center, rgba(59, 130, 246, 0.95), rgba(30, 58, 138, 0.98))";
  if (score.value >= 20)
    return "background: radial-gradient(circle at center, rgba(34, 197, 94, 0.9), rgba(22, 101, 52, 0.98))";
  return "background: radial-gradient(circle at center, rgba(127, 29, 29, 0.95), rgba(0, 0, 0, 0.98))";
});

const getMainGameOverEmoji = computed(() => {
  if (score.value >= 125) return "🏆";
  if (score.value >= 100) return "🔥";
  if (score.value >= 80) return "⭐";
  if (score.value >= 60) return "😎";
  if (score.value >= 45) return "💪";
  if (score.value >= 30) return "👍";
  if (score.value >= 15) return "😅";
  return "😵";
});

const getGameOverTitle = computed(() => {
  if (score.value >= 125) return "LEGENDARY HUNTER!";
  if (score.value >= 100) return "UNSTOPPABLE!";
  if (score.value >= 80) return "INTEGRATION MASTER!";
  if (score.value >= 60) return "SERIOUSLY SKILLED!";
  if (score.value >= 45) return "IMPRESSIVE RUN!";
  if (score.value >= 30) return "SOLID EFFORT!";
  if (score.value >= 15) return "GETTING THERE!";
  return "GAME OVER";
});

const getGameOverButtonClass = computed(() => {
  if (score.value >= 80)
    return "bg-purple-600 hover:bg-purple-500 text-white border-purple-800";
  if (score.value >= 45)
    return "bg-blue-600 hover:bg-blue-500 text-white border-blue-800";
  if (score.value >= 20)
    return "bg-green-600 hover:bg-green-500 text-white border-green-800";
  return "bg-red-600 hover:bg-red-500 text-white border-red-800";
});

const getGameOverButtonText = computed(() => {
  if (score.value >= 100) return "👑 GO AGAIN!";
  if (score.value >= 60) return "🔥 BEAT IT!";
  if (score.value >= 30) return "💪 TRY AGAIN!";
  return "🔄 RETRY";
});

const getGameOverEmoji = (index) => {
  const pool =
    score.value >= 60
      ? ["🎯", "✨", "🚀", "💫", "⭐", "🔥", "💎", "🎮", "🏆", "👑", "🌟", "💪"]
      : [
          "😵",
          "💀",
          "😢",
          "🪦",
          "💔",
          "😭",
          "🐛",
          "👻",
          "😰",
          "🥺",
          "😿",
          "💨",
        ];
  return pool[index % pool.length];
};

// Player
const playerX = ref(260);
const targetPlayerX = ref(260);

// Targets, bullets, effects
const activeTargets = ref([]);
const bullets = ref([]);
const hitEffects = ref([]);
const angryFounders = ref([]);
const devilPopups = ref([]);
const stars = ref([]);

// Controls
const keysPressed = ref({ left: false, right: false });
const playerSpeed = 14;

// Remaining pieces
const remainingPieces = computed(() => {
  return Math.max(0, totalCount.value - score.value);
});

// Generate stars
for (let i = 0; i < 30; i++) {
  stars.value.push({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  });
}

// Watch score for challenges - spread out unlocks for pacing
watch(score, (newScore) => {
  if (newScore === 8 && !armoredActive.value) {
    showChallenge("armored");
  } else if (newScore === 18 && !speedActive.value) {
    showChallenge("speed");
  } else if (newScore === 30 && !bugsActive.value) {
    showChallenge("bugs");
  } else if (newScore === 45 && !ghostActive.value) {
    showChallenge("ghost");
  } else if (newScore === 60 && !tinyActive.value) {
    showChallenge("tiny");
  } else if (newScore === 80 && !zigzagActive.value) {
    showChallenge("zigzag");
  } else if (newScore === 100 && !giantActive.value) {
    showChallenge("giant");
  } else if (newScore === 125 && !swarmActive.value) {
    showChallenge("swarm");
  }
});

const showChallenge = (type) => {
  gamePaused.value = true;
  showChallengeOverlay.value = true;
  challengeType.value = type;

  if (type === "armored") {
    armoredActive.value = true;
    challengeTitle.value = "TOUGH ONES!";
    challengeDesc.value = "Hit them twice to catch";
    challengeBg.value =
      "linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(59, 130, 246, 0.95))";
    challengePreviewClass.value = "bg-blue-50 border-2 border-blue-300";
    challengePreviewTextClass.value = "text-gray-700";
    challengeButtonClass.value =
      "bg-blue-600 hover:bg-blue-500 text-white shadow-xl border-blue-800";
    challengeButtonGlow.value = "bg-blue-400 blur-sm";
  } else if (type === "speed") {
    speedActive.value = true;
    challengeTitle.value = "SPEEDY!";
    challengeDesc.value = "Some are fast now. Stay sharp!";
    challengeBg.value =
      "linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(251, 191, 36, 0.95))";
    challengePreviewClass.value = "bg-amber-50 border-2 border-amber-300";
    challengePreviewTextClass.value = "text-amber-700";
    challengeButtonClass.value =
      "bg-amber-500 hover:bg-amber-400 text-white shadow-xl border-amber-700";
    challengeButtonGlow.value = "bg-amber-400 blur-sm";
  } else if (type === "bugs") {
    bugsActive.value = true;
    challengeTitle.value = "WATCH OUT!";
    challengeDesc.value = "Bugs appeared. Don't hit them!";
    challengeBg.value =
      "linear-gradient(135deg, rgba(220, 38, 38, 0.95), rgba(239, 68, 68, 0.95))";
    challengePreviewClass.value = "bg-red-50 border-2 border-red-300";
    challengePreviewTextClass.value = "text-red-600 font-bold";
    challengeButtonClass.value =
      "bg-red-600 hover:bg-red-500 text-white shadow-xl border-red-800";
    challengeButtonGlow.value = "bg-red-400 blur-sm";
  } else if (type === "ghost") {
    ghostActive.value = true;
    challengeTitle.value = "GHOST MODE!";
    challengeDesc.value = "Semi-transparent targets incoming";
    challengeBg.value =
      "linear-gradient(135deg, rgba(107, 114, 128, 0.95), rgba(156, 163, 175, 0.95))";
    challengePreviewClass.value =
      "bg-gray-50 border-2 border-gray-300 opacity-40";
    challengePreviewTextClass.value = "text-gray-500";
    challengeButtonClass.value =
      "bg-gray-600 hover:bg-gray-500 text-white shadow-xl border-gray-800";
    challengeButtonGlow.value = "bg-gray-400 blur-sm";
  } else if (type === "tiny") {
    tinyActive.value = true;
    challengeTitle.value = "TINY TERRORS!";
    challengeDesc.value = "Smaller targets. Aim carefully!";
    challengeBg.value =
      "linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(192, 132, 252, 0.95))";
    challengePreviewClass.value =
      "bg-purple-50 border-2 border-purple-300 scale-75";
    challengePreviewTextClass.value = "text-purple-600";
    challengeButtonClass.value =
      "bg-purple-600 hover:bg-purple-500 text-white shadow-xl border-purple-800";
    challengeButtonGlow.value = "bg-purple-400 blur-sm";
  } else if (type === "zigzag") {
    zigzagActive.value = true;
    challengeTitle.value = "ZIGZAG!";
    challengeDesc.value = "They're dodging now. Predict their path!";
    challengeBg.value =
      "linear-gradient(135deg, rgba(6, 182, 212, 0.95), rgba(34, 211, 238, 0.95))";
    challengePreviewClass.value = "bg-cyan-50 border-2 border-cyan-300";
    challengePreviewTextClass.value = "text-cyan-600";
    challengeButtonClass.value =
      "bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl border-cyan-800";
    challengeButtonGlow.value = "bg-cyan-400 blur-sm";
  } else if (type === "giant") {
    giantActive.value = true;
    challengeTitle.value = "BOSS TIME!";
    challengeDesc.value = "Big one incoming. 5 hits to catch!";
    challengeBg.value =
      "linear-gradient(135deg, rgba(234, 88, 12, 0.95), rgba(249, 115, 22, 0.95))";
    challengePreviewClass.value =
      "bg-orange-50 border-2 border-orange-400 scale-125";
    challengePreviewTextClass.value = "text-orange-600 font-black";
    challengeButtonClass.value =
      "bg-orange-600 hover:bg-orange-500 text-white shadow-xl border-orange-800";
    challengeButtonGlow.value = "bg-orange-400 blur-sm";
  } else if (type === "swarm") {
    swarmActive.value = true;
    challengeTitle.value = "SWARM INCOMING!";
    challengeDesc.value = "Multiple targets at once!";
    challengeBg.value =
      "linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(244, 114, 182, 0.95))";
    challengePreviewClass.value = "bg-pink-50 border-2 border-pink-300";
    challengePreviewTextClass.value = "text-pink-600";
    challengeButtonClass.value =
      "bg-pink-600 hover:bg-pink-500 text-white shadow-xl border-pink-800";
    challengeButtonGlow.value = "bg-pink-400 blur-sm";
  }
};

const dismissChallenge = () => {
  showChallengeOverlay.value = false;
  gamePaused.value = false;
};

// Fetch pieces and founders data
onMounted(async () => {
  try {
    // Fetch founders data
    const foundersRes = await fetch("/data/pieces-founders.json");
    if (foundersRes.ok) {
      foundersData.value = await foundersRes.json();
    }
  } catch (error) {
    console.log("No founders data available, using fallbacks");
  }

  try {
    const response = await fetch(
      "https://cloud.activepieces.com/api/v1/pieces"
    );
    const data = await response.json();

    if (Array.isArray(data)) {
      const allPieces = data.map((p) => {
        const pieceName = p.name.replace("@activepieces/piece-", "");
        const founderInfo = foundersData.value[pieceName];

        return {
          name: p.name,
          pieceName: pieceName,
          displayName: p.displayName,
          logoUrl: p.logoUrl,
          founderPhoto: founderInfo?.founder?.photo || null,
          founderName: founderInfo?.founder?.name || null,
        };
      });

      pieces.value = allPieces;
      piecesWithFounders.value = allPieces.filter((p) => p.founderPhoto);
      piecesWithoutFounders.value = allPieces.filter((p) => !p.founderPhoto);
      totalCount.value = data.length;

      console.log(
        `Loaded ${piecesWithFounders.value.length} pieces with founder photos (prioritized)`
      );
    }
  } catch (error) {
    console.error("Failed to fetch pieces:", error);
  }
});

let gameLoop = null;
let spawnTimer = null;
let ammoTimer = null;
let targetIdCounter = 0;
let bulletIdCounter = 0;
let effectIdCounter = 0;
let founderIdCounter = 0;
let devilIdCounter = 0;
let lastTime = 0;

const startGame = () => {
  gameOver.value = false;
  gameOverReason.value = "";
  score.value = 0;
  lives.value = 5;
  heartBroken.value = false;
  ammo.value = maxAmmo;
  activeTargets.value = [];
  bullets.value = [];
  hitEffects.value = [];
  angryFounders.value = [];
  devilPopups.value = [];
  // Reset all challenge states
  armoredActive.value = false;
  speedActive.value = false;
  bugsActive.value = false;
  ghostActive.value = false;
  tinyActive.value = false;
  zigzagActive.value = false;
  giantActive.value = false;
  swarmActive.value = false;

  gameStarted.value = true;
  gameContainer.value?.focus();

  spawnTarget();
  spawnTimer = setInterval(() => {
    if (activeTargets.value.length < 6 && !gamePaused.value) {
      spawnTarget();
    }
  }, 1300);

  ammoTimer = setInterval(() => {
    if (ammo.value < maxAmmo) {
      ammo.value++;
    }
  }, 600);

  if (!gameLoop) {
    lastTime = performance.now();
    gameLoop = requestAnimationFrame(update);
  }
};

const spawnTarget = () => {
  if (pieces.value.length === 0) return;

  // Swarm mode - spawn 3 at once
  const spawnCount = swarmActive.value && Math.random() < 0.25 ? 3 : 1;

  for (let s = 0; s < spawnCount; s++) {
    // Prioritize pieces with founder photos (80% chance)
    let piece;
    if (piecesWithFounders.value.length > 0 && Math.random() < 0.8) {
      piece =
        piecesWithFounders.value[
          Math.floor(Math.random() * piecesWithFounders.value.length)
        ];
    } else if (piecesWithoutFounders.value.length > 0) {
      piece =
        piecesWithoutFounders.value[
          Math.floor(Math.random() * piecesWithoutFounders.value.length)
        ];
    } else {
      piece = pieces.value[Math.floor(Math.random() * pieces.value.length)];
    }

    // Build weighted pool of possible types
    const typePool = [];

    // Normal pieces always available (weight decreases as game progresses)
    const normalWeight = Math.max(30, 70 - score.value);
    for (let i = 0; i < normalWeight; i++) typePool.push("normal");

    // Add special types based on what's unlocked
    if (armoredActive.value) {
      for (let i = 0; i < 15; i++) typePool.push("armored");
    }
    if (speedActive.value) {
      for (let i = 0; i < 18; i++) typePool.push("fast");
    }
    if (bugsActive.value) {
      for (let i = 0; i < 12; i++) typePool.push("bug");
    }
    if (ghostActive.value) {
      for (let i = 0; i < 16; i++) typePool.push("ghost");
    }
    if (tinyActive.value) {
      for (let i = 0; i < 18; i++) typePool.push("tiny");
    }
    if (zigzagActive.value) {
      for (let i = 0; i < 20; i++) typePool.push("zigzag");
    }
    if (giantActive.value) {
      for (let i = 0; i < 5; i++) typePool.push("giant");
    }

    // Pick random type from pool
    const selectedType = typePool[Math.floor(Math.random() * typePool.length)];

    const isMalware = selectedType === "bug";
    const isFast = selectedType === "fast";
    const isArmored = selectedType === "armored";
    const isGhost = selectedType === "ghost";
    const isTiny = selectedType === "tiny";
    const isZigzag = selectedType === "zigzag";
    const isGiant = selectedType === "giant";

    // Base speed increases with difficulty
    let baseSpeed = 1;
    if (isFast) baseSpeed = 3.5;
    else if (isZigzag) baseSpeed = 1.8;
    else if (score.value > 80) baseSpeed = 2;
    else if (score.value > 50) baseSpeed = 1.6;
    else if (score.value > 30) baseSpeed = 1.3;

    // Health - giants take 5 hits, armored take 2
    let health = 1;
    if (isGiant) health = 5;
    else if (isArmored) health = 2;

    activeTargets.value.push({
      id: targetIdCounter++,
      displayName: piece.displayName,
      logoUrl: piece.logoUrl,
      founderPhoto: piece.founderPhoto,
      founderName: piece.founderName,
      isMalware,
      isFast,
      isGhost,
      isTiny,
      isZigzag,
      isGiant,
      health,
      maxHealth: health,
      x: Math.random() * 360 + 70,
      y: -45,
      vx: (Math.random() - 0.5) * (isFast ? 5 : isZigzag ? 1 : 2.5),
      vy: Math.random() * baseSpeed + baseSpeed * 0.6,
      zigzagPhase: Math.random() * Math.PI * 2,
      caught: false,
      fadeOut: false,
    });
  }
};

const shoot = () => {
  if (ammo.value <= 0 || gameOver.value || gamePaused.value) return;

  ammo.value--;
  bullets.value.push({
    id: bulletIdCounter++,
    x: playerX.value - 6,
    y: 415,
    vy: -18,
  });
};

const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

const update = (currentTime) => {
  if (!gameStarted.value || gameOver.value) {
    gameLoop = null;
    return;
  }

  const deltaTime = Math.min((currentTime - lastTime) / 16.67, 3);
  lastTime = currentTime;

  if (gamePaused.value) {
    gameLoop = requestAnimationFrame(update);
    return;
  }

  // Smooth keyboard movement
  if (keysPressed.value.left) {
    targetPlayerX.value = Math.max(
      30,
      targetPlayerX.value - playerSpeed * deltaTime
    );
  }
  if (keysPressed.value.right) {
    targetPlayerX.value = Math.min(
      490,
      targetPlayerX.value + playerSpeed * deltaTime
    );
  }

  playerX.value = lerp(playerX.value, targetPlayerX.value, 0.35);

  // Move targets
  activeTargets.value.forEach((target) => {
    if (!target.caught) {
      // Zigzag movement
      if (target.isZigzag) {
        target.zigzagPhase += 0.15 * deltaTime;
        target.x += Math.sin(target.zigzagPhase) * 4 * deltaTime;
      }

      target.x += target.vx * deltaTime;
      target.y += target.vy * deltaTime;

      if (target.x < 30 || target.x > 410) {
        target.vx *= -1;
        target.x = Math.max(30, Math.min(410, target.x));
      }

      // Escaped!
      if (target.y > 490 && !target.caught) {
        target.fadeOut = true;
        // Escaped pieces (not bugs) cost a heart
        if (!target.isMalware) {
          lives.value--;
          heartBroken.value = true;
          setTimeout(() => (heartBroken.value = false), 800);

          if (lives.value <= 0) {
            gameOver.value = true;
            gameOverReason.value = "escaped";
            clearInterval(spawnTimer);
            clearInterval(ammoTimer);
          }
        }
      }
    }
  });

  activeTargets.value = activeTargets.value.filter((t) => !t.fadeOut);

  // Move bullets
  bullets.value.forEach((bullet) => {
    bullet.y += bullet.vy * deltaTime;
  });

  bullets.value = bullets.value.filter((b) => b.y > -20);

  // Collision - precise AABB with actual CSS dimensions
  for (let i = bullets.value.length - 1; i >= 0; i--) {
    const bullet = bullets.value[i];

    for (const target of activeTargets.value) {
      if (target.caught || target.fadeOut) continue;

      // Bullet: w-3 = 12px, h-5 = 20px (Tailwind)
      const bulletW = 12;
      const bulletH = 20;

      // Target: px-3 py-2 + icon(24px) + text(~50px) + gap = roughly 100px wide, ~36px tall
      const targetW = 100;
      const targetH = 36;

      // Bullet bounding box
      const bLeft = bullet.x;
      const bRight = bullet.x + bulletW;
      const bTop = bullet.y;
      const bBottom = bullet.y + bulletH;

      // Target bounding box (exact match to visual)
      const tLeft = target.x;
      const tRight = target.x + targetW;
      const tTop = target.y;
      const tBottom = target.y + targetH;

      // AABB collision: rectangles overlap if they overlap on BOTH axes
      const overlapX = bRight > tLeft && bLeft < tRight;
      const overlapY = bBottom > tTop && bTop < tBottom;

      if (overlapX && overlapY) {
        bullets.value.splice(i, 1);

        target.health--;

        if (target.health <= 0) {
          target.caught = true;

          if (target.isMalware) {
            // Devil popup for bugs
            devilPopups.value.push({
              id: devilIdCounter++,
              x: target.x + targetW / 2,
              y: target.y + targetH / 2,
            });

            setTimeout(() => {
              devilPopups.value.shift();
            }, 1000);
          } else {
            // Angry founder popup - only if we have a real photo
            if (target.founderPhoto) {
              angryFounders.value.push({
                id: founderIdCounter++,
                x: target.x + targetW / 2,
                y: target.y + targetH / 2,
                avatar: target.founderPhoto,
                name: target.founderName,
              });

              setTimeout(() => {
                angryFounders.value.shift();
              }, 1200);
            }
          }

          hitEffects.value.push({
            id: effectIdCounter++,
            x: target.x + targetW / 2,
            y: target.y + targetH / 2,
            emoji: target.isMalware ? "💀" : "✨",
          });

          setTimeout(() => {
            hitEffects.value.shift();
          }, 400);

          if (target.isMalware) {
            lives.value--;
            // Trigger heart broken effect
            heartBroken.value = true;
            setTimeout(() => (heartBroken.value = false), 800);

            if (lives.value <= 0) {
              gameOver.value = true;
              gameOverReason.value = "bugs";
              clearInterval(spawnTimer);
              clearInterval(ammoTimer);
            }
          } else {
            score.value++;
          }

          setTimeout(() => {
            const idx = activeTargets.value.findIndex(
              (t) => t.id === target.id
            );
            if (idx !== -1) {
              activeTargets.value.splice(idx, 1);
            }
          }, 500);
        } else {
          hitEffects.value.push({
            id: effectIdCounter++,
            x: target.x + targetW / 2,
            y: target.y + targetH / 2,
            emoji: "💥",
          });

          setTimeout(() => {
            hitEffects.value.shift();
          }, 300);
        }

        break;
      }
    }
  }

  gameLoop = requestAnimationFrame(update);
};

const getTargetClasses = (target) => {
  if (target.caught) {
    return target.isMalware
      ? "bg-red-200 border-2 border-red-300 opacity-40 scale-75"
      : "bg-green-100 border border-green-200 opacity-40 scale-75";
  }
  if (target.isMalware) {
    return "bg-red-100 border-2 border-red-400 shadow-lg shadow-red-200/50";
  }
  if (target.isGiant) {
    return "bg-gradient-to-br from-orange-100 to-amber-50 border-2 border-orange-400 shadow-xl shadow-orange-300/50 scale-110";
  }
  if (target.isGhost) {
    return "bg-gray-50/60 border border-gray-300/50 shadow-sm backdrop-blur-sm";
  }
  if (target.isTiny) {
    return "bg-purple-50 border border-purple-300 shadow-sm scale-90";
  }
  if (target.isZigzag) {
    return "bg-cyan-50 border border-cyan-300 shadow-md";
  }
  if (target.isFast) {
    return "bg-amber-50 border border-amber-300 shadow-md";
  }
  if (target.maxHealth === 2) {
    return "bg-blue-50 border-2 border-blue-300 shadow-md";
  }
  return "bg-white border border-purple-200 shadow-md";
};

const getTargetTextClass = (target) => {
  if (target.caught) {
    return target.isMalware
      ? "text-red-400 line-through"
      : "text-green-600 line-through";
  }
  if (target.isMalware) return "text-red-600 font-bold";
  if (target.isFast) return "text-amber-700";
  return "text-gray-700";
};

const getTargetStyle = (target) => {
  return {
    left: target.x + "px",
    top: target.y + "px",
    transform: target.caught ? "rotate(8deg)" : "",
    transition: target.caught ? "all 0.3s ease-out" : "none",
    opacity: target.isGhost && !target.caught ? 0.4 : undefined,
  };
};

const handleMouseMove = (e) => {
  if (
    !gameContainer.value ||
    !gameStarted.value ||
    gameOver.value ||
    gamePaused.value
  )
    return;
  const rect = gameContainer.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  targetPlayerX.value = Math.max(30, Math.min(490, x));
};

const handleKeydown = (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") {
    e.preventDefault();
    keysPressed.value.left = true;
  }
  if (e.key === "ArrowRight" || e.key === "d") {
    e.preventDefault();
    keysPressed.value.right = true;
  }
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    if (showChallengeOverlay.value) {
      dismissChallenge();
    } else if (!gameStarted.value || gameOver.value) {
      startGame();
    } else if (!gamePaused.value) {
      shoot();
    }
  }
};

const handleKeyup = (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") {
    keysPressed.value.left = false;
  }
  if (e.key === "ArrowRight" || e.key === "d") {
    keysPressed.value.right = false;
  }
};

const handleClick = (e) => {
  if (showChallengeOverlay.value) return;
  if (!gameStarted.value || gameOver.value) return;
  if (!gamePaused.value) {
    shoot();
  }
  gameContainer.value?.focus();
};

onUnmounted(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop);
  if (spawnTimer) clearInterval(spawnTimer);
  if (ammoTimer) clearInterval(ammoTimer);
});
</script>

<style scoped>
.clip-ship {
  clip-path: polygon(50% 0%, 100% 100%, 75% 100%, 50% 70%, 25% 100%, 0% 100%);
}

.challenge-enter-active {
  animation: challengeIn 0.5s ease-out;
}
.challenge-leave-active {
  animation: challengeOut 0.3s ease-in;
}

@keyframes challengeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes challengeOut {
  to {
    opacity: 0;
  }
}

.founder-enter-active {
  animation: founderIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.4);
}
.founder-leave-active {
  animation: founderOut 0.6s cubic-bezier(0.55, 0, 1, 0.45);
}

@keyframes founderIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -30%) scale(0.3);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes founderOut {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8) translateY(-40px);
  }
}

.animate-float {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.devil-enter-active {
  animation: devilIn 0.4s ease-out;
}
.devil-leave-active {
  animation: devilOut 0.6s ease-out;
}

@keyframes devilIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) rotate(-180deg);
  }
  60% {
    transform: translate(-50%, -50%) scale(1.3) rotate(10deg);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
}

@keyframes devilOut {
  to {
    opacity: 0;
    transform: translate(-50%, -150%) scale(1.5) rotate(20deg);
  }
}

.animate-devil {
  animation: devilShake 0.5s ease-in-out infinite;
}

@keyframes devilShake {
  0%,
  100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

/* Challenge badge animations */
.animate-badge-drop {
  animation: badgeDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes badgeDrop {
  0% {
    opacity: 0;
    transform: translateY(-30px) scale(0.5);
  }
  60% {
    transform: translateY(5px) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-badge-zoom {
  animation: badgeZoom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes badgeZoom {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    transform: scale(1.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-badge-shake {
  animation: badgeShake 0.6s ease-out forwards,
    badgeWiggle 0.3s ease-in-out 0.6s infinite;
}

@keyframes badgeShake {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-20deg);
  }
  50% {
    transform: scale(1.2) rotate(10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes badgeWiggle {
  0%,
  100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

/* Continuous attention animations */
.animate-pulse-glow {
  animation: pulseGlow 1s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.5);
  }
}

.animate-flash {
  animation: flash 0.8s ease-in-out infinite;
}

@keyframes flash {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.15);
  }
}

.animate-wiggle-continuous {
  animation: wiggleContinuous 0.4s ease-in-out infinite;
}

@keyframes wiggleContinuous {
  0%,
  100% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(8deg);
  }
}

/* Heart break animation - centered */
.heart-break-enter-active {
  animation: heartBreakIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.heart-break-leave-active {
  animation: heartBreakOut 0.4s ease-out;
}

.animate-heart-break {
  animation: heartPulse 0.2s ease-in-out infinite;
}

@keyframes heartBreakIn {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-30deg);
  }
  60% {
    transform: scale(1.4) rotate(10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes heartBreakOut {
  to {
    opacity: 0;
    transform: scale(0.3) translateY(-50px);
  }
}

@keyframes heartPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

@keyframes badgeFade {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
}

@keyframes zigzag {
  0%,
  100% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
}

@keyframes floatRandom {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.15;
  }
  25% {
    transform: translateY(-20px) rotate(-5deg);
    opacity: 0.25;
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
    opacity: 0.1;
  }
  75% {
    transform: translateY(-25px) rotate(-3deg);
    opacity: 0.2;
  }
}

@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes gameoverIn {
  0% {
    opacity: 0;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-badge-fade {
  animation: badgeFade 0.6s ease-out forwards;
}

.animate-zigzag {
  animation: zigzag 0.4s ease-in-out infinite;
}

.animate-float-random {
  animation: floatRandom 4s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounceSlow 1.5s ease-in-out infinite;
}

@keyframes fallDown {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(520px);
    opacity: 0;
  }
}

.animate-fall-down {
  animation: fallDown 5s linear infinite;
}

@keyframes pingSlow {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.4);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.animate-ping-slow {
  animation: pingSlow 2s ease-out infinite;
}

@keyframes previewFall {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(140px);
    opacity: 0;
  }
}

.animate-preview-fall {
  animation: previewFall 2s ease-in infinite;
}

.gameover-enter-active {
  animation: gameoverIn 0.4s ease-out;
}

.gameover-leave-active {
  animation: challengeOut 0.3s ease-in;
}

.startscreen-enter-active {
  animation: fadeIn 0.4s ease-out;
}

.startscreen-leave-active {
  animation: fadeOut 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
