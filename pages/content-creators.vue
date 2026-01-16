<script setup>
const pageTitle = "Content Creators";
const metaDesc =
  "Join the Activepieces content creator program. Create automation content and grow your audience.";
const metaKeywords =
  "activepieces content creators, automation content, creator program";

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
  <section class="content-creators-section">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
      <div class="flex flex-col items-center text-center">
        <h1 class="text-gray-800 font-bold text-4xl tracking-[2px] mb-4">
          Content Creators
        </h1>
        <p class="text-gray-600 text-xl mb-8 max-w-2xl">
          This page is coming soon. Contact us to learn more about our content creator program.
        </p>
        <a
          href="mailto:partnerships@activepieces.com"
          class="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Contact Partnerships
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-creators-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
}
</style>
