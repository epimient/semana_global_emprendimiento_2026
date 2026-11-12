# Sistema de diseño — Semana Global de Emprendimiento 2026

Documento de referencia visual y técnico de la landing. Todo lo que aquí se describe
está implementado en `css/styles.css`; los nombres de clase son los reales del código.

- **Archivo principal:** `index.html`
- **Estilos:** `css/styles.css` (se carga después de Bootstrap para sobrescribirlo)
- **Comportamiento:** `js/main.js`
- **Contenido fuente:** [`docs/contenido.md`](./contenido.md)
- **Vista de la prueba D2:** [escritorio](./previews/conferencistas-d2-escritorio.png)
  y [móvil](./previews/conferencistas-d2-movil.png)

---

## 1. Concepto

**Cartel caribe + registro editorial.**

La página se piensa como un cartel de feria impreso en papel barato: tipografía
condensada a escala desproporcionada, colores de bandera de carnaval y bordes duros.
Encima de eso se superpone una capa de "registro editorial": etiquetas monoespaciadas,
numeración, líneas de 1 px y datos alineados como en una ficha técnica.

La tensión entre esos dos registros —grito y archivo— es lo que hace que la página no
se lea como una plantilla. La regla es simple: **lo que se grita va en display; lo que
se consulta va en mono; lo que se explica va en Instrument Sans.**

### Referencias

- Carteles de carnaval y serigrafía popular del Caribe colombiano
- Suplementos culturales impresos: columnas, folios, filetes
- Señalética de auditorio: números grandes, horarios en mono
- Rave flyers de los 90: repetición, trama, tipografía apretada

---

## 2. Principios

1. **La tipografía dirige la imagen.** No hay fotos de relleno ni ilustraciones
   genéricas. Los retratos identifican a los conferencistas; las letras, el color
   y las texturas sostienen el peso visual del resto de la página.
2. **Color de fiesta, uso disciplinado.** Un color de fondo por sección y un solo
   acento dentro de ella. Nunca dos acentos compitiendo.
3. **Borde duro, no sombra difusa.** Los desplazamientos son de 3–4 px y las sombras
   sólidas de 8–12 px; las sombras suaves quedan reservadas a elementos flotantes.
4. **Datos siempre en mono.** Horas, fechas, cifras, países y etiquetas: IBM Plex Mono,
   mayúsculas, tracking amplio.
5. **Nada decorativo que no comunique.** Cada línea, número o marca cuadrada tiene una
   función: separar, numerar o señalar.
6. **El movimiento es un acento, no un espectáculo.** Apariciones cortas, un ticker,
   nada que rebote.

---

## 3. Tokens

Definidos en `:root` al inicio de `css/styles.css`.

### 3.1 Color

| Token | Valor | Rol |
| --- | --- | --- |
| `--ink` | `#141433` | Fondo oscuro base, texto sobre papel |
| `--paper` | `#f6f1e6` | Fondo claro base, texto sobre tinta |
| `--paper-2` | `#fcf8ef` | Hover de botón marigold, superficies elevadas |
| `--marigold` | `#ffc53d` | Acento primario: CTA, foco en oscuro, ticker |
| `--coral` | `#f4543c` | Sección de invitación, foco en claro, hover de enlaces |
| `--turquoise` | `#14a08f` | Tercer acento: marcas de "qué encontrarás" |
| `--deep` | `#0c3b3a` | Fondo de la agenda y del bloque de experiencias |

**Derivados** (no son colores nuevos, son opacidades de los anteriores):

| Token | Valor | Uso |
| --- | --- | --- |
| `--line-ink` | `rgba(20, 20, 51, 0.16)` | Filetes sobre papel |
| `--line-paper` | `rgba(246, 241, 230, 0.18)` | Filetes sobre oscuro |
| `--muted-ink` | `rgba(20, 20, 51, 0.68)` | Texto secundario sobre papel |
| `--muted-paper` | `rgba(246, 241, 230, 0.66)` | Texto secundario sobre oscuro |

**Contraste medido** (WCAG 2.1, texto normal ≥ 4.5:1):

