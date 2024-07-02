// https://nuxt.com/docs/api/configuration/nuxt-config

const isDev = process.env.NODE_ENV === "development";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/style/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    provider: isDev ? "" : "netlify",
    domains: ["https://images.unsplash.com", "https://randomuser.me"],
  },
  modules: ["@nuxt/image"],
});
