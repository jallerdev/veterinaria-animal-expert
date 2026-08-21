// Diagnóstico de la conexión con Google Calendar. Solo lectura: no crea ni
// borra nada. No imprime secretos, solo el estado de cada paso.
//
// Uso:  node scripts/google-check.mjs

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = { ...process.env };
for (const file of [".env.local", ".env"]) {
  try {
    for (const line of readFileSync(join(root, file), "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !env[m[1]]) env[m[1]] = m[2];
    }
  } catch {
    /* archivo opcional */
  }
}

const need = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN"];
const missing = need.filter((k) => !env[k]);
if (missing.length) {
  console.error("❌ Faltan variables:", missing.join(", "));
  console.error("   Ponlas en .env.local (ver .env.example).");
  process.exit(1);
}
console.log("✓ Variables presentes. Calendario objetivo:", env.GOOGLE_CALENDAR_ID || "primary");

const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    refresh_token: env.GOOGLE_REFRESH_TOKEN,
    grant_type: "refresh_token",
  }),
});
const token = await tokenRes.json();
if (!tokenRes.ok) {
  console.error("❌ El refresh token no sirve:", token.error, "-", token.error_description ?? "");
  if (token.error === "invalid_grant") {
    console.error("   Causas típicas: el token se revocó, o se generó con OTRO client_id/secret.");
    console.error("   Solución: vuelve a correr  node scripts/google-auth.mjs");
  }
  process.exit(1);
}
console.log("✓ Token válido. Permisos:", token.scope);

const headers = { Authorization: `Bearer ${token.access_token}` };
const calId = env.GOOGLE_CALENDAR_ID || "primary";

const listRes = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", { headers });
const list = await listRes.json();

if (!listRes.ok) {
  const reason = list?.error?.errors?.[0]?.reason;
  console.error("❌ La Calendar API respondió", listRes.status, "-", list?.error?.message);
  if (reason === "accessNotConfigured") {
    console.error("\n   👉 La Google Calendar API está DESHABILITADA en el proyecto.");
    console.error("      Ábrela y dale 'Habilitar' en el enlace que aparece arriba,");
    console.error("      espera 2-3 minutos y vuelve a correr este comando.");
  }
  process.exit(1);
}

console.log("\nCalendarios a los que tiene acceso la cuenta autorizada:");
for (const c of list.items ?? []) {
  console.log(`  ${c.primary ? "★" : " "} ${c.summary}  ·  id=${c.id}  ·  ${c.accessRole}`);
}
const target = (list.items ?? []).find((c) => c.id === calId || (calId === "primary" && c.primary));
if (!target) {
  console.error(`\n❌ El calendario "${calId}" no aparece en la lista. Revisa GOOGLE_CALENDAR_ID.`);
  process.exit(1);
}
if (!["owner", "writer"].includes(target.accessRole)) {
  console.error(`\n❌ Sobre "${target.summary}" la cuenta solo tiene "${target.accessRole}": no puede crear citas.`);
  process.exit(1);
}

console.log(`\n✅ Todo listo. Las citas se crearán en "${target.summary}".`);