| Combinación | Ratio |
| --- | --- |
| Papel sobre tinta | 15.83:1 |
| Tinta sobre papel | 15.83:1 |
| Tinta sobre marigold | 11.30:1 |
| Papel sobre verde profundo | 10.95:1 |
| Texto secundario (`--muted-paper`) sobre tinta | 7.40:1 |
| Tinta sobre coral | 5.25:1 |
| Texto secundario (`--muted-ink`) sobre papel | 5.88:1 |
| Texto secundario en la sección coral (tinta al 90 %) | 4.77:1 |
| Error sobre papel | 6.67:1 |

### 3.2 Tipografía

| Token | Valor |
| --- | --- |
| `--f-display` | `"Big Shoulders Display", "Arial Narrow", Impact, sans-serif` |
| `--f-body` | `"Instrument Sans", system-ui, -apple-system, "Segoe UI", sans-serif` |
| `--f-mono` | `"IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace` |

### 3.3 Movimiento

| Token | Valor | Uso |
| --- | --- | --- |
| `--ease` | `cubic-bezier(0.22, 0.7, 0.2, 1)` | Todas las transiciones de la página |
| `--d` | variable por elemento | Retardo escalonado en `[data-reveal]` |

### 3.4 Bordes, radios y sombras

- **Radios:** `0` en todo el sistema. Las tres únicas declaraciones de `border-radius`
  del archivo valen `0` (botones, campos de texto y checkbox): la página no usa
  esquinas redondeadas ni píldoras.
- **Filetes:** `1px` para separar filas; `2px` para encabezados de bloque
  (ej. `.faq-list`, `.purpose`) y bordes de tarjeta; `2px solid` en botones.
- **Sombra dura:** el desplazamiento es sólido y del color del acento, nunca difusa:

  | Elemento | Sombra |
  | --- | --- |
  | Tarjetas en hover (`.find-card`, `.speaker`, `.inst-card`) | `8px 8px 0 var(--accent)`, con `translate(-4px, -4px)` |
  | Panel de propósito (`.purpose`) | `10px 10px 0 var(--marigold)` |
  | Tarjeta de inscripción (`.qr-card`) | `12px 12px 0 var(--ink)` |

  En reposo las tarjetas están planas: la sombra aparece al pasar el cursor y funciona
  como confirmación de interacción. Los elementos flotantes (menú móvil) usan sombra
  difusa.

---

## 4. Tipografía

### 4.1 Familias y roles

| Familia | Rol | Dónde |
| --- | --- | --- |
| **Big Shoulders Display** (500–900) | Titulares, cifras gigantes, preguntas del FAQ, nombres de conferencistas | `.hero-title`, `.sec-title`, `.day-ticket-num`, `.agenda-tab-num`, `.faq-q`, `.speaker-name`, `.foot-year` |
| **Instrument Sans** (400–700) | Párrafos, descripciones y botones | `body`, `.btn-poster`, `.qr-desc`, `.session-desc` |
| **IBM Plex Mono** (400–600) | Etiquetas, fechas, horas, países, avisos | `.eyebrow`, `.mono`, `.session-time`, `.hero-meta`, `.inst-country` |

### 4.2 Escala

Las tres escalas principales usan `clamp()` y crecen con el viewport:

| Elemento | Tamaño | Notas |
| --- | --- | --- |
| `.hero-title` | `clamp(3rem, 7vw, 5.2rem)` | `line-height: 0.85`, mayúsculas, tracking `-0.015em` |
| `.hero-title-sub` | `0.47em` del título (`0.5em` en móvil) | En marigold, misma familia |
| `.sec-title` | `clamp(2.1rem, 4.4vw, 3.85rem)` | `line-height: 0.9`, `max-width: 22ch` |
| `.sec-title--xl` | `clamp(2.4rem, 5.3vw, 4.7rem)` | `max-width: 16ch` |
| `.hero-year` | `clamp(11rem, 27vw, 27rem)` | Marca de agua, `opacity` baja, fuera de flujo |
| `.eyebrow` | `0.7rem` | Mono, `letter-spacing: 0.2em`, mayúsculas |
| `.hero-lead` | `clamp(1rem, 1.3vw, 1.18rem)` | `max-width: 44ch` |
| `body` | `16px` / `1.5` | Base |

**Reglas de composición:**

- Los titulares van siempre en mayúsculas y con `text-wrap: balance`.
- Los párrafos usan `text-wrap: pretty` y se limitan a 36–46 caracteres por línea.
- El mono se usa en tamaños pequeños (0.56–0.7 rem) y siempre en mayúsculas con
  tracking amplio para compensar.
