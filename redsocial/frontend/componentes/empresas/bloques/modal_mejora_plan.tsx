import { Modal } from '../../compartido/interfaz/modal'
import { PasoPlanesMejora } from './paso_planes_mejora'
import { PasoResumenMejora } from './paso_resumen_mejora'
import { usarMejoraPlanEmpresa } from './usar_mejora_plan_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ModalMejoraPlanProps } from '@/tipos/empresas/contrato_mejora_plan'

const textos = catalogoEmpresas.planes_asignados.mejora

export function ModalMejoraPlan(props: ModalMejoraPlanProps) {
  const { modulo, suscripcion, capacidad, alCerrar } = props
  const mejora = usarMejoraPlanEmpresa(props)

  return (
    <Modal titulo={textos.titulo.replace(':aplicativo', suscripcion.nombre)} etiquetaCerrar={textos.cerrar} onCerrar={alCerrar} className={textos.clases.modal}>
      {mejora.opcion ? (
        <PasoResumenMejora suscripcion={suscripcion} capacidad={capacidad} datos={mejora.datos} opcion={mejora.opcion} alVolver={mejora.volver} alCancelar={alCerrar} alContinuar={mejora.continuar} />
      ) : (
        <PasoPlanesMejora modulo={modulo} suscripcion={suscripcion} capacidad={capacidad} datos={mejora.datos} alElegir={mejora.elegir} />
      )}
    </Modal>
  )
}
