// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      script: [{ src: '/js/ap-marketing-table.js', type:'module'  }],
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
    
  },
  vue: {  
    compilerOptions: {
      isCustomElement: (tag) => ['ap-marketing-table'].includes(tag),
    },
  },
  runtimeConfig: {
    public: {
      strapiUrl: process.env.STRAPI_URL
    }
  },
  routeRules: {
    '/docs': { redirect: '/docs/getting-started/introduction' },
    '/docs/**': { proxy: 'https://activepieces.mintlify.dev/docs/**' },
    '/plans': { redirect: '/pricing' },
    '/roadmap': { redirect: 'https://github.com/orgs/activepieces/projects/53' },
    '/pieces-roadmap': { redirect: 'https://community.activepieces.com/c/feature-requests/9' },
    '/request-a-piece': { redirect: 'https://community.activepieces.com/c/feature-requests/9' },
    '/request-a-feature': { redirect: 'https://community.activepieces.com/c/feature-requests/9' },
    '/school': { redirect: 'https://community.activepieces.com/c/tutorials/automation-school/11' },
  },
  hooks: {
    'pages:extend'(pages) {
        // playbook- is a functional name that we use in the code to replace and parse the paths
        pages.push(
        {
          name: 'playbook-embedded-ipaas',
          path: '/embedded-ipaas:all(.*)',
          file: '~/pages/playbook/[...all].vue'
      })
    }
  }
})
