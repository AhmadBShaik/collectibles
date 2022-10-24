/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        collectible: {
          50: "#F8F8F8",
          100: "#F8EDE3",
          200: "#F2DAC3",
          300: "#DFD3C3",
          400: "#C8C2BC",
          500: "#7D6E83",
        },
      },
      backgroundImage: {
        "landing-page": "url('/landing-page-image.jpg')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
