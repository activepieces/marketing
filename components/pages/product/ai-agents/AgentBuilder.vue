<template>
  <div
    ref="containerRef"
    class="relative w-full max-w-lg mx-auto h-[420px] rounded-2xl overflow-hidden transition-all duration-500"
    :class="
      agentLaunched
        ? 'bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900'
        : 'bg-gray-900'
    "
  >
    <!-- Soft background blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-violet-500/20 to-purple-500/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-pink-500/15 to-rose-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"
      ></div>
    </div>

    <!-- PICK YOUR AGENT SCREEN -->
    <Transition name="fade-scale">
      <div
        v-if="!selectedAgent && !agentLaunched"
        class="absolute inset-0 z-10"
      >
        <div class="h-full flex flex-col p-5">
          <!-- Header -->
          <div class="mb-5">
            <h2 class="font-bold text-white/90 text-lg">Build an Agent</h2>
            <p class="text-white/50 text-sm">Pick a template to start</p>
          </div>

          <!-- Agent cards -->
          <div class="flex-1 flex flex-col gap-3">
            <button
              v-for="(agent, index) in agents"
              :key="agent.id"
              @click="selectAgent(agent)"
              class="group relative flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 text-left"
            >
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                :class="[
                  index === 0
                    ? 'bg-amber-500/20 group-hover:bg-amber-500/30'
                    : '',
                  index === 1
                    ? 'bg-blue-500/20 group-hover:bg-blue-500/30'
                    : '',
                  index === 2
                    ? 'bg-emerald-500/20 group-hover:bg-emerald-500/30'
                    : '',
                ]"
              >
                <component
                  :is="agent.iconComponent"
                  class="w-6 h-6"
                  :class="agent.iconClass"
                  weight="fill"
                />
              </div>

              <div class="flex-1 min-w-0">
                <p
                  class="font-semibold text-white/90 group-hover:text-white transition-colors"
                >
                  {{ agent.name }}
                </p>
                <p class="text-sm text-white/50 truncate">{{ agent.brief }}</p>
              </div>

              <div
                class="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-white/40 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- BUILDING AGENT SCREEN -->
    <Transition name="slide-up">
      <div v-if="selectedAgent && !agentLaunched" class="absolute inset-0 z-20">
        <!-- WTF Help button -->
        <button
          @click.stop="showWtfExplainer = true"
          class="absolute top-6 right-6 z-30 group leading-none"
        >
          <span
            class="inline-block text-sm font-black bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent rotate-[-8deg] transform group-hover:rotate-[-12deg] group-hover:scale-125 transition-all"
          >
            WTF?
          </span>
          <!-- Tooltip -->
          <span
            class="absolute right-0 top-full px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            What's This For?
          </span>
        </button>

        <div class="h-full flex flex-col p-5">
          <!-- Header: back + avatar + editable name -->
          <div class="flex items-center gap-3 mb-4">
            <button
              @click="goBack"
              class="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all flex-shrink-0"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <!-- Avatar lottery -->
            <button
              @click.stop="shuffleIcon"
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center transition-all relative overflow-hidden flex-shrink-0"
              :class="
                isShuffling
                  ? 'scale-110 shadow-lg shadow-violet-500/30'
                  : 'hover:scale-105'
              "
              title="Click to shuffle!"
            >
              <component
                :is="agentIcon"
                class="w-6 h-6 text-white/80"
                :class="isShuffling ? 'animate-lottery-spin' : ''"
                weight="fill"
              />
              <div
                v-if="isShuffling"
                class="absolute inset-0 pointer-events-none"
              >
                <PhSparkle
                  class="absolute top-0 left-0 w-3 h-3 text-amber-300 animate-sparkle-1"
                  weight="fill"
                />
                <PhSparkle
                  class="absolute top-0 right-0 w-3 h-3 text-amber-300 animate-sparkle-2"
                  weight="fill"
                />
                <PhSparkle
                  class="absolute bottom-0 right-0 w-3 h-3 text-amber-300 animate-sparkle-3"
                  weight="fill"
                />
              </div>
            </button>

            <!-- Editable name -->
            <div class="flex-1 min-w-0" @click.stop>
              <input
                v-model="agentName"
                class="font-bold text-white/90 text-lg bg-transparent border-none outline-none w-full hover:text-white focus:text-white transition-colors"
                @focus="$event.target.select()"
              />
              <p class="text-xs text-white/40 -mt-0.5">tap to rename</p>
            </div>
          </div>

          <!-- Starts when (trigger) - compact -->
          <div class="mb-3 relative">
            <div
              class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all"
              @click.stop="toggleTriggerPicker"
            >
              <span class="text-xs text-white/40">When</span>
              <div
                class="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                :style="{ backgroundColor: currentTrigger.color + '15' }"
              >
                <img
                  :src="currentTrigger.logo"
                  class="w-4 h-4"
                  :alt="currentTrigger.app"
                />
              </div>
              <span class="text-sm text-white/80 font-medium flex-1 truncate">{{
                currentTrigger.label
              }}</span>
              <svg
                class="w-4 h-4 text-white/40 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <!-- Trigger dropdown -->
            <div
              v-if="showTriggerPicker"
              class="absolute top-full left-0 right-0 mt-1 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl z-40 overflow-hidden minimal-scrollbar"
            >
              <div
                class="max-h-[160px] overflow-y-auto minimal-scrollbar p-1.5"
              >
                <button
                  v-for="trigger in allTriggers"
                  :key="trigger.label"
                  @click.stop="selectTrigger(trigger)"
                  class="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 transition-colors text-left"
                  :class="
                    currentTrigger.label === trigger.label ? 'bg-white/10' : ''
                  "
                >
                  <div
                    class="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                    :style="{ backgroundColor: trigger.color + '15' }"
                  >
                    <img
                      :src="trigger.logo"
                      class="w-3 h-3"
                      :alt="trigger.app"
                    />
                  </div>
                  <span class="text-xs text-white/80 flex-1 truncate">{{
                    trigger.label
                  }}</span>
                  <span class="text-[10px] text-white/50">{{
                    trigger.app
                  }}</span>
                </button>
              </div>
              <div
                class="px-2 py-1.5 border-t border-white/10 bg-white/5 text-center"
              >
                <span class="text-[10px] text-white/40"
                  >+ 500 more from 280+ apps</span
                >
              </div>
            </div>
          </div>

          <!-- Instructions -->
          <div class="mb-3 relative">
            <div class="flex items-center gap-2 mb-1.5">
              <label class="text-xs font-medium text-white/50"
                >Instructions</label
              >
              <span
                v-if="isTyping"
                class="text-xs text-violet-400 flex items-center gap-1"
              >
                <span
                  class="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"
                ></span>
                writing...
              </span>
            </div>

            <!-- Watching face -->
            <Transition name="face-pop">
              <div
                v-if="showWatchingFace"
                class="absolute -top-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
              >
                <div
                  class="relative w-12 h-12 bg-gradient-to-br from-amber-500/30 to-yellow-500/30 rounded-full shadow-lg border-2 border-amber-500/30 flex items-center justify-center"
                >
                  <!-- Eyes container -->
                  <div class="flex gap-2">
                    <!-- Left eye -->
                    <div
                      class="w-3 h-3 bg-white rounded-full relative overflow-hidden"
                    >
                      <div
                        class="w-1.5 h-1.5 bg-gray-800 rounded-full absolute transition-all duration-150"
                        :style="{
                          left: `${50 + eyePosition.x * 25}%`,
                          top: `${50 + eyePosition.y * 25}%`,
                          transform: 'translate(-50%, -50%)',
                        }"
                      ></div>
                    </div>
                    <!-- Right eye -->
                    <div
                      class="w-3 h-3 bg-white rounded-full relative overflow-hidden"
                    >
                      <div
                        class="w-1.5 h-1.5 bg-gray-800 rounded-full absolute transition-all duration-150"
                        :style="{
                          left: `${50 + eyePosition.x * 25}%`,
                          top: `${50 + eyePosition.y * 25}%`,
                          transform: 'translate(-50%, -50%)',
                        }"
                      ></div>
                    </div>
                  </div>
                  <!-- Cute blush -->
                  <div
                    class="absolute bottom-2 left-1 w-2 h-1 bg-pink-300/60 rounded-full"
                  ></div>
                  <div
                    class="absolute bottom-2 right-1 w-2 h-1 bg-pink-300/60 rounded-full"
                  ></div>

                  <!-- Floating hearts -->
                  <div class="absolute inset-0 overflow-visible">
                    <PhHeart class="heart-bubble heart-1" weight="fill" />
                    <PhHeart class="heart-bubble heart-2" weight="fill" />
                    <PhHeart class="heart-bubble heart-3" weight="fill" />
                  </div>
                </div>
              </div>
            </Transition>

            <div class="rounded-xl bg-white/5 border border-white/10 h-[80px]">
              <textarea
                ref="textareaRef"
                v-model="editablePrompt"
                :readonly="isTyping"
                class="w-full h-full p-3 bg-transparent text-white/80 text-sm leading-relaxed resize-none border-none outline-none"
                :class="isTyping ? 'cursor-default' : 'cursor-text'"
                @mousedown.stop
                @input="onUserType"
                @focus="onTextareaFocus"
                @blur="onTextareaBlur"
              ></textarea>
            </div>
          </div>

          <!-- Capabilities -->
          <div class="mb-4 overflow-visible">
            <div class="flex items-center gap-2 mb-2">
              <label class="text-xs font-medium text-white/50">Skills</label>
              <span
                v-if="activeCapabilities.length > 0"
                class="text-xs text-white/20"
                >•</span
              >
              <span
                v-if="activeCapabilities.length > 0"
                class="text-xs text-white/40"
                >{{ activeCapabilities.length }}</span
              >
            </div>
            <div class="flex items-center gap-2 h-12">
              <!-- Add button (always visible) -->
              <button
                @click.stop="toggleCapabilityPicker"
                class="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-dashed border-white/20 hover:border-white/40 hover:bg-white/10 text-white/40 hover:text-white/80 transition-all flex-shrink-0"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>

              <!-- Empty state -->
              <div
                v-if="activeCapabilities.length === 0"
                class="flex-1 flex items-center"
              >
                <span class="text-sm text-white/40 italic"
                  >No skills yet — add some!</span
                >
              </div>

              <!-- Scrollable capabilities -->
              <div v-else class="flex-1 relative min-w-0">
                <div
                  class="flex items-center gap-3 overflow-x-auto py-1 minimal-scrollbar pr-6"
                >
                  <div
                    v-for="cap in activeCapabilities"
                    :key="cap.key"
                    class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10 flex-shrink-0 group relative"
                  >
                    <div
                      class="w-6 h-6 rounded-lg flex items-center justify-center"
                      :class="cap.logo ? 'bg-white/10' : cap.bg"
                    >
                      <img
                        v-if="cap.logo"
                        :src="cap.logo"
                        class="w-4 h-4"
                        :alt="cap.name"
                      />
                      <component
                        v-else
                        :is="cap.iconComponent"
                        class="w-4 h-4"
                        :class="cap.iconClass"
                        weight="fill"
                      />
                    </div>
                    <span class="text-sm text-white/80 font-medium">{{
                      cap.name
                    }}</span>
                    <!-- Remove button on hover -->
                    <button
                      @click.stop="removeCapabilityByKey(cap.key)"
                      class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white/30 hover:bg-red-500 text-white/60 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-[10px] font-bold leading-none"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <!-- Gradient fade -->
                <div
                  class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"
                ></div>
              </div>
            </div>
          </div>

          <!-- WTF Explainer overlay -->
          <Transition name="overlay">
            <div
              v-if="showWtfExplainer"
              class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 z-50 flex flex-col rounded-2xl overflow-hidden"
              @click.stop
            >
              <!-- Close button -->
              <button
                @click.stop="showWtfExplainer = false"
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <!-- Content -->
              <div
                class="flex-1 flex flex-col items-center justify-center p-6 text-center"
              >
                <PhBrain
                  class="w-12 h-12 text-violet-400 mb-4 animate-bounce-gentle"
                  weight="fill"
                />
                <h3 class="text-xl font-bold text-white/90 mb-3">
                  How Agents Work
                </h3>

                <div class="space-y-4 max-w-xs">
                  <div class="flex items-start gap-3 text-left">
                    <PhChatCircle
                      class="w-6 h-6 text-violet-400 flex-shrink-0"
                      weight="fill"
                    />
                    <div>
                      <p class="font-semibold text-white/80 text-sm">
                        It thinks
                      </p>
                      <p class="text-xs text-white/50">
                        Analyzes your request and plans the best approach
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3 text-left">
                    <PhLightning
                      class="w-6 h-6 text-amber-400 flex-shrink-0"
                      weight="fill"
                    />
                    <div>
                      <p class="font-semibold text-white/80 text-sm">It acts</p>
                      <p class="text-xs text-white/50">
                        Uses your skills at exactly the right moment
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3 text-left">
                    <PhArrowsClockwise
                      class="w-6 h-6 text-emerald-400 flex-shrink-0"
                      weight="fill"
                    />
                    <div>
                      <p class="font-semibold text-white/80 text-sm">
                        It iterates
                      </p>
                      <p class="text-xs text-white/50">
                        Reviews results and adjusts until it's right
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  @click.stop="showWtfExplainer = false"
                  class="mt-6 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  Got it! <PhThumbsUp class="w-4 h-4" weight="fill" />
                </button>
              </div>
            </div>
          </Transition>

          <!-- Capability picker overlay -->
          <Transition name="overlay">
            <div
              v-if="showCapabilityPicker"
              class="absolute inset-0 bg-gray-900/95 backdrop-blur-lg z-50 flex flex-col rounded-2xl"
              @click.stop
            >
              <!-- Header -->
              <div
                class="flex items-center justify-between px-4 py-3 border-b border-white/10"
              >
                <p class="font-bold text-white/90">Add Skills</p>
                <button
                  @click.stop="showCapabilityPicker = false"
                  class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 transition-colors"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Content -->
              <div class="flex-1 overflow-y-auto minimal-scrollbar p-4">
                <div class="grid grid-cols-2 gap-2 pb-8">
                  <!-- All capabilities (AI + Apps unified) -->
                  <button
                    v-for="cap in allCapabilitiesUnified"
                    :key="cap.key"
                    @click.stop="toggleCapability(cap)"
                    class="flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left"
                    :class="
                      activeCapabilitiesKeys.includes(cap.key)
                        ? 'border-violet-400 bg-violet-500/20'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                    "
                  >
                    <div
                      class="w-9 h-9 rounded-lg flex items-center justify-center"
                      :class="cap.logo ? 'bg-white/10' : cap.bg"
                    >
                      <img
                        v-if="cap.logo"
                        :src="cap.logo"
                        class="w-5 h-5"
                        :alt="cap.name"
                      />
                      <component
                        v-else
                        :is="cap.iconComponent"
                        class="w-5 h-5"
                        :class="cap.iconClass"
                        weight="fill"
                      />
                    </div>
                    <span class="text-sm text-white/80 font-medium flex-1">{{
                      cap.name
                    }}</span>
                    <svg
                      v-if="activeCapabilitiesKeys.includes(cap.key)"
                      class="w-4 h-4 text-violet-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Bottom gradient fade (outside scrollable area) -->
              <div
                class="absolute bottom-14 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"
              ></div>

              <!-- Footer -->
              <div class="px-4 py-3 border-t border-white/10 flex justify-end">
                <button
                  @click.stop="showCapabilityPicker = false"
                  class="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </Transition>

          <!-- Launch button -->
          <button
            @click="launchAgent"
            :disabled="isTyping"
            class="relative w-full py-3 rounded-xl font-semibold text-sm transition-all overflow-hidden"
            :class="
              isTyping
                ? 'bg-white/5 text-white/30'
                : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/25 active:scale-[0.98]'
            "
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              Preview Launch →
            </span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- LAUNCHED SUCCESS SCREEN -->
    <Transition name="celebration">
      <div v-if="agentLaunched" class="absolute inset-0 z-30">
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="w-72 h-72 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse-gentle"
          ></div>
        </div>

        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <span
            v-for="i in 15"
            :key="'c-' + i"
            class="absolute confetti-particle"
            :style="{
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 0.5 + 's',
              '--drift': (Math.random() - 0.5) * 100 + 'px',
            }"
          >
            <component
              :is="confettiIcons[i % confettiIcons.length]"
              class="w-5 h-5"
              :class="confettiColors[i % confettiColors.length]"
              weight="fill"
            />
          </span>
        </div>

        <div
          class="relative h-full flex flex-col items-center justify-center text-center p-6"
        >
          <div class="celebration-pop">
            <div class="relative mb-4">
              <div
                class="blur-lg opacity-30 absolute inset-0 flex items-center justify-center"
              >
                <component
                  :is="agentIcon"
                  class="w-16 h-16 text-white"
                  weight="fill"
                />
              </div>
              <div class="animate-bounce-gentle relative">
                <component
                  :is="agentIcon"
                  class="w-16 h-16 text-white"
                  weight="fill"
                />
              </div>
            </div>
          </div>

          <h2
            class="font-bold text-white/90 text-2xl mb-2 flex items-center gap-2"
          >
            Agent Launched!
            <PhConfetti class="w-6 h-6 text-pink-400" weight="fill" />
          </h2>
          <p class="text-violet-400 font-medium mb-5">
            {{ agentName }} is now live
          </p>

          <div
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-emerald-500/30 rotate-[-2deg] group relative cursor-default"
          >
            <span
              class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse group-hover:bg-gray-400"
            ></span>
            <span
              class="text-white/80 font-medium text-sm group-hover:line-through group-hover:text-white/40 transition-all"
              >Running in background</span
            >
            <!-- Tooltip -->
            <span
              class="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              not really, just showing off 😉
            </span>
          </div>

          <button
            @click="reset"
            class="mt-8 px-5 py-2 text-white/50 hover:text-white font-medium transition-colors flex items-center gap-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Build another agent
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, markRaw } from "vue";
import {
  PhEnvelope,
  PhCalendar,
  PhMagnifyingGlass,
  PhPaintBrush,
  PhUser,
  PhMusicNote,
  PhRobot,
  PhBrain,
  PhLightning,
  PhRocket,
  PhTarget,
  PhFire,
  PhLightbulb,
  PhDiamond,
  PhStar,
  PhSparkle,
  PhHeart,
  PhConfetti,
  PhThumbsUp,
  PhChatCircle,
  PhArrowsClockwise,
  PhPuzzlePiece,
  PhCpu,
  PhCode,
  PhGlobe,
  PhGhost,
  PhAlien,
  PhMagicWand,
  PhCrown,
  PhFlower,
} from "@phosphor-icons/vue";

