import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { ColeccionGuardada, GrupoGuardado, ModalGuardados } from '@/tipos/guardados/modelo_guardados'
import type { ControlGuardados } from '@/tipos/guardados/contrato_control_guardados'

export interface PestanasGuardadosProps {
  activa: string
  alCambiar: (clave: string) => void
}

export interface EncabezadoGuardadosProps {
  alCrear: () => void
}

export interface BuscadorGuardadosProps {
  texto: string
  alBuscar: (evento: { target: { value: string } }) => void
}

export interface FiltrosGuardadosProps {
  activo: string
  alCambiar: (clave: string) => void
}

export interface ColumnaColeccionesGuardadosProps {
  control: ControlGuardados
}

export interface ColumnaAccionesGuardadosProps {
  control: ControlGuardados
}

export interface BannerOrganizaGuardadosProps {
  alCrear: () => void
  horizontal?: boolean
}

export interface ListaGruposGuardadosProps {
  control: ControlGuardados
  accionesDe: (grupo: GrupoGuardado) => ElementoMenu[]
}

export interface PanelCentralGuardadosProps {
  control: ControlGuardados
}

export interface VistaColeccionesGuardadasProps {
  control: ControlGuardados
  texto: string
}

export interface FilaColeccionGuardadaProps {
  coleccion: ColeccionGuardada
  acciones: readonly ElementoMenu[]
  alAbrir: () => void
}

export interface EncabezadoColeccionAbiertaProps {
  coleccion: ColeccionGuardada
  acciones: readonly ElementoMenu[]
  alVolver: () => void
}

export interface ModalesGuardadosProps {
  control: ControlGuardados
  modal: ModalGuardados
}

export interface ModalNombreColeccionProps {
  titulo: string
  confirmar: string
  nombreInicial: string
  esValido: (nombre: string) => boolean
  alConfirmar: (nombre: string) => void
  alCerrar: () => void
}

export interface ModalConfirmacionGuardadosProps {
  titulo: string
  mensaje: string
  confirmar: string
  alConfirmar: () => void
  alCerrar: () => void
}

export interface ModalAgregarAColeccionProps {
  grupoId: string
  colecciones: readonly ColeccionGuardada[]
  alAgregar: (coleccionId: string) => void
  alCerrar: () => void
}

