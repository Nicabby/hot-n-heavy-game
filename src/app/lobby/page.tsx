'use client'

import { useState } from 'react'
import Link from 'next/link'
import TGOLBrandLogo from '@/components/TGOLBrandLogo'
import avatarsData from '@/data/avatars.json'

interface Player {
  id: string
  name: string
  gender: 'male' | 'female' | 'other'
  avatar: string
  partner?: string
  spiceLevel: number
}

export default function Lobby() {
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState({
    name: '',
    gender: 'female' as 'male' | 'female' | 'other',
    avatar: avatarsData[0].id,
    partner: '',
    spiceLevel: 1
  })

  const addPlayer = () => {
    if (currentPlayer.name.trim() && players.length < 8) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        ...currentPlayer
      }
      setPlayers([...players, newPlayer])
      setCurrentPlayer({
        name: '',
        gender: 'female',
        avatar: avatarsData[0].id,
        partner: '',
        spiceLevel: 1
      })
    }
  }

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id))
  }

  const getAvatar = (avatarId: string) => {
    return avatarsData.find(a => a.id === avatarId)
  }

  const availablePartners = players.filter(p => p.id !== currentPlayer.partner)

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: '#F7F3E2' }}
    >
      {/* Header */}
      <header className="w-full" style={{ paddingTop: '18px', paddingBottom: '18px' }}>
        <TGOLBrandLogo />
      </header>
      
      <main className="container mx-auto px-6" style={{ marginTop: '-12pt' }}>
        <div className="text-center mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center hover:opacity-70 transition-opacity mb-3"
            style={{ color: '#B9340B', fontSize: '12pt', fontFamily: 'Montserrat, sans-serif' }}
          >
            ← Back to home
          </Link>
          <h1 
            className="text-4xl font-futura-bold tracking-wide mb-2"
            style={{ color: '#B9340B' }}
          >
            Game Set-Up
          </h1>
          <p 
            className="text-xl"
            style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}
          >
            Add players and configure your game preferences.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Add Player Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-tgol-red">
            <h2 
              className="text-3xl tracking-wide mb-8 text-center"
              style={{ color: '#B9340B', fontFamily: 'Futura, sans-serif', fontWeight: 'bold' }}
            >
              Add Player
            </h2>
            
            <div className="space-y-4">
              <div>
                <label 
                  className="block text-lg mb-3"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}
                >
                  Player Name
                </label>
                <input
                  type="text"
                  value={currentPlayer.name}
                  onChange={(e) => setCurrentPlayer({...currentPlayer, name: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-300 focus:border-tgol-red focus:outline-none text-lg"
                  style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: '#FCF9E8' }}
                  placeholder="Enter player name"
                />
              </div>

              <div>
                <label 
                  className="block text-lg mb-3"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}
                >
                  Gender
                </label>
                <select
                  value={currentPlayer.gender}
                  onChange={(e) => setCurrentPlayer({...currentPlayer, gender: e.target.value as 'male' | 'female' | 'other'})}
                  className="w-full px-4 py-4 border-2 border-gray-300 focus:border-tgol-red focus:outline-none text-lg"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  style={{ backgroundColor: '#FCF9E8' }}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label 
                  className="block text-lg mb-3"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}
                >
                  Avatar Character
                </label>
                <select
                  value={currentPlayer.avatar}
                  onChange={(e) => setCurrentPlayer({...currentPlayer, avatar: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-300 focus:border-tgol-red focus:outline-none text-lg"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  style={{ backgroundColor: '#FCF9E8' }}
                >
                  {avatarsData
                    .filter(avatar => avatar.gender === currentPlayer.gender || avatar.gender === 'any')
                    .map(avatar => (
                      <option key={avatar.id} value={avatar.id}>{avatar.name}</option>
                    ))}
                </select>
              </div>

              <div>
                <label 
                  className="block text-lg mb-3"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}
                >
                  Spice Level: L{currentPlayer.spiceLevel}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={currentPlayer.spiceLevel}
                  onChange={(e) => setCurrentPlayer({...currentPlayer, spiceLevel: parseInt(e.target.value)})}
                  className="w-full h-3 appearance-none cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, #498379 0%, #B9340B 100%)`,
                    borderRadius: '6px'
                  }}
                />
                <div 
                  className="flex justify-between text-sm mt-2"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}
                >
                  <span>MILD</span>
                  <span>WARM</span>
                  <span>SPICY</span>
                  <span>HOT</span>
                  <span>EXTRA HOT</span>
                </div>
              </div>

              {players.length > 0 && (
                <div>
                  <label 
                    className="block text-lg mb-3"
                    style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}
                  >
                    Partner (Optional)
                  </label>
                  <select
                    value={currentPlayer.partner}
                    onChange={(e) => setCurrentPlayer({...currentPlayer, partner: e.target.value})}
                    className="w-full px-4 py-4 border-2 border-gray-300 focus:border-tgol-red focus:outline-none text-lg"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                    style={{ backgroundColor: '#FCF9E8' }}
                  >
                    <option value="">No specific partner</option>
                    {players.map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={addPlayer}
                disabled={!currentPlayer.name.trim() || players.length >= 8}
                className="w-full text-white py-4 px-6 text-lg tracking-wide hover:opacity-90 transition-opacity disabled:bg-gray-300 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Futura, sans-serif', fontWeight: 'bold' }}
                style={{ backgroundColor: !currentPlayer.name.trim() || players.length >= 8 ? '#cccccc' : '#B9340B' }}
              >
                ADD PLAYER ({players.length}/8)
              </button>
            </div>
          </div>

          {/* Players List */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-tgol-green">
            <h2 
              className="text-3xl tracking-wide mb-8 text-center"
              style={{ color: '#498379', fontFamily: 'Futura, sans-serif', fontWeight: 'bold' }}
            >
              Players ({players.length})
            </h2>
            
            {players.length === 0 ? (
              <p 
                className="text-center py-12 text-lg"
                style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}
              >
                No players added yet
              </p>
            ) : (
              <div className="space-y-4">
                {players.map((player) => {
                  const avatar = getAvatar(player.avatar)
                  const partner = players.find(p => p.id === player.partner)
                  return (
                    <div 
                      key={player.id} 
                      className="rounded-xl p-6 flex items-center justify-between border-2"
                      style={{ backgroundColor: '#FCF9E8', borderColor: '#498379' }}
                    >
                      <div className="flex items-center space-x-6">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                          style={{ backgroundColor: '#498379' }}
                        >
                          {player.gender === 'male' ? 'M' : player.gender === 'female' ? 'F' : 'O'}
                        </div>
                        <div>
                          <h3 
                            className="text-xl mb-1"
                            style={{ color: '#555555', fontFamily: 'Futura, sans-serif', fontWeight: 'bold' }}
                          >
                            {player.name}
                          </h3>
                          <p 
                            className=""
                            style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}
                          >
                            {avatar?.name} • Level {player.spiceLevel}
                            {partner && ` • Partner: ${partner.name}`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removePlayer(player.id)}
                        className="text-white font-bold text-xl w-8 h-8 rounded-full hover:opacity-70 transition-opacity"
                        style={{ backgroundColor: '#B9340B' }}
                      >
                        ×
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {players.length >= 2 && (
              <div className="mt-8 space-y-4">
                <Link
                  href="/consent"
                  className="block w-full text-white py-5 px-6 text-xl tracking-wide text-center hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'Futura, sans-serif', fontWeight: 'bold' }}
                  style={{ backgroundColor: '#498379' }}
                >
                  CONTINUE TO CONSENT & PREFERENCES
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}