const textareaRef = ref(null);
const containerRef = ref(null);

// Watching face state
const showWatchingFace = ref(false);
const eyePosition = ref({ x: 0, y: 0.5 }); // Looking down at text
let watchingFaceTimeout = null;
let eyeAnimationInterval = null;

const onUserType = () => {
  if (isTyping.value) return; // Don't show during auto-typing

  showWatchingFace.value = true;

  // Animate eyes looking at different positions (simulating reading)
  eyePosition.value = {
    x: (Math.random() - 0.5) * 1.5,
    y: 0.5 + Math.random() * 0.3,
  };

  // Reset hide timer
  if (watchingFaceTimeout) clearTimeout(watchingFaceTimeout);
  watchingFaceTimeout = setTimeout(() => {
    showWatchingFace.value = false;
  }, 1500);
};

const onTextareaFocus = () => {
  if (isTyping.value) return;
  // Show face briefly on focus
  showWatchingFace.value = true;
  eyePosition.value = { x: 0, y: 0.5 };

  if (watchingFaceTimeout) clearTimeout(watchingFaceTimeout);
  watchingFaceTimeout = setTimeout(() => {
    if (!editablePrompt.value) return; // Keep showing if empty
    showWatchingFace.value = false;
  }, 2000);
};

const onTextareaBlur = () => {
  if (watchingFaceTimeout) clearTimeout(watchingFaceTimeout);
  watchingFaceTimeout = setTimeout(() => {
    showWatchingFace.value = false;
  }, 500);
};

