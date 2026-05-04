'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import TGOLBrandLogo from '@/components/TGOLBrandLogo'
import decksData from '@/data/decks.json'
import avatarsData from '@/data/avatars.json'
import { useGame } from '@/context/GameContext'

const WEBSITE_URL = 'https://gameoflifestyle.com'

interface Card {
  id: string
  text: string
  tags: string[]
  level: string
  gender: string
  repeatable: boolean
}

interface GameState {
  currentLevel: number
  minLevel: number
  cardsInRound: number
  usedCardIds: string[]
}

const CHECK_IN_INTERVAL = 6

function getModeName(level: number) {
  if (level <= 2) return 'Icebreaker'
  if (level === 3) return "Hot 'N Heavy"
  return 'Extra Hot'
}

function getLevelLabel(level: number) {
  const labels: Record<number, string> = { 1: 'L1 · Mild', 2: 'L2 · Warm', 3: 'L3 · Spicy', 4: 'L4 · Hot', 5: 'L5 · Extra Hot' }
  return labels[level] ?? `L${level}`
}

function getCardPool(level: number): Card[] {
  if (level <= 2) return [...decksData.icebreaker] as Card[]
  if (level === 3) return [...decksData.hotAndHeavy.L1, ...decksData.hotAndHeavy.L2, ...decksData.hotAndHeavy.L3] as Card[]
  if (level === 4) return [...(decksData.extraHot.L4 ?? [])] as Card[]
  return [...(decksData.extraHot.L5 ?? [])] as Card[]
}

function headerStyle(level: number) {
  if (level <= 2) return { background: 'linear-gradient(to right, #498379, #6aada3)' }
  if (level === 3) return { background: 'linear-gradient(to right, #B9340B, #e05a2b)' }
  return { background: 'linear-gradient(to right, #7b0000, #B9340B)' }
}

function modeEmoji(level: number) {
  if (level <= 2) return '🧊'
  if (level === 3) return '🔥'
  return '🌶️'
}

function getAvatarImage(avatarId: string) {
  return avatarsData.find(a => a.id === avatarId)?.image || null
}

function PlayerAvatar({ avatarId, name, size, borderColor }: {
  avatarId: string; name: string; size: number; borderColor: string
}) {
  const img = getAvatarImage(avatarId)
  if (img) {
    return (
      <Image src={img} alt={name} width={size} height={size}
        className="rounded-full object-cover"
        style={{ border: `3px solid ${borderColor}`, width: size, height: size, flexShrink: 0 }} />
    )
  }
  return (
    <div className="rounded-full flex items-center justify-center font-bold"
      style={{ width: size, height: size, border: `3px solid ${borderColor}`,
        backgroundColor: borderColor, color: '#fff', fontSize: size * 0.4, flexShrink: 0 }}>
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full border-4"
        style={{ borderColor: '#7b0000' }} onClick={e => e.stopPropagation()}>
        <div className="text-center">
          <div className="text-5xl mb-3">🌶️</div>
          <h3 className="text-2xl font-futura-bold mb-2" style={{ color: '#7b0000' }}>Extra Hot — Locked</h3>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: '#555', fontFamily: 'Montserrat, sans-serif' }}>
            L4 and L5 are part of the <strong>Extra Hot expansion pack</strong>.
            Unlock the digital version or grab the physical cards at our store.
          </p>
          <a href={`${WEBSITE_URL}/unlock`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white mb-3 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#7b0000', fontFamily: 'Futura, sans-serif' }}>
            🔓 Unlock Digital Version
          </a>
          <a href={`${WEBSITE_URL}/store`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold mb-3 hover:opacity-90 transition-opacity border-2"
            style={{ borderColor: '#B9340B', color: '#B9340B', fontFamily: 'Futura, sans-serif', backgroundColor: 'transparent' }}>
            🛍️ Buy Physical Cards
          </a>
          <button onClick={onClose} className="text-sm hover:opacity-70 transition-opacity"
            style={{ color: '#888', fontFamily: 'Montserrat, sans-serif' }}>
            Stay at current level
          </button>
        </div>
      </div>
    </div>
  )
}

interface ExpansionOfferProps {
  onKeepPlaying: () => void
  onEndGame: () => void
}

