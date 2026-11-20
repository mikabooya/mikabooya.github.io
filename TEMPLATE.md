# Adding a page

Every page uses one stylesheet (`styles.css`) and one script (`main.js`). A new page only needs its content. Don't add a `<style>` block, `style=""` attributes or hex colors. Colors, fonts and sizes come from the BRAND.md variables at the top of `styles.css`.

## Site map

- `index.html`: hero, then work (`#work`), about strip and contact strip
- `veryfi.html`, `confidance.html`, `narbai.html`: case studies
- `about.html`, `resume.html`
- `works.html`: only redirects to `index.html#work`, so old links keep working

The nav is WORK (`index.html#work`) / ABOUT / RESUME. Mark the current page's link with `aria-current="page"`. Case studies count as WORK.

## Brand rules the CSS already handles

- **Dark pages, bright blocks.** Color only appears as blocks: project cards, case study headers, stat cards, accent cards, the next-project link and the footer. It never appears as colored text on dark.
- **Each project keeps its color.** Add `is-veryfi`, `is-confidance`, `is-narb` or `is-inscribe` to a card, case study header, stat row, accent card or next-project link. With no class, the block is cream.
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
      <aside class="accent-card is-veryfi">
        <span class="script-label">approach</span>
        <p class="blurb blurb--lg">…</p>
      </aside>
    </div>
  </section>

  <!-- e. results: 2–3 stat cards, right after "what i did". Real numbers only. -->
  <section class="cs-section">
    <h2 class="section-label label label--lg">results</h2>
    <div class="stats is-veryfi">
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

Then add a card to the work grid in `index.html`. Every project card is the same print-style component (see "Project card" in BRAND.md): a flat 3:2 color card with 3 zones and no tilt or shadow.

```html
<a class="card is-veryfi" href="my-project.html">
  <!-- 1. top: description, then the result as the second sentence -->
  <p class="card-desc">one line about the project. 30% lift in organic leads.</p>
  <!-- 2. middle: wordmark (+ optional riso image or doodle); may bleed off the edges -->
  <div class="card-visual">
    <img class="riso" src="card-my-project.jpg" alt="" loading="lazy" />
    <h3 class="card-wordmark">project name</h3>
  </div>
  <!-- 3. bottom: role · type · years -->
  <div class="card-meta label"><span>role</span><span>type</span><span>years</span></div>
</a>
```

- **The riso image (`.riso`)** turns any photo grey and multiplies it into the card color. Crop out headline text first; `card-veryfi.jpg` is an example, cut from a case study thumbnail.
- **A project without a case study yet** uses a `<div class="card …">` instead of `<a>`, so it isn't clickable.
- **Confidance** is the only card whose wordmark uses the script: `<h3 class="card-wordmark script-title">Confidance</h3>`.

Missing info goes in as `<span class="todo">[todo: …]</span>`, which renders as a muted caps placeholder. Don't invent numbers.

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
| Tags / tools | `<div class="chips label"><span class="chip">…</span></div>` |
| Homepage-style strip | `<section class="strip">` with a `label` heading and content |
| Button | `<a class="button label label--lg">` |

## Scripts

`main.js` fades the page out when you follow an internal `.html` link, fills in `<span id="year">`, and runs every SEE ALL button (`data-see-all`). `about.js` makes any `[data-draggable]` element draggable; it's only loaded on the about page.

## After changing styles.css or main.js

Every page links them as `styles.css?v=4` and `main.js?v=4`. Raise the number on every page, for example to `?v=5`, when you change either file. Otherwise visitors whose browser cached the old file will keep seeing it for up to 10 minutes after a deploy.
