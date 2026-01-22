<template>
  <section class="relative py-24 bg-[#f8f8f6]">
    <!-- Subtle pattern -->
    <div class="absolute inset-0 opacity-40" style="background-image: radial-gradient(#d4d4d4 1px, transparent 1px); background-size: 24px 24px;"></div>

    <div class="relative max-w-7xl mx-auto px-4">
      <!-- Header row -->
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
        <div class="max-w-2xl">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            AI agents that work like your best employee
          </h2>
          <p class="text-xl text-gray-500">
            Natural language instructions, enterprise integrations, precise control.
          </p>
        </div>
        <NuxtLink 
          to="/product/ai-agent-builder"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
        >
          Explore AI Agents
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Tabs row -->
      <div class="flex items-center gap-6 mb-8">
        <button
          v-for="(tab, i) in tabs"
          :key="tab.id"
          @click="goToTab(i)"
          class="relative px-4 py-2 text-[15px] font-medium transition-all duration-300 rounded-full"
          :class="activeIndex === i 
            ? 'bg-gray-900 text-white' 
            : 'text-gray-500 hover:text-gray-900'"
        >
          {{ tab.label }}
        </button>
        
        <!-- Progress dots -->
        <div class="flex items-center gap-1.5 ml-auto">
          <div v-for="(_, i) in tabs" :key="i" class="relative w-2 h-2 rounded-full transition-all duration-300" :class="activeIndex === i ? 'bg-gray-900' : 'bg-gray-300'">
            <svg v-if="activeIndex === i && isAutoPlaying" class="absolute -inset-1 w-4 h-4" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" fill="none" stroke="#e5e5e5" stroke-width="2"/>
              <circle cx="8" cy="8" r="6" fill="none" stroke="#111" stroke-width="2" stroke-dasharray="37.7" :stroke-dashoffset="37.7 - (37.7 * progress / 100)" stroke-linecap="round" transform="rotate(-90 8 8)" class="transition-all duration-100"/>
            </svg>
          </div>
          <button @click="toggleAuto" class="ml-3 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
            <svg v-if="isAutoPlaying" class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
            <svg v-else class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>
      </div>

      <!-- Canvas -->
      <div ref="canvasRef" class="relative bg-gradient-to-br from-[#ebe9e4] to-[#dedad3] rounded-[28px] overflow-hidden" style="height: 520px;">
        
        <!-- ============================== -->
        <!-- THE AGENT - positioned via measured slots -->
        <!-- ============================== -->
        <div 
          class="agent-element absolute z-30"
          :style="agentStyles"
        >
          <!-- Animated gradient border wrapper -->
          <div 
            class="ai-gradient-border rounded-xl h-full p-[2px] relative"
            :class="{ 'is-morphing': isMorphing }"
          >
            <!-- Full agent card (scenes 0, 1, 2, 4) - crossfade instead of v-if -->
            <div 
              class="bg-white rounded-[10px] overflow-hidden h-full transition-all duration-300"
              :class="activeIndex === 3 ? 'opacity-0 invisible' : 'opacity-100 visible'"
              :style="{ transitionDelay: activeIndex === 3 ? '0ms' : '200ms' }"
            >
              <!-- Header -->
              <div class="px-3 py-2.5 flex items-center gap-2.5">
                <div 
                  class="flex-shrink-0 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-100 to-fuchsia-100 transition-all duration-500"
                  :class="isLarge ? 'w-10 h-10' : 'w-8 h-8'"
                >
                  <span :class="isLarge ? 'text-xl' : 'text-base'" class="transition-all duration-300">🤖</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-gray-900 truncate leading-tight text-sm">
                    {{ isLarge ? 'Lead Qualifier' : (activeIndex === 2 ? '2. Qualify Lead' : 'Qualify Lead') }}
                  </div>
                  <div class="text-gray-500 truncate leading-tight text-xs">AI Agent</div>
                </div>
              </div>
              
              <!-- Body (expanded view only - scene 0) -->
              <div 
                class="transition-all duration-500 ease-out overflow-hidden border-t border-gray-100"
                :style="{ maxHeight: activeIndex === 0 ? '400px' : '0px', opacity: activeIndex === 0 ? 1 : 0 }"
              >
                <div class="p-4 space-y-3">
                  <div>
                    <label class="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block">Instructions</label>
                    <div class="p-3 rounded-lg bg-violet-50 border border-violet-200 min-h-[60px]">
                      <p class="text-sm text-gray-700 leading-relaxed">{{ typedPrompt }}<span v-if="isTyping" class="inline-block w-0.5 h-4 bg-violet-500 ml-0.5 animate-pulse"></span></p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <p class="text-[9px] font-bold text-gray-400 uppercase mb-2">Trigger</p>
                      <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <img src="https://cdn.activepieces.com/pieces/hubspot.png" class="w-4 h-4" />
                        </div>
                        <span class="text-sm font-medium text-gray-700">New Lead</span>
                      </div>
                    </div>
                    <div class="p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <p class="text-[9px] font-bold text-gray-400 uppercase mb-2">Tools</p>
                      <div class="flex items-center gap-1">
                        <div v-for="t in baseTools" :key="t" class="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <img :src="t" class="w-4 h-4" />
                        </div>
                        <div class="w-7 h-7 rounded-md bg-violet-100 border border-violet-200 flex items-center justify-center flex-shrink-0">
                          <span class="text-[10px] font-bold text-violet-600">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slack avatar form (scene 3 only) - crossfade overlay -->
            <div 
              class="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center text-lg transition-all duration-300"
              :class="activeIndex === 3 ? 'opacity-100 visible' : 'opacity-0 invisible'"
              :style="{ transitionDelay: activeIndex === 3 ? '200ms' : '0ms' }"
            >
              🤖
            </div>
          </div>
        </div>

        <!-- ============================== -->
        <!-- SCENE 0: Natural Language (Expanded Agent) -->
        <!-- ============================== -->
        <div v-show="activeIndex === 0" class="absolute inset-0 flex items-center justify-center p-8">
          <!-- Slot for agent -->
          <div ref="slot0" class="w-[340px] h-[320px]"></div>
        </div>

        <!-- ============================== -->
        <!-- SCENE 1: Integrations Popup -->
        <!-- ============================== -->
        <Transition name="slide-in">
          <div v-if="activeIndex === 1" class="absolute inset-0 flex items-center justify-center p-8">
            <div class="flex items-center gap-4">
              <!-- Slot for agent -->
              <div ref="slot1" class="w-[200px] h-[60px] flex-shrink-0"></div>
              
              <!-- Connection line -->
              <div class="flex items-center flex-shrink-0">
                <div class="w-8 h-0.5 bg-gray-300"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-violet-500 -ml-1"></div>
              </div>
              
              <!-- Popup -->
              <div class="w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden flex-shrink-0">
                <div class="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-gray-900 text-sm">Add Tools</span>
                    <span class="text-xs text-violet-600 font-medium">{{ displayPiecesCount }}+</span>
                  </div>
                </div>
                <div class="p-3">
                  <p class="text-[9px] font-bold text-gray-400 uppercase mb-2">Enterprise Ready</p>
                  <div class="grid grid-cols-4 gap-1.5">
                    <div v-for="app in integrationLogos" :key="app.name" class="aspect-square rounded-lg bg-gray-50 border border-gray-100 p-1.5 hover:border-violet-300 hover:bg-violet-50 transition-all cursor-pointer">
                      <img :src="app.logo" class="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- ============================== -->
        <!-- SCENE 2: Flow View (Custom Logic) -->
        <!-- ============================== -->
        <Transition name="fade">
          <div v-if="activeIndex === 2" class="absolute inset-0 flex items-center justify-center">
              <!-- 
                Flow structure: 3 main nodes → 2 branches with 2 nodes each
                - Main: Trigger → Agent → Condition
                - Left branch: Salesforce → Slack
                - Right branch: Loop → Email
                
                Layout: NODE_HEIGHT=52, NODE_GAP=45, BRANCH_GAP=40
                
                Main flow Y positions:
                - Trigger:   y=0,   bottom=52
                - Agent:     y=97,  bottom=149
                - Condition: y=194, bottom=246
                
                Branch Y positions (condBottom=246, junction=271, firstBranch=295):
                - Row 1: y=295, bottom=347
                - Row 2: y=387 (347+40), bottom=439
              -->
              
              <div class="relative" style="width: 390px; height: 460px;">
                
                <!-- SVG Connection Lines -->
                <svg class="absolute inset-0 pointer-events-none" width="390" height="460">
                  <!-- Main flow: Trigger→Agent→Condition -->
                  <path d="M 195 52 L 195 97" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <path d="M 195 149 L 195 194" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round"/>
                  
                  <!-- LEFT BRANCH ENTRY: Condition → first left node -->
                  <path 
                    d="M 195 246 L 195 271 Q 195 283, 183 283 L 92 283 Q 80 283, 80 295" 
                    stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  />
                  
                  <!-- RIGHT BRANCH ENTRY: Condition → first right node -->
                  <path 
                    d="M 195 246 L 195 271 Q 195 283, 207 283 L 298 283 Q 310 283, 310 295" 
                    stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  />
                  
                  <!-- LEFT BRANCH: Connect first to second node -->
                  <path d="M 80 347 L 80 387" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round"/>
                  
                  <!-- RIGHT BRANCH: Connect first to second node -->
                  <path d="M 310 347 L 310 387" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round"/>
                </svg>
                
                <!-- Node 1: Trigger (y=0) -->
                <div class="absolute" style="left: 115px; top: 0px; width: 160px;">
                  <div class="absolute -top-5 left-0 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200 z-10">⚡ Trigger</div>
                  <div class="rounded-xl border border-gray-200 shadow-sm bg-white px-3 py-2.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center flex-shrink-0">
                        <img src="https://cdn.activepieces.com/pieces/hubspot.png" class="w-[19px] h-[19px]" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 text-sm truncate leading-tight">1. New Lead</div>
                        <div class="text-gray-500 text-xs truncate leading-tight">HubSpot</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Node 2: AGENT SLOT (y=97) -->
                <div ref="slot2" class="absolute" style="left: 115px; top: 97px; width: 160px; height: 52px;"></div>

                <!-- Node 3: Condition (y=194) -->
                <div class="absolute" style="left: 115px; top: 194px; width: 160px;">
                  <div class="rounded-xl border border-amber-200 shadow-sm bg-white px-3 py-2.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                        <svg class="w-[19px] h-[19px] text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 text-sm truncate leading-tight">3. Qualified?</div>
                        <div class="text-gray-500 text-xs truncate leading-tight">Condition</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- LEFT BRANCH Node 1: Salesforce (y=295) -->
                <div class="absolute" style="left: 0px; top: 295px; width: 160px;">
                  <div class="rounded-xl border border-gray-200 shadow-sm bg-white px-3 py-2.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <img src="https://cdn.activepieces.com/pieces/salesforce.png" class="w-[19px] h-[19px]" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 text-sm truncate leading-tight">4. Add to CRM</div>
                        <div class="text-gray-500 text-xs truncate leading-tight">Salesforce</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- LEFT BRANCH Node 2: Slack (y=387) -->
                <div class="absolute" style="left: 0px; top: 387px; width: 160px;">
                  <div class="rounded-xl border border-gray-200 shadow-sm bg-white px-3 py-2.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                        <img src="https://cdn.activepieces.com/pieces/slack.png" class="w-[19px] h-[19px]" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 text-sm truncate leading-tight">5. Notify Sales</div>
                        <div class="text-gray-500 text-xs truncate leading-tight">Slack</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- RIGHT BRANCH Node 1: Loop (y=295) -->
                <div class="absolute" style="left: 230px; top: 295px; width: 160px;">
                  <div class="rounded-xl border border-pink-200 shadow-sm bg-white px-3 py-2.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center flex-shrink-0">
                        <svg class="w-[19px] h-[19px] text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 text-sm truncate leading-tight">6. Nurture Loop</div>
                        <div class="text-gray-500 text-xs truncate leading-tight">Loop</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- RIGHT BRANCH Node 2: Email (y=387) -->
                <div class="absolute" style="left: 230px; top: 387px; width: 160px;">
                  <div class="rounded-xl border border-gray-200 shadow-sm bg-white px-3 py-2.5">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                        <img src="https://cdn.activepieces.com/pieces/gmail.png" class="w-[19px] h-[19px]" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 text-sm truncate leading-tight">7. Send Email</div>
                        <div class="text-gray-500 text-xs truncate leading-tight">Gmail</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </Transition>

        <!-- ============================== -->
        <!-- SCENE 3: Slack Message (Human Approval) -->
        <!-- ============================== -->
        <Transition name="fade">
          <div v-if="activeIndex === 3" class="absolute inset-0 flex items-center justify-center p-8">
            <div class="w-full max-w-sm">
              <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <!-- Slack header -->
                <div class="px-3 py-2 bg-[#4A154B] flex items-center gap-2">
                  <svg class="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                  </svg>
                  <span class="text-white/90 text-sm">#sales</span>
                </div>

                <!-- Message -->
                <div class="p-4">
                  <div class="flex gap-3">
                    <!-- Slot for agent avatar -->
                    <div ref="slot3" class="w-8 h-8 flex-shrink-0 mt-0.5"></div>
                    
                    <div class="flex-1 min-w-0">
                      <div class="flex items-baseline gap-2 mb-1">
                        <span class="font-bold text-gray-900 text-[15px]">Lead Qualifier</span>
                        <span class="text-gray-400 text-xs">11:42 AM</span>
                      </div>
                      
                      <div class="space-y-2 text-[15px] text-gray-800 leading-relaxed">
                        <p>Hey! <strong>Sarah Chen</strong> from TechCorp just signed up.</p>
                        <p class="text-gray-600">She's VP of Engineering and matches our ICP. Should I send the intro sequence?</p>
                      </div>
                      
                      <!-- Slack-style buttons -->
                      <div class="flex gap-2 mt-3">
                        <button class="px-4 py-1.5 bg-[#007a5a] hover:bg-[#148567] text-white text-sm font-medium rounded transition-colors">
                          Send intro
                        </button>
                        <button class="px-4 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors">
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- ============================== -->
        <!-- SCENE 4: Tables (50/50 split, table fills right half) -->
        <!-- ============================== -->
        <Transition name="slide-in">
          <div v-if="activeIndex === 4" class="absolute inset-0 grid grid-cols-2">
            <!-- LEFT HALF: Agent with animated data flow lines -->
            <div class="relative flex items-center justify-center">
              <!-- Agent slot positioned to align with lines -->
              <div class="flex items-center">
                <div ref="slot4" class="w-[160px] h-[52px]"></div>
                
                <!-- Animated SVG Data Flow Lines (no labels, no arrow heads) -->
                <svg width="120" height="60" class="ml-2">
                  <!-- Gradient definitions -->
                  <defs>
                    <linearGradient id="writeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2" />
                      <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.6" />
                    </linearGradient>
                    <linearGradient id="readGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
                      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.6" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Write line (top) -->
                  <line x1="0" y1="22" x2="120" y2="22" stroke="url(#writeGradient)" stroke-width="2" stroke-linecap="round"/>
                  
                  <!-- Read line (bottom) -->
                  <line x1="120" y1="38" x2="0" y2="38" stroke="url(#readGradient)" stroke-width="2" stroke-linecap="round"/>
                  
                  <!-- Animated particles on write line (flowing right →) -->
                  <circle r="5" fill="#10b981">
                    <animateMotion dur="1.2s" repeatCount="indefinite" path="M 0,22 L 120,22" />
                  </circle>
                  <circle r="5" fill="#10b981" style="opacity: 0.5;">
                    <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.4s" path="M 0,22 L 120,22" />
                  </circle>
                  <circle r="5" fill="#10b981" style="opacity: 0.25;">
                    <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.8s" path="M 0,22 L 120,22" />
                  </circle>
                  
                  <!-- Animated particles on read line (flowing left ←) -->
                  <circle r="5" fill="#8b5cf6">
                    <animateMotion dur="1.2s" repeatCount="indefinite" path="M 120,38 L 0,38" />
                  </circle>
                  <circle r="5" fill="#8b5cf6" style="opacity: 0.5;">
                    <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.4s" path="M 120,38 L 0,38" />
                  </circle>
                  <circle r="5" fill="#8b5cf6" style="opacity: 0.25;">
                    <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.8s" path="M 120,38 L 0,38" />
                  </circle>
                </svg>
              </div>
            </div>
            
            <!-- RIGHT HALF: Table fills entirely -->
            <div class="bg-white border-l border-gray-200 flex flex-col h-full">
              <!-- Table header -->
              <div class="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M10 3v18M14 3v18"/></svg>
                </div>
                <div class="flex-1">
                  <p class="text-white font-bold text-lg">Lead Scores</p>
                  <p class="text-emerald-100 text-xs">Activepieces Table</p>
                </div>
                <div class="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  <span class="text-white text-xs font-medium">Live</span>
                </div>
              </div>

              <!-- Table content (fills remaining space) -->
              <div class="flex-1 overflow-auto">
                <table class="w-full">
                  <thead class="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lead</th>
                      <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                      <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Score</th>
                      <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr class="bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                      <td class="px-6 py-4 font-medium text-gray-900">Sarah Chen</td>
                      <td class="px-6 py-4 text-gray-600">TechCorp</td>
                      <td class="px-6 py-4"><span class="text-lg font-bold text-emerald-600">9.2</span> <span class="text-emerald-500 text-sm">↑</span></td>
                      <td class="px-6 py-4"><span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">Hot</span></td>
                    </tr>
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 font-medium text-gray-900">Mike Johnson</td>
                      <td class="px-6 py-4 text-gray-600">StartupCo</td>
                      <td class="px-6 py-4 text-lg font-bold text-amber-600">6.8</td>
                      <td class="px-6 py-4"><span class="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">Warm</span></td>
                    </tr>
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 font-medium text-gray-900">Lisa Park</td>
                      <td class="px-6 py-4 text-gray-600">BigCorp</td>
                      <td class="px-6 py-4 text-lg font-bold text-gray-500">3.4</td>
                      <td class="px-6 py-4"><span class="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">Cold</span></td>
                    </tr>
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 font-medium text-gray-900">Alex Rivera</td>
                      <td class="px-6 py-4 text-gray-600">MegaCorp</td>
                      <td class="px-6 py-4 text-lg font-bold text-emerald-600">8.5</td>
                      <td class="px-6 py-4"><span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">Hot</span></td>
                    </tr>
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 font-medium text-gray-900">Jordan Lee</td>
                      <td class="px-6 py-4 text-gray-600">InnovateCo</td>
                      <td class="px-6 py-4 text-lg font-bold text-amber-600">5.2</td>
                      <td class="px-6 py-4"><span class="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">Warm</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Footer -->
              <div class="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center gap-3">
                <span class="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center text-sm">🤖</span>
                <span class="text-sm text-gray-600">Agent updated: <strong class="text-gray-900">Sarah Chen</strong> score → <strong class="text-emerald-600">9.2</strong></span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const { piecesCount, pending } = usePiecesCount()
