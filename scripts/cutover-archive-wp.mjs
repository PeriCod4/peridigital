// Archiva el WordPress principal en public_html/_old_wp/ moviendo (rename) SOLO
// los elementos del WP. Jamás toca los subsitios.
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

const BASE = "/domains/camperodigital.com/public_html";
const DEST = `${BASE}/_old_wp`;

// Lista EXPLÍCITA de elementos del WP a archivar.
const WP_ITEMS = [
  "wp-admin", "wp-content", "wp-includes",
  "index.php", "xmlrpc.php", "license.txt", "readme.html",
  ".htaccess.bk",
  "wp-activate.php", "wp-blog-header.php", "wp-comments-post.php",
  "wp-config.php", "wp-config-sample.php", "wp-cron.php",
  "wp-links-opml.php", "wp-load.php", "wp-login.php", "wp-mail.php",
  "wp-settings.php", "wp-signup.php", "wp-trackback.php",
];
// NUNCA mover (subsitios / webs conectadas):
const NEVER = new Set(["crm", "informes", "joseluis", "silencespa", "tiendafiltro"]);

const env = loadEnv(".env.deploy");
const client = new ftp.Client(30000);
try {
  await client.access({
    host: env.FTP_HOST, user: env.FTP_USER, password: env.FTP_PASS,
    port: Number(env.FTP_PORT || 21), secure: false,
  });
  await client.ensureDir(DEST);
  await client.cd(BASE);
  let moved = 0, skipped = 0;
  for (const item of WP_ITEMS) {
    if (NEVER.has(item)) { console.log("PROTEGIDO, no se mueve:", item); continue; }
    try {
      await client.rename(`${BASE}/${item}`, `${DEST}/${item}`);
      console.log("archivado:", item);
      moved++;
    } catch (e) {
      console.log("  (omitido)", item, "-", e.message);
      skipped++;
    }
  }
  console.log(`\nArchivados: ${moved} | omitidos: ${skipped}`);
} catch (e) {
  console.error("ERROR:", e.message);
  process.exitCode = 1;
} finally {
  client.close();
}
