import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { FondoPanelFlotante } from '../../componentes/compartido/interfaz/fondo_panel_flotante'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { PaginaEmpresas } from '@/paginas/empresas/pagina_empresas'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'

function Ejemplo() {
  const [abierto, setAbierto] = useState(false)
  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>Abrir panel</button>
      {abierto && (
        <>
          <FondoPanelFlotante onCerrar={() => setAbierto(false)} />
          <div role="dialog" aria-label="Panel de prueba">
            <button type="button">Primero</button>
            <button type="button">Segundo</button>
          </div>
        </>
      )}
    </div>
  )
}

describe('FondoPanelFlotante: comportamiento comun de los paneles de filtros', () => {
  it('enfoca el primer control del panel, cierra con Escape y devuelve el foco al disparador', () => {
    render(<Ejemplo />)
    const disparador = screen.getByRole('button', { name: 'Abrir panel' })
    disparador.focus()
    fireEvent.click(disparador)
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Primero' }))
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(disparador)
  })

  it('cierra al pulsar el fondo', () => {
    const { container } = render(<Ejemplo />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir panel' }))
    const fondo = container.querySelector('.fixed') as HTMLElement
    fireEvent.click(fondo)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it.each([
    ['Colaboradores', () => <PaginaColaboradores />, catalogoColaboradores.botones.filtros],
    ['Empresas', () => <PaginaEmpresas />, catalogoEmpresas.botones.filtros_avanzados],
  ])('el panel «Filtros avanzados» de %s se cierra con Escape y devuelve el foco', (_modulo, pagina, nombre) => {
    render(pagina())
    const boton = screen.getAllByRole('button', { name: new RegExp(nombre) })[0]
    boton.focus()
    fireEvent.click(boton)
    const panel = screen.getByRole('dialog', { name: /Filtros avanzados/ })
    expect(panel.contains(document.activeElement)).toBe(true)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: /Filtros avanzados/ })).toBeNull()
    expect(document.activeElement).toBe(boton)
  })
})

describe('FondoPanelFlotante omite los controles no visibles al enfocar', () => {
  afterEach(() => {
    Reflect.deleteProperty(HTMLElement.prototype, 'checkVisibility')
  })

  it('enfoca el primer control visible y no uno oculto por CSS', () => {
    Object.defineProperty(HTMLElement.prototype, 'checkVisibility', { configurable: true, value: function (this: HTMLElement) { return this.textContent !== 'Primero' } })
    render(<Ejemplo />)
    fireEvent.click(screen.getByRole('button', { name: 'Abrir panel' }))
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Segundo' }))
  })
})
