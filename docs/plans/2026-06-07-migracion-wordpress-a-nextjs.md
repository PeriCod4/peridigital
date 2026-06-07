# Plan de migración: camperodigital.com (WordPress/Elementor → Next.js estático)

> **Para quien ejecute (agente o humano):** los pasos usan checkbox `- [ ]`. Cada fase termina en un **checkpoint** verificable. Hay **puntos de no retorno** marcados con ⛔ — no pasar de ahí sin backup verificado y aprobación explícita.

**Objetivo:** Sustituir el front WordPress+Elementor de camperodigital.com por una web Next.js exportada estáticamente, alojada en el Hostinger actual, leyendo el contenido de WordPress (que pasa a *headless* en `cms.camperodigital.com`, misma BD MySQL, mismo servidor). PeriSEO sigue publicando igual. Sin perder SEO ni romper los subsitios ni el correo.

**Arquitectura:**
```
WordPress headless (cms.camperodigital.com)  ← PeriSEO publica aquí (mismo plugin, sólo cambia la URL)
        │ REST API /wp-json
        ▼
GitHub Actions  → next build (output: export) leyendo el REST  → carpeta /out
        │ FTP (scoped, NO borra subcarpetas)
        ▼
Hostinger public_html (camperodigital.com)  → HTML estático servido por LiteSpeed
```

**Stack:** Next.js (App Router, `output: 'export'`), TypeScript, Tailwind, MDX/HTML-render del contenido WP, GitHub Actions (CI/CD), FTP deploy, Cal.com (reservas), formulario vía endpoint PHP en el propio Hostinger.

**Restricciones duras (NO violar):**
1. **No tocar el correo.** No modificar registros MX/SPF/DKIM/DNS de correo. Sólo web. El envío real desde camperodigital.com debe seguir funcionando.
2. **No tocar los subsitios.** En `public_html` conviven `crm/`, `informes/`, `joseluis/`, `silencespa/`, `tiendafiltro/` (y subdominios en `domains/acerosocial.com`, `domains/ceramicagranada.com`). El deploy estático es **aditivo**: nunca borra esas carpetas.
3. **Paridad de URLs.** Los slugs públicos de artículos y páginas se mantienen idénticos. Donde cambien → redirect 301.
4. **Reversibilidad.** Hasta el cutover (Fase 7) producción sigue siendo el WP actual. Backup verificado antes de cualquier cambio en el servidor.

**Datos del entorno (verificados 2026-06-07):**
- Hostinger, LiteSpeed, PHP 8.3, sin Node persistente → estático obligatorio.
- WP root: `domains/camperodigital.com/public_html/`. Tema activo `hello-elementor-child`.
- Contenido: 64 posts, 12 páginas, 58 categorías. REST API pública operativa.
- PeriSEO: backend `api.periseo.es`, plugin v0.5.0, publica vía `{websiteUrl}/wp-json/periseo/v1/...`. Destino en tabla `websites` (campo URL) de su Supabase.
- FTP: host `camperodigital.com`, usuario `u450760982`, puerto 21 (FTP plano — ver Fase 0 sobre seguridad).

---

## Fase 0 — Red de seguridad y preparación (CERO cambios en producción)