- No se usa itálica en display. Instrument Sans itálica solo para énfasis de cuerpo.

### 4.3 Carga

Google Fonts con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`, y
`display=swap`. Pesos cargados: Big Shoulders 500–900, Instrument Sans 400–700 (+ itálica
400), IBM Plex Mono 400–600. Si se agrega un peso nuevo, hay que actualizar el `<link>`
del `<head>`.

---

## 5. Layout

### 5.1 Contenedor

Se usa Bootstrap solo para grid, tabs y offcanvas. El contenedor es `.container-xxl`
con padding lateral propio:

```css
.container-xxl { padding-inline: clamp(1.15rem, 4vw, 2.5rem); }
```

### 5.2 Breakpoints

| Ancho | Qué cambia |
| --- | --- |
| `< 576px` | Hero a una columna, estadísticas 2×2, menú hamburguesa |
| `≥ 576px` | Estadísticas del hero en 4 columnas |
| `≥ 768px` | Grids de 2 columnas (tarjetas, instituciones, conferencistas) |
| `≥ 992px` | Layout editorial de dos columnas con encabezado fijo (`.sticky-head`); conferencistas en 3 columnas |
| `≥ 1200px` | Navegación horizontal visible, logo del evento a 50 px, footer 4 columnas |

La navegación de escritorio aparece en `1200px`, no en `992px`: por debajo, seis
enlaces más el CTA no caben sin apretarse.

### 5.3 Ritmo vertical

```css
.sec { padding-block: clamp(4rem, 8vw, 7rem); }
.sec--tight { padding-top: 0; }
```

Cada sección declara fondo y variables locales (`--muted`, `--line`, `--focus`) para que
sus hijos hereden el contraste correcto sin repetir colores:

| Clase | Fondo | Texto | Acento de foco |
| --- | --- | --- | --- |
| `.sec--paper` | Papel | Tinta | Coral |
| `.sec--ink` | Tinta | Papel | Marigold |
| `.sec--deep` | Verde profundo | Papel | Marigold |
| `.sec--coral` | Coral | Tinta | Tinta |

### 5.4 Orden de secciones

| # | Sección | `id` | Fondo |
| --- | --- | --- | --- |
| 1 | Hero | `#top` | Tinta |
| 2 | Ticker de temas | — | Marigold |
| 3 | Sobre el evento + propósito | `#evento` | Papel |
| 4 | Qué encontrarás | `#encontraras` | Papel |
| 5 | Ejes temáticos | `#ejes` | Tinta |
| 6 | Instituciones | `#instituciones` | Papel |
| 7 | Agenda | `#agenda` | Verde profundo |
| 8 | Conferencistas | `#conferencistas` | Papel |
| 9 | A quién está dirigido | `#para-quien` | Tinta |
| 10 | Modalidad y lugar | `#lugar` | Papel |
| 11 | Invitación + inscripción por QR | `#participar` | Coral |
| 12 | Preguntas frecuentes | `#faq` | Papel |
| 13 | Pie de página | — | Tinta |

---

## 6. Componentes

### 6.1 Cabecera — `.site-head`

Fija, transparente sobre el hero. Al pasar `scrollY > 40` recibe `.is-stuck`:
fondo `rgba(20, 20, 51, 0.97)`, `backdrop-filter: blur(8px)`, filete inferior y
padding reducido (de `0.95rem` a `0.55rem`).

- `.brand` → solo el logo del evento (ver §10).
- `.nav-desktop` → visible desde `1200px`; enlace activo con `.is-active`
  (subrayado marigold) calculado en JS, no con scrollspy de Bootstrap.
- `.btn-poster--sm` → CTA compacto.
- `.burger` → abre el offcanvas en anchos menores a `1200px`.
- `.menu-movil` → offcanvas derecho, fondo tinta, enlaces en display grandes.
  Se cierra al pulsar cualquier enlace.

### 6.2 Hero — `.hero`

- `.hero-grain`: textura de ruido SVG en `data:` URI, `mix-blend-mode: overlay`,
  `opacity: 0.32`. Es la única textura de la página.
- `.hero-year`: "2026" gigante en outline (`-webkit-text-stroke`), decorativo,
  `aria-hidden`.
