<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';

const { piecesCount, pending: piecesCountPending } = usePiecesCount();

// Computed pieces count for display (avoids hydration mismatch)
const displayPiecesCount = computed(() => {
  if (import.meta.client) {
    return piecesCountPending.value ? '500' : piecesCount.value;
  }
  return '500';
});

// Section visibility tracking
const sectionRefs = ref([]);
const visibleSections = ref(new Set());

// Expanded card states
const expandedCard = ref(null);

// Product showcase data with richer content
const showcases = computed(() => [
  {
    id: 'governance',
    category: 'CONTROL',
    title: 'Enterprise governance',
    headline: 'IT controls without complexity',
    description: 'Centralized AI providers, global connections, SSO/SCIM, granular permissions, and complete audit trails. Enterprise-ready from day one.',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    features: [
      { text: 'Azure OpenAI, AWS Bedrock, gateways', highlight: 'Your AI stack' },
      { text: 'SAML, OIDC, SCIM provisioning', highlight: 'SSO' },
      { text: 'Every action logged and auditable', highlight: 'Compliance' },
    ],
    stats: [
      { value: 'SOC 2', label: 'Type II' },
      { value: 'GDPR', label: 'Compliant' },
      { value: '100%', label: 'Audit coverage' },
    ],
  },
  {
    id: 'deployment',
    category: 'DEPLOY',
    title: 'Deploy your way',
    headline: 'Cloud or self-host. No execution fees.',
    description: 'Our cloud is SOC 2 Type II certified. Or self-host with a simple 4-component architecture. Either way, you never pay per task.',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    features: [
      { text: 'PostgreSQL + Redis + App + Workers', highlight: '4 components' },
      { text: 'Helm chart, Docker, AWS/GCP/Azure', highlight: 'Any platform' },
      { text: 'Run millions of tasks—same price', highlight: '$0 per execution' },
    ],
    stats: [
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '$0', label: 'Per task' },
      { value: '4', label: 'Components' },
    ],
  },
]);

// Intersection Observer for scroll animations
let observer = null;

const toggleCard = (id) => {
  expandedCard.value = expandedCard.value === id ? null : id;
};

