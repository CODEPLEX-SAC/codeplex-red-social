import type { IconName } from '../../tipos/compartido/icono'
import type { MiLista } from '@/tipos/amigos/pagina_amigos_listas'

export const MIS_LISTAS: MiLista[] = [
  { icono: 'amigos', color: 'morado', nombre: 'Mejores amigos', cantidad: '24 amigos', avatares: 4, masAvatares: '+16', descripcion: 'Personas más cercanas con las que tengo mi confianza y comparto más.' },
  { icono: 'amigos', color: 'naranja', nombre: 'Familia', cantidad: '16 amigos', avatares: 3, masAvatares: '+8', descripcion: 'Mis familiares y personas de mi entorno familiar.' },
  { icono: 'maletin', color: 'azul', nombre: 'Trabajo', cantidad: '38 amigos', avatares: 3, masAvatares: '+30', descripcion: 'Compañeros de trabajo, colegas y contactos profesionales.' },
  { icono: 'panel', color: 'verde', nombre: 'Universidad', cantidad: '22 amigos', avatares: 4, masAvatares: '+14', descripcion: 'Personas con las que estudié y compañeros de la universidad.' },
  { icono: 'empresa', color: 'rosa', nombre: 'Clientes importantes', cantidad: '18 amigos', avatares: 3, masAvatares: '+10', descripcion: 'Clientes y contactos clave para mi negocio.' },
  { icono: 'calendario', color: 'azul-claro', nombre: 'Eventos 2024', cantidad: '31 amigos', avatares: 3, masAvatares: '+23', descripcion: 'Contactos que conocí en eventos, conferencias y reuniones.' },
]

export const LISTAS_SUGERIDAS: { icono: IconName; color: string; nombre: string; cantidad: string }[] = [
  { icono: 'maletin', color: '#7c3aed', nombre: 'Emprendedores', cantidad: '12 amigos' },
  { icono: 'mensaje', color: '#ea580c', nombre: 'Marketing Digital', cantidad: '15 amigos' },
  { icono: 'actividad', color: '#16a34a', nombre: 'Deportes', cantidad: '19 amigos' },
  { icono: 'compartir', color: '#2563eb', nombre: 'Viajes', cantidad: '11 amigos' },
]
