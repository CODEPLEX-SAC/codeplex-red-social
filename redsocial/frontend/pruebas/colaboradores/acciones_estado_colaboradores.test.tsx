import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { puedeDarDeBaja, puedeReenviar, registrarBaja, reenviarInvitacion } from '@/componentes/colaboradores/bloques/reglas_estado_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

vi.mock('@/componentes/colaboradores/bloques/colaboradores_tabla_config', async (importarOriginal) => ({
  ...(await importarOriginal<typeof import('@/componentes/colaboradores/bloques/colaboradores_tabla_config')>()),
  TAMANO_PAGINA_COLABORADORES: 3,
}))

const botones = catalogoColaboradores.botones
const [carlos, , , ana, luis, rosa] = COLABORADORES

function filaDe(nombre: string) {
  fireEvent.change(screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador), { target: { value: nombre } })
  return within(screen.getByText(nombre, { selector: 'span.truncate' }).closest('tr') as HTMLElement)
}

function accionesDe(nombre: string) {
  return [botones.accion_ver, botones.accion_editar, botones.accion_baja].map((plantilla) => plantilla.replace(':nombre', nombre))
}

function etiquetasDeAcciones(nombre: string) {
  const celda = filaDe(nombre).getAllByRole('cell').at(-1) as HTMLElement
  return within(celda).getAllByRole('button').map((boton) => boton.getAttribute('aria-label'))
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
  it('un colaborador activo tiene las tres acciones visibles y no tiene Reenviar', () => {
    render(<PaginaColaboradores />)
    expect(etiquetasDeAcciones(carlos.nombre)).toEqual(accionesDe(carlos.nombre))
    expect(filaDe(carlos.nombre).queryByRole('button', { name: botones.reenviar })).toBeNull()
  })

  it('un colaborador invitado muestra Reenviar y no las acciones de icono', () => {
    render(<PaginaColaboradores />)
    const fila = filaDe(ana.nombre)
    expect(fila.getByRole('button', { name: botones.reenviar })).toBeInTheDocument()
    expect(fila.queryByRole('button', { name: botones.accion_ver.replace(':nombre', ana.nombre) })).toBeNull()
  })

  it('un colaborador inactivo conserva Dar de baja', () => {
    render(<PaginaColaboradores />)
    expect(etiquetasDeAcciones(luis.nombre)).toEqual(accionesDe(luis.nombre))
  })

  it('un colaborador de baja no ofrece Dar de baja pero si consultar y editar', () => {
    render(<PaginaColaboradores />)
    expect(etiquetasDeAcciones(rosa.nombre)).toEqual(accionesDe(rosa.nombre).slice(0, 2))
  })

  it('despues de dar de baja a un colaborador su fila ya no ofrece Dar de baja', () => {
    render(<PaginaColaboradores />)
    fireEvent.click(filaDe(carlos.nombre).getByRole('button', { name: botones.accion_baja.replace(':nombre', carlos.nombre) }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: botones.dar_de_baja }))

    expect(etiquetasDeAcciones(carlos.nombre)).toEqual(accionesDe(carlos.nombre).slice(0, 2))
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
