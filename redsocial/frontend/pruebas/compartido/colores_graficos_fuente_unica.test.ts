import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import { resolverColoresGraficos } from '@/servicios/compartido/colores_graficos'
import { KPIS as KPIS_DASHBOARD, DONA_SEGMENTOS } from '@/servicios/dashboard/dashboard'
import { KPIS as KPIS_ESTADISTICAS, COMPOSICION_INGRESOS, GASTOS_CATEGORIA } from '@/servicios/estadisticas/todos_modulos'
import { KPIS as KPIS_INDICADORES, COSTOS, MODULOS_IND } from '@/servicios/indicadores/indicadores'
import { PLANTILLAS } from '@/servicios/reportes/reportes'
import { leerCssGlobal } from './leer_css'
import { leerFuentesFrontend } from './leer_fuentes'

const HEX = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g
const BLOQUES_CON_HEX = ['colores_graficos', 'tema_mui', 'texto_tema']
const COLOR_VALIDO = /^#[0-9a-f]{6}$/

function hexDeBloques(): string[] {
  return BLOQUES_CON_HEX.flatMap((bloque) => JSON.stringify((catalogoCompartido as Record<string, unknown>)[bloque]).match(HEX) ?? [])
}

describe('Fuente única de los colores de gráficos', () => {
  it('ningún hexadecimal vive fuera de los bloques colores_graficos, tema_mui y texto_tema de compartido.json', async () => {
    const fuentes = await leerFuentesFrontend()
    const fuera = fuentes.filter((f) => !f.ruta.endsWith('/catalogos/capacidades/redsocial/compartido.json') && HEX.test(f.texto)).map((f) => f.ruta)
    HEX.lastIndex = 0
    expect(fuera).toEqual([])
    const total = fuentes.find((f) => f.ruta.endsWith('/catalogos/capacidades/redsocial/compartido.json'))?.texto.match(HEX) ?? []
    expect(total.length).toBe(hexDeBloques().length)
  })

  it('cada color de la paleta de gráficos coincide con un token de index.css', async () => {
    const css = (await leerCssGlobal()).toLowerCase()
    for (const [nombre, hex] of Object.entries(catalogoCompartido.colores_graficos)) {
      expect(css, nombre).toContain(`: ${hex.toLowerCase()};`)
    }
  })

  it('los datos resuelven cada nombre de color a un hexadecimal de la paleta', () => {
    const paleta = Object.values(catalogoCompartido.colores_graficos)
    const colores = [
      ...KPIS_DASHBOARD.map((k) => k.sparklineColor),
      ...KPIS_ESTADISTICAS.map((k) => k.sparklineColor),
      ...KPIS_INDICADORES.map((k) => k.sparklineColor),
      ...MODULOS_IND.map((m) => m.sparklineColor),
      ...COMPOSICION_INGRESOS.items.map((i) => i.color),
      ...GASTOS_CATEGORIA.items.map((i) => i.color),
      ...COSTOS.items.map((i) => i.color),
    ]
    expect(colores.length).toBeGreaterThan(20)
    for (const color of colores) {
      expect(color).toMatch(COLOR_VALIDO)
      expect(paleta).toContain(color)
    }
    expect(DONA_SEGMENTOS.length).toBeGreaterThan(0)
    expect(PLANTILLAS.length).toBeGreaterThan(0)
  })

  it('el resolvedor solo toca las claves de color y deja intactos los demás textos', () => {
    const entrada = { color: 'info', sparklineColor: 'exito', c: 'primario', estado: 'info', hijos: [{ color: 'verde' }] }
    expect(resolverColoresGraficos(entrada)).toEqual({ color: catalogoCompartido.colores_graficos.info, sparklineColor: catalogoCompartido.colores_graficos.exito, c: 'primario', estado: 'info', hijos: [{ color: 'verde' }] })
  })
})
