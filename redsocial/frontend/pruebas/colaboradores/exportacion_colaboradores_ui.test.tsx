import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { Workbook } from 'exceljs'
import { vi } from 'vitest'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

const botones = catalogoColaboradores.botones
const config = catalogoColaboradores.exportacion
const panelFiltros = catalogoColaboradores.panel_filtros_avanzados
const ETIQUETAS = catalogoColaboradores.menu_exportar.map((opcion) => opcion.etiqueta)
const [EXCEL, PDF, EXCEL_FILTRADOS, PDF_FILTRADOS] = ETIQUETAS

function buscar(texto: string) {
  fireEvent.change(screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador), { target: { value: texto } })
}

function elegir(contenedor: ReturnType<typeof within>, etiqueta: string, opcion: string) {
  fireEvent.mouseDown(contenedor.getByRole('combobox', { name: etiqueta }))
  fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: opcion }))
}

function abrirMenu() {
  fireEvent.click(screen.getByRole('button', { name: botones.exportar }))
  return within(screen.getByRole('menu'))
}

function interceptarDescargas() {
  const blobs: Blob[] = []
  const nombres: string[] = []
  URL.createObjectURL = vi.fn((blob: Blob) => {
    blobs.push(blob)
    return 'blob:prueba'
  })
  URL.revokeObjectURL = vi.fn()
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    nombres.push(this.download)
  })
  return { blobs, nombres }
}

async function leerHoja(blob: Blob) {
  const libro = new Workbook()
  await libro.xlsx.load(await blob.arrayBuffer())
  const hoja = libro.getWorksheet(config.hoja)!
  const total = Number(String(hoja.getCell('A4').value).split(': ')[1])
  return {
    criterios: String(hoja.getCell('A3').value),
    nombres: Array.from({ length: total }, (_, indice) => String(hoja.getRow(7 + indice).getCell(1).value)),
  }
}

async function exportar(etiqueta: string, descargas: ReturnType<typeof interceptarDescargas>) {
  const antes = descargas.blobs.length
  fireEvent.click(abrirMenu().getByRole('menuitem', { name: etiqueta }))
  await waitFor(() => expect(descargas.blobs.length).toBe(antes + 1))
  await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  return descargas.blobs[antes]
}

afterEach(() => vi.restoreAllMocks())

