<script setup>
import { h, onMounted, onUnmounted } from "vue";
import { useProductSubmenu } from "~/composables/useProductSubmenu";
import ProductHero from "~/components/pages/product/ProductHero.vue";

const { setSections, clearSections } = useProductSubmenu();

const sections = [
  { id: "setup", name: "Roll Out", icon: "network" },
  { id: "enable-building", name: "Onboard & Coach", icon: "users" },
  { id: "drive-engagement", name: "Grow Champions", icon: "star" },
  { id: "track-support", name: "Measure Impact", icon: "analytics" },
];

const getIcon = (iconName) => {
  const icons = {
    network: () =>
      h(
        "svg",
        {
          class: "w-20 h-20",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          style: "stroke-width: 1.5;",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
          }),
        ],
      ),
    users: () =>
      h(
        "svg",
        {
          class: "w-20 h-20",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          style: "stroke-width: 1.5;",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
          }),
        ],
      ),
    star: () =>
      h(
        "svg",
        {
          class: "w-20 h-20",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          style: "stroke-width: 1.5;",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
          }),
        ],
      ),
    analytics: () =>
      h(
        "svg",
        {
          class: "w-20 h-20",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          style: "stroke-width: 1.5;",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          }),
        ],
      ),
  };
  return icons[iconName] || null;
};

useHead({
  title: "AI Adoption Stack",
  meta: [
    {
      name: "description",
      content:
        "Turn your entire organization into AI builders. Templates, analytics, and support to drive adoption from day one.",
    },
  ],
});

// Set sections for the header submenu
onMounted(() => {
  setSections(sections);
});

onUnmounted(() => {
  clearSections();
});

definePageMeta({
  layout: "home",
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <ProductHero
      title="Turn your entire organization into AI builders"
      background-image="/images/sections-heros/ai-adoption.png"
      top-gradient-color="#202C5C"
      bottom-gradient-color="#0B1429"
      bottom-section-background="#0B1429"
      :primary-button="{
        text: 'Start free',
        href: 'https://cloud.activepieces.com/sign-up',
      }"
      :secondary-button="{ text: 'Talk to sales', href: '/sales' }"
    />

    <SectionSeparator
      top-color="#0B1429"
      bottom-color="#ffffff"
      stroke1-color="#59BFEE"
      stroke2-color="rgba(255,255,255, 0.15)"
      stroke3-color="rgba(255,255,255, 0.1)"
      stroke4-color="rgba(255,255,255, 0.05)"
      shadow-color="rgba(255, 255, 255, 0.1)"
      :curve-depth="60"
      :stroke-spacing="12"
      :stroke-thickness="4"
      overlap="0px"
    />

    <!-- Section 1: Roll Out -->
    <section
      id="setup"
      class="py-24 bg-white relative overflow-hidden rounded-t-3xl z-10 bg-dotted"
    >
      <div class="max-w-4xl mx-auto px-4 flex flex-col gap-20 items-center">
        <!-- Section title -->
        <h2
          class="font-sentient font-bold text-5xl text-[#312b60] text-center leading-[1.2] max-w-[560px]"
        >
          From idea to automation in minutes
        </h2>

        <!-- Subsection 1: visual LEFT, text RIGHT -->
        <div class="flex gap-10 items-center w-full">
          <div class="w-[400px] shrink-0">
            <PagesProductAdoptionBrandingComparison />
          </div>
          <div class="w-[400px] flex flex-col gap-3">
            <h3
              class="font-sentient font-bold text-[28px] text-[#312b60] leading-[1.2] text-balance"
            >
              Your brand, your platform
            </h3>
            <p class="text-base text-[#312b60]/80 leading-[1.4]">
              When employees see your logo and colors, they trust it.
              White-label Activepieces with your branding so AI adoption feels
              like an internal initiative—not another external tool to learn.
            </p>
          </div>
        </div>

        <!-- Subsection 2: text LEFT, visual RIGHT -->
        <div class="flex gap-10 items-center w-full">
          <div class="w-[400px] flex flex-col gap-3">
            <h3
              class="font-sentient font-bold text-[28px] text-[#312b60] leading-[1.2] text-balance"
            >
              Get everyone in with one click
            </h3>
            <p class="text-base text-[#312b60]/80 leading-[1.4]">
              No IT tickets. No complex provisioning. Invite your whole team
              instantly—each person gets their own workspace to experiment, plus
              shared spaces for team collaboration.
            </p>
          </div>
          <div class="w-[400px] shrink-0">
            <PagesProductAdoptionOnboardingFlow />
          </div>
        </div>
      </div>
    </section>

    <SectionSeparator
      top-color="#ffffff"
      bottom-color="#350e3a"
      stroke1-color="#59BFEE"
      stroke2-color="rgba(0,0,0, 0.15)"
      stroke3-color="rgba(0,0,0, 0.1)"
      stroke4-color="rgba(0,0,0, 0.05)"
      shadow-color="rgba(255, 255, 255, 0.1)"
      :curve-depth="60"
      :stroke-spacing="12"
      :stroke-thickness="4"
      overlap="0px"
    />

    <!-- Section 2: Onboard & Coach -->
    <PagesProductAdoptionGuidanceSection />

    <SectionSeparator
      top-color="#350e3a"
      bottom-color="#ffffff"
      stroke1-color="#59BFEE"
      stroke2-color="rgba(255,255,255, 0.15)"
      stroke3-color="rgba(255,255,255, 0.1)"
      stroke4-color="rgba(255,255,255, 0.05)"
      shadow-color="rgba(0, 0, 0, 0.1)"
      :curve-depth="60"
      :stroke-spacing="12"
      :stroke-thickness="4"
      overlap="0px"
    />

    <!-- Section 3: Grow Champions -->
    <section
      id="drive-engagement"
      class="py-24 bg-white relative overflow-hidden bg-dotted"
    >
      <div class="max-w-4xl mx-auto px-4 flex flex-col gap-20 items-center">
        <!-- Section title -->
        <h2
          class="font-sentient font-bold text-5xl text-[#312b60] text-center leading-[1.2] max-w-[560px]"
        >
          Visible progress. Real motivation.
        </h2>

        <!-- Subsection 1: text LEFT / visual RIGHT — Leaderboard -->
        <div class="flex gap-10 items-center w-full">
          <div class="w-[400px] flex flex-col gap-3">
            <h3
              class="font-sentient font-bold text-[28px] text-[#312b60] leading-[1.2] text-balance"
            >
              Organization leaderboard
            </h3>
            <p class="text-base text-[#312b60]/80 leading-[1.4]">
              Every organization has hidden champions—people who naturally
              embrace new technology and inspire others. Our leaderboard
              surfaces these heroes so you can celebrate them, learn from them,
              and amplify their impact.
            </p>
          </div>
          <div class="w-[400px] shrink-0">
            <PagesProductAdoptionLeaderboardVisual />
          </div>
        </div>

        <!-- Subsection 2: visual LEFT / text RIGHT — Badges -->
        <div class="flex gap-10 items-center w-full">
          <div class="w-[400px] shrink-0">
            <PagesProductAdoptionBadgesVisual />
          </div>
          <div class="w-[400px] flex flex-col gap-3">
            <h3
              class="font-sentient font-bold text-[28px] text-[#312b60] leading-[1.2] text-balance"
            >
              Badges to reward progress
            </h3>
            <p class="text-base text-[#312b60]/80 leading-[1.4]">
              Our badge system turns the journey into an achievement,
              celebrating milestones and motivating continued growth.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Measure Impact -->
    <section id="track-support" class="pb-24 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4">
        <PagesProductAdoptionDashboardStatsVisual />
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
