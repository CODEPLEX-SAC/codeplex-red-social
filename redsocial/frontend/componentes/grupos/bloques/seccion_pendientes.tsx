import { posicionesDe } from '../../compartido/posiciones'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import type { InvitacionPendiente, ColorGrupo } from '@/tipos/grupos/modelo_grupos_invitaciones'

export function SeccionPendientes({
  CONTEO,
  PENDIENTES,
  CLASES_ICONO_INV,
}: {
  CONTEO: { todas: number; pendientes: number; aceptadas: number; rechazadas: number; expiradas: number; }
  PENDIENTES: InvitacionPendiente[]
  CLASES_ICONO_INV: Record<ColorGrupo, string>
}) {
  return (
    <section className="mb-4 rounded-control border border-borde bg-white p-5">
      <h2 className="m-0 mb-3.5 text-titulo-seccion font-bold text-texto">{catalogoGrupos.filtros.pendientes} ({CONTEO.pendientes})</h2>
      {PENDIENTES.map((p) => (
        <article key={p.nombre} className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-t-f0eef5 py-4 last:border-b-0 max-900:justify-between">
          <div className="flex min-w-0 flex-1-1-240 items-start gap-3">
            <div className={`grid h-11 w-11 flex-none place-items-center rounded-control text-white ${CLASES_ICONO_INV[p.color]}`}>
              <Icono name={p.icono} className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0">
              <h3 className="m-0 mb-px flex items-center gap-1.5 text-nombre-entidad font-bold text-texto">
                {p.nombre}
                {p.privado && <Insignia variant="privado">{catalogoGrupos.leyendas.privado}</Insignia>}
              </h3>
              <span className="text-auxiliar text-texto-suave">{p.tipo}</span>
              <div className="mt-1.5 flex items-center">
                {posicionesDe(4).map((posicion) => (
                  <AvatarImagen
                    key={posicion.id}
                    src={usuarioImg}
                    className={'h-6 w-6 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-1.5' : '')}
                  />
                ))}
                <span className="-ml-1 inline-flex h-6 items-center rounded-xl border-2 border-white bg-t-ede9fe px-1.5 text-contador font-bold text-primario">{p.masAvatares}</span>
              </div>
            </div>
          </div>
          <div className="flex min-w-35 flex-none items-center gap-2">
            <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
            <div className="min-w-0">
              <strong className="block text-nombre-entidad font-semibold text-texto">{p.invitadoPor}</strong>
              <span className="text-fecha-abreviada text-texto-suave">{p.tiempo}</span>
            </div>
          </div>
          <div className="min-w-22.5 flex-none text-center max-900:ml-auto">
            <span className="flex items-center justify-center gap-1 text-auxiliar text-texto-suave">
              <Icono name="reloj" className="h-3 w-3" /> {catalogoGrupos.leyendas.expira_en}
            </span>
            <span className={'text-etiqueta-estado font-bold ' + (p.expiraColor === 'verde' ? 'text-positivo-kpi' : 'text-t-ea580c')}>{p.expiraTexto}</span>
          </div>
          <div className="flex flex-none items-center gap-2 max-900:w-full max-900:justify-between">
            <Boton type="button" variant="primario" size="mini" className="max-900:flex-1">{catalogoGrupos.botones.aceptar}</Boton>
            <Boton type="button" variant="peligro_contorno" size="mini" className="max-900:flex-1">{catalogoGrupos.botones.rechazar}</Boton>
            <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.opciones} variant="contorno" size="default" className="flex-none" />
          </div>
        </article>
      ))}
    </section>
  )
}
