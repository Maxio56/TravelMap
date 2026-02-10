// =========================
// DOM refs
// =========================
const sidebar = document.getElementById("sidebar");
const countryTitle = document.getElementById("countryTitle");
const countryBody = document.getElementById("countryBody");
const closeBtn = document.getElementById("closeBtn");
const mapFrame = document.getElementById("mapFrame");
const content = document.querySelector(".content");

let selectedPath = null;

// =========================
// 1) VISITED COUNTRIES LIST
// =========================

// Best option: match SVG country codes on id="DK", id="VN", etc.
const VISITED_IDS = new Set([
   "DK", "VN"
]);

// Alternative: match human names if your SVG uses name="Denmark", etc.
// Leave empty if you don't use it.
const VISITED_NAMES = new Set([

]);

// =========================
// 2) Helpers to read country data
// =========================

function getCountryKey(path) {
  const group = path.closest("g");

  // Some SVGs put country id/name on <g>, not on <path>
  const id = (
    path.getAttribute("id") ||
    (group && group.getAttribute("id")) ||
    ""
  ).trim();

  const name = (
    path.getAttribute("name") ||
    (group && group.getAttribute("name")) ||
    path.getAttribute("data-name") ||
    (group && group.getAttribute("data-name")) ||
    ""
  ).trim();

  return { id, name };
}

function getDisplayName(path) {
  const group = path.closest("g");

  return (
    path.getAttribute("name") ||
    (group && group.getAttribute("name")) ||
    path.getAttribute("data-name") ||
    (group && group.getAttribute("data-name")) ||
    path.getAttribute("id") ||
    (group && group.getAttribute("id")) ||
    path.getAttribute("class") ||
    (group && group.getAttribute("class")) ||
    "Unknown country"
  );
}

function getDisplayCode(path) {
  const group = path.closest("g");
  return (
    path.getAttribute("id") ||
    (group && group.getAttribute("id")) ||
    ""
  ).trim();
}

function isVisited(path) {
  const { id, name } = getCountryKey(path);

  // Prefer IDs when you have them
  if (id && VISITED_IDS.size) return VISITED_IDS.has(id);
  if (name && VISITED_NAMES.size) return VISITED_NAMES.has(name);

  // If you filled only one set, still try both
  if (id && VISITED_IDS.has(id)) return true;
  if (name && VISITED_NAMES.has(name)) return true;

  return false;
}

function applyVisitedStyles() {
  const paths = mapFrame.querySelectorAll("svg path");
  paths.forEach((p) => {
    if (isVisited(p)) p.classList.add("visited");
    else p.classList.remove("visited");
  });
}

// =========================
// 3) Sidebar open/close
// =========================

function openSidebar(titleText, bodyText) {
  countryTitle.textContent = titleText;
  countryBody.textContent = bodyText;

  sidebar.classList.add("open");
  sidebar.setAttribute("aria-hidden", "false");
  content.classList.remove("sidebar-closed");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebar.setAttribute("aria-hidden", "true");
  content.classList.add("sidebar-closed");
}

// Start closed (recommended)
closeSidebar();

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeSidebar();
});

// =========================
// 4) Map click handler
// =========================

mapFrame.addEventListener("click", (e) => {
  const path = e.target.closest("path");
  if (!path) return;

  // Debug (keep if you want): prints what we can read
  // (This matches your edited snippet request)
  console.log(path.getAttribute("id"), path.getAttribute("name"));

  const name = getDisplayName(path);
  const code = getDisplayCode(path);

  // Selected highlight
  if (selectedPath) selectedPath.classList.remove("selected");
  selectedPath = path;
  selectedPath.classList.add("selected");

  openSidebar(
    name,
    `Placeholder text for ${name}${code ? ` (${code})` : ""}.`
  );
});

// =========================
// 5) Optional: click outside closes (only if NOT clicking map)
// =========================

document.addEventListener("click", (e) => {
  if (!sidebar.classList.contains("open")) return;

  const clickedInsideSidebar = sidebar.contains(e.target);
  const clickedOnMap = mapFrame.contains(e.target);

  // close only if you click outside both sidebar and map
  if (!clickedInsideSidebar && !clickedOnMap) closeSidebar();
});

// =========================
// 6) Init visited coloring
// =========================
applyVisitedStyles();