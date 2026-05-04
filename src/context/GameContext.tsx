'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

export interface Player {
  id: string
  name: string
  gender: 'male' | 'female' | 'other'
  avatar: string
  partner?: string
  spiceLevel: number
}

export interface GameStats {
  totalCardsDrawn: number
  cardsSkipped: number
  maxLevelReached: number
  startTime: number | null
  endTime: number | null
}

export interface GameContextType {
  // Player setup
  players: Player[]
  setPlayers: (players: Player[]) => void

  // Consent / preferences
  selectedCategories: string[]
  setSelectedCategories: (cats: string[]) => void
  globalSpiceLevel: number
  setGlobalSpiceLevel: (level: number) => void
  consentAgreed: boolean
  setConsentAgreed: (agreed: boolean) => void

  // Live game state
  currentPlayerIndex: number
  setCurrentPlayerIndex: (index: number) => void
  usedCardIds: string[]
  addUsedCardId: (id: string) => void
  currentLevel: number
  setCurrentLevel: (level: number) => void

  // End-of-game stats
  gameStats: GameStats
  updateGameStats: (update: Partial<GameStats>) => void

  // Helpers
  getCurrentPlayer: () => Player | null
  resetGame: () => void
}

// ── Defaults ────────────────────────────────────────────────────────────────

const defaultStats: GameStats = {
  totalCardsDrawn: 0,
  cardsSkipped: 0,
  maxLevelReached: 1,
  startTime: null,
  endTime: null,
}

// ── Context ─────────────────────────────────────────────────────────────────

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [globalSpiceLevel, setGlobalSpiceLevel] = useState(3)
  const [consentAgreed, setConsentAgreed] = useState(false)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [usedCardIds, setUsedCardIds] = useState<string[]>([])
  const [currentLevel, setCurrentLevel] = useState(1)
  const [gameStats, setGameStats] = useState<GameStats>(defaultStats)

  const addUsedCardId = (id: string) => {
    setUsedCardIds(prev => [...prev, id])
  }

  const updateGameStats = (update: Partial<GameStats>) => {
    setGameStats(prev => ({ ...prev, ...update }))
  }

  const getCurrentPlayer = (): Player | null => {
    if (players.length === 0) return null
    return players[currentPlayerIndex % players.length]
  }

  const resetGame = () => {
    setCurrentPlayerIndex(0)
    setUsedCardIds([])
    setCurrentLevel(1)
    setGameStats(defaultStats)
  }

  const value: GameContextType = {
    players,
    setPlayers,
    selectedCategories,
    setSelectedCategories,
    globalSpiceLevel,
    setGlobalSpiceLevel,
    consentAgreed,
    setConsentAgreed,
    currentPlayerIndex,
    setCurrentPlayerIndex,
    usedCardIds,
    addUsedCardId,
    currentLevel,
    setCurrentLevel,
    gameStats,
    updateGameStats,
    getCurrentPlayer,
    resetGame,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useGame(): GameContextType {
  const ctx = useContext(GameContext)
  if (!ctx) {
    throw new Error('useGame must be used inside a <GameProvider>')
  }
  return ctx
}
