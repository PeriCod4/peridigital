// Sube (espeja) una carpeta local a una carpeta remota por FTP.
// Uso: node scripts/deploy-ftp.mjs <localDir> <remoteDir>
// Credenciales en .env.deploy (FTP_HOST, FTP_USER, FTP_PASS, FTP_PORT).
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

const [localDir, remoteDir] = process.argv.slice(2);
if (!localDir || !remoteDir) {
  console.error("Uso: node scripts/deploy-ftp.mjs <localDir> <remoteDir>");
  process.exit(1);
}

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
  await client.ensureDir(remoteDir);
  let count = 0;
  client.trackProgress((info) => {
    if (info.type === "upload" && info.name) {
      count++;
      if (count % 50 === 0) console.log(`  subidos ~${count} archivos…`);
    }
  });
  console.log(`Subiendo ${localDir} -> ${remoteDir} …`);
  await client.uploadFromDir(localDir, remoteDir);
  console.log("OK. Despliegue completado.");
} catch (e) {
  console.error("ERROR FTP:", e.message);
  process.exitCode = 1;
} finally {
  client.close();
}