**Files:**
- Create: `C:\Users\pablo\Documents\camperodigital-web\` (repo nuevo)
- Create: `backups/2026-06-07/` (fuera del repo o en `.gitignore`)

- [ ] **Paso 0.1 — Seguridad de credenciales FTP**
  - Las credenciales FTP se han compartido en texto plano en chat. Acción: tras la migración, **cambiar la contraseña FTP** en hPanel.
  - Crear `.env.deploy` local (añadido a `.gitignore`) con `FTP_HOST`, `FTP_USER`, `FTP_PASS`, `FTP_PORT`. Nunca commitear credenciales.
  - Si Hostinger ofrece **SFTP** (puerto 22) o FTPS, usar eso en vez de FTP plano (puerto 21). Verificar en hPanel → Avanzado → Acceso SSH/FTP.

- [ ] **Paso 0.2 — Backup completo del sitio (archivos)**
  - Descargar espejo de la web actual por FTP (sólo WP root, sin subsitios pesados si no hace falta):
  ```bash
  # Requiere lftp. En Windows: usar WinSCP "Sincronizar" o:
  lftp -u u450760982,'<PASS>' camperodigital.com -e \
    "mirror --verbose --parallel=4 /domains/camperodigital.com/public_html ./backups/2026-06-07/public_html; bye"
  ```
  - Verificar: el backup contiene `wp-config.php`, `wp-content/`, `.htaccess`.

- [ ] **Paso 0.3 — Backup de la base de datos**
  - Desde hPanel → Bases de datos → phpMyAdmin → Exportar (SQL completo) la BD de WordPress. Guardar en `backups/2026-06-07/db.sql`.
  - Alternativa por SSH si está disponible: `wp db export backups/2026-06-07/db.sql --path=domains/camperodigital.com/public_html`.
  - Verificar: el `.sql` pesa > 0 y contiene `CREATE TABLE wp_posts`.

- [ ] **Paso 0.4 — Snapshot del contenido vía REST (fuente para el build y comprobación de paridad)**
  ```bash
  mkdir -p backups/2026-06-07/rest
  curl -s 'https://camperodigital.com/wp-json/wp/v2/posts?per_page=100&_embed=wp:featuredmedia,wp:term' -o backups/2026-06-07/rest/posts.json
  curl -s 'https://camperodigital.com/wp-json/wp/v2/pages?per_page=100&_embed' -o backups/2026-06-07/rest/pages.json
  curl -s 'https://camperodigital.com/wp-json/wp/v2/categories?per_page=100' -o backups/2026-06-07/rest/categories.json
  curl -s 'https://camperodigital.com/wp-json/wp/v2/tags?per_page=100' -o backups/2026-06-07/rest/tags.json
  ```
  - Verificar: `posts.json` contiene 64 entradas (`grep -o '"id":' | wc -l` ≈ 64).

- [ ] **Paso 0.5 — Inventario de URLs actuales (para paridad SEO)**
  - Descargar el sitemap actual de Yoast: `curl -s https://camperodigital.com/sitemap_index.xml -o backups/2026-06-07/sitemap_index.xml` y los sub-sitemaps que liste.
  - Construir lista maestra de URLs públicas → `docs/url-inventory.md`. Esta lista es el contrato de paridad para la Fase 6.

- [ ] **Paso 0.6 — Inicializar repo nuevo**
  ```bash
  cd C:\Users\pablo\Documents\camperodigital-web
  git init
  printf "node_modules/\n.next/\nout/\n.env*\nbackups/\n" > .gitignore
  git add . && git commit -m "chore: init camperodigital-web repo + plan"
  ```

**✅ Checkpoint Fase 0:** Existe backup verificado de archivos + BD + snapshot REST. Repo creado. Producción intacta.

---

## Fase 1 — Prototipo Next.js leyendo contenido real (LOCAL, sin producción)

> Objetivo: demostrar que los 64 artículos + páginas se renderizan en Next.js antes de invertir en diseño. Lee del REST **actual** (raíz) en esta fase; en Fase 4 se repunta a `cms.`.

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`
- Create: `lib/wp.ts` (cliente de contenido), `lib/types.ts`
- Create: `app/blog/page.tsx` (índice en `/blog/`), `app/[slug]/page.tsx` (artículo en raíz `/<slug>/`)

> ⚠️ **URL de artículos = raíz `/<slug>/`** (verificado: hoy son `camperodigital.com/<slug>/`, no `/blog/<slug>/`). Mantenerlo idéntico evita 64 redirects y preserva el SEO. El índice del blog vive en `/blog/`. Las rutas explícitas de páginas (`app/nosotros`, etc.) tienen prioridad sobre la dinámica `app/[slug]`; los subsitios (`crm/`…) los resuelve `.htaccess` por fichero/carpeta existente antes del routing estático.

- [ ] **Paso 1.1 — Leer la guía de Next.js del proyecto antes de escribir**
  - ⚠️ El AGENTS.md de PeriLead avisa de un Next.js no estándar. **Este repo es nuevo e independiente**: usar el Next.js estable actual. Aun así, leer la doc local si se scaffold con `create-next-app` y consultar `node_modules/next/dist/docs/` ante dudas de API.

- [ ] **Paso 1.2 — Scaffold**
  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*"
  ```

