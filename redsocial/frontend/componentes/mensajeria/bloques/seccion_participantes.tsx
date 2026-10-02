import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import type { ParticipanteVL } from '@/tipos/mensajeria/modelo_mensajes_videollamada_en_curso'

export function SeccionParticipantes({
  participantesAbiertos,
  CONTEO_PARTICIPANTES_EN_CURSO,
  setParticipantesAbiertos,
  PARTICIPANTES,
}: {
  participantesAbiertos: boolean
  CONTEO_PARTICIPANTES_EN_CURSO: { total: number; todos: number; enLinea: number; invitados: number; }
  setParticipantesAbiertos: (valor: boolean | ((actual: boolean) => boolean)) => void
  PARTICIPANTES: ParticipanteVL[]
}) {
  return (
    <aside
      className={
        'flex w-75 flex-none min-h-0 flex-col rounded-14 border border-borde bg-white p-3.5 ' +
        'max-1100:fixed max-1100:inset-y-0 max-1100:right-0 max-1100:z-30 max-1100:w-minlista max-1100:rounded-none max-1100:transition-transform max-1100:duration-200 ' +
        (participantesAbiertos ? 'max-1100:translate-x-0' : 'max-1100:translate-x-full')
      }
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.botones.participantes} ({CONTEO_PARTICIPANTES_EN_CURSO.total})</h2>
        <BotonIcono icono="cerrar" type="button" aria-label={catalogoMensajeria.botones.cerrar} onClick={() => setParticipantesAbiertos(false)} variant="sutil" size="md" />
      </div>

      <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_participantes} className="mb-2.5 w-full" />

      <div className="mb-2.5 flex gap-1.5 overflow-x-auto">
        <button type="button" className="inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-20 border border-primario bg-primario px-2.75 py-1.25 text-boton font-medium text-white">
          {catalogoMensajeria.filtros.todos} <span className="text-contador">{CONTEO_PARTICIPANTES_EN_CURSO.todos}</span>
        </button>
        <button type="button" className="inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-20 border border-borde bg-white px-2.75 py-1.25 text-boton font-medium text-texto-suave">
          {catalogoMensajeria.filtros.en_linea} <span className="text-contador">{CONTEO_PARTICIPANTES_EN_CURSO.enLinea}</span>
        </button>
        <button type="button" className="inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-20 border border-borde bg-white px-2.75 py-1.25 text-boton font-medium text-texto-suave">
          {catalogoMensajeria.filtros.invitados} <span className="text-contador">{CONTEO_PARTICIPANTES_EN_CURSO.invitados}</span>
        </button>
        <button type="button" aria-label={catalogoMensajeria.botones.mas_filtros} className="grid h-6.5 w-6.5 flex-none place-items-center rounded-20 border border-borde bg-white text-boton font-medium text-texto-suave">+</button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {PARTICIPANTES.map((p) => (
          <article key={p.nombre} className="flex items-center gap-2 py-1.75">
            <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
            <div className="min-w-0 flex-1">
              <strong className="block truncate text-nombre-entidad text-texto">{p.nombre}</strong>
              <span className="block text-auxiliar text-texto-suave">{p.rol}</span>
            </div>
            <Icono name={p.micActivo ? 'microfono' : 'microfono-apagado'} className={'h-3.75 w-3.75 flex-none ' + (p.micActivo ? 'text-exito' : 'text-peligro')} />
            <Icono name={p.videoActivo ? 'video' : 'video-apagado'} className={'h-3.75 w-3.75 flex-none ' + (p.videoActivo ? 'text-exito' : 'text-peligro')} />
            <button type="button" aria-label={catalogoMensajeria.botones.mas_opciones} className="grid h-5.5 w-5.5 flex-none place-items-center border-0 bg-transparent text-texto-suave">
              <Icono name="puntos" className="h-3.5 w-3.5" />
            </button>
          </article>
        ))}
      </div>

      <div className="mt-2.5 grid gap-2 border-t border-borde pt-2.5">
        <Boton type="button" variant="secundario" size="default" className="w-full">
          <Icono name="enlace" className="h-3.5 w-3.5" /> {catalogoMensajeria.botones.invitar_por_enlace}
        </Boton>
        <Boton type="button" variant="secundario" size="default" className="w-full">
          <Icono name="microfono-apagado" className="h-3.5 w-3.5" /> {catalogoMensajeria.botones.silenciar_a_todos}
        </Boton>
      </div>
    </aside>
  )
}
