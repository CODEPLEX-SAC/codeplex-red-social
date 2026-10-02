import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { Icono } from '../../compartido/icono'
import { Interruptor } from '../../compartido/interfaz/interruptor'

export function SeccionDispositivos({
  DISPOSITIVOS,
  CONFIGURACION_LLAMADA,
}: {
  DISPOSITIVOS: { icono: string; titulo: string; detalle: string; }[]
  CONFIGURACION_LLAMADA: { icono: string; titulo: string; detalle: string; }[]
}) {
  return (
    <div className="grid grid-cols-2 items-start gap-4 max-900:grid-cols-1">
      <section className="rounded-xl border border-borde bg-white p-4">
        <h2 className="m-0 mb-3 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.secciones.dispositivos}</h2>
        {DISPOSITIVOS.map((d, i, arr) => (
          <div key={d.titulo} className={'flex items-center gap-2.5 py-2.5 ' + (i < arr.length - 1 ? 'border-b border-borde' : '')}>
            <Icono name={d.icono} className="h-4.25 w-4.25 flex-none text-texto-suave" />
            <div className="min-w-0 flex-1">
              <strong className="block text-subtitulo text-texto">{d.titulo}</strong>
              <span className="block truncate text-auxiliar text-texto-suave">{d.detalle}</span>
            </div>
            <Icono name="flecha-abajo" className="h-3.5 w-3.5 flex-none text-texto-suave" />
          </div>
        ))}
        <a href="#" className="mt-3 inline-flex items-center gap-1.5 text-enlace-accion font-semibold text-primario no-underline">
          <Icono name="actualizar" className="h-3.5 w-3.5" /> {catalogoMensajeria.botones.probar_dispositivos}
        </a>
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <h2 className="m-0 mb-3 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.secciones.configuracion_llamada}</h2>
        {CONFIGURACION_LLAMADA.map((c, i, arr) => (
          <div key={c.titulo} className={'flex items-center gap-2.5 py-2.5 ' + (i < arr.length - 1 ? 'border-b border-borde' : '')}>
            <Icono name={c.icono} className="h-4.25 w-4.25 flex-none text-texto-suave" />
            <div className="min-w-0 flex-1">
              <strong className="block text-subtitulo text-texto">{c.titulo}</strong>
              <span className="block truncate text-auxiliar text-texto-suave">{c.detalle}</span>
            </div>
            <Interruptor porDefectoSeleccionado />
          </div>
        ))}
      </section>
    </div>
  )
}
