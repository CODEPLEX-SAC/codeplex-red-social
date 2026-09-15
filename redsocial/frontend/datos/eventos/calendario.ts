import type { CeldaCal, EventoLateral } from '@/tipos/eventos/pagina_eventos_calendario'

export const CELDAS: CeldaCal[] = [
  { numero: 29, otroMes: true }, { numero: 30, otroMes: true }, { numero: 31, otroMes: true },
  { numero: 1 },
  { numero: 2, evento: { hora: '7:00 PM', nombre: 'Concierto Live 2026', color: 'musica' } },
  { numero: 3 }, { numero: 4 },

  { numero: 5 }, { numero: 6 },
  { numero: 7, evento: { hora: '9:00 AM', nombre: 'Codeplex Tech Summit', color: 'tecnologia' } },
  { numero: 8 }, { numero: 9 },
  { numero: 10, evento: { hora: '10:00 AM', nombre: 'Taller de Marketing', color: 'negocios' } },
  { numero: 11 },

  { numero: 12 }, { numero: 13 }, { numero: 14 },
  { numero: 15, hoy: true, evento: { hora: '9:00 AM', nombre: 'Reunión de Planificación', color: 'empresa' }, masTexto: '+ 1 más' },
  { numero: 16 },
  { numero: 17, evento: { hora: '6:00 PM', nombre: 'Networking Empresarial', color: 'negocios' } },
  { numero: 18 },

  { numero: 19 },
  { numero: 20, evento: { hora: '12:00 PM', nombre: 'Almuerzo de Negocios', color: 'negocios' } },
  { numero: 21, evento: { hora: '6:00 PM', nombre: 'Webinar: IA en Negocios', color: 'tecnologia' } },
  { numero: 22 },
  { numero: 24, evento: { hora: '7:30 PM', nombre: 'Cena Anual Codeplex', color: 'empresa' } },
  { numero: 25 }, { numero: 26 },

  { numero: 26 }, { numero: 27 },
  { numero: 28, evento: { hora: '9:00 AM', nombre: 'Capacitación Interna', color: 'educacion' } },
  { numero: 29 }, { numero: 30 },
  { numero: 1, otroMes: true }, { numero: 2, otroMes: true },
]

export const PROXIMOS_LATERAL: EventoLateral[] = [
  { gradiente: 'morado', dia: '24', mes: 'AGO', nombre: 'Concierto Codeplex Live 2026', fechaHora: 'Sáb, 24 Ago 2026 · 7:00 PM', ubicacion: 'Arena1, Lima', asistentes: '1.2K asistirán' },
  { gradiente: 'azul', dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', fechaHora: 'Jue, 15 Jun 2026 · 9:00 AM', ubicacion: 'Centro de Convenciones Lima', asistentes: '856 asistirán' },
  { gradiente: 'calido', dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', fechaHora: 'Jue, 22 Jun 2026 · 6:00 PM', ubicacion: 'WeWork San Isidro', asistentes: '642 asistirán' },
]

export const MES_CALENDARIO_ACTUAL = 'Junio 2026'

export const LEYENDA_CALENDARIO: { color: string; nombre: string }[] = [
  { color: 'musica', nombre: 'Música' },
  { color: 'tecnologia', nombre: 'Tecnología' },
  { color: 'negocios', nombre: 'Negocios' },
  { color: 'educacion', nombre: 'Educación' },
  { color: 'reuniones', nombre: 'Reuniones' },
  { color: 'otros', nombre: 'Otros' },
]
