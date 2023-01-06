/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#8b5cf6",
          600: "#6366f1",
        },
      },
    },
  },
  plugins: [],
};
