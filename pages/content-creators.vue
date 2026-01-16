<script setup>
import { ref, computed } from 'vue'

const pageTitle = 'Content Creator Program';
const metaDesc = 'Join the Activepieces Creator Program. Create tutorials, reviews, and educational content about AI automation and earn while growing your audience.';
const metaKeywords = 'activepieces affiliate, automation content creator, ai automation youtube, no-code tutorial creator';

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
  name: '',
  email: '',
  channel: '',
  platform: '',
  subscribers: '',
  contentType: '',
  message: ''
});

const sendingStatus = ref('new');

const platforms = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'blog', label: 'Blog / Website' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'other', label: 'Other' }
];

const subscriberRanges = [
  { value: 'under-1k', label: 'Under 1,000' },
  { value: '1k-10k', label: '1,000 - 10,000' },
  { value: '10k-50k', label: '10,000 - 50,000' },
  { value: '50k-100k', label: '50,000 - 100,000' },
  { value: '100k-500k', label: '100,000 - 500,000' },
  { value: '500k+', label: '500,000+' }
];

const contentTypes = [
  { value: 'tutorials', label: 'Tutorials & How-To' },
  { value: 'reviews', label: 'Tool Reviews & Comparisons' },
  { value: 'news', label: 'Tech News & Updates' },
  { value: 'automation', label: 'Automation Showcases' },
  { value: 'business', label: 'Business & Productivity' },
  { value: 'development', label: 'Development & Coding' },
  { value: 'other', label: 'Other' }
];

