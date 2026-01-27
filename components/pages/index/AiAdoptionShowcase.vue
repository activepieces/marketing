<template>
  <section ref="sectionRef" class="relative pt-24 pb-0 overflow-hidden">
    <!-- Dark purple background -->
    <div class="absolute inset-0 bg-[#483e97]"></div>

    <div class="relative max-w-7xl mx-auto px-4">
      <!-- Centered header section -->
      <div class="flex flex-col items-center text-center mb-16">
        <!-- Pill button -->
        <PagesIndexSectionBadge
          to="/product/ai-adoption"
          label="Explore AI Adoption"
          variant="dark"
          class="mb-8"
        />

        <!-- Heading -->
        <h2
          class="font-sentient font-bold text-white text-4xl lg:text-5xl mb-4"
        >
          Turn your entire<br />org into AI builders
        </h2>

        <!-- Subtitle -->
        <p class="text-xl text-white/80">
          Everything to drive AI adoption from day one.
        </p>
      </div>

      <!-- Card stack with decorative background cards -->
      <div class="relative mt-32" style="height: 520px">
        <!-- Overflow wrapper - clips bottom only, room for shadows and animation -->
        <div
          class="absolute inset-0 overflow-hidden"
          style="
            padding-top: 140px;
            padding-right: 120px;
            padding-left: 80px;
            margin-top: -140px;
            margin-right: -120px;
            margin-left: -80px;
          "
        >
          <!-- Card stack container -->
          <div
            class="relative w-full h-full"
            style="padding-top: 120px; padding-left: 80px"
          >
            <!-- All 4 cards - subtle tilt, titles visible -->
            <div
              v-for="(card, index) in cards"
              :key="card.id"
              class="absolute left-0 w-[calc(100%-120px)] rounded-t-xl overflow-hidden cursor-pointer transition-all duration-500"
              style="height: 680px; top: 0"
              :class="[activeCard === index ? 'card-active' : 'card-stacked']"
              :style="getCardStyle(index)"
              @click="selectCard(index)"
            >
              <!-- Window frame -->
              <div
                class="absolute inset-0 rounded-t-xl overflow-hidden bg-white border border-gray-200 border-b-0 shadow-sm flex flex-col"
              >
                <!-- Title bar - just icon and title -->
                <div
                  class="flex items-center gap-2.5 px-4 border-b border-gray-100 transition-all duration-300 flex-shrink-0"
                  :class="
                    activeCard === index
                      ? 'py-2.5 bg-gray-50'
                      : 'py-2 bg-gray-100'
                  "
                >
                  <!-- Icon + Title -->
                  <div
                    class="flex items-center gap-2 transition-all duration-300"
                    :class="activeCard === index ? 'opacity-100' : 'opacity-75'"
                  >
                    <div
                      class="rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0"
                      :class="activeCard === index ? 'w-5 h-5' : 'w-4 h-4'"
                      :style="{ backgroundColor: card.iconBg }"
                    >
                      <component
                        :is="card.icon"
                        class="text-white transition-all duration-300"
                        :class="
                          activeCard === index ? 'w-3 h-3' : 'w-2.5 h-2.5'
                        "
                        weight="fill"
                      />
                    </div>
                    <span
                      class="font-medium text-gray-700 transition-all duration-300"
                      :class="activeCard === index ? 'text-sm' : 'text-xs'"
                    >
                      {{ card.title }}
                    </span>
                  </div>
                </div>

                <!-- Window content - different content for each card -->
                <div
                  class="flex-1 overflow-hidden"
                  :class="card.id === 'branding' ? 'p-0' : 'p-4 bg-gray-50'"
                >
                  <!-- Templates Card Content - Agent Library browser -->
                  <div
                    v-if="card.id === 'templates'"
                    class="h-full flex flex-col"
                  >
                    <!-- Header row -->
                    <div class="flex items-center justify-between mb-4">
                      <!-- Category toggle -->
                      <div class="flex items-center gap-1.5">
                        <span
                          class="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-gray-900 text-white"
                          >All</span
                        >
                        <span
                          class="px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-400"
                          >Everyday</span
                        >
                        <span
                          class="px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-400"
                          >Sales</span
                        >
                        <span
                          class="px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-400"
                          >Marketing</span
                        >
                        <span
                          class="px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-400"
                          >Support</span
                        >
                      </div>
                      <!-- Search placeholder -->
                      <div
                        class="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-gray-200"
                      >
                        <div class="w-3.5 h-3.5 rounded bg-gray-200"></div>
                        <div class="h-3 bg-gray-100 rounded w-16"></div>
                      </div>
                    </div>

                    <!-- Content area -->
                    <div class="flex-1 space-y-4">
                      <!-- Everyday -->
                      <div>
                        <span
                          class="text-xs font-semibold text-violet-600 mb-2.5 block"
                          >Everyday</span
                        >
                        <div class="grid grid-cols-3 gap-3">
                          <!-- Real agents -->
                          <div
                            class="bg-white rounded-xl p-3.5 border border-gray-200"
                          >
                            <h4
                              class="font-semibold text-gray-900 text-[13px] mb-2.5"
                            >
                              Meeting Summarizer
                            </h4>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <img
                                  src="https://cdn.activepieces.com/pieces/google-calendar.png"
                                  class="w-5 h-5 rounded-md"
                                />
                                <img
                                  src="https://cdn.activepieces.com/pieces/notion.png"
                                  class="w-5 h-5 rounded-md"
                                />
                                <img
                                  src="https://cdn.activepieces.com/pieces/openai.png"
                                  class="w-5 h-5 rounded-md"
                                />
                              </div>
                              <span
                                class="text-[11px] font-medium text-emerald-600"
                                >Save $2.1k/yr</span
                              >
                            </div>
                          </div>
                          <div
                            class="bg-white rounded-xl p-3.5 border border-gray-200"
                          >
                            <h4
                              class="font-semibold text-gray-900 text-[13px] mb-2.5"
                            >
                              Inbox Zero Bot
                            </h4>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <img
                                  src="https://cdn.activepieces.com/pieces/gmail.png"
                                  class="w-5 h-5 rounded-md"
                                />
                                <img
                                  src="https://cdn.activepieces.com/pieces/openai.png"
                                  class="w-5 h-5 rounded-md"
                                />
                              </div>
                              <span
                                class="text-[11px] font-medium text-emerald-600"
                                >Save $1.8k/yr</span
                              >
                            </div>
                          </div>
                          <div
                            class="bg-white rounded-xl p-3.5 border border-gray-200"
                          >
                            <h4
                              class="font-semibold text-gray-900 text-[13px] mb-2.5"
                            >
                              Deadline Tracker
                            </h4>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <img
                                  src="https://cdn.activepieces.com/pieces/notion.png"
                                  class="w-5 h-5 rounded-md"
                                />
                                <img
                                  src="https://cdn.activepieces.com/pieces/slack.png"
                                  class="w-5 h-5 rounded-md"
                                />
                                <img
                                  src="https://cdn.activepieces.com/pieces/google-calendar.png"
                                  class="w-5 h-5 rounded-md"
                                />
                              </div>
                              <span
                                class="text-[11px] font-medium text-emerald-600"
                                >Save $1.5k/yr</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Sales -->
                      <div>
                        <span
                          class="text-xs font-semibold text-gray-500 mb-2.5 block"
                          >Sales</span
                        >
                        <div class="grid grid-cols-3 gap-3">
                          <!-- Real agents -->
                          <div
                            class="bg-white rounded-xl p-3.5 border border-gray-200"
                          >
                            <h4
                              class="font-semibold text-gray-900 text-[13px] mb-2.5"
                            >
                              Lead Scorer
                            </h4>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <img
                                  src="https://cdn.activepieces.com/pieces/hubspot.png"
                                  class="w-5 h-5 rounded-md"
                                />
                                <img
                                  src="https://cdn.activepieces.com/pieces/openai.png"
                                  class="w-5 h-5 rounded-md"
                                />
                              </div>
                              <span
                                class="text-[11px] font-medium text-emerald-600"
                                >Save $19.9k/yr</span
                              >
                            </div>
                          </div>
                          <div
                            class="bg-white rounded-xl p-3.5 border border-gray-200"
                          >
                            <h4
                              class="font-semibold text-gray-900 text-[13px] mb-2.5"
                            >
                              Deal Closer
                            </h4>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <img
                                  src="https://cdn.activepieces.com/pieces/salesforce.png"
                                  class="w-5 h-5 rounded-md"
                                />
                                <img
                                  src="https://cdn.activepieces.com/pieces/slack.png"
                                  class="w-5 h-5 rounded-md"
                                />
                                <img
                                  src="https://cdn.activepieces.com/pieces/gmail.png"
                                  class="w-5 h-5 rounded-md"
                                />
                              </div>
                              <span
                                class="text-[11px] font-medium text-emerald-600"
                                >Save $8.4k/yr</span
                              >
                            </div>
                          </div>
                          <!-- Placeholder -->
                          <div
                            class="bg-white rounded-xl p-3.5 border border-gray-100"
                          >
                            <div
                              class="h-3.5 bg-gray-100 rounded w-20 mb-2.5"
                            ></div>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-100"
                                ></div>
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-50"
                                ></div>
                              </div>
                              <div class="h-3 bg-gray-50 rounded w-16"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Marketing -->
                      <div>
                        <span
                          class="text-xs font-semibold text-gray-500 mb-2.5 block"
                          >Marketing</span
                        >
                        <div class="grid grid-cols-3 gap-3">
                          <!-- All placeholders -->
                          <div
                            v-for="n in 3"
                            :key="'mkt-ph-' + n"
                            class="bg-white rounded-xl p-3.5 border border-gray-100"
                          >
                            <div
                              class="h-3.5 bg-gray-100 rounded w-24 mb-2.5"
                            ></div>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-100"
                                ></div>
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-50"
                                ></div>
                              </div>
                              <div class="h-3 bg-gray-50 rounded w-14"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Support -->
                      <div>
                        <span
                          class="text-xs font-semibold text-gray-500 mb-2.5 block"
                          >Support</span
                        >
                        <div class="grid grid-cols-3 gap-3">
                          <!-- All placeholders -->
                          <div
                            class="bg-white rounded-xl p-3.5 border border-gray-100"
                          >
                            <div
                              class="h-3.5 bg-gray-100 rounded w-20 mb-2.5"
                            ></div>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-100"
                                ></div>
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-50"
                                ></div>
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-50"
                                ></div>
                              </div>
                              <div class="h-3 bg-gray-50 rounded w-16"></div>
                            </div>
                          </div>
                          <div
                            class="bg-white rounded-xl p-3.5 border border-gray-100"
                          >
                            <div
                              class="h-3.5 bg-gray-100 rounded w-24 mb-2.5"
                            ></div>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-100"
                                ></div>
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-50"
                                ></div>
                              </div>
                              <div class="h-3 bg-gray-50 rounded w-14"></div>
                            </div>
                          </div>
                          <div
                            class="bg-white rounded-xl p-3.5 border border-gray-100"
                          >
                            <div
                              class="h-3.5 bg-gray-100 rounded w-16 mb-2.5"
                            ></div>
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-1.5">
                                <div
                                  class="w-5 h-5 rounded-md bg-gray-100"
                                ></div>
                              </div>
                              <div class="h-3 bg-gray-50 rounded w-14"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Analytics Card Content -->
                  <div
                    v-if="card.id === 'analytics'"
                    class="h-full flex flex-col"
                  >
                    <!-- Header with time toggle -->
                    <div class="flex items-center justify-end mb-4">
                      <!-- Time period toggle -->
                      <div
                        class="flex items-center bg-gray-100 rounded-lg p-0.5"
                      >
                        <span
                          class="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-white text-gray-900 shadow-sm"
                        >
                          This Week
                        </span>
                        <span
                          class="px-2.5 py-1 text-[10px] font-semibold rounded-md text-gray-400"
                        >
                          This Month
                        </span>
                        <span
                          class="px-2.5 py-1 text-[10px] font-semibold rounded-md text-gray-400"
                        >
                          All Time
                        </span>
                      </div>
                    </div>

                    <div class="flex-1 flex gap-4">
                      <!-- Left column - Adoption rates & Team breakdown -->
                      <div class="w-[260px] flex flex-col gap-4">
                        <!-- AI Adoption Rate Card -->
                        <div
                          class="bg-white rounded-xl p-4 border border-gray-200/80"
                        >
                          <div class="mb-4">
                            <span class="text-gray-700 font-medium text-xs"
                              >AI Adoption Rate</span
                            >
                          </div>
                          <!-- Circular progress rings -->
                          <div class="flex items-center justify-center gap-8">
                            <!-- Individuals ring -->
                            <div class="flex flex-col items-center">
                              <div class="relative w-[72px] h-[72px]">
                                <svg
                                  class="w-full h-full -rotate-90"
                                  viewBox="0 0 72 72"
                                >
                                  <circle
                                    cx="36"
                                    cy="36"
                                    r="30"
                                    fill="none"
                                    stroke="#f3f4f6"
                                    stroke-width="5"
                                  />
                                  <circle
                                    cx="36"
                                    cy="36"
                                    r="30"
                                    fill="none"
                                    stroke="url(#individualsGradient)"
                                    stroke-width="5"
                                    stroke-linecap="round"
                                    stroke-dasharray="188.5"
                                    stroke-dashoffset="17"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="individualsGradient"
                                      x1="0%"
                                      y1="0%"
                                      x2="100%"
                                      y2="0%"
                                    >
                                      <stop offset="0%" stop-color="#8b5cf6" />
                                      <stop
                                        offset="100%"
                                        stop-color="#a78bfa"
                                      />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <div
                                  class="absolute inset-0 flex items-center justify-center"
                                >
                                  <span
                                    class="text-base font-bold text-gray-900"
                                    >91%</span
                                  >
                                </div>
                              </div>
                              <span
                                class="text-[11px] text-gray-500 font-medium mt-2"
                                >Individuals</span
                              >
                            </div>
                            <!-- Teams ring -->
                            <div class="flex flex-col items-center">
                              <div class="relative w-[72px] h-[72px]">
                                <svg
                                  class="w-full h-full -rotate-90"
                                  viewBox="0 0 72 72"
                                >
                                  <circle
                                    cx="36"
                                    cy="36"
                                    r="30"
                                    fill="none"
                                    stroke="#f3f4f6"
                                    stroke-width="5"
                                  />
                                  <circle
                                    cx="36"
                                    cy="36"
                                    r="30"
                                    fill="none"
                                    stroke="url(#teamsGradient)"
                                    stroke-width="5"
                                    stroke-linecap="round"
                                    stroke-dasharray="188.5"
                                    stroke-dashoffset="38"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="teamsGradient"
                                      x1="0%"
                                      y1="0%"
                                      x2="100%"
                                      y2="0%"
                                    >
                                      <stop offset="0%" stop-color="#10b981" />
                                      <stop
                                        offset="100%"
                                        stop-color="#34d399"
                                      />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <div
                                  class="absolute inset-0 flex items-center justify-center"
                                >
                                  <span
                                    class="text-base font-bold text-gray-900"
                                    >80%</span
                                  >
                                </div>
                              </div>
                              <span
                                class="text-[11px] text-gray-500 font-medium mt-2"
                                >Teams</span
                              >
                            </div>
                          </div>
                        </div>

                        <!-- Adoption by Team -->
                        <div
                          class="flex-1 bg-white rounded-xl p-4 border border-gray-200/80"
                        >
                          <div class="flex items-center justify-between mb-3">
                            <span class="text-gray-700 font-medium text-xs"
                              >Adoption by Team</span
                            >
                          </div>
                          <div class="space-y-3">
                            <div
                              v-for="(team, tIdx) in adoptionByTeam"
                              :key="team.name"
                            >
                              <div
                                class="flex items-center justify-between mb-1.5"
                              >
                                <span
                                  class="text-xs font-medium text-gray-600"
                                  >{{ team.name }}</span
                                >
                                <span class="text-xs font-bold text-gray-900"
                                  >{{ team.percent }}%</span
                                >
                              </div>
                              <div
                                class="h-1.5 bg-gray-100 rounded-full overflow-hidden"
                              >
                                <div
                                  class="h-full rounded-full transition-all duration-700"
                                  :style="{
                                    width: team.percent + '%',
                                    backgroundColor: team.color,
                                  }"
                                ></div>
                              </div>
                            </div>
                            <!-- Placeholder teams -->
                            <div v-for="n in 2" :key="'team-ph-' + n">
                              <div
                                class="flex items-center justify-between mb-1.5"
                              >
                                <div class="h-3 bg-gray-100 rounded w-16"></div>
                                <div class="h-3 bg-gray-50 rounded w-6"></div>
                              </div>
                              <div class="h-1.5 bg-gray-50 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Right column - Stats & Chart -->
                      <div class="flex-1 flex flex-col gap-4">
                        <!-- Key metrics row -->
                        <div class="grid grid-cols-3 gap-3">
                          <!-- Hours Saved -->
                          <div
                            class="bg-white rounded-xl p-4 border border-gray-200/80"
                          >
                            <div class="flex items-center justify-between mb-3">
                              <div
                                class="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center"
                              >
                                <PhTimer
                                  class="w-4 h-4 text-violet-500"
                                  weight="duotone"
                                />
                              </div>
                            </div>
                            <p
                              class="text-2xl font-bold text-gray-900 tabular-nums"
                            >
                              12.4k
                            </p>
                            <p class="text-gray-500 text-xs mt-0.5">
                              Hours Saved
                            </p>
                            <div class="flex items-center gap-1 mt-2">
                              <span
                                class="text-emerald-600 text-[10px] font-bold"
                                >↑ 34%</span
                              >
                              <span class="text-gray-400 text-[10px]"
                                >this month</span
                              >
                            </div>
                          </div>

                          <!-- Active Flows -->
                          <div
                            class="bg-white rounded-xl p-4 border border-gray-200/80"
                          >
                            <div class="flex items-center justify-between mb-3">
                              <div
                                class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center"
                              >
                                <PhFlowArrow
                                  class="w-4 h-4 text-emerald-500"
                                  weight="duotone"
                                />
                              </div>
                            </div>
                            <p
                              class="text-2xl font-bold text-gray-900 tabular-nums"
                            >
                              847
                            </p>
                            <p class="text-gray-500 text-xs mt-0.5">
                              Active Flows
                            </p>
                            <div class="flex items-center gap-1.5 mt-2">
                              <div class="h-2.5 bg-gray-100 rounded w-8"></div>
                              <div class="h-2.5 bg-gray-50 rounded w-14"></div>
                            </div>
                          </div>

                          <!-- AI Tasks -->
                          <div
                            class="bg-white rounded-xl p-4 border border-gray-200/80"
                          >
                            <div class="flex items-center justify-between mb-3">
                              <div
                                class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"
                              >
                                <PhCpu
                                  class="w-4 h-4 text-amber-500"
                                  weight="duotone"
                                />
                              </div>
                            </div>
                            <p
                              class="text-2xl font-bold text-gray-900 tabular-nums"
                            >
                              94.2k
                            </p>
                            <p class="text-gray-500 text-xs mt-0.5">
                              AI Agent Tasks
                            </p>
                            <div class="flex items-center gap-1.5 mt-2">
                              <div class="h-2.5 bg-gray-100 rounded w-8"></div>
                              <div class="h-2.5 bg-gray-50 rounded w-14"></div>
                            </div>
                          </div>
                        </div>

                        <!-- Cost Savings Chart -->
                        <div
                          class="bg-white rounded-xl p-4 border border-gray-200/80"
                        >
                          <div class="mb-3">
                            <span class="text-gray-900 font-semibold text-sm"
                              >Cost Savings</span
                            >
                            <p class="text-gray-400 text-[10px] mt-0.5">
                              Monthly savings from automation
                            </p>
                          </div>

                          <!-- Chart area - fixed height, horizontal layout -->
                          <div class="flex gap-2 h-24">
                            <!-- Y-axis labels -->
                            <div
                              class="flex flex-col justify-between text-[9px] text-gray-400 font-medium shrink-0 pr-1"
                            >
                              <span>$30k</span>
                              <span>$15k</span>
                              <span>$0</span>
                            </div>

                            <!-- Bars container -->
                            <div
                              class="flex-1 flex items-end gap-1.5 border-l border-b border-gray-100 pl-2 pb-1 relative"
                            >
                              <!-- Grid lines -->
                              <div
                                class="absolute inset-0 flex flex-col justify-between pointer-events-none"
                              >
                                <div class="border-t border-gray-100/50"></div>
                                <div class="border-t border-gray-100/50"></div>
                                <div></div>
                              </div>

                              <!-- Data bars -->
                              <div
                                v-for="(bar, i) in savingsBarData"
                                :key="i"
                                class="flex-1 flex flex-col items-center justify-end relative z-10 h-full"
                              >
                                <!-- Bar with value inside/above -->
                                <span
                                  class="text-[8px] font-semibold text-gray-500 mb-0.5"
                                  >{{ bar.value }}</span
                                >
                                <div
                                  class="w-full max-w-[32px] rounded-t transition-all duration-500"
                                  :class="
                                    bar.current
                                      ? 'bg-emerald-500'
                                      : 'bg-emerald-300'
                                  "
                                  :style="{ height: bar.percent + '%' }"
                                ></div>
                              </div>

                              <!-- Placeholder bars -->
                              <div
                                v-for="n in 2"
                                :key="'ph-' + n"
                                class="flex-1 flex flex-col items-center justify-end relative z-10 h-full"
                              >
                                <div
                                  class="w-4 h-2 bg-gray-100 rounded mb-0.5"
                                ></div>
                                <div
                                  class="w-full max-w-[32px] h-[12%] bg-gray-100 rounded-t"
                                ></div>
                              </div>
                            </div>
                          </div>

                          <!-- X-axis labels -->
                          <div class="flex gap-1.5 pl-8 pt-1.5">
                            <div
                              v-for="(bar, i) in savingsBarData"
                              :key="'label-' + i"
                              class="flex-1 text-center"
                            >
                              <span
                                class="text-[9px] text-gray-400 font-medium"
                                >{{ bar.label }}</span
                              >
                            </div>
                            <div
                              v-for="n in 2"
                              :key="'ph-label-' + n"
                              class="flex-1 flex justify-center"
                            >
                              <div class="w-5 h-2.5 bg-gray-100 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Leaderboard & Badges Card Content -->
                  <div
                    v-if="card.id === 'leaderboard'"
                    class="h-full flex flex-col"
                  >
                    <!-- Header with switcher and badge -->
                    <div class="flex items-center justify-between mb-4">
                      <!-- People / Teams switcher -->
                      <div
                        class="flex items-center bg-gray-100 rounded-lg p-0.5"
                      >
                        <span
                          class="px-3 py-1.5 text-xs font-semibold rounded-md bg-white text-gray-900 shadow-sm"
                        >
                          <span class="flex items-center gap-1.5">
                            <PhUser class="w-3.5 h-3.5" weight="fill" />
                            People
                          </span>
                        </span>
                        <span
                          class="px-3 py-1.5 text-xs font-semibold rounded-md text-gray-400"
                        >
                          <span class="flex items-center gap-1.5">
                            <PhUsersThree class="w-3.5 h-3.5" weight="fill" />
                            Teams
                          </span>
                        </span>
                      </div>
                      <!-- Time period toggle -->
                      <div
                        class="flex items-center bg-gray-100 rounded-lg p-0.5"
                      >
                        <span
                          class="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-white text-gray-900 shadow-sm"
                        >
                          This Week
                        </span>
                        <span
                          class="px-2.5 py-1 text-[10px] font-semibold rounded-md text-gray-400"
                        >
                          This Month
                        </span>
                        <span
                          class="px-2.5 py-1 text-[10px] font-semibold rounded-md text-gray-400"
                        >
                          All Time
                        </span>
                      </div>
                    </div>

                    <!-- Table container -->
                    <div
                      class="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <!-- Table header -->
                      <div
                        class="grid grid-cols-[1fr_140px_100px_90px] gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200"
                      >
                        <div
                          class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide"
                        >
                          Name
                        </div>
                        <div
                          class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide"
                        >
                          Badges
                        </div>
                        <div
                          class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide text-right"
                        >
                          Time Saved
                        </div>
                        <div
                          class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide text-right"
                        >
                          Active Flows
                        </div>
                      </div>

                      <!-- Table rows -->
                      <div class="divide-y divide-gray-100">
                        <!-- Real data rows -->
                        <div
                          v-for="(person, pIdx) in tableData"
                          :key="pIdx"
                          class="grid grid-cols-[1fr_140px_100px_90px] gap-2 px-4 py-3 items-center hover:bg-gray-50/50 transition-colors"
                        >
                          <!-- Name with avatar -->
                          <div class="flex items-center gap-3">
                            <div class="relative">
                              <div
                                class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                                :style="{ backgroundColor: person.color }"
                              >
                                {{ person.initials }}
                              </div>
                              <!-- Rank badge for top 3 -->
                              <div
                                v-if="pIdx < 3"
                                class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold border-2 border-white"
                                :class="
                                  pIdx === 0
                                    ? 'bg-amber-400 text-amber-900'
                                    : pIdx === 1
                                      ? 'bg-gray-300 text-gray-700'
                                      : 'bg-amber-600 text-amber-100'
                                "
                              >
                                {{ pIdx + 1 }}
                              </div>
                            </div>
                            <div class="min-w-0">
                              <p
                                class="text-sm font-medium text-gray-900 truncate"
                              >
                                {{ person.name }}
                              </p>
                              <p class="text-xs text-gray-400">
                                {{ person.role }}
                              </p>
                            </div>
                          </div>

                          <!-- Badges -->
                          <div class="flex items-center gap-1">
                            <div
                              v-for="(badge, bIdx) in person.badges.slice(0, 3)"
                              :key="bIdx"
                              class="w-6 h-6 rounded-md flex items-center justify-center transition-transform hover:scale-110"
                              :style="{ backgroundColor: badge.bg }"
                              :title="badge.name"
                            >
                              <component
                                :is="badge.icon"
                                class="w-3.5 h-3.5"
                                :style="{ color: badge.color }"
                                weight="fill"
                              />
                            </div>
                            <!-- +N more badges -->
                            <div
                              v-if="person.badges.length > 3"
                              class="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500"
                            >
                              +{{ person.badges.length - 3 }}
                            </div>
                          </div>

                          <!-- Time Saved -->
                          <div class="text-right">
                            <span
                              class="text-sm font-semibold text-gray-900 tabular-nums"
                              >{{ person.timeSaved }}</span
                            >
                          </div>

                          <!-- Active Flows -->
                          <div class="text-right">
                            <span
                              class="text-sm font-semibold text-gray-900 tabular-nums"
                              >{{ person.activeFlows }}</span
                            >
                          </div>
                        </div>

                        <!-- Placeholder rows -->
                        <div
                          v-for="n in 4"
                          :key="'placeholder-' + n"
                          class="grid grid-cols-[1fr_140px_100px_90px] gap-2 px-4 py-3 items-center"
                        >
                          <!-- Name placeholder -->
                          <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-gray-100"></div>
                            <div class="space-y-1.5">
                              <div class="h-3.5 bg-gray-100 rounded w-24"></div>
                              <div class="h-2.5 bg-gray-50 rounded w-16"></div>
                            </div>
                          </div>

                          <!-- Badges placeholder -->
                          <div class="flex items-center gap-1">
                            <div class="w-6 h-6 rounded-md bg-gray-100"></div>
                            <div class="w-6 h-6 rounded-md bg-gray-50"></div>
                            <div
                              class="w-6 h-6 rounded-md bg-gray-50 opacity-50"
                            ></div>
                          </div>

                          <!-- Time Saved placeholder -->
                          <div class="flex justify-end">
                            <div class="h-3.5 bg-gray-100 rounded w-12"></div>
                          </div>

                          <!-- Active Flows placeholder -->
                          <div class="flex justify-end">
                            <div class="h-3.5 bg-gray-100 rounded w-8"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Branding Card Content - Flow Builder in Embedded Mode -->
                  <div
                    v-if="card.id === 'branding'"
                    class="h-full relative overflow-hidden"
                  >
                    <!-- Flow Builder fills the entire card -->
                    <FlowBuilder
                      flow-id="branding-placeholder"
                      :placeholder-mode="true"
                      :brand-color="
                        brandColors[activeBrandColor % brandColors.length]
                          .primary
                      "
                      :embedded="true"
                    />

                    <!-- Brand logo and name overlay - scrolling list with gradient fade -->
                    <div class="absolute top-6 left-6 z-20">
                      <!-- Container with overflow hidden -->
                      <div class="relative h-[90px] overflow-hidden">
                        <!-- Scrolling brand list -->
                        <div
                          class="brand-scroll-list"
                          :class="{ 'no-transition': isResetting }"
                          :style="{
                            transform: `translateY(-${activeBrandColor * 32}px)`,
                          }"
                        >
                          <!-- All brands in a scrolling list -->
                          <div
                            v-for="(brand, idx) in scrollBrands"
                            :key="idx"
                            class="brand-row flex items-start h-8 transition-all duration-500"
                            :style="getBrandStyles(idx)"
                          >
                            <div
                              class="rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                              :class="
                                idx === activeBrandColor
                                  ? 'w-8 h-8 shadow-md'
                                  : 'w-5 h-5 shadow-sm'
                              "
                              :style="{
                                background: `linear-gradient(135deg, ${brand.primary}, ${brand.secondary})`,
                              }"
                            >
                              <svg
                                :class="
                                  idx === activeBrandColor
                                    ? 'w-4 h-4'
                                    : 'w-2.5 h-2.5'
                                "
                                class="transition-all duration-500"
                                viewBox="0 0 16 16"
                                fill="white"
                                fill-opacity="0.9"
                              >
                                <g v-if="brand.icon === 'grid'">
                                  <rect
                                    x="1"
                                    y="1"
                                    width="6"
                                    height="6"
                                    rx="1"
                                  />
                                  <rect
                                    x="9"
                                    y="1"
                                    width="6"
                                    height="6"
                                    rx="1"
                                  />
                                  <rect
                                    x="1"
                                    y="9"
                                    width="6"
                                    height="6"
                                    rx="1"
                                  />
                                  <rect
                                    x="9"
                                    y="9"
                                    width="6"
                                    height="6"
                                    rx="1"
                                  />
                                </g>
                                <path
                                  v-else-if="brand.icon === 'play'"
                                  d="M4 2.5v11l9-5.5-9-5.5z"
                                />
                                <path
                                  v-else-if="brand.icon === 'chat'"
                                  d="M2 2h12a1 1 0 011 1v8a1 1 0 01-1 1H5l-3 3V3a1 1 0 011-1z"
                                />
                                <path
                                  v-else-if="brand.icon === 'bolt'"
                                  d="M9 1L3 9h4v6l6-8H9V1z"
                                />
                                <path
                                  v-else-if="brand.icon === 'star'"
                                  d="M8 1l2.2 4.5 5 .7-3.6 3.5.9 5L8 12.5 3.5 14.7l.9-5L.8 6.2l5-.7L8 1z"
                                />
                                <path
                                  v-else-if="brand.icon === 'heart'"
                                  d="M8 14s-6-4.35-6-8.5C2 3 4 1.5 5.5 1.5c1.54 0 2.5 1 2.5 1s.96-1 2.5-1C12 1.5 14 3 14 5.5 14 9.65 8 14 8 14z"
                                />
                                <path
                                  v-else-if="brand.icon === 'cloud'"
                                  d="M12.5 6A4.5 4.5 0 004 7.5 3 3 0 003 13h10a3 3 0 00.5-5.95A4.5 4.5 0 0012.5 6z"
                                />
                                <path
                                  v-else-if="brand.icon === 'bag'"
                                  d="M4 4V3a4 4 0 118 0v1h2l1 11H1L2 4h2zm2 0h4V3a2 2 0 10-4 0v1z"
                                />
                                <path
                                  v-else-if="brand.icon === 'music'"
                                  d="M14 1v10a3 3 0 11-2-2.83V3L6 4.5v8A3 3 0 114 10V2l10-1z"
                                />
                                <path
                                  v-else-if="brand.icon === 'send'"
                                  d="M1 1l14 7-14 7V9l8-1-8-1V1z"
                                />
                                <path
                                  v-else-if="brand.icon === 'layers'"
                                  d="M8 1L1 5l7 4 7-4-7-4zM1 8l7 4 7-4M1 11l7 4 7-4"
                                />
                                <circle v-else cx="8" cy="8" r="6" />
                              </svg>
                            </div>
                            <span
                              class="font-bold whitespace-nowrap transition-all duration-500"
                              :class="
                                idx === activeBrandColor
                                  ? 'text-lg ml-2.5'
                                  : 'text-xs ml-2'
                              "
                              :style="{ color: brand.primary }"
                              >{{ brand.name }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Progress bar -->
                    <div
                      class="absolute bottom-0 left-0 right-0 h-1 bg-black/5 overflow-hidden z-20"
                    >
                      <div
                        class="h-full brand-progress-bar"
                        :style="{
                          background: `linear-gradient(90deg, ${brandColors[activeBrandColor % brandColors.length].primary}, ${brandColors[activeBrandColor % brandColors.length].secondary})`,
                          width: beatProgress + '%',
                          transitionDuration:
                            beatProgress === 0 ? '0ms' : '2400ms',
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Play/Pause Button with Circular Progress -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
              <button
                @click="toggleAutoPlay"
                class="relative w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
              >
                <!-- SVG Circular Progress -->
                <svg
                  class="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 48 48"
                >
                  <!-- Background circle -->
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="2"
                  />
                  <!-- Progress circle -->
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    fill="none"
                    stroke="#6e41e2"
                    stroke-width="2"
                    stroke-linecap="round"
                    :stroke-dasharray="138.2"
                    :stroke-dashoffset="138.2 - (138.2 * cardProgress) / 100"
                    class="card-progress-circle"
                    :style="{
                      transitionDuration:
                        cardProgress === 0 ? '0ms' : `${CARD_ROTATION_DURATION}ms`,
                    }"
                  />
                </svg>

                <!-- Play/Pause Icon -->
                <PhPlay
                  v-if="!isAutoPlaying"
                  class="w-5 h-5 text-gray-700 ml-0.5"
                  weight="fill"
                />
                <PhPause v-else class="w-5 h-5 text-gray-700" weight="fill" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, markRaw, onMounted, onUnmounted, watch } from "vue";
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
  PhTrendUp,
  PhUser,
  PhUsersThree,
  PhTarget,
  PhCrown,
  PhDiamond,
  PhFlowArrow,
  PhCpu,
  PhPlay,
  PhPause,
} from "@phosphor-icons/vue";
import FlowBuilder from "~/components/pages/product/ai-agents/FlowBuilder.vue";

