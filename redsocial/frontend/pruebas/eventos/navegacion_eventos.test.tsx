import { render, screen, within } from '@testing-library/react'
import { PaginaEventosMisEventos } from '@/paginas/eventos/pagina_eventos_mis_eventos'
import { PaginaEventosProximos } from '@/paginas/eventos/pagina_eventos_proximos'
import { PaginaEventosPopulares } from '@/paginas/eventos/pagina_eventos_populares'
import { PaginaEventosInvitaciones } from '@/paginas/eventos/pagina_eventos_invitaciones'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

function panel(titulo: string): HTMLElement {
  return screen.getByRole('heading', { name: titulo }).closest('section') as HTMLElement
}

describe('Navegacion de Eventos', () => {
  it.each([
    ['Mis eventos', PaginaEventosMisEventos, catalogoEventos.secciones.proximos_de_tus_eventos],
    ['Invitaciones', PaginaEventosInvitaciones, catalogoEventos.secciones.proximos_de_tus_eventos],
  ])('%s: «Proximos de tus eventos → Ver todos» lleva a la pagina de Proximos', (_nombre, Pagina, titulo) => {
    render(<Pagina />)
    expect(within(panel(titulo)).getByRole('link', { name: textosRedSocial.VER_TODOS })).toHaveAttribute('href', catalogoEventos.rutas.proximos)
  })

  it('Mis eventos ya no ofrece un enlace «Ver todos mis eventos» hacia si misma', () => {
    render(<PaginaEventosMisEventos />)
    expect(screen.queryByRole('link', { name: /Ver todos mis eventos/ })).toBeNull()
    expect(screen.queryByText('¿No encuentras un evento?')).toBeNull()
  })

  it('Proximos no muestra «Mis proximas fechas → Ver todas» (llevaria a la misma pagina)', () => {
    render(<PaginaEventosProximos />)
    expect(within(panel(catalogoEventos.secciones.mis_proximas_fechas)).queryByRole('link', { name: textosRedSocial.VER_TODAS })).toBeNull()
  })

  it('Populares conserva su enlace «Ver todas» en ese panel', () => {
    render(<PaginaEventosPopulares />)
    expect(within(panel(catalogoEventos.secciones.mis_proximas_fechas)).getByRole('link', { name: textosRedSocial.VER_TODAS })).toBeInTheDocument()
  })
})
