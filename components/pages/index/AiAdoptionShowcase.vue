<template>
  <section ref="sectionRef" class="relative py-24 overflow-hidden">
    <!-- Warm beige canvas background - same as AiAgentsShowcase canvas -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#ebe9e4] to-[#dedad3]"></div>
    <!-- Subtle pattern -->
    <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(#c4c4c4 1px, transparent 1px); background-size: 24px 24px;"></div>

    <div class="relative max-w-7xl mx-auto px-4">
      <!-- Header row -->
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
        <div class="max-w-2xl">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Turn your entire org into AI builders
          </h2>
          <p class="text-xl text-gray-500">
            Templates, analytics, gamification, and branding that drive adoption from day one.
          </p>
        </div>
        <NuxtLink 
          to="/product/ai-adoption"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
        >
          Explore AI Adoption
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Playing cards stack -->
      <div class="relative pt-40" style="min-height: 600px;">
        <!-- Card stack container -->
        <div class="relative w-full h-[460px]">
            <!-- All 4 cards stacked like windows -->
            <div 
              v-for="(card, index) in cards" 
              :key="card.id"
              class="absolute left-0 top-0 w-[calc(100%-180px)] h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-500"
              :class="[
                activeCard === index ? 'card-active' : 'card-stacked'
              ]"
              :style="getCardStyle(index)"
              @click="selectCard(index)"
            >
              <!-- Window frame -->
              <div class="absolute inset-0 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm flex flex-col">
                <!-- Window title bar (like macOS) -->
                <div 
                  class="flex items-center gap-3 px-4 border-b border-gray-100 transition-all duration-300"
                  :class="activeCard === index ? 'py-3 bg-gray-50' : 'py-2 bg-gray-100'"
                >
                  <!-- Traffic lights -->
                  <div class="flex items-center gap-1.5 flex-shrink-0">
                    <div class="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#28c840]"></div>
                  </div>
                  
                  <!-- Window title - smaller when in back -->
                  <div 
                    class="flex-1 flex items-center justify-center gap-2 transition-all duration-300"
                    :class="activeCard === index ? 'opacity-100' : 'opacity-70'"
                  >
                    <div 
                      class="rounded-lg flex items-center justify-center transition-all duration-300"
                      :class="activeCard === index ? 'w-6 h-6' : 'w-5 h-5'"
                      :style="{ backgroundColor: card.iconBg }"
                    >
                      <component 
                        :is="card.icon" 
                        class="text-white transition-all duration-300" 
                        :class="activeCard === index ? 'w-3.5 h-3.5' : 'w-3 h-3'"
                        weight="fill" 
                      />
                    </div>
                    <span 
                      class="font-medium text-gray-700 transition-all duration-300 truncate"
                      :class="activeCard === index ? 'text-sm' : 'text-xs'"
                    >
                      {{ card.title }}
                    </span>
                  </div>
                  
                  <!-- Spacer for centering -->
                  <div class="w-[52px] flex-shrink-0"></div>
                </div>

                <!-- Window content - different content for each card -->
                <div class="flex-1 p-5 overflow-hidden bg-white">
                  <!-- Templates Card Content -->
                  <div v-if="card.id === 'templates'" class="h-full">
                    <div class="grid grid-cols-2 gap-4">
                      <div 
                        v-for="(template, tIdx) in templatesData" 
                        :key="tIdx"
                        class="group bg-gray-50 rounded-xl p-4 border border-gray-200/80 transition-all duration-300 hover:bg-gray-100/80 hover:border-gray-300/80 cursor-pointer relative overflow-hidden"
                        :style="{ borderLeftWidth: '4px', borderLeftColor: template.accentColor }"
                        @mouseenter="hoveredTemplate = tIdx"
                        @mouseleave="hoveredTemplate = null"
                      >
                        <!-- Hover overlay with description -->
                        <div 
                          class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-300 rounded-xl"
                          :class="hoveredTemplate === tIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'"
                          :style="{ backgroundColor: template.accentColor + 'f5' }"
                        >
                          <p class="text-white text-sm text-center font-medium mb-3">{{ template.description }}</p>
                          <span class="text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 text-white">
                            Use Template →
                          </span>
                        </div>
                        
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-xs font-bold px-2 py-1 rounded-md" :style="{ backgroundColor: template.accentColor + '18', color: template.accentColor }">
                            {{ template.department }}
                          </span>
                          <div class="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                            {{ template.savings }}
                          </div>
                        </div>
                        <h4 class="font-semibold text-gray-900 text-sm mb-3">{{ template.name }}</h4>
                        <div class="flex items-center gap-1.5">
                          <img v-for="(icon, iIdx) in template.icons" :key="iIdx" :src="icon" class="w-6 h-6 rounded-lg shadow-sm border border-gray-200" />
                          <span class="text-gray-400 text-xs ml-1">+{{ template.appsCount }} apps</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Analytics Card Content -->
                  <div v-if="card.id === 'analytics'" class="h-full flex flex-col gap-4">
                    <!-- Stats row with animated counters -->
                    <div class="grid grid-cols-3 gap-3">
                      <div 
                        v-for="(stat, sIdx) in analyticsStats" 
                        :key="stat.label" 
                        class="bg-gray-50 rounded-xl p-3 border border-gray-200/80 group hover:bg-gray-100/80 transition-all duration-300"
                      >
                        <div class="flex items-center justify-between mb-1">
                          <component :is="stat.icon" class="w-4 h-4" :style="{ color: stat.color }" weight="fill" />
                          <div class="flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span class="text-[10px] text-gray-400 font-medium">Live</span>
                          </div>
                        </div>
                        <p class="text-2xl font-bold text-gray-900 tabular-nums">
                          {{ stat.prefix }}<span class="stat-value">{{ animatedStats[sIdx] }}</span>{{ stat.suffix }}
                        </p>
                        <p class="text-gray-500 text-xs">{{ stat.label }}</p>
                        <div class="flex items-center gap-1 mt-1">
                          <span class="text-emerald-600 text-[10px] font-bold">↑ {{ stat.trend }}%</span>
                          <span class="text-gray-400 text-[10px]">vs last month</span>
                        </div>
                      </div>
                    </div>
                    <!-- Chart area -->
                    <div class="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200/80">
                      <div class="flex items-center justify-between mb-3">
                        <span class="text-gray-900 font-semibold text-sm">Cost Savings Over Time</span>
                        <div class="flex items-center gap-2">
                          <span class="px-2 py-1 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-700">+127%</span>
                        </div>
                      </div>
                      <svg class="w-full h-28" viewBox="0 0 400 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="adoptionChartGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
                            <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
                          </linearGradient>
                        </defs>
                        <!-- Grid lines -->
                        <line x1="0" y1="25" x2="400" y2="25" stroke="#d1d5db" stroke-dasharray="4"/>
                        <line x1="0" y1="50" x2="400" y2="50" stroke="#d1d5db" stroke-dasharray="4"/>
                        <line x1="0" y1="75" x2="400" y2="75" stroke="#d1d5db" stroke-dasharray="4"/>
                        <path d="M 0 85 Q 50 80, 100 70 T 200 45 T 300 25 T 400 10 L 400 100 L 0 100 Z" fill="url(#adoptionChartGradientLight)"/>
                        <path d="M 0 85 Q 50 80, 100 70 T 200 45 T 300 25 T 400 10" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" class="chart-line"/>
                        <!-- Animated dot -->
                        <circle cx="400" cy="10" r="4" fill="#10b981" class="chart-dot"/>
                        <circle cx="400" cy="10" r="7" fill="#10b981" opacity="0.3" class="chart-dot-ring"/>
                      </svg>
                      <div class="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                      </div>
                    </div>
                    <!-- Department breakdown -->
                    <div class="grid grid-cols-2 gap-3">
                      <div 
                        v-for="dept in analyticsDepts" 
                        :key="dept.name" 
                        class="bg-gray-50 rounded-lg p-3 border border-gray-200/80 group hover:bg-gray-100/80 transition-all duration-200"
                      >
                        <div class="flex items-center justify-between mb-2">
                          <span class="text-gray-600 text-xs font-medium">{{ dept.name }}</span>
                          <span class="text-gray-900 text-xs font-bold">{{ dept.value }} users</span>
                        </div>
                        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            class="h-full rounded-full transition-all duration-500 group-hover:opacity-80" 
                            :style="{ width: dept.percent + '%', backgroundColor: dept.color }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Leaderboard & Badges Card Content -->
                  <div v-if="card.id === 'leaderboard'" class="h-full flex gap-4">
                    <!-- Leaderboard side -->
                    <div class="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200/80">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                          <PhTrophy class="w-5 h-5 text-amber-500 trophy-glow" weight="fill" />
                          <span class="text-gray-900 font-semibold text-sm">Top Builders</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                          <span class="text-[10px] text-gray-400 font-medium">This Week</span>
                          <div class="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full week-progress"></div>
                          </div>
                        </div>
                      </div>
                      <div class="space-y-2.5">
                        <div 
                          v-for="(builder, bIdx) in leaderboardData" 
                          :key="bIdx" 
                          class="flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100/80 group"
                        >
                          <div class="w-6 h-6 flex items-center justify-center">
                            <PhMedal v-if="bIdx < 3" class="w-5 h-5 transition-transform group-hover:scale-110" :class="bIdx === 0 ? 'text-amber-500' : bIdx === 1 ? 'text-gray-400' : 'text-amber-600'" weight="fill" />
                            <span v-else class="text-gray-400 text-xs font-bold">{{ bIdx + 1 }}</span>
                          </div>
                          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm" :style="{ backgroundColor: builder.color }">
                            {{ builder.initials }}
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-gray-900 text-sm font-medium truncate">{{ builder.name }}</p>
                            <p class="text-gray-400 text-xs">{{ builder.flows }} flows · {{ builder.hours }}h saved</p>
                          </div>
                          <div class="text-right">
                            <p class="text-gray-900 text-sm font-bold tabular-nums">{{ builder.points }}</p>
                            <p class="text-gray-400 text-[10px]">pts</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Badges side -->
                    <div class="w-44 bg-gray-50 rounded-xl p-4 border border-gray-200/80">
                      <div class="flex items-center gap-2 mb-4">
                        <PhStar class="w-5 h-5 text-violet-500" weight="fill" />
                        <span class="text-gray-900 font-semibold text-sm">Badges</span>
                      </div>
                      <div class="grid grid-cols-3 gap-2">
                        <div 
                          v-for="badge in badgesData" 
                          :key="badge.name" 
                          class="aspect-square rounded-xl flex flex-col items-center justify-center p-1.5 transition-all duration-200 cursor-pointer group"
                          :class="badge.unlocked 
                            ? 'bg-white border border-gray-200 hover:shadow-md hover:scale-105' 
                            : 'bg-gray-100 border border-gray-200/50 opacity-40'"
                        >
                          <component 
                            :is="badge.icon" 
                            class="w-5 h-5 mb-0.5 transition-transform group-hover:scale-110" 
                            :class="badge.unlocked ? badge.color : 'text-gray-300'" 
                            weight="fill" 
                          />
                          <span class="text-[7px] text-gray-500 text-center truncate w-full font-medium">{{ badge.name }}</span>
                        </div>
                      </div>
                      <div class="mt-3 pt-3 border-t border-gray-200/80">
                        <div class="flex items-center justify-between text-xs">
                          <span class="text-gray-500">Collected</span>
                          <span class="text-gray-900 font-bold">5/9</span>
                        </div>
                        <div class="h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                          <div class="h-full w-[56%] bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Branding Card Content -->
                  <div v-if="card.id === 'branding'" class="h-full flex gap-4">
                    <!-- Color picker side -->
                    <div class="w-14 flex flex-col gap-2.5 items-center py-2">
                      <span class="text-[10px] text-gray-500 font-medium mb-1">Theme</span>
                      <button 
                        v-for="(color, cIdx) in brandColors" 
                        :key="cIdx"
                        @click.stop="activeBrandColor = cIdx"
                        class="w-9 h-9 rounded-full transition-all duration-200 hover:scale-110 shadow-md border-2"
                        :class="activeBrandColor === cIdx 
                          ? 'scale-110 border-gray-900 ring-2 ring-offset-2 ring-gray-300' 
                          : 'border-white opacity-80 hover:opacity-100'"
                        :style="{ background: `linear-gradient(135deg, ${color.primary} 0%, ${color.secondary} 100%)` }"
                      ></button>
                    </div>
                    <!-- Mock branded UI -->
                    <div class="flex-1 bg-gray-50 rounded-xl overflow-hidden border border-gray-200/80">
                      <!-- Mock browser bar -->
                      <div class="bg-gray-100/80 px-3 py-2.5 border-b border-gray-200/80">
                        <div class="flex items-center gap-1.5 mb-2">
                          <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                          <span class="ml-auto text-[10px] text-gray-400 font-medium">your-company.ai</span>
                        </div>
                        <div class="bg-white rounded-lg py-1.5 px-3 flex items-center gap-2 border border-gray-200">
                          <div class="w-4 h-4 rounded transition-all duration-300" :style="{ background: brandColors[activeBrandColor].primary }"></div>
                          <div class="h-2 flex-1 rounded-full transition-all duration-300" :style="{ background: brandColors[activeBrandColor].primary + '25' }"></div>
                        </div>
                      </div>
                      <!-- Mock content -->
                      <div class="p-4 space-y-3 bg-white">
                        <div class="flex items-center gap-3">
                          <div class="w-8 h-8 rounded-lg transition-all duration-300 flex items-center justify-center" :style="{ background: brandColors[activeBrandColor].primary }">
                            <div class="w-4 h-4 rounded-full bg-white/80"></div>
                          </div>
                          <div>
                            <div class="h-3 rounded w-28 mb-1 transition-all duration-300 font-bold text-sm" :style="{ color: brandColors[activeBrandColor].primary }">Your AI Platform</div>
                            <div class="h-2 rounded w-20 bg-gray-200"></div>
                          </div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-3 border-2 border-dashed transition-all duration-300" :style="{ borderColor: brandColors[activeBrandColor].primary + '40' }">
                          <div class="h-2.5 rounded mb-2 w-full transition-all duration-300" :style="{ background: brandColors[activeBrandColor].primary + '30' }"></div>
                          <div class="h-2 rounded w-3/4 bg-gray-200"></div>
                        </div>
                        <div 
                          class="h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm" 
                          :style="{ background: `linear-gradient(135deg, ${brandColors[activeBrandColor].primary} 0%, ${brandColors[activeBrandColor].secondary} 100%)` }"
                        >
                          <div class="h-2 w-20 bg-white/90 rounded"></div>
                        </div>
                        <div class="flex items-center gap-3 pt-2">
                          <div class="w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center text-white text-xs font-bold" :style="{ background: brandColors[activeBrandColor].primary }">
                            YN
                          </div>
                          <div class="flex-1">
                            <div class="h-2.5 rounded w-24 mb-1 bg-gray-700"></div>
                            <div class="h-2 rounded w-16 bg-gray-300"></div>
                          </div>
                          <div class="px-2 py-1 rounded-md text-[10px] font-bold transition-all duration-300" :style="{ background: brandColors[activeBrandColor].primary + '15', color: brandColors[activeBrandColor].primary }">
                            Admin
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script setup>
import { ref, computed, markRaw, onMounted, onUnmounted } from 'vue'
import { 
  PhBooks, 
  PhChartLineUp, 
  PhTrophy, 
  PhPaintBrush,
  PhMedal,
  PhStar,
  PhLightning,
  PhRocket,
  PhHeart,
  PhFire,
  PhBrain,
  PhHandWaving,
  PhBarbell,
  PhUsers,
  PhTimer,
  PhTrendUp
} from '@phosphor-icons/vue'

