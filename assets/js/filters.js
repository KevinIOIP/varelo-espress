/* =====================================================================
   filters.js — Filtros + buscador COMBINADOS para catálogos
   (hoy: Venta de máquinas; mañana: Repuestos). No depende de la página:
   todo se configura con atributos data-* en el HTML.

   Estructura esperada:
     <div data-catalogo>
       <div data-filtro="grupo">                    ← un grupo de filtros (campo "grupo")
         <button type="button" data-valor=""        aria-pressed="true">Todas</button>
         <button type="button" data-valor="1-grupo" aria-pressed="false">1 grupo</button>
       </div>
       <div data-filtro="origen" data-filtro-modo="alternar">   ← interruptor: un 2.º clic lo apaga
         <button type="button" data-valor="italia" aria-pressed="false">Origen italiano</button>
       </div>
       <input type="search" data-buscador>
       <p data-contador data-unidad="máquinas"></p>
       <div>
         <article data-item data-grupo="1-grupo" data-origen="italia" data-busqueda="astoria 1 grupo …">
       </div>
       <div data-vacio hidden> … <button data-limpiar>Limpiar filtros</button></div>
     </div>

   Reglas:
   - Un item se muestra solo si cumple TODOS los filtros activos Y la búsqueda.
     (El demo original fallaba aquí: buscar ignoraba el filtro activo y viceversa.)
   - La búsqueda ignora mayúsculas y tildes ("semiautomatica" encuentra "Semiautomática")
     y exige que aparezcan TODAS las palabras escritas. Los números cuentan como palabra
     completa ("1 grupo" no devuelve las de "12 litros").
   - Se oculta con el atributo hidden (no con estilos en línea).
   Seguridad: solo se leen atributos y se escribe con textContent.
   ===================================================================== */
(function () {
  'use strict';

  // Minúsculas, sin tildes y sin espacios repetidos
  function normalizar(texto) {
    return String(texto == null ? '' : texto)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function iniciar(raiz) {
    var items = Array.prototype.slice.call(raiz.querySelectorAll('[data-item]'));
    var grupos = Array.prototype.slice.call(raiz.querySelectorAll('[data-filtro]'));
    var buscador = raiz.querySelector('[data-buscador]');
    var contador = raiz.querySelector('[data-contador]');
    var vacio = raiz.querySelector('[data-vacio]');

    // Estado de los filtros: { campo: valor }. Valor '' = sin filtrar.
    var estado = {};
    var inicial = {};
    grupos.forEach(function (g) {
      var activo = g.querySelector('button[aria-pressed="true"]');
      var campo = g.getAttribute('data-filtro');
      inicial[campo] = activo ? activo.getAttribute('data-valor') || '' : '';
      estado[campo] = inicial[campo];
    });

    // Pinta aria-pressed según el estado (el CSS usa aria-pressed para el color)
    function pintarBotones() {
      grupos.forEach(function (g) {
        var campo = g.getAttribute('data-filtro');
        Array.prototype.forEach.call(g.querySelectorAll('button[data-valor]'), function (b) {
          b.setAttribute('aria-pressed', String((b.getAttribute('data-valor') || '') === estado[campo]));
        });
      });
    }

    function coincide(item, palabras) {
      var campo;
      for (campo in estado) {
        if (estado[campo] && item.getAttribute('data-' + campo) !== estado[campo]) { return false; }
      }
      if (palabras.length) {
        var texto = normalizar(item.getAttribute('data-busqueda') || item.textContent);
        var fichas = texto.split(' ');
        for (var i = 0; i < palabras.length; i++) {
          var p = palabras[i];
          // Un número debe coincidir con una palabra COMPLETA: "1" encuentra "1 grupo"
          // pero no "12 litros". El resto de las palabras puede ser un fragmento ("espre").
          var esta = /^\d+$/.test(p) ? fichas.indexOf(p) !== -1 : texto.indexOf(p) !== -1;
          if (!esta) { return false; }
        }
      }
      return true;
    }

    function aplicar() {
      var palabras = buscador ? normalizar(buscador.value).split(' ').filter(Boolean) : [];
      var visibles = 0;
      items.forEach(function (item) {
        var ok = coincide(item, palabras);
        item.hidden = !ok;
        if (ok) { visibles++; }
      });
      if (contador) {
        contador.textContent = 'Mostrando ' + visibles + ' de ' + items.length + ' ' +
          (contador.getAttribute('data-unidad') || 'resultados');
      }
      if (vacio) { vacio.hidden = visibles > 0; }
    }

    function limpiar() {
      Object.keys(inicial).forEach(function (c) { estado[c] = inicial[c]; });
      if (buscador) { buscador.value = ''; }
      pintarBotones();
      aplicar();
    }

    raiz.addEventListener('click', function (e) {
      var limpia = e.target.closest('[data-limpiar]');
      if (limpia && raiz.contains(limpia)) { limpiar(); return; }

      var boton = e.target.closest('[data-filtro] button[data-valor]');
      if (!boton || !raiz.contains(boton)) { return; }
      var grupo = boton.closest('[data-filtro]');
      var campo = grupo.getAttribute('data-filtro');
      var valor = boton.getAttribute('data-valor') || '';

      // Modo "alternar": volver a pulsar el botón activo lo apaga
      if (grupo.getAttribute('data-filtro-modo') === 'alternar' && estado[campo] === valor) { valor = ''; }
      estado[campo] = valor;
      pintarBotones();
      aplicar();
    });

    if (buscador) { buscador.addEventListener('input', aplicar); }

    pintarBotones();
    aplicar();   // estado inicial: muestra todo y escribe el contador
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-catalogo]'), iniciar);
})();
