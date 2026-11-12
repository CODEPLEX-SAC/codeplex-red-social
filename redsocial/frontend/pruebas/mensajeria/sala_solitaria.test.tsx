import { fireEvent, render, screen } from '@testing-library/react'
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

  it('muestra al organizador con su fotografia, el aviso de soledad y los estados de microfono y camara', () => {
    abrirReunionInstantanea(catalogoMensajeria.videollamada.estado_inactivo, catalogoMensajeria.videollamada.estado_inactivo)
    expect(screen.getByText(textos.sala.solo)).toBeInTheDocument()
    expect(screen.getAllByText(textos.sala.organizador).length).toBeGreaterThan(0)
    expect(screen.getAllByText(textos.invitaciones.microfono_inactivo).length).toBeGreaterThan(0)
    expect(screen.getAllByText(textos.invitaciones.camara_inactiva).length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: textos.sala.pantalla_completa })).toBeInTheDocument()
  })

  it('el panel de personas ofrece agregar personas y el enlace de la reunion con su boton de copiar', () => {
    abrirReunionInstantanea(catalogoMensajeria.videollamada.estado_activo, catalogoMensajeria.videollamada.estado_activo)
    fireEvent.click(screen.getByRole('button', { name: textos.sala.participantes }))
    expect(screen.getByRole('button', { name: textos.panel.agregar })).toBeInTheDocument()
    expect(screen.getByText(textos.panel.enlace_titulo)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: textos.panel.copiar_enlace })).toBeInTheDocument()
  })
})
