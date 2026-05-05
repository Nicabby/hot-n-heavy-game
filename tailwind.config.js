/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tgol: {
          red: '#B9340B',
          green: '#498379',
          cream: '#F7F3E2',
          ivory: '#FCF9E8',
          darkBlue: '#034078',
          lightBlue: '#05A2D6',
          orange: '#DE6F20',
          olive: '#7C812B',
          darkCornflower: '#274070',
          violet: '#654f6f',
          gold: '#F4C431',
          darkGrey: '#555555',
        },
      },
      fontFamily: {
        futura: ['Futura Std', 'Futura', 'Jost', 'Arial', 'sans-serif'],
        'futura-bold': ['Futura Std Bold Condensed', 'Futura', 'Jost', 'Arial Black', 'sans-serif'],
        'futura-medium': ['Futura Std Medium', 'Futura', 'Jost', 'Arial', 'sans-serif'],
        'futura-book': ['Futura Std Book', 'Futura', 'Jost', 'Arial', 'sans-serif'],
        mission: ['Mission Script', 'Dancing Script', 'cursive'],
        avenir: ['Avenir', 'Avenir Next', 'Nunito', 'Gill Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
