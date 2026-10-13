import { posicionesDe } from '../../compartido/posiciones'
import { imagenEventoPredeterminada as imagenEvento, imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import type { EventoExplorar } from '@/tipos/eventos/modelo_eventos_explorar'

export function ListaEventosExplorar({ EVENTOS }: { EVENTOS: EventoExplorar[] }) {
  return (
    <>

    <div className="flex flex-col gap-4">
      {EVENTOS.map((ev) => (
        <article key={ev.nombre} className={(ev.ranking === undefined ? '' : 'relative ') + 'grid grid-cols-140-1fr overflow-hidden rounded-xl border border-borde-suave bg-white hover:shadow-t10 max-1100:grid-cols-120-1fr max-900:grid-cols-1'}>
          <div className="relative min-h-45 overflow-hidden">
            <img src={imagenEvento} alt="" className="h-full w-full object-cover" />
            <div className="absolute left-3.5 top-3.5 rounded-control bg-white px-3 py-2 text-center shadow-t5">
              <span className="block text-dia-evento leading-none text-texto">{ev.dia}</span>
              <span className="mt-px block text-mes-evento uppercase text-texto-suave">{ev.mes}</span>
            </div>
          </div>
          <div className="flex flex-col p-5">
            <TextoColor variante={ev.categoria} className="mb-1 inline-block text-badge uppercase tracking-wide">{ev.categoriaEtiqueta}</TextoColor>
            <h2 className="m-0 mb-1.5 text-nombre-entidad leading-compacto text-texto">{ev.nombre}</h2>
            <p className="m-0 mb-3 text-cuerpo leading-texto text-texto-suave">{ev.descripcion}</p>
            <div className="mb-3.5 flex flex-wrap gap-3.5">
              <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {ev.fecha}</span>
              <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {ev.hora}</span>
              <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {ev.ubicacion}</span>
            </div>
            <div className="mt-auto flex items-center justify-between max-600:flex-col max-600:items-stretch max-600:gap-2.5">
              <div className="flex items-center">
                {posicionesDe(ev.avatares).map((posicion) => (
                  <img key={posicion.id} src={usuarioImg} alt="" className={'h-7 w-7 rounded-full border-2 border-white object-cover' + (posicion.orden > 0 ? ' -ml-2' : '')} />
                ))}
                <span className="-ml-1 inline-flex h-7 items-center rounded-14 border-2 border-white bg-fondo-categoria-morado px-2 text-conteo text-primario">{ev.masAsistentes}</span>
              </div>
              <div className="flex items-center gap-2 max-600:w-full">
                <Boton type="button" variant="contorno" size="default" className="max-600:flex-1">{catalogoEventos.botones.ver_detalles}</Boton>
                <BotonIcono icono="guardado" type="button" aria-label={catalogoEventos.botones.guardar_evento} variant="contorno" size="default" className="flex-none" />
              </div>
            </div>
          </div>
          {ev.ranking !== undefined && (
            <div className="absolute right-3 top-3 z-2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-20 bg-white/95 px-2.5 py-1.25 shadow-t4">
              <span className="flex h-6 w-6 flex-none items-center justify-center gap-px rounded-full border-2 border-azul-categoria-texto text-conteo text-azul-categoria-texto">
                <Icono name="corona" className="h-3.5 w-3.5" />{ev.ranking}
              </span>
              <span className="whitespace-nowrap text-estado text-texto-suave">{catalogoEventos.insignias.mas_popular}</span>
              <span className="inline-flex flex-none items-center gap-0.5 whitespace-nowrap text-auxiliar font-titulo text-texto">
                <Icono name="fuego" className="h-3.5 w-3.5 fill-azul-categoria-texto stroke-none" />1
              </span>
            </div>
          )}
        </article>
      ))}
    </div>
      </>
  )
}
