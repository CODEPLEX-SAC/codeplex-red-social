import { contraste, valorDeToken as valorDe } from './utilidades_color'
import { leerCssGlobal } from './leer_css'
import { leerFuentesFrontend } from './leer_fuentes'
import { TEXTO_TRANSLUCIDO_NO_DETERMINADO } from './registro_arquitectura'

const CSS = await leerCssGlobal()
const FUENTES = await leerFuentesFrontend()

function valorDeToken(nombre: string): string {
  return valorDe(CSS, nombre)
}

describe('Quality Gate de contraste: pares de color deterministas', () => {
  const TEXTOS = ['texto', 'texto-suave', 'primario', 'exito-texto', 'peligro-texto', 'azul-categoria-texto', 'naranja-categoria-texto', 'verde-categoria-texto', 'rosa-categoria-texto', 'rojo-categoria-texto', 'violeta-categoria-texto', 'morado-categoria']
  const FONDOS = ['superficie', 'fondo']
  const CASOS = TEXTOS.flatMap((texto) => FONDOS.map((fondo) => [texto, fondo] as const))

  it.each(CASOS)('texto normal %s sobre %s: >= 4,5:1', (texto, fondo) => {
    expect(contraste(valorDeToken(texto), valorDeToken(fondo))).toBeGreaterThanOrEqual(4.5)
  })

  it.each(['fondo-categoria-morado', 'fondo-categoria-azul', 'fondo-categoria-verde', 'fondo-categoria-rojo', 'fondo-categoria-naranja', 'fondo-categoria-rosa', 'fondo-categoria-amarillo', 'fondo-exito-suave', 'fondo-info-suave', 'fondo-insignia-neutra'])('el texto principal cumple AA sobre la tinta %s', (tinta) => {
    expect(contraste(valorDeToken('texto'), valorDeToken(tinta))).toBeGreaterThanOrEqual(4.5)
  })

  it.each(['fondo-exito-suave', 'fondo-info-suave', 'fondo-insignia-neutra', 'fondo-hover-neutro'])('el texto secundario cumple AA sobre la superficie neutra %s (sobre las tintas de categoria se usa su variante -texto)', (tinta) => {
    expect(contraste(valorDeToken('texto-suave'), valorDeToken(tinta))).toBeGreaterThanOrEqual(4.5)
  })

  it('el relleno con texto blanco usa variantes que alcanzan 4,5:1', () => {
    ;['primario', 'exito-texto', 'peligro-texto', 'rojo-categoria-texto', 'morado-categoria'].forEach((relleno) => expect(contraste('#ffffff', valorDeToken(relleno))).toBeGreaterThanOrEqual(4.5))
  })

  it('el texto blanco translucido solo existe en los archivos registrados como NO DETERMINADO (fondo de imagen o degradado)', () => {
    const usan = FUENTES.filter((fuente) => fuente.ruta.endsWith('.tsx') && /text-white\/\d+/.test(fuente.texto)).map((fuente) => fuente.ruta)
    expect(usan.filter((ruta) => TEXTO_TRANSLUCIDO_NO_DETERMINADO[ruta] === undefined)).toEqual([])
    expect(Object.keys(TEXTO_TRANSLUCIDO_NO_DETERMINADO).filter((ruta) => !usan.includes(ruta))).toEqual([])
  })
})
