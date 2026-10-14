# AI & Software Developer Portfolio

This portfolio website showcases your skills and projects as an **AI & Software Developer**.  
It's built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **Three.js**, and **EmailJS**.

The design emulates a dark, VSCode-style Python coding environment with terminal aesthetics, code windows, and animated typing.

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript + React
- **Styling**: Tailwind CSS, custom utility classes
- **3D**: Three.js (custom rotating Python-inspired torus)
- **Animations**: typed.js, Tailwind keyframes, framer-motion-ready
- **Contact**: EmailJS (client-side form)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open your browser at:

```bash
http://localhost:3000
```

## Project Structure

```bash
portfolio/
  package.json
  tsconfig.json
  tailwind.config.js
  postcss.config.js
  next.config.js
  next-env.d.ts
  README.md
  src/
    pages/
      _app.tsx
      _document.tsx
      index.tsx
    components/
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      CodeWindow.tsx
      Experience.tsx
      Contact.tsx
      Footer.tsx
    styles/
      globals.css
```

## Environment Variables (EmailJS)

To enable the terminal-style contact form, create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Obtain these values from your EmailJS dashboard.

If these are missing, the site will still run, but form submissions will log a warning in the console instead of sending email.

## Accessibility & Responsiveness

- Semantic sections and headings for screen readers.
- High-contrast dark theme with Python-inspired colors.
- Responsive layout from mobile to large desktop screens.
- Focus-visible states on interactive elements.

