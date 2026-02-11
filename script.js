// =========================
// DOM refs
// =========================
const sidebar = document.getElementById("sidebar");
const countryTitle = document.getElementById("countryTitle");
const closeBtn = document.getElementById("closeBtn");
const mapFrame = document.getElementById("mapFrame");
const content = document.querySelector(".content");

// Sidebar gallery container (NEW)
const countryGallery = document.getElementById("countryGallery");

// Lightbox (NEW)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

let selectedPath = null;

// =========================
// 1) VISITED COUNTRIES LIST
// =========================

// Best option: match SVG country codes on id="DK", id="VN", etc.
const VISITED_IDS = new Set(["DK", "VN"]);

// Alternative: match human names if your SVG uses name="Denmark", etc.
const VISITED_NAMES = new Set([]);

// =========================
// 1b) COUNTRY -> IMAGES (NEW)
// =========================
// Put your real file paths here.
// Example structure: images/vn/01.jpg etc.
const COUNTRY_IMAGES = {
  VN: [
    "images/vn/Vn01.jpg",
    "images/vn/Vn02.jpg",
    "images/vn/Vn03.jpg",
    "images/vn/Vn04.jpg",
    "images/vn/Vn05.jpg",
    "images/vn/Vn06.jpg",
    "images/vn/Vn07.jpg",
    "images/vn/Vn08.jpg",
    "images/vn/Vn09.jpg",
    "images/vn/Vn10.jpg",
    "images/vn/Vn11.jpg",
    "images/vn/Vn12.jpg",
    "images/vn/Vn13.jpg",
    "images/vn/Vn14.jpg",
    "images/vn/Vn15.jpg",
    "images/vn/Vn16.jpg",
    "images/vn/Vn17.jpg",
    "images/vn/Vn18.jpg",
    "images/vn/Vn19.jpg",
    "images/vn/Vn20.jpg",
    "images/vn/Vn21.jpg",
    "images/vn/Vn22.jpg",
    "images/vn/Vn23.jpg",
    "images/vn/Vn24.jpg",
    "images/vn/Vn25.jpg",
    "images/vn/Vn26.jpg",
    "images/vn/Vn27.jpg",
    "images/vn/Vn28.jpg",
    "images/vn/Vn29.jpg",
    "images/vn/Vn30.jpg",
    "images/vn/Vn31.jpg",
    "images/vn/Vn32.jpg",
    "images/vn/Vn33.jpg",
    "images/vn/Vn34.jpg",
    "images/vn/Vn35.jpg",
    "images/vn/Vn36.jpg",
    "images/vn/Vn37.jpg",
    "images/vn/Vn38.jpg",
    "images/vn/Vn39.jpg",
    "images/vn/Vn40.jpg",
    "images/vn/Vn41.jpg",
    "images/vn/Vn42.jpg",
    "images/vn/Vn43.jpg",
    "images/vn/Vn44.jpg",
    "images/vn/Vn45.jpg",
    "images/vn/Vn46.jpg",
    "images/vn/Vn47.jpg",
    "images/vn/Vn48.jpg",
    "images/vn/Vn49.jpg",
    "images/vn/Vn50.jpg",
    "images/vn/Vn51.jpg",
    "images/vn/Vn52.jpg",
    "images/vn/Vn53.jpg",
    "images/vn/Vn54.jpg",
    "images/vn/Vn55.jpg",
    "images/vn/Vn56.jpg",
    "images/vn/Vn57.jpg",
    "images/vn/Vn58.jpg",
    "images/vn/Vn59.jpg",
    "images/vn/Vn60.jpg",
    "images/vn/Vn61.jpg",
    "images/vn/Vn62.jpg",
    "images/vn/Vn63.jpg",
    "images/vn/Vn64.jpg",
    "images/vn/Vn65.jpg",
    "images/vn/Vn66.jpg",
    "images/vn/Vn67.jpg",
    "images/vn/Vn68.jpg",
    "images/vn/Vn69.jpg",
    "images/vn/Vn70.jpg",
    "images/vn/Vn71.jpg",
    "images/vn/Vn72.jpg",
    "images/vn/Vn73.jpg",
    "images/vn/Vn74.jpg",
    "images/vn/Vn75.jpg",
    "images/vn/Vn76.jpg",
    "images/vn/Vn77.jpg",
    "images/vn/Vn78.jpg",
    "images/vn/Vn79.jpg",
    "images/vn/Vn80.jpg",
    "images/vn/Vn81.jpg",
    "images/vn/Vn82.jpg",
    "images/vn/Vn83.jpg",
    "images/vn/Vn84.jpg",
    "images/vn/Vn85.jpg",
    "images/vn/Vn86.jpg",
    "images/vn/Vn87.jpg",
    "images/vn/Vn88.jpg",
    "images/vn/Vn89.jpg",
    "images/vn/Vn90.jpg",
    "images/vn/Vn91.jpg",
    "images/vn/Vn92.jpg",
    "images/vn/Vn93.jpg",
    "images/vn/Vn94.jpg",
    "images/vn/Vn95.jpg",
    "images/vn/Vn96.jpg",
    "images/vn/Vn97.jpg",
    "images/vn/Vn98.JPEG",
    "images/vn/Vn99.JPEG",
    "images/vn/Vn100.JPEG",
    "images/vn/Vn101.JPEG",
    "images/vn/Vn102.JPEG",
    "images/vn/Vn103.JPG",
    "images/vn/Vn104.JPG",
    "images/vn/Vn105.JPG",
  ],
  DK: [
    "Images/DK/Dk01.jpg",
    "Images/DK/Dk02.jpg"
  ],
  // Add more:
  // TH: ["images/th/01.jpg"]
};

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

