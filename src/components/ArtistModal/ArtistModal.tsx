import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { closeArtist } from '../../features/artist/artistSlice'
import { CloseIcon } from '../icons/Icons'
import Section from '../Section/Section'
import './ArtistModal.css'

export default function ArtistModal() {
  const dispatch = useAppDispatch()
  const { isOpen, info, status, error } = useAppSelector((state) => state.artist)

  if (!isOpen) return null

  return (
    <div className="artist-modal-backdrop" onClick={() => dispatch(closeArtist())}>
      <div className="artist-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="artist-modal-close" onClick={() => dispatch(closeArtist())} aria-label="Close">
          <CloseIcon />
        </button>

        {status === 'loading' && <p className="artist-modal-status">Loading artist info…</p>}
        {status === 'failed' && <p className="artist-modal-status">{error ?? 'Could not load artist info.'}</p>}

        {status === 'succeeded' && info && (
          <>
            {info.photo ? (
              <img className="artist-modal-photo" src={info.photo} alt={info.name} />
            ) : (
              <div className="artist-modal-photo artist-modal-photo-fallback">{info.name.charAt(0)}</div>
            )}
            <h2>{info.name}</h2>
            <p className="artist-modal-bio">{info.bio ?? 'No biography available for this artist.'}</p>
            {info.topTracks.length > 0 && (
              <div className="artist-modal-tracks">
                <Section title="Popular" tracks={info.topTracks} layout="list" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
