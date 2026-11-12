import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaNovedadesEventos } from '@/paginas/avisos/pagina_avisos_eventos'
import { PaginaAvisosNoLeidas } from '@/paginas/avisos/pagina_avisos_no_leidas'
import { PaginaNovedadesSolicitudes } from '@/paginas/avisos/pagina_avisos_solicitudes'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

vi.setConfig({ testTimeout: 40000 })

const botones = catalogoAvisos.botones
const solicitud = catalogoAvisos.resultados_solicitud
const invitacion = catalogoAvisos.resultados_invitacion

describe('Notificaciones: seleccionar y marcar como leidas', () => {
  it('una casilla suelta deja marcada solo esa notificacion y la marca como leida', () => {
    render(<PaginaAvisosNoLeidas />)
    const filas = () => document.querySelectorAll('section.rounded-control > article')
    const total = filas().length
    const primera = within(filas()[0] as HTMLElement).getByRole('checkbox')
    fireEvent.click(primera)
    expect(primera).toBeChecked()
    fireEvent.click(screen.getByRole('button', { name: botones.marcar_seleccionadas_leidas }))
    expect(filas()).toHaveLength(total - 1)
  })

  it('Confirmar y Eliminar en una solicitud de No leidas lo indican en la propia fila', () => {
    render(<PaginaAvisosNoLeidas />)
    const confirmar = screen.getAllByRole('button', { name: botones.confirmar })[0]
    const filaConfirmada = confirmar.closest('article') as HTMLElement
    fireEvent.click(confirmar)
    expect(within(filaConfirmada).getByText(solicitud.confirmar)).toBeInTheDocument()
    expect(within(filaConfirmada).queryByRole('button', { name: botones.confirmar })).toBeNull()
    const eliminar = screen.queryAllByRole('button', { name: botones.eliminar })[0]
    if (eliminar) {
      const filaEliminada = eliminar.closest('article') as HTMLElement
      fireEvent.click(eliminar)
      expect(within(filaEliminada).getByText(solicitud.eliminar)).toBeInTheDocument()
    }
  })

  it('Seleccionar todas marca todas las casillas y Marcar seleccionadas las pasa a leidas', () => {
    render(<PaginaAvisosNoLeidas />)
    const marcar = screen.getByRole('button', { name: botones.marcar_seleccionadas_leidas })
    expect(marcar).toBeDisabled()
    const casillas = () => screen.getAllByRole('checkbox')
    expect(casillas().length).toBeGreaterThan(2)
    fireEvent.click(screen.getByRole('checkbox', { name: new RegExp(catalogoAvisos.campos_lista.seleccionar_todas) }))
    for (const casilla of casillas()) expect(casilla).toBeChecked()
    expect(marcar).toBeEnabled()
    fireEvent.click(marcar)
    expect(document.querySelectorAll('section.rounded-control > article')).toHaveLength(0)
  })
})

describe('Notificaciones: aceptar, confirmar y rechazar funcionan', () => {
  it('en Solicitudes se acepta una amistad y se aprueba una de grupo', () => {
    render(<PaginaNovedadesSolicitudes />)
    const aceptar = screen.getAllByRole('button', { name: botones.aceptar })[0]
    const filaAmistad = aceptar.closest('article') as HTMLElement
    fireEvent.click(aceptar)
    expect(within(filaAmistad).getByText(solicitud.aceptar)).toBeInTheDocument()
    const aprobar = screen.getAllByRole('button', { name: botones.aprobar })[0]
    const filaGrupo = aprobar.closest('article') as HTMLElement
    fireEvent.click(aprobar)
    expect(within(filaGrupo).getByText(solicitud.aprobar)).toBeInTheDocument()
  })

  it('en Eventos se acepta o se rechaza una invitacion', () => {
    render(<PaginaNovedadesEventos />)
    const aceptar = screen.getAllByRole('button', { name: botones.aceptar })[0]
    const fila = aceptar.closest('article') as HTMLElement
    fireEvent.click(aceptar)
    expect(within(fila).getByText(invitacion.aceptar)).toBeInTheDocument()
    const rechazar = screen.queryAllByRole('button', { name: botones.rechazar })[0]
    if (rechazar) {
      const otra = rechazar.closest('article') as HTMLElement
      fireEvent.click(rechazar)
      expect(within(otra).getByText(invitacion.rechazar)).toBeInTheDocument()
    }
  })

  it('en el panel de la campana se confirma una solicitud de amistad', () => {
    render(<PaginaInicio />)
    fireEvent.click(within(screen.getByRole('banner')).getByRole('button', { name: new RegExp(textosRedSocial.AVISO_CAMPANA) }))
    const confirmar = screen.getByRole('button', { name: botones.confirmar })
    const fila = confirmar.closest('article') as HTMLElement
    fireEvent.click(confirmar)
    expect(within(fila).getByText(solicitud.confirmar)).toBeInTheDocument()
  })
})
