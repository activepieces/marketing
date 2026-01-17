<template>
  <div class="relative w-full h-full">
    <!-- Hidden windows (were already open behind) -->
    <div
      v-if="browserClosed"
      class="absolute inset-0 z-5 overflow-hidden"
    >
      <!-- Countdown on LEFT -->
      <div
        class="absolute left-8 top-1/2 -translate-y-1/2 z-5"
        style="width: 160px;"
      >
        <div class="text-center">
          <div class="text-xs text-white/40 mb-3">
            Taking you back to<br/>Impact Analytics
          </div>
          <div
            class="text-[110px] font-light tabular-nums leading-none transition-colors duration-300"
            :class="countdownPaused ? 'text-violet-400' : 'text-white/30'"
          >
            {{ sneakyCountdown }}
          </div>
          <button
            @click="toggleCountdownPause"
            class="mt-4 flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
            :class="countdownPaused ? 'text-violet-400' : 'text-white/50'"
          >
            <PhPlay v-if="countdownPaused" class="w-4 h-4" weight="fill" />
            <PhPause v-else class="w-4 h-4" weight="fill" />
            <span class="text-sm">{{ countdownPaused ? 'Resume' : 'Pause' }}</span>
          </button>
        </div>
      </div>

      <!-- Modern Notes window - center-left -->
      <div
        class="absolute bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden sneaky-window-1"
        style="width: 260px; top: 8%; left: 280px; box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);"
      >
        <!-- Clean titlebar -->
        <div class="bg-white/10 px-3 py-2 flex items-center border-b border-white/10">
          <div class="flex gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          <div class="flex-1 text-center">
            <span class="text-[11px] font-medium text-white/40">Notes</span>
          </div>
          <div class="w-12"></div>
        </div>
        <!-- Notes content - larger text -->
        <div class="p-5" style="min-height: 380px;">
          <h3 class="text-base font-semibold text-white/90 mb-5">Why Activepieces wins</h3>
          <div class="space-y-5">
            <div class="flex items-start gap-3">
              <PhX class="w-4 h-4 text-red-400 mt-1 flex-shrink-0" weight="bold" />
              <div>
                <p class="font-medium text-white/80 text-[15px]">n8n</p>
                <p class="text-white/50 text-sm">Engineers only.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <PhX class="w-4 h-4 text-red-400 mt-1 flex-shrink-0" weight="bold" />
              <div>
                <p class="font-medium text-white/80 text-[15px]">Zapier</p>
                <p class="text-white/50 text-sm">Cloud-only. No onboarding.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 mt-6 pt-5 border-t border-white/10">
              <PhCheck class="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" weight="bold" />
              <div>
                <p class="font-medium text-violet-400 text-[15px]">Activepieces</p>
                <p class="text-white/50 text-sm">Self-host or cloud. Built for orgs. We train your teams.</p>
              </div>
            </div>
          </div>
          <div class="mt-6 pt-5 border-t border-white/10">
            <p class="text-base font-medium text-violet-400">
              The complete package.
            </p>
          </div>
        </div>
      </div>

      <!-- n8n.com window - next to notes, top -->
      <div
        class="absolute bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden sneaky-window-2"
        style="width: 280px; top: 3%; left: 570px; box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.4);"
      >
        <div class="bg-white/10 px-3 py-2 flex items-center gap-1.5 border-b border-white/10">
          <div class="flex gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          <div class="flex-1 flex justify-center">
            <div class="bg-black/20 rounded px-3 py-0.5 text-[10px] text-white/50 border border-white/10">
              n8n.io
            </div>
          </div>
        </div>
        <div class="p-5 bg-gradient-to-br from-[#1a1a2e] to-[#0d0d1a]" style="min-height: 170px;">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-7 h-7 rounded-lg bg-[#ff6d5a] flex items-center justify-center text-white font-bold text-[10px]">n8n</div>
            <span class="text-white font-semibold text-sm">n8n</span>
          </div>
          <p class="text-white/80 text-sm mb-4">
            For technical teams
          </p>
          <div class="space-y-2">
            <div class="h-2 bg-white/10 rounded w-full"></div>
            <div class="h-2 bg-white/10 rounded w-4/5"></div>
            <div class="h-2 bg-white/10 rounded w-3/5"></div>
          </div>
        </div>
      </div>

      <!-- zapier.com window - next to notes, bottom, slightly offset right -->
      <div
        class="absolute bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden sneaky-window-3"
        style="width: 280px; bottom: 10%; left: 600px; box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.4);"
      >
        <div class="bg-white/10 px-3 py-2 flex items-center gap-1.5 border-b border-white/10">
          <div class="flex gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          <div class="flex-1 flex justify-center">
            <div class="bg-black/20 rounded px-3 py-0.5 text-[10px] text-white/50 border border-white/10">
              zapier.com
            </div>
          </div>
        </div>
        <div class="p-5 bg-gradient-to-br from-[#ff4a00] to-[#ff8c00]" style="min-height: 170px;">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <PhLightning class="w-4 h-4 text-[#ff4a00]" weight="fill" />
            </div>
            <span class="text-white font-semibold text-sm">Zapier</span>
          </div>
          <p class="text-white/90 text-sm mb-4">
            10+ products. Figure it out.
          </p>
          <div class="space-y-2">
            <div class="h-2 bg-white/20 rounded w-full"></div>
            <div class="h-2 bg-white/20 rounded w-3/4"></div>
            <div class="h-2 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Screenshot-style frame -->
    <Transition name="browser-close">
      <div
        v-if="!browserClosed"
        class="w-full bg-black/20 backdrop-blur-sm rounded-2xl relative overflow-hidden border border-white/10"
      >
        <!-- macOS-style window bar -->
        <div class="bg-white/10 px-4 py-3 flex items-center gap-2 border-b border-white/10">
          <div class="flex gap-2 group/traffic">
            <div 
              class="w-3 h-3 rounded-full bg-red-400 flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors relative"
              @click="triggerCloseSuprise"
            >
              <svg 
                class="w-2 h-2 text-red-900/0 group-hover/traffic:text-red-900/80 transition-all" 
                viewBox="0 0 12 12" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="1.5"
              >
                <path d="M3 3l6 6M9 3l-6 6" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="w-3 h-3 rounded-full bg-yellow-400 flex items-center justify-center">
              <svg 
                class="w-2 h-2 text-yellow-900/0 group-hover/traffic:text-yellow-900/60 transition-all" 
                viewBox="0 0 12 12" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="1.5"
              >
                <path d="M2 6h8" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="w-3 h-3 rounded-full bg-green-400 flex items-center justify-center">
              <svg 
                class="w-1.5 h-1.5 text-green-900/0 group-hover/traffic:text-green-900/60 transition-all" 
                viewBox="0 0 12 12" 
                fill="currentColor"
              >
                <path d="M2 4l4 4 4-4" />
              </svg>
            </div>
          </div>
          <div class="flex-1 flex justify-center">
            <div
              class="relative bg-black/20 rounded-md text-xs border border-white/10 cursor-text"
              style="min-width: 220px; height: 24px;"
              @click="startEditingUrl"
            >
              <input
                ref="urlInput"
                v-model="urlValue"
                type="text"
                spellcheck="false"
                class="absolute inset-0 px-3 bg-transparent text-xs text-center text-white/60 rounded-md selection:bg-violet-500 selection:text-white"
                style="outline: none; border: none;"
                @blur="cancelEditingUrl"
                @keyup.enter="navigateUrl"
                @keyup.escape="cancelEditingUrl"
              />
            </div>
          </div>
          <div class="w-16"></div>
        </div>
        
        <!-- Web page content (everything below browser bar) -->
        <div class="relative">

        <!-- URL Navigation Joke Overlay -->
        <Transition name="modal">
          <div
            v-if="showUrlJoke"
            class="absolute inset-0 bg-black/90 backdrop-blur-lg z-[100] flex flex-col items-center justify-center rounded-b-2xl overflow-hidden"
          >
            <div class="text-center">
              <p class="text-white/40 text-lg font-medium tracking-wide mb-4">Wait wait wait</p>
              <h2 class="text-4xl font-semibold text-white/90 tracking-tight mb-3">This isn't Safari.</h2>
              <p class="text-xl text-white/40 font-light">But we can automate your actual browser. Just saying.</p>

              <div class="mt-12">
                <p class="text-white/30 text-base tabular-nums">{{ countdown }}</p>
              </div>
            </div>
          </div>
        </Transition>
        
        <!-- Thief Celebration Overlay -->
        <Transition name="thief">
          <div v-if="showThief" class="absolute inset-0 z-[100] pointer-events-none rounded-b-2xl overflow-hidden">
            <!-- Dark overlay -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <!-- Ninja icons flying around -->
            <div v-for="i in 12" :key="'ninja-'+i" class="absolute thief-float" :style="getThiefPosition(i)">
              <PhMaskHappy class="text-white/70" weight="fill" :style="{ width: getThiefPosition(i).fontSize, height: getThiefPosition(i).fontSize }" />
            </div>

            <!-- Loot icons -->
            <div v-for="i in 8" :key="'loot-'+i" class="absolute thief-loot" :style="getLootPosition(i)">
              <component
                :is="[PhDiamond, PhCurrencyDollar, PhTrophy, PhStar][i % 4]"
                :class="['text-cyan-400', 'text-emerald-400', 'text-amber-400', 'text-yellow-400'][i % 4]"
                weight="fill"
                :style="{ width: getLootPosition(i).fontSize, height: getLootPosition(i).fontSize }"
              />
            </div>

            <!-- Center message -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center thief-center-pop">
                <PhMaskHappy class="w-20 h-20 text-white mx-auto mb-4" weight="fill" />
                <p class="text-white/90 text-3xl font-bold drop-shadow-lg">Nobody saw anything...</p>
                <p class="text-white/60 text-lg mt-2">Your secret is safe with us</p>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Hours Saved Movie Credits -->
        <Transition name="modal">
          <div
            v-if="showHoursCredits"
            class="absolute inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-start z-[100] cursor-pointer rounded-b-2xl overflow-hidden"
            @click="showHoursCredits = false"
          >
            <!-- Hint to close -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs z-20">
              click anywhere to close
            </div>

            <!-- Header - fixed at top -->
            <div class="pt-6 pb-4 text-center relative z-10 bg-gradient-to-b from-black via-black/80 to-transparent w-full">
              <PhTimer class="w-12 h-12 text-emerald-400 mx-auto mb-2" weight="fill" />
              <h3 class="text-2xl font-bold text-white/90 mb-1">12,400 Hours Saved</h3>
              <p class="text-emerald-400 text-xs">What could your team do with all that time?</p>
            </div>
            
            <!-- Scrolling credits container -->
            <div class="flex-1 w-full overflow-hidden relative">
              <!-- Fade overlays -->
              <div class="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
              <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
              
              <!-- Rolling credits -->
              <div class="credits-roll text-center px-6 pt-8">
                <div 
                  v-for="(section, sIdx) in hoursCreditsList" 
                  :key="sIdx"
                  class="mb-14"
                >
                  <h4 class="text-emerald-400 text-xs font-bold tracking-[0.3em] mb-4">{{ section.category }}</h4>
                  <div class="space-y-2">
                    <p 
                      v-for="(item, iIdx) in section.items" 
                      :key="iIdx"
                      class="text-white/90 text-base"
                    >
                      {{ item }}
                    </p>
                  </div>
                </div>
                
                <!-- Final message -->
                <div class="py-20">
                  <p class="text-2xl text-white/90 font-light mb-4">The End</p>
                  <p class="text-emerald-400 text-sm">Time saved with AI automation</p>
                  <div class="mt-8 flex justify-center">
                    <PhSparkle class="w-10 h-10 text-violet-400" weight="fill" />
                  </div>
                </div>
                
                <!-- Extra padding for scroll -->
                <div class="h-60"></div>
              </div>
            </div>
          </div>
        </Transition>

    <!-- Dashboard Header -->
      <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <PhChartLineUp class="w-4 h-4 text-white" weight="fill" />
          </div>
          <div>
            <h3 class="font-semibold text-white/90">AI Adoption Analytics</h3>
            <p class="text-xs text-white/40">Real-time organization insights</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <!-- Fun action buttons -->
          <button
            @click="flexToBoss"
            class="group px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-semibold rounded-lg hover:scale-105 transition-all shadow-lg shadow-pink-500/20 flex items-center gap-1.5"
          >
            <PhHandCoins class="w-4 h-4" weight="fill" />
            <span>Get That Raise</span>
          </button>
          <button
            @click="celebrateWins"
            class="px-3 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-medium rounded-lg hover:bg-white/20 hover:border-white/30 transition-all flex items-center gap-1.5"
          >
            <PhConfetti class="w-4 h-4" weight="fill" />
            <span>Celebrate</span>
          </button>
          <div class="flex items-center gap-2 pl-3 border-l border-white/20">
            <span class="text-xs text-white/40">Live</span>
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>
      </div>

    <!-- Main Content -->
      <div class="p-6 relative">
<!-- Stat click message -->
        <Transition name="toast">
          <div v-if="statMessage" class="absolute top-24 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg border border-white/20 text-white/90 px-4 py-2 rounded-full shadow-xl text-sm font-medium z-40">
            {{ statMessage }}
          </div>
        </Transition>

        <!-- Stats Row -->
        <div class="grid grid-cols-4 gap-4 mb-6">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="relative group bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden"
          :class="{ 'ring-2 ring-offset-2 ring-offset-transparent': clickedStat === index }"
          :style="clickedStat === index ? { ringColor: stat.color } : {}"
          @mouseenter="activeStat = index"
          @mouseleave="activeStat = null"
          @click="handleStatClick(index)"
        >
          <!-- Animated background on hover -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :style="{ background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)` }"
          ></div>

          <div class="relative">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-white/60">{{ stat.label }}</span>
              <component :is="stat.iconComponent" class="w-5 h-5" :class="stat.iconClass" weight="fill" />
            </div>
            <div class="text-2xl font-bold text-white/90 tabular-nums">
              <span class="stat-number" :style="{ color: activeStat === index ? stat.color : '' }">
                {{ stat.prefix }}{{ animatedStats[index] }}{{ stat.suffix }}
              </span>
            </div>
            <div class="flex items-center gap-1 mt-1">
              <span class="text-xs font-medium" :class="stat.trend > 0 ? 'text-emerald-400' : 'text-red-400'">
                {{ stat.trend > 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}%
              </span>
              <span class="text-xs text-white/40">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <!-- Main Chart -->
        <div class="col-span-2 bg-white/5 rounded-2xl p-5 border border-white/10">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-semibold text-white/90">Adoption Growth</h4>
            <div class="flex gap-1">
              <button
                v-for="period in ['W', 'M', 'Q', 'Y']"
                :key="period"
                class="px-2 py-1 text-xs rounded-md transition-colors"
                :class="selectedPeriod === period ? 'bg-violet-500/30 text-violet-300' : 'text-white/40 hover:text-white/60'"
                @click="selectedPeriod = period"
              >
                {{ period }}
              </button>
            </div>
          </div>
          <!-- Chart SVG -->
          <svg class="w-full h-40" viewBox="0 0 500 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <!-- Grid lines -->
            <g class="text-white/10">
              <line x1="0" y1="37.5" x2="500" y2="37.5" stroke="currentColor" stroke-dasharray="4"/>
              <line x1="0" y1="75" x2="500" y2="75" stroke="currentColor" stroke-dasharray="4"/>
              <line x1="0" y1="112.5" x2="500" y2="112.5" stroke="currentColor" stroke-dasharray="4"/>
            </g>
            <!-- Area fill -->
            <path
              :d="areaPath"
              fill="url(#chartGradient)"
              class="transition-all duration-1000"
            />
            <!-- Line -->
            <path
              :d="linePath"
              fill="none"
              stroke="#8b5cf6"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-all duration-1000"
            />
            <!-- Animated dot -->
            <circle
              :cx="dotPosition.x"
              :cy="dotPosition.y"
              r="5"
              fill="#8b5cf6"
              class="chart-dot"
            />
            <circle
              :cx="dotPosition.x"
              :cy="dotPosition.y"
              r="8"
              fill="#8b5cf6"
              opacity="0.3"
              class="chart-dot-ring"
            />
          </svg>
          <!-- X-axis labels -->
          <div class="flex justify-between mt-2 text-xs text-white/40">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        <!-- Department Breakdown -->
        <div
          ref="deptContainer"
          class="bg-white/5 rounded-2xl p-5 border border-white/10 relative overflow-hidden"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-semibold text-white/90">By Department</h4>
          </div>

          <div class="space-y-3">
            <div
              v-for="(dept, index) in sortedDepartments"
              :key="dept.name"
              class="group select-none transition-opacity duration-150 relative"
              :class="[
                draggingDept === dept.name ? 'opacity-0' : '',
                index === 0 ? '' : 'cursor-grab active:cursor-grabbing'
              ]"
              @mousedown="index !== 0 && startDrag($event, dept)"
              @mouseenter="hoveredDept = dept.name"
              @mouseleave="hoveredDept = null"
            >
                <!-- Drop zone overlay on first item -->
                <div
                  v-if="index === 0 && isDragging"
                  class="absolute inset-0 border-2 border-dashed rounded-lg transition-all duration-150 flex items-center justify-center z-10"
                  :class="isOverDropZone ? 'border-violet-400 bg-violet-500/30' : 'border-violet-500/50 bg-violet-500/10'"
                >
                  <span class="text-xs font-medium transition-all" :class="isOverDropZone ? 'text-violet-300 scale-110' : 'text-violet-400'">
                    {{ isOverDropZone ? 'Release to promote!' : 'Drop here to become #1' }}
                  </span>
                </div>

                <div class="flex items-center justify-between mb-1">
                  <!-- Drag indicator outside to the left -->
                  <span
                    v-if="index !== 0"
                    class="absolute -left-4 top-1/2 -translate-y-1/2 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity"
                  >⠿</span>
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm text-white/60 group-hover:text-white/90 transition-colors">{{ dept.name }}</span>
                    <PhTrophy v-if="dept.promoted" class="w-4 h-4 text-amber-400" weight="fill" />
                  </div>
                  <span class="text-sm font-semibold transition-all duration-500" :class="dept.promoted ? 'text-violet-400' : 'text-white/90'">
                    {{ dept.promoted ? '1,000,000' : dept.users.toLocaleString() }}
                  </span>
                </div>
                <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    :class="hoveredDept === dept.name ? 'scale-y-150' : ''"
                    :style="{
                      width: dept.promoted ? '100%' : dept.percent + '%',
                      background: `linear-gradient(90deg, ${dept.color}, ${dept.colorEnd})`
                    }"
                  ></div>
                </div>
              </div>
            </div>
          
          <!-- Floating drag preview - clean pill design -->
          <div 
            v-if="isDragging && draggedDeptData"
            class="fixed pointer-events-none z-[9999]"
            :style="{ 
              left: dragPosition.x + 'px', 
              top: dragPosition.y + 'px',
              transform: 'translate(-50%, -50%)'
            }"
          >
            <div 
              class="px-5 py-2.5 rounded-full shadow-2xl border-2 flex items-center gap-2 backdrop-blur-sm"
              :style="{ 
                background: `linear-gradient(135deg, ${draggedDeptData.color}ee, ${draggedDeptData.colorEnd}dd)`,
                borderColor: 'white',
                boxShadow: `0 8px 32px ${draggedDeptData.color}40, 0 4px 12px rgba(0,0,0,0.15)`
              }"
            >
              <span class="text-sm font-bold text-white drop-shadow">{{ draggedDeptData.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="grid grid-cols-3 gap-4">
        <!-- Activity Feed -->
        <div class="col-span-2 bg-white/5 rounded-2xl p-5 border border-white/10">
          <h4 class="font-semibold text-white/90 mb-4">Recent Activity</h4>
          <div class="space-y-3">
            <div
              v-for="(activity, index) in activities"
              :key="index"
              class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors group"
              :class="{ 'activity-enter': activityAnimating === index }"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 text-white/80 font-medium"
                :style="{ background: activity.bgColor }"
              >
                {{ activity.avatar }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-white/80 truncate">
                  <span class="font-medium">{{ activity.user }}</span>
                  <span class="text-white/50"> {{ activity.action }}</span>
                </p>
                <p class="text-xs text-white/40">{{ activity.time }}</p>
              </div>
              <component :is="activity.iconComponent" class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" :class="activity.iconClass" weight="fill" />
            </div>
          </div>
        </div>

        <!-- Top Builders -->
        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-amber-500/20">
          <div class="flex items-center gap-2 mb-4">
            <PhTrophy class="w-5 h-5 text-amber-400" weight="fill" />
            <h4 class="font-semibold text-white/90">Top Builders</h4>
          </div>
          <div class="space-y-3">
            <div
              v-for="(builder, index) in topBuilders"
              :key="builder.name"
              class="flex items-center gap-3"
            >
              <div class="w-6 h-6 flex items-center justify-center">
                <PhMedal
                  class="w-5 h-5"
                  :class="index === 0 ? 'text-amber-400' : index === 1 ? 'text-gray-300' : 'text-amber-600'"
                  weight="fill"
                />
              </div>
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                :style="{ backgroundColor: builder.color }"
              >
                {{ builder.initials }}
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-white/90">{{ builder.name }}</p>
                <p class="text-xs text-white/50">{{ builder.flows }} flows</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        <!-- Celebration Confetti Overlay -->
        <div v-if="showConfetti" class="absolute inset-0 pointer-events-none overflow-hidden z-50">
          <div 
            v-for="i in 50" 
            :key="'confetti-'+i"
            class="absolute confetti-piece"
            :style="{
              left: Math.random() * 100 + '%',
              backgroundColor: confettiColors[i % confettiColors.length],
              animationDelay: Math.random() * 0.5 + 's',
              animationDuration: (2 + Math.random()) + 's'
            }"
          ></div>
        </div>

        <!-- Boss Report Modal -->
        <Transition name="modal">
          <div v-if="showBossReport" class="absolute inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
            <div class="bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl max-w-xl w-full boss-report-enter overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <PhEnvelope class="w-8 h-8 text-white" weight="fill" />
                  <div>
                    <h4 class="font-bold text-white text-lg">Operation: Get That Bag</h4>
                    <p class="text-rose-200 text-xs">Time to secure the promotion</p>
                  </div>
                </div>
                <button @click="showBossReport = false" class="text-white/70 hover:text-white">
                  <PhX class="w-5 h-5" weight="bold" />
                </button>
              </div>

              <!-- Email Preview -->
              <div class="p-6">
                <div class="bg-white/5 rounded-2xl p-5 mb-5 border border-white/10">
                  <div class="flex items-center gap-2 text-xs text-white/40 mb-1">
                    <span>To:</span>
                    <span class="bg-white/10 px-2 py-0.5 rounded text-white/60">best-boss-ever@company.com</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs text-white/40 mb-4">
                    <span>Subject:</span>
                    <span class="text-white/80 font-medium">Re: About that raise we discussed...</span>
                  </div>

                  <div class="text-sm text-white/80 space-y-3 leading-relaxed">
                    <p>Dear <span class="text-pink-400 font-medium">World's Greatest Boss</span>,</p>

                    <p>First of all, I just want to say that everyone on the team agrees you're literally the best boss in the entire universe. Like, we had a meeting about it. Unanimous vote.</p>

                    <p>ANYWAY, completely unrelated, but check out these numbers:</p>

                    <div class="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                      <div class="flex justify-between items-center">
                        <span class="text-white/50">People using AI</span>
                        <span class="font-bold text-violet-400">847 humans</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-white/50">Hours saved</span>
                        <span class="font-bold text-emerald-400">12,400h (that's like 516 days btw)</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-white/50">Adoption rate</span>
                        <span class="font-bold text-amber-400">94% (basically everyone)</span>
                      </div>
                    </div>

                    <p>Did I mention your new haircut looks great? Because it really does.</p>

                    <p class="text-white/50 italic">Anyway, no pressure on the raise thing. Just thought you should know we're absolutely crushing it over here. No big deal.</p>

                    <p class="pt-2">
                      Your favorite employee,<br/>
                      <span class="font-medium">The One Who Deserves a Raise</span>
                    </p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <button
                    @click="sendToBoss"
                    class="flex-1 px-5 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-pink-500/20 text-sm flex items-center justify-center gap-2"
                  >
                    <PhCheck class="w-4 h-4" weight="bold" />
                    Send & Pray
                  </button>
                  <button
                    @click="showBossReport = false"
                    class="px-5 py-3 bg-white/10 border border-white/20 text-white/70 font-medium rounded-xl hover:bg-white/20 transition-all text-sm"
                  >
                    I'm Scared
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Sent Confirmation -->
        <Transition name="toast">
          <div v-if="showSentToast" class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 z-50">
            <PhCheck class="w-5 h-5 text-emerald-400" weight="bold" />
            <span class="font-medium text-white/90">Sent! Now we wait... and maybe update LinkedIn just in case</span>
          </div>
        </Transition>
      </div>
      </div>
    </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, markRaw } from 'vue'
import {
  PhUsers,
  PhLightning,
  PhTimer,
  PhTrendUp,
  PhTrophy,
  PhConfetti,
  PhHandCoins,
  PhMedal,
  PhRocket,
  PhSparkle,
  PhHandWaving,
  PhUpload,
  PhEnvelope,
  PhX,
  PhPlay,
  PhPause,
  PhMaskHappy,
  PhDiamond,
  PhCurrencyDollar,
  PhStar,
  PhCheck,
  PhChartLineUp
} from "@phosphor-icons/vue"

const activeStat = ref(null)
const selectedPeriod = ref('M')
const hoveredDept = ref(null)
const activityAnimating = ref(null)
const showConfetti = ref(false)
const showBossReport = ref(false)
const showSentToast = ref(false)
const clickedStat = ref(null)
const statMessage = ref('')
const showHoursCredits = ref(false)
const showThief = ref(false)
const promotedDept = ref(null)
const isDragging = ref(false)
const urlValue = ref('ai.your-company.com/analytics')
const urlInput = ref(null)
const showUrlJoke = ref(false)
const countdown = ref(5)
const draggingDept = ref(null)
const draggedDeptData = ref(null)
const dragPosition = ref({ x: 0, y: 0 })
const dragStartY = ref(0)
const deptContainer = ref(null)
const isOverDropZone = ref(false)
const browserClosed = ref(false)
const sneakyCountdown = ref(10)
const countdownPaused = ref(false)
let sneakyCountdownInterval = null

const confettiColors = ['#8b5cf6', '#f59e0b', '#10b981', '#ec4899', '#3b82f6', '#f472b6', '#fbbf24', '#34d399']

const hoursCreditsList = [
  { category: "PRODUCT VISION", items: [
    "Dreaming up features customers don't know they need",
    "Rethinking the entire user experience", 
    "Prototyping wild ideas that might just work",
    "Deep user interviews that reveal real pain points",
    "Questioning assumptions everyone takes for granted",
    "Designing for delight, not just function"
  ]},
  { category: "STRATEGIC THINKING", items: [
    "Thinking about Q3 before Q3",
    "Identifying the next big market opportunity",
    "Crafting narratives that change how people see you",
    "Building moats competitors can't copy",
    "Deciding what NOT to build",
    "Connecting dots no one else sees"
  ]},
  { category: "RELATIONSHIP BUILDING", items: [
    "Turning customers into genuine advocates",
    "Having conversations that build real trust",
    "Understanding the person behind the title",
    "Creating partnerships that feel inevitable",
    "Networking that doesn't feel gross",
    "Being memorable in a sea of sameness"
  ]},
  { category: "TEAM & CULTURE", items: [
    "1:1s that change someone's trajectory",
    "Mentoring that unlocks hidden potential",
    "Cross-functional collabs that spark new ideas",
    "Building psychological safety",
    "Having hard conversations with empathy",
    "Creating rituals people actually look forward to"
  ]},
  { category: "CREATIVE WORK", items: [
    "Campaigns that make people feel something",
    "Content that earns attention, not interrupts",
    "Design that tells a story",
    "Writing that sounds unmistakably human",
    "Ideas that make competitors wish they thought of it",
    "Work that becomes the new reference point"
  ]},
  { category: "CRAFT & EXCELLENCE", items: [
    "Architecture decisions you won't regret in 2 years",
    "Code that's a joy for the next person to read",
    "Solving the root cause, not the symptom",
    "Building systems that scale elegantly",
    "Making complex things feel simple",
    "Polish that shows you give a damn"
  ]},
  { category: "GROWTH & LEARNING", items: [
    "Exploring ideas outside your bubble",
    "Learning from failures without ego",
    "Teaching others what you've figured out",
    "Experimenting without fear of being wrong",
    "Developing taste through deliberate practice",
    "Staying curious when you could coast"
  ]},
  { category: "THE HUMAN STUFF", items: [
    "Strategic thinking instead of firefighting",
    "Creating instead of reacting",
    "Imagining instead of just executing",
    "Leading instead of just managing",
    "Inspiring instead of just informing",
    "Building legacy instead of checking boxes"
  ]},
  { category: "12,400 HOURS RECLAIMED", items: [
    "That's 516 full work days",
    "2.5 people working full-time for a year",
    "Redirected to work only humans can do",
    "This is what AI adoption looks like 💜"
  ]},
]

const statMessages = [
  "That's a lot of happy employees! 🎉",
  "Automations go brrr! ⚡",
  "Think of all that coffee time! ☕",
  "We're basically the cool department now 😎"
]

const handleStatClick = (index) => {
  if (index === 2) {
    // Hours Saved - show movie credits
    showHoursCredits.value = true
    return
  }
  clickedStat.value = index
  statMessage.value = statMessages[index]
  setTimeout(() => {
    clickedStat.value = null
    statMessage.value = ''
  }, 2000)
}

const flexToBoss = () => {
  showBossReport.value = true
}

const sendToBoss = () => {
  showBossReport.value = false
  showSentToast.value = true
  celebrateWins()
  setTimeout(() => {
    showSentToast.value = false
  }, 3000)
}

const celebrateWins = () => {
  showConfetti.value = true
  setTimeout(() => {
    showConfetti.value = false
  }, 3000)
}

const startEditingUrl = () => {
  urlInput.value?.focus()
  urlInput.value?.select()
}

const cancelEditingUrl = () => {
  urlInput.value?.blur()
}

const defaultUrl = 'ai.your-company.com/analytics'
let countdownInterval = null

const navigateUrl = () => {
  urlInput.value?.blur()
  if (urlValue.value !== defaultUrl) {
    showUrlJoke.value = true
    countdown.value = 8
    
    countdownInterval = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(countdownInterval)
        showUrlJoke.value = false
        urlValue.value = defaultUrl
      }
    }, 1000)
  }
}

