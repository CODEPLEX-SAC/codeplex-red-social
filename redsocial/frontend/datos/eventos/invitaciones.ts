import type { InvitacionPendiente, InvitacionRespondida, EventoLateral } from '@/tipos/eventos/pagina_eventos_invitaciones'

export const PENDIENTES: InvitacionPendiente[] = [
  {
    gradiente: 'linear-gradient(135deg,#6c3ce0,#a855f7)',
    dia: '24',
    mes: 'AGO',
    categoria: 'MÚSICA',
    categoriaColor: '#6c3ce0',
    nombre: 'Concierto Codeplex Live 2026',
    descripcion: 'Una noche increíble con los mejores artistas en vivo.',
    fecha: 'Sáb, 24 Ago 2026',
    hora: '7:00 PM',
    ubicacion: 'Arena 1, Lima',
    avatares: 4,
    invitador: 'María González',
  },
  {
    gradiente: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    dia: '22',
    mes: 'JUN',
    categoria: 'NEGOCIOS',
    categoriaColor: '#ea580c',
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
    gradiente: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
    dia: '15',
    mes: 'JUN',
    categoria: 'TECNOLOGÍA',
    categoriaColor: '#3b82f6',
    nombre: 'Codeplex Tech Summit',
    fecha: 'Jue, 15 Jun 2026',
    hora: '9:00 AM',
    ubicacion: 'Centro de Convenciones Lima',
    estado: 'aceptada',
  },
  {
    gradiente: 'linear-gradient(135deg,#10b981,#34d399)',
    dia: '05',
    mes: 'JUL',
    categoria: 'EDUCACIÓN',
    categoriaColor: '#10b981',
    nombre: 'Taller de Marketing Digital',
    fecha: 'Sáb, 5 Jul 2026',
    hora: '10:00 AM',
    ubicacion: 'Online',
    estado: 'aceptada',
  },
  {
    gradiente: 'linear-gradient(135deg,#ec4899,#f43f5e)',
    dia: '10',
    mes: 'MAY',
    categoria: 'GASTRONOMÍA',
    categoriaColor: '#ec4899',
    nombre: 'Festival Gastronómico',
    fecha: 'Dom, 10 May 2026',
    hora: '12:00 PM',
    ubicacion: 'Parque de la Exposición',
    estado: 'rechazada',
  },
]

export const PROXIMOS_LATERAL: EventoLateral[] = [
  { gradiente: 'linear-gradient(135deg,#6c3ce0,#a855f7)', dia: '24', mes: 'AGO', nombre: 'Concierto Codeplex Live 2026', fechaHora: 'Sáb, 24 Ago 2026 · 7:00 PM', asistentes: '1.2K asistirán' },
  { gradiente: 'linear-gradient(135deg,#3b82f6,#06b6d4)', dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', fechaHora: 'Jue, 15 Jun 2026 · 9:00 AM', asistentes: '856 asistirán' },
  { gradiente: 'linear-gradient(135deg,#f59e0b,#ef4444)', dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', fechaHora: 'Jue, 22 Jun 2026 · 6:00 PM', asistentes: '642 asistirán' },
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
