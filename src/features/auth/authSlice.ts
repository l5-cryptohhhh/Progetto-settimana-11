import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '../../types'

const STORAGE_KEY = 'spotify-clone:auth'

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

interface AuthState {
  user: AuthUser | null
  modalMode: 'login' | 'register' | null
}

const initialState: AuthState = {
  user: loadUser(),
  modalMode: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<'login' | 'register'>) => {
      state.modalMode = action.payload
    },
    closeAuthModal: (state) => {
      state.modalMode = null
    },
    login: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.modalMode = null
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})

export const { openAuthModal, closeAuthModal, login, logout } = authSlice.actions
export default authSlice.reducer
