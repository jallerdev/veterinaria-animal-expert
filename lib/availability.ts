import {
  MIN_LEAD_MIN,
  SLOT_DURATION_MIN,
  SLOT_TIMES,
  isBookableDate,
  slotStart,
} from "./booking";
import { getBusy, isGoogleConfigured, type BusyInterval } from "./google-calendar";

function overlaps(startMs: number, endMs: number, busy: BusyInterval[]): boolean {
  return busy.some((b) => {
    const bs = new Date(b.start).getTime();
    const be = new Date(b.end).getTime();
    return startMs < be && endMs > bs;
  });
}

/**
 * Horas libres de un día ("HH:MM").
 *
 * Si Google no está configurado —o si falla— devuelve todos los horarios en vez
 * de ninguno: mostrar "sin disponibilidad" por un problema de infraestructura
 * haría ver la clínica como llena para siempre. La cita se termina de confirmar
 * por WhatsApp en ese caso.
 */
export async function freeSlots(date: string): Promise<string[]> {
  if (!isBookableDate(date)) return [];

  const earliest = Date.now() + MIN_LEAD_MIN * 60_000;
  const candidates: { time: string; start: Date; end: Date }[] = [];
  for (const time of SLOT_TIMES) {
    const start = slotStart(date, time);
    if (!start || start.getTime() < earliest) continue;
    candidates.push({ time, start, end: new Date(start.getTime() + SLOT_DURATION_MIN * 60_000) });
  }

  if (candidates.length === 0) return [];
  if (!isGoogleConfigured()) return candidates.map((c) => c.time);

  let busy: BusyInterval[];
  try {
    busy = await getBusy(
      candidates[0].start.toISOString(),
      candidates[candidates.length - 1].end.toISOString()
    );
  } catch (err) {
    console.error("[availability] getBusy falló; devuelvo todos los horarios:", err);
    return candidates.map((c) => c.time);
  }

  return candidates
    .filter((c) => !overlaps(c.start.getTime(), c.end.getTime(), busy))
    .map((c) => c.time);
}
