<script setup>
import { h } from "vue";

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
</script>

<template>
  <div>
    <ProductSubmenuContainer :sections="sections" />

    <!-- Hero Section -->
    <section class="w-full relative section-hero-dark pt-4 pb-16 lg:pb-24">
      <img
        src="/images/ai-adoption-stack/ai-adoption-stack-hero.png"
        alt=""
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <ProductSubmenu />
        <div class="max-w-4xl mx-auto text-center pt-16 lg:pt-28">
          <h1 class="headline-hero text-white mb-8 text-balance">
            Turn your entire organization into AI builders
          </h1>
          <p class="body-large text-gray-400 max-w-2xl mx-auto mb-10">
            Templates, analytics, and support to drive adoption from day one
          </p>
          <div class="flex justify-center mb-12">
            <div class="w-full max-w-[85%]">
              <PagesIndexCompanyLogos class="relative z-10" />
            </div>
          </div>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              href="https://cloud.activepieces.com/sign-up"
              class="inline-flex items-center px-7 py-3.5 text-base font-semibold text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg shadow-white/10"
            >
              Start free
            </a>
            <a
              href="/sales"
              class="inline-flex items-center px-7 py-3.5 text-base font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all hover:border-white/40"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 1: Roll Out -->
    <section
      id="setup"
      class="py-24 section-warm border-t border-gray-100 relative overflow-hidden"
    >
      <div class="absolute inset-0 gradient-mesh z-0"></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <div class="flex flex-col items-center gap-5">
            <component :is="getIcon('network')" class="text-sky-500" />
            <h2 class="headline-section text-gray-900">
              Your AI home. Zero friction.
            </h2>
          </div>
        </div>

        <!-- Feature 1: Branding -->
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-24 accent-sky">
          <div class="order-2 lg:order-1">
            <PagesProductAdoptionBrandingComparison />
          </div>
          <div class="order-1 lg:order-2">
            <h3 class="headline-feature text-gray-900 mb-4">
              Your brand, your platform
            </h3>
            <p class="body-large text-gray-600 mb-8">
              When employees see your logo and colors, they trust it.
              White-label Activepieces with your branding so AI adoption feels
              like an internal initiative—not another external tool to learn.
            </p>
            <ol class="numbered-list">
              <li class="numbered-list-item">
                <span class="numbered-list-number">01</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Your logo</strong> in the
                  header builds immediate trust</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">02</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Your colors</strong> make it
                  feel like home</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">03</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Custom domain</strong> keeps
                  everything under your roof</span
                >
              </li>
            </ol>
          </div>
        </div>

        <!-- Feature 2: Easy Onboarding -->
        <div class="grid lg:grid-cols-2 gap-16 items-center accent-sky">
          <div>
            <h3 class="headline-feature text-gray-900 mb-4">
              Get everyone in with one click
            </h3>
            <p class="body-large text-gray-600 mb-8">
              No IT tickets. No complex provisioning. Invite your whole team
              instantly—each person gets their own workspace to experiment, plus
              shared spaces for team collaboration.
            </p>
            <ol class="numbered-list">
              <li class="numbered-list-item">
                <span class="numbered-list-number">01</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Bulk invites</strong> via CSV
                  or SSO integration</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">02</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Personal sandboxes</strong> so
                  everyone can learn safely</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">03</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Team projects</strong> for
                  cross-functional collaboration</span
                >
              </li>
            </ol>
          </div>
          <div>
            <PagesProductAdoptionOnboardingFlow />
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Onboard & Coach -->
    <section
      id="enable-building"
      class="py-24 section-cool border-t border-gray-200 relative overflow-hidden"
    >
      <div class="absolute inset-0 gradient-mesh z-0"></div>
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <div class="flex flex-col items-center gap-5">
            <component :is="getIcon('users')" class="text-amber-500" />
            <h2 class="headline-section text-gray-900">
              Clear path forward. Built-in guidance.
            </h2>
          </div>
        </div>

        <!-- Feature 1: Templates -->
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-24 accent-amber">
          <div>
            <h3 class="headline-feature text-gray-900 mb-4">
              Every team knows exactly what to build
            </h3>
            <p class="body-large text-gray-600 mb-8">
              Stop waiting for teams to "figure out" AI. Our curated template
              library gives HR, Finance, Marketing, Sales, and Operations
              concrete automations to build—from simple everyday tasks to
              advanced multi-step workflows.
            </p>
            <ol class="numbered-list">
              <li class="numbered-list-item">
                <span class="numbered-list-number">01</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Everyday automations</strong>
                  anyone can build in minutes</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">02</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Advanced workflows</strong> for
                  power users ready to level up</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">03</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Department-specific</strong>
                  ideas that actually make sense</span
                >
              </li>
            </ol>
          </div>
          <div class="flex items-center justify-center min-h-[350px]">
            <PagesProductAdoptionTemplateCards />
          </div>
        </div>

        <!-- Feature 2: Personalized Guidance -->
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-24 accent-amber">
          <div class="order-2 lg:order-1">
            <PagesProductAdoptionCoachingEmails />
          </div>
          <div class="order-1 lg:order-2">
            <h3 class="headline-feature text-gray-900 mb-4">
              Every team member gets their own AI coach
            </h3>
            <p class="body-large text-gray-600 mb-8">
              Generic training doesn't work. Our platform learns each user's
              role, skill level, and past activity to deliver personalized
              automation ideas, targeted resources, and timely nudges that keep
              momentum going.
            </p>
            <ol class="numbered-list">
              <li class="numbered-list-item">
                <span class="numbered-list-number">01</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Smart suggestions</strong>
                  based on role and department</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">02</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Learning paths</strong> that
                  adapt to current skill level</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">03</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Gentle nudges</strong> to
                  re-engage inactive users</span
                >
              </li>
            </ol>
          </div>
        </div>

        <!-- Feature 3: Expert Support -->
        <div class="grid lg:grid-cols-2 gap-16 items-center accent-amber">
          <div>
            <h3 class="headline-feature text-gray-900 mb-4">
              Your teams get instant support—you don't have to provide it
            </h3>
            <p class="body-large text-gray-600 mb-8">
              When your users get stuck, they don't need to come to you. Our AI
              Automation Specialists are available directly inside the
              platform—your teams can book calls, get help, and keep building
              without burdening your IT or support teams.
            </p>
            <ol class="numbered-list">
              <li class="numbered-list-item">
                <span class="numbered-list-number">01</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">In-app support</strong>—no
                  tickets, no escalations to your team</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">02</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Instant access</strong>—book
                  calls directly from the platform</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">03</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Zero overhead</strong>—we
                  handle all user support, you focus on adoption</span
                >
              </li>
            </ol>
          </div>
          <div class="flex items-center justify-center min-h-[350px]">
            <PagesProductAdoptionSupportBooking />
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Grow Champions -->
    <section
      id="drive-engagement"
      class="py-24 section-clean border-t border-gray-100 relative overflow-hidden"
    >
      <div class="max-w-[1230px] mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <div class="flex flex-col items-center gap-5">
            <component :is="getIcon('star')" class="text-pink-500" />
            <h2 class="headline-section text-gray-900">
              Visible progress. Real motivation.
            </h2>
          </div>
        </div>

        <!-- Feature 1: Leaderboard -->
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-24 accent-pink">
          <div>
            <h3 class="headline-feature text-gray-900 mb-4">
              Discover the AI heroes hiding in your organization
            </h3>
            <p class="body-large text-gray-600 mb-8">
              Every organization has hidden champions—people who naturally
              embrace new technology and inspire others. Our leaderboard
              surfaces these heroes so you can celebrate them, learn from them,
              and amplify their impact.
            </p>
            <ol class="numbered-list">
              <li class="numbered-list-item">
                <span class="numbered-list-number">01</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Top builders</strong> ranked by
                  automations created and impact</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">02</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Department rankings</strong> to
                  spark healthy competition</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">03</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Rising stars</strong>—spot
                  newcomers making rapid progress</span
                >
              </li>
            </ol>
          </div>
          <div>
            <PagesProductAdoptionLeaderboard />
          </div>
        </div>

        <!-- Feature 2: Badges -->
        <div class="grid lg:grid-cols-2 gap-16 items-center accent-pink">
          <div class="order-2 lg:order-1">
            <PagesProductAdoptionBadgeChallenge />
          </div>
          <div class="order-1 lg:order-2">
            <h3 class="headline-feature text-gray-900 mb-4">
              Make progress feel rewarding
            </h3>
            <p class="body-large text-gray-600 mb-8">
              Our badge system turns the journey into an achievement,
              celebrating milestones and motivating continued growth.
            </p>
            <ol class="numbered-list">
              <li class="numbered-list-item">
                <span class="numbered-list-number">01</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Personal milestones</strong
                  >—first automation, 10 workflows, 100 hours saved</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">02</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Team achievements</strong
                  >—helping teammates, sharing automations</span
                >
              </li>
              <li class="numbered-list-item">
                <span class="numbered-list-number">03</span>
                <span class="text-gray-700 font-dm"
                  ><strong class="font-semibold">Skill progression</strong
                  >—level up from Beginner to Expert</span
                >
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Measure Impact -->
    <section
      id="track-support"
      class="py-24 section-warm border-t border-gray-200 relative overflow-hidden"
    >
      <div class="max-w-[1400px] mx-auto px-4 relative z-10">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="flex flex-col items-center gap-5">
            <component :is="getIcon('analytics')" class="text-emerald-500" />
            <h2 class="headline-section text-gray-900">
              Full visibility. Expert backup.
            </h2>
          </div>
          <p class="body-large text-gray-600 mt-6 max-w-2xl mx-auto">
            Finally, leadership can see AI adoption happening in real-time. No
            more guessing if your investment is paying off.
          </p>
        </div>

        <!-- Full-width Interactive Dashboard -->
        <div class="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50">
          <PagesProductAdoptionAnalyticsDashboard />
        </div>
      </div>
    </section>

    <!-- Prev/Next Navigation -->
    <ProductNavigation />
  </div>
</template>
