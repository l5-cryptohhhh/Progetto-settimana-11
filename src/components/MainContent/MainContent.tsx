import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchHomeSections } from '../../features/home/homeSlice'
import PageShell from '../PageShell/PageShell'
import Section from '../Section/Section'
import './MainContent.css'

export default function MainContent() {
  const dispatch = useAppDispatch()
  const home = useAppSelector((state) => state.home)

  useEffect(() => {
    dispatch(fetchHomeSections())
  }, [dispatch])

  return (
    <PageShell>
      {home.sections.map((section) => (
        <Section
          key={section.title}
          title={section.title}
          tracks={section.tracks}
          isLoading={home.status === 'loading'}
        />
      ))}
    </PageShell>
  )
}
