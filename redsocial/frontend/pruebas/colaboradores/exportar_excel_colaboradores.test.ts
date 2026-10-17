import { vi } from 'vitest'
import { ValueType } from 'exceljs'
import { generarExcel } from '@/componentes/colaboradores/bloques/exportar_excel_colaboradores'
import { construirReporte } from '@/componentes/colaboradores/bloques/reporte_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'
import { bytesComoTexto, leerExcel } from './apoyo_exportacion'

const config = catalogoColaboradores.exportacion
const AHORA = new Date(2026, 9, 15, 9, 30).getTime()

vi.setConfig({ testTimeout: 30000 })

describe('archivo Excel', () => {
  it('es un .xlsx valido con titulo, fecha, criterios, total, encabezados y todos los datos', async () => {
    const reporte = construirReporte(COLABORADORES, ['Vista: pestaña Todos (todos los registros)', 'Orden: Más recientes'], AHORA)
    const buffer = await generarExcel(reporte)
    expect(bytesComoTexto(buffer).slice(0, 2)).toBe('PK')

    const hoja = (await leerExcel(buffer)).getWorksheet(config.hoja)!
    expect(hoja.getCell('A1').value).toBe(config.titulo)
    expect(hoja.getCell('A2').value).toBe('Generado el: 15/10/2026 09:30')
    expect(hoja.getCell('A3').value).toBe('Criterios aplicados: Vista: pestaña Todos (todos los registros) | Orden: Más recientes')
    expect(hoja.getCell('A4').value).toBe(`Total de registros: ${COLABORADORES.length}`)
    expect(config.columnas.map((_, indice) => hoja.getRow(6).getCell(indice + 1).value)).toEqual(config.columnas.map((columna) => columna.titulo))
    expect(COLABORADORES.map((_, indice) => hoja.getRow(7 + indice).getCell(1).value)).toEqual(COLABORADORES.map((colaborador) => colaborador.nombre))
    expect(hoja.getRow(7 + COLABORADORES.length).getCell(1).value).toBeNull()
  })

  it('escribe todos los datos de cada columna, incluido estado y vigencia', async () => {
    const hoja = (await leerExcel(await generarExcel(construirReporte(COLABORADORES, [], AHORA)))).getWorksheet(config.hoja)!
    const rosa = COLABORADORES.findIndex((colaborador) => colaborador.nombre === 'Rosa Jiménez')
    const fila = config.columnas.map((_, indice) => hoja.getRow(7 + rosa).getCell(indice + 1).value)
    expect(fila).toEqual(['Rosa Jiménez', 'rosa.jimenez@gmail.com', '+51 987 111 222', 'Asistente', 'Soporte', 'Ventas, Proyectos', 'Baja', '05/05/2026', '', '', ''])
  })

  it('el contenido de los datos nunca se interpreta como formula', async () => {
    const hostil = { ...COLABORADORES[0], nombre: '=HYPERLINK("destino","clic")', descripcionRol: '+SUMA(1;1)', telefono: '@cmd', correo: '-1+1' }
    const hoja = (await leerExcel(await generarExcel(construirReporte([hostil], [], AHORA)))).getWorksheet(config.hoja)!
    for (const columna of [1, 2, 3, 5]) {
      const celda = hoja.getRow(7).getCell(columna)
      expect(celda.type).toBe(ValueType.String)
      expect(celda.formula).toBeUndefined()
    }
    expect(hoja.getRow(7).getCell(1).value).toBe('=HYPERLINK("destino","clic")')
  })

  it('congela la cabecera, activa el filtro y ajusta el ancho de las columnas', async () => {
    const hoja = (await leerExcel(await generarExcel(construirReporte(COLABORADORES, [], AHORA)))).getWorksheet(config.hoja)!
    expect(hoja.views[0]).toMatchObject({ state: 'frozen', ySplit: 6 })
    expect(hoja.autoFilter).toBeTruthy()
    expect(hoja.getColumn(1).width).toBe(config.columnas[0].ancho)
  })
})

