import { render, screen } from '@testing-library/react'
import { PaginaActividadGrupos } from '@/paginas/actividad/pagina_actividad_grupos'

describe('PaginaActividadGrupos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaActividadGrupos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
