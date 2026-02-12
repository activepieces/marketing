<template>
  <section ref="sectionRef" class="relative pt-24 pb-40 bg-white bg-dotted">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Centered Header -->
      <div class="flex flex-col items-center text-center mb-16">
        <PagesIndexSectionBadge
          to="/product/governance-and-management"
          label="Explore Governance"
          variant="light"
          class="mb-6"
        />
        <h2
          class="font-sentient font-bold text-primary-dark text-4xl lg:text-5xl mb-3 leading-tight text-balance max-w-2xl"
        >
          Enterprise control, zero complexity
        </h2>
        <p class="text-xl text-primary-dark/80 text-balance max-w-2xl">
          IT oversight tools that enterprise teams need without slowing anyone
          down.
        </p>
      </div>

      <!-- Tabs row -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <div class="flex items-center gap-1 bg-primary-dark/5 rounded-full p-1">
          <button
            v-for="(tab, i) in tabs"
            :key="tab.id"
            @click="goToTab(i)"
            class="px-4 py-2 text-[15px] font-medium transition-all duration-300 rounded-full"
            :class="
              activeTab === i
                ? 'bg-primary-dark text-white'
                : 'text-primary-dark/60 hover:text-primary-dark'
            "
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Play/Pause button -->
        <button
          @click="toggleAuto"
          class="ml-2 w-9 h-9 flex items-center justify-center bg-primary-dark/5 hover:bg-primary-dark/10 rounded-full transition-colors"
        >
          <PhPause
            v-if="isAutoPlaying"
            class="w-4 h-4 text-primary-dark/60"
            weight="fill"
          />
          <PhPlay v-else class="w-4 h-4 text-primary-dark/60" weight="fill" />
        </button>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- ==================== USERS TAB ==================== -->
        <template v-if="activeTab === 0">
          <!-- SSO Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <!-- Top 1/3: Title -->
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Single Sign-On
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Secure access with SAML 2.0 and Google. Connect your existing
                identity provider.
              </p>
            </div>
            <!-- Bottom 2/3: Illustration -->
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center p-6"
            >
              <PagesProductGovernanceSsoCardContent />
            </div>
          </div>

          <!-- SCIM Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                SCIM Provisioning
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Automatically sync users and groups from your identity provider.
                Fast onboarding.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center"
            >
              <PagesProductGovernanceScimCardContent />
            </div>
          </div>

          <!-- RBAC Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Advanced RBAC
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Granular role-based access control. Define exactly who can do
                what across your org.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center py-4"
            >
              <PagesProductGovernanceRbacCardContent />
            </div>
          </div>
        </template>

        <!-- ==================== PIECES TAB ==================== -->
        <template v-if="activeTab === 1">
          <!-- Visibility Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Visibility Control
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Show or hide integrations per team. Keep your workspace clean
                and focused.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center p-6"
            >
              <div
                class="w-full max-w-[240px] bg-primary-dark/5 rounded-xl overflow-hidden"
              >
                <div
                  v-for="piece in visibilityPieces"
                  :key="piece.name"
                  class="flex items-center justify-between px-3 py-2.5 border-b border-white/50 last:border-0"
                >
                  <div class="flex items-center gap-2.5">
                    <img
                      :src="piece.logo"
                      class="w-6 h-6 rounded"
                      :alt="piece.name"
                    />
                    <span class="text-[13px] font-medium text-primary-dark">{{
                      piece.name
                    }}</span>
                  </div>
                  <div
                    class="w-9 h-[18px] rounded-full transition-colors duration-300"
                    :class="piece.on ? 'bg-primary-dark' : 'bg-primary-dark/30'"
                  >
                    <div
                      class="w-3.5 h-3.5 mt-[2px] ml-[2px] bg-white rounded-full shadow transition-transform duration-300 ease-out"
                      :class="piece.on ? 'translate-x-[18px]' : 'translate-x-0'"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Private Pieces Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Private Pieces
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Build custom integrations that only exist in your instance. Your
                code, your control.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center py-4"
            >
              <div class="w-full max-w-[220px] space-y-3">
                <div
                  class="bg-primary-dark/5 rounded-xl p-4 border-2 border-dashed border-violet-200"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-primary-dark">
                        Internal API
                      </p>
                      <p class="text-[11px] text-violet-600 font-medium">
                        Private
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-primary-dark/5 rounded-xl p-4 border-2 border-dashed border-emerald-200"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-primary-dark">
                        Payroll System
                      </p>
                      <p class="text-[11px] text-emerald-600 font-medium">
                        Private
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pinned Tools Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Pinned Tools
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Pin your most-used integrations to the top. Quick access for
                your team's essentials.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center p-6"
            >
              <div
                class="w-full max-w-[240px] bg-primary-dark/5 rounded-xl p-3"
              >
                <div class="flex items-center gap-1.5 mb-3 px-1">
                  <svg
                    class="w-3.5 h-3.5 text-primary-dark/50"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M16 4a1 1 0 01.707.293l3 3a1 1 0 01-.464 1.664l-1.397.349-.793.793 1.5 6a1 1 0 01-.276.96l-1.414 1.413a1 1 0 01-1.414 0L12 15.02l-3.449 3.449a1 1 0 01-1.414-1.414l3.449-3.449-3.449-3.449a1 1 0 010-1.414l1.414-1.414a1 1 0 01.96-.276l6 1.5.793-.793.349-1.397A1 1 0 0116.96 4H16z"
                    />
                  </svg>
                  <span
                    class="text-[11px] font-semibold text-primary-dark/60 uppercase tracking-wide"
                    >Pinned</span
                  >
                </div>
                <div class="space-y-1.5">
                  <div
                    v-for="(tool, i) in pinnedTools"
                    :key="tool.name"
                    class="flex items-center gap-3 bg-white rounded-lg px-3 py-2"
                  >
                    <span
                      class="text-[10px] text-primary-dark/50 font-medium w-3"
                      >{{ i + 1 }}</span
                    >
                    <img
                      :src="tool.logo"
                      class="w-6 h-6 rounded"
                      :alt="tool.name"
                    />
                    <span class="text-[13px] font-medium text-primary-dark">{{
                      tool.name
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ==================== CONNECTIONS TAB ==================== -->
        <template v-if="activeTab === 2">
          <!-- Centralized Credentials Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Centralized Credentials
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                IT manages service accounts once. Teams reuse them across all
                projects.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center"
            >
              <div class="w-full max-w-[200px] space-y-2.5">
                <div
                  v-for="conn in serviceAccounts"
                  :key="conn.name"
                  class="flex items-center gap-3 bg-primary-dark/5 rounded-xl px-4 py-3"
                >
                  <img
                    :src="conn.logo"
                    class="w-8 h-8 rounded-lg"
                    :alt="conn.name"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="text-[13px] font-medium text-primary-dark">
                      {{ conn.name }}
                    </p>
                    <p class="text-[10px] text-primary-dark/50 truncate">
                      {{ conn.account }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- AI Providers Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                AI Providers
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Connect your AI gateway or cloud provider. Centralize billing
                and usage.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center p-6"
            >
              <div class="w-full max-w-[260px]">
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div
                    class="bg-primary-dark/5 rounded-xl px-3 py-3 flex items-center justify-center"
                  >
                    <img
                      src="/ai-providers-icons/azureopenai.png"
                      class="h-6 w-auto object-contain"
                      alt="Azure OpenAI"
                    />
                  </div>
                  <div
                    class="bg-primary-dark/5 rounded-xl px-3 py-3 flex items-center justify-center"
                  >
                    <img
                      src="/ai-providers-icons/amazonbedrock.png"
                      class="h-6 w-auto object-contain"
                      alt="Amazon Bedrock"
                    />
                  </div>
                  <div
                    class="bg-primary-dark/5 rounded-xl px-3 py-3 flex items-center justify-center"
                  >
                    <img
                      src="/ai-providers-icons/openrouter.png"
                      class="h-5 w-auto object-contain"
                      alt="OpenRouter"
                    />
                  </div>
                  <div
                    class="bg-primary-dark/5 rounded-xl px-3 py-3 flex items-center justify-center"
                  >
                    <img
                      src="/ai-providers-icons/litellm.png"
                      class="h-6 w-auto object-contain"
                      alt="LiteLLM"
                    />
                  </div>
                </div>
                <!-- AI Usage bar -->
                <div class="px-1">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[11px] text-primary-dark/60"
                      >AI spend this month</span
                    >
                    <span class="text-[13px] font-semibold text-primary-dark"
                      >$1,247</span
                    >
                  </div>
                  <div
                    class="h-1.5 bg-primary-dark/10 rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full bg-primary-dark rounded-full"
                      style="width: 62%"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sensitive Connections Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Sensitive Connections
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Mark connections as sensitive. Users need approval before using
                them.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center overflow-hidden relative"
            >
              <div
                class="w-full max-w-[200px] transition-all duration-500 ease-out"
                :style="{
                  transform:
                    sensitiveAnimationPhase >= 2
                      ? 'translateY(45px)'
                      : 'translateY(0)',
                }"
              >
                <!-- Connection row -->
                <div
                  class="bg-primary-dark/5 rounded-xl p-3 mb-2 transition-shadow duration-500"
                  :class="sensitiveAnimationPhase >= 2 ? 'shadow-lg' : ''"
                >
                  <div class="flex items-center gap-3">
                    <div class="relative">
                      <img
                        src="https://cdn.activepieces.com/pieces/metabase.png"
                        class="w-8 h-8 rounded-lg"
                        alt="Metabase"
                      />
                      <!-- Shield overlay -->
                      <div
                        class="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300"
                        :class="
                          sensitiveAnimationPhase >= 2
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-0'
                        "
                      >
                        <svg
                          class="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="text-[13px] font-medium text-primary-dark">
                        Metabase
                      </p>
                      <p
                        class="text-[10px] transition-all duration-300"
                        :class="
                          sensitiveAnimationPhase >= 2
                            ? 'text-amber-600 font-medium'
                            : 'text-primary-dark/50'
                        "
                      >
                        {{
                          sensitiveAnimationPhase >= 2
                            ? "Requires approval"
                            : "analytics@acme.com"
                        }}
                      </p>
                    </div>
                    <svg
                      class="w-4 h-4 text-primary-dark/50 transition-opacity duration-300"
                      :class="
                        sensitiveAnimationPhase >= 2
                          ? 'opacity-0'
                          : 'opacity-100'
                      "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </div>
                </div>
                <!-- Dropdown menu -->
                <div
                  class="bg-white rounded-xl shadow-lg border border-primary-dark/10 overflow-hidden ml-8 transition-all duration-300"
                  :class="
                    sensitiveAnimationPhase >= 2
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100'
                  "
                >
                  <div
                    class="px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors duration-200"
                    :class="
                      sensitiveAnimationPhase === 1
                        ? 'bg-amber-100'
                        : 'bg-amber-50'
                    "
                  >
                    <svg
                      class="w-4 h-4 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span class="text-[12px] text-amber-700 font-medium"
                      >Mark as sensitive</span
                    >
                  </div>
                  <div class="px-3 py-2 flex items-center gap-2 cursor-pointer">
                    <svg
                      class="w-4 h-4 text-primary-dark/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    <span class="text-[12px] text-primary-dark/80">Rename</span>
                  </div>
                  <div class="px-3 py-2 flex items-center gap-2 cursor-pointer">
                    <svg
                      class="w-4 h-4 text-primary-dark/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span class="text-[12px] text-primary-dark/80">Delete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ==================== AUDIT TAB ==================== -->
        <template v-if="activeTab === 3">
          <!-- Activity Tracking Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Activity Tracking
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Every flow run, user action, and system event logged
                automatically with full details.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center overflow-hidden"
            >
              <div class="w-full max-w-[240px] audit-list-container">
                <TransitionGroup name="audit-list" tag="div" class="space-y-2">
                  <div
                    v-for="log in visibleAuditLogs"
                    :key="log.id"
                    class="flex items-center gap-2.5 bg-primary-dark/5 rounded-xl px-3 py-2.5"
                  >
                    <div
                      class="w-5 h-5 rounded flex items-center justify-center bg-primary-dark/10 flex-shrink-0"
                    >
                      <svg
                        class="w-3 h-3 text-primary-dark/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                    </div>
                    <span
                      class="text-[11px] text-primary-dark flex-1 truncate"
                      >{{ log.what }}</span
                    >
                    <span
                      class="px-1.5 py-0.5 text-[9px] font-semibold rounded flex-shrink-0"
                      :class="getActionClass(log.action)"
                    >
                      {{ log.action }}
                    </span>
                    <span class="text-[10px] text-primary-dark/50 flex-shrink-0"
                      >Today</span
                    >
                  </div>
                </TransitionGroup>
              </div>
            </div>
          </div>

          <!-- Smart Filters Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Smart Filters
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                Filter by action type, performer, project, or date range to find
                exactly what you need.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center"
            >
              <div class="w-full max-w-[240px]">
                <div class="bg-primary-dark/5 rounded-xl p-4">
                  <div class="flex flex-wrap gap-2 mb-4">
                    <div
                      class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-primary-dark/10"
                    >
                      <svg
                        class="w-3 h-3 text-primary-dark/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      <span class="text-[11px] text-primary-dark/70 font-medium"
                        >Action</span
                      >
                    </div>
                    <div
                      class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-primary-dark/10"
                    >
                      <svg
                        class="w-3 h-3 text-primary-dark/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span class="text-[11px] text-primary-dark/70 font-medium"
                        >Performed By</span
                      >
                    </div>
                    <div
                      class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-primary-dark/10"
                    >
                      <svg
                        class="w-3 h-3 text-primary-dark/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      <span class="text-[11px] text-primary-dark/70 font-medium"
                        >Project</span
                      >
                    </div>
                    <div
                      class="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-primary-dark/10"
                    >
                      <svg
                        class="w-3 h-3 text-primary-dark/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span class="text-[11px] text-primary-dark/70 font-medium"
                        >Date Range</span
                      >
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      class="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded-full"
                      >Created</span
                    >
                    <span
                      class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-medium rounded-full"
                      >Updated</span
                    >
                    <span
                      class="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-medium rounded-full"
                      >Deleted</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Full Context Card -->
          <div
            class="bg-primary-dark/5 rounded-2xl overflow-hidden h-[400px] flex flex-col"
          >
            <div class="p-6 pb-4">
              <h3
                class="font-sentient font-bold text-2xl text-primary-dark mb-1"
              >
                Full Context
              </h3>
              <p class="text-base text-primary-dark/80 leading-relaxed">
                See resource type, detailed descriptions, who performed the
                action, and timestamps.
              </p>
            </div>
            <div
              class="flex-1 bg-white rounded-xl m-4 flex items-center justify-center py-4"
            >
              <div class="w-full max-w-[220px] space-y-3">
                <div class="bg-primary-dark/5 rounded-xl p-4">
                  <div class="flex items-center gap-2 mb-3">
                    <div
                      class="w-7 h-7 rounded-lg bg-primary-dark/10 flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-primary-dark/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <span
                      class="text-xs font-semibold text-primary-dark/60 uppercase tracking-wide"
                      >Log Entry</span
                    >
                  </div>
                  <div class="space-y-2.5">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] text-primary-dark/50"
                        >Resource</span
                      >
                      <span class="text-[11px] font-medium text-primary-dark"
                        >Connection</span
                      >
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] text-primary-dark/50"
                        >Details</span
                      >
                      <span
                        class="text-[11px] font-medium text-primary-dark truncate max-w-[100px]"
                        >Salesforce updated</span
                      >
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] text-primary-dark/50"
                        >Performed By</span
                      >
                      <span class="text-[11px] font-medium text-primary-dark"
                        >sarah@acme.com</span
                      >
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] text-primary-dark/50"
                        >Action</span
                      >
                      <span
                        class="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-blue-100 text-blue-700"
                        >Updated</span
                      >
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] text-primary-dark/50"
                        >Project</span
                      >
                      <span class="text-[11px] font-medium text-primary-dark"
                        >Sales Ops</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { PhPlay, PhPause } from "@phosphor-icons/vue";

