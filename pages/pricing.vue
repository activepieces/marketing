<script setup>
import ProductHero from "~/components/pages/product/ProductHero.vue";

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
</script>

<template>
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
  <PagesPricingTable />
  <PagesIndexCompanyLogos class="mt-10 mb-20" />
  <PagesPricingFAQ v-if="false" />
</template>
