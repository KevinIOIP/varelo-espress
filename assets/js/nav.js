/* =====================================================================
   nav.js — Comportamiento del menú: abrir/cerrar en móvil y sombra del
   header al hacer scroll. Debe cargarse DESPUÉS de layout.js, porque el
   menú lo crea layout.js.
   ===================================================================== */
(function () {
  'use strict';

  var header = document.querySelector('.header');
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu-principal');
  if (!header || !burger || !menu) return;

  function abrir(estado) {
    menu.classList.toggle('abierto', estado);
    burger.classList.toggle('activo', estado);
    burger.setAttribute('aria-expanded', String(estado));
    burger.setAttribute('aria-label', estado ? 'Cerrar menú' : 'Abrir menú');
  }

  burger.addEventListener('click', function () {
    abrir(!menu.classList.contains('abierto'));
  });

  // Cerrar al elegir un enlace
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) abrir(false);
  });

  // Cerrar con Escape (y devolver el foco al botón)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('abierto')) {
      abrir(false);
      burger.focus();
    }
  });

  // Cerrar al tocar fuera del header
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('abierto') && !header.contains(e.target)) abrir(false);
  });

  // Si la pantalla se agranda hasta el menú de escritorio, reiniciamos el estado
  window.matchMedia('(min-width: 1080px)').addEventListener('change', function (m) {
    if (m.matches) abrir(false);
  });

  // Sombra del header al bajar
  function alScroll() { header.classList.toggle('header--scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', alScroll, { passive: true });
  alScroll();
})();
