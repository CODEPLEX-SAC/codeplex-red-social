import { irARuta } from '../../compartido/interfaz/menu'
import { BarraSuperiorSala } from './barra_superior_sala'
import { LienzoSala } from './lienzo_sala'
import { ModalInformarProblema } from './modal_informar_problema'
import { ModalSalirLlamada } from './modal_salir_llamada'
import { PanelesSala } from './paneles_sala'
import { PieSala } from './pie_sala'
import { SelectorDemostracion } from './selector_demostracion'
import { usarInvitaciones } from './usar_invitaciones'
import { usarSalaLlamada } from './usar_sala_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { SalaVideollamadaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const catalogo = catalogoMensajeria.videollamada
const clases = catalogo.clases.sala

export function SalaVideollamada({ reunion, puerto, generar, contactos, enlaceReunion, imagenPresentacion, maximoParticipantes, alEscribir, cantidadInicial, microfonoInicial = true, camaraInicial = true }: SalaVideollamadaProps) {
  const sala = usarSalaLlamada({ generar, cantidadInicial: cantidadInicial ?? reunion.participantes.length, duracionInicial: reunion.duracion, puerto, simulable: catalogo.modo_demostracion, microfonoInicial, camaraInicial })
  const invitaciones = usarInvitaciones(puerto)
  const presentador = sala.todos.find((participante) => participante.id === sala.presentacion?.idParticipante)
  const fijado = sala.todos.find((participante) => participante.id === sala.fijado) ?? null
  const salirDeLaLlamada = () => irARuta(catalogoMensajeria.rutas.videollamadas)

  async function finalizarParaTodos() {
    sala.cerrarSalida()
    const resultado = await sala.finalizarParaTodos()
    if (resultado.exito || catalogo.modo_demostracion) salirDeLaLlamada()
  }

  const opciones = catalogo.cantidades_demostracion.filter((cantidad) => maximoParticipantes >= cantidad)

  return (
    <div className={clases.pagina} data-sala>
      <BarraSuperiorSala
        reunion={reunion}
        duracion={sala.duracion}
        total={sala.todos.length}
        onParticipantes={() => sala.alternarPanel('participantes')}
        onSalir={sala.esOrganizador ? sala.abrirSalida : salirDeLaLlamada}
        onDetalles={sala.abrirDetalles}
        extra={catalogo.modo_demostracion ? <SelectorDemostracion cantidad={sala.cantidad} opciones={opciones} onCambiar={sala.cambiarCantidad} /> : undefined}
      />

      <div className={clases.cuerpo}>
        <div className={clases.escenario}>
          <LienzoSala sala={sala} puerto={puerto} imagenPresentacion={imagenPresentacion} presentador={presentador} fijado={fijado} />
          <PieSala sala={sala} />
        </div>

        <PanelesSala sala={sala} reunion={reunion} contactos={contactos} invitaciones={invitaciones} enlaceReunion={enlaceReunion} alEscribir={alEscribir} alAbandonar={salirDeLaLlamada} />
      </div>

      {sala.saliendo && sala.todos.length !== 1 && <ModalSalirLlamada onAbandonar={salirDeLaLlamada} onFinalizar={() => void finalizarParaTodos()} onCerrar={sala.cerrarSalida} />}
      {sala.informando && <ModalInformarProblema onEnviar={sala.informarProblema} onCerrar={sala.cerrarInforme} />}
    </div>
  )
}
