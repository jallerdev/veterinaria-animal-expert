/* ============================================================================
   📝  CONTENIDO DEL SITIO — Plantilla "Salud & Confianza"
   ----------------------------------------------------------------------------
   👉 ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR para cambiar textos, datos
      de contacto, servicios, precios, testimonios, el blog, etc.
   - Cambia el texto entre comillas "así".
   - Los placeholders entre corchetes ([WhatsApp], [Dirección], [Ciudad]) los
     rellena el script de clonado por negocio (o cámbialos a mano).
   - No borres las comas, llaves { } ni corchetes [ ] de la estructura.
   - Los íconos (icon: Stethoscope) usan la librería Lucide: https://lucide.dev/icons
   ============================================================================ */

import type { LucideIcon } from "lucide-react";
import {
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Syringe,
  Sparkles,
  Activity,
  PawPrint,
  Users,
  Shield,
  Microscope,
  Pill,
  Wind,
  Dumbbell,
  Bone,
  Beef,
} from "lucide-react";

/* ---------------------------------------------------------------------------
   1. DATOS DEL NEGOCIO  (nombre, contacto, ubicación, horarios, pagos)
--------------------------------------------------------------------------- */
export const SITE = {
  name: "Veterinaria Animal Expert",
  title: "Centro Médico Veterinario",
  tagline: "Turbaco, Bolívar",

  // Link de WhatsApp para citas (botones de "Agenda" y flotante)
  whatsapp:
    "https://wa.me/573127246009?text=Hola%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20agendar%20una%20cita%20para%20mi%20mascota",

  instagram: {
    handle: "@vet_animal_expert",
    url: "https://www.instagram.com/vet_animal_expert/",
  },

  address: {
    lines: ["Cra. 21 #17-12, Urbanización La Cruz", "Turbaco, Bolívar"],
    short: "Turbaco",
    extra: "Cra. 21 #17-12, Urb. La Cruz", // se muestra en el footer
  },

  // ⚠️ PENDIENTE CONFIRMAR con el cliente. De la ficha de Google solo se sabe
  // que cierra a las 6:30 p.m.; el resto es un horario tentativo.
  hours: [
    { day: "Lunes a Viernes", time: "8:00 a.m. – 6:30 p.m." },
    { day: "Sábados", time: "8:00 a.m. – 6:30 p.m." },
    { day: "Domingos y festivos", time: "Cerrado" },
  ],

  // ⚠️ PENDIENTE CONFIRMAR con el cliente cuáles acepta realmente.
  payments: [
    "Efectivo",
    "Transferencia (Nequi, Daviplata, Bancolombia y más)",
    "Tarjeta de crédito y débito (datáfono)",
  ],

  // Distintivo de confianza visible en Hero / Stats
  trustBadge: "Cirugía especializada · Mínimamente invasiva",
};

/* ---------------------------------------------------------------------------
   1b. DATOS REALES DE GOOGLE  (ficha del negocio en Google Maps)
   👉 Valores placeholder. Los rellena el script de clonado por negocio a
      partir de la ficha real (rating, reseñas, teléfono, ubicación, mapa).
      Mientras reviewCount sea 0 las secciones de Google se ocultan solas.
--------------------------------------------------------------------------- */
export const GOOGLE = {
  // La ficha de Google aún no tiene reseñas ("Puedes ser la primera persona en
  // opinar"), así que todas las piezas de reseñas se ocultan solas.
  rating: 0,
  reviewCount: 0,
  // Cruce de la Cra. 21 con Calle 17 (la dirección es Cra. 21 #17-12), tomado
  // de OpenStreetMap. Coincide con los puntos de referencia de la ficha de
  // Google (Olímpica Turbaco al oriente, Parque El Recreo al sur).
  geo: { lat: 10.3299, lng: -75.41652 } as { lat: number; lng: number } | null,
  mapsUri:
    "https://www.google.com/maps/search/?api=1&query=Veterinaria%20Animal%20Expert%2C%20Cra.%2021%20%2317-12%2C%20Turbaco%2C%20Bol%C3%ADvar",
  // Teléfono real (sin espacios para tel:). Mostrado con formato amigable.
  phone: "3127246009",
  phoneDisplay: "312 724 6009",
  phoneIntl: "+573127246009",
};