const sectionRef = ref(null);
const activeTab = ref(0);
const isAutoPlaying = ref(false);
const isUserPaused = ref(false);
const progress = ref(0);
const isVisible = ref(false);
const sensitiveAnimationPhase = ref(0); // 0: initial, 1: click highlight, 2: shielded

const tabs = [
  { id: "users", label: "Users & SSO" },
  { id: "pieces", label: "Pieces" },
  { id: "connections", label: "Connections" },
  { id: "audit", label: "Audit Logs" },
];

const visibilityPieces = ref([
  {
    name: "Salesforce",
    logo: "https://cdn.activepieces.com/pieces/salesforce.png",
    on: true,
  },
  {
    name: "ServiceNow",
    logo: "https://cdn.activepieces.com/pieces/service-now.png",
    on: true,
  },
  {
    name: "Zendesk",
    logo: "https://cdn.activepieces.com/pieces/zendesk.png",
    on: false,
  },
  {
    name: "Jira",
    logo: "https://cdn.activepieces.com/pieces/jira.png",
    on: true,
  },
]);

const pinnedTools = [
  {
    name: "Salesforce",
    logo: "https://cdn.activepieces.com/pieces/salesforce.png",
  },
  { name: "SAP", logo: "https://cdn.activepieces.com/pieces/sap-ariba.png" },
  {
    name: "NetSuite",
    logo: "https://cdn.activepieces.com/pieces/netsuite.png",
  },
];

