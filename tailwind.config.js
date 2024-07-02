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
        "my-neutral-100": "#DFDFDF",
        "my-neutral-300": "#999999",
      },
    },
  },
  plugins: [],
};
