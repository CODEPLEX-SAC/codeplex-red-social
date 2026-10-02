import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { Icono } from '../../compartido/icono'
import { SeccionDispositivos } from './seccion_dispositivos'

export function SeccionVideollamadaIniciar({
  SESION_ACTUAL,
  DISPOSITIVOS,
  CONFIGURACION_LLAMADA,
}: {
  SESION_ACTUAL: { usuario: string; empresa: string; ruc: string; }
  DISPOSITIVOS: { icono: string; titulo: string; detalle: string; }[]
  CONFIGURACION_LLAMADA: { icono: string; titulo: string; detalle: string; }[]
}) {
  return (
    <section className="min-w-0">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="m-0 text-titulo-pagina font-extrabold tracking-n02 text-texto">{catalogoMensajeria.titulos.videollamada_iniciar}</h1>
          <p className="m-0 mt-1 text-subtitulo text-texto-suave">{catalogoMensajeria.subtitulos.videollamada_iniciar}</p>
        </div>
      </div>

      <div className="relative my-5 h-105 overflow-hidden rounded-14 degradado-violeta-oscuro max-900:h-80">
        <button type="button" aria-label={catalogoMensajeria.botones.cambiar_camara} className="absolute right-3.5 top-3.5 grid h-8.5 w-8.5 place-items-center rounded-lg border-0 bg-overlay-3 text-white">
          <Icono name="video" className="h-4 w-4" />
        </button>
        <span className="absolute bottom-3.5 left-3.5 rounded-lg bg-overlay-4 px-3 py-1.25 text-nombre-entidad font-semibold text-white">{SESION_ACTUAL.usuario}</span>
        <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
          <button type="button" aria-label={catalogoMensajeria.botones.silenciar_microfono} className="grid h-10.5 w-10.5 place-items-center rounded-full border-0 bg-white text-texto">
            <Icono name="microfono" className="h-4.5 w-4.5" />
          </button>
          <button type="button" aria-label={catalogoMensajeria.botones.apagar_camara} className="grid h-10.5 w-10.5 place-items-center rounded-full border-0 bg-white text-texto">
            <Icono name="video" className="h-4.5 w-4.5" />
          </button>
          <button type="button" aria-label={catalogoMensajeria.botones.configuracion} className="grid h-10.5 w-10.5 place-items-center rounded-full border-0 bg-overlay-4 text-white">
            <Icono name="ajustes-sistema" className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <SeccionDispositivos DISPOSITIVOS={DISPOSITIVOS} CONFIGURACION_LLAMADA={CONFIGURACION_LLAMADA} />

      <a href={catalogoMensajeria.rutas.videollamada_en_curso} className="mt-5 flex w-full items-center justify-center gap-2 rounded-7 border border-transparent bg-primario py-3.25 text-boton font-medium text-white no-underline hover:bg-primario-oscuro">
        <Icono name="video" className="h-4.25 w-4.25" /> {catalogoMensajeria.botones.iniciar_videollamada}
      </a>
      <a href={catalogoMensajeria.rutas.videollamadas} className="mt-2.5 block text-center text-enlace-accion text-texto-suave no-underline hover:underline">{catalogoMensajeria.botones.cancelar}</a>
    </section>
  )
}
