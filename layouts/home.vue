<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import CookieBanner from "~/components/CookieBanner.vue";
</script>

<template>
  <!-- Sticky Header with transparent mode for dark backgrounds -->
  <Header :hide-github-badge="true" :transparent="true" />
  <CookieBanner />
  <slot />
  <Footer />
</template>
