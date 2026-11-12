import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { columnasDisponibles } from './logica_permisos_invitacion'
import type { ConfiguracionPermisos, PermisoEspecifico, RecursoPermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const errores = catalogoColaboradores.dialogos_rol.errores

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

export function agregarPermisoEspecifico(configuracion: ConfiguracionPermisos, recurso: RecursoPermiso | undefined, etiqueta: string): { configuracion: ConfiguracionPermisos; error: string | null } {
  if (!recurso) return { configuracion, error: errores.recurso_inexistente }
  const texto = normalizarEtiqueta(etiqueta)
  if (!texto) return { configuracion, error: errores.permiso_vacio }
  if (existeEtiqueta(etiquetasDelRecurso(recurso, configuracion), texto)) return { configuracion, error: errores.permiso_repetido }
  const id = `${recurso.nombre}-${texto.toLowerCase().replace(/\s+/g, '-')}-${(configuracion.especificos[recurso.nombre] ?? []).length}`
  return { configuracion: conPermisoEspecifico(configuracion, recurso.nombre, { id, etiqueta: texto, activo: true }), error: null }
}