- `.hero-logo`: logo claro del evento a ancho grande sobre el titular.
- `.hero-title`: titular en dos niveles (blanco + subtítulo marigold).
- `.hero-meta`: fecha, ciudad y modalidad separadas por filetes verticales.
- `.hero-stats`: cuatro cifras (jornadas, instituciones, países, modalidad) con
  `.hero-stat` y `.hero-stat-word`.
- `.hero-days` / `.day-ticket`: **elemento firma**. Tres filas tipo ticket con
  número de día (display), día de la semana, temario, horario en mono y un botón
  "Añadir a mi calendario". En hover o foco la fila entera se invierte a marigold,
  como un ticket que se marca.

### 6.3 Ticker — `.ticker`

Cinta marigold de ancho completo. `.ticker-track` se duplica en dos `.ticker-group`
idénticos y se desplaza con `@keyframes ticker` en 38 s lineales, infinito. Se pausa
con `:hover` y se detiene con `prefers-reduced-motion`.

### 6.4 Etiquetas de sección — `.eyebrow`

Mono, mayúsculas, `0.2em` de tracking, precedida por `.eyebrow-mark` (cuadrado de 9 px).
Variantes de color: `--coral`, `--ink`; en fondos oscuros se usa `.eyebrow--light`.

### 6.5 Botones

| Clase | Aspecto | Uso |
| --- | --- | --- |
| `.btn-poster` | Marigold sólido, texto tinta, sin radio | Acción principal |
| `.btn-poster--sm` | Versión compacta | Cabecera |
| `.btn-poster--full` | Fondo tinta, texto papel, `width: 100%` | Dentro de tarjetas |
| `.btn-poster--muted` | Borde tenue, `cursor: not-allowed` | Acciones no disponibles |
| `.btn-ghost` | Borde papel, fondo transparente | Acción secundaria sobre oscuro |
| `.btn-ghost--ink` | Borde tinta | Acción secundaria sobre papel |

Todos comparten `border: 2px`, `padding: 0.95rem 1.55rem`, `font-weight: 600` y
transición de 0.22 s. La flecha `→` se desplaza 4 px en hover.

### 6.6 Sobre el evento — `.purpose`

Panel con borde completo de 2 px, fondo `--paper-2` y sombra dura marigold de 10 px.
`.purpose-mark` es la marca cuadrada; `.purpose-quote` lleva el texto de propósito en
display; `.purpose-note` el párrafo secundario. En `≥992px` se parte en dos columnas con
el panel de propósito alineado a la derecha.

### 6.7 Qué encontrarás — `.find-grid` / `.find-card`

Cinco tarjetas: cuatro en grid y una a lo ancho (`.find-card--wide`). Cada una lleva
`.find-mark` (cuadrado de color), título en display y descripción. Los colores de las
marcas rotan entre marigold, coral y turquesa; no se usa más de un acento por tarjeta.
Cada tarjeta declara el suyo en línea (`style="--accent: var(--coral)"`) y ese token
alimenta tanto la marca como la sombra del hover.

### 6.8 Ejes temáticos — `.axis-list` / `.axis`

Lista numerada `01`–`05`. `.axis-num` en display grande y marigold; `.axis-body`
con título y descripción. `.axis-total` cierra la lista con el conteo. Separadores de
1 px entre filas; en `≥992px` el encabezado queda fijo (`.sticky-head`).

### 6.9 Instituciones — `.inst-card`

Seis tarjetas: cinco invitadas y la anfitriona. Estructura:

- `.inst-head` → `.inst-abbr` (sigla en display) + `.inst-country` (mono)
- `.inst-full` → nombre completo
- `.inst-desc` → aporte de la institución
- `.inst-link` → enlace externo con `↗`

La anfitriona usa `.inst-card--host`: fondo tinta, texto papel, para separarla del resto
sin salir de la paleta.

### 6.10 Agenda — `.agenda-tabs` / `.agenda-tab`

Tres pestañas de Bootstrap con apariencia de ticket:

- `.agenda-tab-num` → 18 / 19 / 20 en display
- `.agenda-tab-dow` → día de la semana
- `.agenda-tab-note` → temario corto

La pestaña activa invierte colores (fondo marigold, texto tinta). Los enlaces
`[data-agenda-day]` del hero abren la pestaña correspondiente mediante
`bootstrap.Tab.getOrCreateInstance(...).show()`.

