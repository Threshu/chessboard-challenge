# Chessboard Challenge

Interactive chessboard application built for the [Chess.com](https://chess.com) Front End Programming Challenge.

## Links

- **Live Demo:** [chessboard-challenge.web.app](https://chessboard-challenge.web.app)
- **Download (.zip):** [Google Drive](https://drive.google.com/drive/folders/1isgjztpT7KMvxWOnKsv-a44oKjzWa9n3?usp=sharing)

## Features

- Responsive 8×8 chessboard with Chess.com green theme
- Click squares to highlight — multiple highlights at once
- Click again to un-highlight (without modifying the log)
- Sidebar log tracks clicked squares in order
- Reset button clears all highlights and the log
- Fully responsive: sidebar right on desktop (≥768px), below on mobile
- Board stays square and fully visible, minimum 264×264px

## Tech Stack

- **Vue 3.5** — Composition API with `<script setup>`
- **TypeScript 5.9** — strict mode
- **Vite 7** — build tool
- **SCSS** — scoped styles with CSS custom properties
- **Vitest 4** + **Vue Test Utils 2** — 22 tests
- **Firebase Hosting** — deployment with GitHub Actions CI/CD

## Project Structure

```
src/
├── components/
│   ├── ChessBoard.vue      # CSS Grid 8×8 board
│   ├── ChessSquare.vue     # Individual square with highlight overlay
│   └── SidebarLog.vue      # Click log + Reset button
├── composables/
│   └── useBoardState.ts    # Shared reactive state
├── types/
│   └── index.ts            # File, Rank, SquareId, LogEntry
├── assets/styles/
│   ├── _variables.scss     # CSS custom properties (colors, theming)
│   └── _mixins.scss        # Responsive breakpoint mixin
├── App.vue                 # Root layout (flex row/column)
├── main.ts
└── style.scss              # Global resets
```

## Getting Started

```bash
npm install
npm run dev
```

## Testing

```bash
npm run test:unit
```

22 tests across 5 spec files covering composables and all components.

## Build & Deploy

```bash
npm run build
firebase deploy
```

Auto-deploys on push to `master` via GitHub Actions.
