import { posicionesDe } from '../../compartido/posiciones'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg, imagenEventoPredeterminada as imagenEvento } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { TarjetaInvitacionProps } from '@/tipos/eventos/contrato_invitacion'

export function TarjetaInvitacion({ inv }: TarjetaInvitacionProps) {
  return (
    <article className="grid grid-cols-140-1fr-auto overflow-hidden rounded-xl border border-gris-borde bg-white transition-shadow hover:shadow-t7 max-900:grid-cols-1">
      <div className="relative min-h-35 overflow-hidden max-900:min-h-40">
        <AvatarImagen src={imagenEvento} className="h-full w-full" />
        <div className="absolute left-3.5 top-3.5 rounded-control bg-white px-3 py-2 text-center shadow-t5">
          <span className="block text-dia-evento font-extrabold leading-1.1 text-texto">{inv.dia}</span>
          <span className="mt-px block text-mes-evento font-bold uppercase text-texto-suave">{inv.mes}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1.5 px-5 py-4">
        <div className="flex items-start justify-between gap-2">
          <TextoColor variante={inv.categoriaColor} className="inline-block text-etiqueta-estado font-bold uppercase tracking-wide">
            {inv.categoria}
          </TextoColor>
          {inv.estado === 'aceptada' && (
            <span className="hidden whitespace-nowrap rounded-lg bg-t-ecfdf5 px-3 py-1 text-etiqueta-estado font-semibold text-t-059669 max-900:inline-flex">
              {catalogoEventos.leyendas.estado_aceptada}
            </span>
          )}
        </div>
        <h3 className="m-0 text-nombre-entidad font-bold text-gris-oscuro-texto">{inv.nombre}</h3>
        <p className="m-0 text-cuerpo leading-snug text-gris-texto-secundario">{inv.descripcion}</p>
        <div className="flex flex-wrap gap-3 text-auxiliar text-gris-texto-secundario">
          <span className="flex items-center gap-1"><Icono name="calendario" className="w-3.5 h-3.5" /> {inv.fecha}</span>
          <span className="flex items-center gap-1"><Icono name="reloj" className="w-3.5 h-3.5" /> {inv.hora}</span>
          <span className="flex items-center gap-1"><Icono name="ubicacion" className="w-3.5 h-3.5" /> {inv.ubicacion}</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <div className="flex">
            {posicionesDe(inv.avatares).map((posicion) => (
              <img
                key={posicion.id}
                src={usuarioImg}
                alt=""
                className={'h-7 w-7 rounded-full border-2 border-white object-cover' + (posicion.orden > 0 ? ' -ml-2' : '')}
              />
            ))}
          </div>
          <div className="text-auxiliar leading-tight">
            <span className="block text-nombre-entidad font-semibold">{inv.invitador}</span>
            <span className="text-auxiliar text-gris-texto-terciario">{catalogoEventos.leyendas.te_ha_invitado}</span>
          </div>
        </div>
      </div>
      <div
        className={
          'flex flex-col justify-center gap-2 p-4 max-900:px-4 max-900:pb-4 max-900:pt-0 ' +
          (inv.estado === 'aceptada' ? '' : 'max-900:flex-row')
        }
      >
        {inv.estado === 'pendiente' ? (
          <>
            <Boton type="button" variant="primario" size="md" className="max-900:flex-1">{catalogoEventos.botones.aceptar}</Boton>
            <Boton type="button" variant="secundario" size="default" className="max-900:flex-1">{catalogoEventos.botones.tal_vez}</Boton>
            <Boton type="button" variant="peligro_contorno" size="default" className="max-900:flex-1">{catalogoEventos.botones.rechazar}</Boton>
          </>
        ) : inv.estado === 'aceptada' ? (
          <>
            <span className="flex items-center justify-center whitespace-nowrap rounded-lg bg-t-ecfdf5 px-4 py-2 text-boton font-semibold text-t-059669 max-900:hidden">
              {catalogoEventos.leyendas.estado_aceptada}
            </span>
            <Boton type="button" variant="secundario" size="default" className="max-900:order-2 max-900:w-full max-900:border-transparent max-900:bg-primario-suave max-900:font-bold max-900:text-primario">
              {catalogoEventos.botones.ver_evento}
            </Boton>
            <Boton type="button" variant="secundario" size="default" className="max-900:order-1 max-900:w-full">
              {catalogoEventos.botones.agregar_calendario}
            </Boton>
          </>
        ) : (
          <>
            <span className="flex items-center justify-center whitespace-nowrap rounded-lg bg-t-fef2f2 px-4 py-2 text-boton font-semibold text-rojo-categoria">
              {catalogoEventos.leyendas.estado_rechazada}
            </span>
            <Boton type="button" variant="secundario" size="default" className="max-900:flex-1">
              {catalogoEventos.botones.ver_evento}
            </Boton>
          </>
        )}
      </div>
    </article>
  )
}
