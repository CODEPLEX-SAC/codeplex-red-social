import { render, screen } from '@testing-library/react'
import { PaginaMensajesFavoritos } from '@/paginas/mensajeria/pagina_mensajes_favoritos'

describe('PaginaMensajesFavoritos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaMensajesFavoritos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
