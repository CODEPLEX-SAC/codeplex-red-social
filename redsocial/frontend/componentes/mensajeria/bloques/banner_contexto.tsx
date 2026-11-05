import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { BannerContextoProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat

export function BannerContexto({ titulo, cuerpo, etiquetaCancelar, onCancelar }: BannerContextoProps) {
  return (
    <div className={clases.banner_edicion}>
      <div className={clases.banner_edicion_texto}>
        <strong className={clases.banner_edicion_titulo}>{titulo}</strong>
        <span className={clases.banner_edicion_cuerpo}>{cuerpo}</span>
      </div>
      <BotonIcono icono="cerrar" type="button" aria-label={etiquetaCancelar} onClick={onCancelar} variant="discreto" size="sm" className={clases.boton_descarga} />
    </div>
  )
}
