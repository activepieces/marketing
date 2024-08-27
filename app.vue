<script setup>
import "flowbite";

useHead({
  meta: [
    { property: "og:site_name", content: "Activepieces" },
    { property: "og:image:alt", content: "Activepieces" },
    { name: "twitter:image:alt", content: "Activepieces" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content:
        "Activepieces - The open source business automation software - Zapier alternative",
    },
    {
      name: "twitter:description",
      content:
        "Automate your work with Activepieces for free. Trusted by thousands of users who run millions of automated tasks every month. The perfect alternative to Zapier that can be self-hosted or used on the cloud.",
    },
    {
      name: "twitter:image",
      content: "https://www.activepieces.com/meta1.png",
    },
    { name: "twitter:image:width", content: "1200" },
    { name: "twitter:image:height", content: "630" },
    { property: "og:image", content: "https://www.activepieces.com/meta1.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: "https://www.activepieces.com" },
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} · Activepieces` : "Activepieces";
  },
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
