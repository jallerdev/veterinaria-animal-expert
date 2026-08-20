/* ============================================================================
   Google Calendar por REST (fetch). No usa la librería `googleapis` a propósito:
   son tres llamadas HTTP y así el proyecto no arrastra ~100 MB de dependencia
   ni obliga a romper el node_modules compartido entre los sitios de clientes.

   Requiere en el entorno del SERVIDOR (nunca en el navegador):
     GOOGLE_CLIENT_ID · GOOGLE_CLIENT_SECRET · GOOGLE_REFRESH_TOKEN
   ============================================================================ */

import { TIMEZONE } from "./booking";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API = "https://www.googleapis.com/calendar/v3";

export function isGoogleConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
  );
}

// El access token dura una hora; se guarda en memoria del proceso para no pedir
// uno nuevo en cada consulta de disponibilidad.
let cached: { token: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN ?? "",
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`OAuth ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cached = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cached.token;
}

export type BusyInterval = { start: string; end: string };

/** Intervalos ocupados del calendario entre dos instantes (ISO). */
export async function getBusy(timeMinISO: string, timeMaxISO: string): Promise<BusyInterval[]> {
  const res = await fetch(`${API}/freeBusy`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      timeZone: TIMEZONE,
      items: [{ id: CALENDAR_ID }],
    }),
  });
  if (!res.ok) throw new Error(`freeBusy ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as {
    calendars?: Record<string, { busy?: { start?: string; end?: string }[] }>;
  };
  const busy = data.calendars?.[CALENDAR_ID]?.busy ?? [];
  return busy.filter((b): b is BusyInterval => Boolean(b.start && b.end));
}

export type CreatedEvent = { eventId: string; htmlLink: string | null };

/**
 * Crea la cita en el calendario de la clínica. Es presencial: lleva `location`
 * con la dirección y NO crea sala de Meet. Si hay correo del dueño, Google le
 * manda la invitación con recordatorio.
 */
export async function createAppointment(opts: {
  start: Date;
  end: Date;
  summary: string;
  description: string;
  location?: string;
  attendeeEmail?: string | null;
}): Promise<CreatedEvent> {
  const res = await fetch(
    `${API}/calendars/${encodeURIComponent(CALENDAR_ID)}/events?sendUpdates=all`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await accessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: opts.summary,
        description: opts.description,
        location: opts.location,
        start: { dateTime: opts.start.toISOString(), timeZone: TIMEZONE },
        end: { dateTime: opts.end.toISOString(), timeZone: TIMEZONE },
        attendees: opts.attendeeEmail ? [{ email: opts.attendeeEmail }] : undefined,
        reminders: {
          useDefault: false,
          overrides: [
            { method: "popup", minutes: 120 },
            { method: "email", minutes: 1440 },
          ],
        },
      }),
    }
  );
  if (!res.ok) throw new Error(`events.insert ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as { id?: string; htmlLink?: string };
  return { eventId: data.id ?? "", htmlLink: data.htmlLink ?? null };
}
