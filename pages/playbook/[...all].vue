<script setup>
const config = useRuntimeConfig();
import { whichPage } from "~/middleware/playbookRequest";

const { $parseMarkdown } = useNuxtApp();
const route = useRoute();
const whichPageObj = whichPage(route);

const playbookName = ref(inject("playbookName"));
let pageTitle = ref("");
const metaDesc =
  "Read tutorials, guides, thoughts and more about building automated flows to run in the background to save yourself the manual work.";
const metaKeywords =
  "automation blog, business automation tutorials, no-code business automation";

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: metaDesc },
    { name: "keywords", content: metaKeywords },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: metaDesc },
  ],
});

definePageMeta({
  layout: "playbook",
});

const scrollToElementWithHeaderOffset = (elementId) => {
  const headerOffset = 80;
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const calculateReadingTime = (markdownContent) => {
  const wordsPerMinute = 200;

  const cleanContent = markdownContent
    .replace(/(\*\*|__)/g, "") // bold text markers
    .replace(/(\*|_)/g, "") // italic text markers
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/\[([^\]]*?)\]\(.*?\)/g, "$1") // links (keep the link text)
    .replace(/`{1,3}[^`]*`{1,3}/g, "") // inline and block code
    .replace(/>+/g, "") // blockquotes
    .replace(/#+\s/g, "") // headers
    .replace(/[-*+]\s/g, "") // list items
    .replace(/\s{2,}/g, " ") // extra whitespace
    .trim();

  const words = cleanContent.split(/\s+/).filter((word) => word).length;
  let readingTime = Math.ceil(words / wordsPerMinute);

  if (readingTime === 0) {
    readingTime = 1;
  }

  return readingTime;
};

const headerHeight = ref(0);

onMounted(() => {
  const header = document.querySelector("header");
  if (header) {
    headerHeight.value = header.offsetHeight;
  }
});

const isSlugEmpty = ref(
  typeof whichPageObj.articleSlug === "undefined" ||
    whichPageObj.articleSlug == ""
    ? true
    : false
);

let toc;
const articles = ref(null);
const articlesError = ref(null);
const article = ref(null);

const markdown = ref(null);
const readingTime = ref(0);

const htmlContent = computed(() =>
  $parseMarkdown(markdown.value, {
    p: "text-base md:text-lg xl:text-xl leading-[130%] md:leading-[140%]",
    ul: "ml-4 flex flex-col gap-5 list-disc ps-4",
    ol: "ml-4 flex flex-col gap-5 list-decimal ps-4",
    li: "pl-1",
    h1: "mt-3 text-[28px] md:text-[34px] xl:text-6xl -tracking-[0.11px] md:-tracking-[0.14px] xl:-tracking-[0.15px] leading-[120%]",
    h2: "mt-3 text-[26px] md:text-[32px] xl:text-5xl -tracking-[0.11px] md:-tracking-[0.14px] xl:-tracking-[0.15px] leading-[120%]",
    h3: "mt-3 text-[24px] md:text-[30px] xl:text-4xl -tracking-[0.11px] md:-tracking-[0.14px] xl:-tracking-[0.15px] leading-[120%]",
    h4: "mt-3 text-[22px] md:text-[28px] xl:text-3xl -tracking-[0.11px] md:-tracking-[0.14px] xl:-tracking-[0.15px] leading-[120%]",
    h5: "mt-3 text-[20px] md:text-[26px] xl:text-2xl -tracking-[0.11px] md:-tracking-[0.14px] xl:-tracking-[0.15px] leading-[120%]",
    h6: "mt-3 text-[18px] md:text-[24px] xl:text-xl -tracking-[0.11px] md:-tracking-[0.14px] xl:-tracking-[0.15px] leading-[120%]",
    img: "rounded-lg",
    a: "text-primary-500 hover:text-primary-800",
  })
);

if (!isSlugEmpty.value) {
  const articleResponse = await useFetch(
    `${config.public.strapiUrl}/api/playbook-articles?filters[slug][$eq]=${whichPageObj.articleSlug}`
  );

  articles.value = articleResponse.data.value;
  articlesError.value = articleResponse.error.value;
  article.value = articles.value.data[0];
  markdown.value = article.value.attributes.content || "";
  readingTime.value = calculateReadingTime(markdown.value);
  pageTitle.value = article.value.attributes.title + " · " + playbookName.value;
}

onMounted(() => {
  if (isSlugEmpty.value) {
    const firstNavLink = document.querySelectorAll(
      '.sidebar [data-tree-view-link="true"]'
    )[0];
    window.location.href = firstNavLink.href;
  }
});
</script>

<template>
  <div v-if="!isSlugEmpty">
    <article
      class="format flex-grow flex-1 max-w-[620px] text-xl font-light pb-20 relative z-0 pt-12 lg:pl-14 max-[555px]:py-6"
    >
      <!--<h1>{{ article.attributes.title }}</h1>-->
      <p class="text-xs tracking-[0.6px] uppercase font-soehneMono">
        {{ readingTime }} minute read
      </p>
      <div
        class="text-black flex flex-col gap-8 mt-6"
        v-html="htmlContent"
      ></div>
    </article>
  </div>
</template>

<style></style>
