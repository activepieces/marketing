import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('ap-marketing-table')
        }
      }
    })
  ],
  build: {
    lib: {
      entry: './src/main.ce.js',
      name: 'ap-marketing-table',
      // the proper extensions will be added
      fileName: 'ap-marketing-table'
    }
  },
  define: {
    'process.env': process.env
  }
})