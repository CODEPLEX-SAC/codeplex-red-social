import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import { FilaParticipanteLlamada } from './fila_participante_llamada'
import { elementosDeParticipante, mensajeDeGestion } from './logica_menu_participante'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { AccionGestion, ParticipanteSala } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { ListaParticipantesSalaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const panel = catalogoMensajeria.videollamada.textos.panel
const clases = catalogoMensajeria.videollamada.clases.sala

function BotonOpciones({ participante, onAbrir }: { participante: ParticipanteSala; onAbrir: (ancla: HTMLElement) => void }) {
  return <BotonIcono icono="puntos" type="button" aria-haspopup="menu" aria-label={panel.gestion.replace(':nombre', participante.nombre)} variant="discreto" size="default" onClick={(evento) => onAbrir(evento.currentTarget)} />
}

export function ListaParticipantesSala({ participantes, esOrganizador, fijadoId, onFijar, onGestionar, onAviso }: ListaParticipantesSalaProps) {
  const [abierto, setAbierto] = useState<{ participante: ParticipanteSala; ancla: HTMLElement } | null>(null)

  async function gestionar(accion: AccionGestion, participante: ParticipanteSala) {
    const resultado = await onGestionar(accion, participante.id)
    onAviso(mensajeDeGestion(accion, resultado))
  }

  const elementos = abierto ? elementosDeParticipante({ participante: abierto.participante, esOrganizador, fijado: fijadoId === abierto.participante.id, alFijar: () => onFijar(abierto.participante.id), alGestionar: (accion) => void gestionar(accion, abierto.participante) }) : []

  return (
    <div className={clases.lista_seccion}>
      {participantes.map((participante) => (
        <FilaParticipanteLlamada
          key={participante.id}
          participante={participante}
          fijado={fijadoId === participante.id}
          accion={<BotonOpciones participante={participante} onAbrir={(ancla) => setAbierto({ participante, ancla })} />}
        />
      ))}
      {abierto && <Menu ancla={abierto.ancla} alCerrar={() => setAbierto(null)} elementos={elementos} />}
    </div>
  )
}
