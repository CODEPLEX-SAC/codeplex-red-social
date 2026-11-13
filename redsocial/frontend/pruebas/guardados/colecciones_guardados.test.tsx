import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { PaginaGuardados } from '@/paginas/guardados/pagina_guardados'
import catalogoGuardados from '../../catalogos/capacidades/redsocial/guardados.json'

const botones = catalogoGuardados.botones
const modales = catalogoGuardados.modales
const avisos = catalogoGuardados.avisos
const original = window.matchMedia

function simularPantalla(movil: boolean) {
  window.matchMedia = vi.fn().mockImplementation((consulta: string) => ({ matches: movil, media: consulta, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn() }))
}

const GRUPO_SIN_COLECCION = 'Gestión de Proyectos'
const tarjetas = () => screen.queryAllByRole('heading', { level: 2 }).filter((titulo) => titulo.closest('article'))
const tarjetaDe = (nombre: string) => screen.getByRole('heading', { level: 2, name: nombre }).closest('article') as HTMLElement
const irAColecciones = () => fireEvent.click(screen.getByRole('tab', { name: catalogoGuardados.pestanas[1].etiqueta }))
const abrirMenuColeccion = (nombre: string) => fireEvent.click(screen.getByRole('button', { name: `${botones.opciones_coleccion}: ${nombre}` }))
const elegirOpcion = async (etiqueta: string) => fireEvent.click(await screen.findByRole('menuitem', { name: etiqueta }))
const dialogo = (nombre: string) => within(screen.getByRole('dialog', { name: nombre }))
const crearColeccion = (nombre: string) => {
  fireEvent.click(screen.getAllByRole('button', { name: botones.nueva_coleccion })[0])
  fireEvent.change(dialogo(modales.crear.titulo).getByRole('textbox', { name: modales.marcador }), { target: { value: nombre } })
  fireEvent.click(dialogo(modales.crear.titulo).getByRole('button', { name: modales.crear.confirmar }))
}

describe('Guardados: pestañas, filtros y búsqueda', () => {
  beforeEach(() => simularPantalla(false))
  afterEach(() => {
    window.matchMedia = original
  })

  it('cambia entre Elementos guardados y Colecciones', () => {
    render(<PaginaGuardados />)
    expect(screen.getByRole('tab', { name: catalogoGuardados.pestanas[0].etiqueta })).toHaveAttribute('aria-selected', 'true')
    irAColecciones()
    expect(screen.getByRole('heading', { name: catalogoGuardados.secciones.mis_colecciones_total.replace(':n', '4') })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: catalogoGuardados.pestanas[0].etiqueta }))
    expect(tarjetas()).toHaveLength(8)
  })

  it('las categorías son filtros: Grupos muestra los grupos y las demás muestran su estado vacío', () => {
    render(<PaginaGuardados />)
    const filtros = within(screen.getByRole('group', { name: catalogoGuardados.campos.filtros }))
    expect(filtros.getAllByRole('button')).toHaveLength(5)
    fireEvent.click(filtros.getByRole('button', { name: 'Publicaciones' }))
    expect(filtros.getByRole('button', { name: 'Publicaciones' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(catalogoGuardados.vacios.publicaciones)).toBeInTheDocument()
    expect(tarjetas()).toHaveLength(0)
    fireEvent.click(filtros.getByRole('button', { name: 'Grupos' }))
    expect(tarjetas()).toHaveLength(8)
  })

  it('la búsqueda filtra los grupos guardados', () => {
    render(<PaginaGuardados />)
    fireEvent.change(screen.getByPlaceholderText(catalogoGuardados.placeholders.buscar_guardados), { target: { value: 'diseno' } })
    expect(tarjetas()).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 2, name: 'Diseño UX/UI LATAM' })).toBeInTheDocument()
  })
})

