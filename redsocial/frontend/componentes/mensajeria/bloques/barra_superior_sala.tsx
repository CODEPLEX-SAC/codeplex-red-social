import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Tooltip } from '../../compartido/interfaz/tooltip'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { BarraSuperiorSalaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos.sala
const clases = catalogoMensajeria.videollamada.clases.sala

export function BarraSuperiorSala({ reunion, duracion, total, onParticipantes, onChat, onSalir, extra }: BarraSuperiorSalaProps) {
  return (
    <header className={clases.barra_superior}>
      <div className={clases.barra_identidad}>
        <span className={clases.barra_marca}>{textosRedSocial.MARCA}</span>
        <div className={clases.barra_titulo}>
          <strong className={clases.barra_nombre}>{reunion.titulo}</strong>
          <Tooltip texto={`${textos.informacion}: ${reunion.horario}`}>
            <span className={clases.barra_info}>
              <Icono name="informacion" className="h-4 w-4" />
            </span>
          </Tooltip>
          <span role="timer" aria-label={duracion} className={clases.barra_temporizador}>
            {duracion}
          </span>
        </div>
      </div>
      <div className={clases.barra_acciones}>
        {extra}
        <Boton type="button" variant="filtro" size="filtro" activo aria-label={textos.participantes_boton} onClick={onParticipantes}>
          <Icono name="grupo" className="h-4 w-4" /> {total}
        </Boton>
        <Tooltip texto={textos.chat}>
          <BotonIcono icono="comentario" type="button" aria-label={textos.chat} variant="default" size="default" onClick={onChat} />
        </Tooltip>
        <Tooltip texto={textos.seguridad}>
          <BotonIcono icono="escudo" type="button" aria-label={textos.seguridad} variant="default" size="default" disabled />
        </Tooltip>
      </div>
      <Boton type="button" variant="peligro" size="cta" className={clases.barra_salir} onClick={onSalir}>
        <Icono name="llamada" className="h-4 w-4 rotate-135" /> {textos.salir}
      </Boton>
    </header>
  )
}
