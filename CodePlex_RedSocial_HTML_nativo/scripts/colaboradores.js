// Comportamiento propio de Colaboradores: el menú de acciones por fila
// y el panel de "Ver colaborador" que aparece al costado de la tabla.
document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.querySelector('.contenido-colaboradores');
  const panelDetalle = document.getElementById('panel-detalle-colaborador');
  if (!contenedor || !panelDetalle) return;

  function cerrarTodosLosMenus() {
    document.querySelectorAll('.menu-acciones-colab.abierto').forEach((menu) => menu.classList.remove('abierto'));
  }

  document.querySelectorAll('[data-abrir-menu-colab]').forEach((boton) => {
    boton.addEventListener('click', (evento) => {
      evento.stopPropagation();
      const menu = boton.closest('.menu-acciones-colab');
      const estabaAbierto = menu.classList.contains('abierto');
      cerrarTodosLosMenus();
      if (!estabaAbierto) menu.classList.add('abierto');
    });
  });

  document.querySelectorAll('[data-ver-colaborador]').forEach((boton) => {
    boton.addEventListener('click', () => {
      contenedor.classList.add('detalle-abierto');
      cerrarTodosLosMenus();
    });
  });

  const botonCerrarDetalle = document.querySelector('[data-cerrar-detalle-colab]');
  if (botonCerrarDetalle) {
    botonCerrarDetalle.addEventListener('click', () => contenedor.classList.remove('detalle-abierto'));
  }

  document.addEventListener('click', cerrarTodosLosMenus);
});
