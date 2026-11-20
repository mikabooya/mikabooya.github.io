/* ============================================================
   MIKA PHAM — SHARED SCRIPTS
   main.js — loaded by every page except index.html.
   Page-specific behavior lives in its own file (e.g. about.js).
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Dynamic year: fills any <span id="year"> ── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Theme toggle: saved choice, else the system setting ── */
  const themeToggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) document.body.classList.add("dark-mode");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });

  /* ── Smooth exit when following an internal .html link ── */
  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (link.target === "_blank" || !href || href.startsWith("http")) return;
      e.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(() => { window.location.href = href; }, 300);
    });
  });

});
