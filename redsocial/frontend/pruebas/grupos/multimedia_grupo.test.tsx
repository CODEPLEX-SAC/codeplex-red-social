import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaGruposDetalle } from '@/paginas/grupos/pagina_grupos_detalle'
import { rutaDeGrupo } from '../../rutas/grupos/rutas_grupos'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoPerfil from '../../catalogos/capacidades/redsocial/perfil.json'

vi.setConfig({ testTimeout: 40000 })

const detalle = catalogoGrupos.detalle
const textos = detalle.multimedia
const MIEMBRO = 'programacion-go'

function abrir(id: string) {
  window.history.pushState({}, '', rutaDeGrupo(id))
  return render(<PaginaGruposDetalle />)
}

describe('Grupos: archivos multimedia', () => {
  beforeEach(() => {
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, writable: true, value: vi.fn(() => 'blob:prueba') })
  })
  afterEach(() => window.history.pushState({}, '', '/'))

  it('Ver todo lleva a la pestana de archivos multimedia con la cuadricula de fotos', () => {
    abrir(MIEMBRO)
    fireEvent.click(screen.getByRole('button', { name: detalle.recientes.ver_todo }))
    expect(screen.getByRole('heading', { level: 2, name: textos.titulo })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /Foto \d+ de/ }).length).toBeGreaterThan(4)
  })

  it('una foto de la cuadricula se abre en el visor y se navega a la siguiente', () => {
    abrir(MIEMBRO)
    fireEvent.click(screen.getByRole('button', { name: detalle.recientes.ver_todo }))
    fireEvent.click(screen.getAllByRole('button', { name: /Foto 1 de/ })[0])
    const visor = within(screen.getByRole('dialog'))
    fireEvent.click(visor.getByRole('button', { name: catalogoPerfil.visor.siguiente }))
    expect(visor.getByText(/^2 de \d+$/)).toBeInTheDocument()
  })

  it('anadir fotos o videos los agrega a Fotos y a Videos con aviso de demostracion', () => {
    abrir(MIEMBRO)
    fireEvent.click(screen.getByRole('button', { name: detalle.recientes.ver_todo }))
    const antes = screen.getAllByRole('button', { name: /Foto \d+ de/ }).length
    fireEvent.change(screen.getByLabelText(textos.selector), { target: { files: [new File(['a'], 'foto.png', { type: 'image/png' }), new File(['b'], 'clip.mp4', { type: 'video/mp4' })] } })
    expect(screen.getAllByRole('button', { name: /Foto \d+ de/ })).toHaveLength(antes + 1)
    expect(screen.getByText(textos.aviso_anadido)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: 'Vídeos' }))
    expect(screen.getByLabelText(/Vídeo 1 de/)).toBeInTheDocument()
  })

  it('Crear album pide un nombre y agrega el album a la lista', () => {
    abrir(MIEMBRO)
    fireEvent.click(screen.getByRole('button', { name: detalle.recientes.ver_todo }))
    fireEvent.click(screen.getByRole('tab', { name: 'Álbumes' }))
    expect(screen.getByText(textos.albumes_iniciales[0])).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: textos.crear_album }))
    const dialogo = within(screen.getByRole('dialog', { name: textos.crear.titulo }))
    fireEvent.click(dialogo.getByRole('button', { name: textos.crear.confirmar }))
    expect(dialogo.getByText(textos.crear.error)).toBeInTheDocument()
    fireEvent.change(dialogo.getByLabelText(textos.crear.nombre), { target: { value: 'Mi album nuevo' } })
    fireEvent.click(dialogo.getByRole('button', { name: textos.crear.confirmar }))
    expect(screen.getByText('Mi album nuevo')).toBeInTheDocument()
  })
})
