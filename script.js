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
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802301/Vn01_j4ezuf.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802303/Vn02_fmafzv.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802304/Vn04_be6hrz.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802304/Vn03_ooikux.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802306/Vn05_qo5grz.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802309/Vn06_q1uqnj.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802310/Vn07_fkkiha.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802311/Vn09_wojqig.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802311/Vn08_hgtwko.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802312/Vn10_g2xer4.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802315/Vn103_lon7m8.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802316/Vn104_ebukod.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802318/Vn105_d7oze8.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802319/Vn11_hfrvwt.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802321/Vn12_pjesut.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802322/Vn13_anxn2s.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802322/Vn14_hm6pzm.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802324/Vn15_ougxsw.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802326/Vn16_jfhyhm.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802327/Vn17_suhmtc.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802329/Vn18_oq3b8s.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802331/Vn19_dnqkfk.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802331/Vn20_xbdwvr.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802333/Vn21_joittj.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802335/Vn22_dgdqgw.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802336/Vn23_easl3n.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802337/Vn24_kzbwxt.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802339/Vn25_zkzmbg.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802340/Vn26_zbmtly.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802341/Vn27_lbp4oi.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802342/Vn28_zy5gx9.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802344/Vn29_kxf720.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802346/Vn30_xccat4.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802348/Vn31_ga5a6i.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802350/Vn32_f79vfk.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802351/Vn33_s3g4xo.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802353/Vn34_mqzujt.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802354/Vn35_k2cjbk.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802355/Vn36_o5pvkt.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802357/Vn37_jyvusv.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802358/Vn38_vxhiu4.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802359/Vn39_hyto9g.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802361/Vn40_apjqxi.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802364/Vn41_lfgp1i.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802365/Vn42_svkzra.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802366/Vn43_iukdco.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802368/Vn44_tfga2c.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802370/Vn45_qb5gst.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802371/Vn47_g65pbx.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802373/Vn46_xkevkz.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802374/Vn48_vxf2on.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802375/Vn49_acyavf.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802378/Vn50_xy8pvd.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802379/Vn51_mf19vw.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802381/Vn52_gowzvc.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802382/Vn53_u8y00d.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802383/Vn54_dsmvid.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802385/Vn55_i3ylxd.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802386/Vn56_igsl8o.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802388/Vn57_lnacaq.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802391/Vn58_jjixyl.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802392/Vn59_yrivej.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802393/Vn60_wdzajf.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802394/Vn61_rnfmmq.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802399/Vn63_mj3qym.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802399/Vn64_y6tkgo.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802399/Vn62_qrhjed.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802401/Vn65_o35woh.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802402/Vn66_rqnnva.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802405/Vn67_pwz4vy.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802408/Vn69_ph98fk.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802408/Vn68_z7rjae.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802410/Vn70_ve05b6.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802410/Vn71_nlaycz.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802414/Vn72_towh1n.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802415/Vn73_zknuwu.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802416/Vn74_hx0fr1.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802418/Vn75_pomrxc.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802419/Vn76_yeejkg.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802423/Vn77_s5mfpb.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802425/Vn78_l1zp4r.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802425/Vn79_nncmdr.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802426/Vn80_chpf5g.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802429/Vn81_gp0vxy.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802431/Vn82_fefdqs.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802432/Vn83_o7h2ic.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802433/Vn84_aatyto.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802436/Vn85_j6ajox.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802438/Vn86_bk99f6.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802440/Vn87_hgdlg8.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802441/Vn88_doaxuv.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802442/Vn89_zzxtsy.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802444/Vn90_vocwv2.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802446/Vn91_jndtgv.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802447/Vn92_nbze6r.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802451/Vn94_qn6w3b.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802451/Vn93_bzkxpg.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802452/Vn95_ipqfy1.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802453/Vn96_bzukul.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802458/Vn97_nizhvj.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802463/Vn98_f9lrqf.jpg",
  ],
  DK: [
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802302/Dk01_om6dtw.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802301/Dk02_vtd316.jpg"
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