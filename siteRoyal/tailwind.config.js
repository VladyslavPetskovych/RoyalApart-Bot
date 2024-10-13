/** @type {import('tailwindcss').Config} */

// tailwind.config.ts
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
      colors: {
        mainC: "#1f2937",
        textW: "#D5D0D0",
        shit: "#452b05",
        shit2: "#1f1306",
        shit3: "#6b3c00",
        back: "#fff4ed",
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        popins: ["Poppins", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        roboto: ["Roboto Slab", "sans-serif"],
      },
    },
  },
  plugins: [scrollbarHide],
};
