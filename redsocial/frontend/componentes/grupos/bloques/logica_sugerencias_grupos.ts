import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import type { GrupoSugerido } from '@/tipos/grupos/contrato_tus_grupos'

export function coincideGrupoSugerido(grupo: GrupoSugerido, texto: string, categoria: string): boolean {
  const coincideNombre = contieneTexto(grupo.nombre, texto)
  const coincideCategoria = categoria === String() || grupo.categoria === categoria
  return coincideNombre && coincideCategoria
}
