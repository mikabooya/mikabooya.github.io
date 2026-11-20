/* ============================================================
   MIKA PHAM — SHARED SCRIPTS
   main.js — loaded by every page.
   Page-specific behavior lives in its own file (e.g. about.js).
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Dynamic year: fills any <span id="year"> ── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── SEE ALL toggle for case study "selected work" ──
     <section class="selected-work"> … items with class "is-extra" …
     <button class="button label" data-see-all>see all (N)</button> */
  document.querySelectorAll("[data-see-all]").forEach((btn) => {
    const section = btn.closest(".selected-work");
    const moreText = btn.textContent;
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", () => {
      const open = section.classList.toggle("is-expanded");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "show less" : moreText;
    });
  });

  /* ── Smooth exit when following an internal .html link ── */
  document.querySelectorAll('a[href*=".html"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (link.target === "_blank" || !href || href.startsWith("http")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let new-tab clicks through
      e.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(() => { window.location.href = href; }, 300);
    });
  });

});
