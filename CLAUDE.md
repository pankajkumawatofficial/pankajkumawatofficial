# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Pankaj Kumawat (Software Engineer). Static HTML/CSS/JS site hosted at pankajkumawat.in.

## Development Commands

No build steps required — this is a static site. Edit files directly:
- `css/styles.css` — main stylesheet
- `js/script.js` — JavaScript interactions
- `tokens.css` — design system tokens (referenced by styles.css)
- `index.html` — main portfolio page

## Architecture

### Design System
The project uses a locked Hallmark design system defined in `design.md`:
- **Theme**: Teal Terminal & Obsidian (dark-first with light mode support)
- **Fonts**: Space Grotesk (display), Geist Sans/Inter (body), JetBrains Mono (code)
- **Motion**: slower, calmer hover micro-interactions (lift/glow/sheen, 260–450ms) + item-level IntersectionObserver scroll reveals (transform/opacity only, ~1s, 140ms per-batch stagger); respects `prefers-reduced-motion`

### Key Design Tokens (`tokens.css`)
- Colors: `--color-paper`, `--color-paper-2`, `--color-ink`, `--color-accent`
- Spacing: 4-point semantic scale (`--space-3xs` through `--space-3xl`)
- Typography: `--font-display`, `--font-body`, `--font-mono`

### File Structure
- Root: `index.html`
- `css/`: styles and tokens
- `js/`: client-side JavaScript
- `images/`: assets
- `.hallmark/`: Hallmark logging (do not modify)

## Important Notes

- The design system is locked — all color and spacing values must use the tokens from `tokens.css`
- This is a static deployment (no server-side code) — HTML/CSS/JS only
- Recent commits show the teal-terminal themed redesign with premium UI/UX features