/* ---------------------------------------------------------------------------
   1.b  FOTOS  ← AQUÍ SE PONEN LAS IMÁGENES DEL NEGOCIO
   Para poner una foto: (1) suelta el archivo en  public/images/
   (2) escribe su ruta en  src  (ej. src: "/images/hero.jpg").
   Si  src  queda en null, se muestra un marcador elegante (no rompe nada).
   Tamaños ideales: hero/about 1080×1350 (vertical 4:5) · galería 1080×1350.
--------------------------------------------------------------------------- */
export type ImageSlot = { src: string | null; alt: string };
export const IMAGES: {
  hero: ImageSlot;
  about: ImageSlot;
  gallery: ImageSlot[];
} = {
  hero: {
    src: "/images/hero-cirugia-minimamente-invasiva.jpg",
    alt: "Equipo de Veterinaria Animal Expert en una cirugía mínimamente invasiva en Turbaco",
  },
  about: {
    src: "/images/veterinario-rayos-x.jpg",
    alt: "Médico veterinario de Animal Expert operando el equipo de rayos X",
  },
  gallery: [
    {
      src: "/images/cirugia-pabellon-animal-expert.jpg",
      alt: "Cirugía veterinaria en el pabellón de Animal Expert, Turbaco",
    },
    {
      src: "/images/equipo-veterinario-cirugia.jpg",
      alt: "Equipo quirúrgico de Animal Expert durante un procedimiento",
    },
    {
      src: "/images/caso-doky-luxacion-cadera.jpg",
      alt: "Caso clínico de DOKY: luxación de cadera tratada en Animal Expert",
    },
    {
      src: "/images/antisepsia-quirurgica.jpg",
      alt: "Protocolo de antisepsia quirúrgica en Animal Expert",
    },
    {
      src: "/images/atencion-equinos.jpg",
      alt: "Médico veterinario de Animal Expert atendiendo a un equino",
    },
  ],
};

/* ---------------------------------------------------------------------------
   2. SEO  (lo que se ve en Google y al compartir el link)
--------------------------------------------------------------------------- */
export const SEO = {
  url: "https://veterinariaanimalexpert.com", // ⚠️ PENDIENTE: dominio real del cliente
  // Fórmula SEO local: "[Servicio principal] en [Ciudad] | [Negocio]"
  title: "Veterinaria en Turbaco | Animal Expert",
  // 140–160 caracteres, con keyword local + CTA "Agenda por WhatsApp".
  description:
    "Centro médico veterinario en Turbaco, Bolívar: consulta especializada, cirugía mínimamente invasiva, rayos X, ozonoterapia, fisioterapia, vacunación y desparasitación. Agenda por WhatsApp.",
  keywords: [
    "veterinaria Turbaco",
    "veterinaria en Turbaco Bolívar",
    "médico veterinario Turbaco",
    "cirugía veterinaria Turbaco",
    "cirugía mínimamente invasiva veterinaria",
    "vacunación mascotas Turbaco",
    "esterilización perros gatos Turbaco",
    "rayos x veterinaria Turbaco",
    "ozonoterapia veterinaria",
    "fisioterapia y rehabilitación canina",
    "veterinario de equinos Bolívar",
    "centro médico veterinario Animal Expert",
  ],
};

/* ---------------------------------------------------------------------------
   3. MENÚ DE NAVEGACIÓN
--------------------------------------------------------------------------- */
export const NAV = {
  links: [
    { href: "/#servicios", label: "Servicios" },
    { href: "/#precios", label: "Precios" },
    { href: "/#sobre-mi", label: "El equipo" },
    { href: "/#casos", label: "Casos" },
    { href: "/#agenda", label: "Agendar" },
    { href: "/blog", label: "Blog" },
    { href: "/#contacto", label: "Contacto" },
  ],
  cta: "Agenda tu cita",
};

/* ---------------------------------------------------------------------------
   4. HERO  (lo primero que se ve)
--------------------------------------------------------------------------- */
export const HERO = {
  eyebrow: "Centro médico veterinario · Turbaco, Bolívar",
  titleA: "Cuidamos a tu mascota", // primera línea
  titleB: "como parte de", // segunda línea (antes del resaltado del acento)
  titleEmphasis: "la familia", // palabra resaltada en el acento
  subcopy:
    "Consulta general y especializada, cirugía mínimamente invasiva, profilaxis, vacunación y desparasitación. Agenda tu cita fácil por WhatsApp.",
  ctaPrimary: "Agenda tu cita",
  ctaSecondary: "Ver servicios",
  cred1: "Dr. Jairo Loaiza · MVZ con maestría en cirugía",
  cred2: "Cirugía especializada · Instrumental esterilizado",
  badgeValue: "MVZ",
  badgeLabel: "médicos\ntitulados",
};

/* ---------------------------------------------------------------------------
   5. BARRA DE DATOS (debajo del hero)
   El campo `trustBadge` de SITE se puede agregar como stat extra.
--------------------------------------------------------------------------- */
export const STATS = [
  { value: "MVZ", label: "Médicos veterinarios titulados" },
  { value: "Cirugía", label: "General, especializada y mínimamente invasiva" },
  { value: "Cita", label: "Agenda directo por WhatsApp" },
  { value: "Turbaco", label: "Urb. La Cruz, Cra. 21 #17-12" },
];

