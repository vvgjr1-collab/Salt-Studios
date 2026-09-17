# Fonts

Three typefaces doing three jobs.

| Role | Typeface | Weight | How it loads | Status |
|---|---|---|---|---|
| Headings | Bootzy TM (Type Mania) | 400 | Self-hosted, this folder | ✅ installed |
| Body | Neue Haas Grotesk Display Pro | 400 Regular | Adobe Fonts web project | ⏳ needs your kit URL |
| Accents | Instrument Serif Italic | 400 italic | Google Fonts | ✅ live |

---

## 1. Bootzy TM — headings ✅

Installed and working. Files in this folder:

```
BootzyTM.woff2    81 KB   <- what almost every browser uses
BootzyTM.woff     97 KB   <- older browsers
BootzyTM.ttf     154 KB   <- last resort
```

The `@font-face` in `salt.css` lists `local("Bootzy TM")` first, so if the font
is installed on the machine viewing the site it's used straight from disk with
no download at all.

### What's actually in the file

Read off the font itself, not the marketing page:

- **One weight**, `usWeightClass` 400. Asking for 300 or 700 gets you the same
  face, or a browser-synthesised fake. Don't.
- **No italic.** Italic angle is 0. This is why there's a separate serif.
- **OpenType features present:** `calt`, `salt`, `ss01`, `ss02`, `aalt`, `kern`.

Note that's **two** stylistic sets in this cut, not the three the product page
advertises. The automatic shuffle runs off `calt`, which the CSS keeps on:

```css
h1, h2, h3, h4 { font-feature-settings: "calt" 1; }
```

To pin one set instead of letting it shuffle, add `"ss01" 1` or `"ss02" 1` to
that rule in `salt.css`.

### Licence reminder

This repo is public, so these font files are now downloadable by anyone who
visits it. That's redistribution, which is separate from using the font on
your site and is something most commercial font EULAs forbid. For a graded
class project the practical risk is small, but if you want it clean: make the
repo private (Pages works on private repos on paid plans), or keep the font
files out of git and upload them to the host directly.

---

## 2. Neue Haas Grotesk Display Pro — body ⏳

**This is the one thing still outstanding.** Until you add the kit, body text
falls back to Helvetica/Arial — close enough that the layout doesn't move, but
it isn't the real face.

Don't self-host it. It's on **Adobe Fonts**, included with any Creative Cloud
plan, unlimited web pageviews. You've already paid for it.

1. [fonts.adobe.com](https://fonts.adobe.com) → find **Neue Haas Grotesk Display**
2. Create a **Web Project**, add the family, select weights **400** and **500**
   (400 does nearly all the work; 500 is for eyebrows and buttons)
3. Adobe gives you `<link rel="stylesheet" href="https://use.typekit.net/xxxxxxx.css">`
4. Paste it into the `<head>` of all three pages — each has a commented block
   marking the spot — and remove the `<!--` / `-->` around it

The CSS already expects Adobe's family name, `neue-haas-grotesk-display`.

### Weight: Regular, not Light

Body is set to **400**. Light at 300 went too thin against Bootzy's weight —
the page lost its spine, and the contrast between a very heavy heading and a
very light paragraph read as two unrelated pages rather than one system.

Thin still has a place, but at size. If you want it on the hero headline or
the big stat numbers:

```css
.t-display { font-weight: 200; }
.stat__v   { font-weight: 200; }
```

Only worth it once the real NHG is loading — Arial has no thin weight, so
nothing will happen until then.

---

## 3. Instrument Serif Italic — accents ✅

The counterweight. Bootzy has no italic and carries a lot of weight, so every
emphasis word and pull quote sits in a high-contrast serif italic instead:
light where Bootzy is heavy, curved where it's blunt.

Where it appears:

- `.hero__title em` — "the *best*."
- `.pin__text .w--accent` — "*generous*" in the scrolling statement
- `.t-quote` — both pull quotes, entire
- `.foot__wordmark em` — "*Salt*"
- `.brand__name em` — "Salt *Studios*" in the header, the pairing in miniature

It's set at `1.05em` relative to its surroundings, because a high-contrast
serif reads optically smaller than a heavy grotesque at matched size.

**Never use it for running text.** It's a display italic — it's there to
interrupt, and it stops working the moment there's a paragraph of it.

### Swapping it

If you want something warmer and more classical, **EB Garamond** is the
obvious alternative — same job, less fashion-forward, arguably closer to the
"honest materials, tenth year of use" line. One change in `salt.css`:

```css
--serif: "EB Garamond", Georgia, "Times New Roman", serif;
```

and update the Google Fonts `<link>` in all three pages to
`family=EB+Garamond:ital@1`.

---

## Previewing

`--display` and `--sans` both list desktop font names too, and the Bootzy
`@font-face` leads with `local()`. So if these are installed on your machine
you'll see the real thing immediately.

Careful with that: **your** browser can look finished while every visitor
still gets Helvetica for the body. Check in a private window, or just confirm
the Adobe kit `<link>` is uncommented.

---

## A note on the manifesto

The pinned ethos statement on the landing page is about 40 words at up to
4rem, all of it in Bootzy. It's dense — deliberately so, it's the page's big
display moment — but it's the one place where the face is doing more work than
it was designed for, and it's worth a look on a real screen before the pitch.

If it reads as noise rather than emphasis:

```css
.pin__text { font-family: var(--sans); font-weight: 400; }
```

The serif italic on "generous" stays either way.
