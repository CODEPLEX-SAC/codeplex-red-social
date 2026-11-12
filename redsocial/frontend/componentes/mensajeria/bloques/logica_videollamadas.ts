import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'

export function rutaDeVideollamadaA(nombre: string): string {
  return `${catalogoMensajeria.rutas.videollamada_iniciar}?${catalogoMensajeria.parametros_ruta.contacto}=${encodeURIComponent(nombre)}`
}
