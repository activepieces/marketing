<script setup>
const route = useRoute();

const productPages = [
  { name: 'Adoption & Training', path: '/product/ai-adoption' },
  { name: 'AI Agents', path: '/product/ai-agent-builder' },
  { name: 'Control & Governance', path: '/product/governance-and-management' },
  { name: 'Deployment & Cost', path: '/product/deployment-options' },
];

const isActive = (path) => route.path === path;
</script>

<template>
  <div class="w-full pt-8 pb-4">
    <div class="max-w-[1230px] mx-auto px-4">
      <nav class="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
        <NuxtLink
          v-for="page in productPages"
          :key="page.path"
          :to="page.path"
          class="product-chip px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300"
          :class="[
            isActive(page.path) 
              ? 'bg-white text-black shadow-sm product-chip-active' 
              : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20'
          ]"
        >
          {{ page.name }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Chip expansion animation */
.chip-expanding {
  transform: scale(0.8);
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
</style>

