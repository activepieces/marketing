<template>
  <div class="relative w-full h-full">
    <!-- Main container -->
    <div
      class="relative rounded-lg overflow-hidden h-full flex flex-col"
      :class="screenBg"
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
        <!-- Initial Widget State -->
        <div v-if="currentScreen === 'widget'" class="p-6 h-full flex flex-col">
          <!-- Mock app header -->
          <div
            class="flex items-center gap-3 mb-4 pb-4 border-b border-white/10"
          >
            <div
              class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
            >
              <PhSparkle class="w-5 h-5 text-white" weight="fill" />
            </div>
            <div class="flex-1">
              <div class="h-2.5 w-28 bg-white/20 rounded-full"></div>
              <div class="h-2 w-20 bg-white/10 rounded-full mt-1.5"></div>
            </div>
            <div class="flex gap-1.5">
              <div class="w-2 h-2 rounded-full bg-white/20"></div>
              <div class="w-2 h-2 rounded-full bg-white/20"></div>
              <div class="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
          </div>

          <!-- Content area -->
          <div
            class="relative flex-1 bg-white/5 rounded-md border border-white/10 overflow-hidden"
          >
            <div class="p-5 space-y-3">
              <div class="h-2.5 w-3/4 bg-white/15 rounded-full"></div>
              <div class="h-2.5 w-1/2 bg-white/10 rounded-full"></div>
              <div class="h-2.5 w-2/3 bg-white/15 rounded-full"></div>
              <div class="h-10 w-full bg-white/5 rounded-xl mt-4"></div>
            </div>

            <!-- Floating AI support button - centered at bottom -->
            <button
              @click="currentScreen = 'calendar'"
              class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 text-white/80 px-5 py-3 rounded-full flex items-center gap-1 group ring-0 ring-white/5 hover:ring-8 hover:border-white/40 hover:gap-2 hover:text-white transition-all duration-200"
            >
              <PhRobot class="text-white" weight="fill" size="20" />
              <span class="font-semibold text-sm">Talk to AI Expert</span>
            </button>
          </div>
        </div>

        <!-- Calendar State - 3 Day View -->
        <div
          v-else-if="currentScreen === 'calendar'"
          class="p-5 h-full flex flex-col"
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-3">
            <button
              @click="currentScreen = 'widget'"
              class="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
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
            <div class="text-center">
              <h3 class="font-semibold text-white/80 text-sm">January 2025</h3>
              <p class="text-[10px] text-white/60">Pick a slot</p>
            </div>
            <div
              class="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"
            >
              <PhCalendar class="w-4 h-4 text-violet-400" weight="fill" />
            </div>
          </div>

          <!-- 3-Day Grid Calendar -->
          <div class="grid grid-cols-3 gap-2 flex-1">
            <!-- Day Headers -->
            <div
              v-for="day in calendarDays"
              :key="day.name"
              class="text-center pb-2 border-b border-white/10"
            >
              <p class="text-[10px] font-medium text-white/60 uppercase">
                {{ day.name }}
              </p>
              <p
                class="text-base font-bold"
                :class="day.isToday ? 'text-violet-400' : 'text-white/80'"
              >
                {{ day.date }}
              </p>
            </div>

            <!-- Time Slots Grid -->
            <template v-for="day in calendarDays" :key="'slots-' + day.name">
              <div class="space-y-1.5 pt-2">
                <div
                  v-for="slot in day.slots"
                  :key="slot.id"
                  @click="!slot.booked && bookSlot(slot)"
                  class="rounded-lg p-2 text-center transition-all duration-150"
                  :class="
                    slot.booked
                      ? 'bg-white/5 cursor-not-allowed'
                      : 'bg-white/10 hover:bg-white/20 border border-white/10 hover:scale-[1.02] cursor-pointer'
                  "
                >
                  <p
                    class="font-medium text-xs"
                    :class="
                      slot.booked
                        ? 'text-white/40 line-through opacity-50'
                        : 'text-white/80'
                    "
                  >
                    {{ slot.time }}
                  </p>
                  <div
                    v-if="slot.booked"
                    class="mt-0.5 text-[9px] text-white/40 font-medium flex items-center justify-center gap-0.5"
                  >
                    <component
                      :is="slot.bookedIcon"
                      class="w-2.5 h-2.5"
                      weight="fill"
                    />
                    {{ slot.bookedLabel }}
                  </div>
                  <div
                    v-else
                    class="mt-0.5 text-[10px] text-violet-400 font-medium flex items-center justify-center gap-0.5"
                  >
                    <PhCheck class="w-3 h-3" weight="bold" /> Free
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Confirmation Badge - Quick pass-through -->
        <Transition name="pass-through">
          <div
            v-if="currentScreen === 'confirmation'"
            class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          >
            <div
              class="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3"
            >
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg"
              >
                <PhCheck class="w-5 h-5" weight="bold" />
              </div>
              <div>
                <p class="font-semibold text-white/80">Confirmed!</p>
                <p class="text-white/60 text-sm">
                  {{ bookedSlot?.dayName }} {{ bookedSlot?.dayDate }} ·
                  {{ bookedSlot?.time }}
                </p>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Modern Video Call State -->
        <Transition name="cinematic-bg">
          <div
            v-if="currentScreen === 'connected'"
            class="absolute inset-0 bg-gray-900 flex flex-col z-20 overflow-hidden"
          >
            <!-- Call header -->
            <div class="flex items-center justify-between px-5 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                ></div>
                <span class="text-white/80 text-sm font-medium"
                  >Live Session</span
                >
              </div>
              <div
                class="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-mono"
              >
                12:34
              </div>
            </div>

            <!-- Video area - equal size grid -->
            <div class="flex-1 px-4 pb-4">
              <div class="h-full grid grid-cols-2 gap-2">
                <!-- Expert video -->
                <div class="relative bg-white/5 rounded-2xl overflow-hidden">
                  <video
                    ref="expertVideoRef"
                    src="/crying-avatar.mp4"
                    class="w-full h-full object-cover"
                    style="transform: scaleX(-1)"
                    muted
                    loop
                    playsinline
                  />
                  <!-- Expert name tag -->
                  <div
                    class="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg"
                  >
                    <div
                      class="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                    >
                      <PhRobot class="w-3 h-3 text-white" weight="fill" />
                    </div>
                    <span class="text-white text-[10px] font-medium"
                      >AI Expert</span
                    >
                    <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  </div>
                </div>

                <!-- Your video -->
                <div class="relative bg-white/5 rounded-2xl overflow-hidden">
                  <video
                    ref="youVideoRef"
                    src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png"
                    poster="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png"
                    class="w-full h-full object-cover"
                    style="transform: scaleX(-1)"
                    muted
                    loop
                    playsinline
                  />
                  <!-- Your name tag -->
                  <div
                    class="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg"
                  >
                    <span class="text-white text-[10px] font-medium">You</span>
                    <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Controls -->
            <div class="px-4 py-3 flex items-center justify-center">
              <div class="flex items-center gap-1.5">
                <button
                  @click="toggleCamera"
                  class="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                  :class="
                    isCameraOn
                      ? 'bg-emerald-400 shadow-md'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
                  "
                >
                  <PhVideoCamera
                    class="w-5 h-5"
                    :class="isCameraOn ? 'text-white' : 'text-white/80'"
                    weight="fill"
                  />
                </button>
                <button
                  @click="sprayHearts"
                  class="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                >
                  <PhHeart class="w-5 h-5 text-pink-400" weight="fill" />
                </button>
                <button
                  @click="startFight"
                  class="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                  :class="isFighting ? 'bg-orange-500/30' : ''"
                >
                  <PhSmileyAngry
                    class="w-5 h-5 text-orange-400"
                    weight="fill"
                  />
                </button>
                <button
                  @click="endCall"
                  class="w-11 h-11 rounded-xl bg-red-500 shadow-md hover:shadow-lg hover:bg-red-600 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                  :class="isEndingCall ? 'opacity-50 cursor-not-allowed' : ''"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Hearts overlay -->
            <div
              class="absolute inset-0 pointer-events-none overflow-hidden z-30"
            >
              <component
                v-for="heart in hearts"
                :key="heart.id"
                :is="PhHeart"
                weight="fill"
                class="absolute heart-float"
                :style="{
                  left: heart.x + '%',
                  top: heart.y + '%',
                  width: heart.size + 'px',
                  height: heart.size + 'px',
                  color: heart.color,
                  animationDelay: heart.delay + 'ms',
                  animationDuration: heart.duration + 's',
                }"
              />
            </div>

            <!-- Call ending overlay -->
            <Transition name="fade">
              <div
                v-if="isEndingCall"
                class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 flex items-center justify-center z-10"
              >
                <div
                  class="text-center call-ending-content bg-black/60 backdrop-blur-lg px-8 py-6 rounded-2xl"
                >
                  <PhHandWaving
                    class="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-wave"
                    weight="fill"
                  />
                  <p class="text-white/80 font-medium text-lg">
                    Call Ending...
                  </p>
                  <p class="text-white/60 text-sm mt-1">Thanks for chatting!</p>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
      <!-- End Content Area -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  PhSparkle,
  PhRobot,
  PhCalendar,
  PhCheck,
  PhVideoCamera,
  PhHeart,
  PhSmileyAngry,
  PhHandWaving,
  PhEye,
  PhDrop,
  PhMagnifyingGlass,
  PhChat,
  PhDeviceMobile,
} from "@phosphor-icons/vue";

