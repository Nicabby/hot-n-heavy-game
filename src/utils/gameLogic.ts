import decksData from '@/data/decks.json'

export interface Player {
  id: string
  name: string
  gender: 'male' | 'female' | 'other'
  avatar: string
  partner?: string
  spiceLevel: number
}

export interface Card {
  id: string
  text: string
  tags: string[]
  level: string
  gender: string
  repeatable: boolean
}

export interface GameState {
  players: Player[]
  currentPlayerIndex: number
  usedCards: string[]
  gameMode: 'icebreaker' | 'hotAndHeavy' | 'extraHot'
  currentLevel: string
  cardsInLevel: number
  globalSpiceLevel: number
  selectedCategories: string[]
  flame: number
}

export class GameLogic {
  private gameState: GameState

  constructor(players: Player[], selectedCategories: string[], globalSpiceLevel: number) {
    this.gameState = {
      players,
      currentPlayerIndex: 0,
      usedCards: [],
      gameMode: 'icebreaker',
      currentLevel: 'Icebreaker',
      cardsInLevel: 0,
      globalSpiceLevel,
      selectedCategories,
      flame: 1
    }
  }

  getCurrentPlayer(): Player {
    return this.gameState.players[this.gameState.currentPlayerIndex]
  }

  getAvailableCards(): Card[] {
    let allCards: Card[] = []

    // Get cards based on current game mode
    if (this.gameState.gameMode === 'icebreaker') {
      allCards = [...decksData.icebreaker]
    } else if (this.gameState.gameMode === 'hotAndHeavy') {
      const level = this.gameState.currentLevel as keyof typeof decksData.hotAndHeavy
      allCards = [...(decksData.hotAndHeavy[level] || [])]
    } else if (this.gameState.gameMode === 'extraHot') {
      const level = this.gameState.currentLevel as keyof typeof decksData.extraHot  
      allCards = [...(decksData.extraHot[level] || [])]
    }

    // Filter by used cards
    const unusedCards = allCards.filter(card => !this.gameState.usedCards.includes(card.id))

    // Filter by selected categories
    const categoryFilteredCards = unusedCards.filter(card => 
      card.tags.some(tag => this.gameState.selectedCategories.includes(tag))
    )

    // Filter by current player's preferences
    const currentPlayer = this.getCurrentPlayer()
    const playerFilteredCards = categoryFilteredCards.filter(card => {
      // Check spice level
      const cardLevel = this.extractLevelNumber(card.level)
      const playerMaxLevel = Math.min(currentPlayer.spiceLevel, this.gameState.globalSpiceLevel)
      
      if (cardLevel > playerMaxLevel) {
        return false
      }

      // Check gender appropriateness (if specified)
      if (card.gender !== 'any' && card.gender !== currentPlayer.gender) {
        return false
      }

      return true
    })

    return playerFilteredCards
  }

