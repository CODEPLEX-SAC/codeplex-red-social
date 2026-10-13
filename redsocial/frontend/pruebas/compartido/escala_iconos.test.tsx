import { leerFuentesFrontend } from './leer_fuentes'
import catalogoColaboradores from '../../servicios/colaboradores/permisos.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const FUENTES = await leerFuentesFrontend()
const ESCALA = [12, 14, 16, 18, 20, 24]
const ILUSTRACIONES = [28, 32, 40, 56]
const ETIQUETA_ICONO = /<Icono\b[^>]*?\/>/gs
const ALTO = /(?<![\w-])h-(\d+(?:\.\d+)?)(?![\w.-])/g

function altosDeIconos(): { ruta: string; px: number }[] {
  return FUENTES.filter((fuente) => fuente.ruta.endsWith('.tsx') && /^\/(componentes|paginas|formularios|tablas)\//.test(fuente.ruta)).flatMap((fuente) =>
    [...fuente.texto.matchAll(ETIQUETA_ICONO)].flatMap((etiqueta) => [...etiqueta[0].matchAll(ALTO)].map((alto) => ({ ruta: fuente.ruta, px: Number(alto[1]) * 4 }))),
  )
}

describe('Escala de iconos 12·14·16·18·20·24 (+ ilustraciones)', () => {
  it('todo <Icono> con tamano explicito usa la escala o un tamano de ilustracion', () => {
    const fuera = altosDeIconos().filter(({ px }) => !ESCALA.includes(px) && !ILUSTRACIONES.includes(px))
    expect(fuera).toEqual([])
  })

  it('no quedan tamanos fraccionarios en unidades fuera de la escala (h-3.75, h-5.5, h-4.25...)', () => {
    expect(altosDeIconos().filter(({ px }) => px % 1 !== 0)).toEqual([])
  })

  it('el tamano predeterminado centralizado de Icono pertenece a la escala (16 px) y no se repite en los componentes', () => {
    expect(catalogoCompartido.icono_libreria.tamano_predeterminado).toBe('1rem')
    expect(FUENTES.filter((fuente) => fuente.ruta.endsWith('.tsx') && fuente.texto.includes('1.0625rem')).map((fuente) => fuente.ruta)).toEqual([])
  })

  it('todo nombre de icono declarado en los permisos de Colaboradores se resuelve a un glifo o a un SVG propio', () => {
    const resueltos = new Set([...Object.keys(catalogoCompartido.iconos_libreria), ...catalogoCompartido.nombres_iconos])
    const alias = catalogoCompartido.iconos as Record<string, string>
    const nombres = JSON.stringify(catalogoColaboradores).match(/"icono":\s*"([a-z-]+)"/g)?.map((texto) => texto.replace(/.*"([a-z-]+)"$/, '$1')) ?? []
    expect(nombres.filter((nombre) => !resueltos.has(alias[nombre] ?? nombre))).toEqual([])
  })
})
