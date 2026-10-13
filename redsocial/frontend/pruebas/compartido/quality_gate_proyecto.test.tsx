import { detectarDesviacionesTipograficas } from './detectar_desviaciones_tipograficas'
import {
  detectarArtefactoEnArbol,
  detectarBotonNativoNoRegistrado,
  detectarColorNombradoNoAutorizado,
  detectarImportDeServicio,
  detectarModalPropio,
  detectarPanelDuplicado,
  detectarRutaLiteral,
  detectarTextoVisibleFueraDeCatalogo,
} from './detectores_calidad'
import { leerCssGlobal } from './leer_css'
import { leerFuentesFrontend } from './leer_fuentes'

const MODULO_ARCHIVOS = 'node:fs'
const FUENTES = await leerFuentesFrontend()
const CSS = await leerCssGlobal()
const COMPONENTES = FUENTES.filter((fuente) => /^\/(componentes|paginas|formularios)\//.test(fuente.ruta) && fuente.ruta.endsWith('.tsx'))

async function rutasDeLaCapacidad(): Promise<string[]> {
  const { readdirSync } = (await import(MODULO_ARCHIVOS)) as unknown as { readdirSync: (ruta: string, opciones: { recursive: boolean }) => string[] }
  const { process } = globalThis as unknown as { process: { cwd: () => string } }
  return readdirSync(process.cwd() + '/redsocial', { recursive: true }).map((ruta) => '/redsocial/' + ruta.split('\\').join('/'))
}

function recoger(detector: (ruta: string, texto: string) => string[], universo = COMPONENTES): string[] {
  return universo.flatMap((fuente) => detector(fuente.ruta, fuente.texto))
}

describe('Quality Gate sobre el proyecto real: el sistema esta limpio', () => {
  it('tipografia: ninguna desviacion fuera del registro de excepciones', () => {
    expect(FUENTES.flatMap((fuente) => detectarDesviacionesTipograficas(fuente.ruta, fuente.texto).map((hallazgo) => `${fuente.ruta}: ${hallazgo}`))).toEqual([])
  })

  it('colores: ningun t-xxxxxx no autorizado ni de texto', () => {
    expect(recoger(detectarColorNombradoNoAutorizado, FUENTES)).toEqual([])
  })

  it('botones nativos: todos registrados', () => {
    expect(recoger(detectarBotonNativoNoRegistrado)).toEqual([])
  })

  it('paneles: un solo cascaron de panel lateral', () => {
    expect(recoger(detectarPanelDuplicado)).toEqual([])
  })

  it('modales: ningun dialogo propio fuera del Modal compartido y de los paneles registrados', () => {
    expect(recoger(detectarModalPropio)).toEqual([])
  })

  it('catalogo: ningun texto visible, atributo accesible ni ruta literal en el frontend', () => {
    expect(recoger(detectarTextoVisibleFueraDeCatalogo)).toEqual([])
    expect(recoger(detectarRutaLiteral)).toEqual([])
  })

  it('fronteras: ningun componente importa servicios', () => {
    expect(recoger(detectarImportDeServicio)).toEqual([])
  })

  it('arbol entregable: la capacidad no contiene node_modules, cachés ni salidas de compilacion', async () => {
    expect(detectarArtefactoEnArbol(await rutasDeLaCapacidad())).toEqual([])
  })

  it('tipografia: el sistema conserva exactamente 26 roles', () => {
    const roles = new Set([...CSS.matchAll(/--text-([a-z-]+):\s*[\d.]+rem/g)].map((coincidencia) => coincidencia[1]))
    const base = [...CSS.matchAll(/^\s*--text-([a-z-]+)--font-weight:/gm)].map((coincidencia) => coincidencia[1])
    expect(new Set([...roles, ...base]).size).toBeGreaterThanOrEqual(26)
  })
})