describe('Guardados: acciones de cada grupo', () => {
  beforeEach(() => simularPantalla(false))
  afterEach(() => {
    window.matchMedia = original
  })

  it('el menú de tres puntos ofrece agregar, compartir y quitar, y se cierra con Escape', async () => {
    render(<PaginaGuardados />)
    fireEvent.click(within(tarjetaDe(GRUPO_SIN_COLECCION)).getByRole('button', { name: botones.mas_opciones }))
    for (const etiqueta of [botones.agregar_a_coleccion, botones.compartir, botones.quitar_guardado]) expect(await screen.findByRole('menuitem', { name: etiqueta })).toBeInTheDocument()
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  })

  it('agrega un grupo a una colección existente y avisa', async () => {
    render(<PaginaGuardados />)
    fireEvent.click(within(tarjetaDe(GRUPO_SIN_COLECCION)).getByRole('button', { name: botones.mas_opciones }))
    await elegirOpcion(botones.agregar_a_coleccion)
    const ventana = dialogo(modales.agregar.titulo)
    expect(ventana.getByRole('button', { name: botones.agregar })).toBeDisabled()
    fireEvent.click(ventana.getByRole('button', { name: /Networking/ }))
    fireEvent.click(ventana.getByRole('button', { name: botones.agregar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(await screen.findByText(avisos.grupo_agregado)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Networking/ })).toHaveTextContent(/3 elementos/)
  })

  it('el grupo ya incluido en una colección no se puede elegir de nuevo', async () => {
    render(<PaginaGuardados />)
    fireEvent.click(within(tarjetaDe('Dev Community CODEPLEX')).getByRole('button', { name: botones.mas_opciones }))
    await elegirOpcion(botones.agregar_a_coleccion)
    expect(dialogo(modales.agregar.titulo).getByRole('button', { name: /Favoritos/ })).toBeDisabled()
  })

  it('compartir abre el flujo de compartir del grupo', async () => {
    render(<PaginaGuardados />)
    fireEvent.click(within(tarjetaDe(GRUPO_SIN_COLECCION)).getByRole('button', { name: botones.mas_opciones }))
    await elegirOpcion(botones.compartir)
    expect(screen.getByRole('dialog', { name: modales.compartir.grupo })).toBeInTheDocument()
  })

  it('quitar de guardados pide confirmación y no borra nada si se cancela', async () => {
    render(<PaginaGuardados />)
    fireEvent.click(within(tarjetaDe(GRUPO_SIN_COLECCION)).getByRole('button', { name: botones.mas_opciones }))
    await elegirOpcion(botones.quitar_guardado)
    fireEvent.click(dialogo(modales.quitar.titulo).getByRole('button', { name: botones.cancelar }))
    expect(tarjetas()).toHaveLength(8)
  })

  it('el marcador de la tarjeta quita el grupo, actualiza el total y las colecciones', async () => {
    render(<PaginaGuardados />)
    fireEvent.click(within(tarjetaDe('Dev Community CODEPLEX')).getByRole('button', { name: botones.quitar_guardado }))
    expect(dialogo(modales.quitar.titulo).getByText(modales.quitar.mensaje)).toBeInTheDocument()
    fireEvent.click(dialogo(modales.quitar.titulo).getByRole('button', { name: botones.quitar }))
    expect(await screen.findByText(avisos.quitado)).toBeInTheDocument()
    expect(tarjetas()).toHaveLength(7)
    expect(screen.queryByRole('heading', { level: 2, name: 'Dev Community CODEPLEX' })).toBeNull()
    expect(screen.getByRole('heading', { name: catalogoGuardados.secciones.grupos_guardados.replace(':n', '7') })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Favoritos/ })).toHaveTextContent(/2 elementos/)
  })
})