const sectionRef = ref(null);
const activeCard = ref(1);
const activeBrandColor = ref(0);
const hoveredTemplate = ref(null);
const beatProgress = ref(0);

// Card auto-rotation state
const isAutoPlaying = ref(true);
const cardProgress = ref(0);
const CARD_ROTATION_DURATION = 5000; // 5 seconds per card
let cardRotationInterval = null;

// Timing for smooth brand scrolling
const BRAND_DISPLAY_DURATION = 2500; // 2.5 seconds showing each brand
let brandCycleInterval = null;

// Animated stats
const animatedStats = ref(["0", "0", "0"]);
let animationFrame = null;

// Card rotation functions
const startCardRotation = () => {
  cardProgress.value = 0;
  requestAnimationFrame(() => {
    cardProgress.value = 100;
  });

  cardRotationInterval = setInterval(() => {
    activeCard.value = (activeCard.value + 1) % cards.length;
    cardProgress.value = 0;
    requestAnimationFrame(() => {
      cardProgress.value = 100;
    });
  }, CARD_ROTATION_DURATION);
};

const stopCardRotation = () => {
  if (cardRotationInterval) {
    clearInterval(cardRotationInterval);
    cardRotationInterval = null;
  }
  cardProgress.value = 0;
};

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value;
  if (isAutoPlaying.value) {
    startCardRotation();
  } else {
    stopCardRotation();
  }
};

