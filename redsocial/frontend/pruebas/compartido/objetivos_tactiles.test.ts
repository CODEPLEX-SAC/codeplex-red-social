import { leerCssGlobal } from './leer_css'
import { leerFuentesFrontend } from './leer_fuentes'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const CSS = await leerCssGlobal()
const FUENTES = await leerFuentesFrontend()

describe('Objetivos tactiles: los enlaces de accion alcanzan 24 px de alto en movil (WCAG 2.5.8)', () => {
  it('index.css da a todo a.text-enlace-accion un alto minimo de 1,5rem por debajo de 768 px, en la capa de componentes', () => {
    const capa = CSS.slice(CSS.indexOf('@layer components'))
    expect(capa).toMatch(/@media \(width < 768px\) \{\s*a\.text-enlace-accion \{[^}]*min-height:\s*1\.5rem;[^}]*\}/)
  })

  it('el Boton con tamano enlace o enlace_accion reserva min-h-6 solo en movil (max-768) y no altera el escritorio', () => {
    expect(catalogoCompartido.boton_tamanos.enlace).toContain('max-768:min-h-6')
    expect(catalogoCompartido.boton_tamanos.enlace_accion).toContain('max-768:min-h-6')
    expect(catalogoCompartido.boton_tamanos.enlace).not.toMatch(/(^|\s)min-h-6/)
    expect(catalogoCompartido.boton_tamanos.enlace_accion).not.toMatch(/(^|\s)min-h-6/)
  })

  it('el enlace al perfil de usuario reserva min-h-6', () => {
    const fuente = FUENTES.find((candidata) => candidata.ruta === '/componentes/compartido/interfaz/enlace_perfil_usuario.tsx')
    expect(fuente?.texto).toContain('min-h-6')
  })

  it('ningun enlace con text-enlace-accion usa una altura fija menor de 24 px (h-4, h-5 ni leading fijo)', () => {
    const usos = FUENTES.filter((fuente) => fuente.ruta.endsWith('.tsx')).flatMap((fuente) => [...fuente.texto.matchAll(/<a\b[^>]*className="([^"]*text-enlace-accion[^"]*)"/g)].filter((coincidencia) => /(^|\s)h-(3|4|5)(\s|$)/.test(coincidencia[1])).map(() => fuente.ruta))
    expect(usos).toEqual([])
  })
})
