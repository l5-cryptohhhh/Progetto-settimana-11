import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { searchTracks } from '../../features/search/searchSlice'
import { clearSearch } from '../../features/search/searchSlice'
import './SearchBox.css'

export default function SearchBox() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const term = value.trim()
    if (term) {
      dispatch(searchTracks(term))
    } else {
      dispatch(clearSearch())
    }
    navigate('/search')
  }

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search for an artist or track"
      />
      <button type="submit">GO</button>
    </form>
  )
}
