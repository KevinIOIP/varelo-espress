/* nav.js — menú móvil y sombra del header (debe cargarse DESPUÉS de layout.js). */
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
  burger.addEventListener('click', function () { abrir(!menu.classList.contains('abierto')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) abrir(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('abierto')) { abrir(false); burger.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('abierto') && !header.contains(e.target)) abrir(false);
  });
  window.matchMedia('(min-width: 1080px)').addEventListener('change', function (m) { if (m.matches) abrir(false); });
  function alScroll() { header.classList.toggle('header--scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', alScroll, { passive: true });
  alScroll();
})();
