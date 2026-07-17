# Progetto Settimana 11 — Spotify Clone

Clone dell'interfaccia Spotify in React + TypeScript + Redux Toolkit, con dati da iTunes/Deezer API e persistenza locale.

## Stack

- React 19 + TypeScript
- Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- React Router 7
- Vite

## Avvio

```bash
npm install
npm run dev
```

## Funzionalità

### Riproduzione

- Player in basso: play/pausa, avanti/indietro, shuffle, repeat — tutti funzionanti e collegati alla coda del contesto corrente (home, ricerca, playlist, preferiti, artista).
- Click sull'artwork/nome canzone nel footer (in basso a sinistra) apre una modale a comparsa sulla destra con artwork grande e gli stessi controlli di riproduzione del footer.
- Filtri sopra le pagine (TopNav: Trending, Podcast, Moods and Genres, ecc.) sono solo visivi, non ancora funzionanti.

### Ricerca

- Ricerca progressiva (debounce, no invio/bottone) sia dalla barra laterale sia nella ricerca "aggiungi canzoni" di una playlist.
- Risultati canzoni in lista (stile album, foto piccola a sinistra).
- Sotto i risultati, riga di artisti trovati con foto rotonda; click su un artista apre la scheda artista con bio e canzoni più popolari.

### Playlist

- Creazione, eliminazione, rinomina (click sul nome) e aggiunta canzoni tramite ricerca dedicata — tutto funzionante.
- Rimozione singola canzone dalla playlist.
- Play diretto della playlist dalla sua pagina.

### Preferiti

- Aggiunta/rimozione canzoni ai preferiti tramite l'icona a cuore su ogni traccia.
- Sezione dedicata con l'elenco dei brani salvati.

### Autenticazione

- Login e Registrazione funzionanti (stato utente in Redux), con logout dalla sidebar.

### Navigazione

- Logo + nome in alto a sinistra riporta alla home da qualunque pagina.
- Pagine album/artista/traccia mostrano la tracklist in lista verticale (foto piccola a sinistra), non a griglia.
