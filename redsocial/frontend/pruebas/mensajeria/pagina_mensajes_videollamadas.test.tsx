import { render, screen } from '@testing-library/react'
import { PaginaMensajesVideollamadas } from '@/paginas/mensajeria/pagina_mensajes_videollamadas'

describe('PaginaMensajesVideollamadas', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaMensajesVideollamadas />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
