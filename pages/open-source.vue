<script setup>
const pageTitle =
  "Open source no-code business automation · Zapier open source alternative";
const metaDesc =
  "Automate your work with Activepieces for free. Trusted by thousands of users who run millions of automated tasks every month. The perfect alternative to Zapier that can be self-hosted or used on the cloud.";
const metaKeywords =
  "open source business automation, open source zapier, zapier open source alternative, zapier alternative, workato alternative, open source workato";

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
  <PagesIndexHeroOpensource />
  <PagesIndexCompanyLogos />
  <PagesIndexMainValue />
  <!--<PagesIndexUseCases />-->
  <PagesIndexSocialProof />
  <!--<PagesIndexFeatures />-->
  <PagesIndexPieces />
</template>
