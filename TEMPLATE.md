# Adding a new page

Every page except `index.html` shares one stylesheet (`styles.css`) and one script (`main.js`). A new page only needs its own content. Don't add a `<style>` block or `style=""` attributes. If you need something new, add a reusable class to `styles.css`.

## 1. Copy this skeleton

Save it as `my-page.html` and replace the `<!-- … -->` parts.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><!-- page name --> — mika pham</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23F644B8'/></svg>">
    <meta name="theme-color" content="#F644B8">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- "back" goes to works.html for projects, index.html otherwise -->
    <a class="back" href="works.html">← back</a>
    <header class="site-header">
      <nav class="site-nav">
        <a href="works.html">work</a>
        <a href="about.html">about</a>
        <a href="mailto:mikapham229@gmail.com">contact</a>
        <!-- copy the theme-toggle <button> from any existing page -->
      </nav>
    </header>

    <main class="wrap">
      <header class="page-header">
        <h1 class="page-title"><!-- title --></h1>
        <div class="project-meta">
          <div class="meta-item"><div class="meta-label">role</div><div class="meta-value"><!-- … --></div></div>
          <div class="meta-item"><div class="meta-label">timeline</div><div class="meta-value"><!-- … --></div></div>
          <div class="meta-item"><div class="meta-label">type</div><div class="meta-value"><!-- … --></div></div>
        </div>
      </header>

      <section class="section">
        <h2 class="section-title"><!-- section heading --></h2>
        <div class="card prose">
          <p><!-- paragraph; use <strong> for highlights --></p>
        </div>
      </section>

      <!-- more sections… -->

      <footer class="site-footer">
        <div class="footer-links">
          <a href="mailto:mikapham229@gmail.com" target="_blank">email ↗</a>
          <a href="https://www.linkedin.com/in/khanh-mika-pham/" target="_blank">linkedin ↗</a>
          <a href="https://www.instagram.com/mikaphaam/" target="_blank">instagram ↗</a>
        </div>
        <div class="credit">© <span id="year"></span> mika pham</div>
      </footer>
    </main>

    <script src="main.js"></script>
  </body>
</html>
```

To make it reachable, add a folder for it to the grid in `works.html` by copying one of the existing `<a class="folder">` blocks.

## 2. What you get for free (`main.js`)

- **Theme toggle.** Works on any button with `id="themeToggle"`. It remembers the visitor's choice and otherwise follows their system setting.
- **Page-exit fade.** Applies to every internal link ending in `.html`, except links with `target="_blank"`.
- **Current year.** Filled into `<span id="year">`.

If a page needs its own behavior, put it in its own file (like `about.js`) and load it after `main.js`.

## 3. Building blocks (`styles.css`)

| Need | Markup |
| --- | --- |
| Page width | `<main class="wrap">`. Add `wrap--narrow` (980px) or `wrap--wide` (1280px) |
| Title only, less space below | `<header class="page-header page-header--tight">` |
| Small grey line under a title | `<p class="page-hint">` |
| Text card | `<div class="card prose">` with `<p>` inside |
| Card that lifts on hover | add `hover-lift`; `card--compact` gives smaller padding |
| Grids | `grid grid-1` / `grid grid-2` / `grid grid-3` (collapse on mobile); `grid grid-tiles` for small tiles |
| Small label above a grid | `<p class="section-label">`; add `section-label--spaced` for the second one |
| Space between stacked cards | `stack-top-sm` |
| Looping video | `<div class="media"><video autoplay loop muted playsinline>…</video></div>` (`media--wide` forces 16:9) |
| YouTube | `<div class="video-embed"><iframe …></iframe></div>` |
| LinkedIn post | `<div class="embed embed--post"><iframe …></iframe></div>` |
| Spline scene | `<div class="embed embed--scene"><spline-viewer url="…"></spline-viewer></div>` and load the Spline script in `<head>` (see `veryfi.html`) |
| Linked thumbnail | `<a class="thumb" href="…" target="_blank"><img …></a>` |
| Caption under media | `<div class="caption">` |
| 3:4 poster tile | `<div class="poster"><img …></div>` inside `grid grid-3` |
| Tags | `<div class="tags"><span class="tag">…</span></div>`; `tags tags--outline` for the outlined colored style |
| Pill label | `<span class="badge">` |
| macOS window | `.window` › `.window-header` (`.window-controls` with three `.window-dot dot-red/dot-yellow/dot-green`, then `.window-title`) › `.window-content` |

## 4. Changing the look

All colors, font sizes, spacing, corner radius and widths are variables at the top of `styles.css` (`:root` and `body` / `body.dark-mode`). Change a value there and every page updates. Dark mode works automatically as long as you use the variables (`var(--ink)`, `var(--card-bg)`, `var(--stroke)` and so on) instead of fixed colors.
