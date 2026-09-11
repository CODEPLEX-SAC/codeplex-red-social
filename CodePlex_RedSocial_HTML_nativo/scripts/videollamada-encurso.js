document.addEventListener('DOMContentLoaded', () => {
  const cuerpo = document.querySelector('.cuerpo-llamada-encurso');
  if (!cuerpo) return;

  const abrir = () => cuerpo.classList.add('participantes-abiertos');
  const cerrar = () => cuerpo.classList.remove('participantes-abiertos');

  document.querySelectorAll('[data-abrir-participantes]').forEach((boton) => {
    boton.addEventListener('click', abrir);
  });
  document.querySelectorAll('[data-cerrar-participantes]').forEach((el) => {
    el.addEventListener('click', cerrar);
  });

  // Micrófono / cámara: alternan su propio estado "activo" al hacer clic.
  document.querySelectorAll('[data-alternar-control]').forEach((boton) => {
    boton.addEventListener('click', () => boton.classList.toggle('activo'));
  });
});
