import { fireEvent, render, screen } from '@testing-library/react'
import { PaginaEventosCalendario } from '@/paginas/eventos/pagina_eventos_calendario'
import { leerFuentesFrontend } from '../compartido/leer_fuentes'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'

const FUENTES = await leerFuentesFrontend()

function cuadriculaDeSieteColumnas(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>('div')].filter((nodo) => nodo.className.includes('grid-cols-7'))
}

describe('Calendario de Eventos: cuadricula de siete columnas', () => {
  it('muestra los siete encabezados de dia completos, en orden', () => {
    render(<PaginaEventosCalendario />)
    const encabezado = cuadriculaDeSieteColumnas()[0]
    expect([...encabezado.children].map((hijo) => hijo.textContent)).toEqual(catalogoEventos.dias_semana)
  })

  it('el cuerpo del mes reparte sus celdas en filas completas de siete', () => {
    render(<PaginaEventosCalendario />)
    const cuerpo = cuadriculaDeSieteColumnas()[1]
    expect(cuerpo.children.length % 7).toBe(0)
    expect(cuerpo.children.length).toBeGreaterThanOrEqual(28)
  })

  it('las cuadriculas del calendario no imponen un ancho minimo que supere a su contenedor (causa del recorte a 1280 px)', () => {
    const calendario = FUENTES.filter((fuente) => fuente.ruta.endsWith('/bloque_eventos_calendario1.tsx') || fuente.ruta.endsWith('/bloque_todo_el_dia.tsx'))
    expect(calendario).toHaveLength(2)
    calendario.forEach((fuente) => expect(fuente.texto).not.toMatch(/\bmin-w-\d+\b/))
  })

  it('las vistas Mes, Semana y Dia siguen disponibles y se pueden alternar', () => {
    render(<PaginaEventosCalendario />)
    for (const etiqueta of [catalogoEventos.botones.vista_semana, catalogoEventos.botones.vista_dia, catalogoEventos.botones.vista_mes]) {
      fireEvent.click(screen.getByRole('button', { name: etiqueta }))
      expect(screen.getByRole('button', { name: etiqueta })).toHaveAttribute('aria-pressed', 'true')
    }
    expect(cuadriculaDeSieteColumnas().length).toBeGreaterThan(0)
  })
})
