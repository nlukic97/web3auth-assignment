var Buffer = require('buffer/').Buffer

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  vite: {
    define: {
      global: 'globalThis',
    },
    resolve: {
      alias: {
        crypto: "empty-module",
        // Buffer:Buffer,
        assert: "empty-module",
        http: "empty-module",
        https: "empty-module",
        os: "empty-module",
        url: "empty-module",
        zlib: "empty-module",
        stream: "empty-module",
        _stream_duplex: "empty-module",
        _stream_passthrough: "empty-module",
        _stream_readable: "empty-module",
        _stream_writable: "empty-module",
        _stream_transform: "empty-module",
      },
    },
  },
})