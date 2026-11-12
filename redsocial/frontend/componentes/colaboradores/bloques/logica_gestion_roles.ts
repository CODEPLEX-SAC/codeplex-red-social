import { copiarConfiguracion, tieneAcceso } from './logica_permisos_invitacion'
import type { RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import type { CadenasPorModulo, ParametrosConsolidacion, ParametrosPendientes, ResultadoConsolidacion } from '@/tipos/colaboradores/contrato_gestion_roles_permisos'

export function sinRegistro(modulo: string): (anterior: CadenasPorModulo) => CadenasPorModulo {
  const quitar = (anterior: CadenasPorModulo) => Object.fromEntries(Object.entries(anterior).filter(([clave]) => clave !== modulo))
  return quitar
}

function esBorradorSeleccionado(lista: RolModulo[], clave: string): boolean {
  return lista.some((rol) => rol.borrador === true && rol.clave === clave)
}

export function modulosPendientes({ valores, confirmados }: ParametrosPendientes): string[] {
  const { roles, perfiles, asignaciones, ajustados, sinAccesoConfirmado } = valores
  const aprobados = new Set(confirmados)
  const conBorrador = new Set(Object.keys(roles).filter((modulo) => esBorradorSeleccionado(roles[modulo], perfiles[modulo])))
  return Object.keys(roles).filter((modulo) => {
    const sinAcceso = aprobados.has(modulo) || sinAccesoConfirmado[modulo] === true
    return !tieneAcceso(asignaciones[modulo]) && !sinAcceso && (conBorrador.has(modulo) || ajustados[modulo])
  })
}

export function consolidarBorradores({ roles, perfiles, asignaciones, registrar }: ParametrosConsolidacion): ResultadoConsolidacion {
  const modulosSinPerfil: string[] = []
  const consolidados = Object.fromEntries(
    Object.keys(roles).map((modulo) => [
      modulo,
      roles[modulo].flatMap((rol) => {
        const seleccionado = rol.clave === perfiles[modulo]
        const configuracion = seleccionado ? asignaciones[modulo] : rol.configuracion
        if (!rol.borrador) return [rol]
        if (tieneAcceso(configuracion)) return [registrar(modulo, { ...rol, configuracion: copiarConfiguracion(configuracion), borrador: false })]
        if (seleccionado) modulosSinPerfil.push(modulo)
        return []
      }),
    ]),
  )
  return { roles: consolidados, modulosSinPerfil }
}
