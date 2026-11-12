import type { MouseEvent } from 'react'
import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { VideoFlujo } from './video_flujo'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { TarjetaSolitariaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos
const clases = catalogoMensajeria.videollamada.clases.sala

function elegir<T>(activo: boolean, siActivo: T, siInactivo: T): T {
  if (activo) return siActivo
  return siInactivo
}

function EstadoDispositivo({ activo, icono, iconoApagado, textoActivo, textoInactivo }: { activo: boolean; icono: IconName; iconoApagado: IconName; textoActivo: string; textoInactivo: string }) {
  return (
    <span className={elegir(activo, clases.estado_pastilla, clases.estado_pastilla_alerta)}>
      <Icono name={elegir(activo, icono, iconoApagado)} className="h-4 w-4" />
      {elegir(activo, textoActivo, textoInactivo)}
    </span>
  )
}

function pantallaCompleta(evento: MouseEvent<HTMLElement>) {
  void evento.currentTarget.closest('section')?.requestFullscreen?.()
}

export function TarjetaSolitaria({ participante, flujo }: TarjetaSolitariaProps) {
  const conVideo = flujo !== null && participante.camaraActiva

  return (
    <section aria-label={participante.nombre} className={clases.solitaria}>
      {conVideo && <VideoFlujo flujo={flujo} etiqueta={participante.nombre} silenciado={participante.local} className={clases.media} />}
      {!conVideo && <img src={participante.fotografia} alt="" className={clases.foto_difuminada} />}
      <BotonIcono icono="pantalla-completa" type="button" aria-label={textos.sala.pantalla_completa} variant="llamada" size="default" className={clases.pantalla_completa} onClick={pantallaCompleta} />
      {conVideo && <p className={clases.solitaria_aviso_video}>{textos.sala.solo}</p>}
      {!conVideo && (
        <div className={clases.solitaria_contenido}>
          <img src={participante.fotografia} alt={participante.nombre} className={clases.solitaria_foto} />
          <h2 className={clases.solitaria_nombre}>{participante.nombre}</h2>
          {participante.organizador && <span className={clases.solitaria_rol}>{textos.sala.organizador}</span>}
          <p className={clases.solitaria_mensaje}>{textos.sala.solo}</p>
        </div>
      )}
      <div className={clases.solitaria_estados}>
        <EstadoDispositivo activo={participante.micActivo} icono="microfono" iconoApagado="microfono-apagado" textoActivo={textos.invitaciones.microfono_activo} textoInactivo={textos.invitaciones.microfono_inactivo} />
        <EstadoDispositivo activo={participante.camaraActiva} icono="video" iconoApagado="video-apagado" textoActivo={textos.invitaciones.camara_activa} textoInactivo={textos.invitaciones.camara_inactiva} />
      </div>
    </section>
  )
}
