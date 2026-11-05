import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

const grupos = catalogoMensajeria.grupos
const modal = grupos.modal

function abrirGrupos() {
  render(<PaginaMensajesTodos />)
  fireEvent.click(screen.getByRole('button', { name: grupos.menu }))
  fireEvent.click(screen.getByRole('menuitem', { name: new RegExp(grupos.opcion) }))
}

describe('Mensajes: filtros, menú y vista de grupos', { timeout: 30000 }, () => {
  it('los filtros no se estiran y el menú ⋮ al extremo solo ofrece «Grupos»', () => {
    render(<PaginaMensajesTodos />)
    const clases = catalogoMensajeria.clases.lista
    const chip = screen.getByRole('button', { name: catalogoMensajeria.titulos_pestanas.todos, pressed: true })
    for (const clase of clases.chip.split(' ')) expect(chip).toHaveClass(clase)
    expect(clases.chip).not.toMatch(/flex-1/)
    const menu = screen.getByRole('button', { name: grupos.menu })
    expect(menu).toHaveClass('ml-auto')
    fireEvent.click(menu)
    expect(within(screen.getByRole('menu')).getAllByRole('menuitem')).toHaveLength(1)
  })

  it('«Grupos» sustituye las conversaciones por los grupos con la misma estructura de fila y permite volver', () => {
    abrirGrupos()
    expect(screen.getByRole('heading', { name: grupos.titulo })).toBeInTheDocument()
    const filas = document.querySelectorAll('[data-fila-conversacion]')
    expect(filas.length).toBeGreaterThan(0)
    const lista = () => within(document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement)
    expect(lista().queryByText('Carmen López')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: grupos.volver }))
    expect(lista().getByText('Carmen López')).toBeInTheDocument()
  })

  it('el modal busca participantes por nombre y solo habilita los datos del grupo tras añadir a uno', () => {
    abrirGrupos()
    fireEvent.click(screen.getByRole('button', { name: grupos.crear }))
    const dialogo = within(screen.getByRole('dialog', { name: modal.titulo }))
    expect(dialogo.queryAllByRole('checkbox')).toHaveLength(0)
    expect(dialogo.getByText(modal.participantes_ayuda)).toBeInTheDocument()
    expect(dialogo.getByLabelText(modal.descripcion)).toBeDisabled()
    expect(dialogo.getByRole('button', { name: modal.imagen_elegir })).toBeDisabled()
    expect(dialogo.getByRole('button', { name: modal.confirmar })).toBeDisabled()

    fireEvent.change(dialogo.getByRole('searchbox', { name: modal.buscar }), { target: { value: 'zzz' } })
    expect(dialogo.getByText(modal.buscar_vacio)).toBeInTheDocument()
    fireEvent.change(dialogo.getByRole('searchbox', { name: modal.buscar }), { target: { value: 'carmen' } })
    fireEvent.click(dialogo.getByRole('button', { name: modal.agregar.replace(':nombre', 'Carmen López') }))
    expect(dialogo.getByRole('button', { name: modal.quitar.replace(':nombre', 'Carmen López') })).toBeInTheDocument()
    expect(dialogo.getByLabelText(modal.descripcion)).toBeEnabled()
    expect(dialogo.getByRole('button', { name: modal.imagen_elegir })).toBeEnabled()

    fireEvent.click(dialogo.getByRole('button', { name: modal.confirmar }))
    expect(dialogo.getByText(modal.errores.nombre_vacio)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: modal.quitar.replace(':nombre', 'Carmen López') }))
    expect(dialogo.getByRole('button', { name: modal.confirmar })).toBeDisabled()
  })

  it('crear un grupo lo añade a la lista de grupos y lo deja abierto; Cancelar no crea nada', () => {
    abrirGrupos()
    const antes = document.querySelectorAll('[data-fila-conversacion]').length
    fireEvent.click(screen.getByRole('button', { name: grupos.crear }))
    fireEvent.click(within(screen.getByRole('dialog', { name: modal.titulo })).getByRole('button', { name: modal.cancelar }))
    expect(screen.queryByRole('dialog', { name: modal.titulo })).toBeNull()
    expect(document.querySelectorAll('[data-fila-conversacion]')).toHaveLength(antes)

    fireEvent.click(screen.getByRole('button', { name: grupos.crear }))
    const dialogo = within(screen.getByRole('dialog', { name: modal.titulo }))
    fireEvent.change(dialogo.getByRole('searchbox', { name: modal.buscar }), { target: { value: 'luis' } })
    fireEvent.click(dialogo.getAllByRole('button', { name: /^Agregar a / })[0])
    fireEvent.change(dialogo.getByRole('textbox', { name: new RegExp(modal.nombre) }), { target: { value: 'Equipo Alfa' } })
    fireEvent.click(dialogo.getByRole('button', { name: modal.confirmar }))
    expect(screen.queryByRole('dialog', { name: modal.titulo })).toBeNull()
    expect(document.querySelectorAll('[data-fila-conversacion]')).toHaveLength(antes + 1)
    expect(screen.getAllByText('Equipo Alfa').length).toBeGreaterThan(0)
  })
})