const serviceAccounts = [
  {
    name: "HubSpot",
    account: "marketing-automation",
    logo: "https://cdn.activepieces.com/pieces/hubspot.png",
  },
  {
    name: "Stripe",
    account: "payments-prod-key",
    logo: "https://cdn.activepieces.com/pieces/stripe.png",
  },
  {
    name: "Slack",
    account: "Automation Bot",
    logo: "https://cdn.activepieces.com/pieces/slack.png",
  },
];

// All possible audit entries to cycle through
const allAuditEntries = [
  { action: "Created", what: "Sarah created Lead Sync flow" },
  { action: "Updated", what: "Mike updated Slack connection" },
  { action: "Deleted", what: "Emma deleted test project" },
  { action: "Invited", what: "John invited alex@acme.com" },
  { action: "Created", what: "Alex created Daily Report flow" },
  { action: "Updated", what: "Lisa updated HubSpot connection" },
  { action: "Created", what: "Tom created Customer Sync" },
  { action: "Deleted", what: "Anna deleted old webhook" },
  { action: "Invited", what: "Chris invited sam@acme.com" },
  { action: "Updated", what: "Kate updated Stripe connection" },
];

// Current visible audit entries (reactive)
const visibleAuditLogs = ref([
  { id: 1, ...allAuditEntries[0] },
  { id: 2, ...allAuditEntries[1] },
  { id: 3, ...allAuditEntries[2] },
  { id: 4, ...allAuditEntries[3] },
]);

