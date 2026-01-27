<script setup>
const pageTitle = "AI-first automation for every team";
const metaDesc =
  "Activepieces is the best way to build a self-driven AI culture across HR, finance, marketing, sales and more — under the supervision of your IT ninjas";
const metaKeywords =
  "enterprise automation solutions, open source business automation, open source zapier, zapier open source alternative, zapier alternative, workato alternative, open source workato";

definePageMeta({
  layout: 'home',
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

onMounted(() => {
  initTabs();
});
</script>

<template>
  <PagesIndexHero />
  <PagesIndexAiAgentsShowcase />
  <PagesIndexCaseStudies />
  <PagesIndexProductStrengths />
  <PagesIndexSocialLove />
</template>
