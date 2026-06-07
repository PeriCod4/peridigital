# Enlazado interno

## Implementado
- **Artículo → servicios**: cada artículo (`app/[slug]/page.tsx`) muestra al final chips a los 6 servicios + CTA a `/hablemos/`.
- **Home → servicios/proyectos/blog**: la home enlaza a los 6 servicios, a `/proyectos-web/` y a los últimos artículos.
- **Servicios → contacto**: cada `ServiceLayout` cierra con CTA a `/hablemos/`.
- **Categorías → artículos**: `/categoria/[slug]/` lista sus artículos; el artículo muestra su categoría.
- **Footer**: enlaza los 6 servicios + páginas + legales en todas las páginas.

## Pendiente (mejora continua — al generar contenido)
- Enlazar cada artículo a **1-3 artículos del mismo cluster** (relacionados) y al **hub de servicio** dentro del cuerpo del texto (no solo en el pie). Esto lo aplicará PeriSEO al regenerar/optimizar artículos.
- Desde cada hub de servicio, enlazar a 2-3 artículos destacados del cluster (sección "Aprende más").

## Reglas
- Anchor text descriptivo con la keyword (no "haz clic aquí").
- Máximo sensato de enlaces por artículo; priorizar relevancia temática (mismo cluster).