describe('Exportacion de Colaboradores desde la interfaz', { timeout: 60000 }, () => {
  it('el menu ofrece Excel y PDF, con sus variantes filtradas, y ya no ofrece CSV', () => {
    render(<PaginaColaboradores />)
    const opciones = abrirMenu().getAllByRole('menuitem').map((opcion) => opcion.textContent)

    expect(opciones).toHaveLength(4)
    for (const etiqueta of ETIQUETAS) expect(opciones.some((texto) => texto?.endsWith(etiqueta))).toBe(true)
    expect(opciones.join(' ')).not.toMatch(/csv/i)
  })

  it('sin criterios activos solo se habilita la exportacion general', () => {
    render(<PaginaColaboradores />)
    const menu = abrirMenu()

    expect(menu.getByRole('menuitem', { name: EXCEL })).not.toHaveAttribute('aria-disabled', 'true')
    expect(menu.getByRole('menuitem', { name: PDF })).not.toHaveAttribute('aria-disabled', 'true')
    expect(menu.getByRole('menuitem', { name: EXCEL_FILTRADOS })).toHaveAttribute('aria-disabled', 'true')
    expect(menu.getByRole('menuitem', { name: PDF_FILTRADOS })).toHaveAttribute('aria-disabled', 'true')
  })

  it('cambiar solo de pestana no habilita la exportacion filtrada porque seria identica a la general', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('tab', { name: /Activos/ }))

    expect(abrirMenu().getByRole('menuitem', { name: EXCEL_FILTRADOS })).toHaveAttribute('aria-disabled', 'true')
  })

  it('la exportacion general incluye todas las paginas y no solo la visible', async () => {
    const descargas = interceptarDescargas()
    render(<PaginaColaboradores />)
    const hoja = await leerHoja(await exportar(EXCEL, descargas))

    expect(hoja.nombres).toHaveLength(COLABORADORES.length)
    expect(new Set(hoja.nombres)).toEqual(new Set(COLABORADORES.map((colaborador) => colaborador.nombre)))
    expect(descargas.nombres[0]).toMatch(/^colaboradores_\d{8}\.xlsx$/)
  })

  it('la exportacion general respeta la pestana pero no la busqueda; la filtrada respeta ambas', async () => {
    const descargas = interceptarDescargas()
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('tab', { name: /Activos/ }))
    buscar('lópez')

    const general = await leerHoja(await exportar(EXCEL, descargas))
    const filtrada = await leerHoja(await exportar(EXCEL_FILTRADOS, descargas))

    expect(general.nombres.sort()).toEqual(['Carlos Mendoza', 'Jorge Ramírez', 'María López'])
    expect(general.criterios).toContain('Vista: pestaña Activos')
    expect(filtrada.nombres).toEqual(['María López'])
    expect(filtrada.criterios).toContain('Estado: Activos')
    expect(filtrada.criterios).toContain('Búsqueda: lópez')
    expect(descargas.nombres[1]).toMatch(/^colaboradores_filtrados_\d{8}\.xlsx$/)
  })

  it('la exportacion filtrada incluye todos los resultados de todas las paginas y respeta los filtros avanzados', async () => {
    const descargas = interceptarDescargas()
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('button', { name: botones.filtros }))
    const panel = within(screen.getByRole('dialog', { name: panelFiltros.titulo }))
    elegir(panel, panelFiltros.aplicaciones_asignadas.etiqueta, 'Ventas')
    fireEvent.click(panel.getByRole('button', { name: panelFiltros.aplicar }))
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(3)

    const filtrada = await leerHoja(await exportar(EXCEL_FILTRADOS, descargas))

    expect(filtrada.nombres.sort()).toEqual(['Carlos Mendoza', 'Jorge Ramírez', 'María López', 'Rosa Jiménez'])
    expect(filtrada.criterios).toContain('Aplicación asignada: Ventas')
    expect(filtrada.nombres).not.toContain('Ana Torres')
  })

  it('la exportacion respeta el orden elegido', async () => {
    const descargas = interceptarDescargas()
    render(<PaginaColaboradores />)
    elegir(within(document.body), catalogoColaboradores.selectores.ordenar_por.etiqueta, 'Nombre A-Z')

    const hoja = await leerHoja(await exportar(EXCEL, descargas))

    expect(hoja.nombres).toEqual(['Ana Torres', 'Carlos Mendoza', 'Jorge Ramírez', 'Luis Fernández', 'María López', 'Rosa Jiménez'])
    expect(hoja.criterios).toContain('Orden: Nombre A-Z')
  })

  it('la exportacion filtrada combina filtros de columna con la busqueda', async () => {
    const descargas = interceptarDescargas()
    render(<PaginaColaboradores />)
    elegir(within(document.body), catalogoColaboradores.selectores.rol_perfil.etiqueta, 'Contador')
    elegir(within(document.body), catalogoColaboradores.selectores.aplicaciones.etiqueta, 'Reportes')

    const filtrada = await leerHoja(await exportar(EXCEL_FILTRADOS, descargas))

    expect(filtrada.nombres).toEqual(['María López'])
    expect(filtrada.criterios).toContain('Rol / Perfil: Contador')
    expect(filtrada.criterios).toContain('Aplicación: Reportes')
  })

  it('Exportar a PDF descarga un documento PDF', async () => {
    const descargas = interceptarDescargas()
    render(<PaginaColaboradores />)
    const blob = await exportar(PDF, descargas)

    expect(blob.type).toBe(config.formatos.pdf.tipo)
    expect(new TextDecoder('latin1').decode(new Uint8Array(await blob.arrayBuffer())).slice(0, 5)).toBe('%PDF-')
    expect(descargas.nombres[0]).toMatch(/^colaboradores_\d{8}\.pdf$/)
  })

  it('si la generacion falla se muestra un aviso de error accesible', async () => {
    URL.createObjectURL = vi.fn(() => {
      throw new Error('fallo de descarga')
    })
    render(<PaginaColaboradores />)
    fireEvent.click(abrirMenu().getByRole('menuitem', { name: PDF }))

    expect(await screen.findByRole('alert')).toHaveTextContent(catalogoColaboradores.mensajes.exportacion_fallida)
  })
})
