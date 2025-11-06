# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 14** web application (homepage/portfolio site) that hosts multiple interactive tools and mini-applications. The main entry point is EvinOS (a retro-styled OS simulator), but the site contains several distinct applications:

- **Metronome** (`/metronome`): An advanced rhythm/metronome tool with custom beat patterns, presets, and audio synthesis
- **EvinOS** (`/evinos`): A retro desktop OS-style interface (default home page)
- **Music/Music Theory Tools**: Mando, Pitch, Dmitry, etc.
- **Gaming Tools**: DM Tools (for tabletop gaming), Honeyheist, etc.
- **Utilities**: Color tools, Astro charts, QR codes, etc.

The site uses a mix of Next.js pages architecture with Next.js rewrites to handle routing (see `next.config.js` for URL mappings).

## Common Development Commands

```bash
# Development server (runs on localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Build WASM for sleep sound synthesis (uses Faust DSP compiler)
npm run build-wasm
```

## Key Architecture Patterns

### 1. Modular Application Structure
Each major application lives in `/lib/{appname}/`:
- `metronome/` - Most complex app, contains Metronome class, preset store, audio synthesis
- `dmtools/` - DM tools with pages and components
- `color/` - Color theory/visualization tools
- `astro/`, `sleep/`, `faust/` - Domain-specific tools
- `hooks.ts` - Shared custom hook `usePersistentState` for localStorage-based state management

Top-level `/pages` files typically import from `/lib/{appname}/` as the default export (e.g., `pages/metronome.tsx` → `lib/metronome/index.tsx`).

### 2. Audio/Web Audio Context Pattern (Metronome)
The Metronome app uses Web Audio API for precise timing:
- `lib/metronome/metronome.ts` - Core `Metronome` class that manages AudioContext, scheduling, and sound generation
- `lib/metronome/emitter.ts` - Event emitter pattern for beat notifications
- `lib/metronome/soundpacks.ts` - Defines available sound generators and their parameters
- `lib/metronome/usemetronome.ts` - Custom hook wrapping Metronome class for React components
- `lib/metronome/presetstore.ts` - Hardcoded preset rhythms (4/4, 3/4, pan-Balkan rhythms, etc.)

Sound generation uses synthesized audio (via Web Audio API) or can use WASM-based Faust DSP synthesis (see `lib/faust/` and `npm run build-wasm`).

### 3. UI Library
Uses **Material-UI (MUI)** v5 for components and theming. The Metronome app applies a dark theme via `ThemeProvider`.

### 4. State Management
- **Persistent state**: Uses `usePersistentState` hook (lib/hooks.ts) which stores state in localStorage with key prefix `persistentState/{key}`
- **Component state**: Standard React hooks (useState, useEffect)
- **Sharing**: Rhythm data can be serialized to base64 strings for URL sharing (see metronome component)

### 5. Styling
- SASS/SCSS for component-specific styles (`.module.scss` or `.module.css` pattern)
- Global styles in `/styles/global.css`
- MUI theming for Material components

### 6. URL Routing & Rewrites
Next.js rewrites and redirects are configured in `next.config.js`:
- `/` redirects to `/metronome` if host is `tacotacoburrito.com`, otherwise to `/evinos`
- `/sleep` and `/zzzmaker` redirect to `/zzzmachine`
- Custom rewrites for legacy paths

## TypeScript Configuration

- TypeScript is enabled with `strict: false` (not strict mode) in `tsconfig.json`
- Target is ES5, module is ESNext
- All `.ts` and `.tsx` files are included

## Notable Dependencies

- **@mui/material** - UI component library
- **@emotion/react** - CSS-in-JS (peer dep for MUI)
- **Web Audio API** - Native browser API for audio (no external lib needed)
- **gray-matter** - Front matter parsing for blog posts
- **date-fns**, **dayjs** - Date utilities
- **qrcode** - QR code generation
- **circular-natal-horoscope-js**, **@astrodraw/astrochart** - Astrology charts
- **remark**, **remark-html** - Markdown processing

## Key Files & Patterns

### Metronome (Most Complex Module)
- `lib/metronome/metronome.ts:Metronome` - Core class managing Web Audio scheduling and beat playback
- `lib/metronome/components/metronome.tsx` - Main React component, handles UI and state
- `lib/metronome/presetstore.ts` - Preset rhythm definitions (strong/weak/off beat patterns)
- `lib/metronome/types.ts` - TypeScript types (Measures, BeatStrength, etc.)

### Custom Hooks
- `lib/hooks.ts:usePersistentState` - localStorage persistence hook used throughout app

### Utilities
- `lib/metronome/util.ts` - Utility functions for multi-measure handling
- `lib/posts.ts` - Blog post utilities (gray-matter parsing)

## Development Considerations

1. **Audio Context Issues**: Web Audio API is available only after user interaction (click event). The Metronome respects this with delayed initialization.

2. **Browser Compatibility**: Uses modern Web APIs (Web Audio API, Clipboard API). Works in modern browsers.

3. **Performance**: Metronome uses requestAnimationFrame and interval-based schedulers for precise timing. The scheduler runs every 0.005s with a 0.05s lookahead horizon.

4. **Preset System**: Rhythm presets are hardcoded in `presetstore.ts`. To add new presets, modify the `defaultPresetStore` object with beat patterns and BPM.

5. **localStorage**: All persistent state uses `persistentState/{key}` namespace. Check localStorage if debugging state issues.

## Build & Deployment

- Uses **Next.js static generation** where possible (`getStaticProps`)
- Deployed on **Netlify** (note: `@netlify/functions` and related deps present)
- WASM sound synthesis requires Faust compiler setup (run `npm run build-wasm` to regenerate)
