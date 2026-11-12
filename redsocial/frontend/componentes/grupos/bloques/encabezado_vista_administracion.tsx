import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { EncabezadoVistaProps } from '@/tipos/grupos/contrato_administracion_grupo'

const clases = catalogoGrupos.clases.administracion

export function EncabezadoVistaAdministracion({ titulo, descripcion }: EncabezadoVistaProps) {
  return (
    <div className={clases.vista_cabecera}>
      <div>
        <h1 className={clases.vista_titulo}>{titulo}</h1>
        <p className={clases.vista_descripcion}>{descripcion}</p>
      </div>
      <span className={clases.demostracion}>{catalogoGrupos.administracion.demostracion}</span>
    </div>
  )
}
