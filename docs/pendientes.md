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
| 1 | Probar Google Forms | 🟠 | QR y enlace directo preparados; falta verificar una inscripción real y el destino de las respuestas |
| 2 | Falta el enlace de Teams | 🔴 | La modalidad virtual no se puede usar |
| 3 | Zona horaria sin confirmación oficial | 🟠 | El sitio muestra COT de forma consistente, pero la tabla oficial no indica zona horaria |
| 4 | Autorización de datos por verificar | 🔴 (legal) | Falta comprobar el texto y la política de privacidad en Google Forms |
| 5 | `og:image` inexistente | 🟠 | Al compartir por WhatsApp o LinkedIn, la tarjeta sale sin imagen |
| 6 | URL canónica sin verificar | 🟠 | Si la ruta no existe, los buscadores indexan una dirección rota |
| 7 | Sin ningún canal de contacto | 🟠 | Quien tiene una duda no tiene a quién escribir |
| 8 | Representantes universitarios por confirmar | 🟡 | El panel de experiencias aún no identifica a sus participantes |
| 9 | Retratos D2 de conferencistas | ✅ | Cinco fotos integradas |
| 10 | Permiso de difusión de los retratos | 🔴 | No consta confirmación institucional para publicar las cinco fotos |

---

## 2. Inscripción por QR 🟠

El sitio muestra `assets/codigo_QR.png` y un botón directo en `#participar`.
Ambos dirigen al mismo Google Forms; la página ya no pide ni envía datos por sí
misma.

**Antes de difundir el enlace:** abrirlo desde un móvil y desde el botón de la
página, completar una inscripción de prueba y verificar que la respuesta llegue
a la cuenta y a la hoja previstas. También hay que revisar si el formulario
requiere iniciar sesión y si esa restricción es apropiada para el público.

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

La agenda facilitada para el **18, 19 y 20 de noviembre** fija la primera actividad
a las 18:00 y la última termina a las 21:00 cada día. Incluye nueve bloques:
tres por jornada, sin intervalos entre ellos.

El sitio muestra todos los horarios como **hora de Colombia (COT, UTC−5)**:
agenda, tarjeta virtual, hero, JSON-LD y calendario `.ics` coinciden. La tabla
oficial no especifica zona horaria; falta confirmación explícita de la
organización antes de difundir los horarios a público de Brasil y Argentina.
También falta confirmar si habrá registro previo a las 18:00 o cierre después
del último bloque de cada jornada; ninguna de esas actividades se anuncia como parte de la agenda.

**Si cambia un horario:** sincronizar los tickets del hero, las nueve sesiones
de la agenda, los enlaces de las tarjetas de conferencistas, las tarjetas de
modalidad, los tres eventos del `.ics`, JSON-LD y el contador.

---

## 5. Autorización de tratamiento de datos 🔴 (legal)

La captura de datos sucede en Google Forms. No se ha verificado su contenido ni
si muestra una autorización aprobada por la institución. Se necesita del área
jurídica o de protección de datos:

1. El texto exacto de la autorización, con versión y fecha.
2. El enlace público a la política de tratamiento de datos.
3. Finalidad declarada (¿sólo informar del evento? ¿también enviar comunicaciones
   futuras?).
4. Tiempo de conservación.
5. Canal para ejercer derechos (correo del responsable).
6. Postura sobre menores de edad: si pueden inscribirse estudiantes de primeros
   semestres, hace falta un procedimiento distinto.

Verificar estos puntos en el Google Forms antes de recibir datos reales.

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

La agenda confirma **Emprendimiento sostenible** para Renato da Costa y
**Emprende con estrategia** para Luis Betancourt Somoza, ahora el viernes de
19:00 a 20:00.

Queda una marca visible en el panel de experiencias universitarias:
«Nombres de representantes pendientes de confirmación».

Además conviene revisar contra la lista oficial:

- Tratamiento y cargos: MSc. Gregorio Mercado, Dr. Renato da Costa, Luis Betancourt
  Somoza, Dr. Ricardo Peña, Dr. José Vargas.
- Si la entidad de Ricardo Peña debe figurar como «Red Nacional de
  Emprendimiento» en todos los materiales.
- Si los cinco nombres están autorizados a aparecer públicamente.

### Retratos de conferencistas

La sección usa la versión D2: cinco retratos en tinta y papel (Mercado,
Renato, Betancourt, Peña y Vargas), con barra de acento y formato 4:5. Hay
[capturas de escritorio](./previews/conferencistas-d2-escritorio.png) y
[móvil](./previews/conferencistas-d2-movil.png). La implementación y los
archivos se describen en [`design.md`](./design.md#102-retratos-de-conferencistas).

**Antes de publicar las fotos:** la organización debe confirmar que puede
difundir cada una en la página del evento y revisar nombres, cargos y perfiles.
Esa confirmación no está documentada en este repositorio.

---

## 9. No hay ningún canal de contacto 🟠

La página no tiene correo, teléfono, WhatsApp ni formulario de contacto. El QR
sirve para inscribirse, pero no ofrece un canal para resolver dudas.

**Se necesita:** correo del CIE (o de la persona responsable) y decidir si se publica
un WhatsApp. La propuesta es incluir el correo en el pie de página y en el FAQ, sin
teléfono.

---

## 10. Preguntas que el FAQ no responde 🟡

Hoy hay ocho preguntas (fecha, lugar, virtualidad, inscripción, público,
instituciones, horarios y Teams). Faltan las que de verdad se hace quien va a inscribirse:

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
| 1 | Probar Google Forms y confirmar dónde llegan las respuestas | | **14 nov** |
| 2 | Texto y enlace de la política de datos | | **15 nov** |
| 3 | Enlace de Teams (uno o tres) | | 16 nov |
| 4 | Confirmar que los horarios recibidos corresponden a COT | | 14 nov |
| 5 | ¿Inscripción previa o entrada libre? | | 14 nov |
| 6 | ¿Costo? ¿Certificado? ¿Grabación? | | 16 nov |
| 7 | Correo de contacto público | | 14 nov |
| 8 | URL definitiva del sitio | | 16 nov |
| 9 | Confirmar permiso de difusión de las cinco fotos y datos de perfil | | antes de publicar |

---

## 12. Ruta mínima para lanzar

Si el tiempo no alcanza para todo, este es el orden recomendado:

**Primero (48 h)**

1. Probar el QR, el enlace directo y la recepción de una inscripción.
2. Correo de contacto en el pie.
3. Confirmar que la tabla de horarios está expresada en COT.
4. Confirmar permiso de difusión de las cinco fotos antes de publicar esta versión.

**Segundo (antes del 16)**

5. Enlace de Teams.
6. Texto de autorización de datos.
7. `og:image` y URL canónica.
8. Respuestas de costo, certificado e inscripción previa.

**Tercero (si queda aire)**

9. Confirmar nombres de representantes universitarios.

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
