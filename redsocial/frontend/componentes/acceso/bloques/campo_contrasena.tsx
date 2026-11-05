import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { CampoContrasenaProps } from '@/tipos/acceso/contrato_acceso'

const configuraciones = catalogoAcceso.campos_contrasena

export function CampoContrasena({ variante, valor, error, onCambiar }: CampoContrasenaProps) {
  const configuracion = configuraciones[variante]
  const [visible, setVisible] = useState(false)

  return (
    <CampoTexto
      id={configuracion.id}
      etiqueta={configuracion.etiqueta}
      valor={valor}
      alCambiar={onCambiar}
      tipo={visible ? 'text' : 'password'}
      error={error !== ''}
      mensajeError={error}
      iconoInicio={<Icono name={catalogoAcceso.iconos_campos.contrasena as IconName} className={catalogoAcceso.clase_icono_campo} />}
      inputProps={{ autoComplete: configuracion.autocompletar }}
      iconoFin={
        <BotonIcono
          icono={visible ? catalogoAcceso.iconos_campos.ocultar : catalogoAcceso.iconos_campos.mostrar}
          type="button"
          aria-label={visible ? configuracion.ocultar : configuracion.mostrar}
          aria-controls={configuracion.id}
          onClick={() => setVisible((anterior) => !anterior)}
          variant="discreto"
          size="md"
        />
      }
    />
  )
}
