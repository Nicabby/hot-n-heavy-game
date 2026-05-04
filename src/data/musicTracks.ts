export interface MusicTrack {
  id: string
  name: string
  file: string
}

export const MUSIC_TRACKS: MusicTrack[] = [
  { id: 'track-1', name: 'Sensual Jazz', file: '/audio/track-1.mp3' },
  { id: 'track-2', name: 'Sexy R&B',     file: '/audio/track-2.mp3' },
]
