# Semana Global de Emprendimiento 2026 — Landing page

Sitio de una página para la **Semana Global de Emprendimiento 2026**, organizada por el
Centro de Innovación y Emprendimiento (CIE) de la Corporación Universitaria Americana.
Tres jornadas híbridas desde Barranquilla con instituciones de México, Brasil, Argentina
y Colombia.

> Documentación de diseño: [`docs/design.md`](docs/design.md) ·
> Contenido fuente: [`docs/contenido.md`](docs/contenido.md) ·
> Qué falta para publicar: [`docs/pendientes.md`](docs/pendientes.md)

---

## El evento

| | |
| --- | --- |
| **Fechas** | 18, 19 y 20 de noviembre de 2026 |
| **Horario** | 18:00 – 20:30 (COT, UTC−5) |
| **Lugar** | Auditorio Cosmos — Calle 72 # 41C-64, Barranquilla, Colombia |
| **Modalidad** | Híbrida (presencial + Microsoft Teams) |
| **Eje temático** | Innovación y Modelos de Negocios Digitales |
| **Organiza** | CIE — Corporación Universitaria Americana |
| **Instituciones** | UPAEP, UTXJ, UABC (México) · UniEnsino (Brasil) · IUCE (Argentina) · Americana (Colombia) |
| **Conferencistas** | 5 voces: Colombia, Brasil y Argentina + una participación especial |

---

## Estado

Sitio estático completo, probado en 390 / 768 / 1024 / 1440 px. Sin build, sin
dependencias instaladas, sin backend.

