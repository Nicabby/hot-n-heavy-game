'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import TGOLBrandLogo from '@/components/TGOLBrandLogo'
import categoriesData from '@/data/categories.json'
import { MUSIC_TRACKS } from '@/data/musicTracks'
import { useGame } from '@/context/GameContext'
import { AudioManager } from '@/utils/audioManager'

const AVENIR = 'Avenir, Avenir Next, Nunito, sans-serif'
const FUTURA = 'Futura Std Bold Condensed, Futura, Jost, Arial Black, sans-serif'

const LEVEL_DESCRIPTIONS: Record<number, string> = {
  1: 'Light teasing, kissing, gentle touches, and flirtatious conversation',
  2: 'Sensual massage, passionate kissing, light roleplay, and romantic scenarios',
  3: 'Intimate touching, blindfolding, temperature play, and moderate roleplay',
  4: 'Advanced roleplay, power dynamics, and more adventurous activities',
  5: 'All categories available — the spiciest level with no restrictions',
}

export default function Consent() {
  const router = useRouter()
  const {
    players,
    selectedCategories,
    setSelectedCategories,
    globalSpiceLevel,
    setGlobalSpiceLevel,
    consentAgreed,
    setConsentAgreed,
  } = useGame()

  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)
  const am = AudioManager.getInstance()

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    )
  }

  const handleTrackSelect = (trackId: string | null) => {
    setSelectedTrackId(trackId)
    if (trackId === null) {
      am.stopMusic()
    } else {
      const track = MUSIC_TRACKS.find(t => t.id === trackId)
      if (track) {
        am.startMusic(track.file, track.id)
      }
    }
  }

  const canProceed = consentAgreed && selectedCategories.length > 0

  if (players.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3E2' }}>
        <div className="text-center">
          <p className="text-xl mb-4" style={{ color: '#555555', fontFamily: AVENIR }}>
            No players found. Set up the game first.
          </p>
          <button onClick={() => router.push('/lobby')}
            className="text-white py-3 px-8 text-lg"
            style={{ backgroundColor: '#B9340B', fontFamily: FUTURA }}>
            GO TO LOBBY
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F3E2' }}>
      <header className="w-full py-6">
        <TGOLBrandLogo />
      </header>

      <main className="container mx-auto px-6">
        <div className="text-center mb-10">
          <button onClick={() => router.push('/lobby')}
            className="inline-flex items-center hover:opacity-70 transition-opacity mb-4"
            style={{ color: '#B9340B', fontSize: '12pt', fontFamily: AVENIR }}>
            ← BACK TO LOBBY
          </button>
          <h1 className="text-4xl font-futura-bold tracking-wide mb-3" style={{ color: '#B9340B' }}>
            CONSENT &amp; PREFERENCES
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#555555', fontFamily: AVENIR }}>
            Set your boundaries and preferences for a safe, fun experience.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border-2"
            style={{ borderColor: '#498379', backgroundColor: '#fff' }}>
            <span style={{ color: '#498379', fontFamily: AVENIR, fontSize: '14px', fontWeight: '600' }}>
              {players.length} player{players.length !== 1 ? 's' : ''} ready:
            </span>
            <span style={{ color: '#555555', fontFamily: AVENIR, fontSize: '14px' }}>
              {players.map(p => p.name).join(', ')}
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">

          {/* Consent Agreement */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-tgol-red">
            <h2 className="text-3xl font-futura-bold tracking-wide mb-8 text-center" style={{ color: '#B9340B' }}>
              CONSENT &amp; SAFETY FIRST
            </h2>
            <div className="space-y-6">
              <div className="p-8 rounded-xl border-2" style={{ backgroundColor: '#FCF9E8', borderColor: '#498379' }}>
                <h3 className="font-futura-bold text-2xl mb-6 text-center" style={{ color: '#B9340B' }}>
                  IMPORTANT GUIDELINES
                </h3>
                <ul className="space-y-3 text-lg" style={{ color: '#555555', fontFamily: AVENIR }}>
                  <li>• All participants must be 18+ years of age</li>
                  <li>• Everyone can skip any card without explanation</li>
                  <li>• Respect boundaries at all times</li>
                  <li>• Stop the game if anyone feels uncomfortable</li>
                  <li>• &ldquo;No&rdquo; means no — always</li>
                  <li>• This is for fun between consenting adults</li>
                </ul>
              </div>
              <div className="flex items-start space-x-4">
                <input type="checkbox" id="consent" checked={consentAgreed}
                  onChange={(e) => setConsentAgreed(e.target.checked)}
                  className="mt-2 h-6 w-6 rounded border-2 border-gray-300"
                  style={{ accentColor: '#B9340B' }} />
                <label htmlFor="consent" className="text-lg leading-relaxed cursor-pointer"
                  style={{ color: '#555555', fontFamily: AVENIR }}>
                  I agree that all participants are consenting adults (18+) and understand the guidelines above.
                  We commit to respecting boundaries and maintaining a safe, fun environment.
                </label>
              </div>
            </div>
          </div>

          {/* Group Spice Level */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-tgol-green">
            <h2 className="text-3xl font-futura-bold tracking-wide mb-6 text-center" style={{ color: '#498379' }}>
              🌶️ GROUP SPICE LEVEL
            </h2>
            <p className="text-lg mb-6" style={{ color: '#555555', fontFamily: AVENIR }}>
              Set the maximum spice level for this session. Individual player preferences are always respected — no one gets a card above their own limit.
            </p>
            <label className="block text-lg mb-3"
              style={{ color: '#555555', fontFamily: AVENIR, fontWeight: '600' }}>
              Maximum Level: L{globalSpiceLevel}
            </label>
            <input type="range" min="1" max="5" value={globalSpiceLevel}
              onChange={(e) => setGlobalSpiceLevel(parseInt(e.target.value))}
              className="w-full h-3 appearance-none cursor-pointer"
              style={{ background: 'linear-gradient(to right, #498379 0%, #B9340B 100%)', borderRadius: '6px' }} />
            <div className="flex justify-between text-sm mt-2"
              style={{ color: '#555555', fontFamily: AVENIR }}>
              <span>L1 · Mild</span><span>L2 · Warm</span><span>L3 · Spicy</span><span>L4 · Hot</span><span>L5 · Extra Hot</span>
            </div>
            <div className="mt-6 p-4 rounded-xl"
              style={{ backgroundColor: '#FCF9E8', borderLeft: '4px solid #498379' }}>
              <p className="text-lg" style={{ color: '#555555', fontFamily: AVENIR }}>
                <strong>Level {globalSpiceLevel} includes:</strong> {LEVEL_DESCRIPTIONS[globalSpiceLevel]}
              </p>
            </div>
          </div>

          {/* Category Preferences */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-tgol-red">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-futura-bold tracking-wide" style={{ color: '#B9340B' }}>
                💕 ACTIVITY CATEGORIES
              </h2>
              <div className="flex gap-3">
                <button onClick={() => setSelectedCategories([...categoriesData])}
                  className="text-sm px-3 py-1 rounded-full border-2 hover:opacity-80 transition-opacity"
                  style={{ borderColor: '#498379', color: '#498379', fontFamily: AVENIR }}>
                  Select All
                </button>
                <button onClick={() => setSelectedCategories([])}
                  className="text-sm px-3 py-1 rounded-full border-2 hover:opacity-80 transition-opacity"
                  style={{ borderColor: '#B9340B', color: '#B9340B', fontFamily: AVENIR }}>
                  Clear All
                </button>
              </div>
            </div>
            <p className="text-lg mb-6" style={{ color: '#555555', fontFamily: AVENIR }}>
              Select the types of activities you want included. Cards are filtered to match your choices.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {categoriesData.map((category) => (
                <button key={category} onClick={() => toggleCategory(category)}
                  className="p-4 rounded-xl border-2 transition-all text-left hover:opacity-90"
                  style={{
                    borderColor: selectedCategories.includes(category) ? '#B9340B' : '#d1d5db',
                    backgroundColor: selectedCategories.includes(category) ? '#FDE8E2' : '#FCF9E8',
                  }}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg"
                      style={{
                        color: selectedCategories.includes(category) ? '#B9340B' : '#555555',
                        fontFamily: AVENIR,
                      }}>
                      {category}
                    </span>
                    <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: selectedCategories.includes(category) ? '#B9340B' : 'transparent',
                        borderColor: selectedCategories.includes(category) ? '#B9340B' : '#d1d5db',
                      }}>
                      {selectedCategories.includes(category) && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <p className="mt-4 text-sm" style={{ color: '#498379', fontFamily: AVENIR }}>
                {selectedCategories.length} of {categoriesData.length} categories selected
              </p>
            )}
          </div>

          {/* Music Picker */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 border-4"
            style={{ borderColor: '#498379' }}>
            <h2 className="text-3xl font-futura-bold tracking-wide mb-3 text-center" style={{ color: '#498379' }}>
              🎵 CHOOSE YOUR VIBE
            </h2>
            <p className="text-lg mb-6 text-center" style={{ color: '#555555', fontFamily: AVENIR }}>
              Pick a soundtrack for the game — or keep it quiet.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

              {/* No Music option */}
              <button
                onClick={() => handleTrackSelect(null)}
                className="p-4 rounded-xl border-2 transition-all hover:opacity-90 text-center"
                style={{
                  borderColor: selectedTrackId === null ? '#498379' : '#d1d5db',
                  backgroundColor: selectedTrackId === null ? '#E8F5F3' : '#FCF9E8',
                }}>
                <div className="text-3xl mb-2">🔇</div>
                <div className="font-semibold" style={{
                  color: selectedTrackId === null ? '#498379' : '#555555',
                  fontFamily: FUTURA,
                  fontSize: '14px',
                }}>
                  No Music
                </div>
              </button>

              {/* Track buttons */}
              {MUSIC_TRACKS.map(track => (
                <button
                  key={track.id}
                  onClick={() => handleTrackSelect(track.id)}
                  className="p-4 rounded-xl border-2 transition-all hover:opacity-90 text-center"
                  style={{
                    borderColor: selectedTrackId === track.id ? '#B9340B' : '#d1d5db',
                    backgroundColor: selectedTrackId === track.id ? '#FDE8E2' : '#FCF9E8',
                  }}>
                  <div className="text-3xl mb-2">
                    {selectedTrackId === track.id ? '▶️' : '🎶'}
                  </div>
                  <div className="font-semibold" style={{
                    color: selectedTrackId === track.id ? '#B9340B' : '#555555',
                    fontFamily: FUTURA,
                    fontSize: '14px',
                  }}>
                    {track.name}
                  </div>
                </button>
              ))}
            </div>
            {selectedTrackId && (
              <p className="mt-4 text-center text-sm" style={{ color: '#B9340B', fontFamily: AVENIR }}>
                ♪ Now playing — music will continue throughout the game. Use the 🎵 button to mute at any time.
              </p>
            )}
          </div>

          {/* Continue Button */}
          <div className="text-center pb-10">
            <button
              onClick={() => canProceed && router.push('/game')}
              disabled={!canProceed}
              className="px-12 py-5 text-xl tracking-wide transition-all disabled:cursor-not-allowed"
              style={{
                fontFamily: FUTURA,
                backgroundColor: canProceed ? '#B9340B' : '#cccccc',
                color: '#fff',
                borderRadius: '9999px',
              }}>
              {!consentAgreed
                ? 'Please agree to the guidelines above'
                : selectedCategories.length === 0
                ? 'Select at least one category'
                : 'START THE GAME 🎲'}
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}
