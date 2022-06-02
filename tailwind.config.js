module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,svg}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#111317",
          red: "#FF4601",
          // red: "#7B3FE4",

          darkred: "#c33500",
          black2: "#1A1D25",
          black3: "#404756",
          eventDate: "#1A1D25",
        },
      },
      backgroundImage: {
        "box-1": "url('/src/images/ticket-1.png')",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
