# Image slots

Every photo position on the site is already wired up. Drop a file into this
folder with the **exact filename below** and it appears — no HTML edits needed.
Until the file exists, the page shows a labelled placeholder in its place.

- Format: `.jpg` (use `.png` only if you need transparency — then update the
  `src` in the HTML to match).
- Images are `object-fit: cover`, so the **aspect ratio matters more than the
  exact pixel size**. Anything at or above the suggested width is fine.
- Keep each file under ~400 KB so the site stays fast on a projector's wifi.

---

## `index.html` — Landing

| Filename | Ratio | Suggested px | What it should show |
|---|---|---|---|
| `hero-studio.jpg` | 4:5 | 1200 × 1500 | The hero image, portrait. A studio/workshop moment — a model on a bench, a hand on a joint, material samples. Quiet and warm, not a product beauty shot. |
| `chauki-hero.jpg` | 16:9 | 1920 × 1080 | Chauki in a real 2BHK living room, in use. |
| `focus-01.jpg` | 1:1 | 1000 × 1000 | A compact apartment living room. |
| `focus-02.jpg` | 1:1 | 1000 × 1000 | A knock-down joinery / hardware detail, close up. |
| `focus-03.jpg` | 1:1 | 1000 × 1000 | Flat-pack carton or packed components. |

## `work.html` — Work

| Filename | Ratio | Suggested px | What it should show |
|---|---|---|---|
| `chauki-wide.jpg` | 21:9 | 2400 × 1030 | Wide banner: all three Chauki modules together. |
| `chauki-detail-01.jpg` | 1:1 | 1000 × 1000 | Powered-lift mechanism detail. |
| `chauki-detail-02.jpg` | 1:1 | 1000 × 1000 | Tessellating trapezoid module plan / top view. |
| `chauki-detail-03.jpg` | 1:1 | 1000 × 1000 | Pebble Pad seats, stacked. |
| `chauki-detail-04.jpg` | 1:1 | 1000 × 1000 | Chauki raised, in use as a dining surface. |
| `fold-and-stay.jpg` | 16:9 | 1600 × 900 | Wall-mounted fold-down desk, open, in a rented flat. |
| `nest-bed.jpg` | 16:9 | 1600 × 900 | Knock-down bed frame with under-bed drawers. |
| `monsoon-series.jpg` | 16:9 | 1600 × 900 | Folding bistro set on a small balcony. |
| `stack-and-store.jpg` | 16:9 | 1600 × 900 | Slim entryway bench + shoe rack in a narrow corridor. |
| `terrain-vases.jpg` | 16:9 | 1600 × 900 | Stepped terracotta vases and planters, nesting sizes. |
| `jharokha-mirrors.jpg` | 16:9 | 1600 × 900 | Carved mango wood jharokha mirror on a wall. |
| `craft-edit.jpg` | 16:9 | 1600 × 900 | Side table / tray with cane weave and bandhani inlay. |
| `diya-brass.jpg` | 16:9 | 1600 × 900 | Brass and ceramic tealight holders and urli bowls. |

## `about.html` — About

| Filename | Ratio | Suggested px | What it should show |
|---|---|---|---|
| `about-hero.jpg` | 21:9 | 2400 × 1030 | Wide banner: the team at work, or the studio space. |
| `culture-01.jpg` | 3:4 | 1000 × 1333 | Work culture — reserved, portrait. |
| `culture-02.jpg` | 3:4 | 1000 × 1333 | Work culture — reserved, portrait. |
| `culture-03.jpg` | 3:4 | 1000 × 1333 | Work culture — reserved, portrait. |

---

## Keeping the look consistent

If you're generating these, the deck's visual language is worth repeating in
every prompt so the set hangs together:

> Warm off-white (#F0EFEA) and periwinkle (#7A90C9) palette, deep navy accents
> (#2A3246), soft natural daylight, matte finishes, light wood and terracotta,
> Indian urban apartment context, calm editorial product photography, no
> people's faces in close-up, no text or logos in the image.

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
