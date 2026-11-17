# Varelo Espress – Sitio web informativo y comercial

Sitio estático (HTML5 + CSS3 + JavaScript puro) para Varelo Espress, Bogotá, Colombia.
Toda la interacción comercial ocurre por WhatsApp. No hay carrito, pagos, cuentas ni backend.

## Cómo verlo en tu computador
1. Abre esta carpeta en Visual Studio Code.
2. Clic derecho en `index.html` → **Open with Live Server**.

## Dónde se cambian las cosas
| Quiero cambiar…                              | Archivo                          |
|----------------------------------------------|----------------------------------|
| Número de WhatsApp, redes, ciudad            | `assets/js/config.js`            |
| Mensaje de WhatsApp por defecto de una página| `assets/js/config.js` → `mensajes` |
| Menú y footer (enlaces, textos)              | `assets/js/layout.js`            |
| Colores y tipografías                        | `assets/css/base.css` (`:root`)  |
| Botones, tarjetas, menú, footer              | `assets/css/components.css`      |
| Estilos de una página concreta               | `assets/css/pages.css`           |
| Iconos                                       | `assets/icons/sprite.js`         |
| Datos de ejemplo por reemplazar              | `CONTENIDO-PENDIENTE.md`         |

## Cómo funciona un botón de WhatsApp
Cualquier enlace `<a>` con el atributo `data-wa-message` se convierte solo en un enlace de WhatsApp:
- `data-wa-message="Hola, me interesa la máquina X"` → abre WhatsApp con ese mensaje.
- `data-wa-message=""` → usa el mensaje por defecto de la página (`config.js`).

## Orden de los scripts (importante)
`config.js` → `sprite.js` → `whatsapp.js` → `layout.js` → `nav.js` → `reveal.js`
Cada página debe llevar `<body data-page="...">` con su id (inicio, cafe, alquiler, maquinas, repuestos, servicio, nosotros, contacto).

## Estado del proyecto
- Fase 4: entorno y estructura base ✔
- Fase 5: **Inicio ✔** · pendientes: venta-de-cafe, alquiler-de-maquinas, venta-de-maquinas, repuestos, servicio-tecnico, nosotros, contacto
