<script setup>
import { useHead } from '@unhead/vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import CookieBanner from '~/components/CookieBanner.vue'
import { useStorage } from '@vueuse/core'

const showAnnouncementBar = useStorage('announcement-bar-closed', false)

useHead({
  bodyAttrs: {
    class: showAnnouncementBar.value ? 'pt-[62px]' : 'pt-[102px]', // 62px (header) or 102px (announcement + header)
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