const selectCard = (index) => {
  activeCard.value = index;
  if (isAutoPlaying.value) {
    stopCardRotation();
    startCardRotation();
  }
};

// Branding card is index 3
const BRANDING_CARD_INDEX = 3;

// Computed property for scrolling brands list (with extras for infinite scroll)
const scrollBrands = computed(() => {
  // Add extra brands at the end to show during scroll before reset
  return [...brandColors, ...brandColors.slice(0, 4)];
});

// Current brand for FlowBuilder
const currentBrand = computed(() => {
  return brandColors[activeBrandColor.value % brandColors.length];
});

// Get styles for brand row (opacity, offset, and grayscale for inactive)
const getBrandStyles = (idx) => {
  const diff = idx - activeBrandColor.value;
  if (diff === 0) return { opacity: 1, filter: "grayscale(0)" };
  // Push first inactive down for gap from active, then cluster the rest - all grayscale
  if (diff === 1)
    return {
      opacity: 0.5,
      transform: "translateY(10px)",
      filter: "grayscale(1)",
    };
  if (diff === 2)
    return {
      opacity: 0.25,
      transform: "translateY(6px)",
      filter: "grayscale(1)",
    };
  if (diff >= 3)
    return { opacity: 0, transform: "translateY(2px)", filter: "grayscale(1)" };
  return { opacity: 0, filter: "grayscale(1)" }; // Items above active (scrolled past)
};

