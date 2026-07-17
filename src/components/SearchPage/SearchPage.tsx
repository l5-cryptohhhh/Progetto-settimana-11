import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchArtistInfo } from '../../api/theaudiodb'
import { openArtist } from '../../features/artist/artistSlice'
import PageShell from '../PageShell/PageShell'
import Section from '../Section/Section'
import './SearchPage.css'

interface ArtistHit {
  name: string
  photo: string | null
}

export default function SearchPage() {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.search)
  const hasQuery = search.query.trim().length > 0
  const [artists, setArtists] = useState<ArtistHit[]>([])

  useEffect(() => {
    if (search.status !== 'succeeded' || search.results.length === 0) {
      setArtists([])
      return
    }
    const uniqueNames = Array.from(new Set(search.results.map((t) => t.artist))).slice(0, 10)
    let cancelled = false
    Promise.all(
      uniqueNames.map((name) => fetchArtistInfo(name).catch(() => ({ name, photo: null }))),
    ).then((infos) => {
      if (!cancelled) setArtists(infos)
    })
    return () => {
      cancelled = true
    }
  }, [search.results, search.status])

  return (
    <PageShell>
      {!hasQuery && <p className="main-content-empty">Search for an artist or a track.</p>}

      {hasQuery && (
        <Section
          title="Search Results"
          tracks={search.results}
          isLoading={search.status === 'loading'}
          layout="grid"
        />
      )}
      {hasQuery && search.status === 'succeeded' && search.results.length === 0 && (
        <p className="main-content-empty">No results for "{search.query}".</p>
      )}
      {hasQuery && search.status === 'failed' && (
        <p className="main-content-empty">{search.error ?? 'Search failed. Please try again.'}</p>
      )}

      {artists.length > 0 && (
        <section className="section">
          <h2 className="section-title">Artists</h2>
          <div className="artist-hit-row">
            {artists.map((artist) => (
              <button
                key={artist.name}
                type="button"
                className="artist-hit"
                onClick={() => dispatch(openArtist(artist.name))}
              >
                {artist.photo ? (
                  <img className="artist-hit-photo" src={artist.photo} alt={artist.name} />
                ) : (
                  <span className="artist-hit-photo artist-hit-photo-fallback">{artist.name.charAt(0)}</span>
                )}
                <span className="artist-hit-name">{artist.name}</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  )
}
