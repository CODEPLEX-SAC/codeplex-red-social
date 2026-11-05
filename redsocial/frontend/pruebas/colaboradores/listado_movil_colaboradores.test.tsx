import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const botones = catalogoColaboradores.botones
const acciones = catalogoCompartido.acciones_tabla
const panel = catalogoColaboradores.panel_filtros_avanzados
const [carlos, , , ana, luis, rosa] = COLABORADORES
const matchMediaOriginal = window.matchMedia

function simularMovil(activo: boolean) {
  window.matchMedia = ((consulta: string) => ({
    matches: activo && consulta === catalogoCompartido.consultas.movil,
    media: consulta,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}

function filasDeDatos() {
  return within(screen.getByRole('table')).getAllByRole('row').slice(1)
}

function filaDe(nombre: string) {
  return within(screen.getByText(nombre, { selector: 'span.truncate' }).closest('tr') as HTMLElement)
}

describe('Listado de colaboradores en móvil', { timeout: 30000 }, () => {
  beforeEach(() => simularMovil(true))
  afterEach(() => {
    window.matchMedia = matchMediaOriginal
  })

  it('conserva una única tabla con encabezados y una fila por colaborador, sin tarjetas', () => {
    render(<PaginaColaboradores />)
    expect(screen.getAllByRole('table')).toHaveLength(1)
    const cabeceras = within(screen.getByRole('table')).getAllByRole('columnheader').map((celda) => celda.textContent)
    expect(cabeceras).toEqual([catalogoColaboradores.tabla.colaborador, catalogoColaboradores.tabla.rol_perfil, catalogoColaboradores.tabla.aplicaciones, catalogoColaboradores.tabla.estado, catalogoColaboradores.tabla.vigencia, catalogoColaboradores.tabla.acciones])
    expect(filasDeDatos()).toHaveLength(COLABORADORES.length)
    for (const fila of filasDeDatos()) expect(within(fila).getAllByRole('cell')).toHaveLength(cabeceras.length)
    expect(filaDe(carlos.nombre).getByText(carlos.rol)).toBeInTheDocument()
    expect(screen.getByRole('table').closest('.overflow-x-auto')).not.toBeNull()
  })

  it('sin criterios activos oculta los selectores permanentes y muestra Filtros en lugar de Filtros avanzados', () => {
    render(<PaginaColaboradores />)
    expect(screen.getByRole('button', { name: botones.filtros_movil })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: botones.filtros })).toBeNull()
  })

  it('las acciones se agrupan en un menú ⋮ por fila con Ver detalle, Editar y Dar de baja en texto, y Reenviar sigue visible para invitados', () => {
    render(<PaginaColaboradores />)
    const boton = filaDe(carlos.nombre).getByRole('button', { name: acciones.opciones_de.replace(':nombre', carlos.nombre) })
    expect(filaDe(carlos.nombre).getAllByRole('button')).toHaveLength(1)
    fireEvent.click(boton)
    expect(within(screen.getByRole('menu')).getAllByRole('menuitem').map((opcion) => opcion.textContent?.replace(/^[a-z_]+/, ''))).toEqual([acciones.ver_detalle, acciones.editar, acciones.dar_de_baja])
    fireEvent.click(screen.getByRole('menuitem', { name: new RegExp(acciones.ver_detalle) }))
    expect(screen.getByRole('heading', { level: 2, name: catalogoColaboradores.secciones.detalle_colaborador })).toBeInTheDocument()
    expect(filaDe(ana.nombre).getByRole('button', { name: botones.reenviar })).toBeInTheDocument()
    expect(luis.nombre).toBeTruthy()
    expect(rosa.nombre).toBeTruthy()
  })

  it('Reenviar desde la fila actualiza al colaborador y avisa sin enviar correo', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(filaDe(ana.nombre).getByRole('button', { name: botones.reenviar }))
    expect(screen.getByRole('alert')).toHaveTextContent(catalogoColaboradores.mensajes.invitacion_reenviada_demostracion)
  })

  it('Filtros se abre con Rol / Perfil y Aplicaciones, se aplica con etiquetas activas y se limpia quitándolas', () => {
    render(<PaginaColaboradores />)
    const total = filasDeDatos().length
    fireEvent.click(screen.getByRole('button', { name: botones.filtros_movil }))
    const hoja = within(screen.getByRole('dialog', { name: panel.titulo }))
    fireEvent.mouseDown(hoja.getByRole('combobox', { name: catalogoColaboradores.selectores.rol_perfil.etiqueta }))
    fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: carlos.rol }))
    expect(hoja.getByRole('combobox', { name: catalogoColaboradores.selectores.aplicaciones.etiqueta })).toBeInTheDocument()
    fireEvent.click(hoja.getByRole('button', { name: panel.aplicar }))

    expect(screen.queryByRole('dialog', { name: panel.titulo })).toBeNull()
    const etiqueta = botones.quitar_filtro.replace(':filtro', catalogoColaboradores.exportacion.criterios.rol.replace('{valor}', carlos.rol))
    expect(filasDeDatos()).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: etiqueta }))
    expect(screen.queryByRole('button', { name: etiqueta })).toBeNull()
    expect(filasDeDatos()).toHaveLength(total)
  })

  it('Limpiar filtros restablece Rol / Perfil y las etiquetas desaparecen', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('button', { name: botones.filtros_movil }))
    let hoja = within(screen.getByRole('dialog', { name: panel.titulo }))
    fireEvent.mouseDown(hoja.getByRole('combobox', { name: catalogoColaboradores.selectores.rol_perfil.etiqueta }))
    fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: carlos.rol }))
    fireEvent.click(hoja.getByRole('button', { name: panel.aplicar }))
    expect(screen.getAllByRole('button', { name: new RegExp(botones.quitar_filtro.split(':')[0]) })).toHaveLength(1)

    fireEvent.click(screen.getByRole('button', { name: new RegExp(botones.filtros_movil) }))
    hoja = within(screen.getByRole('dialog', { name: panel.titulo }))
    fireEvent.click(hoja.getByRole('button', { name: panel.limpiar }))
    expect(screen.queryAllByRole('button', { name: new RegExp(botones.quitar_filtro.split(':')[0]) })).toHaveLength(0)
  })
})

describe('Listado de colaboradores en escritorio', { timeout: 30000 }, () => {
  it('conserva la tabla y el botón Filtros avanzados', () => {
    render(<PaginaColaboradores />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: botones.filtros })).toBeInTheDocument()
    expect(within(screen.getByText(carlos.nombre, { selector: 'span.truncate' }).closest('tr') as HTMLElement).getAllByRole('button')).toHaveLength(3)
  })
})
