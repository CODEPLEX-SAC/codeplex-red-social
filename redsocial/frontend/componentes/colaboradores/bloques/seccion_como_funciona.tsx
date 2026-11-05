import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'

const clases = catalogoColaboradores.clases.como_funciona
const colores: Record<string, string> = catalogoColaboradores.clases.paso_color

export function SeccionComoFunciona({
  PASOS_FUNCIONA,
}: {
  PASOS_FUNCIONA: { icono: string; numero: string; descripcion: string; }[]
}) {
  return (
    <div className={clases.tarjeta}>
      <h2 className={clases.titulo}>{catalogoColaboradores.secciones.como_funciona}</h2>
      <div className={clases.rejilla}>
        {PASOS_FUNCIONA.map((paso, i) => (
          <article key={paso.numero} className={i < PASOS_FUNCIONA.length - 1 ? `${clases.paso} ${clases.paso_con_separador}` : clases.paso}>
            <div className={`${clases.icono_caja} ${colores[paso.icono]}`}>
              <Icono name={paso.icono} className={clases.glifo} />
            </div>
            <span className={clases.numero}>{paso.numero}</span>
            <p className={clases.descripcion}>{paso.descripcion}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
