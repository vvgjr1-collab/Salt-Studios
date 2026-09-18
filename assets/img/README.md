# Images

## Brand assets (already in place)

| File | Used by |
|---|---|
| `logomark.svg` | Header and footer marks on all three pages |
| `favicon.svg` | Browser tab icon |

`logomark.svg` is cropped to the mark's bounding box (`viewBox="611 281 280.8
469.7"`, aspect ratio 0.598) and filled with the brand ink `#2A3246`. The
footer forces it to white with `filter: brightness(0) invert(1)`, so the fill
colour can change without breaking the dark version.

It came from a Vectorizer.io auto-trace, which arrived with a full-canvas
white background plate and 92% empty margin — both removed. If you ever have
the original Illustrator or Figma vector, re-export from that instead: an
auto-trace approximates curves, and at large sizes (a poster, a pull-up
banner) the difference shows.

---

# Photo slots

Every photo position on the site is already wired up. Drop a file into this
folder with the **exact filename below** and it appears — no HTML edits needed.
Until the file exists, the page shows a labelled placeholder in its place.

- Format: `.jpg` (use `.png` only if you need transparency — then update the
  `src` in the HTML to match). **Don't ship PNG photographs** — the three
  focus renders arrived as PNG totalling 5.5 MB and came out at 390 KB as
  JPEG at quality 82: a 93% saving with no visible difference.
- Images are `object-fit: cover`, so the **aspect ratio matters more than the
  exact pixel size**. Anything at or above the suggested width is fine.
- Keep each file under ~400 KB so the site stays fast on a projector's wifi.

---

## `index.html` — Landing

| Filename | Ratio | Suggested px | What it should show | Status |
|---|---|---|---|---|
| `hero-studio.jpg` | 4:5 | 1080 × 1350 | Brand image: lounge chair with the logomark overlaid, figure in motion blur. Exact 4:5, copied without re-encoding. | ✅ |
| `chauki-hero.jpg` | 16:9 | 1376 × 768 | Chauki in a real 2BHK living room, in use. | ✅ |
| `focus-01.jpg` | 3:4 | 1200 × 1600 | Oxblood bench, studio mark cut into the pivot. | ✅ |
| `focus-02.jpg` | 3:4 | 1200 × 1600 | Armchair, leather armrest cover with the mark on a wooden medallion. | ✅ |
| `focus-03.jpg` | 3:4 | 1200 × 1600 | Armchair arm, walnut cap with travertine inlay. | ✅ |

| `brand-01.jpg` | 4:5 src | 1080 × 1350 | Brand band: oxblood armchair, mark overlaid. | ✅ |
| `brand-02.jpg` | 4:5 src | 1080 × 1350 | Brand band: dark leather swivel chair, mark overlaid. | ✅ |

The **brand band** sits between the pinned statement and the pillars. It is
full-bleed and crops its 4:5 sources to 4:3 at every width (two squares came
out 681px tall on desktop and swallowed the viewport; portrait frames on a
phone made the top of the page slow to get through, with the hero image now
showing there too). On phones it becomes a swipeable scroll-snap row. A third frame would make it a proper triptych — add a
`.band__item` in index.html and switch `grid-template-columns` to
`repeat(3, 1fr)` in salt.css.

The focus trio were changed from 1:1 to **3:4** — the supplied renders are all
portrait product details, and a square crop was cutting them badly (the
tallest is 9:16, so a square would have lost nearly half its height).

## `work.html` — Work

| Filename | Ratio | Suggested px | What it should show | Status |
|---|---|---|---|---|
| `chauki-wide.jpg` | 21:9 | 2400 × 1030 | Wide banner: all three Chauki modules together. | ⏳ |
| `chauki-detail-01.jpg` | 1:1 | 1000 × 1000 | Powered-lift mechanism detail. | ⏳ |
| `chauki-detail-02.jpg` | 1:1 | 1000 × 1000 | Tessellating trapezoid module plan / top view. | ⏳ |
| `chauki-detail-03.jpg` | 1:1 | 1000 × 1000 | Pebble Pad seats, stacked. | ⏳ |
| `chauki-detail-04.jpg` | 1:1 | 1000 × 1000 | Chauki raised, in use as a dining surface. | ⏳ |
| `fold-and-stay.jpg` | 16:9 | 1600 × 900 | Wall-mounted fold-down desk, open, in a rented flat. | ✅ |
| `nest-bed.jpg` | 16:9 | 1600 × 900 | Knock-down bed frame with under-bed drawers. | ✅ |
| `monsoon-series.jpg` | 16:9 | 1600 × 900 | Folding bistro set on a small balcony. | ✅ |
| `stack-and-store.jpg` | 16:9 | 1600 × 900 | Slim entryway bench + shoe rack in a narrow corridor. | ✅ |
| `terrain-vases.jpg` | 16:9 | 1600 × 900 | Stepped terracotta vases and planters, nesting sizes. | ✅ |
| `jharokha-mirrors.jpg` | 16:9 | 1600 × 900 | Carved mango wood jharokha mirror on a wall. | ✅ |
| `craft-edit.jpg` | 16:9 | 1600 × 900 | Side table / tray with cane weave and bandhani inlay. | ✅ |
| `diya-brass.jpg` | 16:9 | 1600 × 900 | Brass and ceramic tealight holders and urli bowls. | ✅ |

