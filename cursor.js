/* =============================================
   CUSTOM CURSOR
   ============================================= */
const cursor = document.querySelector(".cursor");

if (cursor) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}