**Antes de publicar hay pendientes que dependen de la organización** — ver
[Pendientes](#pendientes-antes-de-publicar).

---

## Stack

| Pieza | Uso |
| --- | --- |
| HTML5 + CSS3 + JavaScript moderno (IIFE, sin dependencias) | Todo el sitio |
| Bootstrap 5.3.3 (CDN, jsDelivr) | Grid, tabs de la agenda, offcanvas del menú móvil |
| Google Fonts | Big Shoulders Display, Instrument Sans, IBM Plex Mono |
| `css/styles.css` | Sistema visual completo; se carga **después** de Bootstrap |

No hay framework, bundler ni `package.json`. El sitio funciona abriendo `index.html`.

---

## Estructura

```
Landing_page_emprendimiento/
├── index.html                       Página completa (contenido + SEO + JSON-LD)
├── css/
│   └── styles.css                   Tokens, secciones, componentes, breakpoints
├── js/
│   └── main.js                      Cabecera, reveal, countdown, tabs, ICS, formulario
├── assets/
│   ├── americana-logo-header-blanco.svg   Logo institucional (fondos oscuros)
│   ├── logo-semana-global.svg             Logo del evento (fondos claros)
│   ├── logo-semana-global-claro.svg       Logo del evento invertido (fondos oscuros)
│   ├── logo_sewmana-global.svg            Archivo original subido (sin usar)
│   ├── flags/                             Banderas normalizadas 64 × 43 (CO, MX, BR, AR)
│   └── favicon.svg                        Favicon marigold
└── docs/
    ├── design.md                    Sistema de diseño y reglas de marca
    ├── contenido.md                 Texto fuente aprobado del evento
    └── pendientes.md                Qué falta para publicar: links, formulario, datos
```

---

## Cómo verlo localmente

Cualquier servidor estático sirve. Con Python, desde la raíz del proyecto:

```bash
python3 -m http.server 8123
```

Luego abrir <http://localhost:8123/>.

Alternativas:

```bash
npx serve .          # Node
php -S localhost:8123  # PHP
```

También funciona con doble clic en `index.html`, pero el servidor local reproduce mejor
las rutas y evita restricciones del navegador.

---

## Funcionalidades

| Función | Cómo funciona | Dónde |
| --- | --- | --- |
| Cabecera fija | Se compacta al pasar 40 px de scroll (`is-stuck`) | `js/main.js` → *Cabecera fija* |
| Revelado al desplazar | `IntersectionObserver` sobre `[data-reveal]`; se desactiva sin JS o con movimiento reducido | `js/main.js` → *Revelado al desplazar* |
| Navegación activa | Cálculo propio por posición de sección, sin scrollspy de Bootstrap | `js/main.js` → *Navegación activa* |
| Cuenta regresiva | Hasta `2026-11-18T18:00:00-05:00`; muestra "En curso" y "Edición finalizada" en su momento; se actualiza cada 30 s | `js/main.js` → *Cuenta regresiva* |
| Enlaces a jornadas | Los botones del hero abren la pestaña de agenda correspondiente | `js/main.js` → *Agenda* |
| Menú móvil | Offcanvas de Bootstrap; se cierra al elegir un enlace | `js/main.js` → *Menú móvil* |
| Calendario `.ics` | Genera un archivo con los 3 eventos (23:00Z–01:30Z) y lo descarga | `js/main.js` → *Calendario* |
| Formulario | Validación en cliente de 7 campos, mensajes accesibles y pantalla de confirmación | `js/main.js` → *Formulario de registro* |
| Agenda | Tres pestañas de Bootstrap con apariencia de ticket | HTML + CSS |
| FAQ | `<details>` nativo, sin JavaScript | HTML + CSS |

---

## Cómo editar el contenido

El texto aprobado vive en [`docs/contenido.md`](docs/contenido.md). Para reflejar un
cambio en la página:

| Qué cambiar | Dónde buscarlo en `index.html` |
| --- | --- |
| Titular del hero | `class="hero-title"` |
| Fecha, ciudad, modalidad del hero | `class="hero-meta"` |
| Cifras del hero (03 / 06 / 04) | `class="hero-stats"` |
| Textos de "Sobre el evento" y propósito | `id="evento"` |
| Tarjetas de "Qué encontrarás" | `id="encontraras"` |
| Ejes temáticos 01–05 | `id="ejes"` |
| Instituciones | `id="instituciones"` |
| Agenda y horarios | `id="agenda"` (pestañas `dia-18`, `dia-19`, `dia-20`) |
| Conferencistas | `id="conferencistas"` |
| Perfiles del público | `id="para-quien"` |
| Sede, dirección y Teams | `id="lugar"` |
| Formulario y aviso legal | `id="participar"` |
| Preguntas frecuentes | `id="faq"` |
| Pie de página | `<footer class="site-foot">` |

**Datos que aparecen en varios lugares y hay que sincronizar:**

1. **Horarios:** hero (`.day-ticket-time`), agenda y eventos del `.ics` (`js/main.js`).
2. **Fecha del countdown:** constante `countdownStart` en `js/main.js`.
3. **Institución y país:** sección de instituciones y columna del pie.
4. **Nombre del evento:** `<title>`, meta description, Open Graph, JSON-LD y pies.
5. **Banderas:** el país aparece en tres bloques (chips, instituciones, conferencistas);
   el PNG vive en `assets/flags/` y se reutiliza en los tres. Si se suma un país, hay que
   agregar su bandera a 64 × 43 con el mismo recorte.

Para cambiar los colores o la tipografía, editar los tokens en `:root` al inicio de
`css/styles.css`; el resto del archivo los hereda.

---

## SEO y metadatos

Ya incluido en `index.html`:

- `<title>` y `meta description` en español
- `canonical` y `og:url` — **pendientes de sustituir por la URL final**
- Open Graph (`og:title`, `og:description`, `og:locale`, `og:site_name`) y Twitter Card
- `theme-color` (`#141433`)
- JSON-LD `schema.org/Event` con fechas, modalidad híbrida, sede presencial y virtual,
  y organizador
- `lang="es"`, favicon SVG

**Falta:** `og:image` (1200 × 630 px). Sin esa imagen, las vistas previas en redes
saldrán sin foto. Se recomienda generarla con el logo del evento sobre fondo tinta.

---

## Accesibilidad

- Skip link, un solo `<h1>`, jerarquía de encabezados sin saltos.
- Foco visible de 3 px con color adaptado al fondo de cada sección.
- Todo el texto informativo supera 4.5:1 de contraste; el valor más bajo es 4.77:1.
- Formulario con `label`, `required`, `aria-invalid`, `aria-describedby` y foco al primer
  error.
- `prefers-reduced-motion` desactiva ticker, transiciones y revelados.
- `<noscript>` deja visible todo lo que depende de JavaScript.

Verificación rápida: recorrer con `Tab` desde el inicio y activar el modo de movimiento
reducido del sistema operativo.

---

## Publicación

Es un sitio 100 % estático. Subir la carpeta completa (o al menos `index.html`, `css/`,
`js/` y `assets/`) a cualquier hosting:

- **Netlify / Vercel / Cloudflare Pages:** arrastrar la carpeta o conectar el repo, sin
  comando de build y con directorio raíz en `/`.
- **Hosting institucional (cPanel/FTP):** copiar a `public_html` conservando la estructura.
- **GitHub Pages:** publicar desde la raíz de la rama principal.

Requisitos:

- Mantener las rutas relativas (`css/styles.css`, `assets/…`).
- Servir por HTTPS: Bootstrap y las fuentes vienen de CDN.
- Actualizar `canonical` y `og:url` con el dominio definitivo.

---

## Pendientes antes de publicar

Lista resumida. El detalle —con impacto, ubicación en el código, opciones de solución y
responsables— está en [`docs/pendientes.md`](docs/pendientes.md).

- [ ] **Endpoint del formulario.** Hoy solo valida y muestra confirmación; no envía datos.
      Conectar a un servicio (Microsoft Forms, Formspree, API institucional) o desactivar
      el envío con un mensaje honesto.
- [ ] **Autorización de tratamiento de datos.** El texto legal actual está marcado como
      pendiente de aprobación institucional; reemplazarlo por el aprobado.
- [ ] **Enlace de Microsoft Teams.** Aparece como "pendiente de publicación" en la
      sección de modalidad y en el FAQ.
- [ ] **Confirmación de horarios.** Verificar 18:00–20:30 COT y actualizar agenda,
      hero y `.ics` si cambian.
- [ ] **`og:image`** de 1200 × 630 px.
- [ ] **URL canónica y `og:url`** definitivas.
- [ ] **Revisión de nombres y cargos** de conferencistas contra la lista oficial.
- [ ] **Reemplazar los retratos tipográficos por fotos**, si la organización las entrega
      (hoy son iniciales por diseño, no por falta de espacio).

---

## Documentación

| Documento | Contenido |
| --- | --- |
| [`docs/design.md`](docs/design.md) | Concepto, tokens, tipografía, componentes, estados, accesibilidad, uso de logos |
| [`docs/contenido.md`](docs/contenido.md) | Texto fuente aprobado, sección por sección |
| [`docs/pendientes.md`](docs/pendientes.md) | Qué falta para publicar: formulario, Teams, datos, metadatos, enlaces y responsables |

---

## Créditos

- **Diseño y desarrollo:** equipo CIE — Corporación Universitaria Americana
- **Tipografías:** Big Shoulders Display, Instrument Sans e IBM Plex Mono, vía Google
  Fonts (SIL Open Font License)
- **Bootstrap 5.3.3:** MIT, servido por jsDelivr
- **Logos:** propiedad de la Corporación Universitaria Americana y del evento; no se
  redistribuyen fuera de este sitio sin autorización.
