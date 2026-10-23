import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'

const MARCAS_DIACRITICAS = new RegExp(catalogoMarketplace.busqueda.marcas_diacriticas, 'gu')
const VACIO = catalogoCompartido.controles.texto_vacio

function normalizar(texto: string) {
  return texto.normalize(catalogoMarketplace.busqueda.normalizacion).replace(MARCAS_DIACRITICAS, VACIO).toLowerCase().trim()
}

export function coincideDestacado(destacado: Destacado, termino: string) {
  const buscado = normalizar(termino)
  return [destacado.nombre, destacado.categoria, destacado.descripcion, destacado.publicador].some((campo) => normalizar(campo).includes(buscado))
}

export function filtrarDestacados(destacados: Destacado[], termino: string) {
  return normalizar(termino) === VACIO ? destacados : destacados.filter((destacado) => coincideDestacado(destacado, termino))
}
