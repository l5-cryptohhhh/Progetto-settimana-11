import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createPlaylist } from '../../features/playlists/playlistsSlice'
import { LibraryIcon } from '../icons/Icons'
import PageShell from '../PageShell/PageShell'
import './LibraryPage.css'

export default function LibraryPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const playlists = useAppSelector((state) => state.playlists.items)

  function handleCreate() {
    const id = crypto.randomUUID()
    dispatch(createPlaylist({ id, name: `My Playlist #${playlists.length + 1}` }))
    navigate(`/playlist/${id}`)
  }

  return (
    <PageShell>
      <section className="section">
        <div className="library-header">
          <h2 className="section-title">Playlist</h2>
          <button type="button" className="library-create-btn" onClick={handleCreate}>
            + Crea playlist
          </button>
        </div>

        {playlists.length === 0 ? (
          <p className="main-content-empty">
            Non hai ancora nessuna playlist. Creane una per iniziare a raccogliere le tue canzoni preferite.
          </p>
        ) : (
          <div className="section-grid">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                type="button"
                className="playlist-card"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <span className="playlist-card-art">
                  {playlist.tracks[0] ? (
                    <img src={playlist.tracks[0].artwork} alt="" />
                  ) : (
                    <LibraryIcon width={40} height={40} />
                  )}
                </span>
                <span className="playlist-card-name">{playlist.name}</span>
                <span className="playlist-card-count">{playlist.tracks.length} brani</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}
