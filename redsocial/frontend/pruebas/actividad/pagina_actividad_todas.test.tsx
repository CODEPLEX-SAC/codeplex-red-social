import { render, screen } from '@testing-library/react'
import { PaginaActividadTodas } from '@/paginas/actividad/pagina_actividad_todas'

describe('PaginaActividadTodas', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaActividadTodas />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
