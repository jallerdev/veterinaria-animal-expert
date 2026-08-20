/* ============================================================================
   Configuración de la agenda de citas.
   Las horas se interpretan SIEMPRE en la zona de la clínica, no en la del
   visitante: así el horario que ve alguien desde otro país sigue siendo el
   horario real de atención en Turbaco.
   ============================================================================ */

export const TIMEZONE = process.env.CLINIC_TIMEZONE || "America/Bogota";

/** Duración de cada cita, en minutos. */
export const SLOT_DURATION_MIN = 30;

/** No se permite agendar con menos de esta antelación. */
export const MIN_LEAD_MIN = 60;

/** Hasta cuántos días hacia adelante se puede agendar. */
export const MAX_DAYS_AHEAD = 60;

/** Días cerrados (0 = domingo … 6 = sábado). */
export const CLOSED_WEEKDAYS = [0];

/** Horas ofrecidas (hora local de la clínica). Ajustar si cambia el horario. */
export const SLOT_TIMES = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00",
] as const;

/** "2026-08-21" con formato válido y fecha real. */
export function isValidDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = new Date(`${date}T12:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === date;
}

/**
 * Desfase horario de la clínica para esa fecha (ej. "-05:00").
 * Se calcula con Intl en vez de hardcodearlo: si algún día el país cambiara de
 * huso o se usara otra zona, esto sigue funcionando sin tocar código.
 */
function offsetFor(date: string): string {
  const probe = new Date(`${date}T12:00:00Z`);
  const name =
    new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, timeZoneName: "longOffset" })
      .formatToParts(probe)
      .find((p) => p.type === "timeZoneName")?.value ?? "GMT-05:00";
  const m = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(name);
  if (!m) return "+00:00";
  return `${m[1]}${m[2].padStart(2, "0")}:${m[3] ?? "00"}`;
}

/** Instante exacto en que empieza el slot (fecha + hora en zona de la clínica). */
export function slotStart(date: string, time: string): Date | null {
  if (!isValidDate(date) || !/^\d{2}:\d{2}$/.test(time)) return null;
  const d = new Date(`${date}T${time}:00${offsetFor(date)}`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Día de la semana de una fecha (0 = domingo). */
export function weekdayOf(date: string): number {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

/** ¿La clínica abre ese día y está dentro de la ventana que se puede agendar? */
export function isBookableDate(date: string): boolean {
  if (!isValidDate(date)) return false;
  if (CLOSED_WEEKDAYS.includes(weekdayOf(date))) return false;
  const limit = new Date(Date.now() + MAX_DAYS_AHEAD * 86400_000);
  return new Date(`${date}T12:00:00Z`) <= limit;
}

/** Texto legible de la cita, para mensajes y para el evento del calendario. */
export function prettyDate(date: string): string {
  if (!isValidDate(date)) return "";
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
