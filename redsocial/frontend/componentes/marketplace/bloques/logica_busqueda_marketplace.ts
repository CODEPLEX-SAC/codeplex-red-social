import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'

export function coincideDestacado(destacado: Destacado, consulta: string) {
  return contieneTexto(destacado.nombre, consulta)
}

export function filtrarPorModulo(destacados: readonly Destacado[], modulo: string | null) {
  return modulo === null ? [...destacados] : destacados.filter((destacado) => new Set(destacado.modulos).has(modulo))
}
