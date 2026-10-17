import type { ReactNode } from 'react'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'

export interface EmpresaActivaContexto {
  empresas: Empresa[]
  empresaActiva: Empresa | null
  seleccionarEmpresa: (codigo: string) => void
}

export interface ProveedorEmpresaActivaProps {
  empresas: Empresa[]
  children: ReactNode
}
