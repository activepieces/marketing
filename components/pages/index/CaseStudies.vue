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
  <section class="relative py-12 md:py-16 overflow-hidden bg-[#050505]">
    <!-- Decorative AI Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      
      <!-- Gradient orbs -->
      <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[150px] -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[120px] translate-y-1/2"></div>
      
      <!-- Fine grain texture - radial at top center only -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] opacity-[0.25]" style="background: radial-gradient(ellipse at center top, rgba(255,255,255,0.08) 0%, transparent 70%);"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] opacity-[0.3]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%222.5%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E'); mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 100%);"></div>
    </div>

    <div class="relative max-w-[1230px] mx-auto px-4">
      <!-- Cards Grid -->
      <div class="grid md:grid-cols-2 gap-6">
        
        <!-- Alan Card -->
        <NuxtLink 
          to="/customers/alan"
          :class="['case-study-card group relative block overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 min-h-[380px]', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
          style="transition-delay: 0.1s;"
        >
          <!-- Dark gradient background -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-[#0a0a0a] to-[#111]"></div>
          
          <!-- Subtle glow behind person -->
          <div class="absolute bottom-0 right-0 w-[250px] h-[250px] bg-indigo-600/30 rounded-full blur-[80px] translate-x-1/4 translate-y-1/4"></div>
          
          <!-- Content -->
          <div class="relative p-8 md:p-10 h-full flex flex-col">
            <!-- Top: Company name + Industry -->
            <div class="flex items-center justify-between mb-6">
              <span class="text-white font-bold text-xl">Alan</span>
              <span class="text-white/40 text-xs uppercase tracking-wider">Healthcare</span>
            </div>
            
            <!-- Main content area -->
            <div class="flex-1 flex items-start">
              <!-- Left: Metric and description -->
              <div class="flex-1 pr-32 md:pr-44 lg:pr-52">
                <div class="mb-3">
                  <span class="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tighter">90%</span>
                </div>
                <p class="text-white/50 text-base leading-relaxed">
                  time saved on interview scheduling
                </p>
              </div>
            </div>
            
            <!-- Bottom: Person info + Arrow -->
            <div class="flex items-end justify-between pt-6 border-t border-white/10">
              <div>
                <p class="text-white font-medium">Jérémie Preault</p>
                <p class="text-white/40 text-sm">Internal Tools & Automation</p>
              </div>
              <div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/40 transition-all">
                <svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Person photo - emerging from bottom right -->
          <div class="absolute bottom-0 right-2 md:right-6 w-44 md:w-56 lg:w-64 pointer-events-none">
            <img 
              src="/case-studies/alan-jeremie.png" 
              alt="Jérémie Preault" 
              class="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
          
          <!-- Hover border -->
          <div class="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/15 transition-colors duration-300"></div>
        </NuxtLink>

        <!-- Funding Societies Card -->
        <NuxtLink 
          to="/customers/funding-societies"
          :class="['case-study-card group relative block overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 min-h-[380px]', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
          style="transition-delay: 0.2s;"
        >
          <!-- Dark gradient background -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-[#0a0a0a] to-[#111]"></div>
          
          <!-- Subtle glow behind person -->
          <div class="absolute bottom-0 right-0 w-[250px] h-[250px] bg-cyan-600/30 rounded-full blur-[80px] translate-x-1/4 translate-y-1/4"></div>
          
          <!-- Content -->
          <div class="relative p-8 md:p-10 h-full flex flex-col">
            <!-- Top: Company name + Industry -->
            <div class="flex items-center justify-between mb-6">
              <span class="text-white font-bold text-xl">Funding Societies</span>
              <span class="text-white/40 text-xs uppercase tracking-wider">Fintech</span>
            </div>
            
            <!-- Main content area -->
            <div class="flex-1 flex items-start">
              <!-- Left: Metric and description -->
              <div class="flex-1 pr-32 md:pr-44 lg:pr-52">
                <div class="mb-3">
                  <span class="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tighter">100+</span>
                </div>
                <p class="text-white/50 text-base leading-relaxed">
                  flows deployed, a quarter saved
                </p>
              </div>
            </div>
            
            <!-- Bottom: Person info + Arrow -->
            <div class="flex items-end justify-between pt-6 border-t border-white/10">
              <div>
                <p class="text-white font-medium">Shawn Lim</p>
                <p class="text-white/40 text-sm">VP, Platform and AI</p>
              </div>
              <div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/40 transition-all">
                <svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Person photo - emerging from bottom right -->
          <div class="absolute bottom-0 right-2 md:right-6 w-40 md:w-48 lg:w-56 pointer-events-none">
            <img 
              src="/case-studies/funding-societies-shawn.png" 
              alt="Shawn Lim" 
              class="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
          
          <!-- Hover border -->
          <div class="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/15 transition-colors duration-300"></div>
        </NuxtLink>
      </div>

      <!-- More Companies Grid -->
      <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div class="group p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all">
          <img src="/logos/sequoia.svg" alt="Sequoia" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/40 text-xs leading-relaxed">Venture Capital</p>
        </div>
        <div class="group p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all">
          <img src="/logos/redbull.svg" alt="Red Bull" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/40 text-xs leading-relaxed">Media & Entertainment</p>
        </div>
        <div class="group p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all">
          <img src="/logos/rakuten.svg" alt="Rakuten" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/40 text-xs leading-relaxed">E-commerce</p>
        </div>
        <div class="group p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all">
          <img src="/logos/docusign.svg" alt="DocuSign" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/40 text-xs leading-relaxed">Legal Tech</p>
        </div>
        <div class="group p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all">
          <img src="/logos/contentful.svg" alt="Contentful" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/40 text-xs leading-relaxed">Content Management</p>
        </div>
        <div class="group p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-all">
          <img src="/logos/posthog.svg" alt="PostHog" class="h-5 mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
          <p class="text-white/40 text-xs leading-relaxed">Product Analytics</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.case-study-card {
  box-shadow: 0 4px 40px -10px rgba(0, 0, 0, 0.5);
}

.case-study-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.6);
}
</style>