// Avatar - fun icon lottery
const agentIcon = ref(markRaw(PhRobot));
const isShuffling = ref(false);
const allIcons = [
  markRaw(PhRobot),
  markRaw(PhBrain),
  markRaw(PhLightning),
  markRaw(PhRocket),
  markRaw(PhTarget),
  markRaw(PhFire),
  markRaw(PhLightbulb),
  markRaw(PhPaintBrush),
  markRaw(PhDiamond),
  markRaw(PhStar),
  markRaw(PhPuzzlePiece),
  markRaw(PhCpu),
  markRaw(PhCode),
  markRaw(PhGlobe),
  markRaw(PhGhost),
  markRaw(PhAlien),
  markRaw(PhMagicWand),
  markRaw(PhCrown),
  markRaw(PhFlower),
];

// Confetti configuration
const confettiIcons = [
  markRaw(PhSparkle),
  markRaw(PhConfetti),
  markRaw(PhHeart),
  markRaw(PhStar),
  markRaw(PhRocket),
];
const confettiColors = [
  "text-amber-300",
  "text-pink-400",
  "text-violet-400",
  "text-yellow-300",
  "text-blue-400",
];

let shuffleInterval = null;

const shuffleIcon = () => {
  if (isShuffling.value) return;
  isShuffling.value = true;
  let count = 0;
  const totalSpins = 12 + Math.floor(Math.random() * 8);
  let speed = 50;

  const spin = () => {
    agentIcon.value = allIcons[Math.floor(Math.random() * allIcons.length)];
    count++;
    if (count > totalSpins - 4) speed += 50;
    if (count < totalSpins) {
      shuffleInterval = setTimeout(spin, speed);
    } else {
      isShuffling.value = false;
    }
  };
  spin();
};