const currentScreen = ref("widget");
const bookedSlot = ref(null);
const expertVideoRef = ref(null);
const youVideoRef = ref(null);
const isEndingCall = ref(false);
const isFighting = ref(false);
const isCameraOn = ref(false);
const hearts = ref([]);
let cameraStream = null;

const screenBg = computed(() => {
  switch (currentScreen.value) {
    case "widget":
    case "confirmation":
    case "calendar":
      return "bg-black/20";
    case "connected":
      return "bg-gray-900";
    default:
      return "bg-gray-900";
  }
});

const calendarDays = ref([
  {
    name: "Mon",
    date: "13",
    isToday: true,
    slots: [
      { id: "m1", time: "9:00", booked: false },
      {
        id: "m2",
        time: "11:00",
        booked: true,
        bookedLabel: "Stalking ex",
        bookedIcon: PhEye,
      },
      { id: "m3", time: "2:00", booked: false },
      {
        id: "m4",
        time: "4:00",
        booked: true,
        bookedLabel: "Shower crying",
        bookedIcon: PhDrop,
      },
    ],
  },
  {
    name: "Tue",
    date: "14",
    isToday: false,
    slots: [
      {
        id: "t1",
        time: "9:00",
        booked: true,
        bookedLabel: "WebMD spiral",
        bookedIcon: PhMagnifyingGlass,
      },
      { id: "t2", time: "11:00", booked: false },
      { id: "t3", time: "2:00", booked: false },
      {
        id: "t4",
        time: "4:00",
        booked: true,
        bookedLabel: "Mirror pep talk",
        bookedIcon: PhChat,
      },
    ],
  },
  {
    name: "Wed",
    date: "15",
    isToday: false,
    slots: [
      { id: "w1", time: "9:00", booked: false },
      { id: "w2", time: "11:00", booked: false },
      {
        id: "w3",
        time: "2:00",
        booked: true,
        bookedLabel: "Ignoring mom",
        bookedIcon: PhDeviceMobile,
      },
      { id: "w4", time: "4:00", booked: false },
    ],
  },
]);

