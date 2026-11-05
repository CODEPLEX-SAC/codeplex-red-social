import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import { CLASE_ENLACE_ACCION, CLASE_ENLACE_ACCION_PIE, CLASE_ENLACE_ACCION_SECUNDARIO } from '@/componentes/compartido/clases_enlace'
import { leerFuentesFrontend } from './leer_fuentes'

const BASE = ['text-enlace-accion', 'no-underline']

describe('Enlace de acción: contrato compartido', () => {
  it('las tres variantes salen del catálogo y la principal subraya al pasar el puntero', () => {
    expect(CLASE_ENLACE_ACCION).toBe(catalogoCompartido.enlaces.accion)
    expect(CLASE_ENLACE_ACCION_PIE).toBe(catalogoCompartido.enlaces.accion_pie)
    expect(CLASE_ENLACE_ACCION_SECUNDARIO).toBe(catalogoCompartido.enlaces.accion_secundario)
    expect(CLASE_ENLACE_ACCION.split(' ')).toEqual(['text-enlace-accion', 'text-primario', 'no-underline', 'hover:underline'])
    expect(CLASE_ENLACE_ACCION_SECUNDARIO.split(' ')).toContain('text-texto-suave')
    expect(CLASE_ENLACE_ACCION_PIE.split(' ')).toContain('hover:bg-fondo-hover-suave')
    expect(Object.keys(catalogoCompartido.enlaces)).toEqual(['accion', 'accion_pie', 'accion_secundario'])
  })

  it('ningún catálogo duplica las clases del enlace de acción', async () => {
    const catalogos = (await leerFuentesFrontend()).filter((f) => f.ruta.includes('/catalogos/') && !f.ruta.endsWith('/compartido.json'))
    const duplicados = catalogos.filter((f) => Array.from(f.texto.matchAll(/"([^"]*)"/g)).some((m) => BASE.every((t) => m[1].split(' ').includes(t)) && m[1].includes('hover:underline'))).map((f) => f.ruta)
    expect(duplicados).toEqual([])
  })

  it('ningún componente define a mano las clases de un enlace de acción', async () => {
    const fuentes = (await leerFuentesFrontend()).filter((f) => f.ruta.endsWith('.tsx'))
    const literales = fuentes.flatMap((f) => Array.from(f.texto.matchAll(/className="([^"]*)"/g)).filter((m) => BASE.every((t) => m[1].split(' ').includes(t))).map(() => f.ruta))
    expect(literales).toEqual([])
  })
})
