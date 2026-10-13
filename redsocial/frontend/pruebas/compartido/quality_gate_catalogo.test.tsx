import { leerFuentesFrontend } from './leer_fuentes'
import { CLAVES_SIN_CONSUMO_ESTATICO, SECCIONES_DE_CONTRATO_DE_CAPACIDAD } from './registro_arquitectura'

const FUENTES = await leerFuentesFrontend()
const CATALOGOS = FUENTES.filter((fuente) => /^\/catalogos\/capacidades\/redsocial\/[a-z_]+\.json$/.test(fuente.ruta))
const CODIGO = FUENTES.filter((fuente) => !fuente.ruta.startsWith('/catalogos/')).map((fuente) => fuente.texto).join(' ')

function hojasDe(valor: unknown, ruta: string[] = []): string[][] {
  if (Array.isArray(valor) || valor === null || typeof valor !== 'object') return Array.isArray(valor) ? [] : [ruta]
  return Object.entries(valor as Record<string, unknown>).flatMap(([clave, hijo]) => hojasDe(hijo, [...ruta, clave]))
}

function clavesDuplicadas(texto: string): string[] {
  const pila: Set<string>[] = []
  const duplicadas: string[] = []
  for (const coincidencia of texto.matchAll(/"((?:[^"\\]|\\.)*)"\s*(:)?|([{}[\]])/g)) {
    const simbolo = coincidencia[3]
    if (simbolo === '{') pila.push(new Set())
    else if (simbolo === '}') pila.pop()
    else if (coincidencia[2] === ':' && pila.length > 0) {
      const claves = pila[pila.length - 1]
      if (claves.has(coincidencia[1])) duplicadas.push(coincidencia[1])
      claves.add(coincidencia[1])
    }
  }
  return duplicadas
}

describe('Quality Gate de catalogos', () => {
  it('ningun catalogo repite una clave dentro del mismo objeto', () => {
    expect(CATALOGOS.flatMap((fuente) => clavesDuplicadas(fuente.texto).map((clave) => `${fuente.ruta}: ${clave}`))).toEqual([])
  })

  it('el detector de claves duplicadas funciona', () => {
    expect(clavesDuplicadas('{"a": {"x": 1, "x": 2}}')).toEqual(['x'])
    expect(clavesDuplicadas('{"a": {"x": 1}, "b": {"x": 2}}')).toEqual([])
  })

  it('las hojas sin consumidor aparente (fuera del contrato de capacidad y de compartido.json) son solo las clasificadas como contrato de plataforma o consumo dinamico: no se anaden nuevas', () => {
    const huerfanas = CATALOGOS.filter((fuente) => !fuente.ruta.endsWith('/compartido.json')).flatMap((fuente) => {
      const nombre = fuente.ruta.split('/').pop() as string
      return hojasDe(JSON.parse(fuente.texto))
        .filter((ruta) => !SECCIONES_DE_CONTRATO_DE_CAPACIDAD.includes(ruta[0]))
        .filter((ruta) => !new RegExp(`(?<![\\w-])${ruta[ruta.length - 1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`).test(CODIGO))
        .map((ruta) => `${nombre}:${ruta.join('.')}`)
    })
    expect(huerfanas.sort()).toEqual(Object.keys(CLAVES_SIN_CONSUMO_ESTATICO).sort())
  })

  it('un consumidor con una clave inexistente no compila: los catalogos se importan tipados', () => {
    const consumidores = FUENTES.filter((fuente) => fuente.ruta.startsWith('/componentes/') && /import \w+ from '[./]+\/catalogos\/capacidades\/redsocial\/[a-z_]+\.json'/.test(fuente.texto))
    expect(consumidores.length).toBeGreaterThan(100)
  })
})
