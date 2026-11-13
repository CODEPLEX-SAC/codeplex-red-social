import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { PaginaMensajesVideollamadaEnCurso } from '@/paginas/mensajeria/pagina_mensajes_videollamada_en_curso'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

const sala = catalogoMensajeria.videollamada.textos.sala
const panel = sala.detalles_panel

function simularPantalla(movil: boolean) {
  window.matchMedia = vi.fn().mockImplementation((consulta: string) => ({ matches: movil, media: consulta, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn() }))
}

function abrir() {
  window.history.pushState({}, '', catalogoMensajeria.rutas.videollamada_en_curso)
  return render(<PaginaMensajesVideollamadaEnCurso />)
}

describe('Sala de videollamada: detalles de la reunion y opciones', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('en movil el icono de informacion abre una ventana con los detalles', () => {
    simularPantalla(true)
    abrir()
    expect(screen.queryByRole('dialog', { name: sala.detalles })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: sala.detalles }))
    const dialogo = within(screen.getByRole('dialog', { name: sala.detalles }))
    expect(dialogo.getByText(panel.informacion_unirse)).toBeInTheDocument()
    expect(dialogo.getByText(new RegExp(catalogoMensajeria.rutas.videollamada_en_curso))).toBeInTheDocument()
  })

  it('en escritorio el icono de informacion cambia la columna lateral por los detalles de la reunion', () => {
    simularPantalla(false)
    abrir()
    expect(screen.queryByRole('complementary', { name: sala.detalles })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: sala.detalles }))
    const lateral = within(screen.getByRole('complementary', { name: sala.detalles }))
    expect(lateral.getByText(panel.informacion_unirse)).toBeInTheDocument()
    expect(screen.queryByRole('dialog', { name: sala.detalles })).toBeNull()
    fireEvent.click(lateral.getByRole('button', { name: panel.cerrar }))
    expect(screen.queryByRole('complementary', { name: sala.detalles })).toBeNull()
  })

  it('copiar la informacion para unirse la envia al portapapeles y avisa', async () => {
    simularPantalla(true)
    const escribir = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText: escribir } })
    abrir()
    fireEvent.click(screen.getByRole('button', { name: sala.detalles }))
    fireEvent.click(screen.getByRole('button', { name: panel.copiar }))
    await waitFor(() => expect(escribir).toHaveBeenCalledTimes(1))
    expect(await screen.findByText(panel.copiado)).toBeInTheDocument()
    expect(escribir.mock.calls[0][0]).toContain(catalogoMensajeria.rutas.videollamada_en_curso)
  })

  it('en escritorio el menu de tres puntos ofrece pantalla completa, mensajes e informar, sin levantar la mano', async () => {
    simularPantalla(false)
    abrir()
    fireEvent.click(screen.getByRole('button', { name: sala.mas_opciones }))
    for (const etiqueta of [sala.pantalla_completa, sala.mensajes_llamada, sala.informar_problema]) expect(await screen.findByRole('menuitem', { name: etiqueta })).toBeInTheDocument()
    expect(screen.queryByRole('menuitem', { name: sala.levantar_mano })).toBeNull()
  })

  it('en movil el menu de tres puntos conserva levantar la mano y compartir pantalla', async () => {
    simularPantalla(true)
    abrir()
    fireEvent.click(screen.getByRole('button', { name: sala.mas_opciones }))
    for (const etiqueta of [sala.levantar_mano, sala.compartir, sala.pantalla_completa]) expect(await screen.findByRole('menuitem', { name: etiqueta })).toBeInTheDocument()
  })
})
