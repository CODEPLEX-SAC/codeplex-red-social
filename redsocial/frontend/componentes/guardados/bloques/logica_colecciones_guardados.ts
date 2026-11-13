import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import type { ColeccionGuardada, GrupoGuardado } from '@/tipos/guardados/modelo_guardados'
import type { ParametrosFiltroGruposGuardados } from '@/tipos/guardados/contrato_logica_guardados'

const nueva = catalogoGuardados.coleccion_nueva as Pick<ColeccionGuardada, 'icono' | 'color'>

function normalizar(texto: string): string {
  return texto.trim().toLowerCase()
}

function reemplazar(colecciones: readonly ColeccionGuardada[], id: string, cambio: (coleccion: ColeccionGuardada) => ColeccionGuardada): ColeccionGuardada[] {
  return colecciones.map((coleccion) => (coleccion.id === id ? cambio(coleccion) : coleccion))
}

export function estaIncluido(coleccion: ColeccionGuardada, grupoId: string): boolean {
  return coleccion.grupos.includes(grupoId)
}

function conGrupo(coleccion: ColeccionGuardada, grupoId: string): ColeccionGuardada {
  if (estaIncluido(coleccion, grupoId)) return coleccion
  return { ...coleccion, grupos: [...coleccion.grupos, grupoId] }
}

function sinGrupo(coleccion: ColeccionGuardada, grupoId: string): ColeccionGuardada {
  return { ...coleccion, grupos: coleccion.grupos.filter((actual) => actual !== grupoId) }
}

export function nombreDisponible(colecciones: readonly ColeccionGuardada[], nombre: string, exceptoId?: string): boolean {
  const buscado = normalizar(nombre)
  const ocupados = new Set(colecciones.filter((coleccion) => coleccion.id !== exceptoId).map((coleccion) => normalizar(coleccion.nombre)))
  return buscado !== String() && !ocupados.has(buscado)
}

export function agregarColeccion(colecciones: readonly ColeccionGuardada[], nombre: string): ColeccionGuardada[] {
  if (!nombreDisponible(colecciones, nombre)) return [...colecciones]
  const id = `${catalogoGuardados.coleccion_prefijo_id}${Date.now()}-${colecciones.length}`
  return [...colecciones, { id, ...nueva, nombre: nombre.trim(), grupos: [] }]
}

export function renombrarColeccion(colecciones: readonly ColeccionGuardada[], id: string, nombre: string): ColeccionGuardada[] {
  if (!nombreDisponible(colecciones, nombre, id)) return [...colecciones]
  return reemplazar(colecciones, id, (coleccion) => ({ ...coleccion, nombre: nombre.trim() }))
}

export function eliminarColeccion(colecciones: readonly ColeccionGuardada[], id: string): ColeccionGuardada[] {
  return colecciones.filter((coleccion) => coleccion.id !== id)
}

export function agregarGrupoAColeccion(colecciones: readonly ColeccionGuardada[], id: string, grupoId: string): ColeccionGuardada[] {
  return reemplazar(colecciones, id, (coleccion) => conGrupo(coleccion, grupoId))
}

export function quitarGrupoDeColeccion(colecciones: readonly ColeccionGuardada[], id: string, grupoId: string): ColeccionGuardada[] {
  return reemplazar(colecciones, id, (coleccion) => sinGrupo(coleccion, grupoId))
}

export function quitarGrupoDeTodas(colecciones: readonly ColeccionGuardada[], grupoId: string): ColeccionGuardada[] {
  return colecciones.map((coleccion) => sinGrupo(coleccion, grupoId))
}

export function filtrarColeccionesPorNombre(colecciones: readonly ColeccionGuardada[], texto: string): ColeccionGuardada[] {
  return colecciones.filter((coleccion) => contieneTexto(coleccion.nombre, texto))
}

export function filtrarGruposGuardados({ grupos, quitados, coleccion }: ParametrosFiltroGruposGuardados): GrupoGuardado[] {
  const descartados = new Set(quitados)
  const miembros = new Set(coleccion?.grupos)
  return grupos.filter((grupo) => !descartados.has(grupo.id) && (coleccion === undefined || miembros.has(grupo.id)))
}

export function limitarGrupos(grupos: readonly GrupoGuardado[], limite: number, limitar: boolean): GrupoGuardado[] {
  if (!limitar) return [...grupos]
  return grupos.slice(0, limite)
}

export function ordenarGruposGuardados(grupos: readonly GrupoGuardado[], orden: string): GrupoGuardado[] {
  if (orden === catalogoGuardados.orden_inicial) return [...grupos]
  return [...grupos].reverse()
}