const sectionRef = ref(null)
const activeCard = ref(0)
const activeBrandColor = ref(0)
const hoveredTemplate = ref(null)

// Animated stats
const animatedStats = ref(['0', '0', '0'])
let animationFrame = null

const selectCard = (index) => {
  activeCard.value = index
}

onMounted(() => {
  // Animate stat counters
  const targets = [847, 12400, 94]
  const duration = 2000
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)

    animatedStats.value = [
      Math.round(targets[0] * easeOut).toLocaleString(),
      (Math.round(targets[1] * easeOut / 100) / 10).toFixed(1) + 'k',
      Math.round(targets[2] * easeOut).toString()
    ]

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }

  animate()
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})

// Card definitions
const cards = [
  {
    id: 'templates',
    title: 'Template Library',
    shortTitle: 'Templates',
    subtitle: 'Ready-made automations',
    icon: markRaw(PhBooks),
    iconBg: '#8b5cf6',
    badge: 'Popular',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    badgeColor: '#7c3aed'
  },
  {
    id: 'analytics',
    title: 'Impact Analytics',
    shortTitle: 'Analytics',
    subtitle: 'Track adoption & ROI',
    icon: markRaw(PhChartLineUp),
    iconBg: '#10b981',
    badge: 'Real-time',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeColor: '#059669'
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard & Badges',
    shortTitle: 'Gamify',
    subtitle: 'Gamify adoption',
    icon: markRaw(PhTrophy),
    iconBg: '#f59e0b',
    badge: 'Engaging',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeColor: '#d97706'
  },
  {
    id: 'branding',
    title: 'White Label',
    shortTitle: 'Branding',
    subtitle: 'Your brand, your platform',
    icon: markRaw(PhPaintBrush),
    iconBg: '#ec4899',
    badge: 'Custom',
    badgeBg: 'rgba(236, 72, 153, 0.15)',
    badgeColor: '#db2777'
  }
]

