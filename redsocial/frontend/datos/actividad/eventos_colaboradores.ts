import type { EventoColaborador } from '@/tipos/actividad/pagina_actividad_colaboradores'

export const EVENTOS_COLABORADOR: EventoColaborador[] = [
  { nombre: 'María Fernández', icono: 'nuevo-usuario', color: 'verde', accion: ' se unió a la empresa ', destino: 'Constructora del Norte SAC', tiempo: '2 horas', boton: 'Ver perfil' },
  { nombre: 'Carlos Mendoza', icono: 'estrella', color: 'azul', accion: ' fue promovido a ', destino: 'Gerente de Proyectos', detalle: 'antes fue Jefe de Proyectos', tiempo: '5 horas', boton: 'Ver perfil' },
  { nombre: 'Lucía Gómez', icono: 'intercambio', color: 'verde', accion: ' cambió de rol', detalle: 'ahora es Analista Senior de Marketing', tiempo: '1 día', boton: 'Ver perfil' },
  { nombre: 'Diego Torres', icono: 'despedida', color: 'rojo', accion: ' dejó la empresa', detalle: 'hasta ayer fue Soporte Técnico', tiempo: '2 días', boton: 'Ver perfil' },
  { nombre: 'Sofía Ramírez', icono: 'nuevo-usuario', color: 'verde', accion: ' se unió a tu grupo ', destino: 'Ingeniería Civil', tiempo: '3 días', boton: 'Ver grupo', irAGrupos: true },
  { nombre: 'Jorge Luis', icono: 'estrella', color: 'azul', accion: ' fue promovido a ', destino: 'Líder de Desarrollo', detalle: 'antes fue Desarrollador Senior', tiempo: '4 días', boton: 'Ver perfil' },
]
