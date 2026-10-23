import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { FuenteOpcionesBuscables, OpcionBuscable } from '@/tipos/compartido/contrato_selector_buscable'

const MARCAS_DIACRITICAS = /\p{Diacritic}/gu
const SEPARADOR = /\s+/

export function normalizarTexto(texto: string) {
  return texto.normalize(catalogoCompartido.selector_buscable.forma_normal).replace(MARCAS_DIACRITICAS, catalogoCompartido.controles.texto_vacio).toLowerCase().trim()
}

export function buscarOpcionesLocales(opciones: OpcionBuscable[]): FuenteOpcionesBuscables {
  const indice = opciones.map((opcion) => ({ opcion, terminos: normalizarTexto(opcion.terminos) }))

  function buscar(texto: string, limite: number) {
    const palabras = normalizarTexto(texto).split(SEPARADOR).filter(Boolean)
    const coincidencias = indice.filter((entrada) => palabras.every((palabra) => entrada.terminos.includes(palabra)))
    return { opciones: coincidencias.slice(0, limite).map((entrada) => entrada.opcion), total: coincidencias.length }
  }

  return buscar
}
