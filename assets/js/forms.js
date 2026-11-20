/* =====================================================================
   forms.js — Formularios SIN backend: validan y arman un mensaje de
   WhatsApp con lo que el usuario eligió. No se guarda ni se envía nada
   a ningún servidor.

   Cómo se usa en el HTML:
     <form data-wa-form="cafe" novalidate> ... </form>
   y aquí abajo (CONSTRUCTORES) se define cómo se arma el mensaje de
   cada formulario. Los formularios de otras páginas (servicio técnico,
   etc.) solo agregan su propio constructor.

   Seguridad:
   - Solo se aceptan números enteros y opciones de listas desplegables.
   - Todo texto va por textContent / encodeURIComponent (whatsapp.js).
   ===================================================================== */
(function () {
  'use strict';

  var wa = window.VareloWA;
  if (!wa) { console.error('[forms.js] Falta whatsapp.js'); return; }

  /* ---------- Ayudantes ---------- */
  function textoOpcion(form, nombre) {
    var s = form.elements[nombre];
    return s.options[s.selectedIndex].text;
  }

  /* ---------- Constructores de mensajes (uno por formulario) ---------- */
  var CONSTRUCTORES = {
    // Formulario de la página Café: cotizador por libras personalizadas
    cafe: function (form) {
      var libras = parseInt(form.elements.libras.value, 10);
      return [
        'Hola, quiero cotizar un pedido personalizado de café:',
        '- Cantidad: ' + libras + (libras === 1 ? ' libra' : ' libras'),
        '- Presentación: ' + textoOpcion(form, 'molienda'),
        '- Tueste: ' + textoOpcion(form, 'tueste'),
        'Quedo atento a la disponibilidad y el precio.'
      ].join('\n');
    }
  };

  /* ---------- Validación ---------- */
  // Devuelve el texto del error, o '' si el campo es válido.
  function validar(campo) {
    var valor = campo.value.trim();

    if (campo.required && valor === '') {
      if (campo.validity && campo.validity.badInput) return 'Ingresa solo números.';
      return campo.tagName === 'SELECT' ? 'Selecciona una opción.' : 'Este campo es obligatorio.';
    }
    if (campo.type === 'number') {
      if (!/^\d+$/.test(valor)) return 'Ingresa un número entero, sin decimales.';
      var n = parseInt(valor, 10);
      var min = campo.min !== '' ? parseInt(campo.min, 10) : -Infinity;
      var max = campo.max !== '' ? parseInt(campo.max, 10) : Infinity;
      if (n < min) return 'El mínimo es ' + min + '.';
      if (n > max) return 'El máximo es ' + max + '. Para cantidades mayores escríbenos directamente.';
    }
    return '';
  }

  function mostrarError(campo, mensaje) {
    var caja = document.getElementById(campo.id + '-error');
    if (caja) caja.textContent = mensaje;            // textContent: sin HTML
    campo.classList.toggle('invalido', mensaje !== '');
    if (mensaje) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
  }

  /* ---------- Inicialización de cada formulario ---------- */
  function iniciar(form) {
    var nombre = form.getAttribute('data-wa-form');
    var construir = CONSTRUCTORES[nombre];
    if (!construir) { console.error('[forms.js] No hay constructor para: ' + nombre); return; }

    var campos = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
    var estado = form.querySelector('[data-form-estado]');
    var intentado = false;   // tras el primer intento de envío, validamos mientras se escribe

    campos.forEach(function (campo) {
      var evento = campo.tagName === 'SELECT' ? 'change' : 'input';
      campo.addEventListener(evento, function () { if (intentado) mostrarError(campo, validar(campo)); });
      campo.addEventListener('blur', function () { if (intentado) mostrarError(campo, validar(campo)); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      intentado = true;
      var primerError = null;
      campos.forEach(function (campo) {
        var error = validar(campo);
        mostrarError(campo, error);
        if (error && !primerError) primerError = campo;
      });
      if (primerError) {
        if (estado) estado.textContent = 'Revisa los campos marcados.';
        primerError.focus();
        return;
      }
      if (estado) estado.textContent = 'Abriendo WhatsApp con tu solicitud…';
      wa.abrir(construir(form));
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('form[data-wa-form]'), iniciar);
})();
