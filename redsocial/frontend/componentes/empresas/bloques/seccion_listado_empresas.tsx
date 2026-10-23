import { EncabezadoListadoEmpresas } from './encabezado_listado_empresas'
import { ModalEstadoEmpresa } from './modal_estado_empresa'
import { ModalDetalleEmpresa } from './modal_detalle_empresa'
import { ModalEditarEmpresa } from './modal_editar_empresa'
import { ModalEmpresa } from './modal_empresa'
import { ModalLimiteEmpresas } from './modal_limite_empresas'
import { PieListadoEmpresas } from './pie_listado_empresas'
import { TablaEmpresas } from './tabla_empresas'
import { usarAccionesEmpresas } from './usar_acciones_empresas'
import { usarListadoEmpresas } from './usar_listado_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { SeccionListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

export function SeccionListadoEmpresas({ empresas, datosDetalle }: SeccionListadoEmpresasProps) {
  const acciones = usarAccionesEmpresas(empresas)
  const listado = usarListadoEmpresas(acciones.todas, acciones.suscripciones)
  const { detalle, empresaDetalle, empresaACambiar, edicion, empresaEdicion } = acciones

  return (
    <section aria-label={catalogoEmpresas.titulos.listado} className="flex flex-col">
      <EncabezadoListadoEmpresas empresas={acciones.todas} listado={listado} alNuevaEmpresa={acciones.abrirModal} />
      <TablaEmpresas listado={listado} alElegirAccion={acciones.elegirAccion} alAlternarModulo={acciones.alternarModulo} />
      <PieListadoEmpresas listado={listado} />
      {detalle && empresaDetalle ? (
        <ModalDetalleEmpresa key={detalle.codigo + detalle.pestana} empresa={empresaDetalle} totalEmpresas={acciones.todas.length} pestanaInicial={detalle.pestana} datosDetalle={datosDetalle} usuariosGuardados={acciones.usuariosEditados[detalle.codigo]} alCerrar={acciones.cerrarDetalle} />
      ) : null}
      {edicion && empresaEdicion ? (
        <ModalEditarEmpresa key={edicion.codigo} empresa={empresaEdicion} totalEmpresas={acciones.todas.length} pestanaInicial={edicion.pestana} datosDetalle={datosDetalle} usuariosGuardados={acciones.usuariosEditados[edicion.codigo]} alCerrar={acciones.cerrarEdicion} alGuardar={acciones.guardarEdicion} />
      ) : null}
      {empresaACambiar ? (
        <ModalEstadoEmpresa empresa={empresaACambiar} alConfirmar={acciones.confirmarCambioEstado} alCerrar={acciones.cerrarCambioEstado} />
      ) : null}
      {acciones.avisoLimiteAbierto && acciones.limiteEmpresas ? <ModalLimiteEmpresas limite={acciones.limiteEmpresas} totalEmpresas={acciones.todas.length} alCerrar={acciones.cerrarAvisoLimite} /> : null}
      {acciones.modalAbierto ? <ModalEmpresa totalExistentes={acciones.todas.length} alCerrar={acciones.cerrarModal} alGuardar={acciones.registrar} /> : null}
    </section>
  )
}
