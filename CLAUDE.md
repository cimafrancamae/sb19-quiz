# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

No test suite is configured.

## Architecture

Single-page React app (Vite, no TypeScript). All game logic and UI lives in **`src/App.jsx`** — there are no separate component files or routing libraries. `vercel.json` rewrites all routes to `/index.html` for SPA support on Vercel.

### Data model

Two top-level data constants drive the entire quiz:

- **`SONG_POOL`** — object keyed by difficulty level (`1`, `2`, `3`). Each level holds an array of song objects `{ title, emojis, hint, meaning, yt, stream }`. Levels 1/2/3 pick 10 random songs per game from their pools (14, 13, 12 songs respectively). `yt` is a YouTube video ID; entries in `PLACEHOLDER_YT` array are treated as missing and suppress the YouTube link.
- **`MEMBERS`** — array of the 5 members, each with a `songs` array for the solo mode. Same song object shape as above.

Pass threshold is `PASS_SCORE = 60` (percent).

### UI components (all in App.jsx)

Reusable atoms defined at the top: `GlitchText`, `NeonBtn`, `Card`, `Scanlines`, `Particles`. All styling is inline with the `NEON` color palette constant. No CSS-in-JS library or external component library is used.

`StreamLinks` conditionally renders YouTube MV and streaming links per song, skipping placeholder YT IDs.

`FeedbackModal` is a self-contained overlay for user feedback submission.

The main `App` component manages all game state via `useState`/`useRef`.

### Visual theme

Cyberpunk/neon aesthetic: dark background (`#060009`), neon pink/cyan/purple palette, glassmorphism cards, CSS scanlines overlay, floating emoji particles.
