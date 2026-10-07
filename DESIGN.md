---
name: Globorox
type: design-system
theme: light
mood: [limpio, divertido, festivo, luminoso]
version: 1.0
---

# DESIGN.md — Globorox

## North Star

**"Una fiesta sobre papel blanco."** La base es blanca y ordenada, como una tienda recién montada; el color aparece en los acentos, como globos en una sala vacía. Cada pantalla tiene que dar ganas de celebrar sin verse recargada: mucho aire, formas redondas y color puesto con intención.

Tres reglas que mandan sobre todo lo demás:

1. **El blanco manda.** Al menos el 70 % de cualquier pantalla es blanco o casi blanco.
2. **El color se usa como un globo.** Va en piezas concretas (botones, badges, ilustraciones, fondos de tarjetas destacadas) y nunca como fondo de página completa.
3. **Todo es redondo.** No hay esquinas vivas. Las formas recuerdan globos inflados: suaves, llenas, con un poco de rebote.

---

## Color

### Base neutra

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#FFFFFF` | Fondo principal |
| `--bg-soft` | `#FFF9F5` | Secciones alternas (blanco cálido, tipo crema) |
| `--surface` | `#FFFFFF` | Tarjetas |
| `--border` | `#F0E8E4` | Bordes y divisores suaves |
| `--ink` | `#1F1A2E` | Texto principal (un morado casi negro, más cálido que el negro puro) |
| `--ink-soft` | `#5E5873` | Texto secundario |
| `--ink-muted` | `#9A94AB` | Placeholders y metadatos |

### Acentos festivos (la "paleta de globos")

| Token | Hex | Nombre | Uso principal |
|---|---|---|---|
| `--pop-pink` | `#FF3D7F` | Fucsia fiesta | **Color primario de marca.** CTA principal, precios en oferta, logo |
| `--pop-yellow` | `#FFC93C` | Amarillo confeti | Badges ("Nuevo", "Top ventas"), estrellas, subrayados |
| `--pop-blue` | `#2EC4FF` | Celeste cielo | Enlaces, CTA secundarios, info |
| `--pop-green` | `#2DD4A3` | Menta | Éxito, "En stock", confirmaciones |
| `--pop-purple` | `#8B5CF6` | Uva | Categorías, packs premium |
| `--pop-orange` | `#FF8A3D` | Mandarina | Urgencia suave ("¡Últimas unidades!") |

### Tintes suaves (fondos de acento)

Úsalos para el fondo de tarjetas de categoría, chips y banners. Son la versión "pastel" de cada acento.

| Token | Hex |
|---|---|
| `--tint-pink` | `#FFE5EF` |
| `--tint-yellow` | `#FFF4D6` |
| `--tint-blue` | `#DDF5FF` |
| `--tint-green` | `#D9F7EE` |
| `--tint-purple` | `#EDE5FF` |
| `--tint-orange` | `#FFEADB` |

### Reglas de color

- **Un acento dominante por bloque.** Una sección puede tener fucsia como protagonista y amarillo como detalle, pero no seis colores peleando.
- **El arcoíris completo solo aparece en decoración:** confeti, guirnaldas, ilustraciones de globos y el divisor multicolor.
- **Contraste:** el texto sobre `--pop-yellow`, `--pop-green` y `--pop-blue` va siempre en `--ink`. El texto blanco solo se pone sobre `--pop-pink`, `--pop-purple` y `--ink`.
- **Estados de error:** `#E5484D` (no se confunde con el fucsia de marca).

---

## Tipografía

| Rol | Fuente | Peso | Notas |
|---|---|---|---|
| Display / títulos | **Fredoka** (Google Fonts) | 600–700 | Redonda y amable, parece inflada. Es la voz de la marca |
| Texto / UI | **Nunito** (Google Fonts) | 400, 600, 800 | Terminaciones redondeadas, se lee bien en tamaños pequeños |
| Acento manuscrito (opcional) | **Caveat** | 600 | Solo para notas cortas tipo "¡Hecho con amor!" (máximo una por pantalla) |

```html
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;800&family=Caveat:wght@600&display=swap" rel="stylesheet">
```

### Escala

