# Varelo Espress – Sitio web informativo y comercial

Sitio estático (HTML5 + CSS3 + JavaScript puro) para Varelo Espress, Bogotá, Colombia.
Toda la interacción comercial ocurre por WhatsApp. No hay carrito, pagos, cuentas ni backend.

## Cómo verlo en tu computador
1. Abre esta carpeta en Visual Studio Code.
2. Clic derecho en `index.html` → **Open with Live Server**.

## Dónde se cambian las cosas
| Quiero cambiar…                               | Archivo                            |
|-----------------------------------------------|------------------------------------|
| Número de WhatsApp, redes, ciudad             | `assets/js/config.js`              |
| Mensaje de WhatsApp por defecto de una página | `assets/js/config.js` → `mensajes` |
| Menú y footer (enlaces, textos)               | `assets/js/layout.js`              |
| Colores y tipografías                         | `assets/css/base.css` (`:root`)    |
| Botones, tarjetas, menú, formularios, footer  | `assets/css/components.css`        |
| Estilos de una página concreta                | `assets/css/pages.css`             |
| Iconos                                        | `assets/icons/sprite.js`           |
| Mensaje que arma cada formulario              | `assets/js/forms.js` → `CONSTRUCTORES` |
| Datos de ejemplo por reemplazar               | `CONTENIDO-PENDIENTE.md`           |
| Agregar o quitar un repuesto | `repuestos.html` (copiar una `<article class="card repuesto">` completa y cambiar `data-categoria`, `data-busqueda` y `data-wa-message`) |
| Agregar una categoría de repuestos | `repuestos.html` (nuevo `<button class="pildora" data-valor="...">` en el grupo de filtros) |

## Cómo funciona un botón de WhatsApp
Cualquier enlace `<a>` con el atributo `data-wa-message` se convierte solo en un enlace de WhatsApp:
- `data-wa-message="Hola, me interesa la máquina X"` → abre WhatsApp con ese mensaje.
- `data-wa-message=""` → usa el mensaje por defecto de la página (`config.js`).

## Cómo funciona un formulario
`<form data-wa-form="cafe">` → `forms.js` valida los campos y abre WhatsApp con el mensaje que arma
la función `CONSTRUCTORES.cafe`. No se guarda ni se envía nada a ningún servidor.

## Orden de los scripts (importante)
`config.js` → `sprite.js` → `whatsapp.js` → `layout.js` → `nav.js` → `reveal.js` → `forms.js` (solo páginas con formulario)
Cada página debe llevar `<body data-page="...">` con su id (inicio, cafe, alquiler, maquinas, repuestos, servicio, nosotros).

## Páginas
| Página | Archivo | Estado |
|---|---|---|
| Inicio | `index.html` | ✔ |
| Café | `cafe.html` | ✔ |
| Alquiler de máquinas | `alquiler-de-maquinas.html` | ✔ |
| Venta de máquinas | `venta-de-maquinas.html` | ✔ |
| Repuestos | `repuestos.html` | ✔ |
| Servicio técnico | `servicio-tecnico.html` | pendiente |
| Nosotros | `nosotros.html` | pendiente |

## Comercial — Alquiler (`alquiler-de-maquinas.html`)
- [ ] Tamaños de 1, 2 y 3 grupos y su capacidad (50-70, 90-120 y 150+ bebidas por hora)
- [ ] Voltajes: 110V y 220V; regla "3 grupos solo funciona a 220V" (assets/js/alquiler.js)
- [ ] Rangos de tiempo (1-3, 4-6, 7-9 y 10-12+ meses): el demo traía "7-9" y "9-12+", que se cruzaban en el mes 9
- [ ] 3 planes (Compact, Comercial, Alto Flujo): capacidades, calderas (11-15 L, más de 18 L), lanzas de vapor, tipo de molino
- [ ] Etiqueta "El más popular" (Plan Comercial)
- [ ] Qué incluye el alquiler: molino, instalación, calibración, capacitación, mantenimiento preventivo y correctivo
- [ ] "Asistencia técnica prioritaria" (el demo decía 24/7; se quitó)
- [ ] Equipo de respaldo / reemplazo (el demo decía "inmediato" y "sin costo adicional"; se quitó)
- [ ] Tarifas preferenciales en contratos de 6 y 12 meses o más
- [ ] Requisitos de agua y electricidad (preguntas frecuentes)
- [ ] Se omitió "tecnología italiana" y "repuestos originales" del demo: confirmar si se pueden afirmar
- [ ] Imagen `hero-alquiler-*.webp` (generada con IA)

## Comercial — Venta de máquinas (`venta-de-maquinas.html`)
- [ ] Las 4 máquinas (Astoria, Milenium Espress, Gaggia, Magister): marcas, modelos y existencia real
- [ ] Calderas (6, 12, 15 y 11 L), capacidades por hora (50-70, 90-110, 100-120 y 90-100) y número de lancetas
- [ ] Bomba volumétrica y "succión directa desde garrafón en cortes de agua"
- [ ] Origen "Italia" de Astoria, Gaggia y Magister (alimenta el filtro "Origen italiano"; el demo decía "Hecho en Italia")
- [ ] "Incluye: 1 molino italiano semiautomático": solo figura en Astoria; confirmar si las demás también lo incluyen
- [ ] Se omitieron del demo "importadas", "revisados", "garantizados" y "renovación de equipos": confirmar si se pueden afirmar
- [ ] Catálogo sin máquinas de 3 grupos, aunque Alquiler ofrece un plan de 3 grupos
- [ ] Imágenes: las 4 de las tarjetas y la del hero son ilustrativas (IA). Al poner fotos reales, borrar la etiqueta "Imagen ilustrativa" (`maquina__ilustrativa`) de cada tarjeta
- [ ] Marcas que se muestran en el catálogo vs. marcas de la sección "Equipos de referencia" del Inicio (son listas distintas en los demos)

