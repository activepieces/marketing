<template>
  <span class="shining-text text-sm">
    <slot />
  </span>
</template>

<style scoped>
.shining-text {
  display: inline-block;
  line-height: 1.25rem;
  padding: 0;
  margin: 0;
  background: linear-gradient(110deg, #404040 30%, #fff 55%, #404040 70%, #404040);
  background-size: 600% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: shine 20s linear infinite;
}
@keyframes shine {
  0% {
    background-position: 600% 0;
  }
  100% {
    background-position: -600% 0;
  }
}
</style> 