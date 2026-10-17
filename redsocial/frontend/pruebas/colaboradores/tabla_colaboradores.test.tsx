import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

const selectores = catalogoColaboradores.selectores
const total = COLABORADORES.length
const resumen = (desde: number, hasta: number, cantidad: number) =>
  catalogoColaboradores.paginacion.resumen.replace('{desde}', String(desde)).replace('{hasta}', String(hasta)).replace('{total}', String(cantidad))

function filasDeDatos() {
  return screen.getAllByRole('row').slice(1)
}

function nombresVisibles() {
  return filasDeDatos().map((fila) => fila.querySelector('input[type="checkbox"]')?.getAttribute('aria-label'))
}

function buscar(texto: string) {
  fireEvent.change(screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador), { target: { value: texto } })
}

function elegir(etiqueta: string, opcion: string) {
  fireEvent.mouseDown(screen.getByRole('combobox', { name: etiqueta }))
  fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: opcion }))
}

function filaDe(nombre: string) {
  return screen.getByRole('checkbox', { name: nombre }).closest('tr') as HTMLElement
}

describe('Tabla de colaboradores', { timeout: 30000 }, () => {
  it('muestra la primera pagina con tres filas, las cabeceras del catalogo y el resumen', () => {
    render(<PaginaColaboradores />)

    expect(filasDeDatos()).toHaveLength(3)
    expect(screen.getByText(resumen(1, 3, total))).toBeInTheDocument()
    const cabeceras = screen.getAllByRole('columnheader').map((th) => th.textContent)
    expect(cabeceras).toEqual(['', ...Object.values(catalogoColaboradores.tabla)])
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

  it('las pestanas filtran por estado y muestran cuantos hay', () => {
    render(<PaginaColaboradores />)
    const invitados = screen.getByRole('tab', { name: /Invitados/ })
    expect(invitados).toHaveTextContent('1')

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

  it('selecciona filas y la casilla de cabecera refleja el estado intermedio', () => {
    render(<PaginaColaboradores />)
    const cabecera = screen.getByRole('checkbox', { name: catalogoColaboradores.botones.seleccionar_todos })
    const carlos = screen.getByRole('checkbox', { name: 'Carlos Mendoza' })

    expect(cabecera).not.toBeChecked()
    fireEvent.click(carlos)
    expect(carlos).toBeChecked()
    expect(cabecera).toHaveAttribute('data-indeterminate', 'true')

    fireEvent.click(cabecera)
    expect(screen.getAllByRole('checkbox').filter((casilla) => (casilla as HTMLInputElement).checked)).toHaveLength(4)
    expect(cabecera).toBeChecked()

    fireEvent.click(cabecera)
    expect(screen.getAllByRole('checkbox').some((casilla) => (casilla as HTMLInputElement).checked)).toBe(false)
  })

  it('la seleccion se limita a la pagina visible', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('checkbox', { name: catalogoColaboradores.botones.seleccionar_todos }))
    fireEvent.click(screen.getByRole('button', { name: /page 2/i }))

    expect(screen.getByRole('checkbox', { name: catalogoColaboradores.botones.seleccionar_todos })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Rosa Jiménez' })).not.toBeChecked()
  })

  it('el menu de la fila ofrece tres acciones y se cierra con Escape', () => {
    render(<PaginaColaboradores />)
    const boton = within(filaDe('Carlos Mendoza')).getByRole('button', { name: catalogoColaboradores.botones.mas_opciones })
    boton.focus()
    fireEvent.click(boton)

    const menu = screen.getByRole('menu')
    expect(within(menu).getAllByRole('menuitem').map((item) => item.textContent)).toEqual([
      catalogoColaboradores.botones.ver_colaborador,
      catalogoColaboradores.botones.editar_colaborador,
      catalogoColaboradores.botones.dar_de_baja,
    ])

    fireEvent.keyDown(menu, { key: 'Escape' })
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('elegir una accion cierra el menu', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(within(filaDe('Carlos Mendoza')).getByRole('button', { name: catalogoColaboradores.botones.mas_opciones }))
    fireEvent.click(screen.getByRole('menuitem', { name: catalogoColaboradores.botones.ver_colaborador }))

    expect(screen.queryByRole('menu')).toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: catalogoColaboradores.secciones.detalle_colaborador })).toBeInTheDocument()
  })

  it('cada fila tiene casilla con nombre accesible y botones con nombre', () => {
    render(<PaginaColaboradores />)
    for (const fila of filasDeDatos()) {
      expect(within(fila).getByRole('checkbox')).toHaveAccessibleName()
      for (const boton of within(fila).getAllByRole('button')) expect(boton).toHaveAccessibleName()
    }
  })
})
