<script setup>

import { onMounted } from 'vue'
import { initTabs } from 'flowbite'

onMounted(() => {
  initTabs();
});
</script>

<template>
  <PagesIndexHero />
  <PagesIndexOfferings />
  <PagesIndexSocialProof />
  <PagesIndexUseCases />
  <PagesIndexFeatures />
  <PagesIndexPieces />
</template>