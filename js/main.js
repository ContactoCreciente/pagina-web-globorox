document.documentElement.classList.add('js');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= WhatsApp =================
      código de país + número, sin "+", sin espacios ni guiones.
      Ejemplo Perú: 51922954610 (51 + el número del brochure) */
const WHATSAPP_NUMBER = '51922954610';

// Arma el enlace: https://wa.me/NUMERO?text=MENSAJE (el mensaje va "codificado" para URL)
const waLink = text => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// Todos los enlaces con data-wa="mensaje" apuntan a WhatsApp con ese mensaje
document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); });

/* ================= Colores: aclarar / oscurecer =================
   Para el efecto 3D necesitamos versiones clara y oscura de cada color. */
function shade(hex, amt) {            // amt > 0 aclara (hacia blanco), amt < 0 oscurece (hacia negro)
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = amt > 0 ? 255 : 0, k = Math.abs(amt);
  r = Math.round(r + (t - r) * k); g = Math.round(g + (t - g) * k); b = Math.round(b + (t - b) * k);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* ================= Fábrica de globos 3D (SVG) =================
   finish = 'latex' → degradado RADIAL: luz arriba a la izquierda, sombra abajo (volumen mate)
   finish = 'metal' → degradado LINEAL con franjas claras y oscuras alternadas (reflejo de papel aluminio) */
let uid = 0;
function balloon(color, shape = 'round', label = '', finish = 'latex') {
  const id = 'g' + (++uid);
  const light = shade(color, 0.55), mid = shade(color, 0.15), dark = shade(color, -0.35), darker = shade(color, -0.5);

  const defs = finish === 'metal'
    ? `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stop-color="${light}"/>
         <stop offset=".22" stop-color="${color}"/>
         <stop offset=".42" stop-color="${darker}"/>
         <stop offset=".58" stop-color="${mid}"/>
         <stop offset=".72" stop-color="${light}"/>
         <stop offset="1" stop-color="${dark}"/>
       </linearGradient>
       <radialGradient id="${id}s" cx=".32" cy=".28" r=".35">
         <stop offset="0" stop-color="#fff" stop-opacity=".95"/>
         <stop offset="1" stop-color="#fff" stop-opacity="0"/>
       </radialGradient>`
    : `<radialGradient id="${id}" cx=".36" cy=".3" r=".75">
         <stop offset="0" stop-color="${light}"/>
         <stop offset=".45" stop-color="${color}"/>
         <stop offset="1" stop-color="${dark}"/>
       </radialGradient>
       <radialGradient id="${id}s" cx=".32" cy=".26" r=".22">
         <stop offset="0" stop-color="#fff" stop-opacity=".85"/>
         <stop offset="1" stop-color="#fff" stop-opacity="0"/>
       </radialGradient>`;
  const fill = `url(#${id})`, shine = `url(#${id}s)`;
  const string = '<path d="M60 116 C 50 132, 70 146, 58 170" stroke="#9A94AB" stroke-width="2" fill="none" stroke-linecap="round"/>';
  const knot = `<path d="M54 116 L66 116 L60 106 Z" fill="${dark}"/>`;
  let body;

  if (shape === 'heart') {
    const d = 'M60 108 C 22 84, 8 56, 24 34 C 38 16, 56 22, 60 38 C 64 22, 82 16, 96 34 C 112 56, 98 84, 60 108 Z';
    body = `<path d="${d}" fill="${fill}"/><path d="${d}" fill="${shine}"/>`;
  } else if (shape === 'star') {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? 22 : 48, a = -Math.PI / 2 + i * Math.PI / 5;
      pts.push((60 + r * Math.cos(a)).toFixed(1) + ',' + (60 + r * Math.sin(a)).toFixed(1));
    }
    const poly = `points="${pts.join(' ')}" stroke-width="10" stroke-linejoin="round"`;
    body = `<polygon ${poly} fill="${fill}" stroke="${fill}"/><polygon ${poly} fill="${shine}" stroke="none"/>`;
  } else if (shape === 'number' && finish === 'metal') {
    // Número o letras de papel aluminio: el propio texto es el globo (borde grueso redondeado = "inflado")
    const size = label.length > 2 ? 40 : label.length > 1 ? 54 : 96;
    const txt = `x="60" y="${label.length > 1 ? 84 : 94}" text-anchor="middle" font-family="Fredoka, system-ui, sans-serif" font-weight="700" font-size="${size}" letter-spacing="${label.length > 1 ? 6 : 0}"`;
    body = `<text ${txt} fill="${darker}" stroke="${darker}" stroke-width="10" stroke-linejoin="round" transform="translate(2 4)">${label}</text>
            <text ${txt} fill="${fill}" stroke="${fill}" stroke-width="10" stroke-linejoin="round">${label}</text>
            <text ${txt} fill="${shine}">${label}</text>`;
  } else {
    body = `<ellipse cx="60" cy="58" rx="46" ry="52" fill="${fill}"/>
            <ellipse cx="60" cy="58" rx="46" ry="52" fill="${shine}"/>`;
    if (label) body += `<text x="60" y="76" text-anchor="middle" font-family="Fredoka, system-ui, sans-serif" font-weight="700" font-size="${label.length > 1 ? 44 : 54}" fill="#1F1A2E">${label}</text>`;
  }
  return `<svg viewBox="0 0 120 172" aria-hidden="true"><defs>${defs}</defs>${string}${knot}${body}</svg>`;
}
document.querySelectorAll('[data-balloon]').forEach(el => {
  el.innerHTML = balloon(el.dataset.color, el.dataset.balloon, el.dataset.label || '', el.dataset.finish || 'latex');
});

