// https://www.npmjs.com/package/vite-plugin-node-polyfills // polyfill that fixes Buffer and global issue
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  vite: {
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