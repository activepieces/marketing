<script setup>
import { ref } from 'vue'

let deploymentMode = ref('cloud')
</script>

<template>
  <PagesPricingMainTable :deployment-mode="deploymentMode" @deployment-mode-change="(newMode) => deploymentMode = newMode" />
  <PagesPricingCustomersLogos />
  <PagesPricingFAQ />
</template>