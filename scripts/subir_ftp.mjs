import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, posix, relative, sep } from 'node:path'
import { Client } from 'basic-ftp'

const archivoEnv = '.env.ftp'
if (!existsSync(archivoEnv)) {
  console.error(`Falta ${archivoEnv} (FTP_HOST, FTP_USER, FTP_PASSWORD).`)
  process.exit(1)
}

const env = Object.fromEntries(
  readFileSync(archivoEnv, 'utf8')
    .split(/\r?\n/)
    .filter((linea) => linea.includes('=') && !linea.startsWith('#'))
    .map((linea) => {
      const i = linea.indexOf('=')
      return [linea.slice(0, i).trim(), linea.slice(i + 1).trim()]
    }),
)

function listarArchivos(raiz) {
  const resultado = []
  const recorrer = (carpeta) => {
    for (const nombre of readdirSync(carpeta)) {
      const ruta = join(carpeta, nombre)
      if (statSync(ruta).isDirectory()) recorrer(ruta)
      else resultado.push({ ruta, remota: relative(raiz, ruta).split(sep).join('/'), tamano: statSync(ruta).size })
    }
  }
  recorrer(raiz)
  return resultado
}

function comprobarCoherenciaLocal(raiz, archivos) {
  const existentes = new Set(archivos.map((a) => a.remota))
  const faltantes = []
  const html = readFileSync(join(raiz, 'index.html'), 'utf8')
  for (const [, ruta] of html.matchAll(/(?:src|href)="\/([^"]+)"/g)) if (!existentes.has(ruta)) faltantes.push(ruta)
  for (const archivo of archivos.filter((a) => /^assets\/.+\.(js|css)$/.test(a.remota))) {
    const texto = readFileSync(archivo.ruta, 'utf8')
    for (const [, nombre] of texto.matchAll(/(?:from|import)\s*\(?\s*["']\.\/([\w.-]+\.(?:js|css))["']/g)) if (!existentes.has(`assets/${nombre}`)) faltantes.push(`assets/${nombre} (referenciado por ${archivo.remota})`)
    for (const [, nombre] of texto.matchAll(/["']assets\/([\w.-]+\.(?:js|css))["']/g)) if (!existentes.has(`assets/${nombre}`)) faltantes.push(`assets/${nombre} (referenciado por ${archivo.remota})`)
  }
  if (!existentes.has('.htaccess')) faltantes.push('.htaccess (reescritura de rutas internas)')
  return faltantes
}

async function comprobarEnSitio(url, archivos) {
  const fallos = []
  const respuesta = await fetch(url + '/', { cache: 'no-store' })
  const html = await respuesta.text()
  const local = readFileSync(archivos.find((a) => a.remota === 'index.html').ruta, 'utf8')
  if (html.trim() !== local.trim()) fallos.push('el index.html publicado no coincide con el generado')
  for (const [, ruta] of local.matchAll(/(?:src|href)="\/(assets\/[^"]+)"/g)) {
    const recurso = await fetch(`${url}/${ruta}`, { cache: 'no-store' })
    const tipo = recurso.headers.get('content-type') ?? String()
    if (!recurso.ok || tipo.includes('text/html')) fallos.push(`${ruta}: respuesta ${recurso.status} ${tipo}`)
  }
  return fallos
}

if (!existsSync('dist/index.html')) {
  console.error('No existe dist/index.html. Ejecuta primero la compilación.')
  process.exit(1)
}

const instantanea = mkdtempSync(join(tmpdir(), 'redsocial-subida-'))
cpSync('dist', instantanea, { recursive: true })
const archivos = listarArchivos(instantanea)
const incoherencias = comprobarCoherenciaLocal(instantanea, archivos)
if (incoherencias.length > 0) {
  console.error('La compilación está incompleta; no se sube nada:')
  incoherencias.forEach((faltante) => console.error(`  - ${faltante}`))
  rmSync(instantanea, { recursive: true, force: true })
  process.exit(1)
}
console.log(`Instantánea de dist: ${archivos.length} archivos.`)
if (process.argv.includes('--solo-comprobar')) {
  console.log('Comprobación local correcta; no se subió nada.')
  rmSync(instantanea, { recursive: true, force: true })
  process.exit(0)
}

const cliente = new Client()
let codigoSalida = 0
try {
  await cliente.access({
    host: env.FTP_HOST,
    port: Number(env.FTP_PORT || 21),
    user: env.FTP_USER,
    password: env.FTP_PASSWORD,
    secure: true,
    secureOptions: { rejectUnauthorized: false },
  })
  const base = env.FTP_DIR || '/'
  const ordenados = [...archivos.filter((a) => a.remota !== 'index.html'), ...archivos.filter((a) => a.remota === 'index.html')]
  for (const archivo of ordenados) {
    const destino = posix.join(base, archivo.remota)
    await cliente.ensureDir(posix.dirname(destino))
    await cliente.uploadFrom(archivo.ruta, posix.basename(destino))
  }

  const incorrectos = []
  for (const archivo of archivos) {
    const carpeta = posix.join(base, posix.dirname(archivo.remota))
    const remotos = await cliente.list(carpeta)
    const remoto = remotos.find((r) => r.name === posix.basename(archivo.remota))
    if (!remoto || remoto.size !== archivo.tamano) incorrectos.push(archivo.remota)
  }
  if (incorrectos.length > 0) throw new Error(`Subida incompleta o con tamaños distintos: ${incorrectos.join(', ')}`)

  const vigentes = new Set(archivos.filter((a) => a.remota.startsWith('assets/')).map((a) => a.remota.slice('assets/'.length)))
  const obsoletos = (await cliente.list(posix.join(base, 'assets'))).filter((r) => r.isFile && !vigentes.has(r.name))
  for (const obsoleto of obsoletos) await cliente.remove(posix.join(base, 'assets', obsoleto.name))
  console.log(`Subida verificada: ${archivos.length} archivos; ${obsoletos.length} recursos anteriores retirados tras la verificación.`)

  const sitio = process.env.SITIO_URL ?? env.SITIO_URL
  if (sitio) {
    const fallos = await comprobarEnSitio(sitio.replace(/\/$/, String()), archivos)
    if (fallos.length > 0) throw new Error(`El sitio no sirve la versión nueva: ${fallos.join('; ')}`)
    console.log(`Sitio verificado por HTTPS: ${sitio}`)
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  codigoSalida = 1
} finally {
  cliente.close()
  rmSync(instantanea, { recursive: true, force: true })
}
process.exit(codigoSalida)
