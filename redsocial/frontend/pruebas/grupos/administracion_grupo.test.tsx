import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaGruposDetalle } from '@/paginas/grupos/pagina_grupos_detalle'
import { PUERTO_GRUPOS, rutaDeGrupo } from '../../rutas/grupos/rutas_grupos'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'

vi.setConfig({ testTimeout: 40000 })

const admin = catalogoGrupos.administracion
const vistas = admin.vistas
const PYTHON = 'desarrollo-web-con-python'
const MIEMBRO = 'programacion-go'

function abrir(id: string) {
  window.history.pushState({}, '', rutaDeGrupo(id))
  return render(<PaginaGruposDetalle />)
}

const navegacion = () => screen.getByRole('navigation', { name: admin.navegacion })
const opcion = (etiqueta: string) => within(navegacion()).getByRole('button', { name: etiqueta })

describe('Administrar grupo: visibilidad segun el rol del grupo actual', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('un administrador del grupo ve la columna con identidad, categorias y opciones', () => {
    abrir(PYTHON)
    expect(navegacion()).toBeInTheDocument()
    expect(within(navegacion()).getByRole('heading', { level: 2, name: admin.titulo })).toBeInTheDocument()
    expect(within(navegacion()).getByText('Desarrollo Web con Python')).toBeInTheDocument()
    admin.principal.forEach((item) => expect(opcion(item.etiqueta)).toBeInTheDocument())
    expect(within(navegacion()).getByText(admin.miembros_grupo.replace(':n', '20'))).toBeInTheDocument()
    for (const categoria of admin.categorias) {
      expect(within(navegacion()).getByRole('button', { name: categoria.titulo })).toBeInTheDocument()
      for (const item of categoria.opciones) expect(opcion(item.etiqueta)).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { level: 1, name: 'Desarrollo Web con Python' })).toBeInTheDocument()
    catalogoGrupos.detalle.pestanas.forEach((pestana) => expect(screen.getByRole('tab', { name: pestana.etiqueta })).toBeInTheDocument())
  })

  it('un miembro no ve la columna ni un grupo inexistente', () => {
    const miembro = abrir(MIEMBRO)
    expect(screen.queryByRole('navigation', { name: admin.navegacion })).toBeNull()
    expect(screen.getByRole('heading', { level: 1, name: 'Programación Go' })).toBeInTheDocument()
    miembro.unmount()
    abrir('no-existe')
    expect(screen.queryByRole('navigation', { name: admin.navegacion })).toBeNull()
  })

  it('la condicion depende del grupo: un grupo creado ve la columna y otro grupo ajeno no', () => {
    const creado = PUERTO_GRUPOS.crear({ nombre: 'Grupo Para Administrar', descripcion: String() })
    const propio = abrir(creado.id)
    expect(navegacion()).toBeInTheDocument()
    propio.unmount()
    abrir(MIEMBRO)
    expect(screen.queryByRole('navigation', { name: admin.navegacion })).toBeNull()
  })
})

