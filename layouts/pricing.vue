<script setup>
import { useHead } from '@unhead/vue'

useHead({
  bodyAttrs: {
    class: 'pt-[62px]',
  },
})
</script>

<template>
  <div>
    <Header :hide-github-badge="true" />

    <CookieBanner />
    <slot />
    <Footer />
  </div>
</template>