const agents = [
  {
    id: "deal",
    name: "Inbox Deal Qualifier",
    iconComponent: markRaw(PhEnvelope),
    iconClass: "text-amber-400",
    brief: "Auto-qualify leads from emails",
    prompt:
      "Figure out if this email is a potential sales opportunity. Extract company name, intent, and recommend next action.",
    tools: ["gmail", "hubspot", "web-search"],
    triggerIdx: 0, // New email arrives (Gmail)
  },
  {
    id: "meeting",
    name: "Meeting Follow-Up",
    iconComponent: markRaw(PhCalendar),
    iconClass: "text-blue-400",
    brief: "Auto-summarize & create tasks",
    prompt:
      "Summarize key decisions and action items from this meeting. Create tasks and send follow-ups automatically.",
    tools: ["google-calendar", "slack", "notion"],
    triggerIdx: 2, // Meeting ends (Calendar)
  },
  {
    id: "research",
    name: "Smart Lead Researcher",
    iconComponent: markRaw(PhMagnifyingGlass),
    iconClass: "text-emerald-400",
    brief: "Instant research & outreach",
    prompt:
      "Research this company thoroughly. Find recent news, funding info, and draft a personalized outreach message.",
    tools: ["hubspot", "web-search", "contact-enrich"],
    triggerIdx: 4, // New contact added (HubSpot)
  },
];

