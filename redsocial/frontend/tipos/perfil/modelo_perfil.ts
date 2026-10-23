import type { ComentarioPublicacion } from '../inicio/contrato_interacciones_publicacion'
import type { ReaccionesPorTipo } from '../inicio/contrato_reacciones'

export interface PublicacionPerfil {
  id: string
  tiempo: string
  texto: string
  reaccionesPorTipo: ReaccionesPorTipo
  comentarios: ComentarioPublicacion[]
}

export interface RedesPerfil {
  correo: string
  linkedin: string
  web: string
}

export interface DetallesFijadosPerfil {
  ubicacion: boolean
  trabajo: boolean
  educacion: boolean
}

export type EmpleoPerfil = {
  id: string
  empresa: string
  cargo: string
  inicio: string
  fin: string
  actual: boolean
  ciudad: string
  descripcion: string
}

export type FormacionPerfil = {
  id: string
  tipo: string
  institucion: string
  carrera: string
  inicio: string
  fin: string
}

export type DocumentoPerfil = {
  id: string
  nombre: string
  tipo: string
  fecha: string
  url: string
}

export interface DatosEditablesPerfil {
  nombres: string
  apellidos: string
  titular: string
  acerca: string
  ciudad: string
  pais: string
  fechaNacimiento: string
  genero: string
  situacionSentimental: string
  habilidades: string[]
  detallesFijados: DetallesFijadosPerfil
  empleos: EmpleoPerfil[]
  formaciones: FormacionPerfil[]
  documentos: DocumentoPerfil[]
  redes: RedesPerfil
  avatar: string
}

export type EdicionPerfil = Partial<DatosEditablesPerfil>

export type EdicionesPerfil = Record<string, EdicionPerfil>

export interface PerfilBase {
  id: string
  nombre: string
  titular: string
  empresa: string
  ubicacion: string
  estudios: string
  desde: string
  acerca: string
  habilidades: string[]
  amigos: string[]
  publicaciones: PublicacionPerfil[]
}

export interface PerfilUsuario extends DatosEditablesPerfil {
  id: string
  nombre: string
  empresa: string
  ubicacion: string
  estudios: string
  desde: string
  amigos: string[]
  publicaciones: PublicacionPerfil[]
}

export type PestanaPerfil = 'red_social' | 'resumen' | 'experiencia' | 'documentos' | 'metricas' | 'amigos'

export type SubpestanaRedSocial = 'actividad' | 'preguntas'

export type FiltroPreguntas = 'todas' | 'sin_resolver' | 'resuelta'

export type RelacionPerfil = 'propio' | 'amigos' | 'ninguna' | 'solicitud_enviada'

export interface MetricaComportamiento {
  clave: string
  etiqueta: string
  valor: string
  estado: 'optimo' | 'estable'
}

export interface MetricaProfesional {
  clave: string
  titulo: string
  precision: number
  datos: { etiqueta: string; valor: string }[]
}

export interface MetricasDemostracion {
  comportamiento: MetricaComportamiento[]
  profesionales: MetricaProfesional[]
}

export type TipoCampoPerfil = 'texto' | 'multilinea' | 'seleccion' | 'casilla'

export interface CampoFormularioPerfil {
  clave: string
  etiqueta: string
  tipo: TipoCampoPerfil
  marcador?: string
  prefijo?: string
  opciones?: string[]
}

export interface DefinicionSeccionPerfil {
  titulo: string
  agregar: string
  campos: CampoFormularioPerfil[]
  ver_mas?: string
  ver_menos?: string
  filas_visibles?: number
}

export interface DefinicionListaPerfil extends DefinicionSeccionPerfil {
  vacio: string
  icono: string
  actual?: string
}

export type ItemPerfil = { id: string } & Record<string, string | boolean>

export interface ResumenItemPerfil {
  titulo: string
  subtitulo: string
  periodo: string
  detalle: string
}