// Templates data
const templatesData = [
  {
    department: 'Sales',
    name: 'Lead Qualifier Agent',
    description: 'Automatically score and qualify inbound leads using AI, then route to the right sales rep.',
    savings: '$19.9k/yr',
    accentColor: '#3b82f6',
    icons: ['https://cdn.activepieces.com/pieces/hubspot.png', 'https://cdn.activepieces.com/pieces/openai.png', 'https://cdn.activepieces.com/pieces/salesforce.png'],
    appsCount: 12
  },
  {
    department: 'HR',
    name: 'Resume Screener',
    description: 'Screen CVs instantly with AI, generate interview packs, and schedule calls automatically.',
    savings: '$8.2k/yr',
    accentColor: '#ec4899',
    icons: ['https://cdn.activepieces.com/pieces/gmail.png', 'https://cdn.activepieces.com/pieces/openai.png', 'https://cdn.activepieces.com/pieces/google-sheets.png'],
    appsCount: 8
  },
  {
    department: 'Marketing',
    name: 'Content Repurposer',
    description: 'Turn blog posts into social threads, email snippets, and video scripts with one click.',
    savings: '$5.4k/yr',
    accentColor: '#8b5cf6',
    icons: ['https://cdn.activepieces.com/pieces/slack.png', 'https://cdn.activepieces.com/pieces/openai.png', 'https://cdn.activepieces.com/pieces/notion.png'],
    appsCount: 15
  },
  {
    department: 'Finance',
    name: 'Invoice Chaser',
    description: 'Automatically follow up on overdue invoices with personalized reminder sequences.',
    savings: '$12.1k/yr',
    accentColor: '#10b981',
    icons: ['https://cdn.activepieces.com/pieces/quickbooks.png', 'https://cdn.activepieces.com/pieces/gmail.png', 'https://cdn.activepieces.com/pieces/slack.png'],
    appsCount: 6
  }
]

