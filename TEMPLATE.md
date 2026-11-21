# Adding a page

Every page uses one stylesheet (`styles.css`) and one script (`main.js`). A new page only needs its content. Don't add a `<style>` block, `style=""` attributes or hex colors. Colors, fonts and sizes come from the BRAND.md variables at the top of `styles.css`.

## Site map

- `index.html`: hero (the name, no 3D), then work (`#work`), about strip and contact strip
- `veryfi.html`, `confidance.html`, `narbai.html`: case studies
- `about.html`, `resume.html`
- `works.html`: only redirects to `index.html#work`, so old links keep working

The nav is WORK (`index.html#work`) / ABOUT / RESUME. Mark the current page's link with `aria-current="page"`. Case studies count as WORK.

## Brand rules the CSS already handles

- **Dark pages, bright blocks.** Color only appears as blocks: project cards, case study headers, stat cards, accent cards, the next-project link and the footer. It never appears as colored text on dark.
- **Each project keeps its color.** Add `is-veryfi`, `is-confidance`, `is-narb` or `is-inscribe` to a card, case study header, stat row, accent card or next-project link. With no class, the block is cream.
- **Card ink.** Text on a project card (description, title and labels) uses a deep shade of that card's color, not black: `--veryfi-ink`, `--confidance-ink`, `--narb-ink` and `--inscribe-ink`, stored next to the card colors. The `is-*` class sets `--card-ink` along with `--card-color`, so a new project needs both. All four titles are Instrument Sans 500 with -0.045em letter-spacing. No card uses the script font.
- **Case study color placement.** The header card and next-project link use the project color. The "approach" card is always mint with a cobalt script label, and the results stat cards rotate butter → bubblegum → cream. `styles.css` sets this automatically, so don't add `is-*` classes to them.
- **Casing.** Everything renders lowercase. Anything with the `label` class renders ALL CAPS. You can type the text in any case.
- **Fonts.** Instrument Sans is used for headlines and body, Space Mono for `label` and `blurb`.
- **Script (Mrs Saint Delafield), used rarely:**
  - `script-title`: the Confidance name only, written "Confidance". Every other project name is Instrument Sans.
  - `script-label`: a one- or two-word accent on a color card, like "approach" or "after hours". Use at most 1–2 per page, never on the homepage.
- **Hover and focus.** Bubblegum (`--accent`) is the only accent color.

## Case study section order

Copy the `<head>`, `.site-header` (with `← all work`) and `.site-footer` from any case study, then follow this order:

```html
<main class="wrap">
  <!-- a. header card in the project color -->
  <section class="cs-header is-veryfi"><h1>project name</h1></section>

  <!-- b. meta row -->
  <dl class="cs-meta label label--lg">
    <div><dt>role</dt><dd>…</dd></div>
    <div><dt>timeline</dt><dd>…</dd></div>
    <div><dt>scope</dt><dd>…</dd></div>   <!-- or "team" -->
    <div><dt>tools</dt><dd>…</dd></div>
  </dl>

  <!-- c. the problem: 2–3 sentences -->
  <section class="cs-section">
    <h2 class="section-label label label--lg">the problem</h2>
    <div class="prose"><p>…</p></div>
  </section>

  <!-- d. what i did: paragraph + tags; optional script-accent card -->
  <section class="cs-section">
    <h2 class="section-label label label--lg">what i did</h2>
    <div class="split">
      <div>
        <div class="prose"><p>…</p></div>
        <div class="chips label"><span class="chip">…</span></div>
      </div>
      <aside class="accent-card">   <!-- always mint, cobalt script -->
        <span class="script-label">approach</span>
        <p class="blurb blurb--lg">…</p>
      </aside>
    </div>
  </section>

  <!-- e. results: 2–3 stat cards, right after "what i did". Real numbers only. -->
  <section class="cs-section">
    <h2 class="section-label label label--lg">results</h2>
    <div class="stats">   <!-- cards rotate butter → bubblegum → cream -->
      <div class="stat"><span class="stat-number">30%</span><span class="blurb blurb--lg">lift in organic leads</span></div>
    </div>
  </section>

  <!-- f. selected work: groups with a mono subheading. Show the best 4–6;
       give the rest class="is-extra" (a piece or a whole group) and set N. -->
  <section class="cs-section selected-work">
    <h2 class="section-label label label--lg">selected work</h2>
    <div class="work-group">
      <h3 class="sub-label label">group name</h3>
      <div class="grid grid-2">
        <div class="piece">…</div>
        <div class="piece is-extra">…</div>
      </div>
    </div>
    <button class="button label label--lg" type="button" data-see-all>see all (N)</button>
  </section>
</main>

<!-- g. next project, in that project's color -->
<a class="next-project is-confidance" href="confidance.html">
  <div class="wrap">
    <span class="label label--lg">next project →</span>
    <span class="headline script-title">Confidance</span>
  </div>
</a>
```

