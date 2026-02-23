<script setup>
defineProps({
  companyName: {
    type: String,
    required: true
  },
  companyInitials: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  // Tailwind gradient classes for the logo background
  logoGradient: {
    type: String,
    default: 'bg-white/10'
  },
  // Tailwind gradient classes for the background accent
  accentGradient: {
    type: String,
    default: 'bg-gradient-to-br from-indigo-950/50 via-transparent to-purple-950/30'
  }
});
</script>

<template>
  <section class="relative bg-[#0a0a0a] pt-32 pb-28 overflow-hidden">
    <!-- Subtle gradient -->
    <div class="absolute inset-0" :class="accentGradient"></div>
    
    <div class="relative max-w-3xl mx-auto px-6">
      <!-- Company -->
      <div class="flex items-center gap-4 mb-10">
        <div 
          class="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-semibold"
          :class="logoGradient"
        >
          {{ companyInitials }}
        </div>
        <div class="text-white/60">{{ companyName }} · {{ industry }}</div>
      </div>

      <!-- Headline -->
      <h1 class="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-8">
        {{ title }}
      </h1>

      <p class="text-xl md:text-2xl text-white/50 leading-relaxed">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

