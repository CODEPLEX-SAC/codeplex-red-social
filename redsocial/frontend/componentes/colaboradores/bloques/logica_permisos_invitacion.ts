import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type {
  ClavePermiso,
  ColumnaPermiso,
  ConfiguracionPermisos,
  PermisoEspecifico,
  PermisosModulo,
  RecursoPermiso,
} from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const COLUMNAS: ColumnaPermiso[] = catalogoColaboradores.columnas_permisos as ColumnaPermiso[]
const ORDEN = COLUMNAS.map((columna) => columna.clave)
const SIN_ACCESO: ClavePermiso = 'sin-acceso'
const errores = catalogoColaboradores.dialogos_rol.errores

export function ordenar(permisos: ClavePermiso[]): ClavePermiso[] {
  return ORDEN.filter((clave) => permisos.includes(clave))
}

export function aplicarPermiso(actuales: ClavePermiso[], clave: ClavePermiso, activo: boolean): ClavePermiso[] {
  if (!activo) return actuales.filter((permiso) => permiso !== clave)
  if (clave === SIN_ACCESO) return [SIN_ACCESO]
  return ordenar([...actuales.filter((permiso) => permiso !== SIN_ACCESO), clave])
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

export function etiquetasDelRecurso(recurso: RecursoPermiso, configuracion: ConfiguracionPermisos): string[] {
  const estandar = columnasDisponibles(recurso).flatMap((columna) => [columna.etiqueta, columna.etiqueta_fila])
  return [...estandar, ...(configuracion.especificos[recurso.nombre] ?? []).map((permiso) => permiso.etiqueta)]
}

export function normalizarEtiqueta(etiqueta: string): string {
  return etiqueta.trim().replace(/\s+/g, ' ')
}

export function existeEtiqueta(etiquetas: string[], etiqueta: string): boolean {
  const buscada = normalizarEtiqueta(etiqueta).toLowerCase()
  return etiquetas.some((existente) => normalizarEtiqueta(existente).toLowerCase() === buscada)
}

export function conPermisoEspecifico(configuracion: ConfiguracionPermisos, recurso: string, permiso: PermisoEspecifico): ConfiguracionPermisos {
  return { ...configuracion, especificos: { ...configuracion.especificos, [recurso]: [...(configuracion.especificos[recurso] ?? []), permiso] } }
}

export type EstadoSeleccion = 'ninguno' | 'parcial' | 'todos'

function entradasDelRecurso(recurso: RecursoPermiso, configuracion: ConfiguracionPermisos): boolean[] {
  const operaciones = columnasDisponibles(recurso).map((columna) => (configuracion.operaciones[recurso.nombre] ?? []).includes(columna.clave))
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

function mismasClaves(a: ClavePermiso[], b: ClavePermiso[]): boolean {
  const primero = ordenar(a)
  const segundo = ordenar(b)
  return primero.length === segundo.length && primero.every((clave, indice) => clave === segundo[indice])
}

export function mismaConfiguracion(a: ConfiguracionPermisos, b: ConfiguracionPermisos): boolean {
  const recursos = new Set([...Object.keys(a.operaciones), ...Object.keys(b.operaciones)])
  const operaciones = [...recursos].every((recurso) => mismasClaves((a.operaciones[recurso] ?? []).filter((clave) => clave !== SIN_ACCESO), (b.operaciones[recurso] ?? []).filter((clave) => clave !== SIN_ACCESO)))
  const activos = (configuracion: ConfiguracionPermisos) => Object.values(configuracion.especificos).flat().filter((permiso) => permiso.activo).map((permiso) => permiso.id).sort().join()
  const total = (configuracion: ConfiguracionPermisos) => Object.values(configuracion.especificos).flat().length
  return operaciones && activos(a) === activos(b) && total(a) === total(b)
}

export function agregarPermisoEspecifico(configuracion: ConfiguracionPermisos, recurso: RecursoPermiso | undefined, etiqueta: string): { configuracion: ConfiguracionPermisos; error: string | null } {
  if (!recurso) return { configuracion, error: errores.recurso_inexistente }
  const texto = normalizarEtiqueta(etiqueta)
  if (!texto) return { configuracion, error: errores.permiso_vacio }
  if (existeEtiqueta(etiquetasDelRecurso(recurso, configuracion), texto)) return { configuracion, error: errores.permiso_repetido }
  const id = `${recurso.nombre}-${texto.toLowerCase().replace(/\s+/g, '-')}-${(configuracion.especificos[recurso.nombre] ?? []).length}`
  return { configuracion: conPermisoEspecifico(configuracion, recurso.nombre, { id, etiqueta: texto, activo: true }), error: null }
}
