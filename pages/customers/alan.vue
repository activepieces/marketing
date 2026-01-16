<script setup>
useHead({
  title: "Alan: 90% Time Saved on Interview Scheduling",
  meta: [
    { name: "description", content: "How Alan automated user interview scheduling with AI and Activepieces, saving 90% of time." },
    { property: "og:title", content: "Alan: 90% Time Saved on Interview Scheduling" },
  ],
});
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
        <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[150px] -translate-y-1/2"></div>
        <div class="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] translate-x-1/2"></div>
        
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
              <div class="w-6 h-6 rounded bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">A</div>
              <span class="text-white/70 text-sm font-medium">Alan</span>
              <span class="text-white/30">•</span>
              <span class="text-white/50 text-sm">Healthcare</span>
            </div>
          </div>

          <!-- Main Headline -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl mb-8">
            90% time saved on
            <span class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> interview scheduling</span>
          </h1>

          <p class="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-12">
            An AI-powered weekly workflow that identifies users, sends personalized messages, and schedules interviews—automatically.
          </p>

          <!-- Key Metrics Row -->
          <div class="flex flex-wrap gap-12 md:gap-16 pt-8 border-t border-white/10">
            <div>
              <div class="text-4xl md:text-5xl font-bold text-white tracking-tight">90%</div>
              <div class="text-white/40 text-sm mt-1">Time reduced</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold text-white tracking-tight">2-3</div>
              <div class="text-white/40 text-sm mt-1">Interviews per week</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold text-white tracking-tight">5 min</div>
              <div class="text-white/40 text-sm mt-1">Weekly effort</div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold text-white tracking-tight">15</div>
              <div class="text-white/40 text-sm mt-1">Users contacted</div>
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
                <div class="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">The Challenge</div>
                <p class="text-lg text-white/60 leading-relaxed">
                  Product managers at Alan needed consistent user interviews to build the right features. But finding relevant users based on behavior, crafting personalized outreach, and coordinating schedules consumed valuable hours every week—all while maintaining strict healthcare privacy standards.
                </p>
              </div>

              <!-- Solution -->
              <div>
                <div class="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">The Solution</div>
                <p class="text-lg text-white/60 leading-relaxed mb-8">
                  A self-hosted Activepieces workflow that runs every Monday, automatically handling the entire interview scheduling process:
                </p>
                
                <!-- Flow Steps -->
                <div class="space-y-3">
                  <div class="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] hover:border-white/10 transition-colors">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-lg">⏰</div>
                    <div class="flex-1">
                      <div class="text-white font-medium">Scheduled trigger</div>
                      <div class="text-white/40 text-sm">Every Monday at 2 PM</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] hover:border-white/10 transition-colors">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-lg">🔍</div>
                    <div class="flex-1">
                      <div class="text-white font-medium">AI-assisted SQL query</div>
                      <div class="text-white/40 text-sm">Identifies 15 relevant users based on behavior patterns</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] hover:border-white/10 transition-colors">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-lg">💬</div>
                    <div class="flex-1">
                      <div class="text-white font-medium">Personalized Intercom message</div>
                      <div class="text-white/40 text-sm">Sends DM with embedded Calendly link</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] hover:border-white/10 transition-colors">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-lg">📊</div>
                    <div class="flex-1">
                      <div class="text-white font-medium">Logging & notification</div>
                      <div class="text-white/40 text-sm">Updates Google Sheets, notifies PM on Slack</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Results -->
              <div>
                <div class="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">The Results</div>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="p-6 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl border border-white/[0.06]">
                    <div class="text-white/40 text-sm mb-2">Before</div>
                    <div class="text-2xl font-semibold text-white/60 line-through decoration-white/20">~1 hour weekly</div>
                  </div>
                  <div class="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl border border-emerald-500/20">
                    <div class="text-emerald-400/70 text-sm mb-2">After</div>
                    <div class="text-2xl font-semibold text-white">~5 minutes weekly</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-5">
              <div class="lg:sticky lg:top-32 space-y-8">
                
                <!-- Quote Card -->
                <div class="relative p-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl border border-white/[0.08]">
                  <div class="absolute -top-3 -left-2 text-6xl text-indigo-500/30 font-serif leading-none">"</div>
                  <blockquote class="relative">
                    <p class="text-lg text-white/80 leading-relaxed mb-6">
                      We cut interview scheduling from an hour to a five-minute review while keeping messages personal and data private.
                    </p>
                    <footer class="flex items-center gap-4">
                      <img 
                        src="/case-studies/alan-jeremie.png" 
                        alt="Jérémie Preault" 
                        class="w-14 h-14 rounded-full object-cover object-top bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
                      />
                      <div>
                        <div class="font-semibold text-white">Jérémie Preault</div>
                        <div class="text-white/40 text-sm">Internal Tools & Automation</div>
                      </div>
                    </footer>
                  </blockquote>
                </div>

                <!-- Why Activepieces -->
                <div class="p-6 bg-white/[0.02] rounded-2xl border border-white/[0.06]">
                  <div class="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Why Activepieces</div>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                      </div>
                      <span class="text-white/60 text-sm">Self-hosted for healthcare privacy compliance</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                      </div>
                      <span class="text-white/60 text-sm">Open source and extensible</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                      </div>
                      <span class="text-white/60 text-sm">Built-in AI capabilities</span>
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
          Ready to automate your workflows?
        </h2>
        <p class="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          Build similar automations for your team with Activepieces—free to start.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a 
            href="https://cloud.activepieces.com/sign-up" 
            class="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all hover:scale-[1.02]"
          >
            Start building free
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
