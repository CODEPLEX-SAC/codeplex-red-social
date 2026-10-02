import { render, screen } from '@testing-library/react'
import { PaginaMensajesNoLeidos } from '@/paginas/mensajeria/pagina_mensajes_no_leidos'

describe('PaginaMensajesNoLeidos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaMensajesNoLeidos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
