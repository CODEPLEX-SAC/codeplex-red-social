import { Workbook } from 'exceljs'
import type { Worksheet } from 'exceljs'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { ReporteColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const config = catalogoColaboradores.exportacion
const estilo = config.estilo_excel
const etiquetas = config.etiquetas
const FILAS_ENCABEZADO_DOCUMENTO = 5
const FORMATO_TEXTO = '@'

function bordeFino() {
  const borde = { style: 'thin' as const, color: { argb: estilo.color_borde } }
  return { top: borde, left: borde, bottom: borde, right: borde }
}

function escribirLineaCombinada(hoja: Worksheet, numero: number, texto: string, columnas: number, negrita: boolean, tamano: number) {
  hoja.mergeCells(numero, 1, numero, columnas)
  const celda = hoja.getCell(numero, 1)
  celda.value = texto
  celda.font = { name: estilo.fuente, bold: negrita, size: tamano, color: { argb: estilo.color_titulo } }
  celda.alignment = { vertical: 'top', wrapText: true }
}

function escribirEncabezados(hoja: Worksheet, numero: number, reporte: ReporteColaboradores) {
  const fila = hoja.getRow(numero)
  reporte.columnas.forEach((columna, indice) => {
    const celda = fila.getCell(indice + 1)
    celda.value = columna.titulo
    celda.font = { name: estilo.fuente, bold: true, color: { argb: estilo.color_texto_encabezado } }
    celda.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: estilo.color_encabezado } }
    celda.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }
    celda.border = bordeFino()
  })
}

function escribirFilas(hoja: Worksheet, primera: number, reporte: ReporteColaboradores) {
  reporte.filas.forEach((valores, desplazamiento) => {
    const fila = hoja.getRow(primera + desplazamiento)
    valores.forEach((texto, indice) => {
      const celda = fila.getCell(indice + 1)
      celda.value = texto
      celda.numFmt = FORMATO_TEXTO
      celda.font = { name: estilo.fuente, color: { argb: estilo.color_titulo } }
      celda.alignment = { vertical: 'top', wrapText: true }
      celda.border = bordeFino()
      if (desplazamiento % 2 === 1) celda.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: estilo.color_filas_alternas } }
    })
  })
}

export async function generarExcel(reporte: ReporteColaboradores): Promise<ArrayBuffer> {
  const libro = new Workbook()
  const hoja = libro.addWorksheet(config.hoja, { properties: { defaultRowHeight: 18 } })
  const columnas = reporte.columnas.length
  hoja.columns = reporte.columnas.map((columna) => ({ key: columna.clave, width: columna.ancho }))

  escribirLineaCombinada(hoja, 1, reporte.titulo, columnas, true, estilo.tamano_titulo)
  escribirLineaCombinada(hoja, 2, `${etiquetas.generado}: ${reporte.fechaGeneracion}`, columnas, false, 11)
  escribirLineaCombinada(hoja, 3, `${etiquetas.criterios}: ${reporte.criterios.join(' | ')}`, columnas, false, 11)
  escribirLineaCombinada(hoja, 4, `${etiquetas.total}: ${reporte.filas.length}`, columnas, false, 11)

  const filaEncabezados = FILAS_ENCABEZADO_DOCUMENTO + 1
  escribirEncabezados(hoja, filaEncabezados, reporte)
  escribirFilas(hoja, filaEncabezados + 1, reporte)

  hoja.views = [{ state: 'frozen', ySplit: filaEncabezados }]
  hoja.autoFilter = { from: { row: filaEncabezados, column: 1 }, to: { row: filaEncabezados, column: columnas } }
  hoja.pageSetup = { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, printTitlesRow: `${filaEncabezados}:${filaEncabezados}` }

  return libro.xlsx.writeBuffer() as Promise<ArrayBuffer>
}
