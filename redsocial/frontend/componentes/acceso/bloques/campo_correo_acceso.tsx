import { Icono } from '../../compartido/icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { CampoCorreoAccesoProps } from '@/tipos/acceso/contrato_acceso'

export function CampoCorreoAcceso({ valor, error, onCambiar }: CampoCorreoAccesoProps) {
  return (
    <CampoTexto
      id={catalogoAcceso.ids.correo}
      etiqueta={catalogoAcceso.campos.correo}
      valor={valor}
      alCambiar={onCambiar}
      tipo="email"
      error={error !== ''}
      mensajeError={error}
      iconoInicio={<Icono name={catalogoAcceso.iconos_campos.correo as IconName} className={catalogoAcceso.clase_icono_campo} />}
      inputProps={{ autoComplete: catalogoAcceso.autocompletar.correo }}
    />
  )
}
