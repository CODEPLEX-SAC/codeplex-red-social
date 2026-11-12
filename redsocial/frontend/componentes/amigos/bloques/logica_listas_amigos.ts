import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { ListaAmigos } from '@/tipos/amigos/modelo_amigos_listas'

const textos = catalogoAmigos.listas
const AVATARES_VISIBLES = 4

export function textoCantidad(cantidad: number): string {
  if (cantidad === 1) return textos.cantidad_una
  return textos.cantidad_varias.replace(':n', String(cantidad))
}

export function resumenDeAvatares(cantidad: number) {
  const visibles = Math.min(cantidad, AVATARES_VISIBLES)
  const resto = cantidad - visibles
  return { visibles, resto: resto > 0 ? `+${resto}` : String() }
}

export function siguienteIdLista(listas: readonly ListaAmigos[]): string {
  const usados = listas.map((lista) => Number(lista.id.split('-').pop())).filter(Number.isFinite)
  return `lista-nueva-${Math.max(0, ...usados) + 1}`
}

export function nombreRepetido(listas: readonly ListaAmigos[], nombre: string, ignorarId?: string): boolean {
  const buscado = nombre.trim().toLowerCase()
  return listas.some((lista) => lista.id !== ignorarId && lista.nombre.toLowerCase() === buscado)
}