/* ---------------------------------------------------------------------------
   6. SERVICIOS
   Cada servicio tiene `priceFrom` (texto) que alimenta la sección de Precios.
--------------------------------------------------------------------------- */
export type ServiceItem = {
  icon: LucideIcon;
  name: string;
  desc: string;
  group: string;
  priceFrom: string;
};
export const SERVICES = {
  eyebrow: "Servicios",
  title: "Todo para la salud y el bienestar de tu mascota",
  subtitle:
    "Atención veterinaria completa para prevenir, diagnosticar y tratar: medicina general y especializada, cirugía —incluida la mínimamente invasiva—, rayos X, terapias de recuperación y todo el plan preventivo de tu mascota.",
  items: [
    {
      icon: Stethoscope,
      name: "Consulta general",
      group: "Medicina",
      priceFrom: "Consultar",
      desc: "Revisión completa del estado de salud de tu mascota: examen físico, diagnóstico claro y plan de tratamiento explicado sin tecnicismos.",
    },
    {
      icon: HeartPulse,
      name: "Consulta especializada",
      group: "Medicina",
      priceFrom: "Consultar",
      desc: "Valoración a fondo para casos que necesitan más que una consulta de rutina: seguimiento de enfermedades crónicas, casos complejos y segunda opinión.",
    },
    {
      icon: Activity,
      name: "Cirugía especializada",
      group: "Cirugía",
      priceFrom: "Consultar",
      desc: "Procedimientos quirúrgicos con anestesia monitoreada, instrumental esterilizado y protocolos de bioseguridad estrictos de principio a fin.",
    },
    {
      icon: Microscope,
      name: "Cirugía mínimamente invasiva",
      group: "Cirugía",
      priceFrom: "Consultar",
      desc: "Técnica con incisiones pequeñas, cámara e instrumental especializado: menos daño en los tejidos, menos dolor y una recuperación más rápida.",
    },
    {
      icon: Sparkles,
      name: "Profilaxis dental",
      group: "Preventiva",
      priceFrom: "Consultar",
      desc: "Limpieza dental profesional que retira sarro y placa, previene la enfermedad periodontal y le quita el mal aliento a tu mascota.",
    },
    {
      icon: Syringe,
      name: "Vacunación",
      group: "Preventiva",
      priceFrom: "Consultar",
      desc: "Esquema completo para perros y gatos: parvovirus, moquillo, rabia, triple felina y refuerzos. Llevamos el control de las fechas por ti.",
    },
    {
      icon: Pill,
      name: "Desparasitación",
      group: "Preventiva",
      priceFrom: "Consultar",
      desc: "Control interno y externo de parásitos: pulgas, garrapatas y gusanos intestinales, con el producto y la dosis que corresponden a tu mascota.",
    },
    {
      icon: Bone,
      name: "Radiografía y diagnóstico por imagen",
      group: "Diagnóstico",
      priceFrom: "Consultar",
      desc: "Rayos X en la clínica para ver fracturas, luxaciones, problemas articulares y todo lo que el examen físico no alcanza a mostrar.",
    },
    {
      icon: PawPrint,
      name: "Reproducción y ecografía",
      group: "Diagnóstico",
      priceFrom: "Consultar",
      desc: "Asesoría reproductiva, seguimiento de gestación y control ecográfico para acompañar a tu mascota antes, durante y después del parto.",
    },
    {
      icon: Wind,
      name: "Ozonoterapia",
      group: "Terapias",
      priceFrom: "Consultar",
      desc: "Terapia complementaria con ozono medicinal para procesos inflamatorios, infecciosos y de cicatrización difícil, aplicada por un veterinario con diplomado en la técnica.",
    },
    {
      icon: Dumbbell,
      name: "Fisioterapia y rehabilitación",
      group: "Terapias",
      priceFrom: "Consultar",
      desc: "Recuperación de la movilidad después de una cirugía, una lesión o en pacientes mayores. Plan de sesiones según el caso de tu mascota.",
    },
    {
      icon: Beef,
      name: "Atención a equinos y grandes animales",
      group: "Grandes animales",
      priceFrom: "Consultar",
      desc: "El servicio no se limita a perros y gatos: también atendemos equinos y otros animales de gran porte. Escríbenos para coordinar la atención.",
    },
  ] as ServiceItem[],
};

