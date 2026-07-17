import type { Track } from '../types'

const BASE_URL = 'https://itunes.apple.com'

interface ItunesResult {
  trackId: number
  trackName: string
  artistName: string
  collectionId?: number
  collectionName?: string
  artworkUrl100?: string
  previewUrl?: string
}

interface ItunesResponse {
  resultCount: number
  results: ItunesResult[]
}

function mapItunesTrack(result: ItunesResult): Track {
  return {
    id: String(result.trackId),
    title: result.trackName,
    artist: result.artistName,
    album: result.collectionName,
    albumId: result.collectionId ? String(result.collectionId) : undefined,
    // Deezer/iTunes small artwork is 100x100 by default, bump it up for crisper cards
    artwork: result.artworkUrl100
      ? result.artworkUrl100.replace('100x100', '600x600')
      : '',
    previewUrl: result.previewUrl ?? null,
  }
}

export async function searchItunesTracks(term: string, limit = 25): Promise<Track[]> {
  const url = `${BASE_URL}/search?term=${encodeURIComponent(term)}&entity=song&limit=${limit}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`iTunes search failed with status ${res.status}`)
  const data: ItunesResponse = await res.json()
  return data.results.filter((r) => r.trackId).map(mapItunesTrack)
}

export async function lookupAlbumTracks(collectionId: number): Promise<Track[]> {
  const url = `${BASE_URL}/lookup?id=${collectionId}&entity=song`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`iTunes lookup failed with status ${res.status}`)
  const data: ItunesResponse = await res.json()
  return data.results.filter((r) => r.trackId).map(mapItunesTrack)
}
