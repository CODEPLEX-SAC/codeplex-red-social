import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CAPACIDAD = path.join(RAIZ, 'redsocial')
const EXCLUIDAS = new Set(['node_modules', 'dist', '.vite', '.git'])
const argumentos = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => a.slice(2).split('=')))
const VECES_VITEST = Number(argumentos.vitest ?? 3)
const RUTA_BASE_VISUAL = argumentos.base ?? path.join(RAIZ, 'herramientas', 'validacion', 'linea_base_visual', 'roles.json')
const estado = new Map()
const detalle = []

function marcar(nombre, valor, nota = '') {
  estado.set(nombre, valor)
  if (nota) detalle.push(`${nombre}: ${nota}`)
}

function ejecutar(comando, args, opciones = {}) {
  const r = spawnSync(comando, args, { cwd: RAIZ, encoding: 'utf8', shell: process.platform === 'win32', maxBuffer: 1 << 28, ...opciones })
  return { codigo: r.status ?? 1, salida: (r.stdout ?? '') + (r.stderr ?? '') }
}

function archivos(base, relativo = '') {
  const salida = []
  for (const nombre of readdirSync(path.join(base, relativo))) {
    const ruta = path.join(relativo, nombre)
    if (EXCLUIDAS.has(nombre)) continue
    if (statSync(path.join(base, ruta)).isDirectory()) salida.push(...archivos(base, ruta))
    else salida.push(ruta.split(path.sep).join('/'))
  }
  return salida
}

function huella(base, lista) {
  return lista.map((f) => `${f}:${createHash('sha1').update(readFileSync(path.join(base, f))).digest('hex')}`).sort()
}

function artefactosEnLaCapacidad() {
  const encontrados = []
  const recorrer = (relativo) => {
    for (const nombre of readdirSync(path.join(CAPACIDAD, relativo))) {
      const ruta = path.join(relativo, nombre)
      if (EXCLUIDAS.has(nombre) || nombre === '.cache') encontrados.push(ruta)
      else if (statSync(path.join(CAPACIDAD, ruta)).isDirectory()) recorrer(ruta)
    }
  }
  recorrer('')
  return encontrados
}

function validarCapacidadReal() {
  const bloque = ['CAPACIDAD REAL', `Ruta: ${CAPACIDAD}`]
  if (!existsSync(path.join(CAPACIDAD, 'manifiesto-capacidad.json'))) {
    bloque.push('Estado: NO DETERMINADO (falta manifiesto-capacidad.json)')
    marcar('Capacidad real', 'NO DETERMINADO')
    marcar('Validador', 'NO DETERMINADO')
    return bloque
  }
  const artefactos = artefactosEnLaCapacidad()
  bloque.push(artefactos.length === 0 ? 'Estado: OK (sin node_modules, cachés ni salidas dentro de la capacidad)' : `Estado: FALLO (artefactos dentro de la capacidad: ${artefactos.join(', ')})`)
  bloque.push('Fuente: proyecto actual (' + RAIZ + ')')
  const r = ejecutar('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path.join(RAIZ, 'herramientas', 'validacion', 'validar_capacidad.ps1')])
  const copia = /Copia validada:\s*(.+)/.exec(r.salida)?.[1]?.trim()
  const errores = Number(/Errores:\s*(\d+)/.exec(r.salida)?.[1] ?? NaN)
  const fronteras = (r.salida.match(/ERROR_FRONTERA_3DD_VIOLADA/g) ?? []).length
  let sincronizada = false
  if (copia && existsSync(copia)) {
    const fuente = huella(CAPACIDAD, archivos(CAPACIDAD))
    const copiada = huella(copia, archivos(copia))
    sincronizada = fuente.length === copiada.length && fuente.every((linea, i) => linea === copiada[i])
    bloque.push(`Copia validada: ${copia}`)
  }
  bloque.push(sincronizada ? 'Sincronizacion: OK (la copia tiene exactamente los archivos y el contenido actuales)' : 'Sincronizacion: NO DETERMINADO o DESINCRONIZADA')
  marcar('Capacidad real', artefactos.length === 0 && sincronizada ? 'OK' : sincronizada ? 'FALLO' : 'NO DETERMINADO')
  if (!sincronizada || Number.isNaN(errores)) marcar('Validador', 'NO DETERMINADO', 'no se afirma 0 errores sin una copia sincronizada')
  else marcar('Validador', errores === 0 ? 'OK' : 'FALLO', `${errores} errores`)
  marcar('Fronteras 3DD', sincronizada ? (fronteras === 0 ? 'OK' : 'FALLO') : 'NO DETERMINADO', `${fronteras} ERROR_FRONTERA_3DD_VIOLADA`)
  return bloque
}

function clasesSinCss() {
  const dist = path.join(RAIZ, 'dist', 'assets')
  if (!existsSync(dist)) return null
  const css = readFileSync(path.join(dist, readdirSync(dist).find((f) => f.endsWith('.css'))), 'utf8')
  const selectores = new Set([...css.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g)].map((m) => m[1].replace(/\\(.)/g, '$1')))
  const prefijos = '(?:text|bg|border|font|leading|tracking|rounded|shadow|ring|gap|space|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w|h|size|min-w|min-h|max-w|max-h|col|row|items|justify|self|place|overflow|opacity|z|top|left|right|bottom|inset|translate|scale|rotate|transition|duration|ease|cursor|select|object|aspect|order|basis|grow|shrink|line-clamp|divide|outline|decoration|fill|stroke|from|to|via|backdrop|blur|animate|grid-cols|grid-rows|flex)'
  const patron = new RegExp('^(?:(?:[a-z0-9-]+|\\[[^\\]]+\\]):)*-?' + prefijos + '-[A-Za-z0-9.\\[\\]#%/_-]+$')
  const base = path.join(CAPACIDAD, 'frontend')
  const muertas = new Set()
  for (const f of archivos(base)) {
    if (!/\.(tsx|ts|json)$/.test(f) || /^(pruebas|servicios|tipos)\//.test(f)) continue
    const texto = readFileSync(path.join(base, f), 'utf8')
    for (const literal of texto.matchAll(/"([^"\n]{3,400})"|'([^'\n]{3,400})'|`([^`\n]{3,400})`/g)) {
      const cadena = literal[1] ?? literal[2] ?? literal[3]
      if (!cadena.includes(' ') && !cadena.includes('-')) continue
      for (const palabra of cadena.split(/\s+/)) {
        const w = palabra.replace(/^[",;]+|[",;]+$/g, '')
        if (w && patron.test(w) && !selectores.has(w) && !/[${}]/.test(w)) muertas.add(w)
      }
    }
  }
  return [...muertas]
}

