import { posicionesDe } from '../../compartido/posiciones'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenEventoPredeterminada as imagenEvento, imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { Icono } from '../../compartido/icono'
import type { EventoProximo } from '@/tipos/eventos/modelo_eventos_para_ti'

export function SeccionProximos({
  alDesplazarProximos,
  pistaProximosRef,
  PROXIMOS,
}: {
  alDesplazarProximos: (direccion: 1 | -1) => void
  pistaProximosRef: React.RefObject<HTMLDivElement | null>
  PROXIMOS: EventoProximo[]
}) {
  return (
    <section>
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEventos.secciones.proximos}</h2>
        <a href={catalogoEventos.rutas.proximos} className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <div className="relative">
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={textosRedSocial.ANTERIOR} onClick={() => alDesplazarProximos(-1)} variant="flotante" size="default" className="absolute -left-4 top-1/2 -translate-y-1/2" />
        <div
          ref={pistaProximosRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-oculto"
        >
          {PROXIMOS.map((ev) => (
            <article key={ev.nombre} className="w-55 flex-none overflow-hidden rounded-xl border border-t-eeeeee bg-white hover:shadow-t10">
              <div className="relative h-35 overflow-hidden">
                <AvatarImagen src={imagenEvento} className="h-full w-full" />
                <div className="absolute left-2.5 top-2.5 rounded-control bg-white px-2.5 py-1.5 text-center shadow-t5">
                  <span className="block text-dia-evento font-extrabold leading-1.1 text-texto">{ev.dia}</span>
                  <span className="block text-mes-evento font-bold uppercase text-texto-suave">{ev.mes}</span>
                </div>
              </div>
              <div className="p-3.5">
                <TextoColor variante={ev.categoria} className="mb-1 inline-block text-etiqueta-estado font-bold uppercase tracking-wide">{ev.categoriaEtiqueta}</TextoColor>
                <h4 className="m-0 mb-1.5 text-nombre-entidad font-bold leading-1.3 text-texto">{ev.nombre}</h4>
                <div className="mb-2.5 flex flex-col gap-0.75">
                  <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {ev.fecha}</span>
                  <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {ev.ubicacion}</span>
                </div>
                <div className="flex items-center">
                  {posicionesDe(3).map((posicion) => (
                    <AvatarImagen
                  key={posicion.id}
                  src={usuarioImg}
                  className={'h-7 w-7 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-2' : '')}
                />
                  ))}
                  <span className="-ml-1 inline-flex h-7 items-center rounded-2xl border-2 border-white bg-t-ede9fe px-2 text-contador font-bold text-primario">{ev.masAsistentes}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <BotonIcono icono="flecha-derecha" type="button" aria-label={textosRedSocial.SIGUIENTE} onClick={() => alDesplazarProximos(1)} variant="flotante" size="default" className="absolute -right-4 top-1/2 -translate-y-1/2" />
      </div>
    </section>
  )
}
