'use client'

import { useState } from 'react'

export default function Game() {
  const [currentCard] = useState({
    id: 1,
    text: "Give your partner a sensual shoulder massage for 60 seconds while maintaining eye contact",
    tags: ["Touch", "Sensual", "Eye Contact"],
    heatLevel: "Spicy"
  })
  
  const [timeLeft] = useState(60)
  const [currentPlayer] = useState("Alex")
  
  return (
    <div className="min-h-screen" style={{backgroundColor: '#f6f3e2'}}>
      <div className="container mx-auto px-4 py-8">
        
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
        
        <div className="max-w-2xl mx-auto">
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
          
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#468675'}}>
              Act it out! 🔥
            </button>
            
            <button className="px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#df6e20'}}>
              Need help? 💭
            </button>
            
            <button className="px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#5b5450'}}>
              Pass ⏭️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}