/* ---------- Confeti del hero (baja densidad, solo en bordes) ---------- */
const confettiColors = ['#FF3D7F', '#FFC93C', '#2EC4FF', '#2DD4A3', '#8B5CF6'];
const confettiSpots = [[3, 8], [8, 70], [2, 92], [46, 4], [58, 94], [94, 6], [97, 48], [90, 88], [30, 96], [70, 2]];
const confetti = document.getElementById('confetti');
confettiSpots.forEach(([x, y], i) => {
  const s = document.createElement('span');
  const round = i % 3 === 0;
  s.style.cssText = `left:${x}%;top:${y}%;width:${round ? 10 : 7}px;height:${round ? 10 : 14}px;background:${confettiColors[i % 5]};border-radius:${round ? '50%' : '3px'};transform:rotate(${i * 37}deg);opacity:.8`;
  confetti.appendChild(s);
});

/* ---------- Catálogo ---------- */
const categories = [
  { id: 'todos',         label: 'Todos',                emoji: '🎉', tint: '--tint-pink',   solid: '--pop-pink',   onSolid: '#fff' },
  { id: 'publicitarios', label: 'Globos publicitarios', emoji: '📢', tint: '--tint-blue',   solid: '--pop-blue' },
  { id: 'decoracion',    label: 'Decoraciones',         emoji: '🎈', tint: '--tint-purple', solid: '--pop-purple', onSolid: '#fff' },
  { id: 'favoritos',     label: 'Los más pedidos',      emoji: '⭐', tint: '--tint-yellow', solid: '--pop-yellow' },
];
/* 📸 FOTOS: guarda cada foto en la carpeta img/catalogo/ con el nombre que dice "img".
   Si la foto no existe todavía, la tarjeta muestra un globo dibujado y el aviso "Espacio para tu foto".
   Tamaño recomendado: horizontal, 1000 × 800 px (proporción 5:4), en .jpg */
