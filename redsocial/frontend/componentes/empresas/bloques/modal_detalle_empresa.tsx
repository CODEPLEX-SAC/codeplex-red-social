import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import { Pestanas } from '../../compartido/interfaz/pestanas'
import { CabeceraModalEmpresa } from './cabecera_modal_empresa'
import { CabeceraResumenEmpresa } from './cabecera_resumen_empresa'
import { ContenidoPestanaEmpresa } from './contenido_pestana_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ModalDetalleEmpresaProps, PestanaDetalleEmpresa } from '@/tipos/empresas/contrato_detalle_empresa'

const textos = catalogoEmpresas.detalle_empresa
const CLAVES_PESTANAS = Object.keys(textos.pestanas)
const ETIQUETAS_PESTANAS: Record<string, string> = textos.pestanas
const ICONOS_PESTANAS = textos.iconos_pestana as Record<string, IconName>

export function ModalDetalleEmpresa({ empresa, totalEmpresas, pestanaInicial, datosDetalle, usuariosGuardados, alCerrar }: ModalDetalleEmpresaProps) {
  const [pestana, setPestana] = useState<PestanaDetalleEmpresa>(pestanaInicial)

  function cambiarPestana(clave: string) {
    setPestana(clave as PestanaDetalleEmpresa)
  }

  return (
    <Modal
      titulo={textos.titulo}
      etiquetaCerrar={textosRedSocial.CERRAR}
      onCerrar={alCerrar}
      cabecera={<CabeceraModalEmpresa titulo={textos.titulo} subtitulo={textos.subtitulo} alCerrar={alCerrar} />}
      className="max-w-225 rounded-2xl max-600:h-full max-600:rounded-none"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-4">
        <CabeceraResumenEmpresa empresa={empresa} />
        <Pestanas
          className="px-6 max-480:px-4"
          activa={pestana}
          alCambiar={cambiarPestana}
          elementos={CLAVES_PESTANAS.map((clave) => ({ clave, etiqueta: ETIQUETAS_PESTANAS[clave], icono: ICONOS_PESTANAS[clave] }))}
        />
        <ContenidoPestanaEmpresa empresa={empresa} pestana={pestana} datosDetalle={datosDetalle} usuariosGuardados={usuariosGuardados} totalEmpresas={totalEmpresas} />
      </div>
      <div className="flex flex-none justify-end border-t border-borde px-6 py-4 max-480:px-4">
        <Boton type="button" variant="secundario" size="md" onClick={alCerrar} className="max-480:w-full">
          {textos.cerrar}
        </Boton>
      </div>
    </Modal>
  )
}
