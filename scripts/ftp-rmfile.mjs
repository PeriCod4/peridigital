// Borra un ARCHIVO remoto por FTP.
// Uso: node scripts/ftp-rmfile.mjs "<remoteFile>"
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

const target = process.argv[2];
if (!target) {
  console.error('Uso: node scripts/ftp-rmfile.mjs "<remoteFile>"');
  process.exit(1);
}
const env = loadEnv(".env.deploy");
const client = new ftp.Client(30000);
try {
  await client.access({
    host: env.FTP_HOST,
    user: env.FTP_USER,
    password: env.FTP_PASS,
    port: Number(env.FTP_PORT || 21),
    secure: false,
  });
  console.log("Conectado. Borrando archivo", target, "…");
  await client.remove(target);
  console.log("Borrado OK.");
} catch (e) {
  console.error("ERROR:", e.message);
  process.exitCode = 1;
} finally {
  client.close();
}
