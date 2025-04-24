import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeAddClasses from 'rehype-add-classes'

export default defineNuxtPlugin((nuxtApp) => {
  const parseMarkdown = (markdown, classes = {}) => {
    return unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeAddClasses, classes)
      .use(rehypeStringify)
      .processSync(markdown)
      .toString()
  }

  nuxtApp.provide('parseMarkdown', parseMarkdown)
})