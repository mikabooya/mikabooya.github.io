/* ============================================================
   about.js — makes the photo card on about.html draggable.
   Loaded after main.js. Works on any element with [data-draggable]:
   the offset is written to --drag-x / --drag-y, which the card's
   CSS transform reads (keeping its tilt).
   ============================================================ */

document.querySelectorAll("[data-draggable]").forEach((card) => {
  let startX = 0, startY = 0, x = 0, y = 0, dragging = false;

  card.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX - x;
    startY = e.clientY - y;
    card.setPointerCapture(e.pointerId);
    card.classList.add("is-dragging");
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

  const stop = () => { dragging = false; card.classList.remove("is-dragging"); };
  card.addEventListener("pointerup", stop);
  card.addEventListener("pointercancel", stop);
});
