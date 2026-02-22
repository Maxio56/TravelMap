// =========================
// DOM refs
// =========================
const sidebar = document.getElementById("sidebar");
const countryTitle = document.getElementById("countryTitle");
const closeBtn = document.getElementById("closeBtn");
const mapFrame = document.getElementById("mapFrame");
const content = document.querySelector(".content");

// Sidebar gallery container
const countryGallery = document.getElementById("countryGallery");

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

let selectedPath = null;

// =========================
// 1) VISITED COUNTRIES LIST
// =========================
const VISITED_IDS = new Set(["DK", "VN"]);
const VISITED_NAMES = new Set([]);

// =========================
// 1b) COUNTRY -> IMAGES
// =========================
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
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758089/b9d7f929-6091-4a64-8ca6-e0294adca4e0_hxskyp.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758090/7ad4da95-9167-4556-80ba-02c382818250_q7v6ml.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758091/IMG_8238_vyn8y8.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758091/cf23a13b-b833-4b1a-87f9-cee39fa84d4d_glesri.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758092/IMG_8237_dptk4z.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758093/IMG_8236_w6kefi.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758094/IMG_8235_zwj5xj.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758095/IMG_8232_ubt6n9.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758096/IMG_8231_uyjuqg.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758097/IMG_8230_aircnd.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758098/IMG_8227_ruzqku.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758090/0eb721a6-c072-400c-8693-dc55e9cfc1f7_sxq5os.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1771758103/IMG_8174_hdypri.jpg",
  ],
  DK: [
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802302/Dk01_om6dtw.jpg",
    "https://res.cloudinary.com/dvmh2wjrj/image/upload/v1770802301/Dk02_vtd316.jpg",
  ],
};

// =========================
// 2) Helpers to read country data
// =========================
function getCountryKey(el) {
  const group = el.closest("g");

  const id = (
    el.getAttribute("id") ||
    (group && group.getAttribute("id")) ||
    ""
  ).trim();

  const name = (
    el.getAttribute("name") ||
    (group && group.getAttribute("name")) ||
    el.getAttribute("data-name") ||
    (group && group.getAttribute("data-name")) ||
    ""
  ).trim();

  return { id, name };
}

function getDisplayName(el) {
  const group = el.closest("g");
  return (
    el.getAttribute("name") ||
    (group && group.getAttribute("name")) ||
    el.getAttribute("data-name") ||
    (group && group.getAttribute("data-name")) ||
    el.getAttribute("id") ||
    (group && group.getAttribute("id")) ||
    el.getAttribute("class") ||
    (group && group.getAttribute("class")) ||
    "Unknown country"
  );
}

function getDisplayCode(el) {
  const group = el.closest("g");
  return (el.getAttribute("id") || (group && group.getAttribute("id")) || "").trim();
}

function isVisited(el) {
  const { id, name } = getCountryKey(el);

  if (id && VISITED_IDS.size) return VISITED_IDS.has(id);
  if (name && VISITED_NAMES.size) return VISITED_NAMES.has(name);

  if (id && VISITED_IDS.has(id)) return true;
  if (name && VISITED_NAMES.has(name)) return true;

  return false;
}

