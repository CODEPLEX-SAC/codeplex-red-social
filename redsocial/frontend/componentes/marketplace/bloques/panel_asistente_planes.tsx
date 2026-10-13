import { useState } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { RespuestasRapidasPlanes } from './respuestas_rapidas_planes'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import type { AsistentePlanes, MensajeAsistente } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoMarketplace.planes.asistente

export function PanelAsistentePlanes({
  asistente,
  mensajes,
  nombreCatalogo,
  alPreguntar,
  alVerCatalogo,
  alCerrar,
}: {
  asistente: AsistentePlanes
  mensajes: MensajeAsistente[]
  nombreCatalogo: string
  alPreguntar: (texto: string) => void
  alVerCatalogo: () => void
  alCerrar: () => void
}) {
  const [texto, setTexto] = useState('')

  function enviar(evento: { preventDefault: () => void }) {
    evento.preventDefault()
    alPreguntar(texto)
    setTexto('')
  }

  return (
    <section aria-label={asistente.titulo} className="absolute right-4 top-1/2 z-30 flex h-9/10 max-h-140 w-90 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white shadow-t13 max-768:fixed max-768:inset-x-2 max-768:bottom-4 max-768:top-auto max-768:z-40 max-768:h-4/5 max-768:w-auto max-768:translate-y-0">
      <header className="flex flex-none items-center gap-2.5 bg-fondo-boton-oscuro px-4 py-3 text-white">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white/20">
          <Icono name="comentario" className="h-4.5 w-4.5 text-white" />
        </span>
        <div className="min-w-0 flex-1">
          <strong className="block truncate text-titulo-subseccion">{asistente.titulo}</strong>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="flex items-center gap-1.25 text-estado text-texto-sobre-oscuro-claro">
              <span className="h-1.75 w-1.75 flex-none rounded-full bg-exito" /> {textos.en_linea}
            </span>
            <Insignia variant="status" className="bg-fondo-categoria-amarillo text-naranja-categoria-texto">{textos.demostracion}</Insignia>
          </div>
        </div>
        <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar} variant="flotante" size="sm" onClick={alCerrar} />
      </header>
      <div className="flex flex-none items-center gap-2.5 border-b border-borde bg-fondo px-3.5 py-2.5">
        <Icono name="archivo-pdf" className="h-5 w-5 flex-none text-rojo-categoria-texto" />
        <div className="min-w-0 flex-1">
          <strong className="block truncate text-auxiliar font-control text-texto">{nombreCatalogo}</strong>
          <span className="block text-auxiliar text-texto-suave">{textos.catalogo_ayuda}</span>
        </div>
        <Boton type="button" variant="enlace" size="enlace_accion" aria-label={textos.catalogo_ver_etiqueta} onClick={alVerCatalogo}>
          {textos.catalogo_ver} <Icono name="flecha-derecha" className="h-3 w-3" />
        </Boton>
      </div>
      <div className="grid min-h-30 flex-1 content-start gap-2.5 overflow-y-auto bg-fondo px-3 py-3.5">
        {mensajes.map((m, i) => (
          <div key={[i, m.texto].join()} className={`flex items-end gap-2 ${m.propio ? 'flex-row-reverse' : ''}`}>
            {!m.propio && (
              <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-primario-suave">
                <Icono name="comentario" className="h-3.5 w-3.5 text-primario" />
              </span>
            )}
            <div className={`flex max-w-p75 flex-col gap-0.75 ${m.propio ? 'items-end' : 'items-start'}`}>
              <p className={`m-0 whitespace-pre-line rounded-xl px-3 py-2.5 text-cuerpo leading-texto ${m.propio ? 'rounded-tr-sm bg-primario text-white' : 'rounded-tl-sm bg-white text-texto shadow-t8'}`}>{m.texto}</p>
              <span className="text-fecha-abreviada text-texto-suave">{m.hora}</span>
            </div>
          </div>
        ))}
      </div>
      <RespuestasRapidasPlanes preguntas={asistente.rapidas} alPreguntar={alPreguntar} />
      <form onSubmit={enviar} className="flex flex-none items-center gap-2 border-t border-borde bg-white px-3 py-2.5">
        <div className="min-w-0 flex-1">
          <CampoTexto valor={texto} alCambiar={setTexto} marcador={textos.placeholder} inputProps={{ [catalogoCompartido.controles.atributo_accesible]: textos.campo }} />
        </div>
        <BotonIcono icono="enviar" type="submit" aria-label={textosRedSocial.ENVIAR} variant="primario" size="default" className="flex-none" />
      </form>
    </section>
  )
}
