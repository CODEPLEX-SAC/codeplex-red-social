import { EncabezadoListadoEmpresas } from './encabezado_listado_empresas'
import { MensajeEstadoBusqueda } from '../../compartido'
import { ModalesListadoEmpresas } from './modales_listado_empresas'
import { PieListadoEmpresas } from './pie_listado_empresas'
import { TablaEmpresas } from './tabla_empresas'
import { usarAccionesEmpresas } from './usar_acciones_empresas'
import { usarListadoEmpresas } from './usar_listado_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { SeccionListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

export function SeccionListadoEmpresas({ empresas, fuente, datosDetalle }: SeccionListadoEmpresasProps) {
  const acciones = usarAccionesEmpresas(empresas)
  const listado = usarListadoEmpresas(acciones.todas, acciones.suscripciones, fuente)

  return (
    <section aria-label={catalogoEmpresas.titulos.listado} className="flex flex-col">
      <EncabezadoListadoEmpresas empresas={acciones.todas} listado={listado} alNuevaEmpresa={acciones.abrirModal} />
      <MensajeEstadoBusqueda estado={listado.estadoBusqueda} error={listado.errorBusqueda} sinCoincidencias={false} />
      <TablaEmpresas listado={listado} alElegirAccion={acciones.elegirAccion} alAlternarModulo={acciones.alternarModulo} />
      <PieListadoEmpresas listado={listado} />
      <ModalesListadoEmpresas acciones={acciones} datosDetalle={datosDetalle} />
    </section>
  )
}
