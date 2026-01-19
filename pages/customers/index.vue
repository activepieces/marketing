<script setup>
const pageTitle = "Customer Stories";
const metaDesc = "See how companies like Alan and Funding Societies transform their operations with Activepieces AI automation.";
const metaKeywords = "case studies, customer stories, automation success stories, AI automation examples";

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: metaDesc },
    { name: "keywords", content: metaKeywords },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: metaDesc },
  ],
});

const caseStudies = [
  {
    slug: 'alan',
    company: 'Alan',
    industry: 'Healthcare',
    headline: '90% time saved on PM interview scheduling',
    subheadline: '2-3 interviews per week, fully automated with privacy-by-design',
    metric: '90%',
    metricLabel: 'Time Saved',
    color: '#4F46E5',
    logo: 'https://cdn.brandfetch.io/idSA2V0CQQ/w/512/h/512/theme/dark/icon.png',
  },
  {
    slug: 'funding-societies',
    company: 'Funding Societies',
    industry: 'Fintech',
    headline: 'An entire quarter of time saved',
    subheadline: '100+ flows, ~60 team members building, fewer errors',
    metric: '100+',
    metricLabel: 'Automation Flows',
    color: '#0891B2',
    logo: 'https://cdn.brandfetch.io/idMW1gKAa_/w/512/h/512/theme/dark/icon.png',
  }
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="pt-20 pb-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Customer Stories
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          See how leading companies use Activepieces to transform their operations with AI automation
        </p>
      </div>
    </section>

    <!-- Case Studies Grid -->
    <section class="pb-24 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8">
          <NuxtLink 
            v-for="study in caseStudies" 
            :key="study.slug"
            :to="`/customers/${study.slug}`"
            class="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <!-- Gradient Top Border -->
            <div 
              class="h-2 w-full"
              :style="{ background: `linear-gradient(90deg, ${study.color}, ${study.color}88)` }"
            ></div>
            
            <div class="p-8">
              <!-- Company Info -->
              <div class="flex items-center gap-4 mb-6">
                <img 
                  :src="study.logo" 
                  :alt="study.company" 
                  class="w-14 h-14 rounded-xl object-contain bg-gray-100 p-2"
                />
                <div>
                  <h3 class="text-xl font-bold text-gray-900">{{ study.company }}</h3>
                  <span class="text-sm text-gray-500">{{ study.industry }}</span>
                </div>
              </div>
              
              <!-- Headline -->
              <h4 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {{ study.headline }}
              </h4>
              <p class="text-gray-600 mb-6">{{ study.subheadline }}</p>
              
              <!-- Metric Badge -->
              <div class="flex items-center justify-between">
                <div 
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  :style="{ backgroundColor: `${study.color}15` }"
                >
                  <span class="text-2xl font-bold" :style="{ color: study.color }">{{ study.metric }}</span>
                  <span class="text-sm font-medium text-gray-600">{{ study.metricLabel }}</span>
                </div>
                
                <!-- Arrow -->
                <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-4 bg-gray-900">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to write your success story?
        </h2>
        <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of teams using Activepieces to automate their work with AI
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a 
            href="https://cloud.activepieces.com/sign-up" 
            class="inline-flex items-center px-6 py-3 text-base font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start free
          </a>
          <NuxtLink 
            to="/sales" 
            class="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
          >
            Talk to sales
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