// Stop the brand cycling
const stopBrandCycle = () => {
  if (brandCycleInterval) {
    clearInterval(brandCycleInterval);
    brandCycleInterval = null;
  }
  beatProgress.value = 0;
};

// Watch for card changes to start/stop branding animation
watch(activeCard, (newVal) => {
  if (newVal === BRANDING_CARD_INDEX) {
    // Start cycling when branding card becomes active
    startBrandCycle();
  } else {
    // Stop cycling when switching away from branding card
    stopBrandCycle();
  }
});

// Track if we need to do an instant reset
const isResetting = ref(false);

// Start the brand cycling - smooth infinite scroll
const startBrandCycle = () => {
  // Start with first brand
  activeBrandColor.value = 0;
  isResetting.value = false;
  beatProgress.value = 0;

  requestAnimationFrame(() => {
    beatProgress.value = 100;
  });

  // Cycle through brands at consistent intervals
  brandCycleInterval = setInterval(() => {
    // Move to next brand with smooth animation
    activeBrandColor.value = activeBrandColor.value + 1;

    // When we've gone past the original list, reset instantly
    if (activeBrandColor.value >= brandColors.length) {
      // Allow one more frame at the extra position, then instant reset
      setTimeout(() => {
        isResetting.value = true;
        activeBrandColor.value = 0;
        // Re-enable transitions after reset
        requestAnimationFrame(() => {
          isResetting.value = false;
        });
      }, 500); // After transition completes
    }

    // Reset and animate progress bar
    beatProgress.value = 0;
    requestAnimationFrame(() => {
      beatProgress.value = 100;
    });
  }, BRAND_DISPLAY_DURATION);
};

