import { render, screen } from '@testing-library/react'
import { PaginaActividadSistema } from '@/paginas/actividad/pagina_actividad_sistema'

describe('PaginaActividadSistema', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaActividadSistema />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
