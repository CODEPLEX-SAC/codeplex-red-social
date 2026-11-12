import { leerFuentesFrontend } from './leer_fuentes'

const FUENTES = await leerFuentesFrontend()
const ENLACES_NUEVA_PESTANA = FUENTES.flatMap((fuente) => (/\.tsx$/.test(fuente.ruta) ? [...fuente.texto.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((coincidencia) => ({ ruta: fuente.ruta, etiqueta: coincidencia[0] })) : []))

describe('Enlaces que abren una pestana nueva', () => {
  it('existen enlaces externos que se pueden comprobar', () => {
    expect(ENLACES_NUEVA_PESTANA.length).toBeGreaterThan(0)
  })

  it('todos declaran rel con noopener y noreferrer para que la pagina abierta no controle la original', () => {
    const inseguros = ENLACES_NUEVA_PESTANA.filter(({ etiqueta }) => !/rel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/.test(etiqueta))
    expect(inseguros.map(({ ruta }) => ruta)).toEqual([])
  })
})