onMounted(() => {
  // Animate stat counters
  const targets = [847, 12400, 94];
  const duration = 2000;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    animatedStats.value = [
      Math.round(targets[0] * easeOut).toLocaleString(),
      (Math.round((targets[1] * easeOut) / 100) / 10).toFixed(1) + "k",
      Math.round(targets[2] * easeOut).toString(),
    ];

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate);
    }
  };

  animate();

  // Only start brand cycling if branding card is active on mount
  if (activeCard.value === BRANDING_CARD_INDEX) {
    startBrandCycle();
  }

  // Start card auto-rotation
  if (isAutoPlaying.value) {
    startCardRotation();
  }
});

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  if (brandCycleInterval) clearInterval(brandCycleInterval);
  if (cardRotationInterval) clearInterval(cardRotationInterval);
});

// Card definitions
const cards = [
  {
    id: "templates",
    title: "Agent Library",
    shortTitle: "Agents",
    subtitle: "Ready-made AI agents",
    icon: markRaw(PhBooks),
    iconBg: "#8b5cf6",
    badge: "200+",
    badgeBg: "rgba(139, 92, 246, 0.15)",
    badgeColor: "#7c3aed",
  },
  {
    id: "analytics",
    title: "Impact Analytics",
    shortTitle: "Analytics",
    subtitle: "Track adoption & ROI",
    icon: markRaw(PhChartLineUp),
    iconBg: "#10b981",
    badge: "Real-time",
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeColor: "#059669",
  },
  {
    id: "leaderboard",
    title: "Leaderboard & Badges",
    shortTitle: "Gamify",
    subtitle: "Gamify adoption",
    icon: markRaw(PhTrophy),
    iconBg: "#f59e0b",
    badge: "Engaging",
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeColor: "#d97706",
  },
  {
    id: "branding",
    title: "Look and feel",
    shortTitle: "Branding",
    subtitle: "Your brand, your platform",
    icon: markRaw(PhPaintBrush),
    iconBg: "#ec4899",
    badge: "Custom",
    badgeBg: "rgba(236, 72, 153, 0.15)",
    badgeColor: "#db2777",
  },
];

