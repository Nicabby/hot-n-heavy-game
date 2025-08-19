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

  // Tag consolidation function
  const consolidateTag = (tag: string): string => {
    const tagLower = tag.toLowerCase()
    
    // Kissing consolidation
    if (tagLower.includes('kissing') || tagLower.includes('kiss')) return 'Kissing'
    
    // Touching consolidation  
    if (tagLower.includes('touch') || tagLower.includes('rub') || tagLower.includes('caress')) return 'Touching'
    
    // Oral consolidation
    if (tagLower.includes('oral') || tagLower.includes('suck') || tagLower.includes('lick') || tagLower.includes('tongue')) return 'Oral'
    
    // Group play consolidation
    if (tagLower.includes('group') || tagLower.includes('threesome')) return 'Group Play'
    
    // Roleplay consolidation  
    if (tagLower.includes('roleplay') || tagLower.includes('porn scene')) return 'Roleplay'
    
    // Exhibition/Voyeurism
    if (tagLower.includes('exhibition') || tagLower.includes('voyeur')) return 'Exhibition'
    
    // Teasing/Foreplay
    if (tagLower.includes('teas') || tagLower.includes('foreplay')) return 'Foreplay'
    
    // Strip/undressing
    if (tagLower.includes('strip') || tagLower.includes('clothing')) return 'Undressing'
    
    // Blindfold
    if (tagLower.includes('blindfold')) return 'Blindfold'
    
    // Default return original
    return tag
  }

  const loadCards = (deck: string, heatLevel: number, categories: string[]) => {
    // Real card data from CSV
    const hotNHeavyCards: Card[] = [
      // Level 1 Cards
      { id: 1, text: "Pick someone who is not your partner and kiss them softly on the lips.", tags: ["Kissing", "Foreplay"], heatLevel: "🔥", category: "Kissing" },
      { id: 2, text: "Pick two people and have them passionately kiss each other.", tags: ["Kissing", "Exhibition", "Group Play"], heatLevel: "🔥", category: "Group Play" },
      { id: 3, text: "Sensually kiss this person in three different places other than their lips.", tags: ["Kissing"], heatLevel: "🔥", category: "Kissing" },
      { id: 4, text: "Nibble the person's ear until they moan or giggle.", tags: ["Kissing", "Foreplay"], heatLevel: "🔥", category: "Kissing" },
      { id: 5, text: "Remove one article of your own clothing.", tags: ["Undressing", "Exhibition"], heatLevel: "🔥", category: "Exhibition" },
      { id: 6, text: "Help this person remove one article of clothing.", tags: ["Undressing", "Touching"], heatLevel: "🔥", category: "Touching" },
      { id: 7, text: "Softly kiss this person's neck and collar bone.", tags: ["Kissing"], heatLevel: "🔥", category: "Kissing" },
      { id: 8, text: "While kissing this person, take their hand and guide it to a place you want them to rub.", tags: ["Kissing", "Touching"], heatLevel: "🔥", category: "Touching" },
      { id: 9, text: "While kissing this person, put your hand down their pants or up their skirt, but stay above their underwear.", tags: ["Kissing", "Foreplay", "Touching"], heatLevel: "🔥", category: "Touching" },
      { id: 10, text: "Pick someone of the opposite sex (not your partner) and whisper something that you'd really like to do sexually to them.", tags: ["Foreplay"], heatLevel: "🔥", category: "Foreplay" },
      { id: 11, text: "Take the hand of this person and lay a trail of soft kisses from their wrist to their neck.", tags: ["Kissing"], heatLevel: "🔥", category: "Kissing" },
      
      // Level 2 Cards  
      { id: 12, text: "Close your eyes and keep them closed while everyone takes a turn kissing you with tongue.", tags: ["Kissing", "Group Play", "Blindfold"], heatLevel: "🔥🔥", category: "Group Play" },
      { id: 13, text: "If you're a girl, rub the chest of a guy (not your partner) under his shirt. If you're a guy, do the same to a girl under her bra.", tags: ["Touching"], heatLevel: "🔥🔥", category: "Touching" },
      { id: 14, text: "Kiss this person and then use the tip of your tongue to lightly trace the edges of their upper and lower lips.", tags: ["Kissing", "Oral"], heatLevel: "🔥🔥", category: "Kissing" },
      { id: 15, text: "Sensually suck the index finger of this person.", tags: ["Oral", "Foreplay"], heatLevel: "🔥🔥", category: "Oral" },
      { id: 16, text: "Pick two people and kiss them both with tongue, going back and forth a couple of times.", tags: ["Kissing", "Group Play"], heatLevel: "🔥🔥", category: "Group Play" },
      { id: 17, text: "Pick someone, who is not your partner, and make out with them while lying down.", tags: ["Kissing"], heatLevel: "🔥🔥", category: "Kissing" },
      { id: 18, text: "Starting at the knee, kiss and lick this person's inner thighs, stop when you get to their genital area.", tags: ["Oral", "Foreplay"], heatLevel: "🔥🔥", category: "Oral" },
      { id: 19, text: "Stand and kiss this person with tongue while putting your hands down the back of their pants.", tags: ["Kissing", "Touching"], heatLevel: "🔥🔥", category: "Touching" },
      { id: 20, text: "Pick two people and all three of you stand. Rub them both, below the waist simultaneously, while kissing one of them.", tags: ["Group Play", "Touching"], heatLevel: "🔥🔥", category: "Group Play" },
      
      // Level 3 Cards
      { id: 21, text: "If you're a girl, pick a guy that is not your partner. Rub your bare breasts on either side of his penis. If you're a guy, pick a girl that is not your partner and rub your penis between her breasts.", tags: ["Oral", "Group Play"], heatLevel: "🔥🔥🔥", category: "Oral" },
      { id: 22, text: "Stimulate two parts of this person's body at the same time. Use your hand on one part, and your mouth on another.", tags: ["Touching", "Oral", "Foreplay"], heatLevel: "🔥🔥🔥", category: "Oral" },
      { id: 23, text: "If you're a guy, kiss both girls while they both stroke your penis. If you're a girl, kiss both guys while they both rub your bare breasts.", tags: ["Group Play", "Oral", "Touching"], heatLevel: "🔥🔥🔥", category: "Group Play" },
      { id: 24, text: "While standing or lying down, lick whatever body part this person prefers. Do this for one minute.", tags: ["Oral"], heatLevel: "🔥🔥🔥", category: "Oral" },
      { id: 25, text: "Without removing this person's underwear – just slide them over – give them oral. Do this for one minute.", tags: ["Oral"], heatLevel: "🔥🔥🔥", category: "Oral" },
      { id: 26, text: "You're the director. Select your cast and have them perform a short porn scene.", tags: ["Roleplay", "Exhibition", "Group Play"], heatLevel: "🔥🔥🔥", category: "Roleplay" },
      { id: 27, text: "While kissing this person, slip your hand in their underwear and caress erotically.", tags: ["Kissing", "Touching"], heatLevel: "🔥🔥🔥", category: "Touching" },
      { id: 28, text: "While standing behind this person and kissing their neck, slip your hand down the front of their underwear and caress erotically.", tags: ["Kissing", "Touching"], heatLevel: "🔥🔥🔥", category: "Touching" },
      { id: 29, text: "You and your partner choose a girl. The guy stands behind her, holding and rubbing her breast, while the girl (his partner) stands in front and sucks her nipples.", tags: ["Group Play", "Oral", "Exhibition"], heatLevel: "🔥🔥🔥", category: "Group Play" },
      { id: 30, text: "If you're a girl, you're going to suck your partner's penis, but don't use your hands. Pick another person to handle his penis and place it in your mouth. If you're a guy, do this with your partner and someone else.", tags: ["Oral", "Group Play"], heatLevel: "🔥🔥🔥", category: "Group Play" }
    ]

    const iceBreakers: Card[] = [
      { id: 1, text: "Share a compliment about each person in the group", tags: ["Communication"], heatLevel: "Warm", category: "Communication" },
      { id: 2, text: "Give someone a 30-second shoulder massage", tags: ["Touching"], heatLevel: "Warm", category: "Touching" },
      { id: 3, text: "Share your favorite romantic memory", tags: ["Communication"], heatLevel: "Warm", category: "Communication" },
      { id: 4, text: "Kiss your partner on the forehead", tags: ["Kissing"], heatLevel: "Warm", category: "Kissing" },
      { id: 5, text: "Hold hands with your partner for 1 minute while maintaining eye contact", tags: ["Touching"], heatLevel: "Warm", category: "Touching" }
    ]

    let selectedCards: Card[] = []
    
    if (deck === 'IceBreaker') {
      selectedCards = iceBreakers
    } else if (deck === "Hot 'N Heavy") {
      // Filter by heat level
      selectedCards = hotNHeavyCards.filter(card => {
        const cardLevel = card.heatLevel.length // 🔥 = 1, 🔥🔥 = 2, 🔥🔥🔥 = 3
        return cardLevel <= heatLevel
      })
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