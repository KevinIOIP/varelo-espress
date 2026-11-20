/* =====================================================================
   whatsapp.js — Arma los enlaces de WhatsApp de TODO el sitio.

   Cómo se usa en el HTML (cualquier <a>):
     <a data-wa-message="Hola, me interesa la máquina X">Cotizar</a>
       → abre WhatsApp con ESE mensaje.
     <a data-wa-message="">Escribir</a>
       → abre WhatsApp con el mensaje por defecto de la página
         (config.js → mensajes[<body data-page>]).

   Seguridad: el mensaje siempre pasa por encodeURIComponent, así los
   caracteres como & # ? tildes o saltos de línea no rompen el enlace.
   ===================================================================== */
(function () {
  'use strict';

  var cfg = window.VARELO_CONFIG;
  if (!cfg) { console.error('[whatsapp.js] Falta config.js (debe cargarse primero).'); return; }

  var MAX_LARGO = 1000;  // WhatsApp tolera textos largos, pero conviene un tope

  // Número válido: solo dígitos, entre 10 y 15 (formato internacional sin +).
  var numeroValido = /^\d{10,15}$/.test(cfg.whatsapp.numero);
  if (!numeroValido) console.error('[whatsapp.js] Número de WhatsApp inválido en config.js');

  // Limpia espacios repetidos, conserva saltos de línea y limita el largo.
  function limpiar(texto) {
    return String(texto == null ? '' : texto)
      .replace(/[ \t]+/g, ' ')
      .trim()
      .slice(0, MAX_LARGO);
  }

  // Mensaje por defecto según la página actual (<body data-page="inicio">).
  function mensajePorDefecto() {
    var pagina = document.body.getAttribute('data-page');
    var mensajes = cfg.mensajes || {};
    return mensajes[pagina] || mensajes.general || 'Hola, quisiera información.';
  }

  function crearEnlace(mensaje) {
    return 'https://wa.me/' + cfg.whatsapp.numero + '?text=' + encodeURIComponent(limpiar(mensaje));
  }

  // Asigna href, target y rel a todos los elementos [data-wa-message] de un contenedor.
  function enlazar(raiz) {
    if (!numeroValido) return;
    var nodos = (raiz || document).querySelectorAll('a[data-wa-message]');
    Array.prototype.forEach.call(nodos, function (a) {
      var mensaje = a.getAttribute('data-wa-message') || mensajePorDefecto();
      a.setAttribute('href', crearEnlace(mensaje));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');  // enlace externo seguro
    });
  }

  // Abre WhatsApp desde JavaScript (lo usan los formularios).
  function abrir(mensaje) {
    if (!numeroValido) return false;
    var url = crearEnlace(mensaje);
    var ventana = window.open(url, '_blank', 'noopener,noreferrer');
    if (!ventana) window.location.href = url;   // si el navegador bloquea la ventana nueva
    return true;
  }

  // API pública para otros scripts (filtros, formularios, cotizadores…)
  window.VareloWA = { crearEnlace: crearEnlace, enlazar: enlazar, abrir: abrir, limpiar: limpiar };
})();