## `about.html` — About

| Filename | Ratio | Suggested px | What it should show |
|---|---|---|---|
| `about-hero.jpg` | 21:9 | 2400 × 1030 | Wide banner: the team at work, or the studio space. |
| `culture-01.jpg` | 3:4 | 1200 × 1600 | The team section. Studio life — a review in progress, a desk mid-work, people talking over a model. Not posed headshots. |
| `culture-02.jpg` | 3:4 | 1200 × 1600 | As above — vary the scale: one wide-ish room shot, one pair of hands, one over-the-shoulder. |
| `culture-03.jpg` | 3:4 | 1200 × 1600 | As above. |

---

## Keeping the look consistent

The hardest part of eight separate generations is making them read as one
catalogue. Three rules matter more than the wording of any single prompt:

1. **Generate them in one sitting**, same tool, same settings. Style drifts
   between sessions.
2. **Reuse the style block below verbatim** at the end of every prompt.
3. **Pick one register and hold it.** Right now `chauki-hero.jpg` is bright
   lifestyle-in-context while the three `focus-*` shots are dark, moody studio
   product photography. Both are good, but they're two different catalogues.
   For the eight product cards, go with **lifestyle-in-context** — it matches
   what the copy claims (built for how India actually lives) and the moody
   detail shots then read as deliberate punctuation rather than a clash.

### Style block — paste at the end of every prompt

> photorealistic editorial furniture catalogue photography, soft diffused
> afternoon daylight, warm neutral palette of off-white #F0EFEA and sand,
> teak and walnut wood, matte finishes, Indian urban apartment, lived-in but
> uncluttered, 35mm, natural shadows, subtle film grain, no text, no logos,
> no watermarks, no people's faces, 16:9

---

## Catalogue prompts — `work.html`

> **All eight of these have been generated and placed.** Kept for reference,
> and in case any need regenerating for consistency.

All eight are **16:9**, target 1600 × 900. Filenames are in the work.html
table above.

**`fold-and-stay.jpg`** — Nilkamal, 2024
> A wall-mounted fold-down study desk in a small rented Indian apartment
> bedroom, worktop folded open with a laptop and a stack of books, slim
> integrated shelf above holding files and a small plant, pale plastered wall,
> four visible wall fixings, morning light from a window to the left

**`nest-bed.jpg`** — Wakefit, 2023
> A low knock-down engineered-wood bed frame in a compact Indian bedroom, one
> under-bed storage drawer pulled halfway open showing folded linen, plain
> cotton bedding in oatmeal, bare wall behind, soft daylight, a flat-pack
> carton leaning against the wall out of focus

**`monsoon-series.jpg`** — Durian, 2023
> A folding bistro set of powder-coated steel and weather-treated rope on a
> narrow apartment balcony during the monsoon, rain-wet railing, grey-green
> light, potted plants, a stackable rope lounger folded against the wall,
> water beading on the steel frame

**`stack-and-store.jpg`** — Home Centre, 2022
> A slim 30 cm deep entryway unit in a narrow Indian apartment corridor,
> combining a shoe rack, a bench seat and key hooks, two pairs of sandals
> below, a set of keys on the hook, warm light from a doorway, tiled floor

**`terrain-vases.jpg`** — Ellementry, 2024
> A group of five stepped terracotta and stoneware vessels in nesting sizes,
> layered horizontal forms inspired by salt pans and farmland terraces,
> arranged on a pale plaster surface, one holding dried grasses, warm raking
> afternoon light casting long soft shadows

**`jharokha-mirrors.jpg`** — Nestasia, 2023
> A carved mango wood wall mirror reinterpreting a traditional jharokha window
> in a slim modern profile, hung on a warm off-white wall in a small Indian
> living room, reflecting a sunlit window, a low console beneath with a brass
> bowl, soft shadows

**`craft-edit.jpg`** — Swadesh Bandhani cluster, 2024
> A small side table combining CNC-cut wood with a handwoven cane top and
> bandhani-inspired inlay detail, beside a matching serving tray, in a warm
> Indian living room, close three-quarter view showing the cane weave and
> inlay pattern, soft daylight

**`diya-brass.jpg`** — Chumbak, 2022
> Brass and ceramic tealight holders and a shallow brass urli bowl filled with
> water and floating marigolds, arranged on a dark wood console against a warm
> plastered wall, a few lit tealights, warm low light, festive but restrained,
> not overtly Diwali-themed

### After generating

Don't drop raw exports into the repo. Give the files to Claude with their
paths and they'll be resized, converted to progressive JPEG and compressed —
the three focus renders went from 5.5 MB to 390 KB that way, with no visible
difference.

## Adding a new slot

Copy this pattern into any page — the placeholder and the reveal animation
come along automatically:

```html
<figure class="slot slot--wide">
  <img src="assets/img/your-file.jpg" alt="Describe the photo">
</figure>
```

Ratio classes: `slot--wide` (16:9), `slot--square` (1:1), `slot--tall` (3:4),
`slot--hero` (4:5), `slot--pano` (21:9). Add `reveal reveal--media` to the
`<figure>` for the fade-and-rise on scroll.
