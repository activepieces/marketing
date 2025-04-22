<script setup>
// import { algora } from "@algora/sdk";

const pageTitle = 'Make your product AI Agent friendly - MCP Bounty Program';
const metaDesc = 'Join our MCP Bounty Program to add your product\'s MCP to Activepieces. Get help from our contributors and make your product AI-ready.';
const metaKeywords = 'MCP, bounty program, AI integration, Activepieces, contributors, product integration';

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})

const showVideoModal = ref(false);
const currentVideoId = ref('6h1I7cs-pL0');
const showTooltip = ref(false);
const tooltipPosition = ref({ x: 0, y: 0 });
const showGuidance = ref(false);

const openVideo = () => {
  showVideoModal.value = true;
}

const closeVideo = () => {
  showVideoModal.value = false;
}

const toggleTooltip = (event) => {
  showTooltip.value = !showTooltip.value;
  if (showTooltip.value) {
    // Get the position of the information icon
    const iconElement = event.target;
    const rect = iconElement.getBoundingClientRect();
    
    // Calculate position relative to the viewport, adding a small offset for better alignment
    tooltipPosition.value = {
      x: rect.left + rect.width / 2,
      y: rect.top - 5 // Add a small offset to prevent any overlap
    };
  }
}

const bounties = ref(null);
const error = ref(null);
const isLoading = ref(true);

// Smooth scroll function
const scrollToBounties = (e) => {
  e.preventDefault();
  const bountiesSection = document.getElementById('bounties');
  if (bountiesSection) {
    const headerOffset = 120; // Adjust this value based on your header height
    const elementPosition = bountiesSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // Use a more natural easing function for smoother animation
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 800; // Animation duration in milliseconds
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function: easeInOutCubic
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
};

// Only run on client-side
onMounted(() => {
  if (process.client) {
    // Use our server API route instead of making the request directly
    fetch('/api/bounties')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success fetching bounties:', data);
        bounties.value = data;
        isLoading.value = false;
      })
      .catch(err => {
        console.error('Error fetching bounties:', err);
        error.value = err.message || 'Failed to fetch bounties';
        isLoading.value = false;
      });
  }
});
</script>