const displayPiecesCount = computed(() => pending.value ? 500 : piecesCount.value)

const tabs = [
  { id: 'agent', label: 'Natural Language' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'logic', label: 'Custom Logic' },
  { id: 'human', label: 'Human Approval' },
  { id: 'tables', label: 'Tables' },
]

const baseTools = [
  'https://cdn.activepieces.com/pieces/hubspot.png',
  'https://cdn.activepieces.com/pieces/slack.png',
  'https://cdn.activepieces.com/pieces/openai.png',
]

const integrationLogos = [
  { name: 'Salesforce', logo: 'https://cdn.activepieces.com/pieces/salesforce.png' },
  { name: 'ServiceNow', logo: 'https://cdn.activepieces.com/pieces/servicenow.png' },
  { name: 'SAP', logo: 'https://cdn.activepieces.com/pieces/sap.png' },
  { name: 'Oracle', logo: 'https://cdn.activepieces.com/pieces/oracle-netsuite.png' },
  { name: 'Slack', logo: 'https://cdn.activepieces.com/pieces/slack.png' },
  { name: 'HubSpot', logo: 'https://cdn.activepieces.com/pieces/hubspot.png' },
  { name: 'Zendesk', logo: 'https://cdn.activepieces.com/pieces/zendesk.png' },
  { name: 'Jira', logo: 'https://cdn.activepieces.com/pieces/jira.png' },
]

