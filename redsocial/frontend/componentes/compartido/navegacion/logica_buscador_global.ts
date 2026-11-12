import { normalizarTexto } from '../interfaz/buscar_opciones_locales'
import { contieneTexto } from '../interfaz/fuente_busqueda_local'
import type { NombreResaltado, UsuarioDirectorio } from '@/tipos/compartido/contrato_directorio_usuarios'

export function buscarUsuarios(directorio: readonly UsuarioDirectorio[], consulta: string, maximo: number): UsuarioDirectorio[] {
  const buscada = normalizarTexto(consulta)
  if (buscada === String()) return []
  const coincidentes = directorio.filter((usuario) => contieneTexto(usuario.nombre, buscada))
  const alInicio = coincidentes.filter((usuario) => normalizarTexto(usuario.nombre).startsWith(buscada))
  const alResto = coincidentes.filter((usuario) => !normalizarTexto(usuario.nombre).startsWith(buscada))
  return [...alInicio, ...alResto].slice(0, maximo)
}

export function resaltarNombre(nombre: string, consulta: string): NombreResaltado {
  const buscada = normalizarTexto(consulta)
  const posicion = normalizarTexto(nombre).indexOf(buscada)
  if (posicion !== 0 || buscada === String()) return { coincidencia: String(), resto: nombre }
  return { coincidencia: nombre.slice(0, buscada.length), resto: nombre.slice(buscada.length) }
}