<template>
<section class="bg-gradient-to-r from-white via-purple-100 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 pt-20 min-h-screen">
  <div class="max-w-6xl mx-auto px-4">
    <!-- Error Display -->
    <div v-if="error" class="mb-20 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
      <pre class="text-sm overflow-x-auto text-red-600 dark:text-red-400">{{ error }}</pre>
    </div>

    <!-- Spotlight Section (Moved to top) -->
    <div class="mb-16">
      <div class="bg-gradient-to-br from-gray-900 via-slate-900 to-black rounded-2xl p-6 md:p-12 border border-cyan-500/20 relative overflow-hidden backdrop-blur-sm">
        <!-- Animated Neural Network Lines -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0" style="background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); animation: pulse 4s infinite;"></div>
          <div class="absolute inset-0" style="background: linear-gradient(0deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); animation: pulse 4s infinite 1s;"></div>
        </div>
        
        <!-- Animated Particles -->
        <div class="absolute inset-0">
          <div v-for="i in 20" :key="i" class="absolute w-1 h-1 bg-cyan-500/30 rounded-full" 
               :style="{ 
                 left: `${Math.random() * 100}%`, 
                 top: `${Math.random() * 100}%`,
                 animation: `float ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`
               }">
          </div>
        </div>

        <!-- Glowing Border Effect -->
        <div class="absolute inset-0 rounded-2xl" style="box-shadow: 0 0 30px rgba(6, 182, 212, 0.2);"></div>

        <div class="relative z-10">
          <div class="flex items-center justify-center mb-6">
            <span class="text-cyan-400 font-bold text-sm tracking-wider bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20 backdrop-blur-sm">
              BOUNTY PROGRAM
            </span>
          </div>
          
          <h2 class="mb-6 text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 tracking-tight">
            MCP for Your Product
          </h2>
          
          <p class="text-base md:text-lg text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto text-center leading-relaxed">
            Join our MCP Bounty Program to add your product's MCP to Activepieces. Get help from our contributors and make your product accessible to AI assistants.
          </p>
          
          <!-- Horizontal Line Separator -->
          <div class="border-t border-cyan-500/30 my-8 max-w-md mx-auto"></div>
          
          <!-- Developer Quick Link -->
          <div class="text-center">
            <a href="#bounties" @click="scrollToBounties" 
               class="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 font-bold text-lg md:text-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30 group">
              <span class="relative">
                TypeScript Developer? Grab a Bounty
                <span class="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></span>
              </span>
              <svg class="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- For Companies Section -->
    <div class="mb-16">
      <div class="bg-transparent rounded-2xl p-12 relative overflow-hidden backdrop-blur-sm">
        <h2 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center tracking-wide">FOR PRODUCT COMPANIES</h2>
        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">80k+ users want your product in the world's largest MCP repository</h3>
        
        <!-- Guidance Link and Collapsible Section -->
        <div class="mb-4">
          <div class="bg-transparent rounded-xl p-2 relative overflow-hidden backdrop-blur-sm">
            <div v-if="!showGuidance" class="flex items-center justify-center py-4">
              <button @click="showGuidance = !showGuidance" class="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group">
                <span class="text-xl font-semibold underline">Click for detailed step-by-step guide</span>
              </button>
            </div>
            
            <div v-if="showGuidance" class="bg-white/50 dark:bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-cyan-200 dark:border-cyan-800/30 animate-fade-in">
              <div class="flex items-center justify-between mb-8 group cursor-pointer" @click="showGuidance = !showGuidance">
                <div class="w-full text-center">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Step-by-Step Guide to Adding Your Product</h3>
                </div>
                <button class="text-gray-500 group-hover:text-cyan-600 dark:text-gray-400 dark:group-hover:text-cyan-400 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Transform your product into an AI-ready MCP that can be used by AI agents worldwide. Our streamlined process connects you with skilled developers who will build your integration, making your product accessible to thousands of AI users through the world's largest open source MCP repository.
              </p>
              
              <div class="space-y-6">
                <!-- Step 1 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Create a GitHub Issue</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Start by <a href="https://github.com/activepieces/activepieces/issues/new?template=mcp_bounty.md" target="_blank" class="text-cyan-600 dark:text-cyan-400 hover:underline">creating a GitHub issue</a> with your product details. This is where you'll describe what you want your product to do when integrated with AI assistants. The more detailed your requirements, the better the final integration will be.
                    </p>
                  </div>
                </div>
                
                <!-- Step 2 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Post a Bounty</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Once your issue is created, <a href="https://algora.io/activepieces/bounties/new" target="_blank" class="text-cyan-600 dark:text-cyan-400 hover:underline">post a bounty on Algora</a> using the GitHub issue link. We recommend setting a reward of $500 (minimum $100) to attract experienced developers. This bounty will be used to compensate the contributor who builds your MCP.
                    </p>
                  </div>
                </div>
                
                <!-- Step 3 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Contributor Implementation</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      A contributor will implement your MCP based on your requirements. They'll build the integration following our guidelines and best practices, ensuring it works seamlessly with AI assistants. You'll be able to track progress through the GitHub issue.
                    </p>
                  </div>
                </div>
                
                <!-- Step 4 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">4</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Review & Reward</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Our team reviews the code for quality and security before merging it into Activepieces. Once approved, the bounty is released to the contributor. We love merging PRs, so make sure your GitHub issue is detailed to avoid any delays.
                    </p>
                  </div>
                </div>
                
                <!-- Step 5 -->
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mr-4">
                    <span class="text-cyan-600 dark:text-cyan-400 font-bold">5</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Launch & Marketing</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      We'll launch a marketing campaign together to promote your integration to our 80,000+ users. This includes featuring your MCP in our marketplace, social media announcements, and potentially joint webinars. Make sure to fill out the marketing form (coming soon!) to provide your brand assets and preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="bg-white/30 dark:bg-gray-800/30 rounded-xl p-8 text-center relative overflow-hidden backdrop-blur-sm hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
            <!-- Dot grid background with gradient fade -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 grid grid-cols-12 gap-1 opacity-5">
                <div v-for="i in 96" :key="i" class="w-1 h-1 rounded-full bg-blue-700"></div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-gray-800/50 dark:to-gray-800/50"></div>
            </div>
            <!-- Content -->
            <div class="relative z-10">
              <div class="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create GitHub Issue
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                Submit your MCP requirements on GitHub
              </p>
              <a href="https://github.com/activepieces/activepieces/issues/new?template=mcp_bounty.md" target="_blank" class="mt-6 inline-flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-all duration-300 text-sm font-medium w-full group">
                Create Issue
                <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Tooltip -->
          <Teleport to="body">
          <div v-if="showTooltip" class="fixed z-50 bg-gray-900 text-white text-xs rounded-lg p-2 w-48 shadow-lg text-center" :style="{ left: tooltipPosition.x + 'px', top: tooltipPosition.y + 'px', transform: 'translate(-50%, -120%)' }">
            <p class="font-normal">91% goes to contributors, 9% goes to our partner, Algora</p>
            <div class="absolute w-2 h-2 bg-gray-900 transform rotate-45" style="bottom: -4px; left: 50%; margin-left: -4px;"></div>
          </div>
          </Teleport>
          
          <div class="bg-white/30 dark:bg-gray-800/30 rounded-xl p-8 text-center relative overflow-hidden backdrop-blur-sm hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
            <!-- Dot grid background with gradient fade -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 grid grid-cols-12 gap-1 opacity-5">
                <div v-for="i in 96" :key="i" class="w-1 h-1 rounded-full bg-cyan-700"></div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-gray-800/50 dark:to-gray-800/50"></div>
            </div>
            <!-- Content -->
            <div class="relative z-10">
              <div class="w-20 h-20 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Post a Bounty
                <span class="relative inline-block ml-1 group">
                  <svg class="w-4 h-4 text-blue-500 dark:text-blue-400 inline cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24" @mouseenter="toggleTooltip" @mouseleave="toggleTooltip">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </h3>
              <p class="text-gray-600 dark:text-gray-300">List a bounty of $100+ to developers to build your MCP</p>
              <a href="https://algora.io/activepieces/bounties/new" target="_blank" class="mt-6 inline-flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-all duration-300 text-sm font-medium w-full group">
                Post a bounty
                <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          <div class="bg-white/30 dark:bg-gray-800/30 rounded-xl p-8 text-center relative overflow-hidden backdrop-blur-sm hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
            <!-- Dot grid background with gradient fade -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 grid grid-cols-12 gap-1 opacity-5">
                <div v-for="i in 96" :key="i" class="w-1 h-1 rounded-full bg-teal-700"></div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-gray-800/50 dark:to-gray-800/50"></div>
            </div>
            <!-- Content -->
            <div class="relative z-10">
              <div class="w-20 h-20 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Launch and Marketing</h3>
              <p class="text-gray-600 dark:text-gray-300">Make your product available to AI assistants and get featured</p>
              <button disabled class="mt-6 inline-flex items-center justify-center px-6 py-3 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed text-sm font-medium w-full opacity-70 transition-all duration-300 group">
                Apply for co-marketing
                <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- For Developers Section -->
    <div id="bounties" class="scroll-mt-32">
      <div class="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-gradient-to-br from-gray-900 via-slate-900 to-black border border-cyan-500/20 relative overflow-hidden backdrop-blur-sm">
        <!-- Animated Neural Network Lines -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0" style="background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); animation: pulse 4s infinite;"></div>
          <div class="absolute inset-0" style="background: linear-gradient(0deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%); animation: pulse 4s infinite 1s;"></div>
        </div>
        
        <!-- Animated Particles -->
        <div class="absolute inset-0">
          <div v-for="i in 20" :key="i" class="absolute w-1 h-1 bg-cyan-500/30 rounded-full" 
               :style="{ 
                 left: `${Math.random() * 100}%`, 
                 top: `${Math.random() * 100}%`,
                 animation: `float ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`
               }">
          </div>
        </div>

        <!-- Glowing Border Effect -->
        <div class="absolute inset-0" style="box-shadow: 0 0 30px rgba(6, 182, 212, 0.2);"></div>

        <div class="max-w-6xl mx-auto p-16 relative z-10">
          <div class="flex items-center justify-center mb-6">
            <span class="text-cyan-400 font-bold text-sm tracking-wider bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20 backdrop-blur-sm">
              FOR DEVELOPERS
            </span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-10 text-center tracking-wide">Check out these resources to build an MCP</h3>
          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <!-- Video Tutorial -->
            <a href="#" @click.prevent="openVideo" class="bg-gray-800/50 rounded-xl p-8 flex flex-col h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors backdrop-blur-sm group cursor-pointer">
              <div class="w-16 h-16 bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
              </div>
              <div class="flex-grow text-center">
                <h3 class="text-lg font-semibold text-white mb-4">Video Tutorial</h3>
                <p class="text-gray-300 text-sm mb-4 min-h-[3rem]">Watch our community member's live coding session on building and publishing an MCP</p>
                <span class="text-cyan-400 group-hover:text-cyan-300 text-sm font-medium inline-flex items-center">
                  Watch Video
                  <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </a>
            <!-- Documentation -->
            <a href="https://www.activepieces.com/docs/developers/building-pieces/overview" target="_blank" class="bg-gray-800/50 rounded-xl p-8 flex flex-col h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors backdrop-blur-sm group">
              <div class="w-16 h-16 bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="flex-grow text-center">
                <h3 class="text-lg font-semibold text-white mb-4">Documentation</h3>
                <p class="text-gray-300 text-sm mb-6 min-h-[3rem]">Comprehensive guide on building pieces and MCPs</p>
                <span class="text-cyan-400 group-hover:text-cyan-300 text-sm font-medium inline-flex items-center">
                  Read Docs
                  <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </a>
            <!-- Discord Community -->
            <a href="https://discord.com/invite/2jUXBKDdP8" target="_blank" class="bg-gray-800/50 rounded-xl p-8 flex flex-col h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors backdrop-blur-sm group">
              <div class="w-16 h-16 bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div class="flex-grow text-center">
                <h3 class="text-lg font-semibold text-white mb-4">Discord Community</h3>
                <p class="text-gray-300 text-sm mb-6 min-h-[3rem]">Join our community and ask questions in #building-pieces</p>
                <span class="text-cyan-400 group-hover:text-cyan-300 text-sm font-medium inline-flex items-center">
                  Join Discord
                  <svg class="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
          <!-- Divider -->
          <div class="border-t border-cyan-500/30 my-16"></div>
          <!-- Bounties Section -->
          <div class="flex items-center justify-center mb-6">
            <span class="text-cyan-400 font-bold text-sm tracking-wider bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20 backdrop-blur-sm">
              OPEN BOUNTIES
            </span>
          </div>
          <p class="text-gray-300 mb-12 text-center">Ready to contribute? Select a bounty to start building. Each bounty includes detailed requirements and compensation.</p>
          <!-- Loading State for Bounties -->
          <div v-if="isLoading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 3" :key="i" class="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm animate-pulse">
              <div class="flex flex-col h-full">
                <div class="flex items-start mb-4">
                  <div class="h-6 bg-gray-700 rounded w-3/4 flex-grow"></div>
                  <div class="h-8 bg-gray-700 rounded w-1/4 ml-4"></div>
                </div>
                <div class="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6 mb-6 flex-grow"></div>
                <div class="h-10 bg-gray-700 rounded w-full"></div>
            </div>
            </div>
          </div>
          <!-- Error State for Bounties -->
          <div v-else-if="error" class="p-6 bg-red-900/50 rounded-lg border border-red-500/30 backdrop-blur-sm">
            <p class="text-red-300">{{ error }}</p>
          </div>
          <!-- Bounties List -->
          <div v-else-if="bounties && bounties.items && bounties.items.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="bounty in bounties.items" :key="bounty.id" class="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors backdrop-blur-sm">
              <div class="flex flex-col h-full">
                <div class="flex items-start mb-4">
                  <h3 class="text-xl font-bold text-white flex-grow">{{ bounty.task.title }}</h3>
                  <div class="text-3xl font-bold text-cyan-400 ml-4">
                  {{ bounty.reward_formatted }}
                  </div>
                </div>
                <p class="text-gray-300 text-sm mb-6 flex-grow">{{ bounty.task.body || 'Build an integration for ' + bounty.task.title }}</p>
                <a :href="bounty.task.url" target="_blank" class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg transition-colors inline-block text-center text-sm font-medium">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <!-- No Bounties State -->
          <div v-else class="p-6 bg-gray-800/50 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
            <p class="text-gray-300">No bounties available at the moment. Please check back later.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Video Modal -->
<div v-if="showVideoModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click="closeVideo">
  <div class="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" @click.stop>
    <button @click="closeVideo" class="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <iframe
      :src="`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`"
      class="absolute inset-0 w-full h-full"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</div>
</template> 

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-10px) translateX(5px); }
  50% { transform: translateY(0) translateX(10px); }
  75% { transform: translateY(10px) translateX(5px); }
}
</style> 