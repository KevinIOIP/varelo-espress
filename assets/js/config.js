/* =====================================================================
   config.js — ÚNICO lugar para datos de la empresa y mensajes de WhatsApp.
   Si algo cambia (número, redes, ciudad, mensajes), se cambia SOLO aquí.
   Debe cargarse ANTES que los demás scripts: expone window.VARELO_CONFIG.
   ===================================================================== */
window.VARELO_CONFIG = {
  empresa: {
    nombre: "Varelo Espress",
    ciudad: "Bogotá",
    pais: "Colombia"
  },

  whatsapp: {
    // Formato para wa.me: código de país + número, SIN +, espacios ni guiones.
    numero: "573143406322",
    // Formato para mostrar en pantalla.
    numeroVisible: "+57 314 340 6322"
  },

  // EJEMPLO: enlaces provisionales. Reemplazar por las redes reales.
  // Si dejas una red vacía ("") simplemente no se muestra en el pie de página.
  redes: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/"
  },

  /* Mensaje de WhatsApp por defecto de cada página.
     Se usa en los botones que tienen data-wa-message="" (vacío).
     La clave es el valor de <body data-page="..."> de cada página.
     Los botones de un producto concreto llevan su propio mensaje en el HTML. */
  mensajes: {
    general:  "Hola, quisiera recibir información sobre los productos y servicios de Varelo Espress.",
    inicio:   "Hola, quisiera recibir información sobre los productos y servicios de Varelo Espress.",
    cafe:     "Hola, quisiera información sobre la venta de café de Varelo Espress.",
    alquiler: "Hola, quisiera información sobre el alquiler de máquinas de Varelo Espress.",
    maquinas: "Hola, quisiera información sobre la venta de máquinas de Varelo Espress.",
    repuestos:"Hola, quisiera consultar por repuestos para mi máquina de espresso.",
    servicio: "Hola, quisiera solicitar servicio técnico para mi máquina de espresso.",
    nosotros: "Hola, quisiera conocer más sobre Varelo Espress.",
    // contacto: "Hola, quisiera comunicarme con Varelo Espress."
  },

  sitio: {
    // PENDIENTE: poner el dominio real cuando exista (sitemap, canonical, Open Graph).
    urlBase: "https://TU-DOMINIO-AQUI"
  }
};
