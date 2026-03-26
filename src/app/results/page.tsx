'use client'

import Link from 'next/link'
import { useState } from 'react'
import TGOLBrandLogo from '@/components/TGOLBrandLogo'

export default function Results() {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    setSubmitted(true)
  }

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
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <div className="mb-16">
            <h1 
              className="text-5xl font-futura-bold tracking-wide mb-6"
              style={{ color: '#B9340B' }}
            >
              GAME COMPLETE!
            </h1>
            <p 
              className="text-2xl font-futura"
              style={{ color: '#498379' }}
            >
              Hope you had a spicy time! 🔥
            </p>
          </div>

          {/* Stats */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-tgol-red/20">
            <h2 className="text-2xl font-bold text-tgol-red mb-6">Session Stats</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-tgol-cream/50 rounded-xl p-4">
                <div className="text-3xl mb-2">⏰</div>
                <div className="text-2xl font-bold text-tgol-red">45m</div>
                <div className="text-sm text-gray-600">Time Played</div>
              </div>
              
              <div className="bg-tgol-cream/50 rounded-xl p-4">
                <div className="text-3xl mb-2">🎲</div>
                <div className="text-2xl font-bold text-tgol-green">23</div>
                <div className="text-sm text-gray-600">Cards Drawn</div>
              </div>
              
              <div className="bg-tgol-cream/50 rounded-xl p-4">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-rose-500">Level 3</div>
                <div className="text-sm text-gray-600">Max Heat</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-tgol-green/20">
            <h2 className="text-2xl font-bold text-tgol-green mb-6">Achievements Unlocked! 🏆</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <h3 className="font-bold">Heat Seeker</h3>
                    <p className="text-sm text-gray-600">Reached Level 3 spice</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <h3 className="font-bold">Role Player</h3>
                    <p className="text-sm text-gray-600">Completed 5 roleplay cards</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💋</span>
                  <div>
                    <h3 className="font-bold">Kiss Master</h3>
                    <p className="text-sm text-gray-600">Completed all kissing challenges</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <h3 className="font-bold">First Timer</h3>
                    <p className="text-sm text-gray-600">Completed your first TGOL session</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-rose-300/20">
            <h2 className="text-2xl font-bold text-rose-600 mb-6">How was your experience? 💕</h2>
            
            {!submitted ? (
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 mb-4">Rate your session:</p>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-4xl transition-all ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-700 mb-2">Any feedback or suggestions?</p>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-tgol-red focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Tell us what you loved or how we can improve..."
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className="bg-tgol-red text-white py-3 px-8 rounded-full hover:bg-tgol-red/90 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Submit Feedback
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-xl font-bold text-tgol-red mb-2">Thank You!</h3>
                <p className="text-gray-600">Your feedback helps us make TGOL even better</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/lobby"
              className="block w-full bg-tgol-red text-white py-4 px-8 rounded-full hover:bg-tgol-red/90 transition-colors font-semibold text-lg"
            >
              Play Again 🎲
            </Link>
            
            <Link
              href="/store"
              className="block w-full bg-tgol-green text-white py-4 px-8 rounded-full hover:bg-tgol-green/90 transition-colors font-semibold text-lg"
            >
              Get Physical Cards 🛍️
            </Link>
            
            <Link
              href="/"
              className="block text-gray-600 hover:text-gray-800 py-2"
            >
              Back to Home
            </Link>
          </div>

          {/* Social Sharing */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Share the fun (discretely):</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Share Link
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Recommend to Friends
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}