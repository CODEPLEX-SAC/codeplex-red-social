import { describe, expect, it } from 'vitest'

const MODULO_ARCHIVOS = 'node:fs'
const MODULO_PROCESOS = 'node:child_process'
const MODULO_SISTEMA = 'node:os'
const MODULO_RUTAS = 'node:path'
const LIMITE_MS = 60000

const { process } = globalThis as unknown as { process: { cwd: () => string } }

async function evaluarGate(datos: Record<string, { ancho: number; anchoDoc: number; desborde?: boolean }>): Promise<Record<string, string>> {
  const { mkdtempSync, writeFileSync, rmSync } = (await import(MODULO_ARCHIVOS)) as unknown as {
    mkdtempSync: (prefijo: string) => string
    writeFileSync: (ruta: string, contenido: string) => void
    rmSync: (ruta: string, opciones: { recursive: boolean; force: boolean }) => void
  }
  const { spawnSync } = (await import(MODULO_PROCESOS)) as unknown as {
    spawnSync: (comando: string, argumentos: string[], opciones: { cwd: string; encoding: string }) => { stdout: string }
  }
  const { tmpdir } = (await import(MODULO_SISTEMA)) as unknown as { tmpdir: () => string }
  const { join } = (await import(MODULO_RUTAS)) as unknown as { join: (...partes: string[]) => string }
  const carpeta = mkdtempSync(join(tmpdir(), 'gate_medicion_'))
  try {
    const medicion = join(carpeta, 'medicion.json')
    writeFileSync(medicion, JSON.stringify(datos))
    const raiz = process.cwd()
    const salida = spawnSync('node', [join(raiz, 'scripts', 'quality_gate.mjs'), '--solo-medicion', `--visual=${medicion}`, `--base=${join(carpeta, 'inexistente.json')}`], { cwd: raiz, encoding: 'utf8' }).stdout
    return Object.fromEntries(salida.split(/\r?\n/).filter((linea) => /^[^:]+=/.test(linea)).map((linea) => linea.split('=')))
  } finally {
    rmSync(carpeta, { recursive: true, force: true })
  }
}

describe('Quality Gate: medicion responsive frente al ancho nominal del viewport', () => {
  it('una pagina que cabe en su ancho se aprueba', async () => {
    const estado = await evaluarGate({ '1280|/pagina': { ancho: 1280, anchoDoc: 1265 }, '390|/pagina': { ancho: 390, anchoDoc: 390 } })
    expect(estado.Responsive).toBe('OK')
  }, LIMITE_MS)

  it('detecta el desborde de escritorio', async () => {
    const estado = await evaluarGate({ '1024|/pagina': { ancho: 1024, anchoDoc: 1191 } })
    expect(estado.Responsive).toBe('FALLO')
  }, LIMITE_MS)

  it('detecta el desborde movil aunque la emulacion haya inflado el ancho medido hasta igualar al documento', async () => {
    const estado = await evaluarGate({ '390|/pagina': { ancho: 933, anchoDoc: 933 }, '320|/pagina': { ancho: 933, anchoDoc: 933 } })
    expect(estado.Responsive).toBe('FALLO')
  }, LIMITE_MS)

  it('respeta el indicador de desborde de la sonda', async () => {
    const estado = await evaluarGate({ '768|/pagina': { ancho: 768, anchoDoc: 700, desborde: true } })
    expect(estado.Responsive).toBe('FALLO')
  }, LIMITE_MS)
})
