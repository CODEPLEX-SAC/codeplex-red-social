import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaGruposDescubrir } from '@/paginas/grupos/pagina_grupos_descubrir'
import { PaginaGruposInvitaciones } from '@/paginas/grupos/pagina_grupos_invitaciones'
import { PaginaGruposMisGrupos } from '@/paginas/grupos/pagina_grupos_mis_grupos'
import { PUERTO_GRUPOS, rutaDeGrupo } from '../../rutas/grupos/rutas_grupos'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'

vi.setConfig({ testTimeout: 40000 })

const crear = catalogoGrupos.crear
const menu = catalogoGrupos.menu
const gestion = menu.gestion
const sugerencias = catalogoGrupos.sugerencias
const etiquetaMenu = (clave: string) => menu.elementos.find((elemento) => elemento.clave === clave)?.etiqueta ?? String()
const abrirMenuDe = (nombre: string) => fireEvent.click(screen.getByRole('button', { name: menu.opciones.replace(':nombre', nombre) }))
const elegir = (nombre: string, opcion: string) => {
  fireEvent.mouseDown(screen.getByRole('combobox', { name: nombre }))
  fireEvent.click(screen.getByRole('option', { name: opcion }))
}

describe('Grupos: pestanas', () => {
  it('solo hay Tus grupos, Sugerencias y Grupos que administras', () => {
    render(<PaginaGruposMisGrupos />)
    expect(screen.getAllByRole('tab').map((pestana) => pestana.textContent)).toEqual(['Tus grupos', 'Sugerencias', 'Grupos que administras'])
  })
})

describe('Grupos: crear y editar en modo demostracion', () => {
  it('crear valida el nombre, agrega el grupo a Grupos que administras y no a Tus grupos, y se puede abrir', () => {
    const { unmount } = render(<PaginaGruposDescubrir />)
    fireEvent.click(screen.getByRole('button', { name: catalogoGrupos.botones.crear_grupo }))
    const dialogo = within(screen.getByRole('dialog', { name: crear.titulo }))
    expect(dialogo.getByRole('textbox', { name: crear.descripcion })).toBeInTheDocument()
    expect(dialogo.queryByText(/privacidad|visibilidad/i)).toBeNull()
    fireEvent.click(dialogo.getByRole('button', { name: crear.boton }))
    expect(dialogo.getByText(crear.error_nombre)).toBeInTheDocument()
    fireEvent.change(dialogo.getByRole('textbox', { name: crear.nombre }), { target: { value: 'Comunidad Demo Uno' } })
    fireEvent.change(dialogo.getByRole('textbox', { name: crear.descripcion }), { target: { value: 'Una comunidad de prueba.' } })
    fireEvent.click(dialogo.getByRole('button', { name: crear.boton }))
    expect(within(screen.getByRole('dialog', { name: crear.creado_titulo })).getByText(crear.creado_texto.replace(':nombre', 'Comunidad Demo Uno'))).toBeInTheDocument()
    expect(within(screen.getByRole('dialog', { name: crear.creado_titulo })).getByRole('link', { name: crear.ver_grupo })).toHaveAttribute('href', rutaDeGrupo('comunidad-demo-uno'))
    fireEvent.click(screen.getAllByRole('button', { name: crear.cerrar_confirmacion })[0])
    expect(screen.getByRole('heading', { level: 3, name: 'Comunidad Demo Uno' })).toBeInTheDocument()
    unmount()
    render(<PaginaGruposMisGrupos />)
    expect(screen.queryByRole('heading', { level: 3, name: 'Comunidad Demo Uno' })).toBeNull()
  })

  it('editar abre el formulario con los datos y refleja el cambio en la lista', () => {
    render(<PaginaGruposDescubrir />)
    abrirMenuDe('Comunidad Demo Uno')
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('editar') }))
    const dialogo = within(screen.getByRole('dialog', { name: crear.titulo_editar }))
    expect((dialogo.getByRole('textbox', { name: crear.nombre }) as HTMLInputElement).value).toBe('Comunidad Demo Uno')
    fireEvent.change(dialogo.getByRole('textbox', { name: crear.nombre }), { target: { value: 'Comunidad Demo Editada' } })
    fireEvent.click(dialogo.getByRole('button', { name: crear.guardar }))
    expect(screen.getByRole('heading', { level: 3, name: 'Comunidad Demo Editada' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'Comunidad Demo Uno' })).toBeNull()
  })
})

