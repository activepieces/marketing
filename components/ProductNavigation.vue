<script setup>
const route = useRoute();

const productPages = [
  { 
    name: 'AI Adoption Stack', 
    path: '/product/ai-adoption',
    description: 'Templates, analytics & gamification to drive adoption',
    icon: '🚀'
  },
  { 
    name: 'AI Agents', 
    path: '/product/ai-agent-builder',
    description: 'Build everyday and advanced AI agents visually',
    icon: '🤖'
  },
  { 
    name: 'Control & Governance', 
    path: '/product/governance-and-management',
    description: 'IT controls, permissions & oversight tools',
    icon: '🛡️'
  },
  { 
    name: 'Deployment & Cost', 
    path: '/product/deployment-options',
    description: 'Cloud, self-hosted & air-gapped deployments',
    icon: '☁️'
  },
];

const currentIndex = computed(() => 
  productPages.findIndex(page => page.path === route.path)
);

const prevPage = computed(() => 
  currentIndex.value > 0 ? productPages[currentIndex.value - 1] : null
);

const nextPage = computed(() => 
  currentIndex.value < productPages.length - 1 ? productPages[currentIndex.value + 1] : null
);
</script>

<template>
  <section class="py-16 bg-gray-50 border-t border-gray-100">
    <div class="max-w-[1230px] mx-auto px-4">
      <p class="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">Continue exploring</p>
      
      <div class="grid gap-5" :class="{ 
        'md:grid-cols-2': prevPage && nextPage,
        'md:grid-cols-1': !prevPage || !nextPage
      }">
        
        <!-- Previous Page -->
        <NuxtLink 
          v-if="prevPage"
          :to="prevPage.path"
          class="group block bg-white rounded-xl p-5 border border-gray-200 hover:border-transparent relative overflow-hidden transition-colors duration-300 max-w-lg"
          :class="{ 'justify-self-start': !nextPage }"
        >
          <!-- Gradient border on hover -->
          <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gradient-border"></div>
          
          <div class="relative flex items-center gap-4">
            <!-- Arrow -->
            <svg class="w-8 h-8 text-gray-300 group-hover:text-purple-400 transition-colors duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
            
            <div class="flex-1 min-w-0">
              <span class="text-xs font-medium uppercase tracking-wider text-gray-400 block mb-0.5">Previous</span>
              <h3 class="text-base font-semibold text-gray-900 flex items-center gap-2">
                <span>{{ prevPage.icon }}</span>
                <span>{{ prevPage.name }}</span>
              </h3>
              <p class="text-sm text-gray-500 mt-0.5 line-clamp-1">{{ prevPage.description }}</p>
            </div>
          </div>
        </NuxtLink>

        <!-- Next Page -->
        <NuxtLink 
          v-if="nextPage"
          :to="nextPage.path"
          class="group block bg-white rounded-xl p-5 border border-gray-200 hover:border-transparent relative overflow-hidden transition-colors duration-300 max-w-lg"
          :class="{ 'justify-self-end': !prevPage }"
        >
          <!-- Gradient border on hover -->
          <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none gradient-border"></div>
          
          <div class="relative flex items-center gap-4">
            <div class="flex-1 min-w-0 text-right">
              <span class="text-xs font-medium uppercase tracking-wider text-gray-400 block mb-0.5">Next</span>
              <h3 class="text-base font-semibold text-gray-900 flex items-center justify-end gap-2">
                <span>{{ nextPage.name }}</span>
                <span>{{ nextPage.icon }}</span>
              </h3>
              <p class="text-sm text-gray-500 mt-0.5 line-clamp-1">{{ nextPage.description }}</p>
            </div>
            
            <!-- Arrow -->
            <svg class="w-8 h-8 text-gray-300 group-hover:text-cyan-400 transition-colors duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>

      </div>
    </div>
  </section>
</template>

<style scoped>
.gradient-border {
  --angle: 0deg;
  background: conic-gradient(
    from var(--angle),
    #a78bfa,
    #c4b5fd,
    #ddd6fe,
    #f5d0fe,
    #a5f3fc,
    #c7d2fe,
    #a78bfa
  );
  opacity: 0;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1.5px;
  animation: rotate-gradient 4s linear infinite;
  transition: opacity 0.3s ease;
}

.group:hover .gradient-border {
  opacity: 0.8;
}

@keyframes rotate-gradient {
  0% {
    --angle: 0deg;
  }
  100% {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
</style>
