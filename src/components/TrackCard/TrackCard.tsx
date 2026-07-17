import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { playTrack, togglePlay } from '../../features/player/playerSlice'
import { toggleFavorite } from '../../features/favorites/favoritesSlice'
import { openArtist } from '../../features/artist/artistSlice'
import { HeartIcon } from '../icons/Icons'
import type { Track } from '../../types'
import './TrackCard.css'

interface TrackCardProps {
  track: Track
  queue: Track[]
  onAdd?: (track: Track) => void
  onRemove?: (track: Track) => void
}

const FALLBACK_ART =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#2a2a2a"/></svg>',
  )

function truncate(text: string, max = 16) {
  return text.length > max ? `${text.slice(0, max)}...` : text
}

export default function TrackCard({ track, queue, onAdd, onRemove }: TrackCardProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentTrack = useAppSelector((state) => state.player.currentTrack)
  const isPlaying = useAppSelector((state) => state.player.isPlaying)
  const isFavorite = useAppSelector((state) => state.favorites.tracks.some((t) => t.id === track.id))

  const isCurrent = currentTrack?.id === track.id

  function handlePlay() {
    if (isCurrent) {
      dispatch(togglePlay())
    } else {
      dispatch(playTrack({ track, queue }))
    }
  }

  return (
    <div className={`track-card${isCurrent ? ' is-current' : ''}`}>
      <button type="button" className="track-card-art" onClick={handlePlay} aria-label={`Play ${track.title}`}>
        <img
          src={track.artwork || FALLBACK_ART}
          alt={`${track.album ?? track.title} cover`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_ART
          }}
        />
        <span className="track-card-play-overlay">{isCurrent && isPlaying ? '❚❚' : '▶'}</span>
      </button>
      <p className="track-card-title">
        Track:{' '}
        <button
          type="button"
          className="track-card-name"
          onClick={() => navigate(`/track/${track.id}`, { state: { track } })}
        >
          "{truncate(track.title)}"
        </button>
        <br />
        Artist:{' '}
        <button type="button" className="track-card-artist" onClick={() => dispatch(openArtist(track.artist))}>
          {track.artist}
        </button>
      </p>
      <div className="track-card-actions">
        <button
          type="button"
          className="track-card-heart"
          onClick={() => dispatch(toggleFavorite(track))}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon filled={isFavorite} />
        </button>
        {onAdd && (
          <button type="button" className="track-card-add" onClick={() => onAdd(track)} aria-label="Add to playlist">
            +
          </button>
        )}
        {onRemove && (
          <button
            type="button"
            className="track-card-remove"
            onClick={() => onRemove(track)}
            aria-label="Remove from playlist"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
