import { normalizarTexto } from '@/componentes/compartido/interfaz/buscar_opciones_locales'
import { contieneTexto } from '@/componentes/compartido/interfaz/fuente_busqueda_local'
import { TODOS_LOS_TIPOS, filtrarHistorial } from '@/componentes/empresas/bloques/logica_historial_empresa'
import { TODOS_LOS_ESTADOS, TODOS_LOS_ROLES, armarUsuarios, filtrarUsuarios } from '@/componentes/empresas/bloques/logica_usuarios_empresa'
import { DESTACADOS, BUSQUEDA_DESTACADOS_MARKETPLACE } from '@/rutas/marketplace/rutas_marketplace'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import { EMPRESAS } from '../../servicios/empresas/empresas'
import { HISTORIAL_BASE_EMPRESA } from '../../servicios/empresas/historial_empresa'
import { USUARIOS_BASE_EMPRESA } from '../../servicios/empresas/usuarios_empresa'
import { leerFuentesFrontend } from './leer_fuentes'

const FUENTES = await leerFuentesFrontend()
const historial = (busqueda: string) => filtrarHistorial(HISTORIAL_BASE_EMPRESA, { busqueda, tipo: TODOS_LOS_TIPOS, desde: null, hasta: null })
const usuarios = armarUsuarios(EMPRESAS[0], USUARIOS_BASE_EMPRESA)
const buscarUsuarios = (busqueda: string) => filtrarUsuarios(usuarios, { busqueda, rol: TODOS_LOS_ROLES, estado: TODOS_LOS_ESTADOS })

describe('normalizarTexto compartido', () => {
  it('ignora mayúsculas, minúsculas y tildes, y recorta los extremos', () => {
    expect(normalizarTexto('María')).toBe('maria')
    expect(normalizarTexto('AREQUIPA')).toBe(normalizarTexto('Arequipa'))
    expect(normalizarTexto('GestionPlex')).toBe(normalizarTexto('gestionplex'))
    expect(normalizarTexto('  Ñandú  ')).toBe('nandu')
  })

  it('no aplica reglas adicionales sobre la puntuación ni los espacios internos', () => {
    expect(normalizarTexto("O'Neil-Smith")).toBe("o'neil-smith")
    expect(normalizarTexto('a  b')).toBe('a  b')
  })

  it('solo afecta a la comparación: no modifica el texto original', () => {
    const original = 'María Fernández'
    expect(contieneTexto(original, 'MARIA')).toBe(true)
    expect(original).toBe('María Fernández')
  })
})

describe('EMP-02: historial de la empresa busca exclusivamente por el usuario y sin tildes', () => {
  it('encuentra por el nombre del usuario sin distinguir mayúsculas ni tildes', () => {
    const usuario = HISTORIAL_BASE_EMPRESA[0].usuario
    expect(historial(usuario.toUpperCase()).map((registro) => registro.usuario)).toContain(usuario)
    expect(historial('juan perez').length).toBeGreaterThan(0)
    expect(historial('')).toHaveLength(HISTORIAL_BASE_EMPRESA.length)
  })

  it('no busca por acción, detalle, tipo, fecha ni hora', () => {
    const primero = HISTORIAL_BASE_EMPRESA[0]
    expect(historial(primero.accion)).toHaveLength(0)
    expect(historial(primero.detalle)).toHaveLength(0)
    expect(historial(primero.fecha)).toHaveLength(0)
    expect(historial(primero.hora)).toHaveLength(0)
    expect(historial(catalogoEmpresas.historial_empresa.tipos[primero.tipo as keyof typeof catalogoEmpresas.historial_empresa.tipos])).toHaveLength(0)
  })

  it('no altera los registros y conserva su orden', () => {
    const encontrados = historial('maria')
    encontrados.forEach((registro) => expect(HISTORIAL_BASE_EMPRESA).toContain(registro))
    expect(encontrados).toEqual(HISTORIAL_BASE_EMPRESA.filter((registro) => encontrados.includes(registro)))
  })

  it('el texto del campo y su nombre accesible anuncian solo el usuario', () => {
    expect(catalogoEmpresas.historial_empresa.placeholder_busqueda).toBe('Buscar por usuario…')
    expect(catalogoEmpresas.historial_empresa.etiquetas.busqueda).toBe('Buscar por usuario en el historial')
  })
})

