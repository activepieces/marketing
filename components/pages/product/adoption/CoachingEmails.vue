<template>
  <div
    class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-white/0 border-2 border-white/10"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Default view: Scattered cards -->
    <div
      class="flex flex-col items-center w-full h-full transition-opacity duration-300"
      :class="isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    >
      <!-- Greeting text -->
      <div class="text-center pt-8 pb-4 pointer-events-none">
        <h2 class="text-3xl font-semibold text-white/80">
          Hey
          <span
            class="inline-block name-rotate"
            :class="{ 'name-out': isNameChanging }"
            >{{ names[currentNameIndex] }}</span
          >
          <span class="inline-block animate-wave">👋</span>
        </h2>
      </div>

      <!-- 3x3 Card Grid -->
      <div class="flex-1 flex items-center justify-center p-4 w-full">
        <div class="grid grid-cols-3 gap-4 w-full h-full">
          <div
            v-for="(card, index) in gridCards"
            :key="index"
            class="email-card overflow-hidden w-full h-full p-4 border border-white/10 bg-white/5 flex flex-col rounded-md gap-2"
            :style="{ transform: `rotate(${card.rotation}deg)` }"
          >
            <div
              class="inline-block px-2 py-0.5 rounded-sm text-white text-xs font-bold self-start flex-shrink-0 border"
              :style="{ borderColor: card.color }"
            >
              Day {{ card.day }}
            </div>
            <p
              class="font-semibold text-white/80 text-sm leading-tight flex-shrink-0"
            >
              {{ card.title }}
            </p>
            <div class="space-y-1 flex-shrink-0">
              <div class="h-1 rounded-full bg-white/20 w-full"></div>
              <div class="h-1 rounded-full bg-white/20 w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Coach drawer - peeks from bottom on hover, expands on click -->
    <div
      class="absolute left-0 right-0 bg-white/20 backdrop-blur-lg rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] cursor-pointer z-50 overflow-hidden drawer-base"
      :class="[
        !isTransitioning && isExpanded ? 'drawer-expanded' : '',
        !isTransitioning && !isExpanded ? 'bar-breathe' : '',
        isTransitioning ? 'drawer-transitioning' : '',
      ]"
      :style="{ bottom: 0, height: drawerHeight }"
      @click="!isExpanded && expandCoach()"
    >
      <!-- Peek bar (visible when collapsed) -->
      <div
        v-if="!isExpanded"
        class="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center peek-bar-content"
      >
        <!-- Grey handle - at very top, bobs with height -->
        <div class="w-10 h-1 bg-gray-300 rounded-full mt-3 flex-shrink-0"></div>

        <!-- Content - fixed position from bottom -->
        <div
          class="absolute bottom-4 left-0 right-0 flex flex-col items-center"
        >
          <div class="flex items-center gap-1">
            <span class="font-semibold text-white/80">Your AI Coach</span>
          </div>
          <span class="text-xs text-gray-400 mt-1">Click to expand</span>
        </div>
      </div>

      <!-- Expanded content -->
      <div v-if="isExpanded" class="h-full flex flex-col">
        <!-- Email List View -->
        <template v-if="!selectedEmail">
          <!-- Clean header -->
          <div
            class="flex items-center justify-between px-4 py-4 flex-shrink-0"
          >
            <div class="flex items-center gap-2">
              <span class="text-2xl">✨</span>
              <span class="text-lg font-medium text-white/80"
                >Your AI Coach</span
              >
            </div>
            <button
              @click.stop="closeInbox"
              class="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white/80 hover:text-white"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Progress hint -->
          <div class="px-4 pb-3">
            <div class="flex items-center gap-2 text-xs text-white/80">
              <span>🚀 30-day journey</span>
              <span class="text-gray-200">•</span>
              <span>🏆 Become an AI Hero</span>
            </div>
          </div>

          <!-- Scrollable email list -->
          <div class="flex-1 overflow-y-auto px-3">
            <div
              v-for="(email, index) in emailList"
              :key="index"
              class="flex items-start gap-3 mb-1"
            >
              <!-- Day badge -->
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-1 border"
                :style="{
                  borderColor: email.placeholder
                    ? 'rgba(255,255,255,0.1)'
                    : email.color,
                }"
              >
                <span :class="email.placeholder ? 'text-white/80' : ''">{{
                  email.day
                }}</span>
              </div>

              <!-- Email content -->
              <div class="flex-1 min-w-0">
                <!-- Clickable email -->
                <div
                  v-if="!email.placeholder"
                  class="py-2 px-3 -mx-1 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                  @click.stop="selectedEmail = email"
                >
                  <p
                    class="font-medium text-white/80 text-sm truncate group-hover:text-white transition-colors"
                  >
                    {{ email.subject }}
                  </p>
                  <p class="text-xs text-gray-400 line-clamp-1 mt-0.5">
                    {{ email.preview }}
                  </p>
                </div>

                <!-- Placeholder email (non-interactive) -->
                <div v-else class="py-2 px-1">
                  <div class="h-2.5 bg-white/10 rounded w-3/4 mb-1.5"></div>
                  <div class="h-2 bg-white/10 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Email Detail View -->
        <template v-else>
          <!-- Detail header -->
          <div
            class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 flex-shrink-0"
          >
            <button
              @click.stop="selectedEmail = null"
              class="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg
                class="w-4 h-4 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-white/80 truncate">
                {{ selectedEmail.subject }}
              </p>
              <p class="text-[10px] text-white/60">
                Day {{ selectedEmail.day }} · from AI Coach
              </p>
            </div>
            <div
              class="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 border"
              :style="{ borderColor: selectedEmail.color }"
            >
              {{ selectedEmail.day }}
            </div>
          </div>

          <!-- Email content -->
          <div class="flex-1 overflow-y-auto px-4 py-4 pb-20">
            <div class="space-y-4">
              <!-- Greeting -->
              <p class="text-sm text-white/80">Hi there! 👋</p>

              <!-- Main content -->
              <p class="text-sm text-white/80 leading-relaxed">
                {{ selectedEmail.body }}
              </p>

              <!-- Placeholder content -->
              <div class="space-y-2 py-2">
                <div class="h-2 rounded-full bg-white/10 w-full"></div>
                <div class="h-2 rounded-full bg-white/10 w-11/12"></div>
                <div class="h-2 rounded-full bg-white/10 w-4/5"></div>
              </div>

              <!-- CTA button placeholder -->
              <div
                class="inline-block px-4 py-2 rounded-lg text-white text-xs font-semibold border"
                :style="{ borderColor: selectedEmail.color }"
              >
                {{ selectedEmail.cta }}
              </div>

              <!-- More placeholder -->
              <div class="space-y-2 pt-2">
                <div class="h-2 rounded-full bg-white/10 w-3/4"></div>
                <div class="h-2 rounded-full bg-white/10 w-1/2"></div>
              </div>

              <!-- Sign off -->
              <div class="pt-2">
                <p class="text-sm text-white/80">Cheers,</p>
                <p class="text-sm font-medium text-white/80">Your AI Coach</p>
              </div>
            </div>
          </div>

          <!-- Sticky reaction bar -->
          <div class="absolute bottom-0 left-0 right-0 p-3">
            <div
              class="flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-gray-100 mx-auto w-fit"
            >
              <button
                v-for="reaction in reactions"
                :key="reaction.emoji"
                class="relative w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-200 hover:scale-125 hover:bg-gray-100 active:scale-90"
                @click.stop="triggerCelebration(reaction.emoji, $event)"
              >
                {{ reaction.emoji }}
              </button>
            </div>
          </div>

          <!-- Celebration emojis container -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <span
              v-for="particle in celebrationParticles"
              :key="particle.id"
              class="absolute celebration-particle"
              :class="particle.size"
              :style="{
                left: particle.x + 'px',
                bottom: '70px',
                '--drift': particle.drift + 'px',
                '--height': particle.height + 'px',
                '--duration': particle.duration + 's',
                animationDelay: particle.delay + 's',
              }"
            >
              {{ particle.emoji }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isExpanded = ref(false);
const isHovering = ref(false);
const isTransitioning = ref(false);
const selectedEmail = ref(null);
const celebrationParticles = ref([]);
let particleId = 0;
let leaveTimeout = null;

const reactions = [{ emoji: "🎉" }, { emoji: "❤️" }, { emoji: "🔥" }];

const names = [
  "Emma",
  "Noah",
  "Maya",
  "Evan",
  "Ruby",
  "Jack",
  "Sara",
  "Alex",
  "Luna",
  "Ryan",
];
const currentNameIndex = ref(0);
const isNameChanging = ref(false);

// Rotate names every 2.5 seconds
let nameInterval = null;

onMounted(() => {
  nameInterval = setInterval(() => {
    isNameChanging.value = true;
    setTimeout(() => {
      currentNameIndex.value = (currentNameIndex.value + 1) % names.length;
      isNameChanging.value = false;
    }, 200);
  }, 2500);
});

onUnmounted(() => {
  if (nameInterval) {
    clearInterval(nameInterval);
  }
  if (leaveTimeout) {
    clearTimeout(leaveTimeout);
  }
});

const handleMouseEnter = () => {
  if (leaveTimeout) {
    clearTimeout(leaveTimeout);
    leaveTimeout = null;
  }
  isHovering.value = true;
};

const handleMouseLeave = () => {
  // If expanded, wait 2 seconds before collapsing
  if (isExpanded.value) {
    leaveTimeout = setTimeout(() => {
      isExpanded.value = false;
      isHovering.value = false;
      selectedEmail.value = null;
      celebrationParticles.value = [];
    }, 2000);
  } else {
    isHovering.value = false;
  }
};

const drawerHeight = ref(null);

const expandCoach = () => {
  // Set explicit starting height to enable smooth transition
  drawerHeight.value = "85px";
  isTransitioning.value = true;

  // Next tick: set to full height to trigger transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      drawerHeight.value = "100%";
      isExpanded.value = true;

      // Clear transitioning after animation completes
      setTimeout(() => {
        isTransitioning.value = false;
        drawerHeight.value = null;
      }, 500);
    });
  });
};

