import { fireEvent, render, screen } from '@testing-library/react'
import { Acordeon } from '../../componentes/compartido/interfaz/acordeon'

const ELEMENTOS = [
  { id: 'uno', titulo: 'Primero', contenido: <div><h4>Dentro uno</h4><ol><li>Paso</li></ol></div> },
  { id: 'dos', titulo: 'Segundo', contenido: <div>Dentro dos</div> },
  { id: 'tres', titulo: 'Tercero', contenido: <div>Dentro tres</div>, deshabilitado: true },
]

function cabecera(nombre: string) {
  return screen.getByRole('button', { name: new RegExp(nombre) })
}

describe('Acordeon compartido', () => {
  it('abre solo el panel indicado al inicio y expone aria-expanded y la region asociada', () => {
    render(<Acordeon elementos={ELEMENTOS} idsAbiertosInicialmente={['uno']} />)
    expect(cabecera('Primero')).toHaveAttribute('aria-expanded', 'true')
    expect(cabecera('Segundo')).toHaveAttribute('aria-expanded', 'false')
    const region = screen.getByRole('region', { name: /Primero/ })
    expect(region).toHaveAttribute('id', cabecera('Primero').getAttribute('aria-controls'))
  })

  it('abre un panel y cierra el anterior; al pulsar el abierto se cierra', () => {
    render(<Acordeon elementos={ELEMENTOS} idsAbiertosInicialmente={['uno']} />)
    fireEvent.click(cabecera('Segundo'))
    expect(cabecera('Primero')).toHaveAttribute('aria-expanded', 'false')
    expect(cabecera('Segundo')).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(cabecera('Segundo'))
    expect(cabecera('Segundo')).toHaveAttribute('aria-expanded', 'false')
  })

  it('un panel deshabilitado no se abre y alCambiar recibe los ids abiertos', () => {
    const alCambiar = vi.fn()
    render(<Acordeon elementos={ELEMENTOS} alCambiar={alCambiar} />)
    fireEvent.click(cabecera('Tercero'))
    expect(alCambiar).not.toHaveBeenCalled()
    fireEvent.click(cabecera('Primero'))
    expect(alCambiar).toHaveBeenLastCalledWith(['uno'])
  })

  it('muestra el icono del elemento dentro de la cabecera', () => {
    render(<Acordeon elementos={[{ id: 'uno', titulo: 'Primero', icono: 'tarjeta-pago', contenido: <div>Dentro</div> }]} />)
    expect(cabecera('Primero')).toHaveTextContent('credit_card')
  })

  it('no genera errores de anidamiento HTML con contenido de bloque', () => {
    const errores = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    render(<Acordeon elementos={ELEMENTOS} idsAbiertosInicialmente={['uno']} />)
    const anidamiento = errores.mock.calls.filter((llamada) => String(llamada[0]).includes('cannot be a descendant') || String(llamada[0]).includes('cannot contain a nested'))
    errores.mockRestore()
    expect(anidamiento).toHaveLength(0)
  })
})
