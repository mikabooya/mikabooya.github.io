/* =============================================
   THEME TOGGLE (Light/Dark Mode)
   ============================================= */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme preference
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  body.classList.add("dark-mode");
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const theme = body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});
