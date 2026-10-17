import { useState } from 'react'
import { ContextoEmpresaActiva } from './contexto_empresa_activa'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { ProveedorEmpresaActivaProps } from '@/tipos/compartido/contrato_empresa_activa'

export function ProveedorEmpresaActiva({ empresas, children }: ProveedorEmpresaActivaProps) {
  const inicial = empresas.find((empresa) => catalogoCompartido.sesion_actual.ruc.includes(empresa.ruc)) ?? empresas[0] ?? null
  const [codigo, setCodigo] = useState(inicial?.codigo)

  const valor = {
    empresas,
    empresaActiva: empresas.find((empresa) => empresa.codigo === codigo) ?? null,
    seleccionarEmpresa: setCodigo,
  }

  return <ContextoEmpresaActiva.Provider value={valor}>{children}</ContextoEmpresaActiva.Provider>
}
