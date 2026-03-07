# Implementation Plan

## Status Legend

- [ ] Not started
- [x] Completed
- [~] In progress

---

## Phase 1: Project Scaffolding

- [x] Scaffold Vue 3 + TypeScript + Vite project via `npm create vue@latest`
- [x] Enable: TypeScript, Vitest, ESLint
- [x] Install dev dependencies: `sass`, `@vue/test-utils`, `jsdom`
- [x] Remove default boilerplate components
- [x] Set up SCSS partials: `_variables.scss`, `_mixins.scss`, `style.scss`
- [x] Configure `vite.config.ts`: `@` path alias, SCSS global imports if needed
- [x] Configure `tsconfig.app.json`: add `@/*` path mapping
- [x] Verify `npm run dev`, `npm run build`, and `npm run test` work

## Phase 2: Types & State

- [x] Define types in `src/types/index.ts`: `File`, `Rank`, `SquareId`, `LogEntry`
- [x] Implement `src/composables/useBoardState.ts`:
  - `highlightedSquares` — reactive Set
  - `clickLog` — ref array of LogEntry
  - `toggleSquare(id)` — highlight adds to set + appends log; un-highlight removes from set only
  - `isHighlighted(id)` — boolean check
  - `resetBoard()` — clears both set and log
  - `BoardState` interface with explicit return type
- [x] Write tests: `src/__tests__/composables/useBoardState.spec.ts`
  - Use `beforeEach(() => resetBoard())` to isolate module-level state between tests
  - Toggle highlight → square in set + log entry added
  - Toggle un-highlight → square removed from set, log unchanged
  - Highlight multiple squares at once with correct log order
  - Re-highlight adds new log entry (requirement 7)
  - Reset clears both set and log

## Phase 3: ChessSquare Component

- [x] Create `src/components/ChessSquare.vue`
  - Props: `squareId`, `isLight`, `isHighlighted`
  - Emits: `click` → `squareId`
  - `data-square` attribute for testing
  - `aria-label="{file}{rank}"`, `role="button"`, `tabindex="0"` for accessibility
  - Light/dark BEM classes, highlight overlay via `::after`
- [x] Write tests: `src/__tests__/components/ChessSquare.spec.ts`
  - Renders with correct `data-square` attribute
  - Applies `square--light` class for light square
  - Applies `square--dark` class for dark square
  - Emits `click` with `squareId` when clicked
  - Applies `square--highlighted` class when highlighted
  - Does not apply `square--highlighted` class when not highlighted
  - Has correct `aria-label` attribute

## Phase 4: ChessBoard Component

- [ ] Create `src/components/ChessBoard.vue`
  - CSS Grid: `repeat(8, 1fr)` columns and rows
  - Iterate rank 8→1, file a→h
  - Compute light/dark per square
  - Connect `toggleSquare` on click
- [ ] Write tests: `src/__tests__/components/ChessBoard.spec.ts`
  - 64 squares rendered
  - Correct `data-square` values
  - Click toggles highlight

## Phase 5: SidebarLog Component

- [ ] Create `src/components/SidebarLog.vue`
  - Renders `clickLog` as ordered list: "1. e4", "2. d5", etc.
  - Reset button → calls `resetBoard()`
  - `overflow-y: auto` for scrollable log
  - Styled entries
- [ ] Write tests: `src/__tests__/components/SidebarLog.spec.ts`
  - Empty initially
  - Entries appear after highlight clicks
  - No entry on un-highlight
  - Reset clears list

## Phase 6: App Layout & Responsive CSS

- [ ] Build `App.vue` layout:
  - Desktop (≥768px): `flex-direction: row` — board left, sidebar right
  - Mobile (<768px): `flex-direction: column` — board top, sidebar below
- [ ] Board wrapper responsive sizing:
  - `width: min(available-width, available-height)`
  - `aspect-ratio: 1 / 1`
  - `min-width: 264px; min-height: 264px`
  - Use `100dvh` with `100vh` fallback
- [ ] Write tests: `src/__tests__/App.spec.ts`
  - Board and sidebar both render
  - End-to-end: click square → highlight appears + log entry in sidebar
  - Reset button clears highlights and log
- [ ] Test across viewports (manual QA): 375px, 768px, 1440px
- [ ] Verify 264px minimum holds

## Phase 7: Polish & Deploy

- [ ] Final visual QA — colors, spacing, highlights
- [ ] Ensure all tests pass: `npm run test`
- [ ] Clean build: `npm run build`
- [ ] Push to GitHub
- [ ] Deploy to Firebase Hosting — verify live demo URL
- [ ] Create .zip of project (exclude `node_modules/`, `.git/`, `dist/`)

---

## Key Decisions

| Decision          | Choice                   | Rationale                             |
| ----------------- | ------------------------ | ------------------------------------- |
| State management  | Composable (no Pinia)    | Single-page widget, minimal state     |
| Board sizing      | `aspect-ratio` + `min()` | Modern CSS, clean responsive behavior |
| Theme             | Chess.com green          | Matches employer's product            |
| Testing framework | Vitest + VTU             | First-class Vite integration          |
| Breakpoint        | 768px                    | Standard tablet/desktop split         |
| Log format        | "N. squareId"            | Clean, readable, ordered              |
| Accessibility     | aria-label + role        | Senior-level UX awareness, inclusive  |
| Test environment  | jsdom                    | Required for DOM APIs in Vitest       |

## Architecture Diagram

```
App.vue (flex layout)
├── ChessBoard.vue (CSS Grid 8×8)
│   └── ChessSquare.vue ×64 (click → toggleSquare)
└── SidebarLog.vue (reads clickLog)

useBoardState.ts (shared module-level state)
├── highlightedSquares: Set<SquareId>
├── clickLog: LogEntry[]
├── toggleSquare(id)
└── resetBoard()
```
