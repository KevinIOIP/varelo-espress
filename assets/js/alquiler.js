/* =====================================================================
   alquiler.js — Configurador de alquiler (página alquiler-de-maquinas.html).

   Qué hace:
   1. Lee las opciones elegidas (tamaño, voltaje, tiempo).
   2. Actualiza el panel "Resumen de cotización".
   3. Arma el enlace de WhatsApp con esas opciones (usa whatsapp.js).
   4. Regla técnica: la máquina de 3 grupos solo trabaja a 220V, así que al
      elegirla se selecciona 220V y se bloquea 110V.

   Cómo editar las opciones: se cambian en el HTML, no aquí. Cada opción
   (<input type="radio">) lleva dos atributos:
     value="..."          identifica la opción (el script usa value="3" y "110")
     data-resumen="..."   texto que se muestra en el resumen y en el mensaje

   Seguridad: solo se leen radios del propio formulario y todo texto se
   escribe con textContent; el mensaje va por encodeURIComponent (whatsapp.js).
   ===================================================================== */
(function () {
  'use strict';

  var wa = window.VareloWA;
  var form = document.getElementById('alquiler-form');
  var boton = document.getElementById('alq-wa');
  if (!wa || !form || !boton) { return; }

  // Valores que activan la regla de 3 grupos → 220V (deben coincidir con el HTML)
  var GRUPOS_QUE_EXIGEN_220V = '3';
  var VOLTAJE_BLOQUEADO = '110';
  var VOLTAJE_PERMITIDO = '220';

  function marcada(nombre) {
    return form.querySelector('input[name="' + nombre + '"]:checked');
  }
  function textoDe(radio) {
    return radio ? (radio.getAttribute('data-resumen') || radio.value) : '';
  }
  function ponerTexto(id, texto) {
    var nodo = document.getElementById(id);
    if (nodo) { nodo.textContent = texto; }
  }

  // Aplica la regla "3 grupos → solo 220V"
  function aplicarReglaVoltaje() {
    var grupos = marcada('grupos');
    var exige220 = !!grupos && grupos.value === GRUPOS_QUE_EXIGEN_220V;
    var r110 = form.querySelector('input[name="voltaje"][value="' + VOLTAJE_BLOQUEADO + '"]');
    var r220 = form.querySelector('input[name="voltaje"][value="' + VOLTAJE_PERMITIDO + '"]');
    var aviso = document.getElementById('alq-aviso-voltaje');
    if (!r110 || !r220) { return; }

    r110.disabled = exige220;
    if (exige220 && r110.checked) { r220.checked = true; }
    if (aviso) { aviso.hidden = !exige220; }
  }

  function construirMensaje() {
    return [
      'Hola, quiero cotizar el alquiler de una máquina de café con las siguientes especificaciones:',
      '- Tamaño: ' + textoDe(marcada('grupos')),
      '- Voltaje: ' + textoDe(marcada('voltaje')),
      '- Duración estimada: ' + textoDe(marcada('tiempo')),
      '- Quisiera confirmar las condiciones de molino y mantenimiento.'
    ].join('\n');
  }

  function actualizar() {
    aplicarReglaVoltaje();
    ponerTexto('alq-r-grupos', textoDe(marcada('grupos')));
    ponerTexto('alq-r-voltaje', textoDe(marcada('voltaje')));
    ponerTexto('alq-r-tiempo', textoDe(marcada('tiempo')));

    boton.setAttribute('href', wa.crearEnlace(construirMensaje()));
    boton.setAttribute('target', '_blank');
    boton.setAttribute('rel', 'noopener noreferrer');
  }

  form.addEventListener('change', actualizar);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  actualizar();   // estado inicial al cargar la página
})();
