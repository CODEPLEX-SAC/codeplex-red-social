import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaNovedades } from '@/paginas/avisos/pagina_avisos'
import { PaginaAvisosNoLeidas } from '@/paginas/avisos/pagina_avisos_no_leidas'
import { AVISOS, AVISOS_NO_LEIDAS } from '../../rutas/avisos/rutas_avisos'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

vi.setConfig({ testTimeout: 30000 })


describe('Notificaciones: marcar como leidas', () => {
  it('las filas ya no ofrecen un menu de tres puntos ni la cabecera lo muestra', () => {
    render(<PaginaNovedades />)
    for (const fila of screen.getAllByRole('article')) expect(within(fila).queryByRole('button', { name: textosRedSocial.MAS_OPCIONES })).toBeNull()
    const cabecera = screen.getByRole('button', { name: catalogoAvisos.botones.marcar_todas_leidas }).parentElement as HTMLElement
    expect(within(cabecera).getAllByRole('button')).toHaveLength(1)
  })

  it('Marcar todas como leidas quita los puntos de las filas y se desactiva', () => {
    render(<PaginaNovedades />)
    expect(AVISOS.some((aviso) => !aviso.leida)).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: catalogoAvisos.botones.marcar_todas_leidas }))
    expect(document.querySelectorAll('article span.bg-primario')).toHaveLength(0)
    expect(screen.getByRole('button', { name: catalogoAvisos.botones.marcar_todas_leidas })).toBeDisabled()
  })

  it('en No leidas, marcar una como leida la quita de la lista y Marcar todas las vacia', () => {
    render(<PaginaAvisosNoLeidas />)
    const filas = () => document.querySelectorAll('section.rounded-control > article')
    const total = filas().length
    expect(total).toBeGreaterThan(0)
    expect(AVISOS_NO_LEIDAS.length).toBeGreaterThan(0)
    fireEvent.click(screen.getByRole('button', { name: catalogoAvisos.botones.marcar_todas_leidas }))
    expect(filas()).toHaveLength(0)
  })
})
