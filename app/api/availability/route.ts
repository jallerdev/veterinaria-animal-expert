import { NextResponse } from "next/server";

import { isValidDate, isBookableDate } from "@/lib/booking";
import { freeSlots } from "@/lib/availability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get("date");
  if (!date || !isValidDate(date)) {
    return NextResponse.json({ ok: false, error: "Fecha inválida." }, { status: 400 });
  }
  if (!isBookableDate(date)) {
    return NextResponse.json({ ok: true, slots: [], closed: true });
  }

  try {
    return NextResponse.json({ ok: true, slots: await freeSlots(date) });
  } catch (err) {
    console.error("[availability] freeSlots falló:", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo consultar la disponibilidad." },
      { status: 502 }
    );
  }
}
