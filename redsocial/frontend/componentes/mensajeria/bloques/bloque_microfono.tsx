import { Icono } from '../../compartido/icono'
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
      <button type="button" onClick={() => setMicActivo((v) => !v)} className="flex flex-none flex-col items-center gap-1 rounded-control border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/8">
        <span className="relative flex items-center">
          <Icono name="microfono" className={'h-4.75 w-4.75 ' + (micActivo ? 'text-exito' : '')} />
          <Icono name="flecha-arriba" className="ml-0.5 h-2.75 w-2.75" />
        </span>
        <small className="whitespace-nowrap text-boton">{catalogoMensajeria.botones.microfono}</small>
      </button>
      <button type="button" onClick={() => setCamaraActivo((v) => !v)} className="flex flex-none flex-col items-center gap-1 rounded-control border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/8">
        <span className="relative flex items-center">
          <Icono name="video" className={'h-4.75 w-4.75 ' + (camaraActivo ? 'text-exito' : '')} />
          <Icono name="flecha-arriba" className="ml-0.5 h-2.75 w-2.75" />
        </span>
        <small className="whitespace-nowrap text-boton">{catalogoMensajeria.botones.camara}</small>
      </button>
      <button type="button" className="flex flex-none flex-col items-center gap-1 rounded-control border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/8">
        <Icono name="pantalla-compartida" className="h-4.75 w-4.75" />
        <small className="whitespace-nowrap text-boton">{catalogoMensajeria.botones.compartir_pantalla}</small>
      </button>
      <button type="button" onClick={() => setParticipantesAbiertos(true)} className="flex flex-none flex-col items-center gap-1 rounded-control border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/8">
        <span className="relative flex items-center">
          <Icono name="usuarios" className="h-4.75 w-4.75" />
          <span className="absolute -right-2.5 -top-1.5 grid h-3.75 min-w-3.75 place-items-center rounded-lg bg-primario px-0.75 text-contador font-bold text-white">{CONTEO_PARTICIPANTES_EN_CURSO.total}</span>
        </span>
        <small className="whitespace-nowrap text-boton">{catalogoMensajeria.botones.participantes}</small>
      </button>
      <button type="button" className="flex flex-none flex-col items-center gap-1 rounded-control border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/8">
        <Icono name="comentario" className="h-4.75 w-4.75" />
        <small className="whitespace-nowrap text-boton">{catalogoMensajeria.botones.chat}</small>
      </button>
      <button type="button" className="flex flex-none flex-col items-center gap-1 rounded-control border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/8">
        <Icono name="sentimiento" className="h-4.75 w-4.75" />
        <small className="whitespace-nowrap text-boton">{catalogoMensajeria.botones.reacciones}</small>
      </button>
      <button type="button" className="flex flex-none flex-col items-center gap-1 rounded-control border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/8">
        <Icono name="puntos" className="h-4.75 w-4.75" />
        <small className="whitespace-nowrap text-boton">{catalogoMensajeria.botones.mas}</small>
      </button>
      <a href={catalogoMensajeria.rutas.videollamadas} aria-label={catalogoMensajeria.botones.salir_de_la_llamada} className="ml-2 grid h-11.5 w-11.5 flex-none place-items-center rounded-full bg-peligro text-white">
        <Icono name="llamada" className="h-4.75 w-4.75 rotate-135" />
      </a>
    </div>
  )
}
