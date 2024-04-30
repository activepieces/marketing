<script setup>

</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <Header :hide-github-badge="true"  />

    <slot />
    <Footer />
  </div>
</template>