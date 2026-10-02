import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenEventoPredeterminada as imagenEvento, Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { DetalleEventoDestacado, EventoDestacado } from '@/tipos/eventos/modelo_eventos_para_ti'

const textos = catalogoEventos.detalle_evento

export function SeccionDescripcion2({
  detalle,
  evento,
  FilaDato,
}: {
  detalle: DetalleEventoDestacado
  evento: EventoDestacado
  FilaDato: ({ icono, principal, secundario }: { icono: string; principal: string; secundario: string; }) => React.JSX.Element
}) {
  return (
    <div className="min-w-0">
      <AvatarImagen src={imagenEvento} className="mb-4 h-64 w-full rounded-14 max-600:h-44" />
      <span className="block text-etiqueta-estado font-bold uppercase tracking-wide text-primario">{detalle.categoria}</span>
      <h2 className="m-0 mb-1.5 text-titulo-pagina font-extrabold text-texto">{evento.nombre}</h2>
      <p className="m-0 mb-4 whitespace-pre-line text-cuerpo text-texto-suave">{evento.descripcion}</p>
      <div className="mb-6 flex flex-wrap gap-x-8 gap-y-3">
        <FilaDato icono="calendario" principal={[detalle.diaSemana, textos.coma, detalle.fechaLarga].join('')} secundario={evento.fecha} />
        <FilaDato icono="reloj" principal={detalle.horario} secundario={detalle.duracion} />
        <FilaDato icono="ubicacion" principal={detalle.lugar} secundario={detalle.direccion} />
      </div>
      <div className="mb-5 flex items-start gap-3">
        <div className="grid h-10 w-10 flex-none place-items-center rounded-control bg-primario-suave text-primario"><Icono name="documento" className="h-5 w-5" /></div>
        <div>
          <h3 className="m-0 mb-1 text-titulo-seccion font-bold text-texto">{textos.descripcion}</h3>
          <p className="m-0 text-cuerpo leading-normal text-texto-suave">{detalle.descripcionLarga}</p>
        </div>
      </div>
      <div className="mb-5 flex items-start gap-3">
        <div className="grid h-10 w-10 flex-none place-items-center rounded-control bg-primario-suave text-primario"><Icono name="menu-hamburguesa" className="h-5 w-5" /></div>
        <div className="min-w-0 flex-1">
          <h3 className="m-0 mb-2 text-titulo-seccion font-bold text-texto">{textos.agenda}</h3>
          <ul className="m-0 list-none overflow-hidden rounded-lg bg-t-f5f3ff p-0">
            {detalle.agenda.map((fila) => (
              <li key={fila.hora} className="flex items-center gap-3 px-3 py-1.5 text-auxiliar text-texto-suave">
                <span className="w-16 flex-none">{fila.hora}</span>
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-primario" />
                <span>{fila.actividad}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-14 border border-t-eeeeee bg-white p-4 max-600:flex-col max-600:items-stretch">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 flex-none place-items-center rounded-control bg-primario-suave text-primario"><Icono name="grupos" className="h-6 w-6" /></div>
          <div>
            <h3 className="m-0 text-titulo-seccion font-bold text-texto">{textos.organizador}</h3>
            <p className="m-0 text-nombre-entidad font-bold text-texto">{detalle.organizador.nombre}</p>
            <p className="m-0 text-auxiliar text-texto-suave">{detalle.organizador.detalle}</p>
          </div>
        </div>
        <Boton type="button" variant="secundario" size="md">{textos.ver_perfil}</Boton>
      </div>
    </div>
  )
}
