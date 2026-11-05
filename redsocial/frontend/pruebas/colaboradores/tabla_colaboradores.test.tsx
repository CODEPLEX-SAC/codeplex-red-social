import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

vi.mock('@/componentes/colaboradores/bloques/colaboradores_tabla_config', async (importarOriginal) => ({
  ...(await importarOriginal<typeof import('@/componentes/colaboradores/bloques/colaboradores_tabla_config')>()),
  TAMANO_PAGINA_COLABORADORES: 3,
}))

const selectores = catalogoColaboradores.selectores
const total = COLABORADORES.length
const resumen = (desde: number, hasta: number, cantidad: number) =>
  catalogoColaboradores.paginacion.resumen.replace('{desde}', String(desde)).replace('{hasta}', String(hasta)).replace('{total}', String(cantidad))

function filasDeDatos() {
  return screen.getAllByRole('row').slice(1)
}

function nombresVisibles() {
  return filasDeDatos().map((fila) => fila.querySelector('span.truncate')?.textContent)
}

function buscar(texto: string) {
  fireEvent.change(screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador), { target: { value: texto } })
}

function elegir(etiqueta: string, opcion: string) {
  fireEvent.mouseDown(screen.getByRole('combobox', { name: etiqueta }))
  fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: opcion }))
}

function filaDe(nombre: string) {
  return screen.getByText(nombre, { selector: 'span.truncate' }).closest('tr') as HTMLElement
}

