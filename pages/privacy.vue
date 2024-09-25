<script setup>
const config = useRuntimeConfig()
const { data: page, error: postError } = await useFetch(`${config.public.strapiUrl}/api/privacy`, {
    headers: {
      'Strapi-Response-Format': 'v4'
    }
  })
const terms = page.value.data.attributes;

const pageTitle = terms.title;
const metaDesc = 'Privacy policy to use Activepieces, the open source no-code business automation tool';
const metaKeywords = 'automation privacy policy, activepieces privacy policy, activepieces privacy';

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