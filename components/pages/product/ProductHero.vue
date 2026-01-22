<script setup>
import { ref, computed } from "vue";

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
  return productPages.findIndex((page) => route.path === page.path);
});

const displayedName = computed(() => {
  if (hoveredIndex.value !== null) {
    return productPages[hoveredIndex.value].name;
  }
  return currentPageIndex.value >= 0
    ? productPages[currentPageIndex.value].name
    : "Platform";
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
          <!-- All squares grouped together -->
          <NuxtLink
            v-for="(page, index) in productPages"
            :key="page.path"
            :to="page.path"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
          >
            <div
              class="w-2 h-2 rounded-sm transition-all duration-200"
              :class="[
                hoveredIndex === index
                  ? 'bg-white rotate-45'
                  : currentPageIndex === index
                  ? 'bg-white/60'
                  : 'bg-white/20',
              ]"
            />
          </NuxtLink>

          <!-- Label after all squares -->
          <span class="ml-1" :class="hoveredIndex !== null ? 'text-white' : ''">
            {{ displayedName }}
          </span>
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
