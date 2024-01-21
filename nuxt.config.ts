// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      script: [{ src: '_nuxt/assets/js/ap-marketing-table.js', type:'module'  }],
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
  }
  
})
