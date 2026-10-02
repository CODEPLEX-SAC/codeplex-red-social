import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { GruposRecomendadosPanelProps } from '@/tipos/compartido/contrato_grupos_recomendados'

export function GruposRecomendadosPanel({ titulo = textosRedSocial.GRUPOS_RECIENTES, grupos }: GruposRecomendadosPanelProps) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{titulo}</h2>
        <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      {grupos.map((g) => (
        <div key={g.nombre} className="flex items-center gap-2.5 py-2">
          <span className="h-9.5 w-9.5 flex-none rounded-9 bg-primario-suave" />
          <div className="min-w-0 flex-1">
            <strong className="block truncate text-nombre-entidad text-texto">{g.nombre}</strong>
            <span className="mt-0.5 block truncate text-auxiliar text-texto-suave">{g.miembros}</span>
          </div>
          <BotonIcono icono="mas" type="button" aria-label={textosRedSocial.UNIRSE} variant="contorno" size="md" className="flex-none" />
        </div>
      ))}
    </section>
  )
}
