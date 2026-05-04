// AudioManager – singleton for background music + sound effects
// Background music uses HTMLAudioElement (reliable looping across navigation)
// Sound effects use lightweight Audio instances

class AudioManagerClass {
  private static instance: AudioManagerClass
  private bgAudio: HTMLAudioElement | null = null
  private currentTrackId: string | null = null
  private muted: boolean = false
  private bgVolume: number = 0.35

  private constructor() {}

  public static getInstance(): AudioManagerClass {
    if (!AudioManagerClass.instance) {
      AudioManagerClass.instance = new AudioManagerClass()
    }
    return AudioManagerClass.instance
  }

  // ---- Background Music ----------------------------------------

  public startMusic(src: string, trackId: string): void {
    if (typeof window === 'undefined') return

    // Already playing this track — do nothing
    if (this.currentTrackId === trackId && this.bgAudio && !this.bgAudio.paused) return

    // Stop any existing track
    this.stopMusic()

    this.bgAudio = new Audio(src)
    this.bgAudio.loop = true
    this.bgAudio.volume = this.muted ? 0 : this.bgVolume
    this.bgAudio.play().catch(() => {
      // Autoplay blocked — will play on next user interaction
    })
    this.currentTrackId = trackId
  }

  public stopMusic(): void {
    if (this.bgAudio) {
      this.bgAudio.pause()
      this.bgAudio.src = ''
      this.bgAudio = null
    }
    this.currentTrackId = null
  }

  public setMuted(muted: boolean): void {
    this.muted = muted
    if (this.bgAudio) {
      this.bgAudio.volume = muted ? 0 : this.bgVolume
    }
  }

  public isMuted(): boolean {
    return this.muted
  }

  public getCurrentTrackId(): string | null {
    return this.currentTrackId
  }

  public isMusicPlaying(): boolean {
    return this.bgAudio !== null && !this.bgAudio.paused
  }

  // ---- Sound Effects -------------------------------------------

  public playSound(src: string, volume: number = 0.6): void {
    if (typeof window === 'undefined' || this.muted) return
    try {
      const audio = new Audio(src)
      audio.volume = Math.max(0, Math.min(1, volume))
      audio.play().catch(() => {})
    } catch {}
  }

  public playCardFlip(): void {
    this.playSound('/audio/card-flip.mp3', 0.7)
  }

  public playButtonClick(): void {
    this.playSound('/audio/button-click.mp3', 0.5)
  }

  public playSuccessChime(): void {
    this.playSound('/audio/success-chime.mp3', 0.8)
  }

  // Legacy compat
  public isAudioEnabled(): boolean { return !this.muted }
  public setEnabled(enabled: boolean): void { this.setMuted(!enabled) }
  public startBackgroundMusic(): void {}
  public stopAllSounds(): void { this.stopMusic() }
  public playCardShuffle(): void { this.playSound('/audio/card-shuffle.mp3', 0.6) }
}

export const AudioManager = AudioManagerClass
