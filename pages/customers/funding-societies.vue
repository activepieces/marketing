<script setup>
useHead({
  title: "Funding Societies: An Entire Quarter of Time Saved",
  meta: [
    { name: "description", content: "How Funding Societies deployed 100+ automation flows with 60 team members, saving nearly a quarter of a year." },
    { property: "og:title", content: "Funding Societies: An Entire Quarter of Time Saved" },
  ],
});

const automations = [
  { icon: '📄', title: 'AI Document Review', desc: 'OCR + LLM validates payment documents', result: 'Thousands of hours saved' },
  { icon: '💬', title: 'Customer Insights', desc: 'Monthly Intercom conversation analysis', result: 'Weeks → Instant' },
  { icon: '🎯', title: 'Support Triage', desc: 'RAG-powered intelligent routing', result: '24/7 automated' },
  { icon: '✍️', title: 'Content Production', desc: 'End-to-end SEO workflow', result: '85% faster' },
];
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Dark Section with Texture -->
    <div class="relative bg-[#0a0a0a]">
      <!-- Texture Background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- Grid pattern -->
        <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
        
        <!-- Gradient orbs -->
        <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[150px] -translate-y-1/2"></div>
        <div class="absolute top-1/2 right-0 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[120px] translate-x-1/2"></div>
        
        <!-- Fine grain texture - radial at top center only -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] opacity-[0.25]" style="background: radial-gradient(ellipse at center top, rgba(255,255,255,0.08) 0%, transparent 70%);"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-[0.3]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%222.5%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E'); mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 100%);"></div>
      </div>

      <!-- Hero Section -->
      <section class="relative pt-32 pb-20">
        <div class="max-w-6xl mx-auto px-6">
          <!-- Company Badge -->
          <div class="flex items-center gap-3 mb-8">
            <div class="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div class="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white">FS</div>
              <span class="text-white/70 text-sm font-medium">Funding Societies</span>
              <span class="text-white/30">•</span>
              <span class="text-white/50 text-sm">Fintech</span>
            </div>
          </div>

          <!-- Main Headline -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl mb-8">
            An entire quarter
            <span class="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent"> of time saved</span>
          </h1>

          <p class="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-12">
            Organization-wide AI automation with 100+ flows and 60 team members building—transforming operations across every department.
          </p>

          <!-- Key Metrics Row -->
          <div class="flex flex-wrap gap-12 md:gap-16 pt-8 border-t border-white/10">
            <div>
              <div class="text-4xl md:text-5xl font-bold text-white tracking-tight">100+</div>
              <div class="text-white/40 text-sm mt-1">Flows deployed</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold text-white tracking-tight">~60</div>
              <div class="text-white/40 text-sm mt-1">Team members building</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold text-white tracking-tight">85%</div>
              <div class="text-white/40 text-sm mt-1">Time reduced</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold text-white tracking-tight">+30%</div>
              <div class="text-white/40 text-sm mt-1">Organic traffic lift</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="relative py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid lg:grid-cols-12 gap-16">
            
            <!-- Main Content -->
            <div class="lg:col-span-7 space-y-16">
              
              <!-- Challenge -->
              <div>
                <div class="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">The Challenge</div>
                <p class="text-lg text-white/60 leading-relaxed">
                  After launching an LLM-powered chatbot, Funding Societies faced a scaling problem: engineering couldn't build custom AI solutions for every department. Teams across the organization saw AI's potential but lacked resources, while security requirements ruled out most off-the-shelf tools.
                </p>
              </div>

              <!-- Solution -->
              <div>
                <div class="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">Key Automations</div>
                <p class="text-lg text-white/60 leading-relaxed mb-8">
                  Activepieces enabled every team to build their own AI-powered workflows while maintaining centralized governance:
                </p>
                
                <!-- Automation Cards -->
                <div class="grid sm:grid-cols-2 gap-4">
                  <div 
                    v-for="a in automations" 
                    :key="a.title"
                    class="p-5 bg-white/[0.02] rounded-2xl border border-white/[0.06] hover:border-white/10 transition-colors"
                  >
                    <div class="text-2xl mb-3">{{ a.icon }}</div>
                    <div class="text-white font-medium mb-1">{{ a.title }}</div>
                    <div class="text-white/40 text-sm mb-3">{{ a.desc }}</div>
                    <div class="inline-flex items-center gap-1.5 text-emerald-400 text-sm">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                      {{ a.result }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Impact -->
              <div>
                <div class="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">The Impact</div>
                <div class="p-8 bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/5 rounded-3xl border border-white/[0.08]">
                  <div class="grid sm:grid-cols-3 gap-8 text-center">
                    <div>
                      <div class="text-4xl font-bold text-white mb-1">~25%</div>
                      <div class="text-white/40 text-sm">of a year saved</div>
                    </div>
                    <div>
                      <div class="text-4xl font-bold text-white mb-1">100+</div>
                      <div class="text-white/40 text-sm">flows deployed</div>
                    </div>
                    <div>
                      <div class="text-4xl font-bold text-white mb-1">All</div>
                      <div class="text-white/40 text-sm">major teams</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-5">
              <div class="lg:sticky lg:top-32 space-y-8">
                
                <!-- Quote Card -->
                <div class="relative p-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl border border-white/[0.08]">
                  <div class="absolute -top-3 -left-2 text-6xl text-cyan-500/30 font-serif leading-none">"</div>
                  <blockquote class="relative">
                    <p class="text-lg text-white/80 leading-relaxed mb-6">
                      We're saving teams almost a quarter of a year in collective time—with fewer errors, improved communication, and reduced context switching.
                    </p>
                    <footer class="flex items-center gap-4">
                      <img 
                        src="/case-studies/funding-societies-shawn.png" 
                        alt="Shawn Lim" 
                        class="w-14 h-14 rounded-full object-cover object-top bg-gradient-to-br from-cyan-500/20 to-teal-500/20"
                      />
                      <div>
                        <div class="font-semibold text-white">Shawn Lim</div>
                        <div class="text-white/40 text-sm">VP, Platform and AI</div>
                      </div>
                    </footer>
                  </blockquote>
                </div>

                <!-- Why Activepieces -->
                <div class="p-6 bg-white/[0.02] rounded-2xl border border-white/[0.06]">
                  <div class="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Why Activepieces</div>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                      </div>
                      <span class="text-white/60 text-sm">Non-technical teams can build without engineering</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                      </div>
                      <span class="text-white/60 text-sm">SOC 2 compliance and enterprise security</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                      </div>
                      <span class="text-white/60 text-sm">Built-in AI and RAG capabilities</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                      </div>
                      <span class="text-white/60 text-sm">Scales from 10 to 100+ flows seamlessly</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Curved divider to white -->
      <div class="relative h-24 md:h-32">
        <svg class="absolute bottom-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="white">
          <path d="M0,120 L0,60 Q720,0 1440,60 L1440,120 Z"></path>
        </svg>
      </div>
    </div>

    <!-- CTA Section (White background) -->
    <section class="relative py-20 bg-white">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to transform your organization?
        </h2>
        <p class="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          See how Activepieces can help your teams save time with AI automation.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a 
            href="https://cloud.activepieces.com/sign-up" 
            class="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all hover:scale-[1.02]"
          >
            Start free
          </a>
          <NuxtLink 
            to="/sales" 
            class="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Talk to sales
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