  private extractLevelNumber(level: string): number {
    if (level === 'Icebreaker') return 0
    const match = level.match(/L(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  drawCard(): Card | null {
    const availableCards = this.getAvailableCards()
    
    if (availableCards.length === 0) {
      return null
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length)
    const drawnCard = availableCards[randomIndex]

    // Mark card as used
    this.gameState.usedCards.push(drawnCard.id)
    this.gameState.cardsInLevel++

    return drawnCard
  }

  skipCard(cardId: string): void {
    // Card is already marked as used, just advance
    this.nextPlayer()
  }

  completeCard(cardId: string): void {
    // Card completed successfully
    this.nextPlayer()
  }

  private nextPlayer(): void {
    this.gameState.currentPlayerIndex = 
      (this.gameState.currentPlayerIndex + 1) % this.gameState.players.length
  }

  shouldShowCheckIn(): boolean {
    return this.gameState.cardsInLevel >= 18
  }

  handleCheckIn(newFlameLevel: number): void {
    this.gameState.flame = newFlameLevel
    this.gameState.cardsInLevel = 0
    this.gameState.usedCards = [] // Reset used cards for new level

    // Advance game mode/level based on flame level
    if (this.gameState.gameMode === 'icebreaker') {
      this.gameState.gameMode = 'hotAndHeavy'
      this.gameState.currentLevel = 'L1'
    } else if (this.gameState.gameMode === 'hotAndHeavy') {
      if (newFlameLevel >= 4) {
        this.gameState.gameMode = 'extraHot'
        this.gameState.currentLevel = 'L4'
      } else {
        // Stay in hotAndHeavy but advance level
        const currentLevelNum = this.extractLevelNumber(this.gameState.currentLevel)
        const nextLevel = Math.min(currentLevelNum + 1, 3)
        this.gameState.currentLevel = `L${nextLevel}`
      }
    } else if (this.gameState.gameMode === 'extraHot') {
      // Advance to next extra hot level
      const currentLevelNum = this.extractLevelNumber(this.gameState.currentLevel)
      const nextLevel = Math.min(currentLevelNum + 1, 5)
      this.gameState.currentLevel = `L${nextLevel}`
    }
  }

  getGameStats() {
    return {
      totalCardsDrawn: this.gameState.usedCards.length,
      currentMode: this.gameState.gameMode,
      currentLevel: this.gameState.currentLevel,
      flameLevel: this.gameState.flame,
      playersCount: this.gameState.players.length
    }
  }

  getGameState(): GameState {
    return { ...this.gameState }
  }

  // Partner logic for cards that involve partners
  getPartnerForPlayer(playerId: string): Player | null {
    const player = this.gameState.players.find(p => p.id === playerId)
    if (!player || !player.partner) {
      return null
    }
    
    return this.gameState.players.find(p => p.id === player.partner) || null
  }

  // Get random other player for group activities
  getRandomOtherPlayer(excludePlayerId: string): Player | null {
    const otherPlayers = this.gameState.players.filter(p => p.id !== excludePlayerId)
    if (otherPlayers.length === 0) {
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * otherPlayers.length)
    return otherPlayers[randomIndex]
  }

  // Check if game can continue
  canContinueGame(): boolean {
    const availableCards = this.getAvailableCards()
    return availableCards.length > 0 || this.canAdvanceLevel()
  }

  private canAdvanceLevel(): boolean {
    if (this.gameState.gameMode === 'icebreaker') {
      return true // Can always advance to hotAndHeavy
    } else if (this.gameState.gameMode === 'hotAndHeavy') {
      const currentLevel = this.extractLevelNumber(this.gameState.currentLevel)
      return currentLevel < 3 || this.gameState.flame >= 4 // Can advance level or mode
    } else if (this.gameState.gameMode === 'extraHot') {
      const currentLevel = this.extractLevelNumber(this.gameState.currentLevel)
      return currentLevel < 5 // Can advance to higher extra hot level
    }
    return false
  }

  // Generate achievements based on game state
  getAchievements(): Array<{id: string, name: string, description: string, icon: string}> {
    const achievements = []
    const stats = this.getGameStats()

    if (stats.flameLevel >= 3) {
      achievements.push({
        id: 'heat-seeker',
        name: 'Heat Seeker',
        description: `Reached Level ${stats.flameLevel} spice`,
        icon: '🔥'
      })
    }

    if (stats.totalCardsDrawn >= 20) {
      achievements.push({
        id: 'card-master',
        name: 'Card Master', 
        description: `Completed ${stats.totalCardsDrawn} cards`,
        icon: '🎲'
      })
    }

    if (this.gameState.gameMode === 'extraHot') {
      achievements.push({
        id: 'extra-hot',
        name: 'Extra Hot Explorer',
        description: 'Reached the spiciest level',
        icon: '🌶️'
      })
    }

    // Category-specific achievements
    const usedCards = this.getAllUsedCards()
    const roleplayCards = usedCards.filter(card => card.tags.includes('Roleplay'))
    if (roleplayCards.length >= 5) {
      achievements.push({
        id: 'role-player',
        name: 'Role Player',
        description: 'Completed 5 roleplay cards',
        icon: '🎭'
      })
    }

    const kissingCards = usedCards.filter(card => card.tags.includes('Kissing'))
    if (kissingCards.length >= 3) {
      achievements.push({
        id: 'kiss-master',
        name: 'Kiss Master',
        description: 'Completed all kissing challenges',
        icon: '💋'
      })
    }

    // First timer achievement
    achievements.push({
      id: 'first-timer',
      name: 'First Timer',
      description: 'Completed your first TGOL session',
      icon: '⭐'
    })

    return achievements
  }

  private getAllUsedCards(): Card[] {
    const allCards = [
      ...decksData.icebreaker,
      ...Object.values(decksData.hotAndHeavy).flat(),
      ...Object.values(decksData.extraHot).flat()
    ]
    
    return allCards.filter(card => this.gameState.usedCards.includes(card.id))
  }
}