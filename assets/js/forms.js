/* =====================================================================
   forms.js — Formularios SIN backend: validan y arman un mensaje de
   WhatsApp con lo que el usuario eligió. No se guarda ni se envía nada
   a ningún servidor.

   Cómo se usa en el HTML:
     <form data-wa-form="servicio" novalidate> ... </form>
   y aquí abajo (CONSTRUCTORES) se define cómo se arma el mensaje de
   cada formulario. Hoy hay dos: "cafe" y "servicio".

   Resumen en vivo (opcional): cualquier elemento con
     data-resumen-de="nombreDelCampo"  (y data-vacio="texto si está vacío")
   dentro del formulario se actualiza solo cuando el usuario cambia ese campo.

   Seguridad:
   - Los números se validan como enteros y los textos con su maxlength.
   - Todo texto va por textContent / encodeURIComponent (whatsapp.js).
   ===================================================================== */
(function () {
  'use strict';

  var wa = window.VareloWA;
  if (!wa) { console.error('[forms.js] Falta whatsapp.js'); return; }

  /* ---------- Ayudantes para leer campos ---------- */

  // Texto visible de la opción elegida en un <select>
  function textoOpcion(form, nombre) {
    var s = form.elements[nombre];
    return s.options[s.selectedIndex].text;
  }

  // Texto (data-resumen) de la opción elegida en un grupo de radios
  function textoRadio(form, nombre) {
    var r = form.querySelector('input[type="radio"][name="' + nombre + '"]:checked');
    return r ? (r.getAttribute('data-resumen') || r.value) : '';
  }

  // Texto libre en una sola línea, sin espacios repetidos
  function textoLibre(form, nombre, siVacio) {
    var campo = form.elements[nombre];
    var valor = campo ? campo.value.replace(/\s+/g, ' ').trim() : '';
    return valor || siVacio || '';
  }

  /* ---------- Constructores de mensajes (uno por formulario) ---------- */
  var CONSTRUCTORES = {

    // Página Café: cotizador por libras personalizadas
    cafe: function (form) {
      var libras = parseInt(form.elements.libras.value, 10);
      return [
        'Hola, quiero cotizar un pedido personalizado de café:',
        '- Cantidad: ' + libras + (libras === 1 ? ' libra' : ' libras'),
        '- Presentación: ' + textoOpcion(form, 'molienda'),
        '- Tueste: ' + textoOpcion(form, 'tueste'),
        'Quedo atento a la disponibilidad y el precio.'
      ].join('\n');
    },

    // Página Servicio técnico: solicitud de diagnóstico
    servicio: function (form) {
      return [
        'Hola, quiero solicitar servicio técnico para mi máquina de café:',
        '- Servicio: ' + textoRadio(form, 'servicio'),
        '- Máquina: ' + textoLibre(form, 'maquina', 'No especificada'),
        '- Tipo de negocio: ' + textoOpcion(form, 'negocio'),
        '- Urgencia: ' + textoRadio(form, 'urgencia'),
        '- Detalles / falla: ' + textoLibre(form, 'detalles', 'Sin detalles adicionales')
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
    // Textos: respetan maxlength aunque el navegador no lo haya aplicado (p. ej. al pegar)
    if ((campo.type === 'text' || campo.tagName === 'TEXTAREA') && campo.maxLength > 0 && valor.length > campo.maxLength) {
      return 'Máximo ' + campo.maxLength + ' caracteres.';
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

  /* ---------- Resumen en vivo ---------- */
  function actualizarResumen(form) {
    Array.prototype.forEach.call(form.querySelectorAll('[data-resumen-de]'), function (nodo) {
      var nombre = nodo.getAttribute('data-resumen-de');
      var valor = '';
      if (form.querySelector('input[type="radio"][name="' + nombre + '"]')) {
        valor = textoRadio(form, nombre);
      } else if (form.elements[nombre]) {
        valor = form.elements[nombre].tagName === 'SELECT'
          ? textoOpcion(form, nombre)
          : textoLibre(form, nombre, '');
      }
      nodo.textContent = valor || nodo.getAttribute('data-vacio') || '—';
    });
  }

  /* ---------- Inicialización de cada formulario ---------- */
  function iniciar(form) {
    var nombre = form.getAttribute('data-wa-form');
    var construir = CONSTRUCTORES[nombre];
    if (!construir) { console.error('[forms.js] No hay constructor para: ' + nombre); return; }

    // Los radios siempre traen una opción marcada, así que no se validan uno a uno
    var campos = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'))
      .filter(function (c) { return c.type !== 'radio'; });
    var estado = form.querySelector('[data-form-estado]');
    var intentado = false;   // tras el primer intento de envío, validamos mientras se escribe

    campos.forEach(function (campo) {
      var evento = campo.tagName === 'SELECT' ? 'change' : 'input';
      campo.addEventListener(evento, function () { if (intentado) mostrarError(campo, validar(campo)); });
      campo.addEventListener('blur', function () { if (intentado) mostrarError(campo, validar(campo)); });
    });

    form.addEventListener('input', function () { actualizarResumen(form); });
    form.addEventListener('change', function () { actualizarResumen(form); });
    actualizarResumen(form);   // estado inicial

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
