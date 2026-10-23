import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { BannerInformativo } from '../../compartido/interfaz/banner_informativo'
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
      <div className="mb-4 flex flex-wrap items-start justify-between gap-x-5 gap-y-3">
        <h1 className="m-0 text-titulo-pagina text-texto">{catalogoGrupos.titulos.descubrir}</h1>
        <div className="flex flex-none items-center gap-2.5">
          <Boton variant="primario" size="md">
            <Icono name="mas" className="h-4 w-4" /> {catalogoGrupos.botones.crear_grupo}
          </Boton>
          <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.mas_opciones} variant="discreto" size="sm" className="flex-none" />
        </div>
      </div>

      <PestanasGrupos activa="descubrir" />

      <BannerInformativo icono="grupo" titulo={catalogoGrupos.banner.titulo} descripcion={catalogoGrupos.banner.descripcion} etiquetaCerrar={catalogoGrupos.botones.cerrar} className="mb-6" />

      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{catalogoGrupos.secciones.destacados}</h2>
        <a href="#" className="text-enlace-accion text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <BloqueUnirse
        DESTACADOS={DESTACADOS}
        CLASES_FONDO={CLASES_FONDO}
        CLASES_OVERLAY={CLASES_OVERLAY}
      />

      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{catalogoGrupos.secciones.categorias}</h2>
        <a href="#" className="text-enlace-accion text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <div className="grid grid-cols-4 gap-3 max-1100:grid-cols-3 max-900:grid-cols-2 max-600:grid-cols-1">
        {CATEGORIAS.map((c) => (
          <article key={c.nombre} className="flex min-w-0 items-center gap-3 rounded-control border border-borde bg-white p-3.5 hover:border-primario hover:bg-fondo">
            <div className={`grid h-9.5 w-9.5 flex-none place-items-center rounded-lg text-white ${CLASES_CATEGORIA[c.color]}`}>
              <Icono name={c.icono} className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="m-0 text-nombre-entidad text-texto">{c.nombre}</h3>
              <span className="text-contador text-texto-suave">{c.cantidad}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
