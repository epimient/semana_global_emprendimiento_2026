# Qué falta para publicar

**Semana Global de Emprendimiento 2026 — landing page**
Versión 1.0 · 12 de noviembre de 2026 · Estado: **no apta para publicación**

Documento de traspaso. Enumera todo lo que hoy no está operativo en el sitio, qué
necesita cada punto y quién debe resolverlo. El evento comienza el **18 de noviembre
de 2026**; las fechas límite de la sección 11 están calculadas sobre esa fecha.

> Contexto técnico del proyecto: [`README.md`](../README.md) ·
> Sistema de diseño: [`design.md`](./design.md) ·
> Texto fuente: [`contenido.md`](./contenido.md)

---

## Cómo leer este documento

| Símbolo | Significado |
| --- | --- |
| 🔴 **Bloquea** | No se puede publicar así: el usuario recibe información falsa o no puede completar la acción principal |
| 🟠 **Corregir antes** | Se puede publicar, pero deja un hueco visible o un riesgo legal |
| 🟡 **Deseable** | Mejora la página; no impide lanzar |
| ✅ **Verificado** | Comprobado el 12 de noviembre de 2026 |

---

## 1. Resumen

| # | Pendiente | Estado | Impacto |
| --- | --- | --- | --- |
| 1 | Formulario sin destino | 🔴 | El usuario cree que se inscribió y no se guardó nada |
| 2 | Falta el enlace de Teams | 🔴 | La modalidad virtual no se puede usar |
| 3 | Zona horaria contradictoria | 🟠 | Dos textos del mismo sitio dicen cosas distintas |
| 4 | Autorización de datos sin aprobar | 🔴 (legal) | No hay base para tratar los datos que se recojan |
| 5 | `og:image` inexistente | 🟠 | Al compartir por WhatsApp o LinkedIn, la tarjeta sale sin imagen |
| 6 | URL canónica sin verificar | 🟠 | Si la ruta no existe, los buscadores indexan una dirección rota |
| 7 | Sin ningún canal de contacto | 🟠 | Quien tiene una duda no tiene a quién escribir |
| 8 | Contenido marcado "por confirmar" | 🟡 | Cuatro marcas visibles de borrador |
| 9 | Retratos de conferencistas | 🟡 | Decisión de diseño pendiente |

---

## 2. Formulario de inscripción 🔴

**Qué pasa hoy:** el formulario valida 7 campos y luego muestra el mensaje
*"HEMOS RECIBIDO TU SOLICITUD"*. **No envía nada a ningún servidor.** Los datos se
quedan en el navegador y se pierden al cerrar la pestaña.

Es el punto más delicado del sitio: una persona puede llenarlo, ver la confirmación
y presentarse el 18 de noviembre creyendo que quedó registrada.

- **Código:** `js/main.js` → bloque *Formulario de registro*.
- **Marcado:** `index.html` → `id="participar"`, formulario `#regForm`.

### Datos que hay que capturar

| Campo (`name`) | Tipo | Obligatorio |
| --- | --- | --- |
| `nombre` | texto | Sí |
| `correo` | email | Sí |
| `institucion` | texto | Sí |
| `pais` | lista (8 opciones) | Sí |
| `perfil` | lista (6 opciones) | Sí |
| `modalidad` | radio: Presencial / Virtual | Sí |
| `datos` | checkbox de autorización | Sí |

### Opciones de destino

| Opción | Tiempo de montaje | Ventaja | Desventaja |
| --- | --- | --- | --- |
| **Microsoft Forms** (recomendada) | 2–4 h | La institución ya usa Microsoft 365 para Teams; los datos quedan en su tenant y se exportan a Excel | Requiere que alguien de TI lo cree; el diseño no es personalizable |
| **Formspree / Basin** | 1 h | Se conecta al formulario actual sin rediseñar nada; las respuestas llegan por correo | Los datos quedan en un tercero: exige contrato de tratamiento |
| **API institucional** | 1–3 días | Control total, integrado al sistema de la universidad | Depende de la oficina de sistemas |
| **Google Forms embebido** | 1 h | Cero fricción | Rompe el diseño de la página |
| **Correo `mailto:`** | 15 min | Contingencia inmediata | No registra nada estructurado; sólo un buzón |

### Lo que se necesita para implementarlo

1. La URL del endpoint y el método (POST/JSON o `form-data`).
2. Si es un servicio externo: si se envía también la marca de tiempo y la versión
   del texto de autorización (recomendado, para poder probar el consentimiento).
3. Qué debe pasar si el envío falla: mensaje de error y correo alternativo.
4. Protección antispam: honeypot oculto (propuesta, sin CAPTCHA, no molesta a nadie)
   o reCAPTCHA.

### Si el endpoint no llega antes del 18

