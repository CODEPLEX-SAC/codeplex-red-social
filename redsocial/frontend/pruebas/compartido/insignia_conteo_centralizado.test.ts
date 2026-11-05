import { describe, expect, it } from 'vitest'
import { leerCssGlobal } from './leer_css'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

const estilos = await leerCssGlobal()
const ROL_TEXTO = /(^|[\s:!\]])text-conteo(?![-\w])/
const tamanos = (rol: string) => Array.from(estilos.matchAll(new RegExp(`--text-${rol}: ([\\d.]+rem);`, 'g'))).map((coincidencia) => coincidencia[1])

describe('Numeración de las insignias: una sola definición compartida', () => {
  it('el rol de insignia es ligero, comparte la escala del rol conteo y este conserva su peso', () => {
    expect(estilos).toContain('--text-conteo--font-weight: 700;')
    expect(estilos).toContain('--text-conteo-insignia--font-weight: 400;')
    expect(tamanos('conteo-insignia')).toEqual(tamanos('conteo'))
    expect(tamanos('conteo-insignia')).toHaveLength(3)
  })

  it('todas las insignias del catálogo compartido y el número del chip usan el rol de insignia', () => {
    const definiciones = JSON.stringify([catalogoCompartido.insignia_superpuesta, catalogoCompartido.insignia_estado.contador, catalogoCompartido.avatar.clases.insignia_contenido, catalogoCompartido.avatar.clases.resto_texto, catalogoMensajeria.clases.lista.chip_conteo])
    expect(definiciones).toContain('text-conteo-insignia')
    expect(ROL_TEXTO.test(definiciones)).toBe(false)
  })

  it('la numeración de insignias no se reduce por pantalla: no hay otro peso declarado junto al rol', () => {
    const definiciones = JSON.stringify([catalogoCompartido.insignia_superpuesta, catalogoCompartido.insignia_estado.contador])
    expect(definiciones).not.toMatch(/font-(bold|semibold|medium|normal|light)/)
  })
})