- [ ] **Paso 1.3 — Configurar export estático**

  `next.config.mjs`:
  ```js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    output: 'export',
    images: { unoptimized: true }, // export estático no soporta el optimizador de Next
    trailingSlash: true,           // genera /blog/slug/index.html → compatible con LiteSpeed sin reglas extra
  };
  export default nextConfig;
  ```

- [ ] **Paso 1.4 — Variable de entorno del origen de contenido**

  `.env.local`:
  ```
  WP_API=https://camperodigital.com/wp-json/wp/v2
  ```
  (En Fase 4 pasará a `https://cms.camperodigital.com/wp-json/wp/v2`.)

- [ ] **Paso 1.5 — Cliente de contenido `lib/wp.ts`**
  ```ts
  const API = process.env.WP_API!;

  export interface WPPost {
    id: number; slug: string; date: string; modified: string;
    title: string; excerpt: string; contentHtml: string;
    coverUrl?: string; coverAlt?: string;
    categories: { id: number; name: string; slug: string }[];
    tags: { id: number; name: string; slug: string }[];
    yoast?: Record<string, unknown>;
  }

  async function getJSON<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`WP fetch ${res.status} ${url}`);
    return res.json() as Promise<T>;
  }

  function mapPost(p: any): WPPost {
    const media = p._embedded?.['wp:featuredmedia']?.[0];
    const terms: any[][] = p._embedded?.['wp:term'] ?? [];
    const cats = (terms[0] ?? []).map((t) => ({ id: t.id, name: t.name, slug: t.slug }));
    const tags = (terms[1] ?? []).map((t) => ({ id: t.id, name: t.name, slug: t.slug }));
    return {
      id: p.id, slug: p.slug, date: p.date, modified: p.modified,
      title: p.title?.rendered ?? '', excerpt: p.excerpt?.rendered ?? '',
      contentHtml: p.content?.rendered ?? '',
      coverUrl: media?.source_url, coverAlt: media?.alt_text,
      categories: cats, tags,
      yoast: p.yoast_head_json,
    };
  }

  export async function getAllPosts(): Promise<WPPost[]> {
    const data = await getJSON<any[]>(`${API}/posts?per_page=100&_embed=wp:featuredmedia,wp:term&_fields=id,slug,date,modified,title,excerpt,content,categories,tags,yoast_head_json,_links,_embedded`);
    return data.map(mapPost);
  }

  export async function getPostSlugs(): Promise<string[]> {
    const data = await getJSON<any[]>(`${API}/posts?per_page=100&_fields=slug`);
    return data.map((p) => p.slug);
  }

  export async function getPost(slug: string): Promise<WPPost | null> {
    const data = await getJSON<any[]>(`${API}/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia,wp:term`);
    return data[0] ? mapPost(data[0]) : null;
  }

  export async function getPage(slug: string): Promise<WPPost | null> {
    const data = await getJSON<any[]>(`${API}/pages?slug=${encodeURIComponent(slug)}&_embed`);
    return data[0] ? mapPost(data[0]) : null;
  }
  ```

- [ ] **Paso 1.6 — Índice del blog `app/blog/page.tsx`**
  ```tsx
  import Link from 'next/link';
  import { getAllPosts } from '@/lib/wp';

  export default async function BlogIndex() {
    const posts = await getAllPosts();
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.id}>
              <Link href={`/${p.slug}/`} className="text-xl font-semibold hover:underline"
                    dangerouslySetInnerHTML={{ __html: p.title }} />
              <div className="text-sm text-gray-500">{new Date(p.date).toLocaleDateString('es-ES')}</div>
            </li>
          ))}
        </ul>
      </main>
    );
  }
  ```

- [ ] **Paso 1.7 — Página de artículo `app/[slug]/page.tsx`** (raíz, para preservar URLs)
  ```tsx
  import { getPostSlugs, getPost } from '@/lib/wp';
  import { notFound } from 'next/navigation';

  export async function generateStaticParams() {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({ slug }));
  }

  export const dynamicParams = false;

  export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();
    return (
      <article className="mx-auto max-w-3xl px-4 py-12 prose">
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        {post.coverUrl && <img src={post.coverUrl} alt={post.coverAlt ?? ''} />}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    );
  }
  ```
  > Nota: `params` es Promise en el App Router actual. Verificar la firma exacta en la doc instalada antes de cerrar la fase.

