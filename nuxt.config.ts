export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      pages: {
        routes: {
          include: ["nodejs_compat"]
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.WORKER_BASE_URL
    }
  }
})