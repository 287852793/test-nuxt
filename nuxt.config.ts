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
  }
})