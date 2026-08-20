# Pendientes — Veterinaria Animal Expert

Lo que falta para que el sitio quede 100% real. Marcado en el código con `⚠️`.

## 1. Datos que hay que preguntarle al cliente

| # | Dato | Dónde va | Estado hoy |
|---|---|---|---|
| 1 | **Precios "desde"** de los 12 servicios | `content.ts` → `SERVICES.items[].priceFrom` | Todos dicen "Consultar" |
| 2 | **Horario real** (días y horas) | `content.ts` → `SITE.hours` + `components/JsonLd.tsx` | Tentativo: Lun–Sáb 8:00–6:30 p.m., domingo cerrado (solo se sabe que cierra 6:30 p.m.) |
| 3 | **Registro profesional**, universidad de la maestría y años de experiencia | `content.ts` → `ABOUT.credentials` | ✅ Ya está el **Dr. Jairo Loaiza** (MVZ, MSc. en pequeñas especies y cirugía, dip. ozonoterapia, dip. fisioterapia P. E.) tomado de [@jairoloaiza09](https://www.instagram.com/jairoloaiza09/). Falta el número de registro y confirmar que la maestría es de la **Universidad CES** |
| 3d | **Ozonoterapia** y **fisioterapia / rehabilitación** | `SERVICES` | ✅ Publicados. El cliente los dio por buenos ("creo"), confirmar antes de pautar |
| 3e | Ahora son **12 servicios** y todos dicen "Consultar". Es la lista de precios más urgente del sitio. | `SERVICES[].priceFrom` | Pendiente |
| 3b | **Equinos y grandes animales** — publicado por decisión del cliente, pero él mismo lo dio como *"creo que es válido, no confirmado"*. Confirmarlo antes de pautar. | `SERVICES`, `FAQ`, caso en la galería | ✅ Publicado |
| 3c | **Rayos X / diagnóstico por imagen** | `SERVICES` | ✅ Publicado (confirmado por el cliente) |
| 4 | **Formas de pago** que acepta de verdad | `content.ts` → `SITE.payments` | Efectivo / transferencia / datáfono (supuesto) |
| 5 | **Dominio** del sitio | `content.ts` → `SEO.url` | `https://veterinariaanimalexpert.com` (provisional) |
| 6 | ¿Atienden **otras especies** además de perros y gatos? | `content.ts` → `FAQ` | Respuesta genérica |
| 7 | ¿Hacen **domicilios**? ¿Tienen **hospitalización**? | Si sí, se agregan como servicio | Eliminados de la plantilla |

## 2. Fotos — ✅ montadas

Ya están las fotos reales en `public/images/` y enlazadas desde `IMAGES` en
`content.ts`:

| Archivo | Dónde se usa | Origen |
|---|---|---|
| `hero-cirugia-minimamente-invasiva.jpg` | Hero | Foto del cliente (1080×1440) |
| `veterinario-rayos-x.jpg` | Sección "El equipo" | Foto del cliente (1080×1350) |
| `cirugia-pabellon-animal-expert.jpg` | Caso 1 | Foto del cliente (1080×1350) |
| `equipo-veterinario-cirugia.jpg` | Caso 2 | Foto del cliente (1080×1350) |
| `caso-doky-luxacion-cadera.jpg` | Caso 3 (enlaza al post) | Instagram (480×640) |
| `antisepsia-quirurgica.jpg` | Caso 4 (enlaza al reel) | Instagram (360×640) |
| `atencion-equinos.jpg` | Caso 5 | Foto del cliente, recortada 4:5 y mejorada |
| `atencion-equinos-horizontal.jpg` | (sin usar, de reserva) | Misma foto, 1620×1215 |

Las dos que vienen de Instagram están a **baja resolución** (480×640 y 360×640,
es lo máximo que entrega la ficha pública) y, por ser publicaciones de video,
traen el **botón de play quemado en la miniatura**. Pedirle al cliente los
archivos originales para reemplazarlas.

Todavía faltan, si se quieren:

- **Fachada / recepción** de la clínica en Turbaco (ayuda mucho al SEO local).
- Foto de una **consulta normal** con perro o gato (hoy todo el material es de quirófano).

## 3. Logo — ✅ montado

El logo real ya está en el sitio, sacado del archivo que mandó el cliente:

- `public/images/logo-animal-expert.png` — lockup horizontal completo, fondo
  transparente. Se usa en el **menú**.
- `public/images/isotipo-animal-expert.png` — solo el círculo. Se usa en el
  **pie de página**, sobre una pastilla blanca para que conserve contraste.
- `app/icon.png` — favicon (isotipo, 180×180).

⚠️ **El original que se tenía es de 150×150 px.** Se recortó, se le quitó el
fondo con relleno por inundación desde los bordes (para no perforar las
siluetas blancas del perro y el gato) y se reescaló ×4 con lanczos. Rinde bien
en los tamaños en que se usa (40–56 px), pero el texto pequeño "CENTRO MÉDICO
VETERINARIO" se ve suave si se amplía.

**Pedirle al cliente el logo en vector (SVG/AI/PDF) o un PNG grande.** Cuando
llegue: reemplazar los tres archivos con los mismos nombres, sin tocar código.

## 4. Publicaciones de Instagram montadas

En la galería de casos hay dos tarjetas que enlazan a publicaciones reales:

- **Caso DOKY** — luxación de cadera → `instagram.com/p/DNWCySpAXU0/`
- **Antisepsia quirúrgica** (reel) → `instagram.com/reel/C7QAjA3AdEJ/`

Se montaron como tarjetas propias (foto alojada en el sitio + distintivo de
Instagram + enlace al post), **no** con el widget oficial de embed. Motivo: el
embed de Instagram carga un script de terceros, retrasa la página y a veces no
renderiza. Si prefieres el embed oficial, se cambia en `components/Cases.tsx`.

Para agregar más posts: añade otro objeto a `CASES.items` con su `href` y su
foto en `IMAGES.gallery` (el orden de los dos arreglos debe coincidir).

## 5. Reseñas

La ficha de Google **no tiene reseñas todavía** (`GOOGLE.reviewCount = 0`), así
que la línea de "⭐ x.x · N reseñas" y el rating del JSON-LD están ocultos —
correcto, no se inventan.

Los 3 testimonios de `TESTIMONIALS.items` son **texto genérico de plantilla**.
Reemplazarlos por reseñas reales con permiso del cliente. Vale la pena pedirle al
cliente que empiece a pedir reseñas en Google: es lo que más mueve el SEO local.

## 6. Ubicación — ✅ corregida

`GOOGLE.geo` estaba en `10.3369, -75.4155`, unos 800 m al norte: el mapa caía
sobre la Calle 27, al lado del Hospital Local de Turbaco. Ahora está en
**`10.3299, -75.41652`**, el cruce de la **Cra. 21 con Calle 17** (la dirección
es Cra. 21 #17-12), sacado del trazado de calles de OpenStreetMap y verificado
con geocodificación inversa y contra los puntos de referencia de la ficha de
Google (Olímpica Turbaco al oriente, Parque El Recreo al sur).

Sigue siendo el **cruce**, no la puerta exacta del local. Para afinarlo: abrir
la ficha en Google Maps → Compartir → copiar enlace (trae las coordenadas del
pin) y pegarlas en `GOOGLE.geo`.

## 7. Paleta de color

Se rehízo a partir del logo (turquesa `#4BC2C8` + oro `#D4A951`), oscureciendo
cada color hasta cumplir contraste AA. La tabla completa está en el README.
Si el cliente entrega un manual de marca con otros valores, se cambian en
`tailwind.config.ts` y se propagan solos.

## 8. Agenda en línea

Ya está montada y funciona, pero **en modo degradado**: sin credenciales de
Google muestra todos los horarios y la cita se cierra por WhatsApp.

Para que reserve de verdad:

1. Conectar el Google Calendar de la clínica (pasos en el README).
2. Confirmar los **horarios reales** en `lib/booking.ts` → `SLOT_TIMES`. Hoy
   están 08:00–11:30 y 14:00–18:00 cada 30 min, o sea se asumió un corte de
   almuerzo de 12:00 a 14:00 que **nadie confirmó**.
3. Confirmar `SLOT_DURATION_MIN` (30 min) y `MIN_LEAD_MIN` (no se puede agendar
   con menos de 1 hora de antelación).
4. `CLOSED_WEEKDAYS` está en domingo. Si abren domingo, quitarlo.
5. Si el CRM (HalcónOS) debe recibir estos leads, llenar `HALCON_INBOUND_URL` y
   `HALCON_INBOUND_API_KEY`.
