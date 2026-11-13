import { EscenarioPresentacion } from './escenario_presentacion'
import { FranjaParticipantesMovil } from './franja_participantes_movil'
import { TarjetaParticipante } from './tarjeta_participante'
import type { usarSalaLlamada } from './usar_sala_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ApoyoLienzoSala } from '@/tipos/mensajeria/contrato_lienzo_sala'

const clases = catalogoMensajeria.videollamada.clases.sala

export function DisposicionMovilSala({ sala, puerto, imagenPresentacion, presentador, fijado }: { sala: ReturnType<typeof usarSalaLlamada> } & ApoyoLienzoSala) {
  const local = sala.todos.find((participante) => participante.local)
  const otros = sala.todos.filter((participante) => !participante.local)
  const destacado = fijado ?? otros[0]
  const presentando = sala.presentacion !== null && presentador !== undefined
  const resto = otros.filter((participante) => presentando || participante.id !== destacado?.id)

  return (
    <>
      {sala.presentacion && presentador ? (
        <div className={clases.movil_presentacion}>
          <EscenarioPresentacion presentacion={sala.presentacion} presentador={presentador.nombre} imagen={imagenPresentacion} onDetener={sala.detenerPresentacion} />
        </div>
      ) : (
        destacado && (
          <div className={clases.movil_principal}>
            <TarjetaParticipante participante={destacado} flujo={puerto.flujoDe(destacado.id)} reaccion={sala.reaccion} />
          </div>
        )
      )}
      <FranjaParticipantesMovil muestra={resto} total={sala.todos.length} local={local} flujoLocal={local ? puerto.flujoDe(local.id) : null} reaccion={sala.reaccion} alAbrirParticipantes={() => sala.alternarPanel('participantes')} />
    </>
  )
}
