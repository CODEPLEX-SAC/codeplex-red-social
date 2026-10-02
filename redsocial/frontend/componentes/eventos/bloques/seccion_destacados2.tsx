import { posicionesDe } from '../../compartido/posiciones'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenEventoPredeterminada as imagenEvento, imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
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
  destacado: EventoDestacado
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

    <section className="mb-7">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEventos.secciones.destacados}</h2>
      </div>
      <div className="grid grid-cols-2 overflow-hidden rounded-14 border border-t-eeeeee bg-white max-900:grid-cols-1">
        <div className="relative min-h-55 overflow-hidden">
          <AvatarImagen src={imagenEvento} className="h-full w-full" />
          <div className="absolute left-3.5 top-3.5 rounded-control bg-white px-3 py-2 text-center shadow-t5">
            <span className="block text-dia-evento font-extrabold leading-1.1 text-texto">{destacado.dia}</span>
            <span className="mt-px block text-mes-evento font-bold uppercase text-texto-suave">{destacado.mes}</span>
          </div>
          <BotonIcono icono="flecha-izquierda" aria-label={textosRedSocial.ANTERIOR} onClick={() => alCambiarDestacado(-1)} variant="flotante" size="default" className="absolute left-2.5 top-1/2 -translate-y-1/2" />
          <BotonIcono icono="flecha-derecha" aria-label={textosRedSocial.SIGUIENTE} onClick={() => alCambiarDestacado(1)} variant="flotante" size="default" className="absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex flex-col p-6">
          <span className="mb-1.5 inline-block text-etiqueta-estado font-bold uppercase tracking-wide text-primario">{destacado.categoriaEtiqueta}</span>
          <h3 className="m-0 mb-2 text-titulo-seccion font-extrabold leading-1.3 text-texto">{destacado.nombre}</h3>
          <p className="m-0 mb-4 whitespace-pre-line text-cuerpo leading-normal text-texto-suave">{destacado.descripcion}</p>
          <div className="mb-4 flex flex-wrap gap-4">
            <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {destacado.fecha}</span>
            <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {destacado.hora}</span>
            <span className="flex items-center gap-1.25 text-auxiliar text-texto-suave"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {destacado.ubicacion}</span>
          </div>
          <div className="mt-auto flex items-center justify-between max-600:flex-col max-600:items-stretch max-600:gap-2.5">
            <div className="flex items-center">
              {posicionesDe(4).map((posicion) => (
                <AvatarImagen
                  key={posicion.id}
                  src={usuarioImg}
                  className={'h-7 w-7 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-2' : '')}
                />
              ))}
              <span className="-ml-1 inline-flex h-7 items-center rounded-2xl border-2 border-white bg-t-ede9fe px-2 text-contador font-bold text-primario">{destacado.asistentes}</span>
            </div>
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
            className={'rounded-full border-0 p-0 ' + (i === indiceDestacado ? 'h-2.5 w-2.5 bg-primario' : 'h-2 w-2 bg-t-d5d0e5')}
          />
        ))}
      </div>
    </section>

    <SeccionProximos
      alDesplazarProximos={alDesplazarProximos}
      pistaProximosRef={pistaProximosRef}
      PROXIMOS={PROXIMOS}
    />
      </>
  )
}
