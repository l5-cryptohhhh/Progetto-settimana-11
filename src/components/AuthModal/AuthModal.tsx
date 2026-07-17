import { useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { closeAuthModal, login, openAuthModal } from '../../features/auth/authSlice'
import { CloseIcon } from '../icons/Icons'
import './AuthModal.css'

export default function AuthModal() {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.auth.modalMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!mode) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return
    dispatch(login({ name: mode === 'register' ? name.trim() || email.trim() : email.trim(), email: email.trim() }))
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="auth-modal-backdrop" onClick={() => dispatch(closeAuthModal())}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="auth-modal-close"
          onClick={() => dispatch(closeAuthModal())}
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <h2>{mode === 'login' ? 'Log in to Spotify' : 'Create your account'}</h2>

        <form className="auth-modal-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="auth-modal-submit">
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-modal-switch">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button type="button" onClick={() => dispatch(openAuthModal('register'))}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={() => dispatch(openAuthModal('login'))}>
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
