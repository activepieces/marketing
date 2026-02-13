<script setup>
import ProductHero from "~/components/pages/product/ProductHero.vue";
import PricingToggle from "~/components/pages/pricing/PricingToggle.vue";
import PricingPlanCard from "~/components/pages/pricing/PricingPlanCard.vue";
import CommunityEditionCard from "~/components/pages/pricing/CommunityEditionCard.vue";
import { useRoute } from "vue-router";

const pageTitle = "Pricing";
const metaDesc =
  "Self host Activepieces as an alternative to Zapier to run unlimited tasks for free, or use Activepieces Cloud at a fraction of Zapier or Workato cost.";
const metaKeywords =
  "free zapier alternative, open source workato, free zapier, best alternative to zapier";

definePageMeta({
  layout: "pricing",
});

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: metaDesc },
    { name: "keywords", content: metaKeywords },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: metaDesc },
  ],
});

const productMode = ref("automate");
const route = useRoute();
const showAppSumo = computed(() => route.fullPath.includes("appsumo"));

// Helper to parse "Main text – Description" format
const parseFeature = (featureText) => {
  const parts = featureText.split(" – ");
  return {
    text: parts[0],
    description: parts[1] || null,
  };
};

// Plan highlights data
const planHighlights = {
  standard: [
    "10 free active flows – Build and run your first 10 automations 100% free of charge",
    "Unlimited runs – We never charge for execution, like nowhere else",
    "AI agents – AI that thinks and controls hundreds of apps in one place",
    "Unlimited MCP servers",
    "Unlimited tables",
    "Email support",
  ],
  ultimate: [
    {
      category: "Security & Governance",
      features: [
        "Team & Personal Projects – Separate teams, data, and automations",
        "Piece Access Controls – Choose which pieces each project can use",
        "Global Connections – Shared service-account connections for all projects",
        "Custom RBAC – Define granular roles and permissions",
        "SSO – Centralized identity and secure access",
      ],
    },
    {
      category: "Control & Compliance",
      features: [
        "Audit Logs – Track all user and system activity",
        "Centralized AI Billing – Manage AI usage and costs in one place",
        "Management APIs – Automate projects, flows, and connections",
      ],
    },
    {
      category: "Delivery & Reliability",
      features: [
        "Git Sync – Sync flows with your Git repo",
        "Release Management – Promote changes across environments",
        "Private Pieces – Deploy internal or custom integrations",
      ],
    },
    {
      category: "Enterprise Deployment & Success",
      features: [
        "Cloud or On-Prem – Run Activepieces where you need it",
        "Dedicated Support – Priority help from our team",
        "Training & Adoption Programs – Guided onboarding and enablement",
      ],
    },
  ],
};

// Transform standard features for PricingPlanCard
const standardFeatures = computed(() =>
  planHighlights.standard.map((f, idx) => {
    const parsed = parseFeature(f);
    return {
      text: parsed.text,
      description: parsed.description,
      isHighlighted: idx < 3,
    };
  }),
);

// Transform ultimate categories for PricingPlanCard
const ultimateCategories = computed(() =>
  planHighlights.ultimate.map((cat) => ({
    category: cat.category,
    features: cat.features.map((f) => {
      const parsed = parseFeature(f);
      return { text: parsed.text, description: parsed.description };
    }),
  })),
);

// AppSumo plan features
const appSumoFeatures = computed(() => [
  { text: "Unlimited flows", description: null, isHighlighted: true },
  { text: "5 AI agents", description: null, isHighlighted: true },
  { text: "Tasks as bought", description: null, isHighlighted: true },
  { text: "200 AI credits", description: null, isHighlighted: false },
  { text: "1 MCP server", description: null, isHighlighted: false },
  { text: "1 table", description: null, isHighlighted: false },
  { text: "Human In The Loop", description: null, isHighlighted: false },
]);
</script>

