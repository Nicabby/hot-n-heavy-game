'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import TGOLBrandLogo from '@/components/TGOLBrandLogo'
import decksData from '@/data/decks.json'

interface Card {
  id: string
  text: string
  tags: string[]
  level: string
  gender: string
  repeatable: boolean
}

interface GameState {
  currentCardIndex: number
  usedCards: string[]
  currentLevel: string
  cardsInLevel: number
  flame: number
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    currentCardIndex: 0,
    usedCards: [],
    currentLevel: 'L1',
    cardsInLevel: 0,
    flame: 1
  })
  
  const [currentCard, setCurrentCard] = useState<Card | null>(null)
  const [availableCards, setAvailableCards] = useState<Card[]>([])
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [gameMode, setGameMode] = useState<'icebreaker' | 'hotAndHeavy' | 'extraHot'>('icebreaker')

  const getAllCards = (): Card[] => {
    let cards: Card[] = []
    
    if (gameMode === 'icebreaker') {
      cards = [...decksData.icebreaker]
    } else if (gameMode === 'hotAndHeavy') {
      const level = gameState.currentLevel as keyof typeof decksData.hotAndHeavy
      cards = [...decksData.hotAndHeavy[level] || []]
    } else if (gameMode === 'extraHot') {
      const level = gameState.currentLevel as keyof typeof decksData.extraHot
      cards = [...decksData.extraHot[level] || []]
    }
    
    return cards.filter(card => !gameState.usedCards.includes(card.id))
  }

  const drawCard = () => {
    const cards = getAllCards()
    if (cards.length === 0) {
      if (gameMode === 'icebreaker') {
        setGameMode('hotAndHeavy')
        setGameState(prev => ({ ...prev, currentLevel: 'L1', cardsInLevel: 0 }))
        return
      }
      setShowCheckIn(true)
      return
    }
    
    const randomCard = cards[Math.floor(Math.random() * cards.length)]
    setCurrentCard(randomCard)
    setGameState(prev => ({
      ...prev,
      usedCards: [...prev.usedCards, randomCard.id],
      cardsInLevel: prev.cardsInLevel + 1
    }))
  }

  const skipCard = () => {
    drawCard()
  }

  const completeCard = () => {
    if (gameState.cardsInLevel >= 18) {
      setShowCheckIn(true)
    } else {
      drawCard()
    }
  }

  const handleCheckIn = (newFlame: number) => {
    setGameState(prev => ({ 
      ...prev, 
      flame: newFlame,
      cardsInLevel: 0,
      usedCards: [] // Reset for new level
    }))
    
    if (newFlame >= 5 && gameMode === 'hotAndHeavy') {
      setGameMode('extraHot')
      setGameState(prev => ({ ...prev, currentLevel: 'L4' }))
    } else if (gameMode === 'hotAndHeavy') {
      const nextLevel = `L${Math.min(parseInt(gameState.currentLevel.slice(1)) + 1, 3)}`
      setGameState(prev => ({ ...prev, currentLevel: nextLevel }))
    } else if (gameMode === 'extraHot') {
      const nextLevel = `L${Math.min(parseInt(gameState.currentLevel.slice(1)) + 1, 5)}`
      setGameState(prev => ({ ...prev, currentLevel: nextLevel }))
    }
    
    setShowCheckIn(false)
    drawCard()
  }

  useEffect(() => {
    drawCard()
  }, [gameMode])

  if (showCheckIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tgol-cream via-rose-50 to-tgol-cream flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 border border-tgol-red/20">
          <div className="text-center">
            <div className="text-6xl mb-6">🔥</div>
            <h2 className="text-3xl font-bold text-tgol-red font-mission mb-4">
              Heat Check-In
            </h2>
            <p className="text-gray-700 mb-6">
              How's everyone feeling? Ready to turn up the heat?
            </p>
            
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => handleCheckIn(level)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    level <= gameState.flame ? 'border-tgol-red bg-tgol-red/10' : 'border-gray-200 hover:border-tgol-red/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      Level {level} {Array(level).fill('🔥').join('')}
                    </span>
                    <span className="text-2xl">
                      {level === 1 && '😊'}
                      {level === 2 && '😉'}
                      {level === 3 && '🔥'}
                      {level === 4 && '🌶️'}
                      {level === 5 && '💥'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Link
                href="/results"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                End Game →
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tgol-cream via-rose-50 to-tgol-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🎲</div>
          <p className="text-tgol-red font-semibold">Drawing your card...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tgol-cream via-rose-50 to-tgol-cream">
      {/* Header */}
      <header className="w-full py-6">
        <TGOLBrandLogo />
      </header>
      
      <main className="container mx-auto px-4">
        {/* Game Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/consent" className="text-tgol-red hover:text-tgol-red/80">
              ← Back
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{Array(gameState.flame).fill('🔥').join('')}</span>
              <span className="font-semibold text-tgol-red">
                {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)} {gameState.currentLevel}
              </span>
            </div>
          </div>
          
          <div className="bg-white/50 rounded-full px-6 py-2 inline-block">
            <span className="text-sm text-gray-600">
              Cards in this level: {gameState.cardsInLevel}/18
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-tgol-red/20 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-tgol-red to-rose-500 text-white p-6 text-center">
              <div className="text-4xl mb-2">
                {gameMode === 'icebreaker' && '🧊'}
                {gameMode === 'hotAndHeavy' && '🔥'}
                {gameMode === 'extraHot' && '🌶️'}
              </div>
              <h2 className="text-xl font-bold">
                {gameMode === 'icebreaker' && 'Icebreaker'}
                {gameMode === 'hotAndHeavy' && 'Hot & Heavy'}
                {gameMode === 'extraHot' && 'Extra Hot'}
              </h2>
            </div>
            
            {/* Card Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-2xl leading-relaxed text-gray-800 font-medium">
                  {currentCard.text}
                </p>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {currentCard.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-tgol-cream text-tgol-red text-sm rounded-full border border-tgol-red/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={skipCard}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-2xl hover:bg-gray-300 transition-colors font-semibold"
                >
                  Skip Card
                </button>
                <button
                  onClick={completeCard}
                  className="flex-1 bg-tgol-red text-white py-4 px-6 rounded-2xl hover:bg-tgol-red/90 transition-colors font-semibold"
                >
                  Done! Next Card
                </button>
              </div>
            </div>
          </div>
          
          {/* Help Text */}
          <div className="text-center mt-6 text-sm text-gray-600 space-y-2">
            <p>💡 Remember: You can skip any card without explanation</p>
            <p>🔥 After 18 cards, we'll check in and possibly turn up the heat!</p>
          </div>
        </div>
      </main>
    </div>
  )
}