// App definitions with real logos from CDN
const apps = {
  gmail: {
    name: "Gmail",
    logo: "https://cdn.activepieces.com/pieces/gmail.png",
    color: "#EA4335",
  },
  slack: {
    name: "Slack",
    logo: "https://cdn.activepieces.com/pieces/slack.png",
    color: "#4A154B",
  },
  notion: {
    name: "Notion",
    logo: "https://cdn.activepieces.com/pieces/notion.png",
    color: "#000000",
  },
  hubspot: {
    name: "HubSpot",
    logo: "https://cdn.activepieces.com/pieces/hubspot.png",
    color: "#FF7A59",
  },
  "google-calendar": {
    name: "Calendar",
    logo: "https://cdn.activepieces.com/pieces/google-calendar.png",
    color: "#4285F4",
  },
  "google-sheets": {
    name: "Sheets",
    logo: "https://cdn.activepieces.com/pieces/google-sheets.png",
    color: "#0F9D58",
  },
  google: {
    name: "Google",
    logo: "https://cdn.activepieces.com/pieces/google.png",
    color: "#4285F4",
  },
  openai: {
    name: "OpenAI",
    logo: "https://cdn.activepieces.com/pieces/openai.png",
    color: "#10A37F",
  },
  airtable: {
    name: "Airtable",
    logo: "https://cdn.activepieces.com/pieces/airtable.png",
    color: "#18BFFF",
  },
  discord: {
    name: "Discord",
    logo: "https://cdn.activepieces.com/pieces/discord.png",
    color: "#5865F2",
  },
  trello: {
    name: "Trello",
    logo: "https://cdn.activepieces.com/pieces/trello.png",
    color: "#0079BF",
  },
  asana: {
    name: "Asana",
    logo: "https://cdn.activepieces.com/pieces/asana.png",
    color: "#F06A6A",
  },
  github: {
    name: "GitHub",
    logo: "https://cdn.activepieces.com/pieces/github.png",
    color: "#181717",
  },
  stripe: {
    name: "Stripe",
    logo: "https://cdn.activepieces.com/pieces/stripe.png",
    color: "#635BFF",
  },
  shopify: {
    name: "Shopify",
    logo: "https://cdn.activepieces.com/pieces/shopify.png",
    color: "#96BF48",
  },
  typeform: {
    name: "Typeform",
    logo: "https://cdn.activepieces.com/pieces/typeform.png",
    color: "#262627",
  },
  zendesk: {
    name: "Zendesk",
    logo: "https://cdn.activepieces.com/pieces/zendesk.png",
    color: "#03363D",
  },
  schedule: {
    name: "Schedule",
    logo: "https://cdn.activepieces.com/pieces/schedule.png",
    color: "#6366F1",
  },
  linear: {
    name: "Linear",
    logo: "https://cdn.activepieces.com/pieces/linear.png",
    color: "#5E6AD2",
  },
  intercom: {
    name: "Intercom",
    logo: "https://cdn.activepieces.com/pieces/intercom.png",
    color: "#1F8DED",
  },
};

