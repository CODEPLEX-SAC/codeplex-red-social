import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoActividad from '../../../catalogos/capacidades/redsocial/actividad.json'
import type { EventoHistorialColaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'

const clases = catalogoColaboradores.clases.detalle

export function BloqueHistorialColaborador({ historial }: { historial: EventoHistorialColaborador[] }) {
  return (
    <section className={clases.seccion}>
      <div className={clases.cabecera_seccion}>
        <h4 className={clases.titulo_seccion_en_cabecera}>{catalogoColaboradores.secciones.historial_actividad}</h4>
        <a href={catalogoActividad.rutas.colaboradores} className={CLASE_ENLACE_ACCION}>{catalogoColaboradores.botones.ver_todo}</a>
      </div>
      <ul className={clases.lista_datos}>
        {historial.map((item) => (
          <li key={[item.texto, item.hora].join()} className={clases.historial_item}>
            <span className={clases.historial_texto}>{item.texto}</span>
            <time className={clases.historial_hora}>{item.hora}</time>
          </li>
        ))}
      </ul>
    </section>
  )
}