describe('EMP-03: usuarios de la empresa busca exclusivamente por nombre y correo, sin tildes', () => {
  it('encuentra por nombre y correo sin distinguir mayúsculas ni tildes', () => {
    expect(buscarUsuarios('MARIA LOPEZ').map((usuario) => usuario.nombre)).toContain('María López')
    expect(buscarUsuarios('maria.lopez@').length).toBeGreaterThan(0)
    expect(buscarUsuarios('')).toHaveLength(usuarios.length)
  })

  it('ya no busca por rol: el rol es un filtro independiente', () => {
    const etiquetasRol = Object.values(catalogoEmpresas.usuarios_empresa.roles)
    etiquetasRol.forEach((etiqueta) => {
      const porTexto = buscarUsuarios(etiqueta)
      porTexto.forEach((usuario) => expect([usuario.nombre, usuario.correo].some((campo) => contieneTexto(campo, etiqueta))).toBe(true))
    })
    const usuario = usuarios[1]
    const etiqueta = catalogoEmpresas.usuarios_empresa.roles[usuario.rol as keyof typeof catalogoEmpresas.usuarios_empresa.roles]
    expect(filtrarUsuarios(usuarios, { busqueda: '', rol: etiqueta, estado: TODOS_LOS_ESTADOS }).map((fila) => fila.nombre)).toContain(usuario.nombre)
    expect(catalogoEmpresas.usuarios_empresa.placeholder_busqueda).toBe('Buscar por nombre o correo…')
  })

  it('no busca por fecha ni hora y conserva los valores originales', () => {
    expect(buscarUsuarios(usuarios[0].fecha)).toHaveLength(0)
    expect(buscarUsuarios(usuarios[0].hora)).toHaveLength(0)
    expect(usuarios[1].nombre).toBe('María López')
    buscarUsuarios('maria').forEach((usuario) => expect(usuarios).toContain(usuario))
  })
})

const filtrarDestacados = (termino: string) => {
  const respuesta = BUSQUEDA_DESTACADOS_MARKETPLACE.fuente(termino.trim())
  if (respuesta instanceof Promise) throw new Error('la fuente local es sincrona')
  return respuesta.elementos
}
const normalizacionOriginalDeMarketplace = (texto: string) => texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

describe('MKT-01: Marketplace busca solo por el nombre de la aplicación o módulo con la normalización compartida', () => {
  it('produce los mismos resultados que la normalización anterior comparando solo el nombre', () => {
    const terminos = ['', '  ', 'analisis', 'ANÁLISIS', 'contabilidad', 'Gestión', 'gestion', 'zzz', 'a^b']
    for (const termino of terminos) {
      const buscado = normalizacionOriginalDeMarketplace(termino)
      const anterior = buscado === '' ? DESTACADOS : DESTACADOS.filter((destacado) => normalizacionOriginalDeMarketplace(destacado.nombre).includes(buscado))
      expect(filtrarDestacados(termino), termino).toEqual(anterior)
    }
  })

  it('ya no busca por categoría, descripción, publicador ni precio, y devuelve los destacados originales', () => {
    const primero = DESTACADOS[0]
    expect(filtrarDestacados(primero.nombre.toUpperCase())).toContain(primero)
    expect(filtrarDestacados(primero.categoria)).not.toContain(primero)
    expect(filtrarDestacados(primero.publicador)).not.toContain(primero)
    expect(filtrarDestacados(primero.descripcion)).not.toContain(primero)
    expect(filtrarDestacados(primero.precio)).not.toContain(primero)
    filtrarDestacados('a').forEach((destacado) => expect(DESTACADOS).toContain(destacado))
  })
})

describe('Sin normalizaciones duplicadas en los buscadores', () => {
  const LOGICA_DE_BUSQUEDA = [
    '/componentes/empresas/bloques/logica_historial_empresa.ts',
    '/componentes/empresas/bloques/logica_usuarios_empresa.ts',
    '/componentes/empresas/bloques/logica_listado_empresas.ts',
    '/componentes/colaboradores/bloques/colaboradores_tabla_config.ts',
    '/componentes/mensajeria/bloques/logica_presentacion_mensajes.ts',
    '/componentes/mensajeria/bloques/logica_busqueda_mensajeria.ts',
    '/componentes/amigos/bloques/logica_solicitudes.ts',
    '/componentes/marketplace/bloques/logica_busqueda_marketplace.ts',
    '/componentes/eventos/bloques/panel_filtro_categoria.tsx',
  ]

  it('ninguna lógica de búsqueda comparada recurre a toLowerCase ni a una normalización propia', () => {
    LOGICA_DE_BUSQUEDA.forEach((ruta) => {
      const texto = FUENTES.find((fuente) => fuente.ruta === ruta)?.texto ?? ''
      expect(texto.length, ruta).toBeGreaterThan(0)
      expect(texto, ruta).not.toMatch(/\.toLowerCase\(\)|\.normalize\(/)
    })
  })

  it('solo la función compartida normaliza', () => {
    const conNormalize = FUENTES.filter((fuente) => fuente.ruta.startsWith('/componentes/') && /\.normalize\(/.test(fuente.texto)).map((fuente) => fuente.ruta)
    expect(conNormalize).toEqual(['/componentes/compartido/interfaz/buscar_opciones_locales.ts'])
  })
})
