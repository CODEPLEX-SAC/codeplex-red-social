import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { Icono } from '../../compartido/icono'

export function BloqueEnLlamada({
  REUNION_EN_CURSO,
  setParticipantesAbiertos,
  CONTEO_PARTICIPANTES_EN_CURSO,
}: {
  REUNION_EN_CURSO: { titulo: string; horario: string; duracion: string; }
  setParticipantesAbiertos: (valor: boolean | ((actual: boolean) => boolean)) => void
  CONTEO_PARTICIPANTES_EN_CURSO: { total: number; todos: number; enLinea: number; invitados: number; }
}) {
  return (
    <header className="flex flex-wrap items-center gap-4 rounded-xl border border-borde bg-white px-4 py-3">
      <div className="min-w-50 flex-1">
        <strong className="block text-nombre-entidad text-texto">{REUNION_EN_CURSO.titulo}</strong>
        <p className="m-0 mt-0.5 flex flex-wrap items-center gap-2 text-auxiliar text-texto-suave">
          <span>{REUNION_EN_CURSO.horario}</span>
          <span className="inline-flex items-center gap-1.25 text-exito">
            <span className="h-1.75 w-1.75 rounded-full bg-exito" /> {catalogoMensajeria.leyendas.en_llamada}
          </span>
          <span className="tabular-nums">{REUNION_EN_CURSO.duracion}</span>
        </p>
      </div>
      <div className="flex flex-none items-center gap-2">
        <button type="button" aria-label={catalogoMensajeria.botones.ver_participantes} onClick={() => setParticipantesAbiertos(true)} className="inline-flex h-8.5 items-center gap-1.5 rounded-lg border-0 bg-primario-suave px-3 text-boton font-bold text-primario">
          <Icono name="usuarios" className="h-3.75 w-3.75" /> {CONTEO_PARTICIPANTES_EN_CURSO.total}
        </button>
        <button type="button" aria-label={catalogoMensajeria.botones.chat} className="grid h-8.5 w-8.5 flex-none place-items-center rounded-lg border-0 bg-t-f6f4ff text-texto">
          <Icono name="comentario" className="h-4 w-4" />
        </button>
        <button type="button" aria-label={catalogoMensajeria.botones.seguridad_llamada} className="grid h-8.5 w-8.5 flex-none place-items-center rounded-lg border-0 bg-t-f6f4ff text-texto">
          <Icono name="escudo" className="h-4 w-4" />
        </button>
        <button type="button" aria-label={catalogoMensajeria.botones.grabando_llamada} className="grid h-8.5 w-8.5 flex-none place-items-center rounded-lg border-0 bg-t-fdecec text-peligro">
          <Icono name="punto-circular" className="h-4 w-4" />
        </button>
        <button type="button" aria-label={catalogoMensajeria.botones.mas_opciones} className="grid h-8.5 w-8.5 flex-none place-items-center rounded-lg border-0 bg-t-f6f4ff text-texto">
          <Icono name="puntos" className="h-4 w-4" />
        </button>
      </div>
      <a href={catalogoMensajeria.rutas.videollamadas} className="inline-flex h-9.5 flex-none items-center gap-1.75 whitespace-nowrap rounded-lg bg-peligro px-4 text-boton font-bold text-white no-underline">
        <Icono name="llamada" className="h-3.75 w-3.75 rotate-135" /> {catalogoMensajeria.botones.salir_de_la_llamada}
      </a>
    </header>
  )
}
