import { vi } from 'vitest'
import { generarPdf } from '@/componentes/colaboradores/bloques/exportar_pdf_colaboradores'
import { construirReporte } from '@/componentes/colaboradores/bloques/reporte_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'
import { bytesComoTexto, paginasDelPdf } from './apoyo_exportacion'

const config = catalogoColaboradores.exportacion
const AHORA = new Date(2026, 9, 15, 9, 30).getTime()

const textoDelPdf = bytesComoTexto

vi.setConfig({ testTimeout: 30000 })

describe('archivo PDF', () => {
  const generar = (cantidad: number, criterios: string[] = ['Criterio de prueba']) => {
    const base = Array.from({ length: cantidad }, (_, indice) => ({ ...COLABORADORES[indice % COLABORADORES.length], nombre: `Persona ${indice + 1}`, correo: `persona${indice + 1}@correo.pe` }))
    return generarPdf(construirReporte(base, criterios, AHORA))
  }

  it('es un documento PDF valido', async () => {
    const buffer = await generar(3)
    expect(bytesComoTexto(buffer).slice(0, 5)).toBe('%PDF-')
    expect(bytesComoTexto(buffer)).toContain('%%EOF')
  })

  it('incluye titulo, fecha, criterios, total, encabezados y datos', async () => {
    const texto = textoDelPdf(await generarPdf(construirReporte(COLABORADORES, ['Estado: Activos', 'Búsqueda: lópez'], AHORA)))
    for (const esperado of [config.titulo, 'Generado el: 15/10/2026 09:30', 'Estado: Activos', `Total de registros: ${COLABORADORES.length}`, 'Nombre', 'Correo', 'Aplicaciones', 'Carlos Mendoza', 'carlos.mendoza@gmail.com', 'Rosa Jim']) {
      expect(texto).toContain(esperado)
    }
  })

  it('no incluye controles de interfaz ni las columnas que solo van en Excel', async () => {
    const texto = textoDelPdf(await generar(2))
    for (const ajeno of ['Más opciones', 'Seleccionar', 'Reenviar', 'Descripción del rol', 'Último acceso']) expect(texto).not.toContain(ajeno)
  })

  it('pagina el documento, repite los encabezados y numera las paginas', async () => {
    const buffer = await generar(60)
    const paginas = paginasDelPdf(buffer)
    const texto = textoDelPdf(buffer)
    expect(paginas).toBeGreaterThan(1)
    expect((texto.match(/\(Nombre\) Tj/g) ?? []).length).toBe(paginas)
    expect(texto).toContain(`Página ${paginas} de ${paginas}`)
    expect(texto).toContain('Persona 60')
  })
})

