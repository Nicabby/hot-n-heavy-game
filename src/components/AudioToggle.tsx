'use client'

import { useState, useEffect } from 'react'
import { AudioManager } from '@/utils/audioManager'

export default function AudioToggle() {
  const [muted, setMuted] = useState(false)
  const [visible, setVisible] = useState(false)
  const am = AudioManager.getInstance()

  useEffect(() => {
    setMuted(am.isMuted())
    // Only show the button once music has started
    const interval = setInterval(() => {
      setVisible(am.isMusicPlaying() || am.getCurrentTrackId() !== null)
    }, 500)
    return () => clearInterval(interval)
  }, [am])

  if (!visible) return null

  const toggle = () => {
    const next = !muted
    setMuted(next)
    am.setMuted(next)
  }

  return (
    <button
      onClick={toggle}
      title={muted ? 'Unmute music' : 'Mute music'}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.92)',
        border: '2px solid #B9340B',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontSize: '20px',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 18px rgba(185,52,11,0.25)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
      }}
    >
      {muted ? '🔇' : '🎵'}
    </button>
  )
}
