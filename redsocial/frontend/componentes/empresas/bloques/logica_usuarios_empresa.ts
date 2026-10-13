import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { CriteriosUsuariosEmpresa, DatosNuevoUsuario, OpcionMenuUsuarioEmpresa } from '@/tipos/empresas/contrato_usuarios_empresa'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { EstadoUsuarioEmpresa, RolUsuarioEmpresa, UsuarioBaseEmpresa, UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

const textos = catalogoEmpresas.usuarios_empresa
const ETIQUETAS_ROL: Record<string, string> = textos.roles
const ETIQUETAS_ESTADO: Record<string, string> = textos.estados
export const TODOS_LOS_ROLES = textos.filtros.roles[0]
export const TODOS_LOS_ESTADOS = textos.filtros.estados[0]

export function armarUsuarios(empresa: Empresa, base: UsuarioBaseEmpresa[]): UsuarioEmpresa[] {
  const dominio = empresa.web.replace(/^https?:\/\/(www\.)?/, '')
  return base.slice(0, empresa.usuarios).map((usuario) => ({
    nombre: usuario.nombre,
    correo: usuario.correoLocal + '@' + dominio,
    rol: usuario.rol,
    estado: usuario.estado,
    fecha: usuario.fecha,
    hora: usuario.hora,
  }))
}

export function filtrarUsuarios(usuarios: UsuarioEmpresa[], criterios: CriteriosUsuariosEmpresa) {
  const termino = criterios.busqueda.trim().toLowerCase()
  return usuarios.filter(
    (usuario) =>
      [usuario.nombre, usuario.correo, ETIQUETAS_ROL[usuario.rol]].some((campo) => campo.toLowerCase().includes(termino)) &&
      (criterios.rol === TODOS_LOS_ROLES || ETIQUETAS_ROL[usuario.rol] === criterios.rol) &&
      (criterios.estado === TODOS_LOS_ESTADOS || ETIQUETAS_ESTADO[usuario.estado] === criterios.estado),
  )
}

export function usuarioEditadoValido(usuario: UsuarioEmpresa) {
  return usuario.nombre.trim().length !== 0 && usuario.correo.trim().length !== 0 && usuario.correo.includes('@')
}

const NOTAS_MAXIMO = textos.agregar_usuario.notas_maximo
const VACIO = ''

export function crearDatosNuevoUsuario(): DatosNuevoUsuario {
  return { nombres: VACIO, apellidos: VACIO, correo: VACIO, telefono: VACIO, rol: VACIO, estado: Object.keys(textos.estados)[0], notas: VACIO }
}

export function nuevoUsuarioValido(datos: DatosNuevoUsuario) {
  const obligatorios = [datos.nombres, datos.apellidos, datos.correo, datos.rol, datos.estado]
  return obligatorios.every((campo) => campo.trim().length !== 0) && datos.correo.includes('@')
}

export function limitarNotas(texto: string) {
  return texto.slice(0, NOTAS_MAXIMO)
}

const SEPARADOR_PALABRAS = /\s+/u

function inicial(texto: string) {
  return Array.from(texto.trim())[0]?.toLocaleUpperCase() ?? VACIO
}

export function inicialesDeUsuario(nombres: string, apellidos: string) {
  const [primerNombre = VACIO] = nombres.trim().split(SEPARADOR_PALABRAS)
  const [primerApellido = VACIO] = apellidos.trim().split(SEPARADOR_PALABRAS)
  return inicial(primerNombre) + inicial(primerApellido)
}

export function inicialesDesdeNombreCompleto(nombre: string) {
  const [primerNombre = VACIO, primerApellido = VACIO] = nombre.trim().split(SEPARADOR_PALABRAS)
  return inicial(primerNombre) + inicial(primerApellido)
}

export function usuarioDesdeNuevo(datos: DatosNuevoUsuario): UsuarioEmpresa {
  return {
    nombre: datos.nombres.trim() + ' ' + datos.apellidos.trim(),
    correo: datos.correo.trim(),
    rol: datos.rol as RolUsuarioEmpresa,
    estado: datos.estado as EstadoUsuarioEmpresa,
    fecha: textos.sin_acceso,
    hora: VACIO,
    iniciales: inicialesDeUsuario(datos.nombres, datos.apellidos),
    ...(datos.notas.trim() ? { notas: datos.notas.trim() } : {}),
  }
}

export function opcionesDeUsuario(usuario: UsuarioEmpresa, opciones: OpcionMenuUsuarioEmpresa[]) {
  return opciones.filter((opcion) => opcion.estado === undefined || opcion.estado === usuario.estado)
}