function medicionVisual() {
  const actual = argumentos.visual
  if (!actual || !existsSync(actual)) return marcar('Responsive', 'NO DETERMINADO', 'sin medicion en navegador: ejecutar la sonda y pasar --visual=<roles.json>') || marcar('Regresión Empresas', 'NO DETERMINADO')
  const datos = JSON.parse(readFileSync(actual, 'utf8'))
  const desborde = Object.entries(datos).filter(([, v]) => v.desborde || v.anchoDoc > v.ancho).map(([k]) => k)
  marcar('Responsive', desborde.length === 0 ? 'OK' : 'FALLO', `${Object.keys(datos).length} paginas, ${desborde.length} con desborde`)
  if (!existsSync(RUTA_BASE_VISUAL)) return marcar('Regresión Empresas', 'NO DETERMINADO', `sin linea base: ${RUTA_BASE_VISUAL} (o pasar --base=<roles.json>)`)
  const base = JSON.parse(readFileSync(RUTA_BASE_VISUAL, 'utf8'))
  const firma = (v) => JSON.stringify([v.agg, v.campos, v.iconBtn, v.botones])
  const claves = Object.keys(datos).filter((k) => k.split('|')[1]?.startsWith('/empresas'))
  const distintas = claves.filter((k) => base[k] && firma(base[k]) !== firma(datos[k]))
  return marcar('Regresión Empresas', claves.length > 0 && distintas.length === 0 ? 'OK' : distintas.length ? 'FALLO' : 'NO DETERMINADO', `${claves.length} paginas, ${distintas.length} distintas`)
}

const bloqueCapacidad = validarCapacidadReal()

const tsc = ejecutar('npx', ['tsc', '-b'])
marcar('tsc', tsc.codigo === 0 ? 'OK' : 'FALLO', tsc.codigo === 0 ? '' : tsc.salida.slice(0, 400))
const build = ejecutar('npx', ['vite', 'build'])
marcar('vite build', build.codigo === 0 ? 'OK' : 'FALLO')

const muertas = build.codigo === 0 ? clasesSinCss() : null
marcar('Clases inexistentes', muertas === null ? 'NO DETERMINADO' : muertas.length === 0 ? 'OK' : 'FALLO', muertas?.length ? muertas.slice(0, 10).join(', ') : '')