onMounted(() => {
  // Section visibility tracking
  nextTick(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.dataset.id;
        if (entry.isIntersecting) {
          visibleSections.value.add(id);
        }
      });
    }, {
      threshold: [0.1, 0.3, 0.5],
      rootMargin: '-50px'
    });

    document.querySelectorAll('.showcase-section').forEach(el => {
      observer.observe(el);
    });
  });
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <div class="relative">
    <!-- Top gradient fade -->
    <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
    
    <!-- AI Agents Showcase (Full Width) -->
    <PagesIndexAiAgentsShowcase />
    
    <!-- AI Adoption Showcase (Full Width Playing Cards) -->
    <PagesIndexAiAdoptionShowcase />
    
    <!-- Other Showcase Sections -->
    <div class="space-y-0">
      <section
        v-for="(showcase, index) in showcases"
        :key="showcase.id"
        :data-id="showcase.id"
        class="showcase-section min-h-screen py-32 relative"
        :class="[
          index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
          visibleSections.has(showcase.id) ? 'opacity-100' : 'opacity-0'
        ]"
        :style="{ transition: 'opacity 0.8s ease-out' }"
      >
        <!-- Background Accent -->
        <div 
          class="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
          :class="`bg-gradient-to-l ${showcase.gradient}`"
        />
        
        <div class="max-w-7xl mx-auto px-4 relative">
          <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <!-- Content Side -->
            <div 
              class="space-y-8 transform transition-all duration-700"
              :class="visibleSections.has(showcase.id) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
              :style="{ transitionDelay: '0.2s' }"
            >
              <!-- Category Badge -->
              <div class="flex items-center gap-3">
                <span 
                  class="text-xs font-bold tracking-[0.2em] px-3 py-1 rounded-full"
                  :class="{
                    'bg-violet-100 text-violet-700': showcase.color === 'violet',
                    'bg-fuchsia-100 text-fuchsia-700': showcase.color === 'fuchsia',
                    'bg-cyan-100 text-cyan-700': showcase.color === 'cyan',
                    'bg-emerald-100 text-emerald-700': showcase.color === 'emerald',
                    'bg-amber-100 text-amber-700': showcase.color === 'amber',
                  }"
                >
                  {{ showcase.category }}
                </span>
                <span class="text-sm text-gray-400">{{ showcase.title }}</span>
              </div>

              <!-- Main Headline -->
              <h2 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1]">
                {{ showcase.headline }}
              </h2>

              <!-- Description -->
              <p class="text-xl text-gray-600 leading-relaxed max-w-xl">
                {{ showcase.description }}
              </p>

              <!-- Feature List with Hover Effects -->
              <ul class="space-y-4">
                <li 
                  v-for="(feature, fIndex) in showcase.features"
                  :key="fIndex"
                  class="group flex items-start gap-4 p-4 -mx-4 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg cursor-default"
                >
                  <div 
                    class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    :class="{
                      'bg-violet-100 text-violet-600': showcase.color === 'violet',
                      'bg-fuchsia-100 text-fuchsia-600': showcase.color === 'fuchsia',
                      'bg-cyan-100 text-cyan-600': showcase.color === 'cyan',
                      'bg-emerald-100 text-emerald-600': showcase.color === 'emerald',
                      'bg-amber-100 text-amber-600': showcase.color === 'amber',
                    }"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <span 
                      class="inline-block px-2 py-0.5 text-xs font-semibold rounded-md mb-1"
                      :class="{
                        'bg-violet-50 text-violet-600': showcase.color === 'violet',
                        'bg-fuchsia-50 text-fuchsia-600': showcase.color === 'fuchsia',
                        'bg-cyan-50 text-cyan-600': showcase.color === 'cyan',
                        'bg-emerald-50 text-emerald-600': showcase.color === 'emerald',
                        'bg-amber-50 text-amber-600': showcase.color === 'amber',
                      }"
                    >
                      {{ feature.highlight }}
                    </span>
                    <p class="text-gray-700">{{ feature.text }}</p>
                  </div>
                </li>
              </ul>

              <!-- CTA -->
              <div class="pt-4">
                <NuxtLink 
                  :to="showcase.id === 'adoption' ? '/product/ai-adoption' : showcase.id === 'governance' ? '/product/governance-and-management' : '/product/deployment-options'"
                  class="inline-flex items-center gap-2 font-semibold text-lg group"
                  :class="{
                    'text-violet-600 hover:text-violet-700': showcase.color === 'violet',
                    'text-fuchsia-600 hover:text-fuchsia-700': showcase.color === 'fuchsia',
                    'text-cyan-600 hover:text-cyan-700': showcase.color === 'cyan',
                    'text-emerald-600 hover:text-emerald-700': showcase.color === 'emerald',
                    'text-amber-600 hover:text-amber-700': showcase.color === 'amber',
                  }"
                >
                  Learn more
                  <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </NuxtLink>
              </div>
            </div>

            <!-- Visual Side -->
            <div 
              class="relative transform transition-all duration-700"
              :class="visibleSections.has(showcase.id) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
              :style="{ transitionDelay: '0.4s' }"
            >
              <!-- Stats Grid -->
              <div class="grid grid-cols-3 gap-4">
                <div
                  v-for="(stat, sIndex) in showcase.stats"
                  :key="sIndex"
                  class="relative group"
                >
                  <div 
                    class="p-6 rounded-2xl border transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl cursor-default"
                    :class="[
                      index % 2 === 0 ? 'bg-gray-50 border-gray-100 group-hover:bg-white' : 'bg-white border-gray-200',
                    ]"
                  >
                    <p 
                      class="text-3xl lg:text-4xl font-bold mb-1"
                      :class="{
                        'text-violet-600': showcase.color === 'violet',
                        'text-fuchsia-600': showcase.color === 'fuchsia',
                        'text-cyan-600': showcase.color === 'cyan',
                        'text-emerald-600': showcase.color === 'emerald',
                        'text-amber-600': showcase.color === 'amber',
                      }"
                    >
                      {{ stat.value }}
                    </p>
                    <p class="text-sm text-gray-500 font-medium">{{ stat.label }}</p>
                  </div>
                </div>
              </div>

              <!-- Decorative Element -->
              <div 
                class="absolute -z-10 inset-0 blur-3xl opacity-20 rounded-3xl"
                :class="`bg-gradient-to-br ${showcase.gradient}`"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Smooth scroll snap for sections */
.showcase-section {
  scroll-margin-top: 80px;
}
</style>
