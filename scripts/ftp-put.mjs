// Sube UN fichero local a UNA ruta remota por FTP (sobrescribe).
// Uso: node scripts/ftp-put.mjs <localFile> <remotePath>
import { readFileSync } from "node:fs";
import * as ftp from "basic-ftp";

function loadEnv(p) {
  const e = {};
  for (const l of readFileSync(p, "utf8").split(/\r?\n/)) {
    const i = l.indexOf("=");
    if (i > 0) e[l.slice(0, i).trim()] = l.slice(i + 1);
  }
  return e;
}

const [local, remote] = process.argv.slice(2);
if (!local || !remote) { console.error("Uso: node scripts/ftp-put.mjs <local> <remote>"); process.exit(1); }
const env = loadEnv(".env.deploy");
const c = new ftp.Client(30000); c.ftp.verbose = false;
try {
  await c.access({ host: env.FTP_HOST, user: env.FTP_USER, password: env.FTP_PASS, port: Number(env.FTP_PORT || 21), secure: false });
  await c.uploadFrom(local, remote);
  console.log("OK subido", remote);
} catch (e) { console.error("ERROR FTP:", e.message); process.exitCode = 1; }
finally { c.close(); }
