import { render, screen } from '@testing-library/react'
import { PaginaActividadMenciones } from '@/paginas/actividad/pagina_actividad_menciones'

describe('PaginaActividadMenciones', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaActividadMenciones />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