let fallosVitest = 0
const archivosFallidos = new Set()
for (let i = 1; i <= VECES_VITEST; i += 1) {
  const salidaJson = path.join(tmpdir(), `codeplex_vitest_${process.pid}_${i}.json`)
  ejecutar('npx', ['vitest', 'run', '--reporter=json', `--outputFile=${salidaJson}`])
  if (!existsSync(salidaJson)) { fallosVitest += 1; continue }
  const resultado = JSON.parse(readFileSync(salidaJson, 'utf8'))
  rmSync(salidaJson, { force: true })
  if (resultado.numFailedTests > 0 || resultado.numFailedTestSuites > 0) {
    fallosVitest += 1
    resultado.testResults.filter((t) => t.status !== 'passed').forEach((t) => archivosFallidos.add(path.basename(t.name)))
    const primero = resultado.testResults.flatMap((t) => t.assertionResults).find((r) => r.status === 'failed')
    if (primero) detalle.push(`Vitest ejecucion ${i}, primer fallo: ${(primero.failureMessages[0] ?? '').split(String.fromCharCode(10))[0].slice(0, 200)}`)
  }
}
marcar('Vitest', fallosVitest === 0 ? 'OK' : 'FALLO', `${VECES_VITEST} ejecuciones, ${fallosVitest} con fallos${archivosFallidos.size ? ': ' + [...archivosFallidos].join(', ') : ''}`)

const estadoDe = (...archivosDePrueba) => (archivosDePrueba.some((a) => archivosFallidos.has(a)) || fallosVitest > 0 ? (fallosVitest > 0 && archivosFallidos.size === 0 ? 'NO DETERMINADO' : 'FALLO') : 'OK')
marcar('Tipografía', estadoDe('prevencion_tipografica.test.tsx', 'sistema_tipografico_fase_b.test.tsx', 'quality_gate_autoprueba.test.tsx'))
marcar('Colores', estadoDe('sistema_global_fase_a.test.tsx', 'prevencion_componentes.test.tsx'))
marcar('Contraste', estadoDe('quality_gate_contraste.test.tsx', 'sistema_global_fase_a.test.tsx'))
marcar('Componentes', estadoDe('paneles_laterales_compartidos.test.tsx', 'estados_vacios_modulos.test.tsx', 'prevencion_componentes.test.tsx'))
marcar('Catálogos', estadoDe('quality_gate_contraste.test.tsx'))
marcar('Arquitectura', estadoDe('prevencion_arquitectura.test.tsx', 'quality_gate_proyecto.test.tsx'))
marcar('Accesibilidad', estadoDe('modal_compartido.test.tsx', 'fondo_panel_flotante.test.tsx', 'modal_crear_evento.test.tsx'))
marcar('t-* no autorizados', estadoDe('quality_gate_proyecto.test.tsx', 'prevencion_componentes.test.tsx'))
marcar('Botones no registrados', estadoDe('quality_gate_proyecto.test.tsx', 'prevencion_componentes.test.tsx'))

const lint = ejecutar('npx', ['oxlint'])
const lineas = lint.salida.split('\n')
const nuevos = lineas.filter((l) => / error /.test(l) && !/rules-of-hooks/.test(l)).length
const historicos = lineas.filter((l) => / error /.test(l) && /rules-of-hooks/.test(l)).length
const avisos = lineas.filter((l) => / warning /.test(l)).length
marcar('oxlint', nuevos === 0 ? 'OK' : 'FALLO', `${nuevos} errores nuevos, ${historicos} rules-of-hooks historicos (nombres usar_*), ${avisos} avisos existentes`)

medicionVisual()

const ORDEN = ['Tipografía', 'Colores', 'Contraste', 'Componentes', 'Catálogos', 'Arquitectura', 'Accesibilidad', 'Responsive', 'Clases inexistentes', 't-* no autorizados', 'Botones no registrados', 'Fronteras 3DD', 'Capacidad real', 'tsc', 'vite build', 'Vitest', 'Validador', 'oxlint', 'Regresión Empresas']
const simbolo = { OK: '✅', FALLO: '❌', 'NO DETERMINADO': 'NO DETERMINADO' }
console.log('\n' + bloqueCapacidad.join('\n') + '\n')
console.log('CODEPLEX — QUALITY GATE\n')
ORDEN.forEach((n) => console.log(`${n.padEnd(24)}${simbolo[estado.get(n) ?? 'NO DETERMINADO']}`))
if (detalle.length) console.log('\nDetalle:\n' + detalle.map((d) => '  ' + d).join('\n'))
process.exit([...estado.values()].includes('FALLO') ? 1 : 0)
