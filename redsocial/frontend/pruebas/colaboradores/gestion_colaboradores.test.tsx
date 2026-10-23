import { fireEvent, render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { formatearFecha } from '@/componentes/colaboradores/bloques/logica_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '@/mensajes/capacidades/redsocial/textos.json'

const botones = catalogoColaboradores.botones
const edicion = catalogoColaboradores.editar
const panelFiltros = catalogoColaboradores.panel_filtros_avanzados
const resumen = (desde: number, hasta: number, cantidad: number) =>
  catalogoColaboradores.paginacion.resumen.replace('{desde}', String(desde)).replace('{hasta}', String(hasta)).replace('{total}', String(cantidad))

function buscar(texto: string) {
  fireEvent.change(screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador), { target: { value: texto } })
}

function filaDe(nombre: string) {
  return screen.getByText(nombre, { selector: 'span.truncate' }).closest('tr') as HTMLElement
}

function accionDeFila(nombre: string, accion: string) {
  buscar(nombre)
  fireEvent.click(within(filaDe(nombre)).getByRole('button', { name: botones.mas_opciones }))
  fireEvent.click(screen.getByRole('menuitem', { name: accion }))
}

function elegir(contenedor: ReturnType<typeof within>, etiqueta: string, opcion: string) {
  fireEvent.mouseDown(contenedor.getByRole('combobox', { name: etiqueta }))
  fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: opcion }))
}

function abrirEdicion(nombre: string) {
  accionDeFila(nombre, botones.editar_colaborador)
  const titulo = screen.getByRole('heading', { level: 2, name: edicion.titulo })
  return within(titulo.closest('aside') as HTMLElement)
}

function escribir(panel: ReturnType<typeof within>, etiqueta: string, valor: string) {
  fireEvent.change(panel.getByRole('textbox', { name: etiqueta }), { target: { value: valor } })
}

function enviarInvitacion() {
  fireEvent.click(screen.getByRole('button', { name: botones.invitar_colaborador }))
  const dialogo = within(screen.getByRole('dialog', { name: catalogoColaboradores.titulos.invitar }))
  for (let paso = 0; paso < 3; paso += 1) fireEvent.click(dialogo.getByRole('button', { name: textosRedSocial.SIGUIENTE }))
  fireEvent.click(dialogo.getByRole('button', { name: catalogoColaboradores.campos_resumen.enviar_invitacion }))
}

afterEach(() => vi.restoreAllMocks())

describe('Edicion de colaboradores', { timeout: 30000 }, () => {
  it('Guardar cambios actualiza el detalle y la fila de la tabla', () => {
    render(<PaginaColaboradores />)
    const panel = abrirEdicion('María López')
    escribir(panel, edicion.nombre_completo, 'María López Díaz')
    escribir(panel, catalogoColaboradores.campos.correo_electronico, 'maria.diaz@gmail.com')
    elegir(panel, catalogoColaboradores.selectores.rol_perfil.etiqueta, 'Vendedor')
    fireEvent.click(panel.getByRole('button', { name: edicion.guardar_cambios }))

    const detalle = within(screen.getByRole('heading', { level: 2, name: catalogoColaboradores.secciones.detalle_colaborador }).closest('aside') as HTMLElement)
    expect(detalle.getByRole('heading', { level: 3 }).textContent).toBe('María López Díaz')
    const fila = within(filaDe('María López Díaz'))
    expect(fila.getByText('maria.diaz@gmail.com')).toBeInTheDocument()
    expect(fila.getByText('Vendedor')).toBeInTheDocument()
    expect(fila.getByText('Ventas')).toBeInTheDocument()
    expect(screen.queryByText('María López', { selector: 'span.truncate' })).toBeNull()
  })

  it('cambiar las aplicaciones y la vigencia se refleja en la fila', () => {
    render(<PaginaColaboradores />)
    const panel = abrirEdicion('Carlos Mendoza')
    for (const aplicacion of ['Ventas', 'Compras', 'Proyectos', 'Reportes', 'Configuración']) fireEvent.click(panel.getByRole('checkbox', { name: aplicacion }))
    escribir(panel, edicion.fecha_fin, '30/12/2027')
    fireEvent.click(panel.getByRole('button', { name: edicion.guardar_cambios }))

    const fila = within(filaDe('Carlos Mendoza'))
    expect(fila.queryByText(/^\+\d+$/)).toBeNull()
    expect(Array.from(within(filaDe('Carlos Mendoza')).getAllByRole('cell')[2].querySelectorAll('.material-symbols-rounded, svg.icono')).map((icono) => (icono.tagName.toLowerCase() === 'svg' ? 'svg' : icono.textContent))).toEqual(['table_chart', 'calculate', 'svg'])
    expect(fila.getByText(/30\/12\/2027/)).toBeInTheDocument()
  })

  it('cambiar el estado a Inactivo mueve al colaborador a esa pestana', () => {
    render(<PaginaColaboradores />)
    const panel = abrirEdicion('Jorge Ramírez')
    elegir(panel, catalogoColaboradores.selectores.estado.etiqueta, 'Inactivo')
    fireEvent.click(panel.getByRole('button', { name: edicion.guardar_cambios }))

    fireEvent.click(screen.getByRole('tab', { name: /Inactivos/ }))
    expect(screen.getByText('Jorge Ramírez', { selector: 'span.truncate' })).toBeInTheDocument()
    expect(within(filaDe('Jorge Ramírez')).getByText('Inactivo')).toBeInTheDocument()
  })

  it('no permite guardar con nombre vacio, correo repetido o fechas incorrectas', () => {
    render(<PaginaColaboradores />)
    const panel = abrirEdicion('María López')
    const guardar = panel.getByRole('button', { name: edicion.guardar_cambios })
    expect(guardar).toBeEnabled()

    escribir(panel, edicion.nombre_completo, '  ')
    expect(guardar).toBeDisabled()
    escribir(panel, edicion.nombre_completo, 'María López')
    expect(guardar).toBeEnabled()

    escribir(panel, catalogoColaboradores.campos.correo_electronico, COLABORADORES[0].correo)
    expect(guardar).toBeDisabled()
    escribir(panel, catalogoColaboradores.campos.correo_electronico, COLABORADORES[1].correo)
    escribir(panel, edicion.fecha_fin, '31/02/2027')
    expect(guardar).toBeDisabled()
    escribir(panel, edicion.fecha_fin, '01/01/2026')
    expect(guardar).toBeDisabled()
    escribir(panel, edicion.fecha_fin, '15/05/2027')
    expect(guardar).toBeEnabled()
  })

  it('Cancelar descarta los cambios y vuelve al detalle', () => {
    render(<PaginaColaboradores />)
    const panel = abrirEdicion('María López')
    escribir(panel, edicion.nombre_completo, 'Otro nombre')
    fireEvent.click(panel.getByRole('button', { name: textosRedSocial.CANCELAR }))

    expect(screen.getByRole('heading', { level: 2, name: catalogoColaboradores.secciones.detalle_colaborador })).toBeInTheDocument()
    expect(screen.getByText('María López', { selector: 'span.truncate' })).toBeInTheDocument()
    expect(screen.queryByText('Otro nombre', { selector: 'span.truncate' })).toBeNull()
  })
})

