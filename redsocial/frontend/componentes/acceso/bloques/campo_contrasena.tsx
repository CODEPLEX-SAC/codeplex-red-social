import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { CampoContrasenaProps } from '@/tipos/acceso/contrato_acceso'

const configuraciones = catalogoAcceso.campos_contrasena

export function CampoContrasena({ variante, valor, error, onCambiar }: CampoContrasenaProps) {
  const configuracion = configuraciones[variante]
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label htmlFor={configuracion.id} className="mb-1.5 block text-auxiliar font-bold text-texto">
        {configuracion.etiqueta}
      </label>
      <CampoTexto
        id={configuracion.id}
        valor={valor}
        alCambiar={onCambiar}
        tipo={visible ? 'text' : 'password'}
        marcador={configuracion.marcador}
        error={error !== ''}
        mensajeError={error}
        inputProps={{ autoComplete: configuracion.autocompletar }}
        iconoFin={
          <BotonIcono
            icono="ver"
            type="button"
            aria-label={visible ? configuracion.ocultar : configuracion.mostrar}
            aria-controls={configuracion.id}
            onClick={() => setVisible((anterior) => !anterior)}
            variant={visible ? 'suave' : 'discreto'}
            size="md"
          />
        }
      />
    </div>
  )
}
