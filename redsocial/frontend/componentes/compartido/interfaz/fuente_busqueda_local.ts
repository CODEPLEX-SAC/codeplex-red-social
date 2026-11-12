import { normalizarTexto } from './buscar_opciones_locales'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'

export function contieneTexto(texto: string, consulta: string): boolean {
  return normalizarTexto(texto).includes(normalizarTexto(consulta))
}

export function coincideNombre(elemento: { nombre: string }, consulta: string): boolean {
  return contieneTexto(elemento.nombre, consulta)
}

function aplicarFiltros<T, F>(elementos: readonly T[], admite: ((elemento: T, filtros: F) => boolean) | undefined, filtros: F | undefined) {
  if (!admite || filtros === undefined) return elementos
  return elementos.filter((elemento) => admite(elemento, filtros))
}

export function crearFuenteLocal<T, F = undefined>(
  elementos: readonly T[],
  coincide: (elemento: T, consulta: string) => boolean,
  admite?: (elemento: T, filtros: F) => boolean,
): FuenteBusqueda<T, F> {
  const buscar: FuenteBusqueda<T, F> = (consulta, _limite, filtros) => {
    const admitidos = aplicarFiltros(elementos, admite, filtros)
    if (consulta === String()) return { elementos: admitidos, total: admitidos.length }
    const encontrados = admitidos.filter((elemento) => coincide(elemento, consulta))
    return { elementos: encontrados, total: encontrados.length }
  }
  return buscar
}