/* ---------------------------------------------------------------------------
   7. SOBRE EL PROFESIONAL
--------------------------------------------------------------------------- */
export const ABOUT = {
  eyebrow: "Conoce al veterinario",
  titleA: "Dr. Jairo Loaiza:",
  titleEmphasis: "formación y cirugía",
  paragraphs: [
    "Animal Expert está a cargo del Dr. Jairo Loaiza, médico veterinario zootecnista con maestría en pequeñas especies y cirugía. Cada consulta en nuestra sede de Turbaco es una oportunidad de cuidar a tu mascota con el rigor de la ciencia y el trato cálido que merece.",
    "Su formación va más allá de la consulta general: maestría en cirugía, diplomados en ozonoterapia y en fisioterapia para pequeñas especies, y técnicas actualizadas como la cirugía mínimamente invasiva, que reduce el dolor y acorta la recuperación. Todo con una filosofía clara: que el dueño entienda el estado de su mascota y decida informado, sin apuros y sin procedimientos innecesarios.",
  ],
  // ⚠️ PENDIENTE: número de registro profesional y años de experiencia.
  //    El resto viene del perfil profesional del Dr. Loaiza (@jairoloaiza09).
  credentials: [
    "Médico Veterinario Zootecnista (MVZ)",
    "MSc. en pequeñas especies y cirugía",
    "Diplomado en ozonoterapia",
    "Diplomado en fisioterapia para pequeñas especies",
    "Cirugía mínimamente invasiva (CMI)",
  ],
  badgeLine1: "MVZ, MSc.",
  badgeLine2: "en cirugía",
  signature: "Dr. Jairo Loaiza · MVZ, MSc.",
};

/* ---------------------------------------------------------------------------
   8. CASOS (galería de trabajos)
   La plantilla usa placeholders; el script de clonado pone fotos reales.
--------------------------------------------------------------------------- */
export type CaseItem = {
  title: string;
  tag: string;
  /** Resumen corto del caso (se muestra bajo el título). */
  desc?: string;
  /** Si el caso está publicado en Instagram, enlace a la publicación. */
  href?: string;
};

export const CASES = {
  eyebrow: "Casos clínicos",
  title: "Casos reales de nuestra clínica",
  subtitle:
    "Cirugías y procedimientos hechos en Animal Expert. Varios los publicamos en Instagram con la explicación completa del caso.",
  caption: "Fotos reales del quirófano de Animal Expert, en Turbaco.",
  items: [
    {
      title: "Cirugía en pabellón",
      tag: "Cirugía",
      desc: "Procedimiento quirúrgico con instrumental esterilizado y monitoreo permanente del paciente.",
    },
    {
      title: "Equipo quirúrgico completo",
      tag: "Cirugía",
      desc: "Cirujano, ayudante y anestesista trabajando juntos en cada procedimiento, no una sola persona haciendo todo.",
    },
    {
      title: "Caso DOKY: luxación de cadera",
      tag: "Ortopedia",
      desc: "Canino de raza pequeña con luxación de cadera del miembro posterior derecho, tratado con consulta ortopédica especializada.",
      href: "https://www.instagram.com/p/DNWCySpAXU0/",
    },
    {
      title: "Antisepsia quirúrgica",
      tag: "Bioseguridad",
      desc: "El protocolo de esterilización y desinfección que aplicamos antes de cualquier procedimiento quirúrgico.",
      href: "https://www.instagram.com/reel/C7QAjA3AdEJ/",
    },
    {
      title: "Atención a equinos",
      tag: "Grandes animales",
      desc: "El trabajo del equipo no se limita a perros y gatos: también atendemos equinos y otros animales de gran porte.",
    },
  ] as CaseItem[],
  note: "Más casos y procedimientos en nuestro Instagram.",
  ctaLabel: "Ver más en Instagram",
  postLabel: "Ver publicación",
};

/* ---------------------------------------------------------------------------
   9. POR QUÉ ELEGIRNOS
--------------------------------------------------------------------------- */
export type WhyItem = { icon: LucideIcon; title: string; desc: string };
export const WHY = {
  eyebrow: "Por qué elegirnos",
  title: "Confianza que se construye con cada cita",
  subtitle: "No es solo el tratamiento: es la tranquilidad de saber que tu mascota está en las mejores manos.",
  items: [
    {
      icon: HeartPulse,
      title: "Cirugía mínimamente invasiva",
      desc: "Incisiones pequeñas, cámara e instrumental especializado: menos daño en los tejidos, menos dolor y una recuperación mucho más rápida para tu mascota.",
    },
    {
      icon: Shield,
      title: "Bioseguridad e instrumental esterilizado",
      desc: "Protocolos estrictos de desinfección y esterilización en cada procedimiento. La seguridad de tu mascota es nuestra prioridad.",
    },
    {
      icon: Activity,
      title: "Consulta general y especializada",
      desc: "Desde el control de rutina hasta los casos que necesitan una valoración a fondo, con diagnóstico ecográfico cuando el caso lo requiere.",
    },
    {
      icon: Users,
      title: "Médicos veterinarios zootecnistas",
      desc: "Nuestro equipo combina formación veterinaria rigurosa con un trato cálido y respetuoso hacia cada mascota y su familia.",
    },
  ] as WhyItem[],
};