const isFormValid = computed(() => {
  return formData.value.name && 
         formData.value.email && 
         formData.value.channel && 
         formData.value.platform && 
         formData.value.subscribers;
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

const benefits = [
  {
    icon: 'money',
    title: 'Revenue Share',
    description: 'Earn competitive commissions on every paid user you refer. The more value you create, the more you earn.'
  },
  {
    icon: 'gift',
    title: 'Free Pro Access',
    description: 'Get full access to Activepieces Pro features to create authentic, hands-on content for your audience.'
  },
  {
    icon: 'rocket',
    title: 'Early Access',
    description: 'Be the first to try new features and share exclusive announcements with your community.'
  },
  {
    icon: 'support',
    title: 'Dedicated Support',
    description: 'Direct line to our team for content ideas, technical help, and co-marketing opportunities.'
  },
  {
    icon: 'badge',
    title: 'Official Creator Badge',
    description: 'Get recognized as an official Activepieces creator with badges for your profiles and videos.'
  },
  {
    icon: 'community',
    title: 'Creator Community',
    description: 'Join an exclusive network of automation creators to share ideas and collaborate.'
  }
];

const getIcon = (iconName) => {
  const icons = {
    money: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,
    gift: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>`,
    rocket: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>`,
    support: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>`,
    badge: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>`,
    community: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width: 1.5;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>`
  };
  return icons[iconName] || '';
};

const contentIdeas = [
  {
    title: 'Getting Started Tutorials',
    description: 'Help newcomers build their first AI automation workflow step-by-step'
  },
  {
    title: 'Use Case Deep Dives',
    description: 'Show specific automations for sales, marketing, HR, or operations'
  },
  {
    title: 'Tool Comparisons',
    description: 'Compare Activepieces with Zapier, Make, n8n, and other automation tools'
  },
  {
    title: 'AI Agent Showcases',
    description: 'Demonstrate building AI agents that solve real business problems'
  },
  {
    title: 'Integration Spotlights',
    description: 'Feature specific integrations and how to use them effectively'
  },
  {
    title: 'Automation Tips & Tricks',
    description: 'Share advanced techniques and best practices'
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
        style="background: radial-gradient(ellipse 100% 80% at 50% -20%, rgba(251, 146, 60, 0.4), transparent 60%), radial-gradient(ellipse 80% 60% at 80% 20%, rgba(236, 72, 153, 0.3), transparent 50%), #000000"
      ></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 z-10 opacity-20" style="background-image: repeating-linear-gradient(90deg, #ffffff08 0 1px, transparent 1px 50px), repeating-linear-gradient(#ffffff08 0 1px, transparent 1px 50px);"></div>
      
      <div class="max-w-[1230px] mx-auto px-4 relative z-20">
        <div class="max-w-3xl mx-auto text-center pt-20 lg:pt-28">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <span class="text-2xl">🎬</span>
            <span class="text-white font-medium">Creator Program</span>
          </div>
          
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-6">
            Create content.<br />
            <span class="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Earn rewards.</span>
          </h1>
          
          <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the Activepieces Creator Program. Make tutorials, reviews, and educational content about AI automation — and get rewarded for every user you bring.
          </p>
          
          <div class="flex flex-wrap justify-center gap-4">
            <a href="#apply" class="inline-flex items-center px-8 py-4 text-base font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Apply Now
            </a>
            <a href="#benefits" class="inline-flex items-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute bottom-10 left-10 text-6xl animate-bounce opacity-70">📹</div>
      <div class="absolute top-40 right-20 text-5xl animate-pulse opacity-60">✨</div>
      <div class="absolute bottom-32 right-32 text-4xl animate-bounce opacity-50" style="animation-delay: 0.5s;">🎯</div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="py-24 bg-white relative overflow-hidden">
      <!-- Subtle gradient background -->
      <div class="absolute inset-0 z-0" style="background: radial-gradient(circle at top right, rgba(251, 146, 60, 0.08), transparent 60%);"></div>
      
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What you get as a creator
          </h2>
          <p class="text-xl text-gray-600">
            We invest in creators who share our mission of making AI accessible to everyone
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="benefit in benefits" 
            :key="benefit.title"
            class="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
          >
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <span class="text-orange-600" v-html="getIcon(benefit.icon)"></span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ benefit.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Ideas Section -->
    <section class="py-24 bg-gray-50 relative overflow-hidden">
      <div class="max-w-[1230px] mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Content ideas to get started
          </h2>
          <p class="text-xl text-gray-600">
            Not sure what to create? Here's some inspiration from our most successful creators
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(idea, index) in contentIdeas" 
            :key="index"
            class="group p-6 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{{ idea.title }}</h3>
                <p class="text-gray-600 text-sm">{{ idea.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-24 bg-white">
      <div class="max-w-[1230px] mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How it works
          </h2>
          <p class="text-xl text-gray-600">
            Getting started is easy — here's what to expect
          </p>
        </div>
        
        <div class="relative">
          <!-- Connection Line -->
          <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-pink-200 to-purple-200 -translate-y-1/2"></div>
          
          <div class="grid lg:grid-cols-4 gap-8 relative">
            <div class="text-center relative">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">
                1
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Apply</h3>
              <p class="text-gray-600">Fill out the application form with your channel details and content ideas</p>
            </div>
            
            <div class="text-center relative">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">
                2
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Get Approved</h3>
              <p class="text-gray-600">Our team reviews applications weekly and reaches out to qualified creators</p>
            </div>
            
            <div class="text-center relative">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">
                3
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Create Content</h3>
              <p class="text-gray-600">Access Pro features, create amazing content, and share with your audience</p>
            </div>
            
            <div class="text-center relative">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">
                4
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Earn Rewards</h3>
              <p class="text-gray-600">Get paid for every user you refer and unlock bonus rewards as you grow</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Form Section -->
    <section id="apply" class="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <!-- Gradient overlays -->
      <div class="absolute inset-0" style="background: radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.15), transparent 50%), radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15), transparent 50%);"></div>
      
      <div class="max-w-[800px] mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
            Apply to the Creator Program
          </h2>
          <p class="text-xl text-gray-300">
            Tell us about yourself and your content. We review applications weekly.
          </p>
        </div>
        
        <!-- Success State -->
        <div v-if="sendingStatus === 'sent'" class="bg-white rounded-2xl p-12 text-center">
          <div class="text-6xl mb-6">🎉</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
          <p class="text-gray-600 mb-8">Thank you for applying! We'll review your application and get back to you within a week.</p>
          <a href="/" class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg hover:opacity-90 transition-opacity">
            Back to Home
          </a>
        </div>
        
        <!-- Form -->
        <form v-else @submit.prevent="submitForm" class="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl">
          <div class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="you@email.com"
                required
              />
            </div>
            
            <!-- Channel URL -->
            <div>
              <label for="channel" class="block text-sm font-semibold text-gray-700 mb-2">Channel / Profile URL *</label>
              <input 
                type="url" 
                id="channel" 
                v-model="formData.channel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="https://youtube.com/@yourchannel"
                required
              />
            </div>
            
            <!-- Platform -->
            <div>
              <label for="platform" class="block text-sm font-semibold text-gray-700 mb-2">Primary Platform *</label>
              <select 
                id="platform" 
                v-model="formData.platform"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                required
              >
                <option value="">Select a platform</option>
                <option v-for="p in platforms" :key="p.value" :value="p.value">{{ p.label }}</option>
              </select>
            </div>
            
            <!-- Subscribers -->
            <div>
              <label for="subscribers" class="block text-sm font-semibold text-gray-700 mb-2">Audience Size *</label>
              <select 
                id="subscribers" 
                v-model="formData.subscribers"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                required
              >
                <option value="">Select range</option>
                <option v-for="r in subscriberRanges" :key="r.value" :value="r.value">{{ r.label }}</option>
              </select>
            </div>
            
            <!-- Content Type -->
            <div>
              <label for="contentType" class="block text-sm font-semibold text-gray-700 mb-2">Content Focus</label>
              <select 
                id="contentType" 
                v-model="formData.contentType"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="">Select content type</option>
                <option v-for="c in contentTypes" :key="c.value" :value="c.value">{{ c.label }}</option>
              </select>
            </div>
            
            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Tell us about your content ideas</label>
              <textarea 
                id="message" 
                v-model="formData.message"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none transition-colors"
                placeholder="What kind of Activepieces content would you create? Any specific topics or formats you're excited about?"
              ></textarea>
            </div>
            
            <!-- Submit -->
            <div class="pt-4">
              <button 
                type="submit"
                :disabled="!isFormValid || sendingStatus === 'pending'"
                class="w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span v-if="sendingStatus === 'pending'">Submitting...</span>
                <span v-else>Submit Application</span>
              </button>
              <p class="text-center text-sm text-gray-500 mt-4">
                We review applications weekly. You'll hear from us within 7 days.
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
            Common questions
          </h2>
        </div>
        
        <div class="space-y-6">
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Do I need a large following to apply?</h3>
            <p class="text-gray-600">No! We welcome creators of all sizes. We care more about the quality of your content and your passion for automation than raw numbers. Even creators just starting out can apply.</p>
          </div>
          
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">How much can I earn?</h3>
            <p class="text-gray-600">Earnings vary based on your audience engagement and the users you refer. Our top creators earn significant recurring revenue. We'll share specific commission details after your application is approved.</p>
          </div>
          
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">What platforms are accepted?</h3>
            <p class="text-gray-600">We accept creators from YouTube, TikTok, X (Twitter), LinkedIn, blogs, podcasts, newsletters, and more. If you create content that helps people learn about automation, we'd love to hear from you.</p>
          </div>
          
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Do I need technical experience?</h3>
            <p class="text-gray-600">Not necessarily! While technical creators are welcome, we also love working with creators who focus on business use cases, productivity tips, and no-code solutions. Activepieces is designed to be beginner-friendly.</p>
          </div>
          
          <div class="p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-2">How long does approval take?</h3>
            <p class="text-gray-600">We review applications weekly. You should hear from us within 7 days. If you're a good fit, we'll schedule a brief call to discuss the partnership and get you set up.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="py-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
      <div class="max-w-[800px] mx-auto px-4 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
          Ready to become a creator?
        </h2>
        <p class="text-xl text-white/90 mb-8">
          Join our community of creators and start earning while you teach
        </p>
        <a href="#apply" class="inline-flex items-center px-8 py-4 text-base font-semibold text-orange-600 bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
          Apply Now
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

/* Animation for floating elements */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>

