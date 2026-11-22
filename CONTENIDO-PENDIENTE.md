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

## Comercial — Repuestos (`repuestos.html`)
- [ ] Los 9 repuestos, sus referencias (CCH-CPK-64, EMP-SIL-85, VLV-VAP-RN, ELE-PRS-SIR3P, CNT-VOL-GMM, BOT-MEM-5T, ELV-PRK-3V, DCH-IMS-E61, VAR-PTF-2S) y sus medidas: confirmar que existen y que las referencias son reales
- [ ] Estado de stock: 8 "Stock disponible" y 1 "Bajo pedido" (botonera). Es un dato que cambia: decidir si se mantiene en la web o se quita la etiqueta y se confirma por WhatsApp
- [ ] Marcas compatibles de cada repuesto (Compak, Astoria, Gaggia, Wega, Rancilio, Nuova Simonelli, Sirai, Giemme, Ceme, Faema, La Marzocco, Parker, ODE, IMS Precision, E61)
- [ ] Marcas citadas en el hero (La Marzocco, Rancilio, Nuova Simonelli, Faema, Astoria, Gaggia)
- [ ] Se omitieron del demo "originales", "principales marcas del mercado", "piezas importadas bajo pedido" y "envíos nacionales": confirmar si se pueden afirmar
- [ ] Las 9 categorías (Cuchillas, Empaques de grupo, Válvulas vapor/agua, Eléctricos, Contadores volumétricos, Botoneras, Electroválvulas, Duchas, Varios)
- [ ] Imágenes: las 9 de las tarjetas y la del hero son ilustrativas (IA) y NO corresponden a las piezas reales (p. ej., el presostato de la imagen no tiene los mismos terminales que el modelo indicado). Al poner fotos reales, borrar la etiqueta "Imagen ilustrativa" (`repuesto__ilustrativa`) de cada tarjeta

## Comercial — Servicio técnico (`servicio-tecnico.html`)
- [ ] Los 4 servicios (mantenimiento preventivo, descalcificación profunda, reparación eléctrica e hidráulica, cambio de consumibles y repuestos), sus descripciones y etiquetas (incluye "Duchas IMS")
- [ ] Tipos de servicio, tipos de establecimiento y niveles de urgencia del formulario
- [ ] **Se suavizaron estas afirmaciones del demo (texto original entre comillas). Si el negocio las confirma, se pueden volver a poner:**
  - [ ] "Atención de Emergencias 24/7" y "Soporte 24/7" → ahora dice "Atención de emergencias" (sin horario)
  - [ ] "se pondrá en contacto inmediato" → "te escribiremos por WhatsApp para coordinar la revisión"
  - [ ] "Urgencia 24h (Falla Crítica)" → ahora "Urgente (falla crítica)"
  - [ ] "Repuestos Originales: Garantía con piezas directas de fábrica para todas las marcas" → ahora "Repuestos para tu máquina: cambio de piezas y consumibles para distintas marcas"
  - [ ] "Garantía de Servicio: Todos nuestros trabajos de reparación cuentan con sello de garantía" → ahora "Consulta las condiciones de garantía de cada trabajo"
  - [ ] "Diagnóstico preciso, repuestos originales y soporte rápido… nunca se detenga" → ahora sin "originales"
  - [ ] "Evaluación técnica integral" → "Evaluación técnica"
- [ ] Zona de cobertura del servicio técnico en Bogotá (¿a domicilio, en taller o ambos?): el demo dice "en tu barra o taller"
- [ ] Imagen `hero-servicio-*.webp` (generada con IA)