<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import CookieBanner from '~/components/CookieBanner.vue'
</script>

<template>
  <!-- Sticky Header with transparent mode for dark backgrounds -->
  <Header :hide-github-badge="true" :transparent="true" class="sticky top-0 z-50 w-full" />
  <CookieBanner />
  <slot />
  <Footer />
</template>


