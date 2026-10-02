import { render, screen } from '@testing-library/react'
import { PaginaActividadColaboradores } from '@/paginas/actividad/pagina_actividad_colaboradores'

describe('PaginaActividadColaboradores', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaActividadColaboradores />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