let auditEntryIndex = 4;
let auditIdCounter = 5;

const getActionClass = (action) => {
  const classes = {
    Created: "bg-emerald-100 text-emerald-700",
    Updated: "bg-blue-100 text-blue-700",
    Deleted: "bg-red-100 text-red-700",
    Invited: "bg-violet-100 text-violet-700",
  };
  return classes[action] || "bg-gray-100 text-gray-700";
};

// Auto-play functionality
let interval = null;
let observer = null;
// Watch for tab changes and visibility to control animations
watch([activeTab, isVisible], ([tab, visible]) => {
  if (tab === 1 && visible) {
    startToggleAnimation();
  } else {
    stopToggleAnimation();
  }

  if (tab === 2 && visible) {
    startSensitiveAnimation();
  } else {
    stopSensitiveAnimation();
  }

  if (tab === 3 && visible) {
    startAuditAnimation();
  } else {
    stopAuditAnimation();
  }
});

// Toggle animation for Visibility Control card
let toggleAnimationInterval = null;

const startToggleAnimation = () => {
  if (toggleAnimationInterval) clearInterval(toggleAnimationInterval);

  // Toggle a random piece every 1.2 seconds
  toggleAnimationInterval = setInterval(() => {
    if (isVisible.value && activeTab.value === 1) {
      const randomIndex = Math.floor(
        Math.random() * visibilityPieces.value.length,
      );
      visibilityPieces.value[randomIndex].on =
        !visibilityPieces.value[randomIndex].on;
    }
  }, 1200);
};

