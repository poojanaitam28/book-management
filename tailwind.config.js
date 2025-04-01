module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ['"Fraunces"', "serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        parkinsans: ['"Parkinsans"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
      },
      colors: {
        blue :"#213555",
        orange : "#EB5B00"
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        xl: '4px 4px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': { textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' },
        '.text-shadow-md': { textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)' },
        '.text-shadow-lg': { textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' },
        '.text-shadow-none': { textShadow: 'none' },
      });
    },
  ],
};