const triggerCloseSuprise = () => {
  // Close the browser - reveals competitor research windows
  browserClosed.value = true
  sneakyCountdown.value = 10
  countdownPaused.value = false
  
  // Start countdown
  if (sneakyCountdownInterval) clearInterval(sneakyCountdownInterval)
  sneakyCountdownInterval = setInterval(() => {
    if (!countdownPaused.value) {
      sneakyCountdown.value--
      if (sneakyCountdown.value <= 0) {
        closeSneakyWindows()
      }
    }
  }, 1000)
}

const toggleCountdownPause = () => {
  countdownPaused.value = !countdownPaused.value
}

const closeSneakyWindows = () => {
  if (sneakyCountdownInterval) {
    clearInterval(sneakyCountdownInterval)
    sneakyCountdownInterval = null
  }
  browserClosed.value = false
}

const getThiefPosition = (i) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', right: '10%' },
    { top: '40%', left: '8%' },
    { top: '60%', right: '5%' },
    { top: '80%', left: '15%' },
    { top: '15%', left: '40%' },
    { top: '70%', right: '20%' },
    { top: '30%', right: '30%' },
    { top: '50%', left: '20%' },
    { top: '85%', right: '40%' },
    { top: '25%', left: '60%' },
    { top: '65%', left: '70%' },
  ]
  return {
    ...positions[i % positions.length],
    fontSize: (20 + Math.random() * 20) + 'px',
    animationDelay: (i * 0.1) + 's'
  }
}

