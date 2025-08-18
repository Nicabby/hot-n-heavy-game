export const brandColors = {
  // Primary Brand Colors
  hotNHeavy: '#bb3309',      // Hot 'N Heavy Red
  iceBreaker: '#468675',     // IceBreaker Green  
  wetNWild: '#00a1cf',       // Wet 'N Wild Blue
  threesome: '#df6e20',      // Threesome Orange
  
  // Base Colors
  background: '#f6f3e2',     // Cosmic Latte background
  text: '#5b5450',           // Davy's Grey text
  
  // Additional colors from brand guide
  ivory: '#fcf9e8',          // Secondary background
  rust: '#b9340b',           // Alternative Hot 'N Heavy
  hookerGreen: '#498379',    // Alternative IceBreaker
  
  // Utility colors for better contrast
  white: '#ffffff',
  black: '#000000',
  
  // Deck-specific color mapping
  deckColors: {
    'IceBreaker': '#468675',
    'Hot \'N Heavy': '#bb3309', 
    'Wet \'N Wild': '#00a1cf',
    'Threesome': '#df6e20'
  }
}

export const getDeckColor = (deckName: string): string => {
  return brandColors.deckColors[deckName as keyof typeof brandColors.deckColors] || brandColors.iceBreaker
}