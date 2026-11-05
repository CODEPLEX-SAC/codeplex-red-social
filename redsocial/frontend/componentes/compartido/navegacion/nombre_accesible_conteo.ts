import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'

export function nombreAccesibleConConteo(nombre: string, cantidad: number | undefined): string {
  if (!cantidad || cantidad <= 0) return nombre
  const texto = textosRedSocial.NOMBRE_CON_PENDIENTES
  return texto.plantilla.replace(texto.nombre, nombre).replace(texto.cantidad, String(cantidad))
}
