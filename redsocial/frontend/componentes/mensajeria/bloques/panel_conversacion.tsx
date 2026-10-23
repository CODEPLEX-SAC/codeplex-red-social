import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { IconName } from '../../../tipos/compartido/contrato_icono'
import type { PanelConversacionProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion

export function PanelConversacion({ conversacion, onVolver, oculta }: PanelConversacionProps) {
  return (
    <section data-zona="panel-conversacion" className={`${clases.contenedor} ${oculta ? clases.oculta : ''}`}>
      <header className={clases.cabecera}>
        <span className={clases.volver}>
          <BotonIcono icono="flecha-izquierda" type="button" aria-label={textos.volver_a_la_lista} onClick={onVolver} variant="discreto" size="default" />
        </span>
        <AvatarUsuario tamano="md" imagen={usuarioImg} estado={conversacion.enLinea ? 'conectado' : undefined} />
        <div className={clases.identidad}>
          <strong className={clases.nombre}>{conversacion.nombre}</strong>
          {conversacion.enLinea && (
            <span className={clases.estado}>{textos.en_linea}</span>
          )}
        </div>
        <div className={clases.acciones}>
          <BotonIcono icono="video" type="button" aria-label={textos.videollamada} variant="contorno" size="default" />
          <BotonIcono icono="llamada" type="button" aria-label={textos.llamada} variant="contorno" size="default" />
          <BotonIcono icono="informacion" type="button" aria-label={textos.informacion} variant="contorno" size="default" />
        </div>
      </header>

      <div className={clases.fijado}>
        <div className={clases.fijado_texto}>
          <strong className={clases.fijado_titulo}>
            <Icono name="fijar" className={clases.fijado_icono} /> {textos.mensaje_fijado}
          </strong>
          <p className={clases.fijado_cuerpo}>{conversacion.mensajeFijado}</p>
        </div>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} variant="discreto" size="sm" className="flex-none" />
      </div>

      <div className={clases.hilo}>
        {conversacion.hilo.map((m) => {
          const meta = (m.hora || m.confirmado) && (
            <span className={clases.meta}>
              {m.hora}
              {m.confirmado && <Icono name={'doble-check' as IconName} className={clases.leido} />}
            </span>
          )
          return (
            <div key={m.id}>
              {m.fecha && <div className={clases.fecha}>{m.fecha}</div>}
              <div className={`${clases.mensaje} ${m.propio ? clases.mensaje_propio : clases.mensaje_ajeno}`}>
                {m.propio && meta}
                {m.contenido && <div className={`${clases.burbuja} ${m.propio ? clases.burbuja_propia : clases.burbuja_ajena}`}>{m.contenido}</div>}
                {m.adjunto && (
                  <div className={clases.adjunto}>
                    <span className={clases.adjunto_icono}>
                      <Icono name="archivo-pdf" className={clases.adjunto_glifo} />
                    </span>
                    <span className={clases.adjunto_texto}>
                      <strong className={clases.adjunto_nombre}>{m.adjunto.nombre}</strong>
                      <span className={clases.adjunto_peso}>{m.adjunto.peso}</span>
                    </span>
                    <BotonIcono icono="flecha-abajo" type="button" aria-label={textos.descargar} variant="contorno" size="md" className="flex-none" />
                  </div>
                )}
                {!m.propio && meta}
                {m.reaccion && (
                  <div className={clases.reacciones}>
                    <span className={clases.reaccion}>
                      {m.reaccion.emoji} <span className={clases.reaccion_cantidad}>{m.reaccion.cantidad}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <form className={clases.composicion}>
        <div className={clases.campo}>
          <CampoTexto marcador={catalogoMensajeria.placeholders.escribe_un_mensaje} inputProps={{ [catalogoCompartido.controles.atributo_accesible]: textos.mensaje }} />
        </div>
        <div className={clases.herramientas}>
          <BotonIcono icono="adjuntar" type="button" aria-label={textos.adjuntar_archivo} variant="discreto" size="default" />
          <BotonIcono icono="imagen" type="button" aria-label={textos.enviar_imagen} variant="discreto" size="default" />
          <BotonIcono icono={'sentimiento' as IconName} type="button" aria-label={textos.emojis} variant="discreto" size="default" />
          <Boton type="button" variant="secundario" size="mini" className="self-center">{textos.gif}</Boton>
          <BotonIcono icono="enviar" type="submit" aria-label={textosRedSocial.ENVIAR} variant="primario" size="default" className={clases.enviar} />
        </div>
      </form>
    </section>
  )
}
