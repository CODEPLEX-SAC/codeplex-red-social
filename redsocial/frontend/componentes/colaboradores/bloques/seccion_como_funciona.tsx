import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'

export function SeccionComoFunciona({
  PASOS_FUNCIONA,
}: {
  PASOS_FUNCIONA: { icono: string; clase: string; numero: string; descripcion: string; }[]
}) {
  return (
    <div className="rounded-xl border border-gris-borde bg-white p-6 area-comofunciona">
      <h2 className="m-0 mb-5 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.secciones.como_funciona}</h2>
      <div className="grid grid-cols-4 gap-5 max-1100:grid-cols-2 max-768:grid-cols-1">
        {PASOS_FUNCIONA.map((paso, i) => (
          <article
            key={paso.numero}
            className={
              'flex flex-col gap-2.5 ' +
              (i < PASOS_FUNCIONA.length - 1 ? 'border-r border-t-eeeeee pr-5 max-1100:border-r-0 max-1100:pr-0 max-768:border-r-0' : '')
            }
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${paso.clase}`}>
              <Icono name={paso.icono} className="w-5.5 h-5.5" />
            </div>
            <span className="text-contador font-bold text-gris-oscuro-texto">{paso.numero}</span>
            <p className="text-cuerpo leading-relaxed text-gris-texto-secundario">{paso.descripcion}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
