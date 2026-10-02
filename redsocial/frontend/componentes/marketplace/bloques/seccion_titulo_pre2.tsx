import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Icono } from '../../compartido/icono'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'

export function SeccionTituloPre2() {
  return (
    <div className="mb-5 grid grid-cols-2 items-center gap-6 overflow-hidden rounded-14 degradado-lavanda-triple p-9 max-900:grid-cols-1 max-900:p-6">
      <div className="relative z-10">
        <h2 className="m-0 mb-1 text-titulo-seccion font-extrabold leading-1.35 text-texto">
          {catalogoMarketplace.hero.titulo_pre} <span className="text-primario underline underline-offset-2">{catalogoMarketplace.hero.titulo_destacado}</span>
        </h2>
        <div className="my-4 flex flex-wrap gap-5">
          <div className="flex items-start gap-2">
            <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-overlay-12">
              <Icono name="verificado" className="h-3.5 w-3.5 text-primario" />
            </div>
            <div className="text-subtitulo font-semibold leading-1.35 text-texto">{catalogoMarketplace.hero.beneficio_1_titulo}<span className="block text-auxiliar font-normal text-texto-suave">{catalogoMarketplace.hero.beneficio_1_detalle}</span></div>
          </div>
          <div className="flex items-start gap-2">
            <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-overlay-12">
              <Icono name="rapido" className="h-3.5 w-3.5 text-primario" />
            </div>
            <div className="text-subtitulo font-semibold leading-1.35 text-texto">{catalogoMarketplace.hero.beneficio_2_titulo}<span className="block text-auxiliar font-normal text-texto-suave">{catalogoMarketplace.hero.beneficio_2_detalle}</span></div>
          </div>
          <div className="flex items-start gap-2">
            <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-overlay-12">
              <Icono name="soporte" className="h-3.5 w-3.5 text-primario" />
            </div>
            <div className="text-subtitulo font-semibold leading-1.35 text-texto">{catalogoMarketplace.hero.beneficio_3_titulo}<span className="block text-auxiliar font-normal text-texto-suave">{catalogoMarketplace.hero.beneficio_3_detalle}</span></div>
          </div>
        </div>
        <CampoBusqueda placeholder={catalogoMarketplace.placeholders.buscar} className="max-w-95" accion={<BotonIcono icono="buscar" type="button" aria-label={catalogoMarketplace.placeholders.buscar} variant="primario" size="md" />} />
      </div>
      <div className="relative grid h-40 place-items-center max-900:hidden">
        <div className="grid h-35 w-35 place-items-center rounded-full bg-overlay-11">
          <Icono name="tienda" className="h-14 w-14 text-primario opacity-70" />
        </div>
        <div className="absolute right-7.5 top-2.5 h-10 w-10 rotate-15 rounded-control bg-overlay-7" />
        <div className="absolute bottom-5 right-2.5 h-8 w-8 -rotate-10 rounded-control bg-overlay-10" />
        <div className="absolute bottom-7.5 left-5 h-7 w-7 rotate-25 rounded-control bg-overlay-8" />
      </div>
    </div>
  )
}
