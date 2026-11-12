import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { validarEdicionRol, validarNombreRol } from './logica_validacion_roles'
import { claveDeRolNuevo } from './logica_perfiles_permisos'
import { configuracionVacia, copiarConfiguracion } from './logica_permisos_invitacion'
import { normalizarEtiqueta } from './logica_permisos_especificos'
import type { ContextoRolesPermisos, EdicionRolesPermisos } from '@/tipos/colaboradores/contrato_gestion_roles_permisos'
import type { ResultadoCreacionRol, RolModulo, SolicitudGuardadoRol } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const dialogos = catalogoColaboradores.dialogos_rol
const errores = dialogos.errores
const SIN_ROL = dialogos.valor_sin_rol

export function crearEdicionRoles({ datos, ambito, valores, acciones }: ContextoRolesPermisos): EdicionRolesPermisos {
  const { roles } = valores
  const { setRoles, setPerfiles, setAsignaciones, setCargados, setSinAccesoConfirmado, setAviso, rolDe, guardarBorradorActual, sinRegistro } = acciones

  function agregarRol(modulo: string, rol: RolModulo) {
    setRoles((anterior) => ({ ...anterior, [modulo]: [...(anterior[modulo] ?? []), rol] }))
    setPerfiles((anterior) => ({ ...anterior, [modulo]: rol.clave }))
  }

  function crearBorrador(modulo: string, nombre: string): ResultadoCreacionRol {
    const etiqueta = normalizarEtiqueta(nombre)
    const invalido = validarNombreRol(roles[modulo] ?? [], null, etiqueta)
    if (invalido) return invalido
    guardarBorradorActual(modulo)
    const vacia = configuracionVacia(datos.recursosModulos[modulo] ?? [])
    const rol: RolModulo = { clave: claveDeRolNuevo(roles[modulo] ?? [], etiqueta), etiqueta, configuracion: vacia, creado: true, borrador: true }
    agregarRol(modulo, rol)
    setAsignaciones((anterior) => ({ ...anterior, [modulo]: copiarConfiguracion(vacia) }))
    setCargados(sinRegistro(modulo))
    setSinAccesoConfirmado((anterior) => ({ ...anterior, [modulo]: false }))
    setAviso({ variante: 'exito', titulo: dialogos.avisos.creado_titulo, mensaje: dialogos.avisos.creado.replace(':rol', etiqueta).replace(':modulo', modulo) })
    return { rol, error: null }
  }

  function editarRol({ modulo, clave, configuracion }: SolicitudGuardadoRol, etiqueta: string): ResultadoCreacionRol {
    const actual = rolDe(modulo, clave ?? SIN_ROL)
    const invalido = validarEdicionRol(configuracion, actual)
    if (invalido) return invalido
    const rol = actual && datos.repositorioRoles.actualizar(ambito, modulo, { ...actual, etiqueta, configuracion: copiarConfiguracion(configuracion) })
    if (!rol) return { rol: null, error: errores.rol_no_editable }
    setRoles((anterior) => ({ ...anterior, [modulo]: (anterior[modulo] ?? []).map((existente) => (existente.clave === rol.clave ? rol : existente)) }))
    setAviso({ variante: 'exito', mensaje: dialogos.avisos.actualizado })
    return { rol, error: null }
  }

  function duplicarRol({ modulo, configuracion }: SolicitudGuardadoRol, etiqueta: string): ResultadoCreacionRol {
    const rol = datos.repositorioRoles.registrar(ambito, modulo, { clave: claveDeRolNuevo(roles[modulo] ?? [], etiqueta), etiqueta, configuracion: copiarConfiguracion(configuracion), creado: true })
    guardarBorradorActual(modulo)
    agregarRol(modulo, rol)
    setAsignaciones((anterior) => ({ ...anterior, [modulo]: copiarConfiguracion(rol.configuracion) }))
    setCargados((anterior) => ({ ...anterior, [modulo]: dialogos.avisos.cargado.replace(':rol', rol.etiqueta) }))
    setAviso({ variante: 'exito', titulo: dialogos.avisos.duplicado_titulo, mensaje: dialogos.avisos.duplicado.replace(':rol', rol.etiqueta).replace(':modulo', modulo) })
    return { rol, error: null }
  }

  function guardarRol(solicitud: SolicitudGuardadoRol): ResultadoCreacionRol {
    const etiqueta = normalizarEtiqueta(solicitud.nombre)
    const claveExcluida = { editar: solicitud.clave, duplicar: null }[solicitud.modo]
    const invalido = validarNombreRol(roles[solicitud.modulo] ?? [], claveExcluida, etiqueta)
    if (invalido) return invalido
    return { editar: editarRol, duplicar: duplicarRol }[solicitud.modo](solicitud, etiqueta)
  }

  return { crearBorrador, guardarRol }
}
