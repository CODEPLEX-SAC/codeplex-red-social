import type { IconName } from '../../tipos/compartido/icono'
import type { GrupoDestacado, ColorCategoria } from '@/tipos/grupos/pagina_grupos_descubrir'

export const DESTACADOS: GrupoDestacado[] = [
  { nombre: 'Emprendedores Perú', icono: 'amigos', fondo: 'azul-oscuro', overlay: 'morado', tipo: 'Público · 12.4K miembros', descripcion: 'Comunidad para emprendedores y dueños de negocio en Perú.' },
  { nombre: 'Construcción e Ingeniería', icono: 'maletin', fondo: 'naranja', overlay: 'naranja', tipo: 'Público · 8.7K miembros', descripcion: 'Profesionales del sector construcción compartiendo conocimiento.' },
  { nombre: 'Desarrolladores Codeplex', icono: 'cuadricula', fondo: 'violeta', overlay: 'violeta', tipo: 'Privado · 3.2K miembros', descripcion: 'Grupo para desarrolladores que usan Codeplex y comparten soluciones.' },
  { nombre: 'Marketing Digital LATAM', icono: 'campana', fondo: 'rosa-oscuro', overlay: 'rosa', tipo: 'Público · 9.5K miembros', descripcion: 'Estrategias, herramientas y tendencias de marketing digital en LATAM.' },
]

export const CATEGORIAS: { icono: IconName; color: ColorCategoria; nombre: string; cantidad: string }[] = [
  { icono: 'maletin', color: 'morado', nombre: 'Negocios', cantidad: '124 grupos' },
  { icono: 'cuadricula', color: 'azul', nombre: 'Tecnología', cantidad: '98 grupos' },
  { icono: 'amigos', color: 'verde', nombre: 'Educación', cantidad: '76 grupos' },
  { icono: 'campana', color: 'rosa', nombre: 'Marketing', cantidad: '65 grupos' },
  { icono: 'estadisticas', color: 'naranja', nombre: 'Finanzas', cantidad: '58 grupos' },
  { icono: 'usuarios', color: 'rojo', nombre: 'Recursos Humanos', cantidad: '42 grupos' },
  { icono: 'me-gusta', color: 'verde', nombre: 'Salud y Bienestar', cantidad: '38 grupos' },
  { icono: 'sentimiento', color: 'rosa', nombre: 'Diseño', cantidad: '33 grupos' },
  { icono: 'moneda', color: 'cyan', nombre: 'Ventas', cantidad: '29 grupos' },
  { icono: 'panel', color: 'azul', nombre: 'Legal', cantidad: '27 grupos' },
  { icono: 'me-gusta', color: 'morado', nombre: 'Desarrollo Personal', cantidad: '25 grupos' },
  { icono: 'puntos', color: 'naranja', nombre: 'Otros', cantidad: '50+ grupos' },
]

export const MIS_GRUPOS_LATERAL: { nombre: string; color: 'morado' | 'naranja' | 'verde' | 'azul' | 'rosa'; admin?: boolean; miembros: string }[] = [
  { nombre: 'Equipo Codeplex', color: 'morado', admin: true, miembros: '25 miembros' },
  { nombre: 'Proyecto Alfa', color: 'naranja', miembros: '12 miembros' },
  { nombre: 'Programación Go', color: 'verde', miembros: '85 miembros' },
  { nombre: 'Ideas y Feedback', color: 'azul', miembros: '34 miembros' },
  { nombre: 'Contadores Perú', color: 'rosa', miembros: '1.2K miembros' },
]

export const ACTIVIDAD_DESCUBRIR: { nombre: string; accion: string; grupo: string; tiempo: string }[] = [
  { nombre: 'Carlos Herrera', accion: 'publicó en', grupo: 'Emprendedores Perú', tiempo: 'Hace 1 hora' },
  { nombre: 'María Fernández', accion: 'publicó en', grupo: 'Construcción e Ingeniería', tiempo: 'Hace 3 horas' },
  { nombre: 'Luis Rodríguez', accion: 'comentó en', grupo: 'Desarrolladores Codeplex', tiempo: 'Hace 5 horas' },
  { nombre: 'Ana García', accion: 'se unió a', grupo: 'Marketing Digital LATAM', tiempo: 'Hace 1 día' },
]
