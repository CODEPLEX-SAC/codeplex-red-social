const MODULO_ARCHIVOS = 'node:fs'

export async function leerCssGlobal(): Promise<string> {
  const { readFileSync } = (await import(MODULO_ARCHIVOS)) as unknown as { readFileSync: (ruta: string, codificacion: string) => string }
  const { process } = globalThis as unknown as { process: { cwd: () => string } }
  return readFileSync(process.cwd() + '/montaje_local/index.css', 'utf8')
}
