import { render, screen } from '@testing-library/react'
import { PaginaActividadModulos } from '@/paginas/actividad/pagina_actividad_modulos'

describe('PaginaActividadModulos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaActividadModulos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
