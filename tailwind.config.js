/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "bebas-neue": ["var(--font-bebas-neue)", ...fontFamily.sans],
        heebo: ["var(--font-heebo)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
