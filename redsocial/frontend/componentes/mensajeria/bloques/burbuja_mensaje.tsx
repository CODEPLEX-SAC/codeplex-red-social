import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { AdjuntoMensaje } from './adjunto_mensaje'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Menu } from '../../compartido/interfaz/menu'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { BurbujaMensajeProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion

export function BurbujaMensaje({ mensaje, fecha, propio, autor, presencia, posicion, acciones, fijado, cita, onResponder, onEditar, onReenviar, onFijar, onEliminar }: BurbujaMensajeProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const inicioDeGrupo = posicion === 'sola' || posicion === 'primera'
  const finDeGrupo = posicion === 'sola' || posicion === 'ultima'
  const esquinas = propio ? clases.esquinas_propia[posicion] : clases.esquinas_ajena[posicion]
  const elementos: ElementoMenu[] = [
    ...(acciones.responder ? [{ etiqueta: textos.acciones.responder, icono: 'responder' as const, alHacerClick: () => onResponder(mensaje.id) }] : []),
    ...(acciones.editar ? [{ etiqueta: textos.acciones.editar, icono: 'editar-oficial' as const, alHacerClick: () => onEditar(mensaje.id) }] : []),
    ...(acciones.reenviar ? [{ etiqueta: textos.acciones.reenviar, icono: 'flecha-derecha' as const, alHacerClick: () => onReenviar(mensaje.id) }] : []),
    ...(acciones.fijar ? [{ etiqueta: fijado ? textos.acciones.desfijar : textos.acciones.fijar, icono: 'fijar' as const, alHacerClick: () => onFijar(mensaje.id) }] : []),
    ...(acciones.eliminar ? [{ etiqueta: textos.acciones.eliminar, icono: 'eliminar' as const, peligro: true, divisor: true, alHacerClick: () => onEliminar(mensaje.id) }] : []),
  ]
  const menu = (
    <span className={`${clases.menu_ranura} ${propio ? clases.menu_ranura_propia : clases.menu_ranura_ajena}`}>
      <BotonIcono
        icono="puntos"
        type="button"
        aria-label={textos.opciones_mensaje}
        aria-haspopup="menu"
        aria-expanded={Boolean(ancla)}
        onClick={(evento) => setAncla(evento.currentTarget)}
        variant="discreto"
        size="tactil"
        data-abierto={Boolean(ancla)}
        className={clases.menu_boton}
      />
      <Menu ancla={ancla} alCerrar={() => setAncla(null)} elementos={elementos} />
    </span>
  )
  const meta = mensaje.hora && <span className={clases.meta}>{mensaje.hora}</span>

  return (
    <div data-mensaje={mensaje.id}>
      {fecha && <div className={clases.fecha}>{fecha}</div>}
      <div className={`${clases.mensaje} ${propio ? clases.mensaje_propio : clases.mensaje_ajeno} ${finDeGrupo ? clases.fin_grupo : clases.dentro_grupo}`}>
        {autor && inicioDeGrupo && <span className={clases.autor}>{autor.nombre}</span>}
        <div className={`${clases.fila_mensaje} ${propio ? clases.fila_propia : ''}`}>
          {autor && (finDeGrupo ? <AvatarUsuario tamano="xs" nombre={autor.nombre} estado={presencia} /> : <span className={clases.avatar_hueco} />)}
          <div className={`${clases.cuerpo} ${propio ? clases.cuerpo_propio : clases.cuerpo_ajeno}`}>
            {menu}
            {mensaje.reenviado && (
              <span className={clases.reenviado}>
                <Icono name="flecha-derecha" className={clases.reenviado_icono} /> {textos.reenviado}
              </span>
            )}
            {cita && (
              <div className={clases.cita}>
                <span className={clases.cita_autor}>{cita.autor}</span>
                <span className={clases.cita_cuerpo}>{cita.resumen}</span>
              </div>
            )}
            {mensaje.contenido && <div className={`${clases.burbuja} ${propio ? clases.burbuja_propia : clases.burbuja_ajena} ${esquinas}`}>{mensaje.contenido}</div>}
            {mensaje.adjunto && <AdjuntoMensaje adjunto={mensaje.adjunto} propio={propio} />}
          </div>
        </div>
        {meta}
        {mensaje.reaccion && (
          <div className={clases.reacciones}>
            <span className={clases.reaccion}>
              <Icono name={mensaje.reaccion.icono} className={clases.reaccion_icono} /> <span className={clases.reaccion_cantidad}>{mensaje.reaccion.cantidad}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
