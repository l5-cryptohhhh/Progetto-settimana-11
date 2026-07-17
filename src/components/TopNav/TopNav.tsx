import './TopNav.css'

const TABS = ['Trending', 'Podcast', 'Moods and Genres', 'New Releases', 'Discover']

export default function TopNav() {
  return (
    <nav className="top-nav">
      {TABS.map((tab) => (
        <span key={tab}>{tab.toUpperCase()}</span>
      ))}
    </nav>
  )
}
