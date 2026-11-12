import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { DetalleGrupo, RolGrupoExterno } from '@/tipos/grupos/contrato_gestion_grupos'
import type { EstadoAlmacenGrupos, EstadoGrupoLocal, NivelNovedades, PuertoGrupos, RegistroGrupo, SugeridosGrupos } from '@/tipos/grupos/contrato_puerto_grupos'
import type { GrupoSugerido, TuGrupo } from '@/tipos/grupos/contrato_tus_grupos'
import type { AlmacenPublicaciones, EstadoPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'
import type { DestinoGrupoCompartir } from '@/tipos/inicio/contrato_compartir_publicacion'
import { GRUPOS_EXTERNOS, administradoresDe, formatoMiles, idDeGrupo, miembrosDe, registrosBase, rutaDeGrupo, textoDeMiembros } from './detalle_grupos'
import { IMAGEN_CREAR_GRUPO, imagenDeGrupo, imagenesRecientes, imagenesGaleria } from './imagenes_grupos'
import { GRUPOS_SUGERIDOS_MAS, GRUPOS_SUGERIDOS_PARA_TI } from './tus_grupos'

const LOCAL_INICIAL: EstadoGrupoLocal = { fijado: false, siguiendo: true, novedades: 'todas', portada: null, descripcionEditada: false, invitados: [] }
const SIN_REACCIONES = { me_gusta: 0, me_encanta: 0, asombroso: 0 }
const DIAS_AHORA = 0
const sesion = catalogoCompartido.sesion_actual
const oyentes = new Set<() => void>()
const PUBLICACIONES = new Map<string, AlmacenPublicaciones>()
let estado: EstadoAlmacenGrupos = { creados: [], unidos: [], abandonados: [], eliminados: [], ediciones: {}, locales: {} }
let version = 0

function modificar(cambio: (actual: EstadoAlmacenGrupos) => EstadoAlmacenGrupos) {
  estado = cambio(estado)
  version += 1
  oyentes.forEach((oyente) => oyente())
}

function localDe(id: string): EstadoGrupoLocal {
  return estado.locales[id] ?? LOCAL_INICIAL
}

function cambiarLocal(id: string, cambio: Partial<EstadoGrupoLocal>) {
  modificar((actual) => ({ ...actual, locales: { ...actual.locales, [id]: { ...localDe(id), ...cambio } } }))
}

function registros(): RegistroGrupo[] {
  const ocultos = new Set([...estado.abandonados, ...estado.eliminados])
  return [...registrosBase(), ...estado.creados, ...estado.unidos]
    .filter((registro) => !ocultos.has(registro.id))
    .map((registro) => ({ ...registro, ...estado.ediciones[registro.id] }))
}

function aTuGrupo(registro: RegistroGrupo): TuGrupo {
  return { id: registro.id, nombre: registro.nombre, descripcion: registro.descripcion, rol: registro.rol, ruta: rutaDeGrupo(registro.id), imagen: registro.imagen, ultimaVisita: registro.ultimaVisita, diasVisita: registro.diasVisita, fijado: localDe(registro.id).fijado }
}

function textoCreado(): string {
  const fecha = new Date().toLocaleDateString(catalogoGrupos.detalle.localidad_fecha, { day: 'numeric', month: 'long', year: 'numeric' })
  return catalogoGrupos.detalle.creado_hoy.replace(':fecha', fecha)
}

function fechaLarga(): string {
  return new Date().toLocaleDateString(catalogoGrupos.detalle.localidad_fecha, { day: 'numeric', month: 'long', year: 'numeric' })
}

function idLibre(nombre: string): string {
  const existentes = new Set([...registrosBase(), ...estado.creados, ...estado.unidos].map((registro) => registro.id))
  const base = idDeGrupo(nombre)
  let candidato = base
  let numero = 1
  while (existentes.has(candidato)) {
    numero += 1
    candidato = [base, numero].join(catalogoGrupos.parametros_ruta.separador_id)
  }
  return candidato
}

function detalleDe(registro: RegistroGrupo): DetalleGrupo {
  const miembrosLista = miembrosDe(registro)
  const local = localDe(registro.id)
  const autorId = registro.rol === 'administrador' ? sesion.id : idDeGrupo(registro.administradores[0])
  return {
    id: registro.id,
    nombre: registro.nombre,
    rol: registro.rol,
    descripcion: registro.descripcion,
    miembros: textoDeMiembros(registro.totalMiembros),
    totalMiembros: registro.totalMiembros,
    totalTexto: formatoMiles(registro.totalMiembros),
    miembrosLista,
    creado: registro.creado,
    fechaCreacion: registro.fechaCreacion,
    administradores: registro.administradores,
    autorId,
    imagen: registro.imagen,
    portada: local.portada ?? registro.imagen,
    publicacion: registro.publicacion,
    fijado: local.fijado,
    siguiendo: local.siguiendo,
    recientes: imagenesRecientes(),
    galeria: imagenesGaleria(),
  }
}

function estadoInicialPublicaciones(registro: RegistroGrupo): EstadoPublicaciones {
  const detalle = detalleDe(registro)
  const texto = [catalogoGrupos.detalle.publicacion.saludo.replace(catalogoGrupos.detalle.publicacion.marcador_nombre, registro.nombre), registro.publicacion].join(catalogoGrupos.detalle.publicacion.separador)
  return {
    feed: [{ clase: 'texto', id: [registro.id, catalogoGrupos.detalle.publicacion.clave_bienvenida].join(catalogoGrupos.parametros_ruta.separador_id), autorId: detalle.autorId, nombre: registro.administradores[0], tiempo: catalogoGrupos.detalle.publicacion.cuando, texto, tipo: 'publicacion', medios: [], opciones: [], miVoto: null, reaccionesBase: SIN_REACCIONES, comentariosBase: [], enInicio: false, comentarioUtil: null }],
    interacciones: {},
    secuencia: DIAS_AHORA,
    nombresVisibles: {},
  }
}

function almacenDePublicaciones(id: string): AlmacenPublicaciones {
  const existente = PUBLICACIONES.get(id)
  if (existente) return existente
  const registro = registros().find((candidato) => candidato.id === id) ?? registroExterno(id, 'visitante')
  const escuchas = new Set<() => void>()
  let actual: EstadoPublicaciones = registro ? estadoInicialPublicaciones(registro) : { feed: [], interacciones: {}, secuencia: 0, nombresVisibles: {} }
  const almacen: AlmacenPublicaciones = {
    leer: () => actual,
    suscribir: (escucha) => {
      escuchas.add(escucha)
      const cancelar = () => {
        escuchas.delete(escucha)
      }
      return cancelar
    },
    modificar: (cambio) => {
      actual = cambio(actual)
      escuchas.forEach((escucha) => escucha())
    },
  }
  PUBLICACIONES.set(id, almacen)
  return almacen
}

function sugeridosDisponibles(): SugeridosGrupos {
  const unidos = new Set(estado.unidos.map((registro) => registro.nombre))
  const libres = (lista: GrupoSugerido[]) => lista.filter((grupo) => !unidos.has(grupo.nombre))
  return { paraTi: libres(GRUPOS_SUGERIDOS_PARA_TI), mas: libres(GRUPOS_SUGERIDOS_MAS) }
}

function registroDeSugerido(nombre: string): RegistroGrupo | undefined {
  const sugerido = [...GRUPOS_SUGERIDOS_PARA_TI, ...GRUPOS_SUGERIDOS_MAS].find((grupo) => grupo.nombre === nombre)
  if (!sugerido) return undefined
  const id = idLibre(nombre)
  return { id, nombre, descripcion: sugerido.categoria, rol: 'miembro', imagen: sugerido.imagen, ultimaVisita: catalogoGrupos.tus_grupos.visita_ahora, diasVisita: DIAS_AHORA, fechaCreacion: fechaLarga(), totalMiembros: Math.max(sugerido.miembrosTotal, catalogoGrupos.detalle.minimo_miembros), creado: fechaLarga(), administradores: administradoresDe('miembro'), publicacion: sugerido.categoria }
}

function registroExterno(id: string | null, rol: RolGrupoExterno): RegistroGrupo | undefined {
  const externo = GRUPOS_EXTERNOS.find((candidato) => idDeGrupo(candidato.nombre) === id)
  return externo && { id: idDeGrupo(externo.nombre), nombre: externo.nombre, descripcion: externo.descripcion, rol, imagen: imagenDeGrupo(externo.nombre, DIAS_AHORA), ultimaVisita: catalogoGrupos.tus_grupos.visita_ahora, diasVisita: DIAS_AHORA, fechaCreacion: fechaLarga(), totalMiembros: Math.max(externo.miembrosTotal, catalogoGrupos.detalle.minimo_miembros), creado: fechaLarga(), administradores: administradoresDe('miembro'), publicacion: externo.descripcion }
}

export const PUERTO_GRUPOS: PuertoGrupos = {
  suscribir: (oyente) => {
    oyentes.add(oyente)
    const cancelar = () => {
      oyentes.delete(oyente)
    }
    return cancelar
  },
  version: () => version,
  tusGrupos: () => registros().filter((registro) => registro.rol === 'miembro').map(aTuGrupo),
  gruposQueAdministras: () => registros().filter((registro) => registro.rol === 'administrador').map(aTuGrupo),
  sugeridos: sugeridosDisponibles,
  detalle: (id) => {
    const registro = registros().find((candidato) => candidato.id === id) ?? registroExterno(id, 'visitante')
    return registro ? detalleDe(registro) : undefined
  },
  estado: localDe,
  crear: (datos) => {
    const id = idLibre(datos.nombre)
    const registro: RegistroGrupo = { id, nombre: datos.nombre.trim(), descripcion: datos.descripcion.trim(), rol: 'administrador', imagen: IMAGEN_CREAR_GRUPO, ultimaVisita: catalogoGrupos.tus_grupos.visita_ahora, diasVisita: DIAS_AHORA, fechaCreacion: fechaLarga(), totalMiembros: 1, creado: textoCreado(), administradores: administradoresDe('administrador'), publicacion: datos.descripcion.trim() || catalogoGrupos.detalle.publicacion.sin_descripcion }
    modificar((actual) => ({ ...actual, creados: [registro, ...actual.creados] }))
    return aTuGrupo(registro)
  },
  editar: (id, datos) => {
    modificar((actual) => ({ ...actual, ediciones: { ...actual.ediciones, [id]: { nombre: datos.nombre.trim(), descripcion: datos.descripcion.trim() } }, locales: { ...actual.locales, [id]: { ...localDe(id), descripcionEditada: datos.descripcion.trim() !== String() } } }))
  },
  unirse: (nombre) => {
    const externo = registroExterno(idDeGrupo(nombre), 'miembro')
    const registro = registroDeSugerido(nombre) ?? externo
    if (registro) modificar((actual) => ({ ...actual, unidos: [registro, ...actual.unidos] }))
  },
  abandonar: (id) => {
    modificar((actual) => {
      const eraUnido = actual.unidos.some((registro) => registro.id === id)
      if (eraUnido) return { ...actual, unidos: actual.unidos.filter((registro) => registro.id !== id) }
      return { ...actual, abandonados: [...actual.abandonados, id] }
    })
  },
  eliminar: (id) => modificar((actual) => ({ ...actual, eliminados: [...actual.eliminados, id] })),
  alternarFijado: (id) => cambiarLocal(id, { fijado: !localDe(id).fijado }),
  alternarSeguimiento: (id) => cambiarLocal(id, { siguiendo: !localDe(id).siguiendo }),
  cambiarPortada: (id, url) => cambiarLocal(id, { portada: url }),
  invitar: (id, nombre) => {
    const actuales = localDe(id).invitados
    if (!actuales.includes(nombre)) cambiarLocal(id, { invitados: [...actuales, nombre] })
  },
  novedades: (id, nivel: NivelNovedades) => cambiarLocal(id, { novedades: nivel }),
  publicaciones: almacenDePublicaciones,
}

export function destinosDeGrupos(): DestinoGrupoCompartir[] {
  return [...PUERTO_GRUPOS.tusGrupos(), ...PUERTO_GRUPOS.gruposQueAdministras()].map((grupo) => ({
    id: grupo.id,
    nombre: grupo.nombre,
    imagen: grupo.imagen,
    detalle: [catalogoGrupos.detalle.tipo, PUERTO_GRUPOS.detalle(grupo.id)?.miembros].join(' · '),
  }))
}
