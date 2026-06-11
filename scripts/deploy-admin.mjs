// Despliega el panel admin PHP y la estructura de datos/uploads a Hostinger.
// NO pisa /data/projects.json si ya existe en el servidor (para no perder ediciones).
// Uso: node scripts/deploy-admin.mjs [remoteRoot]
//   remoteRoot por defecto: /domains/peridigital.es/public_html
import { readFileSync } from "node:fs";
import * as ftp from "basic-ftp";

function loadEnv(path) {
  const env = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1);
  }
  return env;
}

const remoteRoot = process.argv[2] || "/domains/peridigital.es/public_html";
const env = loadEnv(".env.deploy");
const client = new ftp.Client(30000);
client.ftp.verbose = false;

try {
  await client.access({
    host: env.FTP_HOST,
    user: env.FTP_USER,
    password: env.FTP_PASS,
    port: Number(env.FTP_PORT || 21),
    secure: false,
  });
  console.log("Conectado a", env.FTP_HOST);

  // 1) Panel admin (merge: NO borra config.local.php del servidor)
  console.log("Subiendo /admin …");
  await client.ensureDir(`${remoteRoot}/admin`);
  await client.uploadFromDir("server/admin", `${remoteRoot}/admin`);

  // 2) Carpetas de subidas
  await client.ensureDir(`${remoteRoot}/uploads/proyectos`);
  await client.ensureDir(`${remoteRoot}/uploads/articulos`);

  // 3) Seed de projects.json SOLO si no existe (no pisar ediciones en vivo)
  await client.ensureDir(`${remoteRoot}/data`);
  const remoteProjects = `${remoteRoot}/data/projects.json`;
  let exists = true;
  try {
    await client.size(remoteProjects);
  } catch {
    exists = false;
  }
  if (exists) {
    console.log("data/projects.json ya existe en el servidor → NO se pisa.");
  } else {
    await client.uploadFrom("server/data/projects.json", remoteProjects);
    console.log("Seed data/projects.json subido.");
  }

  console.log("OK. Panel admin desplegado.");
} catch (e) {
  console.error("ERROR FTP:", e.message);
  process.exitCode = 1;
} finally {
  client.close();
}
