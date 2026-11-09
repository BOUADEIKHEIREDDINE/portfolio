# Portfolio · Kheireddine Bouadi

Minimal black & white portfolio with live, animated demos of each project.
Live at https://bouadeikheireddine.github.io/portfolio/

## Stack

Next.js 14 (pages router, static export) · TypeScript · Tailwind CSS · Framer Motion · react-icons.
Fonts: Instrument Serif, IBM Plex Sans, IBM Plex Mono (via `next/font`).

## Content

All text lives in `src/data/content.ts` and mirrors the ATS CV. Edit it there; the sections read from it.

## Demos

`src/components/demos/` holds one animated mock UI per project (Android HR app, TOEIC generator,
financial ratio engine, clinical RAG, weather alerts, market dashboard). They loop while on screen,
respect `prefers-reduced-motion`, and use **synthetic data only**: no client names, documents or figures.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

## Deploy (GitHub Pages, `gh-pages` branch)

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build   # outputs ./out
touch out/.nojekyll
# publish ./out to the gh-pages branch
```
