import { render, screen } from '@testing-library/react'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'

describe('PaginaMensajesTodos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaMensajesTodos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
