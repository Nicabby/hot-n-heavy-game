'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import TGOLBrandLogo from '@/components/TGOLBrandLogo'
import avatarsData from '@/data/avatars.json'
import { useGame, Player } from '@/context/GameContext'

export default function Lobby() {
  const router = useRouter()
  const { players, setPlayers, resetGame } = useGame()

  const [currentPlayer, setCurrentPlayer] = useState({
    name: '',
    gender: 'female' as 'male' | 'female' | 'other',
    avatar: avatarsData[0].id,
    partner: '',
    spiceLevel: 1,
  })

  const addPlayer = () => {
    if (currentPlayer.name.trim() && players.length < 8) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: currentPlayer.name.trim(),
        gender: currentPlayer.gender,
        avatar: currentPlayer.avatar,
        partner: currentPlayer.partner || undefined,
        spiceLevel: currentPlayer.spiceLevel,
      }
      setPlayers([...players, newPlayer])
      setCurrentPlayer({ name: '', gender: 'female', avatar: avatarsData[0].id, partner: '', spiceLevel: 1 })
    }
  }

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id))
  }

  const getAvatar = (avatarId: string) => avatarsData.find(a => a.id === avatarId)

  const handleContinue = () => {
    resetGame()
    router.push('/consent')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F3E2' }}>
      <header className="w-full" style={{ paddingTop: '18px', paddingBottom: '18px' }}>
        <TGOLBrandLogo />
      </header>

      <main className="container mx-auto px-6" style={{ marginTop: '-12pt' }}>
        <div className="text-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center hover:opacity-70 transition-opacity mb-3"
            style={{ color: '#B9340B', fontSize: '12pt', fontFamily: 'Montserrat, sans-serif' }}
          >
            ← Back to home
          </button>
          <h1 className="text-4xl font-futura-bold tracking-wide mb-2" style={{ color: '#B9340B' }}>
            Game Set-Up
          </h1>
          <p className="text-xl" style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}>
            Add players and configure your game preferences.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 items-stretch">
          {/* Add Player Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-tgol-red h-full">
            <h2 className="text-3xl tracking-wide mb-8 text-center"
              style={{ color: '#B9340B', fontFamily: 'Futura, sans-serif', fontWeight: 'bold' }}>
              Add Player
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-lg mb-3"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
                  Player Name
                </label>
                <input
                  type="text"
                  value={currentPlayer.name}
                  onChange={(e) => setCurrentPlayer({ ...currentPlayer, name: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                  className="w-full px-4 py-4 border-2 border-gray-300 focus:border-tgol-red focus:outline-none text-lg"
                  style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: '#FCF9E8' }}
                  placeholder="Enter player name"
                />
              </div>

              <div>
                <label className="block text-lg mb-3"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
                  Gender
                </label>
                <select
                  value={currentPlayer.gender}
                  onChange={(e) => {
                    const g = e.target.value as 'male' | 'female' | 'other'
                    const firstMatch = avatarsData.find(a => a.gender === g)
                    setCurrentPlayer({ ...currentPlayer, gender: g, avatar: firstMatch?.id || avatarsData[0].id })
                  }}
                  className="w-full px-4 py-4 border-2 border-gray-300 focus:border-tgol-red focus:outline-none text-lg"
                  style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: '#FCF9E8' }}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-lg mb-3"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
                  Avatar Character
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {avatarsData
                    .filter(avatar => avatar.gender === currentPlayer.gender || avatar.gender === 'any')
                    .map(avatar => (
                      <button key={avatar.id} type="button"
                        onClick={() => setCurrentPlayer({ ...currentPlayer, avatar: avatar.id })}
                        className="flex flex-col items-center rounded-xl p-2 border-2 transition-all hover:opacity-90"
                        style={{
                          borderColor: currentPlayer.avatar === avatar.id ? '#B9340B' : '#d1d5db',
                          backgroundColor: currentPlayer.avatar === avatar.id ? '#FDE8E2' : '#FCF9E8',
                          boxShadow: currentPlayer.avatar === avatar.id ? '0 0 0 2px #B9340B' : 'none',
                        }}>
                        <Image src={avatar.image} alt={avatar.name} width={64} height={64}
                          className="rounded-lg object-cover w-full aspect-square" />
                        <span className="text-xs mt-1 text-center leading-tight"
                          style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}>
                          {avatar.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <label className="block text-lg mb-3"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
                  Spice Level: L{currentPlayer.spiceLevel}
                </label>
                <input type="range" min="1" max="5" value={currentPlayer.spiceLevel}
                  onChange={(e) => setCurrentPlayer({ ...currentPlayer, spiceLevel: parseInt(e.target.value) })}
                  className="w-full h-3 appearance-none cursor-pointer"
                  style={{ background: 'linear-gradient(to right, #498379 0%, #B9340B 100%)', borderRadius: '6px' }}
                />
                <div className="flex justify-between text-sm mt-2"
                  style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}>
                  <span>MILD</span><span>WARM</span><span>SPICY</span><span>HOT</span><span>EXTRA HOT</span>
                </div>
              </div>

              {players.length > 0 && (
                <div>
                  <label className="block text-lg mb-3"
                    style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
                    Partner (Optional)
                  </label>
                  <select value={currentPlayer.partner}
                    onChange={(e) => setCurrentPlayer({ ...currentPlayer, partner: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 focus:border-tgol-red focus:outline-none text-lg"
                    style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: '#FCF9E8' }}>
                    <option value="">No specific partner</option>
                    {players.map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <button onClick={addPlayer}
                disabled={!currentPlayer.name.trim() || players.length >= 8}
                className="w-full text-white py-4 px-6 text-lg tracking-wide hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
                style={{
                  fontFamily: 'Futura, sans-serif', fontWeight: 'bold',
                  backgroundColor: !currentPlayer.name.trim() || players.length >= 8 ? '#cccccc' : '#B9340B',
                }}>
                ADD PLAYER ({players.length}/8)
              </button>
            </div>
          </div>

          {/* Players List */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-tgol-green h-full">
            <h2 className="text-3xl tracking-wide mb-8 text-center"
              style={{ color: '#498379', fontFamily: 'Futura, sans-serif', fontWeight: 'bold' }}>
              Players ({players.length})
            </h2>

            {players.length === 0 ? (
              <p className="text-center py-12 text-lg"
                style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}>
                No players added yet
              </p>
            ) : (
              <div className="space-y-4">
                {players.map((player) => {
                  const avatar = getAvatar(player.avatar)
                  const partner = players.find(p => p.id === player.partner)
                  return (
                    <div key={player.id} className="rounded-xl p-6 flex items-center justify-between border-2"
                      style={{ backgroundColor: '#FCF9E8', borderColor: '#498379' }}>
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2" style={{ borderColor: '#498379' }}>
                          {avatar?.image ? (
                            <Image src={avatar.image} alt={avatar.name} width={64} height={64}
                              className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
                              style={{ backgroundColor: '#498379' }}>
                              {player.gender === 'male' ? 'M' : player.gender === 'female' ? 'F' : 'O'}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl mb-1"
                            style={{ color: '#555555', fontFamily: 'Futura, sans-serif', fontWeight: 'bold' }}>
                            {player.name}
                          </h3>
                          <p style={{ color: '#555555', fontFamily: 'Montserrat, sans-serif' }}>
                            {avatar?.name} · L{player.spiceLevel}
                            {partner && ` · Partner: ${partner.name}`}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => removePlayer(player.id)}
                        className="text-white font-bold text-xl w-8 h-8 rounded-full hover:opacity-70 transition-opacity"
                        style={{ backgroundColor: '#B9340B' }}>
                        ×
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {players.length >= 2 && (
              <div className="mt-8">
                <button onClick={handleContinue}
                  className="block w-full text-white py-5 px-6 text-xl tracking-wide text-center hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'Futura, sans-serif', fontWeight: 'bold', backgroundColor: '#498379' }}>
                  CONTINUE TO CONSENT &amp; PREFERENCES
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
