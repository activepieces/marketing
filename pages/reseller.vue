<script setup>
import { ref, computed } from 'vue'

const pageTitle = 'Become a Reseller Partner';
const metaDesc = 'Join the Activepieces Partner Program. Resell AI automation solutions to your clients, earn recurring revenue, and grow your business with dedicated support.';
const metaKeywords = 'activepieces reseller, automation partner program, ai automation agency, no-code reseller, automation consultant partner';

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
});

definePageMeta({
  layout: 'default'
});

// Form state
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  website: '',
  partnerType: '',
  clientCount: '',
  expertise: [],
  message: ''
});

const sendingStatus = ref('new');

const partnerTypes = [
  { value: 'agency', label: 'Digital Agency' },
  { value: 'consultant', label: 'Consultant / Freelancer' },
  { value: 'msp', label: 'Managed Service Provider (MSP)' },
  { value: 'si', label: 'System Integrator' },
  { value: 'var', label: 'Value Added Reseller (VAR)' },
  { value: 'technology', label: 'Technology Partner' },
  { value: 'other', label: 'Other' }
];

const clientCountRanges = [
  { value: '1-10', label: '1 - 10 clients' },
  { value: '11-50', label: '11 - 50 clients' },
  { value: '51-100', label: '51 - 100 clients' },
  { value: '101-500', label: '101 - 500 clients' },
  { value: '500+', label: '500+ clients' }
];

const expertiseAreas = [
  { value: 'automation', label: 'Business Automation' },
  { value: 'ai', label: 'AI / Machine Learning' },
  { value: 'crm', label: 'CRM Implementation' },
  { value: 'marketing', label: 'Marketing Automation' },
  { value: 'operations', label: 'Operations / Process' },
  { value: 'development', label: 'Custom Development' },
  { value: 'data', label: 'Data & Analytics' },
  { value: 'integration', label: 'System Integration' }
];

const isFormValid = computed(() => {
  return formData.value.firstName && 
         formData.value.lastName && 
         formData.value.email && 
         formData.value.company &&
         formData.value.partnerType;
});

const submitForm = async () => {
  if (!isFormValid.value) return;
  
  sendingStatus.value = 'pending';
  
  try {
    // In production, this would submit to an API
    await new Promise(resolve => setTimeout(resolve, 1500));
    sendingStatus.value = 'sent';
  } catch (error) {
    alert('There was an error submitting your application. Please try again.');
    sendingStatus.value = 'new';
  }
};

const toggleExpertise = (value) => {
  const index = formData.value.expertise.indexOf(value);
  if (index === -1) {
    formData.value.expertise.push(value);
  } else {
    formData.value.expertise.splice(index, 1);
  }
};

const benefits = [
  {
    icon: 'revenue',
    title: 'Recurring Revenue',
    description: 'Earn up to 30% recurring commission on every client you bring. Build a predictable revenue stream that grows with your client base.',
    highlight: 'Up to 30% commission'
  },
  {
    icon: 'discount',
    title: 'Partner Discounts',
    description: 'Access exclusive partner pricing to maximize your margins. The more you sell, the better your rates become.',
    highlight: 'Exclusive pricing tiers'
  },
  {
    icon: 'training',
    title: 'Partner Certification',
    description: 'Get certified through our partner training program. Stand out as an official Activepieces implementation expert.',
    highlight: 'Official certification'
  },
  {
    icon: 'support',
    title: 'Priority Support',
    description: 'Direct access to our partner success team. Get answers fast with dedicated Slack channels and priority tickets.',
    highlight: 'Dedicated partner team'
  },
  {
    icon: 'leads',
    title: 'Lead Referrals',
    description: 'Qualified leads in your region sent directly to you. We pass opportunities to partners who can serve them best.',
    highlight: 'Qualified lead sharing'
  },
  {
    icon: 'marketing',
    title: 'Co-Marketing',
    description: 'Joint webinars, case studies, and featured partner directory listing. Amplify your brand with ours.',
    highlight: 'Partner directory listing'
  }
];

const getIcon = (iconName) => {
  const icons = {
    revenue: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>`,
    discount: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>`,
    training: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>`,
    support: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>`,
    leads: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>`,
    marketing: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
    </svg>`
  };
  return icons[iconName] || '';
};

