<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { usePiecesCount } from '~/composables/usePiecesCount';
const { piecesCount, pending: piecesCountPending } = usePiecesCount();

const products = [
  {
    id: 'agents',
    name: 'Agents',
    description: 'Your agents think, iterate, act and collaborate with humans. They can access our (pieces count) pieces.',
    media: 'products/agents.mp4',
    type: 'video',
  },
  {
    id: 'flows',
    name: 'Flows',
    description: 'Automation flows to connect apps and automate work. Build powerful workflows with no code.',
    media: 'products/flows.mp4',
    type: 'video',
  },
  {
    id: 'tables',
    name: 'Tables',
    description: 'Like Google Sheets, but deeply connected to your agents and automations. The central datastore to put your work on autopilot.',
    media: 'products/tables.mp4',
    type: 'video',
  },
  {
    id: 'mcps',
    name: 'MCPs',
    description: 'Tools for AI agents. Extend agent capabilities with custom plugins and integrations.',
    media: 'products/mcps.mp4',
    type: 'video',
  },
  {
    id: 'todos',
    name: 'Todos',
    description: 'Humans will always be in the loop. Agents and flows can request approvals from humans, including the back and forth.',
    media: 'products/todos.mp4',
    type: 'video',
  },
];

const sectionRefs = ref([]);
const currentSection = ref(0);
const threshold = ref(300); // Default for SSR

const productGradients = [
  'linear-gradient(135deg, #fffafd 0%, #fffef5 100%)', // Agents: pink/yellow
  'linear-gradient(135deg, #f0f7ff 0%, #e6fff7 100%)', // Flows: blue/green
  'linear-gradient(135deg, #f9f9ff 0%, #f7fff0 100%)', // Tables: purple/green
  'linear-gradient(135deg, #f8f6ff 0%, #f0f7ff 100%)', // MCPs: purple/blue
  'linear-gradient(135deg, #fffaf7 0%, #fff7fa 100%)', // Todos: yellow/pink
];

const productBulletColors = [
  '#E11D48', // Agents: strong magenta/rose
  '#2563EB', // Flows: vivid blue
  '#059669', // Tables: emerald green
  '#7C3AED', // MCPs: deep violet
  '#F59E42', // Todos: strong amber
];

const productNavBar = ref(null);

const updateCurrentSection = () => {
  const tops = sectionRefs.value.map(ref => ref?.getBoundingClientRect().top ?? Infinity);
  let active = 0;
  for (let i = 0; i < tops.length; i++) {
    if (tops[i] <= threshold.value) active = i;
  }
  currentSection.value = active;
};

onMounted(() => {
  threshold.value = window.innerHeight / 2;
  window.addEventListener('scroll', updateCurrentSection, { passive: true });
  updateCurrentSection();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateCurrentSection);
});