describe('Baja de colaboradores', { timeout: 30000 }, () => {
  it('confirmar la baja cambia el estado y la vigencia en la tabla', () => {
    render(<PaginaColaboradores />)
    accionDeFila('Carlos Mendoza', botones.dar_de_baja)
    const dialogo = within(screen.getByRole('dialog'))
    fireEvent.change(dialogo.getByRole('textbox', { name: catalogoColaboradores.confirmar_baja.fecha_baja }), { target: { value: '15/10/2026' } })
    fireEvent.click(dialogo.getByRole('button', { name: botones.dar_de_baja }))

    expect(screen.queryByRole('dialog')).toBeNull()
    const fila = within(filaDe('Carlos Mendoza'))
    expect(fila.getByText('Baja')).toBeInTheDocument()
    expect(fila.getByText(catalogoColaboradores.celda_vigencia.etiqueta_baja)).toBeInTheDocument()
    expect(fila.getByText('15/10/2026')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: /Baja/ }))
    expect(screen.getByText('Carlos Mendoza', { selector: 'span.truncate' })).toBeInTheDocument()
  })

  it('no permite confirmar con una fecha invalida', () => {
    render(<PaginaColaboradores />)
    accionDeFila('Carlos Mendoza', botones.dar_de_baja)
    const dialogo = within(screen.getByRole('dialog'))
    const confirmar = dialogo.getByRole('button', { name: botones.dar_de_baja })
    expect(confirmar).toBeEnabled()

    fireEvent.change(dialogo.getByRole('textbox', { name: catalogoColaboradores.confirmar_baja.fecha_baja }), { target: { value: '31/02/2026' } })
    expect(confirmar).toBeDisabled()
  })

  it('cancelar el dialogo no modifica al colaborador', () => {
    render(<PaginaColaboradores />)
    accionDeFila('Carlos Mendoza', botones.dar_de_baja)
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: textosRedSocial.CANCELAR }))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(within(filaDe('Carlos Mendoza')).getByText('Activo')).toBeInTheDocument()
  })

  it('si el detalle del colaborador esta abierto, refleja la baja', () => {
    render(<PaginaColaboradores />)
    buscar('Carlos Mendoza')
    fireEvent.click(within(filaDe('Carlos Mendoza')).getByRole('button', { name: botones.mas_opciones }))
    fireEvent.click(screen.getByRole('menuitem', { name: botones.ver_colaborador }))
    fireEvent.click(within(filaDe('Carlos Mendoza')).getByRole('button', { name: botones.mas_opciones }))
    fireEvent.click(screen.getByRole('menuitem', { name: botones.dar_de_baja }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: botones.dar_de_baja }))

    const detalle = within(screen.getByRole('heading', { level: 2, name: catalogoColaboradores.secciones.detalle_colaborador }).closest('aside') as HTMLElement)
    expect(detalle.getByText('Baja')).toBeInTheDocument()
  })
})

