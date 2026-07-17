import { useAppSelector } from '../../app/hooks'
import PageShell from '../PageShell/PageShell'
import Section from '../Section/Section'

export default function FavoritesPage() {
  const tracks = useAppSelector((state) => state.favorites.tracks)

  return (
    <PageShell>
      {tracks.length === 0 ? (
        <p className="main-content-empty">No favorites yet. Tap the heart on a track to save it here.</p>
      ) : (
        <Section title="Preferiti" tracks={tracks} layout="list" />
      )}
    </PageShell>
  )
}
