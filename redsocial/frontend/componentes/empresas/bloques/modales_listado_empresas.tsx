import { ModalDetalleEmpresa } from './modal_detalle_empresa'
import { ModalEditarEmpresa } from './modal_editar_empresa'
import { ModalEmpresa } from './modal_empresa'
import { ModalEstadoEmpresa } from './modal_estado_empresa'
import { ModalLimiteEmpresas } from './modal_limite_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ModalesListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const claves = catalogoEmpresas.claves_modal

export function ModalesListadoEmpresas({ acciones, datosDetalle }: ModalesListadoEmpresasProps) {
  const { detalle, empresaDetalle, empresaACambiar, edicion, empresaEdicion } = acciones

  return (
    <>
      {detalle && empresaDetalle ? (
        <ModalDetalleEmpresa key={[detalle.codigo, detalle.pestana].join(claves.separador)} empresa={empresaDetalle} totalEmpresas={acciones.todas.length} pestanaInicial={detalle.pestana} datosDetalle={datosDetalle} usuariosGuardados={acciones.usuariosEditados[detalle.codigo]} alCerrar={acciones.cerrarDetalle} />
      ) : null}
      {edicion && empresaEdicion ? (
        <ModalEditarEmpresa key={edicion.codigo} empresa={empresaEdicion} totalEmpresas={acciones.todas.length} pestanaInicial={edicion.pestana} datosDetalle={datosDetalle} usuariosGuardados={acciones.usuariosEditados[edicion.codigo]} alCerrar={acciones.cerrarEdicion} alGuardar={acciones.guardarEdicion} />
      ) : null}
      {empresaACambiar ? (
        <ModalEstadoEmpresa empresa={empresaACambiar} alConfirmar={acciones.confirmarCambioEstado} alCerrar={acciones.cerrarCambioEstado} />
      ) : null}
      {acciones.avisoLimiteAbierto && acciones.limiteEmpresas ? <ModalLimiteEmpresas limite={acciones.limiteEmpresas} totalEmpresas={acciones.todas.length} alCerrar={acciones.cerrarAvisoLimite} /> : null}
      {acciones.modalAbierto ? <ModalEmpresa totalExistentes={acciones.todas.length} alCerrar={acciones.cerrarModal} alGuardar={acciones.registrar} /> : null}
    </>
  )
}
