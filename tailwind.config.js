/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
