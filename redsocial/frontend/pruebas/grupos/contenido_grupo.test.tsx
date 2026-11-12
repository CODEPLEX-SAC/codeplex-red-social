import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaGruposDetalle } from '@/paginas/grupos/pagina_grupos_detalle'
import { PUERTO_GRUPOS, rutaDeGrupo } from '../../rutas/grupos/rutas_grupos'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

vi.setConfig({ testTimeout: 40000 })

const detalle = catalogoGrupos.detalle
const contenido = catalogoGrupos.tus_contenido
const modal = catalogoInicio.modal_crear_publicacion
const PYTHON = 'desarrollo-web-con-python'
const MIEMBRO = 'programacion-go'

function abrir(id: string, vista?: string) {
  window.history.pushState({}, '', rutaDeGrupo(id, vista))
  return render(<PaginaGruposDetalle />)
}

function publicarTexto(texto: string) {
  const dialogo = within(screen.getByRole('dialog', { name: modal.titulo }))
  fireEvent.change(dialogo.getByRole('textbox', { name: modal.etiqueta_editor }), { target: { value: texto } })
  fireEvent.click(dialogo.getByRole('button', { name: modal.publicar }))
}

describe('Grupos: pagina de la comunidad en modo demostracion', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('muestra portada, miembros, pestanas, configuracion de 4 pasos, informacion y la publicacion de bienvenida', () => {
    abrir(PYTHON)
    expect(screen.getByRole('heading', { level: 1, name: 'Desarrollo Web con Python' })).toBeInTheDocument()
    for (const pestana of detalle.pestanas) expect(screen.getByRole('tab', { name: pestana.etiqueta })).toBeInTheDocument()
    expect(screen.getByText(detalle.configuracion.progreso.replace(':n', '0').replace(':total', '4'))).toBeInTheDocument()
    expect(screen.getByRole('button', { name: detalle.editar_portada })).toBeInTheDocument()
    expect(screen.getByText(detalle.informacion.administrador.replace(':nombre', 'Pedro Lozano'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(detalle.publicacion.saludo.replace(':nombre', 'Desarrollo Web con Python')))).toBeInTheDocument()
    expect(screen.queryByText(/privacidad|visibilidad/i)).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: detalle.configuracion.cerrar }))
    expect(screen.queryByText(detalle.configuracion.titulo)).toBeNull()
  })

  it('publicar agrega la publicacion al grupo, completa un paso y se refleja en Tu contenido', () => {
    abrir(PYTHON)
    fireEvent.click(screen.getByRole('button', { name: detalle.publicar.placeholder }))
    publicarTexto('Mi primera publicacion en el grupo')
    expect(screen.getByText('Mi primera publicacion en el grupo')).toBeInTheDocument()
    expect(screen.getByText(detalle.publicado)).toBeInTheDocument()
    expect(screen.getByText(detalle.configuracion.progreso.replace(':n', '1').replace(':total', '4'))).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: catalogoGrupos.menu.opciones.replace(':nombre', 'Desarrollo Web con Python') }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Tu contenido' }))
    expect(screen.getByRole('heading', { level: 2, name: contenido.publicado.replace(':n', '2') })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: contenido.ver_en_grupo })).toHaveLength(2)
    fireEvent.click(screen.getAllByRole('button', { name: contenido.ver_en_grupo })[0])
    expect(screen.getByText('Mi primera publicacion en el grupo')).toBeInTheDocument()
  })

  it('Tu contenido sin publicaciones propias muestra el estado vacio, y deja de estarlo al publicar', () => {
    abrir(MIEMBRO, catalogoGrupos.parametros_ruta.vista_contenido)
    expect(screen.getByText(contenido.vacio)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: contenido.ver_en_grupo })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: detalle.volver_grupo }))
    fireEvent.click(screen.getByRole('button', { name: detalle.publicar.miembro.placeholder }))
    publicarTexto('Aporte de un miembro')
    fireEvent.click(screen.getByRole('button', { name: catalogoGrupos.menu.opciones.replace(':nombre', 'Programación Go') }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Tu contenido' }))
    expect(screen.getByRole('heading', { level: 2, name: contenido.publicado.replace(':n', '1') })).toBeInTheDocument()
    expect(screen.queryByText(contenido.vacio)).toBeNull()
  })

  it('invitar prepara invitaciones sin enviarlas', () => {
    abrir(PYTHON)
    fireEvent.click(screen.getByRole('button', { name: detalle.invitar }))
    const dialogo = within(screen.getByRole('dialog', { name: catalogoGrupos.invitar.titulo }))
    fireEvent.click(dialogo.getAllByRole('button', { name: new RegExp(catalogoGrupos.invitar.invitar) })[0])
    expect(dialogo.getByText(catalogoGrupos.invitar.preparada)).toBeInTheDocument()
    expect(dialogo.getByText(catalogoGrupos.invitar.nota)).toBeInTheDocument()
    expect(PUERTO_GRUPOS.estado(PYTHON).invitados.length).toBe(1)
  })

  it('cambia de pestana: miembros, multimedia y archivos funcionan localmente', () => {
    abrir(PYTHON)
    fireEvent.click(screen.getByRole('tab', { name: 'Miembros' }))
    expect(screen.getByRole('heading', { level: 2, name: detalle.miembros.titulo.replace(':n', '20') })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: 'Archivos multimedia' }))
    expect(screen.getByRole('heading', { level: 2, name: detalle.multimedia.titulo })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: /^Archivos$/ }))
    const selector = screen.getByLabelText(detalle.archivos.etiqueta_selector) as HTMLInputElement
    fireEvent.change(selector, { target: { files: [new File(['datos'], 'informe.pdf', { type: 'application/pdf' })] } })
    expect(screen.getByText('informe.pdf')).toBeInTheDocument()
  })

  it('un grupo desconocido muestra pagina no encontrada', () => {
    abrir('no-existe')
    expect(screen.queryByText(detalle.informacion.titulo)).toBeNull()
  })
})