/* ---------------------------------------------------------------------------
   10. TESTIMONIOS  (genéricos; el script de clonado pone reseñas reales)
--------------------------------------------------------------------------- */
// ⚠️ PENDIENTE: estas 3 reseñas son genéricas de plantilla. Reemplazar por
//    reseñas reales de clientes (con su permiso) apenas las tengas.
export const TESTIMONIALS = {
  eyebrow: "Reseñas",
  title: "Lo que dicen los dueños de nuestros pacientes",
  items: [
    {
      quote:
        "Excelente atención para mi perrita. El veterinario fue muy cuidadoso, explicó todo el diagnóstico y quedé muy tranquila con el tratamiento. 100% recomendado.",
      name: "Valentina Torres",
      role: "Reseña",
    },
    {
      quote:
        "A mi gato le hicieron cirugía y la recuperación fue mucho más rápida de lo que esperaba. Nos explicaron todo el procedimiento antes y después. Gracias por cuidarlo como si fuera de ustedes.",
      name: "Andrés Palomino",
      role: "Reseña",
    },
    {
      quote:
        "La mejor veterinaria en Turbaco. Precios justos, instalaciones limpias y un equipo que de verdad ama a los animales. Mi perro queda feliz cada vez.",
      name: "Luisa Fernanda Ríos",
      role: "Reseña",
    },
  ],
  // Línea de agregado bajo el grid (enlazada a la ficha de Google).
  // Solo se muestra cuando GOOGLE.reviewCount > 0.
  aggregateLabel: `⭐ ${GOOGLE.rating.toFixed(1)} · ${GOOGLE.reviewCount} reseñas en Google`,
};

/* ---------------------------------------------------------------------------
   11. CÓMO TRABAJAMOS (proceso)
--------------------------------------------------------------------------- */
export const PROCESS = {
  eyebrow: "Cómo trabajamos",
  title: "Tu cita en 4 pasos",
  subtitle: "Un proceso claro y sin sorpresas, para que llegues tranquilo y tu mascota reciba la atención que merece.",
  steps: [
    {
      step: "01",
      title: "Agenda",
      desc: "Escríbenos por WhatsApp o llámanos. Reserva tu día y hora, te confirmamos de inmediato y te orientamos sobre qué traer.",
    },
    {
      step: "02",
      title: "Valoración",
      desc: "Llegás a tu hora, sin esperas. Hacemos una revisión completa de tu mascota y te explicamos el diagnóstico y las opciones.",
    },
    {
      step: "03",
      title: "Tratamiento",
      desc: "Ejecutamos el procedimiento con técnica precisa, anestesia adecuada cuando aplica y todos los protocolos de bioseguridad.",
    },
    {
      step: "04",
      title: "Seguimiento",
      desc: "Te damos indicaciones claras del cuidado en casa y te acompañamos en el seguimiento para garantizar la recuperación.",
    },
  ],
};

