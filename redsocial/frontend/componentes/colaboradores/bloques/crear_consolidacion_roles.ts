import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { consolidarBorradores, modulosPendientes } from './logica_gestion_roles'
import type { ConsolidacionRolesPermisos, ContextoRolesPermisos } from '@/tipos/colaboradores/contrato_gestion_roles_permisos'

const dialogos = catalogoColaboradores.dialogos_rol
const SIN_ROL = dialogos.valor_sin_rol

export function crearConsolidacionRoles({ datos, ambito, valores, acciones }: ContextoRolesPermisos): ConsolidacionRolesPermisos {
  const { roles, perfiles, asignaciones } = valores
  const { setRoles, setPerfiles, setSinAccesoConfirmado, setAviso, rolDe } = acciones

  function eliminarRol(modulo: string, clave: string): boolean {
    const rol = rolDe(modulo, clave)
    const eliminable = rol?.creado === true && !rol.borrador && datos.repositorioRoles.eliminar(ambito, modulo, clave)
    setAviso(eliminable ? { variante: 'exito', mensaje: dialogos.avisos.eliminado.replace(':modulo', modulo) } : { variante: 'error', mensaje: dialogos.avisos.no_eliminado })
    if (!eliminable) return false
    setRoles((anterior) => ({ ...anterior, [modulo]: (anterior[modulo] ?? []).filter((existente) => existente.clave !== clave) }))
    setPerfiles((anterior) => ({ ...anterior, [modulo]: anterior[modulo] === clave ? SIN_ROL : anterior[modulo] }))
    return true
  }

  function revisarAvance(confirmados: string[] = []): string[] {
    const pendientes = modulosPendientes({ valores, confirmados })
    if (pendientes.length > 0) return pendientes
    const { roles: consolidados, modulosSinPerfil } = consolidarBorradores({ roles, perfiles, asignaciones, registrar: (modulo, rol) => datos.repositorioRoles.registrar(ambito, modulo, rol) })
    setPerfiles((anterior) => ({ ...anterior, ...Object.fromEntries(modulosSinPerfil.map((modulo) => [modulo, SIN_ROL])) }))
    setRoles(consolidados)
    setSinAccesoConfirmado((anterior) => ({ ...anterior, ...Object.fromEntries(confirmados.map((modulo) => [modulo, true])) }))
    return []
  }

  return { eliminarRol, revisarAvance }
}
