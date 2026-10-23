import { act, fireEvent, render, screen } from '@testing-library/react'
import { TextoTruncable } from '../../componentes/compartido/interfaz/texto_truncable'

const NOMBRE = 'Consultoría Empresarial y Servicios Generales del Norte SAC'

function medidas(elemento: HTMLElement, ancho: number, visible: number) {
  Object.defineProperty(elemento, 'scrollWidth', { configurable: true, value: ancho })
  Object.defineProperty(elemento, 'clientWidth', { configurable: true, value: visible })
}

describe('TextoTruncable', () => {
  it('muestra el nombre completo como tooltip solo cuando el texto esta truncado', async () => {
    render(<TextoTruncable texto={NOMBRE} />)
    const texto = screen.getByText(NOMBRE)

    medidas(texto, 300, 200)
    await act(async () => { fireEvent.mouseOver(texto) })
    expect(await screen.findByRole('tooltip')).toHaveTextContent(NOMBRE)
  })

  it('no muestra tooltip si el texto cabe completo', async () => {
    render(<TextoTruncable texto={NOMBRE} />)
    const texto = screen.getByText(NOMBRE)

    medidas(texto, 200, 200)
    await act(async () => { fireEvent.mouseOver(texto) })
    expect(screen.queryByRole('tooltip')).toBeNull()
  })
})