// finish: 'metal' = papel aluminio brillante · sin finish = látex mate
const products = [
  { name: 'Impresión de globos publicitarios', cat: 'publicitarios', catLabel: 'Globos publicitarios',
    desc: 'Globos con el logo o mensaje de tu marca para que se vea, atraiga y sea reconocida.',
    uses: ['Campañas retail', 'Activaciones de marca'], img: 'img/catalogo/globos-publicitarios.jpg',
    color: '#FF3D7F', shape: 'round', tint: '--tint-pink' },
  { name: 'Globos manga', cat: 'publicitarios', catLabel: 'Globos publicitarios',
    desc: 'Globos alargados impresos con tu marca, ideales para puntos de venta y activaciones.',
    uses: ['Campañas retail', 'Eventos corporativos'], img: 'img/catalogo/globos-manga.jpg',
    color: '#FFC93C', shape: 'round', tint: '--tint-yellow' },
  { name: 'Globos con helio', cat: 'decoracion', catLabel: 'Decoraciones',
    desc: 'Globos flotantes listos para llenar de color tiendas, oficinas y celebraciones.',
    uses: ['Fiestas privadas', 'Campañas retail'], img: 'img/catalogo/globos-helio.jpg',
    color: '#2EC4FF', shape: 'round', tint: '--tint-blue' },
  { name: 'Decoraciones con globos', cat: 'decoracion', catLabel: 'Decoraciones',
    desc: 'Decoraciones creativas y temáticas que transforman cualquier espacio en un momento inolvidable.',
    uses: ['Fiestas privadas', 'Eventos corporativos', 'Discotecas'], img: 'img/catalogo/decoraciones.jpg',
    color: '#8B5CF6', shape: 'heart', finish: 'metal', tint: '--tint-purple' },
  { name: 'Bouquet de globos', cat: 'favoritos', catLabel: 'Los más pedidos',
    desc: 'El detalle que transforma un espacio. Combinamos globos, colores y mensajes según el estilo de cada celebración.',
    uses: ['Regalos', 'Campañas retail', 'Fiestas privadas'], img: 'img/catalogo/bouquet.jpg',
    color: '#2DD4A3', shape: 'star', finish: 'metal', tint: '--tint-green', badge: 'Favorito' },
  { name: 'Arcos de globos', cat: 'favoritos', catLabel: 'Los más pedidos',
    desc: 'Arcos personalizados para dar la bienvenida, destacar accesos y reforzar la identidad de tu evento.',
    uses: ['Entradas y accesos', 'Congresos', 'Activaciones de marca'], img: 'img/catalogo/arcos.jpg',
    color: '#FF3D7F', shape: 'round', tint: '--tint-pink', badge: 'Favorito' },
  { name: 'Columnas de globos', cat: 'favoritos', catLabel: 'Los más pedidos',
    desc: 'Columnas con los colores de tu marca o tu fiesta para entradas, pasillos y escenarios.',
    uses: ['Entradas y accesos', 'Eventos corporativos', 'Celebraciones'], img: 'img/catalogo/columnas.jpg',
    color: '#FF8A3D', shape: 'round', tint: '--tint-orange' },
  { name: 'Malla de globos', cat: 'favoritos', catLabel: 'Los más pedidos',
    desc: 'Color, volumen y creatividad a gran escala: paredes y espacios amplios convertidos en escenarios únicos.',
    uses: ['Eventos corporativos', 'Lanzamientos', 'Discotecas'], img: 'img/catalogo/malla.jpg',
    color: '#8B5CF6', shape: 'round', tint: '--tint-purple', badge: 'Favorito' },
];
// Globo dibujado de respaldo + foto encima (si la foto no existe, se quita sola y queda el globo)
const productArt = p => balloon(p.color, p.shape, p.label || '', p.finish || 'latex') +
  (p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.remove()">` : '');
let activeCat = 'todos';
let query = '';

const chipsEl = document.getElementById('chips');
chipsEl.innerHTML = categories.map(c =>
  `<button class="chip btn-candy btn-candy--sm" type="button" data-cat="${c.id}" aria-pressed="${c.id === activeCat}"
    style="--tint: var(${c.tint}); --solid: var(${c.solid}); ${c.onSolid ? '--on-solid:' + c.onSolid : ''}">
    <span aria-hidden="true">${c.emoji}</span>${c.label}</button>`).join('');
chipsEl.addEventListener('click', e => {
  const btn = e.target.closest('.chip'); if (!btn) return;
  activeCat = btn.dataset.cat;
  chipsEl.querySelectorAll('.chip').forEach(b => b.setAttribute('aria-pressed', b === btn));
  render();
});

const gridEl = document.getElementById('grid');
const sabores = ['', 'btn-candy--limon', 'btn-candy--menta', 'btn-candy--cielo', 'btn-candy--uva'];
function render() {
  const q = query.trim().toLowerCase();
  const list = products.filter(p =>
    (activeCat === 'todos' || p.cat === activeCat) &&
    (!q || [p.name, p.catLabel, p.desc, ...p.uses].join(' ').toLowerCase().includes(q)));
  if (!list.length) {
    gridEl.innerHTML = `<div class="empty"><strong>Ups, ese globo se voló.</strong><span>Prueba otra búsqueda u otra categoría.</span></div>`;
    return;
  }
  gridEl.innerHTML = list.map(p => {
    const i = products.indexOf(p);
    return `<article class="card" style="--tint: var(${p.tint})">
      ${p.badge ? `<span class="badge${p.urgent ? ' urgent' : ''}">${p.badge}</span>` : ''}
      <div class="card-media">${productArt(p)}<span class="ph-hint">📸 Espacio para tu foto</span></div>
      <div class="card-body">
        <span class="card-cat">${p.catLabel}</span>
        <h3>${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <ul class="uses" aria-label="Ideal para">${p.uses.map(u => `<li>${u}</li>`).join('')}</ul>
      </div>
      <div class="card-foot">
        <span class="quote-hint">Cotiza sin compromiso</span>
        <button class="add btn-candy btn-candy--sm ${sabores[i % sabores.length]}" type="button" data-add="${i}" aria-label="Añadir ${p.name} a tu cotización">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </article>`;
  }).join('');
}
render();

document.getElementById('q').addEventListener('input', e => {
  query = e.target.value;
  render();
});
document.getElementById('q').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('catalogo').scrollIntoView();
});

