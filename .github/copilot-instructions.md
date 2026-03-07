# Chessboard Challenge — Copilot Instructions

## Project Overview

A Vue 3 interactive chessboard application built for the Chess.com Front End Programming Challenge. Features a responsive chessboard with click-to-highlight squares, a sidebar move log, and a reset button.

## Tech Stack

- **Framework:** Vue 3.5+ with Composition API (`<script setup>`)
- **Language:** TypeScript 5.9+ (strict mode)
- **Build:** Vite 7+
- **Styles:** SCSS with scoped styles — use CSS custom properties for theming
- **Tests:** Vitest 4+ with @vue/test-utils 2+
- **No** Pinia, Vue Router, or other state management libraries

## Project Structure

```
src/
├── assets/styles/         # SCSS partials (_variables, _mixins)
├── components/            # Vue SFCs (ChessBoard, ChessSquare, SidebarLog)
├── composables/           # useBoardState.ts — shared reactive state
├── types/                 # TypeScript type definitions
├── App.vue                # Root layout component
├── main.ts
└── style.scss             # Global resets
src/__tests__/             # Vitest specs mirroring src/ structure
```

## Coding Conventions

### Vue Components

- Always use `<script setup lang="ts">` syntax
- Use scoped SCSS: `<style scoped lang="scss">`
- Add `data-square` attributes on interactive elements for test selectors
- Props interface defined inline or in `types/`
- Emit events with typed payloads

### TypeScript

- Use strict mode; avoid `any`
- Define types in `src/types/index.ts`
- `SquareId` is a template literal type: `` `${File}${Rank}` ``

### SCSS / CSS

- CSS custom properties for colors/theming (defined in `_variables.scss`)
- CSS Grid for the 8×8 board
- Flexbox for page layout (board + sidebar)
- `aspect-ratio: 1 / 1` to keep board square
- Mobile breakpoint at `768px`
- Scoped styles per component; global resets only in `style.scss`

### State Management

- Single composable `useBoardState` with module-level reactive state
- `reactive(Set)` for highlighted squares, `ref([])` for click log
- No Pinia — composable is sufficient for this scope

### Testing

- Colocate specs in `src/__tests__/` directory
- Use `mount()` (not `shallowMount`) for integration confidence
- Select elements via `[data-square="e4"]` selectors
- Test composables in isolation (plain TS, no component mount)

## Best Practices

### DRY (Don't Repeat Yourself)

- Never duplicate logic — extract shared code into composables (`src/composables/`) or utility functions (`src/utils/`)
- Never duplicate styles — use SCSS mixins (`_mixins.scss`) for reusable style patterns, CSS custom properties for shared values
- If the same template pattern appears in 2+ places, extract it into a reusable component
- Single source of truth for types — all shared types live in `src/types/index.ts`

### TypeScript Best Practices

- Always write TypeScript, never plain JavaScript
- Prefer `interface` for object shapes, `type` for unions/intersections/utility types
- Use TypeScript utility types (`Pick`, `Omit`, `Partial`, `Record`) instead of redefining shapes
- Never use `as` type assertions — fix the type instead of casting
- Never use `@ts-ignore` or `@ts-expect-error` — resolve the underlying type issue
- All functions must have explicit return types for public APIs (composables, utils)
- Use `const` assertions and literal types where appropriate

### SCSS Best Practices

- Use `@use` and `@forward` — never `@import` (deprecated)
- Define reusable values as CSS custom properties in `_variables.scss`, not as SCSS variables (unless compile-time computation is needed)
- Extract repeated style patterns (e.g., flex centering, truncation) into mixins in `_mixins.scss`
- Never hardcode colors, spacing, or breakpoints — always reference variables/custom properties
- Keep specificity flat — avoid deep nesting (max 2 levels)
- No `!important` — fix specificity instead

### Style Placement Rules

- **Global styles** (`src/style.scss`): only CSS resets, font imports, and `<body>`/`<html>` base styles
- **CSS custom properties** (`_variables.scss`): all design tokens (colors, spacing, breakpoints, font sizes) — defined on `:root`
- **Mixins** (`_mixins.scss`): reusable style patterns shared across components (responsive breakpoints, flex/grid helpers, transitions)
- **Component scoped styles** (`<style scoped lang="scss">`): all component-specific styles — this is the default location for styles
- Never put component-specific styles in global files — use `scoped` to prevent leaking
- Never duplicate a mixin's logic inline — `@include` it instead
- Use `@use '@/assets/styles/variables'` in components that need design tokens at compile time
- Media queries: define a `breakpoint` mixin in `_mixins.scss` and `@include` it — never hardcode `@media` widths directly

### Component Design

- Single Responsibility — each component does one thing well
- Keep components small and focused; extract sub-components when complexity grows
- Props down, events up — no direct parent/child state mutation
- Prefer computed properties over methods for derived state

## Chess-Specific Rules

- Board orientation: white at bottom (rank 1), black at top (rank 8)
- Files: a–h (left to right), Ranks: 1–8 (bottom to top)
- Square color: `(fileIndex + rankIndex) % 2 === 0` → dark
- Chess.com green theme: light `#EEEED2`, dark `#769656`, highlight `rgba(255, 255, 0, 0.4)`

## Workflow Rules

- Always read current file contents before suggesting or making edits — never assume file state
- When reviewing or fixing issues, check all related files proactively instead of asking the user to provide them
