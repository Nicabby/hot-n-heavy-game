export class AudioManager {
  private static instance: AudioManager
  private audioContext: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()
  private isEnabled: boolean = true

  private constructor() {
    // Initialize audio context on user interaction
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.initializeAudioContext.bind(this), { once: true })
    }
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager()
    }
    return AudioManager.instance
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      await this.preloadSounds()
    } catch (error) {
      console.warn('Audio initialization failed:', error)
    }
  }

  private async preloadSounds() {
    const soundFiles = [
      { name: 'cardShuffle', url: '/audio/card-shuffle.mp3' },
      { name: 'backgroundMusic', url: '/audio/bg-music.mp3' },
      { name: 'buttonClick', url: '/audio/button-click.mp3' },
      { name: 'cardFlip', url: '/audio/card-flip.mp3' },
      { name: 'successChime', url: '/audio/success-chime.mp3' }
    ]

    for (const sound of soundFiles) {
      try {
        await this.loadSound(sound.name, sound.url)
      } catch (error) {
        console.warn(`Failed to load sound ${sound.name}:`, error)
      }
    }
  }

  private async loadSound(name: string, url: string): Promise<void> {
    if (!this.audioContext) return

    try {
      const response = await fetch(url)
      if (!response.ok) {
        // Create a placeholder silent audio buffer for missing files
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate)
        this.sounds.set(name, buffer)
        return
      }
      
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
      this.sounds.set(name, audioBuffer)
    } catch (error) {
      // Create silent placeholder
      if (this.audioContext) {
        const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate)
        this.sounds.set(name, buffer)
      }
    }
  }

  public async playSound(soundName: string, volume: number = 1, loop: boolean = false): Promise<void> {
    if (!this.isEnabled || !this.audioContext || !this.sounds.has(soundName)) {
      return
    }

    try {
      const audioBuffer = this.sounds.get(soundName)!
      const source = this.audioContext.createBufferSource()
      const gainNode = this.audioContext.createGain()

      source.buffer = audioBuffer
      source.loop = loop
      gainNode.gain.value = Math.max(0, Math.min(1, volume))

      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      source.start()
    } catch (error) {
      console.warn(`Failed to play sound ${soundName}:`, error)
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  public isAudioEnabled(): boolean {
    return this.isEnabled
  }

  // Specific sound methods for game events
  public playCardShuffle() {
    this.playSound('cardShuffle', 0.6)
  }

  public playCardFlip() {
    this.playSound('cardFlip', 0.7)
  }

  public playButtonClick() {
    this.playSound('buttonClick', 0.5)
  }

  public playSuccessChime() {
    this.playSound('successChime', 0.8)
  }

  public startBackgroundMusic() {
    this.playSound('backgroundMusic', 0.3, true)
  }

  public stopAllSounds() {
    // Note: This is a simplified version. In a full implementation,
    // you'd want to track active sources and stop them individually
    if (this.audioContext) {
      this.audioContext.suspend()
    }
  }
}