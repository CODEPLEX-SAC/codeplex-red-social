import type { FormEvent } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import { CabeceraModalEmpresa } from './cabecera_modal_empresa'
import { SeccionIdentificacionEmpresa } from './seccion_identificacion_empresa'
import { SeccionInformacionEmpresa } from './seccion_informacion_empresa'
import { SeccionLogoEmpresa } from './seccion_logo_empresa'
import { usarFormularioEmpresa } from './usar_formulario_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ModalEmpresaProps } from '@/tipos/empresas/contrato_formulario_empresa'

const textos = catalogoEmpresas.modal_empresa

export function ModalEmpresa({ totalExistentes, alCerrar, alGuardar }: ModalEmpresaProps) {
  const formulario = usarFormularioEmpresa(totalExistentes)

  function guardar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (formulario.puedeGuardar) alGuardar(formulario.construirEmpresa())
  }

  return (
    <Modal
      titulo={textos.titulo}
      etiquetaCerrar={textosRedSocial.CERRAR}
      onCerrar={alCerrar}
      cabecera={<CabeceraModalEmpresa titulo={textos.titulo} subtitulo={textos.subtitulo} alCerrar={alCerrar} />}
      className="max-w-140 rounded-2xl max-600:h-full max-600:rounded-none"
    >
      <form onSubmit={guardar} noValidate className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 pb-4 pt-6">
          <SeccionIdentificacionEmpresa formulario={formulario} />
          <SeccionInformacionEmpresa formulario={formulario} />
          <SeccionLogoEmpresa formulario={formulario} />
        </div>
        <div className="flex flex-none items-center justify-end gap-3 border-t border-borde px-5 py-4 max-480:flex-col-reverse max-480:items-stretch">
          <Boton type="button" variant="secundario" size="md" onClick={alCerrar}>
            {textos.cancelar}
          </Boton>
          <Boton type="submit" variant="primario" size="md" disabled={!formulario.puedeGuardar}>
            <Icono name="guardar" className="w-4 h-4" />
            {textos.guardar}
          </Boton>
        </div>
      </form>
    </Modal>
  )
}
