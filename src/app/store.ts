import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../features/home/homeSlice'
import searchReducer from '../features/search/searchSlice'
import playerReducer from '../features/player/playerSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
import artistReducer from '../features/artist/artistSlice'
import authReducer from '../features/auth/authSlice'
import playlistsReducer from '../features/playlists/playlistsSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    search: searchReducer,
    player: playerReducer,
    favorites: favoritesReducer,
    artist: artistReducer,
    auth: authReducer,
    playlists: playlistsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
