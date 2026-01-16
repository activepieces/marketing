<script setup>
const pageTitle = "Become a Reseller";
const metaDesc =
  "Partner with Activepieces as a reseller. Help businesses automate their workflows while growing your business.";
const metaKeywords =
  "activepieces reseller, automation partner, reseller program";

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
  <section class="reseller-section">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
      <div class="flex flex-col items-center text-center">
        <h1 class="text-gray-800 font-bold text-4xl tracking-[2px] mb-4">
          Become a Reseller
        </h1>
        <p class="text-gray-600 text-xl mb-8 max-w-2xl">
          This page is coming soon. Contact us to learn more about our reseller program.
        </p>
        <a
          href="mailto:sales@activepieces.com"
          class="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Contact Sales
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reseller-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
}
</style>
