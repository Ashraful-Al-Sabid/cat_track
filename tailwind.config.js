/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      // Optional: install 'tailwindcss-animate' and uncomment the line below
      // require("tailwindcss-animate"),
  ],
}
