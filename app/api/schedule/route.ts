import { NextResponse } from "next/server";

import { SITE } from "@/content";
import {
  MIN_LEAD_MIN,
  SLOT_DURATION_MIN,
  isBookableDate,
  prettyDate,
  slotStart,
} from "@/lib/booking";
import { freeSlots } from "@/lib/availability";
import { createAppointment, isGoogleConfigured } from "@/lib/google-calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Reserva de cita: valida el horario, lo crea en el calendario de la clínica e
   invita al dueño por correo. Si el calendario no está configurado o falla, la
   solicitud NO se pierde: se responde ok con `confirmed: false` y el formulario
   la cierra por WhatsApp. Los secretos viven solo en el servidor. */

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  date?: string;
  time?: string;
  note?: string;
  // Ficha de la mascota: viaja a la descripción del evento para que el
  // veterinario llegue a la consulta sabiendo qué esperar.
  pet?: string;
  species?: string;
  breed?: string;
  age?: string;
  weight?: string;
  sex?: string;
  status?: string;
  vaccines?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo inválido." }, { status: 400 });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const date = body.date?.trim() ?? "";
  const time = body.time?.trim() ?? "";

  if (!name || !phone || !date || !time) {
    return NextResponse.json({ ok: false, error: "Faltan datos de la cita." }, { status: 400 });
  }
  if (!isBookableDate(date)) {
    return NextResponse.json(
      { ok: false, error: "Ese día no atendemos. Elige otro, por favor." },
      { status: 400 }
    );
  }

  const start = slotStart(date, time);
  if (!start || start.getTime() < Date.now() + MIN_LEAD_MIN * 60_000) {
    return NextResponse.json({ ok: false, error: "Ese horario ya no está disponible." }, { status: 400 });
  }
  const end = new Date(start.getTime() + SLOT_DURATION_MIN * 60_000);

  const service = body.service?.trim() || "Consulta general";
  const email = body.email?.trim() || undefined;
  const note = body.note?.trim();

  const pet = body.pet?.trim();
  const species = body.species?.trim();
  const breed = body.breed?.trim();
  const age = body.age?.trim();
  const weight = body.weight?.trim();
  const sex = body.sex?.trim();
  const status = body.status?.trim();
  const vaccines = body.vaccines?.trim();

  // Resumen de la mascota en una línea, para el CRM y el título del evento.
  const petSummary = [pet, species, breed, age].filter(Boolean).join(" · ");

  let confirmed = false;

  if (isGoogleConfigured()) {
    // Revalidar contra el calendario para que dos personas no tomen el mismo horario.
    const slots = await freeSlots(date);
    if (!slots.includes(time)) {
      return NextResponse.json(
        {
          ok: false,
          code: "SLOT_TAKEN",
          error: "Ese horario se acaba de ocupar. Elige otro, por favor.",
        },
        { status: 409 }
      );
    }

    try {
      await createAppointment({
        start,
        end,
        summary: pet
          ? `${service} · ${pet}${species ? ` (${species})` : ""} — ${name}`
          : `${service} · ${name}`,
        description: [
          `Servicio: ${service}`,
          "",
          "PACIENTE",
          pet ? `· Nombre: ${pet}` : null,
          species ? `· Especie: ${species}` : null,
          breed ? `· Raza: ${breed}` : null,
          age ? `· Edad: ${age}` : null,
          weight ? `· Peso: ${weight}` : null,
          sex ? `· Sexo: ${sex}` : null,
          vaccines ? `· Vacunas: ${vaccines}` : null,
          status ? `· Historial: ${status}` : null,
          "",
          "DUEÑO",
          `· ${name}`,
          `· Teléfono: ${phone}`,
          email ? `· Correo: ${email}` : null,
          note ? `\nMOTIVO DE LA CONSULTA\n${note}` : null,
          `\nAgendado desde ${SITE.name}.`,
        ]
          .filter((l) => l !== null)
          .join("\n"),
        location: `${SITE.address.lines.join(", ")}`,
        attendeeEmail: email ?? null,
      });
      confirmed = true;
    } catch (err) {
      // El calendario falló: se degrada a confirmación por WhatsApp, no se pierde el lead.
      console.error("[schedule] createAppointment falló:", err);
      confirmed = false;
    }
  }

  // Reenvío opcional del lead al CRM (HalcónOS). Best-effort.
  const url = process.env.HALCON_INBOUND_URL;
  const apiKey = process.env.HALCON_INBOUND_API_KEY;
  let leadSaved = false;
  if (url && apiKey) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify({
          name,
          phone,
          email,
          service,
          scheduledAt: start.toISOString(),
          durationMin: SLOT_DURATION_MIN,
          note: [petSummary ? `Mascota: ${petSummary}` : null, note].filter(Boolean).join(" · ") || undefined,
        }),
      });
      leadSaved = res.ok;
    } catch {
      leadSaved = false;
    }
  }

  return NextResponse.json({
    ok: true,
    confirmed,
    leadSaved,
    when: `${prettyDate(date)} a las ${time}`,
  });
}
