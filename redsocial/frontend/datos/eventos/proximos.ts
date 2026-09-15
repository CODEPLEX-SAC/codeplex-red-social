import type { IconName } from '../../tipos/compartido/icono'
import type { EventoLista } from '@/tipos/eventos/pagina_eventos_proximos'

export const EVENTOS: EventoLista[] = [
  {
    categoria: 'tecnologia', categoriaEtiqueta: 'Tecnología', nombre: 'Codeplex Tech Summit',
    descripcion: 'Descubre las últimas tendencias en tecnología e innovación de la mano de expertos líderes.',
    dia: '15', mes: 'JUN', fecha: 'Jue, 15 Jun 2026', hora: '9:00 AM', ubicacion: 'Centro de Convenciones Lima', avatares: 5, masAsistentes: '+86 asistirán',
  },
  {
    categoria: 'negocios', categoriaEtiqueta: 'Negocios', nombre: 'Networking Empresarial',
    descripcion: 'Conecta con empresarios, emprendedores y profesionales de diferentes industrias.',
    dia: '22', mes: 'JUN', fecha: 'Jue, 22 Jun 2026', hora: '6:00 PM', ubicacion: 'WeWork San Isidro', avatares: 4, masAsistentes: '+42 asistirán',
  },
  {
    categoria: 'educacion', categoriaEtiqueta: 'Educación', nombre: 'Taller de Marketing Digital',
    descripcion: 'Aprende estrategias efectivas para llevar tu negocio al siguiente nivel.',
    dia: '05', mes: 'JUL', fecha: 'Sáb, 5 Jul 2026', hora: '10:00 AM', ubicacion: 'Online', avatares: 4, masAsistentes: '+56 asistirán',
  },
  {
    categoria: 'gastronomia', categoriaEtiqueta: 'Gastronomía', nombre: 'Festival Gastronómico',
    descripcion: 'Disfruta de lo mejor de la gastronomía local e internacional en un solo lugar.',
    dia: '18', mes: 'JUL', fecha: 'Vie, 18 Jul 2026', hora: '7:00 PM', ubicacion: 'Parque de la Exposición', avatares: 5, masAsistentes: '+74 asistirán',
  },
]

export const PROXIMAS_FECHAS_EVENTOS_PROXIMOS: { dia: string; mes: string; nombre: string; punto: 'tecnologia' | 'negocios' | 'educacion'; detalle: string }[] = [
  { dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', punto: 'tecnologia', detalle: '9:00 AM · Centro de Convenciones Lima' },
  { dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', punto: 'negocios', detalle: '6:00 PM · WeWork San Isidro' },
  { dia: '05', mes: 'JUL', nombre: 'Taller de Marketing Digital', punto: 'educacion', detalle: '10:00 AM · Online' },
]

export const CATEGORIAS_LATERAL_EVENTOS_PROXIMOS: { icono: IconName; color: string; nombre: string; conteo: string }[] = [
  { icono: 'estrella', color: '#ec4899', nombre: 'Música', conteo: '128' },
  { icono: 'panel', color: '#6366f1', nombre: 'Tecnología', conteo: '95' },
  { icono: 'empresa', color: '#f97316', nombre: 'Negocios', conteo: '86' },
  { icono: 'calendario', color: '#3b82f6', nombre: 'Educación', conteo: '74' },
  { icono: 'carrito', color: '#ef4444', nombre: 'Gastronomía', conteo: '58' },
  { icono: 'actividad', color: '#22c55e', nombre: 'Deportes', conteo: '63' },
]

export const MES_CALENDARIO_PROXIMOS = 'Junio 2026'
