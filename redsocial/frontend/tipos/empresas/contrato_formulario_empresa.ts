import type { ChangeEvent, ReactNode } from 'react'
import type { Empresa } from './modelo_empresas'

export interface DatosFormularioEmpresa {
  ruc: string
  nombre_comercial: string
  razon_social: string
  direccion: string
  ubigeo: string
  codigo_pais: string
  telefono: string
  email: string
  web: string
  rubro: string
  tipo_plan_cuenta: string
  activa: boolean
}

export type CampoTextoEmpresa = Exclude<keyof DatosFormularioEmpresa, 'activa'>

export type EstadoRuc = 'sin_validar' | 'valido' | 'invalido'

export interface FormularioEmpresa {
  datos: DatosFormularioEmpresa
  estadoRuc: EstadoRuc
  logo: string | null
  errorLogo: string | null
  puedeGuardar: boolean
  manejarTexto: (campo: CampoTextoEmpresa) => (texto: string) => void
  manejarSelector: (campo: CampoTextoEmpresa) => (evento: { target: { value: unknown } }) => void
  cambiarActiva: (marcada: boolean) => void
  validarRuc: () => void
  elegirLogo: (evento: ChangeEvent<HTMLInputElement>) => void
  construirEmpresa: () => Empresa
}

export interface FormularioEmpresaProps {
  formulario: FormularioEmpresa
}

export interface ModalEmpresaProps {
  totalExistentes: number
  alCerrar: () => void
  alGuardar: (empresa: Empresa) => void
}

export interface CampoEtiquetadoEmpresaProps {
  etiqueta: string
  requerido?: boolean
  children: ReactNode
}

export interface CabeceraModalEmpresaProps {
  titulo: string
  subtitulo: string
  alCerrar: () => void
}

export interface LogoEmpresa {
  logo: string | null
  errorLogo: string | null
  elegirLogo: (evento: ChangeEvent<HTMLInputElement>) => void
  quitarLogo: () => void
  conservarLogo: () => void
}
