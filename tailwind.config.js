/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4759",
        secondary: "#4D4D4D",
        tertiary: "#418089",
        "my-blue-100": "#F6F8FE",
        "my-neutral-50": "#F5F5F5",
        "my-neutral-100": "#DFDFDF",
        "my-neutral-300": "#999999",
      },

      animation: {
        fade: "fadeIn 150ms ease-out",
        collapse: "collapse 150ms ease-in",
        expand: "expand 80ms ease-in",
      },
      keyframes: (theme) => ({
        fadeIn: {
          "1000%": { backgroundColor: theme("colors.neutral.400") },
          "0%": { backgroundColor: theme("colors.transparent") },
        },
        collapse: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        expand: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      }),
    },
  },
  plugins: [],
};