const activeIndex = ref(0)
const isAutoPlaying = ref(true)
const progress = ref(0)
const isTyping = ref(false)
const typedPrompt = ref('')
const isMorphing = ref(false)

const fullPrompt = 'When a new lead arrives, research their company and role. Score them 1-10 based on fit. If score > 7, ask me on Slack before sending a discount.'

// ============================================
// DOM REFS FOR MEASURED POSITIONING
// ============================================
const canvasRef = ref(null)
const slot0 = ref(null)
const slot1 = ref(null)
const slot2 = ref(null)
const slot3 = ref(null)
const slot4 = ref(null)

// Store measured position
const agentPosition = ref({ top: 0, left: 0, width: 340, height: 280 })

// Get the current slot ref based on active index
const getCurrentSlot = () => {
  const slots = [slot0, slot1, slot2, slot3, slot4]
  return slots[activeIndex.value]?.value
}

// Measure slot position relative to canvas
const measureSlot = () => {
  const canvas = canvasRef.value
  const slot = getCurrentSlot()
  
  if (!canvas || !slot) return
  
  const canvasRect = canvas.getBoundingClientRect()
  const slotRect = slot.getBoundingClientRect()
  
  agentPosition.value = {
    top: slotRect.top - canvasRect.top,
    left: slotRect.left - canvasRect.left,
    width: slotRect.width,
    height: slotRect.height
  }
}

