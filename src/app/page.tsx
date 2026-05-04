'use client';

import Link from 'next/link';
import { useState } from 'react';
import TGOLBrandLogo from '@/components/TGOLBrandLogo';

const WEBSITE_URL = 'https://gameoflifestyle.com';
const AVENIR = 'Avenir, Avenir Next, Nunito, sans-serif';
const FUTURA = 'Futura Std Bold Condensed, Futura, Jost, Arial Black, sans-serif';

interface PremiumDeck {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  badgeColor: string;
  borderColor: string;
  digitalAvailable: boolean;
  storeUrl: string;
  digitalUrl: string;
}

const PREMIUM_DECKS: PremiumDeck[] = [
  {
    id: 'extra-hot',
    emoji: '🌶️',
    name: 'Extra Hot',
    tagline: "Turn the heat all the way up",
    description: "Two volumes of the spiciest cards in the game — oral, intercourse, bi play, and more. For when Hot 'n Heavy isn't enough.",
    badgeColor: '#1a2d52',
    borderColor: '#274070',   // DARK CORNFLOWER BLUE — Extra Hot brand colour
    digitalAvailable: true,
    storeUrl: `${WEBSITE_URL}/store`,
    digitalUrl: `${WEBSITE_URL}/unlock`,
  },
  {
    id: 'threesome',
    emoji: '🔱',
    name: 'Threesome',
    tagline: "Three's company",
    description: 'Cards designed specifically for three players. Intimate, adventurous, and perfectly balanced for a trio.',
    badgeColor: '#a85218',
    borderColor: '#DE6F20',   // COCOA ORANGE — Threesome brand colour
    digitalAvailable: false,
    storeUrl: `${WEBSITE_URL}/store`,
    digitalUrl: `${WEBSITE_URL}/unlock`,
  },
  {
    id: 'wet-n-wild',
    emoji: '💦',
    name: "Wet 'n Wild",
    tagline: 'Make a splash',
    description: 'Water-themed cards for the hot tub, pool, or shower. A whole new element to your play.',
    badgeColor: '#022d56',
    borderColor: '#034078',   // INDIGO DYE — Wet 'n Wild brand colour
    digitalAvailable: false,
    storeUrl: `${WEBSITE_URL}/store`,
    digitalUrl: `${WEBSITE_URL}/unlock`,
  },
];

