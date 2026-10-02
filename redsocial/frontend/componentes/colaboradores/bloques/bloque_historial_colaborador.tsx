import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoActividad from '../../../catalogos/capacidades/redsocial/actividad.json'
import type { EventoHistorialColaborador } from '@/tipos/colaboradores/modelo_colaboradores'

export function BloqueHistorialColaborador({ historial }: { historial: EventoHistorialColaborador[] }) {
  return (
    <section className="mt-4 border-t border-t-f3f4f6 pt-4">
      <div className="mb-2.5 flex items-center justify-between">
        <h4 className="m-0 text-nombre-entidad font-semibold text-gris-oscuro-texto">{catalogoColaboradores.secciones.historial_actividad}</h4>
        <a href={catalogoActividad.rutas.colaboradores} className="text-enlace-accion font-semibold text-primario no-underline">{catalogoColaboradores.botones.ver_todo}</a>
      </div>
      <ul className="m-0 grid list-none gap-3 p-0">
        {historial.map((item) => (
          <li key={[item.texto, item.hora].join()} className="relative pl-4 text-campo-formulario before:absolute before:left-0 before:top-1.25 before:h-1.75 before:w-1.75 before:rounded-full before:bg-verde-categoria before:content-vacio">
            <span className="block text-gris-texto-secundario">{item.texto}</span>
            <time className="mt-px block text-fecha-abreviada text-gris-texto-secundario">{item.hora}</time>
          </li>
        ))}
      </ul>
    </section>
  )
}
