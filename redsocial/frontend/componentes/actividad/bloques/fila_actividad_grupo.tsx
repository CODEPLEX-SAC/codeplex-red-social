import { Icono } from '../../compartido/icono'
import usuarioImg from '../../../../recursos/imagenes/usuario.jpg'
import type { FilaActividadGrupoProps } from '../../../tipos/actividad/fila_actividad_grupo'

const CLASES_ICONO: Record<NonNullable<FilaActividadGrupoProps['colorIcono']>, string> = {
  morado: 'bg-[#ede9fe] text-morado-categoria',
  violeta: 'bg-[#ede9fe] text-morado-categoria',
  verde: 'bg-[#dcfce7] text-verde-categoria',
  azul: 'bg-[#dbeafe] text-azul-categoria',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
  rosa: 'bg-[#fce7f3] text-[#ec4899]',
}

export function FilaActividadGrupo({ nombre, accion, grupo, tiempo, icono, colorIcono }: FilaActividadGrupoProps) {
  return (
    <article className="flex items-start gap-2.5 border-b border-[#f5f5f5] py-2.25 last:border-b-0">
      <img className="h-8 w-8 flex-none rounded-full object-cover" src={usuarioImg} alt="" />
      <div className="min-w-0 flex-1 text-xs leading-[1.4] text-texto">
        <strong className="font-semibold">{nombre}</strong> {accion} <span className="font-bold text-texto">{grupo}</span>
        <span className="mt-0.5 block text-[11px] text-texto-suave">{tiempo}</span>
      </div>
      {icono && colorIcono && (
        <span className={`grid h-[26px] w-[26px] flex-none place-items-center self-center rounded-full ${CLASES_ICONO[colorIcono]}`}>
          <Icono name={icono} className="h-[13px] w-[13px]" />
        </span>
      )}
    </article>
  )
}