<template>
  <div class="bg-white min-h-screen bg-dotted">
    <!-- Hero Section -->
    <ProductHero
      title="Pricing"
      subtitle="Unlimited runs. Empower every team with AI."
      background-image="/images/sections-heros/pricing.png"
      top-gradient-color="#222C7B"
      bottom-gradient-color="#222C7B"
      :show-top-pill="false"
      :show-logos="false"
    />
    <SectionSeparator
      top-color="#222C7B"
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

    <!-- Toggle section -->
    <section class="pt-12 pb-8">
      <PricingToggle v-model:product-mode="productMode" />
    </section>

    <!-- Cards section -->
    <section class="py-12 px-4">
      <!-- Automate mode -->
      <div
        v-if="productMode === 'automate'"
        class="bg-[rgba(49,43,96,0.05)] p-4 sm:p-6 md:p-10 rounded-3xl max-w-[1080px] mx-auto"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- AppSumo card (when ?appsumo) -->
          <PricingPlanCard
            v-if="showAppSumo"
            icon="stack-simple"
            title="AppSumo"
            subtitle="Lifetime Deal"
            price="LTD"
            cta-text="Activate"
            cta-href="https://cloud.activepieces.com/sign-up?appsumo"
            cta-style="solid"
            :features="appSumoFeatures"
          />

          <!-- Standard card -->
          <PricingPlanCard
            icon="stack-simple"
            title="Standard"
            subtitle="Usage based"
            price="Free"
            price-subtext="then $5 per active flow per month"
            cta-text="Start free"
            cta-href="https://cloud.activepieces.com/sign-up"
            cta-style="outlined"
            :features="standardFeatures"
          />

          <!-- Unlimited card -->
          <PricingPlanCard
            v-if="!showAppSumo"
            icon="stack"
            title="Unlimited"
            subtitle="Annual contract"
            price="Varies"
            price-subtext="we’ll help customize it"
            cta-text="Contact sales"
            cta-href="/sales"
            cta-style="solid"
            :categories="ultimateCategories"
            :collapsible="true"
          />
        </div>
      </div>

      <!-- Embed mode -->
      <div
        v-else
        class="bg-[rgba(49,43,96,0.05)] p-4 sm:p-6 md:p-10 rounded-3xl max-w-[1080px] mx-auto flex justify-center"
      >
        <PricingPlanCard
          icon="stack"
          title="Activepieces Embed"
          subtitle="Annual contract"
          price="Varies"
          price-subtext="Starts at $30k/year"
          cta-text="Contact sales"
          cta-href="/sales"
          cta-style="solid"
          :features="[
            {
              text: 'Embedded Automation Builder',
              description: null,
              isHighlighted: false,
            },
            {
              text: 'Embedded AI Agents',
              description: null,
              isHighlighted: false,
            },
            { text: 'JavaScript SDK', description: null, isHighlighted: false },
            {
              text: 'Custom Templates & Branding',
              description: null,
              isHighlighted: false,
            },
            {
              text: 'Piece Management',
              description: null,
              isHighlighted: false,
            },
            { text: 'Private Pieces', description: null, isHighlighted: false },
            {
              text: 'Cloud or Self-Hosted',
              description: null,
              isHighlighted: false,
            },
            {
              text: 'Dedicated Support',
              description: null,
              isHighlighted: false,
            },
          ]"
          class="max-w-[520px] w-full"
        />
      </div>
    </section>

    <!-- Community Edition (Automate only) -->
    <CommunityEditionCard v-if="productMode === 'automate'" />

    <SectionSeparator
      top-color="#ffffff"
      bottom-color="rgba(54,63,152,1)"
      stroke1-color="#59BFEE"
      stroke2-color="rgba(0, 0, 0, 0.15)"
      stroke3-color="rgba(0, 0, 0, 0.1)"
      stroke4-color="rgba(0, 0, 0, 0.05)"
      shadow-color="rgba(0, 0, 0, 0.1)"
      :curve-depth="60"
      :stroke-spacing="12"
      :stroke-thickness="4"
    />
  </div>
</template>
