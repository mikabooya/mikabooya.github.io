# Adding a page

Every page uses one stylesheet (`styles.css`) and one script (`main.js`). A new page only needs its content. Don't add a `<style>` block, `style=""` attributes or hex colors. Colors, fonts and sizes come from the BRAND.md variables at the top of `styles.css`.

## Brand rules the CSS already handles

- **Dark pages, bright blocks.** Color only appears as blocks: cards, case study headers, the next-project link and the footer. It never appears as colored text on dark.
- **Each project keeps its color.** Add `is-veryfi`, `is-confidance`, `is-narb` or `is-inscribe` to a card, case study header or next-project link. With no class, the block is cream.
- **Casing.** Everything renders lowercase. Anything with the `label` class renders ALL CAPS. You can type the text in any case.
- **Fonts.** Instrument Sans is used for headlines and body, Space Mono for `label` and `blurb`. Mrs Saint Delafield (`script-title`) is only for the Confidance name, written as "Confidance".
- **Hover and focus.** Bubblegum (`--accent`) is the only accent color.

## Case study skeleton

Save as `my-project.html`. Copy the `<head>`, `.site-header` and `.site-footer` from any existing case study, then put this in between:

```html
<main class="wrap">
  <!-- big header card in the project's color -->
  <section class="cs-header is-veryfi">
    <dl class="cs-meta label label--lg">
      <dt>role</dt><dd>…</dd>
      <dt>timeline</dt><dd>…</dd>
      <dt>type</dt><dd>…</dd>
    </dl>
    <h1>project name</h1>
  </section>

  <section class="cs-section">
    <h2 class="section-label label label--lg">section name</h2>
    <div class="prose">
      <p>body copy, <strong>highlights</strong> in bold.</p>
    </div>
  </section>

  <section class="cs-section">
    <h2 class="section-label label label--lg">gallery</h2>
    <div class="grid grid-2">
      <div class="piece">
        <div class="media"><video src="clip.mp4" autoplay loop muted playsinline></video></div>
        <p class="caption blurb blurb--lg"><strong>title:</strong> caption.</p>
      </div>
    </div>
  </section>
</main>

<!-- link to the next project, in that project's color -->
<a class="next-project is-confidance" href="confidance.html">
  <div class="wrap">
    <span class="label label--lg">next project →</span>
    <span class="headline">confidance</span>
  </div>
</a>
```

On a case study, the header shows `← all work` between the logo and the nav. On a regular page, leave that link out and add `aria-current="page"` to the current nav link.

Then add a card for it on `index.html` and `works.html`:

```html
<a class="card is-veryfi" href="my-project.html">
  <p class="blurb">one line about the project.</p>
  <h3 class="card-title">project name</h3>
  <div class="card-meta label"><span>role</span><span>type</span><span>year</span></div>
</a>
```

Cards tilt and stagger automatically, and turn flat and stacked on phones.

## Building blocks

| Need | Markup |
| --- | --- |
| Page title (non-project pages) | `<div class="page-header"><h1 class="headline">…</h1></div>` |
| Mono label (ALL CAPS) | `class="label"`; `label--lg` for 13px; add `muted` for grey |
| Mono blurb (lowercase) | `class="blurb"`; `blurb--lg` for 14px |
| Body text | `<div class="prose"><p>…</p></div>` |
| Grids | `grid grid-2` / `grid grid-3` (collapse on smaller screens); `stack` for vertical spacing |
| Image or video frame | `<div class="media">…</div>`; `media--16x9` for a 16:9 video; `media--poster` for a 3:4 poster |
| Linked thumbnail | `<a class="media" href="…" target="_blank"><img …></a>` |
| YouTube | `<div class="media embed-16x9"><iframe …></iframe></div>` |
| LinkedIn post | `<div class="media embed-tall embed-tall--post"><iframe …></iframe></div>` |
| Spline scene | `<div class="media embed-scene"><spline-viewer url="…"></spline-viewer></div>` plus the Spline script in `<head>` (see `veryfi.html`) |
| Tags / tools | `<div class="chips label"><span class="chip">…</span></div>` |
| macOS window panel | `.window` › `.window-header` (`.window-controls` with three `.window-dot dot-red/dot-yellow/dot-green`, then `.window-title label`) › `.window-content` |

## Scripts

`main.js` fades the page out when you follow an internal `.html` link and fills in `<span id="year">`. Behavior for a single page goes in its own file, loaded after `main.js`. For example, `about.js` runs the draggable windows on the about page.
