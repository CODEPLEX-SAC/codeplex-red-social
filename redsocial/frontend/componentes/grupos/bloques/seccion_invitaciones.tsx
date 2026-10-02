import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { PestanasGrupos } from './pestanas_grupos'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
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
  return (
    <section>
      <div className="mb-4 flex items-start justify-between gap-5">
        <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">{catalogoGrupos.titulos.invitaciones}</h1>
        <div className="flex flex-none items-center gap-2.5">
          <Boton type="button" variant="secundario" size="md">
            <Icono name="mas" className="h-4 w-4" /> {catalogoGrupos.botones.invitar_a_grupo}
          </Boton>
          <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.mas_opciones} variant="discreto" size="sm" className="flex-none" />
        </div>
      </div>

      <PestanasGrupos activa="invitaciones" />

      <div className="mb-4 flex flex-wrap gap-1.5 max-600:flex-nowrap max-600:overflow-x-auto max-600:scrollbar-oculto">
        <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-20 border border-primario bg-primario px-3.5 text-navegacion text-white no-underline">
          {catalogoGrupos.filtros.todas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-white/25 px-1 text-contador font-bold">{CONTEO.todas}</span>
        </a>
        <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-20 border border-borde bg-white px-3.5 text-navegacion text-texto-suave no-underline hover:bg-t-f7f6fa">
          {catalogoGrupos.filtros.pendientes} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-t-efedf7 px-1 text-contador font-bold text-texto-suave">{CONTEO.pendientes}</span>
        </a>
        <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-20 border border-borde bg-white px-3.5 text-navegacion text-texto-suave no-underline hover:bg-t-f7f6fa">
          {catalogoGrupos.filtros.aceptadas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-t-efedf7 px-1 text-contador font-bold text-texto-suave">{CONTEO.aceptadas}</span>
        </a>
        <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-20 border border-borde bg-white px-3.5 text-navegacion text-texto-suave no-underline hover:bg-t-f7f6fa">
          {catalogoGrupos.filtros.rechazadas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-t-efedf7 px-1 text-contador font-bold text-texto-suave">{CONTEO.rechazadas}</span>
        </a>
        <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-20 border border-borde bg-white px-3.5 text-navegacion text-texto-suave no-underline hover:bg-t-f7f6fa">
          {catalogoGrupos.filtros.expiradas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-t-efedf7 px-1 text-contador font-bold text-texto-suave">{CONTEO.expiradas}</span>
        </a>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <CampoBusqueda placeholder={catalogoGrupos.placeholders.buscar_invitaciones} className="flex-1" />
        <Boton type="button" variant="secundario" size="md" className="flex-none">
          {catalogoGrupos.botones.mas_recientes} <Icono name="flecha-abajo" className="h-3 w-3" />
        </Boton>
      </div>

      <SeccionPendientes CONTEO={CONTEO} PENDIENTES={PENDIENTES} CLASES_ICONO_INV={CLASES_ICONO_INV} />

      <SeccionAceptadas CONTEO={CONTEO} ACEPTADAS={ACEPTADAS} CLASES_ICONO_INV={CLASES_ICONO_INV} />
    </section>
  )
}
