import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { usarVistaMovil } from '../../compartido/interfaz/usar_vista_movil'
import { CuadriculaParticipantes } from './cuadricula_participantes'
import { DisposicionMovilSala } from './disposicion_movil_sala'
import { EscenarioPresentacion } from './escenario_presentacion'
import { TarjetaSolitaria } from './tarjeta_solitaria'
import type { usarSalaLlamada } from './usar_sala_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ApoyoLienzoSala } from '@/tipos/mensajeria/contrato_lienzo_sala'

const catalogo = catalogoMensajeria.videollamada
const clases = catalogo.clases.sala
const UMBRAL_MOVIL = 2

function contenidoDelLienzo(sala: ReturnType<typeof usarSalaLlamada>, apoyo: ApoyoLienzoSala, movil: boolean) {
  const { puerto, imagenPresentacion, presentador, fijado } = apoyo
  if (movil && UMBRAL_MOVIL < sala.todos.length) return <DisposicionMovilSala sala={sala} {...apoyo} />
  if (sala.presentacion && presentador) return <EscenarioPresentacion presentacion={sala.presentacion} presentador={presentador.nombre} imagen={imagenPresentacion} onDetener={sala.detenerPresentacion} />
  if (sala.todos.length === 1 && fijado === null) return <TarjetaSolitaria participante={sala.todos[0]} flujo={puerto.flujoDe(sala.todos[0].id)} />
  return <CuadriculaParticipantes participantes={sala.visibles} todos={sala.todos} flujoDe={puerto.flujoDe} reaccion={sala.reaccion} fijado={fijado} pagina={sala.pagina} totalPaginas={sala.totalPaginas} onPagina={sala.cambiarPagina} />
}

export function LienzoSala({ sala, ...apoyo }: { sala: ReturnType<typeof usarSalaLlamada> } & ApoyoLienzoSala) {
  const movil = usarVistaMovil()

  return (
    <div className={clases.lienzo}>
      {catalogo.modo_demostracion && <p className={clases.aviso_demostracion}>{catalogo.textos.demostracion_aviso}</p>}
      {sala.errorPresentacion && (
        <p aria-live="polite" className={clases.error_captura}>
          {catalogo.textos.sala.errores_captura[sala.errorPresentacion]}
          <BotonIcono icono="cerrar" type="button" aria-label={catalogo.textos.sala.cerrar_aviso} variant="discreto" size="sm" onClick={sala.descartarError} />
        </p>
      )}
      {sala.aviso && (
        <p aria-live="polite" className={clases.error_captura}>
          {sala.aviso}
          <BotonIcono icono="cerrar" type="button" aria-label={catalogo.textos.sala.cerrar_aviso} variant="discreto" size="sm" onClick={sala.descartarAviso} />
        </p>
      )}
      {contenidoDelLienzo(sala, apoyo, movil)}
    </div>
  )
}