- [ ] **Paso 1.8 — Build local y verificación**
  ```bash
  npm run build
  ```
  - Esperado: build OK, `out/blog/index.html` (índice) y 64 carpetas `out/<slug>/index.html` (artículos en raíz) generadas.
  - Servir y revisar: `npx serve out` → abrir `/blog/`, abrir 3 artículos al azar (`/<slug>/`) y comparar con producción.

- [ ] **Paso 1.9 — Commit**
  ```bash
  git add -A && git commit -m "feat: prototipo Next estático leyendo 64 posts del REST WP"
  ```

**✅ Checkpoint Fase 1:** Build estático genera los 64 artículos + índice desde el contenido real. Validado visualmente en local. **Aquí decides si el enfoque convence antes de invertir en diseño.**

---

## Fase 2 — Diseño y maquetación de páginas

> El contenido del blog ya fluye. Ahora la cara de la web. Las páginas Elementor (home, servicios…) NO se migran tal cual (su HTML está acoplado a Elementor); se **rediseñan** en componentes Next limpios, reutilizando textos/imágenes.

**Files:**
- Create: `components/` (Header, Footer, Hero, CTA, ServiceCard, PostCard, Container…)
- Create: `app/page.tsx` (inicio), `app/soluciones-digitales/page.tsx`, `app/diseno-web/page.tsx`, `app/proyectos-web/page.tsx`, `app/nosotros/page.tsx`, `app/hablemos/page.tsx`
- Create: `app/(legal)/politica-de-cookies/page.tsx`, `.../politica-de-privacidad/page.tsx`, `.../aviso-legal/page.tsx`
- Create: `app/globals.css`, design tokens en `tailwind.config.ts`

- [ ] **Paso 2.1 — Extraer assets e identidad visual del WP actual**
  - Bajar logo e imágenes clave: `wp-content/uploads/` (las usadas en home/servicios). Capturar paleta y tipografías actuales (revisar el CSS del tema hijo y Elementor global) para decidir si se conservan o se renuevan.
  - Decisión de diseño: ¿refresco respetando identidad o rediseño nuevo? (definir aquí; afecta tokens).

- [ ] **Paso 2.2 — Sistema base: layout, header, footer, tokens**
  - `app/layout.tsx` con `<Header/>` y `<Footer/>`, fuentes vía `next/font`, navegación a las páginas reales.

- [ ] **Paso 2.3 — Páginas legales (contenido directo del REST)**
  - Renderizar `politica-de-cookies`, `politica-de-privacidad`, `aviso-legal` con `getPage(slug)` (texto plano, sin diseño complejo). Verifica que el texto legal queda íntegro.

- [ ] **Paso 2.4 — Páginas de marketing (rediseño)**
  - `inicio` (home), `soluciones-digitales`, `diseno-web`, `proyectos-web`, `nosotros`. Maquetar con componentes. Reutilizar textos del REST (`getPage`) como punto de partida.

- [ ] **Paso 2.5 — `hablemos` (contacto)** — sólo maqueta aquí; la lógica del formulario en Fase 5.

- [ ] **Paso 2.6 — Estilado del contenido del blog**
  - Aplicar `@tailwindcss/typography` (`prose`) al HTML del artículo. Verificar imágenes, encabezados, listas, tablas.

- [ ] **Paso 2.7 — Responsive + build + revisión**
  ```bash
  npm run build && npx serve out
  ```
  - Revisar móvil/desktop en todas las páginas. Opcional: usar `/design-review` (gstack) para QA visual.

- [ ] **Paso 2.8 — Commit** `git commit -m "feat: diseño y páginas (home, servicios, nosotros, contacto, legales)"`

**✅ Checkpoint Fase 2:** Web completa y navegable en local (estática), diseño aprobado. Aún sin tocar producción.

---

## Fase 3 — WordPress headless en `cms.camperodigital.com` ⛔ (primer cambio en servidor)

> ⛔ **Punto delicado.** A partir de aquí se modifica el servidor. Backup de Fase 0 obligatorio y verificado. Hacerlo en ventana de bajo tráfico.

**Estrategia:** crear el subdominio `cms.camperodigital.com` apuntando a una **copia** del WP actual (o moviendo el install), y dejar el WP de la raíz intacto hasta el cutover (Fase 7). Así producción no se entera todavía.

