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
          // Primary Brand Colors
          red: '#B9340B',           // Hot 'n Heavy Red (RUST)
          green: '#498379',         // Ice Breaker Green (HOOKER'S GREEN) 
          cream: '#F7F3E2',         // Background Cream (COSMIC LATTE)
          
          // Secondary Colors
          ivory: '#FCF9E8',         // Secondary Background (IVORY)
          darkBlue: '#034078',      // Wet 'n Wild Dark Blue (INDIGO DYE)
          lightBlue: '#05A2D6',     // Wet 'n Wild Light Blue (BLUE GREEN)
          orange: '#DE6F20',        // Threesome Orange (COCOA ORANGE)
          olive: '#7C812B',         // Threesome Green (OLIVE)
          
          // Extra Hot Colors
          darkCornflower: '#274070', // Extra Hot Vol 1 (DARK CORNFLOWER BLUE)
          violet: '#654f6f',        // Extra Hot Vol 2 (ENGLISH VIOLET)
          gold: '#F4C431',          // Golden Ticket (SAFFRON)
          
          // Typography
          darkGrey: '#555555',      // Davy's Grey - for all text
        },
      },
      fontFamily: {
        // Primary Typography - Futura Std Family
        futura: ['Futura Std', 'Arial', 'sans-serif'],
        'futura-bold': ['Futura Std Bold Condensed', 'Arial Black', 'sans-serif'],
        'futura-medium': ['Futura Std Medium', 'Arial', 'sans-serif'],
        'futura-book': ['Futura Std Book', 'Arial', 'sans-serif'],
        
        // Secondary Typography - Mission Script for logos
        mission: ['Mission Script', 'Dancing Script', 'cursive'],
        
        // Website Typography - Avenir (fallback to system fonts)
        avenir: ['Avenir', 'system-ui', 'sans-serif'],
        'avenir-medium': ['Avenir Medium Condensed', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}