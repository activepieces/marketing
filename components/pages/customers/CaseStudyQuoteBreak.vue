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
  authorImage: {
    type: String,
    required: true
  },
  // Whether the author image should use object-top positioning
  authorImageTop: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="relative py-20 mb-24">
    <blockquote class="text-center px-8 md:px-20">
      <img 
        :src="authorImage" 
        :alt="authorName" 
        class="w-20 h-20 rounded-full mx-auto mb-6"
        :class="authorImageTop ? 'object-cover object-top' : 'object-cover'"
      />
      <p class="text-2xl md:text-3xl text-gray-900 italic leading-relaxed mb-6">
        "{{ quote }}"
      </p>
      <cite class="text-base text-gray-500 not-italic">{{ authorName }}</cite>
    </blockquote>
  </div>
</template>