- [ ] **Paso 3.1 — Crear subdominio en hPanel**
  - hPanel → Dominios → Subdominios → crear `cms.camperodigital.com` con document root, p.ej. `domains/camperodigital.com/public_html/cms-wp` o la carpeta que Hostinger asigne (`domains/cms.camperodigital.com/public_html`).
  - ⚠️ Esto crea sólo un registro DNS de subdominio (A/CNAME al mismo servidor). **No toca MX ni el correo.**

- [ ] **Paso 3.2 — Copiar WordPress al document root del subdominio**
  - Copiar **sólo el WP core**, no los subsitios (`crm/informes/joseluis/silencespa/tiendafiltro` se quedan en la raíz):
  ```bash
  # Por SSH si está disponible (mucho más rápido que FTP):
  cp -a domains/camperodigital.com/public_html/{wp-admin,wp-content,wp-includes,wp-*.php,index.php,.htaccess} \
        domains/cms.camperodigital.com/public_html/
  ```
  - Crear/ajustar `wp-config.php` en la copia (misma BD MySQL — comparten datos; ver 3.4 sobre siteurl).

- [ ] **Paso 3.3 — Decisión: ¿BD compartida o duplicada?**
  - **Recomendado:** la copia `cms` usa **la misma BD** que la raíz hasta el cutover. Pero `siteurl/home` sólo puede apuntar a un sitio a la vez. Para evitar conflicto, fijar `siteurl`/`home` por código en el `wp-config.php` de la copia:
  ```php
  define('WP_HOME','https://cms.camperodigital.com');
  define('WP_SITEURL','https://cms.camperodigital.com');
  ```
  Esto sobrescribe en runtime sin tocar la BD → el WP raíz sigue sirviéndose como `camperodigital.com` y la copia responde como `cms.` Ambos leen la misma BD. (Validar que ningún plugin rompa por esto; LiteSpeed/cache desactivar en la copia.)

- [ ] **Paso 3.4 — Verificar WP headless**
  ```bash
  curl -sI https://cms.camperodigital.com/wp-json/ | grep HTTP            # 200
  curl -s  'https://cms.camperodigital.com/wp-json/wp/v2/posts?per_page=1&_fields=slug'  # devuelve 1 post
  ```
  - Acceder a `https://cms.camperodigital.com/wp-admin` (login oculto por `wps-hide-login` — usar la ruta real de login). Confirmar que se puede editar.

- [ ] **Paso 3.5 — Endurecer el headless**
  - En la copia `cms`: activar `maintenance`/`noindex` del FRONT de WP (no queremos que `cms.` indexe ni compita). En Yoast: marcar el sitio como noindex o bloquear con `X-Robots-Tag: noindex` en `.htaccess` del subdominio. El REST sigue accesible.
  - Robots del subdominio: `cms.camperodigital.com/robots.txt` → `Disallow: /`.

**✅ Checkpoint Fase 3:** `cms.camperodigital.com` sirve WP admin + REST, misma BD, noindex. Producción (`camperodigital.com`) sigue siendo el WP original intacto.

---

## Fase 4 — Pipeline de build + deploy (GitHub Actions → FTP) y staging

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `scripts/deploy-ftp.mjs` (o uso de acción FTP)
- Modify: `.env.local` / secrets → origen `cms`

- [ ] **Paso 4.1 — Repuntar el origen de contenido a `cms`**
  - `.env.local` y secret CI: `WP_API=https://cms.camperodigital.com/wp-json/wp/v2`. Rebuild local y verificar paridad de los 64 posts contra el snapshot de Fase 0.

- [ ] **Paso 4.2 — Subir el repo a GitHub** (privado) y configurar secrets
  - Secrets: `FTP_HOST`, `FTP_USER`, `FTP_PASS`, `WP_API`. (Si hay SFTP, usar acción SFTP.)

- [ ] **Paso 4.3 — Deploy a STAGING primero (`nuevo.camperodigital.com`)**
  - Crear subdominio `nuevo.camperodigital.com` (document root propio) para revisar la web nueva EN VIVO antes de tocar la raíz.

