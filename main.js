/* ============================================================
   MIKA PHAM — SHARED SCRIPTS
   main.js — imported by every page
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Dynamic year ── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Theme toggle ── */
  const themeToggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) document.body.classList.add("dark-mode");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });

  /* ── Custom cursor ── */
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    window.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY + "px";
    });
    window.addEventListener("mousedown", () => cursor.classList.add("click"));
    window.addEventListener("mouseup",   () => cursor.classList.remove("click"));
  }

  /* ── Smooth internal page transitions ── */
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
