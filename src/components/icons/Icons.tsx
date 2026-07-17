import type { SVGProps } from 'react'

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}>
      <path d="M12 2.5 2 10.5V21a1 1 0 0 0 1 1h6v-7h6v7h6a1 1 0 0 0 1-1V10.5z" />
    </svg>
  )
}

export function LibraryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}>
      <path d="M3 3h4v18H3zM10.5 3h4v18h-4zM18.2 3.2l3.8 17.6-3.9.9L14.3 4z" />
    </svg>
  )
}

export function HeartIcon({ filled, ...props }: SVGProps<SVGSVGElement> & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? '#1ed760' : 'none'}
      stroke={filled ? '#1ed760' : 'currentColor'}
      strokeWidth="1.8"
      width="18"
      height="18"
      {...props}
    >
      <path d="M12 21s-7.5-4.6-10-9.3C.5 8.2 2.3 4.5 6 4.1c2-.2 3.7 1 4.9 2.6h2.2C14.3 5 16 3.9 18 4.1c3.7.4 5.5 4.1 4 7.6C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M6 4.5v15l14-7.5z" />
    </svg>
  )
}

export function PauseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M6 4.5h4v15H6zM14 4.5h4v15h-4z" />
    </svg>
  )
}

export function ShuffleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...props}
    >
      <path d="M3 6h3.5c2 0 3.3 1 4.3 2.5M3 18h3.5c2 0 3.3-1 4.3-2.5M15 6h1.5c2.5 0 4 1.5 4.5 3M15 18h1.5c2.5 0 4-1.5 4.5-3" />
      <path d="M18 3.5 21 6l-3 2.5M18 20.5 21 18l-3-2.5" />
    </svg>
  )
}

export function RepeatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...props}
    >
      <path d="M17 2.5 20 5.5 17 8.5" />
      <path d="M4 11V9.5A4 4 0 0 1 8 5.5h12" />
      <path d="M7 21.5 4 18.5 7 15.5" />
      <path d="M20 13v1.5a4 4 0 0 1-4 4H4" />
    </svg>
  )
}

export function PrevIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M6 5h2v14H6zM19 5v14l-9-7z" />
    </svg>
  )
}

export function NextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M16 5h2v14h-2zM5 5v14l9-7z" />
    </svg>
  )
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      width="16"
      height="16"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      width="18"
      height="18"
      {...props}
    >
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  )
}