/* ---------------------------------------------------------------------------
   11b. AGENDA EN LÍNEA
   La sección <Agenda /> pide fecha y hora reales contra el calendario de la
   clínica (Google Calendar). La configuración de horarios NO vive aquí sino en
   lib/booking.ts, porque el servidor también la necesita para validar.
--------------------------------------------------------------------------- */
export const AGENDA = {
  eyebrow: "Agenda en línea",
  title: "Reserva la cita de tu mascota",
  subtitle:
    "Elige el día y la hora que te sirvan. Te confirmamos al instante y te llega el recordatorio al correo.",
  formTitle: "Datos de la cita",
  formSubtitle: "Toma menos de un minuto.",
  petSectionTitle: "Sobre tu mascota",
  petSectionHint:
    "Entre más nos cuentes, mejor preparamos la consulta. Solo el nombre y la especie son obligatorios.",
  cta: "Confirmar cita",
  ctaLoading: "Agendando…",
  labels: {
    service: "¿Qué necesita tu mascota?",
    name: "Tu nombre",
    phone: "WhatsApp",
    email: "Correo (opcional)",
    pet: "Nombre de tu mascota",
    species: "Especie",
    breed: "Raza",
    age: "Edad",
    sex: "Sexo",
    weight: "Peso aproximado",
    status: "¿Ya la hemos atendido?",
    vaccines: "Vacunas",
    date: "Día",
    time: "Hora disponible",
    note: "Cuéntanos qué le pasa",
  },
  petOptions: {
    species: ["Perro", "Gato", "Equino", "Otra especie"],
    sex: ["No lo sé", "Macho", "Hembra", "Macho esterilizado", "Hembra esterilizada"],
    status: ["Primera vez", "Ya es paciente de la clínica"],
    vaccines: ["No lo sé", "Al día", "Atrasadas", "Nunca ha recibido"],
  },
  placeholders: {
    name: "Ej. Carlos Andrés",
    phone: "300 000 0000",
    email: "tu@correo.com",
    pet: "Ej. Doky",
    breed: "Ej. Criollo, Schnauzer…",
    age: "Ej. 3 años · 8 meses",
    weight: "Ej. 8 kg",
    note: "Síntomas, hace cuánto empezaron, si ya tuvo tratamiento…",
  },
  hints: {
    email: "Si lo dejas, te llega la invitación con recordatorio.",
    noDate: "Elige un día para ver los horarios libres.",
    loading: "Buscando horarios libres…",
    closed: "Ese día no atendemos. Prueba con otro.",
    empty: "No quedan horarios libres ese día. Prueba con otro.",
    duration: "Cada cita dura 30 minutos.",
  },
  success: {
    confirmedTitle: "¡Cita confirmada!",
    confirmedText:
      "Quedó reservada en la agenda de la clínica. Si diste tu correo, allí te llega la invitación con recordatorio.",
    pendingTitle: "¡Solicitud recibida!",
    pendingText:
      "Confírmala por WhatsApp y te apartamos el horario. Es un segundo.",
    again: "Agendar otra cita",
    whatsapp: "Confirmar por WhatsApp",
  },
  errors: {
    generic: "No se pudo agendar. Intenta de nuevo o escríbenos por WhatsApp.",
    whatsappFallback: "O escríbenos por WhatsApp",
    required: "Completa este campo",
    phone: "Escribe un teléfono válido",
    email: "Ese correo no parece válido",
    date: "Elige un día",
    time: "Elige una hora",
    species: "Elige la especie",
  },
};

/* ---------------------------------------------------------------------------
   12. CONTACTO / AGENDAR
--------------------------------------------------------------------------- */
export const CONTACT = {
  eyebrow: "Contacto",
  titleA: "Escríbenos o visítanos en",
  titleEmphasis: "la clínica",
  subcopy:
    "Escríbenos por WhatsApp y agendemos la cita de tu mascota. Te atendemos en la Cra. 21 #17-12, Urbanización La Cruz, en Turbaco.",
  formTitle: "¿Prefieres escribirnos?",
  formSubtitle: "Si no quieres agendar en línea, cuéntanos y te respondemos por WhatsApp.",
  cta: "Escribir por WhatsApp",
  firstServiceOption: "Aún no lo sé, necesito orientación",
  labels: { name: "Tu nombre", service: "¿Qué servicio necesitas?", note: "Mensaje" },
  placeholders: {
    name: "Ej. Carlos Andrés",
    note: "Cuéntanos qué servicio necesitas o qué le pasa a tu mascota…",
  },
};

/* ---------------------------------------------------------------------------
   13. PIE DE PÁGINA
--------------------------------------------------------------------------- */
export const FOOTER = {
  description:
    "Centro médico veterinario en Turbaco, Bolívar. Consulta general y especializada, cirugía —incluida la mínimamente invasiva—, profilaxis, vacunación y desparasitación.",
  navTitle: "Navega",
  visitTitle: "Visítanos",
  whatsappLabel: "Agenda por WhatsApp",
  copyright: "Veterinaria Animal Expert",
};

/* ---------------------------------------------------------------------------
   14. BLOG  (los artículos)
   Cada artículo tiene "content" con bloques:
     { type: "p", text: "..." }      → párrafo
     { type: "h2", text: "..." }     → subtítulo
     { type: "ul", items: ["...","..."] } → lista
--------------------------------------------------------------------------- */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  readMin: number;
  content: Block[];
};

