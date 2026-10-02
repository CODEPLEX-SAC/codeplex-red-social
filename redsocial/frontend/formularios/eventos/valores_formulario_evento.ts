import type { EventoOrganizas } from '@/tipos/eventos/modelo_eventos_mis_eventos'
import type { ValoresFormularioEvento } from './modelo_formulario_evento'

export const VALORES_VACIOS_EVENTO: ValoresFormularioEvento = {
  titulo: String(),
  descripcion: String(),
  categoria: String(),
  tipo: String(),
  ubicacion: String(),
  modalidad: String(),
  costo: String(),
  limiteActivo: false,
  limite: null,
  imagenes: [],
  imagenActualVisible: false,
  enlace: String(),
  etiquetas: String(),
  inscripciones: false,
  calendarioPublico: false,
  comentarios: false,
}

export function valoresDeEvento(evento: EventoOrganizas): ValoresFormularioEvento {
  const detalle = evento.edicion
  return {
    titulo: evento.nombre,
    descripcion: detalle?.descripcion ?? VALORES_VACIOS_EVENTO.descripcion,
    categoria: detalle?.categoria ?? VALORES_VACIOS_EVENTO.categoria,
    tipo: detalle?.tipo ?? VALORES_VACIOS_EVENTO.tipo,
    ubicacion: detalle?.ubicacion ?? VALORES_VACIOS_EVENTO.ubicacion,
    modalidad: detalle?.modalidad ?? VALORES_VACIOS_EVENTO.modalidad,
    costo: detalle?.costo ?? VALORES_VACIOS_EVENTO.costo,
    limiteActivo: detalle?.limiteActivo ?? VALORES_VACIOS_EVENTO.limiteActivo,
    limite: detalle?.limite ?? VALORES_VACIOS_EVENTO.limite,
    imagenes: VALORES_VACIOS_EVENTO.imagenes,
    imagenActualVisible: true,
    enlace: detalle?.enlace ?? VALORES_VACIOS_EVENTO.enlace,
    etiquetas: detalle?.etiquetas ?? VALORES_VACIOS_EVENTO.etiquetas,
    inscripciones: detalle?.permitirInscripciones ?? VALORES_VACIOS_EVENTO.inscripciones,
    calendarioPublico: detalle?.mostrarCalendario ?? VALORES_VACIOS_EVENTO.calendarioPublico,
    comentarios: detalle?.permitirComentarios ?? VALORES_VACIOS_EVENTO.comentarios,
  }
}
