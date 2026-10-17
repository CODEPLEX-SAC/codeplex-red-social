import dayjs from 'dayjs'
import { vi } from 'vitest'
import { crearAccionesExportar, exportarColaboradores } from '@/componentes/colaboradores/bloques/exportar_colaboradores'
import { describirCriterios } from '@/componentes/colaboradores/bloques/criterios_exportacion_colaboradores'
import { crearFiltrosAvanzadosColaboradores } from '@/componentes/colaboradores/bloques/logica_filtros_avanzados_colaboradores'
import { construirReporte, nombreDeArchivo } from '@/componentes/colaboradores/bloques/reporte_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'
import { bytesComoTexto, interceptarDescargas, leerExcel } from './apoyo_exportacion'

vi.setConfig({ testTimeout: 30000 })

const config = catalogoColaboradores.exportacion
const AHORA = new Date(2026, 9, 15, 9, 30).getTime()
const SUFIJO_FECHA = '20261015'
const criteriosBase = () => ({ pestana: 'Todos', busqueda: '', rol: 'Todos', aplicacion: 'Todas', ordenarPor: 'Más recientes', avanzados: crearFiltrosAvanzadosColaboradores() })

afterEach(() => vi.restoreAllMocks())

describe('criterios del reporte', () => {
  it('la vista general describe la pestana y el orden, sin inventar filtros', () => {
    expect(describirCriterios({ ...criteriosBase(), pestana: 'Activos' }, 'vista')).toEqual(['Vista: pestaña Activos (todos los registros)', 'Orden: Más recientes'])
  })

  it('el reporte filtrado enumera cada criterio realmente aplicado', () => {
    const avanzados = { ...crearFiltrosAvanzadosColaboradores(), fechaInicio: dayjs('2026-05-01'), accesoVigente: true, aplicaciones: 'Ventas' }
    const criterios = { ...criteriosBase(), pestana: 'Activos', busqueda: ' lópez ', rol: 'Contador', aplicacion: 'Inventario', ordenarPor: 'Nombre A-Z', avanzados }
    expect(describirCriterios(criterios, 'filtrados')).toEqual([
      'Resultados filtrados',
      'Estado: Activos',
      'Búsqueda: lópez',
      'Rol / Perfil: Contador',
      'Aplicación: Inventario',
      'Vigencia de acceso desde: 01/05/2026',
      'Con acceso vigente',
      'Aplicación asignada: Ventas',
      'Orden: Nombre A-Z',
    ])
  })

  it('un criterio en su valor por defecto no aparece', () => {
    expect(describirCriterios(criteriosBase(), 'filtrados')).toEqual(['Resultados filtrados', 'Orden: Más recientes'])
  })
})

describe('reporte de colaboradores', () => {
  it('trae titulo, fecha de generacion y una fila por colaborador en el orden de las columnas', () => {
    const reporte = construirReporte(COLABORADORES.slice(0, 1), ['Criterio'], AHORA)
    expect(reporte.titulo).toBe(config.titulo)
    expect(reporte.fechaGeneracion).toBe('15/10/2026 09:30')
    expect(reporte.columnas.map((columna) => columna.titulo)).toEqual(config.columnas.map((columna) => columna.titulo))
    expect(reporte.filas[0]).toEqual([
      'Carlos Mendoza', 'carlos.mendoza@gmail.com', '+51 987 654 321', 'Administrador', 'Acceso total',
      'Planillas, Contabilidad, Inventario, Ventas, Compras, Proyectos, Reportes, Configuración',
      'Activo', '01/06/2026', '01/06/2027', '28/05/2026', 'Hoy, 10:24 AM',
    ])
  })

  it('nombra el archivo con la base, la fecha y la extension', () => {
    expect(nombreDeArchivo('colaboradores', '.xlsx', AHORA)).toBe(`colaboradores_${SUFIJO_FECHA}.xlsx`)
  })
})

describe('exportacion completa', () => {
  it('descarga un .xlsx con el nombre, el tipo y los registros indicados', async () => {
    const { blobs, nombres } = interceptarDescargas()
    await exportarColaboradores('excel', 'filtrados', COLABORADORES.slice(0, 2), { ...criteriosBase(), busqueda: 'a' }, AHORA)

    expect(nombres).toEqual([`colaboradores_filtrados_${SUFIJO_FECHA}.xlsx`])
    expect(blobs[0].type).toBe(config.formatos.excel.tipo)
    const hoja = (await leerExcel(blobs[0])).getWorksheet(config.hoja)!
    expect(hoja.getCell('A4').value).toBe('Total de registros: 2')
    expect(hoja.getCell('A3').value).toContain('Búsqueda: a')
  })

  it('descarga un .pdf con el nombre y el tipo de la vista general', async () => {
    const { blobs, nombres } = interceptarDescargas()
    await exportarColaboradores('pdf', 'vista', COLABORADORES, criteriosBase(), AHORA)

    expect(nombres).toEqual([`colaboradores_${SUFIJO_FECHA}.pdf`])
    expect(blobs[0].type).toBe(config.formatos.pdf.tipo)
    expect(bytesComoTexto(await blobs[0].arrayBuffer())).toContain('Vista: pestaña Todos')
  })

  it('ya no existe ninguna exportacion CSV', () => {
    expect(catalogoColaboradores.menu_exportar.map((opcion) => opcion.clave)).toEqual(['excel', 'pdf', 'excel_filtrados', 'pdf_filtrados'])
    expect(JSON.stringify(catalogoColaboradores.exportacion)).not.toMatch(/csv/i)
  })
})

describe('acciones del menu de exportacion', () => {
  it('sin criterios activos solo ofrece la exportacion general', () => {
    const acciones = crearAccionesExportar(COLABORADORES, COLABORADORES, criteriosBase(), false, vi.fn())
    expect(acciones.excel).toBeTypeOf('function')
    expect(acciones.pdf).toBeTypeOf('function')
    expect(acciones.excel_filtrados).toBeUndefined()
    expect(acciones.pdf_filtrados).toBeUndefined()
  })

  it('con criterios activos la exportacion filtrada usa los registros filtrados y la general los de la vista', async () => {
    const { blobs, nombres } = interceptarDescargas()
    const acciones = crearAccionesExportar(COLABORADORES, COLABORADORES.slice(0, 2), criteriosBase(), true, vi.fn())
    acciones.excel_filtrados?.()
    acciones.excel?.()
    await vi.waitFor(() => expect(nombres).toHaveLength(2))

    const hoy = dayjs().format(config.formato_fecha_archivo)
    const totales = await Promise.all(blobs.map(async (blob) => (await leerExcel(blob)).getWorksheet(config.hoja)!.getCell('A4').value))
    expect([...nombres].sort()).toEqual([`colaboradores_${hoy}.xlsx`, `colaboradores_filtrados_${hoy}.xlsx`])
    expect([...totales].sort()).toEqual([`Total de registros: ${COLABORADORES.length}`, 'Total de registros: 2'].sort())
  })

  it('si la generacion falla avisa al usuario', async () => {
    URL.createObjectURL = vi.fn(() => {
      throw new Error('fallo de descarga')
    })
    const fallo = vi.fn()
    crearAccionesExportar(COLABORADORES, COLABORADORES, criteriosBase(), false, fallo).pdf?.()
    await vi.waitFor(() => expect(fallo).toHaveBeenCalled())
  })
})