describe('Invitacion y reenvio', { timeout: 30000 }, () => {
  it('enviar una invitacion agrega al colaborador invitado a la tabla y muestra el aviso', () => {
    render(<PaginaColaboradores />)
    enviarInvitacion()

    expect(within(screen.getByRole('status')).getByText(catalogoColaboradores.mensajes.invitacion_completada_demostracion)).toBeInTheDocument()
    buscar('juan.perez@email.com')
    const fila = within(filaDe('Juan Pérez Martinez'))
    expect(fila.getByText('Invitado')).toBeInTheDocument()
    expect(fila.getByRole('button', { name: botones.reenviar })).toBeInTheDocument()
    expect(fila.getByText(formatearFecha(Date.now()))).toBeInTheDocument()
    buscar('')
    expect(screen.getByText(resumen(1, 3, COLABORADORES.length + 1))).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Invitados/ })).toHaveTextContent('2')
  })

  it('invitar dos veces el mismo correo no duplica la fila', () => {
    render(<PaginaColaboradores />)
    enviarInvitacion()
    enviarInvitacion()

    expect(screen.getByText(resumen(1, 3, COLABORADORES.length + 1))).toBeInTheDocument()
  })

  it('cancelar el asistente no agrega a nadie', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('button', { name: botones.invitar_colaborador }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: textosRedSocial.CANCELAR }))

    expect(screen.getByText(resumen(1, 3, COLABORADORES.length))).toBeInTheDocument()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('Reenviar actualiza la fecha de la invitacion y avisa que no se envio ningun correo', () => {
    render(<PaginaColaboradores />)
    buscar('Ana Torres')
    const fila = within(filaDe('Ana Torres'))
    expect(fila.getByText('20/05/2026')).toBeInTheDocument()

    fireEvent.click(fila.getByRole('button', { name: botones.reenviar }))
    expect(within(screen.getByRole('status')).getByText(catalogoColaboradores.mensajes.invitacion_reenviada_demostracion)).toBeInTheDocument()
    expect(fila.getByText(formatearFecha(Date.now()))).toBeInTheDocument()
    expect(fila.queryByText('20/05/2026')).toBeNull()
    expect(fila.getByText('Invitado')).toBeInTheDocument()
  })
})

describe('Filtros avanzados', { timeout: 30000 }, () => {
  function abrirPanel() {
    fireEvent.click(screen.getByRole('button', { name: botones.filtros }))
    return within(screen.getByRole('dialog', { name: panelFiltros.titulo }))
  }

  it('Aplicar filtra el listado real, el panel conserva los valores y Limpiar restablece', () => {
    render(<PaginaColaboradores />)
    let panel = abrirPanel()
    elegir(panel, panelFiltros.aplicaciones_asignadas.etiqueta, 'Proyectos')
    fireEvent.click(panel.getByRole('button', { name: panelFiltros.aplicar }))

    expect(screen.queryByRole('dialog', { name: panelFiltros.titulo })).toBeNull()
    expect(screen.getByText(resumen(1, 3, 3))).toBeInTheDocument()
    expect(screen.getByText('Carlos Mendoza', { selector: 'span.truncate' })).toBeInTheDocument()
    expect(screen.getByText('Luis Fernández', { selector: 'span.truncate' })).toBeInTheDocument()
    expect(screen.queryByText('Ana Torres', { selector: 'span.truncate' })).toBeNull()

    panel = abrirPanel()
    expect(panel.getByRole('combobox', { name: panelFiltros.aplicaciones_asignadas.etiqueta })).toHaveTextContent('Proyectos')
    fireEvent.click(panel.getByRole('button', { name: panelFiltros.limpiar }))
    expect(screen.getByText(resumen(1, 3, COLABORADORES.length))).toBeInTheDocument()
  })

  it('cerrar el panel sin aplicar descarta los cambios', () => {
    render(<PaginaColaboradores />)
    const panel = abrirPanel()
    fireEvent.click(panel.getByRole('checkbox', { name: panelFiltros.cuenta_invitada }))
    fireEvent.click(panel.getByRole('button', { name: textosRedSocial.CERRAR }))

    expect(screen.getByText(resumen(1, 3, COLABORADORES.length))).toBeInTheDocument()
  })

  it('filtra por tipo de cuenta y se combina con la busqueda y las pestanas', () => {
    render(<PaginaColaboradores />)
    const panel = abrirPanel()
    fireEvent.click(panel.getByRole('checkbox', { name: panelFiltros.cuenta_creada }))
    fireEvent.click(panel.getByRole('button', { name: panelFiltros.aplicar }))
    expect(screen.getByText(resumen(1, 3, COLABORADORES.length - 1))).toBeInTheDocument()

    buscar('gmail')
    fireEvent.click(screen.getByRole('tab', { name: /Invitados/ }))
    expect(screen.getByText(catalogoColaboradores.mensajes.sin_colaboradores)).toBeInTheDocument()
  })
})
