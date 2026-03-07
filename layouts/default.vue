<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import CookieBanner from "~/components/CookieBanner.vue";
</script>

<template>
  <!-- Sticky Header -->
  <Header :hide-github-badge="true" />
  <CookieBanner />
  <slot />
  <Footer />
</template>