const getLootPosition = (i) => {
  const positions = [
    { top: '15%', left: '25%' },
    { top: '35%', right: '15%' },
    { top: '55%', left: '30%' },
    { top: '75%', right: '25%' },
    { top: '25%', right: '45%' },
    { top: '45%', left: '15%' },
    { top: '65%', right: '35%' },
    { top: '85%', left: '45%' },
  ]
  return {
    ...positions[i % positions.length],
    fontSize: (16 + Math.random() * 16) + 'px',
    animationDelay: (0.3 + i * 0.15) + 's'
  }
}

const stats = [
  { label: 'Active Users', value: 847, iconComponent: markRaw(PhUsers), iconClass: 'text-violet-400', color: '#8b5cf6', trend: 23, prefix: '', suffix: '' },
  { label: 'Automations', value: 2341, iconComponent: markRaw(PhLightning), iconClass: 'text-amber-400', color: '#f59e0b', trend: 18, prefix: '', suffix: '' },
  { label: 'Hours Saved', value: 12400, iconComponent: markRaw(PhTimer), iconClass: 'text-emerald-400', color: '#10b981', trend: 34, prefix: '', suffix: 'h' },
  { label: 'Adoption Rate', value: 94, iconComponent: markRaw(PhTrendUp), iconClass: 'text-pink-400', color: '#ec4899', trend: 12, prefix: '', suffix: '%' },
]