- [ ] **Paso 4.4 — Workflow `.github/workflows/deploy.yml`**
  ```yaml
  name: build-and-deploy
  on:
    push: { branches: [main] }
    workflow_dispatch:
    repository_dispatch: { types: [content-published] }  # disparado por PeriSEO
  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with: { node-version: 20, cache: npm }
        - run: npm ci
        - run: npm run build
          env:
            WP_API: ${{ secrets.WP_API }}
        - name: Deploy estático por FTP (aditivo, sin borrar subsitios)
          uses: SamKirkland/FTP-Deploy-Action@v4.3.5
          with:
            server: ${{ secrets.FTP_HOST }}
            username: ${{ secrets.FTP_USER }}
            password: ${{ secrets.FTP_PASS }}
            protocol: ftp           # cambiar a ftps si Hostinger lo soporta
            local-dir: ./out/
            server-dir: /domains/camperodigital.com/public_html/_staging_nuevo/   # STAGING; en Fase 7 → raíz
            dangerous-clean-slate: false        # NUNCA true: borraría subsitios
            exclude: |
              **/.git*
              **/crm/**
              **/informes/**
              **/joseluis/**
              **/silencespa/**
              **/tiendafiltro/**
  ```
  > ⚠️ `dangerous-clean-slate: false` es **obligatorio**. El deploy sólo añade/actualiza ficheros del export; jamás borra el árbol remoto. Los `exclude` son cinturón y tirantes.

- [ ] **Paso 4.5 — Probar staging end-to-end**
  - `git push` → Action corre → archivos en `nuevo.camperodigital.com`. Revisar la web completa en vivo. Probar Lighthouse (velocidad).

- [ ] **Paso 4.6 — Commit/PR** del workflow.

**✅ Checkpoint Fase 4:** Push a `main` reconstruye y publica automáticamente la web nueva en `nuevo.camperodigital.com`, leyendo de `cms`. Sin tocar la raíz.

---

## Fase 5 — Integraciones dinámicas (formulario + reservas + cookies)

> Estático = sin servidor Node, pero Hostinger **sí tiene PHP**. El formulario usa un mini-endpoint PHP en el propio servidor. Reservas vía Cal.com (externo).

**Files:**
- Create: `public/contacto.php` (handler de formulario, se sube tal cual al estático)
- Create: `components/ContactForm.tsx`, `components/CalEmbed.tsx`, `components/CookieConsent.tsx`

- [ ] **Paso 5.1 — Endpoint PHP de contacto** `public/contacto.php`
  ```php
  <?php
  header('Content-Type: application/json');
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit(json_encode(['ok'=>false])); }
  $name=trim($_POST['name']??''); $email=trim($_POST['email']??''); $msg=trim($_POST['message']??'');
  $hp=trim($_POST['website']??''); // honeypot anti-spam
  if ($hp!=='' || !$name || !filter_var($email,FILTER_VALIDATE_EMAIL) || !$msg) { http_response_code(400); exit(json_encode(['ok'=>false])); }
  $to='TU_CORREO@camperodigital.com';
  $subject='Contacto web: '.substr($name,0,80);
  $body="Nombre: $name\nEmail: $email\n\n$msg";
  $headers='From: web@camperodigital.com'."\r\n".'Reply-To: '.$email;
  $sent=mail($to,$subject,$body,$headers);
  echo json_encode(['ok'=>(bool)$sent]);
  ```
  > Los ficheros de `public/` se copian a `out/` en el build → llegan a la raíz por FTP. PHP se ejecuta en LiteSpeed sin Node.

- [ ] **Paso 5.2 — `ContactForm.tsx`** hace `fetch('/contacto.php', {method:'POST', body: FormData})`. Incluir honeypot `website` oculto.

- [ ] **Paso 5.3 — Reservas Cal.com** — `CalEmbed.tsx` con el embed de Cal.com en la página correspondiente.

- [ ] **Paso 5.4 — Cookies/consent + analítica** — reimplementar el banner (sustituye a `cookie-notice`). Cargar GA/Tag Manager sólo tras consentimiento.

- [ ] **Paso 5.5 — Verificar en staging**: enviar el formulario de prueba y confirmar recepción del correo. Probar reserva Cal.com.

- [ ] **Paso 5.6 — Commit** `git commit -m "feat: formulario PHP, reservas Cal.com, consentimiento cookies"`

**✅ Checkpoint Fase 5:** Formulario entrega correo real, reservas operativas, cookies conforme — todo verificado en staging.

---

## Fase 6 — Paridad SEO (CRÍTICO: no perder posicionamiento)

