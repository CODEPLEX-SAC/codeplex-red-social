import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { resumenDeMensajeFijado } from './logica_resumen_mensaje_fijado'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { FranjaMensajeFijadoProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion

export function FranjaMensajeFijado({ mensaje, onIrAlMensaje }: FranjaMensajeFijadoProps) {
  return (
    <div className={clases.fijado}>
      <Boton type="button" variant="fantasma" size="enlace" aria-label={textos.ir_al_fijado} className={clases.fijado_boton} onClick={() => onIrAlMensaje(mensaje.id)}>
        <span className={clases.fijado_texto}>
          <strong className={clases.fijado_titulo}>
            <Icono name="fijar" className={clases.fijado_icono} /> {textos.mensaje_fijado}
          </strong>
          <span className={clases.fijado_cuerpo}>{resumenDeMensajeFijado(mensaje)}</span>
        </span>
      </Boton>
    </div>
  )
}
