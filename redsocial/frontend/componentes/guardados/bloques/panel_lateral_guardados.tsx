import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PanelLateralGuardadosProps } from '@/tipos/guardados/contrato_lateral_guardados'

export function PanelLateralGuardados({ colecciones, recomendados }: PanelLateralGuardadosProps) {
  return (
    <div className="grid gap-4">
      <section className="degradado-violeta-suave rounded-xl p-4 text-center text-white">
        <div className="mx-auto mb-2.5 grid h-11 w-11 place-items-center rounded-full bg-white text-primario">
          <Icono name="amigos-todos" className="h-5 w-5" />
        </div>
        <h3 className="m-0 mb-1 text-titulo-banner font-bold">{catalogoGuardados.banner_lateral.titulo}</h3>
        <p className="m-0 text-cuerpo leading-1.45 text-white/80">{catalogoGuardados.banner_lateral.descripcion}</p>
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGuardados.secciones.mis_colecciones}</h3>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">
            {catalogoGuardados.botones.ver_todas}
          </a>
        </div>
        <ul className="m-0 mb-3 grid list-none gap-2.5 p-0">
          {colecciones.map((c) => (
            <li key={c.id} className="flex items-center gap-2.5">
              <SuperficieColor variante={c.color} className="grid h-8 w-8 flex-none place-items-center rounded-lg text-white">
                <Icono name={c.icono} className="h-3.5 w-3.5" />
              </SuperficieColor>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-nombre-entidad font-semibold text-texto">{c.nombre}</span>
                <span className="block text-auxiliar text-texto-suave">
                  {c.cantidad} {c.cantidad === 1 ? catalogoGuardados.unidades.grupo_singular : catalogoGuardados.unidades.grupo_plural}
                </span>
              </div>
              <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="sm" className="flex-none" />
            </li>
          ))}
        </ul>
        <Boton type="button" variant="secundario" size="default" className="w-full">
          <Icono name="mas" className="h-3.5 w-3.5" /> {catalogoGuardados.botones.nueva_coleccion}
        </Boton>
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGuardados.secciones.grupos_recomendados}</h3>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">
            {catalogoGuardados.botones.ver_todos}
          </a>
        </div>
        <ul className="m-0 grid list-none gap-2.5 p-0">
          {recomendados.map((r) => (
            <li key={r.id} className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-t-e8e5f0 text-texto-suave">
                <Icono name="grupos" className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-nombre-entidad font-semibold text-texto">{r.nombre}</span>
                <span className="block text-auxiliar text-texto-suave">{r.miembros}</span>
              </div>
              <BotonIcono icono="mas" type="button" aria-label={catalogoGuardados.botones.ver_todos} variant="contorno" size="sm" className="flex-none" />
            </li>
          ))}
        </ul>
      </section>

      <section className="degradado-nocturno rounded-xl p-4 text-center text-white">
        <h3 className="m-0 mb-1 text-titulo-banner font-bold">{catalogoGuardados.banner_cta.titulo}</h3>
        <p className="m-0 mb-3 text-cuerpo leading-1.45 text-white/80">{catalogoGuardados.banner_cta.descripcion}</p>
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-1.75 text-boton font-bold text-primario no-underline hover:bg-t-f5f3ff"
        >
          {catalogoGuardados.botones.explorar_grupos}
        </a>
      </section>
    </div>
  )
}
