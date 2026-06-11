# Despliegue (Hostinger u450760982, FTP)

`peridigital.es` es la web (Next.js static export). `camperodigital.com` solo
redirige 301 a peri.

## peridigital.es (web)
```
npm run build
node scripts/deploy-ftp.mjs out /domains/peridigital.es/public_html
```
`public/.htaccess` (www→non-www + cache + opengraph ForceType) y `public/llms.txt`
se exportan dentro de `out/` automáticamente.

## camperodigital.com (solo 301 → peri)
Su docroot NO recibe el export. Solo necesita el `.htaccess` de redirección
**path-preserving** (excluye subapps crm/joseluis/informes/silencespa/tiendafiltro
+ .well-known + google*.html). Plantilla versionada en:
`deploy/camperodigital.com.htaccess`

Subir SOLO ese fichero al docroot de campero (no borrar las subapps):
```
node scripts/ftp-rmfile.mjs   # si hace falta gestionar ficheros sueltos
# o subir deploy/camperodigital.com.htaccess como .htaccess a
# /domains/camperodigital.com/public_html/.htaccess
```

## Notas
- SFTP (65002) caído → usar FTP/FTPS puerto 21. Sesión cae tras ~50-100 ops.
- `public/llms.txt` es un snapshot estático; regenerar a mano si cambian servicios/artículos.
- Preservar siempre: "Pablo Campero" (titular legal), `calendly.com/camperodigital/30min`,
  GA `G-V7P5GQ78LJ`, alias hash de FormSubmit, `periseo.es`.
