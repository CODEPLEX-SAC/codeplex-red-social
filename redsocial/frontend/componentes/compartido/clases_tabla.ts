import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const base = catalogoCompartido.tabla_datos

export const CLASES_TABLA = {
  contenedor: base.contenedor,
  tabla: base.tabla,
  fila: base.fila,
  mensajeVacio: base.mensaje_vacio,
}

export function claseEncabezadoTabla(relleno: string): string {
  return `${base.encabezado} ${relleno}`
}