function applyVisitedStyles() {
  const shapes = mapFrame.querySelectorAll("svg path, svg polygon");
  shapes.forEach((s) => {
    if (isVisited(s)) s.classList.add("visited");
    else s.classList.remove("visited");
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

closeSidebar();

if (closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeSidebar();
  });
}

// =========================
// 3b) Gallery + lightbox
// =========================
function renderGalleryForCountry(code, name) {
  if (!countryGallery) return;

  const images = code && COUNTRY_IMAGES[code] ? COUNTRY_IMAGES[code] : [];

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
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// =========================
// 5) Click outside closes sidebar
// =========================
document.addEventListener("click", (e) => {
  if (!sidebar || !sidebar.classList.contains("open")) return;

  const clickedInsideSidebar = sidebar.contains(e.target);
  const clickedOnMap = mapFrame && mapFrame.contains(e.target);

  if (!clickedInsideSidebar && !clickedOnMap) closeSidebar();
});

// =========================
// 0) SVG PAN + ZOOM (fixed)
// =========================
let svgEl = null;
let viewportG = null;

const view = {
  scale: 1,
  x: 0,
  y: 0,
  minScale: 1,
  maxScale: 8,
};

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function applyTransform() {
  if (!viewportG) return;
  viewportG.setAttribute(
    "transform",
    `translate(${view.x} ${view.y}) scale(${view.scale})`
  );
}

function ensureViewportGroup(svg) {
  let g = svg.querySelector("#viewport");
  if (g) return g;

  g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", "viewport");

  while (svg.firstChild) g.appendChild(svg.firstChild);
  svg.appendChild(g);

  return g;
}

function resetMapView(animated = true) {
  const target = { scale: 1, x: 0, y: 0 };

  if (!animated) {
    view.scale = target.scale;
    view.x = target.x;
    view.y = target.y;
    applyTransform();
    return;
  }

  const steps = 12;
  const s0 = view.scale,
    x0 = view.x,
    y0 = view.y;

  let i = 0;
  const tick = () => {
    i++;
    const t = i / steps;
    view.scale = s0 + (target.scale - s0) * t;
    view.x = x0 + (target.x - x0) * t;
    view.y = y0 + (target.y - y0) * t;
    applyTransform();
    if (i < steps) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Robust “what shape did the user click” (works even with pointer capture)
function getShapeFromEvent(e) {
  // normal case
  let el = e.target;
  let shape = el && el.closest ? el.closest("path, polygon") : null;
  if (shape) return shape;

  // fallback: ask browser what is under cursor
  const hit = document.elementFromPoint(e.clientX, e.clientY);
  shape = hit && hit.closest ? hit.closest("path, polygon") : null;
  return shape;
}

function initSvgPanZoom() {
  svgEl = mapFrame ? mapFrame.querySelector("svg") : null;
  if (!svgEl) return;

  viewportG = ensureViewportGroup(svgEl);

  if (!svgEl.getAttribute("viewBox")) {
    const bbox = viewportG.getBBox();
    svgEl.setAttribute(
      "viewBox",
      `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
    );
  }

  resetMapView(false);

  // Convert client coords to SVG coords
  function svgPoint(clientX, clientY) {
    const pt = svgEl.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const inv = svgEl.getScreenCTM().inverse();
    return pt.matrixTransform(inv);
  }

  // ---- PAN: capture only after drag (so clicks still target shapes) ----
  let start = null;
  let moved = false;
  let captured = false;
  const DRAG_THRESHOLD = 6;

  svgEl.addEventListener("pointerdown", (e) => {
    moved = false;
    captured = false;

    start = {
      pointerId: e.pointerId,
      x: view.x,
      y: view.y,
      startClientX: e.clientX,
      startClientY: e.clientY,
      p: svgPoint(e.clientX, e.clientY),
    };
  });

  svgEl.addEventListener("pointermove", (e) => {
    if (!start || e.pointerId !== start.pointerId) return;

    const dxClient = e.clientX - start.startClientX;
    const dyClient = e.clientY - start.startClientY;

    if (!moved && Math.hypot(dxClient, dyClient) > DRAG_THRESHOLD) {
      moved = true;
      if (!captured) {
        svgEl.setPointerCapture(e.pointerId);
        captured = true;
      }
    }

    if (!moved) return;

    const pNow = svgPoint(e.clientX, e.clientY);
    const dx = pNow.x - start.p.x;
    const dy = pNow.y - start.p.y;

    view.x = start.x + dx;
    view.y = start.y + dy;
    applyTransform();
  });

  svgEl.addEventListener("pointerup", () => {
    start = null;
    moved = false;
    captured = false;
  });

  svgEl.addEventListener("pointercancel", () => {
    start = null;
    moved = false;
    captured = false;
  });

  // ---- WHEEL ZOOM (desktop) ----
  svgEl.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const mouse = svgPoint(e.clientX, e.clientY);

      const zoomDir = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = clamp(view.scale * zoomDir, view.minScale, view.maxScale);

      view.x = view.x + (mouse.x - mouse.x * (newScale / view.scale));
      view.y = view.y + (mouse.y - mouse.y * (newScale / view.scale));
      view.scale = newScale;

      applyTransform();
    },
    { passive: false }
  );

  // ---- CLICK: open sidebar/gallery (use robust hit-test) ----
  svgEl.addEventListener("click", (e) => {
    const shape = getShapeFromEvent(e);
    if (!shape) return;

    const name = getDisplayName(shape);
    const code = getDisplayCode(shape);

    if (selectedPath) selectedPath.classList.remove("selected");
    selectedPath = shape;
    selectedPath.classList.add("selected");

    // optional: zoom reset on click (you wanted this earlier)
    resetMapView(true);

    openSidebar(name);
    renderGalleryForCountry(code, name);
  });
}

// =========================
// 6) Init
// =========================
initSvgPanZoom();
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

// If you still have any elements with class .home-btn, keep this.
document.querySelectorAll(".home-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;

    views.forEach((v) => v.classList.remove("active"));
    tabs.forEach((t) => t.classList.remove("active"));

    document.getElementById(target)?.classList.add("active");
    document
      .querySelector(`.tab[data-target="${target}"]`)
      ?.classList.add("active");
  });
});

// Generic data-target navigation (bubbles etc.)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-target]");
  if (!btn) return;

  const target = btn.dataset.target;
  const viewEl = document.getElementById(target);
  if (!viewEl) return;

  views.forEach((v) => v.classList.remove("active"));
  tabs.forEach((t) => t.classList.remove("active"));
  viewEl.classList.add("active");

  const matchingTab = [...tabs].find((t) => t.dataset.target === target);
  if (matchingTab) matchingTab.classList.add("active");
});

// =========================
// ITINERARY: LOCAL TIME (NEW)
// =========================
function initItineraryClocks() {
  const cards = document.querySelectorAll("#view-itinerary .trip-card[data-tz]");
  if (!cards.length) return;

  // Create per-timezone formatters (faster than recreating each tick)
  const formatters = new Map();
  cards.forEach(card => {
    const tz = card.dataset.tz;
    if (!tz || formatters.has(tz)) return;

    formatters.set(tz, new Intl.DateTimeFormat(undefined, {
      timeZone: tz,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }));
  });

  function tick() {
    const now = new Date();
    cards.forEach(card => {
      const tz = card.dataset.tz;
      const span = card.querySelector(".local-time");
      const fmt = formatters.get(tz);
      if (!span || !fmt) return;

      span.textContent = fmt.format(now);
    });
  }

  tick();
  setInterval(tick, 1000);
}

initItineraryClocks();