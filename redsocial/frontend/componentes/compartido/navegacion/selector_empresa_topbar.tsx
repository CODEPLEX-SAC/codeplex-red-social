import { useMemo } from 'react'
import { buscarOpcionesLocales } from '../interfaz/buscar_opciones_locales'
import { SelectorBuscable } from '../interfaz/selector_buscable'
import { usarEmpresaActiva } from '../sesion/usar_empresa_activa'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { OpcionBuscable } from '@/tipos/compartido/contrato_selector_buscable'

const configuracion = catalogoCompartido.selector_empresa
const SESION_ACTUAL = catalogoCompartido.sesion_actual

function aOpcion(empresa: Empresa): OpcionBuscable {
  return { id: empresa.codigo, titulo: empresa.nombre, subtitulo: configuracion.ruc.replace(':ruc', empresa.ruc), terminos: `${empresa.nombre} ${empresa.ruc}` }
}

export function SelectorEmpresaTopbar() {
  const { empresas, empresaActiva, seleccionarEmpresa } = usarEmpresaActiva()
  const fuente = useMemo(() => buscarOpcionesLocales(empresas.map(aOpcion)), [empresas])
  const seleccionada = empresaActiva ? aOpcion(empresaActiva) : { id: SESION_ACTUAL.id, titulo: SESION_ACTUAL.empresa, subtitulo: SESION_ACTUAL.ruc, terminos: '' }

  return <SelectorBuscable className="w-74 shrink max-1100:hidden" seleccionada={seleccionada} fuente={fuente} limite={empresas.length} textos={configuracion.textos} icono="empresa" alSeleccionar={seleccionarEmpresa} />
}
