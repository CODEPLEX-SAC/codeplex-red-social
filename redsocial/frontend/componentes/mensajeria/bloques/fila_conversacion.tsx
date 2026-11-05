import { useRef, useState } from 'react'
import type { MouseEvent, PointerEvent } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import { ContadorConversacion, HoraConversacion } from './meta_conversacion'
import { ZonaAvatarConversacion } from './zona_avatar_conversacion'
import { accionesDeConversacion, estaSinLeer } from './logica_acciones_conversacion'
import { ejecutarAccionConversacion, elementosMenuConversacion } from './elementos_menu_conversacion'
import { ModalConfirmarConversacion } from './modal_confirmar_conversacion'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { FilaConversacionProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'
import type { AccionConversacion } from '@/tipos/mensajeria/contrato_acciones_conversacion'

const clases = catalogoMensajeria.clases.lista
const textos = catalogoMensajeria.acciones_conversacion

export function FilaConversacion({ conversacion: c, activa, tactil, estadoHistorias, acciones, onSeleccionar, onTocar, onAbrirHistorias }: FilaConversacionProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const [pendiente, setPendiente] = useState<AccionConversacion | null>(null)
  const ranuraRef = useRef<HTMLDivElement>(null)
  const marcadaManual = c.noLeidos === 0 && estaSinLeer(c)

  const elementos = elementosMenuConversacion(accionesDeConversacion(c), (accion) => ejecutarAccionConversacion(accion, acciones), setPendiente)

  function alTocar(evento: PointerEvent<HTMLElement>) {
    if (evento.pointerType === 'touch') onTocar(c.id)
  }

  function abrirMenuContextual(evento: MouseEvent<HTMLElement>) {
    evento.preventDefault()
    setAncla(ranuraRef.current?.firstElementChild as HTMLElement | null)
  }

  return (
    <div
      data-fila-conversacion={c.id}
      data-activa={activa}
      data-tactil={tactil}
      data-abierto={Boolean(ancla)}
      onPointerDown={alTocar}
      onContextMenu={abrirMenuContextual}
      className={`${clases.fila} ${activa ? clases.fila_activa : clases.fila_inactiva}`}
    >
      <div className={clases.zona_avatar}><ZonaAvatarConversacion conversacion={c} estadoHistorias={estadoHistorias} onAbrirHistorias={onAbrirHistorias} /></div>
      <button type="button" aria-current={activa ? 'true' : undefined} onClick={() => onSeleccionar(c.id)} className={clases.principal}>
        <span className={clases.linea}>
          <strong className={clases.nombre}>{c.nombre}</strong>
          <HoraConversacion conversacion={c} marcadaManual={marcadaManual} />
        </span>
        <span className={clases.linea}>
          <small className={`${clases.extracto} ${c.origenActividad === 'historia' ? clases.extracto_historia : ''}`.trim()}>{c.vistaPrevia}</small>
          <ContadorConversacion conversacion={c} marcadaManual={marcadaManual} />
        </span>
      </button>
      <div ref={ranuraRef} className={clases.ranura_menu}>
        <BotonIcono
          icono="puntos"
          type="button"
          data-boton-menu
          data-abierto={Boolean(ancla)}
          aria-label={textos.aria_menu.replace(':nombre', c.nombre)}
          aria-haspopup="menu"
          aria-expanded={Boolean(ancla)}
          variant="discreto"
          size="sm"
          className={clases.boton_menu}
          onClick={(evento) => setAncla(evento.currentTarget)}
        />
        <Menu elementos={elementos} ancla={ancla} alCerrar={() => setAncla(null)} />
      </div>
      {pendiente && (
        <ModalConfirmarConversacion
          tipo={pendiente.actionId === 'abandonar_grupo' ? 'abandonar_grupo' : 'eliminar_chat'}
          nombre={c.nombre}
          onConfirmar={() => {
            ejecutarAccionConversacion(pendiente, acciones)
            setPendiente(null)
          }}
          onCancelar={() => setPendiente(null)}
        />
      )}
    </div>
  )
}
