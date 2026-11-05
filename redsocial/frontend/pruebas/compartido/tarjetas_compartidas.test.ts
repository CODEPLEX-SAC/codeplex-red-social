import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import { CLASES_TARJETA } from '@/componentes/compartido/clases_tarjeta'
import { leerFuentesFrontend } from './leer_fuentes'

const MODULOS = ['/componentes/dashboard/', '/componentes/estadisticas/', '/componentes/indicadores/', '/paginas/dashboard/', '/paginas/estadisticas/', '/paginas/indicadores/']
const RADIOS = ['rounded-xl', 'rounded-control']
const BORDES = ['border-borde', 'border-gris-borde']

describe('Tarjetas: contrato compartido', () => {
  it('las variantes salen del catálogo con radio de 12 px, borde de tarjeta y fondo blanco', () => {
    expect(CLASES_TARJETA).toEqual(catalogoCompartido.tarjetas)
    for (const clases of Object.values(CLASES_TARJETA)) {
      for (const token of ['rounded-xl', 'border', 'border-borde', 'bg-white', 'min-w-0']) expect(clases.split(' ')).toContain(token)
    }
    expect(CLASES_TARJETA.panel.split(' ')).toEqual(expect.arrayContaining(['py-4.5', 'px-5']))
    expect(CLASES_TARJETA.mosaico.split(' ')).toContain('p-4')
  })

  it('Dashboard, Estadísticas e Indicadores no definen a mano tarjetas equivalentes', async () => {
    const fuentes = (await leerFuentesFrontend()).filter((f) => f.ruta.endsWith('.tsx') && MODULOS.some((m) => f.ruta.includes(m)))
    const manuales = fuentes.flatMap((f) => Array.from(f.texto.matchAll(/className="([^"]*)"/g)).filter((m) => {
      const t = m[1].split(' ')
      return RADIOS.some((r) => t.includes(r)) && t.includes('border') && t.includes('bg-white') && BORDES.some((b) => t.includes(b))
    }).map(() => f.ruta))
    expect(manuales).toEqual([])
  })
})