export default function Home() {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [unlockTarget, setUnlockTarget] = useState<PremiumDeck | null>(null);

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
                  <p className="text-lg font-semibold mb-2" style={{ color: '#555555', fontFamily: AVENIR }}>
                    Are you 18 years of age or older?
                  </p>
                  <p className="text-sm" style={{ color: '#777', fontFamily: AVENIR }}>
                    This game contains adult content intended for mature audiences only.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowAgeVerification(false)}
                    className="bg-tgol-red text-white py-4 px-6 text-lg tracking-wide hover:opacity-90 transition-opacity rounded-xl"
                    style={{ fontFamily: FUTURA }}>
                    YES, I&apos;M 18+
                  </button>
                  <button
                    onClick={() => { window.location.href = 'https://google.com'; }}
                    className="bg-gray-300 py-4 px-6 text-lg tracking-wide hover:bg-gray-400 transition-colors rounded-xl"
                    style={{ color: '#555555', fontFamily: FUTURA }}>
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
      style={{ background: 'linear-gradient(135deg, #F7F3E2 0%, #FCF9E8 50%, #F7F3E2 100%)' }}
    >
      <header className="w-full py-6">
        <TGOLBrandLogo />
      </header>

      <main className="container mx-auto px-6 pb-16">

        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-3xl font-futura-medium tracking-wide mb-6" style={{ color: '#498379' }}>
            Get the action started with our digital games —<br />
            made for couples in or exploring the swinger lifestyle.
          </p>
          <p className="text-xl" style={{ color: '#555555', fontFamily: AVENIR }}>
            Choose a game below, or shop to bring the heat home.
          </p>
        </div>

        {/* Core game CTAs */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-6 items-stretch">
          <Link href="/lobby" className="block h-full">
            <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-tgol-red cursor-pointer hover:shadow-xl transition-shadow h-full">
              <div className="text-center">
                <div className="text-5xl mb-4">🎲</div>
                <h2 className="text-3xl font-futura-bold tracking-wide mb-3" style={{ color: '#B9340B' }}>
                  PLAY
                </h2>
                <p className="text-base mb-4" style={{ color: '#555555', fontFamily: AVENIR }}>
                  Tap in, turn up the heat, and let the game take over.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ backgroundColor: '#E8F5F3', color: '#498379', border: '1px solid #498379', fontFamily: AVENIR }}>
                    ✓ IceBreaker
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ backgroundColor: '#FDE8E2', color: '#B9340B', border: '1px solid #B9340B', fontFamily: AVENIR }}>
                    ✓ Hot &apos;n Heavy
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="block h-full">
            <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-tgol-green cursor-pointer hover:shadow-xl transition-shadow h-full">
              <div className="text-center">
                <div className="text-5xl mb-4">🛍️</div>
                <h2 className="text-3xl font-futura-bold tracking-wide mb-3" style={{ color: '#498379' }}>
                  SHOP
                </h2>
                <p className="text-base" style={{ color: '#555555', fontFamily: AVENIR }}>
                  Bring the heat offline — our physical decks are made to be held, shared, and explored.
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Included note */}
        <p className="text-center text-sm mb-14" style={{ color: '#888', fontFamily: AVENIR }}>
          The digital game includes <strong>IceBreaker</strong> and <strong>Hot &apos;n Heavy</strong> — free to play.
        </p>

        {/* Premium Expansions */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-futura-bold tracking-wide mb-2" style={{ color: '#B9340B' }}>
              🔥 PREMIUM EXPANSIONS
            </h2>
            <p style={{ color: '#555555', fontFamily: AVENIR }}>
              Ready to go further? Unlock additional decks — physically or digitally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PREMIUM_DECKS.map(deck => (
              <div key={deck.id} className="bg-white rounded-2xl shadow-xl overflow-hidden"
                style={{ border: `3px solid ${deck.borderColor}` }}>
                {/* Header */}
                <div className="p-5 text-center text-white"
                  style={{ background: `linear-gradient(135deg, ${deck.badgeColor}, ${deck.borderColor})` }}>
                  <div className="text-4xl mb-2">{deck.emoji}</div>
                  <h3 className="text-xl font-bold tracking-wide" style={{ fontFamily: FUTURA }}>
                    {deck.name}
                  </h3>
                  <p className="text-sm opacity-90 mt-1" style={{ fontFamily: AVENIR }}>
                    {deck.tagline}
                  </p>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: '#555555', fontFamily: AVENIR }}>
                    {deck.description}
                  </p>

                  <div className="space-y-2">
                    <a href={deck.storeUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                      style={{ backgroundColor: deck.borderColor, color: '#fff', fontFamily: FUTURA }}>
                      🛍️ Buy Physical Cards
                    </a>

                    {deck.digitalAvailable ? (
                      <a href={deck.digitalUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 border-2"
                        style={{ borderColor: deck.borderColor, color: deck.borderColor, fontFamily: FUTURA, backgroundColor: 'transparent' }}>
                        🔓 Unlock Digital Version
                      </a>
                    ) : (
                      <button
                        onClick={() => setUnlockTarget(deck)}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm border-2 hover:opacity-80 transition-opacity"
                        style={{ borderColor: '#d1d5db', color: '#888', fontFamily: FUTURA, backgroundColor: 'transparent' }}>
                        🔒 Digital — Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Coming Soon Modal */}
      {unlockTarget && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setUnlockTarget(null)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full border-4"
            style={{ borderColor: unlockTarget.borderColor }}
            onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-5xl mb-3">{unlockTarget.emoji}</div>
              <h3 className="text-2xl font-futura-bold mb-2" style={{ color: unlockTarget.borderColor }}>
                {unlockTarget.name} — Coming Soon!
              </h3>
              <p className="mb-6 text-sm leading-relaxed" style={{ color: '#555', fontFamily: AVENIR }}>
                The digital version of <strong>{unlockTarget.name}</strong> is coming soon.
                In the meantime, grab the physical deck at our store!
              </p>
              <a href={unlockTarget.storeUrl} target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl font-semibold text-white mb-3 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: unlockTarget.borderColor, fontFamily: FUTURA }}>
                🛍️ Shop Physical Cards
              </a>
              <button onClick={() => setUnlockTarget(null)}
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: '#888', fontFamily: AVENIR }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
