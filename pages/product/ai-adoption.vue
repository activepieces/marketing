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
        ]
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
        ]
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
        ]
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
        ]
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
</script>

<template>
  <div>
    <!-- Hero Section -->
    <ProductHero
      title="Turn your entire organization into AI builders"
      subtitle="Templates, analytics, and support to drive adoption from day one"
      background-image="/images/ai-adoption-stack/ai-adoption-stack-hero.png"
      :primary-button="{ text: 'Start free', href: 'https://cloud.activepieces.com/sign-up' }"
      :secondary-button="{ text: 'Talk to sales', href: '/sales' }"
    />

    <!-- Section 1: Roll Out -->
    <section
      id="setup"
      class="py-24 bg-[#081635] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <div
          class="text-center w-full mx-auto rounded-2xl flex gap-8 items-center"
        >
          <div class="w-full h-1 bg-white/10 rounded-full"></div>
          <h2
            class="text-6xl font-sentient font-medium text-white text-balance shrink-0"
          >
            Your AI home. Zero friction.
          </h2>
          <div class="w-full h-1 bg-white/10 rounded-full"></div>
        </div>

        <div class="flex flex-col gap-8">
          <!-- Feature 1: Branding -->
          <div class="rounded-3xl overflow-hidden">
            <div class="grid grid-cols-[2fr_1fr] items-center">
              <div class="h-full flex flex-col">
                <PagesProductAdoptionBrandingComparison />
              </div>
              <div class="p-12 flex flex-col gap-12 bg-white/5">
                <div class="flex flex-col gap-4">
                  <h3
                    class="text-white text-4xl font-sentient font-medium text-balance"
                  >
                    Your brand, your platform
                  </h3>
                  <p class="text-sm text-white/80">
                    When employees see your logo and colors, they trust it.
                    White-label Activepieces with your branding so AI adoption
                    feels like an internal initiative—not another external tool
                    to learn.
                  </p>
                </div>
                <div class="h-1 w-full bg-white/5"></div>
                <ol class="flex flex-col gap-4 rounded-lg">
                  <li class="flex gap-2 items-center text-sm">
                    <span
                      class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                      >1</span
                    >
                    <span class="text-white/80 font-dm"
                      >Your logo in the header builds immediate trust</span
                    >
                  </li>
                  <li class="flex gap-2 items-center text-sm">
                    <span
                      class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                      >2</span
                    >
                    <span class="text-white/80 font-dm"
                      >Your colors make it feel like home</span
                    >
                  </li>
                  <li class="flex gap-2 items-center text-sm">
                    <span
                      class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                      >3</span
                    >
                    <span class="text-white/80 font-dm"
                      >Custom domain keeps everything under your roof</span
                    >
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <!-- Feature 2: Easy Onboarding -->
          <div class="rounded-3xl overflow-hidden">
            <div class="grid grid-cols-[1fr_2fr] items-center">
              <div class="p-12 flex flex-col gap-12 bg-white/5">
                <div class="flex flex-col gap-4">
                  <h3
                    class="text-white text-4xl font-sentient font-medium text-balance"
                  >
                    Get everyone in with one click
                  </h3>
                  <p class="text-sm text-white/80">
                    No IT tickets. No complex provisioning. Invite your whole
                    team instantly—each person gets their own workspace to
                    experiment, plus shared spaces for team collaboration.
                  </p>
                </div>
                <div class="h-1 w-full bg-white/5"></div>
                <ol class="flex flex-col gap-4 rounded-lg">
                  <li class="flex gap-2 items-center text-sm">
                    <span
                      class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                      >1</span
                    >
                    <span class="text-white/80 font-dm"
                      >Bulk invites via CSV or SSO integration</span
                    >
                  </li>
                  <li class="flex gap-2 items-center text-sm">
                    <span
                      class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                      >2</span
                    >
                    <span class="text-white/80 font-dm"
                      >Personal sandboxes so everyone can learn safely</span
                    >
                  </li>
                  <li class="flex gap-2 items-center text-sm">
                    <span
                      class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                      >3</span
                    >
                    <span class="text-white/80 font-dm"
                      >Team projects for cross-functional collaboration</span
                    >
                  </li>
                </ol>
              </div>
              <div class="h-full flex flex-col">
                <PagesProductAdoptionOnboardingFlow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Onboard & Coach -->
    <section
      id="enable-building"
      class="py-24 bg-[#082c41] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <div
          class="text-center w-full mx-auto rounded-2xl flex gap-8 items-center"
        >
          <div class="w-full h-1 bg-white/10 rounded-full"></div>
          <h2
            class="text-6xl font-sentient font-medium text-white text-balance shrink-0"
          >
            Clear path forward. Built-in guidance.
          </h2>
          <div class="w-full h-1 bg-white/10 rounded-full"></div>
        </div>

        <!-- Feature 1: Templates -->
        <div class="rounded-3xl overflow-hidden border-4 border-white/10">
          <div class="grid grid-cols-[1fr_2fr] items-center">
            <div class="p-12 flex flex-col gap-12">
              <div class="flex flex-col gap-4">
                <h3
                  class="text-white text-4xl font-sentient font-medium text-balance"
                >
                  Every team knows exactly what to build
                </h3>
                <p class="text-sm text-white/80">
                  Stop waiting for teams to "figure out" AI. Our curated
                  template library gives HR, Finance, Marketing, Sales, and
                  Operations concrete automations to build—from simple everyday
                  tasks to advanced multi-step workflows.
                </p>
              </div>
              <div class="h-1 w-full bg-white/5"></div>
              <ol class="flex flex-col gap-4 rounded-lg">
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >1</span
                  >
                  <span class="text-white/80 font-dm"
                    >Everyday automations anyone can build in minutes</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >2</span
                  >
                  <span class="text-white/80 font-dm"
                    >Advanced workflows for power users ready to level up</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >3</span
                  >
                  <span class="text-white/80 font-dm"
                    >Department-specific ideas that actually make sense</span
                  >
                </li>
              </ol>
            </div>
            <div class="h-full flex flex-col">
              <PagesProductAdoptionTemplateCards />
            </div>
          </div>
        </div>

        <!-- Feature 2: Personalized Guidance -->
        <div class="rounded-3xl overflow-hidden border-4 border-white/10">
          <div class="grid grid-cols-[2fr_1fr] items-center">
            <div class="h-full flex flex-col border-r-4 border-white/10 p-8">
              <PagesProductAdoptionCoachingEmails />
            </div>
            <div class="p-12 flex flex-col gap-12">
              <div class="flex flex-col gap-4">
                <h3
                  class="text-white text-4xl font-sentient font-medium text-balance"
                >
                  Every team member gets their own AI coach
                </h3>
                <p class="text-sm text-white/80">
                  Generic training doesn't work. Our platform learns each user's
                  role, skill level, and past activity to deliver personalized
                  automation ideas, targeted resources, and timely nudges that
                  keep momentum going.
                </p>
              </div>
              <div class="h-1 w-full bg-white/5"></div>
              <ol class="flex flex-col gap-4 rounded-lg">
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >1</span
                  >
                  <span class="text-white/80 font-dm"
                    >Smart suggestions based on role and department</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >2</span
                  >
                  <span class="text-white/80 font-dm"
                    >Learning paths that adapt to current skill level</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >3</span
                  >
                  <span class="text-white/80 font-dm"
                    >Gentle nudges to re-engage inactive users</span
                  >
                </li>
              </ol>
            </div>
          </div>
        </div>

        <!-- Feature 3: Expert Support -->
        <div class="rounded-3xl overflow-hidden border-4 border-white/10">
          <div class="grid grid-cols-[1fr_2fr] items-center">
            <div class="p-12 flex flex-col gap-12">
              <div class="flex flex-col gap-4">
                <h3
                  class="text-white text-4xl font-sentient font-medium text-balance"
                >
                  Your teams get instant support—you don't have to provide it
                </h3>
                <p class="text-sm text-white/80">
                  When your users get stuck, they don't need to come to you. Our
                  AI Automation Specialists are available directly inside the
                  platform—your teams can book calls, get help, and keep
                  building without burdening your IT or support teams.
                </p>
              </div>
              <div class="h-1 w-full bg-white/5"></div>
              <ol class="flex flex-col gap-4 rounded-lg">
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >1</span
                  >
                  <span class="text-white/80 font-dm"
                    >In-app support—no tickets, no escalations to your
                    team</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >2</span
                  >
                  <span class="text-white/80 font-dm"
                    >Instant access—book calls directly from the platform</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >3</span
                  >
                  <span class="text-white/80 font-dm"
                    >Zero overhead—we handle all user support, you focus on
                    adoption</span
                  >
                </li>
              </ol>
            </div>
            <div class="h-full flex flex-col p-8">
              <PagesProductAdoptionSupportBooking />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Grow Champions -->
    <section
      id="drive-engagement"
      class="py-24 bg-[#064448] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <div
          class="text-center w-full mx-auto rounded-2xl flex gap-8 items-center"
        >
          <div class="w-full h-1 bg-white/10 rounded-full"></div>
          <h2
            class="text-6xl font-sentient font-medium text-white text-balance shrink-0"
          >
            Visible progress. Real motivation.
          </h2>
          <div class="w-full h-1 bg-white/10 rounded-full"></div>
        </div>

        <!-- Feature 1: Leaderboard -->
        <div class="rounded-3xl overflow-hidden border-4 border-white/10">
          <div class="grid grid-cols-[1fr_2fr] items-center">
            <div class="p-12 flex flex-col gap-12">
              <div class="flex flex-col gap-4">
                <h3
                  class="text-white text-4xl font-sentient font-medium text-balance"
                >
                  Discover the AI heroes hiding in your organization
                </h3>
                <p class="text-sm text-white/80">
                  Every organization has hidden champions—people who naturally
                  embrace new technology and inspire others. Our leaderboard
                  surfaces these heroes so you can celebrate them, learn from
                  them, and amplify their impact.
                </p>
              </div>
              <div class="h-1 w-full bg-white/5"></div>
              <ol class="flex flex-col gap-4 rounded-lg">
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >1</span
                  >
                  <span class="text-white/80 font-dm"
                    >Top builders ranked by automations created and impact</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >2</span
                  >
                  <span class="text-white/80 font-dm"
                    >Department rankings to spark healthy competition</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >3</span
                  >
                  <span class="text-white/80 font-dm"
                    >Rising stars—spot newcomers making rapid progress</span
                  >
                </li>
              </ol>
            </div>
            <div class="h-full flex flex-col p-8">
              <PagesProductAdoptionLeaderboard />
            </div>
          </div>
        </div>

        <!-- Feature 2: Badges -->
        <div class="rounded-3xl overflow-hidden border-4 border-white/10">
          <div class="grid grid-cols-[2fr_1fr] items-center">
            <div class="h-full flex flex-col p-8">
              <PagesProductAdoptionBadgeChallenge />
            </div>
            <div class="p-12 flex flex-col gap-12">
              <div class="flex flex-col gap-4">
                <h3
                  class="text-white text-4xl font-sentient font-medium text-balance"
                >
                  Make progress feel rewarding
                </h3>
                <p class="text-sm text-white/80">
                  Our badge system turns the journey into an achievement,
                  celebrating milestones and motivating continued growth.
                </p>
              </div>
              <div class="h-1 w-full bg-white/5"></div>
              <ol class="flex flex-col gap-4 rounded-lg">
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >1</span
                  >
                  <span class="text-white/80 font-dm"
                    >Personal milestones—first automation, 10 workflows, 100
                    hours saved</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >2</span
                  >
                  <span class="text-white/80 font-dm"
                    >Team achievements—helping teammates, sharing
                    automations</span
                  >
                </li>
                <li class="flex gap-2 items-center text-sm">
                  <span
                    class="border border-white/10 rounded-full px-2 py-0.5 text-white/80 flex items-center font-mono"
                    >3</span
                  >
                  <span class="text-white/80 font-dm"
                    >Skill progression—level up from Beginner to Expert</span
                  >
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Measure Impact -->
    <section
      id="track-support"
      class="py-24 bg-[#275d43] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <!-- Header -->
        <div class="flex flex-col gap-8">
          <div
            class="text-center w-full mx-auto rounded-2xl flex gap-8 items-center"
          >
            <div class="w-full h-1 bg-white/10 rounded-full"></div>
            <h2
              class="text-6xl font-sentient font-medium text-white text-balance shrink-0"
            >
              Full visibility. Expert backup.
            </h2>
            <div class="w-full h-1 bg-white/10 rounded-full"></div>
          </div>
          <p class="text-xl text-white/80 text-center max-w-2xl mx-auto">
            Finally, leadership can see AI adoption happening in real-time. No
            more guessing if your investment is paying off.
          </p>
        </div>

        <!-- Full-width Interactive Dashboard -->
        <div class="">
          <PagesProductAdoptionAnalyticsDashboard />
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
