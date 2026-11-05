import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CarruselHistorias, ventanaCarrusel } from '@/componentes/inicio'

const historias = ['a', 'b', 'c', 'd', 'e'].map((id) => ({ id }))

function montar(indice: number, lista = historias) {
  const acciones = { alCambiar: vi.fn(), alAnterior: vi.fn(), alSiguiente: vi.fn() }
  render(
    <CarruselHistorias
      historias={lista}
      indice={indice}
      navegacion={{ hayAnterior: indice > 0, haySiguiente: lista.length - 1 > indice, onAnterior: acciones.alAnterior, onSiguiente: acciones.alSiguiente }}
      etiquetas={{ anterior: 'Anterior', siguiente: 'Siguiente', vecina: (posicion, distancia) => `Ir a ${lista[posicion].id} ${distancia}` }}
      onCambiar={acciones.alCambiar}
      renderTarjeta={(posicion, distancia) => <span>{`${lista[posicion].id}:${distancia}`}</span>}
    />,
  )
  return acciones
}

describe('CarruselHistorias', () => {
  it('calcula la ventana visible alrededor del indice sin salirse de la coleccion', () => {
    expect(ventanaCarrusel(5, 0, 3).map((tarjeta) => tarjeta.distancia)).toEqual([0, 1, 2, 3])
    expect(ventanaCarrusel(5, 2, 1).map((tarjeta) => tarjeta.indice)).toEqual([1, 2, 3])
    expect(ventanaCarrusel(1, 0, 3)).toEqual([{ indice: 0, distancia: 0 }])
    expect(ventanaCarrusel(0, 0, 3)).toEqual([])
  })

  it('pone el elemento seleccionado en el centro y los demas por distancia', () => {
    montar(2)
    expect(screen.getByText('c:0').closest('[data-posicion]')).toHaveClass('scale-100')
    expect(screen.getByText('b:-1').closest('[data-posicion]')).toHaveClass('scale-40')
    expect(screen.getByText('d:1').closest('[data-posicion]')).toHaveClass('scale-40')
    expect(screen.getByText('a:-2').closest('[data-posicion]')).toHaveClass('scale-30')
    expect(screen.getByText('c:0').closest('[data-posicion]')).toHaveClass('motion-reduce:transition-none')
  })

  it('las flechas delegan en la navegacion externa y las tarjetas laterales cambian la seleccion', () => {
    const acciones = montar(0)
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }))
    expect(acciones.alSiguiente).toHaveBeenCalledTimes(1)
    expect(acciones.alCambiar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Ir a c 2' }))
    expect(acciones.alCambiar).toHaveBeenLastCalledWith(2)
  })

  it('con un solo elemento no hay vecinas ni navegacion', () => {
    montar(0, [{ id: 'solo' }])
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled()
    expect(screen.queryByRole('button', { name: /^Ir a/ })).toBeNull()
  })

  it('una coleccion vacia no rompe el visor', () => {
    const { container } = render(<CarruselHistorias historias={[]} indice={0} navegacion={{ hayAnterior: false, haySiguiente: false, onAnterior: () => undefined, onSiguiente: () => undefined }} etiquetas={{ anterior: 'a', siguiente: 's', vecina: () => 'v' }} onCambiar={() => undefined} renderTarjeta={() => null} />)
    expect(container).toBeEmptyDOMElement()
  })
})
