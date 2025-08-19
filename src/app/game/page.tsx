'use client'

import { useState, useEffect } from 'react'

interface GameSetup {
  gameId: string
  participants: string[]
  selectedDeck: string
  swapType: 'full' | 'soft' | ''
  heatLevel: number
  categories: string[]
  timePerPlay: number
  allowSkips: boolean
  timerOverride: boolean
  heatLevelAdjust: boolean
}

interface Card {
  id: number
  text: string
  tags: string[]
  heatLevel: string
  category: string
}

export default function Game() {
  const [gameSetup, setGameSetup] = useState<GameSetup | null>(null)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [cards, setCards] = useState<Card[]>([])

  // Load game setup from localStorage
  useEffect(() => {
    const savedGame = localStorage.getItem('currentGame')
    if (savedGame) {
      const setup = JSON.parse(savedGame)
      setGameSetup(setup)
      setTimeLeft(setup.timePerPlay || 60)
      loadCards(setup.selectedDeck, setup.heatLevel, setup.categories)
    }
  }, [])

  const loadCards = (deck: string, heatLevel: number, categories: string[]) => {
    // Card data based on deck selection
    const iceBreakers: Card[] = [
      { id: 1, text: "Share a compliment about each person in the group", tags: ["Communication", "Affection"], heatLevel: "Warm", category: "Touching" },
      { id: 2, text: "Give someone a 30-second shoulder massage", tags: ["Touch", "Massage"], heatLevel: "Warm", category: "Touching" },
      { id: 3, text: "Share your favorite romantic memory", tags: ["Communication", "Romance"], heatLevel: "Warm", category: "Touching" },
      { id: 4, text: "Kiss your partner on the forehead", tags: ["Kiss", "Gentle"], heatLevel: "Warm", category: "Kissing" },
      { id: 5, text: "Hold hands with your partner for 1 minute while maintaining eye contact", tags: ["Touch", "Eye Contact"], heatLevel: "Warm", category: "Touching" }
    ]

    const hotNHeavyLevel1: Card[] = [
      { id: 1, text: "Give your partner a sensual shoulder massage for 60 seconds", tags: ["Touch", "Sensual"], heatLevel: "Spicy", category: "Touching" },
      { id: 2, text: "Kiss your partner passionately for 30 seconds", tags: ["Kiss", "Passionate"], heatLevel: "Spicy", category: "Kissing" },
      { id: 3, text: "Whisper something seductive in your partner's ear", tags: ["Communication", "Seductive"], heatLevel: "Spicy", category: "Touching" },
      { id: 4, text: "Give your partner a gentle bite on the neck", tags: ["Touch", "Playful"], heatLevel: "Spicy", category: "Touching" },
      { id: 5, text: "Trace your finger along your partner's arm slowly", tags: ["Touch", "Teasing"], heatLevel: "Spicy", category: "Touching" }
    ]

    const hotNHeavyLevel2: Card[] = [
      { id: 1, text: "Give your partner oral pleasure for 2 minutes", tags: ["Oral", "Pleasure"], heatLevel: "Hot", category: "Oral" },
      { id: 2, text: "Use your hands to pleasure your partner", tags: ["Touch", "Pleasure"], heatLevel: "Hot", category: "Touching" },
      { id: 3, text: "Kiss and touch your partner's most sensitive areas", tags: ["Kiss", "Touch", "Intimate"], heatLevel: "Hot", category: "Touching" },
      { id: 4, text: "Take turns pleasuring each other orally", tags: ["Oral", "Mutual"], heatLevel: "Hot", category: "Oral" },
      { id: 5, text: "Explore your partner's body with your tongue", tags: ["Oral", "Exploration"], heatLevel: "Hot", category: "Oral" }
    ]

    const hotNHeavyLevel3: Card[] = [
      { id: 1, text: "Make love in your favorite position for 5 minutes", tags: ["Penetration", "Intimate"], heatLevel: "Fire", category: "Full Penetration" },
      { id: 2, text: "Try a new position you've never done before", tags: ["Penetration", "Adventure"], heatLevel: "Fire", category: "Full Penetration" },
      { id: 3, text: "Make passionate love while maintaining eye contact", tags: ["Penetration", "Connection"], heatLevel: "Fire", category: "Full Penetration" },
      { id: 4, text: "Explore anal play together", tags: ["Anal", "Exploration"], heatLevel: "Fire", category: "Anal" },
      { id: 5, text: "Use toys together during intimacy", tags: ["Toys", "Enhancement"], heatLevel: "Fire", category: "Toys" }
    ]

    let selectedCards: Card[] = []
    
    if (deck === 'IceBreaker') {
      selectedCards = iceBreakers
    } else if (deck === "Hot 'N Heavy") {
      if (heatLevel === 1) selectedCards = hotNHeavyLevel1
      else if (heatLevel === 2) selectedCards = [...hotNHeavyLevel1, ...hotNHeavyLevel2]
      else selectedCards = [...hotNHeavyLevel1, ...hotNHeavyLevel2, ...hotNHeavyLevel3]
    }

    // Filter by selected categories
    const filteredCards = selectedCards.filter(card => 
      categories.length === 0 || categories.includes(card.category)
    )

    setCards(filteredCards)
  }

  const nextPlayer = () => {
    if (gameSetup) {
      setCurrentPlayerIndex((prev) => (prev + 1) % gameSetup.participants.length)
      setCurrentCardIndex((prev) => (prev + 1) % cards.length)
      setTimeLeft(gameSetup.timePerPlay || 60)
    }
  }

  const currentCard = cards[currentCardIndex]
  const currentPlayer = gameSetup?.participants[currentPlayerIndex]

  if (!gameSetup || !currentCard) {
    return (
      <div className="viewport-container" style={{backgroundColor: '#f6f3e2'}}>
        <div className="content-wrapper text-center">
          <p>Loading game...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="viewport-container" style={{backgroundColor: '#f6f3e2'}}>
      <div className="content-wrapper">
        
        <div className="flex justify-between items-center mb-8">
          <div style={{color: '#5b5450'}}>
            <h2 className="text-xl font-semibold">Current Player</h2>
            <p className="text-2xl" style={{color: '#bb3309'}}>{currentPlayer}</p>
          </div>
          
          <div className="text-center" style={{color: '#5b5450'}}>
            <h2 className="text-xl font-semibold">Time Remaining</h2>
            <p className="text-3xl font-bold" style={{color: '#bb3309'}}>{timeLeft}s</p>
          </div>
        </div>
        
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-8 border-2 mb-8 shadow-lg" style={{borderColor: '#468675'}}>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {currentCard.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm border-2" style={{backgroundColor: '#fcf9e8', color: '#468675', borderColor: '#468675'}}>
                    {tag}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full text-sm border-2" style={{backgroundColor: '#fcf9e8', color: '#bb3309', borderColor: '#bb3309'}}>
                  {currentCard.heatLevel}
                </span>
              </div>
              
              <p className="text-xl leading-relaxed" style={{color: '#5b5450'}}>
                {currentCard.text}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#468675'}}>
              Act it out! 🔥
            </button>
            
            <button className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#df6e20'}}>
              Need help? 💭
            </button>
            
            <button 
              onClick={nextPlayer}
              className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" 
              style={{backgroundColor: '#bb3309'}}
            >
              Next Player →
            </button>
            
            <button className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#5b5450'}}>
              Pass ⏭️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}