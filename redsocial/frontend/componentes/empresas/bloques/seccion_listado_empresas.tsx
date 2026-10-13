import { CabeceraEmpresas } from './cabecera_empresas'
import { FiltrosEmpresas } from './filtros_empresas'
import { ModalDesactivarEmpresa } from './modal_desactivar_empresa'
import { ModalDetalleEmpresa } from './modal_detalle_empresa'
import { ModalEditarEmpresa } from './modal_editar_empresa'
import { ModalEmpresa } from './modal_empresa'
import { PieListadoEmpresas } from './pie_listado_empresas'
import { TablaEmpresas } from './tabla_empresas'
import { usarAccionesEmpresas } from './usar_acciones_empresas'
import { usarListadoEmpresas } from './usar_listado_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { SeccionListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

export function SeccionListadoEmpresas({ empresas, datosDetalle }: SeccionListadoEmpresasProps) {
  const acciones = usarAccionesEmpresas(empresas)
  const listado = usarListadoEmpresas(acciones.todas)
  const { detalle, empresaDetalle, empresaADesactivar, edicion, empresaEdicion } = acciones

  return (
    <section aria-label={catalogoEmpresas.titulos.listado} className="flex flex-col">
      <CabeceraEmpresas alNuevaEmpresa={acciones.abrirModal} />
      <FiltrosEmpresas listado={listado} />
      <TablaEmpresas listado={listado} alElegirAccion={acciones.elegirAccion} />
      <PieListadoEmpresas listado={listado} />
      {detalle && empresaDetalle ? (
        <ModalDetalleEmpresa key={detalle.codigo + detalle.pestana} empresa={empresaDetalle} pestanaInicial={detalle.pestana} datosDetalle={datosDetalle} usuariosGuardados={acciones.usuariosEditados[detalle.codigo]} alCerrar={acciones.cerrarDetalle} />
      ) : null}
      {edicion && empresaEdicion ? (
        <ModalEditarEmpresa key={edicion.codigo} empresa={empresaEdicion} pestanaInicial={edicion.pestana} datosDetalle={datosDetalle} usuariosGuardados={acciones.usuariosEditados[edicion.codigo]} alCerrar={acciones.cerrarEdicion} alGuardar={acciones.guardarEdicion} />
      ) : null}
      {empresaADesactivar ? (
        <ModalDesactivarEmpresa empresa={empresaADesactivar} alConfirmar={acciones.confirmarDesactivacion} alCerrar={acciones.cerrarDesactivacion} />
      ) : null}
      {acciones.modalAbierto ? <ModalEmpresa totalExistentes={acciones.todas.length} alCerrar={acciones.cerrarModal} alGuardar={acciones.registrar} /> : null}
    </section>
  )
}
