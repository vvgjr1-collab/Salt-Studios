# Partner logos

The carousel on the landing page shows a logo file if one exists here, and
falls back to the typographic treatment if not. Drop a file in with the exact
name below and it appears automatically — no HTML changes.

| Filename | Brand |
|---|---|
| `godrej-interio.svg` | Godrej Interio |
| `nilkamal.svg` | Nilkamal |
| `wakefit.svg` | Wakefit |
| `durian.svg` | Durian |
| `ellementry.svg` | Ellementry |
| `nestasia.svg` | Nestasia |
| `home-centre.svg` | Home Centre |
| `chumbak.svg` | Chumbak |
| `swadesh.svg` | Swadesh Bandhani |

You don't have to add all nine. Any brand without a file keeps its type
treatment, and a mixed row still reads fine.

## What the files need to be

**SVG, with a transparent background.** This matters more than anything else
here. The carousel greys logos out with `filter: grayscale(1)` — that converts
colour to grey but does **not** remove a background. A logo supplied as a
coloured tile (like Wakefit's purple square) becomes a *grey square* sitting in
the row, which looks broken next to the others.

So: crop to the mark and wordmark only, no padding, no background rectangle. If
all you can find is a PNG on a white background, it will show as a white block
against the site's warm off-white — visible and wrong. Get the SVG.

Most of these brands expose an SVG in their site's header markup, and press or
brand-asset pages usually have proper files.

## Sizing

Logos are normalised on **height**, so width follows their natural proportion.
That is the correct approach, but it means a tall stacked logo (Chumbak's owl
above the wordmark) reads much heavier than a flat wordmark (Durian, Nestasia)
at the same height.

Tune any individual logo optically in `index.html`:

```html
<span class="mark mark--c" style="--s:0.8">
  <img src="assets/img/logos/chumbak.svg" alt="Chumbak">
  <span class="mark__label">Chumbak</span>
</span>
```

`--s` multiplies that logo's height. Use roughly `0.75`–`0.85` for stacked
logos and `1.1`–`1.25` for flat wordmarks. Adjust by eye until the row looks
evenly weighted — matching heights numerically will not look right.

If a very wide wordmark gets clipped, raise `max-width` on `.mark img` in
`assets/css/salt.css`.

## Behaviour

- Greyed to `grayscale(1)` at 45% opacity by default.
- Hovering the row dims every logo to 28%; the one under the cursor goes to
  full colour and full opacity.
- The scroll speed retimes itself after the logos load, so the loop stays
  seamless whatever mix of logos and type ends up in the row.

## One caution

These are real companies and real trademarks, and the projects attributed to
them on this site are fictional. A greyed logo wall is the standard visual
shorthand for "these are our clients," so it reads as a genuine claim of
partnership to anyone who doesn't scroll to the disclaimer. Keep the
"fictional, created for academic purposes" note visible in the footer and on
the work page, and don't reuse these screens anywhere the academic framing
isn't obvious.
