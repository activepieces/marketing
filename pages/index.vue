<script setup>
const pageTitle = "AI-first automation for every team";
const metaDesc =
  "Activepieces is the best way to build a self-driven AI culture across HR, finance, marketing, sales and more — under the supervision of your IT ninjas";
const metaKeywords =
  "enterprise automation solutions, open source business automation, open source zapier, zapier open source alternative, zapier alternative, workato alternative, open source workato";

definePageMeta({
  layout: "home",
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

import { onMounted } from "vue";
import { initTabs } from "flowbite";
import SectionSeparator from "~/components/SectionSeparator.vue";

onMounted(() => {
  initTabs();
});
</script>

<template>
  <PagesIndexHero />
  <PagesIndexCaseStudies />
  <SectionSeparator
    top-color="#1d4348"
    bottom-color="#ffffff"
    stroke1-color="rgba(255, 255,255, 0.2)"
    stroke2-color="rgba(255, 255,255, 0.15)"
    stroke3-color="rgba(255, 255,255, 0.1)"
    stroke4-color="rgba(255, 255,255, 0.05)"
    shadow-color="rgba(0, 0, 0, 0.1)"
    :curve-depth="60"
    :stroke-spacing="12"
    :stroke-thickness="4"
    overlap="60px"
  />

  <PagesIndexAiAgentsShowcase />

  <SectionSeparator
    top-color="transparent"
    bottom-color="#483e97"
    stroke1-color="rgba(0, 0, 0, 0.2)"
    stroke2-color="rgba(0, 0, 0, 0.15)"
    stroke3-color="rgba(0, 0, 0, 0.1)"
    stroke4-color="rgba(0, 0, 0, 0.05)"
    shadow-color="rgba(0, 0, 0, 0.1)"
    :curve-depth="60"
    :stroke-spacing="12"
    :stroke-thickness="4"
    overlap="60px"
  />
  <!-- AI Adoption Showcase (Full Width Playing Cards) -->
  <PagesIndexAiAdoptionShowcase />

  <SectionSeparator
    top-color="#483e97"
    bottom-color="#ffffff"
    stroke1-color="rgba(0, 0, 0, 0.2)"
    stroke2-color="rgba(0, 0, 0, 0.15)"
    stroke3-color="rgba(0, 0, 0, 0.1)"
    stroke4-color="rgba(0, 0, 0, 0.05)"
    shadow-color="rgba(0, 0, 0, 0.1)"
    :curve-depth="60"
    :stroke-spacing="12"
    :stroke-thickness="4"
    overlap="60px"
  />

  <!-- Governance & Control Showcase -->
  <PagesIndexGovernanceShowcase />
  <SectionSeparator
    top-color="transparent"
    bottom-color="#003E64"
    stroke1-color="rgba(0, 0, 0, 0.2)"
    stroke2-color="rgba(0, 0, 0, 0.15)"
    stroke3-color="rgba(0, 0, 0, 0.1)"
    stroke4-color="rgba(0, 0, 0, 0.05)"
    shadow-color="rgba(0, 0, 0, 0.1)"
    :curve-depth="60"
    :stroke-spacing="12"
    :stroke-thickness="4"
    overlap="60px"
  />
  <!-- Deployment & Cost Showcase -->
  <PagesIndexDeploymentShowcase />
  <SectionSeparator
    top-color="#003E64"
    bottom-color="#F4F2F6"
    stroke1-color="rgba(0, 0, 0, 0.2)"
    stroke2-color="rgba(0, 0, 0, 0.15)"
    stroke3-color="rgba(0, 0, 0, 0.1)"
    stroke4-color="rgba(0, 0, 0, 0.05)"
    shadow-color="rgba(0, 0, 0, 0.1)"
    :curve-depth="60"
    :stroke-spacing="12"
    :stroke-thickness="4"
    overlap="60px"
  />
  <PagesIndexSocialLove />
  <SectionSeparator
    top-color="#f4f2f6"
    bottom-color="rgba(54,63,152,1)"
    stroke1-color="rgba(0, 0, 0, 0.2)"
    stroke2-color="rgba(0, 0, 0, 0.15)"
    stroke3-color="rgba(0, 0, 0, 0.1)"
    stroke4-color="rgba(0, 0, 0, 0.05)"
    shadow-color="rgba(0, 0, 0, 0.1)"
    :curve-depth="60"
    :stroke-spacing="12"
    :stroke-thickness="4"
    overlap="60px"
  />
</template>