// Analytics data
const analyticsStats = [
  { label: 'Active Users', value: 847, prefix: '', suffix: '', icon: markRaw(PhUsers), color: '#8b5cf6', trend: 23 },
  { label: 'Hours Saved', value: 12400, prefix: '', suffix: 'h', icon: markRaw(PhTimer), color: '#10b981', trend: 34 },
  { label: 'Adoption Rate', value: 94, prefix: '', suffix: '%', icon: markRaw(PhTrendUp), color: '#ec4899', trend: 12 }
]

const analyticsDepts = [
  { name: 'Marketing', value: '234', percent: 88, color: '#f59e0b' },
  { name: 'Engineering', value: '189', percent: 72, color: '#8b5cf6' },
  { name: 'Sales', value: '156', percent: 58, color: '#10b981' },
  { name: 'Operations', value: '142', percent: 45, color: '#ec4899' }
]

// Leaderboard data
const leaderboardData = [
  { name: 'Sarah Chen', initials: 'SC', flows: 47, hours: 124, points: 2840, color: '#8b5cf6' },
  { name: 'Mike Johnson', initials: 'MJ', flows: 38, hours: 98, points: 2310, color: '#f59e0b' },
  { name: 'Emma Wilson', initials: 'EW', flows: 31, hours: 76, points: 1890, color: '#10b981' },
  { name: 'Alex Kumar', initials: 'AK', flows: 24, hours: 54, points: 1420, color: '#ec4899' },
  { name: 'James Park', initials: 'JP', flows: 19, hours: 41, points: 1150, color: '#3b82f6' }
]

