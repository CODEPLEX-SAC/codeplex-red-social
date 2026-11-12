import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { AvatarImagen, Icono, imagenEventoPredeterminada as imagenEvento } from '../../compartido'
import type { ItemEventoLateralProps } from '@/tipos/eventos/contrato_item_evento_lateral'

const clases = catalogoEventos.clases_evento_lateral

export function ItemEventoLateral({ evento, conBorde }: ItemEventoLateralProps) {
  return (
    <article className={conBorde ? `${clases.item} ${clases.borde}` : clases.item}>
      <div className={clases.imagen_caja}>
        <AvatarImagen src={imagenEvento} className={clases.imagen} />
        <div className={clases.insignia}>
          <span className={clases.dia}>{evento.dia}</span>
          <span className={clases.mes}>{evento.mes}</span>
        </div>
      </div>
      <div className={clases.cuerpo}>
        <span className={clases.nombre}>{evento.nombre}</span>
        <span className={clases.dato}>
          <Icono name="calendario" className={clases.icono} /> {evento.fechaHora}
        </span>
        {evento.ubicacion && (
          <span className={clases.dato}>
            <Icono name="ubicacion" className={clases.icono} /> {evento.ubicacion}
          </span>
        )}
        <span className={clases.dato_asistentes}>
          <Icono name="grupo" className={clases.icono} /> {evento.asistentes}
        </span>
      </div>
    </article>
  )
}
