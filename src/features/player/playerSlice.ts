import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Track } from '../../types'

interface PlayerState {
  currentTrack: Track | null
  queue: Track[]
  index: number
  isPlaying: boolean
  shuffle: boolean
  repeat: boolean
}

const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  index: -1,
  isPlaying: false,
  shuffle: false,
  repeat: false,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack: (state, action: PayloadAction<{ track: Track; queue: Track[] }>) => {
      const { track, queue } = action.payload
      state.currentTrack = track
      state.queue = queue
      state.index = queue.findIndex((t) => t.id === track.id)
      state.isPlaying = true
    },
    togglePlay: (state) => {
      if (state.currentTrack) state.isPlaying = !state.isPlaying
    },
    playNext: (state) => {
      if (state.queue.length === 0) return
      let nextIndex = (state.index + 1) % state.queue.length
      if (state.shuffle && state.queue.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * state.queue.length)
        } while (nextIndex === state.index)
      }
      state.index = nextIndex
      state.currentTrack = state.queue[nextIndex]
      state.isPlaying = true
    },
    playPrev: (state) => {
      if (state.queue.length === 0) return
      const prevIndex = (state.index - 1 + state.queue.length) % state.queue.length
      state.index = prevIndex
      state.currentTrack = state.queue[prevIndex]
      state.isPlaying = true
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle
    },
    toggleRepeat: (state) => {
      state.repeat = !state.repeat
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
  },
})

export const { playTrack, togglePlay, playNext, playPrev, toggleShuffle, toggleRepeat, setIsPlaying } =
  playerSlice.actions
export default playerSlice.reducer