Then add a card to the work grid in `index.html`. Every project card is the same print-style component (see "Project card" in BRAND.md): a 3:2 color card with 3 zones, printed on `.paper` (see below).

```html
<a class="card paper is-veryfi" href="my-project.html">
  <!-- 1. top: description, then the result as the second sentence -->
  <p class="card-desc">one line about the project. 30% lift in organic leads.</p>
  <!-- 2. middle: the wordmark only (no images or graphics); may bleed off the edges -->
  <div class="card-visual">
    <h3 class="card-wordmark">project name</h3>
  </div>
  <!-- 3. bottom: role · type · years -->
  <div class="card-meta label"><span>role</span><span>type</span><span>years</span></div>
</a>
```

- **No images or graphics on cards.** The card color, the description and the wordmark carry it.
- **A project without a case study yet** uses a `<div class="card …">` instead of `<a>`, so it isn't clickable.
- **Every card title** is a plain `<h3 class="card-wordmark">` in lowercase, including confidance.

Missing info goes in as `<span class="todo">[todo: …]</span>`, which renders as a muted caps placeholder. Don't invent numbers.

## Homepage hero

Quiet and type only, with no 3D or images. The name flows into one sentence.

- **Layout:** the hero is 72vh on `--bg`, so the first project cards peek in below. The block is centered at about 45% of the hero height. The top bar is the shared `.site-header` ("MIKA PHAM" + nav in Space Mono caps), the same on every page.
- **Name:** `<h1 class="hero-name">mika phạm</h1>`, the only `<h1>` on the homepage. Be Vietnam Pro 500 (`--font-name`), because Instrument Sans has no "ạ", at `clamp(48px, 7vw, 104px)` with -0.04em letter-spacing in `--text-body`.
- **Sentence:** `.hero-sentence`, Newsreader 300 (`--font-serif`), `clamp(18px, 1.7vw, 24px)`, 1.45 line-height, `--text-muted`, max 520px wide, 18px below the name.
- **Label:** `.hero-meta`, Space Mono 11px with 0.12em letter-spacing in `--text-faint`, 24px below the sentence.
- **Down link:** `.hero-down` ("↓ selected work"), centered at the bottom. The work grid has no visible heading, so this is the only "selected work" label.
- **Motion:** on load, the name, then the sentence (+150ms), then the labels (+300ms) fade in and rise 12px over 600ms. There's no motion when reduced motion is on.
- **Phones (under 768px):** the same stack, with the sentence at most 90vw.
- **Fonts:** Be Vietnam Pro (subset to the name's letters with `&text=…`) and Newsreader load on `index.html` only. If you change the name, update the Be Vietnam Pro link too.

## Paper (`.paper`)

Add `paper` to anything that should look like a printed sheet on a dark desk. Today that's the project cards and the about-page polaroids.

- **Grain:** two SVG noise layers, a fine grain and larger, fainter fibers. They're painted behind the content and blended into the paper color with `soft-light`, so text stays crisp and contrast doesn't change. There are no image files.
- **Edges:** a faint inset shadow, so the edges read slightly darker than the center.
- **Depth:** a tight contact shadow plus a wide soft shadow.
- **Hover:** on desktop pointers only, the sheet lifts 4px, turns -1deg and its shadow grows (250ms ease). This applies to `<a class="… paper">` links and polaroids, and is off when reduced motion is on.
- **Color:** the stock is `--card-color` (set by `is-*`). Override `--paper-color` for a different stock, the way polaroids use cream.
- **Inside a polaroid,** the color `.polaroid-photo` area gets the same grain.

## Building blocks

| Need | Markup |
| --- | --- |
| Mono label (ALL CAPS) | `class="label"`; `label--lg` for 13px; add `muted` for grey |
| Mono blurb (lowercase) | `class="blurb"`; `blurb--lg` for 14px |
| Body text | `<div class="prose"><p>…</p></div>`; `lede` for larger statement text |
| Section headline | `<h1 class="headline">` (600, -0.03em) |
| Grids | `grid grid-2` / `grid grid-3` (collapse on smaller screens) |
| Image or video frame | `<div class="media">…</div>`; `media--16x9` for a 16:9 video; `media--poster` for a 3:4 poster |
| Linked thumbnail | `<a class="media" href="…" target="_blank"><img …></a>` |
| YouTube | `<div class="media embed-16x9"><iframe …></iframe></div>` |
| LinkedIn post | `<div class="media embed-tall embed-tall--post"><iframe …></iframe></div>` |
| Spline scene | `<div class="media embed-scene"><spline-viewer url="…"></spline-viewer></div>` plus the Spline script in `<head>` (see `veryfi.html`) |
| Highlight an important phrase | `<mark>…</mark>` (muted bubblegum block; use sparingly, one or two per section) |
| Highlight a phrase on a polaroid | `<strong>` or `<mark>` inside a polaroid renders as a tonal highlight (a deeper band of the card's color behind the normal text color), not bold |
| Tags / tools | `<div class="chips label"><span class="chip">…</span></div>` |
| Homepage-style strip | `<section class="strip">` with a `label` heading and content |
| Button | `<a class="button label label--lg">` |

## Scripts

`main.js` fades the page out when you follow an internal `.html` link, fills in `<span id="year">`, and runs every SEE ALL button (`data-see-all`). `about.js` makes any `[data-draggable]` element draggable (only on screens 768px and wider); it's only loaded on the about page.

## After changing styles.css or main.js

Every page links them as `styles.css?v=16` and `main.js?v=16`. Raise the number on every page, for example to `?v=17`, when you change either file. Otherwise visitors whose browser cached the old file will keep seeing it for up to 10 minutes after a deploy.

## Polaroids (about page)

A polaroid is a cream frame with a project-color "photo" area and a caption strip. Pick the inside color with an `is-*` class (no class = cream).

```html
<figure class="polaroid paper is-narb" data-draggable data-polaroid="interests">
  <div class="polaroid-photo">
    <h3 class="polaroid-title">off the clock</h3>   <!-- optional: Instrument Sans 500 in the polaroid's ink color -->
    <p class="blurb blurb--lg">…</p>
  </div>
  <figcaption class="polaroid-caption label">interests_hobbies</figcaption>
</figure>
```

- `data-draggable` lets visitors drag it. While held it straightens and comes to the front, then settles back to its tilt.
- On the desk, `data-polaroid="…"` sets its spot, width and tilt in `styles.css` (section 11). To add one, give it a new name and add a line next to the others. Keep the about_mika text uncovered on load.
- Under 1180px the desk turns into a wrapped row; under 768px polaroids stack in one column and dragging is off.
- Links inside a polaroid stay clickable (dragging starts only off links).
