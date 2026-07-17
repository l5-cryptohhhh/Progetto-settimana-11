import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Track } from '../../types'

const STORAGE_KEY = 'spotify-clone:favorites'

function loadFavorites(): Track[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Track[]) : []
  } catch {
    return []
  }
}

interface FavoritesState {
  tracks: Track[]
}

const initialState: FavoritesState = {
  tracks: loadFavorites(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Track>) => {
      const track = action.payload
      const exists = state.tracks.some((t) => t.id === track.id)
      state.tracks = exists ? state.tracks.filter((t) => t.id !== track.id) : [...state.tracks, track]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tracks))
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
