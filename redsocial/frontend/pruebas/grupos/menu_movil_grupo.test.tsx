import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { PaginaGruposDetalle } from '@/paginas/grupos/pagina_grupos_detalle'
import { PUERTO_GRUPOS, rutaDeGrupo } from '../../rutas/grupos/rutas_grupos'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'

vi.setConfig({ testTimeout: 40000 })

const menu = catalogoGrupos.menu
const ADMINISTRADO = 'desarrollo-web-con-python'
const MIEMBRO = 'programacion-go'

function abrir(id: string) {
  window.history.pushState({}, '', rutaDeGrupo(id))
  return render(<PaginaGruposDetalle />)
}

function disparador() {
  return screen.getByRole('button', { name: new RegExp(menu.opciones.replace(':nombre', '.*')) })
}

describe('Grupos: menu contextual de tres puntos en la comunidad', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('permanece cerrado al cargar y se abre y se cierra al tocar el boton', async () => {
    abrir(ADMINISTRADO)
    expect(screen.queryByRole('menu')).toBeNull()
    fireEvent.click(disparador())
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  })

  it('se cierra al tocar fuera del panel', async () => {
    abrir(ADMINISTRADO)
    fireEvent.click(disparador())
    await screen.findByRole('menu')
    const fondo = document.querySelector('.MuiBackdrop-root') as HTMLElement
    fireEvent.click(fondo)
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  })

  it('el administrador ve las acciones administrativas y el miembro solo las que le corresponden', async () => {
    const administrador = abrir(ADMINISTRADO)
    fireEvent.click(disparador())
    await screen.findByRole('menu')
    for (const etiqueta of [menu.elementos[0].etiqueta, menu.elementos[1].etiqueta, 'Compartir']) expect(screen.getByRole('menuitem', { name: etiqueta })).toBeInTheDocument()
    expect(screen.queryByRole('menuitem', { name: 'Abandonar grupo' })).toBeNull()
    administrador.unmount()

    abrir(MIEMBRO)
    fireEvent.click(disparador())
    await screen.findByRole('menu')
    expect(screen.getByRole('menuitem', { name: 'Abandonar grupo' })).toBeInTheDocument()
    for (const clave of ['ver_solicitudes', 'estado', 'editar', 'eliminar']) {
      const etiqueta = menu.elementos.find((elemento) => elemento.clave === clave)?.etiqueta ?? String()
      expect(screen.queryByRole('menuitem', { name: etiqueta })).toBeNull()
    }
  })

  it('al elegir una opcion ejecuta su accion real y cierra el menu', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
    abrir(ADMINISTRADO)
    fireEvent.click(disparador())
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Compartir' }))
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
    expect(await screen.findByText(menu.enlace_copiado)).toBeInTheDocument()
    expect(PUERTO_GRUPOS.detalle(ADMINISTRADO)).toBeDefined()
  })

  it('las pestanas de la comunidad siguen cambiando el contenido', () => {
    abrir(ADMINISTRADO)
    fireEvent.click(screen.getByRole('tab', { name: catalogoGrupos.detalle.pestanas[1].etiqueta }))
    expect(screen.getByRole('tab', { name: catalogoGrupos.detalle.pestanas[1].etiqueta })).toHaveAttribute('aria-selected', 'true')
  })
})
