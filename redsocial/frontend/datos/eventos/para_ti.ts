import type { IconName } from '../../tipos/compartido/icono'
import type { EventoDestacado, EventoProximo } from '@/tipos/eventos/pagina_eventos_para_ti'

export const DESTACADOS: EventoDestacado[] = [
  { categoriaEtiqueta: 'Música', gradiente: 'nocturno', dia: '24', mes: 'AGO', nombre: 'Concierto Codeplex Live 2026', descripcion: 'Una noche increíble con los mejores artistas.\n¡No te lo pierdas!', fecha: 'Sáb, 24 Ago 2026', hora: '7:00 PM', ubicacion: 'Arena 1, Lima', asistentes: '+128 asistirán' },
  { categoriaEtiqueta: 'Negocios', gradiente: 'rosa-suave', dia: '10', mes: 'SEP', nombre: 'Feria de Emprendimiento Codeplex', descripcion: 'Conecta con inversionistas y emprendedores de todo el país.\nCupos limitados.', fecha: 'Jue, 10 Sep 2026', hora: '9:00 AM', ubicacion: 'Centro de Convenciones Lima', asistentes: '+95 asistirán' },
  { categoriaEtiqueta: 'Tecnología', gradiente: 'violeta-suave', dia: '03', mes: 'OCT', nombre: 'Congreso de Innovación Tecnológica', descripcion: 'Las últimas tendencias en IA, nube y transformación digital.\nCon expositores internacionales.', fecha: 'Sáb, 3 Oct 2026', hora: '8:30 AM', ubicacion: 'Universidad de Lima', asistentes: '+150 asistirán' },
  { categoriaEtiqueta: 'Deportes', gradiente: 'teal', dia: '15', mes: 'NOV', nombre: 'Maratón Codeplex 10K', descripcion: 'Corre por la ciudad y forma parte de la comunidad fitness.\nInscripciones abiertas.', fecha: 'Dom, 15 Nov 2026', hora: '6:00 AM', ubicacion: 'Circuito de Playas, Lima', asistentes: '+210 asistirán' },
]

export const PROXIMOS: EventoProximo[] = [
  { categoria: 'tecnologia', categoriaEtiqueta: 'Tecnología', nombre: 'Codeplex Tech Summit', dia: '15', mes: 'JUN', fecha: 'Jue, 15 Jun 2026', ubicacion: 'Centro de Convenciones Lima', masAsistentes: '+86' },
  { categoria: 'negocios', categoriaEtiqueta: 'Negocios', nombre: 'Networking Empresarial', dia: '22', mes: 'JUN', fecha: 'Jue, 22 Jun 2026', ubicacion: 'WeWork San Isidro', masAsistentes: '+42' },
  { categoria: 'educacion', categoriaEtiqueta: 'Educación', nombre: 'Taller de Marketing Digital', dia: '05', mes: 'JUL', fecha: 'Sáb, 5 Jul 2026', ubicacion: 'Online', masAsistentes: '+56' },
  { categoria: 'gastronomia', categoriaEtiqueta: 'Gastronomía', nombre: 'Festival Gastronómico', dia: '18', mes: 'JUL', fecha: 'Vie, 18 Jul 2026', ubicacion: 'Parque de la Exposición', masAsistentes: '+74' },
]

export const PROXIMOS_LATERAL_PARA_TI = [
  { dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', linea1: 'Jue, 15 Jun 2026 - 9:00 AM', linea2: 'Centro de Convenciones Lima', asistentes: '86' },
  { dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', linea1: 'Jue, 22 Jun 2026 - 6:00 PM', linea2: 'WeWork San Isidro', asistentes: '42' },
  { dia: '24', mes: 'AGO', nombre: 'Concierto Codeplex Live 2026', linea1: 'Sáb, 24 Ago 2026 - 7:00 PM', linea2: 'Arena 1, Lima', asistentes: '128' },
  { dia: '05', mes: 'JUL', nombre: 'Taller de Marketing Digital', linea1: 'Sáb, 5 Jul 2026 - 10:00 AM', linea2: 'Online', asistentes: '56' },
]

export const CATEGORIAS_LATERAL_PARA_TI: { icono: IconName; color: string; nombre: string; conteo: string }[] = [
  { icono: 'estrella', color: 'rosa', nombre: 'Música', conteo: '128' },
  { icono: 'panel', color: 'violeta', nombre: 'Tecnología', conteo: '95' },
  { icono: 'empresa', color: 'naranja', nombre: 'Negocios', conteo: '86' },
  { icono: 'calendario', color: 'azul', nombre: 'Educación', conteo: '74' },
  { icono: 'actividad', color: 'verde', nombre: 'Deportes', conteo: '63' },
  { icono: 'carrito', color: 'rojo', nombre: 'Gastronomía', conteo: '58' },
  { icono: 'imagen', color: 'violeta', nombre: 'Arte y cultura', conteo: '42' },
  { icono: 'configuracion', color: 'cian', nombre: 'Salud y bienestar', conteo: '38' },
]
