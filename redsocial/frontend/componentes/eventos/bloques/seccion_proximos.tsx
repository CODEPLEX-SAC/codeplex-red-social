import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido'
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
        <h2 className="m-0 text-titulo-seccion text-texto">{catalogoEventos.secciones.proximos}</h2>
        <a href={catalogoEventos.rutas.proximos} className="text-enlace-accion text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <div className="relative">
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={textosRedSocial.ANTERIOR} onClick={() => alDesplazarProximos(-1)} variant="flotante" size="default" className="absolute -left-4 max-900:-left-2 top-1/2 -translate-y-1/2" />
        <div
          ref={pistaProximosRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-oculto"
        >
          {PROXIMOS.map((ev) => (
            <article key={ev.nombre} className="w-55 flex-none overflow-hidden rounded-xl border border-borde-suave bg-white hover:shadow-t10">
              <div className="relative h-35 overflow-hidden">
                <AvatarImagen src={imagenEvento} className="h-full w-full" />
                <div className="absolute left-2.5 top-2.5 rounded-control bg-white px-2.5 py-1.5 text-center shadow-t5">
                  <span className="block text-dia-evento leading-none text-texto">{ev.dia}</span>
                  <span className="block text-mes-evento uppercase text-texto-suave">{ev.mes}</span>
                </div>
              </div>
              <div className="p-3.5">
                <TextoColor variante={ev.categoria} className="mb-1 inline-block text-badge uppercase tracking-wide">{ev.categoriaEtiqueta}</TextoColor>
                <h3 className="m-0 mb-1.5 text-nombre-entidad leading-compacto text-texto">{ev.nombre}</h3>
                <div className="mb-2.5 flex flex-col gap-0.75">
                  <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {ev.fecha}</span>
                  <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {ev.ubicacion}</span>
                </div>
                <GrupoAvatares avatares={3} tamano="sm" resto={ev.masAsistentes} />
              </div>
            </article>
          ))}
        </div>
        <BotonIcono icono="flecha-derecha" type="button" aria-label={textosRedSocial.SIGUIENTE} onClick={() => alDesplazarProximos(1)} variant="flotante" size="default" className="absolute -right-4 max-900:-right-2 top-1/2 -translate-y-1/2" />
      </div>
    </section>
  )
}