// Computed agent properties
const isLarge = computed(() => activeIndex.value === 0)

const agentStyles = computed(() => ({
  top: agentPosition.value.top + 'px',
  left: agentPosition.value.left + 'px',
  width: agentPosition.value.width + 'px',
  height: agentPosition.value.height + 'px',
}))

// ============================================
// WATCHERS AND LIFECYCLE
// ============================================

// Morphing timeout tracker
let morphingTimeout = null

// Watch for tab changes and remeasure
watch(activeIndex, async () => {
  // Trigger morphing state for enhanced glow during transition
  isMorphing.value = true
  if (morphingTimeout) clearTimeout(morphingTimeout)
  morphingTimeout = setTimeout(() => {
    isMorphing.value = false
  }, 800) // Match transition duration
  
  await nextTick()
  // Small delay to ensure transitions have started and DOM is ready
  setTimeout(measureSlot, 50)
})

// Debounced resize handler
let resizeTimeout = null
const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(measureSlot, 100)
}

// ============================================
// AUTO-PLAY AND TYPING
// ============================================

let interval = null
let typingInterval = null

const goToTab = (i) => {
  activeIndex.value = i
  progress.value = 0
  if (i === 0) startTyping()
  if (isAutoPlaying.value) startAuto()
}

const toggleAuto = () => {
  isAutoPlaying.value = !isAutoPlaying.value
  isAutoPlaying.value ? startAuto() : stopAuto()
}

