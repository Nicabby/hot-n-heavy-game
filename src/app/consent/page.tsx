'use client'

import { useState } from 'react'
import Link from 'next/link'
import TGOLBrandLogo from '@/components/TGOLBrandLogo'
import categoriesData from '@/data/categories.json'

export default function Consent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [globalSpiceLevel, setGlobalSpiceLevel] = useState(3)
  const [agreed, setAgreed] = useState(false)

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const canProceed = agreed && selectedCategories.length > 0

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: '#F7F3E2' }}
    >
      {/* Header */}
      <header className="w-full py-6">
        <TGOLBrandLogo />
      </header>
      
      <main className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Link 
            href="/lobby" 
            className="inline-flex items-center font-futura-medium text-lg hover:opacity-70 transition-opacity mb-6"
            style={{ color: '#B9340B' }}
          >
            ← BACK TO LOBBY
          </Link>
          <h1 
            className="text-4xl font-futura-bold tracking-wide mb-4"
            style={{ color: '#B9340B' }}
          >
            CONSENT & PREFERENCES
          </h1>
          <p 
            className="text-xl font-futura max-w-2xl mx-auto"
            style={{ color: '#555555' }}
          >
            Set your boundaries and preferences for a safe, fun experience
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Consent Agreement */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-tgol-red">
            <h2 
              className="text-3xl font-futura-bold tracking-wide mb-8 text-center"
              style={{ color: '#B9340B' }}
            >
              CONSENT & SAFETY FIRST
            </h2>
            
            <div className="space-y-6">
              <div 
                className="p-8 rounded-xl border-2"
                style={{ backgroundColor: '#FCF9E8', borderColor: '#498379' }}
              >
                <h3 
                  className="font-futura-bold text-2xl mb-6 text-center"
                  style={{ color: '#B9340B' }}
                >
                  IMPORTANT GUIDELINES
                </h3>
                <ul 
                  className="space-y-3 font-futura text-lg"
                  style={{ color: '#555555' }}
                >
                  <li>• All participants must be 18+ years of age</li>
                  <li>• Everyone can skip any card without explanation</li>
                  <li>• Respect boundaries at all times</li>
                  <li>• Stop the game if anyone feels uncomfortable</li>
                  <li>• "No" means no - always</li>
                  <li>• This is for fun between consenting adults</li>
                </ul>
              </div>
              
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  id="consent"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-2 h-6 w-6 rounded border-2 border-gray-300 focus:border-tgol-red"
                  style={{ accentColor: '#B9340B' }}
                />
                <label 
                  htmlFor="consent" 
                  className="font-futura text-lg leading-relaxed"
                  style={{ color: '#555555' }}
                >
                  I agree that all participants are consenting adults (18+) and understand the guidelines above. 
                  We commit to respecting boundaries and maintaining a safe, fun environment.
                </label>
              </div>
            </div>
          </div>

          {/* Global Spice Level */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-tgol-green/20">
            <h2 className="text-2xl font-bold text-tgol-green mb-6">🌶️ Group Spice Level</h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Set the maximum spice level for this session. Individual players can have lower preferences.
              </p>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Maximum Level: L{globalSpiceLevel}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={globalSpiceLevel}
                  onChange={(e) => setGlobalSpiceLevel(parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-400 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>L1 - Mild</span>
                  <span>L2 - Warm</span>
                  <span>L3 - Spicy</span>
                  <span>L4 - Hot</span>
                  <span>L5 - Extra Hot</span>
                </div>
              </div>

              <div className="bg-tgol-cream/50 p-4 rounded-xl">
                <h4 className="font-semibold mb-2">Level {globalSpiceLevel} includes:</h4>
                <p className="text-sm text-gray-600">
                  {globalSpiceLevel === 1 && "Light teasing, kissing, gentle touches, and flirtatious conversation"}
                  {globalSpiceLevel === 2 && "Sensual massage, passionate kissing, light roleplay, and romantic scenarios"}
                  {globalSpiceLevel === 3 && "Intimate touching, blindfolding, temperature play, and moderate roleplay"}
                  {globalSpiceLevel === 4 && "Advanced roleplay, power dynamics, and more adventurous activities"}
                  {globalSpiceLevel === 5 && "All categories available - the spiciest level with no restrictions"}
                </p>
              </div>
            </div>
          </div>

          {/* Category Preferences */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-rose-300/20">
            <h2 className="text-2xl font-bold text-rose-600 mb-6">💕 Activity Categories</h2>
            
            <p className="text-gray-700 mb-6">
              Select the types of activities you want to include in your game. You can change these anytime.
            </p>
            
            <div className="grid md:grid-cols-3 gap-3">
              {categoriesData.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedCategories.includes(category)
                      ? 'border-tgol-red bg-tgol-red/10 text-tgol-red'
                      : 'border-gray-200 bg-white hover:border-tgol-red/30 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category}</span>
                    <span className={`w-5 h-5 rounded-full border-2 ${
                      selectedCategories.includes(category)
                        ? 'bg-tgol-red border-tgol-red'
                        : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {selectedCategories.includes(category) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Start with fewer categories and add more as you get comfortable. 
                You can always skip individual cards during gameplay.
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Link
              href={canProceed ? "/game" : "#"}
              className={`inline-block px-8 py-4 rounded-full font-semibold text-lg transition-all ${
                canProceed
                  ? 'bg-tgol-red text-white hover:bg-tgol-red/90 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={(e) => !canProceed && e.preventDefault()}
            >
              {!agreed ? "Please agree to guidelines" : 
               selectedCategories.length === 0 ? "Select at least one category" :
               "Start Game! 🎲"}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}