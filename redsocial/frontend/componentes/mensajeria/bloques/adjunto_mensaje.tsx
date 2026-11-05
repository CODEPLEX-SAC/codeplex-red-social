import { useState } from 'react'
import { Modal } from '../../compartido/interfaz/modal'
import { ReproductorAudio } from '../../compartido/interfaz/reproductor_audio'
import { TarjetaDocumento } from './tarjeta_documento'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { AdjuntoMensajeProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion

function ImagenAdjunta({ adjunto }: Pick<AdjuntoMensajeProps, 'adjunto'>) {
  const [ampliada, setAmpliada] = useState(false)
  return (
    <>
      <button type="button" aria-label={`${textos.adjuntos.etiquetas.ver_imagen}: ${adjunto.nombre}`} onClick={() => setAmpliada(true)} className={clases.imagen}>
        <img src={adjunto.url} alt={adjunto.nombre} className={clases.imagen_archivo} />
      </button>
      {ampliada && (
        <Modal titulo={adjunto.nombre} etiquetaCerrar={textos.adjuntos.etiquetas.cerrar_imagen} onCerrar={() => setAmpliada(false)}>
          <img src={adjunto.url} alt={adjunto.nombre} className={clases.imagen_ampliada} />
        </Modal>
      )}
    </>
  )
}

export function AdjuntoMensaje({ adjunto, propio }: AdjuntoMensajeProps) {
  if (adjunto.tipo === 'imagen') return <ImagenAdjunta adjunto={adjunto} />
  if (adjunto.tipo === 'audio') return <ReproductorAudio url={adjunto.url} duracion={adjunto.duracion} picos={adjunto.picos} semilla={adjunto.url ?? adjunto.nombre} propio={propio} etiquetas={textos.adjuntos.etiquetas} />
  return <TarjetaDocumento adjunto={adjunto} />
}
