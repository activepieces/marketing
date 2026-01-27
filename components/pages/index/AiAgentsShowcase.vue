<template>
  <section ref="sectionRef" class="relative py-24 bg-white">
    <div class="relative max-w-7xl mx-auto px-4">
      <!-- Header - Centered -->
      <div class="flex flex-col items-center text-center mb-10">
        <!-- Badge Pill -->
        <NuxtLink
          to="/product/ai-agent-builder"
          class="inline-flex items-center gap-2.5 pl-4 pr-1 py-1 mb-6 rounded-full border border-primary-dark/10 hover:border-primary-dark/20 transition-all"
        >
          <span class="text-sm font-medium uppercase tracking-wide text-primary-dark/80">Explore AI Agents</span>
          <span class="bg-primary-dark/5 rounded-full p-2">
            <PhCaretRight weight="fill" class="w-4 h-4 text-primary-dark" />
          </span>
        </NuxtLink>

        <!-- Heading -->
        <h2 class="text-5xl font-sentient font-bold text-primary-dark mb-3">
          AI agents like your<br>best employee
        </h2>

        <!-- Subtitle -->
        <p class="text-xl text-primary-dark/80 max-w-lg">
          Build intelligent agents with enterprise integrations and precise control.
        </p>
      </div>

      <!-- Tabs row -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <button
          v-for="(tab, i) in tabs"
          :key="tab.id"
          @click="goToTab(i)"
          class="relative px-4 py-2 text-[15px] font-medium transition-all duration-300 rounded-full overflow-hidden"
          :class="activeIndex === i
            ? 'bg-primary-dark text-white'
            : 'text-primary-dark/60 hover:text-primary-dark hover:bg-primary-dark/5'"
        >
          <!-- Progress fill - full when paused, follows progress when playing -->
          <span
            v-if="activeIndex === i"
            class="absolute inset-0 bg-[#1a1640] rounded-l-full origin-left transition-transform duration-100 ease-linear"
            :style="{ transform: `scaleX(${isAutoPlaying ? progress / 100 : 1})` }"
          ></span>
          <span class="relative z-10">{{ tab.label }}</span>
        </button>
      </div>

      <!-- Canvas -->
      <div ref="canvasRef" class="relative bg-primary-dark/5 rounded-2xl overflow-hidden" style="height: 453px;">

        <!-- Play/Pause button - top left inside canvas, integrated look -->
        <button
          @click="toggleAuto"
          class="absolute top-5 left-5 z-50 p-1 hover:scale-110 transition-transform"
        >
          <PhPause v-if="isAutoPlaying" class="w-5 h-5 text-primary-dark hover:text-primary-dark/80 transition-colors" weight="fill" />
          <PhPlay v-else class="w-5 h-5 text-primary-dark hover:text-primary-dark/80 transition-colors" weight="fill" />
        </button>
        
        <!-- ============================== -->
        <!-- THE AGENT - positioned via measured slots -->
        <!-- z-index: lower when popup is showing (scene 1), higher otherwise -->
        <!-- ============================== -->
        <div 
          class="agent-element absolute"
          :class="activeIndex === 1 ? 'z-20' : 'z-30'"
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
              
              <!-- Body (expanded view - scenes 0 and 1) -->
              <div 
                class="transition-all duration-500 ease-out overflow-hidden border-t border-gray-100"
                :style="{ maxHeight: (activeIndex === 0 || activeIndex === 1) ? '400px' : '0px', opacity: (activeIndex === 0 || activeIndex === 1) ? 1 : 0 }"
              >
                <div class="p-4 space-y-3">
                  <!-- Instructions - real content for scene 0, skeleton for scene 1 -->
                  <div>
                    <label class="text-[10px] font-bold text-gray-400 uppercase mb-1.5 block">Instructions</label>
                    <div v-if="activeIndex === 0" class="p-3 rounded-lg bg-violet-50 border border-violet-200 min-h-[60px]">
                      <p class="text-sm text-gray-700 leading-relaxed">{{ typedPrompt }}<span v-if="isTyping" class="inline-block w-0.5 h-4 bg-violet-500 ml-0.5 animate-pulse"></span></p>
                    </div>
                    <div v-else class="p-3 rounded-lg bg-gray-100 border border-gray-200 min-h-[60px] space-y-2">
                      <div class="h-3 bg-gray-200 rounded w-full"></div>
                      <div class="h-3 bg-gray-200 rounded w-4/5"></div>
                      <div class="h-3 bg-gray-200 rounded w-3/5"></div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <!-- Trigger - real content for scene 0, skeleton for scene 1 -->
                    <div class="p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <p class="text-[9px] font-bold text-gray-400 uppercase mb-2">Trigger</p>
                      <div v-if="activeIndex === 0" class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <img src="https://cdn.activepieces.com/pieces/hubspot.png" class="w-4 h-4" />
                        </div>
                        <span class="text-sm font-medium text-gray-700">New Lead</span>
                      </div>
                      <div v-else class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-md bg-gray-200 flex-shrink-0"></div>
                        <div class="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <!-- Tools - real content for scene 0, skeleton with + hint for scene 1 -->
                    <div class="p-3 rounded-lg" :class="activeIndex === 1 ? 'bg-violet-50 border border-violet-200' : 'bg-gray-50 border border-gray-100'">
                      <p class="text-[9px] font-bold uppercase mb-2" :class="activeIndex === 1 ? 'text-violet-500' : 'text-gray-400'">Tools</p>
                      <div v-if="activeIndex === 0" class="flex items-center gap-1">
                        <div v-for="t in baseTools" :key="t" class="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <img :src="t" class="w-4 h-4" />
                        </div>
                        <div class="w-7 h-7 rounded-md bg-violet-100 border border-violet-200 flex items-center justify-center flex-shrink-0">
                          <span class="text-[10px] font-bold text-violet-600">+</span>
                        </div>
                      </div>
                      <div v-else class="flex items-center gap-1">
                        <div class="w-7 h-7 rounded-md bg-gray-200 flex-shrink-0"></div>
                        <div class="w-7 h-7 rounded-md bg-gray-200 flex-shrink-0"></div>
                        <div class="w-7 h-7 rounded-md bg-violet-200 border-2 border-violet-400 flex items-center justify-center flex-shrink-0 animate-pulse">
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
        <!-- SCENE 1: Integrations Popup (overlapping agent) -->
        <!-- ============================== -->
        <Transition name="slide-in">
          <div v-if="activeIndex === 1" class="absolute inset-0 flex items-center justify-center p-6 z-40">
            <!-- Container for both elements centered together -->
            <div class="flex items-start">
              <!-- Agent slot positioned relatively, pushed down a bit -->
              <div ref="slot1" class="w-[340px] h-[320px] relative mt-12"></div>
              
              <!-- Overlapping popup - overlaps agent, with high z-index to stay on top -->
              <div class="w-64 -ml-16 relative z-50">
                <!-- Header - clean and minimal -->
                <div class="px-4 py-3 border border-gray-200 border-b-0 rounded-t-xl bg-white">
                  <p class="font-semibold text-gray-900 text-sm">Add Tools</p>
                </div>
                
                <!-- Tools grid - clean 4x3 layout, overflow visible for tooltips -->
                <div class="p-3 border-x border-gray-200 bg-white relative">
                  <div class="grid grid-cols-4 gap-2">
                    <div 
                      v-for="app in integrationLogosCompact" 
                      :key="app.name"
                      class="app-icon group relative w-12 h-12 rounded-lg bg-white border border-gray-200 p-2 hover:border-violet-400 hover:shadow-md hover:scale-105 hover:bg-violet-50 transition-all duration-150 cursor-pointer flex items-center justify-center hover:z-[100]"
                    >
                      <img :src="app.logo" :alt="app.name" class="w-7 h-7 object-contain pointer-events-none" />
                      <!-- Tooltip always above, z-index very high to escape any clipping -->
                      <span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-[200]">
                        {{ app.name }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Footer - clean, no intense gradient -->
                <div class="px-4 py-3 bg-gray-50 border border-gray-200 border-t-gray-100 rounded-b-xl flex items-center justify-between">
                  <p class="text-gray-900 font-semibold">{{ displayPiecesCount }}+ apps</p>
                  <span class="text-xs text-violet-600 font-medium">Browse all →</span>
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
                
                Layout: NODE_HEIGHT=52, NODE_GAP=35 (shortened), BRANCH_GAP=30 (shortened)
                
                Main flow Y positions:
                - Trigger:   y=0,   bottom=52
                - Agent:     y=87,  bottom=139
                - Condition: y=174, bottom=226
                
                Branch Y positions (condBottom=226, junction=241, firstBranch=265):
                - Row 1: y=265, bottom=317
                - Row 2: y=347 (317+30), bottom=399
              -->
              
              <div class="relative" style="width: 390px; height: 400px;">
                
                <!-- SVG Connection Lines -->
                <svg class="absolute inset-0 pointer-events-none" width="390" height="400">
                  <!-- Main flow: Trigger→Agent→Condition -->
                  <path d="M 195 52 L 195 87" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <path d="M 195 139 L 195 174" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round"/>
                  
                  <!-- LEFT BRANCH ENTRY: Condition → first left node -->
                  <path 
                    d="M 195 226 L 195 241 Q 195 253, 183 253 L 92 253 Q 80 253, 80 265" 
                    stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  />
                  
                  <!-- RIGHT BRANCH ENTRY: Condition → first right node -->
                  <path 
                    d="M 195 226 L 195 241 Q 195 253, 207 253 L 298 253 Q 310 253, 310 265" 
                    stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  />
                  
                  <!-- LEFT BRANCH: Connect first to second node -->
                  <path d="M 80 317 L 80 347" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round"/>
                  
                  <!-- RIGHT BRANCH: Connect first to second node -->
                  <path d="M 310 317 L 310 347" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round"/>
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

                <!-- Node 2: AGENT SLOT (y=87) -->
                <div ref="slot2" class="absolute" style="left: 115px; top: 87px; width: 160px; height: 52px;"></div>

                <!-- Node 3: Condition (y=174) -->
                <div class="absolute" style="left: 115px; top: 174px; width: 160px;">
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

                <!-- LEFT BRANCH Node 1: Salesforce (y=265) -->
                <div class="absolute" style="left: 0px; top: 265px; width: 160px;">
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
                
                <!-- LEFT BRANCH Node 2: Slack (y=347) -->
                <div class="absolute" style="left: 0px; top: 347px; width: 160px;">
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

                <!-- RIGHT BRANCH Node 1: Loop (y=265) -->
                <div class="absolute" style="left: 230px; top: 265px; width: 160px;">
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
                
                <!-- RIGHT BRANCH Node 2: Email (y=347) -->
                <div class="absolute" style="left: 230px; top: 347px; width: 160px;">
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
            <!-- LEFT HALF: Agent centered with animated lines going to table -->
            <div class="relative h-full overflow-hidden">
              <!-- Agent slot - centered in left half -->
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div ref="slot4" class="w-[200px] h-[60px]"></div>
              </div>
              
              <!-- Animated data lines - spans from agent to table dynamically -->
              <!-- Agent is 200px wide centered, so its right edge is at 50% + 100px -->
              <!-- SVG: left = calc(50% + 110px) to right = 0, fills the gap exactly -->
              <svg 
                class="absolute top-1/2 -translate-y-1/2" 
                style="left: calc(50% + 110px); right: 0; height: 50px;"
                preserveAspectRatio="none"
              >
                <!-- Static guide lines using 100% width -->
                <line x1="0" y1="18" x2="100%" y2="18" stroke="#10b981" stroke-width="1.5" stroke-opacity="0.3" stroke-linecap="round"/>
                <line x1="100%" y1="32" x2="0" y2="32" stroke="#8b5cf6" stroke-width="1.5" stroke-opacity="0.3" stroke-linecap="round"/>
              </svg>
              
              <!-- CSS-animated particles (work with any width) -->
              <div class="absolute top-1/2 -translate-y-1/2 h-[50px] pointer-events-none" style="left: calc(50% + 110px); right: 0;">
                <!-- Write particles (going right) -->
                <span class="particle-dot bg-emerald-500" style="top: 15px; animation-delay: 0s;"></span>
                <span class="particle-dot bg-emerald-500 opacity-70" style="top: 15px; animation-delay: 0.2s;"></span>
                <span class="particle-dot bg-emerald-500 opacity-50" style="top: 15px; animation-delay: 0.4s;"></span>
                <span class="particle-dot bg-emerald-500 opacity-35" style="top: 15px; animation-delay: 0.6s;"></span>
                <span class="particle-dot bg-emerald-500 opacity-20" style="top: 15px; animation-delay: 0.8s;"></span>
                <!-- Read particles (going left) -->
                <span class="particle-dot-reverse bg-violet-500" style="top: 29px; animation-delay: 0s;"></span>
                <span class="particle-dot-reverse bg-violet-500 opacity-70" style="top: 29px; animation-delay: 0.2s;"></span>
                <span class="particle-dot-reverse bg-violet-500 opacity-50" style="top: 29px; animation-delay: 0.4s;"></span>
                <span class="particle-dot-reverse bg-violet-500 opacity-35" style="top: 29px; animation-delay: 0.6s;"></span>
                <span class="particle-dot-reverse bg-violet-500 opacity-20" style="top: 29px; animation-delay: 0.8s;"></span>
              </div>
            </div>
            
            <!-- RIGHT HALF: Table fills entirely - clean spreadsheet style -->
            <div class="bg-white border-l border-gray-200 flex flex-col h-full">
              <!-- Clean toolbar header -->
              <div class="px-4 py-2.5 bg-white border-b border-gray-200 flex items-center gap-3">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-md bg-violet-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M10 3v18M14 3v18"/></svg>
                  </div>
                  <span class="font-semibold text-gray-900 text-sm">Lead Scores</span>
                </div>
                <div class="flex-1"></div>
                <div class="flex items-center gap-1.5 text-xs text-gray-500">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Synced</span>
                </div>
              </div>

              <!-- Spreadsheet-style table -->
              <div class="flex-1 overflow-auto">
                <table class="w-full border-collapse text-sm">
                  <thead class="sticky top-0 z-10">
                    <tr class="bg-gray-50">
                      <th class="w-10 px-3 py-2 text-center text-[10px] font-medium text-gray-400 border-b border-r border-gray-200 bg-gray-50"></th>
                      <th class="px-4 py-2 text-left text-[11px] font-semibold text-gray-600 border-b border-r border-gray-200 bg-gray-50">Name</th>
                      <th class="px-4 py-2 text-left text-[11px] font-semibold text-gray-600 border-b border-r border-gray-200 bg-gray-50">Company</th>
                      <th class="px-4 py-2 text-left text-[11px] font-semibold text-gray-600 border-b border-r border-gray-200 bg-gray-50">Score</th>
                      <th class="px-4 py-2 text-left text-[11px] font-semibold text-gray-600 border-b border-gray-200 bg-gray-50">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="group hover:bg-blue-50/50">
                      <td class="px-3 py-2.5 text-center text-[10px] text-gray-400 border-b border-r border-gray-100 bg-gray-50/50">1</td>
                      <td class="px-4 py-2.5 text-gray-900 border-b border-r border-gray-100">Sarah Chen</td>
                      <td class="px-4 py-2.5 text-gray-600 border-b border-r border-gray-100">Stripe</td>
                      <td class="px-4 py-2.5 border-b border-r border-gray-100"><span class="inline-flex items-center justify-center w-8 h-6 rounded bg-emerald-100 text-emerald-700 text-xs font-semibold">92</span></td>
                      <td class="px-4 py-2.5 border-b border-gray-100"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700">● Qualified</span></td>
                    </tr>
                    <tr class="group hover:bg-blue-50/50">
                      <td class="px-3 py-2.5 text-center text-[10px] text-gray-400 border-b border-r border-gray-100 bg-gray-50/50">2</td>
                      <td class="px-4 py-2.5 text-gray-900 border-b border-r border-gray-100">Mike Johnson</td>
                      <td class="px-4 py-2.5 text-gray-600 border-b border-r border-gray-100">Shopify</td>
                      <td class="px-4 py-2.5 border-b border-r border-gray-100"><span class="inline-flex items-center justify-center w-8 h-6 rounded bg-amber-100 text-amber-700 text-xs font-semibold">68</span></td>
                      <td class="px-4 py-2.5 border-b border-gray-100"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-700">● Nurturing</span></td>
                    </tr>
                    <tr class="group hover:bg-blue-50/50">
                      <td class="px-3 py-2.5 text-center text-[10px] text-gray-400 border-b border-r border-gray-100 bg-gray-50/50">3</td>
                      <td class="px-4 py-2.5 text-gray-900 border-b border-r border-gray-100">Lisa Park</td>
                      <td class="px-4 py-2.5 text-gray-600 border-b border-r border-gray-100">Figma</td>
                      <td class="px-4 py-2.5 border-b border-r border-gray-100"><span class="inline-flex items-center justify-center w-8 h-6 rounded bg-gray-100 text-gray-600 text-xs font-semibold">34</span></td>
                      <td class="px-4 py-2.5 border-b border-gray-100"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500">● New</span></td>
                    </tr>
                    <tr class="group hover:bg-blue-50/50">
                      <td class="px-3 py-2.5 text-center text-[10px] text-gray-400 border-b border-r border-gray-100 bg-gray-50/50">4</td>
                      <td class="px-4 py-2.5 text-gray-900 border-b border-r border-gray-100">Alex Rivera</td>
                      <td class="px-4 py-2.5 text-gray-600 border-b border-r border-gray-100">Notion</td>
                      <td class="px-4 py-2.5 border-b border-r border-gray-100"><span class="inline-flex items-center justify-center w-8 h-6 rounded bg-emerald-100 text-emerald-700 text-xs font-semibold">85</span></td>
                      <td class="px-4 py-2.5 border-b border-gray-100"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700">● Qualified</span></td>
                    </tr>
                    <tr class="group hover:bg-blue-50/50">
                      <td class="px-3 py-2.5 text-center text-[10px] text-gray-400 border-b border-r border-gray-100 bg-gray-50/50">5</td>
                      <td class="px-4 py-2.5 text-gray-900 border-b border-r border-gray-100">Jordan Lee</td>
                      <td class="px-4 py-2.5 text-gray-600 border-b border-r border-gray-100">Vercel</td>
                      <td class="px-4 py-2.5 border-b border-r border-gray-100"><span class="inline-flex items-center justify-center w-8 h-6 rounded bg-amber-100 text-amber-700 text-xs font-semibold">52</span></td>
                      <td class="px-4 py-2.5 border-b border-gray-100"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-700">● Nurturing</span></td>
                    </tr>
                    <tr class="group hover:bg-blue-50/50">
                      <td class="px-3 py-2.5 text-center text-[10px] text-gray-400 border-r border-gray-100 bg-gray-50/50">6</td>
                      <td class="px-4 py-2.5 text-gray-900 border-r border-gray-100">Emma Wilson</td>
                      <td class="px-4 py-2.5 text-gray-600 border-r border-gray-100">Linear</td>
                      <td class="px-4 py-2.5 border-r border-gray-100"><span class="inline-flex items-center justify-center w-8 h-6 rounded bg-emerald-100 text-emerald-700 text-xs font-semibold">78</span></td>
                      <td class="px-4 py-2.5"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700">● Qualified</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Status bar footer -->
              <div class="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
                <span>6 records</span>
                <span class="flex items-center gap-1.5">
                  <span class="w-4 h-4 rounded bg-violet-100 flex items-center justify-center text-[9px]">🤖</span>
                  Last updated by agent
                </span>
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
import { PhCaretRight, PhPlay, PhPause } from "@phosphor-icons/vue"

const { piecesCount, pending } = usePiecesCount()
const displayPiecesCount = computed(() => pending.value ? 500 : piecesCount.value)

const tabs = [
  { id: 'agent', label: 'AI Agent' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'logic', label: 'Custom Logic' },
  { id: 'human', label: 'Human Approval' },
  { id: 'tables', label: 'Agent Data' },
]

const baseTools = [
  'https://cdn.activepieces.com/pieces/hubspot.png',
  'https://cdn.activepieces.com/pieces/slack.png',
  'https://cdn.activepieces.com/pieces/openai.png',
]

// Curated enterprise-grade integrations for the popup (12 items = 3 rows x 4 cols)
// Slugs verified from https://cloud.activepieces.com/api/v1/pieces
const integrationLogosCompact = [
  { name: 'Salesforce', logo: 'https://cdn.activepieces.com/pieces/salesforce.png' },
  { name: 'ServiceNow', logo: 'https://cdn.activepieces.com/pieces/service-now.png' },
  { name: 'SAP Ariba', logo: 'https://cdn.activepieces.com/pieces/sap-ariba.png' },
  { name: 'NetSuite', logo: 'https://cdn.activepieces.com/pieces/netsuite.png' },
  { name: 'Microsoft Teams', logo: 'https://cdn.activepieces.com/pieces/microsoft-teams.png' },
  { name: 'Slack', logo: 'https://cdn.activepieces.com/pieces/slack.png' },
  { name: 'HubSpot', logo: 'https://cdn.activepieces.com/pieces/hubspot.png' },
  { name: 'Zendesk', logo: 'https://cdn.activepieces.com/pieces/zendesk.png' },
  { name: 'Jira Cloud', logo: 'https://cdn.activepieces.com/pieces/jira.png' },
  { name: 'Snowflake', logo: 'https://cdn.activepieces.com/pieces/snowflake.png' },
  { name: 'Microsoft Dynamics CRM', logo: 'https://cdn.activepieces.com/pieces/microsoft-dynamics-crm.png' },
  { name: 'Intercom', logo: 'https://cdn.activepieces.com/pieces/intercom.png' },
]

const activeIndex = ref(0)
const isAutoPlaying = ref(false) // Start paused, will auto-play when visible
const isUserPaused = ref(false) // Track if user manually paused
const isVisible = ref(false) // Track section visibility
const progress = ref(0)
const isTyping = ref(false)
const typedPrompt = ref('')
const isMorphing = ref(false)

const fullPrompt = 'When a new lead arrives, research their company and role. Score them 1-10 based on fit. If score > 7, ask me on Slack before sending a discount.'

// ============================================
// DOM REFS FOR MEASURED POSITIONING
// ============================================
const sectionRef = ref(null)
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

// Computed agent properties - expanded in scenes 0 and 1
const isLarge = computed(() => activeIndex.value === 0 || activeIndex.value === 1)

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
  isUserPaused.value = !isAutoPlaying.value // Track manual pause
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

// Intersection observer for visibility-based auto-play
let observer = null

onMounted(() => {
  // Initial measurement after DOM is ready
  nextTick(() => {
    setTimeout(measureSlot, 100)
  })
  
  // Listen for resize
  window.addEventListener('resize', handleResize)
  
  // Set up intersection observer to detect when section is visible
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      isVisible.value = entry.isIntersecting
      
      if (entry.isIntersecting) {
        // Section became visible - start if not manually paused
        if (!isUserPaused.value && !isAutoPlaying.value) {
          isAutoPlaying.value = true
          startAuto()
          if (activeIndex.value === 0) startTyping()
        }
      } else {
        // Section not visible - pause (but don't mark as user paused)
        if (isAutoPlaying.value) {
          stopAuto()
          isAutoPlaying.value = false
        }
      }
    },
    { threshold: 0.3 } // Trigger when 30% of section is visible
  )
  
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  stopAuto()
  if (typingInterval) clearInterval(typingInterval)
  if (resizeTimeout) clearTimeout(resizeTimeout)
  if (morphingTimeout) clearTimeout(morphingTimeout)
  if (observer) observer.disconnect()
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

/* Particle dots with percentage-based animation */
.particle-dot {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  animation: particle-right 1s linear infinite;
}

.particle-dot-reverse {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  animation: particle-left 1s linear infinite;
}

@keyframes particle-right {
  0% { left: 0%; }
  100% { left: 100%; }
}

@keyframes particle-left {
  0% { left: 100%; }
  100% { left: 0%; }
}
</style>
