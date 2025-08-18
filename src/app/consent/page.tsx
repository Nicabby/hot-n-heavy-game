export default function Consent() {
  const contentCategories = [
    'Kissing',
    'Touching',
    'Oral',
    'Roleplay',
    'Bondage',
    'Toys',
    'Public',
    'Bisexuality',
    'Anal',
    'Rough Play'
  ]

  return (
    <div className="viewport-container" style={{backgroundColor: '#f6f3e2'}}>
      <div className="content-wrapper">
        <h1 className="text-2xl md:text-4xl font-bold font-sans text-center mb-6" style={{color: '#bb3309'}}>Set Your Boundaries</h1>
        <div className="w-full bg-white rounded-xl p-4 md:p-8 border-2 shadow-lg overflow-y-auto" style={{borderColor: '#468675', maxHeight: 'calc(100vh - 200px)'}}>
          
          <div className="mb-8">
            <h2 className="text-2xl mb-4" style={{color: '#5b5450'}}>Content Preferences</h2>
            <p className="mb-6" style={{color: '#5b5450', opacity: 0.8}}>Toggle what you&apos;re comfortable with. Only cards matching your preferences will appear in your game.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {contentCategories.map((category) => (
                <label key={category} className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-2 border-purple-500/50 bg-black/30 text-purple-500 focus:ring-purple-400"
                    defaultChecked
                  />
                  <span style={{color: '#5b5450'}}>{category}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl mb-4" style={{color: '#5b5450'}}>Safety & Consent</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold" style={{color: '#5b5450'}}>Safe Word (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Enter a safe word..."
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{
                    borderColor: '#468675',
                    backgroundColor: '#fcf9e8',
                    color: '#5b5450'
                  }}
                />
              </div>
              
              <div className="rounded-lg p-4 border-2" style={{backgroundColor: '#fcf9e8', borderColor: '#bb3309'}}>
                <p className="text-sm" style={{color: '#5b5450'}}>
                  <strong>Remember:</strong> All activities are consensual. You can pass on any card at any time. 
                  Respect boundaries and communicate openly with your partner(s).
                </p>
              </div>
            </div>
          </div>
          
          <button className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{backgroundColor: '#bb3309'}}>
            Continue to Game
          </button>
        </div>
      </div>
    </div>
  )
}