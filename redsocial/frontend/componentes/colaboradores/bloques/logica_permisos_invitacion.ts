import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type {
  ClavePermiso,
  ColumnaPermiso,
  ConfiguracionPermisos,
  PermisosModulo,
  RecursoPermiso,
} from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import type { EstadoSeleccion } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const COLUMNAS: ColumnaPermiso[] = catalogoColaboradores.columnas_permisos as ColumnaPermiso[]
const ORDEN = COLUMNAS.map((columna) => columna.clave)
const SIN_ACCESO: ClavePermiso = 'sin-acceso'

export function ordenar(permisos: ClavePermiso[]): ClavePermiso[] {
  const presentes = new Set(permisos)
  return ORDEN.filter((clave) => presentes.has(clave))
}

export function aplicarPermiso(actuales: ClavePermiso[], clave: ClavePermiso, activo: boolean): ClavePermiso[] {
  if (!activo) return actuales.filter((permiso) => permiso !== clave)
  if (clave === SIN_ACCESO) return [SIN_ACCESO]
  return ordenar([...actuales.filter((permiso) => permiso !== SIN_ACCESO), clave])
}

export function alternarNombre(lista: readonly string[], nombre: string): string[] {
  return lista.includes(nombre) ? lista.filter((actual) => actual !== nombre) : [...lista, nombre]
}

export function estaDisponible(recurso: RecursoPermiso, clave: ClavePermiso): boolean {
  return clave === SIN_ACCESO || recurso.operaciones.includes(clave)
}

export function permisosDelModulo(permisos: PermisosModulo | undefined): ClavePermiso[] {
  return ordenar(Object.values(permisos ?? {}).flat())
}

export function tieneAcceso(configuracion: ConfiguracionPermisos | undefined): boolean {
  const operaciones = permisosDelModulo(configuracion?.operaciones).some((clave) => clave !== SIN_ACCESO)
  return operaciones || Object.values(configuracion?.especificos ?? {}).flat().some((permiso) => permiso.activo)
}

export function contarModulosConAcceso(porModulo: Record<string, ConfiguracionPermisos>): number {
  return Object.values(porModulo).filter(tieneAcceso).length
}

export function columnasDisponibles(recurso: RecursoPermiso): ColumnaPermiso[] {
  return COLUMNAS.filter((columna) => columna.clave !== SIN_ACCESO && estaDisponible(recurso, columna.clave))
}

export function copiarConfiguracion(configuracion: ConfiguracionPermisos): ConfiguracionPermisos {
  return {
    operaciones: Object.fromEntries(Object.entries(configuracion.operaciones).map(([recurso, claves]) => [recurso, [...claves]])),
    especificos: Object.fromEntries(Object.entries(configuracion.especificos).map(([recurso, lista]) => [recurso, lista.map((permiso) => ({ ...permiso }))])),
  }
}

export function configuracionVacia(recursos: RecursoPermiso[]): ConfiguracionPermisos {
  return { operaciones: Object.fromEntries(recursos.map((recurso) => [recurso.nombre, []])), especificos: {} }
}

export function configuracionDeOperaciones(operaciones: PermisosModulo): ConfiguracionPermisos {
  return copiarConfiguracion({ operaciones, especificos: {} })
}

export function conOperacion(configuracion: ConfiguracionPermisos, recurso: string, clave: ClavePermiso, activo: boolean): ConfiguracionPermisos {
  return { ...configuracion, operaciones: { ...configuracion.operaciones, [recurso]: aplicarPermiso(configuracion.operaciones[recurso] ?? [], clave, activo) } }
}

export function conEspecifico(configuracion: ConfiguracionPermisos, recurso: string, id: string, activo: boolean): ConfiguracionPermisos {
  const lista = (configuracion.especificos[recurso] ?? []).map((permiso) => (permiso.id === id ? { ...permiso, activo } : permiso))
  return { ...configuracion, especificos: { ...configuracion.especificos, [recurso]: lista } }
}

function entradasDelRecurso(recurso: RecursoPermiso, configuracion: ConfiguracionPermisos): boolean[] {
  const activas = new Set(configuracion.operaciones[recurso.nombre] ?? [])
  const operaciones = columnasDisponibles(recurso).map((columna) => activas.has(columna.clave))
  return [...operaciones, ...(configuracion.especificos[recurso.nombre] ?? []).map((permiso) => permiso.activo)]
}

function estadoDeEntradas(entradas: boolean[]): EstadoSeleccion {
  const marcadas = entradas.filter(Boolean).length
  if (marcadas === 0) return 'ninguno'
  return marcadas === entradas.length ? 'todos' : 'parcial'
}

export function estadoDelRecurso(recurso: RecursoPermiso, configuracion: ConfiguracionPermisos): EstadoSeleccion {
  return estadoDeEntradas(entradasDelRecurso(recurso, configuracion))
}

export function estadoDelModulo(recursos: RecursoPermiso[], configuracion: ConfiguracionPermisos): EstadoSeleccion {
  return estadoDeEntradas(recursos.flatMap((recurso) => entradasDelRecurso(recurso, configuracion)))
}

export function conSeleccionRecurso(recurso: RecursoPermiso, configuracion: ConfiguracionPermisos, activo: boolean): ConfiguracionPermisos {
  const disponibles = columnasDisponibles(recurso).map((columna) => columna.clave)
  return {
    operaciones: { ...configuracion.operaciones, [recurso.nombre]: activo ? ordenar(disponibles) : [] },
    especificos: { ...configuracion.especificos, [recurso.nombre]: (configuracion.especificos[recurso.nombre] ?? []).map((permiso) => ({ ...permiso, activo })) },
  }
}

export function conSeleccionModulo(recursos: RecursoPermiso[], configuracion: ConfiguracionPermisos, activo: boolean): ConfiguracionPermisos {
  return recursos.reduce((acumulada, recurso) => conSeleccionRecurso(recurso, acumulada, activo), configuracion)
}

function clavesConAcceso(configuracion: ConfiguracionPermisos, recurso: string): ClavePermiso[] {
  const claves = configuracion.operaciones[recurso] ?? []
  return claves.filter((clave) => clave !== SIN_ACCESO)
}

function mismasClaves(a: ClavePermiso[], b: ClavePermiso[]): boolean {
  const primero = ordenar(a)
  const segundo = ordenar(b)
  return primero.length === segundo.length && primero.every((clave, indice) => clave === segundo[indice])
}

export function mismaConfiguracion(a: ConfiguracionPermisos, b: ConfiguracionPermisos): boolean {
  const recursos = new Set([...Object.keys(a.operaciones), ...Object.keys(b.operaciones)])
  const operaciones = [...recursos].every((recurso) => mismasClaves(clavesConAcceso(a, recurso), clavesConAcceso(b, recurso)))
  const activos = (configuracion: ConfiguracionPermisos) => Object.values(configuracion.especificos).flat().filter((permiso) => permiso.activo).map((permiso) => permiso.id).sort().join()
  const total = (configuracion: ConfiguracionPermisos) => Object.values(configuracion.especificos).flat().length
  return operaciones && activos(a) === activos(b) && total(a) === total(b)
}
