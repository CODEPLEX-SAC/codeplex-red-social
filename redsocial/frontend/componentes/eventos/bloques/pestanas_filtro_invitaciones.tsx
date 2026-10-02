import { Boton } from '../../compartido/interfaz/boton'
import { Pestanas } from '../../compartido/interfaz/pestanas'
import { Icono } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { ElementoPestana } from '@/tipos/compartido/contrato_pestanas'
import type { PestanasFiltroInvitacionesProps } from '@/tipos/eventos/contrato_filtro_invitaciones'

const TABS = catalogoEventos.pestanas_filtro_invitaciones as readonly (ElementoPestana & { clave: keyof PestanasFiltroInvitacionesProps['conteos'] })[]

export function PestanasFiltroInvitaciones({ activa, conteos }: PestanasFiltroInvitacionesProps) {
  const elementos = TABS.map((t) => ({ ...t, insignia: conteos[t.clave] }))

  return (
    <div className="mb-6 flex items-center gap-3 max-950:flex-nowrap">
      <Pestanas elementos={elementos} activa={activa} className="min-w-0 flex-1" />
      <Boton type="button" variant="secundario" size="default">
        <Icono name="filtro" className="w-3.5 h-3.5" /> {catalogoEventos.filtros.filtros}
      </Boton>
    </div>
  )
}
