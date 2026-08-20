# Cómo poner las fotos (1 minuto)

Esta plantilla ya está lista. Para que muestre fotos reales de la clínica:

## Paso 1 — Suelta los archivos
Pon las imágenes en la carpeta **`public/images/`** con estos nombres:

| Archivo | Dónde aparece | Tamaño ideal |
|---|---|---|
| `hero.jpg` | Imagen principal (arriba, Hero) | 1080 × 1350 (vertical 4:5) |
| `about.jpg` | Sección "El profesional" | 1080 × 1350 |
| `caso-1.jpg` | Galería de casos — Cirugía exitosa | 1080 × 1350 |
| `caso-2.jpg` | Galería de casos — Recuperación postoperatoria | 1080 × 1350 |
| `caso-3.jpg` | Galería de casos — Peluquería y estética | 1080 × 1350 |
| `caso-4.jpg` | Galería de casos — Vacunación al día | 1080 × 1350 |

> Sirven `.jpg`, `.png` o `.webp`. Para que cargue rápido en celular, exporta ≤ 300 KB cada una.

## Paso 2 — Enciende cada foto
Abre **`content.ts`**, busca el bloque `IMAGES` y pon la ruta en `src`:

```ts
export const IMAGES = {
  hero:  { src: "/images/hero.jpg",  alt: "Fachada y recepción de la clínica veterinaria" },
  about: { src: "/images/about.jpg", alt: "Dr. Nombre · Médico veterinario en [Ciudad]" },
  gallery: [
    { src: "/images/caso-1.jpg", alt: "Cirugía veterinaria — procedimiento exitoso" },
    { src: "/images/caso-2.jpg", alt: "Mascota en recuperación postoperatoria" },
    { src: "/images/caso-3.jpg", alt: "Peluquería canina — resultado antes y después" },
    { src: "/images/caso-4.jpg", alt: "Vacunación de mascota — esquema al día" },
  ],
};
```

Listo. Si dejas un `src` en `null`, se muestra un marcador elegante del color clínico (no se rompe nada).

## Lo demás que se rellena por negocio
- **Datos de Google** (nombre, reseñas, dirección, teléfono, WhatsApp): en `content.ts` → `SITE` y `GOOGLE`.
- **Logo**: en `components/Logo.tsx` (hoy es texto con iniciales; se puede cambiar por `<img src="/images/logo.png">`).
- **Ciudad**: reemplaza `[Ciudad]` en `content.ts`.
- **Credenciales del veterinario**: rellena el array `ABOUT.credentials` con título universitario, registro profesional y años de experiencia reales.