// Badges data
const badgesData = [
  { name: 'First Flow', icon: markRaw(PhRocket), color: 'text-violet-500', unlocked: true },
  { name: 'Power User', icon: markRaw(PhLightning), color: 'text-amber-500', unlocked: true },
  { name: 'Team Player', icon: markRaw(PhHeart), color: 'text-pink-500', unlocked: true },
  { name: 'On Fire', icon: markRaw(PhFire), color: 'text-orange-500', unlocked: true },
  { name: 'Big Brain', icon: markRaw(PhBrain), color: 'text-cyan-500', unlocked: true },
  { name: 'Champion', icon: markRaw(PhTrophy), color: 'text-amber-500', unlocked: false },
  { name: 'Friendly', icon: markRaw(PhHandWaving), color: 'text-emerald-500', unlocked: false },
  { name: 'Dedicated', icon: markRaw(PhBarbell), color: 'text-blue-500', unlocked: false },
  { name: 'All Star', icon: markRaw(PhStar), color: 'text-yellow-500', unlocked: false }
]

// Brand colors with secondary
const brandColors = [
  { primary: '#8b5cf6', secondary: '#7c3aed', name: 'Violet' },
  { primary: '#ec4899', secondary: '#db2777', name: 'Pink' },
  { primary: '#3b82f6', secondary: '#2563eb', name: 'Blue' },
  { primary: '#f97316', secondary: '#ea580c', name: 'Orange' },
  { primary: '#10b981', secondary: '#059669', name: 'Emerald' }
]

