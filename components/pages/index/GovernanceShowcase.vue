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
              <PagesProductGovernanceActivityTrackingCardContent />
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
              <PagesProductGovernanceSmartFiltersCardContent />
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
              <PagesProductGovernanceFullContextCardContent />
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
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
  if (observer) observer.disconnect();
});
</script>

