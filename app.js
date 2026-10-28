// ====== Constants & state ======
const FAV_KEY = "mhv-favorites", ITEMS_KEY = "mhv-user-items", THEME_KEY = "mhv-theme";
const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#d9cfb4"/><text x="50%" y="50%" font-family="sans-serif" font-size="32" fill="#5a6a62" text-anchor="middle">Image unavailable</text></svg>');

const state = { search: "", category: "All", favoritesOnly: false, sort: "default" };

//  localStorage
function loadJSON(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : fallback;
  } catch (error) { return fallback; }
}
function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* storage unavailable */ }
}

let favorites = loadJSON(FAV_KEY, []);
let userItems = loadJSON(ITEMS_KEY, []).filter(item => item && typeof item.title === "string");
const getAllItems = () => [...catalogItems, ...userItems]; // original data stays separate

// ====== Element references ======
const $ = (id) => document.getElementById(id);
const grid = $("cards-grid"), emptyState = $("empty-state"), countEl = $("count");
const modal = $("modal");
let lastFocused = null;

// ====== Filtering + sorting (combined) ======
function getVisibleItems() {
  const query = state.search.trim().toLowerCase();
  let items = getAllItems().filter(item => {
    const text = [item.title, item.city, item.category, item.shortDescription].join(" ").toLowerCase();
    return text.includes(query)
      && (state.category === "All" || item.category === state.category)
      && (!state.favoritesOnly || favorites.includes(item.id));
  });

  const byYear = (a, b) => (a.sortYear ?? Infinity) - (b.sortYear ?? Infinity);
  if (state.sort === "az") items.sort((a, b) => a.title.localeCompare(b.title));
  if (state.sort === "za") items.sort((a, b) => b.title.localeCompare(a.title));
  if (state.sort === "oldest") items.sort(byYear);
  if (state.sort === "newest") items.sort((a, b) => (b.sortYear ?? -Infinity) - (a.sortYear ?? -Infinity));
  return items;
}

// ====== Rendering ======
function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text; // textContent = safe against HTML injection
  return el;
}
function setImage(img, src, alt) {
  img.alt = alt;
  img.loading = "lazy";
  img.addEventListener("error", () => { img.src = PLACEHOLDER; }, { once: true }); // graceful fallback
  img.src = src || PLACEHOLDER;
}

function createCard(item) {
  const card = makeEl("article", "card");
  const img = document.createElement("img");
  setImage(img, item.image, item.title + " in " + item.city);

  const fav = makeEl("button", "fav");
  fav.type = "button";
  const isFav = favorites.includes(item.id);
  fav.textContent = isFav ? "❤️" : "🤍";
  fav.setAttribute("aria-pressed", String(isFav));
  fav.setAttribute("aria-label", (isFav ? "Remove " : "Add ") + item.title + (isFav ? " from" : " to") + " favorites");
  fav.addEventListener("click", () => toggleFavorite(item.id));

  const body = makeEl("div", "card-body");
  const details = makeEl("button", "btn", "View Details");
  details.type = "button";
  details.setAttribute("aria-label", "View details for " + item.title);
  details.addEventListener("click", () => openModal(item, details));
  body.append(makeEl("span", "badge", item.category), makeEl("h3", "", item.title),
    makeEl("p", "", "📍 " + item.city), makeEl("p", "meta", item.metric),
    makeEl("p", "", item.shortDescription), details);

  card.append(img, fav, body);
  return card;
}

function renderItems(items) {
  grid.replaceChildren(); // clear old cards
  items.forEach(item => grid.appendChild(createCard(item)));
  countEl.textContent = "Showing " + items.length + " of " + getAllItems().length + " landmarks";
  emptyState.hidden = items.length > 0;
}
const update = () => renderItems(getVisibleItems());

// ====== Category chips ======
function getCategories() { return [...new Set(getAllItems().map(item => item.category))]; }

function renderCategories() {
  const box = $("category-buttons");
  box.replaceChildren();
  ["All", ...getCategories()].forEach(name => {
    const chip = makeEl("button", "chip", name);
    chip.type = "button";
    chip.setAttribute("aria-pressed", String(state.category === name)); // marks the active one
    chip.addEventListener("click", () => { state.category = name; renderCategories(); update(); });
    box.appendChild(chip);
  });
  // Keep the form's category list in sync
  const select = $("form-category");
  select.replaceChildren(...getCategories().map(name => new Option(name, name)));
}

// ====== Favorites ======
function toggleFavorite(id) {
  favorites = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
  saveJSON(FAV_KEY, favorites);
  update();
}

// ====== Modal (native <dialog>) ======
function openModal(item, opener) {
  lastFocused = opener;
  setImage($("modal-image"), item.image, item.title + " in " + item.city);
  $("modal-category").textContent = item.category;
  $("modal-title").textContent = item.title;
  $("modal-city").textContent = "📍 " + item.city;
  $("modal-metric").textContent = item.metric;
  $("modal-details").textContent = item.fullDetails;
  modal.showModal();
}
$("modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close(); 
});
modal.addEventListener("close", () => { if (lastFocused) lastFocused.focus(); }); // restore focus

// ====== Controls ======
$("search").addEventListener("input", (e) => { state.search = e.target.value; update(); });
$("sort").addEventListener("change", (e) => { state.sort = e.target.value; update(); });
$("favorites-only").addEventListener("change", (e) => { state.favoritesOnly = e.target.checked; update(); });

function resetFilters() {
  Object.assign(state, { search: "", category: "All", favoritesOnly: false, sort: "default" });
  $("search").value = "";
  $("sort").value = "default";
  $("favorites-only").checked = false;
  renderCategories();
  update();
}
$("reset").addEventListener("click", resetFilters);
$("empty-reset").addEventListener("click", resetFilters);

// ====== Theme ======
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = $("theme-toggle");
  btn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
  btn.setAttribute("aria-pressed", String(theme === "dark"));
}
function savedTheme() {
  try { return localStorage.getItem(THEME_KEY) || "light"; } catch (error) { return "light"; }
}
$("theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem(THEME_KEY, next); } catch (error) { /* ignore */ }
});

// ====== Add-item form ======
const form = $("add-form"), message = $("form-message");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // no page reload
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach(key => { data[key] = data[key].trim(); });

  // Validate
  const required = ["title", "city", "category", "metric", "shortDescription", "fullDetails"];
  let firstBad = null;
  required.forEach(name => {
    const bad = !data[name];
    form.elements[name].classList.toggle("invalid", bad);
    if (bad && !firstBad) firstBad = form.elements[name];
  });
  if (firstBad) {
    message.className = "error";
    message.textContent = "Please fill in all required fields (spaces alone don't count).";
    firstBad.focus();
    return;
  }

  const year = data.metric.match(/\d{3,4}/); 
  const nextId = Math.max(0, ...getAllItems().map(item => item.id)) + 1; // unique ID
  userItems.push({ id: nextId, title: data.title, category: data.category, city: data.city,
    image: data.image, metric: data.metric, sortYear: year ? Number(year[0]) : null,
    shortDescription: data.shortDescription, fullDetails: data.fullDetails });
  saveJSON(ITEMS_KEY, userItems);

  form.reset();
  message.className = "success";
  message.textContent = "✓ “" + data.title + "” was added to the catalog.";
  renderCategories();
  update();
});

// ====== Start ======
applyTheme(savedTheme());
renderCategories();
update();