function ExpansionOffer({ onKeepPlaying, onEndGame }: ExpansionOfferProps) {
  const expansions = [
    {
      volume: 'V1',
      name: "Hot 'n' Heavy Expansion V1",
      level: 'L4 · Hot',
      emoji: '🌶️',
      description: 'Oral, hand play, bi-curious fun, and group adventures. The first step beyond the free game.',
      color: '#B9340B',
      dark: '#7b0000',
    },
    {
      volume: 'V2',
      name: "Hot 'n' Heavy Expansion V2",
      level: 'L5 · Extra Hot',
      emoji: '💥',
      description: 'Full intercourse, deep group play, and the most adventurous cards in the entire game.',
      color: '#7b0000',
      dark: '#4a0000',
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(135deg, #F7F3E2 0%, #FCF9E8 50%, #F7F3E2 100%)' }}>
      <div className="max-w-lg w-full">

        {/* Achievement banner */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-futura-bold tracking-wide mb-3" style={{ color: '#B9340B' }}>
            DECK COMPLETE!
          </h2>
          <p className="text-lg" style={{ color: '#498379', fontFamily: 'Montserrat, sans-serif' }}>
            You&apos;ve played through every IceBreaker &amp; Hot &apos;n Heavy card.
            <br />
            <strong>Ready to turn up the heat even more?</strong>
          </p>
        </div>

        {/* Expansion cards */}
        <div className="space-y-4 mb-8">
          {expansions.map(exp => (
            <div key={exp.volume} className="bg-white rounded-2xl shadow-xl overflow-hidden"
              style={{ border: `3px solid ${exp.color}` }}>
              <div className="p-4 text-white flex items-center gap-3"
                style={{ background: `linear-gradient(to right, ${exp.dark}, ${exp.color})` }}>
                <span className="text-3xl">{exp.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg leading-tight" style={{ fontFamily: 'Futura, sans-serif' }}>
                    {exp.name}
                  </h3>
                  <span className="text-xs opacity-90" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {exp.level}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm mb-4" style={{ color: '#555', fontFamily: 'Montserrat, sans-serif' }}>
                  {exp.description}
                </p>
                <div className="flex gap-2">
                  <a href={`${WEBSITE_URL}/store`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold text-center hover:opacity-90 transition-opacity text-white"
                    style={{ backgroundColor: exp.color, fontFamily: 'Futura, sans-serif' }}>
                    🛍️ Physical Cards
                  </a>
                  <a href={`${WEBSITE_URL}/unlock`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold text-center hover:opacity-90 transition-opacity border-2"
                    style={{ borderColor: exp.color, color: exp.color, fontFamily: 'Futura, sans-serif' }}>
                    🔓 Unlock Digital
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary actions */}
        <div className="space-y-3 text-center">
          <button onClick={onKeepPlaying}
            className="block w-full py-4 px-8 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#498379', color: '#fff', fontFamily: 'Futura, sans-serif' }}>
            🔄 Keep Playing (Replay Free Deck)
          </button>
          <button onClick={onEndGame}
            className="block w-full py-3 hover:opacity-70 transition-opacity text-sm"
            style={{ color: '#888', fontFamily: 'Montserrat, sans-serif' }}>
            See results &amp; end game →
          </button>
        </div>

      </div>
    </div>
  )
}

export default function Game() {
  const router = useRouter()
  const { players, selectedCategories, globalSpiceLevel, currentPlayerIndex, setCurrentPlayerIndex, gameStats, updateGameStats } = useGame()

  const [gameState, setGameState] = useState<GameState>({ currentLevel: 1, minLevel: 1, cardsInRound: 0, usedCardIds: [] })
  const [currentCard, setCurrentCard] = useState<Card | null>(null)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showExpansionOffer, setShowExpansionOffer] = useState(false)

  useEffect(() => {
    if (players.length === 0) router.push('/lobby')
  }, [players, router])

  const currentPlayer = players[currentPlayerIndex % Math.max(players.length, 1)]

  const filterCards = useCallback((pool: Card[], usedCardIds: string[], level: number): Card[] => {
    const playerMax = currentPlayer ? Math.min(currentPlayer.spiceLevel, globalSpiceLevel) : globalSpiceLevel
    let filtered = pool.filter(c => !usedCardIds.includes(c.id))
    if (level > 2 && selectedCategories.length > 0) {
      filtered = filtered.filter(c => c.tags.some(t => selectedCategories.includes(t)))
    }
    filtered = filtered.filter(c => {
      const n = c.level === 'Icebreaker' ? 1 : parseInt(c.level.replace('L', '')) || 1
      return n <= playerMax
    })
    if (currentPlayer) {
      filtered = filtered.filter(c => c.gender === 'any' || c.gender === currentPlayer.gender)
    }
    return filtered
  }, [currentPlayer, globalSpiceLevel, selectedCategories])

  const pickCard = useCallback((level: number, usedCardIds: string[]): Card | null => {
    const pool = getCardPool(level)
    let filtered = filterCards(pool, usedCardIds, level)
    // Don't auto-cycle here — we detect exhaustion in drawNextCard
    if (filtered.length === 0) return null
    return filtered[Math.floor(Math.random() * filtered.length)]
  }, [filterCards])

  useEffect(() => {
    if (players.length === 0) return
    updateGameStats({ startTime: Date.now() })
    const pool = getCardPool(1)
    const filtered = filterCards(pool, [], 1)
    const card = filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : null
    if (card) {
      setCurrentCard(card)
      setGameState(prev => ({ ...prev, usedCardIds: [card.id], cardsInRound: 1 }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const advanceTurn = () => setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)

  const drawNextCard = (level: number, usedCardIds: string[], cardsInRound: number) => {
    const card = pickCard(level, usedCardIds)

    if (!card) {
      // No unplayed cards remain in this pool
      if (level <= 3) {
        // Free deck exhausted — offer the expansion
        setShowExpansionOffer(true)
      } else {
        // L4/L5 exhausted — just cycle (reset used for this level)
        const pool = getCardPool(level)
        const freshCard = filterCards(pool, [], level)
        if (freshCard.length > 0) {
          const next = freshCard[Math.floor(Math.random() * freshCard.length)]
          setCurrentCard(next)
          setGameState(prev => ({ ...prev, usedCardIds: [next.id], cardsInRound: 1 }))
          updateGameStats({ totalCardsDrawn: gameStats.totalCardsDrawn + 1, maxLevelReached: Math.max(gameStats.maxLevelReached, level) })
        }
      }
      return
    }

    const newUsed = [...usedCardIds, card.id]
    const newCount = cardsInRound + 1
    setCurrentCard(card)
    setGameState(prev => ({ ...prev, usedCardIds: newUsed, cardsInRound: newCount }))
    updateGameStats({ totalCardsDrawn: gameStats.totalCardsDrawn + 1, maxLevelReached: Math.max(gameStats.maxLevelReached, level) })
    if (newCount >= CHECK_IN_INTERVAL) setShowCheckIn(true)
  }

  const handleSkip = () => {
    updateGameStats({ cardsSkipped: gameStats.cardsSkipped + 1 })
    advanceTurn()
    drawNextCard(gameState.currentLevel, gameState.usedCardIds, gameState.cardsInRound)
  }

  const handleDone = () => {
    advanceTurn()
    if (gameState.cardsInRound >= CHECK_IN_INTERVAL) {
      setShowCheckIn(true)
    } else {
      drawNextCard(gameState.currentLevel, gameState.usedCardIds, gameState.cardsInRound)
    }
  }

  const handleCheckIn = (chosenLevel: number) => {
    if (chosenLevel >= 4) {
      setShowUpgradeModal(true)
      return
    }
    const newMin = chosenLevel >= 3 ? 3 : gameState.minLevel
    const newUsed = chosenLevel !== gameState.currentLevel ? [] : gameState.usedCardIds
    const newState = { currentLevel: chosenLevel, minLevel: newMin, cardsInRound: 0, usedCardIds: newUsed }
    setGameState(newState)
    setShowCheckIn(false)
    const pool = getCardPool(chosenLevel)
    const filtered = filterCards(pool, newUsed, chosenLevel)
    const card = filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : null
    if (card) {
      setCurrentCard(card)
      setGameState({ ...newState, usedCardIds: [...newUsed, card.id], cardsInRound: 1 })
      updateGameStats({ totalCardsDrawn: gameStats.totalCardsDrawn + 1, maxLevelReached: Math.max(gameStats.maxLevelReached, chosenLevel) })
    }
  }

  const handleEndGame = () => {
    updateGameStats({ endTime: Date.now() })
    router.push('/results')
  }

  // Replay the free deck from scratch
  const handleKeepPlaying = () => {
    setShowExpansionOffer(false)
    const newState = { currentLevel: gameState.currentLevel, minLevel: gameState.minLevel, cardsInRound: 0, usedCardIds: [] }
    setGameState(newState)
    const pool = getCardPool(gameState.currentLevel)
    const filtered = filterCards(pool, [], gameState.currentLevel)
    const card = filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : null
    if (card) {
      setCurrentCard(card)
      setGameState({ ...newState, usedCardIds: [card.id], cardsInRound: 1 })
      updateGameStats({ totalCardsDrawn: gameStats.totalCardsDrawn + 1 })
    }
  }

  // Expansion offer screen
  if (showExpansionOffer) {
    return <ExpansionOffer onKeepPlaying={handleKeepPlaying} onEndGame={handleEndGame} />
  }

  // Check-In Screen
  if (showCheckIn) {
    const allOptions = [
      { level: 1, label: 'L1 · Mild',      emoji: '🧊', desc: 'Icebreaker',   locked: false },
      { level: 2, label: 'L2 · Warm',      emoji: '😊', desc: 'Icebreaker',   locked: false },
      { level: 3, label: 'L3 · Spicy',     emoji: '🔥', desc: "Hot 'N Heavy", locked: false },
      { level: 4, label: 'L4 · Hot',       emoji: '🌶️', desc: 'Extra Hot',    locked: true  },
      { level: 5, label: 'L5 · Extra Hot', emoji: '💥', desc: 'Extra Hot',    locked: true  },
    ]
    const options = allOptions.filter(o => o.level >= gameState.minLevel)

    return (
      <>
        <div className="min-h-screen flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #F7F3E2 0%, #FCF9E8 50%, #F7F3E2 100%)' }}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 border-4" style={{ borderColor: '#B9340B' }}>
            <div className="text-center">
              <div className="text-6xl mb-4">🔥</div>
              <h2 className="text-3xl font-futura-bold mb-2" style={{ color: '#B9340B' }}>Heat Check-In</h2>
              <p className="mb-6 text-sm" style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}>
                You&apos;ve played {CHECK_IN_INTERVAL} cards — how hot do you want to go?
              </p>
              <div className="space-y-3">
                {options.map(opt => (
                  <button key={opt.level} onClick={() => handleCheckIn(opt.level)}
                    className="w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between hover:opacity-90"
                    style={{
                      borderColor: opt.locked ? '#e5e7eb' : (opt.level === gameState.currentLevel ? '#B9340B' : '#d1d5db'),
                      backgroundColor: opt.locked ? '#f9fafb' : (opt.level === gameState.currentLevel ? '#FDE8E2' : '#FCF9E8'),
                      opacity: opt.locked ? 0.85 : 1,
                    }}>
                    <div>
                      <span className="font-semibold"
                        style={{ color: opt.locked ? '#aaa' : '#555555', fontFamily: 'Montserrat, sans-serif' }}>
                        {opt.desc}
                      </span>
                      <span className="ml-2 text-sm"
                        style={{ color: opt.locked ? '#bbb' : '#888', fontFamily: 'Montserrat, sans-serif' }}>
                        {opt.label}
                      </span>
                      {!opt.locked && opt.level === gameState.currentLevel && (
                        <span className="ml-2 text-xs font-medium" style={{ color: '#B9340B' }}> current</span>
                      )}
                      {opt.locked && (
                        <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: '#7b0000', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
                          Premium 🔒
                        </span>
                      )}
                    </div>
                    <span className="text-2xl" style={{ opacity: opt.locked ? 0.4 : 1 }}>{opt.emoji}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl" style={{ backgroundColor: '#FCF9E8', border: '1px solid #B9340B' }}>
                <p className="text-xs" style={{ color: '#B9340B', fontFamily: 'Montserrat, sans-serif' }}>
                  🌶️ <strong>Want L4 &amp; L5?</strong> Unlock the Extra Hot expansion at{' '}
                  <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer"
                    className="underline font-semibold hover:opacity-80">
                    gameoflifestyle.com
                  </a>
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button onClick={handleEndGame} className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: '#888', fontFamily: 'Montserrat, sans-serif' }}>
                  End game &amp; see results →
                </button>
              </div>
            </div>
          </div>
        </div>
        {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
      </>
    )
  }

  if (!currentCard || players.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3E2' }}>
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🎲</div>
          <p className="font-semibold" style={{ color: '#B9340B', fontFamily: 'Futura, sans-serif' }}>Drawing your card...</p>
        </div>
      </div>
    )
  }

  const { currentLevel, cardsInRound } = gameState
  const nextPlayer = players[(currentPlayerIndex + 1) % players.length]

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F7F3E2 0%, #FCF9E8 50%, #F7F3E2 100%)' }}>
      <header className="w-full py-4">
        <TGOLBrandLogo />
      </header>

      <main className="container mx-auto px-4 pb-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 max-w-2xl mx-auto">
          <button onClick={() => router.push('/consent')} className="hover:opacity-70 transition-opacity text-sm"
            style={{ color: '#B9340B', fontFamily: 'Montserrat, sans-serif' }}>← Back</button>
          <div className="text-sm font-semibold px-4 py-1 rounded-full"
            style={{ backgroundColor: '#fff', color: '#B9340B', fontFamily: 'Montserrat, sans-serif', border: '1px solid #B9340B' }}>
            {getModeName(currentLevel)} · {getLevelLabel(currentLevel)}
          </div>
          <button onClick={handleEndGame} className="text-sm hover:opacity-70 transition-opacity"
            style={{ color: '#888', fontFamily: 'Montserrat, sans-serif' }}>End</button>
        </div>

        {/* Current player banner */}
        <div className="max-w-2xl mx-auto mb-4">
          <div className="rounded-2xl p-4 flex items-center justify-between"
            style={{ backgroundColor: '#fff', border: '2px solid #498379' }}>
            <div className="flex items-center gap-4">
              <PlayerAvatar avatarId={currentPlayer?.avatar ?? ''} name={currentPlayer?.name ?? ''} size={80} borderColor="#B9340B" />
              <div>
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: '#888', fontFamily: 'Montserrat, sans-serif' }}>
                  Current Player
                </p>
                <p className="text-2xl font-bold leading-tight" style={{ color: '#B9340B', fontFamily: 'Futura, sans-serif' }}>
                  {currentPlayer?.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#888', fontFamily: 'Montserrat, sans-serif' }}>
                  Spice L{currentPlayer?.spiceLevel}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs uppercase tracking-widest" style={{ color: '#888', fontFamily: 'Montserrat, sans-serif' }}>Up next</p>
              <PlayerAvatar avatarId={nextPlayer?.avatar ?? ''} name={nextPlayer?.name ?? ''} size={48} borderColor="#498379" />
              <p className="text-sm font-medium" style={{ color: '#498379', fontFamily: 'Montserrat, sans-serif' }}>
                {nextPlayer?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Round progress bar */}
        <div className="max-w-2xl mx-auto mb-4 text-center">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: CHECK_IN_INTERVAL }).map((_, i) => (
              <div key={i} className="h-2 rounded-full flex-1"
                style={{ backgroundColor: i < cardsInRound ? '#B9340B' : '#d1d5db', maxWidth: '36px' }} />
            ))}
          </div>
          <p className="text-xs mt-1" style={{ color: '#888', fontFamily: 'Montserrat, sans-serif' }}>
            {cardsInRound}/{CHECK_IN_INTERVAL} cards · heat check-in at {CHECK_IN_INTERVAL}
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ border: '2px solid #B9340B' }}>
            <div className="text-white p-6 text-center" style={headerStyle(currentLevel)}>
              <div className="text-4xl mb-2">{modeEmoji(currentLevel)}</div>
              <h2 className="text-xl font-bold" style={{ fontFamily: 'Futura, sans-serif' }}>{getModeName(currentLevel)}</h2>
              <p className="text-sm opacity-80 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{getLevelLabel(currentLevel)}</p>
            </div>
            <div className="p-8">
              <p className="text-2xl leading-relaxed text-center mb-8"
                style={{ color: '#333', fontFamily: 'Montserrat, sans-serif' }}>
                {currentCard.text}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {currentCard.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm rounded-full border"
                    style={{ backgroundColor: '#FCF9E8', color: '#B9340B', borderColor: '#B9340B', fontFamily: 'Montserrat, sans-serif', opacity: 0.85 }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={handleSkip}
                  className="flex-1 py-4 px-6 rounded-2xl font-semibold transition-colors hover:opacity-80"
                  style={{ backgroundColor: '#e5e7eb', color: '#555', fontFamily: 'Futura, sans-serif' }}>
                  Skip Card
                </button>
                <button onClick={handleDone}
                  className="flex-1 py-4 px-6 rounded-2xl font-semibold transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#B9340B', color: '#fff', fontFamily: 'Futura, sans-serif' }}>
                  Done! Next Card
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-5 space-y-1 text-sm" style={{ color: '#888', fontFamily: 'Montserrat, sans-serif' }}>
            <p>💡 Anyone can skip any card — no explanation needed</p>
            <p>🔥 Heat check-in every {CHECK_IN_INTERVAL} cards to turn up the heat!</p>
          </div>
        </div>
      </main>

      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
    </div>
  )
}
