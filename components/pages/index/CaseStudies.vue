<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <section class="relative pt-16 md:pt-24 pb-36 md:pb-44 bg-[#1d4348]">

    <div class="relative max-w-[1230px] mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-10 md:mb-14">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight font-serif">
          Join teams shipping faster with AI
        </h2>
      </div>

      <!-- Cards Grid -->
      <div class="grid md:grid-cols-2 gap-6">

        <!-- Alan Card -->
        <NuxtLink
          to="/customers/alan"
          :class="['group relative block overflow-hidden rounded-[16px] bg-white/5 border border-white/5 p-6 cursor-pointer transition-all duration-300 hover:border-white/15', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
          style="transition-delay: 0.1s;"
        >
          <!-- Content -->
          <div class="relative flex flex-col gap-6">
            <!-- Header: Company name + Industry + Arrow -->
            <div class="flex items-center justify-between">
              <span class="text-white font-bold text-[20px]">Alan</span>
              <div class="flex items-center gap-4">
                <span class="text-white/60 text-[14px] uppercase">Health Insurance</span>
                <div class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="w-full h-px bg-white/10"></div>

            <!-- Metric section -->
            <div class="flex flex-col gap-2 max-w-[300px]">
              <span class="text-5xl font-bold text-white font-serif">300+</span>
              <p class="text-white/80 text-xl leading-relaxed">
                AI-powered workflows deployed across the organization
              </p>
            </div>

            <!-- Divider -->
            <div class="w-full h-px bg-white/10"></div>

            <!-- Person info -->
            <div class="flex flex-col gap-2">
              <p class="text-white font-bold text-base">Jérémie Preault</p>
              <p class="text-white/60 text-sm">Internal Tools & Automation Lead</p>
            </div>
          </div>

          <!-- Person photo - positioned at bottom right -->
          <div class="absolute bottom-[-1px] right-[-1px] w-60 h-60 pointer-events-none">
            <img
              src="/case-studies/alan-jeremie.png"
              alt="Jérémie Preault"
              class="w-full h-full object-contain object-bottom"
            />
          </div>
        </NuxtLink>

        <!-- Funding Societies Card -->
        <NuxtLink
          to="/customers/funding-societies"
          :class="['group relative block overflow-hidden rounded-[16px] bg-white/5 border border-white/5 p-6 cursor-pointer transition-all duration-300 hover:border-white/15', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
          style="transition-delay: 0.2s;"
        >
          <!-- Content -->
          <div class="relative flex flex-col gap-6">
            <!-- Header: Company name + Industry + Arrow -->
            <div class="flex items-center justify-between">
              <span class="text-white font-bold text-[20px]">Funding Societies</span>
              <div class="flex items-center gap-4">
                <span class="text-white/60 text-[14px] uppercase">Fintech</span>
                <div class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="w-full h-px bg-white/10"></div>

            <!-- Metric section -->
            <div class="flex flex-col gap-2 max-w-[300px]">
              <span class="text-5xl font-bold text-white font-serif">100+</span>
              <p class="text-white/80 text-xl leading-relaxed">
                flows deployed, a quarter saved
              </p>
            </div>

            <!-- Divider -->
            <div class="w-full h-px bg-white/10"></div>

            <!-- Person info -->
            <div class="flex flex-col gap-2">
              <p class="text-white font-bold text-base">Shawn Lim</p>
              <p class="text-white/60 text-sm">VP, Platform and AI</p>
            </div>
          </div>

          <!-- Person photo - positioned at bottom right -->
          <div class="absolute bottom-[-1px] right-[-1px] w-60 h-60 pointer-events-none">
            <img
              src="/case-studies/funding-societies-shawn.png"
              alt="Shawn Lim"
              class="w-full h-full object-contain object-bottom"
            />
          </div>
        </NuxtLink>
      </div>

      <!-- More Companies Grid -->
      <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
        <div class="group p-3 rounded-md border border-white/10 hover:border-white/20 transition-all">
          <img src="/logos/sequoia.svg" alt="Sequoia" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/60 text-xs font-medium leading-relaxed">Venture Capital</p>
        </div>
        <div class="group p-3 rounded-md border border-white/10 hover:border-white/20 transition-all">
          <img src="/logos/redbull.svg" alt="Red Bull" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/60 text-xs font-medium leading-relaxed">Media & Entertainment</p>
        </div>
        <div class="group p-3 rounded-md border border-white/10 hover:border-white/20 transition-all">
          <img src="/logos/rakuten.svg" alt="Rakuten" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/60 text-xs font-medium leading-relaxed">E-commerce</p>
        </div>
        <div class="group p-3 rounded-md border border-white/10 hover:border-white/20 transition-all">
          <img src="/logos/docusign.svg" alt="DocuSign" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/60 text-xs font-medium leading-relaxed">Legal Tech</p>
        </div>
        <div class="group p-3 rounded-md border border-white/10 hover:border-white/20 transition-all">
          <img src="/logos/contentful.svg" alt="Contentful" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/60 text-xs font-medium leading-relaxed">Content Management</p>
        </div>
        <div class="group p-3 rounded-md border border-white/10 hover:border-white/20 transition-all">
          <img src="/logos/posthog.svg" alt="PostHog" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/60 text-xs font-medium leading-relaxed">Product Analytics</p>
        </div>
      </div>
    </div>

    <!-- Curved bottom edge with AI-style layers -->
    <div class="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
      <svg 
        class="relative block w-full h-[90px] md:h-[120px]" 
        viewBox="0 0 1200 140" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#818cf8"/>
            <stop offset="35%" stop-color="#c084fc"/>
            <stop offset="65%" stop-color="#c084fc"/>
            <stop offset="100%" stop-color="#22d3ee"/>
          </linearGradient>
        </defs>
        
        <!-- Luminous scan lines -->
        <path class="scan-line-1" d="M0,5 Q600,55 1200,5" fill="none" stroke="url(#lineGlow)" stroke-width="1"/>
        <path class="scan-line-2" d="M0,15 Q600,70 1200,15" fill="none" stroke="url(#lineGlow)" stroke-width="1.5"/>
        <path class="scan-line-3" d="M0,25 Q600,85 1200,25" fill="none" stroke="url(#lineGlow)" stroke-width="2"/>
        
        <!-- Teal base that fades up -->
        <path
          d="M0,35 Q600,100 1200,35 L1200,140 L0,140 Z"
          fill="#1d4348"
        />
        
        <!-- Main bright line - the edge -->
        <path class="main-glow-line" d="M0,35 Q600,100 1200,35" fill="none" stroke="url(#lineGlow)" stroke-width="2.5"/>
        
        <!-- Soft glow under the line -->
        <path 
          class="glow-fill"
          d="M0,38 Q600,103 1200,38 L1200,55 Q600,120 0,55 Z" 
          fill="url(#lineGlow)"
        />
        
        <!-- Transition to white -->
        <path 
          d="M0,58 Q600,115 1200,58 L1200,140 L0,140 Z" 
          fill="#fafafa"
        />
        <path 
          d="M0,85 Q600,125 1200,85 L1200,140 L0,140 Z" 
          fill="white"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Subtle separator animations */
.scan-line-1 {
  opacity: 0.3;
  animation: pulse-soft 4s ease-in-out infinite;
}

.scan-line-2 {
  opacity: 0.5;
  animation: pulse-soft 4s ease-in-out infinite 0.5s;
}

.scan-line-3 {
  opacity: 0.7;
  animation: pulse-soft 4s ease-in-out infinite 1s;
}

.main-glow-line {
  opacity: 0.9;
  animation: pulse-bright 3s ease-in-out infinite;
}

.glow-fill {
  opacity: 0.15;
  animation: pulse-glow 5s ease-in-out infinite;
}

@keyframes pulse-soft {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

@keyframes pulse-bright {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.12; }
  50% { opacity: 0.2; }
}
</style>
