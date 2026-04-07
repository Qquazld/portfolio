/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Advent Pro", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
