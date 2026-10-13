import { Icono, imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { FilaActividadGrupoProps } from '@/tipos/actividad/contrato_actividad_grupo'

export function FilaActividadGrupo({ nombre, accion, grupo, tiempo, icono, colorIcono }: FilaActividadGrupoProps) {
  return (
    <article className="flex items-start gap-2.5 border-b border-borde-suave py-2.25 last:border-b-0">
      <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full" />
      <div className="min-w-0 flex-1 text-cuerpo leading-texto text-texto">
        <strong className="font-titulo">{nombre}</strong> {accion} <span className="font-titulo text-texto">{grupo}</span>
        <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{tiempo}</span>
      </div>
      {icono && colorIcono && (
        <span className={`grid h-6.5 w-6.5 flex-none place-items-center self-center rounded-full ${catalogoCompartido.colores_icono_actividad[colorIcono]}`}>
          <Icono name={icono} className="h-3.5 w-3.5" />
        </span>
      )}
    </article>
  )
}
