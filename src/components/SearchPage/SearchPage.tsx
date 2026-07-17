import { useAppSelector } from '../../app/hooks'
import PageShell from '../PageShell/PageShell'
import Section from '../Section/Section'

export default function SearchPage() {
  const search = useAppSelector((state) => state.search)
  const hasQuery = search.query.trim().length > 0

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
    </PageShell>
  )
}
