'use client';

import Link from 'next/link';
import { useState } from 'react';
import TGOLBrandLogo from '@/components/TGOLBrandLogo';

export default function Home() {
  const [showAgeVerification, setShowAgeVerification] = useState(true);

  if (showAgeVerification) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F7F3E2' }}>
        <header className="w-full py-6">
          <TGOLBrandLogo />
        </header>
        
        <main className="flex items-start justify-center pt-6">
          <div className="bg-white/95 rounded-3xl shadow-2xl p-10 max-w-lg w-full mx-4 border-4 border-tgol-red">
            <div className="text-center">
              <h1 className="text-2xl font-futura-bold text-tgol-red mb-4">
                ADULT CONTENT VERIFICATION
              </h1>
              <div className="space-y-6">
                <div className="bg-tgol-cream p-4 rounded-xl">
                  <p className="text-tgol-darkGrey font-futura text-lg font-semibold mb-2">
                    Are you 18 years of age or older?
                  </p>
                  <p className="text-sm text-tgol-darkGrey/80">
                    This game contains adult content intended for mature audiences only.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowAgeVerification(false)}
                    className="bg-tgol-red text-white py-4 px-6 font-futura-bold text-lg tracking-wide hover:bg-tgol-red/90 transition-colors"
                    style={{ fontFamily: 'Futura Std Bold Condensed, Arial Black, sans-serif' }}
                  >
                    YES, I&apos;M 18+
                  </button>
                  <button
                    onClick={() => { window.location.href = 'https://google.com'; }}
                    className="bg-gray-300 text-tgol-darkGrey py-4 px-6 font-futura-bold text-lg tracking-wide hover:bg-gray-400 transition-colors"
                    style={{ fontFamily: 'Futura Std Bold Condensed, Arial Black, sans-serif' }}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        background: 'linear-gradient(135deg, #F7F3E2 0%, #FCF9E8 50%, #F7F3E2 100%)' 
      }}
    >
      <header className="w-full py-6">
        <TGOLBrandLogo />
      </header>
      
      <main className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p 
            className="text-3xl font-futura-medium tracking-wide mb-12"
            style={{ color: '#498379' }}
          >
            Get the action started with our digital games -<br />
            made for couples in or exploring the swinger lifestyle.
          </p>
          <div className="max-w-3xl mx-auto mb-12">
            <p 
              className="text-xl leading-relaxed font-futura"
              style={{ color: '#555555' }}
            >
              Click PLAY to begin, or SHOP to buy games.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mb-16 items-stretch">
          <Link href="/lobby" className="block h-full">
            <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-tgol-red cursor-pointer transition-all hover:bg-tgol-red hover:bg-opacity-20 hover:text-white h-full">
              <div className="text-center">
                <h2 
                  className="text-3xl font-futura-bold tracking-wide mb-4 transition-colors"
                  style={{ color: '#B9340B' }}
                >
                  PLAY
                </h2>
                <p 
                  className="text-lg font-futura transition-colors"
                  style={{ color: '#555555' }}
                >
                  Tap in, turn up the heat, and let the game take over.
                </p>
              </div>
            </div>
          </Link>

          <a href="https://gameoflifestyle.com" target="_blank" rel="noopener noreferrer" className="block h-full">
            <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-tgol-green cursor-pointer transition-all hover:bg-tgol-green hover:bg-opacity-20 hover:text-white h-full">
              <div className="text-center">
                <h2 
                  className="text-3xl font-futura-bold tracking-wide mb-4 transition-colors"
                  style={{ color: '#498379' }}
                >
                  SHOP
                </h2>
                <p 
                  className="text-lg font-futura transition-colors"
                  style={{ color: '#555555' }}
                >
                  Bring the heat offline — our decks are made to be held, shared, and explored. Because some things are better in your hands.
                </p>
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}