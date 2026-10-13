import { leerFuentesFrontend } from './leer_fuentes'

const FUENTES = await leerFuentesFrontend()
const PANELES_COMPARTIDOS = ['contactos_panel', 'contactos_en_linea_panel', 'eventos_proximos_panel', 'grupos_recomendados_panel']
const CONSUMIDORES = ['/componentes/inicio/bloques/seccion_contactos_en_linea.tsx', '/componentes/mensajeria/bloques/panel_lateral_mensajeria.tsx']

function fuenteDe(sufijo: string) {
  return FUENTES.find((fuente) => fuente.ruta.endsWith(sufijo))?.texto ?? ''
}

describe('Paneles laterales: una sola implementacion estructural', () => {
  it('el cascaron del panel (seccion, titulo y enlace Ver todos) existe una sola vez', () => {
    const conCascaron = FUENTES.filter((fuente) => fuente.ruta.includes('/componentes/') && fuente.texto.includes('mb-3.5 flex items-center justify-between'))
    expect(conCascaron.map((fuente) => fuente.ruta).filter((ruta) => ruta.includes('/inicio/') || ruta.endsWith('/panel_lateral_mensajeria.tsx') || ruta.includes('/compartido/'))).toEqual([expect.stringContaining('/compartido/bloques/panel_lateral.tsx')])
  })

  it.each(PANELES_COMPARTIDOS)('%s se construye con PanelLateral y no declara su propia cabecera', (nombre) => {
    const texto = fuenteDe(`/compartido/bloques/${nombre}.tsx`)
    expect(texto).toContain('<PanelLateral')
    expect(texto).not.toContain('<h2')
  })

  it.each(CONSUMIDORES)('%s consume los paneles compartidos y no duplica su estructura', (ruta) => {
    const texto = fuenteDe(ruta)
    expect(texto).toContain('ContactosEnLineaPanel')
    expect(texto).toContain('GruposRecomendadosPanel')
    expect(texto).toContain('EventosProximosPanel')
    expect(texto).not.toMatch(/<section|<article|<h[1-6]/)
  })
})