| Token | Tamaño (desktop / móvil) | Line-height | Uso |
|---|---|---|---|
| `--fs-hero` | 64px / 40px | 1.05 | Titular del hero |
| `--fs-h1` | 48px / 34px | 1.1 | Títulos de página |
| `--fs-h2` | 36px / 28px | 1.15 | Títulos de sección |
| `--fs-h3` | 24px / 20px | 1.25 | Títulos de tarjeta |
| `--fs-body` | 17px / 16px | 1.6 | Párrafos |
| `--fs-small` | 14px | 1.5 | Metadatos y etiquetas |
| `--fs-tiny` | 12px | 1.4 | Badges (en mayúsculas, con letter-spacing de 0.06em) |

- En títulos, una palabra clave puede llevar color de acento o un subrayado ondulado amarillo: *"Globos para **cada** fiesta"*.
- Letter-spacing de los títulos Fredoka: `-0.01em`.

---

## Forma y espaciado

### Radios

| Token | Valor | Uso |
|---|---|---|
| `--r-sm` | 12px | Inputs, chips |
| `--r-md` | 20px | Tarjetas de producto |
| `--r-lg` | 32px | Banners y secciones destacadas |
| `--r-pill` | 999px | Botones, badges, buscador |

### Espaciado (base 8)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

- Separación entre secciones: **96px** en desktop y **64px** en móvil. Es mucho aire, a propósito.
- Ancho máximo del contenido: **1200px**. Margen lateral en móvil: **16px**.

### Sombras

Son suaves, algo coloreadas y nunca grises duras.

```css
--shadow-sm: 0 2px 8px rgba(31, 26, 46, 0.06);
--shadow-md: 0 8px 24px rgba(31, 26, 46, 0.08);
--shadow-pop: 0 10px 30px rgba(255, 61, 127, 0.25); /* hover de CTA y producto destacado */
```

---

## Componentes

### Botones

- **Primario:** fondo `--pop-pink`, texto blanco, Nunito 800, forma `--r-pill`, padding `14px 28px`. En hover sube 2px (`translateY(-2px)`) y aparece `--shadow-pop`. Es el "rebote" del globo.
- **Secundario:** fondo blanco, borde de 2px `--ink`, texto `--ink`. En hover se rellena con `--tint-yellow`.
- **Terciario / enlace:** texto `--pop-blue` con subrayado que aparece al pasar el cursor.
- Tamaño táctil mínimo: 44px de alto.

### Tarjeta de producto

- Fondo blanco, `--r-md`, borde de 1px `--border`, `--shadow-sm`.
- La imagen va sobre un fondo tinte (rotando `--tint-*` según la categoría) con el globo recortado en PNG o WebP. Así el producto "flota".
- Badge en la esquina superior izquierda (`--pop-yellow` + `--ink`, forma pill).
- Precio en Fredoka 600, `--ink`. Si está en oferta, en `--pop-pink` con el precio anterior tachado en `--ink-muted`.
- Hover: la tarjeta sube 4px y la imagen del globo se balancea (ver *Movimiento*).
- Botón "Añadir" circular (44px) con un icono "+" en la esquina inferior derecha.

### Chips de categoría

Forma pill, fondo `--tint-*`, texto `--ink`, emoji o icono a la izquierda (🎈 Látex · ✨ Metalizados · 🔢 Números · 🎂 Cumpleaños · 💍 Bodas · 👶 Baby shower). El chip activo se rellena con el acento sólido correspondiente.

### Header

- Blanco, sticky y con `--shadow-sm` solo después de hacer scroll.
- Logo a la izquierda. Navegación en Nunito 600. A la derecha, buscador pill y carrito con un contador en un círculo fucsia.
- Encima del header, una barra de anuncio opcional de 36px con fondo `--ink`, texto blanco y un emoji: *"🎉 Envío gratis en pedidos desde X €"*.

### Hero

- Fondo blanco o `--bg-soft`. El titular Fredoka va a la izquierda y un racimo de globos (foto o ilustración) a la derecha, sobresaliendo un poco del contenedor.
- Confeti decorativo en SVG, disperso en baja densidad por los bordes y nunca detrás del texto.
- Dos CTA: primario ("Ver catálogo") y secundario ("Arma tu arreglo").

### Divisor festivo

Una guirnalda de banderines o una línea ondulada multicolor (fucsia → amarillo → celeste → menta → uva) para separar secciones grandes. Como mucho **dos por página**.

### Formularios

- Inputs de 48px de alto, `--r-sm`, borde de 2px `--border`. Con foco, borde `--pop-blue` y halo `0 0 0 4px var(--tint-blue)`.
- Labels encima del campo, en Nunito 600 y `--fs-small`.

