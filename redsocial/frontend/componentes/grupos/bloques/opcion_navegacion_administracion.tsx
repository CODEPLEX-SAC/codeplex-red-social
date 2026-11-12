import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { OpcionNavegacionAdministracionProps, SeccionAdministracion } from '@/tipos/grupos/contrato_administracion_grupo'

const clases = catalogoGrupos.clases.administracion

export function OpcionNavegacionAdministracion({ opcion, activa, alElegir }: OpcionNavegacionAdministracionProps) {
  const estado = activa ? clases.opcion_activa : clases.opcion_inactiva

  return (
    <Boton type="button" size="default" aria-current={activa ? 'page' : undefined} className={[clases.opcion, estado].join(' ')} onClick={() => alElegir(opcion.clave as SeccionAdministracion)}>
      <Icono name={opcion.icono as IconName} className={clases.opcion_icono} />
      {opcion.etiqueta}
    </Boton>
  )
}