const closeInbox = () => {
  isExpanded.value = false;
  selectedEmail.value = null;
  celebrationParticles.value = [];
};

const sizes = ["text-2xl", "text-3xl", "text-4xl", "text-5xl"];

const triggerCelebration = (emoji, event) => {
  // Get button position relative to the drawer container
  const container = event.target.closest(".drawer-base");
  if (!container) return;
  const containerRect = container.getBoundingClientRect();
  const rect = event.target.getBoundingClientRect();
  const baseX = rect.left - containerRect.left + rect.width / 2;

  // Create particles that cover the whole screen
  const newParticles = [];
  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {
    // Wide horizontal spread
    const direction = i % 2 === 0 ? 1 : -1;
    const driftAmount = (60 + Math.random() * 200) * direction;

    // Varied vertical travel - some go very high, some stay lower
    const heightTier = i % 3; // 0, 1, or 2
    const baseHeight = heightTier === 0 ? 320 : heightTier === 1 ? 220 : 140;

    newParticles.push({
      id: particleId++,
      emoji,
      x: baseX,
      drift: driftAmount,
      delay: i * 0.02,
      duration: 1.2 + heightTier * 0.3 + Math.random() * 0.3,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      height: -(baseHeight + Math.random() * 60),
    });
  }

  celebrationParticles.value.push(...newParticles);

  // Clean up particles after animation
  setTimeout(() => {
    celebrationParticles.value = celebrationParticles.value.filter(
      (p) => !newParticles.find((np) => np.id === p.id)
    );
  }, 3000);
};

