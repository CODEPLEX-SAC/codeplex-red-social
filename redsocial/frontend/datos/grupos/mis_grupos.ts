import type { IconName } from '../../tipos/compartido/icono'
import type { GrupoAdmin, GrupoMis } from '@/tipos/grupos/pagina_grupos_mis_grupos'

export const GRUPOS_ADMIN: GrupoAdmin[] = [
  { nombre: 'Equipo Codeplex', icono: 'amigos', color: 'morado', tipo: 'Grupo privado · 25 miembros', descripcion: 'Equipo interno de Codeplex para coordinar proyectos, compartir información y mantenernos alineados.', masAvatares: '+18' },
  { nombre: 'Proyecto Alfa', icono: 'maletin', color: 'naranja', tipo: 'Grupo privado · 12 miembros', descripcion: 'Colaboración y seguimiento del proyecto Alfa para su implementación y crecimiento.', masAvatares: '+5' },
]

export const MIS_GRUPOS: GrupoMis[] = [
  { nombre: 'Programación Go', icono: 'cuadricula', color: 'morado', tipo: 'Grupo privado · 85 miembros', descripcion: 'Comunidad para desarrolladores que usan Go en sus proyectos.', masAvatares: '+62' },
  { nombre: 'Ideas y Feedback', icono: 'sentimiento', color: 'azul', tipo: 'Grupo privado · 34 miembros', descripcion: 'Comparte tus ideas y mejora nuestros productos.', masAvatares: '+21' },
  { nombre: 'Contadores Perú', icono: 'estadisticas', color: 'morado', tipo: 'Grupo público · 1.2K miembros', descripcion: 'Comunidad de contadores y asesores de todo el Perú.', masAvatares: '+342' },
  { nombre: 'Marketing Digital LATAM', icono: 'campana', color: 'rosa', tipo: 'Grupo público · 9.5K miembros', descripcion: 'Estrategias, herramientas y tendencias de marketing digital en LATAM.', masAvatares: '+2.4K' },
  { nombre: 'Desarrollo Personal', icono: 'me-gusta', color: 'verde', tipo: 'Grupo privado · 25 miembros', descripcion: 'Crecimiento personal, hábitos y mejores prácticas.', masAvatares: '+8' },
  { nombre: 'Viajes y Aventuras', icono: 'video', color: 'amarillo', tipo: 'Grupo privado · 18 miembros', descripcion: 'Comparte experiencias, consejos y destinos increíbles.', masAvatares: '+3' },
]

export const ACTIVIDAD_MIS_GRUPOS: { nombre: string; accion: string; grupo: string; tiempo: string; icono: IconName; color: 'morado' | 'rosa' | 'azul' | 'naranja' | 'verde' }[] = [
  { nombre: 'Carlos Herrera', accion: 'publicó en', grupo: 'Equipo Codeplex', tiempo: 'Hace 1 hora', icono: 'grupos', color: 'morado' },
  { nombre: 'María Fernández', accion: 'publicó en', grupo: 'Marketing Digital LATAM', tiempo: 'Hace 3 horas', icono: 'campana', color: 'rosa' },
  { nombre: 'Luis Rodríguez', accion: 'comentó en', grupo: 'Programación Go', tiempo: 'Hace 5 horas', icono: 'comentario', color: 'azul' },
  { nombre: 'Ana García', accion: 'publicó en', grupo: 'Proyecto Alfa', tiempo: 'Hace 1 día', icono: 'maletin', color: 'naranja' },
  { nombre: 'Diego Mendoza', accion: 'se unió a', grupo: 'Ideas y Feedback', tiempo: 'Hace 2 días', icono: 'grupos', color: 'verde' },
]

export const GRUPOS_POPULARES: { nombre: string; color: 'morado' | 'rosa' | 'verde' | 'azul'; tipo: string }[] = [
  { nombre: 'Emprendedores Perú', color: 'morado', tipo: 'Público · 12.4K miembros' },
  { nombre: 'Diseño UI/UX', color: 'rosa', tipo: 'Público · 8.7K miembros' },
  { nombre: 'Finanzas Personales', color: 'verde', tipo: 'Público · 15.2K miembros' },
  { nombre: 'Inteligencia Artificial', color: 'azul', tipo: 'Público · 22.1K miembros' },
]
