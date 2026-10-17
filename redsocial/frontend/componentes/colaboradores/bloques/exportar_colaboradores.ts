import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import type { AccionesExportar, AmbitoExportacion, CriteriosExportacion, FormatoExportacion, ReporteColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { describirCriterios } from './criterios_exportacion_colaboradores'
import { construirReporte, nombreDeArchivo } from './reporte_colaboradores'

const config = catalogoColaboradores.exportacion

const FORMATOS = config.formatos as Record<FormatoExportacion, { extension: string; tipo: string }>

function baseDeArchivo(ambito: AmbitoExportacion): string {
  return config.archivos[ambito]
}

async function generar(formato: FormatoExportacion, reporte: ReporteColaboradores): Promise<ArrayBuffer> {
  if (formato === 'excel') return (await import('./exportar_excel_colaboradores')).generarExcel(reporte)
  return (await import('./exportar_pdf_colaboradores')).generarPdf(reporte)
}

export function descargarArchivo(contenido: BlobPart, nombre: string, tipo: string): void {
  const url = URL.createObjectURL(new Blob([contenido], { type: tipo }))
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = nombre
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
  URL.revokeObjectURL(url)
}

export async function exportarColaboradores(
  formato: FormatoExportacion,
  ambito: AmbitoExportacion,
  colaboradores: Colaborador[],
  criterios: CriteriosExportacion,
  ahora: number = Date.now(),
): Promise<void> {
  const { extension, tipo } = FORMATOS[formato]
  const reporte = construirReporte(colaboradores, describirCriterios(criterios, ambito), ahora)
  descargarArchivo(await generar(formato, reporte), nombreDeArchivo(baseDeArchivo(ambito), extension, ahora), tipo)
}

export function crearAccionesExportar(
  vista: Colaborador[],
  filtrados: Colaborador[],
  criterios: CriteriosExportacion,
  hayCriterios: boolean,
  alFallo: () => void,
): AccionesExportar {
  const lanzar = (formato: FormatoExportacion, ambito: AmbitoExportacion, datos: Colaborador[]) => () => {
    exportarColaboradores(formato, ambito, datos, criterios).catch(alFallo)
  }
  return {
    excel: lanzar('excel', 'vista', vista),
    pdf: lanzar('pdf', 'vista', vista),
    excel_filtrados: hayCriterios ? lanzar('excel', 'filtrados', filtrados) : undefined,
    pdf_filtrados: hayCriterios ? lanzar('pdf', 'filtrados', filtrados) : undefined,
  }
}
