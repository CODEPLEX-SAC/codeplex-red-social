import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { Modal } from '../../componentes/compartido/interfaz/modal'

function Ejemplo() {
  const [abierto, setAbierto] = useState(false)
  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>Abrir</button>
      {abierto && (
        <Modal titulo="Ventana de prueba" etiquetaCerrar="Cerrar ventana" onCerrar={() => setAbierto(false)}>
          <input aria-label="Campo" data-foco-inicial="true" />
          <button type="button">Ultimo</button>
        </Modal>
      )}
    </div>
  )
}

function abrir() {
  render(<Ejemplo />)
  const disparador = screen.getByRole('button', { name: 'Abrir' })
  disparador.focus()
  fireEvent.click(disparador)
  return { disparador, dialogo: screen.getByRole('dialog', { name: 'Ventana de prueba' }) }
}

describe('Gate de accesibilidad: Modal compartido', () => {
  it('es un dialogo modal con nombre accesible', () => {
    const { dialogo } = abrir()
    expect(dialogo).toHaveAttribute('aria-modal', 'true')
    expect(dialogo).toHaveAccessibleName('Ventana de prueba')
  })

  it('mueve el foco inicial al control marcado dentro del dialogo', () => {
    abrir()
    expect(document.activeElement).toBe(screen.getByLabelText('Campo'))
  })

  it('atrapa Tab desde el ultimo control y Mayus+Tab desde el dialogo', () => {
    const { dialogo } = abrir()
    const ultimo = screen.getByRole('button', { name: 'Ultimo' })
    ultimo.focus()
    fireEvent.keyDown(ultimo, { key: 'Tab' })
    expect(dialogo.contains(document.activeElement)).toBe(true)
    dialogo.focus()
    fireEvent.keyDown(dialogo, { key: 'Tab', shiftKey: true })
    expect(dialogo.contains(document.activeElement)).toBe(true)
  })

  it('bloquea el desplazamiento mientras esta abierto y lo restituye', () => {
    abrir()
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('Escape lo cierra y devuelve el foco al disparador', () => {
    const { disparador } = abrir()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(disparador)
  })

  it('el boton de cerrar tiene nombre accesible y cierra', () => {
    abrir()
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar ventana' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