const stopToggleAnimation = () => {
  if (toggleAnimationInterval) clearInterval(toggleAnimationInterval);
};

// Sensitive connection animation
let sensitiveAnimationTimeout = null;

const runSensitiveAnimationCycle = () => {
  // Phase 0: Initial state (dropdown visible)
  sensitiveAnimationPhase.value = 0;

  // Phase 1: Click highlight after 1s
  sensitiveAnimationTimeout = setTimeout(() => {
    if (!isVisible.value || activeTab.value !== 2) return;
    sensitiveAnimationPhase.value = 1;

    // Phase 2: Shielded state after 0.4s
    sensitiveAnimationTimeout = setTimeout(() => {
      if (!isVisible.value || activeTab.value !== 2) return;
      sensitiveAnimationPhase.value = 2;

      // Reset after 2.5s
      sensitiveAnimationTimeout = setTimeout(() => {
        if (!isVisible.value || activeTab.value !== 2) return;
        runSensitiveAnimationCycle();
      }, 2500);
    }, 400);
  }, 1500);
};

const startSensitiveAnimation = () => {
  stopSensitiveAnimation();
  sensitiveAnimationPhase.value = 0;
  runSensitiveAnimationCycle();
};

const stopSensitiveAnimation = () => {
  if (sensitiveAnimationTimeout) clearTimeout(sensitiveAnimationTimeout);
  sensitiveAnimationPhase.value = 0;
};