Cada jornada lista sesiones `.session` con `.session-time` (mono), `.session-kind`,
`.session-title` y `.session-meta`. `.session-kind--talk` distingue conferencias.
La agenda contiene nueve bloques: tres por día, de 18:00 a 21:00. Los temas
de Renato da Costa y Luis Betancourt aparecen también en sus tarjetas de
conferencista; Luis está programado el viernes de 19:00 a 20:00.

### 6.11 Conferencistas — `.speaker`

Cuatro tarjetas usan fotos reales: Gregorio Mercado, Luis Betancourt, Ricardo Peña
y José Vargas. La versión D2 las trata como rotograbado en tinta `#141433`
y papel `#f6f1e6`: `#speaker-duotone` primero elimina la saturación y luego
asigna los tonos mediante `feComponentTransfer`. El filtro se define en un SVG
oculto al comienzo del `body` y se aplica con CSS; los originales permanecen
intactos. No se necesita una imagen procesada adicional por foto.

`.speaker-portrait` usa proporción 4:5 en todos los tamaños. Las fotos llenan
el recorte con `object-fit: cover`; `--photo-position` ajusta la posición de
Ricardo y José. La barra superior de 6 px y el chip del país toman el
`--accent` de cada tarjeta: turquesa, amarillo, coral, tinta y verde profundo. Ricardo
usa WebP para reducir la descarga. Las cinco imágenes llevan `loading="lazy"`
y dimensiones intrínsecas.

Renato da Costa usa una foto con la misma proporción 4:5. `.speaker-country` muestra el
país junto a la bandera y `.speaker--outline` mantiene la variante de fondo
claro de José. Las fotos tienen `alt=""` porque el nombre aparece como
encabezado de la misma tarjeta. No hay fotos de conferencistas en el hero ni
en otras secciones.

Debajo: `.speaker-name`, `.speaker-org`, `.speaker-bio` y `.speaker-talk`.
`.speaker-slot` enlaza con la jornada correspondiente de la agenda. El bloque
`.speaker-experiences` (fondo tinta) agrupa las experiencias universitarias.

### 6.12 A quién está dirigido — `.audience`

Lista de cinco perfiles con `.audience-mark` (cuadrado) y texto. Dos columnas en
`≥768px`. Sin tarjetas: son líneas, para que no compitan con las secciones vecinas.

### 6.13 Modalidad y lugar — `.place-card`

Dos tarjetas: presencial y virtual.

- `.place-band` → fila de datos (fechas y horario) separada por un filete discontinuo
- `.place-name` / `.place-address` / `.place-coords`
- `.place-facts` → lista de datos en mono
- `.place-note` → aviso de enlace de Teams pendiente

`.place-card--virtual` invierte el esquema de color.

### 6.14 Invitación + inscripción por QR — `.sec--coral`

- `.cta-lead` → párrafo de entrada sobre coral (Instrument Sans, tinta al 90 %)
- `.cta-facts` → tres datos en mono
- `.cta-actions` → CTA principal + botón de calendario
- `.qr-card` → tarjeta papel con sombra dura, título `.qr-title`, instrucciones,
  QR en marco blanco y botón que abre el mismo Google Forms. El QR se muestra a
  un máximo de 19 rem para conservar su lectura en móvil y escritorio.

### 6.15 FAQ — `.faq-list` / `.faq-item`

`<details>` nativo, sin JavaScript. `summary` en display mayúsculas; el indicador
`.faq-plus` son dos barras de 2 px que rotan 45° al abrir (`[open]`). El filete
superior de `.faq-list` es de 2 px, más grueso que los separadores internos.

### 6.16 Pie de página — `.site-foot`

Fondo tinta. `.foot-top` en grid de 4 columnas desde `992px`.

- `.foot-brand` → logo de Americana (152 px) + logo del evento (300 px) + descripción
  + fechas
- `.foot-col` → navegación, organiza, instituciones
- `.foot-inst` → institución + país alineados a los extremos
- `.foot-year` → "2026" gigante recortado, decorativo
- `.foot-bottom` → copyright y ubicación

---

## 7. Estados

