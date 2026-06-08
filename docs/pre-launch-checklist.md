# Checklist de pre-lanzamiento — camperodigital.com (Next.js)

Estado para dejar la web **perfecta** antes de publicarla. Marcado: ✅ hecho · 🟡 en curso/este sprint · ⬜ pendiente · 👤 necesita decisión/dato tuyo.

## 1. Contenido
- ✅ Home con copia real de marca + 6 servicios + proyectos + demo
- ✅ 6 páginas de servicio (intro, cifras, beneficios, casos de uso, FAQ, demo)
- ✅ Proyectos reales (9) + Nosotros + Hablemos con copia real
- ✅ 48 artículos (duplicados consolidados) + 22 categorías
- ✅ 4 guías cornerstone (/guias/)
- ⬜ Revisión ortográfica/estilo final de todos los textos
- 👤 Definir precios/planes (mantenimiento, packs) si se quieren mostrar
- 👤 Enlaces reales "Visitar web" en proyectos (hoy solo logo+descripción)

## 2. Diseño / UX
- ✅ Identidad de marca (Montserrat, teal, logo), efectos y demos interactivos
- ✅ Responsive (header con menú móvil, grids adaptativos)
- 🟡 QA visual fino en móvil/tablet/desktop (revisar cada página)
- ⬜ Estados de foco visibles (accesibilidad propia) y navegación por teclado
- ⬜ Revisar contraste de textos sobre fondos (nuestra propia web accesible)

## 3. Funcionalidad
- 🟡 Formulario de contacto funcional (endpoint `public/contacto.php`) + página `/gracias/`
- 👤 Email destino del formulario (¿pablo@camperodigital.com?)
- ⬜ Reservas Cal.com (integrar widget) 👤 enlace/usuario de Cal.com
- 🟡 Banner de cookies (RGPD) + bloqueo de analítica hasta consentimiento
- ⬜ Analítica 👤 ID de GA4 / Google Tag Manager

## 4. SEO técnico
- ✅ Metadatos (title/description/canonical) en todas las páginas
- ✅ Schema: Organization, WebSite, Service, Article, Breadcrumb, FAQ
- ✅ sitemap.xml + robots.txt
- ✅ Mapa de keywords + enlazado interno servicio↔guía
- 🟡 Favicon de marca + iconos (hoy favicon por defecto de Next)
- 🟡 Imagen social por defecto (Open Graph / Twitter) + por página
- ⬜ Verificar que ninguna URL importante cambia vs WP (paridad) → redirects listos
- ⬜ Alt text en todas las imágenes (revisar)

## 5. Legal (España)
- ✅ Aviso legal, privacidad, cookies (recuperadas de WP)
- 🟡 Banner de consentimiento de cookies real
- 👤 Confirmar que los textos legales están actualizados (razón social, datos)

## 6. Rendimiento
- ✅ Export estático (rápido por naturaleza) + imágenes lazy
- ⬜ Lighthouse en staging (Core Web Vitals) y ajustes
- ⬜ Localizar imágenes de artículos (hoy se sirven desde camperodigital.com; al pasar WP a cms. hay que repuntar o descargar)

## 7. Infraestructura / Lanzamiento (plan maestro Fases 3-4-7)
- ⬜ WP headless en `cms.camperodigital.com` (misma BD)
- ⬜ Pipeline GitHub Actions → build → FTP a Hostinger
- ⬜ Deploy a **staging** (`nuevo.camperodigital.com`) y QA en vivo
- ⬜ Repuntar PeriSEO a `cms.`
- ⬜ Cutover: estático a la raíz, preservando subsitios y correo
- ⬜ Canary post-deploy (web + formulario + correo) + Google Search Console

## Decisiones/datos que necesito de ti (👤)
1. Email destino del formulario de contacto.
2. Enlace/usuario de Cal.com (o si no usamos reservas).
3. ID de Google Analytics (GA4) / GTM, o si no quieres analítica de momento.
4. ¿Mostramos precios/planes en alguna página?
5. Enlaces externos reales de los 9 proyectos (para botón "Visitar web").
6. Confirmar datos legales (razón social/NIF) en aviso legal.

## Definición de "perfecta y lista"
Todo lo de secciones 1-6 en ✅, decisiones 👤 resueltas, y QA en staging superado. Entonces → cutover (sección 7).
