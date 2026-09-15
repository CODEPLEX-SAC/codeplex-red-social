import type { IconName } from '../../tipos/compartido/icono'
import type { EventoPopular } from '@/tipos/eventos/pagina_eventos_populares'

export const EVENTOS: EventoPopular[] = [
  {
    ranking: 1, categoria: 'gastronomia', categoriaEtiqueta: 'Música', nombre: 'Concierto Codeplex Live 2026',
    descripcion: 'Una noche increíble con los mejores artistas en vivo.',
    dia: '24', mes: 'AGO', fecha: 'Sáb, 24 Ago 2026', hora: '7:00 PM', ubicacion: 'Arena 1, Lima', avatares: 5, masAsistentes: '+1.2K asistirán',
  },
  {
    ranking: 2, categoria: 'tecnologia', categoriaEtiqueta: 'Tecnología', nombre: 'Codeplex Tech Summit',
    descripcion: 'Descubre las últimas tendencias en tecnología e innovación.',
    dia: '15', mes: 'JUN', fecha: 'Jue, 15 Jun 2026', hora: '9:00 AM', ubicacion: 'Centro de Convenciones Lima', avatares: 4, masAsistentes: '+856 asistirán',
  },
  {
    ranking: 3, categoria: 'negocios', categoriaEtiqueta: 'Negocios', nombre: 'Networking Empresarial',
    descripcion: 'Conecta con empresarios y profesionales de diferentes industrias.',
    dia: '22', mes: 'JUN', fecha: 'Jue, 22 Jun 2026', hora: '6:00 PM', ubicacion: 'WeWork San Isidro', avatares: 5, masAsistentes: '+642 asistirán',
  },
  {
    ranking: 4, categoria: 'gastronomia', categoriaEtiqueta: 'Gastronomía', nombre: 'Festival Gastronómico',
    descripcion: 'Disfruta de lo mejor de la gastronomía local e internacional.',
    dia: '18', mes: 'JUL', fecha: 'Vie, 18 Jul 2026', hora: '7:00 PM', ubicacion: 'Parque de la Exposición', avatares: 5, masAsistentes: '+538 asistirán',
  },
]

export const PROXIMAS_FECHAS_POPULARES: { dia: string; mes: string; nombre: string; punto: 'tecnologia' | 'negocios' | 'educacion'; detalle: string }[] = [
  { dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', punto: 'tecnologia', detalle: '9:00 AM · Centro de Convenciones Lima' },
  { dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', punto: 'negocios', detalle: '6:00 PM · WeWork San Isidro' },
  { dia: '05', mes: 'JUL', nombre: 'Taller de Marketing Digital', punto: 'educacion', detalle: '10:00 AM · Online' },
]

export const CATEGORIAS_LATERAL_POPULARES: { icono: IconName; color: string; nombre: string; conteo: string }[] = [
  { icono: 'estrella', color: 'rosa', nombre: 'Música', conteo: '128' },
  { icono: 'panel', color: 'violeta', nombre: 'Tecnología', conteo: '95' },
  { icono: 'empresa', color: 'naranja', nombre: 'Negocios', conteo: '86' },
  { icono: 'calendario', color: 'azul', nombre: 'Educación', conteo: '74' },
  { icono: 'carrito', color: 'rojo', nombre: 'Gastronomía', conteo: '58' },
  { icono: 'actividad', color: 'verde', nombre: 'Deportes', conteo: '63' },
]

export const MES_CALENDARIO_POPULARES = 'Junio 2026'