const animatedStats = ref(stats.map(() => 0))

const departments = ref([
  { name: 'Marketing', users: 234, percent: 88, color: '#f59e0b', colorEnd: '#fbbf24', promoted: false },
  { name: 'Engineering', users: 189, percent: 72, color: '#8b5cf6', colorEnd: '#a78bfa', promoted: false },
  { name: 'Sales', users: 156, percent: 58, color: '#10b981', colorEnd: '#34d399', promoted: false },
  { name: 'Operations', users: 142, percent: 45, color: '#ec4899', colorEnd: '#f472b6', promoted: false },
  { name: 'HR', users: 87, percent: 32, color: '#3b82f6', colorEnd: '#60a5fa', promoted: false },
])

const sortedDepartments = computed(() => {
  return [...departments.value].sort((a, b) => {
    if (a.promoted && !b.promoted) return -1
    if (!a.promoted && b.promoted) return 1
    return b.percent - a.percent // Sort by percent descending
  })
})

const startDrag = (event, dept) => {
  event.preventDefault()
  draggingDept.value = dept.name
  draggedDeptData.value = dept
  isDragging.value = true
  dragPosition.value = { x: event.clientX, y: event.clientY }
  dragStartY.value = event.clientY
  
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (event) => {
  if (!isDragging.value) return
  dragPosition.value = { x: event.clientX, y: event.clientY }
  
  // Check if over drop zone (first item area)
  if (deptContainer.value) {
    const rect = deptContainer.value.getBoundingClientRect()
    const dropY = event.clientY - rect.top
    // Drop zone is roughly where the first item is (after header ~60px, first item height ~45px)
    isOverDropZone.value = dropY > 50 && dropY < 110 && event.clientX >= rect.left && event.clientX <= rect.right
  }
}

const onMouseUp = (event) => {
  if (!isDragging.value) return
  
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  
  // Check if dropped on the first item (drop zone)
  if (deptContainer.value && isOverDropZone.value) {
    promoteDepartment(draggingDept.value)
  }
  
  // Reset drag state
  isDragging.value = false
  draggingDept.value = null
  draggedDeptData.value = null
  isOverDropZone.value = false
}

const promoteDepartment = (name) => {
  const dept = departments.value.find(d => d.name === name)
  if (!dept) return
  
  // Already at top?
  if (sortedDepartments.value[0]?.name === name) return
  
  // Reset all promotions and promote instantly
  departments.value.forEach(d => d.promoted = false)
  dept.promoted = true
  
  // Show thief celebration
  showThief.value = true
  setTimeout(() => {
    showThief.value = false
  }, 2000)
}

const activities = ref([
  { user: 'Sarah Chen', action: 'created "Lead Scoring Agent"', time: '2 min ago', avatar: 'SC', bgColor: 'rgba(139, 92, 246, 0.2)', iconComponent: markRaw(PhRocket), iconClass: 'text-violet-400' },
  { user: 'Mike Johnson', action: 'earned "Power User" badge', time: '15 min ago', avatar: 'MJ', bgColor: 'rgba(245, 158, 11, 0.2)', iconComponent: markRaw(PhTrophy), iconClass: 'text-amber-400' },
  { user: 'Emma Wilson', action: 'automated 50th workflow', time: '1 hour ago', avatar: 'EW', bgColor: 'rgba(16, 185, 129, 0.2)', iconComponent: markRaw(PhLightning), iconClass: 'text-emerald-400' },
  { user: 'Alex Kumar', action: 'joined from Engineering', time: '2 hours ago', avatar: 'AK', bgColor: 'rgba(236, 72, 153, 0.2)', iconComponent: markRaw(PhHandWaving), iconClass: 'text-pink-400' },
])

const topBuilders = [
  { name: 'Sarah Chen', initials: 'SC', flows: 47, color: '#8b5cf6' },
  { name: 'Mike Johnson', initials: 'MJ', flows: 38, color: '#f59e0b' },
  { name: 'Emma Wilson', initials: 'EW', flows: 31, color: '#10b981' },
]

// Chart path data
const chartPoints = [
  { x: 0, y: 130 },
  { x: 83, y: 110 },
  { x: 166, y: 90 },
  { x: 250, y: 70 },
  { x: 333, y: 45 },
  { x: 416, y: 35 },
  { x: 500, y: 20 },
]

const linePath = computed(() => {
  return chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

const areaPath = computed(() => {
  const line = chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  return `${line} L 500 150 L 0 150 Z`
})

const dotPosition = ref({ x: 500, y: 20 })

// Animate stats on mount
let animationFrame = null
let activityInterval = null

onMounted(() => {
  // Animate numbers
  const duration = 2000
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    
    animatedStats.value = stats.map(stat => 
      Math.round(stat.value * easeOut).toLocaleString()
    )
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }
  
  animate()
  
  // Simulate new activity every few seconds
  activityInterval = setInterval(() => {
    const newActivities = [
      { user: 'Tom Harris', action: 'built "Slack Notifier"', time: 'Just now', avatar: 'TH', bgColor: 'rgba(99, 102, 241, 0.2)', iconComponent: markRaw(PhSparkle), iconClass: 'text-indigo-400' },
      { user: 'Lisa Park', action: 'reached 100 hours saved', time: 'Just now', avatar: 'LP', bgColor: 'rgba(250, 204, 21, 0.2)', iconComponent: markRaw(PhConfetti), iconClass: 'text-yellow-400' },
      { user: 'David Kim', action: 'shared a template', time: 'Just now', avatar: 'DK', bgColor: 'rgba(20, 184, 166, 0.2)', iconComponent: markRaw(PhUpload), iconClass: 'text-teal-400' },
    ]
    
    const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
    activities.value.unshift(randomActivity)
    activities.value.pop()
    activityAnimating.value = 0
    
    setTimeout(() => {
      activityAnimating.value = null
    }, 500)
  }, 5000)
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  if (activityInterval) clearInterval(activityInterval)
  if (countdownInterval) clearInterval(countdownInterval)
  if (sneakyCountdownInterval) clearInterval(sneakyCountdownInterval)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
})
</script>

<style scoped>
.stat-number {
  transition: color 0.3s ease;
}

.chart-dot {
  animation: dot-pulse 2s ease-in-out infinite;
}

.chart-dot-ring {
  animation: dot-ring-pulse 2s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes dot-ring-pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 0.1; }
}

.activity-enter {
  animation: slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-in {
  0% { 
    opacity: 0;
    transform: translateX(-20px);
  }
  100% { 
    opacity: 1;
    transform: translateX(0);
  }
}

/* Confetti */
.confetti-piece {
  position: absolute;
  top: -10px;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  animation: confetti-fall 3s ease-out forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(600px) rotate(720deg);
    opacity: 0;
  }
}

/* Modal transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-from .boss-report-enter, .modal-leave-to .boss-report-enter {
  transform: scale(0.9) translateY(20px);
}

.boss-report-enter {
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop-in {
  0% { transform: scale(0.9) translateY(20px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

/* Toast */
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

/* Movie Credits Roll */
.credits-roll {
  animation: credits-scroll 50s linear forwards;
}

@keyframes credits-scroll {
  0% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(-90%);
  }
}

