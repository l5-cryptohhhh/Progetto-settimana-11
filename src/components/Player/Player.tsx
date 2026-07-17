import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { playNext, playPrev, setIsPlaying, toggleRepeat, toggleShuffle, togglePlay } from '../../features/player/playerSlice'
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, RepeatIcon, ShuffleIcon } from '../icons/Icons'
import './Player.css'

export default function Player() {
  const dispatch = useAppDispatch()
  const { currentTrack, isPlaying, shuffle, repeat } = useAppSelector((state) => state.player)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    if (audio.src !== currentTrack.previewUrl) {
      audio.src = currentTrack.previewUrl ?? ''
    }
    if (isPlaying && currentTrack.previewUrl) {
      audio.play().catch(() => dispatch(setIsPlaying(false)))
    } else {
      audio.pause()
    }
  }, [currentTrack, isPlaying, dispatch])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.loop = repeat
  }, [repeat])

  const canPlay = Boolean(currentTrack?.previewUrl)

  return (
    <footer className="player">
      <audio ref={audioRef} onEnded={() => !repeat && dispatch(playNext())} />

      <div className="player-track">
        {currentTrack ? (
          <>
            <img src={currentTrack.artwork} alt="" />
            <div>
              <p className="player-track-title">{currentTrack.title}</p>
              <p className="player-track-artist">{currentTrack.artist}</p>
            </div>
          </>
        ) : (
          <p className="player-track-empty">Select a song to play</p>
        )}
      </div>

      <div className="player-controls">
        <button
          type="button"
          className={shuffle ? 'is-active' : ''}
          onClick={() => dispatch(toggleShuffle())}
          aria-label="Shuffle"
        >
          <ShuffleIcon />
        </button>
        <button type="button" onClick={() => dispatch(playPrev())} disabled={!currentTrack} aria-label="Previous">
          <PrevIcon />
        </button>
        <button
          type="button"
          className="player-play-btn"
          onClick={() => dispatch(togglePlay())}
          disabled={!canPlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button type="button" onClick={() => dispatch(playNext())} disabled={!currentTrack} aria-label="Next">
          <NextIcon />
        </button>
        <button
          type="button"
          className={repeat ? 'is-active' : ''}
          onClick={() => dispatch(toggleRepeat())}
          aria-label="Repeat"
        >
          <RepeatIcon />
        </button>
      </div>

      <div className="player-spacer" />
    </footer>
  )
}