| Estado | Cómo se ve |
| --- | --- |
| `:hover` en enlaces | Cambia a `--coral` sobre papel, `--marigold` sobre oscuro |
| `:hover` en botones | Invierte fondo y texto; la flecha avanza 4 px |
| `:hover` en tarjetas | Se elevan 4 px y aparece la sombra dura de 8 px en su acento |
| `:focus-visible` | Outline de 3 px, `outline-offset: 3px`, color según `--focus` de la sección |
| Cabecera desplazada | `.is-stuck` (fondo sólido, menos padding) |
| Enlace de nav activo | `.is-active` con subrayado marigold |
| Pestaña de agenda activa | Fondo marigold, texto tinta |
| Pestaña FAQ abierta | `.faq-plus` rotado 45° |

---

## 8. Movimiento

| Efecto | Implementación | Duración |
| --- | --- | --- |
| Revelado al desplazar | `[data-reveal]` + `IntersectionObserver` → `.is-in` | 0.7 s, `--d` escalona |
| Ticker | `@keyframes ticker` sobre `.ticker-track` | 38 s, lineal, infinito |
| Hover de botones | Transición de fondo, color y borde | 0.22 s |
| Flecha del CTA | `translateX(4px)` | 0.22 s |
| Cabecera al hacer scroll | Transición de padding, fondo y borde | 0.3 s |
| Indicador FAQ | Rotación 45° | 0.25 s |

**Con `prefers-reduced-motion`:** todas las animaciones y transiciones se reducen a
`0.001ms`, el ticker se detiene y los elementos con `[data-reveal]` aparecen visibles
desde el inicio. El HTML también incluye un `<noscript>` que fuerza la visibilidad si
JavaScript está desactivado.

---

## 9. Accesibilidad

- **Foco:** `:focus-visible` global de 3 px con offset; el color se adapta al fondo de
  cada sección (`--focus`).
- **Contraste:** todo el texto informativo supera 4.5:1 (ver §3.1). El valor más bajo
  es el de la sección coral, con 4.77:1. Quedan fuera de esa regla los elementos
  decorativos (`aria-hidden`), los controles deshabilitados y los separadores.
- **Teclado:** skip link al inicio, navegación completa por tabs, `Enter`/`Espacio` en
  acordeones nativos, foco atrapado en el offcanvas por Bootstrap.
- **Semántica:** un solo `<h1>`, jerarquía de `h2`/`h3` sin saltos, `landmarks`
  (`header`, `main`, `footer`, `nav` con `aria-label`), `aria-hidden` en todo lo
  decorativo (marca de agua, textura, flechas).
- **Inscripción:** el QR tiene texto alternativo y el enlace directo permite abrir
  el mismo destino sin escanear la imagen.
- **Imágenes:** todas con `alt`; los retratos de las tarjetas y las banderas usan
  `alt=""` porque su nombre o país está escrito en el mismo bloque. Los logos y
  las fotos llevan dimensiones explícitas; el marco 4:5 reserva el espacio visual.
- **Zoom:** el layout no fija anchos en píxeles para bloques de texto y usa `clamp()`
  en los titulares, de modo que ampliar el texto no genera scroll horizontal.

---

## 10. Logos y marca

El sitio usa un logo institucional y dos variantes del logo del evento.

| Archivo | Fondo para el que sirve | Dónde se usa |
| --- | --- | --- |
| `assets/americana-logo-header-blanco.svg` | Oscuro | Pie de página (152 px) |
| `assets/logo-semana-global.svg` | Claro | Uso externo / futuras secciones claras |
| `assets/logo-semana-global-claro.svg` | Oscuro | Cabecera (50 px desktop / 40 px móvil), hero (hasta 620 px) y pie (300 px) |
| `assets/favicon.svg` | — | Pestaña del navegador |

`logo-semana-global-claro.svg` es una **versión invertida** generada a partir del
original: el azul marino `#00237d` se reemplazó por el papel `#f6f1e6` y el amarillo
`#fdae01` se mantuvo. La franja inferior del logo es un recorte dentro del trazo, así
que el texto toma el color del fondo: **solo funciona sobre superficies oscuras.**

**Reglas:**

- No poner el logo sobre una caja blanca para "que se vea": usar la variante correcta.
- Altura mínima del logo del evento: 40 px. Por debajo, la línea inferior se vuelve ilegible.
- No deformar, no recolorear fuera de las dos variantes, no aplicar sombras ni contornos.
- Mantener aire alrededor: mínimo media altura del logo en cada lado.
- El logo de Americana va sobre fondo oscuro únicamente (es la versión blanca).

