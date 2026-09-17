# Salt Studios

Static marketing site for **Salt Studios** — a design studio created for a class
assignment. The studio pitches for Pepperfry's brief on *Smart Furniture for
Compact Living Spaces*; this site exists to make the studio read as real.

> Studio and portfolio are fictional, created for academic purposes.

## Screens

| File | Screen |
|---|---|
| `index.html` | Landing — hero, partner carousel, scroll-driven ethos, pillars, stats, flagship project, focus |
| `work.html` | Products & catalogue — Chauki flagship, then 8 filterable projects |
| `about.html` | About — ethos, mission & vision, team, work culture *(copy pending)* |

## Stack

Plain HTML, CSS and JavaScript. No build step, no dependencies, no framework.

```
index.html · work.html · about.html
assets/css/salt.css     all styling and design tokens
assets/js/salt.js       scroll animations, carousel, filters
assets/img/             photos — see assets/img/README.md
.claude/serve.js        local preview server (dev only)
```

Type is Bootzy TM (headings, self-hosted), Neue Haas Grotesk Display Pro
(body, via Adobe Fonts) and Instrument Serif Italic (accents, via Google
Fonts). See [`assets/fonts/README.md`](assets/fonts/README.md) — the Adobe
kit URL is the one thing still to add.

Everything else — grain texture, favicon, placeholder art — is inline SVG.

## Preview locally

```bash
node .claude/serve.js
```

Then open <http://localhost:4321>. Opening the `.html` files directly from disk
works too, but a server is closer to how GitHub Pages will serve it.

## Adding photos

Every image position is already wired. Drop a file into `assets/img/` using the
exact filename listed in [`assets/img/README.md`](assets/img/README.md) and it
replaces the placeholder automatically — no HTML changes needed. Until then
each slot shows a labelled box with the filename and aspect ratio it wants.

## Deploying

GitHub Pages serves this as-is. In the repo: **Settings → Pages → Source:
Deploy from a branch → `main` / `(root)`**. The site goes live at
`https://vvgjr1-collab.github.io/Salt-Studios/`.

## Design

Palette and type come from the Studio Identity deck (Periwinkle).

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#2A3246` | Headings, dark sections |
| `--ink-soft` | `#33415E` | Body text on light |
| `--slate` | `#5E6472` | Secondary text |
| `--paper` | `#F0EFEA` | Page background |
| `--peri` | `#7A90C9` | Accent |
| `--peri-deep` | `#4A5E9C` | Links, labels, emphasis |
| `--peri-light` | `#D3DBF0` | Tints, placeholder fills |
| `--sand` | `#E0D2C7` | Warm accent |

All of them live at the top of `assets/css/salt.css`.

## Notes

- Animations honour `prefers-reduced-motion` and the whole site is readable
  with JavaScript disabled.
- Partner names are set as type rather than real brand logos, since the
  partnerships are fictional.
