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
| 3 | Zona horaria sin confirmación oficial | 🟠 | El sitio muestra COT de forma consistente, pero la tabla recibida no indica zona horaria |
| 4 | Autorización de datos sin aprobar | 🔴 (legal) | No hay base para tratar los datos que se recojan |
| 5 | `og:image` inexistente | 🟠 | Al compartir por WhatsApp o LinkedIn, la tarjeta sale sin imagen |
| 6 | URL canónica sin verificar | 🟠 | Si la ruta no existe, los buscadores indexan una dirección rota |
| 7 | Sin ningún canal de contacto | 🟠 | Quien tiene una duda no tiene a quién escribir |
| 8 | Representantes universitarios por confirmar | 🟡 | El panel de experiencias aún no identifica a sus participantes |
| 9 | Retratos D2 de conferencistas | ✅ | Cuatro fotos integradas; Renato conserva iniciales |
| 10 | Permiso de difusión de los retratos | 🔴 | No consta confirmación institucional para publicar las cuatro fotos |
| 11 | Foto de Renato da Costa | 🟡 | La prueba visual funciona con iniciales; falta su retrato si se decide completar la serie |

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

La agenda recibida para el **18, 19 y 20 de noviembre** fija la primera actividad
a las 18:00 y la última hasta las 20:30. Incluye nueve bloques confirmados:
cuatro el miércoles, tres el jueves y dos el viernes. Los huecos de la tabla
no se presentan como actividades en la página.

El sitio muestra todos los horarios como **hora de Colombia (COT, UTC−5)**:
agenda, tarjeta virtual, hero, JSON-LD y calendario `.ics` coinciden. La tabla
recibida no especifica zona horaria; falta confirmación explícita de la
organización antes de difundir los horarios a público de Brasil y Argentina.
También falta confirmar si habrá registro previo a las 18:00 o cierre después
de las 20:30; ninguna de esas actividades se anuncia como parte de la agenda.

**Si cambia un horario:** sincronizar los tickets del hero, las nueve sesiones
de la agenda, los enlaces de las tarjetas de conferencistas, las tarjetas de
modalidad, los tres eventos del `.ics`, JSON-LD y el contador.

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

La agenda recibida confirma **Emprendimiento sostenible** para Renato da Costa
y **Emprende con estrategia** para Luis Betancourt Somoza. Ya no hay etiquetas
de tema pendiente en la agenda ni en sus tarjetas.

Queda una marca visible en el panel de experiencias universitarias:
«Nombres de representantes pendientes de confirmación».

Además conviene revisar contra la lista oficial:

- Tratamiento y cargos: MSc. Gregorio Mercado, Dr. Renato da Costa, Luis Betancourt
  Somoza, Dr. Ricardo Peña, Dr. José Vargas.
- Si la entidad de Ricardo Peña debe figurar como «Red Nacional de
  Emprendimiento» en todos los materiales.
- Si los cinco nombres están autorizados a aparecer públicamente.

### Retratos de conferencistas

La sección usa la versión D2: cuatro retratos en tinta y papel (Mercado,
Betancourt, Peña y Vargas), con barra de acento y formato 4:5. Renato da Costa
aparece con iniciales grandes sobre marigold. Hay
[capturas de escritorio](./previews/conferencistas-d2-escritorio.png) y
[móvil](./previews/conferencistas-d2-movil.png). La implementación y los
archivos se describen en [`design.md`](./design.md#102-retratos-de-conferencistas).

**Antes de publicar las fotos:** la organización debe confirmar que puede
difundir cada una en la página del evento y revisar nombres, cargos y perfiles.
Esa confirmación no está documentada en este repositorio. La foto de Renato
sigue pendiente; la tarjeta con iniciales es el estado previsto para esta
prueba de cuatro retratos.

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
| 4 | Confirmar que los horarios recibidos corresponden a COT | | 14 nov |
| 5 | ¿Inscripción previa o entrada libre? | | 14 nov |
| 6 | ¿Costo? ¿Certificado? ¿Grabación? | | 16 nov |
| 7 | Correo de contacto público | | 14 nov |
| 8 | URL definitiva del sitio | | 16 nov |
| 9 | Confirmar permiso de difusión de las cuatro fotos y datos de perfil | | antes de publicar |
| 10 | Decidir si se solicita e incorpora la foto de Renato | | 16 nov |

---

## 12. Ruta mínima para lanzar

Si el tiempo no alcanza para todo, este es el orden recomendado:

**Primero (48 h)**

1. Destino del formulario o desactivarlo con un mensaje honesto.
2. Correo de contacto en el pie.
3. Confirmar que la tabla de horarios está expresada en COT.
4. Confirmar permiso de difusión de las cuatro fotos antes de publicar esta versión.

**Segundo (antes del 16)**

5. Enlace de Teams.
6. Texto de autorización de datos.
7. `og:image` y URL canónica.
8. Respuestas de costo, certificado e inscripción previa.

**Tercero (si queda aire)**

9. Confirmar nombres de representantes universitarios.
10. Incorporar la foto de Renato, si llega y se decide completar la serie.

---

## 13. Estado técnico del resto del sitio ✅

Para que quede claro qué **sí** está terminado y no requiere trabajo:

- La base de la página se revisó sin desbordamiento horizontal en 390, 768,
  1024 y 1440 px. La nueva sección D2 se inspeccionó visualmente en 390 y
  1440 px; las capturas aisladas están en `docs/previews/`.
- Navegación, pestañas de la agenda, menú móvil, FAQ y contador funcionando.
- Descarga de calendario `.ics` con los tres eventos.
- Contraste de todo el texto informativo por encima de 4.5:1.
- Navegación por teclado y modo de movimiento reducido.
- Banderas de los cuatro países normalizadas y en su sitio.
- Consola del navegador sin errores.