export const BLOG = {
  eyebrow: "Blog",
  title: "Consejos de salud y bienestar para tu mascota",
  subtitle:
    "Tips prácticos para que llegues mejor preparado a tu cita, cuides a tu mascota en casa y entiendas mejor los tratamientos y cuidados preventivos.",
  posts: [
    {
      slug: "calendario-vacunacion-perros-gatos",
      title: "Calendario de vacunación para perros y gatos",
      excerpt:
        "Las vacunas son la herramienta más eficaz para proteger a tu mascota de enfermedades graves. Conoce el esquema completo y los refuerzos anuales.",
      category: "Preventiva",
      dateLabel: "10 de junio, 2026",
      readMin: 4,
      content: [
        {
          type: "p",
          text: "Vacunar a tu mascota no es opcional: es la forma más eficaz y económica de protegerla de enfermedades que pueden ser mortales. Aquí te explicamos qué vacunas necesita tu perro o gato, cuándo aplicarlas y por qué los refuerzos anuales son tan importantes.",
        },
        { type: "h2", text: "Vacunas esenciales para perros" },
        {
          type: "ul",
          items: [
            "Parvovirus: altamente contagioso y mortal en cachorros. Primera dosis a las 6-8 semanas.",
            "Moquillo (Distemper): afecta el sistema nervioso y respiratorio. Se aplica junto al parvovirus.",
            "Hepatitis infecciosa canina: protege el hígado. Incluida en la vacuna polivalente (DHPP).",
            "Rabia: obligatoria por ley desde los 3 meses de edad. Refuerzo anual.",
            "Leptospirosis: recomendada si el perro tiene acceso a agua o zonas con roedores.",
          ],
        },
        { type: "h2", text: "Vacunas esenciales para gatos" },
        {
          type: "ul",
          items: [
            "Triple felina (FVRCP): protege contra rinotraqueítis, calicivirus y panleucopenia. Desde las 8 semanas.",
            "Rabia: obligatoria desde los 3 meses, incluso en gatos de interior.",
            "Leucemia felina (FeLV): recomendada para gatos con acceso al exterior o contacto con otros felinos.",
          ],
        },
        { type: "h2", text: "¿Con qué frecuencia se deben reforzar?" },
        {
          type: "p",
          text: "La mayoría de vacunas requieren una serie inicial de 2-3 dosis en cachorros y luego refuerzos anuales o cada 3 años según el tipo. En la clínica llevamos el control del historial de vacunación de tu mascota y te avisamos cuando es hora del próximo refuerzo. Agenda la primera consulta por WhatsApp.",
        },
      ],
    },
    {
      slug: "edad-esterilizar-mascota",
      title: "¿A qué edad esterilizar a tu mascota?",
      excerpt:
        "La esterilización previene enfermedades graves, reduce el comportamiento agresivo y contribuye al control de la sobrepoblación. Aquí todo lo que necesitas saber.",
      category: "Cirugía",
      dateLabel: "28 de mayo, 2026",
      readMin: 5,
      content: [
        {
          type: "p",
          text: "Esterilizar a tu mascota es una de las decisiones más responsables que puedes tomar como dueño. No solo evita camadas no deseadas, sino que protege la salud de tu perro o gato y puede mejorar significativamente su comportamiento y calidad de vida.",
        },
        { type: "h2", text: "¿Cuándo esterilizar a tu perro?" },
        {
          type: "ul",
          items: [
            "Hembras: idealmente antes del primer celo, alrededor de los 6 meses. Reduce drásticamente el riesgo de tumores mamarios.",
            "Machos: entre los 6 y 12 meses. Disminuye el instinto de fuga, la agresividad y la marcación de territorio.",
            "Razas grandes: se recomienda esperar hasta los 12-18 meses para el desarrollo musculoesquelético completo.",
          ],
        },
        { type: "h2", text: "¿Cuándo esterilizar a tu gato?" },
        {
          type: "ul",
          items: [
            "Hembras: a partir de los 4-5 meses, antes del primer celo. Elimina el riesgo de piometra (infección uterina).",
            "Machos: entre los 5 y 7 meses. Reduce el marcaje con orina y el comportamiento territorial.",
          ],
        },
        { type: "h2", text: "Beneficios de la esterilización" },
        {
          type: "ul",
          items: [
            "Previene tumores mamarios, de ovario y testiculares.",
            "Elimina el riesgo de piometra (infección uterina grave).",
            "Reduce comportamientos agresivos, marcaje y huidas.",
            "Contribuye al control de la sobrepoblación animal.",
            "Mayor esperanza de vida en promedio.",
          ],
        },
        {
          type: "p",
          text: "Si tienes dudas sobre el momento ideal para esterilizar a tu mascota, agenda una consulta con nuestro veterinario. Evaluamos el estado de salud y te damos una recomendación personalizada. Escríbenos por WhatsApp.",
        },
      ],
    },
    {
      slug: "senales-urgencia-veterinaria",
      title: "Señales de urgencia veterinaria: cuándo llevar a tu mascota YA",
      excerpt:
        "Reconocer una emergencia a tiempo puede salvarle la vida a tu mascota. Aprende cuáles son las señales de alarma que no debes ignorar.",
      category: "Urgencias",
      dateLabel: "12 de mayo, 2026",
      readMin: 4,
      content: [
        {
          type: "p",
          text: "Cuando tu mascota está en peligro, cada minuto cuenta. Muchos dueños dudan si ir de urgencia o esperar hasta el día siguiente. Aquí te damos las señales claras que indican que debes actuar de inmediato y no esperar.",
        },
        { type: "h2", text: "Señales de alarma en perros y gatos" },
        {
          type: "ul",
          items: [
            "Dificultad para respirar: respiración agitada, boca abierta o jadeo excesivo en gatos.",
            "Pérdida de consciencia o convulsiones: require atención inmediata.",
            "Vómito o diarrea con sangre: puede indicar intoxicación o hemorragia interna.",
            "Abdomen hinchado y doloroso: posible torsión gástrica (emergencia mortal en perros grandes).",
            "Incapacidad para orinar: obstrucción urinaria, especialmente grave en gatos machos.",
            "Trauma por accidente o pelea: heridas profundas, fracturas o estado de shock.",
            "Ingesta de tóxicos: chocolate, medicamentos humanos, raticidas, uvas o plantas tóxicas.",
            "Parto prolongado sin expulsar crías: más de 2 horas de contracciones sin resultado.",
          ],
        },
        { type: "h2", text: "Qué hacer mientras llegas a la clínica" },
        {
          type: "ul",
          items: [
            "Mantén a tu mascota tranquila y cálida durante el traslado.",
            "No le des medicamentos humanos: pueden empeorar el cuadro.",
            "Si hay sangrado, presiona con un paño limpio sin hacer torniquete.",
            "Llámanos antes de llegar para que preparemos la atención de urgencia.",
          ],
        },
        { type: "h2", text: "Escríbenos apenas notes una de estas señales" },
        {
          type: "p",
          text: "Si notas cualquiera de estas señales, no esperes a la próxima cita: escríbenos por WhatsApp o llámanos al 312 724 6009 y te orientamos de inmediato sobre qué hacer y qué tan rápido debes traer a tu mascota a la clínica.",
        },
      ],
    },
  ] as Post[],
};

