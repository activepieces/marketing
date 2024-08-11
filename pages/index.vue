<script setup>
const pageTitle = "Unleash the power of AI for every team";
const metaDesc =
  "Empower every department from marketing and sales to HR and finance with secure, intuitive, and powerful decentralized AI automation.";
const metaKeywords =
  "enterprise automation solutions, open source business automation, open source zapier, zapier open source alternative, zapier alternative, workato alternative, open source workato";

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
  <PagesIndexEnterpriseValue />
  <PagesIndexDepartments />
  <PagesIndexFeatures />
  <PagesIndexPieces />
  <PagesIndexBlog />
</template>
