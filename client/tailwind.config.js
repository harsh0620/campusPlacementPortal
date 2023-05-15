/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        base: ["Roboto", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      colors: {
        redg: "#e04235",
        blueg: "#1a73e8",
        bluegg: "#2476f7",
        greeng: "#34a853",
        yellowg: "#fbbc05",
        orangeg: "#FF8C00",
        gmailbg: "#F6F8FC",
      },
      screens: {
        xs: "328px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
};
