<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useProductSubmenu } from '~/composables/useProductSubmenu';

const { setSections, clearSections } = useProductSubmenu();

const sections = [
  // Sections will be added when content is created
];

useHead({
  title: 'Deployment & Cost',
  meta: [
    { name: 'description', content: 'Deployment options with maximum security' }
  ]
});

// Set sections for the header submenu
onMounted(() => {
  setSections(sections);
});

onUnmounted(() => {
  clearSections();
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="w-full relative bg-black pt-4 pb-16 lg:pb-20">
      <div
        class="absolute inset-0 z-0"
        style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.5), transparent 70%), #000000"
      ></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <ProductSubmenu />
        <div class="max-w-3xl mx-auto text-center pt-16 lg:pt-24">
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6">
            Deployment Options
          </h1>
          <p class="text-xl text-gray-300 leading-relaxed mb-8">
            Coming soon...
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://cloud.activepieces.com/sign-up" class="inline-flex items-center px-6 py-3 text-base font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors">
              Start free
            </a>
            <a href="/sales" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
