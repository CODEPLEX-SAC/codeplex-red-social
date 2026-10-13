const MODULO_ARCHIVOS = 'node:fs'
const RAIZ_FRONTEND = '/redsocial/frontend'
const SEPARADOR_WINDOWS = '\\'
const EXTENSIONES = ['.tsx', '.ts', '.json']
const CARPETAS_EXCLUIDAS = ['/pruebas/', '/node_modules/']

export async function leerFuentesFrontend(): Promise<{ ruta: string; texto: string }[]> {
  const { readdirSync, readFileSync } = (await import(MODULO_ARCHIVOS)) as unknown as {
    readdirSync: (ruta: string, opciones: { recursive: boolean }) => string[]
    readFileSync: (ruta: string, codificacion: string) => string
  }
  const { process } = globalThis as unknown as { process: { cwd: () => string } }
  const base = process.cwd() + RAIZ_FRONTEND
  return readdirSync(base, { recursive: true })
    .map((ruta) => '/' + ruta.split(SEPARADOR_WINDOWS).join('/'))
    .filter((ruta) => EXTENSIONES.some((extension) => ruta.endsWith(extension)))
    .filter((ruta) => !CARPETAS_EXCLUIDAS.some((carpeta) => (ruta + '/').includes(carpeta)))
    .map((ruta) => ({ ruta, texto: readFileSync(base + ruta, 'utf8') }))
}
