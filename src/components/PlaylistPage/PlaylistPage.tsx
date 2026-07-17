import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { searchItunesTracks } from '../../api/itunes'
import { searchDeezerTracks } from '../../api/deezer'
import {
  addTrackToPlaylist,
  deletePlaylist,
  removeTrackFromPlaylist,
  renamePlaylist,
} from '../../features/playlists/playlistsSlice'
import { playTrack } from '../../features/player/playerSlice'
import PageShell from '../PageShell/PageShell'
import Section from '../Section/Section'
import type { Track } from '../../types'
import './PlaylistPage.css'

export default function PlaylistPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const playlist = useAppSelector((state) => state.playlists.items.find((p) => p.id === id))

  const [isEditingName, setIsEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState(playlist?.name ?? '')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Track[]>([])
  const [isSearching, setIsSearching] = useState(false)

  if (!playlist || !id) {
    return (
      <PageShell>
        <p className="main-content-empty">
          Playlist non trovata. <Link to="/library">Torna alla libreria.</Link>
        </p>
      </PageShell>
    )
  }

  function saveName() {
    const trimmed = nameDraft.trim()
    if (trimmed && id) dispatch(renamePlaylist({ id, name: trimmed }))
    setIsEditingName(false)
  }

  async function handleSearch(e: FormEvent) {
    e.preventDefault()
    const term = query.trim()
    if (!term) return
    setIsSearching(true)
    try {
      const tracks = await searchItunesTracks(term, 20)
      setResults(tracks)
    } catch {
      try {
        setResults(await searchDeezerTracks(term))
      } catch {
        setResults([])
      }
    } finally {
      setIsSearching(false)
    }
  }

  function handleDelete() {
    if (!id) return
    dispatch(deletePlaylist(id))
    navigate('/library')
  }

  return (
    <PageShell>
      <section className="section playlist-header">
        {isEditingName ? (
          <input
            className="playlist-name-input"
            autoFocus
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={saveName}
            onKeyDown={(e) => e.key === 'Enter' && saveName()}
          />
        ) : (
          <h2 className="section-title playlist-name" onClick={() => setIsEditingName(true)} title="Rinomina">
            {playlist.name}
          </h2>
        )}
        <div className="playlist-header-actions">
          {playlist.tracks.length > 0 && (
            <button
              type="button"
              className="playlist-play-btn"
              onClick={() => dispatch(playTrack({ track: playlist.tracks[0], queue: playlist.tracks }))}
            >
              ▶ Play
            </button>
          )}
          <button type="button" className="playlist-delete-btn" onClick={handleDelete}>
            Elimina playlist
          </button>
        </div>
      </section>

      <Section
        title="Brani"
        tracks={playlist.tracks}
        layout="grid"
        onRemove={(t) => dispatch(removeTrackFromPlaylist({ playlistId: id, trackId: t.id }))}
      />

      <section className="section">
        <h2 className="section-title">Aggiungi canzoni</h2>
        <form className="playlist-add-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Cerca un brano o un artista"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">GO</button>
        </form>
        {isSearching && <p className="main-content-empty">Ricerca in corso…</p>}
        {!isSearching && results.length > 0 && (
          <Section
            title=""
            tracks={results}
            layout="grid"
            onAdd={(t) => dispatch(addTrackToPlaylist({ playlistId: id, track: t }))}
          />
        )}
      </section>
    </PageShell>
  )
}
