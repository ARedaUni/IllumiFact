/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'tablet': '500px',
        'navconfig': '1033px',
        'navconfig2': '1431px'
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      keyframes: {
        fadein: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        }
      },
      animation:  {
        fadein: 'fadein 1s ease-in-out'
      },
    },
  },
});
