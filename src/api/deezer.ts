import type { Track } from '../types'

// Endpoint provided by the course: a free proxy in front of the Deezer API
// (avoids Deezer's own CORS restrictions). It occasionally goes to sleep or
// gets decommissioned (free Heroku dynos), so we fall back to calling the
// RapidAPI-hosted mirror directly when it doesn't respond.
const STRIVE_PROXY_URL = 'https://striveschool-api.herokuapp.com/api/deezer/search?q='
const RAPIDAPI_URL = 'https://deezerdevs-deezer.p.rapidapi.com/search'
const RAPIDAPI_HOST = 'deezerdevs-deezer.p.rapidapi.com'
const RAPIDAPI_KEY = '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0'

interface DeezerTrack {
  id: number
  title: string
  artist: { name: string }
  album: { title: string; cover_medium?: string; cover_big?: string }
  preview?: string
}

interface DeezerResponse {
  data: DeezerTrack[]
}

function mapDeezerTrack(track: DeezerTrack): Track {
  return {
    id: String(track.id),
    title: track.title,
    artist: track.artist.name,
    album: track.album?.title,
    artwork: track.album?.cover_big ?? track.album?.cover_medium ?? '',
    previewUrl: track.preview ?? null,
  }
}

export async function searchDeezerTracks(term: string): Promise<Track[]> {
  try {
    const res = await fetch(STRIVE_PROXY_URL + encodeURIComponent(term))
    if (!res.ok) throw new Error(`strive proxy failed with status ${res.status}`)
    const data: DeezerResponse = await res.json()
    if (!Array.isArray(data.data)) throw new Error('unexpected strive proxy response shape')
    return data.data.map(mapDeezerTrack)
  } catch {
    const res = await fetch(`${RAPIDAPI_URL}?q=${encodeURIComponent(term)}`, {
      headers: {
        'X-RapidAPI-Host': RAPIDAPI_HOST,
        'X-RapidAPI-Key': RAPIDAPI_KEY,
      },
    })
    if (!res.ok) throw new Error(`Deezer RapidAPI failed with status ${res.status}`)
    const data: DeezerResponse = await res.json()
    return (data.data ?? []).map(mapDeezerTrack)
  }
}
