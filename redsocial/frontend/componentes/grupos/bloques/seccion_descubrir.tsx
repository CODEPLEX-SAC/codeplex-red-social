import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { PestanasGrupos } from './pestanas_grupos'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BloqueUnirse } from './bloque_unirse'
import type { GrupoDestacado, ColorCategoria } from '@/tipos/grupos/modelo_grupos_descubrir'

export function SeccionDescubrir({
  DESTACADOS,
  CLASES_FONDO,
  CLASES_OVERLAY,
  CATEGORIAS,
  CLASES_CATEGORIA,
}: {
  DESTACADOS: GrupoDestacado[]
  CLASES_FONDO: Record<'azul-oscuro' | 'naranja' | 'violeta' | 'rosa-oscuro', string>
  CLASES_OVERLAY: Record<'naranja' | 'violeta' | 'morado' | 'rosa', string>
  CATEGORIAS: { icono: string; color: ColorCategoria; nombre: string; cantidad: string; }[]
  CLASES_CATEGORIA: Record<ColorCategoria, string>
}) {
  return (
    <section>
      <div className="mb-4 flex items-start justify-between gap-5">
        <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">{catalogoGrupos.titulos.descubrir}</h1>
        <div className="flex flex-none items-center gap-2.5">
          <Boton variant="primario" size="md">
            <Icono name="mas" className="h-4 w-4" /> {catalogoGrupos.botones.crear_grupo}
          </Boton>
          <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.mas_opciones} variant="discreto" size="sm" className="flex-none" />
        </div>
      </div>

      <PestanasGrupos activa="descubrir" />

      <div className="mb-6 flex items-start gap-3.5 rounded-control border border-t-e4dfff bg-t-f3f0ff p-5">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-control bg-primario text-white">
          <Icono name="amigos" className="h-5.5 w-5.5" />
        </span>
        <div className="min-w-0 flex-1">
          <strong className="mb-0.75 block text-subtitulo text-texto">{catalogoGrupos.banner.titulo}</strong>
          <p className="m-0 text-cuerpo leading-1.4 text-texto-suave">{catalogoGrupos.banner.descripcion}</p>
        </div>
        <BotonIcono icono="cerrar" type="button" aria-label={catalogoGrupos.botones.cerrar} variant="discreto" size="sm" className="flex-none" />
      </div>

      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.destacados}</h2>
        <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <BloqueUnirse
        DESTACADOS={DESTACADOS}
        CLASES_FONDO={CLASES_FONDO}
        CLASES_OVERLAY={CLASES_OVERLAY}
      />

      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.categorias}</h2>
        <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <div className="grid grid-cols-4 gap-3 max-1100:grid-cols-3 max-900:grid-cols-2 max-600:grid-cols-1">
        {CATEGORIAS.map((c) => (
          <article key={c.nombre} className="flex min-w-0 items-center gap-3 rounded-control border border-borde bg-white p-3.5 hover:border-primario hover:bg-t-f9f8fc">
            <div className={`grid h-9.5 w-9.5 flex-none place-items-center rounded-lg text-white ${CLASES_CATEGORIA[c.color]}`}>
              <Icono name={c.icono} className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="m-0 text-nombre-entidad font-semibold text-texto">{c.nombre}</h4>
              <span className="text-contador text-texto-suave">{c.cantidad}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