/* ================= Pedido por WhatsApp (sin pagos en la web) =================
   order guarda { índiceDelProducto: cantidad }. Nunca se cobra aquí:
   al final se arma un mensaje de texto y se abre WhatsApp. */
const order = {};
let firstAdd = true, toastTimer;
const countEl = document.getElementById('cartCount');
const toast = document.getElementById('toast');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
const orderBtn = document.getElementById('orderBtn');
const listEl = document.getElementById('orderList');
const sendWa = document.getElementById('sendWa');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
}

function renderOrder() {
  const entries = Object.entries(order).filter(([, q]) => q > 0);
  const items = entries.reduce((n, [, q]) => n + q, 0);
  countEl.textContent = items;

  listEl.innerHTML = entries.length ? entries.map(([i, q]) => {
    const p = products[i];
    return `<li class="order-item">
      <span class="order-thumb" style="--tint: var(${p.tint})">${productArt(p)}</span>
      <div><div class="order-name">${p.name}</div><div class="order-price">${p.catLabel}</div></div>
      <div class="qty">
        <button class="btn-candy btn-candy--suave" type="button" data-dec="${i}" aria-label="Quitar uno">−</button>
        <span>${q}</span>
        <button class="btn-candy btn-candy--suave" type="button" data-inc="${i}" aria-label="Añadir uno">+</button>
      </div>
    </li>`;
  }).join('') : `<li class="order-empty"><strong>Tu cotización está vacía</strong>Pulsa el botón + de cualquier producto para añadirlo.</li>`;

  // El mensaje que le llegará a la tienda por WhatsApp (sin precios: Globorox cotiza cada pedido)
  const lines = entries.map(([i, q]) => `• ${q} × ${products[i].name}`);
  const msg = `Hola Globorox 👋 Quiero cotizar lo siguiente:\n\n${lines.join('\n')}\n\n¿Me envían precio y disponibilidad? La fecha de mi evento es: `;
  sendWa.href = entries.length ? waLink(msg) : '#';
  sendWa.setAttribute('aria-disabled', entries.length ? 'false' : 'true');
}

