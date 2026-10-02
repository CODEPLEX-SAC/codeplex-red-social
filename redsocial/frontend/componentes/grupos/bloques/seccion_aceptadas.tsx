import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import type { InvitacionAceptada, ColorGrupo } from '@/tipos/grupos/modelo_grupos_invitaciones'

export function SeccionAceptadas({
  CONTEO,
  ACEPTADAS,
  CLASES_ICONO_INV,
}: {
  CONTEO: { todas: number; pendientes: number; aceptadas: number; rechazadas: number; expiradas: number; }
  ACEPTADAS: InvitacionAceptada[]
  CLASES_ICONO_INV: Record<ColorGrupo, string>
}) {
  return (
    <section className="rounded-control border border-borde bg-white p-5">
      <h2 className="m-0 mb-3.5 text-titulo-seccion font-bold text-texto">{catalogoGrupos.filtros.aceptadas} ({CONTEO.aceptadas})</h2>
      {ACEPTADAS.map((a) => (
        <article key={a.nombre} className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-t-f0eef5 py-4 last:border-b-0 max-900:justify-between">
          <div className="flex min-w-0 flex-1-1-240 items-start gap-3">
            <div className={`grid h-11 w-11 flex-none place-items-center rounded-control text-white ${CLASES_ICONO_INV[a.color]}`}>
              <Icono name={a.icono} className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0">
              <h3 className="m-0 mb-px text-nombre-entidad font-bold text-texto">{a.nombre}</h3>
              <span className="text-auxiliar text-texto-suave">{a.tipo}</span>
            </div>
          </div>
          <div className="flex min-w-35 flex-none items-center gap-2">
            <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
            <div className="min-w-0">
              <strong className="block text-nombre-entidad font-semibold text-texto">{a.invitadoPor}</strong>
              <span className="text-fecha-abreviada text-texto-suave">{a.tiempo}</span>
            </div>
          </div>
          <div className="min-w-25 flex-none text-center max-900:ml-auto">
            <span className="block text-auxiliar text-texto-suave">{catalogoGrupos.leyendas.aceptaste_el}</span>
            <span className="text-fecha-abreviada font-semibold text-texto">{a.fecha}</span>
          </div>
          <div className="flex flex-none items-center gap-2 max-900:w-full max-900:justify-between">
            <span className="inline-flex h-7.5 items-center rounded-md border border-t-bbf7d0 bg-t-f0fdf4 px-3.5 text-etiqueta-estado font-semibold text-positivo-kpi">{catalogoGrupos.leyendas.en_grupo}</span>
            <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.opciones} variant="contorno" size="default" className="flex-none" />
          </div>
        </article>
      ))}
      <a href="#" className="flex items-center justify-center border-t border-t-f0eef5 p-3.5 text-enlace-accion font-semibold text-primario no-underline hover:underline">{catalogoGrupos.leyendas.ver_todas_aceptadas}</a>
    </section>
  )
}
