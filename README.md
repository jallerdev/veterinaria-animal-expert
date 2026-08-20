# Veterinaria Animal Expert — Landing

Sitio de una sola página (+ blog) para **Centro Médico Veterinario Animal Expert**,
en Turbaco, Bolívar. Generado desde la plantilla `_templates/veterinaria`
(arquetipo *Salud & Confianza*, personalidad *clínico*).

## Datos del negocio (ya cargados en `content.ts`)

| Dato | Valor |
|---|---|
| Nombre | Veterinaria Animal Expert |
| Ciudad | Turbaco, Bolívar |
| Dirección | Cra. 21 #17-12, Urbanización La Cruz |
| WhatsApp / teléfono | 312 724 6009 (`wa.me/573127246009`) |
| Instagram | [@vet_animal_expert](https://www.instagram.com/vet_animal_expert/) |
| Google | Ficha creada, **0 reseñas** → las piezas de reseñas se ocultan solas |
| Servicios | Consulta general y especializada · Cirugía especializada · Cirugía mínimamente invasiva · Profilaxis · Vacunación · Desparasitación · Reproducción y ecografía |
| Veterinario | Dr. Jairo Loaiza — MVZ, MSc. en pequeñas especies y cirugía ([@jairoloaiza09](https://www.instagram.com/jairoloaiza09/)) |
| Fotos | 7 imágenes reales en `public/images/` (quirófano, rayos X, equinos) + 2 miniaturas de publicaciones de Instagram |
| Ubicación | `10.3299, -75.41652` — cruce Cra. 21 × Calle 17, verificado contra OpenStreetMap |
| Logo | `logo-animal-expert.png` (lockup) e `isotipo-animal-expert.png`; favicon en `app/icon.png` |

> ⚠️ **La clínica NO ofrece urgencias 24h ni domicilios** (la ficha de Google
> dice que cierra a las 6:30 p.m.). Todos esos textos que traía la plantilla
> fueron reemplazados. No los vuelvas a meter sin confirmarlo con el cliente.

Lo que falta por confirmar está en [`PENDIENTES.md`](./PENDIENTES.md).

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS 3** — tokens en `tailwind.config.ts`
- **lucide-react** — iconografía (sin emojis)
- **next/font** — Playfair Display (títulos) + Inter (cuerpo)

## Sistema de diseño

Los colores salen del **logo**: turquesa `#4BC2C8` y oro `#D4A951` del isotipo,
oscurecidos lo necesario para cumplir contraste AA.

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `ink` | `#132428` | Texto principal, secciones oscuras | 16.0 : 1 |
| `gold` (acento) | `#19797B` | Turquesa de marca: botones y acentos | 5.2 : 1 con texto blanco |
| `gold-deep` | `#146466` | Texto pequeño turquesa sobre blanco | 6.9 : 1 |
| `gold-soft` | `#9ADADB` | Bordes y fondos suaves | — |
| `gold-tint` | `#E6F7F7` | Fondos de íconos y chips | — |
| `ivory` | `#EAF7F7` | Secciones alternas | — |
| `line` | `#BFE2E3` | Bordes | — |
| `brand` | `#D4A951` | Oro del logo — uso decorativo | 7.3 : 1 sobre `ink` |
| `brand-deep` | `#9E6D18` | Oro oscuro para texto pequeño | 4.5 : 1 sobre blanco |

Los botones `bg-gold` van con `text-white`. Los botones secundarios (borde) van
con `text-ink` — **no** cambiar a `text-white`: quedan invisibles sobre blanco.

## Desarrollo

```bash
npm install          # o dejar el symlink de node_modules que crea el clonador
npm run dev          # http://localhost:3000
npm run build        # build de producción
npx tsc --noEmit     # typecheck
```

## Estructura

- `content.ts` — **único archivo de textos**: datos, SEO, servicios, precios,
  about, casos, testimonios, contacto, blog y FAQ.
- `components/` — secciones de la página.
- `app/` — layout, home, blog, `sitemap.ts`, `robots.ts`, `manifest.ts`,
  `icon.png` (favicon: isotipo de la marca) y `opengraph-image.tsx`.
- `FOTOS.md` — guía de qué fotos pedir y en qué tamaño.

## Agenda en línea

La sección `#agenda` reserva citas contra el **Google Calendar de la clínica**,
con el mismo mecanismo que usa jv-agencia, adaptado a cita presencial (sin
Google Meet, con la dirección como `location` del evento).

| Pieza | Qué hace |
|---|---|
| `lib/booking.ts` | Horarios, duración (30 min), días cerrados, antelación mínima y zona horaria |
| `lib/google-calendar.ts` | OAuth + `freeBusy` + `events.insert` por REST |
| `lib/availability.ts` | Cruza los horarios con lo ocupado del calendario |
| `app/api/availability` | `GET ?date=YYYY-MM-DD` → horas libres |
| `app/api/schedule` | `POST` → valida, revalida contra el calendario y crea la cita |
| `components/Agenda.tsx` | El formulario (incluye la ficha del paciente) |

La cita recoge la **ficha de la mascota** —nombre, especie, raza, edad, peso,
sexo/esterilización, estado de vacunas y si es paciente nuevo— y la escribe en la
descripción del evento del calendario, en bloques `PACIENTE` / `DUEÑO` / `MOTIVO`.
Obligatorios solo el nombre de la mascota y la especie; el resto es opcional para
no alargar el formulario. Las opciones de cada desplegable viven en
`AGENDA.petOptions` (`content.ts`).

**No usa `googleapis` ni `luxon`**: son tres llamadas HTTP y la aritmética de
fechas se resuelve con `Intl`. Así el proyecto no suma dependencias — importa
porque `node_modules` es un symlink compartido con otros ocho sitios de clientes.

### Comportamiento sin credenciales

Hoy funciona **sin Google configurado**: muestra todos los horarios y responde
`confirmed: false`, y el formulario cierra la cita por WhatsApp. Cuando el
calendario falla (token vencido, API caída) hace lo mismo, en vez de mostrar
"sin disponibilidad" y aparentar que la clínica está llena para siempre.

### Conectar el calendario

1. En Google Cloud Console, **con la cuenta de la clínica**: crear proyecto,
   habilitar *Google Calendar API*, pantalla de consentimiento OAuth (External)
   con ese correo como usuario de prueba.
2. Credenciales → ID de cliente OAuth → *Aplicación web* → URI de redirección
   `http://localhost:5555/oauth2callback`.
3. `cp .env.example .env.local` y pegar `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`.
4. `node scripts/google-auth.mjs` → autorizar → copiar el `GOOGLE_REFRESH_TOKEN`
   que imprime a `.env.local`.
5. Reiniciar `npm run dev`. Desde ahí las citas entran al calendario y, si el
   dueño deja su correo, Google le manda la invitación con recordatorio.

En producción esas variables van en el panel del hosting, nunca en el repo.

## SEO

- `title`: "Veterinaria en Turbaco | Animal Expert".
- JSON-LD `VeterinaryCare` con dirección, geo, teléfono, horario (Lun–Sáb
  08:00–18:30) y catálogo de servicios + `FAQPage`.
- El `aggregateRating` solo se emite cuando `GOOGLE.reviewCount > 0`.
