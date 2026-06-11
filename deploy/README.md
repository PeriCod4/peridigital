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

## Panel admin PHP (proyectos + imágenes de artículos)
El panel vive en `/admin/` del docroot de peri (Hostinger ejecuta PHP). NO forma
parte del export de Next, así que un redeploy del estático **no lo toca**.

```
node scripts/deploy-admin.mjs            # sube server/admin/, crea /uploads, siembra /data/projects.json si falta
```
Primer uso: visitar `https://peridigital.es/admin/setup.php` para crear usuario y
contraseña (se guardan en `/admin/config.local.php`, generado en el servidor, NO en el repo).
Luego entrar por `/admin/`. Por seguridad, borrar `setup.php` del servidor tras configurar.

**Cómo encaja con el estático (regla anti-clobber):**
- El sitio lee en runtime `/data/projects.json` y `/data/article-images.json` (los edita el
  admin) y, si faltan, usa los datos embebidos en el build (fallback). El override de portada
  de artículo lo aplica `components/ArticleCoverOverride.tsx` en cliente.
- `npm run build` SOLO emite `out/data/articles-index.json` (índice read-only de artículos).
  **NUNCA** debe emitir `projects.json` ni `article-images.json` (son propiedad del admin);
  por eso `deploy-ftp.mjs out …` (aditivo) no los pisa.
- `deploy-admin.mjs` siembra `projects.json` **solo si no existe** en el servidor.
- Proyectos NUEVOS creados en el admin: aparecen al instante en el grid y su detalle funciona
  por `/proyecto/?p=slug` (cliente). Para su URL bonita `/proyectos/<slug>/` + SEO, añadirlos
  también a `lib/projects-data.ts` y hacer `npm run build` + `deploy-ftp.mjs`.

## Notas
- SFTP (65002) caído → usar FTP/FTPS puerto 21. Sesión cae tras ~50-100 ops.
- `public/llms.txt` es un snapshot estático; regenerar a mano si cambian servicios/artículos.
- Preservar siempre: "Pablo Campero" (titular legal), `calendly.com/camperodigital/30min`,
  GA `G-V7P5GQ78LJ`, alias hash de FormSubmit, `periseo.es`.
