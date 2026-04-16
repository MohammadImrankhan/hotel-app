/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf9f0",
          100: "#faf0d7",
          200: "#f5dfa0",
          300: "#efc96a",
          400: "#e8b340",
          500: "#c9952a",
          600: "#a97820",
          700: "#875f1a",
          800: "#6b4b18",
          900: "#573d17",
        },
        champagne: {
          50: "#fdfcf8",
          100: "#f8f3e8",
          200: "#f0e4c8",
          300: "#e5d0a0",
          400: "#d4b572",
          500: "#c49a50",
          600: "#a87e3e",
          700: "#8a6433",
          800: "#6f502a",
          900: "#5b4124",
        },
        charcoal: {
          50: "#f5f5f5",
          100: "#e8e8e8",
          200: "#d0d0d0",
          300: "#a8a8a8",
          400: "#7a7a7a",
          500: "#5a5a5a",
          600: "#404040",
          700: "#2d2d2d",
          800: "#1f1f1f",
          900: "#141414",
        },
        cream: "#f8f4ec",
        ivory: "#fefcf7",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Cormorant Garamond"', '"Gill Sans"', "sans-serif"],
        body: ['"Lato"', '"Helvetica Neue"', "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #c9952a 0%, #e8b340 50%, #c9952a 100%)",
        "dark-gradient":
          "linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.7) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
