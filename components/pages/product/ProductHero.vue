<script setup>
import { ref, computed } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  backgroundImage: {
    type: String,
    default: "",
  },
  backgroundGradient: {
    type: String,
    default: "",
  },
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const { productPages } = useProductPages();

const hoveredIndex = ref(null);

const currentPageIndex = computed(() => {
  return productPages.findIndex(page => route.path === page.path);
});

const currentPageName = computed(() => {
  const index = currentPageIndex.value;
  return index >= 0 ? productPages[index].name : 'Platform';
});

const pagesBefore = computed(() => {
  return productPages.slice(0, currentPageIndex.value);
});

const pagesAfter = computed(() => {
  return productPages.slice(currentPageIndex.value + 1);
});

const currentPage = computed(() => {
  return productPages[currentPageIndex.value];
});
</script>

<template>
  <section class="w-full relative section-hero-dark pt-4 pb-16 lg:pb-24">
    <!-- Image background -->
    <img
      v-if="backgroundImage"
      :src="backgroundImage"
      alt=""
      class="absolute inset-0 w-full h-full object-cover z-0"
    />
    <!-- Gradient background fallback -->
    <div
      v-else-if="backgroundGradient"
      class="absolute inset-0 z-0"
      :style="{ background: backgroundGradient }"
    ></div>

    <div
      class="max-w-7xl mx-auto pt-40 pb-10 px-4 relative z-10 flex flex-col gap-16"
    >
      <div class="flex flex-col gap-8">
        <div
          class="text-white/60 text-sm uppercase font-semibold flex items-center gap-2"
        >
          <!-- Pages before current -->
          <NuxtLink
            v-for="(page, index) in pagesBefore"
            :key="page.path"
            :to="page.path"
            class="relative"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
          >
            <div
              class="w-2 h-2 bg-white/20 rounded-sm transition-all duration-200"
              :class="{ 'rotate-45 scale-125 bg-white/40': hoveredIndex === index }"
            />
            <!-- Tooltip -->
            <div
              v-if="hoveredIndex === index"
              class="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap text-white/80 text-xs normal-case"
            >
              {{ page.name }}
            </div>
          </NuxtLink>

          <!-- Current page square (highlighted) -->
          <NuxtLink v-if="currentPage" :to="currentPage.path" class="relative">
            <div class="w-2 h-2 bg-white/60 rounded-sm" />
          </NuxtLink>

          <!-- Current page name -->
          {{ currentPageName }}

          <!-- Pages after current -->
          <NuxtLink
            v-for="(page, index) in pagesAfter"
            :key="page.path"
            :to="page.path"
            class="relative"
            @mouseenter="hoveredIndex = currentPageIndex + 1 + index"
            @mouseleave="hoveredIndex = null"
          >
            <div
              class="w-2 h-2 bg-white/20 rounded-sm transition-all duration-200"
              :class="{ 'rotate-45 scale-125 bg-white/40': hoveredIndex === currentPageIndex + 1 + index }"
            />
            <!-- Tooltip -->
            <div
              v-if="hoveredIndex === currentPageIndex + 1 + index"
              class="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap text-white/80 text-xs normal-case"
            >
              {{ page.name }}
            </div>
          </NuxtLink>
        </div>
        <h1 class="text-white text-balance text-7xl font-sentient font-medium">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="text-white/80 text-2xl text-balance">
          {{ subtitle }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <a
          :href="primaryButton.href"
          class="inline-flex items-center justify-center min-w-60 px-6 py-4 text-xl font-semibold text-gray-900 bg-white rounded-full hover:bg-gray-100 ring-0 ring-white transition-all duration-200 hover:ring-2 shadow-lg shadow-white/10"
        >
          {{ primaryButton.text }}
        </a>
        <a
          :href="secondaryButton.href"
          :target="secondaryButton.external ? '_blank' : undefined"
          class="inline-flex items-center px-8 py-4 text-xl font-semibold text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-all hover:border-white/40"
        >
          {{ secondaryButton.text }}
        </a>
      </div>

      <div class="w-full max-w-full shrink-0">
        <PagesIndexCompanyLogos class="relative z-10" />
      </div>
    </div>
  </section>
</template>
