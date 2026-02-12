<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { PhCaretDown } from "@phosphor-icons/vue";

const props = defineProps({
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
  topGradientColor: {
    type: String,
    default: "",
  },
  bottomGradientColor: {
    type: String,
    default: "",
  },
  bottomSectionBackground: {
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

const displayedName = computed(() => {
  const index = productPages.findIndex((page) => route.path === page.path);
  return index >= 0 ? productPages[index].name : "Platform";
});

const menuOpen = ref(false);
const badgeRef = ref(null);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function handleClickOutside(e) {
  if (badgeRef.value && !badgeRef.value.contains(e.target)) {
    menuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const topGradientStyle = computed(() => {
  if (!props.topGradientColor) return {};
  const c = props.topGradientColor;
  return {
    background: `linear-gradient(${c} 0%, ${hexToRgba(c, 0.8)} 25%, ${hexToRgba(c, 0)} 36%)`,
  };
});

const bottomGradientStyle = computed(() => {
  if (!props.bottomGradientColor) return {};
  const c = props.bottomGradientColor;
  return {
    background: `linear-gradient(${hexToRgba(c, 0)} 43%, ${c} 88%)`,
  };
});
</script>

<template>
  <div class="w-full">
    <!-- TOP SECTION: Image + Gradients + Content -->
    <section class="w-full relative section-hero-dark">
      <!-- Background image -->
      <img
        v-if="backgroundImage"
        :src="backgroundImage"
        alt=""
        class="absolute inset-0 w-full h-full object-cover z-0"
      />

      <!-- Top gradient overlay -->
      <div
        v-if="topGradientColor"
        class="absolute inset-0 z-[1]"
        :style="topGradientStyle"
      ></div>

      <!-- Bottom gradient overlay -->
      <div
        v-if="bottomGradientColor"
        class="absolute inset-0 z-[1]"
        :style="bottomGradientStyle"
      ></div>

      <!-- Content -->
      <div
        class="max-w-7xl mx-auto pt-[180px] pb-16 lg:pb-24 px-4 relative z-10 flex flex-col items-center gap-16 lg:gap-[120px]"
      >
        <div class="flex flex-col items-center gap-6 max-w-3xl">
          <!-- Product badge pill with dropdown -->
          <div ref="badgeRef" class="relative">
            <button
              @click="toggleMenu"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 rounded-md text-white/80 text-sm font-medium hover:border-white/40 hover:text-white transition-all cursor-pointer"
            >
              <span>{{ displayedName }}</span>
              <PhCaretDown
                :size="12"
                weight="bold"
                class="transition-transform duration-200"
                :class="{ 'rotate-180': menuOpen }"
              />
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="menuOpen"
                class="absolute left-1/2 -translate-x-1/2 mt-1 min-w-[220px] bg-white rounded-lg overflow-hidden shadow-xl"
              >
                <NuxtLink
                  v-for="page in productPages"
                  :key="page.path"
                  :to="page.path"
                  @click="menuOpen = false"
                  class="block px-4 py-2.5 text-sm transition-colors"
                  :class="
                    route.path === page.path
                      ? 'text-primary-dark bg-primary-dark/5'
                      : 'text-primary-dark/80 hover:text-primary-dark hover:bg-primary-dark/5'
                  "
                >
                  {{ page.name }}
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Title -->
          <h1
            class="text-white text-balance text-4xl md:text-5xl lg:text-6xl font-sentient font-bold text-center lg:leading-[120%]"
          >
            {{ title }}
          </h1>

          <!-- Subtitle -->
          <p
            v-if="subtitle"
            class="text-white/80 text-lg md:text-xl lg:text-2xl text-balance text-center"
          >
            {{ subtitle }}
          </p>

          <!-- Buttons: secondary first, primary second (Figma order) -->
          <div class="flex flex-wrap justify-center gap-2 pt-2">
            <a
              :href="secondaryButton.href"
              :target="secondaryButton.external ? '_blank' : undefined"
              class="inline-flex items-center justify-center min-w-48 px-8 py-4 text-lg md:text-2xl font-medium text-white border-2 border-white/60 rounded-full hover:bg-white/10 transition-all hover:border-white/80"
            >
              {{ secondaryButton.text }}
            </a>
            <a
              :href="primaryButton.href"
              class="inline-flex items-center justify-center min-w-48 px-8 py-4 text-lg md:text-2xl font-medium text-[#190041] bg-white rounded-full hover:bg-gray-100 ring-0 ring-white transition-all duration-200 hover:ring-2 shadow-lg shadow-white/10"
            >
              {{ primaryButton.text }}
            </a>
          </div>
        </div>

        <!-- Company logos -->
        <div class="w-full max-w-full shrink-0">
          <PagesIndexCompanyLogos class="relative z-10" />
        </div>
      </div>
    </section>

    <!-- BOTTOM SECTION: Solid color + slot -->
    <section
      v-if="bottomSectionBackground"
      :style="{ backgroundColor: bottomSectionBackground }"
    >
      <div class="max-w-7xl mx-auto">
        <slot />
      </div>
    </section>
  </div>
</template>
