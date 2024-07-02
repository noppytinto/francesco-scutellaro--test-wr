// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/style/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    provider: "netlify",
    domains: ["https://images.unsplash.com", "https://randomuser.me"],
  },
  modules: ["@nuxt/image"],
});
