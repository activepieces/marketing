<script setup>
</script>

<template>
  <!-- Announcement Bar -->
  <div class="w-full h-[44px] bg-[#3d3246] text-white flex items-center justify-center">
    <span class="text-center w-full text-sm">
      <span class="hidden md:inline">
        We made 2 huge announcements!
        <a href="https://www.youtube.com/watch?v=xn-lu9CUhRE" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-200 transition-colors">
          Watch the video
        </a>
      </span>
      <span class="inline md:hidden">
        2 huge announcements!
        <a href="https://www.youtube.com/watch?v=xn-lu9CUhRE" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-200 transition-colors">
          Watch video
        </a>
      </span>
    </span>
  </div>
  <!-- Sticky Header -->
  <Header :hide-github-badge="true" class="sticky top-0 z-50 w-full" />
  <CookieBanner />
  <slot />
  <Footer />
</template>