// Card positioning - fan out with transparency for back cards
const getCardStyle = (index) => {
  const totalCards = cards.length
  let offset = index - activeCard.value
  
  // Normalize to always show cards "behind" (positive offset)
  if (offset < 0) {
    offset = totalCards + offset
  }
  
  // Active card - front and center, full opacity
  if (offset === 0) {
    return {
      transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)',
      opacity: 1,
      zIndex: 40,
      filter: 'none'
    }
  }
  
  // Cards behind - fan out to the right and up, semi-transparent
  const translateX = offset * 55
  const translateY = offset * -40
  const rotation = offset * 4
  const scale = 1 - (offset * 0.02)
  const opacity = 0.85 - (offset * 0.1) // Semi-transparent
  
  return {
    transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
    transformOrigin: 'bottom left',
    opacity: Math.max(0.5, opacity),
    zIndex: 40 - (offset * 10),
    pointerEvents: 'auto'
  }
}
</script>

<style scoped>
.card-active {
  box-shadow: 
    0 25px 60px -15px rgba(0, 0, 0, 0.25),
    0 10px 30px -10px rgba(0, 0, 0, 0.15);
}

.card-stacked {
  box-shadow: 
    0 10px 30px -10px rgba(0, 0, 0, 0.12),
    0 4px 12px -4px rgba(0, 0, 0, 0.08);
}

/* Smooth spring-like transition for card shuffle */
.card-active,
.card-stacked {
  transition: 
    transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 400ms ease-out,
    box-shadow 400ms ease-out,
    filter 300ms ease-out;
  will-change: transform, opacity;
}

/* Hover effect on stacked cards - brighten and lift shadow */
.card-stacked:hover {
  opacity: 1 !important;
  filter: brightness(1.03) saturate(1.05);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.22),
    0 12px 25px -8px rgba(0, 0, 0, 0.14);
}

/* Chart animations */
.chart-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-line 2s ease-out forwards;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

.chart-dot {
  animation: dot-pulse 2s ease-in-out infinite;
}

.chart-dot-ring {
  animation: dot-ring-pulse 2s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

@keyframes dot-ring-pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 0.1; }
}

/* Trophy glow */
.trophy-glow {
  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.5));
}

/* Week progress animation */
.week-progress {
  animation: week-fill 8s linear infinite;
}

@keyframes week-fill {
  0% { width: 0%; }
  100% { width: 100%; }
}

/* Stat value animation */
.stat-value {
  display: inline-block;
}
</style>