Desactivar el botón y cambiar el mensaje de éxito por *"El formulario aún no está
habilitado. Escríbenos a [correo]"*. Es preferible a confirmar una inscripción que no
existe. **Esta decisión hay que tomarla en las próximas 48 horas.**

---

## 3. Enlace de Microsoft Teams 🔴

**Dónde está hoy el hueco:**

- Tarjeta de modalidad virtual (`id="lugar"`): botón *"Acceder por Teams"*
  deshabilitado, con la nota *"Enlace pendiente de publicación"*.
- FAQ, pregunta *"¿Cómo puedo acceder a la modalidad virtual?"*: dice que estará
  disponible cuando se confirme.
- Nota lateral del FAQ: remite a "los canales oficiales" sin decir cuáles.

**Lo que falta decidir:**

1. ¿Un solo enlace para las tres jornadas o uno por día?
2. ¿El enlace es abierto o requiere registro previo / sala de espera?
3. ¿Se publica en la página o se envía sólo a quienes se inscriban?

**Dónde se actualiza:** `index.html` (tarjeta virtual, dos respuestas del FAQ, nota
lateral) y el generador del `.ics` en `js/main.js`, añadiendo el campo `URL:` a los
tres eventos para que el enlace llegue al calendario.

---

## 4. Horarios y zona horaria 🟠

Hay una **contradicción dentro del mismo sitio**:

| Ubicación | Texto actual |
| --- | --- |
| Agenda (encabezado) | "Horarios en hora de Colombia (COT, UTC−5)" |
| Tarjeta virtual | "18:00–20:30 · **zona horaria por confirmar**" |
| Hero, JSON-LD y `.ics` | Asumen `-05:00` |

Hay que elegir una versión y corregir la otra. Además, confirmar tres cosas:

- ¿Las tres jornadas son 18:00–20:30, o la primera empieza antes por el registro
  de asistentes?
- ¿Hay actividades el 20 después de las 20:30 (clausura)?
- ¿Los conferencistas de Brasil y Argentina intervienen en su horario local? Si hay
  público en esos países, conviene publicar la conversión.

**Dato sensible:** la hora está replicada en ocho lugares — tres tickets del hero,
seis sesiones de la agenda, tarjeta presencial, tarjeta virtual, tres eventos del
`.ics`, JSON-LD y la constante del contador. Si cambia, se cambia en todos.

---

## 5. Autorización de tratamiento de datos 🔴 (legal)

**Texto actual en el formulario:**

> "Autorizo el tratamiento de mis datos personales conforme a la política de la
> Corporación Universitaria Americana."

> "Formulario sujeto a aprobación institucional. La autorización de tratamiento de
> datos será la versión aprobada por la institución."

Es decir: **el propio sitio admite que el texto no está aprobado.** Se necesita del
área jurídica o de protección de datos:

1. El texto exacto de la autorización, con versión y fecha.
2. El enlace público a la política de tratamiento de datos.
3. Finalidad declarada (¿sólo informar del evento? ¿también enviar comunicaciones
   futuras?).
4. Tiempo de conservación.
5. Canal para ejercer derechos (correo del responsable).
6. Postura sobre menores de edad: si pueden inscribirse estudiantes de primeros
   semestres, hace falta un procedimiento distinto.

Sin el punto 1 no se puede recibir ni un solo dato.

---

## 6. Metadatos para compartir 🟠

| Elemento | Estado |
| --- | --- |
| `canonical` | Apunta a `https://americana.edu.co/semana-global-emprendimiento-2026` — **sin verificar**. El servidor responde 403 a comprobaciones automáticas, así que hay que abrirlo en un navegador y confirmar que la ruta existe |
| `og:url` | Misma URL, misma duda |
| `og:image` | **No existe.** La tarjeta de Twitter está declarada como `summary_large_image` sin imagen: la vista previa saldrá vacía |
| `og:image:alt` | No existe |
| JSON-LD `virtualLocation.url` | Apunta a `americana.edu.co` genérico; debería ser el enlace de Teams o la página del evento |
| JSON-LD `offers` | Ausente. Si el evento es gratuito, declararlo ayuda a que el buscador lo muestre como "gratis" |

**Se necesita:** la URL definitiva y una decisión sobre la imagen de 1200 × 630.
Se puede generar a partir del hero tipográfico, sin fotos.

---

## 7. Enlaces externos — comprobados el 12 de noviembre ✅

| Destino | Código | Observación |
| --- | --- | --- |
| `upaep.mx` | 200 | ✅ |
| `utxicotepec.edu.mx` | 200 | ✅ |
| `uabc.mx` | 200 | ✅ |
| `querouniensino.com.br` | 200 | ✅ responde, pero **confirmar que es el sitio oficial** de UniEnsino; el dominio suena a página de campaña |
| `i-uce.edu.ar` | 200 | ✅ |
| `americana.edu.co` | 403 | Bloquea peticiones automáticas (protección antibots). Funciona en navegador, probablemente |
| `americana.edu.co/semana-global-emprendimiento-2026` | 403 | **No se pudo verificar.** Confirmar manualmente |

