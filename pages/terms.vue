<script setup>
const config = useRuntimeConfig()
const { data: page, error: postError } = await useFetch(`${config.public.strapiUrl}/api/terms`, {
    headers: {
      'Strapi-Response-Format': 'v4'
    }
  })
const terms = page.value.data.attributes;

const pageTitle = terms.title;
const metaDesc = 'Terms of Service to use Activepieces, the open source no-code business automation tool';
const metaKeywords = 'automation terms of use, activepieces terms and conditions, activepieces terms';

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
  <PagesTermsContent :title="terms.title" :lastUpdated="terms.lastUpdated" :content="terms.content" />
</template>