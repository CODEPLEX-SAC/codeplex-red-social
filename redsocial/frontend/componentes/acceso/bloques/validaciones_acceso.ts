import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'

const textos = catalogoAcceso
const patronCorreo = new RegExp(textos.patron_correo)

export const SIN_ERROR = ''

export function errorDeNombre(nombre: string) {
  return nombre.length === 0 ? textos.errores.nombre_obligatorio : SIN_ERROR
}

export function errorDeCorreo(correo: string) {
  if (correo.length === 0) return textos.errores.correo_obligatorio
  return patronCorreo.test(correo) ? SIN_ERROR : textos.errores.correo_invalido
}

export function errorDeContrasena(contrasena: string) {
  return contrasena.length === 0 ? textos.errores.contrasena_obligatoria : SIN_ERROR
}

export function errorDeContrasenaNueva(contrasena: string) {
  if (contrasena.length === 0) return textos.errores.contrasena_obligatoria
  const minimo = textos.contrasena_longitud_minima
  return contrasena.length >= minimo ? SIN_ERROR : textos.errores.contrasena_corta.replace(':minimo', String(minimo))
}

export function errorDeConfirmacion(contrasena: string, confirmacion: string) {
  if (confirmacion.length === 0) return textos.errores.confirmacion_obligatoria
  return confirmacion === contrasena ? SIN_ERROR : textos.errores.contrasenas_distintas
}
