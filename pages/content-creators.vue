<script setup>
import { ref, computed, onMounted } from 'vue'

const pageTitle = 'Creator Program';
const metaDesc = 'Join the Activepieces Creator Program. Get paid per 1,000 impressions for creating authentic content about AI automation.';

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
});

definePageMeta({
  layout: 'default'
});

// Budget
const MONTHLY_BUDGET = 8000
const submittedValue = ref(5400)
const budgetPercentage = computed(() => (submittedValue.value / MONTHLY_BUDGET) * 100)
const remainingBudget = computed(() => Math.max(MONTHLY_BUDGET - submittedValue.value, 0))

// Pricing channels
const pricingChannels = [
  { channel: 'X', content: 'Posts & threads', cpm: 5 },
  { channel: 'LinkedIn', content: 'Posts & carousels', cpm: 12 },
  { channel: 'TikTok', content: 'Short videos', cpm: 6 },
  { channel: 'Instagram', content: 'Reels & posts', cpm: 6 },
  { channel: 'YouTube', content: 'Long-form videos', cpm: 25 },
  { channel: 'Newsletter', content: 'Email features', cpm: 30 },
  { channel: 'Blog', content: 'Tutorials & guides', cpm: 15 },
];

// Channel icons
const channelIcons = {
  'X': 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  'LinkedIn': 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  'TikTok': 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z',
  'Instagram': 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  'YouTube': 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  'Newsletter': 'M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z',
  'Blog': 'M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z',
}

// Content guidelines
const goodContent = [
  { title: 'Real tutorials with real workflows', desc: 'Step-by-step automation builds' },
  { title: 'Honest comparisons', desc: 'vs Zapier, Make, n8n — unbiased reviews' },
  { title: 'Personal automation stories', desc: 'Time saved, problems solved' },
  { title: 'Creative AI agent demos', desc: 'Novel use cases people haven\'t seen' },
]

const badContent = [
  { title: 'Logo-only mentions', desc: 'No value, no context' },
  { title: 'AI-generated fluff', desc: 'We can tell, your audience can too' },
  { title: 'Misleading claims', desc: 'No "10x overnight" promises' },
  { title: 'Non-English content', desc: 'English only for now' },
]

// Actual TikTok videos from creators
const tiktokVideos = [
  { id: '7548919705164156166', creator: '@kyle_solar' },
  { id: '7515021659720617262', creator: '@alfrednutile' },
  { id: '7590760029779807501', creator: '@brandnexusai' },
  { id: '7548535528371637526', creator: '@nathanhodgson_' },
]

// Duplicate videos for seamless loop (2 columns)
const videoWallCol1 = [...tiktokVideos, ...tiktokVideos, ...tiktokVideos]
const videoWallCol2 = [...tiktokVideos.slice(2), ...tiktokVideos.slice(0, 2), ...tiktokVideos, ...tiktokVideos.slice(1)]

// Scroll to budget section
const scrollToBudget = () => {
  const budgetEl = document.getElementById('budget')
  if (budgetEl) {
    budgetEl.scrollIntoView({ behavior: 'smooth' })
  }
}

// Show more reasons
const showMoreReasons = ref(false)

// Top 4 highlight reasons (most impactful)
const topReasons = [
  {
    title: 'Backed by Y Combinator',
    desc: 'YC S22 company. The same accelerator behind Stripe, Airbnb, and Dropbox.',
    icon: 'rocket',
    color: 'violet'
  },
  {
    title: 'Dries Buytaert Invested',
    desc: 'The creator of Drupal calls orchestration "critical infrastructure" — and put his money behind us.',
    icon: 'star',
    color: 'amber'
  },
  {
    title: '20,000+ GitHub Stars',
    desc: 'Thousands of developers trust us. Open source with real community momentum.',
    icon: 'code',
    color: 'cyan'
  },
  {
    title: 'Enterprise Customers Trust Us',
    desc: 'MoneyGram, Alan, Funding Societies run their operations on Activepieces.',
    icon: 'building',
    color: 'emerald'
  }
]

