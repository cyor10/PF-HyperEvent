/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      minWidth: {
        "60": "60px",
        "70": "70px",
      },
      borderRadius: {
        "2xl": "1.8rem",
      },
      letterSpacing: {
        custom: "-1.2px"
      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
      },
      colors: {
        purpleNav: "#BE9FF6",
        black : "#000",
        purpleOscuro: "#925FF0",
        grey : "#646464",
        pinkChip: "#E9DFFC",
        fontColorChip: "#784DC7",
        textForm: "#29154D",
        textRed : "#D64751"
      },
      height: {
        "30vh": "30vh",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
