import { leerCssGlobal } from './leer_css'
import { leerFuentesFrontend } from './leer_fuentes'
import { GRUPOS_DE_GLIFO_DUPLICADO } from './registro_arquitectura'
import { ENLACES_SIN_DESTINO } from './registro_enlaces'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const MODULO_ARCHIVOS = 'node:fs'
const CSS = await leerCssGlobal()
const FUENTES = await leerFuentesFrontend()
const COMPONENTES = FUENTES.filter((fuente) => /^\/(componentes|paginas|formularios)\//.test(fuente.ruta) && fuente.ruta.endsWith('.tsx'))
const TODO_EL_CODIGO = FUENTES.map((fuente) => fuente.texto).join(' ')

async function existe(ruta: string): Promise<boolean> {
  const { existsSync } = (await import(MODULO_ARCHIVOS)) as unknown as { existsSync: (ruta: string) => boolean }
  const { process } = globalThis as unknown as { process: { cwd: () => string } }
  return existsSync(process.cwd() + ruta)
}

describe('Prevencion de arquitectura: la capacidad no contiene artefactos generados', () => {
  it('no existe una carpeta node_modules dentro de la capacidad (las dependencias viven en la raiz del proyecto)', async () => {
    expect(await existe('/redsocial/node_modules')).toBe(false)
  })

  it('la cache de Vite apunta a la raiz del proyecto y no a la capacidad', async () => {
    const { readFileSync } = (await import(MODULO_ARCHIVOS)) as unknown as { readFileSync: (ruta: string, codificacion: string) => string }
    const { process } = globalThis as unknown as { process: { cwd: () => string } }
    expect(readFileSync(process.cwd() + '/vite.config.ts', 'utf8')).toMatch(/cacheDir:\s*path\.resolve\(raiz,\s*'node_modules\/\.vite'\)/)
  })
})

describe('Prevencion de arquitectura: el frontend presenta y no define rutas ni acciones', () => {
  it('ningun componente ni pagina escribe rutas literales en href o to', () => {
    expect(COMPONENTES.filter((fuente) => /\b(?:href|to)=["']\/[a-z]/.test(fuente.texto)).map((fuente) => fuente.ruta)).toEqual([])
  })

  it('ningun componente importa servicios: los datos llegan por la capa de rutas', () => {
    const importan = COMPONENTES.filter((fuente) => fuente.ruta.startsWith('/componentes/') && /from ['"][./@]+[^'"]*\/servicios\//.test(fuente.texto))
    expect(importan.map((fuente) => fuente.ruta)).toEqual([])
  })

  it('los enlaces sin destino (href="#" o su respaldo con el operador de coalescencia) son exactamente los registrados, con su clasificacion: no se anaden nuevos', () => {
    const real = Object.fromEntries(COMPONENTES.map((fuente) => [fuente.ruta, (fuente.texto.match(/href="#"|\?\? '#'/g) ?? []).length]).filter(([, cantidad]) => (cantidad as number) > 0))
    const registrado = Object.fromEntries(Object.entries(ENLACES_SIN_DESTINO).map(([ruta, entrada]) => [ruta, entrada.cantidad]))
    expect(real).toEqual(registrado)
  })

  it('cada enlace sin destino registrado explica por que no tiene ruta', () => {
    Object.values(ENLACES_SIN_DESTINO).forEach((entrada) => {
      expect(['ACCION_SIN_NAVEGACION', 'SIN_RUTA_DE_NEGOCIO_DEFINIDA', 'EXTERNO', 'FUERA_DE_ALCANCE']).toContain(entrada.clasificacion)
      expect(entrada.motivo.length).toBeGreaterThan(10)
    })
  })

  it('los enlaces con ruta de negocio resuelta leen su destino del catalogo del modulo', () => {
    const texto = (sufijo: string) => FUENTES.find((fuente) => fuente.ruta.endsWith(sufijo))?.texto ?? ''
    expect(texto('/eventos/bloques/seccion_proximos2.tsx')).toContain('href={catalogoEventos.rutas.calendario}')
    expect(texto('/eventos/bloques/seccion_calendario11.tsx')).toContain('href={catalogoEventos.rutas.proximos}')
    expect(texto('/paginas/avisos/pagina_avisos_solicitudes.tsx')).toContain('catalogoAmigos.rutas.solicitudes')
    expect(texto('/paginas/amigos/pagina_amigos_todos.tsx')).toContain('ruta={catalogoAmigos.rutas.sugerencias}')
    expect(texto('/mensajeria/bloques/seccion_reuniones_programadas.tsx')).toContain('catalogoMensajeria.rutas.videollamada_en_curso')
  })

  it('la configuracion de los componentes compartidos nuevos vive en el catalogo y no en el TSX', () => {
    const catalogo = catalogoCompartido as Record<string, unknown>
    ;['boton_pie_lista', 'fondo_panel_flotante', 'mensaje_vacio'].forEach((clave) => expect(catalogo[clave]).toBeDefined())
    const pie = FUENTES.find((fuente) => fuente.ruta.endsWith('/interfaz/boton_pie_lista.tsx'))?.texto ?? ''
    expect(pie).toContain('catalogoCompartido.boton_pie_lista')
    expect(pie).not.toMatch(/className="[^"]*border-t/)
  })

  it('el catalogo de Mensajeria define el contenedor del panel lateral de Mensajeria, no el compartido', () => {
    const panel = FUENTES.find((fuente) => fuente.ruta.endsWith('/mensajeria/bloques/panel_lateral_mensajeria.tsx'))?.texto ?? ''
    expect(panel).toContain('catalogoMensajeria.panel_lateral.contenedor')
    expect(panel).not.toContain('compartido.json')
  })
})

describe('Prevencion de arquitectura: un solo cascaron de panel lateral', () => {
  const CASCARON = /<section className="rounded-xl border border-borde bg-white p-4">\s*<div className="mb-3\.5 flex items-center justify-between">\s*<h2 className="m-0 text-titulo-banner text-texto">/

  it('ningun archivo escribe el cascaron del panel salvo PanelLateral', () => {
    const duplicados = COMPONENTES.filter((fuente) => CASCARON.test(fuente.texto) && !fuente.ruta.endsWith('/bloques/panel_lateral.tsx'))
    expect(duplicados.map((fuente) => fuente.ruta)).toEqual([])
  })

  it('el enlace del cascaron se puede personalizar sin crear otra variante', () => {
    const panel = FUENTES.find((fuente) => fuente.ruta.endsWith('/bloques/panel_lateral.tsx'))?.texto ?? ''
    expect(panel).toMatch(/enlace = textosRedSocial\.VER_TODOS/)
  })
})

describe('Prevencion de arquitectura: tokens e iconos sin huerfanos', () => {
  it('todo token --color-* tiene al menos un consumidor (clase, var() o referencia)', () => {
    const prefijos = '(?:[a-z0-9-]+:)*(?:text|bg|border(?:-[trblxy])?|from|to|via|fill|stroke|ring|shadow|outline|divide|decoration|accent|caret|placeholder)'
    const huerfanos = [...CSS.matchAll(/^\s*--color-([a-z0-9-]+):/gm)]
      .map((coincidencia) => coincidencia[1])
      .filter((nombre) => {
        const escapado = nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const comoClase = new RegExp(`(?<![\\w-])${prefijos}-${escapado}(?![\\w-])`)
        const comoVariable = new RegExp(`var\\(--color-${escapado}\\)`)
        const referenciasEnCss = (CSS.match(new RegExp(`(?<![\\w-])--color-${escapado}(?![\\w-])`, 'g')) ?? []).length
        return !comoClase.test(TODO_EL_CODIGO) && !comoVariable.test(TODO_EL_CODIGO) && !comoClase.test(CSS) && referenciasEnCss <= 1 && !comoVariable.test(CSS)
      })
    expect(huerfanos).toEqual([])
  })

  it('los nombres de icono que apuntan al mismo glifo son solo los grupos conocidos', () => {
    const porGlifo = new Map<string, string[]>()
    Object.entries(catalogoCompartido.iconos_libreria as Record<string, string>).forEach(([nombre, glifo]) => porGlifo.set(glifo, [...(porGlifo.get(glifo) ?? []), nombre]))
    const grupos = [...porGlifo.values()].filter((nombres) => nombres.length > 1).map((nombres) => [...nombres].sort().join('|')).sort()
    expect(grupos).toEqual([...GRUPOS_DE_GLIFO_DUPLICADO].sort())
  })

  it('todo alias de icono (nombre distinto de su clave) tiene un consumidor o figura en la lista de nombres', () => {
    const nombres = catalogoCompartido.nombres_iconos as string[]
    const sinConsumidor = Object.entries(catalogoCompartido.iconos as Record<string, string>)
      .filter(([alias, clave]) => alias !== clave)
      .map(([alias]) => alias)
      .filter((alias) => !nombres.includes(alias) && !new RegExp(`["'\`]${alias}["'\`]`).test(TODO_EL_CODIGO.replace(new RegExp(`"${alias}":`, 'g'), '')))
    expect(sinConsumidor).toEqual([])
  })
})
