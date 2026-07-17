import type { ArtistInfo } from '../types'

const BASE_URL = 'https://www.theaudiodb.com/api/v1/json/2/search.php?s='

interface AudioDbArtist {
  strArtist: string
  strArtistThumb?: string | null
  strArtistFanart?: string | null
  strBiographyEN?: string | null
}

interface AudioDbResponse {
  artists: AudioDbArtist[] | null
}

export async function fetchArtistInfo(name: string): Promise<ArtistInfo> {
  const res = await fetch(BASE_URL + encodeURIComponent(name))
  if (!res.ok) throw new Error(`TheAudioDB request failed with status ${res.status}`)
  const data: AudioDbResponse = await res.json()
  const artist = data.artists?.[0]
  return {
    name,
    photo: artist?.strArtistThumb || artist?.strArtistFanart || null,
    bio: artist?.strBiographyEN || null,
  }
}
