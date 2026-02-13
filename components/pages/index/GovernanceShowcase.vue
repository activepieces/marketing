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
              <PagesProductGovernanceVisibilityControlCard />
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
              <PagesProductGovernancePrivatePiecesCard />
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
              <PagesProductGovernancePinnedToolsCard />
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
              <PagesProductGovernanceCentralizedCredentialsCardContent />
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
              <PagesProductGovernanceAiProvidersCardContent />
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
              <PagesProductGovernanceSensitiveConnectionsCardContent />
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
const tabs = [
  { id: "users", label: "Users & SSO" },
  { id: "pieces", label: "Pieces" },
  { id: "connections", label: "Connections" },
  { id: "audit", label: "Audit Logs" },
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
  if (tab === 3 && visible) {
    startAuditAnimation();
  } else {
    stopAuditAnimation();
  }
});

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
