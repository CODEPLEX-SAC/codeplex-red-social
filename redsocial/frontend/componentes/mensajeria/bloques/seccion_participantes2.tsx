import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BuscadorContactosInvitar } from './buscador_contactos_invitar'
import { FilaParticipanteLlamada } from './fila_participante_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { SeccionParticipantesPreparacionProps } from '@/tipos/mensajeria/contrato_preparacion_llamada'

const textos = catalogoMensajeria.videollamada.textos.invitaciones
const clases = catalogoMensajeria.videollamada.clases.invitaciones
const MENSAJE_COPIA = { ninguna: String(), copiado: textos.copiado, error: textos.copiar_error }

export function SeccionParticipantes2({ participantes, contactos, invitaciones, enlaceReunion }: SeccionParticipantesPreparacionProps) {
  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo}>
        {textos.participantes} ({participantes.length})
      </h2>
      {participantes.map((participante) => (
        <FilaParticipanteLlamada key={participante.id} participante={participante} />
      ))}

      <h3 className={clases.subtitulo}>{textos.invitar_mas}</h3>
      <BuscadorContactosInvitar contactos={contactos} invitaciones={invitaciones} />

      <Boton type="button" variant="secundario" size="default" className={clases.copiar} onClick={() => void invitaciones.copiarEnlace(enlaceReunion)}>
        <Icono name="enlace" className="h-3.5 w-3.5" /> {textos.copiar}
      </Boton>
      <p aria-live="polite" className={clases.aviso}>
        {MENSAJE_COPIA[invitaciones.copia]}
      </p>
    </section>
  )
}