const gridCards = [
  { day: 1, title: "Welcome", color: "#f472b6", rotation: -3 },
  { day: 4, title: "First flow", color: "#a855f7", rotation: 2 },
  { day: 6, title: "Badge!", color: "#8b5cf6", rotation: -1 },
  { day: 9, title: "Add AI", color: "#6366f1", rotation: 1 },
  { day: 13, title: "Leaderboard", color: "#3b82f6", rotation: -2 },
  { day: 19, title: "Share", color: "#0ea5e9", rotation: 3 },
  { day: 22, title: "AI agents", color: "#10b981", rotation: -1 },
  { day: 24, title: "Impact", color: "#059669", rotation: 2 },
  { day: 30, title: "AI Hero! 🏆", color: "#34d399", rotation: -2 },
];

const emailList = [
  // Week 1: Getting Started (Days 1-7)
  {
    day: 1,
    subject: "Welcome to your AI journey",
    preview:
      "Your admin just gave you superpowers. Let's explore your new dashboard together...",
    body: "Your admin just invited you to something special. This platform will help you automate the boring stuff and focus on work that matters. Let's start by exploring your dashboard.",
    cta: "Explore dashboard →",
    color: "#f472b6",
  },
  { day: 2, placeholder: true, color: "#f472b6" },
  { day: 3, placeholder: true, color: "#ec4899" },
  {
    day: 4,
    subject: "Build your first flow",
    preview:
      "Today's the day! Let's create something real in under 10 minutes...",
    body: "You've explored, you've connected apps. Now let's build! Pick a simple template and customize it. Your first automation is just 10 minutes away.",
    cta: "Start building →",
    color: "#db2777",
  },
  { day: 5, placeholder: true, color: "#c026d3" },
  {
    day: 6,
    subject: "🎖️ You earned a badge!",
    preview:
      "First Automation complete! Check out your new badge on your profile...",
    body: "Congratulations! You just earned your 'First Automation' badge. This is just the beginning — there are more achievements waiting for you.",
    cta: "View my badges →",
    color: "#a855f7",
  },
  {
    day: 7,
    subject: "Week 1 complete!",
    preview:
      "Look at what you accomplished in just one week. Here's your impact so far...",
    body: "One week in and you've already built a real automation! Check your impact dashboard to see time saved and tasks automated. You're off to an amazing start.",
    cta: "See my impact →",
    color: "#8b5cf6",
  },

  // Week 2: Building Skills (Days 8-14)
  { day: 8, placeholder: true, color: "#7c3aed" },
  {
    day: 9,
    subject: "Add AI to your flow",
    preview:
      "Make your automation smarter — let AI summarize, categorize, or write for you...",
    body: "Your automations can think! Add an AI step to summarize long emails, categorize incoming requests, or draft responses. It's easier than you think.",
    cta: "Add AI step →",
    color: "#6366f1",
  },
  { day: 10, placeholder: true, color: "#4f46e5" },
  { day: 11, placeholder: true, color: "#4338ca" },
  { day: 12, placeholder: true, color: "#3b82f6" },
  {
    day: 13,
    subject: "Check the leaderboard",
    preview: "See how you rank among AI builders in your organization...",
    body: "Curious how you compare? Check the leaderboard to see top builders in your org. You might be closer to the top than you think!",
    cta: "View leaderboard →",
    color: "#2563eb",
  },
  { day: 14, placeholder: true, color: "#1d4ed8" },

  // Week 3: Going Deeper (Days 15-21)
  { day: 15, placeholder: true, color: "#60a5fa" },
  { day: 16, placeholder: true, color: "#38bdf8" },
  { day: 17, placeholder: true, color: "#0ea5e9" },
  { day: 18, placeholder: true, color: "#0284c7" },
  {
    day: 19,
    subject: "Share with a teammate",
    preview: "Built something great? Share it so others can use it too...",
    body: "Your automation could help your whole team! Share your flow with a colleague. Teaching others is the fastest way to become a champion.",
    cta: "Share flow →",
    color: "#0369a1",
  },
  {
    day: 20,
    subject: "🤝 Team Player badge!",
    preview:
      "You shared your first automation — welcome to the champions club...",
    body: "You just earned the 'Team Player' badge for sharing your work! Champions don't just build for themselves — they lift up the whole team.",
    cta: "View badges →",
    color: "#14b8a6",
  },
  { day: 21, placeholder: true, color: "#0d9488" },

  // Week 4: Becoming a Champion (Days 22-30)
  {
    day: 22,
    subject: "Build an AI agent",
    preview: "Agents are flows that think, decide, and act autonomously...",
    body: "You're ready for agents! Unlike simple flows, agents can reason, make decisions, and take action without step-by-step instructions. This is the future of work.",
    cta: "Build agent →",
    color: "#10b981",
  },
  { day: 23, placeholder: true, color: "#059669" },
  {
    day: 24,
    subject: "Measure your impact",
    preview: "Hours saved, tasks automated, errors prevented — see your ROI...",
    body: "Numbers don't lie. Your impact dashboard shows exactly how much time you've saved. Use these stats in your next performance review!",
    cta: "View impact →",
    color: "#047857",
  },
  { day: 25, placeholder: true, color: "#22c55e" },
  { day: 26, placeholder: true, color: "#16a34a" },
  { day: 27, placeholder: true, color: "#15803d" },
  { day: 28, placeholder: true, color: "#84cc16" },
  { day: 29, placeholder: true, color: "#a3e635" },
  {
    day: 30,
    subject: "🏆 You're an AI Hero!",
    preview:
      "30 days ago you started. Today you're transforming how your org works.",
    body: "You did it! In 30 days you went from zero to AI hero. You've built flows, helped teammates, and made a real impact. But this isn't the end — it's just the beginning. Keep building, keep inspiring, keep leading the AI revolution.",
    cta: "Celebrate! 🎉",
    color: "#34d399",
  },
];
</script>

