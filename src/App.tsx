import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import MainContent from './components/MainContent/MainContent'
import SearchPage from './components/SearchPage/SearchPage'
import FavoritesPage from './components/FavoritesPage/FavoritesPage'
import LibraryPage from './components/LibraryPage/LibraryPage'
import PlaylistPage from './components/PlaylistPage/PlaylistPage'
import TrackPage from './components/TrackPage/TrackPage'
import Player from './components/Player/Player'
import ArtistModal from './components/ArtistModal/ArtistModal'
import AuthModal from './components/AuthModal/AuthModal'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/track/:id" element={<TrackPage />} />
        </Routes>
      </div>
      <Player />
      <ArtistModal />
      <AuthModal />
    </div>
  )
}

export default App
