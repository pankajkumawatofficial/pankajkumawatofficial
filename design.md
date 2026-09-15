# Design System — Lucky Yaduvanshi (FastAPI Backend Engineer)

A locked Hallmark design system for Lucky Yaduvanshi's official developer portfolio. Every page in this project references this system.

## Genre
`modern-minimal` (Linear / Stripe / GitBook school of developer tooling)

## Macrostructure Family
- Marketing & Portfolio Pages: **Workbench** (Two-column technical hero with interactive API request/response code workbench) + **Structured Systems Grid**
- Technical Documentation & Deep Dives: **Long Document** / **Index-First**

## Theme: FastAPI Emerald & Obsidian
- `--color-paper`: `oklch(0.14 0.015 240)` (Obsidian Dark) / `oklch(0.99 0.003 240)` (Engineered Light)
- `--color-paper-2`: `oklch(0.18 0.02 240)` (Elevated Card / Terminal Surface)
- `--color-paper-3`: `oklch(0.22 0.02 240)` (Active Tab / Code Block Surface)
- `--color-ink`: `oklch(0.96 0.01 240)` (Primary Crisp Ink) / `oklch(0.15 0.02 240)` (Light Mode Ink)
- `--color-ink-muted`: `oklch(0.68 0.015 240)` (Secondary Text) / `oklch(0.45 0.02 240)` (Light Muted)
- `--color-rule`: `oklch(0.26 0.02 240)` (1px Hairline Technical Borders)
- `--color-accent`: `oklch(0.68 0.16 175)` (FastAPI Official Emerald-Teal)
- `--color-accent-ink`: `oklch(0.98 0 0)`
- `--color-focus`: `oklch(0.68 0.16 175)`

## Typography
- **Display & Headings**: `Space Grotesk`, weights 600 & 700, tracking `-0.03em`, roman only (no italic headers).
- **Body & UI**: `Geist Sans` / `Inter`, weights 400 & 500.
- **Code & Endpoints**: `JetBrains Mono`, weights 400 & 600, tracking `-0.01em`.
- **Type Scale Anchor**: `--text-display`: `clamp(2.5rem, 5vw + 0.5rem, 4.25rem)`.

## Spacing
4-point semantic scale:
- `--space-3xs`: `0.25rem` (4px)
- `--space-2xs`: `0.5rem` (8px)
- `--space-xs`: `0.75rem` (12px)
- `--space-sm`: `1rem` (16px)
- `--space-md`: `1.5rem` (24px)
- `--space-lg`: `2rem` (32px)
- `--space-xl`: `3rem` (48px)
- `--space-2xl`: `4.5rem` (72px)
- `--space-3xl`: `6rem` (96px)

## Motion
- Easings: `cubic-bezier(0.16, 1, 0.3, 1)` named `--ease-out`.
- Durations: `--dur-short: 180ms`, `--dur-base: 240ms`.
- Motion Stance: **Motion-cut**. No distracting scroll-triggered animations or floating aurora blobs. State transitions only (`transform` and `opacity`).
- Reduced motion fallback: Opacity-only, `≤ 150ms`.

## Microinteractions Stance
- **FastAPI Code Workbench**: Tabbed code preview with instant switching (`0ms`).
- **Interactive Endpoint Test**: Realistic asynchronous latency simulation with live status code updates.
- **Copy Endpoints / cURL**: Instant feedback with visual confirmation (`Copied ✓`).
- **Focus Rings**: Instant visible focus ring (`outline: 2px solid var(--color-focus); outline-offset: 2px`).

## Nav & Footer Archetypes
- **Nav**: **N5 Floating Pill** — content-sized, detached from edges, solid obsidian/light surface with 1px hairline border and subtle shadow.
- **Footer**: **Ft2 Inline Single Line / Technical Colophon** — system status indicator, Python/FastAPI version tags, and direct engineering endpoints.

## Exports

### tokens.css
```css
:root {
  --color-paper: oklch(0.14 0.015 240);
  --color-paper-2: oklch(0.18 0.02 240);
  --color-paper-3: oklch(0.22 0.02 240);
  --color-ink: oklch(0.96 0.01 240);
  --color-ink-muted: oklch(0.68 0.015 240);
  --color-rule: oklch(0.26 0.02 240);
  --color-accent: oklch(0.68 0.16 175);
  --color-accent-ink: oklch(0.98 0 0);
  --color-focus: oklch(0.68 0.16 175);

  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Geist Sans", "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --space-3xs: 0.25rem;
  --space-2xs: 0.5rem;
  --space-xs: 0.75rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4.5rem;
  --space-3xl: 6rem;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 180ms;
  --dur-base: 240ms;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-pill: 9999px;
}
```
