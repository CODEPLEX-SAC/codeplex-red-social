import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { opcionesMenuFila, puedeDarDeBaja, puedeReenviar, registrarBaja, reenviarInvitacion } from '@/componentes/colaboradores/bloques/reglas_estado_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

const botones = catalogoColaboradores.botones
const [carlos, , , ana, luis, rosa] = COLABORADORES
const sinAcciones = { alVer: () => undefined, alEditar: () => undefined, alDarDeBaja: () => undefined }

function filaDe(nombre: string) {
  fireEvent.change(screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador), { target: { value: nombre } })
  return within(screen.getByText(nombre, { selector: 'span.truncate' }).closest('tr') as HTMLElement)
}

function etiquetasDelMenu(nombre: string) {
  fireEvent.click(filaDe(nombre).getByRole('button', { name: botones.mas_opciones }))
  return within(screen.getByRole('menu')).getAllByRole('menuitem').map((item) => item.textContent)
}

describe('Reglas de acciones segun el estado del colaborador', () => {
  it('los estados Inactivo y Baja son distintos en los datos', () => {
    expect(luis.estado).toBe('inactivo')
    expect(rosa.estado).toBe('baja')
  })

  it('solo un colaborador invitado puede recibir un reenvio y solo quien no esta de baja puede darse de baja', () => {
    expect(COLABORADORES.filter(puedeReenviar).map((c) => c.estado)).toEqual(['invitado'])
    expect(COLABORADORES.filter((c) => !puedeDarDeBaja(c)).map((c) => c.estado)).toEqual(['baja'])
  })

  it('el menu de fila omite Dar de baja cuando el colaborador ya esta de baja', () => {
    const etiquetas = (c: typeof rosa) => opcionesMenuFila(c, sinAcciones).map((opcion) => opcion.etiqueta)
    expect(etiquetas(carlos)).toEqual([botones.ver_colaborador, botones.editar_colaborador, botones.dar_de_baja])
    expect(etiquetas(luis)).toEqual([botones.ver_colaborador, botones.editar_colaborador, botones.dar_de_baja])
    expect(etiquetas(rosa)).toEqual([botones.ver_colaborador, botones.editar_colaborador])
  })

  it('dar de baja a quien ya esta de baja no cambia nada, ni siquiera la fecha', () => {
    expect(registrarBaja(rosa, '15/10/2026')).toBe(rosa)
  })

  it('reenviar solo actua sobre invitados', () => {
    expect(reenviarInvitacion(carlos, Date.now())).toBe(carlos)
    expect(reenviarInvitacion(rosa, Date.now())).toBe(rosa)
    expect(reenviarInvitacion(ana, Date.now())).not.toBe(ana)
  })
})

describe('Acciones de fila en la tabla', { timeout: 30000 }, () => {
  it('un colaborador activo tiene menu completo y no tiene Reenviar', () => {
    render(<PaginaColaboradores />)
    expect(etiquetasDelMenu(carlos.nombre)).toEqual([botones.ver_colaborador, botones.editar_colaborador, botones.dar_de_baja])
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
    expect(filaDe(carlos.nombre).queryByRole('button', { name: botones.reenviar })).toBeNull()
  })

  it('un colaborador invitado muestra Reenviar y no el menu', () => {
    render(<PaginaColaboradores />)
    const fila = filaDe(ana.nombre)
    expect(fila.getByRole('button', { name: botones.reenviar })).toBeInTheDocument()
    expect(fila.queryByRole('button', { name: botones.mas_opciones })).toBeNull()
  })

  it('un colaborador inactivo conserva Dar de baja', () => {
    render(<PaginaColaboradores />)
    expect(etiquetasDelMenu(luis.nombre)).toContain(botones.dar_de_baja)
  })

  it('un colaborador de baja no ofrece Dar de baja pero si consultar y editar', () => {
    render(<PaginaColaboradores />)
    expect(etiquetasDelMenu(rosa.nombre)).toEqual([botones.ver_colaborador, botones.editar_colaborador])
  })

  it('despues de dar de baja a un colaborador su menu ya no ofrece Dar de baja', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(filaDe(carlos.nombre).getByRole('button', { name: botones.mas_opciones }))
    fireEvent.click(screen.getByRole('menuitem', { name: botones.dar_de_baja }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: botones.dar_de_baja }))

    expect(etiquetasDelMenu(carlos.nombre)).toEqual([botones.ver_colaborador, botones.editar_colaborador])
  })

  it('reenviar no crea otro colaborador', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(filaDe(ana.nombre).getByRole('button', { name: botones.reenviar }))
    fireEvent.change(screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador), { target: { value: '' } })

    expect(screen.getAllByText(ana.nombre, { selector: 'span.truncate' })).toHaveLength(1)
    expect(screen.getByText(catalogoColaboradores.paginacion.resumen.replace('{desde}', '1').replace('{hasta}', '3').replace('{total}', String(COLABORADORES.length)))).toBeInTheDocument()
  })

  it('el filtro Metodo de invitacion aparece deshabilitado porque el modelo no registra ese dato', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(screen.getByRole('button', { name: botones.filtros }))
    const panel = within(screen.getByRole('dialog', { name: catalogoColaboradores.panel_filtros_avanzados.titulo }))

    expect(panel.getByRole('combobox', { name: catalogoColaboradores.panel_filtros_avanzados.metodo_invitacion.etiqueta })).toHaveAttribute('aria-disabled', 'true')
  })
})
