# Fonts

Two typefaces, set up two different ways because they're licensed two
different ways.

| Role | Typeface | How it loads |
|---|---|---|
| Headings | Bootzy TM (Type Mania) | Self-hosted from this folder |
| Body | Neue Haas Grotesk Display Pro | Adobe Fonts web project |

Until both are in place the site falls back to **Helvetica / Arial**, which is
a deliberately close stand-in — Neue Haas Grotesk is Helvetica's own redesign,
so the metrics and colour of the page barely shift.

---

## 1. Neue Haas Grotesk Display Pro — body

Don't self-host this one. It's on **Adobe Fonts**, included with any Creative
Cloud plan, with unlimited web pageviews. That's the licensed route and it's
already paid for.

1. Go to [fonts.adobe.com](https://fonts.adobe.com) and find **Neue Haas
   Grotesk Display**.
2. Create a **Web Project**, add the family, and select the weights the site
   uses: **300 (Light)**, **400 (Roman)**, **500 (Medium)**, **600**.
3. Adobe gives you a `<link>` like
   `<link rel="stylesheet" href="https://use.typekit.net/abcdefg.css">`.
4. Paste it into the `<head>` of `index.html`, `work.html` and `about.html` —
   each already has a commented block showing exactly where — and delete the
   comment markers around it.

The CSS expects Adobe's family name, `neue-haas-grotesk-display`, which is
already first in `--sans`. Nothing else to change.

### On Thin vs Light

You asked for thin/light. The site is set to **Light (300)** for body text,
not Thin.

Neue Haas Thin at 16–17px on a warm off-white ground is genuinely hard to
read — the strokes drop below one device pixel on non-retina screens and the
text turns silver and patchy. It's a real legibility problem, not a taste call,
and on a site whose job is to look like a competent studio it reads as a
mistake rather than a choice.

Light gives you the same airy feel and holds up. If you want Thin somewhere,
use it large, where it looks its best. In `assets/css/salt.css`:

```css
.t-display { font-weight: 200; }   /* the hero headline */
.stat__v    { font-weight: 200; }  /* the big numbers */
```

Try it and see — at those sizes it's lovely.

---

## 2. Bootzy TM — headings

This one has to be self-hosted, so it needs webfont files in this folder:

```
assets/fonts/BootzyTM.woff2      <- required
assets/fonts/BootzyTM.woff       <- optional, older-browser fallback
```

The `@font-face` rule at the top of `assets/css/salt.css` already points at
those exact paths. Drop the files in and the headings switch over.

Your Creative Market / YouWorkForThem purchase gives you desktop files (`.otf`
/ `.ttf`). You need the **webfont licence** for `.woff2` — Type Mania sells it
as an add-on, and it's usually what the "web" tier covers. If you're given
`.otf` only, convert it, but the licence is the part that matters, not the
file format.

### Licensing — read this before pushing font files

**This repo is public.** Committing `BootzyTM.woff2` publishes the font file
to anyone who visits the repo, which nearly every commercial font EULA
forbids — it's redistribution, separate from using the font on your site.

Two clean options:

- Make the repo **private** and deploy Pages from it (GitHub Pages works on
  private repos on paid plans), or
- Keep the font file **out of git** and upload it to the host directly.

For a graded class project the risk is small and the disclaimer helps, but
it's worth knowing you'd be breaching the licence rather than finding out
later. Adobe Fonts has no such issue, which is part of why NHG is set up that
way.

### The three stylistic sets

Bootzy ships three stylistic sets and shuffles between them automatically so
repeated letters don't look mechanical. That runs on contextual alternates,
which the CSS keeps on:

```css
font-feature-settings: "calt" 1;
```

To pin one set instead of letting it shuffle, add `"ss01" 1` (or `ss02`,
`ss03`) to that rule on `h1, h2, h3, h4` in `salt.css`.

### No italic

Bootzy is a display face with no italic, so every place the old serif used
italic for emphasis now uses **colour** instead — periwinkle on the accent
words in the hero, the pinned statement, and the footer wordmark. A browser-
synthesised slant on a face with this much texture looks broken, which is why
it's done this way rather than left to fake it.

---

## Previewing before the files arrive

`--display` and `--sans` both list the **desktop** font names too
(`"Bootzy"`, `"Neue Haas Grotesk Display Pro"`). If those are installed on your
machine, you'll see the real thing locally straight away.

Be careful with that: it means **your** browser can look finished while every
visitor still gets Helvetica. Check in a private window on a machine without
the fonts installed, or just confirm the Adobe kit link is uncommented and
`BootzyTM.woff2` is actually in this folder.

---

## One design note

Bootzy describes itself as rugged and gritty, built for headlines and short
lines. That's a real shift from where the identity deck sat, and it pulls
against the studio's own line about not being the loudest object in the room.

It can absolutely work — "honest materials, made well" has a hands-on quality
that a textured face suits. But watch one place in particular: the **pinned
ethos statement** on the landing page is about 40 words at up to 4rem, and
Bootzy is doing all of it. That's a lot of textured display type in one block
and it may read as noise rather than emphasis.

If it does, switch that one block to the body face in `salt.css`:

```css
.pin__text { font-family: var(--sans); font-weight: 300; }
```

Light grotesque at that size is quiet and confident, and it fits the words
better. Your call — it's a one-line change either way.
