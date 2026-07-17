import type { ReactNode } from 'react'
import TopNav from '../TopNav/TopNav'

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="main-content">
      <TopNav />
      {children}
    </main>
  )
}