function openDrawer(open) {
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', !open);
  orderBtn.setAttribute('aria-expanded', open);
  if (open) document.getElementById('closeDrawer').focus();
  else orderBtn.focus();
}
orderBtn.addEventListener('click', () => openDrawer(true));
document.getElementById('closeDrawer').addEventListener('click', () => openDrawer(false));
overlay.addEventListener('click', () => openDrawer(false));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) openDrawer(false); });

listEl.addEventListener('click', e => {
  const inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]');
  if (inc) order[inc.dataset.inc]++;
  if (dec) order[dec.dataset.dec]--;
  if (inc || dec) renderOrder();
});

gridEl.addEventListener('click', e => {
  const btn = e.target.closest('[data-add]'); if (!btn) return;
  const i = btn.dataset.add;
  order[i] = (order[i] || 0) + 1;
  renderOrder();
  countEl.classList.remove('pop'); void countEl.offsetWidth; countEl.classList.add('pop');
  showToast('Añadido a tu cotización 🎈');
  if (firstAdd && !reduced) burst(btn);
  firstAdd = false;
});
renderOrder();

function burst(from) {
  const r = from.getBoundingClientRect();
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span');
    p.className = 'burst';
    p.style.background = confettiColors[i % 5];
    p.style.left = r.left + r.width / 2 + 'px';
    p.style.top = r.top + r.height / 2 + 'px';
    document.body.appendChild(p);
    const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 70;
    p.animate([
      { transform: 'translate(0,0) rotate(0)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 40}px) rotate(${Math.random() * 540}deg)`, opacity: 0 }
    ], { duration: 900, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => p.remove();
  }
}

/* ---------- Header con sombra al hacer scroll ---------- */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ---------- Aparición en scroll (una sola vez) ---------- */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduced) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.1 });
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    else io.observe(el);
  });
} else {
  reveals.forEach(el => el.classList.add('in'));
}

/* ---------- Formulario → Google Sheets ----------
   👉 PEGA AQUÍ la URL que te da Google Apps Script al publicar (termina en /exec).
      Ver integraciones/formulario-google-sheets.gs */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzopqAiD2LkqJfJSBaIU0jVO9sGygXfdLo0BlwidUw4NzW0avYPkqzOUDyud0IzwwzbgQ/exec';

const form = document.getElementById('newsForm');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email');
  const err = document.getElementById('emailError');
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  email.setAttribute('aria-invalid', ok ? 'false' : 'true');
  err.hidden = ok;
  if (!ok) { email.focus(); return; }

  const btn = form.querySelector('button[type="submit"]');
  const okMsg = document.getElementById('formOk');
  btn.disabled = true; btn.textContent = 'Enviando…';
  try {
    if (SHEET_URL) {
      // no-cors: Google no deja leer la respuesta, pero la fila sí se guarda
      await fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) });
    }
    okMsg.textContent = '¡Listo! Ya eres parte del club 🎉';
    okMsg.hidden = false;
    btn.textContent = 'Suscrito ✓';
    form.reset();
  } catch {
    okMsg.textContent = 'No pudimos enviar tus datos. Revisa tu conexión e inténtalo otra vez.';
    okMsg.hidden = false;
    btn.disabled = false; btn.textContent = 'Quiero las ofertas';
  }
});
