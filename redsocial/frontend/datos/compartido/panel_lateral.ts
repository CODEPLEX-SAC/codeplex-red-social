import type { ContactoPersona } from '../../tipos/compartido/contactos_panel'
import type { GrupoRecomendado } from '../../tipos/compartido/grupos_recomendados_panel'
import type { EventoProximo } from '../../tipos/compartido/eventos_proximos_panel'

export const CONTACTOS_SUGERIDOS: readonly ContactoPersona[] = ['Ana Torres', 'Miguel Rojas', 'José Castillo', 'Laura Pérez', 'Sofía Gómez'].map((nombre) => ({
  nombre,
  subtitulo: 'Conexión profesional',
}))

export const GRUPOS_RECOMENDADOS: readonly GrupoRecomendado[] = [
  { nombre: 'Ingenieros Civiles', miembros: '12.4 mil miembros' },
  { nombre: 'Emprendedores Perú', miembros: '8.7 mil miembros' },
  { nombre: 'Tecnología & Innovación', miembros: '5.3 mil miembros' },
]

export const EVENTOS_PROXIMOS: readonly EventoProximo[] = [
  { dia: '15', mes: 'JUN', titulo: 'Reunión de Proyectos', detalle: 'Lun, 15 jun · 10:00 AM · Oficina Principal' },
  { dia: '22', mes: 'JUN', titulo: 'Capacitación en Seguridad', detalle: 'Lun, 22 jun · 2:00 PM · Virtual' },
  { dia: '30', mes: 'JUN', titulo: 'Cumpleaños: Juan Pérez', detalle: 'Mar, 30 jun · Todo el día' },
]