const scrollToSection = (i) => {
  sectionRefs.value[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Scroll the nav button into view if needed
  nextTick(() => {
    const nav = productNavBar.value;
    const btn = nav?.querySelectorAll('button')[i];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });
};

watch(currentSection, (i) => {
  // Scroll the nav button into view if needed when section changes (scrollspy)
  nextTick(() => {
    const nav = productNavBar.value;
    const btn = nav?.querySelectorAll('button')[i];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });
});
</script>

<template>
  <section class="max-w-screen-xl mx-auto pt-16 md:pt-40 pb-24 px-4 md:px-0">
    <!-- Section Heading -->
    <div class="px-0 md:px-8">
      <h2 class="font-libre-baskerville text-4xl md:text-5xl font-light leading-tight tracking-tight text-gray-900 dark:text-white mb-8 md:mb-16 text-left">
        The full AI automation and agents ecosystem
      </h2>
    </div>
    <!-- Sticky horizontal nav: after heading for correct sticky behavior -->
    <div ref="productNavBar" class="sticky top-[62px] z-20 bg-white border-b border-gray-100 md:hidden flex items-center overflow-x-auto px-4 gap-8 h-12 hide-scrollbar">
      <button
        v-for="(product, i) in products"
        :key="product.id"
        @click="scrollToSection(i)"
        class="flex items-center transition whitespace-nowrap"
        :class="currentSection === i
          ? 'font-medium text-gray-900'
          : 'font-normal text-gray-400'"
      >
        <span v-if="currentSection === i" class="inline-block w-3 h-3 rounded-[4px] mr-3" :style="{ backgroundColor: productBulletColors[i] }"></span>
        <span>{{ (i+1).toString().padStart(2, '0') }} {{ product.name }}</span>
      </button>
    </div>
    <div class="flex gap-0 md:gap-8 items-start px-0 md:px-8">
      <!-- Minimalist Left Nav -->
      <nav class="w-1/4 min-w-[180px] max-w-[220px] sticky top-32 self-start flex flex-col space-y-0 pt-2 hidden md:block">
        <ul class="flex flex-col">
          <li v-for="(product, i) in products" :key="product.id">
            <button
              @click="scrollToSection(i)"
              class="flex items-center w-full py-3 px-0 text-left text-base md:text-lg font-normal text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors group focus:outline-none"
              :aria-current="currentSection === i ? 'true' : undefined"
            >
              <span class="inline-block w-3 h-3 mr-3 flex items-center justify-center">
                <span v-if="currentSection === i" class="block w-3 h-3 rounded-[4px]" :style="{ backgroundColor: productBulletColors[i] }"></span>
                <span v-else class="block w-3 h-3 rounded-[4px] bg-gray-200 dark:bg-gray-700"></span>
              </span>
              <span :class="currentSection === i ? 'font-semibold text-black dark:text-white' : ''">
                {{ (i+1).toString().padStart(2, '0') }} {{ product.name }}
              </span>
            </button>
          </li>
        </ul>
      </nav>
      <!-- Minimalist Right Content -->
      <div class="w-full md:w-3/4 pl-0">
        <div
          v-for="(product, i) in products"
          :key="product.id"
          :ref="el => sectionRefs[i] = el"
          :class="[{ 'mb-12 md:mb-32': i !== products.length - 1 }, 'scroll-mt-32']"
        >
          <div :class="['flex flex-col relative overflow-hidden']" :style="{ backgroundImage: productGradients[i % productGradients.length] }">
            <div class="relative z-10">
              <div class="flex flex-col md:flex-row md:items-stretch md:justify-between gap-0 relative">
                <!-- Agents + description sandwiched -->
                <div class="relative flex-1 py-3">
                  <!-- Top horizontal line -->
                  <div class="absolute top-0 left-0 right-0 h-0 border-t border-black pointer-events-none" style="width:4000px; margin-left:-2000px;"></div>
                  <!-- Left vertical line -->
                  <div class="absolute top-0 bottom-0 left-0 w-0 border-l border-black pointer-events-none" style="height:4000px; margin-top:-2000px;"></div>
                  <h3 class="text-2xl md:text-3xl font-bold text-gray-900 pl-3">{{ product.name }}</h3>
                  <div class="w-full border-t border-black my-2"></div>
                  <p v-if="product.id === 'agents'" class="text-base md:text-lg text-black font-normal mt-2 text-balance pl-3">
                    AI Agents that can think and act. They can access
                    <span v-if="piecesCountPending">...</span><span v-else>{{ piecesCount }}</span>
                    tools and collaborate with humans. Your dream agentic team!
                  </p>
                  <p v-else-if="product.id === 'flows'" class="text-base md:text-lg text-black font-normal mt-2 text-balance pl-3">
                    No-code automation with AI and
                    <span v-if="piecesCountPending">...</span><span v-else>{{ piecesCount }}</span> pieces.
                    The easiest canvas to orchestrate your agents and apps altogether.
                  </p>
                  <p v-else-if="product.id === 'mcps'" class="text-base md:text-lg text-black font-normal mt-2 text-balance pl-3">
                    Our <span v-if="piecesCountPending">...</span><span v-else>{{ piecesCount }}</span> pieces can be used as tools to your external agents like Claude or Cursor. We manage the connection for you.
                  </p>
                  <p v-else class="text-base md:text-lg text-black font-normal mt-2 text-balance pl-3">{{ product.description }}</p>
                  <!-- Bottom horizontal line -->
                  <div class="absolute bottom-0 left-0 right-0 h-0 border-b border-black pointer-events-none" style="width:4000px; margin-left:-2000px;"></div>
                </div>
                <!-- Button sandwiched -->
                <div class="relative flex-shrink-0 flex flex-col min-w-[160px] md:min-w-[180px]" style="min-height:64px;">
                  <div class="flex flex-row items-stretch h-full justify-center">
                    <div class="absolute top-0 left-0 bottom-0 w-px border-l border-black"></div>
                    <a
                      href="https://cloud.activepieces.com/sign-up"
                      target="_blank"
                      rel="noopener"
                      class="bg-gray-900 text-white rounded-xl px-6 py-3 font-semibold shadow hover:bg-gray-800 transition whitespace-nowrap my-4 md:my-auto ml-0"
                    >
                      Start free
                    </a>
                    <div class="absolute bottom-0 left-0 w-full border-t border-black block md:hidden"></div>
                  </div>
                </div>
              </div>
              <div class="relative h-[400px] lg:h-[520px]" style="margin-left:0; max-width: 100%;">
                <!-- Sandwiching lines -->
                <div class="absolute bottom-0 left-0 right-0 h-0 border-b border-black pointer-events-none z-10" style="width:4000px; margin-left:-2000px;"></div>
                <div class="absolute top-0 bottom-0 left-0 w-0 border-l border-black pointer-events-none z-10" style="height:4000px; margin-top:-2000px;"></div>
                <div class="absolute top-0 bottom-0 right-0 w-0 border-r border-black pointer-events-none z-10" style="height:4000px; margin-top:-2000px;"></div>
                <div class="w-full h-full">
                  <img v-if="product.type === 'image'" :src="product.media" :alt="product.name + ' demo'" class="w-full h-full object-cover z-0" />
                  <video v-else :src="product.media" autoplay muted loop playsinline class="w-full h-full object-cover z-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-libre-baskerville {
  font-family: 'Libre Baskerville', serif;
}
.scroll-mt-32 {
  scroll-margin-top: 8rem;
}
/* Custom class for video expansion */
.card-video-expand {
  width: calc(100% + 2rem);
  max-width: none;
}
@media (min-width: 768px) {
  .card-video-expand {
    width: calc(100% + 3rem);
  }
}
/* Hide horizontal scrollbar for product nav bar */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
}
</style> 