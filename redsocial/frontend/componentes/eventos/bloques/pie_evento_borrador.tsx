import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Menu } from '../../compartido/interfaz/menu'
import type { ElementoMenu } from '../../../tipos/compartido/contrato_menu'
import type { AccionesMenuEvento } from '@/tipos/eventos/modelo_eventos_mis_eventos'

const MENU_ORGANIZAS = catalogoEventos.menu_organizas.borrador as ElementoMenu[]

export function PieEventoBorrador({
  nombre,
  acciones,
  alContinuarEditando,
}: {
  nombre: string
  acciones: AccionesMenuEvento
  alContinuarEditando: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-2 border-l border-gris-borde px-5 py-4 max-900:border-l-0 max-900:border-t">
      <Boton type="button" variant="contorno" size="default" onClick={alContinuarEditando}>{catalogoEventos.botones.continuar_editando}</Boton>
      <div className="relative">
        <BotonIcono icono="puntos" type="button" aria-label={catalogoEventos.botones.mas_opciones} onClick={(evento) => acciones.alAbrirMenuOrganizas(evento, nombre)} variant="sutil" size="default" />
        {acciones.menuOrganizasAbierto === nombre && (
          <Menu ancla={acciones.anclaMenuOrganizas} alCerrar={acciones.cerrarMenuOrganizas} elementos={MENU_ORGANIZAS} />
        )}
      </div>
    </div>
  )
}
