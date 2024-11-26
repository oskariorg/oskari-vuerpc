import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [vue({
    template: {
      compilerOptions: {
        whitespace: 'preserve',
        compatConfig: {
          MODE: 2
        }
      }
    }
  }),
  vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

