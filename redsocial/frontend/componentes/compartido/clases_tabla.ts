import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const base = catalogoCompartido.tabla_datos

export const CLASES_TABLA = {
  contenedor: base.contenedor,
  tabla: base.tabla,
  fila: base.fila,
  celda: base.celda,
  columnaAjustada: base.columna_ajustada,
  columnas: base.columnas,
  celdaFija: base.acciones,
  identidad: base.identidad,
  mensajeVacio: base.mensaje_vacio,
}

export function claseEncabezadoTabla(): string {
  return `${base.encabezado} ${base.relleno_encabezado}`
}