const startAuto = () => {
  stopAuto()
  interval = setInterval(() => {
    progress.value += 100 / 60
    if (progress.value >= 100) {
      progress.value = 0
      const next = (activeIndex.value + 1) % tabs.length
      activeIndex.value = next
      if (next === 0) startTyping()
    }
  }, 100)
}

const stopAuto = () => {
  if (interval) clearInterval(interval)
  progress.value = 0
}

const startTyping = () => {
  if (typingInterval) clearInterval(typingInterval)
  typedPrompt.value = ''
  isTyping.value = true
  let i = 0
  typingInterval = setInterval(() => {
    if (i < fullPrompt.length) {
      typedPrompt.value += fullPrompt[i]
      i++
    } else {
      clearInterval(typingInterval)
      isTyping.value = false
    }
  }, 20)
}

onMounted(() => {
  startAuto()
  startTyping()
  
  // Initial measurement after DOM is ready
  nextTick(() => {
    setTimeout(measureSlot, 100)
  })
  
  // Listen for resize
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  stopAuto()
  if (typingInterval) clearInterval(typingInterval)
  if (resizeTimeout) clearTimeout(resizeTimeout)
  if (morphingTimeout) clearTimeout(morphingTimeout)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Agent element with spring-based staggered transitions */
.agent-element {
  transition: 
    top 800ms cubic-bezier(0.34, 1.56, 0.64, 1),
    left 800ms cubic-bezier(0.34, 1.56, 0.64, 1),
    width 700ms cubic-bezier(0.22, 1, 0.36, 1) 80ms,
    height 700ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
  will-change: top, left, width, height;
}

/* Animated AI gradient border - subtle but distinctive */
.ai-gradient-border {
  position: relative;
  background: linear-gradient(
    90deg,
    #8b5cf6,
    #a855f7,
    #c084fc,
    #a855f7,
    #8b5cf6
  );
  background-size: 300% 100%;
  animation: gradient-flow 4s ease-in-out infinite;
  box-shadow: 0 2px 8px -2px rgba(139, 92, 246, 0.25);
  transition: 
    box-shadow 400ms ease-out,
    transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Slightly enhanced glow during morphing/movement */
.ai-gradient-border.is-morphing {
  box-shadow: 0 4px 16px -4px rgba(139, 92, 246, 0.35);
  animation: gradient-flow 2s ease-in-out infinite;
  transform: scale(1.005);
}

@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Flow node static styling */
.flow-node-static {
  position: relative;
}

/* Special node glow effect (from FlowNode.vue) */
.special-node-glow {
  box-shadow: 
    0 0 0 1.5px rgba(139, 92, 246, 0.25),
    0 0 16px -2px rgba(139, 92, 246, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.05);
  animation: subtle-pulse 3s ease-in-out infinite;
}

.special-node-glow-amber {
  box-shadow: 
    0 0 0 1.5px rgba(245, 158, 11, 0.25),
    0 0 16px -2px rgba(245, 158, 11, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.05);
  animation: subtle-pulse-amber 3s ease-in-out infinite;
}

.special-node-glow-pink {
  box-shadow: 
    0 0 0 1.5px rgba(236, 72, 153, 0.25),
    0 0 16px -2px rgba(236, 72, 153, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.05);
  animation: subtle-pulse-pink 3s ease-in-out infinite;
}

@keyframes subtle-pulse {
  0%, 100% { 
    box-shadow: 
      0 0 0 1.5px rgba(139, 92, 246, 0.25),
      0 0 16px -2px rgba(139, 92, 246, 0.2),
      0 2px 8px rgba(0, 0, 0, 0.05);
  }
  50% { 
    box-shadow: 
      0 0 0 2px rgba(139, 92, 246, 0.35),
      0 0 20px -2px rgba(139, 92, 246, 0.3),
      0 2px 8px rgba(0, 0, 0, 0.05);
  }
}

/* Data flow animations for Tables scene */
.data-line-write {
  stroke-dasharray: 6 4;
  animation: flow-right 0.8s linear infinite;
}

.data-line-read {
  stroke-dasharray: 6 4;
  animation: flow-left 0.8s linear infinite;
}

@keyframes flow-right {
  to { stroke-dashoffset: -10; }
}

@keyframes flow-left {
  to { stroke-dashoffset: 10; }
}

@keyframes subtle-pulse-amber {
  0%, 100% { 
    box-shadow: 
      0 0 0 1.5px rgba(245, 158, 11, 0.25),
      0 0 16px -2px rgba(245, 158, 11, 0.2),
      0 2px 8px rgba(0, 0, 0, 0.05);
  }
  50% { 
    box-shadow: 
      0 0 0 2px rgba(245, 158, 11, 0.35),
      0 0 20px -2px rgba(245, 158, 11, 0.3),
      0 2px 8px rgba(0, 0, 0, 0.05);
  }
}

@keyframes subtle-pulse-pink {
  0%, 100% { 
    box-shadow: 
      0 0 0 1.5px rgba(236, 72, 153, 0.25),
      0 0 16px -2px rgba(236, 72, 153, 0.2),
      0 2px 8px rgba(0, 0, 0, 0.05);
  }
  50% { 
    box-shadow: 
      0 0 0 2px rgba(236, 72, 153, 0.35),
      0 0 20px -2px rgba(236, 72, 153, 0.3),
      0 2px 8px rgba(0, 0, 0, 0.05);
  }
}

/* Sparkle animation (from FlowNode.vue) */
@keyframes sparkle {
  0%, 100% { 
    opacity: 0.5; 
    transform: scale(1) rotate(0deg);
    color: #a855f7;
    text-shadow: 0 0 4px #a855f7;
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2) rotate(180deg);
    color: #c084fc;
    text-shadow: 0 0 8px #c084fc;
  }
}

.animate-sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

/* Slide in transition */
.slide-in-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-in-leave-active {
  transition: all 0.3s ease-in;
}
.slide-in-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Fade transition */
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Row highlight animation */
@keyframes highlight {
  0%, 100% { background-color: rgba(16, 185, 129, 0.1); }
  50% { background-color: rgba(16, 185, 129, 0.2); }
}
.animate-highlight {
  animation: highlight 2s ease-in-out infinite;
}

/* Data flow animation */
.data-flow-container {
  position: absolute;
  width: 60px;
  height: 4px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.data-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: -1px;
}

.particle-right {
  background-color: #10b981;
  animation: moveRight 1.5s ease-in-out infinite;
}

.particle-left {
  background-color: #8b5cf6;
  animation: moveLeft 1.5s ease-in-out infinite;
  animation-delay: 0.75s;
}

@keyframes moveRight {
  0% { left: 0; opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

@keyframes moveLeft {
  0% { right: 0; opacity: 1; }
  100% { right: 100%; opacity: 0; }
}
</style>
