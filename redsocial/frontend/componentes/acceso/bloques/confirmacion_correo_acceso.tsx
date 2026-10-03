import { useEffect, useRef } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'
import type { ConfirmacionCorreoAccesoProps } from '@/tipos/acceso/contrato_acceso'

const mensajes = catalogoAcceso.mensajes

export function ConfirmacionCorreoAcceso({ correo, onVolver }: ConfirmacionCorreoAccesoProps) {
  const contenedor = useRef<HTMLDivElement>(null)

  useEffect(() => contenedor.current?.focus(), [])

  return (
    <div ref={contenedor} role="status" tabIndex={-1} className="flex flex-col items-center gap-4 py-6 text-center outline-none">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-primario-suave text-primario">
        <Icono name="correo" className="h-7 w-7" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="m-0 text-nombre-entidad font-bold text-texto">{mensajes.revisa_correo_titulo}</h2>
        <p className="m-0 text-subtitulo text-texto-suave">{mensajes.revisa_correo_descripcion}</p>
        <strong className="break-all text-subtitulo text-texto">{correo}</strong>
      </div>
      <Boton type="button" variant="enlace" size="enlace" onClick={onVolver}>
        <Icono name="flecha-izquierda" className="h-4 w-4" /> {catalogoAcceso.botones.volver_a_iniciar_sesion}
      </Boton>
    </div>
  )
}
