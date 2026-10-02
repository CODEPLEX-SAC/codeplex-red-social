import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { EventosProximosPanel } from '../../compartido/bloques/eventos_proximos_panel'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import type { PanelLateralMensajeriaProps } from '@/tipos/mensajeria/contrato_lateral_mensajeria'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave'

export function PanelLateralMensajeria({ contactosLinea: CONTACTOS_LINEA, gruposRecientes: GRUPOS_RECIENTES, eventosProximos: EVENTOS_PROXIMOS }: PanelLateralMensajeriaProps) {
  return (
    <aside className="grid gap-4">
      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-titulo-seccion text-texto">{textosRedSocial.CONTACTOS_EN_LINEA}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        {CONTACTOS_LINEA.map((c) => (
          <article key={c.nombre} className="flex items-center gap-2 border-b border-t-f0eef5 py-2">
            <AvatarImagen src={usuarioImg} className={AVATAR} />
            <div className="min-w-0 flex-1">
              <strong className="block text-nombre-entidad text-texto">
                {c.nombre}{' '}
                {c.colaborador && <span className="ml-1 text-etiqueta-estado font-bold text-exito">{catalogoMensajeria.leyendas.colaborador_badge}</span>}
              </strong>
            </div>
            <span className="ml-auto h-2 w-2 flex-none rounded-full bg-exito" />
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-titulo-seccion text-texto">{textosRedSocial.GRUPOS_RECIENTES}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        {GRUPOS_RECIENTES.map((g) => (
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

      <EventosProximosPanel eventos={EVENTOS_PROXIMOS} />
    </aside>
  )
}
