// Descarga ficheros remotos concretos por FTP a una carpeta local de referencia.
// Uso: node scripts/ftp-fetch.mjs
import { readFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import * as ftp from "basic-ftp";

function loadEnv(path) {
  const env = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1);
  }
  return env;
}

const PERI = "/domains/peridigital.es/public_html";
const CAMP = "/domains/camperodigital.com/public_html";
const LOCAL = "_ref-live"; // carpeta local de referencia

// [remotePath, localPath]
const FILES = [
  [`${PERI}/sitemap.xml`, `${LOCAL}/peri/sitemap.xml`],
  [`${PERI}/robots.txt`, `${LOCAL}/peri/robots.txt`],
  [`${PERI}/llms.txt`, `${LOCAL}/peri/llms.txt`],
  [`${PERI}/.htaccess`, `${LOCAL}/peri/.htaccess`],
  [`${PERI}/index.html`, `${LOCAL}/peri/index.html`],
  [`${PERI}/diseno-web/index.html`, `${LOCAL}/peri/diseno-web.html`],
  [`${CAMP}/.htaccess`, `${LOCAL}/campero/.htaccess`],
];

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

  // listar categorias del peri para coger una de muestra
  try {
    const cats = await client.list(`${PERI}/categoria`);
    const sample = cats.find((e) => e.isDirectory);
    if (sample) {
      FILES.push([`${PERI}/categoria/${sample.name}/index.html`, `${LOCAL}/peri/categoria-${sample.name}.html`]);
      console.log("categoria muestra:", sample.name);
    }
  } catch (e) {
    console.log("no pude listar categoria:", e.message);
  }

  for (const [remote, local] of FILES) {
    try {
      mkdirSync(dirname(local), { recursive: true });
      await client.downloadTo(local, remote);
      console.log("OK", remote);
    } catch (e) {
      console.log("FALLO", remote, "->", e.message);
    }
  }
  console.log("Descarga referencia completada.");
} catch (e) {
  console.error("ERROR FTP:", e.message);
  process.exitCode = 1;
} finally {
  client.close();
}