describe('Grupos: unirse, abandonar, fijar y eliminar en modo demostracion', () => {
  it('unirse desde Sugerencias lo pasa a Tus grupos y abandonar lo devuelve a Sugerencias', () => {
    const primero = PUERTO_GRUPOS.sugeridos().paraTi[0].nombre
    const sugeridos = render(<PaginaGruposInvitaciones />)
    fireEvent.click(screen.getAllByRole('button', { name: sugerencias.unirme })[0])
    expect(screen.getByText(sugerencias.unido.replace(':nombre', primero))).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: primero })).toBeNull()
    sugeridos.unmount()
    render(<PaginaGruposMisGrupos />)
    expect(screen.getByRole('heading', { level: 3, name: primero })).toBeInTheDocument()
    abrirMenuDe(primero)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('abandonar') }))
    const confirmar = within(screen.getByRole('dialog', { name: gestion.confirmaciones.abandonar.titulo }))
    fireEvent.click(confirmar.getByRole('button', { name: gestion.confirmaciones.abandonar.confirmar }))
    expect(screen.queryByRole('heading', { level: 3, name: primero })).toBeNull()
    expect(PUERTO_GRUPOS.sugeridos().paraTi.map((grupo) => grupo.nombre)).toContain(primero)
  })

  it('fijar un grupo lo sube al principio y el menu ofrece dejar de fijar', () => {
    render(<PaginaGruposMisGrupos />)
    const ultimo = [...PUERTO_GRUPOS.tusGrupos()].sort((a, b) => a.diasVisita - b.diasVisita)[0].nombre
    abrirMenuDe(ultimo)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('fijar') }))
    expect(screen.getByText(menu.fijado)).toBeInTheDocument()
    expect(PUERTO_GRUPOS.tusGrupos().find((grupo) => grupo.nombre === ultimo)?.fijado).toBe(true)
    abrirMenuDe(ultimo)
    expect(screen.getByRole('menuitem', { name: etiquetaMenu('desfijar') })).toBeInTheDocument()
  })

  it('eliminar pide confirmacion y quita el grupo de Grupos que administras', () => {
    render(<PaginaGruposDescubrir />)
    abrirMenuDe('Comunidad Demo Editada')
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('eliminar') }))
    fireEvent.click(within(screen.getByRole('dialog', { name: gestion.confirmaciones.eliminar.titulo })).getByRole('button', { name: gestion.confirmaciones.eliminar.confirmar }))
    expect(screen.queryByRole('heading', { level: 3, name: 'Comunidad Demo Editada' })).toBeNull()
  })
})

describe('Grupos: menu y gestion', () => {
  it('administrador: solicitudes, estado, editar, tu contenido, compartir, notificaciones, fijar y eliminar; no abandonar', () => {
    render(<PaginaGruposDescubrir />)
    abrirMenuDe('Desarrollo Web con Python')
    for (const clave of ['ver_solicitudes', 'estado', 'editar', 'tu_contenido', 'compartir', 'novedades', 'eliminar']) expect(screen.getByRole('menuitem', { name: etiquetaMenu(clave) })).toBeInTheDocument()
    expect(screen.queryByRole('menuitem', { name: etiquetaMenu('abandonar') })).toBeNull()
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('estado') }))
    expect(within(screen.getByRole('dialog', { name: gestion.estado.titulo })).getByText(gestion.estado.publicaciones)).toBeInTheDocument()
  })

  it('miembro: tu contenido, compartir, notificaciones, fijar y abandonar; las notificaciones se pueden cambiar', () => {
    render(<PaginaGruposMisGrupos />)
    const primero = PUERTO_GRUPOS.tusGrupos()[0]
    abrirMenuDe(primero.nombre)
    expect(screen.getAllByRole('menuitem')).toHaveLength(5)
    fireEvent.click(screen.getByRole('menuitem', { name: etiquetaMenu('novedades') }))
    const dialogo = within(screen.getByRole('dialog', { name: gestion.novedades.titulo }))
    fireEvent.click(dialogo.getByRole('radio', { name: gestion.novedades.opciones[2].etiqueta }))
    expect(PUERTO_GRUPOS.estado(primero.id).novedades).toBe('ninguna')
  })

  it('Tus grupos busca, ordena y pagina', () => {
    render(<PaginaGruposMisGrupos />)
    const textos = catalogoGrupos.tus_grupos
    fireEvent.change(screen.getByRole('searchbox', { name: textos.buscar }), { target: { value: 'zzz' } })
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    fireEvent.change(screen.getByRole('searchbox', { name: textos.buscar }), { target: { value: String() } })
    elegir(textos.orden, 'Nombre (A-Z)')
    expect(screen.getByRole('navigation', { name: textos.paginacion })).toBeInTheDocument()
  })
})
