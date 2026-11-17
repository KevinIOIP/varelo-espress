/* =====================================================================
   config.js — ÚNICO lugar para datos de la empresa.
   Si algo cambia (número, redes, ciudad), se cambia SOLO aquí.
   Se carga antes que los demás scripts: window.VARELO_CONFIG
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
  // EJEMPLO: enlaces provisionales, reemplazar por las redes reales.
  redes: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/"
  },
  sitio: {
    // PENDIENTE: poner el dominio real cuando exista (sitemap, canonical, Open Graph).
    urlBase: "https://TU-DOMINIO-AQUI"
  }
};