function openSidebar(titleText) {
  countryTitle.textContent = titleText;

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
// 3b) Gallery + lightbox (NEW)
// =========================

function renderGalleryForCountry(code, name) {
  if (!countryGallery) return; // if you forgot to add it to HTML

  const images = (code && COUNTRY_IMAGES[code]) ? COUNTRY_IMAGES[code] : [];

  if (!images.length) {
    countryGallery.innerHTML = `<p class="hint">No photos added yet for ${name}${code ? ` (${code})` : ""}.</p>`;
    return;
  }

  const grid = document.createElement("div");
  grid.className = "gallery-grid";

  images.forEach((src) => {
    const img = document.createElement("img");
    img.className = "thumb";
    img.src = src;
    img.alt = `${name} photo`;
    img.loading = "lazy";
    img.addEventListener("click", (ev) => {
      ev.stopPropagation();
      openLightbox(src, name);
    });
    grid.appendChild(img);
  });

  countryGallery.innerHTML = "";
  countryGallery.appendChild(grid);
}

function openLightbox(src, name) {
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;
  lightboxImg.alt = `${name} enlarged photo`;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    // clicking the dark background closes
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// =========================
// 4) Map click handler
// =========================

mapFrame.addEventListener("click", (e) => {
  const path = e.target.closest("path");
  if (!path) return;

  // Debug: prints what we can read
  console.log(path.getAttribute("id"), path.getAttribute("name"));

  const name = getDisplayName(path);
  const code = getDisplayCode(path);

  // Selected highlight
  if (selectedPath) selectedPath.classList.remove("selected");
  selectedPath = path;
  selectedPath.classList.add("selected");

  openSidebar(name);
  renderGalleryForCountry(code, name);
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

// =========================
// 7) Tabs
// =========================
const tabs = document.querySelectorAll(".tab");
const views = document.querySelectorAll(".view");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    views.forEach((v) => v.classList.remove("active"));
    tabs.forEach((t) => t.classList.remove("active"));

    const el = document.getElementById(target);
    if (el) el.classList.add("active");
    tab.classList.add("active");
  });

});
