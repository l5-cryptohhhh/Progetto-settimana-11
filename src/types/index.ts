export interface Track {
  id: string
  title: string
  artist: string
  artwork: string
  previewUrl: string | null
  album?: string
  albumId?: string
}

export interface Section {
  title: string
  seedArtist: string
  tracks: Track[]
}

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface ArtistInfo {
  name: string
  photo: string | null
  bio: string | null
}

export interface Playlist {
  id: string
  name: string
  tracks: Track[]
}

export interface AuthUser {
  name: string
  email: string
}
