import type { ReactNode } from 'react'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ParticipanteSala } from '@/tipos/mensajeria/contrato_integracion_llamada'

const textos = catalogoMensajeria.videollamada.textos.invitaciones
const clases = catalogoMensajeria.videollamada.clases.invitaciones

function conexionDe(participante: ParticipanteSala): string {
  if (participante.organizador) return catalogoMensajeria.leyendas.organizador
  if (participante.invitado) return textos.invitado
  return textos.en_linea
}

export function FilaParticipanteLlamada({ participante, accion, fijado = false }: { participante: ParticipanteSala; accion?: ReactNode; fijado?: boolean }) {
  return (
    <article className={clases.fila}>
      <AvatarUsuario tamano="sm" imagen={participante.fotografia} estado={participante.enLinea ? 'conectado' : undefined} />
      <div className={clases.cuerpo}>
        <strong className={clases.nombre}>{participante.nombre}</strong>
        <span className={clases.estado}>{conexionDe(participante)}</span>
      </div>
      <span className={clases.indicadores}>
        {fijado && (
          <span role="img" aria-label={catalogoMensajeria.videollamada.textos.sala.fijado}>
            <Icono name="fijar" className={clases.icono_fijado} />
          </span>
        )}
        {participante.manoLevantada && (
          <span role="img" aria-label={catalogoMensajeria.videollamada.textos.sala.mano_levantada}>
            <Icono name="mano" className={clases.icono_mano} />
          </span>
        )}
        <span role="img" aria-label={participante.micActivo ? textos.microfono_activo : textos.microfono_inactivo}>
          <Icono name={participante.micActivo ? 'microfono' : 'microfono-apagado'} className={participante.micActivo ? clases.icono_activo : clases.icono_inactivo} />
        </span>
        <span role="img" aria-label={participante.camaraActiva ? textos.camara_activa : textos.camara_inactiva}>
          <Icono name={participante.camaraActiva ? 'video' : 'video-apagado'} className={participante.camaraActiva ? clases.icono_activo : clases.icono_inactivo} />
        </span>
      </span>
      {accion}
    </article>
  )
}