### 10.1 Banderas de países

Cuatro banderas, una por país participante, en `assets/flags/`. Siempre van
acompañadas del nombre del país escrito al lado; **nunca solas**.

| Archivo | Tamaño real | Uso |
| --- | --- | --- |
| `flags/colombia.png` | 64 × 43 | Colombia (anfitriona) |
| `flags/mexico.png` | 64 × 43 | México |
| `flags/brasil.png` | 64 × 43 | Brasil |
| `flags/argentina.png` | 64 × 43 | Argentina |

**Dónde aparecen:** chips de "Sobre el evento" (`.flag`, 20 × 13), tarjetas de
instituciones y tarjetas de conferencistas (`.flag--sm`, 16 × 11).

**Reglas:**

- `alt=""`: el país ya está en texto, la bandera es refuerzo visual, no información
  duplicada.
- Borde de 1 px para separarlas del fondo; `.flag--light` cuando van sobre oscuro.
- Las cuatro se normalizan a un marco de 64 × 43 con `object-fit: cover`, así el
  recorte es mínimo (3–15 %) y todas comparten proporción y alineación.
- No se usan emoji de bandera: en Chrome sobre Windows no existen y se ven como
  las letras del código ISO.
- No se usan en el hero, en direcciones ni en el pie de página.

Las versiones optimizadas pesan 6.6 KB en total. Los PNG originales entregados por
la organización quedan intactos en `assets/`.

---

### 10.2 Retratos de conferencistas

| Tarjeta | Archivo servido | Origen | Estado |
| --- | --- | --- | --- |
| Gregorio Mercado | `gregorio-mercado.jpg` (63,5 KB; 630 × 630) | Foto recibida, fondo blanco | D2 |
| Renato da Costa | `renato-da-costa.png` (1086 × 1448) | Foto recibida | D2 |
| Luis Betancourt | `luis-betancourt.jpeg` (74,2 KB; 1086 × 1448) | Foto recibida, fondo blanco | D2 |
| Ricardo Peña | `ricardo-pena.webp` (133,9 KB; 1024 × 1024) | JPEG recibido de 445,8 KB | D2 |
| José Vargas | `jose-vargas.jpeg` (120,9 KB; 960 × 1280) | Foto recibida, fondo de oficina | D2 |

Los archivos están en `assets/conferencistas/`; el filtro no añade archivos
descargables. Conservar los originales para poder rehacer los encuadres.
La foto de Renato se incorporó después de las [capturas D2](./previews/), que
muestran el estado anterior de su tarjeta.

Antes de publicar los retratos, confirmar con la organización el permiso de
difusión y la versión final de nombres, cargos y temas. Ver
[`pendientes.md`](./pendientes.md).

---

## 11. Do / Don't

**Sí**

- Usar una sola familia display y dejar que el tamaño haga el trabajo.
- Escribir etiquetas en mono y mayúsculas, cortas (2–4 palabras).
- Alternar fondos de sección para marcar ritmo.
- Usar filetes de 1 px para separar datos y de 2 px para separar bloques.
- Reservar el marigold para la acción principal de cada pantalla.

**No**

- Mezclar dos acentos en la misma tarjeta.
- Usar sombras difusas o degradados como decoración.
- Poner párrafos largos sobre coral o verde profundo.
- Inventar iconos: la página no usa librería de iconos, solo tipografía y formas.
- Cambiar el orden de las hojas de estilo: Bootstrap primero, `styles.css` después.

---

## 12. Checklist para una sección nueva

1. Elegir el fondo (`.sec--paper`, `--ink`, `--deep`, `--coral`) y verificar que no
   repita el de la sección anterior.
2. Encabezado: `.eyebrow` + `.sec-title` (máx. 22 caracteres por línea) + `.sec-intro`.
3. Definir el patrón: ¿lista numerada, tarjetas, filas de datos o ticket? No inventar
   uno nuevo si ya existe.
4. Añadir `data-reveal` a los bloques, con `style="--d:120ms"` para escalonar.
5. Verificar contraste del texto secundario sobre el nuevo fondo.
6. Probar en 390, 768, 1024 y 1440 px sin scroll horizontal.
7. Navegar la sección solo con teclado.
8. Actualizar el `id` en la navegación (desktop y móvil) si debe aparecer en el menú.
