<script setup></script>

<template>
  <!-- Sticky Header -->
  <Header :hide-github-badge="true" class="fixed top-2 z-50 w-full" />
  <CookieBanner />
  <slot />
  <Footer />
</template>
