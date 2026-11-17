/* =====================================================================
   reveal.js — Aparición suave al hacer scroll.
   Uso: agrega el atributo data-reveal a cualquier elemento.
   Si el usuario prefiere "reducir movimiento" (o el navegador no soporta
   IntersectionObserver) no hace nada y todo se ve normal.
   ===================================================================== */
(function () {
  'use strict';

  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducir || !('IntersectionObserver' in window)) return;

  var nodos = document.querySelectorAll('[data-reveal]');
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('reveal--visible');
        observador.unobserve(entrada.target);   // se anima una sola vez
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  Array.prototype.forEach.call(nodos, function (nodo, i) {
    // Pequeño retraso escalonado entre hermanos (efecto cascada)
    var posicion = Array.prototype.indexOf.call(nodo.parentNode.children, nodo);
    nodo.style.setProperty('--retraso', (posicion % 5) * 80 + 'ms');
    nodo.classList.add('reveal');
    observador.observe(nodo);
  });
})();