describe('Administrar grupo: navegacion y vistas de demostracion', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('las categorias se contraen y expanden', () => {
    abrir(PYTHON)
    const categoria = admin.categorias[0]
    const cabecera = within(navegacion()).getByRole('button', { name: categoria.titulo })
    fireEvent.click(cabecera)
    expect(cabecera).toHaveAttribute('aria-expanded', 'false')
    expect(within(navegacion()).queryByRole('button', { name: categoria.opciones[1].etiqueta })).toBeNull()
    fireEvent.click(cabecera)
    expect(opcion(categoria.opciones[1].etiqueta)).toBeInTheDocument()
  })

  it('Resumen muestra indicadores y Inicio devuelve la conversacion del grupo sin perder el contenido', () => {
    abrir(PYTHON)
    fireEvent.click(opcion('Resumen'))
    expect(screen.getByRole('heading', { level: 1, name: vistas.resumen.titulo })).toBeInTheDocument()
    expect(screen.getByText(admin.demostracion)).toBeInTheDocument()
    expect(opcion('Resumen')).toHaveAttribute('aria-current', 'page')
    fireEvent.click(opcion('Inicio de la comunidad'))
    expect(screen.getByRole('heading', { level: 1, name: 'Desarrollo Web con Python' })).toBeVisible()
  })

  it('Solicitudes reutiliza el dialogo existente y Configuracion abre la edicion del grupo', () => {
    abrir(PYTHON)
    fireEvent.click(opcion('Solicitudes de miembros'))
    expect(within(screen.getByRole('dialog', { name: catalogoGrupos.menu.gestion.solicitudes.titulo })).getByText(catalogoGrupos.menu.gestion.solicitudes.vacio)).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: catalogoGrupos.menu.gestion.cerrar })[0])
    fireEvent.click(opcion('Configuración del grupo'))
    expect(screen.getByRole('dialog', { name: catalogoGrupos.crear.titulo_editar })).toBeInTheDocument()
  })

  it('Preguntas para miembros permite anadir y quitar preguntas localmente', () => {
    abrir(PYTHON)
    fireEvent.click(opcion('Preguntas para miembros'))
    const lista = within(screen.getByRole('list', { name: vistas.preguntas.lista }))
    expect(lista.getAllByRole('listitem')).toHaveLength(admin.demo.preguntas.length)
    fireEvent.change(screen.getByRole('textbox', { name: vistas.preguntas.nueva }), { target: { value: 'Cual es tu experiencia?' } })
    fireEvent.click(screen.getByRole('button', { name: vistas.preguntas.agregar }))
    expect(lista.getByText('Cual es tu experiencia?')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: vistas.preguntas.quitar.replace(':pregunta', 'Cual es tu experiencia?') }))
    expect(lista.queryByText('Cual es tu experiencia?')).toBeNull()
  })

  it('Publicaciones pendientes: aprobar quita el elemento, avisa que es demostracion y termina en estado vacio', () => {
    abrir(PYTHON)
    fireEvent.click(opcion('Publicaciones pendientes'))
    const total = admin.demo.pendientes.length
    Array.from({ length: total }).forEach(() => fireEvent.click(screen.getAllByRole('button', { name: 'Aprobar' })[0]))
    expect(screen.getByText(vistas.pendientes.vacio)).toBeInTheDocument()
    expect(screen.getByText(/Solo en esta demostración/)).toBeInTheDocument()
  })

  it('programadas, alertas, registro, roles y estadisticas muestran su vista', () => {
    abrir(PYTHON)
    fireEvent.click(opcion('Publicaciones programadas'))
    expect(screen.getAllByRole('button', { name: 'Cancelar publicación' })).toHaveLength(admin.demo.programadas.length)
    fireEvent.click(opcion('Alertas de moderación'))
    expect(screen.getAllByRole('button', { name: 'Marcar como revisada' })).toHaveLength(admin.demo.incidencias.length)
    fireEvent.click(opcion('Registro de actividad'))
    expect(screen.getByText(admin.demo.creacion)).toBeInTheDocument()
    fireEvent.click(opcion('Roles de la comunidad'))
    expect(screen.getByText(vistas.roles.nota)).toBeInTheDocument()
    expect(screen.getByText(vistas.roles.personas.replace(':n', '1'))).toBeInTheDocument()
    expect(screen.getByText(vistas.roles.personas.replace(':n', '19'))).toBeInTheDocument()
    fireEvent.click(opcion('Crecimiento'))
    expect(screen.getByRole('list', { name: vistas.crecimiento.titulo })).toBeInTheDocument()
    fireEvent.click(opcion('Interacción'))
    expect(screen.getByText(vistas.interaccion.indicadores.comentarios)).toBeInTheDocument()
  })

  it('Sugerencias, Estado del grupo, Administradores y Miembros reutilizan las vistas existentes', () => {
    abrir(PYTHON)
    fireEvent.click(opcion('Sugerencias de miembros'))
    expect(screen.getAllByRole('button', { name: 'Invitar' })).toHaveLength(admin.demo.sugerencias.length)
    fireEvent.click(opcion('Estado del grupo'))
    expect(screen.getByRole('dialog', { name: catalogoGrupos.menu.gestion.titulos.estado })).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: catalogoGrupos.menu.gestion.cerrar })[0])
    fireEvent.click(opcion('Administradores y moderadores'))
    expect(screen.getByRole('heading', { level: 1, name: admin.vistas.administradores.titulo })).toBeInTheDocument()
    fireEvent.click(opcion('Miembros'))
    expect(screen.getByRole('heading', { level: 2, name: catalogoGrupos.detalle.miembros.titulo.replace(':n', '20') })).toBeInTheDocument()
  })

  it('el boton Administrar grupo despliega la navegacion en moviles', () => {
    abrir(PYTHON)
    const boton = screen.getByRole('button', { name: admin.boton_movil })
    expect(boton).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(boton)
    expect(boton).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(opcion('Resumen'))
    expect(boton).toHaveAttribute('aria-expanded', 'false')
  })
})