> Cualquier descuido aquí = caída de tráfico. Comparar contra `docs/url-inventory.md` de Fase 0.

**Files:**
- Create: `lib/seo.ts` (mapea Yoast → metadata Next), `app/sitemap.ts`, `app/robots.ts`, `lib/jsonld.ts`
- Create: `docs/redirects.md` + reglas en `.htaccess`

- [ ] **Paso 6.1 — Metadatos por página/artículo desde Yoast**
  - En cada page/artículo, exportar `generateMetadata` usando `post.yoast` (title, description, og, canonical). El canonical apunta a `https://camperodigital.com/...` (no a `cms`).

- [ ] **Paso 6.2 — `app/sitemap.ts`** generando todas las URLs (posts, páginas, categorías) con `lastmod = modified`.

- [ ] **Paso 6.3 — `app/robots.ts`** permitiendo el sitio y referenciando el sitemap. (Recordar: `cms.` queda en `Disallow`.)

- [ ] **Paso 6.4 — JSON-LD / Schema** — PeriSEO ya genera schema (`schemaBuilders`); replicar Article/Organization/BreadcrumbList en el front.

- [ ] **Paso 6.5 — Mapa de URLs 1:1 y redirects**
  - ✅ **Verificado:** los artículos ya están en raíz `/<slug>/` y el índice en `/blog/`. El plan mantiene esa estructura → **cero redirects masivos** para los 64 posts. Gran ventaja para el SEO.
  - Sólo crear 301 para casos puntuales que sí cambien (p.ej. `inicio` page slug vs `/`, o `rasca` que se descarta). Comprobar páginas legales y de servicios contra el inventario.
  - Documentar cada redirect puntual en `docs/redirects.md`. Plantilla `.htaccess`:
  ```apache
  RewriteEngine On
  # Redirect 301 sólo para URLs que cambien (ejemplo):
  # RewriteRule ^rasca/?$ / [R=301,L]
  ```

- [ ] **Paso 6.6 — Verificación**
  - En staging: revisar `view-source` de 5 artículos → title/description/canonical/og correctos. Validar sitemap. Pasar por validador de Schema.

- [ ] **Paso 6.7 — Commit** `git commit -m "feat: paridad SEO (metadata Yoast, sitemap, robots, schema, redirects)"`

**✅ Checkpoint Fase 6:** Metadatos, sitemap, schema y redirects validados en staging contra el inventario. Listo para cutover.

---

## Fase 7 — Cutover a producción ⛔⛔ (PUNTO DE NO RETORNO)

> ⛔⛔ Sustituir el front de la raíz. Reversible vía backup de Fase 0. Hacer en ventana de bajo tráfico y con todo lo anterior verificado.

- [ ] **Paso 7.1 — Confirmar prerequisitos**
  - Backup Fase 0 verificado ✔. Staging aprobado ✔. Redirects listos ✔. PeriSEO aún apuntando al WP que toque (ver 7.5).

- [ ] **Paso 7.2 — Retirar el front WP de la raíz SIN borrar subsitios**
  - Mover (no borrar) el WP core de la raíz a una carpeta de respaldo en el server, preservando subcarpetas:
  ```bash
  mkdir -p domains/camperodigital.com/_wp_old
  # mover SÓLO ficheros/carpetas de WP core, dejar crm/ informes/ joseluis/ silencespa/ tiendafiltro/ intactos
  mv public_html/wp-admin public_html/wp-includes public_html/wp-*.php public_html/index.php public_html/wp-content domains/camperodigital.com/_wp_old/
  ```
  - ⚠️ Revisar la lista exacta antes de mover. NO mover `crm/ informes/ joseluis/ silencespa/ tiendafiltro/ .well-known/`.

- [ ] **Paso 7.3 — Apuntar el deploy a la raíz y publicar**
  - En `deploy.yml`: `server-dir: /domains/camperodigital.com/public_html/`. Ejecutar `workflow_dispatch`.
  - Verificar que `out/` aterriza en la raíz (index.html, _next/, blog/, etc.) y los subsitios siguen ahí.

- [ ] **Paso 7.4 — `.htaccess` de la raíz (estático + subsitios + redirects)**
  ```apache
  # Servir estático; respetar subcarpetas reales (crm, informes, etc.) y .php
  RewriteEngine On
  # No reescribir si el fichero/carpeta existe (subsitios, contacto.php, _next, assets)
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  # (incluir aquí los redirects 301 de Fase 6)
  # Fallback 404 estático
  ErrorDocument 404 /404.html
  ```

