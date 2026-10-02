import { render, screen } from '@testing-library/react'
import { PaginaMensajesVideollamadaEnCurso } from '@/paginas/mensajeria/pagina_mensajes_videollamada_en_curso'

describe('PaginaMensajesVideollamadaEnCurso', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaMensajesVideollamadaEnCurso />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
