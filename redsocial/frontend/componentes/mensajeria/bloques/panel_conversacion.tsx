import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { IconName } from '../../../tipos/compartido/contrato_icono'
import type { PanelConversacionProps } from '@/tipos/mensajeria/contrato_conversacion'

export function PanelConversacion({ conversacion, onVolver, oculta }: PanelConversacionProps) {
  return (
    <section data-zona="panel-conversacion" className={'grid min-h-0 min-w-0 grid-cols-1 grid-rows-auto-auto-1fr-auto rounded-control border border-borde ' + (oculta ? 'max-900:hidden' : '')}>
      <header className="flex items-center gap-2.5 rounded-t-control border-b border-borde bg-white px-4.5 py-3">
        <span className="hidden max-900:block">
          <BotonIcono icono="flecha-izquierda" type="button" aria-label={catalogoMensajeria.conversacion.volver_a_la_lista} onClick={onVolver} variant="discreto" size="default" />
        </span>
        <AvatarImagen src={usuarioImg} className="h-10 w-10 flex-none rounded-full bg-primario-suave" />
        <div className="min-w-0 flex-1">
          <strong className="block text-nombre-entidad font-bold text-texto">{conversacion.nombre}</strong>
          {conversacion.enLinea && (
            <span className="mt-0.5 flex items-center gap-1.25 text-etiqueta-estado text-exito">
              <span className="h-1.5 w-1.5 rounded-full bg-exito" /> {catalogoMensajeria.conversacion.en_linea}
            </span>
          )}
        </div>
        <div className="flex flex-none gap-1.5">
          <BotonIcono icono="video" type="button" aria-label={catalogoMensajeria.conversacion.videollamada} variant="contorno" size="default" />
          <BotonIcono icono="llamada" type="button" aria-label={catalogoMensajeria.conversacion.llamada} variant="contorno" size="default" />
          <BotonIcono icono="informacion" type="button" aria-label={catalogoMensajeria.conversacion.informacion} variant="contorno" size="default" />
        </div>
      </header>

      <div className="flex items-start gap-2.5 border-b border-borde bg-t-faf9fc px-4.5 py-3">
        <div className="min-w-0 flex-1">
          <strong className="mb-0.5 flex items-center gap-1.25 text-nombre-entidad font-bold text-texto">
            <Icono name="fijar" className="h-3.25 w-3.25 text-primario" /> {catalogoMensajeria.conversacion.mensaje_fijado}
          </strong>
          <p className="m-0 text-cuerpo text-texto-suave">{conversacion.mensajeFijado}</p>
        </div>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} variant="discreto" size="sm" className="flex-none" />
      </div>

      <div className="min-h-0 min-w-0 overflow-y-auto bg-t-fbfaff p-5">
        {conversacion.hilo.map((m) => {
          const meta = (m.hora || m.confirmado) && (
            <span className="flex items-center gap-1 text-auxiliar text-texto-suave">
              {m.hora}
              {m.confirmado && <span className="text-primario">✓✓</span>}
            </span>
          )
          return (
            <div key={m.id}>
              {m.fecha && <div className="my-4 mb-2.5 text-center text-fecha-abreviada text-t-aaa7b5">{m.fecha}</div>}
              <div className={'mb-2 flex max-w-p75 flex-col gap-0.5 ' + (m.propio ? 'ml-auto items-end text-right' : 'items-start')}>
                {m.propio && meta}
                {m.contenido && (
                  <div
                    className={
                      'my-1.5 max-w-full rounded-xl px-3.5 py-2.5 text-cuerpo leading-normal ' +
                      (m.propio ? 'rounded-tr-sm bg-primario text-white' : 'rounded-tl-sm border border-borde bg-white text-texto')
                    }
                  >
                    {m.contenido}
                  </div>
                )}
                {m.adjunto && (
                  <div className="my-2 flex items-center gap-2.5 rounded-control border border-borde bg-white px-3.5 py-2.5">
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-t-fdeceb text-negativo-kpi">
                      <Icono name="caja" className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-auxiliar font-semibold text-texto">{m.adjunto.nombre}</strong>
                      <span className="block text-auxiliar text-texto-suave">{m.adjunto.peso}</span>
                    </span>
                    <BotonIcono icono="flecha-abajo" type="button" aria-label={catalogoMensajeria.conversacion.descargar} variant="contorno" size="md" className="flex-none" />
                  </div>
                )}
                {!m.propio && meta}
                {m.reaccion && (
                  <div className="mt-1 flex gap-1">
                    <span className="inline-flex items-center gap-0.75 rounded-xl border border-borde bg-white px-2 py-0.5 text-auxiliar">
                      {m.reaccion.emoji} <span className="text-contador text-texto-suave">{m.reaccion.cantidad}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <form className="flex items-center gap-2 rounded-b-control border-t border-borde bg-white px-4.5 py-3">
<div className="min-w-0 flex-1">
          <CampoTexto marcador={catalogoMensajeria.placeholders.escribe_un_mensaje} inputProps={{ [catalogoCompartido.controles.atributo_accesible]: catalogoMensajeria.conversacion.mensaje }} />
        </div>
        <div className="flex flex-none gap-1">
          <BotonIcono icono="adjuntar" type="button" aria-label={catalogoMensajeria.conversacion.adjuntar_archivo} variant="discreto" size="default" />
          <BotonIcono icono="imagen" type="button" aria-label={catalogoMensajeria.conversacion.enviar_imagen} variant="discreto" size="default" />
          <BotonIcono icono={'sentimiento' as IconName} type="button" aria-label={catalogoMensajeria.conversacion.emojis} variant="discreto" size="default" />
          <Boton type="button" variant="secundario" size="mini">{catalogoMensajeria.conversacion.gif}</Boton>
        </div>
        <BotonIcono icono="enviar" type="submit" aria-label={textosRedSocial.ENVIAR} variant="primario" size="default" className="flex-none" />
      </form>
    </section>
  )
}
