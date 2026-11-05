import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import { contarOcultos } from '@/componentes/colaboradores/bloques/logica_aplicaciones_visibles'
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

function filaDe(nombre: string) {
  fireEvent.change(screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador), { target: { value: nombre } })
  return screen.getByText(nombre, { selector: 'span.truncate' }).closest('tr') as HTMLElement
}

function hijo(izquierda: number, ancho: number, arriba: number) {
  return { offsetLeft: izquierda, offsetWidth: ancho, offsetTop: arriba }
}

function filaMedida(hijos: ReturnType<typeof hijo>[], anchoVisible: number) {
  return { children: hijos, clientWidth: anchoVisible } as unknown as HTMLElement
}

describe('Aplicaciones en la tabla de Colaboradores', { timeout: 30000 }, () => {
  it.each(COLABORADORES.map((colaborador) => [colaborador.nombre, colaborador] as const))('la fila de %s dibuja los iconos de todas sus aplicaciones cuando caben', (_, colaborador) => {
    render(<PaginaColaboradores />)
    const celda = within(filaDe(colaborador.nombre)).getAllByRole('cell')[2]
    const dibujados = Array.from(celda.querySelectorAll('.material-symbols-rounded, svg.icono')).map((icono) => (icono.tagName.toLowerCase() === 'svg' ? 'svg' : icono.textContent))

    expect(dibujados).toEqual(colaborador.aplicaciones.map((app) => GLIFO_ESPERADO[app.nombre]))
    expect(within(celda).queryByText(/^\+\d+$/)).toBeNull()
  })

  it('los colaboradores de demostracion cubren los estados Activo, Invitado, Inactivo y Baja con aplicaciones', () => {
    expect(new Set(COLABORADORES.map((colaborador) => colaborador.estado))).toEqual(new Set(['activo', 'invitado', 'inactivo', 'baja']))
    for (const colaborador of COLABORADORES) expect(colaborador.aplicaciones.length).toBeGreaterThan(0)
  })
})

describe('Medicion de aplicaciones ocultas', () => {
  it('no oculta nada si todos los iconos caben en una sola linea', () => {
    expect(contarOcultos(filaMedida([hijo(0, 28, 0), hijo(32, 28, 0), hijo(64, 28, 0)], 200), 24)).toBe(0)
  })

  it('cuenta los iconos que pasan a la segunda linea cuando no hay espacio', () => {
    expect(contarOcultos(filaMedida([hijo(0, 28, 0), hijo(32, 28, 0), hijo(0, 28, 32), hijo(32, 28, 32)], 64), 24)).toBe(2)
  })

  it('no muestra el contador si basta el espacio de la insignia para que quepa el ultimo icono', () => {
    expect(contarOcultos(filaMedida([hijo(0, 28, 0), hijo(32, 28, 0), hijo(0, 28, 32)], 64), 28)).toBe(0)
  })

  it('no falla sin iconos', () => {
    expect(contarOcultos(filaMedida([], 100), 24)).toBe(0)
  })
})
