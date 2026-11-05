import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const maximo = catalogoInicio.medios.maximo_visibles

export function mediosVisibles(medios: MedioLocalPublicacion[]) {
  return medios.slice(0, maximo)
}

export function restantesDe(medios: MedioLocalPublicacion[]) {
  return Math.max(medios.length - maximo, 0)
}

export function imagenesDePublicacion(medios: MedioLocalPublicacion[]) {
  return medios.filter((medio) => !medio.esVideo)
}
