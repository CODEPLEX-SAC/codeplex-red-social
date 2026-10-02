import { Icono, EstructuraApp, AvatarImagen, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
import { useState } from 'react'
import { PARTICIPANTES, REUNION_EN_CURSO, CONTEO_PARTICIPANTES_EN_CURSO } from '../../rutas/mensajeria/rutas_mensajeria'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { BloqueEnLlamada, BloqueMicrofono, SeccionParticipantes } from '../../componentes/mensajeria'

export function PaginaMensajesVideollamadaEnCurso() {
  const [participantesAbiertos, setParticipantesAbiertos] = useState(false)
  const [micActivo, setMicActivo] = useState(true)
  const [camaraActivo, setCamaraActivo] = useState(true)

  return (
    <EstructuraApp paginaActiva="mensajes">
      <div className="-mx-6 -mt-6.25 -mb-10.5 flex h-vh-navbar min-w-0 flex-col gap-3.5 px-5 pb-5 pt-5 max-800:-mx-3 max-800:-mt-4.5 max-800:-mb-4.5">
        <BloqueEnLlamada
          REUNION_EN_CURSO={REUNION_EN_CURSO}
          setParticipantesAbiertos={setParticipantesAbiertos}
          CONTEO_PARTICIPANTES_EN_CURSO={CONTEO_PARTICIPANTES_EN_CURSO}
        />

        <div className="relative flex min-h-0 flex-1 gap-4">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2.5">
            <div className="grid min-h-0 flex-1 auto-rows-minmax120-1fr grid-cols-repeatauto-fill-minmax170-1fr gap-3 overflow-y-auto rounded-14 bg-t-0f0c1e p-4 max-780:grid-cols-repeatauto-fill-minmax130-1fr max-480:grid-cols-repeatauto-fill-minmax105-1fr max-480:gap-2">
              {PARTICIPANTES.map((p) => (
                <article key={p.nombre} className="relative min-h-30 overflow-hidden rounded-control degradado-nocturno-profundo">
                  {p.organizador && (
                    <span className="absolute left-2 top-2 z-1 rounded-md bg-overlay-4 px-2.25 py-0.75 text-etiqueta-estado font-bold text-white">{catalogoMensajeria.leyendas.organizador}</span>
                  )}
                  <AvatarImagen src={usuarioImg} className="absolute inset-0 bg-primario-suave opacity-92" />
                  <div className="absolute inset-x-2 bottom-2 z-1 flex items-center gap-1.5">
                    <span className="min-w-0 flex-1 truncate rounded-md bg-overlay-4 px-2.25 py-1 text-nombre-entidad font-semibold text-white">{p.nombre}</span>
                    <span className={'grid h-6 w-6 flex-none place-items-center rounded-full p-1.25 ' + (p.micActivo ? 'bg-overlay-9 text-white' : 'bg-overlay-4 text-t-f2a0a0')}>
                      <Icono name={p.micActivo ? 'microfono' : 'microfono-apagado'} className="h-full w-full" />
                    </span>
                    <span className={'grid h-6 w-6 flex-none place-items-center rounded-full p-1.25 ' + (p.videoActivo ? 'bg-overlay-9 text-white' : 'bg-overlay-4 text-t-f2a0a0')}>
                      <Icono name={p.videoActivo ? 'video' : 'video-apagado'} className="h-full w-full" />
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <BloqueMicrofono
              setMicActivo={setMicActivo}
              micActivo={micActivo}
              setCamaraActivo={setCamaraActivo}
              camaraActivo={camaraActivo}
              setParticipantesAbiertos={setParticipantesAbiertos}
              CONTEO_PARTICIPANTES_EN_CURSO={CONTEO_PARTICIPANTES_EN_CURSO}
            />
          </div>

          {participantesAbiertos && (
            <div className="fixed inset-0 z-29 bg-overlay-2 max-1100:block hidden" onClick={() => setParticipantesAbiertos(false)} />
          )}

          <SeccionParticipantes
            participantesAbiertos={participantesAbiertos}
            CONTEO_PARTICIPANTES_EN_CURSO={CONTEO_PARTICIPANTES_EN_CURSO}
            setParticipantesAbiertos={setParticipantesAbiertos}
            PARTICIPANTES={PARTICIPANTES}
          />
        </div>
      </div>
    </EstructuraApp>
  )
}
