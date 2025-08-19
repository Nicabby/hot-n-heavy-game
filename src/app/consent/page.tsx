export default function Consent() {
  return (
    <div className="viewport-container" style={{backgroundColor: '#f6f3e2'}}>
      <div className="content-wrapper">
        <h1 className="text-xl md:text-2xl font-bold font-sans text-center mb-4" style={{color: '#bb3309'}}>Consent & Disclaimer</h1>
        
        <div className="w-full bg-white rounded-xl p-4 md:p-5 border-2 shadow-lg" style={{borderColor: '#bb3309'}}>
          <div className="space-y-4">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
              <h3 className="text-base font-bold mb-2 text-red-700">🔞 Adults Only (18+)</h3>
              <p className="text-sm text-red-700">
                This game contains adult content and is intended only for consenting adults aged 18 and over. 
                By continuing, you confirm that all participants are 18+ years of age.
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
              <h3 className="text-base font-bold mb-2 text-blue-700">✋ Consent & Safety</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• All participants must freely consent to play</p>
                <p>• Anyone can stop or pass at any time</p>
                <p>• Respect all boundaries and comfort levels</p>
                <p>• Communication is key - check in with each other</p>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
              <h3 className="text-base font-bold mb-2 text-green-700">🛡️ Your Agreement</h3>
              <p className="text-sm text-green-700">
                By starting this game, all participants acknowledge they are consenting adults who understand 
                the nature of this game and agree to participate responsibly.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/game'}
            className="w-full mt-4 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" 
            style={{backgroundColor: '#bb3309'}}
          >
            Start Game →
          </button>
        </div>
      </div>
    </div>
  )
}