const bookSlot = (slot) => {
  // Find which day this slot belongs to
  const day = calendarDays.value.find((d) =>
    d.slots.some((s) => s.id === slot.id)
  );
  bookedSlot.value = { ...slot, dayName: day?.name, dayDate: day?.date };
  currentScreen.value = "confirmation";

  setTimeout(() => {
    currentScreen.value = "connected";
  }, 800); // Quick pass-through confirmation
};

const sprayHearts = () => {
  const heartColors = [
    "#f472b6",
    "#ec4899",
    "#db2777",
    "#f43f5e",
    "#ef4444",
    "#a855f7",
    "#8b5cf6",
  ];
  const newHearts = [];

  for (let i = 0; i < 20; i++) {
    newHearts.push({
      id: Date.now() + i,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      x: Math.random() * 100,
      y: 50 + Math.random() * 50,
      size: Math.random() * 20 + 20,
      delay: i * 40,
      duration: Math.random() * 1 + 2,
    });
  }

  hearts.value = [...hearts.value, ...newHearts];

  // Clean up after animation
  setTimeout(() => {
    hearts.value = hearts.value.filter(
      (h) => !newHearts.find((nh) => nh.id === h.id)
    );
  }, 4000);
};

const toggleCamera = async () => {
  if (isCameraOn.value) {
    // Turn off camera
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }
    if (youVideoRef.value) {
      youVideoRef.value.srcObject = null;
      youVideoRef.value.src = "";
      youVideoRef.value.poster =
        "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png";
    }
    isCameraOn.value = false;
  } else {
    // Turn on camera
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (youVideoRef.value) {
        youVideoRef.value.srcObject = cameraStream;
        youVideoRef.value.poster = "";
        youVideoRef.value.play();
      }
      isCameraOn.value = true;
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  }
};

