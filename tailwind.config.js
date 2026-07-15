/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // фирменная палитра (только её используем)
        ink:  "#0b090a",
        card: "#161a1d",
        wine: "#660708",
        crimson: "#a4161a",
        scarlet: "#ba181b",
        coral: "#e5383b",
        stone: "#b1a7a6",
        grayx: "#d3d3d3",
        paper: "#f5f3f4",
      },
      fontFamily: {
        bebas: ['"BebasNeueCyrillic"', "sans-serif"],
        helvCond: ['"HelveticaNeueCond"', "sans-serif"],
        helvCondBold: ['"HelveticaNeueCondBold"', "sans-serif"],
        xolo: ['"Xolonium"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 6px 24px rgba(11,9,10,.08)",
        card: "0 8px 28px rgba(11,9,10,.10)",
      },
      borderRadius: {
        xl2: "1rem",
      }
    },
  },
  plugins: [],
}
