import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { FiltroDesplegable, MarcoPanelFiltro } from '../../componentes/compartido'

function Ejemplo({ conQuitar = false }: { conQuitar?: boolean }) {
  const [abierto, setAbierto] = useState(false)
  const [quitado, setQuitado] = useState(false)
  return (
    <div>
      <FiltroDesplegable
        id="panel-ejemplo"
        abierto={abierto}
        alCambiarAbierto={setAbierto}
        icono="calendario"
        etiqueta="Fecha"
        quitar={conQuitar ? { etiqueta: 'Quitar filtro', alQuitar: () => setQuitado(true) } : undefined}
      >
        <MarcoPanelFiltro id="panel-ejemplo">
          <button type="button">Dentro</button>
        </MarcoPanelFiltro>
      </FiltroDesplegable>
      {quitado && <span>Quitado</span>}
    </div>
  )
}

describe('FiltroDesplegable: disparador, estado y panel comunes de los filtros', () => {
  it('sincroniza aria-expanded y aria-controls con el estado real y cierra con Escape', () => {
    render(<Ejemplo />)
    const disparador = screen.getByRole('button', { name: /Fecha/ })
    expect(disparador.getAttribute('aria-expanded')).toBe('false')
    expect(disparador.getAttribute('aria-controls')).toBeNull()
    fireEvent.click(disparador)
    expect(disparador.getAttribute('aria-expanded')).toBe('true')
    expect(disparador.getAttribute('aria-controls')).toBe('panel-ejemplo')
    expect(document.getElementById('panel-ejemplo')).not.toBeNull()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(disparador.getAttribute('aria-expanded')).toBe('false')
    expect(document.getElementById('panel-ejemplo')).toBeNull()
  })

  it('el control para quitar el filtro es un hermano del disparador, no un control anidado', () => {
    render(<Ejemplo conQuitar />)
    const disparador = screen.getByRole('button', { name: /Fecha/ })
    const quitar = screen.getByRole('button', { name: 'Quitar filtro' })
    expect(disparador.contains(quitar)).toBe(false)
    expect(disparador.querySelector('[role="button"]')).toBeNull()
    fireEvent.click(quitar)
    expect(screen.getByText('Quitado')).not.toBeNull()
    expect(disparador.getAttribute('aria-expanded')).toBe('false')
  })
})
