<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Advice for Others'
  },
  authorName: {
    type: String,
    required: true
  },
  authorRole: {
    type: String,
    required: true
  },
  authorImage: {
    type: String,
    required: true
  },
  authorSubtitle: {
    type: String,
    required: true
  },
  slides: {
    type: Array,
    required: true
    // Array of { number: string, title: string, description: string }
  },
  // Whether the author image should use object-top positioning
  authorImageTop: {
    type: Boolean,
    default: false
  },
  // Array of gradient classes for each slide
  slideGradients: {
    type: Array,
    default: () => [
      'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700',
      'bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600',
      'bg-gradient-to-br from-fuchsia-600 via-pink-600 to-rose-600',
      'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500',
      'bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600'
    ]
  }
});

const currentSlide = ref(0);
const carouselRef = ref(null);

const scrollToSlide = (index) => {
  if (!carouselRef.value) return;
  const slides = carouselRef.value.children;
  if (slides && slides[index]) {
    slides[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
};

const nextSlide = () => {
  if (currentSlide.value < props.slides.length - 1) {
    currentSlide.value++;
    scrollToSlide(currentSlide.value);
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
    scrollToSlide(currentSlide.value);
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
  scrollToSlide(index);
};

const onCarouselScroll = () => {
  if (!carouselRef.value) return;
  const container = carouselRef.value;
  const scrollLeft = container.scrollLeft;
  const slideWidth = container.children[0]?.offsetWidth + 16; // 16 = gap
  const newSlide = Math.round(scrollLeft / slideWidth);
  if (newSlide !== currentSlide.value && newSlide >= 0 && newSlide < props.slides.length) {
    currentSlide.value = newSlide;
  }
};

const getSlideGradient = (index) => {
  return props.slideGradients[index % props.slideGradients.length];
};
</script>

<template>
  <section class="mb-28 -mx-6 scroll-mt-56">
    <div class="px-6 mb-10">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">{{ title }}</h2>
      
      <!-- Author intro - outside carousel -->
      <div class="flex items-center gap-5">
        <img 
          :src="authorImage" 
          :alt="authorName" 
          class="w-16 h-16 rounded-full"
          :class="authorImageTop ? 'object-cover object-top' : 'object-cover'"
        />
        <div>
          <div class="text-lg font-semibold text-gray-900">{{ authorName }}</div>
          <div class="text-base text-gray-500">{{ authorRole }}</div>
          <div class="text-base text-gray-400 mt-1">{{ authorSubtitle }}</div>
        </div>
      </div>
    </div>

    <!-- Carousel Container -->
    <div class="relative group">
      <!-- Slides wrapper -->
      <div 
        ref="carouselRef"
        class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 pb-4" 
        style="scroll-behavior: smooth;"
        @scroll="onCarouselScroll"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="flex-shrink-0 w-[85%] md:w-[70%] snap-center"
        >
          <div 
            class="rounded-2xl p-10 md:p-12 text-white overflow-hidden relative h-full min-h-[300px]"
            :class="getSlideGradient(index)"
          >
            <!-- Decorative elements -->
            <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
            
            <!-- Content -->
            <div class="relative">
              <div class="text-8xl font-bold text-white/20 absolute -top-2 -left-1">{{ slide.number }}</div>
              <div class="relative pt-12">
                <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ slide.title }}</h3>
                <p class="text-lg text-white/80 leading-relaxed">{{ slide.description }}</p>
              </div>
            </div>

            <!-- Slide indicator -->
            <div class="absolute bottom-8 right-8 text-sm text-white/50">
              {{ index + 1 }} / {{ slides.length }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Left Arrow -->
      <button 
        v-if="currentSlide > 0"
        @click="prevSlide"
        class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all"
      >
        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <!-- Right Arrow -->
      <button 
        v-if="currentSlide < slides.length - 1"
        @click="nextSlide"
        class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-200 items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all"
      >
        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      
      <!-- Dots navigation below -->
      <div class="flex justify-center gap-2 mt-4 px-6">
        <button 
          v-for="(slide, index) in slides" 
          :key="index"
          @click="goToSlide(index)"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'bg-gray-900 w-6' : 'bg-gray-300 hover:bg-gray-400'"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

