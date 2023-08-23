/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.png')",
        'footer-texture': "url('/img/footer-texture.png')",
        'auto': 'auto'
      }
    },
  },
  plugins: [],
}