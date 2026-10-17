import { createContext } from 'react'
import type { EmpresaActivaContexto } from '@/tipos/compartido/contrato_empresa_activa'

export const ContextoEmpresaActiva = createContext<EmpresaActivaContexto>({
  empresas: [],
  empresaActiva: null,
  seleccionarEmpresa: () => undefined,
})
