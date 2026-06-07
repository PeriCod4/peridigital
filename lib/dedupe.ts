// Consolidación de duplicados: variantes -2/-3 -> canónico. 301 en cutover (.htaccess).
export const POST_REDIRECTS: Record<string,string> = {
  "optimizacion-web-moviles-espana-2": "optimizacion-web-moviles-espana",
  "mantenimiento-web-para-empresas-2": "mantenimiento-web-para-empresas",
  "marketing-digital-para-abogados-3": "marketing-digital-para-abogados",
  "marketing-digital-para-abogados-2": "marketing-digital-para-abogados",
  "pagina-web-para-psicologos-espana-2": "pagina-web-para-psicologos-espana",
  "desarrollo-web-a-medida-espana-3": "desarrollo-web-a-medida-espana",
  "desarrollo-web-a-medida-espana-2": "desarrollo-web-a-medida-espana",
  "como-elegir-agencia-de-marketing-digital-4": "como-elegir-agencia-de-marketing-digital",
  "como-elegir-agencia-de-marketing-digital-3": "como-elegir-agencia-de-marketing-digital",
  "como-elegir-agencia-de-marketing-digital-2": "como-elegir-agencia-de-marketing-digital",
  "contratar-agencia-de-marketing-digital-2": "contratar-agencia-de-marketing-digital",
  "auditoria-seo-gratuita-espana-2": "auditoria-seo-gratuita-espana",
  "como-hacer-auditoria-seo-paso-a-paso-2": "como-hacer-auditoria-seo-paso-a-paso",
  "agencia-marketing-digital-espana-2": "agencia-marketing-digital-espana",
  "como-medir-roi-marketing-digital-2": "como-medir-roi-marketing-digital",
  "mejor-agencia-seo-pymes-2": "mejor-agencia-seo-pymes"
};

export const REDIRECT_SLUGS = new Set<string>(Object.keys(POST_REDIRECTS));
