import { posicionesDe } from '../../compartido/posiciones'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as imagenUsuario, Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { CodeplexMapa } from '@codeplex-sac/mapas'
import { SeccionDescripcion2 } from './seccion_descripcion2'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { DetalleEventoDestacado, EventoDestacado } from '@/tipos/eventos/modelo_eventos_para_ti'

const textos = catalogoEventos.detalle_evento

export function SeccionDescripcion({
  detalle,
  evento,
  FilaDato,
  BloqueIcono,
  posicion,
  marcadores,
}: {
  detalle: DetalleEventoDestacado
  evento: EventoDestacado
  FilaDato: ({ icono, principal, secundario }: { icono: string; principal: string; secundario: string; }) => React.JSX.Element
  BloqueIcono: ({ icono, titulo, lineas }: { icono: string; titulo: string; lineas: string[]; }) => React.JSX.Element
  posicion: [number, number]
  marcadores: { id: string; posicion: [number, number]; icono: L.DivIcon; titulo: string; }[]
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_20rem] items-start gap-5 max-1100:grid-cols-1">
      <SeccionDescripcion2 detalle={detalle} evento={evento} FilaDato={FilaDato} />

      <aside className="flex min-w-0 flex-col gap-4">
        <div className="rounded-14 border border-t-eeeeee bg-white p-4">
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-t-f5f3ff p-3">
            <div className="rounded-control bg-white px-3 py-2 text-center shadow-t5">
              <span className="block text-dia-evento font-extrabold leading-1.1 text-texto">{evento.dia}</span>
              <span className="block text-mes-evento font-bold uppercase text-texto-suave">{evento.mes}</span>
            </div>
            <div>
              <span className="block text-nombre-entidad font-bold text-texto">{detalle.diaSemana}</span>
              <span className="block text-auxiliar text-texto-suave">{detalle.fechaLarga}</span>
            </div>
          </div>
          <div className="mb-3.5 flex flex-col gap-3.5">
            <BloqueIcono icono="reloj" titulo={textos.hora} lineas={[detalle.horario, detalle.duracion]} />
            <BloqueIcono icono="ubicacion" titulo={textos.lugar} lineas={[detalle.lugar, detalle.direccion]} />
            <div className="flex items-center justify-between gap-2">
              <BloqueIcono icono="grupos" titulo={textos.asistentes} lineas={[detalle.totalAsistentes]} />
              <div className="flex flex-none items-center">
                {posicionesDe(3).map((posicion) => (
                  <AvatarImagen key={posicion.id} src={imagenUsuario} className={'h-7 w-7 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-2' : '')} />
                ))}
                <span className="-ml-1 inline-flex h-7 items-center rounded-2xl border-2 border-white bg-t-ede9fe px-2 text-contador font-bold text-primario">{evento.asistentes.split(textos.espacio)[0]}</span>
              </div>
            </div>
          </div>
          <Boton type="button" variant="primario" size="md" className="mb-2 w-full">{textos.quiero_asistir}</Boton>
          <Boton type="button" variant="secundario" size="md" className="w-full"><Icono name="calendario" className="h-4 w-4" /> {textos.agregar_calendario}</Boton>
        </div>

        <div className="rounded-14 border border-t-eeeeee bg-white p-4">
          <BloqueIcono icono="ubicacion" titulo={textos.ubicacion} lineas={[detalle.lugar, detalle.direccion]} />
          <div className="my-3 overflow-hidden rounded-lg">
            <CodeplexMapa centro={posicion} zoom={14} marcadores={marcadores} altura={140} anchoCompleto controlarZoom />
          </div>
          <Boton type="button" variant="secundario" size="md" className="w-full"><Icono name="enlace" className="h-4 w-4" /> {textos.ver_google_maps}</Boton>
        </div>

        <div className="rounded-14 border border-t-eeeeee bg-white p-4">
          <BloqueIcono icono="categoria-evento" titulo={textos.categoria} lineas={[]} />
          <span className="ml-13 inline-block rounded-2xl bg-t-ede9fe px-3 py-1 text-contador font-semibold text-primario">{detalle.categoria}</span>
        </div>
      </aside>
    </div>
  )
}
