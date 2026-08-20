import { SITE, SEO, GOOGLE, SERVICES, FAQ } from "@/content";

/* ---------------------------------------------------------------------------
   Horario para Schema.org, derivado de SITE.hours (una sola fuente de verdad).
   Si un día no tiene horas ("Cerrado", "Solo urgencias"), no se publica.
--------------------------------------------------------------------------- */
const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const DAY_KEYS: [string, number][] = [
  ["lunes", 0],
  ["martes", 1],
  ["miercoles", 2],
  ["jueves", 3],
  ["viernes", 4],
  ["sabado", 5],
  ["domingo", 6],
];

/** Minúsculas y sin tildes, para poder comparar el texto del horario. */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** "Lunes a Viernes" → Monday…Friday · "Domingos y festivos" → Sunday. */
function parseDays(label: string): string[] {
  const t = normalizeText(label);
  if (t.includes("todos los dias")) return [...WEEK];

  const hits = DAY_KEYS.filter(([key]) => t.includes(key))
    .map(([key, index]) => ({ index, at: t.indexOf(key) }))
    .sort((a, b) => a.at - b.at);

  if (hits.length === 0) return [];

  // "Lunes a Viernes" / "Martes – Sábado" = rango entre los dos días.
  const isRange = hits.length === 2 && /\ba\b|–|-/.test(t) && hits[0].index <= hits[1].index;
  if (isRange) {
    const days: string[] = [];
    for (let i = hits[0].index; i <= hits[1].index; i++) days.push(WEEK[i]);
    return days;
  }
  return hits.map((hit) => WEEK[hit.index]);
}

/** "8:00 a.m. – 6:30 p.m." → { opens: "08:00", closes: "18:30" }. */
function parseTimeRange(time: string): { opens: string; closes: string } | null {
  const t = normalizeText(time);
  if (t.includes("24 hora")) return { opens: "00:00", closes: "23:59" };

  const found: string[] = [];
  const re = /(\d{1,2})(?::(\d{2}))?\s*([ap])\.?\s*m/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t)) !== null) {
    let hour = parseInt(m[1], 10);
    const minutes = m[2] ?? "00";
    const isPm = m[3] === "p";
    if (isPm && hour < 12) hour += 12;
    if (!isPm && hour === 12) hour = 0;
    found.push(`${String(hour).padStart(2, "0")}:${minutes}`);
  }

  if (found.length < 2) return null;
  return { opens: found[0], closes: found[1] };
}

function buildOpeningHours(): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  for (const { day, time } of SITE.hours) {
    const range = parseTimeRange(time);
    if (!range) continue;
    const days = parseDays(day);
    if (days.length === 0) continue;
    out.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days.length === 1 ? days[0] : days,
      opens: range.opens,
      closes: range.closes,
    });
  }
  return out;
}

/**
 * Datos estructurados (Schema.org) para que Google muestre la ficha del
 * negocio: nombre, ubicación, horario, teléfono y la calificación con estrellas.
 * Componente de servidor: solo renderiza un <script> JSON-LD.
 *
 * Los campos que dependen de la ficha real de Google (teléfono, geo, rating)
 * solo se incluyen cuando hay datos: así la plantilla no publica datos vacíos.
 */
function buildSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": SEO.url,
    name: SITE.name,
    url: SEO.url,
    image: `${SEO.url}/opengraph-image`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.lines[0],
      addressLocality: SITE.address.short,
      addressCountry: "CO",
    },
    sameAs: [SITE.instagram.url],
    areaServed: {
      "@type": "City",
      name: SITE.address.short,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: SERVICES.title,
      itemListElement: SERVICES.items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
        },
        ...(s.priceFrom.startsWith("$") ? { description: `Desde ${s.priceFrom}` } : {}),
      })),
    },
  };

  if (GOOGLE.phoneIntl) {
    schema.telephone = GOOGLE.phoneIntl;
  }

  if (GOOGLE.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: GOOGLE.geo.lat,
      longitude: GOOGLE.geo.lng,
    };
  }

  if (GOOGLE.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: GOOGLE.rating,
      reviewCount: GOOGLE.reviewCount,
    };
  }

  const openingHours = buildOpeningHours();
  if (openingHours.length > 0) {
    schema.openingHoursSpecification = openingHours;
  }

  return schema;
}

/**
 * FAQPage construido desde FAQ. Google deprecó el rich result de FAQ
 * (jun-2026), pero el schema sigue aportando semántica para buscadores y
 * AI Overviews, así que lo emitimos igual cuando hay preguntas.
 */
function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema()) }}
      />
      {FAQ.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }}
        />
      )}
    </>
  );
}
