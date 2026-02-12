<template>
  <div class="w-full max-w-[220px] space-y-2.5">
    <div
      v-for="(user, i) in scimUsers"
      :key="user.name"
      class="flex items-center gap-3 bg-primary-dark/5 rounded-xl px-4 py-3"
      :style="{ transform: `translateX(${(i - 1) * 12}px)` }"
    >
      <div
        class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
        :style="{ backgroundColor: user.color }"
      >
        {{ user.initials }}
      </div>
      <div class="flex-1">
        <p class="text-sm font-medium text-primary-dark">
          {{ user.name }}
        </p>
        <p class="text-[11px] text-primary-dark/50">
          {{ user.team }}
        </p>
      </div>
      <svg
        :key="`check-${i}-${checkAnimationKey}`"
        class="w-5 h-5 text-emerald-500 check-animate"
        :style="{ animationDelay: `${i * 0.3 + 0.3}s` }"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        viewBox="0 0 20 20"
      >
        <path
          class="check-path"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 10l4 4 8-8"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const scimUsers = [
  { name: "Sarah Chen", initials: "SC", team: "Engineering", color: "#8b5cf6" },
  { name: "Mike Johnson", initials: "MJ", team: "Marketing", color: "#3b82f6" },
  { name: "Emma Wilson", initials: "EW", team: "Sales", color: "#f59e0b" },
];

const checkAnimationKey = ref(0);
let checkAnimationInterval = null;

onMounted(() => {
  checkAnimationKey.value++;

  checkAnimationInterval = setInterval(() => {
    checkAnimationKey.value++;
  }, 4000);
});

onUnmounted(() => {
  if (checkAnimationInterval) clearInterval(checkAnimationInterval);
});
</script>

<style scoped>
.check-animate {
  opacity: 0;
}

.check-animate .check-path {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
}

.check-animate {
  animation: check-appear 0.5s ease-out forwards;
}

.check-animate .check-path {
  animation: draw-check 0.4s ease-out forwards;
  animation-delay: inherit;
}

@keyframes check-appear {
  0% {
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes draw-check {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
