document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-progreso]').forEach(elemento=>{elemento.style.setProperty('--progreso',`${elemento.dataset.progreso}%`)});
  const notificacion=document.querySelector('[data-notificacion]');
  const mostrarNotificacion=(mensaje)=>{if(!notificacion)return;notificacion.textContent=mensaje;notificacion.classList.add('visible');window.clearTimeout(mostrarNotificacion.temporizador);mostrarNotificacion.temporizador=window.setTimeout(()=>notificacion.classList.remove('visible'),1800)};
  document.querySelectorAll('button').forEach(boton=>{
    if(boton.type==='submit')return;
    boton.addEventListener('click',()=>{const texto=boton.textContent.trim();if(texto&& !boton.matches('[data-conversacion]')) mostrarNotificacion(`${texto} seleccionado`)});
  });
  document.querySelectorAll('[data-conversacion]').forEach((boton)=>boton.addEventListener('click',()=>{
    document.querySelectorAll('[data-conversacion]').forEach(item=>item.classList.remove('seleccionada'));boton.classList.add('seleccionada');mostrarNotificacion('Conversación seleccionada');
  }));
  document.querySelectorAll('form').forEach(formulario=>formulario.addEventListener('submit',evento=>{evento.preventDefault();mostrarNotificacion('Acción enviada correctamente')}));
  document.querySelectorAll('a[href="#"]').forEach(enlace=>enlace.addEventListener('click',evento=>{evento.preventDefault();mostrarNotificacion('Navegación disponible en la aplicación')}));
});