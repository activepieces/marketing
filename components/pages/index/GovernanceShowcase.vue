<template>
  <section ref="sectionRef" class="relative py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header row -->
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
        <div class="max-w-2xl">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Enterprise control, zero complexity
          </h2>
          <p class="text-xl text-gray-500">
            IT oversight tools that enterprise teams need—without slowing anyone down.
          </p>
        </div>
        <NuxtLink 
          to="/product/governance-and-management"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
        >
          Explore Governance
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Tabs row with progress -->
      <div class="flex items-center gap-2 mb-8">
        <button
          v-for="(tab, i) in tabs"
          :key="tab.id"
          @click="goToTab(i)"
          class="relative px-4 py-2 text-[15px] font-medium transition-all duration-300 rounded-full overflow-hidden"
          :class="activeTab === i 
            ? 'bg-gray-700 text-white' 
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"
        >
          <!-- Progress fill -->
          <span 
            v-if="activeTab === i"
            class="absolute inset-0 bg-gray-900 rounded-l-full origin-left transition-transform duration-100 ease-linear"
            :style="{ transform: `scaleX(${isAutoPlaying ? progress / 100 : 1})` }"
          ></span>
          <span class="relative z-10">{{ tab.label }}</span>
        </button>
        
        <!-- Play/Pause button -->
        <button 
          @click="toggleAuto" 
          class="ml-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg v-if="isAutoPlaying" class="w-4 h-4 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
          <svg v-else class="w-4 h-4 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <!-- ==================== USERS TAB ==================== -->
        <template v-if="activeTab === 0">
          <!-- SSO Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <!-- Top 1/3: Title -->
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">Single Sign-On</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Secure access with SAML 2.0 and Google. Connect your existing identity provider.</p>
            </div>
            <!-- Bottom 2/3: Illustration -->
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center">
              <div class="relative w-full h-full flex items-center justify-center">
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#f5f5f7] rounded-2xl shadow-sm flex items-center justify-center z-10">
                  <img src="/logos/okta.svg" class="h-7" alt="Okta" />
                </div>
                <div class="absolute left-[10%] top-[15%] w-12 h-12 bg-[#f5f5f7] rounded-xl shadow-sm flex items-center justify-center">
                  <img src="/logos/google-workspace.svg" class="h-4" alt="Google" />
                </div>
                <div class="absolute right-[10%] top-[15%] w-12 h-12 bg-[#f5f5f7] rounded-xl shadow-sm flex items-center justify-center">
                  <img src="/logos/microsoft-entra.svg" class="h-4" alt="Microsoft" />
                </div>
                <div class="absolute left-[15%] bottom-[15%] w-10 h-10 bg-[#f5f5f7] rounded-xl shadow-sm flex items-center justify-center">
                  <img src="/logos/auth0.svg" class="h-3" alt="Auth0" />
                </div>
                <div class="absolute right-[15%] bottom-[15%] w-10 h-10 bg-[#f5f5f7] rounded-xl shadow-sm flex items-center justify-center">
                  <img src="/logos/ping-identity.svg" class="h-3" alt="Ping" />
                </div>
              </div>
            </div>
          </div>

          <!-- SCIM Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">SCIM Provisioning</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Automatically sync users and groups from your identity provider. Fast onboarding.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center">
              <div class="w-full max-w-[220px] space-y-2.5">
                <div v-for="(user, i) in scimUsers" :key="user.name" 
                  class="flex items-center gap-3 bg-[#f5f5f7] rounded-xl px-4 py-3"
                  :style="{ transform: `translateX(${(i - 1) * 12}px)` }"
                >
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" :style="{ backgroundColor: user.color }">
                    {{ user.initials }}
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                    <p class="text-[11px] text-gray-400">{{ user.team }}</p>
                  </div>
                  <svg class="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- RBAC Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">Advanced RBAC</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Granular role-based access control. Define exactly who can do what across your org.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center py-4">
              <div class="w-full max-w-[220px] space-y-3">
                <div v-for="role in roles" :key="role.name" class="bg-[#f5f5f7] rounded-xl p-4">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                      <span class="text-lg">{{ role.icon }}</span>
                      <span class="text-sm font-semibold text-gray-900">{{ role.name }}</span>
                    </div>
                    <span class="text-xs text-gray-400">{{ role.count }} users</span>
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="perm in role.perms" :key="perm" class="px-2 py-0.5 bg-white text-gray-600 text-[10px] font-medium rounded-full">
                      {{ perm }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ==================== PIECES TAB ==================== -->
        <template v-if="activeTab === 1">
          <!-- Visibility Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">Visibility Control</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Show or hide integrations per team. Keep your workspace clean and focused.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center">
              <div class="w-full max-w-[220px] bg-[#f5f5f7] rounded-xl overflow-hidden">
                <div v-for="piece in visibilityPieces" :key="piece.name" class="flex items-center justify-between px-4 py-3 border-b border-white/50 last:border-0">
                  <div class="flex items-center gap-3">
                    <img :src="piece.logo" class="w-8 h-8 rounded-lg" :alt="piece.name" />
                    <span class="text-sm font-medium text-gray-900">{{ piece.name }}</span>
                  </div>
                  <div class="w-10 h-5 rounded-full" :class="piece.on ? 'bg-gray-900' : 'bg-gray-300'">
                    <div class="w-4 h-4 mt-0.5 bg-white rounded-full shadow transition-transform" :class="piece.on ? 'translate-x-5' : 'translate-x-0.5'"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Private Pieces Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">Private Pieces</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Build custom integrations that only exist in your instance. Your code, your control.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center py-4">
              <div class="w-full max-w-[220px] space-y-3">
                <div class="bg-[#f5f5f7] rounded-xl p-4 border-2 border-dashed border-violet-200">
                  <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900">Internal API</p>
                      <p class="text-[11px] text-violet-600 font-medium">🔒 Private</p>
                    </div>
                  </div>
                </div>
                <div class="bg-[#f5f5f7] rounded-xl p-4 border-2 border-dashed border-emerald-200">
                  <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900">Legacy System</p>
                      <p class="text-[11px] text-emerald-600 font-medium">🔒 Private</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pinned Tools Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">Pinned Tools</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Pin your most-used integrations to the top. Quick access for your team's essentials.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center">
              <div class="flex gap-4">
                <div v-for="tool in pinnedTools" :key="tool.name" class="relative bg-[#f5f5f7] rounded-2xl p-4 text-center">
                  <div class="relative mb-3">
                    <img :src="tool.logo" class="w-14 h-14 mx-auto rounded-xl" :alt="tool.name" />
                    <span class="absolute -top-2 -right-2 text-lg">📌</span>
                  </div>
                  <p class="text-xs font-medium text-gray-900">{{ tool.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ==================== CONNECTIONS TAB ==================== -->
        <template v-if="activeTab === 2">
          <!-- Global Connections Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">Global Connections</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Set up a connection once and reuse it across all projects. No duplicate credentials.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center">
              <div class="w-full max-w-[220px] space-y-2.5">
                <div v-for="conn in globalConnections" :key="conn.name" class="flex items-center gap-3 bg-[#f5f5f7] rounded-xl px-4 py-3">
                  <img :src="conn.logo" class="w-9 h-9 rounded-lg" :alt="conn.name" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">{{ conn.name }}</p>
                    <p class="text-[11px] text-gray-400 truncate">{{ conn.account }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-900">{{ conn.projects }}</p>
                    <p class="text-[9px] text-gray-400">projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Centralized Billing Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">Centralized Billing</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Full visibility into AI provider costs. Track spend across teams in one dashboard.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center">
              <div class="w-full max-w-[200px] bg-[#f5f5f7] rounded-2xl p-5">
                <div class="text-center mb-4">
                  <p class="text-4xl font-bold text-gray-900">$2,847</p>
                  <p class="text-sm text-gray-500 mt-1">This month</p>
                </div>
                <div class="flex items-center justify-between text-sm mb-3">
                  <span class="text-gray-500">vs last month</span>
                  <span class="text-emerald-600 font-semibold">↓ 18%</span>
                </div>
                <div class="h-2.5 bg-white rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style="width: 68%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- IT-Managed Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">IT-Managed</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Credentials stored securely and managed by IT. Full audit trail on every access.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center">
              <div class="text-center">
                <div class="w-24 h-24 mx-auto mb-5 bg-[#f5f5f7] rounded-3xl flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <div class="flex justify-center gap-2">
                  <span class="px-3 py-1.5 bg-[#f5f5f7] text-gray-700 text-xs font-medium rounded-full">Encrypted</span>
                  <span class="px-3 py-1.5 bg-[#f5f5f7] text-gray-700 text-xs font-medium rounded-full">Audited</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ==================== AUDIT TAB ==================== -->
        <template v-if="activeTab === 3">
          <!-- Complete History Card (Dark) -->
          <div class="bg-[#1d1d1f] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-white mb-1">Complete History</h3>
              <p class="text-sm text-gray-400 leading-relaxed">Every action logged automatically. Know who did what and when, always.</p>
            </div>
            <div class="flex-1 bg-[#2d2d2f] rounded-2xl m-4 flex items-center justify-center">
              <div class="w-full max-w-[240px] space-y-2">
                <div v-for="log in auditPreview" :key="log.id" class="flex items-center gap-2.5 bg-[#1d1d1f] rounded-xl px-4 py-3">
                  <span class="text-[11px] text-gray-500 font-mono w-10">{{ log.time }}</span>
                  <div class="w-6 h-6 rounded-full flex items-center justify-center text-[9px] text-white font-bold" :style="{ backgroundColor: log.color }">
                    {{ log.initials }}
                  </div>
                  <span class="px-1.5 py-0.5 text-[9px] font-semibold rounded" :class="getActionClassDark(log.action)">
                    {{ log.action }}
                  </span>
                  <span class="text-xs text-gray-300 truncate flex-1">{{ log.what }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Smart Filters Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">Smart Filters</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Filter by user, action, date, or resource. Find what you need in seconds.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center">
              <div class="w-full max-w-[220px]">
                <div class="bg-[#f5f5f7] rounded-xl p-4">
                  <div class="flex items-center gap-2 px-3 py-2 bg-white rounded-lg mb-4">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <span class="text-sm text-gray-400">Search logs...</span>
                  </div>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">User: Sarah</span>
                    <span class="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">Last 7d</span>
                    <span class="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">Created</span>
                  </div>
                  <p class="text-center text-sm text-gray-500">247 results found</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Compliance Card -->
          <div class="bg-[#f5f5f7] rounded-[20px] overflow-hidden h-[400px] flex flex-col">
            <div class="p-6 pb-4">
              <h3 class="text-[22px] font-semibold text-gray-900 mb-1">Compliance</h3>
              <p class="text-sm text-gray-500 leading-relaxed">SOC 2 Type II certified with GDPR compliance. Built for enterprise from day one.</p>
            </div>
            <div class="flex-1 bg-white rounded-2xl m-4 flex items-center justify-center">
              <div class="flex gap-3">
                <div class="bg-[#f5f5f7] rounded-2xl p-5 text-center w-24">
                  <p class="text-2xl font-bold text-gray-900 mb-1">SOC 2</p>
                  <p class="text-xs text-gray-500">Type II</p>
                </div>
                <div class="bg-[#f5f5f7] rounded-2xl p-5 text-center w-24">
                  <p class="text-2xl font-bold text-gray-900 mb-1">GDPR</p>
                  <p class="text-xs text-gray-500">Compliant</p>
                </div>
                <div class="bg-[#f5f5f7] rounded-2xl p-5 text-center w-24">
                  <p class="text-2xl font-bold text-gray-900 mb-1">90d</p>
                  <p class="text-xs text-gray-500">Retention</p>
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
import { ref, onMounted, onUnmounted } from 'vue';

const sectionRef = ref(null);
const activeTab = ref(0);
const isAutoPlaying = ref(false);
const isUserPaused = ref(false);
const progress = ref(0);

const tabs = [
  { id: 'users', label: 'Users & SSO' },
  { id: 'pieces', label: 'Pieces' },
  { id: 'connections', label: 'Connections' },
  { id: 'audit', label: 'Audit Logs' },
];

const scimUsers = [
  { name: 'Sarah Chen', initials: 'SC', team: 'Engineering', color: '#8b5cf6' },
  { name: 'Mike Johnson', initials: 'MJ', team: 'Marketing', color: '#3b82f6' },
  { name: 'Emma Wilson', initials: 'EW', team: 'Sales', color: '#f59e0b' },
];

const roles = [
  { name: 'Admin', icon: '👑', count: 3, perms: ['Full Access', 'Users', 'Billing'] },
  { name: 'Builder', icon: '🔨', count: 28, perms: ['Create', 'Edit', 'Run'] },
];

const visibilityPieces = [
  { name: 'Slack', logo: 'https://cdn.activepieces.com/pieces/slack.png', on: true },
  { name: 'HubSpot', logo: 'https://cdn.activepieces.com/pieces/hubspot.png', on: true },
  { name: 'Notion', logo: 'https://cdn.activepieces.com/pieces/notion.png', on: true },
  { name: 'Discord', logo: 'https://cdn.activepieces.com/pieces/discord.png', on: false },
];

const pinnedTools = [
  { name: 'Slack', logo: 'https://cdn.activepieces.com/pieces/slack.png' },
  { name: 'Sheets', logo: 'https://cdn.activepieces.com/pieces/google-sheets.png' },
  { name: 'HubSpot', logo: 'https://cdn.activepieces.com/pieces/hubspot.png' },
];

const globalConnections = [
  { name: 'Google Workspace', account: 'admin@company.com', projects: 23, logo: 'https://cdn.activepieces.com/pieces/google.png' },
  { name: 'Microsoft 365', account: 'service@company.com', projects: 18, logo: 'https://cdn.activepieces.com/pieces/microsoft-365.png' },
  { name: 'Slack', account: 'Workspace Bot', projects: 31, logo: 'https://cdn.activepieces.com/pieces/slack.png' },
];

const auditPreview = [
  { id: 1, time: '14:32', initials: 'SC', action: 'Created', what: 'Lead Qualifier', color: '#8b5cf6' },
  { id: 2, time: '14:28', initials: 'MJ', action: 'Executed', what: 'Daily Report', color: '#3b82f6' },
  { id: 3, time: '14:15', initials: 'EW', action: 'Updated', what: 'HubSpot', color: '#f59e0b' },
  { id: 4, time: '13:58', initials: 'JS', action: 'Login', what: 'via Okta', color: '#10b981' },
];

const getActionClassDark = (action) => {
  const classes = {
    'Created': 'bg-emerald-500/20 text-emerald-400',
    'Updated': 'bg-blue-500/20 text-blue-400',
    'Executed': 'bg-violet-500/20 text-violet-400',
    'Login': 'bg-amber-500/20 text-amber-400',
  };
  return classes[action] || 'bg-gray-500/20 text-gray-400';
};

// Auto-play functionality
let interval = null;
let observer = null;

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
    { threshold: 0.3 } // Trigger when 30% of section is visible
  );
  
  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  stopAuto();
  if (observer) observer.disconnect();
});
</script>
