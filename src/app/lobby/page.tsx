'use client'

import { useState } from 'react'
import Image from 'next/image'

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

export default function Lobby() {
  const [currentStep, setCurrentStep] = useState(1)
  const [gameSetup, setGameSetup] = useState<GameSetup>({
    gameId: '',
    participants: [''],
    selectedDeck: '',
    swapType: '',
    heatLevel: 1,
    categories: [],
    timePerPlay: 60,
    allowSkips: true,
    timerOverride: false,
    heatLevelAdjust: false
  })

  const totalSteps = 6

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleCreateGame()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCreateGame = async () => {
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameSetup)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setGameSetup(prev => ({ ...prev, gameId: result.gameId }))
        console.log('Game registered with ID:', result.gameId)
        
        localStorage.setItem('currentGame', JSON.stringify({
          ...gameSetup,
          gameId: result.gameId
        }))
        
        window.location.href = '/consent'
      } else {
        console.error('Failed to register game:', result.error)
        alert('Failed to create game. Please try again.')
      }
    } catch (error) {
      console.error('Error creating game:', error)
      alert('Failed to create game. Please try again.')
    }
  }

  const addParticipant = () => {
    setGameSetup(prev => ({
      ...prev,
      participants: [...prev.participants, '']
    }))
  }

  const removeParticipant = (index: number) => {
    if (gameSetup.participants.length > 1) {
      setGameSetup(prev => ({
        ...prev,
        participants: prev.participants.filter((_, i) => i !== index)
      }))
    }
  }

  const updateParticipant = (index: number, name: string) => {
    setGameSetup(prev => ({
      ...prev,
      participants: prev.participants.map((p, i) => i === index ? name : p)
    }))
  }

  const toggleCategory = (category: string) => {
    setGameSetup(prev => ({
      ...prev,
      categories: prev.categories.includes(category) 
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const decks = [
    { name: 'IceBreaker', color: '#468675', logo: '/images/IceBreaker.png' },
    { name: 'Hot \'N Heavy', color: '#bb3309', logo: '/images/Hotnheavy.png' },
    { name: 'Wet \'N Wild', color: '#00a1cf', logo: '/images/Wetnwild.png' },
    { name: 'Threesome', color: '#df6e20', logo: '/images/Threesome.png' }
  ]

  const categories = [
    'Oral', 'Anal', 'Kissing', 'Full Penetration', 'Touching', 'Roleplay', 
    'Toys', 'Bondage', 'Public Play', 'Group Play'
  ]

  return (
    <div className="viewport-container" style={{backgroundColor: '#f6f3e2'}}>
      <div className="content-wrapper">
        
        {/* Header with TGOL Logo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3">
            <Image
              src="/images/TGOLbase.png"
              alt="The Game of Lifestyle Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-sans" style={{color: '#bb3309'}}>Game Setup</h1>
          <p className="text-sm mt-1" style={{color: '#5b5450'}}>Step {currentStep} of {totalSteps}</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className="flex-1 h-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: step <= currentStep ? '#bb3309' : '#e5e5e5'
                }}
              />
            ))}
          </div>
        </div>

        {/* Content Screens */}
        <div className="w-full relative mb-4" style={{height: 'calc(100vh - 260px)', minHeight: '350px'}}>
            
            {/* Step 1: Participants */}
            {currentStep === 1 && (
            <div className="absolute inset-0 bg-white rounded-xl p-4 md:p-6 border-2 shadow-lg overflow-y-auto" style={{borderColor: '#468675'}}>
              <h2 className="text-xl md:text-2xl font-bold font-sans mb-4 text-center" style={{color: '#5b5450'}}>Who&apos;s Playing?</h2>
              
              <div className="space-y-3 mb-4">
                {gameSetup.participants.map((participant, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`Player ${index + 1} (first name only)`}
                      value={participant}
                      onChange={(e) => updateParticipant(index, e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors text-sm md:text-base"
                      style={{
                        borderColor: '#468675',
                        backgroundColor: '#fcf9e8',
                        color: '#5b5450'
                      }}
                    />
                    {gameSetup.participants.length > 1 && (
                      <button
                        onClick={() => removeParticipant(index)}
                        className="px-3 py-3 rounded-lg text-white font-bold hover:opacity-80 text-lg"
                        style={{backgroundColor: '#bb3309'}}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addParticipant}
                className="w-full py-3 rounded-lg border-2 border-dashed hover:opacity-80 transition-opacity"
                style={{borderColor: '#468675', color: '#468675'}}
              >
                + Add Another Player
              </button>
            </div>
            )}

            {/* Step 2: Deck Selection */}
            {currentStep === 2 && (
            <div className="absolute inset-0 bg-white rounded-xl p-3 md:p-4 border-2 shadow-lg overflow-y-auto" style={{borderColor: '#468675'}}>
              <h2 className="text-lg md:text-xl font-bold font-sans mb-3 text-center" style={{color: '#5b5450'}}>Choose Your Adventure</h2>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {decks.map((deck) => (
                  <button
                    key={deck.name}
                    onClick={() => setGameSetup(prev => ({ ...prev, selectedDeck: deck.name }))}
                    className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                      gameSetup.selectedDeck === deck.name 
                        ? 'scale-105 shadow-lg' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      borderColor: deck.color,
                      borderWidth: gameSetup.selectedDeck === deck.name ? '2px' : '1px',
                      backgroundColor: gameSetup.selectedDeck === deck.name ? '#fcf9e8' : 'white'
                    }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mb-1 flex items-center justify-center">
                      <Image
                        src={deck.logo}
                        alt={`${deck.name} logo`}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <span className="text-xs font-semibold text-center leading-tight" style={{color: deck.color}}>
                      {deck.name}
                    </span>
                  </button>
                ))}
              </div>
              
              {gameSetup.selectedDeck && (
                <div className="text-center p-4 rounded-lg" style={{backgroundColor: '#fcf9e8'}}>
                  <p style={{color: '#5b5450'}}>
                    You&apos;ve selected <strong style={{color: '#bb3309'}}>{gameSetup.selectedDeck}</strong>
                  </p>
                </div>
              )}
            </div>
            )}

            {/* Step 3: Swap Type & Heat Level */}
            {currentStep === 3 && (
            <div className="absolute inset-0 bg-white rounded-xl p-4 md:p-6 border-2 shadow-lg overflow-y-auto" style={{borderColor: '#468675'}}>
              <h2 className="text-xl md:text-2xl font-bold font-sans mb-6 text-center" style={{color: '#5b5450'}}>Game Intensity</h2>
              
              <div className="space-y-8">
                {/* Swap Type */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center" style={{color: '#5b5450'}}>Swap Type</h3>
                  <div className="flex gap-4">
                    {['soft', 'full'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setGameSetup(prev => ({ ...prev, swapType: type as 'soft' | 'full' }))}
                        className={`flex-1 py-4 px-4 rounded-lg border-2 transition-all text-base ${
                          gameSetup.swapType === type ? 'scale-105' : ''
                        }`}
                        style={{
                          borderColor: gameSetup.swapType === type ? '#bb3309' : '#468675',
                          backgroundColor: gameSetup.swapType === type ? '#fcf9e8' : 'white',
                          color: gameSetup.swapType === type ? '#bb3309' : '#468675'
                        }}
                      >
                        {type === 'soft' ? 'Soft Swap' : 'Full Swap'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Heat Level */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center" style={{color: '#5b5450'}}>Heat Level to Start</h3>
                  <div className="flex gap-6 justify-center">
                    {[1, 2, 3].map((level) => (
                      <button
                        key={level}
                        onClick={() => setGameSetup(prev => ({ ...prev, heatLevel: level }))}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          gameSetup.heatLevel === level ? 'scale-110' : 'opacity-60 hover:opacity-100'
                        }`}
                        style={{
                          borderColor: gameSetup.heatLevel === level ? '#bb3309' : '#df6e20',
                          backgroundColor: gameSetup.heatLevel === level ? '#fcf9e8' : 'white'
                        }}
                      >
                        <div className="text-3xl">
                          {'🔥'.repeat(level)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Step 4: Categories */}
            {currentStep === 4 && (
            <div className="absolute inset-0 bg-white rounded-xl p-4 md:p-6 border-2 shadow-lg overflow-y-auto" style={{borderColor: '#468675'}}>
              <h2 className="text-xl md:text-2xl font-bold font-sans mb-6 text-center" style={{color: '#5b5450'}}>What&apos;s Included?</h2>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center" style={{color: '#5b5450'}}>Categories to Include</h3>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                      <input
                        type="checkbox"
                        checked={gameSetup.categories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-5 h-5 rounded"
                        style={{accentColor: '#bb3309'}}
                      />
                      <span className="text-sm font-medium" style={{color: '#5b5450'}}>{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            )}

            {/* Step 5: Time & Game Options */}
            {currentStep === 5 && (
            <div className="absolute inset-0 bg-white rounded-xl p-4 md:p-6 border-2 shadow-lg overflow-y-auto" style={{borderColor: '#468675'}}>
              <h2 className="text-xl md:text-2xl font-bold font-sans mb-6 text-center" style={{color: '#5b5450'}}>Game Options</h2>
              
              <div className="space-y-8">
                {/* Time per play */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center" style={{color: '#5b5450'}}>Time per Play</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[30, 60, 90, 120].map((seconds) => (
                      <button
                        key={seconds}
                        onClick={() => setGameSetup(prev => ({ ...prev, timePerPlay: seconds }))}
                        className={`py-3 px-4 rounded-lg border-2 transition-all text-base ${
                          gameSetup.timePerPlay === seconds ? 'scale-105' : ''
                        }`}
                        style={{
                          borderColor: gameSetup.timePerPlay === seconds ? '#00a1cf' : '#468675',
                          backgroundColor: gameSetup.timePerPlay === seconds ? '#fcf9e8' : 'white',
                          color: gameSetup.timePerPlay === seconds ? '#00a1cf' : '#468675'
                        }}
                      >
                        {seconds}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Game Options */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center" style={{color: '#5b5450'}}>Additional Options</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'allowSkips', label: 'Allow skips' },
                      { key: 'timerOverride', label: 'Timer override' },
                      { key: 'heatLevelAdjust', label: 'Allow heat level adjustment during game' }
                    ].map((option) => (
                      <label key={option.key} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                        <input
                          type="checkbox"
                          checked={gameSetup[option.key as keyof GameSetup] as boolean}
                          onChange={(e) => setGameSetup(prev => ({ 
                            ...prev, 
                            [option.key]: e.target.checked 
                          }))}
                          className="w-5 h-5 rounded"
                          style={{accentColor: '#bb3309'}}
                        />
                        <span className="text-sm font-medium" style={{color: '#5b5450'}}>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Step 6: Consent & 18+ Disclaimer */}
            {currentStep === 6 && (
            <div className="absolute inset-0 bg-white rounded-xl p-4 md:p-6 border-2 shadow-lg overflow-y-auto" style={{borderColor: '#bb3309'}}>
              <h2 className="text-xl md:text-2xl font-bold font-sans mb-6 text-center" style={{color: '#bb3309'}}>Important: Consent & Age Verification</h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-3 text-red-700">🔞 Adults Only (18+)</h3>
                  <p className="text-sm text-red-700 leading-relaxed">
                    This game contains adult content and is intended only for consenting adults aged 18 and over. 
                    By continuing, you confirm that all participants are 18+ years of age.
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-3 text-blue-700">✋ Consent & Safety</h3>
                  <div className="text-sm text-blue-700 space-y-2">
                    <p>• All participants must freely consent to play</p>
                    <p>• Anyone can stop or pass at any time</p>
                    <p>• Respect all boundaries and comfort levels</p>
                    <p>• Communication is key - check in with each other</p>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-3 text-green-700">🛡️ Your Agreement</h3>
                  <p className="text-sm text-green-700 leading-relaxed">
                    By starting this game, all participants acknowledge they are consenting adults who understand 
                    the nature of this game and agree to participate responsibly.
                  </p>
                </div>
              </div>
            </div>
            )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm md:text-base rounded-lg border-2 font-semibold transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: '#468675',
              color: '#468675',
              backgroundColor: 'white'
            }}
          >
            ← Back
          </button>

          <button
            onClick={nextStep}
            disabled={
              (currentStep === 1 && gameSetup.participants.filter(p => p.trim()).length < 2) ||
              (currentStep === 2 && !gameSetup.selectedDeck) ||
              (currentStep === 3 && !gameSetup.swapType) ||
              (currentStep === 4 && gameSetup.categories.length === 0) ||
              (currentStep === 5 && !gameSetup.timePerPlay)
            }
            className="px-4 py-2 text-sm md:text-base rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{backgroundColor: '#bb3309'}}
          >
            {currentStep === totalSteps ? 'Start Game →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}