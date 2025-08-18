export interface Card {
  id: number
  text: string
  tags: string[]
  heatLevel: 'Mellow' | 'Spicy' | 'XXXtra'
  deck: string
}

export const iceBreakerDeck: Card[] = [
  {
    id: 1,
    text: "Share your most embarrassing moment that happened on a date",
    tags: ["Communication", "Ice Breaker", "Funny"],
    heatLevel: "Mellow",
    deck: "IceBreaker"
  },
  {
    id: 2,
    text: "Give your partner a 30-second shoulder massage while maintaining eye contact",
    tags: ["Touch", "Eye Contact", "Massage"],
    heatLevel: "Mellow",
    deck: "IceBreaker"
  },
  {
    id: 3,
    text: "Tell your partner what first attracted you to them physically",
    tags: ["Communication", "Compliment", "Physical"],
    heatLevel: "Mellow",
    deck: "IceBreaker"
  },
  {
    id: 4,
    text: "Feed your partner something sweet using only your hands",
    tags: ["Feeding", "Sweet", "Sensual"],
    heatLevel: "Spicy",
    deck: "IceBreaker"
  },
  {
    id: 5,
    text: "Describe your ideal romantic evening in detail",
    tags: ["Communication", "Romance", "Fantasy"],
    heatLevel: "Mellow",
    deck: "IceBreaker"
  },
  {
    id: 6,
    text: "Give your partner a gentle kiss on their neck",
    tags: ["Kissing", "Neck", "Gentle"],
    heatLevel: "Spicy",
    deck: "IceBreaker"
  },
  {
    id: 7,
    text: "Share a secret fantasy you've never told anyone",
    tags: ["Communication", "Fantasy", "Secret"],
    heatLevel: "Spicy",
    deck: "IceBreaker"
  },
  {
    id: 8,
    text: "Blindfold your partner and feed them three different things",
    tags: ["Blindfold", "Feeding", "Sensory"],
    heatLevel: "Spicy",
    deck: "IceBreaker"
  },
  {
    id: 9,
    text: "Write 'I love you' on your partner's back with your finger",
    tags: ["Touch", "Writing", "Love"],
    heatLevel: "Mellow",
    deck: "IceBreaker"
  },
  {
    id: 10,
    text: "Tell your partner about your wildest dream (not necessarily sexual)",
    tags: ["Communication", "Dreams", "Personal"],
    heatLevel: "Mellow",
    deck: "IceBreaker"
  },
  {
    id: 11,
    text: "Give your partner a passionate kiss for 10 seconds",
    tags: ["Kissing", "Passionate", "Timed"],
    heatLevel: "Spicy",
    deck: "IceBreaker"
  },
  {
    id: 12,
    text: "Describe what you find most attractive about your partner's personality",
    tags: ["Communication", "Compliment", "Personality"],
    heatLevel: "Mellow",
    deck: "IceBreaker"
  },
  {
    id: 13,
    text: "Share a time when you felt most vulnerable with your partner",
    tags: ["Communication", "Vulnerability", "Emotional"],
    heatLevel: "Spicy",
    deck: "IceBreaker"
  },
  {
    id: 14,
    text: "Give your partner a sensual hand massage for 60 seconds",
    tags: ["Touch", "Massage", "Hands", "Sensual"],
    heatLevel: "Spicy",
    deck: "IceBreaker"
  },
  {
    id: 15,
    text: "Tell your partner what you'd like to try together that you've never done",
    tags: ["Communication", "New Experience", "Adventure"],
    heatLevel: "XXXtra",
    deck: "IceBreaker"
  }
]

export const wetNWildDeck: Card[] = [
  {
    id: 16,
    text: "Slowly undress your partner while maintaining eye contact",
    tags: ["Undressing", "Eye Contact", "Slow"],
    heatLevel: "XXXtra",
    deck: "Wet 'N Wild"
  },
  {
    id: 17,
    text: "Give your partner a full body massage with oil",
    tags: ["Massage", "Oil", "Full Body"],
    heatLevel: "XXXtra",
    deck: "Wet 'N Wild"
  }
]

export const hotNHeavyDeck: Card[] = [
  {
    id: 18,
    text: "Role play as strangers meeting for the first time",
    tags: ["Roleplay", "Strangers", "Fantasy"],
    heatLevel: "XXXtra",
    deck: "Hot 'N Heavy"
  },
  {
    id: 19,
    text: "Give your partner a sensual massage for 5 minutes",
    tags: ["Massage", "Sensual", "Touch"],
    heatLevel: "Spicy",
    deck: "Hot 'N Heavy"
  }
]

export const threesomeDeck: Card[] = [
  {
    id: 20,
    text: "Take turns giving each other compliments",
    tags: ["Communication", "Compliments", "Group"],
    heatLevel: "Mellow",
    deck: "Threesome"
  },
  {
    id: 21,
    text: "Share a fantasy involving all players",
    tags: ["Fantasy", "Communication", "Group"],
    heatLevel: "XXXtra",
    deck: "Threesome"
  }
]

export const allDecks = {
  "IceBreaker": iceBreakerDeck,
  "Hot 'N Heavy": hotNHeavyDeck,
  "Wet 'N Wild": wetNWildDeck,
  "Threesome": threesomeDeck
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function filterCardsByPreferences(cards: Card[], allowedTags: string[], heatLevel: 'Mellow' | 'Spicy' | 'XXXtra'): Card[] {
  return cards.filter(card => {
    const heatLevelOrder = ['Mellow', 'Spicy', 'XXXtra']
    const maxHeatIndex = heatLevelOrder.indexOf(heatLevel)
    const cardHeatIndex = heatLevelOrder.indexOf(card.heatLevel)
    
    return cardHeatIndex <= maxHeatIndex && 
           card.tags.some(tag => allowedTags.includes(tag))
  })
}