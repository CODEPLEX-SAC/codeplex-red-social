import { leerEdicionesPerfil } from './almacen_perfil'
import { completarPerfil } from './completar_perfil'
import datos from './perfiles.json'
import type { PerfilBase, PerfilUsuario } from '@/tipos/perfil/modelo_perfil'

const PERFILES_BASE = datos.perfiles as readonly PerfilBase[]
const SEPARADOR = datos.separadorUbicacion

export const PERFILES_USUARIO: readonly PerfilUsuario[] = PERFILES_BASE.map((base) => completarPerfil(base, SEPARADOR))

export function buscarPerfil(id?: string | null): PerfilUsuario | undefined {
  const base = PERFILES_BASE.find((perfil) => perfil.id === id)
  return base ? completarPerfil(base, SEPARADOR, leerEdicionesPerfil()[base.id]) : undefined
}

export function amigosDe(perfil?: PerfilUsuario): PerfilUsuario[] {
  const ids = perfil?.amigos ?? []
  return ids.flatMap((id) => buscarPerfil(id) ?? [])
}

export function sonAmigos(perfil: PerfilUsuario, otroId?: string): boolean {
  return otroId !== undefined && perfil.amigos.includes(otroId)
}

export function contarAmigosEnComun(perfil: PerfilUsuario, otro?: PerfilUsuario): number {
  const amigosDelOtro = new Set(otro?.amigos ?? [])
  return perfil.amigos.filter((id) => amigosDelOtro.has(id)).length
}
