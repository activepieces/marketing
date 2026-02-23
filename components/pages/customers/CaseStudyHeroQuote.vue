<script setup>
defineProps({
  quote: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorRole: {
    type: String,
    required: true
  },
  authorImage: {
    type: String,
    required: true
  },
  // Tailwind color classes for the gradient
  gradientFrom: {
    type: String,
    default: 'from-indigo-50'
  },
  gradientVia: {
    type: String,
    default: 'via-purple-50'
  },
  borderColor: {
    type: String,
    default: 'border-indigo-100/50'
  },
  quoteMarkColor: {
    type: String,
    default: 'text-indigo-200'
  },
  decorativeColor1: {
    type: String,
    default: 'bg-indigo-200/30'
  },
  decorativeColor2: {
    type: String,
    default: 'bg-purple-200/30'
  },
  // Whether the author image should use object-top positioning
  authorImageTop: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div 
    class="relative rounded-3xl p-10 md:p-12 border bg-gradient-to-br to-white"
    :class="[gradientFrom, gradientVia, borderColor]"
  >
    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" :class="decorativeColor1"></div>
    <div class="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl" :class="decorativeColor2"></div>
    
    <div class="relative">
      <!-- Big quote mark -->
      <div class="text-8xl font-serif absolute -top-4 -left-2 leading-none" :class="quoteMarkColor">"</div>
      
      <blockquote class="pt-8">
        <p class="text-2xl md:text-3xl text-gray-900 font-medium leading-relaxed mb-8">
          {{ quote }}
        </p>
        <div class="flex items-center gap-4">
          <img 
            :src="authorImage" 
            :alt="authorName" 
            class="w-14 h-14 rounded-full ring-4 ring-white shadow-lg"
            :class="authorImageTop ? 'object-cover object-top' : 'object-cover'"
          />
          <div>
            <cite class="text-lg font-semibold text-gray-900 not-italic block">{{ authorName }}</cite>
            <span class="text-base text-gray-500">{{ authorRole }}</span>
          </div>
        </div>
      </blockquote>
    </div>
  </div>
</template>

