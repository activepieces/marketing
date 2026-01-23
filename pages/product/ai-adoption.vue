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
      subtitle="Templates, analytics, and support to drive adoption from day one"
      background-image="/images/ai-adoption-stack/ai-adoption-stack-hero.png"
      :primary-button="{
        text: 'Start free',
        href: 'https://cloud.activepieces.com/sign-up',
      }"
      :secondary-button="{ text: 'Talk to sales', href: '/sales' }"
    />

    <!-- Section 1: Roll Out -->
    <section
      id="setup"
      class="py-24 bg-gradient-to-br from-[#ebe9e4] to-[#dedad3] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader title="Your AI home. Zero friction." />

        <div class="flex flex-col gap-8">
          <!-- Feature 1: Branding -->
          <PagesProductAdoptionFeatureCard
            content-position="left"
            :content-ratio="2"
            variant="subtle"
            title="Your brand, your platform"
            description="When employees see your logo and colors, they trust it. White-label Activepieces with your branding so AI adoption feels like an internal initiative—not another external tool to learn."
            :items="[
              'Your logo in the header builds immediate trust',
              'Your colors make it feel like home',
              'Custom domain keeps everything under your roof',
            ]"
          >
            <PagesProductAdoptionBrandingComparison />
          </PagesProductAdoptionFeatureCard>

          <!-- Feature 2: Easy Onboarding -->
          <PagesProductAdoptionFeatureCard
            content-position="right"
            :content-ratio="2"
            variant="subtle"
            title="Get everyone in with one click"
            description="No IT tickets. No complex provisioning. Invite your whole team instantly—each person gets their own workspace to experiment, plus shared spaces for team collaboration."
            :items="[
              'Bulk invites via CSV or SSO integration',
              'Personal sandboxes so everyone can learn safely',
              'Team projects for cross-functional collaboration',
            ]"
          >
            <PagesProductAdoptionOnboardingFlow />
          </PagesProductAdoptionFeatureCard>
        </div>
      </div>
    </section>

    <!-- Section 2: Onboard & Coach -->
    <section
      id="enable-building"
      class="py-24 bg-white relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader
          title="Clear path forward. Built-in guidance."
        />

        <!-- New card: Pick from templates -->
        <div class="w-full max-w-4xl">
          <PagesProductAdoptionPickFromTemplates />
        </div>

        <!-- Feature 1: Templates -->
        <PagesProductAdoptionFeatureCard
          content-position="right"
          :content-ratio="2"
          variant="bordered"
          title="Every team knows exactly what to build"
          description='Stop waiting for teams to "figure out" AI. Our curated template library gives HR, Finance, Marketing, Sales, and Operations concrete automations to build—from simple everyday tasks to advanced multi-step workflows.'
          :items="[
            'Everyday automations anyone can build in minutes',
            'Advanced workflows for power users ready to level up',
            'Department-specific ideas that actually make sense',
          ]"
        >
          <PagesProductAdoptionTemplateCards />
        </PagesProductAdoptionFeatureCard>

        <!-- Feature 2: Personalized Guidance -->
        <PagesProductAdoptionFeatureCard
          content-position="left"
          :content-ratio="2"
          variant="bordered"
          :content-border="true"
          title="Every team member gets their own AI coach"
          description="Generic training doesn't work. Our platform learns each user's role, skill level, and past activity to deliver personalized automation ideas, targeted resources, and timely nudges that keep momentum going."
          :items="[
            'Smart suggestions based on role and department',
            'Learning paths that adapt to current skill level',
            'Gentle nudges to re-engage inactive users',
          ]"
        >
          <PagesProductAdoptionCoachingEmails />
        </PagesProductAdoptionFeatureCard>

        <!-- Feature 3: Expert Support -->
        <PagesProductAdoptionFeatureCard
          content-position="right"
          :content-ratio="2"
          variant="bordered"
          :content-padding="true"
          title="Your teams get instant support—you don't have to provide it"
          description="When your users get stuck, they don't need to come to you. Our AI Automation Specialists are available directly inside the platform—your teams can book calls, get help, and keep building without burdening your IT or support teams."
          :items="[
            'In-app support—no tickets, no escalations to your team',
            'Instant access—book calls directly from the platform',
            'Zero overhead—we handle all user support, you focus on adoption',
          ]"
        >
          <PagesProductAdoptionSupportBooking />
        </PagesProductAdoptionFeatureCard>
      </div>
    </section>

    <!-- Section 3: Grow Champions -->
    <section
      id="drive-engagement"
      class="py-24 bg-gradient-to-br from-[#e5e3de] to-[#d9d5ce] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader title="Visible progress. Real motivation." />

        <!-- Feature 1: Leaderboard -->
        <PagesProductAdoptionFeatureCard
          content-position="right"
          :content-ratio="2"
          variant="bordered"
          :content-padding="true"
          title="Discover the AI heroes hiding in your organization"
          description="Every organization has hidden champions—people who naturally embrace new technology and inspire others. Our leaderboard surfaces these heroes so you can celebrate them, learn from them, and amplify their impact."
          :items="[
            'Top builders ranked by automations created and impact',
            'Department rankings to spark healthy competition',
            'Rising stars—spot newcomers making rapid progress',
          ]"
        >
          <PagesProductAdoptionLeaderboard />
        </PagesProductAdoptionFeatureCard>

        <!-- Feature 2: Badges -->
        <PagesProductAdoptionFeatureCard
          content-position="left"
          :content-ratio="2"
          variant="bordered"
          :content-padding="true"
          title="Make progress feel rewarding"
          description="Our badge system turns the journey into an achievement, celebrating milestones and motivating continued growth."
          :items="[
            'Personal milestones—first automation, 10 workflows, 100 hours saved',
            'Team achievements—helping teammates, sharing automations',
            'Skill progression—level up from Beginner to Expert',
          ]"
        >
          <PagesProductAdoptionBadgeChallenge />
        </PagesProductAdoptionFeatureCard>
      </div>
    </section>

    <!-- Section 4: Measure Impact -->
    <section
      id="track-support"
      class="py-24 bg-gradient-to-br from-[#e2e0db] to-[#d6d2cb] relative overflow-hidden rounded-t-3xl -mt-8 z-10"
    >
      <div class="max-w-7xl mx-auto px-4 relative z-10 flex flex-col gap-20">
        <PagesProductSectionHeader
          title="Full visibility. Expert backup."
          subtitle="Finally, leadership can see AI adoption happening in real-time. No more guessing if your investment is paying off."
        />

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
