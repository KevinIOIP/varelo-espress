# Contenido de EJEMPLO por validar antes de publicar

Todo lo siguiente proviene de los demos o es provisional y NO está confirmado por el negocio.
En el código está marcado con el comentario `EJEMPLO`.

## Comercial — Inicio
- [ ] Marcas (Rancilio, La Marzocco, Faema, Nuova Simonelli, Compak) — `index.html`
- [ ] Los 5 servicios y su descripción — `index.html`
- [ ] Textos del hero y de "Cómo contactarnos"
- [ ] Redes sociales (enlaces de ejemplo) — `assets/js/config.js`
- [ ] Horarios y dirección en Bogotá

## Comercial — Café (`cafe.html`)
- [ ] Beneficios: entrega a domicilio, válvula desgasificadora, molienda personalizada
- [ ] Perfiles de tueste y sus notas de cata (medio, oscuro/italiano, descafeinado)
- [ ] "Procesos naturales de extracción en agua" (descafeinado)
- [ ] Paquetes de 5, 10, 15, 20 y 30 lbs y los beneficios de cada uno
- [ ] Etiqueta "Más vendido" (15 lbs)
- [ ] Afirmaciones sobre precio: "precio especial por volumen", "tarifa mayorista", "mejor tarifa por libra"
- [ ] Otras afirmaciones: "envío a domicilio incluido", "tueste fresco garantizado", "asesoría de extracción incluida"
- [ ] Opciones del cotizador (moliendas y tuestes) y tope de 1000 lbs
- [ ] Cobertura de la entrega a domicilio

## Comercial — páginas pendientes de desarrollar
- [ ] Catálogo de máquinas: modelos y especificaciones
- [ ] Alquiler: planes, condiciones, descuentos
- [ ] Repuestos: categorías, referencias, estado de stock
- [ ] Servicio técnico: servicios, "24/7", garantía
- [ ] Texto de "Nosotros"

## Imágenes (hoy generadas con IA — reemplazar por fotos propias)
- [ ] `hero-inicio-*.webp` y `card-*.webp` (5 tarjetas de servicios)
- [ ] `hero-cafe-*.webp` y `tueste-*.webp` (3 perfiles de tueste)
- [ ] Favicon (`assets/icons/`): recorte del logo; idealmente pedir un SVG al diseñador

## Técnico (cuando exista el dominio)
- [ ] `assets/js/config.js` → `sitio.urlBase`
- [ ] Descomentar `canonical`, `og:url` y `og:image` en cada HTML
- [ ] Crear `sitemap.xml` y `robots.txt` con la URL real (incluye `cafe.html`)
- [ ] JSON-LD de `index.html`: agregar `url`, `sameAs` (redes) y `openingHours`
- [ ] JSON-LD de `cafe.html`: agregar la URL absoluta en cada elemento de la ruta
