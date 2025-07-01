<script setup>
const pageTitle = 'Pricing';
const metaDesc = 'Self host Activepieces as an alternative to Zapier to run unlimited tasks for free, or use Activepieces Cloud at a fraction of Zapier or Workato cost.';
const metaKeywords = 'free zapier alternative, open source workato, free zapier, best alternative to zapier';

definePageMeta({
  layout: 'pricing',
});

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { name: 'keywords', content: metaKeywords },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: metaDesc },
  ]
})
</script>

<template>
  <PagesPricingTable  />
  <PagesIndexCompanyLogos class="mt-10 mb-20" />
  <PagesPricingFAQ v-if="false" />
</template>