const partnerTiers = [
  {
    name: 'Registered',
    color: 'gray',
    requirements: ['Complete partner application', 'Sign partner agreement'],
    benefits: ['Partner portal access', '15% commission', 'Basic support', 'Marketing materials']
  },
  {
    name: 'Silver',
    color: 'slate',
    requirements: ['5+ active clients', 'Partner certification', '6+ months partnership'],
    benefits: ['20% commission', 'Priority support', 'Co-marketing opportunities', 'Lead referrals']
  },
  {
    name: 'Gold',
    color: 'amber',
    requirements: ['15+ active clients', 'Advanced certification', '12+ months partnership'],
    benefits: ['25% commission', 'Dedicated partner manager', 'Joint webinars', 'Case study features']
  },
  {
    name: 'Platinum',
    color: 'violet',
    requirements: ['30+ active clients', 'Enterprise certification', 'Strategic alignment'],
    benefits: ['30% commission', 'Executive sponsor', 'Custom integrations', 'Revenue share bonuses']
  }
];

const useCases = [
  {
    industry: 'Digital Agencies',
    description: 'Offer AI automation as a service to your clients. Build custom workflows that drive results and create recurring revenue.',
    icon: '🏢'
  },
  {
    industry: 'Consultants',
    description: 'Help clients modernize operations with AI. Position yourself as an automation expert and expand your service offerings.',
    icon: '💼'
  },
  {
    industry: 'MSPs',
    description: 'Add AI automation to your managed services stack. Deliver more value while increasing monthly recurring revenue.',
    icon: '🖥️'
  },
  {
    industry: 'System Integrators',
    description: 'Connect enterprise systems with AI-powered workflows. Solve complex integration challenges with a flexible platform.',
    icon: '🔌'
  }
];
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-black pt-4 pb-20 overflow-hidden">
      <!-- Gradient Background -->
      <div
        class="absolute inset-0 z-0"
        style="background: radial-gradient(ellipse 100% 80% at 50% -20%, rgba(99, 102, 241, 0.4), transparent 60%), radial-gradient(ellipse 80% 60% at 80% 20%, rgba(139, 92, 246, 0.3), transparent 50%), #000000"
      ></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 z-10 opacity-20" style="background-image: repeating-linear-gradient(90deg, #ffffff08 0 1px, transparent 1px 50px), repeating-linear-gradient(#ffffff08 0 1px, transparent 1px 50px);"></div>
      
      <div class="max-w-[1230px] mx-auto px-4 relative z-20">
        <div class="max-w-3xl mx-auto text-center pt-20 lg:pt-28">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <span class="text-2xl">🤝</span>
            <span class="text-white font-medium">Partner Program</span>
          </div>
          
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6">
            Grow your business with<br />
            <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">AI automation</span>
          </h1>
          
          <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the Activepieces Partner Program. Resell the leading open-source AI automation platform, earn recurring commissions, and help your clients transform with AI.
          </p>
          
          <div class="flex flex-wrap justify-center gap-4">
            <a href="#apply" class="inline-flex items-center px-8 py-4 text-base font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Become a Partner
            </a>
            <a href="#benefits" class="inline-flex items-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              View Benefits
            </a>
          </div>
          
          <!-- Trust badges -->
          <div class="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              <span class="text-sm">SOC 2 Compliant</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              <span class="text-sm">500+ Integrations</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="text-sm">100+ Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="py-24 bg-white relative overflow-hidden">
      <!-- Subtle gradient background -->
      <div class="absolute inset-0 z-0" style="background: radial-gradient(circle at top left, rgba(99, 102, 241, 0.05), transparent 60%), radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.05), transparent 60%);"></div>
      
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why partner with us?
          </h2>
          <p class="text-xl text-gray-600">
            We're committed to your success. Here's what you get as an Activepieces partner.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="benefit in benefits" 
            :key="benefit.title"
            class="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300"
          >
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <span class="text-indigo-600" v-html="getIcon(benefit.icon)"></span>
            </div>
            <div class="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full mb-3">
              {{ benefit.highlight }}
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ benefit.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Partner Tiers Section -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-[1230px] mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Partner tiers
          </h2>
          <p class="text-xl text-gray-600">
            Grow with us and unlock better benefits at every level
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(tier, index) in partnerTiers" 
            :key="tier.name"
            class="relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl"
            :class="{
              'border-gray-200': tier.color === 'gray',
              'border-slate-300': tier.color === 'slate',
              'border-amber-400': tier.color === 'amber',
              'border-violet-500': tier.color === 'violet'
            }"
          >
            <!-- Header -->
            <div 
              class="p-6 text-center"
              :class="{
                'bg-gray-100': tier.color === 'gray',
                'bg-slate-100': tier.color === 'slate',
                'bg-gradient-to-br from-amber-50 to-amber-100': tier.color === 'amber',
                'bg-gradient-to-br from-violet-100 to-purple-100': tier.color === 'violet'
              }"
            >
              <h3 class="text-2xl font-bold" :class="{
                'text-gray-700': tier.color === 'gray',
                'text-slate-700': tier.color === 'slate',
                'text-amber-700': tier.color === 'amber',
                'text-violet-700': tier.color === 'violet'
              }">{{ tier.name }}</h3>
            </div>
            
            <!-- Requirements -->
            <div class="p-6 border-b border-gray-100">
              <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Requirements</h4>
              <ul class="space-y-2">
                <li v-for="req in tier.requirements" :key="req" class="flex items-start gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  {{ req }}
                </li>
              </ul>
            </div>
            
            <!-- Benefits -->
            <div class="p-6">
              <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Benefits</h4>
              <ul class="space-y-2">
                <li v-for="ben in tier.benefits" :key="ben" class="flex items-start gap-2 text-sm text-gray-700">
                  <svg class="w-4 h-4 flex-shrink-0 mt-0.5" :class="{
                    'text-gray-500': tier.color === 'gray',
                    'text-slate-500': tier.color === 'slate',
                    'text-amber-500': tier.color === 'amber',
                    'text-violet-500': tier.color === 'violet'
                  }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ ben }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases Section -->
    <section class="py-24 bg-white">
      <div class="max-w-[1230px] mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Who partners with us
          </h2>
          <p class="text-xl text-gray-600">
            Organizations of all types are growing their business with Activepieces
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div 
            v-for="useCase in useCases" 
            :key="useCase.industry"
            class="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-start gap-5">
              <div class="text-5xl">{{ useCase.icon }}</div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{{ useCase.industry }}</h3>
                <p class="text-gray-600">{{ useCase.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-[1230px] mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How to get started
          </h2>
          <p class="text-xl text-gray-600">
            Becoming a partner is simple — here's the process
          </p>
        </div>
        
        <div class="relative">
          <!-- Connection Line -->
          <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 -translate-y-1/2"></div>
          
          <div class="grid lg:grid-cols-4 gap-8 relative">
            <div class="text-center relative">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">
                1
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Apply</h3>
              <p class="text-gray-600">Fill out the partner application with your company details</p>
            </div>
            
            <div class="text-center relative">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">
                2
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Get Onboarded</h3>
              <p class="text-gray-600">Our partner team reviews and schedules your onboarding call</p>
            </div>
            
            <div class="text-center relative">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">
                3
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Get Certified</h3>
              <p class="text-gray-600">Complete partner training and earn your certification</p>
            </div>
            
            <div class="text-center relative">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">
                4
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Start Selling</h3>
              <p class="text-gray-600">Access partner portal, start selling, and earn commissions</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Form Section -->
    <section id="apply" class="py-24 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <!-- Gradient overlays -->
      <div class="absolute inset-0" style="background: radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.2), transparent 50%), radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.2), transparent 50%);"></div>
      
      <div class="max-w-[800px] mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
            Apply to the Partner Program
          </h2>
          <p class="text-xl text-gray-300">
            Tell us about your business and how you'd like to partner with us
          </p>
        </div>
        
        <!-- Success State -->
        <div v-if="sendingStatus === 'sent'" class="bg-white rounded-2xl p-12 text-center">
          <div class="text-6xl mb-6">🎉</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
          <p class="text-gray-600 mb-8">Thank you for your interest in becoming a partner! Our partner team will review your application and reach out within 2-3 business days.</p>
          <a href="/" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity">
            Back to Home
          </a>
        </div>
        
        <!-- Form -->
        <form v-else @submit.prevent="submitForm" class="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl">
          <div class="space-y-6">
            <!-- Name Row -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="formData.firstName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="formData.lastName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Work Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="you@company.com"
                required
              />
            </div>
            
            <!-- Company -->
            <div>
              <label for="company" class="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
              <input 
                type="text" 
                id="company" 
                v-model="formData.company"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Your company"
                required
              />
            </div>
            
            <!-- Website -->
            <div>
              <label for="website" class="block text-sm font-semibold text-gray-700 mb-2">Company Website</label>
              <input 
                type="url" 
                id="website" 
                v-model="formData.website"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="https://yourcompany.com"
              />
            </div>
            
            <!-- Partner Type -->
            <div>
              <label for="partnerType" class="block text-sm font-semibold text-gray-700 mb-2">Partner Type *</label>
              <select 
                id="partnerType" 
                v-model="formData.partnerType"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              >
                <option value="">Select your business type</option>
                <option v-for="p in partnerTypes" :key="p.value" :value="p.value">{{ p.label }}</option>
              </select>
            </div>
            
            <!-- Client Count -->
            <div>
              <label for="clientCount" class="block text-sm font-semibold text-gray-700 mb-2">Current Client Base</label>
              <select 
                id="clientCount" 
                v-model="formData.clientCount"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="">Select range</option>
                <option v-for="r in clientCountRanges" :key="r.value" :value="r.value">{{ r.label }}</option>
              </select>
            </div>
            
            <!-- Expertise Areas -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Areas of Expertise</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="area in expertiseAreas"
                  :key="area.value"
                  type="button"
                  @click="toggleExpertise(area.value)"
                  class="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
                  :class="formData.expertise.includes(area.value) 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'"
                >
                  {{ area.label }}
                </button>
              </div>
            </div>
            
            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Tell us about your business</label>
              <textarea 
                id="message" 
                v-model="formData.message"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-colors"
                placeholder="What industries do you serve? What automation challenges do your clients face? How do you envision partnering with Activepieces?"
              ></textarea>
            </div>
            
            <!-- Submit -->
            <div class="pt-4">
              <button 
                type="submit"
                :disabled="!isFormValid || sendingStatus === 'pending'"
                class="w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span v-if="sendingStatus === 'pending'">Submitting...</span>
                <span v-else>Submit Application</span>
              </button>
              <p class="text-center text-sm text-gray-500 mt-4">
                Our partner team reviews applications within 2-3 business days
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-white">
      <div class="max-w-[800px] mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Partner FAQ
          </h2>
        </div>
        
        <div class="space-y-6">
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">What are the requirements to become a partner?</h3>
            <p class="text-gray-600">We look for partners with relevant expertise (automation, integration, consulting) and a genuine interest in helping clients succeed with AI automation. There's no minimum client count to get started — we work with consultants and enterprises alike.</p>
          </div>
          
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">How does commission work?</h3>
            <p class="text-gray-600">Partners earn recurring commission on all referred customers for as long as they remain customers. Commission rates range from 15% to 30% depending on your partner tier, which is based on your performance and engagement level.</p>
          </div>
          
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">What training and support do you provide?</h3>
            <p class="text-gray-600">All partners get access to our partner certification program, which includes product training, sales enablement materials, and technical documentation. Higher tiers get dedicated partner managers, priority support channels, and access to our engineering team for complex implementations.</p>
          </div>
          
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Can I white-label Activepieces for my clients?</h3>
            <p class="text-gray-600">Yes! Activepieces supports full white-labeling, including custom domains, logos, and branding. This is perfect for agencies and MSPs who want to offer automation under their own brand.</p>
          </div>
          
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Do you provide sales leads?</h3>
            <p class="text-gray-600">Yes, qualified partners receive lead referrals from prospects in their region or industry. We actively pass opportunities to partners who are best positioned to serve them, particularly at Silver tier and above.</p>
          </div>
          
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">What's the difference between cloud and self-hosted for clients?</h3>
            <p class="text-gray-600">Partners can offer both options. Cloud is fully managed by us with SOC 2 compliance. Self-hosted gives clients full control over their data and infrastructure. Both options support white-labeling and enterprise features.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div class="max-w-[800px] mx-auto px-4 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
          Ready to grow with us?
        </h2>
        <p class="text-xl text-white/90 mb-8">
          Join our partner network and start building recurring revenue
        </p>
        <a href="#apply" class="inline-flex items-center px-8 py-4 text-base font-semibold text-indigo-600 bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
          Apply to Partner Program
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