/* Thief effect */
.thief-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.thief-leave-active {
  transition: all 0.6s ease-out;
}
.thief-enter-from {
  opacity: 0;
}
.thief-leave-to {
  opacity: 0;
}

.thief-float {
  animation: thief-float 2s ease-in-out infinite;
}

@keyframes thief-float {
  0%, 100% { 
    transform: translateY(0) rotate(-5deg);
    opacity: 0.7;
  }
  50% { 
    transform: translateY(-15px) rotate(5deg);
    opacity: 1;
  }
}

.thief-loot {
  animation: loot-sparkle 1.5s ease-in-out infinite;
}

@keyframes loot-sparkle {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    opacity: 0.6;
  }
  50% { 
    transform: scale(1.3) rotate(15deg);
    opacity: 1;
  }
}

.thief-center-pop {
  animation: center-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes center-pop {
  0% { 
    transform: scale(0.5);
    opacity: 0;
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
}

/* Department list animation */
.dept-list-move {
  transition: transform 0.5s ease;
}
.dept-list-enter-active, .dept-list-leave-active {
  transition: all 0.3s ease;
}
.dept-list-enter-from, .dept-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Drop zone */
.drop-zone {
  transition: all 0.2s ease;
}

/* Browser close/open transitions - smooth genie effect */
.browser-close-enter-active {
  animation: browser-open 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 20;
}
.browser-close-leave-active {
  animation: browser-close 0.4s cubic-bezier(0.5, 0, 0.75, 0) forwards;
  z-index: 20;
  position: relative;
}
@keyframes browser-close {
  0% { 
    transform: scale(1) translateY(0) rotate(0deg);
    opacity: 1;
  }
  30% {
    transform: scale(0.98) translateY(10px) rotate(0.5deg);
    opacity: 1;
  }
  100% { 
    transform: scale(0.2) translateY(-200px) rotate(-2deg);
    opacity: 0;
  }
}
@keyframes browser-open {
  0% { 
    transform: scale(0.2) translateY(-200px) rotate(-2deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.02) translateY(5px) rotate(0deg);
    opacity: 1;
  }
  100% { 
    transform: scale(1) translateY(0) rotate(0deg);
    opacity: 1;
  }
}

/* Sneaky windows - no animation, they were already there */
.sneaky-window-1,
.sneaky-window-2,
.sneaky-window-3 {
  /* Static - already open behind the main window */
}


</style>

