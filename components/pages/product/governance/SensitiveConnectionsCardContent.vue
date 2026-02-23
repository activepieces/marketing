<template>
  <div
    class="w-full max-w-[200px] transition-all duration-500 ease-out"
    :style="{
      transform:
        sensitiveAnimationPhase >= 2
          ? 'translateY(45px)'
          : 'translateY(0)',
    }"
  >
    <!-- Connection row -->
    <div
      class="bg-primary-dark/5 rounded-xl p-3 mb-2 transition-shadow duration-500"
      :class="sensitiveAnimationPhase >= 2 ? 'shadow-lg' : ''"
    >
      <div class="flex items-center gap-3">
        <div class="relative">
          <img
            src="https://cdn.activepieces.com/pieces/metabase.png"
            class="w-8 h-8 rounded-lg"
            alt="Metabase"
          />
          <!-- Shield overlay -->
          <div
            class="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300"
            :class="
              sensitiveAnimationPhase >= 2
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-0'
            "
          >
            <svg
              class="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <p class="text-[13px] font-medium text-primary-dark">
            Metabase
          </p>
          <p
            class="text-[10px] transition-all duration-300"
            :class="
              sensitiveAnimationPhase >= 2
                ? 'text-amber-600 font-medium'
                : 'text-primary-dark/50'
            "
          >
            {{
              sensitiveAnimationPhase >= 2
                ? "Requires approval"
                : "analytics@acme.com"
            }}
          </p>
        </div>
        <svg
          class="w-4 h-4 text-primary-dark/50 transition-opacity duration-300"
          :class="
            sensitiveAnimationPhase >= 2
              ? 'opacity-0'
              : 'opacity-100'
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </div>
    </div>
    <!-- Dropdown menu -->
    <div
      class="bg-white rounded-xl shadow-lg border border-primary-dark/10 overflow-hidden ml-8 transition-all duration-300"
      :class="
        sensitiveAnimationPhase >= 2
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'
      "
    >
      <div
        class="px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors duration-200"
        :class="
          sensitiveAnimationPhase === 1
            ? 'bg-amber-100'
            : 'bg-amber-50'
        "
      >
        <svg
          class="w-4 h-4 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span class="text-[12px] text-amber-700 font-medium"
          >Mark as sensitive</span
        >
      </div>
      <div class="px-3 py-2 flex items-center gap-2 cursor-pointer">
        <svg
          class="w-4 h-4 text-primary-dark/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <span class="text-[12px] text-primary-dark/80">Rename</span>
      </div>
      <div class="px-3 py-2 flex items-center gap-2 cursor-pointer">
        <svg
          class="w-4 h-4 text-primary-dark/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span class="text-[12px] text-primary-dark/80">Delete</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const sensitiveAnimationPhase = ref(0);
let sensitiveAnimationTimeout = null;

const runSensitiveAnimationCycle = () => {
  sensitiveAnimationPhase.value = 0;

  sensitiveAnimationTimeout = setTimeout(() => {
    sensitiveAnimationPhase.value = 1;

    sensitiveAnimationTimeout = setTimeout(() => {
      sensitiveAnimationPhase.value = 2;

      sensitiveAnimationTimeout = setTimeout(() => {
        runSensitiveAnimationCycle();
      }, 2500);
    }, 400);
  }, 1500);
};

onMounted(() => {
  runSensitiveAnimationCycle();
});

onUnmounted(() => {
  if (sensitiveAnimationTimeout) clearTimeout(sensitiveAnimationTimeout);
});
</script>
