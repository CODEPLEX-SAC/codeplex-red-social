import { act, render, screen } from '@testing-library/react'
import { navegar, usarParametroDeRuta } from '../../rutas/compartido/navegacion'

function Lector() {
  return <p>{usarParametroDeRuta('reunion') ?? 'sin-parametro'}</p>
}

describe('Navegacion con parametro de consulta', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('navegar conserva el parametro y los lectores se actualizan al cambiar solo el parametro', () => {
    window.history.pushState({}, '', '/sala')
    render(<Lector />)
    expect(screen.getByText('sin-parametro')).toBeInTheDocument()
    act(() => navegar('/sala?reunion=a'))
    expect(screen.getByText('a')).toBeInTheDocument()
    act(() => navegar('/sala?reunion=b'))
    expect(screen.getByText('b')).toBeInTheDocument()
    expect(window.location.search).toBe('?reunion=b')
  })
})
