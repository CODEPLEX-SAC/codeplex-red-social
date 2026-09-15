import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { EventosProximosPanel } from '../../compartido/bloques/eventos_proximos_panel'
import mensajesGlobales from '../../../mensajes/globales/textos.json'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import usuarioImg from '../../../../recursos/imagenes/usuario.jpg'
import {
  CONTACTOS_LINEA_MENSAJERIA as CONTACTOS_LINEA,
  GRUPOS_RECIENTES_MENSAJERIA as GRUPOS_RECIENTES,
  EVENTOS_PROXIMOS_MENSAJERIA as EVENTOS_PROXIMOS,
} from '../../../datos/mensajeria/panel_lateral'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave'

export function PanelLateralMensajeria() {
  return (
    <aside className="grid gap-4">
      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-[13px] text-texto">{mensajesGlobales.CONTACTOS_EN_LINEA}</h2>
          <a href="#" className="text-[11px] text-primario no-underline">{mensajesGlobales.VER_TODOS}</a>
        </div>
        {CONTACTOS_LINEA.map((c) => (
          <article key={c.nombre} className="flex items-center gap-2 border-b border-[#f0eef5] py-2">
            <AvatarImagen src={usuarioImg} className={AVATAR} />
            <div className="min-w-0 flex-1">
              <strong className="block text-[11px] text-texto">
                {c.nombre}{' '}
                {c.colaborador && <span className="ml-1 text-[9px] font-bold text-exito">{catalogoMensajeria.leyendas.colaborador_badge}</span>}
              </strong>
            </div>
            <span className="ml-auto h-2 w-2 flex-none rounded-full bg-exito" />
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-[13px] text-texto">{mensajesGlobales.GRUPOS_RECIENTES}</h2>
          <a href="#" className="text-[11px] text-primario no-underline">{mensajesGlobales.VER_TODOS}</a>
        </div>
        {GRUPOS_RECIENTES.map((g) => (
          <div key={g.nombre} className="flex items-center gap-2.5 py-2">
            <span className="h-[38px] w-[38px] flex-none rounded-[9px] bg-primario-suave" />
            <div className="min-w-0 flex-1">
              <strong className="block truncate text-[11.5px] text-texto">{g.nombre}</strong>
              <span className="mt-0.5 block truncate text-[9.5px] text-texto-suave">{g.miembros}</span>
            </div>
            <button type="button" aria-label={mensajesGlobales.UNIRSE} className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full border border-borde bg-white text-primario">
              <Icono name="mas" className="h-[13px] w-[13px]" />
            </button>
          </div>
        ))}
      </section>

      <EventosProximosPanel eventos={EVENTOS_PROXIMOS} />
    </aside>
  )
}
