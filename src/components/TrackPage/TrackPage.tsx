import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { lookupAlbumTracks } from '../../api/itunes'
import { playTrack, togglePlay } from '../../features/player/playerSlice'
import { openArtist } from '../../features/artist/artistSlice'
import { PauseIcon, PlayIcon } from '../icons/Icons'
import PageShell from '../PageShell/PageShell'
import Section from '../Section/Section'
import type { Track } from '../../types'
import './TrackPage.css'

export default function TrackPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const currentTrack = useAppSelector((state) => state.player.currentTrack)
  const isPlaying = useAppSelector((state) => state.player.isPlaying)
  const home = useAppSelector((state) => state.home.sections)
  const search = useAppSelector((state) => state.search.results)
  const favorites = useAppSelector((state) => state.favorites.tracks)
  const playlists = useAppSelector((state) => state.playlists.items)

  const [albumTracks, setAlbumTracks] = useState<Track[]>([])
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(false)

  const track = useMemo<Track | undefined>(() => {
    const stateTrack = (location.state as { track?: Track } | null)?.track
    if (stateTrack && stateTrack.id === id) return stateTrack
    const pools = [...home.flatMap((s) => s.tracks), search, favorites, ...playlists.flatMap((p) => p.tracks)]
    return pools.flat().find((t) => t.id === id)
  }, [location.state, id, home, search, favorites, playlists])

  useEffect(() => {
    if (!track?.albumId) {
      setAlbumTracks([])
      return
    }
    setIsLoadingAlbum(true)
    lookupAlbumTracks(Number(track.albumId))
      .then(setAlbumTracks)
      .catch(() => setAlbumTracks([]))
      .finally(() => setIsLoadingAlbum(false))
  }, [track?.albumId])

  if (!track) {
    return (
      <PageShell>
        <p className="main-content-empty">
          Brano non trovato. <Link to="/">Torna alla home.</Link>
        </p>
      </PageShell>
    )
  }

  const tracklist = albumTracks.length > 0 ? albumTracks : [track]
  const isCurrent = currentTrack?.id === track.id

  function handlePlay() {
    if (!track) return
    if (isCurrent) {
      dispatch(togglePlay())
    } else {
      dispatch(playTrack({ track, queue: tracklist }))
    }
  }

  return (
    <PageShell>
      <section className="track-page-header">
        <img className="track-page-art" src={track.artwork} alt="" />
        <div className="track-page-info">
          <span className="track-page-kind">Track</span>
          <h1>{track.title}</h1>
          <p className="track-page-meta">
            <button type="button" onClick={() => dispatch(openArtist(track.artist))}>
              {track.artist}
            </button>
            {track.album && <> · {track.album}</>}
          </p>
          <button type="button" className="track-page-play-btn" onClick={handlePlay}>
            {isCurrent && isPlaying ? <PauseIcon /> : <PlayIcon />}
            {isCurrent && isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </section>

      {isLoadingAlbum && <p className="main-content-empty">Loading album…</p>}

      {!isLoadingAlbum && albumTracks.length > 0 && (
        <Section title={`Album: ${track.album ?? track.title}`} tracks={albumTracks} layout="grid" />
      )}
    </PageShell>
  )
}
