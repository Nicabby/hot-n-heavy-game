'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TGOLBrandLogo from '@/components/TGOLBrandLogo'
import { useGame } from '@/context/GameContext'

function formatDuration(startMs: number | null, endMs: number | null): string {
  if (!startMs) return '—'
  const ms = (endMs ?? Date.now()) - startMs
  const mins = Math.floor(ms / 60000)
  const secs = Math.floor((ms % 60000) / 1000)
  if (mins === 0) return `${secs}s`
  return `${mins}m ${secs}s`
}

function getLevelName(level: number): string {
  const names: Record<number, string> = { 1: 'Mild (L1)', 2: 'Warm (L2)', 3: 'Spicy (L3)', 4: 'Hot (L4)', 5: 'Extra Hot (L5)' }
  return names[level] ?? `L${level}`
}

interface Achievement { id: string; name: string; description: string; emoji: string; bg: string; border: string }

function computeAchievements(total: number, maxLevel: number, skipped: number, playerCount: number): Achievement[] {
  const list: Achievement[] = []
  list.push({ id: 'first-timer', name: 'First Timer', description: 'Completed your first TGOL session', emoji: '⭐', bg: '#fef9c3', border: '#fde047' })
  if (total >= 18) list.push({ id: 'card-master', name: 'Card Master', description: `Drew ${total} cards`, emoji: '🎲', bg: '#ede9fe', border: '#a78bfa' })
  if (maxLevel >= 3) list.push({ id: 'heat-seeker', name: 'Heat Seeker', description: `Reached ${getLevelName(maxLevel)}`, emoji: '🔥', bg: '#fee2e2', border: '#fca5a5' })
  if (maxLevel >= 4) list.push({ id: 'extra-hot', name: 'Extra Hot Explorer', description: 'Reached the Extra Hot zone', emoji: '🌶️', bg: '#ffedd5', border: '#fb923c' })
  if (skipped === 0 && total >= 5) list.push({ id: 'no-skip', name: 'All In', description: 'Completed every card without a skip', emoji: '💪', bg: '#dcfce7', border: '#86efac' })
  if (playerCount >= 4) list.push({ id: 'crowd', name: 'Crowd Pleaser', description: 'Played with 4 or more players', emoji: '🎉', bg: '#fae8ff', border: '#e879f9' })
  return list
}

export default function Results() {
  const router = useRouter()
  const { gameStats, players, resetGame } = useGame()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { totalCardsDrawn, cardsSkipped, maxLevelReached, startTime, endTime } = gameStats
  const achievements = computeAchievements(totalCardsDrawn, maxLevelReached, cardsSkipped, players.length)
  const timePlayed = formatDuration(startTime, endTime)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F3E2' }}>
      <header className="w-full py-6"><TGOLBrandLogo /></header>

      <main className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">

          <div className="mb-12">
            <h1 className="text-5xl font-futura-bold tracking-wide mb-4" style={{ color: '#B9340B' }}>GAME COMPLETE!</h1>
            <p className="text-2xl" style={{ color: '#498379', fontFamily: 'Avenir, Avenir Next, Nunito, sans-serif' }}>Hope you had a spicy time! 🔥</p>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-4" style={{ borderColor: '#B9340B' }}>
            <h2 className="text-2xl font-futura-bold mb-6" style={{ color: '#B9340B' }}>Session Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { emoji: '⏰', value: timePlayed, label: 'Time Played', color: '#B9340B' },
                { emoji: '🎲', value: String(totalCardsDrawn), label: 'Cards Drawn', color: '#498379' },
                { emoji: '🔥', value: getLevelName(maxLevelReached), label: 'Max Heat', color: '#B9340B' },
                { emoji: '⏭️', value: String(cardsSkipped), label: 'Cards Skipped', color: '#555' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl p-4" style={{ backgroundColor: '#FCF9E8' }}>
                  <div className="text-3xl mb-2">{stat.emoji}</div>
                  <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: '#888', fontFamily: 'Avenir, Avenir Next, Nunito, sans-serif' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-4" style={{ borderColor: '#498379' }}>
              <h2 className="text-2xl font-futura-bold mb-6" style={{ color: '#498379' }}>Achievements Unlocked! 🏆</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map(a => (
                  <div key={a.id} className="rounded-xl p-4 border" style={{ backgroundColor: a.bg, borderColor: a.border }}>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{a.emoji}</span>
                      <div className="text-left">
                        <h3 className="font-bold" style={{ color: '#333', fontFamily: 'Avenir, Avenir Next, Nunito, sans-serif' }}>{a.name}</h3>
                        <p className="text-sm" style={{ color: '#666', fontFamily: 'Avenir, Avenir Next, Nunito, sans-serif' }}>{a.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-4" style={{ borderColor: '#B9340B' }}>
            <h2 className="text-2xl font-futura-bold mb-6" style={{ color: '#B9340B' }}>How was your experience? 💕</h2>
            {!submitted ? (
              <div className="space-y-6">
                <div>
                  <p className="mb-4" style={{ color: '#555', fontFamily: 'Avenir, Avenir Next, Nunito, sans-serif' }}>Rate your session:</p>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} onClick={() => setRating(star)}
                        className="text-4xl transition-all hover:scale-110"
                        style={{ color: star <= rating ? '#f59e0b' : '#d1d5db' }}>⭐</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-left" style={{ color: '#555', fontFamily: 'Avenir, Avenir Next, Nunito, sans-serif' }}>
                    Any feedback or suggestions?
                  </p>
                  <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tgol-red focus:outline-none resize-none"
                    style={{ fontFamily: 'Avenir, Avenir Next, Nunito, sans-serif', backgroundColor: '#FCF9E8' }}
                    placeholder="Tell us what you loved or how we can improve..." />
                </div>
                <button onClick={() => setSubmitted(true)} disabled={rating === 0}
                  className="py-3 px-8 rounded-full font-semibold transition-colors disabled:cursor-not-allowed"
                  style={{ backgroundColor: rating > 0 ? '#B9340B' : '#cccccc', color: '#fff', fontFamily: 'Futura, sans-serif' }}>
                  Submit Feedback
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#B9340B', fontFamily: 'Futura, sans-serif' }}>Thank You!</h3>
                <p style={{ color: '#666', fontFamily: 'Avenir, Avenir Next, Nunito, sans-serif' }}>Your feedback helps us make TGOL even better</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-4 pb-12">
            <button onClick={() => { resetGame(); router.push('/lobby') }}
              className="block w-full py-4 px-8 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#B9340B', color: '#fff', fontFamily: 'Futura, sans-serif' }}>
              Play Again 🎲
            </button>
            <button onClick={() => router.push('/store')}
              className="block w-full py-4 px-8 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#498379', color: '#fff', fontFamily: 'Futura, sans-serif' }}>
              Get Physical Cards 🛍️
            </button>
            <button onClick={() => router.push('/')}
              className="block py-2 w-full hover:opacity-70 transition-opacity"
              style={{ color: '#888', fontFamily: 'Avenir, Avenir Next, Nunito, sans-serif' }}>
              Back to Home
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}
