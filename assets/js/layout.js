/* =====================================================================
   layout.js — Header, footer y botón flotante COMPARTIDOS.
   Se escriben una sola vez aquí y se insertan en cada página.
   Cada página solo necesita:
     <body data-page="inicio">
       <div id="site-header"></div>
       <main id="contenido" tabindex="-1"> ... </main>
       <div id="site-footer"></div>
   Seguridad: todo se construye con createElement/textContent
   (nunca innerHTML con datos), así no se inyecta contenido no confiable.
   ===================================================================== */
(function () {
  'use strict';

  var cfg = window.VARELO_CONFIG;
  if (!cfg) { console.error('[layout.js] Falta config.js'); return; }

  /* Páginas del menú. "id" debe coincidir con <body data-page="...">.
     Para agregar, quitar o renombrar una página, se hace aquí.
     (Esta lista alimenta el menú del header Y la lista del footer.) */
  var PAGINAS = [
    { id: 'inicio',   etiqueta: 'Inicio',           archivo: 'index.html' },
    { id: 'cafe',     etiqueta: 'Café',             archivo: 'cafe.html' },
    { id: 'alquiler', etiqueta: 'Alquiler',         archivo: 'alquiler-de-maquinas.html' },
    { id: 'maquinas', etiqueta: 'Máquinas',         archivo: 'venta-de-maquinas.html' },
    { id: 'repuestos',etiqueta: 'Repuestos',        archivo: 'repuestos.html' },
    { id: 'servicio', etiqueta: 'Servicio técnico', archivo: 'servicio-tecnico.html' },
    { id: 'nosotros', etiqueta: 'Nosotros',         archivo: 'nosotros.html' }
  ];

  var LOGO = 'assets/img/logo-varelo-160.webp';
  var paginaActual = document.body.getAttribute('data-page');

  /* ---------- Ayudantes para construir HTML de forma segura ---------- */
  function el(tag, atributos, hijos) {
    var nodo = document.createElement(tag);
    Object.keys(atributos || {}).forEach(function (k) {
      if (k === 'texto') nodo.textContent = atributos[k];
      else nodo.setAttribute(k, atributos[k]);
    });
    (hijos || []).forEach(function (h) { if (h) nodo.appendChild(typeof h === 'string' ? document.createTextNode(h) : h); });
    return nodo;
  }
  function icono(id, clase) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'ico' + (clase ? ' ' + clase : ''));
    svg.setAttribute('aria-hidden', 'true');
    var use = document.createElementNS(ns, 'use');
    use.setAttribute('href', '#' + id);
    svg.appendChild(use);
    return svg;
  }

  /* ---------- Header ---------- */
  function crearHeader() {
    var lista = el('ul', { 'class': 'nav__list' });

    PAGINAS.forEach(function (p) {
      var a = el('a', { 'class': 'nav__link', href: p.archivo, texto: p.etiqueta });
      if (p.id === paginaActual) a.setAttribute('aria-current', 'page');
      lista.appendChild(el('li', {}, [a]));
    });

    // Botón "Cotizar": data-wa-message vacío → usa el mensaje de la página (whatsapp.js)
    var cta = el('a', { 'class': 'btn btn--oro btn--sm', 'data-wa-message': '' },
      [icono('i-chat'), 'Cotizar']);
    lista.appendChild(el('li', { 'class': 'nav__cta' }, [cta]));

    var logo = el('img', { src: LOGO, alt: '', width: '52', height: '54' });
    var marca = el('a', { 'class': 'brand', href: 'index.html', 'aria-label': cfg.empresa.nombre + ', ir al inicio' }, [
      logo,
      el('span', { 'class': 'brand__text' }, [
        el('span', { 'class': 'brand__name', texto: cfg.empresa.nombre }),
        el('span', { 'class': 'brand__tag', texto: 'Café & Máquinas' })
      ])
    ]);

    var burger = el('button', {
      'class': 'burger', type: 'button', 'aria-expanded': 'false',
      'aria-controls': 'menu-principal', 'aria-label': 'Abrir menú'
    }, [icono('i-menu', 'burger__abrir'), icono('i-close', 'burger__cerrar')]);

    var nav = el('nav', { 'class': 'nav', id: 'menu-principal', 'aria-label': 'Principal' }, [lista]);

    return el('header', { 'class': 'header' }, [
      el('div', { 'class': 'wrap header__inner' }, [marca, burger, nav])
    ]);
  }

  /* ---------- Footer ---------- */
  function crearFooter() {
    var navegacion = el('ul', { 'class': 'footer__lista' });
    PAGINAS.forEach(function (p) {
      navegacion.appendChild(el('li', {}, [el('a', { href: p.archivo, texto: p.etiqueta })]));
    });

    var datos = el('ul', { 'class': 'footer__lista' }, [
      el('li', {}, [icono('i-pin'), el('span', { texto: cfg.empresa.ciudad + ', ' + cfg.empresa.pais })]),
      el('li', {}, [icono('i-phone'), el('span', { texto: cfg.whatsapp.numeroVisible })])
    ]);
    var wa = el('a', { 'class': 'btn btn--wa btn--sm', 'data-wa-message': '' },
      [icono('i-wa', 'ico--wa'), 'Escribir por WhatsApp']);

    // Redes: solo se muestran las que tienen enlace en config.js
    var redes = el('ul', { 'class': 'footer__lista footer__redes' });
    [['instagram', 'Instagram'], ['facebook', 'Facebook'], ['tiktok', 'TikTok']].forEach(function (r) {
      var url = cfg.redes && cfg.redes[r[0]];
      if (url) redes.appendChild(el('li', {}, [
        el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', texto: r[1] })
      ]));
    });

    return el('footer', { 'class': 'footer' }, [
      el('div', { 'class': 'wrap footer__grid' }, [
        el('div', { 'class': 'footer__col footer__marca' }, [
          el('img', { src: LOGO, alt: 'Logo de ' + cfg.empresa.nombre, width: '64', height: '66', loading: 'lazy' }),
          el('p', { 'class': 'footer__nombre', texto: cfg.empresa.nombre }),
          el('p', { texto: 'Café, máquinas, repuestos y servicio técnico en ' + cfg.empresa.ciudad + '.' })
        ]),
        el('nav', { 'class': 'footer__col', 'aria-label': 'Pie de página' }, [el('h2', { 'class': 'footer__titulo', texto: 'Páginas' }), navegacion]),
        el('div', { 'class': 'footer__col' }, [el('h2', { 'class': 'footer__titulo', texto: 'Escríbenos' }), datos, wa]),
        redes.children.length ? el('div', { 'class': 'footer__col' }, [el('h2', { 'class': 'footer__titulo', texto: 'Redes' }), redes]) : null
      ]),
      el('div', { 'class': 'wrap footer__legal' }, [
        el('p', { texto: '© ' + new Date().getFullYear() + ' ' + cfg.empresa.nombre + '. Todos los derechos reservados.' })
      ])
    ]);
  }

  /* ---------- Botón flotante de WhatsApp ---------- */
  function crearFlotante() {
    return el('a', { 'class': 'wa-flotante', 'data-wa-message': '', 'aria-label': 'Escribir por WhatsApp' },
      [icono('i-wa', 'ico--wa')]);
  }

  /* ---------- Inserción ---------- */
  // 1) Sprite de iconos al inicio del body (constante propia, no viene de usuarios)
  if (window.VARELO_SPRITE) document.body.insertAdjacentHTML('afterbegin', window.VARELO_SPRITE);

  // 2) Enlace "saltar al contenido" (accesibilidad por teclado)
  document.body.insertBefore(el('a', { 'class': 'skip-link', href: '#contenido', texto: 'Saltar al contenido' }), document.body.firstChild);

  // 3) Header y footer en sus contenedores (reemplazan el <noscript> de respaldo)
  var contHeader = document.getElementById('site-header');
  var contFooter = document.getElementById('site-footer');
  if (contHeader) contHeader.replaceChildren(crearHeader());
  if (contFooter) contFooter.replaceChildren(crearFooter());
  document.body.appendChild(crearFlotante());

  // 4) Con todo insertado, armamos los enlaces de WhatsApp
  if (window.VareloWA) window.VareloWA.enlazar(document);
})();