// Audit log animation
let auditAnimationInterval = null;

const startAuditAnimation = () => {
  if (auditAnimationInterval) clearInterval(auditAnimationInterval);

  // Add a new entry every 2 seconds
  auditAnimationInterval = setInterval(() => {
    if (isVisible.value && activeTab.value === 3) {
      // Get next entry from the pool
      const nextEntry =
        allAuditEntries[auditEntryIndex % allAuditEntries.length];
      auditEntryIndex++;

      // Add new entry at the top with unique id
      const newEntry = { id: auditIdCounter++, ...nextEntry };
      visibleAuditLogs.value = [
        newEntry,
        ...visibleAuditLogs.value.slice(0, 3),
      ];
    }
  }, 2000);
};

const stopAuditAnimation = () => {
  if (auditAnimationInterval) clearInterval(auditAnimationInterval);
};

const goToTab = (i) => {
  activeTab.value = i;
  progress.value = 0;
  if (isAutoPlaying.value) startAuto();
};

const toggleAuto = () => {
  isAutoPlaying.value = !isAutoPlaying.value;
  isUserPaused.value = !isAutoPlaying.value;
  isAutoPlaying.value ? startAuto() : stopAuto();
};

const startAuto = () => {
  stopAuto();
  interval = setInterval(() => {
    progress.value += 100 / 60; // 6 seconds per tab (60 ticks at 100ms)
    if (progress.value >= 100) {
      progress.value = 0;
      activeTab.value = (activeTab.value + 1) % tabs.length;
    }
  }, 100);
};

const stopAuto = () => {
  if (interval) clearInterval(interval);
  progress.value = 0;
};

onMounted(() => {
  // Intersection observer to detect when section is visible
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      isVisible.value = entry.isIntersecting;

      if (entry.isIntersecting) {
        // Section became visible - start if not manually paused
        if (!isUserPaused.value && !isAutoPlaying.value) {
          isAutoPlaying.value = true;
          startAuto();
        }
      } else {
        // Section not visible - pause (but don't mark as user paused)
        if (isAutoPlaying.value) {
          stopAuto();
          isAutoPlaying.value = false;
        }
      }
    },
    { threshold: 0.3 }, // Trigger when 30% of section is visible
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  stopAuto();
  stopToggleAnimation();
  stopSensitiveAnimation();
  stopAuditAnimation();
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* Audit log list animations */
.audit-list-container {
  position: relative;
}

.audit-list-enter-active {
  transition: all 0.4s ease-out;
}

.audit-list-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
  width: 100%;
}

.audit-list-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.audit-list-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.audit-list-move {
  transition: transform 0.4s ease;
}
</style>
