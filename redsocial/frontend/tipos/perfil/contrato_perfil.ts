import type { ContenidoPublicacion } from '../inicio/contrato_crear_publicacion'
import type { AccionesFeedInicio } from '../inicio/contrato_feed_inicio'
import type { ElementoFeed } from '../inicio/modelo_inicio'
import type { ReactNode } from 'react'
import type { CampoFormularioPerfil, DefinicionListaPerfil, DefinicionSeccionPerfil, DetallesFijadosPerfil, EdicionPerfil, ItemPerfil, MetricasDemostracion, PerfilUsuario, PestanaPerfil, RedesPerfil, RelacionPerfil, ResumenItemPerfil } from './modelo_perfil'

export interface CabeceraPerfilProps {
  perfil: PerfilUsuario
  relacion: RelacionPerfil
  totalPublicaciones: number
  amigosEnComun: number
  onAlternarSolicitud: () => void
  onEditar: () => void
  onGuardar: (edicion: EdicionPerfil) => void
}

export interface PestanaAmigosPerfilProps {
  amigos: readonly PerfilUsuario[]
}

export interface PestanasPerfilProps {
  activa: PestanaPerfil
  onCambiar: (pestana: PestanaPerfil) => void
}

export interface PestanaEditablePerfilProps {
  perfil: PerfilUsuario
  propio: boolean
  onGuardar: (edicion: EdicionPerfil) => void
}

export interface PestanaResumenPerfilProps extends PestanaEditablePerfilProps {
  onIrA: (pestana: PestanaPerfil) => void
}

export interface PestanaMetricasPerfilProps {
  perfil: PerfilUsuario
  propio: boolean
  publicaciones: ElementoFeed[]
  metricas: MetricasDemostracion
  onIrA: (pestana: PestanaPerfil) => void
}

export interface PestanaRedSocialPerfilProps {
  perfil: PerfilUsuario
  amigos: readonly PerfilUsuario[]
  publicaciones: ElementoFeed[]
  acciones: AccionesFeedInicio
  propio: boolean
  onPublicar: (contenido: ContenidoPublicacion) => void
  onVerAmigos: () => void
  onIrA: (pestana: PestanaPerfil) => void
  onGuardar: (edicion: EdicionPerfil) => void
}

export interface ModalEditarPerfilProps {
  perfil: PerfilUsuario
  onGuardar: (edicion: EdicionPerfil) => void
  onCerrar: () => void
}

export interface PanelFotosPerfilProps {
  fotos: { id: string; url: string }[]
  nombre: string
}

export interface MiniaturaFotoPerfil {
  id: string
  url: string
}

export interface PanelAmigosRedSocialProps {
  amigos: readonly PerfilUsuario[]
  onVerTodos: () => void
}

export interface PanelDatosPersonalesPerfilProps {
  perfil: PerfilUsuario
  propio: boolean
  onIrA: (pestana: PestanaPerfil) => void
}

export type ActividadRedSocialPerfilProps = Omit<PestanaRedSocialPerfilProps, 'amigos' | 'onVerAmigos' | 'onIrA' | 'onGuardar'>

export interface ConsultasRelacionPerfil {
  contarAmigosEnComun: (perfil: PerfilUsuario, otro?: PerfilUsuario) => number
  sonAmigos: (perfil: PerfilUsuario, otroId?: string) => boolean
}

export interface CampoPerfilProps {
  campo: CampoFormularioPerfil
  valor: string | boolean
  onCambiar: (valor: string | boolean) => void
}

export interface MarcoSeccionPerfilProps {
  titulo: string
  puedeEditar: boolean
  editando: boolean
  guardarDeshabilitado?: boolean
  onEditar: () => void
  onCancelar: () => void
  onGuardar: () => void
  children: ReactNode
}

export interface SeccionCamposPerfilProps {
  definicion: DefinicionSeccionPerfil
  valores: Record<string, string>
  propio: boolean
  onGuardar: (valores: Record<string, string>) => void
}

export interface SeccionListaPerfilProps {
  definicion: DefinicionListaPerfil
  items: ItemPerfil[]
  propio: boolean
  resumen: (item: ItemPerfil) => ResumenItemPerfil
  onGuardar: (item: ItemPerfil) => void
  onEliminar: (id: string) => void
}

export interface SeccionHabilidadesPerfilProps {
  habilidades: string[]
  propio: boolean
  onGuardar: (habilidades: string[]) => void
}

export interface SeccionDetallesFijadosPerfilProps {
  detalles: DetallesFijadosPerfil
  onGuardar: (detalles: DetallesFijadosPerfil) => void
}

export interface ListaVerificacionPerfilProps {
  perfil: PerfilUsuario
  onIrA: (pestana: PestanaPerfil) => void
}

export interface RedesCabeceraPerfilProps {
  redes: RedesPerfil
  propio: boolean
  onAgregar: () => void
}

export interface FotoPerfilCabeceraProps {
  perfil: PerfilUsuario
  propio: boolean
  onElegirFoto: (archivo: File) => void
}

export interface PanelMisPreguntasPerfilProps {
  preguntas: ElementoFeed[]
  acciones: AccionesFeedInicio
  propio: boolean
}

export interface VisorMediosProps {
  items: { id: string; url: string }[]
  indice: number
  titulo: string
  onCambiar: (indice: number) => void
  onCerrar: () => void
}

export interface ItemListaPerfilProps {
  item: ItemPerfil
  datos: ResumenItemPerfil
  icono: string
  propio: boolean
  onEditar: (item: ItemPerfil) => void
  onEliminar: (id: string) => void
}
