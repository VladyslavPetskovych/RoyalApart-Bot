/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainC: "#1f2937",
        textW: "#D5D0D0",
        shit: "#452b05",
        shit2: "#1f1306",
        back: "#fff4ed"
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        popins: ["Poppins", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