// Adoption by team data
const adoptionByTeam = [
  { name: "Marketing", percent: 94, color: "#8b5cf6" },
  { name: "Sales", percent: 71, color: "#f59e0b" },
  { name: "Engineering", percent: 58, color: "#10b981" },
  { name: "Operations", percent: 42, color: "#3b82f6" },
];

// Savings bar chart data (percent is 0-100)
const savingsBarData = [
  { label: "Jan", value: "$8k", percent: 27 },
  { label: "Feb", value: "$12k", percent: 40 },
  { label: "Mar", value: "$17k", percent: 57 },
  { label: "Apr", value: "$21k", percent: 70 },
  { label: "May", value: "$26k", percent: 87 },
  { label: "Jun", value: "$31k", percent: 100, current: true },
];

// Table data for leaderboard
const tableData = [
  {
    name: "Sarah Chen",
    initials: "SC",
    role: "Marketing Lead",
    color: "#8b5cf6",
    badges: [
      {
        name: "Champion",
        icon: markRaw(PhTrophy),
        color: "#f59e0b",
        bg: "#fef3c7",
      },
      {
        name: "On Fire",
        icon: markRaw(PhFire),
        color: "#f97316",
        bg: "#ffedd5",
      },
      {
        name: "Power User",
        icon: markRaw(PhLightning),
        color: "#eab308",
        bg: "#fef9c3",
      },
      {
        name: "Big Brain",
        icon: markRaw(PhBrain),
        color: "#06b6d4",
        bg: "#cffafe",
      },
      {
        name: "First Flow",
        icon: markRaw(PhRocket),
        color: "#8b5cf6",
        bg: "#ede9fe",
      },
      {
        name: "Team Player",
        icon: markRaw(PhHeart),
        color: "#ec4899",
        bg: "#fce7f3",
      },
      {
        name: "Diamond",
        icon: markRaw(PhDiamond),
        color: "#3b82f6",
        bg: "#dbeafe",
      },
    ],
    timeSaved: "124h",
    activeFlows: 47,
  },
  {
    name: "Mike Johnson",
    initials: "MJ",
    role: "Sales Director",
    color: "#f59e0b",
    badges: [
      {
        name: "Target Master",
        icon: markRaw(PhTarget),
        color: "#ef4444",
        bg: "#fee2e2",
      },
      {
        name: "Power User",
        icon: markRaw(PhLightning),
        color: "#eab308",
        bg: "#fef9c3",
      },
      {
        name: "On Fire",
        icon: markRaw(PhFire),
        color: "#f97316",
        bg: "#ffedd5",
      },
      {
        name: "Crown",
        icon: markRaw(PhCrown),
        color: "#a855f7",
        bg: "#f3e8ff",
      },
    ],
    timeSaved: "98h",
    activeFlows: 38,
  },
  {
    name: "Emma Wilson",
    initials: "EW",
    role: "Operations",
    color: "#10b981",
    badges: [
      {
        name: "First Flow",
        icon: markRaw(PhRocket),
        color: "#8b5cf6",
        bg: "#ede9fe",
      },
      {
        name: "Team Player",
        icon: markRaw(PhHeart),
        color: "#ec4899",
        bg: "#fce7f3",
      },
      { name: "Star", icon: markRaw(PhStar), color: "#eab308", bg: "#fef9c3" },
    ],
    timeSaved: "76h",
    activeFlows: 31,
  },
  {
    name: "Alex Kumar",
    initials: "AK",
    role: "Engineering",
    color: "#ec4899",
    badges: [
      {
        name: "Big Brain",
        icon: markRaw(PhBrain),
        color: "#06b6d4",
        bg: "#cffafe",
      },
      {
        name: "First Flow",
        icon: markRaw(PhRocket),
        color: "#8b5cf6",
        bg: "#ede9fe",
      },
    ],
    timeSaved: "54h",
    activeFlows: 24,
  },
];

