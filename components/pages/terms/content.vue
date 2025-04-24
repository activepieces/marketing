<script setup>
import { marked } from 'marked'
const props = defineProps(['title', 'content', 'lastUpdated'])
</script>

<template>
<section class="bg-white dark:bg-gray-900">
    <div class="markdown-format max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
        <h1>{{ title }}</h1>
        <p class="text-lg !mb-10">Last updated: {{ lastUpdated }}</p>
        <div v-html="marked.parse(content)"></div>
    </div>
</section>
</template>

<style scoped>
.markdown-format {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  line-height: 1.6;
  color: #333;
  padding: 2rem;
}

.markdown-format :deep(h1),
.markdown-format :deep(h2),
.markdown-format :deep(h3),
.markdown-format :deep(h4),
.markdown-format :deep(h5),
.markdown-format :deep(h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.markdown-format :deep(h1) { font-size: 2em; }
.markdown-format :deep(h2) { font-size: 1.5em; }
.markdown-format :deep(h3) { font-size: 1.25em; }
.markdown-format :deep(h4) { font-size: 1em; }
.markdown-format :deep(h5) { font-size: 0.875em; }
.markdown-format :deep(h6) { font-size: 0.85em; color: #777; }

.markdown-format :deep(p) {
  margin-top: 0;
  margin-bottom: 16px;
}

/* Links */
.markdown-format :deep(a) {
  color: #0366d6;
  text-decoration: none;
}
.markdown-format :deep(a:hover) {
  text-decoration: underline;
}

/* Lists */
.markdown-format :deep(ul),
.markdown-format :deep(ol) {
  padding-left: 2rem;
}
.markdown-format :deep(li + li) {
  margin-top: 0.25em;
}

/* Code Formatting */
.markdown-format :deep(code) {
  font-family: monospace;
  background-color: #f6f8fa;
  padding: 2px 4px;
  font-size: 90%;
  border-radius: 3px;
}
.markdown-format :deep(pre) {
  background-color: #f6f8fa;
  border-radius: 3px;
  padding: 16px;
  overflow: auto;
}
.markdown-format :deep(pre code) {
  background: transparent;
  padding: 0;
}

/* Images */
.markdown-format :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

/* Tables */
.markdown-format :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
}
.markdown-format :deep(th),
.markdown-format :deep(td) {
  border: 1px solid #ddd;
  padding: 8px;
}
.markdown-format :deep(th) {
  font-weight: bold;
  background-color: #f2f2f2;
}

/* Blockquotes */
.markdown-format :deep(blockquote) {
  margin: 0;
  padding-left: 1em;
  border-left: 0.25em solid #ddd;
  color: #666;
  font-style: italic;
}

/* Horizontal Rule */
.markdown-format :deep(hr) {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 1em 0;
}
</style>