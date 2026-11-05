import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { textoDeMensaje } from './logica_presentacion_mensajes'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { FranjaMensajeFijadoProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion

export function FranjaMensajeFijado({ mensaje, onCerrar }: FranjaMensajeFijadoProps) {
  return (
    <div className={clases.fijado}>
      <div className={clases.fijado_texto}>
        <strong className={clases.fijado_titulo}>
          <Icono name="fijar" className={clases.fijado_icono} /> {textos.mensaje_fijado}
        </strong>
        <p className={clases.fijado_cuerpo}>{textoDeMensaje(mensaje)}</p>
      </div>
      <BotonIcono icono="cerrar" type="button" aria-label={textos.cerrar_fijado} onClick={onCerrar} variant="discreto" size="sm" className="flex-none" />
    </div>
  )
}
