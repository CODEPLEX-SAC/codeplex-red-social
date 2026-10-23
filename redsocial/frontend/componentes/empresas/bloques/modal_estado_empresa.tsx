import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Modal } from '../../compartido/interfaz/modal'
import { estaInactiva } from './logica_listado_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { BotonVariant } from '@/tipos/compartido/contrato_boton'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ModalEstadoEmpresaProps } from '@/tipos/empresas/contrato_listado_empresas'

export function ModalEstadoEmpresa({ empresa, alConfirmar, alCerrar }: ModalEstadoEmpresaProps) {
  const textos = estaInactiva(empresa) ? catalogoEmpresas.modal_activar : catalogoEmpresas.modal_desactivar
  const cabecera = (
    <div className="flex flex-none justify-end px-4 pt-4">
      <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="discreto" size="default" />
    </div>
  )

  return (
    <Modal
      titulo={textos.titulo}
      etiquetaCerrar={textosRedSocial.CERRAR}
      onCerrar={alCerrar}
      cabecera={cabecera}
      className="max-w-100 rounded-2xl max-600:mx-4 max-600:w-auto max-600:flex-1"
    >
      <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto px-6 pb-6 text-center">
        <span className={`grid h-16 w-16 flex-none place-items-center rounded-full ${textos.circulo}`}>
          <Icono name={textos.icono as IconName} className="h-8 w-8" />
        </span>
        <h2 className={catalogoEmpresas.clases.titulo_ventana}>{textos.titulo}</h2>
        <p className="m-0 text-subtitulo leading-texto text-texto">
          {textos.pregunta_antes} <strong className="font-titulo text-texto">{textos.comilla_abre}{empresa.nombre}{textos.comilla_cierra}</strong>
          {textos.pregunta_despues}
        </p>
        <p className={catalogoEmpresas.clases.texto_descriptivo}>{textos.detalle}</p>
        <div className="mt-2 flex w-full gap-3 max-480:flex-col-reverse">
          <Boton type="button" variant="secundario" size="md" onClick={alCerrar} className="flex-1">
            {textos.cancelar}
          </Boton>
          <Boton type="button" variant={textos.boton as BotonVariant} size="md" onClick={alConfirmar} className="flex-1">
            <Icono name={textos.icono_confirmar as IconName} className="w-4 h-4" />
            {textos.confirmar}
          </Boton>
        </div>
      </div>
    </Modal>
  )
}
