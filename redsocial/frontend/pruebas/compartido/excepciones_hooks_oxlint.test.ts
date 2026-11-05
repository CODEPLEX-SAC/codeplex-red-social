import { describe, expect, it } from 'vitest'
import { ARCHIVOS_CON_EXCEPCION_DE_HOOKS } from './excepciones_hooks_aprobadas'
import { leerFuentesFrontend } from './leer_fuentes'

const MODULO_ARCHIVOS = 'node:fs'
const MODULO_PROCESOS = 'node:child_process'
const PREFIJO = 'redsocial/frontend'
const REGLA = 'react/rules-of-hooks'
const DEFINE_GANCHO = /(?:function|const)\s+usar[A-Z]\w*/
const LLAMA_GANCHO = /\buse(?:State|Ref|Effect|Memo|Context|Reducer|SyncExternalStore|Callback|LayoutEffect|Id|LegacyTable)\(/
const LIMITE_MS = 120000

const { process } = globalThis as unknown as { process: { cwd: () => string } }

async function leerConfiguracion() {
  const { readFileSync } = (await import(MODULO_ARCHIVOS)) as unknown as { readFileSync: (ruta: string, codificacion: string) => string }
  return JSON.parse(readFileSync(process.cwd() + '/.oxlintrc.json', 'utf8')) as {
    rules: Record<string, unknown>
    overrides?: { files: string[]; rules: Record<string, string> }[]
  }
}

describe('Excepcion de oxlint para react/rules-of-hooks por la convencion usar_*', () => {
  it('la configuracion tiene una sola excepcion que desactiva unicamente esta regla en los archivos aprobados, sin comodines', async () => {
    const configuracion = await leerConfiguracion()
    expect(configuracion.rules[REGLA]).toBe('error')
    expect(configuracion.overrides).toHaveLength(1)
    const [excepcion] = configuracion.overrides ?? []
    expect(Object.keys(excepcion.rules)).toEqual([REGLA])
    expect(excepcion.rules[REGLA]).toBe('off')
    expect(excepcion.files.some((archivo) => /[*?{}[\]]/.test(archivo))).toBe(false)
    expect([...excepcion.files].sort()).toEqual([...ARCHIVOS_CON_EXCEPCION_DE_HOOKS].sort())
    expect(new Set(excepcion.files).size).toBe(excepcion.files.length)
  })

  it('cada archivo aprobado existe y define un gancho con nombre usar*', async () => {
    const fuentes = await leerFuentesFrontend()
    const textos = new Map(fuentes.map((fuente) => [PREFIJO + fuente.ruta, fuente.texto]))
    ARCHIVOS_CON_EXCEPCION_DE_HOOKS.forEach((archivo) => {
      expect(textos.has(archivo), archivo).toBe(true)
      expect(DEFINE_GANCHO.test(textos.get(archivo) ?? String()), archivo).toBe(true)
    })
  })

  it('ningun archivo ajeno al alcance define un gancho usar* que llame a ganchos de React', async () => {
    const fuentes = await leerFuentesFrontend()
    const ajenos = fuentes
      .filter((fuente) => /\.tsx?$/.test(fuente.ruta))
      .filter((fuente) => DEFINE_GANCHO.test(fuente.texto) && LLAMA_GANCHO.test(fuente.texto))
      .map((fuente) => PREFIJO + fuente.ruta)
      .filter((ruta) => !ARCHIVOS_CON_EXCEPCION_DE_HOOKS.includes(ruta))
    expect(ajenos).toEqual([])
  })

  it(
    'oxlint no reporta infracciones de rules-of-hooks en ningun archivo: nada fuera de la excepcion queda oculto',
    async () => {
      const { spawnSync } = (await import(MODULO_PROCESOS)) as unknown as {
        spawnSync: (comando: string, argumentos: string[], opciones: { cwd: string; encoding: string; maxBuffer: number }) => { stdout: string }
      }
      const raiz = process.cwd()
      const resultado = spawnSync('node', [raiz + '/node_modules/oxlint/bin/oxlint', '-f', 'json'], { cwd: raiz, encoding: 'utf8', maxBuffer: 1 << 28 })
      const diagnosticos = (JSON.parse(resultado.stdout) as { diagnostics: { code: string; filename: string }[] }).diagnostics
      const hooks = diagnosticos.filter((diagnostico) => diagnostico.code.includes('rules-of-hooks')).map((diagnostico) => diagnostico.filename)
      expect(hooks).toEqual([])
    },
    LIMITE_MS,
  )
})