// Brand colors - famous company colors (35 brands)
// Icon types: 'grid', 'play', 'chat', 'bolt', 'star', 'heart', 'cloud', 'bag', 'music', 'send', 'layers'
const brandColors = [
  // Food & Beverage
  {
    primary: "#E31837",
    secondary: "#FF3B52",
    name: "Coca-Cola",
    icon: "heart",
  },
  {
    primary: "#FFD700",
    secondary: "#FFE44D",
    name: "McDonald's",
    icon: "star",
  },
  { primary: "#00704A", secondary: "#00A86B", name: "Starbucks", icon: "star" },
  { primary: "#D71A21", secondary: "#E94248", name: "KFC", icon: "heart" },
  { primary: "#EE3A43", secondary: "#F26169", name: "Dominos", icon: "bolt" },
  // Retail & Fashion
  { primary: "#E60023", secondary: "#EB334D", name: "Target", icon: "star" },
  { primary: "#0071CE", secondary: "#2994E0", name: "Walmart", icon: "bag" },
  { primary: "#FF6900", secondary: "#FF8533", name: "Nike", icon: "bolt" },
  { primary: "#000000", secondary: "#333333", name: "Adidas", icon: "layers" },
  { primary: "#172B4D", secondary: "#344563", name: "Zara", icon: "bag" },
  { primary: "#E4002B", secondary: "#E9334F", name: "H&M", icon: "heart" },
  { primary: "#003DA5", secondary: "#2966C2", name: "IKEA", icon: "grid" },
  // Automotive
  { primary: "#0033A0", secondary: "#2966C2", name: "Ford", icon: "bolt" },
  { primary: "#C4001D", secondary: "#D42940", name: "Toyota", icon: "star" },
  { primary: "#1C69D4", secondary: "#4A8DE0", name: "BMW", icon: "layers" },
  { primary: "#CC0000", secondary: "#E62929", name: "Tesla", icon: "bolt" },
  // Airlines & Travel
  { primary: "#006DAA", secondary: "#2994CC", name: "Delta", icon: "send" },
  { primary: "#E01933", secondary: "#E6475A", name: "Emirates", icon: "star" },
  { primary: "#FF5A5F", secondary: "#FF787C", name: "Airbnb", icon: "heart" },
  { primary: "#003580", secondary: "#2966A3", name: "Booking", icon: "star" },
  // Entertainment
  { primary: "#E50914", secondary: "#FF2D2D", name: "Netflix", icon: "play" },
  { primary: "#1DB954", secondary: "#1ED760", name: "Spotify", icon: "music" },
  { primary: "#113CCF", secondary: "#3D5FDB", name: "Disney", icon: "star" },
  // Finance & Banking
  { primary: "#012169", secondary: "#2A4A8C", name: "Chase", icon: "grid" },
  { primary: "#C8102E", secondary: "#D43D55", name: "HSBC", icon: "layers" },
  { primary: "#E60000", secondary: "#EB3333", name: "Santander", icon: "bolt" },
  // Healthcare & Wellness
  { primary: "#0072CE", secondary: "#2994E0", name: "Pfizer", icon: "heart" },
  { primary: "#78BE20", secondary: "#96CB4D", name: "Aetna", icon: "heart" },
  { primary: "#F26522", secondary: "#F5854E", name: "Peloton", icon: "bolt" },
  // Tech (just a few)
  { primary: "#FF9900", secondary: "#FFB340", name: "Amazon", icon: "bag" },
  { primary: "#4285F4", secondary: "#669DF6", name: "Google", icon: "grid" },
  { primary: "#635BFF", secondary: "#7A73FF", name: "Stripe", icon: "bolt" },
  // Consumer Goods
  { primary: "#003087", secondary: "#2966AA", name: "Nivea", icon: "heart" },
  { primary: "#E4002B", secondary: "#E9334F", name: "Colgate", icon: "star" },
  { primary: "#F26322", secondary: "#F5854E", name: "Fanta", icon: "star" },
];

