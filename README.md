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
| **Horario** | 18:00–21:00 los tres días (COT, UTC−5) |
| **Lugar** | Auditorio Cosmos — Calle 72 # 41C-64, Barranquilla, Colombia |
| **Modalidad** | Híbrida (presencial + Microsoft Teams) |
| **Eje temático** | Innovación y Modelos de Negocios Digitales |
| **Organiza** | CIE — Corporación Universitaria Americana |
| **Instituciones** | UPAEP, UTXJ, UABC (México) · UniEnsino (Brasil) · IUCE (Argentina) · Americana (Colombia) |
| **Conferencistas** | 5 voces de Colombia, Brasil y Argentina; Luis Betancourt presenta su conferencia el viernes |

---

## Estado

Sitio estático completo, sin build, sin dependencias instaladas y sin backend. La
base responsive se probó en 390 / 768 / 1024 / 1440 px; la versión D2 de
conferencistas se revisó visualmente en 390 y 1440 px.

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
│   └── main.js                      Cabecera, reveal, countdown, tabs, ICS
├── assets/
│   ├── americana-logo-header-blanco.svg   Logo institucional (fondos oscuros)
│   ├── logo-semana-global.svg             Logo del evento (fondos claros)
│   ├── logo-semana-global-claro.svg       Logo del evento invertido (fondos oscuros)
│   ├── codigo_QR.png                      Código QR del formulario de inscripción
│   ├── logo_sewmana-global.svg            Archivo original subido (sin usar)
│   ├── flags/                             Banderas normalizadas 64 × 43 (CO, MX, BR, AR)
│   ├── conferencistas/                    Cinco fotos usadas, originales y perfiles
│   └── favicon.svg                        Favicon marigold
└── docs/
    ├── design.md                    Sistema de diseño y reglas de marca
    ├── contenido.md                 Texto fuente y datos pendientes de confirmación
    ├── pendientes.md                Qué falta para publicar: Teams, datos, metadatos
    └── previews/                    Vistas D2 de conferencistas en escritorio y móvil
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
| Calendario `.ics` | Genera 3 eventos de 23:00Z a 02:00Z del día siguiente | `js/main.js` → *Calendario* |
| Inscripción | QR y enlace directo al mismo Google Forms | `index.html` → `#participar` |
| Agenda | Tres pestañas de Bootstrap con apariencia de ticket | HTML + CSS |
| FAQ | `<details>` nativo, sin JavaScript | HTML + CSS |
| Retratos D2 | Cinco fotos bajo el pliegue, con filtro SVG en tinta y papel | `index.html` + CSS |

---

## Cómo editar el contenido

El texto fuente vive en [`docs/contenido.md`](docs/contenido.md); los nombres
de representantes universitarios y algunos datos logísticos siguen por
confirmar. Para reflejar un
cambio en la página:

| Qué cambiar | Dónde buscarlo en `index.html` |
| --- | --- |
| Logo grande del hero | `class="hero-logo"` |
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
| QR y enlace de inscripción | `id="participar"` |
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
6. **Conferencistas:** foto, nombre, perfil, título, fecha y hora deben corresponder
   entre la tarjeta y la agenda.

Para cambiar los colores o la tipografía, editar los tokens en `:root` al inicio de
`css/styles.css`; el resto del archivo los hereda.

### Retratos de conferencistas

Las tarjetas de Gregorio Mercado, Renato da Costa, Luis Betancourt, Ricardo Peña y José Vargas
usan los archivos de `assets/conferencistas/`. El filtro SVG
`#speaker-duotone` de `index.html` convierte su apariencia a tinta `#141433`
y papel `#f6f1e6` en el navegador; **no modifica los originales**. Cada
tarjeta conserva una barra superior de 6 px y un chip de país con su acento.
Los retratos se recortan a 4:5 con `object-fit: cover`; si cambia una foto,
ajustar `--photo-position` en su `.speaker-portrait`. Mantener `loading="lazy"`,
dimensiones reales y `alt=""`, ya que el nombre aparece como encabezado de la
misma tarjeta.

Ricardo se sirve como `ricardo-pena.webp` (134 KB frente a 446 KB del JPEG
original). Las versiones con nombre en mayúsculas y los JPEG de origen se
conservan como material recibido, pero no se cargan todos en la página.
La foto de Renato se sirve como `renato-da-costa.png`.

Vistas de esta sección: [escritorio](docs/previews/conferencistas-d2-escritorio.png)
y [móvil](docs/previews/conferencistas-d2-movil.png). Son capturas aisladas de la
sección, con fuentes de respaldo por no cargar Google Fonts en la vista local.
Muestran la versión anterior de la tarjeta de Renato, que aún tenía iniciales.

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
- El QR tiene texto alternativo y un enlace directo equivalente para quienes
  visitan el sitio desde el celular o no pueden escanearlo.
- `prefers-reduced-motion` desactiva ticker, transiciones y revelados.
- `<noscript>` deja visible todo lo que depende de JavaScript.
- Las fotos de conferencistas tienen `alt=""`: el nombre está en el encabezado
  inmediatamente posterior de cada tarjeta. Las banderas también son decorativas
  porque el país aparece en texto.

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

- [ ] **Comprobar el formulario externo.** El QR y el botón apuntan al mismo Google
      Forms. Verificar con una inscripción de prueba que acepta respuestas y que la
      organización recibe los datos.
- [ ] **Revisar el tratamiento de datos en Google Forms.** La autorización y la
      política de privacidad deben estar en el formulario externo.
- [ ] **Enlace de Microsoft Teams.** Aparece como "pendiente de publicación" en la
      sección de modalidad y en el FAQ.
- [ ] **Confirmación de zona horaria.** La agenda recibida fija 18:00–21:00 los
      tres días, pero no declara zona horaria. La página y el `.ics` usan COT;
      confirmar ese dato con la organización.
- [ ] **`og:image`** de 1200 × 630 px.
- [ ] **URL canónica y `og:url`** definitivas.
- [ ] **Revisión de nombres y cargos** de conferencistas contra la lista oficial.
- [ ] **Confirmar permiso de difusión de las cinco fotos** con la organización
      antes de publicar esta versión.

---

## Documentación

| Documento | Contenido |
| --- | --- |
| [`docs/design.md`](docs/design.md) | Concepto, tokens, tipografía, componentes, estados, accesibilidad, uso de logos |
| [`docs/contenido.md`](docs/contenido.md) | Texto fuente, perfiles y marcas de contenido por confirmar |
| [`docs/pendientes.md`](docs/pendientes.md) | Qué falta para publicar: Teams, datos, fotos, metadatos y enlaces |
| [`docs/previews/`](docs/previews/) | Capturas de la prueba D2 en escritorio y móvil |

---

## Créditos

- **Diseño y desarrollo:** equipo CIE — Corporación Universitaria Americana
- **Tipografías:** Big Shoulders Display, Instrument Sans e IBM Plex Mono, vía Google
  Fonts (SIL Open Font License)
- **Bootstrap 5.3.3:** MIT, servido por jsDelivr
- **Logos:** propiedad de la Corporación Universitaria Americana y del evento; no se
  redistribuyen fuera de este sitio sin autorización.
