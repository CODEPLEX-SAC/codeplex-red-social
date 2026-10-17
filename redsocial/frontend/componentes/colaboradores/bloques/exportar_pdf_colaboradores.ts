import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { OpcionesTablaPdf, ReporteColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { interpolarPlantilla } from './colaboradores_tabla_config'

const config = catalogoColaboradores.exportacion
const estilo = config.estilo_pdf
const etiquetas = config.etiquetas
const SEPARACION_BLOQUES = 6

function escribirCabecera(documento: jsPDF, reporte: ReporteColaboradores): number {
  const anchoUtil = documento.internal.pageSize.getWidth() - estilo.margen * 2
  let y = estilo.margen
  documento.setTextColor(estilo.color_texto[0], estilo.color_texto[1], estilo.color_texto[2])
  documento.setFontSize(estilo.tamano_titulo)
  documento.setFont(documento.getFont().fontName, 'bold')
  documento.text(reporte.titulo, estilo.margen, y + estilo.tamano_titulo)
  y += estilo.tamano_titulo * estilo.interlineado + SEPARACION_BLOQUES

  documento.setFontSize(estilo.tamano_texto)
  documento.setFont(documento.getFont().fontName, 'normal')
  const lineas = [
    `${etiquetas.generado}: ${reporte.fechaGeneracion}`,
    ...documento.splitTextToSize(`${etiquetas.criterios}: ${reporte.criterios.join(' | ')}`, anchoUtil),
    `${etiquetas.total}: ${reporte.filas.length}`,
  ]
  lineas.forEach((linea) => {
    y += estilo.tamano_texto * estilo.interlineado
    documento.text(linea, estilo.margen, y)
  })
  return y + SEPARACION_BLOQUES * 2
}

function escribirPies(documento: jsPDF) {
  const total = documento.getNumberOfPages()
  const alto = documento.internal.pageSize.getHeight()
  const ancho = documento.internal.pageSize.getWidth()
  documento.setFontSize(estilo.tamano_pie)
  for (let pagina = 1; pagina <= total; pagina += 1) {
    documento.setPage(pagina)
    documento.text(interpolarPlantilla(etiquetas.pagina, { pagina, total }), ancho / 2, alto - estilo.margen / 2, { align: 'center' })
  }
}

export async function generarPdf(reporte: ReporteColaboradores): Promise<ArrayBuffer> {
  const documento = new jsPDF({ orientation: estilo.orientacion as 'landscape', unit: estilo.unidad as 'pt', format: estilo.formato })
  const inicioTabla = escribirCabecera(documento, reporte)
  const columnas = reporte.columnas.map((columna, indice) => ({ columna, indice })).filter(({ columna }) => columna.enPdf)
  const anchoUtil = documento.internal.pageSize.getWidth() - estilo.margen * 2
  const sumaAnchos = columnas.reduce((suma, { columna }) => suma + columna.ancho, 0)
  const estilosColumna = Object.fromEntries(columnas.map(({ columna }, posicion) => [posicion, { cellWidth: (anchoUtil * columna.ancho) / sumaAnchos }]))

  autoTable(documento, {
    ...(catalogoCompartido.reporte_pdf.opciones_tabla as OpcionesTablaPdf),
    startY: inicioTabla,
    head: [columnas.map(({ columna }) => columna.titulo)],
    body: reporte.filas.map((fila) => columnas.map(({ indice }) => fila[indice])),
    margin: { top: estilo.margen, left: estilo.margen, right: estilo.margen, bottom: estilo.margen },
    columnStyles: estilosColumna,
  })
  escribirPies(documento)
  return documento.output('arraybuffer')
}
