export type StreamingPlatform = 'Netflix' | 'Disney+' | 'Amazon Prime' | 'HBO Max' | 'Apple TV+'

export interface StreamingLink {
  platform: StreamingPlatform
  url: string
  available: boolean
}

export interface Movie {
  id: string
  title: string
  titleOriginal?: string
  year: number
  director: string
  synopsis: string
  poster: string
  rating?: number
  trailerUrl?: string
  streamingLinks: StreamingLink[]
  genre: string[]
}
