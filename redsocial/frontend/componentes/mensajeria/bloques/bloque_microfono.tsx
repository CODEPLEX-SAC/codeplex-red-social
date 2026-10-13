import { Icono } from '../../compartido/icono'
import { ControlLlamada } from './control_llamada'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'

export function BloqueMicrofono({
  setMicActivo,
  micActivo,
  setCamaraActivo,
  camaraActivo,
  setParticipantesAbiertos,
  CONTEO_PARTICIPANTES_EN_CURSO,
}: {
  setMicActivo: (valor: boolean | ((actual: boolean) => boolean)) => void
  micActivo: boolean
  setCamaraActivo: (valor: boolean | ((actual: boolean) => boolean)) => void
  camaraActivo: boolean
  setParticipantesAbiertos: (valor: boolean | ((actual: boolean) => boolean)) => void
  CONTEO_PARTICIPANTES_EN_CURSO: { total: number; todos: number; enLinea: number; invitados: number; }
}) {
  return (
    <div className="flex max-w-full flex-none items-center gap-1 self-center overflow-x-auto rounded-14 bg-overlay-5 px-2.5 py-2">
      <ControlLlamada icono="microfono" clave="microfono" onClick={() => setMicActivo((v) => !v)} activo={micActivo} conFlecha />
      <ControlLlamada icono="video" clave="camara" onClick={() => setCamaraActivo((v) => !v)} activo={camaraActivo} conFlecha />
      <ControlLlamada icono="pantalla-compartida" clave="compartir_pantalla" />
      <ControlLlamada icono="grupo" clave="participantes" onClick={() => setParticipantesAbiertos(true)} conteo={CONTEO_PARTICIPANTES_EN_CURSO.total} />
      <ControlLlamada icono="comentario" clave="chat" />
      <ControlLlamada icono="sentimiento" clave="reacciones" />
      <ControlLlamada icono="puntos" clave="mas" />
      <a href={catalogoMensajeria.rutas.videollamadas} aria-label={catalogoMensajeria.botones.salir_de_la_llamada} className="ml-2 grid h-11.5 w-11.5 flex-none place-items-center rounded-full bg-peligro-texto text-white">
        <Icono name="llamada" className="h-4.5 w-4.5 rotate-135" />
      </a>
    </div>
  )
}
