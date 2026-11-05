import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { usarEmpresaActiva } from '../../compartido/sesion/usar_empresa_activa'
import { claveDeRolNuevo, configuracionDelRol, nombreDeRolRepetido, rolesDelModulo } from './logica_perfiles_permisos'
import { agregarPermisoEspecifico, conEspecifico, conOperacion, conSeleccionModulo, conSeleccionRecurso, configuracionVacia, copiarConfiguracion, mismaConfiguracion, normalizarEtiqueta, tieneAcceso } from './logica_permisos_invitacion'
import type { DatosAsistenteInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'
import type { AvisoPermisos, ClavePermiso, ConfiguracionPermisos, EstadoPermisosInvitacion, ModoGuardadoRol, ResultadoCreacionRol, RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const dialogos = catalogoColaboradores.dialogos_rol
const errores = dialogos.errores
const SIN_ROL = dialogos.valor_sin_rol

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
  const hayBorradores = Object.values(roles).some((lista) => lista.some((rol) => rol.borrador))

  function sinRegistro(modulo: string) {
    return (anterior: Record<string, string>) => Object.fromEntries(Object.entries(anterior).filter(([clave]) => clave !== modulo))
  }

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
    if (!rol.borrador) setCargados((anterior) => ({ ...anterior, [modulo]: dialogos.avisos.cargado.replace(':rol', rol.etiqueta) }))
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

  function validarNombre(modulo: string, clave: string | null, etiqueta: string): ResultadoCreacionRol | null {
    if (!etiqueta) return { rol: null, error: errores.nombre_vacio, campo: 'nombre' }
    if (nombreDeRolRepetido(roles[modulo] ?? [], etiqueta, clave)) return { rol: null, error: errores.nombre_repetido, campo: 'nombre' }
    return null
  }

  function crearBorrador(modulo: string, nombre: string): ResultadoCreacionRol {
    const etiqueta = normalizarEtiqueta(nombre)
    const invalido = validarNombre(modulo, null, etiqueta)
    if (invalido) return invalido
    guardarBorradorActual(modulo)
    const vacia = configuracionVacia(datos.recursosModulos[modulo] ?? [])
    const rol: RolModulo = { clave: claveDeRolNuevo(roles[modulo] ?? [], etiqueta), etiqueta, configuracion: vacia, creado: true, borrador: true }
    setRoles((anterior) => ({ ...anterior, [modulo]: [...(anterior[modulo] ?? []), rol] }))
    setPerfiles((anterior) => ({ ...anterior, [modulo]: rol.clave }))
    setAsignaciones((anterior) => ({ ...anterior, [modulo]: copiarConfiguracion(vacia) }))
    setCargados(sinRegistro(modulo))
    setSinAccesoConfirmado((anterior) => ({ ...anterior, [modulo]: false }))
    setAviso({ variante: 'exito', titulo: dialogos.avisos.creado_titulo, mensaje: dialogos.avisos.creado.replace(':rol', etiqueta).replace(':modulo', modulo) })
    return { rol, error: null }
  }

  function guardarRol(modulo: string, modo: ModoGuardadoRol, clave: string | null, nombre: string, configuracion: ConfiguracionPermisos): ResultadoCreacionRol {
    const etiqueta = normalizarEtiqueta(nombre)
    const invalido = validarNombre(modulo, modo === 'editar' ? clave : null, etiqueta)
    if (invalido) return invalido
    if (modo === 'editar') {
      if (!tieneAcceso(configuracion)) return { rol: null, error: errores.sin_permisos, campo: 'permisos' }
      const actual = rolDe(modulo, clave ?? SIN_ROL)
      if (!actual || actual.borrador) return { rol: null, error: errores.rol_no_editable }
      const rol = datos.repositorioRoles.actualizar(ambito, modulo, { ...actual, etiqueta, configuracion: copiarConfiguracion(configuracion) })
      if (!rol) return { rol: null, error: errores.rol_no_editable }
      setRoles((anterior) => ({ ...anterior, [modulo]: (anterior[modulo] ?? []).map((existente) => (existente.clave === rol.clave ? rol : existente)) }))
      setAviso({ variante: 'exito', mensaje: dialogos.avisos.actualizado })
      return { rol, error: null }
    }
    const rol = datos.repositorioRoles.registrar(ambito, modulo, { clave: claveDeRolNuevo(roles[modulo] ?? [], etiqueta), etiqueta, configuracion: copiarConfiguracion(configuracion), creado: true })
    guardarBorradorActual(modulo)
    setRoles((anterior) => ({ ...anterior, [modulo]: [...(anterior[modulo] ?? []), rol] }))
    setPerfiles((anterior) => ({ ...anterior, [modulo]: rol.clave }))
    setAsignaciones((anterior) => ({ ...anterior, [modulo]: copiarConfiguracion(rol.configuracion) }))
    setCargados((anterior) => ({ ...anterior, [modulo]: dialogos.avisos.cargado.replace(':rol', rol.etiqueta) }))
    setAviso({ variante: 'exito', titulo: dialogos.avisos.duplicado_titulo, mensaje: dialogos.avisos.duplicado.replace(':rol', rol.etiqueta).replace(':modulo', modulo) })
    return { rol, error: null }
  }

  function eliminarRol(modulo: string, clave: string): boolean {
    const rol = rolDe(modulo, clave)
    if (!rol?.creado || rol.borrador || !datos.repositorioRoles.eliminar(ambito, modulo, clave)) {
      setAviso({ variante: 'error', mensaje: dialogos.avisos.no_eliminado })
      return false
    }
    setRoles((anterior) => ({ ...anterior, [modulo]: (anterior[modulo] ?? []).filter((existente) => existente.clave !== clave) }))
    if (perfiles[modulo] === clave) setPerfiles((anterior) => ({ ...anterior, [modulo]: SIN_ROL }))
    setAviso({ variante: 'exito', mensaje: dialogos.avisos.eliminado.replace(':modulo', modulo) })
    return true
  }

  function revisarAvance(confirmados: string[] = []): string[] {
    const sinAcceso = (modulo: string) => confirmados.includes(modulo) || sinAccesoConfirmado[modulo] === true
    const pendientes = Object.keys(roles).filter((modulo) => {
      const seleccionado = rolDe(modulo, perfiles[modulo])
      const vacio = !tieneAcceso(asignaciones[modulo])
      return vacio && !sinAcceso(modulo) && (seleccionado?.borrador === true || ajustados[modulo])
    })
    if (pendientes.length > 0) return pendientes
    const resultado: Record<string, RolModulo[]> = {}
    for (const modulo of Object.keys(roles)) {
      resultado[modulo] = []
      for (const rol of roles[modulo]) {
        const seleccionado = rol.clave === perfiles[modulo]
        const configuracion = seleccionado ? asignaciones[modulo] : rol.configuracion
        if (!rol.borrador) resultado[modulo].push(rol)
        else if (tieneAcceso(configuracion)) resultado[modulo].push(datos.repositorioRoles.registrar(ambito, modulo, { ...rol, configuracion: copiarConfiguracion(configuracion), borrador: false }))
        else if (seleccionado) setPerfiles((anterior) => ({ ...anterior, [modulo]: SIN_ROL }))
      }
    }
    setRoles(resultado)
    setSinAccesoConfirmado((anterior) => ({ ...anterior, ...Object.fromEntries(confirmados.map((modulo) => [modulo, true])) }))
    return []
  }

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
