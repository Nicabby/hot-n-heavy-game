export interface MusicTrack {
  id: string
  name: string
  file: string
}

// ---------------------------------------------------------------
// Add your music tracks here.
// Place the MP3 files in /public/audio/ and list them below.
// The "name" is what players will see when choosing their vibe.
// ---------------------------------------------------------------
export const MUSIC_TRACKS: MusicTrack[] = [
  { id: 'track-1', name: 'Track 1', file: '/audio/track-1.mp3' },
  { id: 'track-2', name: 'Track 2', file: '/audio/track-2.mp3' },
  { id: 'track-3', name: 'Track 3', file: '/audio/track-3.mp3' },
  { id: 'track-4', name: 'Track 4', file: '/audio/track-4.mp3' },
  { id: 'track-5', name: 'Track 5', file: '/audio/track-5.mp3' },
]
