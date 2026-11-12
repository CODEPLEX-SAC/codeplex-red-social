import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import type { OrdenTusGrupos, TuGrupo } from '@/tipos/grupos/contrato_tus_grupos'

function comparar(orden: OrdenTusGrupos, a: TuGrupo, b: TuGrupo): number {
  if (a.fijado !== b.fijado) return a.fijado ? -1 : 1
  if (orden === 'nombre') return a.nombre.localeCompare(b.nombre)
  if (orden === 'antiguos') return b.diasVisita - a.diasVisita
  return a.diasVisita - b.diasVisita
}

export function filtrarYOrdenar(grupos: readonly TuGrupo[], texto: string, orden: OrdenTusGrupos): TuGrupo[] {
  return grupos.filter((grupo) => contieneTexto(grupo.nombre, texto)).sort((a, b) => comparar(orden, a, b))
}

export function paginar<T>(elementos: readonly T[], pagina: number, tamano: number): T[] {
  return elementos.slice((pagina - 1) * tamano, pagina * tamano)
}

export function totalPaginas(cantidad: number, tamano: number): number {
  return Math.max(1, Math.ceil(cantidad / tamano))
}
