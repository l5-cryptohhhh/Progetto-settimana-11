import type { ReactNode } from 'react'
import TopNav from '../TopNav/TopNav'
import DotMatrix from '../DotMatrix/DotMatrix'

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="main-content">
      <div className="main-content-bg">
        <DotMatrix bgColor="#0d1b2a" colors={['#1ed760', '#37506a', '#0d1b2a']} cellSize={16} speed={4} frequency={2} gamma={5} />
      </div>
      <div className="main-content-inner">
        <TopNav />
        {children}
      </div>
    </main>
  )
}