const startFight = () => {
  if (isFighting.value || isEndingCall.value) return;
  isFighting.value = true;

  // Switch to fighting videos and play
  if (expertVideoRef.value) {
    expertVideoRef.value.src = "/support-fighting.mp4";
    expertVideoRef.value.loop = false;
    expertVideoRef.value.currentTime = 0;
    expertVideoRef.value.play();

    // Reset when video ends
    expertVideoRef.value.onended = () => {
      resetToNormal();
    };
  }
  // Only play fight video on user side if camera is not on
  if (youVideoRef.value && !isCameraOn.value) {
    youVideoRef.value.src = "/you-fighting.mp4";
    youVideoRef.value.loop = false;
    youVideoRef.value.currentTime = 0;
    youVideoRef.value.play();
  }
};

const resetToNormal = () => {
  isFighting.value = false;

  if (expertVideoRef.value) {
    expertVideoRef.value.src = "/crying-avatar.mp4";
    expertVideoRef.value.loop = true;
    expertVideoRef.value.currentTime = 0;
    expertVideoRef.value.onended = null;
  }
  // Only reset user video if camera is not on
  if (youVideoRef.value && !isCameraOn.value) {
    youVideoRef.value.src = "";
    youVideoRef.value.poster =
      "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png";
    youVideoRef.value.loop = true;
    youVideoRef.value.currentTime = 0;
  }
};

const endCall = () => {
  if (isEndingCall.value) return;
  isEndingCall.value = true;

  // Turn off camera immediately and restore avatar
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }
  if (youVideoRef.value) {
    youVideoRef.value.srcObject = null;
    youVideoRef.value.src = "";
    youVideoRef.value.poster =
      "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png";
  }
  isCameraOn.value = false;
  isFighting.value = false;

  // Switch to crying video immediately and play
  if (expertVideoRef.value) {
    expertVideoRef.value.src = "/crying-avatar.mp4";
    expertVideoRef.value.loop = true;
    expertVideoRef.value.onended = null;
    expertVideoRef.value.currentTime = 0;
    expertVideoRef.value.play();
  }

  // After 4 seconds, switch to widget
  setTimeout(() => {
    currentScreen.value = "widget";
    bookedSlot.value = null;
    isEndingCall.value = false;
    isFighting.value = false;
    hearts.value = [];

    // Reset video after screen has transitioned
    setTimeout(() => {
      if (expertVideoRef.value) {
        expertVideoRef.value.pause();
        expertVideoRef.value.currentTime = 0;
      }
      if (youVideoRef.value) {
        youVideoRef.value.src = "";
        youVideoRef.value.poster =
          "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png";
      }
    }, 500);
  }, 4000);
};
</script>

<style scoped>
.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Wave animation for goodbye */
.animate-wave {
  animation: wave 1s ease-in-out infinite;
  display: inline-block;
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-20deg);
  }
}

/* Fade up animation */
.animate-fade-up {
  animation: fade-up 0.5s ease-out;
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Call ending content animation */
.call-ending-content {
  animation: fade-in-up 0.4s ease-out;
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-scale-enter-active {
  transition: all 0.4s ease-out;
}

.fade-scale-leave-active {
  transition: all 0.3s ease-in;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(1.05);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Pass-through - smooth slide in and out */
.pass-through-enter-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.pass-through-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 1, 0.45);
}

.pass-through-enter-from {
  opacity: 0;
  transform: translateY(60px) scale(0.9);
}

.pass-through-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.9);
}

/* Cinematic background fade */
.cinematic-bg-enter-active {
  transition: opacity 0.4s ease-out;
}

.cinematic-bg-leave-active {
  transition: opacity 0.3s ease-in;
}

.cinematic-bg-enter-from,
.cinematic-bg-leave-to {
  opacity: 0;
}

/* Heart float animation */
.heart-float {
  animation: heart-rise 2.5s ease-out forwards;
  opacity: 0;
}

@keyframes heart-rise {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.3) rotate(-10deg);
  }
  15% {
    opacity: 1;
    transform: translateY(-30px) scale(1) rotate(5deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-250px) scale(1.3) rotate(15deg);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
</style>
