/* ============================================================
   about.js — draggable polaroids on about.html.
   Loaded after main.js. Works on any element with [data-draggable]:
   the offset is written to --drag-x / --drag-y, which the polaroid's
   CSS transform reads (keeping its --tilt). While held, the polaroid
   comes to the front and straightens (.is-dragging), then settles back.
   Dragging is off under 768px, where the polaroids stack.
   ============================================================ */

const canDrag = window.matchMedia("(min-width: 768px)");
let topZ = 10;

document.querySelectorAll("[data-draggable]").forEach((card) => {
  let startX = 0, startY = 0, x = 0, y = 0, dragging = false;

  card.addEventListener("pointerdown", (e) => {
    if (!canDrag.matches) return;
    if (e.button !== 0) return;
    if (e.target.closest("a")) return;   // let links (socials) stay clickable

    dragging = true;
    startX = e.clientX - x;
    startY = e.clientY - y;
    card.setPointerCapture(e.pointerId);
    card.classList.add("is-dragging");
    card.style.zIndex = ++topZ;
    e.preventDefault();
  });

  card.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    x = e.clientX - startX;
    y = e.clientY - startY;
    requestAnimationFrame(() => {
      card.style.setProperty("--drag-x", x + "px");
      card.style.setProperty("--drag-y", y + "px");
    });
  });

  const stop = () => {
    if (!dragging) return;
    dragging = false;
    card.classList.remove("is-dragging");
  };
  card.addEventListener("pointerup", stop);
  card.addEventListener("pointercancel", stop);
});

/* Going below 768px resets any dragged positions so the stack stays tidy */
canDrag.addEventListener("change", (e) => {
  if (e.matches) return;
  document.querySelectorAll("[data-draggable]").forEach((card) => {
    card.style.removeProperty("--drag-x");
    card.style.removeProperty("--drag-y");
    card.style.removeProperty("z-index");
  });
});
