import TrackCard from '../TrackCard/TrackCard'
import type { Track } from '../../types'
import './Section.css'

interface SectionProps {
  title: string
  tracks: Track[]
  isLoading?: boolean
  layout?: 'row' | 'grid' | 'list'
  onAdd?: (track: Track) => void
  onRemove?: (track: Track) => void
}

const LAYOUT_CLASS = { row: 'section-row', grid: 'section-grid', list: 'section-list' } as const

export default function Section({ title, tracks, isLoading, layout = 'row', onAdd, onRemove }: SectionProps) {
  if (!isLoading && tracks.length === 0) return null

  return (
    <section className="section">
      {title && <h2 className="section-title">{title}</h2>}
      <div className={LAYOUT_CLASS[layout]}>
        {isLoading && tracks.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="section-skeleton" />)
          : tracks.map((track) => (
              <TrackCard key={track.id} track={track} queue={tracks} onAdd={onAdd} onRemove={onRemove} />
            ))}
      </div>
    </section>
  )
}