<style scoped>
.email-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Waving hand animation */
.animate-wave {
  animation: wave 2.5s ease-in-out infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60%,
  100% {
    transform: rotate(0deg);
  }
}

/* Name rotation animation */
.name-rotate {
  transition: all 0.2s ease-out;
  display: inline-block;
  min-width: 70px;
  text-align: center;
}

.name-out {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Cool closing animation - swoosh away */
.closing-animation {
  animation: swoosh-away 0.4s cubic-bezier(0.6, 0, 0.4, 1) forwards;
  will-change: transform, opacity, background-color;
}

@keyframes swoosh-away {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
    background-color: rgba(255, 255, 255, 0);
  }
  15% {
    transform: translateX(-8px) scale(1.02);
    opacity: 1;
  }
  100% {
    transform: translateX(100%) scale(0.95);
    opacity: 0;
  }
}

/* Celebration particles */
.celebration-particle {
  animation: float-up var(--duration) cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  opacity: 0;
}

@keyframes float-up {
  0% {
    transform: translateY(0) translateX(0) scale(0.5);
    opacity: 0;
  }
  10% {
    transform: translateY(calc(var(--height) * 0.15))
      translateX(calc(var(--drift) * 0.15)) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(var(--height)) translateX(var(--drift)) scale(1);
    opacity: 0;
  }
}

/* Base drawer - smooth transitions always */
.drawer-base {
  transition: height 0.5s cubic-bezier(0.32, 0.72, 0, 1),
    border-radius 0.3s ease;
}

/* Expanded state */
.drawer-expanded {
  height: 100%;
  border-radius: 0;
  animation: none !important;
}

/* During transition - no animation, just smooth transition */
.drawer-transitioning {
  animation: none !important;
  transition: height 0.5s cubic-bezier(0.32, 0.72, 0, 1),
    border-radius 0.3s ease !important;
}

/* Peek bar content fade in */
.peek-bar-content {
  animation: fade-slide-in 0.35s cubic-bezier(0.32, 0.72, 0, 1);
}

@keyframes fade-slide-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bar height breathing animation */
.bar-breathe {
  animation: breathe 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  height: 85px; /* Base height for animation */
}

@keyframes breathe {
  0%,
  100% {
    height: 85px;
  }
  50% {
    height: 100px;
  }
}
</style>
