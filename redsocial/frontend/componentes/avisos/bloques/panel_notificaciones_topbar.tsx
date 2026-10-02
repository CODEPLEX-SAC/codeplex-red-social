import { Pestanas } from '../../compartido/interfaz/pestanas'
import { Menu } from '../../compartido/interfaz/menu'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { useState } from 'react'
import { FilaPanelTopbar } from './fila_panel_topbar'
import catalogoAvisos from '../../../catalogos/capacidades/redsocial/avisos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { PanelNotificacionesTopbarProps } from '@/tipos/avisos/contrato_notificaciones_topbar'
import type { Aviso, ColorIconoAviso, PestanaAviso } from '@/tipos/avisos/modelo_avisos'

const PESTANAS_PANEL = catalogoAvisos.pestanas_panel_topbar

const avisosPanelHoy = catalogoAvisos.panel_topbar_hoy as Aviso[]
const avisosPanelAyer = catalogoAvisos.panel_topbar_ayer as Aviso[]
const mapaIconoColor = catalogoAvisos.clases_icono_color as Record<ColorIconoAviso, string>

export function PanelNotificacionesTopbar({ onCerrar }: PanelNotificacionesTopbarProps) {
  const [pestanaActiva, setPestanaActiva] = useState<PestanaAviso>('todas')
  const [ancla, setAncla] = useState<HTMLElement | null>(null)

  return (
    <div
      className="fixed right-md top-17 z-20 w-95 rounded-xl border border-borde bg-white shadow-t13 max-600:left-3 max-600:right-3 max-600:w-auto"
    >
      <div className="flex items-center justify-between border-b border-t-f0eef5 p-3.5">
        <strong className="text-titulo-seccion font-extrabold text-texto">{catalogoAvisos.titulos.principal}</strong>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={onCerrar} variant="discreto" size="sm" className="flex-none" />
      </div>

      <div className="flex items-center justify-between gap-2 p-3.5 pb-0">
        <Pestanas elementos={PESTANAS_PANEL} activa={pestanaActiva} alCambiar={(clave) => setPestanaActiva(clave as PestanaAviso)} className="min-w-0 flex-1" />

        <div className="flex-none">
          <BotonIcono icono="puntos" type="button" aria-label={catalogoAvisos.botones.mas_opciones} onClick={(evento) => setAncla(evento.currentTarget)} variant="discreto" size="md" className="flex-none" />
          <Menu
            ancla={ancla}
            alCerrar={() => setAncla(null)}
            elementos={catalogoAvisos.menu_panel_topbar as ElementoMenu[]}
          />
        </div>
      </div>

      <div className="max-h-125 overflow-y-auto p-3.5">
        <div className="mb-1 text-subtitulo font-bold text-texto">{catalogoAvisos.grupos_fecha.hoy}</div>
        {avisosPanelHoy.map((n) => (
          <FilaPanelTopbar key={n.id} aviso={n} claseIcono={mapaIconoColor[n.colorIcono]} />
        ))}
        <a href={catalogoAvisos.rutas.todas} className="mt-2 flex items-center justify-center rounded-lg border border-borde py-2 text-enlace-accion font-semibold text-primario no-underline hover:bg-t-f5f3ff">
          {catalogoAvisos.panel_topbar.ver_mas}
        </a>

        <div className="mb-1 mt-3.5 text-subtitulo font-bold text-texto">{catalogoAvisos.grupos_fecha.ayer}</div>
        {avisosPanelAyer.map((n) => (
          <FilaPanelTopbar key={n.id} aviso={n} claseIcono={mapaIconoColor[n.colorIcono]} />
        ))}
      </div>

      <a href={catalogoAvisos.rutas.todas} className="flex items-center justify-center border-t border-t-f0eef5 p-3 text-enlace-accion font-semibold text-primario no-underline hover:bg-t-f5f3ff">
        {catalogoAvisos.panel_topbar.ver_todas_las_notificaciones}
      </a>
    </div>
  )
}
