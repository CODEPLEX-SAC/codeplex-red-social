import type { CampoFormularioPerfil, DocumentoPerfil, EdicionPerfil, EmpleoPerfil, FormacionPerfil, ItemPerfil, PerfilUsuario, ResumenItemPerfil } from '@/tipos/perfil/modelo_perfil'

const VACIO = String()
const EXTENSION = /\.([^.]+)$/

export function edicionDeValores(valores: Record<string, string>): EdicionPerfil {
  return { ...valores } as unknown as EdicionPerfil
}

export function guardarItem<T extends { id: string }>(lista: T[], item: ItemPerfil, prefijo: string): T[] {
  const existente = lista.some((actual) => actual.id === item.id)
  if (existente) return lista.map((actual) => (actual.id === item.id ? (item as unknown as T) : actual))
  return [...lista, { ...item, id: `${prefijo}-${lista.length + 1}-${Date.now()}` } as unknown as T]
}

export function quitarItem<T extends { id: string }>(lista: T[], id: string): T[] {
  return lista.filter((actual) => actual.id !== id)
}

export function resumenEmpleo(empleo: EmpleoPerfil, textoActual: string): ResumenItemPerfil {
  const fin = empleo.actual ? textoActual : empleo.fin
  return {
    titulo: empleo.cargo || empleo.empresa,
    subtitulo: empleo.cargo ? empleo.empresa : '',
    periodo: [empleo.inicio, fin].filter(Boolean).join(' - '),
    detalle: [empleo.ciudad, empleo.descripcion].filter(Boolean).join(' · '),
  }
}

export function resumenFormacion(formacion: FormacionPerfil): ResumenItemPerfil {
  return {
    titulo: formacion.carrera || formacion.institucion,
    subtitulo: formacion.carrera ? formacion.institucion : formacion.tipo,
    periodo: [formacion.inicio, formacion.fin].filter(Boolean).join(' - '),
    detalle: formacion.carrera ? formacion.tipo : '',
  }
}

export function pasosCumplidos(perfil: PerfilUsuario): Record<string, boolean> {
  return {
    presentacion: perfil.acerca.trim().length > 0,
    ubicacion: Boolean(perfil.ciudad || perfil.pais),
    habilidades: perfil.habilidades.length > 0,
    experiencia: perfil.empleos.length > 0,
    formacion: perfil.formaciones.length > 0,
    documentos: perfil.documentos.length > 0,
  }
}

export function documentoDesdeArchivo(archivo: File, fecha: string, secuencia: number): DocumentoPerfil {
  const extension = EXTENSION.exec(archivo.name)?.[1] ?? VACIO
  return { id: `documento-${secuencia}-${Date.now()}`, nombre: archivo.name, tipo: extension.toUpperCase(), fecha, url: URL.createObjectURL(archivo) }
}

export function perfilIncompleto(perfil: PerfilUsuario, totalPublicaciones: number) {
  return perfil.acerca.trim().length === 0 && perfil.habilidades.length === 0 && totalPublicaciones === 0
}

export function quitarHabilidad(lista: string[], habilidad: string) {
  return lista.filter((otra) => otra !== habilidad)
}

export function agregarHabilidad(lista: string[], habilidad: string) {
  const limpia = habilidad.trim()
  return limpia && !lista.includes(limpia) ? [...lista, limpia] : lista
}

export function itemNuevo(campos: CampoFormularioPerfil[]): ItemPerfil {
  return { id: VACIO, ...Object.fromEntries(campos.map((campo) => [campo.clave, campo.tipo === 'casilla' ? false : VACIO])) }
}
