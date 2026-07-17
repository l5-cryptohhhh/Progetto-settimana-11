import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { searchItunesTracks } from '../../api/itunes'
import { searchDeezerTracks } from '../../api/deezer'
import type { FetchStatus, Section } from '../../types'

interface HomeState {
  sections: Section[]
  status: FetchStatus
  error: string | null
}

const SECTION_SEEDS: { title: string; seedArtist: string }[] = [
  { title: 'Rock Classics', seedArtist: 'Queen' },
  { title: 'Pop Culture', seedArtist: 'Katy Perry' },
  { title: '#HipHop', seedArtist: 'Eminem' },
]

const initialState: HomeState = {
  sections: SECTION_SEEDS.map((seed) => ({ ...seed, tracks: [] })),
  status: 'idle',
  error: null,
}

const TRACKS_PER_SECTION = 15

export const fetchHomeSections = createAsyncThunk('home/fetchSections', async () => {
  const sections = await Promise.all(
    SECTION_SEEDS.map(async (seed): Promise<Section> => {
      try {
        const tracks = await searchItunesTracks(seed.seedArtist, TRACKS_PER_SECTION)
        return { ...seed, tracks }
      } catch {
        const tracks = await searchDeezerTracks(seed.seedArtist)
        return { ...seed, tracks: tracks.slice(0, TRACKS_PER_SECTION) }
      }
    }),
  )
  return sections
})

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeSections.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchHomeSections.fulfilled, (state, action: PayloadAction<Section[]>) => {
        state.status = 'succeeded'
        state.sections = action.payload
      })
      .addCase(fetchHomeSections.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load home sections'
      })
  },
})

export default homeSlice.reducer
