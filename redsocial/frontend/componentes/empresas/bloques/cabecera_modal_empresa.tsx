import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { CabeceraModalEmpresaProps } from '@/tipos/empresas/contrato_formulario_empresa'

const textos = catalogoEmpresas.modal_empresa
const clases = textos.clases

export function CabeceraModalEmpresa({ titulo, subtitulo, alCerrar }: CabeceraModalEmpresaProps) {
  return (
    <div className={clases.cabecera}>
      <span className={clases.icono_cabecera}>
        <Icono name="empresa" className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <h2 className="m-0 text-nombre-entidad">{titulo}</h2>
        <p className="m-0 text-auxiliar opacity-80">{subtitulo}</p>
      </div>
      <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="discreto" size="default" className={clases.cerrar} />
    </div>
  )
}
