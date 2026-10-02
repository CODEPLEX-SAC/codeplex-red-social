import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import type { ElementoMenu } from '../../../tipos/compartido/contrato_menu'
import type { AccionesMenuEvento, PieEstadisticasEvento } from '@/tipos/eventos/modelo_eventos_mis_eventos'

const MENU_ORGANIZAS = catalogoEventos.menu_organizas.publicado as ElementoMenu[]

export function PieEventoPublicado({
  nombre,
  pie,
  acciones,
}: {
  nombre: string
  pie: PieEstadisticasEvento
  acciones: AccionesMenuEvento
}) {
  return (
    <div className="flex items-center gap-6 border-l border-gris-borde px-5 py-4 max-1100:gap-4 max-1100:px-4 max-900:justify-start max-900:gap-5 max-900:border-l-0 max-900:border-t">
      <div className="min-w-17.5 text-center">
        <span className="block text-valor-destacado font-extrabold text-gris-oscuro-texto">{pie.statValor}</span>
        <span className="block text-auxiliar text-gris-texto-secundario">{catalogoEventos.leyendas.asistiran}</span>
      </div>
      <div className="min-w-17.5 text-center">
        <span className="block text-valor-destacado font-extrabold text-gris-oscuro-texto">{pie.statPct}</span>
        <span className="block text-auxiliar text-gris-texto-secundario">{catalogoEventos.leyendas.confirmados}</span>
      </div>
      <div className="relative">
        <BotonIcono icono="puntos" type="button" aria-label={catalogoEventos.botones.mas_opciones} onClick={(evento) => acciones.alAbrirMenuOrganizas(evento, nombre)} variant="sutil" size="default" />
        {acciones.menuOrganizasAbierto === nombre && (
          <Menu ancla={acciones.anclaMenuOrganizas} alCerrar={acciones.cerrarMenuOrganizas} elementos={MENU_ORGANIZAS} />
        )}
      </div>
    </div>
  )
}