- [ ] **Paso 7.5 — Repuntar PeriSEO al WP headless**
  - En PeriSEO (Supabase, tabla `websites`): cambiar la URL del sitio camperodigital a `https://cms.camperodigital.com`. El plugin sigue instalado en la copia `cms`. Probar una publicación de prueba desde PeriSEO → debe crear el post en `cms` y, tras el rebuild, aparecer en la web estática.

- [ ] **Paso 7.6 — Canary post-deploy**
  - `curl -sI https://camperodigital.com/` → 200, sirviendo HTML estático (no PHP/WP).
  - Abrir home, 3 artículos, contacto (enviar prueba), una página legal, y 2 subsitios (`/crm`, `/informes`) → todos OK.
  - Comprobar que el correo del formulario llega. Comprobar que el envío de correo del dominio sigue intacto (enviar/recibir prueba).
  - Opcional: skill `/canary` (gstack) para monitor post-deploy.

**✅ Checkpoint Fase 7:** camperodigital.com sirve la web Next estática; subsitios y correo intactos; PeriSEO publica en `cms` y se refleja tras rebuild.

---

## Fase 8 — Automatizar publicación PeriSEO → rebuild, y limpieza

- [ ] **Paso 8.1 — Disparo de rebuild al publicar**
  - PeriSEO, al publicar/actualizar un post, debe llamar a GitHub `repository_dispatch` (`event_type: content-published`) con un PAT, para regenerar el estático automáticamente.
  - Implementación: en el backend PeriSEO, tras publicación exitosa al WP `cms`, hacer POST a `https://api.github.com/repos/<owner>/camperodigital-web/dispatches`. (Reutiliza el patrón `webhookPublisher`/notificación ya existente.)
  - Verificar: publicar desde PeriSEO → Action corre sola → artículo en vivo en ~1-2 min.

- [ ] **Paso 8.2 — Cambiar contraseña FTP** (Paso 0.1) y rotar cualquier credencial expuesta.

- [ ] **Paso 8.3 — Retirar staging** (`nuevo.camperodigital.com`) o dejarlo como entorno de pruebas con noindex.

- [ ] **Paso 8.4 — Periodo de observación SEO (2-4 semanas)**
  - Google Search Console: vigilar cobertura, 404s, impresiones. Corregir redirects que falten. Conservar `_wp_old` hasta confirmar estabilidad; luego borrar.

- [ ] **Paso 8.5 — Documentar** el runbook final (cómo publicar, cómo forzar rebuild, cómo revertir) en `docs/runbook.md`.

**✅ Checkpoint Fase 8:** Flujo completo automatizado y documentado. WP viejo de la raíz archivado. SEO estable.

---

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Borrar subsitios en el deploy FTP | `dangerous-clean-slate: false` + `exclude` + deploy a staging primero |
| Romper el correo | No tocar MX/DNS de correo; subdominios sólo añaden A/CNAME; canary de correo en 7.6 |
| Pérdida de SEO por cambio de URLs | Inventario Fase 0 + slugs idénticos + 301 documentados + GSC en Fase 8 |
| Mover WP a `cms` rompe la BD por URLs hardcodeadas | `WP_HOME/WP_SITEURL` por código (no tocar BD); misma BD compartida hasta cutover |
| PeriSEO deja de publicar | Plugin sigue en `cms`; sólo cambia `websiteUrl`; prueba de publicación en 7.5 |
| Credenciales FTP expuestas en chat | Rotación obligatoria Paso 8.2; mover a SFTP/FTPS si disponible |
| Build falla y tumba la web | El deploy es aditivo; si el build CI falla, no se sube nada; la web previa sigue |

## Puntos de decisión abiertos (resolver antes/levemente durante)
1. **Identidad visual** (Fase 2.1): ¿refresco o rediseño? 
2. **Estructura de URL de artículos** (Fase 6.5): confirmar si hoy es `/<slug>/` o `/blog/<slug>/` → define redirects.
3. **SFTP vs FTP** (Fase 0.1): confirmar en hPanel.
4. **BD compartida vs duplicada** para `cms` (Fase 3.3): recomendado compartida hasta cutover.