export function getPost(slug: string): Post | undefined {
  return BLOG.posts.find((p) => p.slug === slug);
}

/* ---------------------------------------------------------------------------
   15. PREGUNTAS FRECUENTES  (FAQ)
   Alimenta la sección <Faq /> y el JSON-LD FAQPage (semántica + AI Overviews).
   Mantén respuestas cortas, reales y con el CTA de WhatsApp donde aplique.
--------------------------------------------------------------------------- */
export type FaqItem = { q: string; a: string };

/** Encabezado de la sección de preguntas frecuentes. */
export const FAQ_META = {
  eyebrow: "Preguntas frecuentes",
  title: "Resolvemos tus dudas antes de la cita",
  subtitle:
    "Lo que más nos preguntan sobre vacunas, esterilización, urgencias y pagos. ¿Te queda otra duda? Escríbenos por WhatsApp.",
};

export const FAQ: FaqItem[] = [
  {
    q: "¿Qué vacunas son obligatorias y cuándo se aplican los refuerzos?",
    a: "La rabia es obligatoria por ley desde los 3 meses en perros y gatos. La polivalente canina (DHPP) y la triple felina (FVRCP) se aplican en una serie inicial desde las 6-8 semanas y luego con refuerzos anuales. En la clínica llevamos el control del historial y te avisamos cuando corresponde el siguiente refuerzo.",
  },
  {
    q: "¿A qué edad se recomienda esterilizar a mi mascota?",
    a: "En perras y gatas, idealmente antes del primer celo: alrededor de los 5-6 meses. En machos, entre los 6 y 12 meses. En razas grandes de perro se puede esperar hasta los 12-18 meses. Agenda una consulta y te damos la recomendación exacta según tu mascota.",
  },
  {
    q: "¿Dónde quedan y en qué horario atienden?",
    a: "Estamos en la Cra. 21 #17-12, Urbanización La Cruz, en Turbaco (Bolívar), y atendemos con cita hasta las 6:30 p.m. Si tu mascota tiene una situación urgente, escríbenos por WhatsApp al 312 724 6009 y te orientamos de inmediato sobre qué hacer.",
  },
  {
    q: "¿Cuánto cuesta la consulta y cómo puedo pagar?",
    a: "El valor depende de lo que necesite tu mascota, por eso te confirmamos el precio exacto al agendar, antes de cualquier procedimiento. Aceptamos efectivo, transferencia (Nequi, Daviplata, Bancolombia) y tarjeta de crédito y débito. Escríbenos por WhatsApp y te cotizamos.",
  },
  {
    q: "¿Qué es la cirugía mínimamente invasiva y por qué conviene?",
    a: "Es una técnica quirúrgica que trabaja con incisiones pequeñas, cámara e instrumental especializado, en lugar de una apertura amplia. Eso significa menos daño en los tejidos, menos dolor después de la cirugía, menor riesgo de complicaciones y una recuperación más rápida para tu mascota.",
  },
  {
    q: "¿Atienden otras especies además de perros y gatos?",
    a: "Nuestra especialidad principal son las pequeñas especies (perros y gatos), pero también atendemos equinos y otros animales de gran porte. Escríbenos por WhatsApp indicando el tipo de animal y te confirmamos cómo coordinamos la atención.",
  },
];
