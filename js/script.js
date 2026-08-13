/* ============================================================
   PIXELVAULT — script.js
   Este archivo es el mejor lugar para practicar cambios en GitHub:
   - Agrega/edita juegos en el array GAMES
   - Cambia el glyph (2-3 letras) que representa la portada
   - Ajusta el precio o la categoría de cualquier título
   ============================================================ */

const GAMES = [
  { id: "neb-01", title: "Nebula Drift",     category: "rpg",        price: 59900,  glyph: "ND", tag: "Nuevo",     desc: "RPG espacial de exploración abierta." },
  { id: "iro-02", title: "Iron Vale",        category: "accion",     price: 74900,  glyph: "IV", tag: "Top venta", desc: "Acción táctica en trincheras mecanizadas." },
  { id: "chr-03", title: "Chrono Rift",      category: "estrategia", price: 49900,  glyph: "CR", tag: "",          desc: "Estrategia por turnos entre líneas temporales." },
  { id: "sas-04", title: "Salt & Signal",    category: "indie",      price: 29900,  glyph: "S&", tag: "Indie",     desc: "Narrativa de radio en un faro abandonado." },
  { id: "hol-05", title: "Hollow Orbit",     category: "accion",     price: 64900,  glyph: "HO", tag: "",          desc: "Shooter roguelike en estaciones a la deriva." },
  { id: "ash-06", title: "Ash Kingdom",      category: "rpg",        price: 69900,  glyph: "AK", tag: "",          desc: "Reino de ceniza, alianzas y magia de guerra." },
  { id: "neo-07", title: "Neon Drifters",    category: "accion",     price: 39900,  glyph: "NF", tag: "Oferta",    desc: "Carreras callejeras contrarreloj." },
  { id: "pap-08", title: "Paper Moon",       category: "indie",      price: 24900,  glyph: "PM", tag: "Indie",     desc: "Plataformas de papel recortado y viento." },
  { id: "vlt-09", title: "Vault Keepers",    category: "estrategia", price: 54900,  glyph: "VK", tag: "",          desc: "Gestión de recursos en bóvedas subterráneas." },
];

const fmt = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

/* ---------- catálogo ---------- */
const grid = document.getElementById("catalogGrid");
const tabs = document.getElementById("filterTabs");

function renderGrid(filter = "todos"){
  const items = filter === "todos" ? GAMES : GAMES.filter(g => g.category === filter);
  grid.innerHTML = items.map(g => `
    <article class="game-card" style="--card-accent: var(--accent-${g.category})">
      <div class="game-card-art">
        ${g.tag ? `<span class="game-card-tag">${g.tag}</span>` : ""}
        <span class="game-card-glyph">${g.glyph}</span>
      </div>
      <div class="game-card-body">
        <h3>${g.title}</h3>
        <p>${g.desc}</p>
        <div class="game-card-foot">
          <span class="game-price">${fmt.format(g.price)}</span>
          <button class="add-btn" data-id="${g.id}" aria-label="Agregar ${g.title} al carrito">+</button>
        </div>
      </div>
    </article>
  `).join("");
}

tabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  tabs.querySelectorAll(".tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected","false"); });
  btn.classList.add("active");
  btn.setAttribute("aria-selected","true");
  renderGrid(btn.dataset.filter);
});

renderGrid();

/* ---------- carrito (estado en memoria, sin localStorage) ---------- */
let cart = [];

const cartCount   = document.getElementById("cartCount");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartEmptyMsg= document.getElementById("cartEmptyMsg");

function addToCart(id){
  const game = GAMES.find(g => g.id === id);
  if (!game) return;
  const line = cart.find(c => c.id === id);
  if (line) line.qty += 1;
  else cart.push({ ...game, qty: 1 });
  renderCart();
  openCart();
}

function removeFromCart(id){
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

function renderCart(){
  const totalQty = cart.reduce((s,c) => s + c.qty, 0);
  cartCount.textContent = totalQty;

  if (cart.length === 0){
    cartItemsEl.innerHTML = "";
    cartItemsEl.appendChild(cartEmptyMsg);
    cartTotalEl.textContent = fmt.format(0);
    return;
  }

  cartItemsEl.innerHTML = cart.map(c => `
    <div class="cart-line">
      <div class="cart-line-swatch" style="--card-accent: var(--accent-${c.category})"></div>
      <div class="cart-line-info">
        <h4>${c.title}</h4>
        <span>${c.qty} × ${fmt.format(c.price)}</span>
      </div>
      <button class="cart-line-remove" data-id="${c.id}" aria-label="Quitar ${c.title}">✕</button>
    </div>
  `).join("");

  const total = cart.reduce((s,c) => s + c.price * c.qty, 0);
  cartTotalEl.textContent = fmt.format(total);
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  addToCart(btn.dataset.id);
});

cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".cart-line-remove");
  if (!btn) return;
  removeFromCart(btn.dataset.id);
});

/* ---------- drawer open/close ---------- */
const cartToggle  = document.getElementById("cartToggle");
const cartDrawer  = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose   = document.getElementById("cartClose");

function openCart(){
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartToggle.setAttribute("aria-expanded", "true");
}
function closeCart(){
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartToggle.setAttribute("aria-expanded", "false");
}

cartToggle.addEventListener("click", () => {
  cartDrawer.classList.contains("open") ? closeCart() : openCart();
});
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  alert("Demo: aquí se conectaría una pasarela de pago real. Carrito vaciado.");
  cart = [];
  renderCart();
  closeCart();
});

/* ---------- menú móvil ---------- */
const menuToggle = document.getElementById("menuToggle");
const mainNav    = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- newsletter (demo, sin backend) ---------- */
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const note = document.getElementById("newsletterNote");
  note.textContent = "Listo — quedaste suscrito (demo, sin envío real).";
  e.target.reset();
});
