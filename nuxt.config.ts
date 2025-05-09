export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-pages'
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.WORKER_BASE_URL
    }
  }
})