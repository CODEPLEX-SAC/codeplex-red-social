import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { SeccionProximos } from './seccion_proximos'
import type { EventoDestacado, EventoProximo } from '@/tipos/eventos/modelo_eventos_para_ti'

export function SeccionDestacados2({
  destacado,
  alCambiarDestacado,
  setDetalleAbierto,
  DESTACADOS,
  setIndiceDestacado,
  indiceDestacado,
  alDesplazarProximos,
  pistaProximosRef,
  PROXIMOS,
}: {
  destacado: EventoDestacado | undefined
  alCambiarDestacado: (direccion: 1 | -1) => void
  setDetalleAbierto: (valor: boolean | ((actual: boolean) => boolean)) => void
  DESTACADOS: EventoDestacado[]
  setIndiceDestacado: (valor: number | ((actual: number) => number)) => void
  indiceDestacado: number
  alDesplazarProximos: (direccion: 1 | -1) => void
  pistaProximosRef: React.RefObject<HTMLDivElement | null>
  PROXIMOS: EventoProximo[]
}) {
  return (
    <>

    {destacado && (
    <section className="mb-7">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{catalogoEventos.secciones.destacados}</h2>
      </div>
      <div className="grid grid-cols-2 overflow-hidden rounded-14 border border-borde-suave bg-white max-900:grid-cols-1">
        <div className="relative min-h-55 overflow-hidden">
          <AvatarImagen src={imagenEvento} className="h-full w-full" />
          <div className="absolute left-3.5 top-3.5 rounded-control bg-white px-3 py-2 text-center shadow-t5">
            <span className="block text-dia-evento leading-none text-texto">{destacado.dia}</span>
            <span className="mt-px block text-mes-evento uppercase text-texto-suave">{destacado.mes}</span>
          </div>
          <BotonIcono icono="flecha-izquierda" aria-label={textosRedSocial.ANTERIOR} onClick={() => alCambiarDestacado(-1)} variant="flotante" size="default" className="absolute left-2.5 top-1/2 -translate-y-1/2" />
          <BotonIcono icono="flecha-derecha" aria-label={textosRedSocial.SIGUIENTE} onClick={() => alCambiarDestacado(1)} variant="flotante" size="default" className="absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex flex-col p-6">
          <span className="mb-1.5 inline-block text-badge uppercase tracking-wide text-primario">{destacado.categoriaEtiqueta}</span>
          <h3 className="m-0 mb-2 text-titulo-seccion leading-compacto text-texto">{destacado.nombre}</h3>
          <p className="m-0 mb-4 whitespace-pre-line text-cuerpo leading-texto text-texto-suave">{destacado.descripcion}</p>
          <div className="mb-4 flex flex-wrap gap-4">
            <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {destacado.fecha}</span>
            <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {destacado.hora}</span>
            <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {destacado.ubicacion}</span>
          </div>
          <div className="mt-auto flex items-center justify-between max-600:flex-col max-600:items-stretch max-600:gap-2.5">
            <GrupoAvatares avatares={4} tamano="sm" resto={destacado.asistentes} />
            <Boton type="button" onClick={() => setDetalleAbierto(true)} variant="contorno" size="default" className="max-600:w-full">{catalogoEventos.botones.ver_detalles}</Boton>
          </div>
        </div>
      </div>
      <div className="mt-3.5 flex items-center justify-center gap-1.5">
        {DESTACADOS.map((d, i) => (
          <button
            key={d.nombre}
            type="button"
            aria-label={`${catalogoEventos.botones.ir_al_destacado} ${i + 1}`}
            onClick={() => setIndiceDestacado(i)}
            className={'rounded-full border-0 p-0 ' + (i === indiceDestacado ? 'h-2.5 w-2.5 bg-primario' : 'h-2 w-2 bg-texto-icono-control')}
          />
        ))}
      </div>
    </section>
    )}

    <SeccionProximos
      alDesplazarProximos={alDesplazarProximos}
      pistaProximosRef={pistaProximosRef}
      PROXIMOS={PROXIMOS}
    />
      </>
  )
}
