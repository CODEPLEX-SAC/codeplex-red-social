import { Icono } from '../../compartido/icono'
import { TextoTruncable } from '../../compartido/interfaz/texto_truncable'
import { extensionDe, formatoDeAdjunto } from './logica_adjuntos'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { TarjetaDocumentoProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion.adjuntos

export function TarjetaDocumento({ adjunto }: TarjetaDocumentoProps) {
  const clave = formatoDeAdjunto(adjunto)
  const definicion = textos.formatos[clave]
  const extension = adjunto.extension || extensionDe(adjunto.nombre) || definicion.etiqueta
  const contenido = (
    <>
      <span className={`${clases.adjunto_icono} ${definicion.tono}`}>
        <Icono name={definicion.icono as 'archivo-pdf'} className={clases.adjunto_glifo} />
      </span>
      <span className={clases.adjunto_texto}>
        <TextoTruncable texto={adjunto.nombre} dosLineas className={clases.adjunto_nombre} />
        <span className={clases.adjunto_peso}>
          <span className={clases.adjunto_extension}>{extension}</span> · {adjunto.peso}
        </span>
      </span>
    </>
  )

  if (adjunto.url === undefined) {
    return (
      <div className={`${clases.adjunto} ${clases.adjunto_sin_archivo}`} data-formato={clave} title={textos.etiquetas.sin_archivo}>
        {contenido}
      </div>
    )
  }
  return (
    <a href={adjunto.url} download={adjunto.nombre} aria-label={textos.etiquetas.descargar_archivo.replace(':nombre', adjunto.nombre)} className={`${clases.adjunto} ${clases.adjunto_enlace}`} data-formato={clave}>
      {contenido}
    </a>
  )
}
