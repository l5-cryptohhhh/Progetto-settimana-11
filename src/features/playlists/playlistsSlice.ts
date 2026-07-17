import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Playlist, Track } from '../../types'

const STORAGE_KEY = 'spotify-clone:playlists'

function loadPlaylists(): Playlist[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Playlist[]) : []
  } catch {
    return []
  }
}

function persist(playlists: Playlist[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists))
}

interface PlaylistsState {
  items: Playlist[]
}

const initialState: PlaylistsState = {
  items: loadPlaylists(),
}

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    createPlaylist: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.items.push({ id: action.payload.id, name: action.payload.name, tracks: [] })
      persist(state.items)
    },
    renamePlaylist: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const playlist = state.items.find((p) => p.id === action.payload.id)
      if (playlist) playlist.name = action.payload.name
      persist(state.items)
    },
    deletePlaylist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload)
      persist(state.items)
    },
    addTrackToPlaylist: (state, action: PayloadAction<{ playlistId: string; track: Track }>) => {
      const playlist = state.items.find((p) => p.id === action.payload.playlistId)
      if (playlist && !playlist.tracks.some((t) => t.id === action.payload.track.id)) {
        playlist.tracks.push(action.payload.track)
      }
      persist(state.items)
    },
    removeTrackFromPlaylist: (state, action: PayloadAction<{ playlistId: string; trackId: string }>) => {
      const playlist = state.items.find((p) => p.id === action.payload.playlistId)
      if (playlist) playlist.tracks = playlist.tracks.filter((t) => t.id !== action.payload.trackId)
      persist(state.items)
    },
  },
})

export const { createPlaylist, renamePlaylist, deletePlaylist, addTrackToPlaylist, removeTrackFromPlaylist } =
  playlistsSlice.actions
export default playlistsSlice.reducer
