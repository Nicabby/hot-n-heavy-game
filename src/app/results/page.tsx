export default function Results() {
  const gameStats = {
    totalCards: 12,
    completed: 8,
    passed: 4,
    duration: "25 minutes"
  }
  
  const playedCards = [
    "Give your partner a sensual shoulder massage",
    "Share your wildest fantasy",
    "Blindfold your partner and feed them something sweet",
    "Write a love note on your partner's body with your finger"
  ]
  
  return (
    <div className="viewport-container" style={{backgroundColor: '#f6f3e2'}}>
      <div className="content-wrapper">
        <h1 className="text-2xl md:text-4xl font-bold font-sans text-center mb-6" style={{color: '#bb3309'}}>Game Complete! 🎉</h1>
        
        <div className="w-full">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            
            <div className="bg-white rounded-xl p-6 border-2 shadow-lg" style={{borderColor: '#468675'}}>
              <h2 className="text-2xl mb-6" style={{color: '#5b5450'}}>Game Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span style={{color: '#5b5450'}}>Total Cards:</span>
                  <span className="font-semibold" style={{color: '#bb3309'}}>{gameStats.totalCards}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{color: '#5b5450'}}>Completed:</span>
                  <span className="font-semibold" style={{color: '#468675'}}>{gameStats.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{color: '#5b5450'}}>Passed:</span>
                  <span className="font-semibold" style={{color: '#df6e20'}}>{gameStats.passed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{color: '#5b5450'}}>Duration:</span>
                  <span className="font-semibold" style={{color: '#bb3309'}}>{gameStats.duration}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="rounded-lg p-4" style={{backgroundColor: '#fcf9e8'}}>
                  <p className="text-center" style={{color: '#5b5450'}}>
                    Completion Rate: <span className="text-2xl font-bold" style={{color: '#bb3309'}}>{Math.round((gameStats.completed / gameStats.totalCards) * 100)}%</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 shadow-lg" style={{borderColor: '#00a1cf'}}>
              <h2 className="text-2xl mb-6" style={{color: '#5b5450'}}>Favorite Moments</h2>
              <div className="space-y-3">
                {playedCards.map((card, index) => (
                  <div key={index} className="rounded-lg p-3 border-2" style={{backgroundColor: '#fcf9e8', borderColor: '#00a1cf'}}>
                    <p className="text-sm" style={{color: '#5b5450'}}>{card}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#bb3309'}}>
                Play Again 🔄
              </button>
              
              <button className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#00a1cf'}}>
                Share Results 📱
              </button>
              
              <button className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#468675'}}>
                Rate Cards ⭐
              </button>
            </div>
            
            <p className="text-sm mt-8" style={{color: '#5b5450', opacity: 0.6}}>
              Thanks for playing Hot &apos;n Heavy! 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}