// All available triggers from different apps
const allTriggers = [
  {
    label: "New email arrives",
    app: "Gmail",
    logo: apps.gmail.logo,
    color: apps.gmail.color,
  },
  {
    label: "Message received",
    app: "Slack",
    logo: apps.slack.logo,
    color: apps.slack.color,
  },
  {
    label: "Meeting ends",
    app: "Calendar",
    logo: apps["google-calendar"].logo,
    color: apps["google-calendar"].color,
  },
  {
    label: "Form submitted",
    app: "Typeform",
    logo: apps.typeform.logo,
    color: apps.typeform.color,
  },
  {
    label: "New contact added",
    app: "HubSpot",
    logo: apps.hubspot.logo,
    color: apps.hubspot.color,
  },
  {
    label: "Ticket created",
    app: "Zendesk",
    logo: apps.zendesk.logo,
    color: apps.zendesk.color,
  },
  {
    label: "Row added",
    app: "Sheets",
    logo: apps["google-sheets"].logo,
    color: apps["google-sheets"].color,
  },
  {
    label: "New order",
    app: "Shopify",
    logo: apps.shopify.logo,
    color: apps.shopify.color,
  },
  {
    label: "Payment received",
    app: "Stripe",
    logo: apps.stripe.logo,
    color: apps.stripe.color,
  },
  {
    label: "Every day at 9am",
    app: "Schedule",
    logo: apps.schedule.logo,
    color: apps.schedule.color,
  },
];

// AI Capabilities (not just apps)
const aiCapabilities = [
  {
    key: "web-search",
    name: "Web Search",
    iconComponent: markRaw(PhMagnifyingGlass),
    iconClass: "text-blue-400",
    bg: "bg-blue-500/20",
  },
  {
    key: "image-gen",
    name: "Image Generation",
    iconComponent: markRaw(PhPaintBrush),
    iconClass: "text-pink-400",
    bg: "bg-pink-500/20",
  },
  {
    key: "contact-enrich",
    name: "Contact Enrichment",
    iconComponent: markRaw(PhUser),
    iconClass: "text-green-400",
    bg: "bg-green-500/20",
  },
  {
    key: "audio-gen",
    name: "Generate Audio",
    iconComponent: markRaw(PhMusicNote),
    iconClass: "text-purple-400",
    bg: "bg-purple-500/20",
  },
];

