import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { searchItunesTracks } from '../../api/itunes'
import { searchDeezerTracks } from '../../api/deezer'
import type { FetchStatus, Track } from '../../types'

interface SearchState {
  query: string
  results: Track[]
  status: FetchStatus
  error: string | null
}

const initialState: SearchState = {
  query: '',
  results: [],
  status: 'idle',
  error: null,
}

export const searchTracks = createAsyncThunk('search/searchTracks', async (term: string) => {
  try {
    return await searchItunesTracks(term, 25)
  } catch {
    return await searchDeezerTracks(term)
  }
})

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.query = ''
      state.results = []
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTracks.pending, (state, action) => {
        state.status = 'loading'
        state.query = action.meta.arg
        state.error = null
      })
      .addCase(searchTracks.fulfilled, (state, action: PayloadAction<Track[]>) => {
        state.status = 'succeeded'
        state.results = action.payload
      })
      .addCase(searchTracks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Search failed'
        state.results = []
      })
  },
})

export const { clearSearch } = searchSlice.actions
export default searchSlice.reducer
