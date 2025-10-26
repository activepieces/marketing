<script setup>
const pageTitle = "Enterprise";
const metaDesc =
  "If you are a large enterprise, Activepieces is the best way to build a self-driven AI culture automation for your enterprise.";
const metaKeywords =
  "enterprise automation, AI culture automation, self-driven AI, enterprise automation solutions, open source business automation, open source zapier, zapier open source alternative, zapier alternative, workato alternative, open source workato";

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
  <PagesEnterpriseHero />
  <PagesIndexCompanyLogos />
  <PagesEnterpriseMainvalues />
  <PagesIndexUseCases />

  <PagesEnterpriseTestimonial />

  <div
    class="flex gap-4 lg:gap-8 mx-auto w-auto items-center justify-center my-16 lg:my-48"
  >
    <img class="w-24 lg:w-48" src="/badges/g2-top25-24.svg" />
    <img class="w-24 lg:w-48" src="/badges/g2-most-implementable-w24.svg" />
    <img class="w-24 lg:w-48" src="/badges/g2-high-performer-w24.svg" />
  </div>

  <PagesEnterpriseFAQ />
</template>
