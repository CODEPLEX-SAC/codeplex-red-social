import { render, screen } from '@testing-library/react'
import { PaginaMensajesVideollamadaIniciar } from '@/paginas/mensajeria/pagina_mensajes_videollamada_iniciar'

describe('PaginaMensajesVideollamadaIniciar', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaMensajesVideollamadaIniciar />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
