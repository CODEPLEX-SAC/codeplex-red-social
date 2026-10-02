import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

function buscar(nombre: string) {
  const buscador = screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador)
  fireEvent.change(buscador, { target: { value: nombre } })
}

function abrirDetalle(nombre: string) {
  buscar(nombre)
  const fila = screen.getByRole('checkbox', { name: nombre }).closest('tr') as HTMLElement
  const boton = within(fila).getByRole('button', { name: catalogoColaboradores.botones.mas_opciones })
  fireEvent.click(boton)
  fireEvent.click(screen.getByText(catalogoColaboradores.botones.ver_colaborador))
  const titulo = screen.getByRole('heading', { level: 2, name: catalogoColaboradores.secciones.detalle_colaborador })
  return within(titulo.closest('aside') as HTMLElement)
}

describe('SeccionDetalleColaborador', () => {
  it('muestra el colaborador seleccionado y no uno fijo', () => {
    render(<PaginaColaboradores />)
    const detalle = abrirDetalle('María López')
    expect(detalle.getByRole('heading', { level: 3 }).textContent).toBe('María López')
    expect(detalle.getAllByText('Contador').length).toBeGreaterThan(0)
    expect(detalle.getByText('Activo')).toBeTruthy()
    expect(detalle.queryByText('Invitación aceptada')).toBeNull()
  })

  it('muestra las aplicaciones con nombre y el historial cuando existen', () => {
    render(<PaginaColaboradores />)
    const detalle = abrirDetalle('Carlos Mendoza')
    expect(detalle.getByRole('heading', { level: 3 }).textContent).toBe('Carlos Mendoza')
    expect(detalle.getByText('Calendario')).toBeTruthy()
    expect(detalle.getByText('Invitación aceptada')).toBeTruthy()
  })

  it('muestra una sola acción de edición y ya no muestra las acciones de acceso', () => {
    render(<PaginaColaboradores />)
    const detalle = abrirDetalle('Rosa Jiménez')
    expect(detalle.getByRole('heading', { level: 3 }).textContent).toBe('Rosa Jiménez')
    expect(detalle.getByText('Baja')).toBeTruthy()
    expect(detalle.getAllByText(catalogoColaboradores.botones.editar_colaborador)).toHaveLength(1)
    expect(detalle.queryByText(catalogoColaboradores.botones.editar)).toBeNull()
    expect(detalle.queryByText(catalogoColaboradores.botones.desactivar_acceso)).toBeNull()
    expect(detalle.queryByText(catalogoColaboradores.botones.dar_de_baja)).toBeNull()
  })

  it('al confirmar la baja desde el menú de la fila muestra el diálogo con el nombre del colaborador', () => {
    render(<PaginaColaboradores />)
    buscar('Rosa Jiménez')
    const fila = screen.getByRole('checkbox', { name: 'Rosa Jiménez' }).closest('tr') as HTMLElement
    fireEvent.click(within(fila).getByRole('button', { name: catalogoColaboradores.botones.mas_opciones }))
    fireEvent.click(screen.getByText(catalogoColaboradores.botones.dar_de_baja))
    const dialogo = within(screen.getByRole('dialog'))
    expect(dialogo.getByText('¿Dar de baja a Rosa Jiménez?')).toBeTruthy()
    expect(dialogo.getByText(catalogoColaboradores.confirmar_baja.motivo.etiqueta)).toBeTruthy()
  })
})
