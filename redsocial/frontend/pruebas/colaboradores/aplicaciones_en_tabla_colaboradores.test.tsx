import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { COLABORADORES } from '@/servicios/colaboradores/colaboradores'
import catalogoColaboradores from '@/catalogos/capacidades/redsocial/colaboradores.json'

const GLIFO_ESPERADO: Record<string, string> = {
  Planillas: 'table_chart',
  Contabilidad: 'calculate',
  Inventario: 'svg',
  Ventas: 'trending_up',
  Compras: 'shopping_bag',
  Proyectos: 'work',
  Reportes: 'description',
  Configuración: 'settings',
}
const MAXIMO = catalogoColaboradores.celda_aplicaciones.max_iconos

function filaDe(nombre: string) {
  fireEvent.change(screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador), { target: { value: nombre } })
  return screen.getByRole('checkbox', { name: nombre }).closest('tr') as HTMLElement
}

describe('Aplicaciones en la tabla de Colaboradores', { timeout: 30000 }, () => {
  it.each(COLABORADORES.map((colaborador) => [colaborador.nombre, colaborador] as const))('la fila de %s dibuja los iconos de sus primeras aplicaciones y un contador que suma el resto', (_, colaborador) => {
    render(<PaginaColaboradores />)
    const celda = within(filaDe(colaborador.nombre)).getAllByRole('cell')[3]
    const dibujados = Array.from(celda.querySelectorAll('.material-symbols-rounded, svg.icono')).map((icono) => (icono.tagName.toLowerCase() === 'svg' ? 'svg' : icono.textContent))
    const contador = within(celda).queryByText(/^\+\d+$/)?.textContent ?? null
    const ocultas = colaborador.aplicaciones.length - MAXIMO

    expect(dibujados).toEqual(colaborador.aplicaciones.slice(0, MAXIMO).map((app) => GLIFO_ESPERADO[app.nombre]))
    expect(contador).toBe(ocultas > 0 ? `+${ocultas}` : null)
    expect(dibujados.length + Math.max(0, ocultas)).toBe(Math.min(colaborador.aplicaciones.length, MAXIMO) + Math.max(0, ocultas))
  })

  it('los colaboradores de demostracion cubren los estados Activo, Invitado, Inactivo y Baja con aplicaciones', () => {
    expect(new Set(COLABORADORES.map((colaborador) => colaborador.estado))).toEqual(new Set(['activo', 'invitado', 'inactivo', 'baja']))
    for (const colaborador of COLABORADORES) expect(colaborador.aplicaciones.length).toBeGreaterThan(0)
  })
})
