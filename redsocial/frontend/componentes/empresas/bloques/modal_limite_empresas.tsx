import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { irARuta } from '../../compartido/interfaz/menu'
import { Modal } from '../../compartido/interfaz/modal'
import { RUTA_MARKETPLACE_EMPRESAS } from './logica_suscripciones_empresas'
import { rellenarPlantilla } from './logica_resumen_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ModalLimiteEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const textos = catalogoEmpresas.limite
const clases = textos.clases

export function ModalLimiteEmpresas({ limite, totalEmpresas, alCerrar }: ModalLimiteEmpresasProps) {
  const detalle = rellenarPlantilla(textos.detalle, { plan: limite.suscripcion.planNombre, producto: limite.suscripcion.nombre, limite: limite.limite, usadas: totalEmpresas })

  function irAMarketplace() {
    alCerrar()
    irARuta(RUTA_MARKETPLACE_EMPRESAS)
  }

  return (
    <Modal
      titulo={textos.titulo}
      etiquetaCerrar={textosRedSocial.CERRAR}
      onCerrar={alCerrar}
      cabecera={
        <div className={clases.cabecera}>
          <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="discreto" size="default" />
        </div>
      }
      className={clases.modal}
    >
      <div className={clases.cuerpo}>
        <span className={clases.icono_caja}>
          <Icono name={textos.icono as IconName} className={clases.icono} />
        </span>
        <h2 className={catalogoEmpresas.clases.titulo_ventana}>{textos.titulo}</h2>
        <p className={catalogoEmpresas.clases.texto_descriptivo}>{detalle}</p>
        <div className={clases.botones}>
          <Boton type="button" variant="secundario" size="md" onClick={alCerrar} className="flex-1">
            {textos.cancelar}
          </Boton>
          <Boton type="button" variant="primario" size="md" onClick={irAMarketplace} className="flex-1">
            {textos.ir_marketplace}
          </Boton>
        </div>
      </div>
    </Modal>
  )
}
