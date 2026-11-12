import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { usarEmpresaActiva } from '../../compartido/sesion/usar_empresa_activa'
import { crearConsolidacionRoles } from './crear_consolidacion_roles'
import { crearEdicionRoles } from './crear_edicion_roles'
import { sinRegistro } from './logica_gestion_roles'
import { configuracionDelRol, rolesDelModulo } from './logica_perfiles_permisos'
import { conEspecifico, conOperacion, conSeleccionModulo, conSeleccionRecurso, configuracionVacia, copiarConfiguracion, mismaConfiguracion } from './logica_permisos_invitacion'
import { agregarPermisoEspecifico } from './logica_permisos_especificos'
import type { ContextoRolesPermisos } from '@/tipos/colaboradores/contrato_gestion_roles_permisos'
import type { DatosAsistenteInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'
import type { AvisoPermisos, ClavePermiso, ConfiguracionPermisos, EstadoPermisosInvitacion, RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const dialogos = catalogoColaboradores.dialogos_rol

function inicializarRoles(datos: DatosAsistenteInvitacion, ambito: string): Record<string, RolModulo[]> {
  return Object.fromEntries(Object.keys(datos.perfilesModulos).map((modulo) => [modulo, rolesDelModulo(datos.perfilesModulos[modulo], datos.repositorioRoles.listar(ambito, modulo))]))
}

export function usarPermisosInvitacion(datos: DatosAsistenteInvitacion): EstadoPermisosInvitacion {
  const ambito = usarEmpresaActiva().empresaActiva?.codigo ?? dialogos.ambito_predeterminado
  const [roles, setRoles] = useState(() => inicializarRoles(datos, ambito))
  const [perfiles, setPerfiles] = useState(datos.perfilInicialModulos)
  const [asignaciones, setAsignaciones] = useState<Record<string, ConfiguracionPermisos>>(() =>
    Object.fromEntries(Object.keys(datos.recursosModulos).map((modulo) => [modulo, configuracionDelRol(roles[modulo] ?? [], datos.perfilInicialModulos[modulo])])),
  )
  const [expandidos, setExpandidos] = useState<Record<string, string[]>>({})
  const [moduloActivo, setModuloActivo] = useState<string | null>(null)
  const [aviso, setAviso] = useState<AvisoPermisos | null>(null)
  const [cargados, setCargados] = useState<Record<string, string>>({})
  const [sinAccesoConfirmado, setSinAccesoConfirmado] = useState<Record<string, boolean>>({})
  const rolDe = (modulo: string, clave: string) => (roles[modulo] ?? []).find((rol) => rol.clave === clave)
  const ajustados = Object.fromEntries(Object.keys(asignaciones).map((modulo) => {
    const rol = rolDe(modulo, perfiles[modulo])
    return [modulo, rol === undefined || !mismaConfiguracion(asignaciones[modulo], rol.configuracion)]
  }))
  const hayBorradores = Object.values(roles).flat().some((rol) => rol.borrador)

  function modificar(modulo: string, cambio: (actual: ConfiguracionPermisos) => ConfiguracionPermisos) {
    setCargados(sinRegistro(modulo))
    setSinAccesoConfirmado((anterior) => ({ ...anterior, [modulo]: false }))
    setAsignaciones((anterior) => ({ ...anterior, [modulo]: cambio(anterior[modulo] ?? configuracionVacia(datos.recursosModulos[modulo] ?? [])) }))
  }

  function guardarBorradorActual(modulo: string) {
    const actual = rolDe(modulo, perfiles[modulo])
    if (!actual?.borrador) return
    setRoles((anterior) => ({ ...anterior, [modulo]: (anterior[modulo] ?? []).map((rol) => (rol.clave === actual.clave ? { ...rol, configuracion: copiarConfiguracion(asignaciones[modulo]) } : rol)) }))
  }

  function aplicarPerfil(modulo: string, perfil: string) {
    const rol = rolDe(modulo, perfil)
    if (!rol) return
    guardarBorradorActual(modulo)
    setPerfiles((anterior) => ({ ...anterior, [modulo]: perfil }))
    setAsignaciones((anterior) => ({ ...anterior, [modulo]: copiarConfiguracion(rol.configuracion) }))
    setSinAccesoConfirmado((anterior) => ({ ...anterior, [modulo]: false }))
    setCargados(rol.borrador ? sinRegistro(modulo) : (anterior) => ({ ...anterior, [modulo]: dialogos.avisos.cargado.replace(':rol', rol.etiqueta) }))
  }

  function agregarEspecifico(modulo: string, recurso: string, etiqueta: string): string | null {
    const actual = asignaciones[modulo] ?? configuracionVacia(datos.recursosModulos[modulo] ?? [])
    const resultado = agregarPermisoEspecifico(actual, datos.recursosModulos[modulo]?.find((candidato) => candidato.nombre === recurso), etiqueta)
    if (resultado.error === null) setAsignaciones((anterior) => ({ ...anterior, [modulo]: resultado.configuracion }))
    return resultado.error
  }

  function seleccionarRecurso(modulo: string, recurso: string, activo: boolean) {
    const definicion = datos.recursosModulos[modulo]?.find((candidato) => candidato.nombre === recurso)
    if (definicion) modificar(modulo, (actual) => conSeleccionRecurso(definicion, actual, activo))
  }

  function restablecer(modulo: string) {
    const rol = rolDe(modulo, perfiles[modulo])
    if (rol) setAsignaciones((anterior) => ({ ...anterior, [modulo]: copiarConfiguracion(rol.configuracion) }))
  }

  const contexto: ContextoRolesPermisos = {
    datos,
    ambito,
    valores: { roles, perfiles, asignaciones, ajustados, sinAccesoConfirmado },
    acciones: { setRoles, setPerfiles, setAsignaciones, setCargados, setSinAccesoConfirmado, setAviso, rolDe, guardarBorradorActual, sinRegistro },
  }
  const { crearBorrador, guardarRol } = crearEdicionRoles(contexto)
  const { eliminarRol, revisarAvance } = crearConsolidacionRoles(contexto)

  return {
    recursos: datos.recursosModulos,
    perfilesValidados: datos.perfilesValidados,
    roles,
    porModulo: asignaciones,
    perfiles,
    ajustados,
    expandidos,
    moduloActivo,
    alternarModulo: (nombre: string) => setModuloActivo((actual) => (actual === nombre ? null : nombre)),
    activarModulo: setModuloActivo,
    alternarPermiso: (modulo: string, recurso: string, clave: ClavePermiso, activo: boolean) => modificar(modulo, (actual) => conOperacion(actual, recurso, clave, activo)),
    alternarEspecifico: (modulo: string, recurso: string, id: string, activo: boolean) => modificar(modulo, (actual) => conEspecifico(actual, recurso, id, activo)),
    agregarEspecifico,
    seleccionarRecurso,
    seleccionarModulo: (modulo: string, activo: boolean) => modificar(modulo, (actual) => conSeleccionModulo(datos.recursosModulos[modulo] ?? [], actual, activo)),
    aplicarPerfil,
    restablecer,
    crearBorrador,
    guardarRol,
    eliminarRol,
    revisarAvance,
    hayBorradores,
    cargados,
    aviso,
    cerrarAviso: () => setAviso(null),
    cambiarExpandidos: (modulo: string, ids: string[]) => setExpandidos((anterior) => ({ ...anterior, [modulo]: ids })),
  }
}
