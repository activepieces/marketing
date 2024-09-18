<script setup></script>

<template>
  <div>
    <Header :hide-github-badge="true" />

    <CookieBanner />
    <slot />
    <Footer />
  </div>
</template>
