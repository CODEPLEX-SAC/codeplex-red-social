import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'

export function partesDeAceptacion() {
  const aceptacion = catalogoAcceso.terminos_aceptacion
  const reemplazos = new Map([[aceptacion.marcador_uso, aceptacion.uso], [aceptacion.marcador_privacidad, aceptacion.privacidad]])
  return aceptacion.texto.split(new RegExp(`(${aceptacion.marcadores})`)).map((parte) => ({ texto: reemplazos.get(parte) ?? parte, enfasis: reemplazos.has(parte) }))
}
