import type { EventoOrganizas, EventoLateral } from '@/tipos/eventos/pagina_eventos_mis_eventos'

export const EVENTOS_ORGANIZAS: EventoOrganizas[] = [
  {
    gradiente: 'linear-gradient(135deg,#6c3ce0,#a855f7)', dia: '24', mes: 'AGO', estado: 'publicado',
    nombre: 'Concierto Codeplex Live 2026', fecha: 'Sáb, 24 Ago 2026', hora: '7:00 PM', ubicacion: 'Arena 1, Lima',
    pieDerecho: { tipo: 'stats', asistentesTexto: '1.2K asistentes', statValor: '1.2K', statPct: '83%' },
  },
  {
    gradiente: 'linear-gradient(135deg,#3b82f6,#06b6d4)', dia: '15', mes: 'JUN', estado: 'publicado',
    nombre: 'Codeplex Tech Summit', fecha: 'Jue, 15 Jun 2026', hora: '9:00 AM', ubicacion: 'Centro de Convenciones Lima',
    pieDerecho: { tipo: 'stats', asistentesTexto: '856 asistentes', statValor: '856', statPct: '78%' },
  },
  {
    gradiente: 'linear-gradient(135deg,#f59e0b,#ef4444)', dia: '22', mes: 'JUN', estado: 'publicado',
    nombre: 'Networking Empresarial', fecha: 'Jue, 22 Jun 2026', hora: '6:00 PM', ubicacion: 'WeWork San Isidro',
    pieDerecho: { tipo: 'stats', asistentesTexto: '642 asistentes', statValor: '642', statPct: '72%' },
  },
  {
    gradiente: 'linear-gradient(135deg,#10b981,#34d399)', dia: '05', mes: 'JUL', estado: 'borrador',
    nombre: 'Taller de Marketing Digital', fecha: 'Sáb, 5 Jul 2026', hora: '10:00 AM', ubicacion: 'Online',
    pieDerecho: { tipo: 'borrador' },
  },
]

export const EVENTO_COLABORAS: EventoOrganizas = {
  gradiente: 'linear-gradient(135deg,#ec4899,#f43f5e)', dia: '18', mes: 'JUL', estado: 'colaborador',
  nombre: 'Festival Gastronómico', fecha: 'Vie, 18 Jul 2026', hora: '7:00 PM', ubicacion: 'Parque de la Exposición',
  pieDerecho: { tipo: 'colaborador', organizador: 'Organizado por: Municipalidad de Lima', statValor: '538', statPct: '81%' },
}

export const PROXIMOS_LATERAL: EventoLateral[] = [
  { gradiente: 'linear-gradient(135deg,#6c3ce0,#a855f7)', dia: '24', mes: 'AGO', nombre: 'Concierto Codeplex Live 2026', fechaHora: 'Sáb, 24 Ago 2026 · 7:00 PM', ubicacion: 'Arena 1, Lima', asistentes: '1.2K asistirán' },
  { gradiente: 'linear-gradient(135deg,#3b82f6,#06b6d4)', dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', fechaHora: 'Jue, 15 Jun 2026 · 9:00 AM', asistentes: '856 asistirán' },
  { gradiente: 'linear-gradient(135deg,#f59e0b,#ef4444)', dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', fechaHora: 'Jue, 22 Jun 2026 · 6:00 PM', asistentes: '642 asistirán' },
]

export const MES_CALENDARIO_MIS_EVENTOS = 'Junio 2026'

export const RESUMEN_MIS_EVENTOS: { valor: string; etiqueta: string }[] = [
  { valor: '4', etiqueta: 'Eventos creados' },
  { valor: '3.3K', etiqueta: 'Asistentes totales' },
  { valor: '79%', etiqueta: 'Prom. confirmación' },
]