// Additional reasons (revealed on expand)
const moreReasons = [
  { title: '4.8/5 on G2', desc: '141+ verified reviews from real users who chose us over alternatives.' },
  { title: '100,000+ Users', desc: 'From solo creators to enterprise teams at Google, Roblox, and ClickUp.' },
  { title: 'MIT Licensed', desc: 'True open source. No vendor lock-in. Self-host on your own terms.' },
  { title: '596+ Integrations', desc: 'Connect to virtually any tool. If it has an API, we support it.' },
  { title: '60% Community-Built', desc: 'Our pieces are open source and contributed by the community.' },
  { title: 'AI-Native Platform', desc: 'Pieces become MCP servers automatically. Works with Claude, Cursor, Windsurf.' },
  { title: 'Saved Funding Societies a Quarter', desc: 'Real case study: entire quarter of engineering time saved.' },
  { title: 'AppSumo Buyers Love Us', desc: '"Insane value vs Zapier" — actual reviews with the math to prove it.' },
  { title: 'TypeScript Under the Hood', desc: 'Pieces are npm packages. Developers can extend with real code.' },
  { title: 'Auto-Retry Built In', desc: 'Production-grade reliability. No babysitting your automations.' },
  { title: 'Flow Versioning', desc: 'Immutable published versions. Roll back anytime. Sleep well.' },
  { title: 'Admin Governance Controls', desc: 'Whitelist pieces, restrict access, deploy private integrations.' },
  { title: 'Human-in-the-Loop', desc: 'Approval workflows and "Todos" for real business processes.' },
  { title: 'Beginner-Friendly', desc: 'Consistently rated easier to learn than n8n and other OSS tools.' },
  { title: 'Self-Host for Privacy', desc: 'Your server, your data. GDPR compliance made simple.' },
  { title: '131+ Trustpilot Reviews', desc: 'Independent proof from another platform. We\'re not hiding anything.' },
]

</script>