// All app capabilities
const allCapabilitiesList = [
  "gmail",
  "slack",
  "notion",
  "hubspot",
  "google-calendar",
  "google-sheets",
  "airtable",
  "discord",
  "trello",
  "asana",
  "github",
  "stripe",
  "linear",
  "intercom",
];

const selectedAgent = ref(null);
const agentName = ref("");
const editablePrompt = ref("");
const isTyping = ref(false);
const agentLaunched = ref(false);
const showTriggerPicker = ref(false);
const showCapabilityPicker = ref(false);
const showWtfExplainer = ref(false);
const currentTrigger = ref(allTriggers[0]);
const activeCapabilitiesKeys = ref([]);

let typingInterval = null;

// Convert capability keys to objects with name and logo
const activeCapabilities = computed(() =>
  activeCapabilitiesKeys.value.map((key) => {
    // Check if it's an AI capability
    const aiCap = aiCapabilities.find((c) => c.key === key);
    if (aiCap) {
      return {
        name: aiCap.name,
        logo: null,
        iconComponent: aiCap.iconComponent,
        iconClass: aiCap.iconClass,
        bg: aiCap.bg,
        key,
      };
    }
    // Otherwise it's an app
    return { name: apps[key]?.name || key, logo: apps[key]?.logo, key };
  })
);

// All app capabilities (for the full overlay)
const allAppCapabilities = computed(() =>
  allCapabilitiesList.map((key) => ({
    name: apps[key]?.name || key,
    logo: apps[key]?.logo,
    key,
  }))
);

// Unified list (AI + Apps together)
const allCapabilitiesUnified = computed(() => [
  ...aiCapabilities,
  ...allAppCapabilities.value,
]);

// Available app capabilities (not already selected)
const availableAppCapabilities = computed(() =>
  allCapabilitiesList
    .filter((key) => !activeCapabilitiesKeys.value.includes(key))
    .map((key) => ({
      name: apps[key]?.name || key,
      logo: apps[key]?.logo,
      key,
    }))
);

// Close dropdowns on any click, then let specific handlers re-open
const handleGlobalClick = () => {
  showTriggerPicker.value = false;
  showCapabilityPicker.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleGlobalClick);
});

const toggleTriggerPicker = () => {
  const wasOpen = showTriggerPicker.value;
  // Close will happen from global click, then we re-open
  setTimeout(() => {
    showTriggerPicker.value = !wasOpen;
    showCapabilityPicker.value = false;
  }, 0);
};

const toggleCapabilityPicker = () => {
  const wasOpen = showCapabilityPicker.value;
  setTimeout(() => {
    showCapabilityPicker.value = !wasOpen;
    showTriggerPicker.value = false;
  }, 0);
};

const selectAgent = (agent) => {
  selectedAgent.value = agent;
  agentName.value = agent.name;
  agentIcon.value = allIcons[Math.floor(Math.random() * allIcons.length)];
  activeCapabilitiesKeys.value = [...agent.tools];
  currentTrigger.value = allTriggers[agent.triggerIdx || 0];
  editablePrompt.value = "";
  showTriggerPicker.value = false;
  showCapabilityPicker.value = false;
  typeText(agent.prompt);
};

const typeText = (text) => {
  if (typingInterval) clearInterval(typingInterval);
  isTyping.value = true;
  editablePrompt.value = "";
  let i = 0;

  typingInterval = setInterval(() => {
    if (i < text.length) {
      editablePrompt.value += text[i];
      i++;
    } else {
      clearInterval(typingInterval);
      typingInterval = null;
      isTyping.value = false;
    }
  }, 20);
};

const selectTrigger = (trigger) => {
  currentTrigger.value = trigger;
  showTriggerPicker.value = false;
};

const addCapability = (cap) => {
  if (!activeCapabilitiesKeys.value.includes(cap.key)) {
    activeCapabilitiesKeys.value.push(cap.key);
  }
};

const toggleCapability = (cap) => {
  if (activeCapabilitiesKeys.value.includes(cap.key)) {
    activeCapabilitiesKeys.value = activeCapabilitiesKeys.value.filter(
      (k) => k !== cap.key
    );
  } else {
    activeCapabilitiesKeys.value.push(cap.key);
  }
};

