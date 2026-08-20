// Genera el GOOGLE_REFRESH_TOKEN de la cuenta de Google de la clínica.
// Se corre UNA sola vez, en el computador de quien hace el setup.
//
// Antes, en Google Cloud Console (con la cuenta de la clínica):
//   1. Crear un proyecto y habilitar "Google Calendar API".
//   2. Pantalla de consentimiento OAuth (External) → agregar el correo de la
//      clínica como usuario de prueba.
//   3. Credenciales → "ID de cliente de OAuth" → tipo "Aplicación web".
//   4. En "URIs de redireccionamiento autorizados" agregar EXACTAMENTE:
//        http://localhost:5555/oauth2callback
//   5. Copiar Client ID y Client Secret a .env.local
//
// Uso:  node scripts/google-auth.mjs
//
// No usa la librería googleapis a propósito: son dos llamadas HTTP.

import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REDIRECT_URI = "http://localhost:5555/oauth2callback";
const SCOPE = "https://www.googleapis.com/auth/calendar";

function loadEnv() {
  const env = { ...process.env };
  const dir = dirname(fileURLToPath(import.meta.url));
  for (const file of [".env.local", ".env"]) {
    try {
      const raw = readFileSync(join(dir, "..", file), "utf8");
      for (const line of raw.split("\n")) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
        if (m && !env[m[1]]) env[m[1]] = m[2];
      }
    } catch {
      // sin archivo, seguimos con process.env
    }
  }
  return env;
}

const env = loadEnv();
const clientId = env.GOOGLE_CLIENT_ID;
const clientSecret = env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Falta GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET en .env.local");
  process.exit(1);
}

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent", // fuerza que Google devuelva refresh_token
  });

const server = createServer(async (req, res) => {
  if (!req.url?.startsWith("/oauth2callback")) {
    res.writeHead(404).end();
    return;
  }
  const code = new URL(req.url, "http://localhost:5555").searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("Falta el parámetro code.");
    return;
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
  const data = await tokenRes.json();

  if (!tokenRes.ok || !data.refresh_token) {
    console.error("\n❌ Google no devolvió refresh_token:", data);
    res.writeHead(500).end("Error. Mira la consola.");
    server.close();
    process.exit(1);
  }

  console.log("\n✅ Copia esto en .env.local:\n");
  console.log(`GOOGLE_REFRESH_TOKEN="${data.refresh_token}"\n`);
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(
    "<h1>Listo</h1><p>Ya puedes cerrar esta pestaña y volver a la terminal.</p>"
  );
  server.close();
  process.exit(0);
});

server.listen(5555, () => {
  console.log("\nAbre esta URL, inicia sesión con la cuenta de la clínica y autoriza:\n");
  console.log(authUrl + "\n");
});
