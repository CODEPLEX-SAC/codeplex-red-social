document.addEventListener('DOMContentLoaded', () => {
  // Carruseles horizontales con flechas superpuestas (Historias en
  // Inicio, Contactos frecuentes en Videollamadas): mismo mecanismo,
  // cada uno con su propia pista y sus propias flechas.
  const carruseles = [
    { contenedor: '.historias-contenedor', pista: '.historias', boton: '.boton-desplazar-historias' },
    { contenedor: '.carrusel-contactos-frecuentes', pista: '.rejilla-contactos-frecuentes', boton: '.boton-desplazar-carrusel' },
    { contenedor: '.carrusel-pestanas-ev', pista: '.pestanas-eventos', boton: '.boton-desplazar-carrusel' },
    { contenedor: '.carrusel-filtros-ev', pista: '.filtros-eventos', boton: '.boton-desplazar-carrusel' },
    { contenedor: '.carrusel-filtros-inv', pista: '.filtros-invitaciones', boton: '.boton-desplazar-carrusel' },
    { contenedor: '.carrusel-modulos-est', pista: '.pestanas-modulos-est', boton: '.boton-desplazar-carrusel' },
    { contenedor: '.carrusel-modulos-rep', pista: '.pestanas-modulos-rep', boton: '.boton-desplazar-carrusel' },
    { contenedor: '.carrusel-modulos-ind', pista: '.pestanas-modulos-ind', boton: '.boton-desplazar-carrusel' },
    { contenedor: '.carrusel-pestanas-act', pista: '.pestanas-actividad', boton: '.boton-desplazar-carrusel' },
    { contenedor: '.carrusel-pestanas-mkt', pista: '.pestanas-marketplace', boton: '.boton-desplazar-carrusel' },
  ];

  carruseles.forEach(({ contenedor, pista, boton }) => {
    document.querySelectorAll(contenedor).forEach((raiz) => {
      const pistaEl = raiz.querySelector(pista);
      const botonIzquierda = raiz.querySelector(`${boton}.izquierda`);
      const botonDerecha = raiz.querySelector(`${boton}.derecha`);
      if (!pistaEl || !botonIzquierda || !botonDerecha) return;

      const actualizarFlechas = () => {
        const maximoScroll = pistaEl.scrollWidth - pistaEl.clientWidth;
        botonIzquierda.hidden = pistaEl.scrollLeft <= 4;
        botonDerecha.hidden = pistaEl.scrollLeft >= maximoScroll - 4;
      };

      botonIzquierda.addEventListener('click', () => pistaEl.scrollBy({ left: -260, behavior: 'smooth' }));
      botonDerecha.addEventListener('click', () => pistaEl.scrollBy({ left: 260, behavior: 'smooth' }));
      pistaEl.addEventListener('scroll', actualizarFlechas);
      window.addEventListener('resize', actualizarFlechas);
      actualizarFlechas();
    });
  });
});
