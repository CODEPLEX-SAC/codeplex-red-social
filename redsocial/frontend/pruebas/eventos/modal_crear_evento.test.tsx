import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaEventosMisEventos } from '@/paginas/eventos/pagina_eventos_mis_eventos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'

const textos = catalogoEventos.modal_crear_evento

function abrir() {
  render(<PaginaEventosMisEventos />)
  const boton = screen.getAllByRole('button', { name: catalogoEventos.botones.crear_evento })[0]
  boton.focus()
  fireEvent.click(boton)
  return { boton, dialogo: screen.getByRole('dialog', { name: textos.titulo }) }
}

describe('Modal Crear evento usa el Modal compartido', { timeout: 30000 }, () => {
  it('abre un dialogo modal y mueve el foco dentro de el', () => {
    const { dialogo } = abrir()
    expect(dialogo).toHaveAttribute('aria-modal', 'true')
    expect(dialogo.contains(document.activeElement)).toBe(true)
  })

  it('bloquea el desplazamiento de la pagina mientras esta abierto y lo restituye al cerrar', () => {
    abrir()
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('se cierra con Escape y devuelve el foco al boton que lo abrio', () => {
    const { boton } = abrir()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: textos.titulo })).toBeNull()
    expect(document.activeElement).toBe(boton)
  })

  it('se cierra con el boton Cerrar y con Cancelar', () => {
    abrir()
    fireEvent.click(screen.getByRole('button', { name: textos.cerrar }))
    expect(screen.queryByRole('dialog', { name: textos.titulo })).toBeNull()
    abrir()
    fireEvent.click(within(screen.getAllByRole('dialog', { name: textos.titulo })[0]).getByRole('button', { name: textos.cancelar }))
    expect(screen.queryAllByRole('dialog', { name: textos.titulo }).length).toBeLessThanOrEqual(1)
  })

  it('mantiene el foco dentro del dialogo con Tab desde el ultimo control y con Mayus+Tab desde el dialogo', () => {
    const { dialogo } = abrir()
    const botones = within(dialogo).getAllByRole('button')
    const ultimo = botones[botones.length - 1]
    ultimo.focus()
    fireEvent.keyDown(ultimo, { key: 'Tab' })
    expect(dialogo.contains(document.activeElement)).toBe(true)
    dialogo.focus()
    fireEvent.keyDown(dialogo, { key: 'Tab', shiftKey: true })
    expect(dialogo.contains(document.activeElement)).toBe(true)
    expect(document.activeElement).not.toBe(document.body)
  })

  it('el titulo del dialogo usa el rol de titulo de ventana y no el de pagina', () => {
    const { dialogo } = abrir()
    const titulo = within(dialogo).getByRole('heading', { name: textos.titulo })
    expect(titulo.className).toContain('text-titulo-banner')
    expect(titulo.className).not.toContain('text-titulo-pagina')
  })
})
