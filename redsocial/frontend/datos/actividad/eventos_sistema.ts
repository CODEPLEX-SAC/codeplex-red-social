import type { EventoSistema } from '@/tipos/actividad/pagina_actividad_sistema'

export const EVENTOS_SISTEMA: EventoSistema[] = [
  { titulo: 'Inicio de sesión', icono: 'inicio-sesion', color: 'verde', descripcion: 'Juan Pérez inició sesión en el sistema', detalles: ['IP: 190.123.45.67', 'Dispositivo: Chrome en Windows'], tiempo: 'Hace 15 min', estado: 'exito' },
  { titulo: 'Nuevo usuario registrado', icono: 'nuevo-usuario', color: 'azul', descripcion: 'María Fernández fue registrado como nuevo usuario', detalles: ['Rol: Contador', 'Empresa: Constructora del Norte SAC'], tiempo: 'Hace 1 hora', estado: 'info' },
  { titulo: 'Cambio de contraseña', icono: 'clave', color: 'morado', descripcion: 'Carlos Mendoza cambió su contraseña', detalles: ['IP: 181.65.23.90'], tiempo: 'Hace 2 horas', estado: 'pendiente' },
  { titulo: 'Configuración actualizada', icono: 'ajustes-sistema', color: 'naranja', descripcion: 'Se actualizaron los ajustes de la cuenta del sistema', detalles: ['Por: Sofía Ramirez'], tiempo: 'Hace 3 horas', estado: 'advertencia' },
  { titulo: 'Respaldo automático completado', icono: 'respaldo', color: 'azul', descripcion: 'Se completó el respaldo automático de la base de datos', detalles: ['Tamaño: 2.45 GB', 'Estado: Exitoso'], tiempo: 'Hace 5 horas', estado: 'exito' },
  { titulo: 'Intento de inicio de sesión fallido', icono: 'aviso-critico', color: 'rojo', descripcion: 'Intento fallido de inicio de sesión con contraseña incorrecta', detalles: ['IP: 190.123.45.67', 'Usuario: admin'], tiempo: 'Hace 6 horas', estado: 'error' },
  { titulo: 'Mantenimiento del sistema', icono: 'mantenimiento', color: 'verde', descripcion: 'Mantenimiento programado del sistema completado', detalles: ['Duración: 12 min', 'Estado: Exitoso'], tiempo: 'Ayer, 11:30 p. m.', estado: 'exito' },
]
