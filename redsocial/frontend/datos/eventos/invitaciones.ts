import type { InvitacionPendiente, InvitacionRespondida, EventoLateral } from '@/tipos/eventos/pagina_eventos_invitaciones'

export const PENDIENTES: InvitacionPendiente[] = [
  {
    gradiente: 'morado',
    dia: '24',
    mes: 'AGO',
    categoria: 'MÚSICA',
    categoriaColor: 'morado',
    nombre: 'Concierto Codeplex Live 2026',
    descripcion: 'Una noche increíble con los mejores artistas en vivo.',
    fecha: 'Sáb, 24 Ago 2026',
    hora: '7:00 PM',
    ubicacion: 'Arena 1, Lima',
    avatares: 4,
    invitador: 'María González',
  },
  {
    gradiente: 'calido',
    dia: '22',
    mes: 'JUN',
    categoria: 'NEGOCIOS',
    categoriaColor: 'naranja',
    nombre: 'Networking Empresarial',
    descripcion: 'Conecta con empresarios y profesionales de diferentes industrias.',
    fecha: 'Jue, 22 Jun 2026',
    hora: '6:00 PM',
    ubicacion: 'WeWork San Isidro',
    avatares: 1,
    invitador: 'Carlos Mendoza',
  },
]

export const RESPONDIDAS: InvitacionRespondida[] = [
  {
    gradiente: 'azul',
    dia: '15',
    mes: 'JUN',
    categoria: 'TECNOLOGÍA',
    categoriaColor: 'azul',
    nombre: 'Codeplex Tech Summit',
    fecha: 'Jue, 15 Jun 2026',
    hora: '9:00 AM',
    ubicacion: 'Centro de Convenciones Lima',
    estado: 'aceptada',
  },
  {
    gradiente: 'verde',
    dia: '05',
    mes: 'JUL',
    categoria: 'EDUCACIÓN',
    categoriaColor: 'verde',
    nombre: 'Taller de Marketing Digital',
    fecha: 'Sáb, 5 Jul 2026',
    hora: '10:00 AM',
    ubicacion: 'Online',
    estado: 'aceptada',
  },
  {
    gradiente: 'rosa',
    dia: '10',
    mes: 'MAY',
    categoria: 'GASTRONOMÍA',
    categoriaColor: 'rosa',
    nombre: 'Festival Gastronómico',
    fecha: 'Dom, 10 May 2026',
    hora: '12:00 PM',
    ubicacion: 'Parque de la Exposición',
    estado: 'rechazada',
  },
]

export const PROXIMOS_LATERAL: EventoLateral[] = [
  { gradiente: 'morado', dia: '24', mes: 'AGO', nombre: 'Concierto Codeplex Live 2026', fechaHora: 'Sáb, 24 Ago 2026 · 7:00 PM', asistentes: '1.2K asistirán' },
  { gradiente: 'azul', dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', fechaHora: 'Jue, 15 Jun 2026 · 9:00 AM', asistentes: '856 asistirán' },
  { gradiente: 'calido', dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', fechaHora: 'Jue, 22 Jun 2026 · 6:00 PM', asistentes: '642 asistirán' },
]

export const MES_CALENDARIO_INVITACIONES = 'Junio 2026'

export const RESUMEN_INVITACIONES: { valor: string; etiqueta: string }[] = [
  { valor: '4', etiqueta: 'Eventos creados' },
  { valor: '3.3K', etiqueta: 'Asistentes totales' },
  { valor: '79%', etiqueta: 'Prom. confirmación' },
]

export const CONTEO_PESTANAS_INVITACIONES = {
  todas: 2,
  pendientes: 2,
}