describe('Tabla de colaboradores', { timeout: 30000 }, () => {
  it('muestra la primera pagina con tres filas, las cabeceras del catalogo y el resumen', () => {
    render(<PaginaColaboradores />)

    expect(filasDeDatos()).toHaveLength(3)
    expect(screen.getByText(resumen(1, 3, total))).toBeInTheDocument()
    const cabeceras = screen.getAllByRole('columnheader').map((th) => th.textContent)
    expect(cabeceras).toEqual(Object.values(catalogoColaboradores.tabla))
  })

  it('busca por nombre, correo o telefono y vuelve a la primera pagina', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('button', { name: /page 2/i }))
    expect(screen.getByText(resumen(4, 6, total))).toBeInTheDocument()

    buscar('lopez@gmail')
    expect(nombresVisibles()).toEqual(['María López'])
    expect(screen.getByText(resumen(1, 1, 1))).toBeInTheDocument()

    buscar('987 111 222')
    expect(nombresVisibles()).toEqual(['Rosa Jiménez'])

    buscar('CARLOS')
    expect(nombresVisibles()).toEqual(['Carlos Mendoza'])
  })

  it('muestra el mensaje de estado vacio y un resumen en cero cuando nada coincide', () => {
    render(<PaginaColaboradores />)
    buscar('persona inexistente')

    expect(filasDeDatos()).toHaveLength(1)
    expect(screen.getByText(catalogoColaboradores.mensajes.sin_colaboradores)).toBeInTheDocument()
    expect(screen.getByText(resumen(0, 0, 0))).toBeInTheDocument()
  })

  it('las pestanas filtran por estado y no llevan contador', () => {
    render(<PaginaColaboradores />)
    const invitados = screen.getByRole('tab', { name: /Invitados/ })
    expect(invitados.textContent?.trim()).toBe('Invitados')
    expect(screen.getAllByRole('tab').every((pestana) => !/\d/.test(pestana.textContent ?? ''))).toBe(true)

    fireEvent.click(invitados)
    expect(nombresVisibles()).toEqual(['Ana Torres'])
    fireEvent.click(screen.getByRole('tab', { name: /Baja/ }))
    expect(nombresVisibles()).toEqual(['Rosa Jiménez'])
    fireEvent.click(screen.getByRole('tab', { name: /Todos/ }))
    expect(screen.getByText(resumen(1, 3, total))).toBeInTheDocument()
  })

  it('filtra por rol y por aplicacion, y combina ambos filtros', () => {
    render(<PaginaColaboradores />)

    elegir(selectores.rol_perfil.etiqueta, 'Administrador')
    expect(nombresVisibles()).toEqual(['Carlos Mendoza'])

    elegir(selectores.rol_perfil.etiqueta, selectores.rol_perfil.opciones[0])
    elegir(selectores.aplicaciones.etiqueta, 'Ventas')
    expect(screen.getByText(resumen(1, 3, 4))).toBeInTheDocument()

    elegir(selectores.rol_perfil.etiqueta, 'Contador')
    expect(nombresVisibles()).toEqual(['María López'])

    elegir(selectores.aplicaciones.etiqueta, 'Configuración')
    expect(screen.getByText(catalogoColaboradores.mensajes.sin_colaboradores)).toBeInTheDocument()
  })

  it('ordena con el selector Ordenar por', () => {
    render(<PaginaColaboradores />)
    const [masRecientes, masAntiguos, aZ, zA] = selectores.ordenar_por.opciones

    expect(nombresVisibles()).toEqual(['Carlos Mendoza', 'Ana Torres', 'María López'])
    elegir(selectores.ordenar_por.etiqueta, masAntiguos)
    expect(nombresVisibles()).toEqual(['Luis Fernández', 'Jorge Ramírez', 'Rosa Jiménez'])
    elegir(selectores.ordenar_por.etiqueta, aZ)
    expect(nombresVisibles()).toEqual(['Ana Torres', 'Carlos Mendoza', 'Jorge Ramírez'])
    elegir(selectores.ordenar_por.etiqueta, zA)
    expect(nombresVisibles()).toEqual(['Rosa Jiménez', 'María López', 'Luis Fernández'])
    elegir(selectores.ordenar_por.etiqueta, masRecientes)
    expect(nombresVisibles()[0]).toBe('Carlos Mendoza')
  })

  it('pagina el listado en ambos sentidos', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('button', { name: /page 2/i }))
    expect(filasDeDatos()).toHaveLength(3)
    expect(screen.getByText(resumen(4, 6, total))).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /page 1/i }))
    expect(screen.getByText(resumen(1, 3, total))).toBeInTheDocument()
  })

  it('la tabla no ofrece casillas de seleccion ni columna reservada para ellas', () => {
    render(<PaginaColaboradores />)
    expect(screen.queryAllByRole('checkbox', { name: /Carlos Mendoza/ })).toHaveLength(0)
    expect(within(screen.getByRole('table')).queryAllByRole('checkbox')).toHaveLength(0)
    expect(screen.getAllByRole('columnheader')).toHaveLength(Object.keys(catalogoColaboradores.tabla).length)
  })

  it('la fila ofrece tres acciones visibles con nombre accesible y sin menu', () => {
    render(<PaginaColaboradores />)
    const fila = within(filaDe('Carlos Mendoza'))
    const botones = catalogoColaboradores.botones
    expect(fila.getByRole('button', { name: botones.accion_ver.replace(':nombre', 'Carlos Mendoza') })).toBeInTheDocument()
    expect(fila.getByRole('button', { name: botones.accion_editar.replace(':nombre', 'Carlos Mendoza') })).toBeInTheDocument()
    expect(fila.getByRole('button', { name: botones.accion_baja.replace(':nombre', 'Carlos Mendoza') })).toBeInTheDocument()
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('elegir Ver abre el detalle del colaborador', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(within(filaDe('Carlos Mendoza')).getByRole('button', { name: catalogoColaboradores.botones.accion_ver.replace(':nombre', 'Carlos Mendoza') }))

    expect(screen.getByRole('heading', { level: 2, name: catalogoColaboradores.secciones.detalle_colaborador })).toBeInTheDocument()
  })

  it('cada fila tiene botones con nombre accesible', () => {
    render(<PaginaColaboradores />)
    for (const fila of filasDeDatos()) {
      for (const boton of within(fila).getAllByRole('button')) expect(boton).toHaveAccessibleName()
    }
  })
})
