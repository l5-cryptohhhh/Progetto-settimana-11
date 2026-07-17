import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout, openAuthModal } from '../../features/auth/authSlice'
import { HeartIcon, HomeIcon, LibraryIcon } from '../icons/Icons'
import SearchBox from './SearchBox'
import './Sidebar.css'

function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'active' : ''
}

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-logo">
        <svg viewBox="0 0 24 24" fill="#fff" width="34" height="34">
          <circle cx="12" cy="12" r="12" fill="#fff" />
          <path
            fill="#000"
            d="M17.3 16.3c-.2.3-.6.4-.9.2-2.5-1.5-5.7-1.9-9.4-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4.1-.9 7.6-.5 10.4 1.2.3.2.4.6.2.9zm1.2-2.7c-.3.4-.7.5-1.1.3-2.9-1.8-7.3-2.3-10.7-1.3-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.9-1.2 8.7-.6 12 1.4.4.2.5.7.3 1.1zm.1-2.8C15 8.7 9.1 8.5 5.7 9.5c-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 3.9-1.2 10.4-1 14.4 1.3.5.3.6.9.4 1.4-.3.4-.9.6-1.3.4z"
          />
        </svg>
        <span>Spotify</span>
      </Link>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={navLinkClass}>
          <HomeIcon />
          <span>Home</span>
        </NavLink>
        <NavLink to="/library" className={navLinkClass}>
          <LibraryIcon />
          <span>Your Library</span>
        </NavLink>
      </nav>

      <SearchBox />

      <nav className="sidebar-nav sidebar-nav-secondary">
        <NavLink to="/favorites" className={navLinkClass}>
          <HeartIcon />
          <span>Preferiti</span>
        </NavLink>
      </nav>

      <div className="sidebar-spacer" />

      <div className="sidebar-auth">
        {user ? (
          <>
            <p className="sidebar-user">Ciao, {user.name}</p>
            <button type="button" className="btn-login" onClick={() => dispatch(logout())}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn-signup" onClick={() => dispatch(openAuthModal('register'))}>
              Sign Up
            </button>
            <button type="button" className="btn-login" onClick={() => dispatch(openAuthModal('login'))}>
              Login
            </button>
          </>
        )}
      </div>

      <div className="sidebar-footer">
        <a href="#">Cookie Policy</a>
        <span>|</span>
        <a href="#">Privacy</a>
      </div>
    </aside>
  )
}
