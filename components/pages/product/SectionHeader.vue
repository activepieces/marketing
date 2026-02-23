<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div
      class="text-center w-full mx-auto rounded-2xl flex gap-4 md:gap-8 items-center"
    >
      <div class="w-full h-1 bg-white/10 rounded-full"></div>
      <h2
        class="text-3xl md:text-5xl lg:text-6xl font-sentient font-medium text-white text-balance shrink-0"
      >
        {{ title }}
      </h2>
      <div class="w-full h-1 bg-white/10 rounded-full"></div>
    </div>
    <p
      v-if="subtitle"
      class="text-base md:text-xl text-white/80 text-center max-w-2xl mx-auto"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