También falta decidir si los enlaces institucionales deben ir a la portada o a una
página dedicada al evento en cada universidad.

---

## 8. Contenido marcado como pendiente 🟡

Cinco marcas visibles de borrador en la página:

| Dónde | Texto |
| --- | --- |
| Agenda, día 2 | "Conferencia desde Brasil — *Título por confirmar*" |
| Agenda, día 2 | "Luis Betancourt Somoza — *Tema por confirmar*" |
| Tarjeta de Renato da Costa | "*Título por confirmar*" |
| Tarjeta de Luis Betancourt | "*Tema por confirmar*" |
| Panel de experiencias universitarias | "Nombres de representantes pendientes de confirmación" |

Además conviene revisar contra la lista oficial:

- Tratamiento y cargos: MSc. Gregorio Mercado, Dr. Renato da Costa, Luis Betancourt
  Somoza, Dr. Ricardo Peña, Dr. José Vargas.
- Si "Red Nacional de Emprendimiento" es la entidad correcta para Ricardo Peña.
- Si los cinco nombres están autorizados a aparecer públicamente.

---

## 9. No hay ningún canal de contacto 🟠

La página no tiene correo, teléfono, WhatsApp ni formulario de contacto. Alguien con
una duda sobre el evento no tiene a dónde escribir: el único camino es el formulario,
que hoy no funciona.

**Se necesita:** correo del CIE (o de la persona responsable) y decidir si se publica
un WhatsApp. La propuesta es incluir el correo en el pie de página y en el FAQ, sin
teléfono.

---

## 10. Preguntas que el FAQ no responde 🟡

Hoy hay siete preguntas (fecha, lugar, virtualidad, público, instituciones, horarios,
Teams). Faltan las que de verdad se hace quien va a inscribirse:

- ¿Tiene costo? (no se menciona en ningún lado)
- ¿Necesito inscribirme antes o puedo llegar?
- ¿Hay cupo limitado?
- ¿Entregan certificado de asistencia? ¿Con qué requisito?
- ¿En qué idioma son las conferencias? ¿Hay traducción?
- ¿Habrá grabación? (si la hay, cambia la autorización de imagen de conferencistas
  y asistentes)
- ¿Hay accesibilidad? (lengua de señas, subtítulos en Teams)

Cada respuesta afirmativa implica un compromiso operativo. Si no están resueltas, es
mejor no prometerlas.

---

## 11. Decisiones que debe tomar la organización

| # | Decisión | Responsable | Fecha límite |
| --- | --- | --- | --- |
| 1 | Destino del formulario (Forms, Formspree, API o desactivar) | | **14 nov** |
| 2 | Texto y enlace de la política de datos | | **15 nov** |
| 3 | Enlace de Teams (uno o tres) | | 16 nov |
| 4 | Confirmar 18:00–20:30 y zona horaria | | 14 nov |
| 5 | ¿Inscripción previa o entrada libre? | | 14 nov |
| 6 | ¿Costo? ¿Certificado? ¿Grabación? | | 16 nov |
| 7 | Correo de contacto público | | 14 nov |
| 8 | URL definitiva del sitio | | 16 nov |
| 9 | Fotos de conferencistas y autorización de imagen | | posterior al evento |

---

## 12. Ruta mínima para lanzar

Si el tiempo no alcanza para todo, este es el orden recomendado:

**Primero (48 h)**

1. Destino del formulario o desactivarlo con un mensaje honesto.
2. Correo de contacto en el pie.
3. Corregir la zona horaria contradictoria.

**Segundo (antes del 16)**

4. Enlace de Teams.
5. Texto de autorización de datos.
6. `og:image` y URL canónica.
7. Respuestas de costo, certificado e inscripción previa.

**Tercero (si queda aire)**

8. Cerrar los cuatro "por confirmar".
9. Retratos de conferencistas.

---

## 13. Estado técnico del resto del sitio ✅

Para que quede claro qué **sí** está terminado y no requiere trabajo:

- Página completa y responsive, sin desbordamiento horizontal en 390, 768, 1024 y
  1440 px.
- Navegación, pestañas de la agenda, menú móvil, FAQ y contador funcionando.
- Descarga de calendario `.ics` con los tres eventos.
- Contraste de todo el texto informativo por encima de 4.5:1.
- Navegación por teclado y modo de movimiento reducido.
- Banderas de los cuatro países normalizadas y en su sitio.
- Consola del navegador sin errores.
