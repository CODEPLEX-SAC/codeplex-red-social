import { useMemo } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { DetalleEventoProps } from '@/tipos/eventos/contrato_detalle_evento'
import { SeccionDescripcion } from './seccion_descripcion'

const textos = catalogoEventos.detalle_evento

function BloqueIcono({ icono, titulo, lineas }: { icono: IconName; titulo: string; lineas: string[] }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 flex-none place-items-center rounded-control bg-primario-suave text-primario">
        <Icono name={icono} className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <h3 className="m-0 text-nombre-entidad font-bold text-texto">{titulo}</h3>
        {lineas.map((linea, i) => (
          <p key={linea} className={'m-0 ' + (i === 0 ? 'text-cuerpo text-texto-suave' : 'text-auxiliar text-texto-suave')}>{linea}</p>
        ))}
      </div>
    </div>
  )
}

function FilaDato({ icono, principal, secundario }: { icono: IconName; principal: string; secundario: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icono name={icono} className="mt-0.5 h-5 w-5 flex-none text-primario" />
      <div>
        <span className="block text-cuerpo text-texto">{principal}</span>
        <span className="block text-auxiliar text-texto-suave">{secundario}</span>
      </div>
    </div>
  )
}

export function DetalleEvento({ evento, onVolver }: DetalleEventoProps) {
  const detalle = evento.detalle
  const posicion: [number, number] = [detalle.lat, detalle.lng]
  const marcadores = useMemo(
    () => [
      {
        id: evento.nombre,
        posicion: [detalle.lat, detalle.lng] as [number, number],
        icono: L.divIcon({ className: 'h-4 w-4 rounded-full border-3 border-white bg-primario shadow-t8', iconSize: [16, 16] }),
        titulo: detalle.lugar,
      },
    ],
    [evento.nombre, detalle.lugar, detalle.lat, detalle.lng],
  )

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Boton type="button" onClick={onVolver} variant="enlace" size="enlace">
          <Icono name="flecha-izquierda" className="h-4 w-4" /> {textos.volver}
        </Boton>
        <div className="flex items-center gap-2">
          <Boton type="button" variant="secundario" size="default"><Icono name="guardar" className="h-3.5 w-3.5" /> {textos.guardar}</Boton>
          <Boton type="button" variant="secundario" size="default"><Icono name="compartir" className="h-3.5 w-3.5" /> {textos.compartir}</Boton>
        </div>
      </div>

      <SeccionDescripcion
        detalle={detalle}
        evento={evento}
        FilaDato={FilaDato}
        BloqueIcono={BloqueIcono}
        posicion={posicion}
        marcadores={marcadores}
      />
    </section>
  )
}