const removeCapability = (capName) => {
  // Find by name in apps
  const appKey = Object.keys(apps).find((k) => apps[k].name === capName);
  if (appKey) {
    activeCapabilitiesKeys.value = activeCapabilitiesKeys.value.filter(
      (k) => k !== appKey
    );
    return;
  }
  // Find by name in AI capabilities
  const aiCap = aiCapabilities.find((c) => c.name === capName);
  if (aiCap) {
    activeCapabilitiesKeys.value = activeCapabilitiesKeys.value.filter(
      (k) => k !== aiCap.key
    );
  }
};

const removeCapabilityByKey = (key) => {
  activeCapabilitiesKeys.value = activeCapabilitiesKeys.value.filter(
    (k) => k !== key
  );
};

const launchAgent = () => {
  agentLaunched.value = true;
};

const goBack = () => {
  if (typingInterval) clearInterval(typingInterval);
  if (shuffleInterval) clearTimeout(shuffleInterval);
  selectedAgent.value = null;
  editablePrompt.value = "";
  isTyping.value = false;
  isShuffling.value = false;
  showTriggerPicker.value = false;
  showCapabilityPicker.value = false;
  showWtfExplainer.value = false;
};

const reset = () => {
  if (typingInterval) clearInterval(typingInterval);
  if (shuffleInterval) clearTimeout(shuffleInterval);
  agentLaunched.value = false;
  selectedAgent.value = null;
  editablePrompt.value = "";
  isTyping.value = false;
  isShuffling.value = false;
  agentIcon.value = markRaw(PhRobot);
  agentName.value = "";
  activeCapabilitiesKeys.value = [];
  showTriggerPicker.value = false;
  showCapabilityPicker.value = false;
};
</script>

<style scoped>
/* Gentle animations */
.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

@keyframes pulse-gentle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.animate-bounce-gentle {
  animation: bounce-gentle 2s ease-in-out infinite;
}

@keyframes bounce-gentle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Transitions */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.35s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.slide-up-enter-active {
  transition: all 0.35s ease;
}

.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.celebration-enter-active {
  transition: all 0.4s ease;
}

.celebration-leave-active {
  transition: all 0.25s ease;
}

.celebration-enter-from,
.celebration-leave-to {
  opacity: 0;
}

.celebration-pop {
  animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Lottery spin animation */
.animate-lottery-spin {
  animation: lottery-spin 0.1s ease-in-out infinite;
}

@keyframes lottery-spin {
  0%,
  100% {
    transform: scale(1) rotate(-3deg);
  }
  50% {
    transform: scale(1.1) rotate(3deg);
  }
}

/* Sparkle animations */
.animate-sparkle-1 {
  animation: sparkle-float 0.5s ease-in-out infinite;
}
.animate-sparkle-2 {
  animation: sparkle-float 0.5s ease-in-out infinite 0.1s;
}
.animate-sparkle-3 {
  animation: sparkle-float 0.5s ease-in-out infinite 0.2s;
}
.animate-sparkle-4 {
  animation: sparkle-float 0.5s ease-in-out infinite 0.3s;
}

@keyframes sparkle-float {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes pop-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Confetti */
.confetti-particle {
  animation: confetti-fall 2.5s ease-out forwards;
  position: absolute;
  top: -20px;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(380px) rotate(360deg) translateX(var(--drift))
      scale(0.6);
    opacity: 0;
  }
}

/* Dropdown transitions */
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}
.dropdown-leave-active {
  transition: all 0.15s ease-in;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Overlay transition */
.overlay-enter-active {
  transition: all 0.25s ease-out;
}
.overlay-leave-active {
  transition: all 0.2s ease-in;
}
.overlay-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.overlay-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* Watching face pop animation */
.face-pop-enter-active {
  animation: face-bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.5);
}
.face-pop-leave-active {
  animation: face-fade-out 0.3s ease-out forwards;
}

@keyframes face-bounce-in {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.5);
  }
  70% {
    transform: translateX(-50%) translateY(-5px) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes face-fade-out {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px) scale(0.8);
  }
}

/* Floating hearts */
.heart-bubble {
  position: absolute;
  width: 12px;
  height: 12px;
  color: #f472b6;
  opacity: 0;
  animation: heart-float 2s ease-out infinite;
}

.heart-1 {
  left: 20%;
  animation-delay: 0s;
}
.heart-2 {
  left: 50%;
  animation-delay: 0.7s;
}
.heart-3 {
  left: 80%;
  animation-delay: 1.4s;
}

@keyframes heart-float {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  20% {
    opacity: 0.8;
    transform: translateY(-8px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-35px) scale(0.7);
  }
}

/* Comic text effect */
.comic-text {
  text-shadow: 1px 1px 0 #c4b5fd, 2px 2px 0 #a78bfa, -1px -1px 0 #ede9fe;
  letter-spacing: 0.5px;
}

/* Minimal scrollbar styling */
.minimal-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.minimal-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.minimal-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.minimal-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Firefox */
.minimal-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
</style>
