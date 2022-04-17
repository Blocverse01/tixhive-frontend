module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,svg}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#111317",
          red: "#FF4601",
          black2: "#1A1D25",
          eventDate: "#1A1D25",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
