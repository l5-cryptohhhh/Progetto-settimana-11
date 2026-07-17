import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { clearSearch, searchTracks } from '../../features/search/searchSlice'
import './SearchBox.css'

export default function SearchBox() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useState('')

  useEffect(() => {
    const term = value.trim()
    if (!term) {
      dispatch(clearSearch())
      return
    }
    const timer = setTimeout(() => {
      dispatch(searchTracks(term))
      if (location.pathname !== '/search') navigate('/search')
    }, 350)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <form className="search-box" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search for an artist or track"
      />
    </form>
  )
}
