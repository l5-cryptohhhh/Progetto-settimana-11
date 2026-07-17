import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchArtistInfo } from '../../api/theaudiodb'
import type { ArtistInfo, FetchStatus } from '../../types'

interface ArtistState {
  isOpen: boolean
  info: ArtistInfo | null
  status: FetchStatus
  error: string | null
}

const initialState: ArtistState = {
  isOpen: false,
  info: null,
  status: 'idle',
  error: null,
}

export const openArtist = createAsyncThunk('artist/open', async (name: string) => {
  return await fetchArtistInfo(name)
})

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    closeArtist: (state) => {
      state.isOpen = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(openArtist.pending, (state) => {
        state.isOpen = true
        state.status = 'loading'
        state.error = null
      })
      .addCase(openArtist.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.info = action.payload
      })
      .addCase(openArtist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Could not load artist info'
      })
  },
})

export const { closeArtist } = artistSlice.actions
export default artistSlice.reducer
