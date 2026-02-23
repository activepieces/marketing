<script setup>
import { ref } from 'vue';

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Build AI workflows'
  },
  benefits: {
    type: Array,
    default: () => [
      'Non-technical teams build & ship',
      'Self-host for full data control',
      'No per-execution fees, ever'
    ]
  },
  ctaText: {
    type: String,
    default: 'Talk to our team →'
  },
  ctaLink: {
    type: String,
    default: '/sales'
  },
  // Tailwind gradient classes for the background accent
  accentGradient: {
    type: String,
    default: 'to-indigo-950'
  },
  decorativeColor1: {
    type: String,
    default: 'bg-indigo-500/20'
  },
  decorativeColor2: {
    type: String,
    default: 'bg-purple-500/20'
  }
});

const adMinimized = ref(false);

const dismissAd = () => {
  adMinimized.value = true;
};

const reopenAd = () => {
  adMinimized.value = false;
};
</script>

<template>
  <!-- Floating Ad Popup (bottom-right) -->
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="translate-y-8 opacity-0 scale-95"
    enter-to-class="translate-y-0 opacity-100 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="translate-y-0 opacity-100 scale-100"
    leave-to-class="translate-y-8 opacity-0 scale-95"
  >
    <div v-if="show && !adMinimized" class="hidden lg:block fixed bottom-6 right-6 z-50 w-80">
      <div class="relative bg-gradient-to-br from-gray-900 via-gray-900 rounded-2xl shadow-2xl overflow-hidden" :class="accentGradient">
        <!-- Close button -->
        <button 
          @click="dismissAd" 
          class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white z-10"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" :class="decorativeColor1"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" :class="decorativeColor2"></div>
        
        <div class="relative p-6">
          <!-- Logo -->
          <div class="flex items-center gap-1.5 mb-4">
            <img src="/ap-logo-black-sq.svg" alt="Activepieces" class="h-5 w-5 brightness-0 invert" />
            <span class="text-white font-semibold">Activepieces</span>
          </div>
          
          <!-- Content -->
          <h4 class="text-white text-lg font-bold mb-3 leading-snug">
            {{ title }}
          </h4>
          
          <!-- Benefits list -->
          <ul class="space-y-2.5 mb-5 text-sm">
            <li v-for="benefit in benefits" :key="benefit" class="flex items-center gap-2 text-white/80">
              <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ benefit }}
            </li>
          </ul>

          <!-- CTA -->
          <NuxtLink 
            :to="ctaLink" 
            class="block w-full py-3 bg-white text-gray-900 font-semibold rounded-xl text-center hover:bg-gray-100 transition-colors"
          >
            {{ ctaText }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Minimized Ad Widget (shows when popup is dismissed) -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-4 opacity-0 scale-90"
    enter-to-class="translate-y-0 opacity-100 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100 scale-100"
    leave-to-class="translate-y-4 opacity-0 scale-90"
  >
    <button 
      v-if="show && adMinimized" 
      @click="reopenAd"
      class="hidden lg:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-900 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
      :class="accentGradient"
    >
      <img src="/ap-logo-black-sq.svg" alt="Activepieces" class="h-5 w-5 brightness-0 invert" />
      <span class="text-sm font-medium">Talk to us</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
      </svg>
    </button>
  </Transition>
</template>

