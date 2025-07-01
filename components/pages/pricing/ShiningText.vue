<template>
  <span class="shining-text text-base">
    <slot />
  </span>
</template>

<style scoped>
.shining-text {
  display: inline-block;
  line-height: 1.25rem;
  padding: 0;
  margin: 0;
  background: linear-gradient(110deg, #000 30%, #fff 55%, #000 70%, #000);
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