<template>
  <div class="min-h-screen bg-slate-950">
    
    <!-- Hero with Video Wall -->
    <section class="relative pt-36 pb-32 overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/[0.08] rounded-full blur-[150px]"></div>
      
      <div class="relative z-10 max-w-6xl mx-auto px-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          <!-- Left side - Content -->
          <div class="flex-1 lg:max-w-lg">
            <!-- Status badge -->
            <div class="flex mb-8">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.08]">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-xs text-white/70 font-medium">Accepting applications</span>
              </div>
          </div>
          
            <h1 class="text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mb-6" style="font-family: 'Sentient', serif; font-weight: 500;">
              Get paid for<br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">your content</span>
          </h1>
          
            <p class="text-lg text-white/50 mb-10 max-w-md">
              Earn money for every 1,000 impressions. No affiliate links, no tracking codes — just authentic content about automation.
            </p>

                <!-- Supported channels - 2 rows -->
            <div class="space-y-3 mb-10">
              <div class="flex items-center gap-5 text-white/40">
                <div v-for="ch in pricingChannels.slice(0, 4)" :key="ch.channel" class="flex items-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path :d="channelIcons[ch.channel]" />
                  </svg>
                  <span class="text-sm font-medium tracking-wide">{{ ch.channel }}</span>
                </div>
              </div>
              <div class="flex items-center gap-5 text-white/40">
                <div v-for="ch in pricingChannels.slice(4)" :key="ch.channel" class="flex items-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path :d="channelIcons[ch.channel]" />
                  </svg>
                  <span class="text-sm font-medium tracking-wide">{{ ch.channel }}</span>
          </div>
        </div>
      </div>
      
            <div class="flex items-center gap-5">
              <a 
                href="https://forms.gle/your-form-link" 
                target="_blank"
                class="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 text-sm font-semibold rounded-xl hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Apply to join
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </a>
              <button 
                @click="scrollToBudget"
                class="text-white/60 hover:text-white/80 transition-colors text-sm"
                style="font-family: 'Space Grotesk', sans-serif;"
              >
                ${{ remainingBudget.toLocaleString() }} left this month
              </button>
            </div>
          </div>

          <!-- Right side - Masonry Video Wall (2 columns) -->
          <div class="hidden lg:block flex-1 relative h-[650px]">
            <!-- Gradient overlays for cinematic fade -->
            <div class="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none"></div>
            <div class="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none"></div>
            <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
            
            <!-- Masonry columns container -->
            <div class="absolute inset-0 flex gap-5 overflow-hidden">
              <!-- Column 1 - moves up -->
              <div class="flex-1 video-column video-column-1">
                <div class="video-scroll-up">
                  <div 
                    v-for="(video, idx) in videoWallCol1" 
                    :key="`col1-${idx}`"
                    class="video-card mb-5 pointer-events-none rounded-2xl overflow-hidden bg-slate-900"
                    :class="idx % 3 === 0 ? 'h-[340px]' : idx % 3 === 1 ? 'h-[400px]' : 'h-[300px]'"
                  >
                    <iframe 
                      :src="`https://www.tiktok.com/embed/v2/${video.id}`"
                      class="w-full h-full scale-[1.01]"
                      frameborder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      scrolling="no"
                    ></iframe>
                  </div>
                </div>
        </div>
        
              <!-- Column 2 - moves up (offset start) -->
              <div class="flex-1 video-column video-column-2">
                <div class="video-scroll-up-offset">
                  <div 
                    v-for="(video, idx) in videoWallCol2" 
                    :key="`col2-${idx}`"
                    class="video-card mb-5 pointer-events-none rounded-2xl overflow-hidden bg-slate-900"
                    :class="idx % 3 === 0 ? 'h-[300px]' : idx % 3 === 1 ? 'h-[340px]' : 'h-[400px]'"
                  >
                    <iframe 
                      :src="`https://www.tiktok.com/embed/v2/${video.id}`"
                      class="w-full h-full scale-[1.01]"
                      frameborder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      scrolling="no"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Budget Section - Dark theme -->
    <section id="budget" class="relative z-20 px-6 py-16 scroll-mt-20">
      <div class="max-w-4xl mx-auto">
        <div class="rounded-3xl bg-white/[0.03] border border-white/[0.08] p-8 md:p-10">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
              <div class="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2" style="font-family: 'Space Grotesk', sans-serif;">Monthly Creator Pool</div>
              <div class="flex items-baseline gap-3">
                <span class="text-5xl md:text-6xl font-bold text-white" style="font-family: 'Space Grotesk', sans-serif;">${{ remainingBudget.toLocaleString() }}</span>
                <span class="text-xl text-slate-400">remaining</span>
              </div>
            </div>
            <div class="text-left md:text-right">
              <div class="text-4xl font-bold text-white" style="font-family: 'Space Grotesk', sans-serif;">{{ Math.round(budgetPercentage) }}%</div>
              <div class="text-sm text-slate-400">claimed this month</div>
            </div>
          </div>
          
          <div class="relative h-4 bg-white/10 rounded-full overflow-hidden mb-4">
            <div 
              class="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
              :class="budgetPercentage > 80 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-violet-500 to-purple-500'"
              :style="{ width: Math.min(budgetPercentage, 100) + '%' }"
            ></div>
          </div>
          
          <p class="text-sm text-slate-500" style="font-family: 'Space Grotesk', sans-serif;">
            First come, first served. Submit your content before the pool fills up.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Activepieces Section -->
    <section class="py-24 px-6 relative">
      <!-- Subtle glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-violet-500/[0.06] rounded-full blur-[120px]"></div>
      
      <div class="relative z-10 max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-violet-400 text-sm font-semibold uppercase tracking-wider mb-4" style="font-family: 'Space Grotesk', sans-serif;">Why creators love us</p>
          <h2 class="text-3xl md:text-5xl text-white mb-4" style="font-family: 'Sentient', serif; font-weight: 500; letter-spacing: 0.01em;">
            Not just another tool.<br class="hidden sm:block" /> The one people talk about.
          </h2>
          <p class="text-slate-400 max-w-2xl mx-auto text-lg" style="font-family: 'Space Grotesk', sans-serif;">
            Backed by legends. Trusted by giants. Loved by thousands.
          </p>
        </div>
        
        <!-- Top 4 Hero Reasons -->
        <div class="grid md:grid-cols-2 gap-5 lg:gap-6">
          <div 
            v-for="(reason, idx) in topReasons" 
            :key="reason.title"
            class="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <!-- Dynamic icon based on type -->
              <div 
                class="flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                :class="[
                  reason.color === 'violet' ? 'text-violet-400' :
                  reason.color === 'amber' ? 'text-amber-400' :
                  reason.color === 'cyan' ? 'text-cyan-400' :
                  'text-emerald-400'
                ]"
              >
                <!-- YC / Rocket -->
                <svg v-if="reason.icon === 'rocket'" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                <!-- Star / Investor -->
                <svg v-else-if="reason.icon === 'star'" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <!-- Code / GitHub -->
                <svg v-else-if="reason.icon === 'code'" class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <!-- Building / Enterprise -->
                <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-0.5" style="font-family: 'Space Grotesk', sans-serif;">{{ reason.title }}</h3>
                <p class="text-slate-400 text-sm leading-relaxed">{{ reason.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Expand to see more -->
        <div class="mt-10 text-center">
          <button 
            @click="showMoreReasons = !showMoreReasons"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] rounded-full transition-all duration-300"
            style="font-family: 'Space Grotesk', sans-serif;"
          >
            <span v-if="!showMoreReasons">See 16 more reasons</span>
            <span v-else>Show less</span>
            <svg 
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': showMoreReasons }"
              fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
        
        <!-- More Reasons (expandable) -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-[2000px]"
          leave-from-class="opacity-100 max-h-[2000px]"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="showMoreReasons" class="mt-8 overflow-hidden">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                v-for="reason in moreReasons" 
                :key="reason.title"
                class="group p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200"
              >
                <div class="flex items-start gap-3">
                  <span class="text-lg flex-shrink-0 group-hover:scale-125 transition-transform duration-200">{{ reason.icon }}</span>
                  <div>
                    <h4 class="text-sm font-semibold text-white mb-0.5" style="font-family: 'Space Grotesk', sans-serif;">{{ reason.title }}</h4>
                    <p class="text-slate-500 text-xs leading-relaxed">{{ reason.desc }}</p>
              </div>
            </div>
              </div>
            </div>
          </div>
        </Transition>

        <div class="mt-12 text-center">
          <p class="text-slate-500 text-sm" style="font-family: 'Space Grotesk', sans-serif;">
            When you talk about Activepieces, you're recommending something you can actually stand behind.
          </p>
        </div>
      </div>
      
    </section>

    <!-- Separator: Dark to Light -->
    <div class="relative h-24 md:h-32 bg-[#fafafa]">
      <div class="absolute inset-0 bg-slate-950" style="clip-path: polygon(0 0, 100% 0, 100% 0%, 0 100%);"></div>
    </div>

    <!-- Pricing Table -->
    <section class="py-20 px-6 bg-[#fafafa]">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl text-slate-900 mb-3" style="font-family: 'Sentient', serif; font-weight: 500;">Rates by platform</h2>
          <p class="text-slate-500" style="font-family: 'Space Grotesk', sans-serif;">What you earn per 1,000 impressions</p>
        </div>
        
        <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
          <div class="grid grid-cols-3 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200/60 text-xs font-medium text-slate-500 uppercase tracking-wide">
            <div>Platform</div>
            <div>Content type</div>
            <div class="text-right">CPM rate</div>
        </div>
        
          <div class="divide-y divide-slate-100">
            <div 
              v-for="item in pricingChannels" 
              :key="item.channel"
              class="grid grid-cols-3 gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors"
            >
              <div class="font-medium text-slate-900">{{ item.channel }}</div>
              <div class="text-slate-500 text-sm">{{ item.content }}</div>
              <div class="text-right">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-900 text-white text-sm font-semibold">
                  ${{ item.cpm }}
                </span>
              </div>
            </div>
          </div>
            </div>
            
        <p class="text-center text-sm text-slate-400 mt-6">
          Minimum payout: $50 per submission · Views counted 14 days after posting
        </p>
      </div>
    </section>

    <!-- Content Guidelines -->
    <section class="py-20 px-6 bg-white">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl text-slate-900 mb-3" style="font-family: 'Sentient', serif; font-weight: 500;">Content guidelines</h2>
          <p class="text-slate-500" style="font-family: 'Space Grotesk', sans-serif;">What gets approved — and what doesn't</p>
            </div>
            
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Good -->
            <div>
            <div class="flex items-center gap-2 mb-6">
              <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 class="font-semibold text-slate-900">What we approve</h3>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="item in goodContent" 
                :key="item.title"
                class="p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div class="font-medium text-slate-900 mb-0.5">{{ item.title }}</div>
                <div class="text-sm text-slate-500">{{ item.desc }}</div>
              </div>
            </div>
            </div>
            
          <!-- Bad -->
            <div>
            <div class="flex items-center gap-2 mb-6">
              <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 class="font-semibold text-slate-900">What we reject</h3>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="item in badContent" 
                :key="item.title"
                class="p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div class="font-medium text-slate-900 mb-0.5">{{ item.title }}</div>
                <div class="text-sm text-slate-500">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="py-20 px-6 bg-[#fafafa]">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl text-slate-900" style="font-family: 'Sentient', serif; font-weight: 500;">How it works</h2>
        </div>
        
        <div class="grid sm:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto mb-4 text-sm font-semibold">1</div>
            <div class="font-medium text-slate-900 mb-1">Apply</div>
            <div class="text-sm text-slate-500">Submit your channel info</div>
        </div>
          <div class="text-center">
            <div class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto mb-4 text-sm font-semibold">2</div>
            <div class="font-medium text-slate-900 mb-1">Create</div>
            <div class="text-sm text-slate-500">Make quality content</div>
            </div>
          <div class="text-center">
            <div class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto mb-4 text-sm font-semibold">3</div>
            <div class="font-medium text-slate-900 mb-1">Submit</div>
            <div class="text-sm text-slate-500">Share your analytics</div>
            </div>
          <div class="text-center">
            <div class="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto mb-4 text-sm font-semibold">4</div>
            <div class="font-medium text-slate-900 mb-1">Get paid</div>
            <div class="text-sm text-slate-500">Monthly via PayPal or bank</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 px-6 bg-white">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl md:text-4xl text-slate-900 text-center mb-12" style="font-family: 'Sentient', serif; font-weight: 500;">Questions</h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="font-medium text-slate-900 mb-1">Do I need a lot of followers?</h3>
            <p class="text-slate-500 text-sm">No. We care about engagement and content quality, not follower counts.</p>
          </div>
          <div class="border-t border-slate-100 pt-6">
            <h3 class="font-medium text-slate-900 mb-1">How do I prove impressions?</h3>
            <p class="text-slate-500 text-sm">Screenshot from your platform's native analytics (Twitter Analytics, LinkedIn stats, YouTube Studio, etc.)</p>
          </div>
          <div class="border-t border-slate-100 pt-6">
            <h3 class="font-medium text-slate-900 mb-1">When do views get counted?</h3>
            <p class="text-slate-500 text-sm">We count impressions 14 days after posting (30 days for blogs and newsletters).</p>
          </div>
          <div class="border-t border-slate-100 pt-6">
            <h3 class="font-medium text-slate-900 mb-1">What if the budget is full?</h3>
            <p class="text-slate-500 text-sm">Submit anyway. If earlier submissions get rejected, your content could still be approved.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-6 bg-slate-900">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl text-white mb-4" style="font-family: 'Sentient', serif; font-weight: 500;">Ready to start?</h2>
        <p class="text-slate-400 mb-8" style="font-family: 'Space Grotesk', sans-serif;">Join the program and start earning from your content.</p>
        <a 
          href="https://forms.gle/your-form-link" 
          target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
        >
          Apply now
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Video wall animations - smooth slow upward scroll */
@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes scroll-up-offset {
  0% {
    transform: translateY(-25%);
  }
  100% {
    transform: translateY(-75%);
  }
}

.video-scroll-up {
  animation: scroll-up 40s linear infinite;
}

.video-scroll-up-offset {
  animation: scroll-up-offset 45s linear infinite;
}
</style>
