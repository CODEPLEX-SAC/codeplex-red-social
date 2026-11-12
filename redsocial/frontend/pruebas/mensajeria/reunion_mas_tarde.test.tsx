import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaMensajesVideollamadas } from '@/paginas/mensajeria/pagina_mensajes_videollamadas'
import { resolverReunionEnSala } from '../../servicios/mensajeria/videollamadas'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

vi.setConfig({ testTimeout: 30000 })

const textos = catalogoMensajeria.videollamada.textos.mas_tarde

describe('Crear reunion para mas tarde', () => {
  it('reemplaza a Nueva reunion y al pulsarlo muestra la ventana con el enlace, que permite copiarlo y unirse', async () => {
    const escribir = vi.fn(async () => undefined)
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: escribir } })
    render(<PaginaMensajesVideollamadas />)
    expect(screen.queryByRole('link', { name: 'Nueva reunión' })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: textos.boton }))
    const dialogo = within(screen.getByRole('dialog', { name: textos.titulo }))
    expect(dialogo.getByText(textos.descripcion)).toBeInTheDocument()
    const enlace = dialogo.getByLabelText(textos.etiqueta_enlace).textContent ?? String()
    const id = new URL(enlace).searchParams.get(catalogoMensajeria.parametros_ruta.reunion)
    expect(new URL(enlace).pathname).toBe(catalogoMensajeria.rutas.videollamada_en_curso)
    expect(resolverReunionEnSala(id)?.titulo).toBe(textos.nombre_reunion)
    await act(async () => fireEvent.click(dialogo.getByRole('button', { name: textos.copiar })))
    expect(escribir).toHaveBeenCalledWith(enlace)
    expect(dialogo.getByText(textos.copiado)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: textos.cerrar }))
    expect(screen.queryByRole('dialog', { name: textos.titulo })).toBeNull()
  })
})
