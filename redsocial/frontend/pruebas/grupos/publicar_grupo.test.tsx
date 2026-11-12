import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaGruposDetalle } from '@/paginas/grupos/pagina_grupos_detalle'
import { GRUPOS_ADMIN, MIS_GRUPOS, idDeGrupo, rutaDeGrupo } from '../../rutas/grupos/rutas_grupos'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

vi.setConfig({ testTimeout: 30000 })

const publicar = catalogoGrupos.detalle.publicar
const encuesta = catalogoInicio.modal_crear_publicacion.encuesta

function abrirDetalle(nombre: string) {
  window.history.pushState({}, '', rutaDeGrupo(idDeGrupo(nombre)))
  render(<PaginaGruposDetalle />)
}

describe('Grupos: publicar y votacion', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('en un grupo donde soy miembro el compositor dice Escribe algo y solo ofrece Foto/video y Encuesta', () => {
    abrirDetalle(MIS_GRUPOS[0].nombre)
    expect(screen.getByRole('button', { name: publicar.miembro.placeholder })).toBeInTheDocument()
    expect(screen.queryByText(publicar.placeholder)).toBeNull()
    for (const accion of publicar.miembro.acciones) expect(screen.getByRole('button', { name: accion.etiqueta })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Etiquetar personas/ })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Evento' })).toBeNull()
  })

  it('en el grupo que administro el compositor conserva su diseno', () => {
    abrirDetalle(GRUPOS_ADMIN[0].nombre)
    expect(screen.getByRole('button', { name: publicar.placeholder })).toBeInTheDocument()
    for (const accion of publicar.acciones) expect(screen.getByRole('button', { name: accion.etiqueta })).toBeInTheDocument()
  })

  it('Encuesta abre Crear publicacion con Anadir votacion, Anadir opcion y los ajustes de la votacion; publicar avisa que no esta disponible', () => {
    abrirDetalle(MIS_GRUPOS[0].nombre)
    fireEvent.click(screen.getByRole('button', { name: 'Encuesta' }))
    const dialogo = within(screen.getByRole('dialog', { name: catalogoInicio.modal_crear_publicacion.titulo }))
    expect(dialogo.getByText(encuesta.titulo)).toBeInTheDocument()
    expect(dialogo.queryByText(/mínimo 2/)).toBeNull()
    expect(dialogo.getByRole('button', { name: new RegExp(encuesta.agregar_opcion) })).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: encuesta.ajustes.etiqueta }))
    const ajustes = within(screen.getByRole('group', { name: encuesta.ajustes.etiqueta }))
    const varias = ajustes.getByRole('checkbox', { name: encuesta.ajustes.varias })
    expect((varias as HTMLInputElement).checked).toBe(false)
    fireEvent.click(varias)
    expect((ajustes.getByRole('checkbox', { name: encuesta.ajustes.varias }) as HTMLInputElement).checked).toBe(true)
    expect(ajustes.getByRole('checkbox', { name: encuesta.ajustes.cualquiera })).toBeInTheDocument()
  })

  it('Foto/video y el campo principal abren el mismo modal de publicacion', () => {
    abrirDetalle(MIS_GRUPOS[0].nombre)
    fireEvent.click(screen.getByRole('button', { name: publicar.miembro.placeholder }))
    expect(screen.getByRole('dialog', { name: catalogoInicio.modal_crear_publicacion.titulo })).toBeInTheDocument()
  })
})
