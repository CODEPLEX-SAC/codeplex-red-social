import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaMensajesVideollamadaEnCurso } from '@/paginas/mensajeria/pagina_mensajes_videollamada_en_curso'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

vi.setConfig({ testTimeout: 30000 })

const textos = catalogoMensajeria.videollamada.textos
const parametros = catalogoMensajeria.parametros_ruta

function abrirReunionInstantanea(microfono: string, camara: string) {
  const consulta = new URLSearchParams({ [parametros.modo]: catalogoMensajeria.videollamada.modo_reunion, [parametros.microfono]: microfono, [parametros.camara]: camara })
  window.history.pushState({}, '', `${catalogoMensajeria.rutas.videollamada_en_curso}?${consulta.toString()}`)
  render(<PaginaMensajesVideollamadaEnCurso />)
}

describe('Sala de reunion instantanea con un solo participante', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('muestra al organizador con su fotografia centrada, sin aviso de soledad ni estados de microfono y camara', () => {
    abrirReunionInstantanea(catalogoMensajeria.videollamada.estado_inactivo, catalogoMensajeria.videollamada.estado_inactivo)
    expect(screen.queryByText(/Estás solo en la reunión/)).toBeNull()
    expect(screen.getAllByText(textos.sala.organizador).length).toBeGreaterThan(0)
    expect(screen.queryByText(textos.invitaciones.microfono_inactivo)).toBeNull()
    expect(screen.queryByText(textos.invitaciones.camara_inactiva)).toBeNull()
    expect(screen.queryByRole('button', { name: textos.sala.pantalla_completa })).toBeNull()
  })

  it('al terminar estando solo pregunta si quiere permanecer, sin ofrecer finalizar para todos', () => {
    abrirReunionInstantanea(catalogoMensajeria.videollamada.estado_activo, catalogoMensajeria.videollamada.estado_activo)
    fireEvent.click(screen.getAllByRole('button', { name: textos.sala.finalizar })[0])
    const dialogo = within(screen.getByRole('dialog', { name: textos.salida.sola.titulo }))
    expect(dialogo.getByText(/Eres la única persona en la llamada, por lo que terminará en menos de/)).toBeInTheDocument()
    expect(dialogo.getByRole('button', { name: textos.salida.sola.abandonar })).toBeInTheDocument()
    expect(screen.queryByText(textos.salida.finalizar_todos)).toBeNull()
    fireEvent.click(dialogo.getByRole('button', { name: textos.salida.sola.permanecer }))
    expect(screen.queryByRole('dialog', { name: textos.salida.sola.titulo })).toBeNull()
  })

  it('el panel de personas ofrece agregar personas en una ventana y el enlace vive en los detalles de la reunion', () => {
    abrirReunionInstantanea(catalogoMensajeria.videollamada.estado_activo, catalogoMensajeria.videollamada.estado_activo)
    fireEvent.click(screen.getByRole('button', { name: textos.sala.participantes_boton }))
    expect(screen.getByRole('button', { name: textos.panel.agregar })).toBeInTheDocument()
    expect(screen.queryByText('Enlace de la reunión')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: textos.panel.agregar }))
    expect(screen.getByRole('dialog', { name: textos.panel.agregar })).toBeInTheDocument()
  })
})
