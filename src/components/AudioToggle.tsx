'use client'

import { useState, useEffect } from 'react'
import { AudioManager } from '@/utils/audioManager'

export default function AudioToggle() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const audioManager = AudioManager.getInstance()

  useEffect(() => {
    setIsAudioEnabled(audioManager.isAudioEnabled())
  }, [])

  const toggleAudio = () => {
    const newState = !isAudioEnabled
    setIsAudioEnabled(newState)
    audioManager.setEnabled(newState)
    
    if (newState) {
      audioManager.playButtonClick()
    }
  }

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all border border-tgol-red/20 pin-up-button"
      title={isAudioEnabled ? 'Disable sound' : 'Enable sound'}
    >
      <span className="text-xl">
        {isAudioEnabled ? '🔊' : '🔇'}
      </span>
    </button>
  )
}