### Footer

Fondo `--ink`, texto blanco y enlaces en `--pop-yellow` al pasar el cursor. Un borde superior ondulado en forma de "nube" hace la transición desde el contenido blanco.

---

## Iconografía e ilustración

- **Iconos:** de trazo redondeado (Phosphor "Bold" o Lucide con `stroke-linecap: round`), de 2px y en color `--ink`.
- **Ilustraciones:** planas, con formas redondas y la paleta de acentos. Sin degradados complejos, aunque se permite un brillo blanco en forma de óvalo sobre cada globo (el reflejo típico).
- **Fotografía:** globos sobre fondo blanco o pastel, con luz natural y alegre. Evitar fondos oscuros o saturados.
- **Emojis:** se permiten en chips, barra de anuncio y microcopy. No van en títulos de sección.

---

## Movimiento

Suave y con rebote, pero sin marear.

```css
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--dur-fast: 150ms;
--dur-base: 250ms;
```

- **Flotar:** los globos decorativos oscilan con `translateY` de ±6px y una rotación de ±2° en ciclos de 4 a 6 s, con desfase entre globos.
- **Hover:** elevación de 2 a 4px usando `--ease-bounce`.
- **Añadir al carrito:** el contador del carrito hace un "pop" (escala 1 → 1.3 → 1). Se puede lanzar una pequeña ráfaga de confeti la primera vez.
- **Aparición en scroll:** fade + subida de 16px, una sola vez.
- Respetar `prefers-reduced-motion`: se desactivan el flote, el confeti y el rebote.

---

## Voz y microcopy

Cercana, alegre y breve. Tutea al cliente.

- ✅ "¡Tu fiesta empieza aquí!" · "Añadido 🎈" · "Ups, ese globo se voló. Prueba otra búsqueda."
- ❌ "Producto agregado correctamente al carrito de compras."

---

## Do / Don't

**Do**
- Dejar respirar al blanco: mucho espacio entre bloques.
- Usar un acento dominante por sección.
- Redondear todo: botones pill, tarjetas de 20px y hero de 32px.
- Mostrar los productos "flotando" sobre fondos tinte.
- Mantener un contraste AA en todo el texto.

**Don't**
- Fondos de página de colores sólidos o degradados arcoíris a pantalla completa.
- Más de tres acentos distintos en un mismo componente.
- Sombras negras duras, esquinas rectas o tipografías serif.
- Texto blanco sobre amarillo, menta o celeste.
- Confeti detrás del texto o animaciones que no se detienen con reduced motion.

---

## Tokens CSS listos para copiar

```css
:root {
  /* Base */
  --bg: #FFFFFF;
  --bg-soft: #FFF9F5;
  --surface: #FFFFFF;
  --border: #F0E8E4;
  --ink: #1F1A2E;
  --ink-soft: #5E5873;
  --ink-muted: #9A94AB;

  /* Acentos */
  --pop-pink: #FF3D7F;
  --pop-yellow: #FFC93C;
  --pop-blue: #2EC4FF;
  --pop-green: #2DD4A3;
  --pop-purple: #8B5CF6;
  --pop-orange: #FF8A3D;
  --error: #E5484D;

  /* Tintes */
  --tint-pink: #FFE5EF;
  --tint-yellow: #FFF4D6;
  --tint-blue: #DDF5FF;
  --tint-green: #D9F7EE;
  --tint-purple: #EDE5FF;
  --tint-orange: #FFEADB;

  /* Tipografía */
  --font-display: 'Fredoka', system-ui, sans-serif;
  --font-body: 'Nunito', system-ui, sans-serif;
  --font-hand: 'Caveat', cursive;

  /* Forma */
  --r-sm: 12px;
  --r-md: 20px;
  --r-lg: 32px;
  --r-pill: 999px;

  /* Sombras */
  --shadow-sm: 0 2px 8px rgba(31, 26, 46, 0.06);
  --shadow-md: 0 8px 24px rgba(31, 26, 46, 0.08);
  --shadow-pop: 0 10px 30px rgba(255, 61, 127, 0.25);

  /* Movimiento */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;
}
```

---

## Tags

`balloons` · `party-shop` · `ecommerce` · `playful` · `festive` · `clean` · `white-base` · `vivid-accents` · `rounded` · `light-theme`
