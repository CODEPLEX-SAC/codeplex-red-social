import { useState } from 'react'
import { clasesChip, Boton, Insignia, Selector, Icono, BotonIcono, CampoBusqueda } from '../../compartido'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { PestanasGrupos } from './pestanas_grupos'
import { SeccionPendientes } from './seccion_pendientes'
import { SeccionAceptadas } from './seccion_aceptadas'
import type { InvitacionPendiente, ColorGrupo, InvitacionAceptada } from '@/tipos/grupos/modelo_grupos_invitaciones'

export function SeccionInvitaciones({
  CONTEO,
  PENDIENTES,
  CLASES_ICONO_INV,
  ACEPTADAS,
}: {
  CONTEO: { todas: number; pendientes: number; aceptadas: number; rechazadas: number; expiradas: number; }
  PENDIENTES: InvitacionPendiente[]
  CLASES_ICONO_INV: Record<ColorGrupo, string>
  ACEPTADAS: InvitacionAceptada[]
}) {
  const [orden, setOrden] = useState('recientes')
  const ordenar = <T,>(lista: T[]) => (orden === 'recientes' ? lista : [...lista].reverse())

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-x-5 gap-y-3">
        <h1 className="m-0 text-titulo-pagina text-texto">{catalogoGrupos.titulos.invitaciones}</h1>
        <div className="flex flex-none items-center gap-2.5">
          <Boton type="button" variant="secundario" size="md">
            <Icono name="mas" className="h-4 w-4" /> {catalogoGrupos.botones.invitar_a_grupo}
          </Boton>
          <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.mas_opciones} variant="discreto" size="sm" className="flex-none" />
        </div>
      </div>

      <PestanasGrupos activa="invitaciones" />

      <div className="mb-4 flex flex-wrap gap-1.5 max-600:flex-nowrap max-600:overflow-x-auto max-600:scrollbar-oculto">
        <a href="#" className={clasesChip({ activo: true, className: 'flex-none' })}>
          {catalogoGrupos.filtros.todas} <Insignia variant="counter" tamano="sm" tono="blanco">{CONTEO.todas}</Insignia>
        </a>
        <a href="#" className={clasesChip({ className: 'flex-none' })}>
          {catalogoGrupos.filtros.pendientes} <Insignia variant="counter" tamano="sm" tono="neutro">{CONTEO.pendientes}</Insignia>
        </a>
        <a href="#" className={clasesChip({ className: 'flex-none' })}>
          {catalogoGrupos.filtros.aceptadas} <Insignia variant="counter" tamano="sm" tono="neutro">{CONTEO.aceptadas}</Insignia>
        </a>
        <a href="#" className={clasesChip({ className: 'flex-none' })}>
          {catalogoGrupos.filtros.rechazadas} <Insignia variant="counter" tamano="sm" tono="neutro">{CONTEO.rechazadas}</Insignia>
        </a>
        <a href="#" className={clasesChip({ className: 'flex-none' })}>
          {catalogoGrupos.filtros.expiradas} <Insignia variant="counter" tamano="sm" tono="neutro">{CONTEO.expiradas}</Insignia>
        </a>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <CampoBusqueda placeholder={catalogoGrupos.placeholders.buscar_invitaciones} className="flex-1" />
        <Selector variant="mini" value={orden} onChange={(evento) => setOrden(evento.target.value)} aria-label={catalogoGrupos.botones.ordenar_invitaciones} className="flex-none">
          <option value="recientes">{catalogoGrupos.botones.mas_recientes}</option>
          <option value="antiguas">{catalogoGrupos.botones.mas_antiguas}</option>
        </Selector>
      </div>

      <SeccionPendientes CONTEO={CONTEO} PENDIENTES={ordenar(PENDIENTES)} CLASES_ICONO_INV={CLASES_ICONO_INV} />

      <SeccionAceptadas CONTEO={CONTEO} ACEPTADAS={ordenar(ACEPTADAS)} CLASES_ICONO_INV={CLASES_ICONO_INV} />
    </section>
  )
}