describe('Guardados: colecciones', () => {
  beforeEach(() => simularPantalla(false))
  afterEach(() => {
    window.matchMedia = original
  })

  it('crear colección valida el nombre, la crea una sola vez y rechaza duplicados', () => {
    render(<PaginaGuardados />)
    fireEvent.click(screen.getAllByRole('button', { name: botones.nueva_coleccion })[0])
    const ventana = dialogo(modales.crear.titulo)
    expect(ventana.getByRole('button', { name: modales.crear.confirmar })).toBeDisabled()
    fireEvent.change(ventana.getByRole('textbox', { name: modales.marcador }), { target: { value: 'favoritos' } })
    expect(ventana.getByRole('alert')).toHaveTextContent(modales.repetido)
    expect(ventana.getByRole('button', { name: modales.crear.confirmar })).toBeDisabled()
    fireEvent.click(ventana.getByRole('button', { name: botones.cancelar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    crearColeccion('Lecturas')
    expect(screen.queryByRole('dialog')).toBeNull()
    irAColecciones()
    expect(screen.getAllByRole('heading', { level: 2, name: 'Lecturas' })).toHaveLength(1)
    expect(screen.getByRole('heading', { name: catalogoGuardados.secciones.mis_colecciones_total.replace(':n', '5') })).toBeInTheDocument()
  })

  it('abre una colección, muestra sus grupos, quita uno de la colección y vuelve', async () => {
    render(<PaginaGuardados />)
    irAColecciones()
    fireEvent.click(screen.getByRole('button', { name: `${botones.ver_coleccion}: Networking` }))
    expect(screen.getByRole('heading', { level: 2, name: 'Networking' })).toBeInTheDocument()
    expect(tarjetas()).toHaveLength(2)
    fireEvent.click(within(tarjetas()[0].closest('article') as HTMLElement).getByRole('button', { name: botones.mas_opciones }))
    await elegirOpcion(botones.quitar_de_coleccion)
    expect(tarjetas()).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: botones.volver_colecciones }))
    expect(screen.getByRole('button', { name: `${botones.ver_coleccion}: Networking` })).toBeInTheDocument()
  })

  it('una colección nueva muestra su estado vacío', () => {
    render(<PaginaGuardados />)
    crearColeccion('Vacía')
    irAColecciones()
    fireEvent.click(screen.getByRole('button', { name: `${botones.ver_coleccion}: Vacía` }))
    expect(screen.getByText(catalogoGuardados.vacios.coleccion)).toBeInTheDocument()
  })

  it('cambia el nombre de una colección', async () => {
    render(<PaginaGuardados />)
    irAColecciones()
    abrirMenuColeccion('Aprendizaje')
    await elegirOpcion(botones.cambiar_nombre)
    const campo = dialogo(modales.renombrar.titulo).getByRole('textbox', { name: modales.marcador })
    expect(campo).toHaveValue('Aprendizaje')
    fireEvent.change(campo, { target: { value: 'Cursos' } })
    fireEvent.click(dialogo(modales.renombrar.titulo).getByRole('button', { name: botones.guardar }))
    expect(screen.getByRole('heading', { level: 2, name: 'Cursos' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 2, name: 'Aprendizaje' })).toBeNull()
  })

  it('eliminar una colección pide confirmación y conserva los grupos guardados', async () => {
    render(<PaginaGuardados />)
    irAColecciones()
    abrirMenuColeccion('Networking')
    await elegirOpcion(botones.eliminar_coleccion)
    expect(dialogo(modales.eliminar.titulo).getByText(modales.eliminar.mensaje.replace(':nombre', 'Networking'))).toBeInTheDocument()
    fireEvent.click(dialogo(modales.eliminar.titulo).getByRole('button', { name: botones.eliminar }))
    expect(screen.queryByRole('heading', { level: 2, name: 'Networking' })).toBeNull()
    expect(await screen.findByText(avisos.coleccion_eliminada)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: catalogoGuardados.pestanas[0].etiqueta }))
    expect(tarjetas()).toHaveLength(8)
  })

  it('compartir una colección abre el flujo de compartir', async () => {
    render(<PaginaGuardados />)
    irAColecciones()
    abrirMenuColeccion('Favoritos')
    await elegirOpcion(botones.compartir_coleccion)
    expect(screen.getByRole('dialog', { name: modales.compartir.coleccion })).toBeInTheDocument()
  })

  it('las acciones rápidas de escritorio son funcionales', () => {
    render(<PaginaGuardados />)
    const rapidas = catalogoGuardados.acciones_rapidas
    fireEvent.click(screen.getByRole('button', { name: new RegExp(rapidas[2].etiqueta) }))
    expect(screen.getByRole('tab', { name: catalogoGuardados.pestanas[1].etiqueta })).toHaveAttribute('aria-selected', 'true')
    fireEvent.click(screen.getAllByRole('button', { name: new RegExp(rapidas[0].etiqueta) }).at(-1) as HTMLElement)
    expect(screen.getByRole('dialog', { name: modales.crear.titulo })).toBeInTheDocument()
  })
})

describe('Guardados: diseño móvil', () => {
  beforeEach(() => simularPantalla(true))
  afterEach(() => {
    window.matchMedia = original
  })

  it('muestra cuatro grupos, Ver todos los despliega y Ver menos los recoge, sin columna Mis colecciones', () => {
    render(<PaginaGuardados />)
    expect(screen.queryByRole('heading', { name: catalogoGuardados.secciones.mis_colecciones })).toBeNull()
    expect(tarjetas()).toHaveLength(catalogoGuardados.limite_inicial)
    expect(screen.getByRole('heading', { name: catalogoGuardados.secciones.grupos_guardados.replace(':n', '8') })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: botones.ver_todos }))
    expect(tarjetas()).toHaveLength(8)
    fireEvent.click(screen.getByRole('button', { name: botones.ver_menos }))
    expect(tarjetas()).toHaveLength(catalogoGuardados.limite_inicial)
  })

  it('el banner inferior abre la creación de colecciones', () => {
    render(<PaginaGuardados />)
    expect(screen.getByRole('heading', { name: catalogoGuardados.secciones.organiza_titulo })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: botones.crear_coleccion }))
    expect(screen.getByRole('dialog', { name: modales.crear.titulo })).toBeInTheDocument()
  })
})
