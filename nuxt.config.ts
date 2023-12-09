// https://www.npmjs.com/package/vite-plugin-node-polyfills // polyfill that seems to fix Buffer and global issue
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  vite: {
    /* define: {
      global: 'globalThis',
    }, */
    /* optimizeDeps:{
      esbuildOptions:{
        define:{
          global:'globalThis',
        },
      }
    }, */
    plugins:[
      nodePolyfills({
        globals:{
          Buffer:true,
          global:true
        }
      })
    ],
  },
})