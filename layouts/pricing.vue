<script setup>
</script>

<template>
  <!-- Sticky Header -->
  <Header :hide-github-badge="true" class="sticky top-0 z-50 w-full" />
  <CookieBanner />
  <slot />
  <Footer />
</template>
