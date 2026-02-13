<script setup></script>

<template>
  <!-- Sticky Header -->
  <Header :hide-github-badge="true" :transparent="true" />
  <CookieBanner />
  <slot />
  <Footer />
</template>
