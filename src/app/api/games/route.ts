import { NextRequest, NextResponse } from 'next/server'

interface GameRegistration {
  gameId: string
  participants: string[]
  selectedDeck: string
  swapType: 'full' | 'soft'
  heatLevel: number
  categories: string[]
  timePerPlay: number
  allowSkips: boolean
  timerOverride: boolean
  heatLevelAdjust: boolean
  createdAt: string
}

// In a real app, this would be a database
const games: GameRegistration[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate unique game ID
    const gameId = 'TGOL-' + Math.random().toString(36).substr(2, 8).toUpperCase()
    
    const gameRegistration: GameRegistration = {
      ...body,
      gameId,
      createdAt: new Date().toISOString()
    }
    
    // Store game registration (in real app, save to database)
    games.push(gameRegistration)
    
    console.log('Game registered:', gameRegistration)
    
    return NextResponse.json({ 
      success: true, 
      gameId,
      message: 'Game registered successfully' 
    })
    
  } catch (error) {
    console.error('Error registering game:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to register game' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const gameId = searchParams.get('gameId')
  
  if (gameId) {
    const game = games.find(g => g.gameId === gameId)
    if (game) {
      return NextResponse.json({ success: true, game })
    } else {
      return NextResponse.json(
        { success: false, error: 'Game not found' },
        { status: 404 }
      )
    }
  }
  
  // Return all games (for admin/reporting purposes)
  return NextResponse.json({ 
    success: true, 
    games: games.map(g => ({
      gameId: g.gameId,
      participants: g.participants.length,
      deck: g.selectedDeck,
      createdAt: g.createdAt
    }))
  })
}