// Card positioning - balanced: subtle tilt + moderate vertical stack
const getCardStyle = (index) => {
  const totalCards = cards.length;
  let offset = index - activeCard.value;

  // Normalize to always show cards "behind" (positive offset)
  if (offset < 0) {
    offset = totalCards + offset;
  }

  // Active card - front and center, full opacity
  if (offset === 0) {
    return {
      transform: "translateX(0) translateY(0) rotate(0deg) scale(1)",
      opacity: 1,
      zIndex: 40,
    };
  }

  // Cards behind - subtle tilt, compact stack
  const translateX = offset * 28;
  const translateY = offset * -38; // Compact but readable
  const rotation = offset * 1.2;
  const scale = 1 - offset * 0.015;
  const opacity = 0.9 - offset * 0.1;

  return {
    transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
    transformOrigin: "bottom left",
    opacity: Math.max(0.6, opacity),
    zIndex: 40 - offset * 10,
    pointerEvents: "auto",
  };
};
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
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

@keyframes dot-ring-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.1;
  }
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
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

/* Stat value animation */
.stat-value {
  display: inline-block;
}

/* Progress bar smooth fill */
.brand-progress-bar {
  transition-property: width;
  transition-timing-function: linear;
}

/* Smooth scrolling for brand list */
.brand-scroll-list {
  transition: transform 600ms cubic-bezier(0.33, 1, 0.68, 1);
}

.brand-scroll-list.no-transition {
  transition: none !important;
}

/* Brand row transitions */
.brand-row {
  transition:
    opacity 500ms ease-out,
    transform 500ms ease-out,
    filter 500ms ease-out;
}

/* Circular progress smooth fill */
.card-progress-circle {
  transition-property: stroke-dashoffset;
  transition-timing-function: linear;
}
</style>
