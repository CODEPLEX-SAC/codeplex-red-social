import { render, screen } from '@testing-library/react'
import { PaginaActividadPublicaciones } from '@/paginas/actividad/pagina_actividad_publicaciones'

describe('PaginaActividadPublicaciones', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaActividadPublicaciones />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
